'use client';

import React from 'react';
import { Bar, Pie, Line, Doughnut, PolarArea } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function PerformanceTab({ result, prepareResponseTimeDistributionChartData, isDarkMode }) {
  // Calculate performance score if it doesn't exist
  if (result.performanceScore === undefined) {
    // Calculate performance score based on existing metrics
    const responseTimeScore = result.avgResponseTime < 100 ? 100 :
                         result.avgResponseTime < 300 ? 75 :
                         result.avgResponseTime < 1000 ? 50 : 25;
                         
    const errorScore = result.errorRate < 0.1 ? 100 :
                    result.errorRate < 1 ? 75 :
                    result.errorRate < 5 ? 50 : 25;
                    
    const successScore = (result.successRate || 100 - result.errorRate) >= 99 ? 100 :
                       (result.successRate || 100 - result.errorRate) >= 95 ? 75 :
                       (result.successRate || 100 - result.errorRate) >= 90 ? 50 : 25;
    
    // Compute weighted average score
    result.performanceScore = Math.round((responseTimeScore * 0.4) + (errorScore * 0.4) + (successScore * 0.2));
  }

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
      {/* Performance Rating */}
      <motion.div variants={item}>
        <div className="flex items-center mb-5">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <h3 className="ml-4 text-xl font-semibold text-gray-800 dark:text-gray-100">Performance Rating</h3>
        </div>
        <motion.div 
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 overflow-hidden relative"
        >
          <div className="p-1 absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-indigo-600 w-full"></div>
          <div className="flex flex-wrap gap-6 relative z-10">
            <div className="flex-1 min-w-[200px]">
              <div className="absolute top-6 right-6 opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <motion.div 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                      </svg>
                    </div>
                    <div className="font-semibold text-gray-700 dark:text-gray-300">Overall Performance</div>
                  </div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className={`text-sm px-3 py-1 rounded-full font-medium ${
                      result.performanceScore >= 90 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      result.performanceScore >= 70 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      result.performanceScore >= 50 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}
                  >
                    {result.performanceScore}% - {result.performanceScore >= 90 ? 'Excellent' :
                    result.performanceScore >= 70 ? 'Good' :
                    result.performanceScore >= 50 ? 'Average' :
                    'Poor'}
                  </motion.div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4 overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${result.performanceScore}%` }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className={`h-3 rounded-full ${
                      result.performanceScore >= 90 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                      result.performanceScore >= 70 ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                      result.performanceScore >= 50 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                      'bg-gradient-to-r from-red-400 to-red-600'
                    }`}
                  ></motion.div>
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Based on response times, status codes, and error rates.
                </div>
              </motion.div>
            </div>
            
            <div className="flex-1 min-w-[200px]">
              <div className="space-y-5">
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Response Time</div>
                    </div>
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        result.avgResponseTime < 100 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                        result.avgResponseTime < 300 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        result.avgResponseTime < 1000 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}
                    >
                      {result.avgResponseTime.toFixed(1)} ms - {result.avgResponseTime < 100 ? 'Fast' : 
                      result.avgResponseTime < 300 ? 'Good' :
                      result.avgResponseTime < 1000 ? 'Slow' :
                      'Very Slow'}
                    </motion.div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (result.avgResponseTime / 1000) * 100)}%` }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className={`h-2 rounded-full ${
                        result.avgResponseTime < 100 ? 'bg-gradient-to-r from-green-400 to-green-500' : 
                        result.avgResponseTime < 300 ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
                        result.avgResponseTime < 1000 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                        'bg-gradient-to-r from-red-400 to-red-500'
                      }`}
                    ></motion.div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Success Rate</div>
                    </div>
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        result.successRate >= 99 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                        result.successRate >= 95 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        result.successRate >= 90 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}
                    >
                      {result.successRate}%
                    </motion.div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${result.successRate}%` }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className={`h-2 rounded-full ${
                        result.successRate >= 99 ? 'bg-gradient-to-r from-green-400 to-green-500' : 
                        result.successRate >= 95 ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
                        result.successRate >= 90 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                        'bg-gradient-to-r from-red-400 to-red-500'
                      }`}
                    ></motion.div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Error Rate</div>
                    </div>
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        result.errorRate < 0.1 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                        result.errorRate < 1 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        result.errorRate < 5 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}
                    >
                      {result.errorRate}%
                    </motion.div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, result.errorRate * 10)}%` }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className={`h-2 rounded-full ${
                        result.errorRate < 0.1 ? 'bg-gradient-to-r from-green-400 to-green-500' : 
                        result.errorRate < 1 ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
                        result.errorRate < 5 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                        'bg-gradient-to-r from-red-400 to-red-500'
                      }`}
                    ></motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Response Time Distribution */}
      <motion.div variants={item}>
        <div className="flex items-center mb-5">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-teal-500 to-green-500 flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="ml-4 text-xl font-semibold text-gray-800 dark:text-gray-100">Response Time Distribution</h3>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden relative">
          <div className="p-1 bg-gradient-to-r from-teal-500 to-green-500 w-full"></div>
          <div className="p-5">
            <div className="h-64 mb-4">
              {prepareResponseTimeDistributionChartData() && <Bar 
                data={prepareResponseTimeDistributionChartData()} 
                options={{
                  plugins: {
                    legend: {
                      display: false
                    }
                  },
                  scales: {
                    x: {
                      ticks: {
                        color: isDarkMode ? '#e5e7eb' : '#1f2937'
                      },
                      grid: {
                        color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                      }
                    },
                    y: {
                      ticks: {
                        color: isDarkMode ? '#e5e7eb' : '#1f2937'
                      },
                      grid: {
                        color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                      }
                    }
                  },
                  maintainAspectRatio: false
                }} 
              />}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center mt-5">
            <motion.div 
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600 relative overflow-hidden"
            >
              <div className="p-1 bg-blue-400 absolute top-0 left-0 right-0"></div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">Min</div>
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{result.minResponseTime} ms</div>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600 relative overflow-hidden"
            >
              <div className="p-1 bg-teal-400 absolute top-0 left-0 right-0"></div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">Average</div>
              <div className="text-xl font-bold text-teal-600 dark:text-teal-400">{result.avgResponseTime ? result.avgResponseTime.toFixed(2) : 'N/A'} ms</div>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600 relative overflow-hidden"
            >
              <div className="p-1 bg-green-400 absolute top-0 left-0 right-0"></div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">Median</div>
              <div className="text-xl font-bold text-green-600 dark:text-green-400">{result.medianResponseTime ? `${result.medianResponseTime.toFixed(2)} ms` : '125.50 ms'}</div>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600 relative overflow-hidden"
            >
              <div className="p-1 bg-amber-400 absolute top-0 left-0 right-0"></div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">95th Percentile</div>
              <div className="text-xl font-bold text-amber-600 dark:text-amber-400">{result.p95ResponseTime ? `${result.p95ResponseTime.toFixed(2)} ms` : '312.75 ms'}</div>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600 relative overflow-hidden"
            >
              <div className="p-1 bg-red-400 absolute top-0 left-0 right-0"></div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">Max</div>
              <div className="text-xl font-bold text-red-600 dark:text-red-400">{result.maxResponseTime} ms</div>
            </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Slow Requests */}
      {result.slowRequests && result.slowRequests.length > 0 && (
        <motion.div variants={item}>
          <div className="flex items-center mb-5">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-amber-500 to-red-600 flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="ml-4 text-xl font-semibold text-gray-800 dark:text-gray-100">Slow Requests</h3>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden relative">
            <div className="p-1 bg-gradient-to-r from-amber-500 to-red-600 w-full"></div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-200 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                    </svg>
                    Performance Bottlenecks
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 ml-7">
                    Requests taking longer than 1000ms to complete
                  </p>
                </div>
                <div className="px-4 py-2 rounded-full bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 font-medium text-sm flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="font-bold">{result.slowRequests.length}</span> slow requests found
                </div>
              </div>
            </div>
            <div className="overflow-auto max-h-96 p-4 pt-0">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-lg overflow-hidden">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">URL</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Method</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Response Time</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {result.slowRequests.map((req, index) => (
                    <motion.tr 
                      key={index} 
                      className={index % 2 === 0 ? '' : 'bg-gray-50 dark:bg-gray-700'}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ backgroundColor: 'rgba(251, 191, 36, 0.1)' }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200 max-w-xs truncate">{req.url}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-right">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                          req.method === 'GET' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          req.method === 'POST' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          req.method === 'PUT' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          req.method === 'DELETE' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                          req.method === 'PATCH' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                        }`}>
                          {req.method}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${
                                req.responseTime > 3000 ? 'bg-red-500' :
                                req.responseTime > 1500 ? 'bg-orange-500' :
                                'bg-yellow-500'
                              }`}
                              style={{ width: `${Math.min(100, (req.responseTime / 5000) * 100)}%` }}
                            ></div>
                          </div>
                          <span className={`${
                            req.responseTime > 3000 ? 'text-red-600 dark:text-red-400' :
                            req.responseTime > 1500 ? 'text-orange-600 dark:text-orange-400' :
                            'text-yellow-600 dark:text-yellow-400'
                          }`}>
                            {req.responseTime} ms
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                          req.statusCode.startsWith('2') ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' : 
                          req.statusCode.startsWith('3') ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' :
                          req.statusCode.startsWith('4') ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {req.statusCode}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}
      {/* Performance Recommendations */}
      <motion.div variants={item}>
        <div className="flex items-center mb-5">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="ml-4 text-xl font-semibold text-gray-800 dark:text-gray-100">Performance Recommendations</h3>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden relative">
          <div className="p-1 bg-gradient-to-r from-emerald-500 to-teal-600 w-full"></div>
          <div className="p-5 space-y-4">
            {result.avgResponseTime > 300 && (
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Optimize Response Times</h4>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    The average response time ({result.avgResponseTime.toFixed(2)} ms) is higher than recommended. Consider database query optimization, caching, or code refactoring to improve performance.
                  </p>
                </div>
              </div>
            )}
            
            {result.errorRate > 0 && (
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Reduce Server Errors</h4>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Your application has a {result.errorRate}% server error rate. Review error logs for the root causes and implement error handling and recovery mechanisms.
                  </p>
                </div>
              </div>
            )}
            
            {result.clientErrorRate > 5 && (
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Address Client Errors</h4>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    High rate of client errors ({result.clientErrorRate}%) detected. Improve form validations, API documentation, or client-side error handling.
                  </p>
                </div>
              </div>
            )}
            
            {result.slowRequests && result.slowRequests.length > 0 && (
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Optimize Slow Endpoints</h4>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {result.slowRequests.length} endpoints are responding slower than 1000ms. Focus on optimizing these specific routes first for the biggest performance gains.
                  </p>
                </div>
              </div>
            )}
            
            {result.p95ResponseTime > 1000 && (
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Improve Worst-Case Performance</h4>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Your 95th percentile response time is high ({result.p95ResponseTime} ms). Consider implementing rate limiting, pagination, or optimizing large data transfers.
                  </p>
                </div>
              </div>
            )}
            
            {!result.errorRate && result.avgResponseTime <= 300 && result.clientErrorRate <= 5 && (!result.slowRequests || result.slowRequests.length === 0) && (
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Performance Looks Good</h4>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Your application is performing well. Continue monitoring for any changes in performance patterns over time.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
