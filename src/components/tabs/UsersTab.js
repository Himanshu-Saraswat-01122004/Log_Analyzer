'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { motion } from 'framer-motion';

export default function UsersTab({ result, prepareUserChartData, isDarkMode }) {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Users Summary */}
      <motion.div variants={item}>
        <div className="flex items-center mb-5">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
          </div>
          <h3 className="ml-4 text-xl font-semibold text-gray-800 dark:text-gray-100">User Activity Overview</h3>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
        >
          <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            <motion.div 
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-900/30 dark:to-gray-800 p-5 rounded-xl shadow-sm border border-indigo-100 dark:border-indigo-800/50 transition-all duration-200"
            >
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mr-3 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 dark:text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Active Users</div>
              </div>
              <div className="text-3xl font-bold text-gray-800 dark:text-gray-200 flex items-baseline">
                {result.topUsers.length}
                <span className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">users</span>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/30 dark:to-gray-800 p-5 rounded-xl shadow-sm border border-purple-100 dark:border-purple-800/50 transition-all duration-200"
            >
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mr-3 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-sm font-medium text-purple-600 dark:text-purple-400">Most Active User</div>
              </div>
              <div className="text-xl font-bold text-gray-800 dark:text-gray-200 truncate">
                {result.topUsers.length > 0 ? result.topUsers[0].email : 'N/A'}
              </div>
              {result.topUsers.length > 0 && (
                <div className="text-xs text-purple-500 dark:text-purple-400 mt-1">
                  <span className="inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    Top contributor
                  </span>
                </div>
              )}
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/30 dark:to-gray-800 p-5 rounded-xl shadow-sm border border-blue-100 dark:border-blue-800/50 transition-all duration-200"
            >
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM9 4a9 9 0 00-9 9v3h3v-3a6 6 0 00-6-6H2v3a6 6 0 006 6h3v-3a9 9 0 009-9z" />
                  </svg>
                </div>
                <div className="text-sm font-medium text-blue-600 dark:text-blue-400">Top User Requests</div>
              </div>
              <div className="text-3xl font-bold text-gray-800 dark:text-gray-200 flex items-baseline">
                {result.topUsers.length > 0 ? result.topUsers[0].count.toLocaleString() : 'N/A'}
                <span className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">requests</span>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="p-6 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/20 dark:to-purple-900/20 border-t border-indigo-100 dark:border-indigo-800/30"
          >
            <h4 className="font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              User Insights
            </h4>
            <ul className="space-y-3">
              {result.topUsers && result.topUsers.length > 0 && (
                <motion.li 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-start p-3 bg-white dark:bg-gray-800 rounded-lg border border-indigo-100 dark:border-indigo-800/30 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      <strong className="text-indigo-600 dark:text-indigo-400">{result.topUsers[0].email}</strong> is the most active user, making up <strong className="text-indigo-600 dark:text-indigo-400">{Math.round((result.topUsers[0].count / result.totalRequests) * 100)}%</strong> of all requests.
                    </p>
                    <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div 
                        className="bg-indigo-600 dark:bg-indigo-500 h-1.5 rounded-full" 
                        style={{ width: `${Math.round((result.topUsers[0].count / result.totalRequests) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </motion.li>
              )}
              
              {result.topUsers && result.topUsers.length > 1 && (
                <motion.li 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start p-3 bg-white dark:bg-gray-800 rounded-lg border border-purple-100 dark:border-purple-800/30 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      The top 3 users account for approximately <strong className="text-purple-600 dark:text-purple-400">{
                        Math.round(result.topUsers.slice(0, 3).reduce((sum, user) => sum + user.count, 0) / result.totalRequests * 100)
                      }%</strong> of the total traffic.
                    </p>
                    <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div 
                        className="bg-purple-600 dark:bg-purple-500 h-1.5 rounded-full" 
                        style={{ width: `${Math.round(result.topUsers.slice(0, 3).reduce((sum, user) => sum + user.count, 0) / result.totalRequests * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </motion.li>
              )}
              
              {result.topUsers && result.topUsers.some(user => user.count > result.totalRequests * 0.5) && (
                <motion.li 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-start p-3 bg-white dark:bg-gray-800 rounded-lg border border-amber-100 dark:border-amber-800/30 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      Traffic is <strong className="text-amber-600 dark:text-amber-400">heavily dominated</strong> by a single user. This may indicate automated activity or API usage.
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold px-2 py-1 bg-amber-50 dark:bg-amber-900/30 rounded-full">
                        Consider investigating
                      </span>
                    </div>
                  </div>
                </motion.li>
              )}
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* User Distribution Chart */}
      <motion.div variants={item}>
        <div className="flex items-center mb-5">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
          </div>
          <h3 className="ml-4 text-xl font-semibold text-gray-800 dark:text-gray-100">User Distribution</h3>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
        >
          <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div className="flex flex-col justify-center">
              <div className="h-72 mb-4">
                {prepareUserChartData() && <Pie 
                  data={(() => {
                    // Create enhanced data with better visibility for current mode
                    const chartData = prepareUserChartData();
                    if (chartData && chartData.datasets && chartData.datasets[0]) {
                      // Create a deep copy to prevent modifying the original
                      const enhancedData = JSON.parse(JSON.stringify(chartData));
                      
                      // Ensure the colors have good contrast in both modes
                      enhancedData.datasets[0].backgroundColor = enhancedData.datasets[0].backgroundColor.map(color => {
                        if (color.startsWith('rgba')) {
                          if (isDarkMode) {
                            // Brighten colors for dark mode
                            return color.replace(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/, 
                              (_, r, g, b, a) => `rgba(${Math.min(parseInt(r) + 50, 255)}, ${Math.min(parseInt(g) + 50, 255)}, ${Math.min(parseInt(b) + 50, 255)}, ${a})`
                            );
                          } else {
                            // Deepen colors for light mode for better contrast
                            return color.replace(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/, 
                              (_, r, g, b, a) => `rgba(${Math.max(parseInt(r) - 30, 0)}, ${Math.max(parseInt(g) - 30, 0)}, ${Math.max(parseInt(b) - 30, 0)}, ${a})`
                            );
                          }
                        }
                        return color;
                      });
                      
                      // Ensure labels are clear and distinct
                      enhancedData.labels = enhancedData.labels.map(label => {
                        // Add spaces around @ for better readability
                        return label.replace(/@/g, ' @ ');
                      });
                      
                      return enhancedData;
                    }
                    return chartData;
                  })()}
                  options={{
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          color: isDarkMode ? '#e5e7eb' : '#000000',
                          boxWidth: 14,
                          padding: 15,
                          font: {
                            size: 12,
                            weight: 'bold',
                            family: 'system-ui, sans-serif'
                          },
                          usePointStyle: true,
                          generateLabels: function(chart) {
                            const data = chart.data;
                            if (data.labels.length && data.datasets.length) {
                              return data.labels.map(function(label, i) {
                                const value = data.datasets[0].data[i];
                                const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                
                                return {
                                  text: `${label} (${percentage}%)`,
                                  fillStyle: data.datasets[0].backgroundColor[i],
                                  hidden: false,
                                  index: i,
                                  // Force high contrast colors for text
                                  fontColor: isDarkMode ? '#ffffff' : '#000000',
                                  // Add text outline/shadow for better readability on all backgrounds
                                  strokeStyle: isDarkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)',
                                  lineWidth: 3
                                };
                              });
                            }
                            return [];
                          }
                        }
                      },
                      tooltip: {
                        backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                        titleColor: isDarkMode ? '#e5e7eb' : '#1f2937',
                        bodyColor: isDarkMode ? '#e5e7eb' : '#1f2937',
                        borderColor: isDarkMode ? 'rgba(55, 65, 81, 1)' : 'rgba(229, 231, 235, 1)',
                        borderWidth: 1,
                        padding: 12,
                        boxPadding: 6,
                        cornerRadius: 8,
                        titleFont: {
                          weight: 'bold',
                          size: 13
                        },
                        bodyFont: {
                          size: 12
                        },
                        callbacks: {
                          label: function(context) {
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${context.label}: ${value.toLocaleString()} (${percentage}%)`;
                          }
                        }
                      }
                    },
                    cutout: '50%',
                    maintainAspectRatio: false,
                    animation: {
                      animateScale: true,
                      animateRotate: true
                    },
                    elements: {
                      arc: {
                        borderWidth: 2,
                        borderColor: isDarkMode ? '#374151' : '#ffffff'
                      }
                    }
                  }} 
                />}
              </div>
              {result.topUsers && result.topUsers.length > 0 && (
                <div className="px-4 py-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30 text-sm text-blue-800 dark:text-blue-300">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Total requests analyzed: <span className="ml-1 font-semibold">{result.totalRequests.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
          
            <div className="overflow-auto rounded-lg border border-gray-100 dark:border-gray-700 shadow-inner bg-gray-50 dark:bg-gray-900/30 max-h-96">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 sticky top-0 z-10">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">User</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Requests</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Percentage</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Activity</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                  {result.topUsers && result.topUsers.map((user, index) => (
                    <motion.tr 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/40 dark:to-blue-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-200 dark:border-indigo-800/30">
                            {user.email.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.email}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">User ID: {index + 1}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{user.count.toLocaleString()}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {index === 0 ? 'Highest' : `${(user.count / result.topUsers[0].count * 100).toFixed(1)}% of top`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            {Math.round((user.count / result.totalRequests) * 100)}%
                          </div>
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            index === 0 
                              ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300' 
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                            {index === 0 ? 'Top' : `#${index + 1}`}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 overflow-hidden">
                          <div 
                            className={`h-2.5 rounded-full ${index === 0 
                              ? 'bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-indigo-500 dark:to-blue-500' 
                              : 'bg-indigo-400 dark:bg-indigo-500'}`}
                            style={{ 
                              width: `${Math.max(5, Math.round((user.count / result.topUsers[0].count) * 100))}%`
                            }}
                          ></div>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
