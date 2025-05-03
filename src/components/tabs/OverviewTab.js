'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { motion } from 'framer-motion';

export default function OverviewTab({ result, formatDuration, prepareStatusChartData, prepareStatusCodeRatioChartData, isDarkMode }) {
  // Animations for staggered children
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
    >
      {/* Summary metrics */}
      <motion.div variants={item} className="mb-8">
        <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
          Summary Dashboard
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div 
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Requests</div>
            </div>
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{result.totalRequests.toLocaleString()}</div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Success Rate</div>
            </div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{result.successRate}%</div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Avg Response Time</div>
            </div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{result.avgResponseTime ? `${result.avgResponseTime.toFixed(2)} ms` : 'N/A'}</div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600 dark:text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Active Users</div>
            </div>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{result.topUsers ? result.topUsers.length : 0}</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Performance Summary */}
      <motion.div variants={item} className="mb-8">
        <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Performance Summary
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200"
          >
            <h4 className="font-medium mb-4 text-gray-800 dark:text-gray-200 flex items-center">
              <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </span>
              Response Time Metrics
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center group hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-md transition-colors duration-200">
                <span className="text-sm text-gray-600 dark:text-gray-400">Min Response Time</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{result.minResponseTime} ms</span>
              </div>
              <div className="flex justify-between items-center group hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-md transition-colors duration-200">
                <span className="text-sm text-gray-600 dark:text-gray-400">Average Response Time</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{result.avgResponseTime ? `${result.avgResponseTime.toFixed(2)} ms` : 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center group hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-md transition-colors duration-200">
                <span className="text-sm text-gray-600 dark:text-gray-400">Median Response Time</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{result.medianResponseTime} ms</span>
              </div>
              <div className="flex justify-between items-center group hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-md transition-colors duration-200">
                <span className="text-sm text-gray-600 dark:text-gray-400">95th Percentile</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{result.p95ResponseTime} ms</span>
              </div>
              <div className="flex justify-between items-center group hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-md transition-colors duration-200">
                <span className="text-sm text-gray-600 dark:text-gray-400">Max Response Time</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{result.maxResponseTime} ms</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200"
          >
            <h4 className="font-medium mb-4 text-gray-800 dark:text-gray-200 flex items-center">
              <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 10a8 8 0 018-8v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              </span>
              Status Code Distribution
            </h4>
            <div className="h-64">
              {prepareStatusCodeRatioChartData() && <Pie data={prepareStatusCodeRatioChartData()} options={{
                plugins: {
                  legend: {
                    position: 'right',
                    labels: {
                      color: isDarkMode ? '#e5e7eb' : '#1f2937',
                      boxWidth: 15,
                      padding: 15,
                      font: {
                        size: 11
                      }
                    }
                  },
                  tooltip: {
                    backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                    titleColor: isDarkMode ? '#e5e7eb' : '#1f2937',
                    bodyColor: isDarkMode ? '#e5e7eb' : '#1f2937',
                    borderColor: isDarkMode ? 'rgba(55, 65, 81, 1)' : 'rgba(229, 231, 235, 1)',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: true,
                    boxWidth: 10,
                    boxHeight: 10,
                    usePointStyle: true,
                  }
                },
                cutout: '60%',
                maintainAspectRatio: false
              }} />}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Status Code Stats */}
      <motion.div variants={item} className="mb-8">
        <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          HTTP Status Codes
        </h3>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200"
        >
          <div className="h-64 mb-4">
            {prepareStatusChartData() && <Pie data={prepareStatusChartData()} options={{
              plugins: {
                legend: {
                  position: 'right',
                  labels: {
                    color: isDarkMode ? '#e5e7eb' : '#1f2937',
                    boxWidth: 15,
                    padding: 15,
                    font: {
                      size: 11
                    }
                  }
                },
                tooltip: {
                  backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                  titleColor: isDarkMode ? '#e5e7eb' : '#1f2937',
                  bodyColor: isDarkMode ? '#e5e7eb' : '#1f2937',
                  borderColor: isDarkMode ? 'rgba(55, 65, 81, 1)' : 'rgba(229, 231, 235, 1)',
                  borderWidth: 1,
                  padding: 12,
                  cornerRadius: 8,
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
              cutout: '40%',
              maintainAspectRatio: false
            }} />}
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(result.statusCounts || {}).map(([code, count]) => (
              <motion.div 
                key={code} 
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="text-center bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-100 dark:border-gray-600"
              >
                <div className={`text-sm font-medium rounded-full py-1 px-2 inline-block mb-1 ${
                  code.startsWith('2') ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  code.startsWith('3') ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                  code.startsWith('4') ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {code}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">{count.toLocaleString()} requests</div>
                <div className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                  {Math.round((count / result.totalRequests) * 100)}% of total
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Security Issues */}
      {result.securityIssues && result.securityIssues.length > 0 && (
        <motion.div 
          variants={item}
          className="mb-8"
        >
          <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 002 0V7z" clipRule="evenodd" />
            </svg>
            Security Alerts
          </h3>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-l-4 border-red-500"
          >
            <div className="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <h4 className="font-medium text-lg text-red-700 dark:text-red-400">Potential Security Issues Detected</h4>
            </div>
            <ul className="space-y-4">
              {result.securityIssues.map((issue, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start bg-red-50 dark:bg-red-900/10 p-3 rounded-lg"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className={`inline-block w-6 h-6 rounded-full flex-shrink-0 mr-3 flex items-center justify-center ${
                    issue.severity === 'high' ? 'bg-red-100 dark:bg-red-900' :
                    issue.severity === 'medium' ? 'bg-orange-100 dark:bg-orange-900' :
                    'bg-yellow-100 dark:bg-yellow-900'
                  }`}>
                    <span className={`block w-3 h-3 rounded-full ${
                      issue.severity === 'high' ? 'bg-red-500' :
                      issue.severity === 'medium' ? 'bg-orange-500' :
                      'bg-yellow-500'
                    }`}></span>
                  </span>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-gray-100 flex items-center flex-wrap">
                      {issue.type} 
                      <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                        issue.severity === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                        issue.severity === 'medium' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {issue.severity}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{issue.message}</div>
                    {issue.count && (
                      <div className="mt-2 flex items-center">
                        <div className="text-xs text-gray-500 dark:text-gray-500 mr-2">Occurrence count:</div>
                        <div className="flex-1">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${
                                issue.severity === 'high' ? 'bg-red-500' :
                                issue.severity === 'medium' ? 'bg-orange-500' :
                                'bg-yellow-500'
                              }`}
                              style={{ width: `${Math.min(100, issue.count * 5)}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="ml-2 text-xs font-medium text-gray-600 dark:text-gray-400">{issue.count}</div>
                      </div>
                    )}
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
