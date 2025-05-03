'use client';

import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { motion } from 'framer-motion';

export default function PerformanceTab({ result, prepareResponseTimeDistributionChartData, isDarkMode }) {
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
    >
      {/* Performance Rating */}
      <motion.div variants={item} className="mb-8">
        <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">Performance Rating</h3>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex flex-wrap gap-6">
            <div className="flex-1 min-w-[200px]">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-gray-700 dark:text-gray-300">Overall Performance</div>
                <div className={`text-sm px-2 py-1 rounded-full ${
                  result.performanceScore >= 90 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  result.performanceScore >= 70 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                  result.performanceScore >= 50 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {result.performanceScore >= 90 ? 'Excellent' :
                  result.performanceScore >= 70 ? 'Good' :
                  result.performanceScore >= 50 ? 'Average' :
                  'Poor'}
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                <div 
                  className={`h-2.5 rounded-full ${
                    result.performanceScore >= 90 ? 'bg-green-600' :
                    result.performanceScore >= 70 ? 'bg-blue-600' :
                    result.performanceScore >= 50 ? 'bg-yellow-500' :
                    'bg-red-600'
                  }`}
                  style={{ width: `${result.performanceScore}%` }}
                ></div>
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                Based on response times, status codes, and error rates.
              </div>
            </div>
            
            <div className="flex-1 min-w-[200px]">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Response Time</div>
                    <div className={`text-xs px-2 py-0.5 rounded-full ${
                      result.avgResponseTime < 100 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                      result.avgResponseTime < 300 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      result.avgResponseTime < 1000 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {result.avgResponseTime < 100 ? 'Fast' : 
                      result.avgResponseTime < 300 ? 'Good' :
                      result.avgResponseTime < 1000 ? 'Slow' :
                      'Very Slow'}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${
                        result.avgResponseTime < 100 ? 'bg-green-500' : 
                        result.avgResponseTime < 300 ? 'bg-blue-500' :
                        result.avgResponseTime < 1000 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(100, (result.avgResponseTime / 1000) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
                    <div className={`text-xs px-2 py-0.5 rounded-full ${
                      result.successRate >= 99 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                      result.successRate >= 95 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      result.successRate >= 90 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {result.successRate}%
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${
                        result.successRate >= 99 ? 'bg-green-500' : 
                        result.successRate >= 95 ? 'bg-blue-500' :
                        result.successRate >= 90 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${result.successRate}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Error Rate</div>
                    <div className={`text-xs px-2 py-0.5 rounded-full ${
                      result.errorRate < 0.1 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                      result.errorRate < 1 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      result.errorRate < 5 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {result.errorRate}%
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${
                        result.errorRate < 0.1 ? 'bg-green-500' : 
                        result.errorRate < 1 ? 'bg-blue-500' :
                        result.errorRate < 5 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(100, result.errorRate * 10)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Response Time Distribution */}
      <motion.div variants={item} className="mb-8">
        <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">Response Time Distribution</h3>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">Min</div>
              <div className="text-lg font-bold">{result.minResponseTime} ms</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">Average</div>
              <div className="text-lg font-bold">{result.avgResponseTime ? result.avgResponseTime.toFixed(2) : 'N/A'} ms</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">Median</div>
              <div className="text-lg font-bold">{result.medianResponseTime} ms</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">95th Percentile</div>
              <div className="text-lg font-bold">{result.p95ResponseTime} ms</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">Max</div>
              <div className="text-lg font-bold">{result.maxResponseTime} ms</div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Slow Requests */}
      {result.slowRequests && result.slowRequests.length > 0 && (
        <motion.div variants={item} className="mb-8">
          <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">Slow Requests</h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">Performance Bottlenecks</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Requests taking longer than 1000ms to complete
                  </p>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">{result.slowRequests.length}</span> slow requests found
                </div>
              </div>
            </div>
            <div className="overflow-auto max-h-96">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
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
                    <tr key={index} className={index % 2 === 0 ? '' : 'bg-gray-50 dark:bg-gray-700'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200 max-w-xs truncate">{req.url}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          req.method === 'GET' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          req.method === 'POST' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          req.method === 'PUT' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          req.method === 'DELETE' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                        }`}>
                          {req.method}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500 dark:text-gray-400 font-medium">
                        <span className={`${
                          req.responseTime > 3000 ? 'text-red-600 dark:text-red-400' :
                          req.responseTime > 1500 ? 'text-orange-600 dark:text-orange-400' :
                          'text-yellow-600 dark:text-yellow-400'
                        }`}>
                          {req.responseTime} ms
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          req.statusCode.startsWith('2') ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' : 
                          req.statusCode.startsWith('3') ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' :
                          req.statusCode.startsWith('4') ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {req.statusCode}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Recommendations */}
      <motion.div variants={item}>
        <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">Performance Recommendations</h3>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="space-y-4">
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
