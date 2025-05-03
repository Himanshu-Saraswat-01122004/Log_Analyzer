import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { writeFile } from 'fs/promises';
import { mkdir } from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to normalize IP addresses
const normalizeIP = (ip) => {
  // Handle IPv4-mapped IPv6 addresses
  if (ip.startsWith('::ffff:')) {
    return ip.substring(7); // Return the IPv4 part
  }
  // Handle IPv6 localhost
  if (ip === '::1') {
    return '127.0.0.1';
  }
  return ip;
};

// Helper function to get URL group from path
const getUrlGroup = (url) => {
  // Extract path without query parameters
  const path = url.split('?')[0];
  
  // Group by common patterns
  const parts = path.split('/').filter(Boolean);
  
  if (parts.length === 0) return '/';
  
  // Check for IDs or hashes in URL paths (typically long alphanumeric strings)
  const processedParts = parts.map(part => {
    // Replace likely IDs with placeholders
    if (part.length > 20 || /^[a-f0-9]{8,}$/i.test(part)) {
      return ':id';
    }
    // UUIDs
    if (/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(part)) {
      return ':uuid';
    }
    // Numbers and short codes
    if (/^\d+$/.test(part)) {
      return ':num';
    }
    return part;
  });
  
  return '/' + processedParts.join('/');
};

// Helper to detect potential security issues in logs
const detectSecurityIssues = (logs) => {
  const issues = [];
  
  // Too many 401/403 errors from the same IP
  const ipAuthErrors = {};
  
  logs.forEach(log => {
    if ((log.statusCode === '401' || log.statusCode === '403') && log.ipAddress) {
      const ip = normalizeIP(log.ipAddress);
      ipAuthErrors[ip] = (ipAuthErrors[ip] || 0) + 1;
    }
  });
  
  Object.entries(ipAuthErrors).forEach(([ip, count]) => {
    if (count >= 3) {
      issues.push({
        type: 'auth_failures',
        ip,
        count,
        severity: count >= 10 ? 'high' : 'medium'
      });
    }
  });
  
  return issues;
};

const parseLogs = async (logData) => {
  const lines = logData.split('\n').filter(Boolean);

  let totalRequests = 0;
  let statusCounts = {};
  let urlCounts = {};
  let urlGroups = {};
  let ipAddresses = new Set();
  let normalizedIpAddresses = new Set();
  let timestamps = [];
  let userCounts = {};
  let responseTimes = [];
  let requestIds = new Set();
  let methodCounts = {};
  let slowRequests = [];
  let hasCustomFormatEntries = false;
  let parsedLogs = [];
  let hourlyActivity = {};
  
  // Track consecutive errors
  let consecutiveErrors = 0;
  let maxConsecutiveErrors = 0;
  
  // Custom log format regex pattern
  // [:custom-date] ":method :url" :status (:response-time ms) | IP::remote-addr | User::user-email | ReqID::request-id | :res[content-length] bytes
  const logPattern = /\[(.*?)\] "(.*?) (.*?)" (\d+) \((\d+(?:\.\d+)?) ms\) \| IP:(.*?) \| User:(.*?) \| ReqID:(.*?) \| (.*?) bytes/;

  for (const line of lines) {
    totalRequests++;
    let logEntry = null;

    try {
      const match = line.match(logPattern);
      
      if (match) {
        hasCustomFormatEntries = true;
        // Extract data using the matched groups
        const timestamp = match[1];
        const method = match[2];
        const url = match[3];
        const statusCode = match[4];
        const responseTime = parseFloat(match[5]);
        const ipAddress = match[6];
        const userEmail = match[7];
        const requestId = match[8] === '-' ? null : match[8];
        const contentLength = match[9] === '-' ? 0 : parseInt(match[9], 10) || 0;

        // Create log entry object
        logEntry = {
          timestamp,
          method,
          url,
          statusCode,
          responseTime,
          ipAddress,
          userEmail,
          requestId,
          contentLength
        };
        
        // Group URLs by pattern
        const urlGroup = getUrlGroup(url);
        urlGroups[urlGroup] = (urlGroups[urlGroup] || 0) + 1;
        
        // Record hourly activity for time-based analysis
        try {
          const date = new Date(timestamp);
          const hour = date.getHours();
          hourlyActivity[hour] = (hourlyActivity[hour] || 0) + 1;
        } catch (e) {
          console.error('Error parsing timestamp for hourly activity:', e);
        }

        // Store extracted data with normalizations
        timestamps.push(timestamp);
        ipAddresses.add(ipAddress);
        normalizedIpAddresses.add(normalizeIP(ipAddress));
        
        if (requestId) requestIds.add(requestId);
        if (!isNaN(responseTime)) responseTimes.push(responseTime);
        
        // Count occurrences
        statusCounts[statusCode] = (statusCounts[statusCode] || 0) + 1;
        urlCounts[url] = (urlCounts[url] || 0) + 1;
        methodCounts[method] = (methodCounts[method] || 0) + 1;
        
        // Only count non-anonymous users
        if (userEmail && userEmail !== 'anonymous') {
          userCounts[userEmail] = (userCounts[userEmail] || 0) + 1;
        }
        
        // Track slow requests (>1000ms)
        if (responseTime > 1000) {
          slowRequests.push({
            timestamp,
            method,
            url,
            responseTime,
            statusCode
          });
        }
        
        // Track error patterns
        if (statusCode.startsWith('5') || statusCode.startsWith('4')) {
          consecutiveErrors++;
          maxConsecutiveErrors = Math.max(maxConsecutiveErrors, consecutiveErrors);
        } else {
          consecutiveErrors = 0;
        }
      } else {
        // Fallback to traditional log format parsing if the line doesn't match
        const parts = line.split(' ');
        if (parts.length >= 7) {
          const ipAddress = parts[0];
          const timestamp = parts[3] + ' ' + parts[4];
          const url = parts[6];
          const statusCode = parts.length > 8 ? parts[parts.length - 2] : 'Unknown';
          
          logEntry = {
            timestamp: timestamp.replace('[', '').replace(']', ''),
            method: parts.length > 5 ? parts[5].replace('"', '') : 'Unknown',
            url,
            statusCode,
            ipAddress,
            responseTime: null
          };

          const urlGroup = getUrlGroup(url);
          urlGroups[urlGroup] = (urlGroups[urlGroup] || 0) + 1;

          ipAddresses.add(ipAddress);
          normalizedIpAddresses.add(normalizeIP(ipAddress));
          timestamps.push(timestamp.replace('[', '').replace(']', ''));
          
          statusCounts[statusCode] = (statusCounts[statusCode] || 0) + 1;
          urlCounts[url] = (urlCounts[url] || 0) + 1;
          
          // Track error patterns
          if (statusCode.startsWith('5') || statusCode.startsWith('4')) {
            consecutiveErrors++;
            maxConsecutiveErrors = Math.max(maxConsecutiveErrors, consecutiveErrors);
          } else {
            consecutiveErrors = 0;
          }
        }
      }
      
      if (logEntry) {
        parsedLogs.push(logEntry);
      }
    } catch (error) {
      console.error('Error parsing log line:', error);
    }
  }
  
  // Analyze for security issues
  const securityIssues = detectSecurityIssues(parsedLogs);

  // Prepare URL groups for analysis
  const topUrlGroups = Object.entries(urlGroups)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([pattern, count]) => ({ pattern, count }));

  const topUrls = Object.entries(urlCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([url, count]) => ({ url, count }));

  const topUsers = Object.entries(userCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([email, count]) => ({ email, count }));
    
  const methodDistribution = Object.entries(methodCounts)
    .map(([method, count]) => ({ method, count }));
    
  // Convert hourly activity to array
  const hourlyActivityArray = Array(24).fill(0).map((_, hour) => ({
    hour,
    count: hourlyActivity[hour] || 0
  }));

  // Calculate time span if there are timestamps
  let timeSpan = null;
  if (timestamps.length > 0) {
    try {
      const dates = timestamps.map(ts => new Date(ts)).filter(d => !isNaN(d));
      if (dates.length > 0) {
        const minDate = new Date(Math.min(...dates));
        const maxDate = new Date(Math.max(...dates));
        timeSpan = {
          start: minDate.toISOString(),
          end: maxDate.toISOString(),
          durationMs: maxDate - minDate
        };
      }
    } catch (error) {
      console.error('Error calculating time span:', error);
    }
  }

  // Calculate response time statistics
  let avgResponseTime = null;
  let maxResponseTime = null;
  let minResponseTime = null;
  let responseTimeMedian = null;
  let responseTimeP95 = null;
  let responseTimeDistribution = null;
  
  if (responseTimes.length > 0) {
    // Sort for percentile calculations
    const sortedTimes = [...responseTimes].sort((a, b) => a - b);
    
    avgResponseTime = Math.round(responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length);
    maxResponseTime = Math.max(...responseTimes);
    minResponseTime = Math.min(...responseTimes);
    
    // Calculate median (50th percentile)
    const medianIndex = Math.floor(sortedTimes.length / 2);
    responseTimeMedian = sortedTimes.length % 2 === 0
      ? Math.round((sortedTimes[medianIndex - 1] + sortedTimes[medianIndex]) / 2)
      : Math.round(sortedTimes[medianIndex]);
      
    // Calculate 95th percentile
    const p95Index = Math.ceil(sortedTimes.length * 0.95) - 1;
    responseTimeP95 = Math.round(sortedTimes[p95Index]);
    
    // Create response time distribution
    const ranges = [0, 100, 300, 500, 1000, 2000, 5000, Infinity];
    const rangeLabels = ['0-100ms', '101-300ms', '301-500ms', '501-1000ms', '1001-2000ms', '2001-5000ms', '5000ms+'];
    
    responseTimeDistribution = rangeLabels.map((label, i) => {
      const min = ranges[i];
      const max = ranges[i + 1];
      const count = sortedTimes.filter(time => time > min && time <= max).length;
      return { label, count };
    });
  }
  
  // Analyze status code patterns
  const successRate = statusCounts['200'] 
    ? (statusCounts['200'] / totalRequests) * 100 
    : 0;
    
  const errorRate = Object.entries(statusCounts)
    .filter(([code]) => code.startsWith('5'))
    .reduce((sum, [_, count]) => sum + count, 0) / totalRequests * 100;
    
  const clientErrorRate = Object.entries(statusCounts)
    .filter(([code]) => code.startsWith('4'))
    .reduce((sum, [_, count]) => sum + count, 0) / totalRequests * 100;

  return { 
    totalRequests, 
    statusCounts, 
    topUrls,
    topUrlGroups,
    topUsers,
    uniqueIPs: normalizedIpAddresses.size,
    rawUniqueIPs: ipAddresses.size,
    uniqueRequestIds: requestIds.size,
    timeSpan,
    hourlyActivity: hourlyActivityArray,
    avgResponseTime,
    maxResponseTime,
    minResponseTime,
    responseTimeMedian,
    responseTimeP95,
    responseTimeDistribution,
    slowRequests: slowRequests.slice(0, 10), // Limit to top 10 slowest
    methodDistribution,
    hasCustomFormatEntries,
    successRate: Math.round(successRate * 10) / 10,
    errorRate: Math.round(errorRate * 10) / 10,
    clientErrorRate: Math.round(clientErrorRate * 10) / 10,
    maxConsecutiveErrors,
    securityIssues,
    logCount: parsedLogs.length
  };
};

export async function POST(request) {
  try {
    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'uploads');
    await mkdir(uploadsDir, { recursive: true });
    
    const formData = await request.formData();
    const file = formData.get('logfile');
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }
    
    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Parse the log content directly from buffer
    const logContent = buffer.toString('utf8');
    const result = await parseLogs(logContent);
    
    // Optionally save the file
    const filePath = path.join(uploadsDir, file.name);
    await writeFile(filePath, buffer);
    
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Error processing log file:', error);
    return NextResponse.json(
      { error: 'Error analyzing log file' },
      { status: 500 }
    );
  }
}
