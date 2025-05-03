'use client';

import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Import components
import Header from '../components/Header';
import LogUpload from '../components/LogUpload';
import AnalysisTabs from '../components/AnalysisTabs';
import TimeFilter from '../components/TimeFilter';
import OverviewTab from '../components/tabs/OverviewTab';
import UsersTab from '../components/tabs/UsersTab';
import RequestsTab from '../components/tabs/RequestsTab';
import PerformanceTab from '../components/tabs/PerformanceTab';

// Import utilities
import { getChartColors, formatDuration } from '../components/utils/ChartHelpers';

export default function Home() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to system preference
  const [analysisTab, setAnalysisTab] = useState('overview'); // 'overview', 'requests', 'users', 'performance'
  const [timeFilter, setTimeFilter] = useState('all'); // 'all', 'last24h', 'last7d', 'last30d'
  const [previousFiles, setPreviousFiles] = useState([]);

  // Load previous files from localStorage on component mount
  useEffect(() => {
    const storedFiles = localStorage.getItem('previousFiles');
    if (storedFiles) {
      try {
        setPreviousFiles(JSON.parse(storedFiles));
      } catch (e) {
        console.error('Error parsing stored files:', e);
      }
    }
    
    // Set dark mode based on user preference or system preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setIsDarkMode(savedDarkMode === 'true');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
    
    // Apply dark mode to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Handle file upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setIsUploading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('logfile', file);

    try {
      // Store file content in localStorage for future use
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          // Store file content and metadata (limit to files under 5MB)
          if (file.size < 5 * 1024 * 1024) {
            const fileCache = {
              content: event.target.result,
              lastModified: file.lastModified,
              type: file.type,
              size: file.size
            };
            localStorage.setItem(`file_${file.name}`, JSON.stringify(fileCache));
          }
        } catch (err) {
          console.error('Error saving file to localStorage:', err);
          // Continue with upload even if caching fails
        }
      };
      reader.readAsText(file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to upload file');
      }

      const data = await res.json();
      setResult(data);
      setError(null);
      
      // Save file to previous files with more metadata
      const newFile = {
        name: file.name,
        lastModified: file.lastModified,
        size: file.size,
        lastUsed: new Date().toISOString()
      };
      const updatedFiles = [...previousFiles.filter(f => f.name !== file.name), newFile].slice(-5); // Keep last 5 files
      setPreviousFiles(updatedFiles);
      localStorage.setItem('previousFiles', JSON.stringify(updatedFiles));
      
    } catch (err) {
      setError(err.message || 'Error uploading file');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };
  
  // Handle selection of a previous file
  const handlePreviousFileSelect = (selectedFile) => {
    // Check if we have the actual file (browser might have cached it)
    const cachedFile = localStorage.getItem(`file_${selectedFile.name}`);
    
    if (cachedFile) {
      // If we have a cached version, use it
      try {
        const fileData = JSON.parse(cachedFile);
        // Convert the stored data back to a File object
        const reconstructedFile = new File(
          [new Blob([fileData.content], { type: 'text/plain' })],
          selectedFile.name,
          { lastModified: selectedFile.lastModified || new Date().getTime() }
        );
        
        setFile(reconstructedFile);
        // Auto-trigger the analysis
        setTimeout(() => {
          const form = document.querySelector('form');
          if (form) form.dispatchEvent(new Event('submit', { cancelable: true }));
        }, 100);
        return;
      } catch (err) {
        console.error('Error reconstructing file:', err);
      }
    }
    
    // Alternative approach - show a file input dialog pre-filled with the filename
    setFile(null); // Clear any existing file
    setError(null); // Clear any existing errors
    
    // Create a temporary file input to trigger file selection
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.log,.txt';
    
    // When file is selected, set it and submit the form
    input.onchange = (e) => {
      if (e.target.files.length) {
        setFile(e.target.files[0]);
        // If the selected filename matches what we expect
        if (e.target.files[0].name === selectedFile.name) {
          // Auto-trigger the analysis
          setTimeout(() => {
            const form = document.querySelector('form');
            if (form) form.dispatchEvent(new Event('submit', { cancelable: true }));
          }, 100);
        }
      }
    };
    
    // Trigger the file selection dialog
    input.click();
  };

  // Handle removal of a file from the recent files list
  const handleRemoveRecentFile = (fileToRemove) => {
    // Filter out the file to remove
    const updatedFiles = previousFiles.filter(f => f.name !== fileToRemove.name);
    setPreviousFiles(updatedFiles);
    
    // Update localStorage
    localStorage.setItem('previousFiles', JSON.stringify(updatedFiles));
    
    // Also remove the cached file content
    try {
      localStorage.removeItem(`file_${fileToRemove.name}`);
    } catch (err) {
      console.error('Error removing file from localStorage:', err);
    }
  };

  // Helper function to prepare status chart data
  const prepareStatusChartData = () => {
    if (!result || !result.statusCounts) return null;
    
    const statusCodes = Object.keys(result.statusCounts).sort();
    const counts = statusCodes.map(code => result.statusCounts[code]);
    const backgroundColor = getChartColors(statusCodes.length, isDarkMode);
    
    return {
      labels: statusCodes.map(code => {
        if (code.startsWith('2')) return `${code} (Success)`;
        if (code.startsWith('3')) return `${code} (Redirect)`;
        if (code.startsWith('4')) return `${code} (Client Error)`;
        if (code.startsWith('5')) return `${code} (Server Error)`;
        return code;
      }),
      datasets: [{
        data: counts,
        backgroundColor,
        borderColor: isDarkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        borderWidth: 1
      }]
    };
  };

  // Helper function to prepare URL chart data
  const prepareUrlChartData = () => {
    if (!result || !result.topUrls || !result.topUrls.length) return null;
    
    return {
      labels: result.topUrls.map(item => item.url),
      datasets: [{
        label: 'Request Count',
        data: result.topUrls.map(item => item.count),
        backgroundColor: getChartColors(5, isDarkMode)[0],
        borderColor: isDarkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        borderWidth: 1
      }]
    };
  };

  // Helper function to prepare user chart data
  const prepareUserChartData = () => {
    if (!result || !result.topUsers || result.topUsers.length === 0) return null;
    
    // Get top 5 users for the chart
    const topUsers = result.topUsers.slice(0, 5);
    
    // If there are more users, add an "Others" category
    let othersCount = 0;
    if (result.topUsers.length > 5) {
      for (let i = 5; i < result.topUsers.length; i++) {
        othersCount += result.topUsers[i].count;
      }
    }
    
    const labels = topUsers.map(user => {
      // Truncate long email addresses for better display
      const email = user.email.length > 20 ? user.email.substring(0, 17) + '...' : user.email;
      return email;
    });
    
    if (othersCount > 0) {
      labels.push('Others');
    }
    
    const colors = [
      'rgba(54, 162, 235, 0.8)',   // Blue
      'rgba(255, 99, 132, 0.8)',   // Red
      'rgba(75, 192, 192, 0.8)',   // Green
      'rgba(255, 159, 64, 0.8)',   // Orange
      'rgba(153, 102, 255, 0.8)',  // Purple
      'rgba(201, 203, 207, 0.8)'   // Gray (for Others)
    ];
    
    const data = topUsers.map(user => user.count);
    if (othersCount > 0) {
      data.push(othersCount);
    }
    
    return {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: colors,
          borderColor: isDarkMode ? 'rgba(30, 41, 59, 1)' : 'white',
          borderWidth: 2,
          hoverOffset: 4
        }
      ]
    };
  };

  // Helper function to prepare URL groups chart data
  const prepareUrlGroupsChartData = () => {
    if (!result || !result.topUrlGroups || !result.topUrlGroups.length) return null;
    
    return {
      labels: result.topUrlGroups.map(item => item.pattern),
      datasets: [{
        label: 'Request Count',
        data: result.topUrlGroups.map(item => item.count),
        backgroundColor: getChartColors(result.topUrlGroups.length, isDarkMode),
        borderColor: isDarkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        borderWidth: 1
      }]
    };
  };

  // Helper function to prepare hourly activity chart data
  const prepareHourlyActivityChartData = () => {
    if (!result || !result.hourlyActivity) return null;
    
    return {
      labels: result.hourlyActivity.map(item => `${item.hour}:00`),
      datasets: [{
        label: 'Requests',
        data: result.hourlyActivity.map(item => item.count),
        backgroundColor: getChartColors(1, isDarkMode)[0],
        borderColor: isDarkMode ? '#60a5fa' : '#3b82f6',
        borderWidth: 2,
        tension: 0.3,
        fill: true
      }]
    };
  };

  // Helper function to prepare response time distribution chart data
  const prepareResponseTimeDistributionChartData = () => {
    if (!result || !result.responseTimeDistribution) return null;
    
    const colors = ['#10b981', '#60a5fa', '#a78bfa', '#fbbf24', '#f97316', '#ef4444', '#64748b'];
    
    return {
      labels: result.responseTimeDistribution.map(item => item.label),
      datasets: [{
        label: 'Request Count',
        data: result.responseTimeDistribution.map(item => item.count),
        backgroundColor: isDarkMode 
          ? colors.map(color => color + '80') // Add transparency
          : colors,
        borderColor: isDarkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        borderWidth: 1
      }]
    };
  };

  // Helper function to prepare status code ratio chart data
  const prepareStatusCodeRatioChartData = () => {
    if (!result) return null;
    
    return {
      labels: ['Success (2xx)', 'Redirects (3xx)', 'Client Errors (4xx)', 'Server Errors (5xx)'],
      datasets: [{
        data: [
          result.successRate || 0,
          100 - ((result.successRate || 0) + (result.clientErrorRate || 0) + (result.errorRate || 0)),
          result.clientErrorRate || 0,
          result.errorRate || 0
        ],
        backgroundColor: [
          isDarkMode ? '#34d399' : '#10b981',  // Success
          isDarkMode ? '#60a5fa' : '#3b82f6',  // Redirects
          isDarkMode ? '#fbbf24' : '#f59e0b',  // Client errors
          isDarkMode ? '#f87171' : '#ef4444',  // Server errors
        ],
        borderColor: isDarkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        borderWidth: 1
      }]
    };
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        {/* Main Content */}
        <main className="grid grid-cols-1 gap-8">
          {/* Top Panel - Log Input */}
          <LogUpload 
            file={file} 
            handleUpload={handleUpload} 
            isUploading={isUploading} 
            error={error} 
            setFile={setFile} 
            previousFiles={previousFiles} 
            handlePreviousFileSelect={handlePreviousFileSelect} 
            handleRemoveRecentFile={handleRemoveRecentFile}
          />

          {/* Bottom Panel - Results */}
          {result && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Analysis Results</h2>
              
              {/* Time filter */}
              <TimeFilter 
                timeFilter={timeFilter} 
                setTimeFilter={setTimeFilter} 
                timeSpan={result.timeSpan} 
              />
              
              {/* Analysis Tabs */}
              <AnalysisTabs 
                analysisTab={analysisTab} 
                setAnalysisTab={setAnalysisTab} 
              />
              
              {/* Tab Content */}
              {analysisTab === 'overview' && (
                <OverviewTab 
                  result={result} 
                  formatDuration={formatDuration} 
                  prepareStatusChartData={prepareStatusChartData} 
                  prepareStatusCodeRatioChartData={prepareStatusCodeRatioChartData} 
                  isDarkMode={isDarkMode} 
                />
              )}
              
              {analysisTab === 'requests' && (
                <RequestsTab 
                  result={result} 
                  prepareUrlChartData={prepareUrlChartData} 
                  prepareUrlGroupsChartData={prepareUrlGroupsChartData} 
                  prepareHourlyActivityChartData={prepareHourlyActivityChartData} 
                  isDarkMode={isDarkMode} 
                />
              )}
              
              {analysisTab === 'users' && result.topUsers && result.topUsers.length > 0 && (
                <UsersTab 
                  result={result} 
                  prepareUserChartData={prepareUserChartData} 
                  isDarkMode={isDarkMode} 
                />
              )}
              
              {analysisTab === 'performance' && (
                <PerformanceTab 
                  result={result} 
                  prepareResponseTimeDistributionChartData={prepareResponseTimeDistributionChartData} 
                  isDarkMode={isDarkMode} 
                />
              )}
            </div>
          )}
          
          {!result && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-lg">Upload a log file to see analysis results</p>
                <p className="mt-2 max-w-md text-center text-sm">
                  The analyzer supports both custom log formats and standard Apache/Nginx formats
                </p>
              </div>
            </div>
          )}
        </main>
        
        {/* Footer */}
        <footer className="mt-12 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Log Analyzer &copy; {new Date().getFullYear()} - Built with Next.js</p>
        </footer>
      </div>
    </div>
  );
}
