'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Import components
import Header from '../components/Header';
import LogUpload from '../components/LogUpload';
import AnalysisTabs from '../components/AnalysisTabs';
import TimeFilter from '../components/TimeFilter';
import Footer from '../components/Footer';
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

  // Refs for managing animations and transitions
  const initialLoadComplete = useRef(false);
  const darkModeTransition = useRef(null);

  // Load previous files from localStorage and set up dark mode on component mount
  useEffect(() => {
    // Smooth page entrance
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    // Load previous files with error handling
    try {
      const storedFiles = localStorage.getItem('previousFiles');
      if (storedFiles) {
        setPreviousFiles(JSON.parse(storedFiles));
      }
    } catch (e) {
      console.error('Error loading stored files:', e);
      // Silently recover - don't disrupt user experience for this non-critical feature
    }
    
    // Set dark mode with enhanced preference detection
    const configureTheme = () => {
      try {
        const savedDarkMode = localStorage.getItem('darkMode');
        
        if (savedDarkMode !== null) {
          setIsDarkMode(savedDarkMode === 'true');
        } else {
          // Check system preference with more reliable detection
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
          setIsDarkMode(prefersDark.matches);
          
          // Listen for system theme changes
          prefersDark.addEventListener('change', (e) => {
            if (!localStorage.getItem('darkMode')) { // Only update if user hasn't set a preference
              setIsDarkMode(e.matches);
              applyTheme(e.matches);
            }
          });
        }
      } catch (err) {
        console.error('Error setting theme preference:', err);
        // Default to light mode if there's an issue
        setIsDarkMode(false);
      }
    };
    
    // Apply theme with smooth transitions
    const applyTheme = (isDark) => {
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Add subtle animation for background color transition
      clearTimeout(darkModeTransition.current);
      darkModeTransition.current = setTimeout(() => {
        initialLoadComplete.current = true;
      }, 300);
    };
    
    configureTheme();
    applyTheme(isDarkMode);
    
    return () => {
      // Cleanup event listeners on unmount
      try {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        prefersDark.removeEventListener('change', applyTheme);
      } catch (err) {
        // Ignore errors during cleanup
      }
    };
  }, []);  // Empty dependency array for mounting only
  
  // Effect to handle theme changes
  useEffect(() => {
    if (initialLoadComplete.current) {
      // Apply dark mode to document with transition animation
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [isDarkMode]);

  // Toggle dark mode with enhanced animations
  const toggleDarkMode = () => {
    // Create a smooth flash effect for theme transition
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.backgroundColor = isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)';
    flash.style.zIndex = '9999';
    flash.style.pointerEvents = 'none';
    flash.style.opacity = '0';
    flash.style.transition = 'opacity 0.2s ease-in-out';
    document.body.appendChild(flash);
    
    // Trigger flash animation
    setTimeout(() => {
      flash.style.opacity = '1';
      setTimeout(() => {
        flash.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(flash);
        }, 200);
      }, 100);
    }, 0);
    
    // Toggle the theme state
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    // Save preference to localStorage with enhanced error handling
    try {
      localStorage.setItem('darkMode', newDarkMode.toString());
    } catch (err) {
      console.error('Could not save theme preference', err);
      // Continue with theme change even if saving fails
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

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 260, damping: 20 } 
    }
  };

  // Animation for tab content
  const tabContentVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, ease: 'easeOut' } 
    },
    exit: { 
      opacity: 0, 
      x: 5,
      transition: { duration: 0.2 } 
    }
  };
  
  return (
    <motion.div 
      className={`min-h-screen relative ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ 
        backgroundImage: isDarkMode 
          ? 'radial-gradient(circle at 100% 0%, rgba(78, 63, 146, 0.03) 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(78, 63, 146, 0.03) 0%, transparent 50%)'
          : 'radial-gradient(circle at 100% 0%, rgba(79, 70, 229, 0.03) 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(79, 70, 229, 0.03) 0%, transparent 50%)'
      }}
    >
      {/* Decorative blobs - subtle background elements */}
      <div className="fixed top-0 right-0 w-1/4 h-1/4 bg-gradient-to-br from-indigo-500/5 to-purple-600/5 rounded-full filter blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
      <div className="fixed bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-br from-purple-500/5 to-indigo-600/5 rounded-full filter blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        </motion.div>

        {/* Main Content */}
        <motion.main 
          className="grid grid-cols-1 gap-8 mt-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Top Panel - Log Input */}
          <motion.div variants={itemVariants}>
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
          </motion.div>

          {/* Bottom Panel - Results - Animate presence for smooth transitions */}
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div 
                key="results"
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 overflow-hidden relative"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20, 
                  delay: 0.2 
                }}
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-purple-50/30 dark:from-indigo-900/10 dark:to-purple-900/10 -z-10"></div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center mb-6">
                    <div className="relative mr-3 flex-shrink-0 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-md flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2h10a1 1 0 100-2H3zm0 4a1 1 0 000 2h6a1 1 0 100-2H3zm0 4a1 1 0 100 2h10a1 1 0 100-2H3z" clipRule="evenodd" />
                      </svg>
                      <div className="absolute -right-1 -top-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800"></div>
                    </div>
                    <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-300 dark:to-purple-300">
                      Analysis Results
                    </h2>
                  </div>
                  
                  {/* Time filter with animation */}
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
                  
                  {/* Tab Content with AnimatePresence for smooth tab transitions */}
                  <div className="relative">
                    <AnimatePresence mode="wait">
                      {analysisTab === 'overview' && (
                        <motion.div
                          key="overview"
                          variants={tabContentVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <OverviewTab 
                            result={result} 
                            formatDuration={formatDuration} 
                            prepareStatusChartData={prepareStatusChartData} 
                            prepareStatusCodeRatioChartData={prepareStatusCodeRatioChartData} 
                            isDarkMode={isDarkMode} 
                          />
                        </motion.div>
                      )}
                      
                      {analysisTab === 'requests' && (
                        <motion.div
                          key="requests"
                          variants={tabContentVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <RequestsTab 
                            result={result} 
                            prepareUrlChartData={prepareUrlChartData} 
                            prepareUrlGroupsChartData={prepareUrlGroupsChartData} 
                            prepareHourlyActivityChartData={prepareHourlyActivityChartData} 
                            isDarkMode={isDarkMode} 
                          />
                        </motion.div>
                      )}
                      
                      {analysisTab === 'users' && result.topUsers && result.topUsers.length > 0 && (
                        <motion.div
                          key="users"
                          variants={tabContentVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <UsersTab 
                            result={result} 
                            prepareUserChartData={prepareUserChartData} 
                            isDarkMode={isDarkMode} 
                          />
                        </motion.div>
                      )}
                      
                      {analysisTab === 'performance' && (
                        <motion.div
                          key="performance"
                          variants={tabContentVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <PerformanceTab 
                            result={result} 
                            prepareResponseTimeDistributionChartData={prepareResponseTimeDistributionChartData} 
                            isDarkMode={isDarkMode} 
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty-state"
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20, 
                  delay: 0.2 
                }}
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-purple-50/30 dark:from-indigo-900/10 dark:to-purple-900/10 -z-10"></div>
                
                <motion.div 
                  className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    className="relative mb-6"
                  >
                    <div className="absolute inset-0 bg-indigo-500/20 dark:bg-indigo-600/20 rounded-full blur-xl transform -translate-y-1 scale-90"></div>
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full p-5 shadow-lg relative">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </motion.div>
                  
                  <motion.p 
                    className="text-xl font-medium text-gray-700 dark:text-gray-200"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    Upload a log file to see analysis results
                  </motion.p>
                  
                  <motion.p 
                    className="mt-3 max-w-md text-center text-sm text-gray-500 dark:text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ delay: 0.9 }}
                  >
                    The analyzer supports both custom log formats and standard Apache/Nginx formats
                  </motion.p>
                  
                  <motion.div 
                    className="mt-6 flex flex-wrap justify-center gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Apache
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Nginx
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                        <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                        <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                      </svg>
                      Custom Formats
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.main>
        
        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Footer />
        </motion.div>
      </div>
    </motion.div>
  );
}
