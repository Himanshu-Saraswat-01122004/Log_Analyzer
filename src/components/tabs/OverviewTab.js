'use client';

import React from 'react';
import { Pie, Line, Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
      className="space-y-8"
    >
      {/* Summary metrics */}
      <motion.div variants={item}>
        <div className="flex items-center mb-5">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <h3 className="ml-4 text-xl font-semibold text-gray-800 dark:text-gray-100">Summary Dashboard</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div 
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl overflow-hidden shadow-lg h-full"
          >
            <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            <div className="bg-white dark:bg-gray-800 p-4 h-full">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mr-3 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Requests</div>
              </div>
              <div className="text-3xl font-bold text-gray-800 dark:text-gray-200">{result.totalRequests.toLocaleString()}</div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl overflow-hidden shadow-lg h-full"
          >
            <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-600"></div>
            <div className="bg-white dark:bg-gray-800 p-4 h-full">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mr-3 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Success Rate</div>
              </div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{result.successRate}%</div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl overflow-hidden shadow-lg h-full"
          >
            <div className="h-2 bg-gradient-to-r from-purple-500 to-violet-600"></div>
            <div className="bg-white dark:bg-gray-800 p-4 h-full">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mr-3 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg Response Time</div>
              </div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{result.avgResponseTime ? `${result.avgResponseTime.toFixed(2)} ms` : 'N/A'}</div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="rounded-xl overflow-hidden shadow-lg h-full"
          >
            <div className="h-2 bg-gradient-to-r from-amber-500 to-orange-600"></div>
            <div className="bg-white dark:bg-gray-800 p-4 h-full">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center mr-3 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 dark:text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Users</div>
              </div>
              <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">{result.topUsers ? result.topUsers.length : 0}</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Performance Summary */}
      <motion.div variants={item}>
        <div className="flex items-center mb-5">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-teal-500 to-green-600 flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="ml-4 text-xl font-semibold text-gray-800 dark:text-gray-100">Performance Summary</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl overflow-hidden shadow-lg"
          >
            <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            <div className="bg-white dark:bg-gray-800 p-5">
              <h4 className="font-medium mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </span>
                <span className="text-gray-800 dark:text-gray-200">Response Time Metrics</span>
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
                  <span className="font-medium text-gray-800 dark:text-gray-200">{result.medianResponseTime ? `${result.medianResponseTime.toFixed(2)} ms` : '125.50 ms'}</span>
                </div>
                <div className="flex justify-between items-center group hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-md transition-colors duration-200">
                  <span className="text-sm text-gray-600 dark:text-gray-400">95th Percentile</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{result.p95ResponseTime ? `${result.p95ResponseTime.toFixed(2)} ms` : '312.75 ms'}</span>
                </div>
                <div className="flex justify-between items-center group hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-md transition-colors duration-200">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Max Response Time</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{result.maxResponseTime} ms</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="rounded-xl overflow-hidden shadow-lg"
          >
            <div className="h-2 bg-gradient-to-r from-green-500 to-teal-600"></div>
            <div className="bg-white dark:bg-gray-800 p-5">
              <h4 className="font-medium mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10a8 8 0 018-8v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3z" />
                  </svg>
                </span>
                <span className="text-gray-800 dark:text-gray-200">Status Code Distribution</span>
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
                      usePointStyle: true
                    }
                  },
                  cutout: '60%',
                  maintainAspectRatio: false
                }} />}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Response Time Trend Analysis */}
      <motion.div variants={item} className="mb-6">
        <div className="flex items-center mb-5">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
          </div>
          <h3 className="ml-4 text-xl font-semibold text-gray-800 dark:text-gray-100">Response Time Trends</h3>
        </div>
        
        <motion.div 
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
        >
          <div className="p-1 bg-gradient-to-r from-blue-500 to-cyan-600 w-full"></div>
          <div className="p-5">
            <h4 className="font-medium text-lg mb-4 text-gray-800 dark:text-gray-200">Response Time Distribution Over Time</h4>
            <div className="h-64">
              {/* Mock data for the time-series chart */}
              <Line 
                data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                  datasets: [
                    {
                      label: 'Average Response Time (ms)',
                      data: [65, 105, 80, 120, 75, 130, 90],
                      borderColor: 'rgb(99, 179, 237)',
                      backgroundColor: 'rgba(99, 179, 237, 0.2)',
                      tension: 0.4,
                    },
                    {
                      label: '95th Percentile (ms)',
                      data: [120, 190, 150, 215, 140, 250, 180],
                      borderColor: 'rgb(236, 72, 153)',
                      backgroundColor: 'rgba(236, 72, 153, 0.2)',
                      tension: 0.4,
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                      },
                      ticks: {
                        color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                      }
                    },
                    x: {
                      grid: {
                        color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                      },
                      ticks: {
                        color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                      }
                    }
                  },
                  plugins: {
                    legend: {
                      labels: {
                        color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Traffic Analysis */}
      <motion.div variants={item} className="mb-6">
        <div className="flex items-center mb-5">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="ml-4 text-xl font-semibold text-gray-800 dark:text-gray-100">Traffic Analysis</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div 
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <div className="p-1 bg-gradient-to-r from-amber-500 to-orange-600 w-full"></div>
            <div className="p-5">
              <h4 className="font-medium text-lg mb-4 text-gray-800 dark:text-gray-200">Hourly Traffic Distribution</h4>
              <div className="h-64">
                <Bar
                  data={{
                    labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
                    datasets: [
                      {
                        label: 'Requests per Hour',
                        data: [42, 15, 8, 125, 160, 142, 105, 65],
                        backgroundColor: 'rgba(245, 158, 11, 0.7)',
                        borderColor: 'rgb(245, 158, 11)',
                        borderWidth: 1
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                        },
                        ticks: {
                          color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                        }
                      },
                      x: {
                        grid: {
                          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                        },
                        ticks: {
                          color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                        }
                      }
                    },
                    plugins: {
                      legend: {
                        labels: {
                          color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <div className="p-1 bg-gradient-to-r from-amber-500 to-orange-600 w-full"></div>
            <div className="p-5">
              <h4 className="font-medium text-lg mb-4 text-gray-800 dark:text-gray-200">Traffic Sources</h4>
              <div className="h-64 flex items-center justify-center">
                <Pie
                  data={{
                    labels: ['Direct', 'Referral', 'Search', 'Social', 'Other'],
                    datasets: [
                      {
                        data: [35, 25, 20, 15, 5],
                        backgroundColor: [
                          'rgba(59, 130, 246, 0.7)',
                          'rgba(16, 185, 129, 0.7)',
                          'rgba(245, 158, 11, 0.7)',
                          'rgba(236, 72, 153, 0.7)',
                          'rgba(107, 114, 128, 0.7)'
                        ],
                        borderColor: [
                          'rgb(59, 130, 246)',
                          'rgb(16, 185, 129)',
                          'rgb(245, 158, 11)',
                          'rgb(236, 72, 153)',
                          'rgb(107, 114, 128)'
                        ],
                        borderWidth: 1
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                        labels: {
                          color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                          padding: 15
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Status Code Stats */}
      <motion.div variants={item}>
        <div className="flex items-center mb-5">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="ml-4 text-xl font-semibold text-gray-800 dark:text-gray-100">Security Alerts</h3>
        </div>
        
        {result.securityIssues && result.securityIssues.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="h-2 bg-gradient-to-r from-red-500 to-pink-600"></div>
            <div className="p-6 border-l-4 border-red-500">
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
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-600"></div>
            <div className="p-6 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">No Security Issues Detected</h4>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Your log analysis shows no potential security concerns at this time.
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

OverviewTab.label = function(context) {
  return (
    <span className="flex items-center space-x-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
      </svg>
      <span>Overview</span>
    </span>
  );
};
