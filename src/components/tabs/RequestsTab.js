'use client';

import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { motion } from 'framer-motion';

export default function RequestsTab({ result, prepareUrlChartData, prepareUrlGroupsChartData, prepareHourlyActivityChartData, isDarkMode }) {
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div>
        {/* Top URLs */}
        <motion.div variants={item} className="mb-8">
          <div className="flex items-center mb-5">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="ml-4 text-xl font-semibold text-gray-800 dark:text-gray-100">Top URLs</h3>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            <div className="p-6">
              <div className="h-64 mb-6">
                {prepareUrlChartData() && (
                  <Bar 
                    data={(() => {
                      const chartData = prepareUrlChartData();
                      if (chartData && chartData.datasets && chartData.datasets[0]) {
                        const enhancedData = JSON.parse(JSON.stringify(chartData));
                        
                        // Add gradient to bars
                        enhancedData.datasets[0].backgroundColor = function(context) {
                          const chart = context.chart;
                          const {ctx, chartArea} = chart;
                          if (!chartArea) {
                            return 'rgba(59, 130, 246, 0.8)';
                          }
                          const gradient = ctx.createLinearGradient(0, 0, chartArea.right, 0);
                          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
                          gradient.addColorStop(1, 'rgba(79, 70, 229, 0.8)');
                          return gradient;
                        };
                        
                        return enhancedData;
                      }
                      return chartData;
                    })()}
                    options={{
                      indexAxis: 'y',
                      plugins: {
                        legend: {
                          display: false
                        },
                        tooltip: {
                          backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                          titleColor: isDarkMode ? '#e5e7eb' : '#1f2937',
                          bodyColor: isDarkMode ? '#e5e7eb' : '#1f2937',
                          borderColor: isDarkMode ? 'rgba(55, 65, 81, 1)' : 'rgba(229, 231, 235, 1)',
                          borderWidth: 1,
                          padding: 12,
                          cornerRadius: 8,
                          displayColors: false,
                          callbacks: {
                            label: function(context) {
                              return `Requests: ${context.raw.toLocaleString()}`;
                            }
                          }
                        }
                      },
                      scales: {
                        x: {
                          grid: {
                            color: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                            drawBorder: false,
                          },
                          ticks: {
                            color: isDarkMode ? '#e5e7eb' : '#1f2937',
                            font: {
                              size: 11
                            },
                            padding: 8
                          }
                        },
                        y: {
                          grid: {
                            display: false,
                            drawBorder: false
                          },
                          ticks: {
                            color: isDarkMode ? '#e5e7eb' : '#1f2937',
                            font: {
                              size: 11
                            },
                            padding: 8
                          }
                        }
                      },
                      maintainAspectRatio: false,
                      animation: {
                        duration: 1000,
                        easing: 'easeOutQuart'
                      }
                    }} 
                  />
                )}
              </div>
              
              <div className="overflow-auto max-h-64 rounded-lg border border-gray-100 dark:border-gray-700 shadow-inner">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 sticky top-0 z-10">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">URL</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Count</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Percentage</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                    {result.topUrls && result.topUrls.map((item, index) => (
                      <motion.tr 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`transition-colors duration-150 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm border border-blue-200 dark:border-blue-800/30">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900 dark:text-gray-200 max-w-xs truncate">{item.url}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Rank #{index + 1}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-right">{item.count.toLocaleString()}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
                            {index === 0 ? 'Highest' : `${(item.count / result.topUrls[0].count * 100).toFixed(1)}% of top`}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center justify-end">
                            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mr-2 text-right">
                              {((item.count / result.totalRequests) * 100).toFixed(1)}%
                            </div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              index === 0 
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' 
                                : index < 3
                                  ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                            }`}>
                              {index === 0 ? 'Top' : `#${index + 1}`}
                            </span>
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
        
        {/* URL Patterns */}
        <motion.div variants={item} className="mb-8">
          <div className="flex items-center mb-5">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 000-3.464V4a1 1 0 012 0v7.268a2 2 0 000 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 000-3.464V4z" />
              </svg>
            </div>
            <h3 className="ml-4 text-xl font-semibold text-gray-800 dark:text-gray-100">URL Patterns</h3>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-72">
                  {prepareUrlGroupsChartData() && <Pie 
                    data={(() => {
                      const chartData = prepareUrlGroupsChartData();
                      if (chartData && chartData.datasets && chartData.datasets[0]) {
                        const enhancedData = JSON.parse(JSON.stringify(chartData));
                        
                        // Better colors for chart segments
                        enhancedData.datasets[0].backgroundColor = [
                          'rgba(99, 102, 241, 0.8)',
                          'rgba(79, 70, 229, 0.8)',
                          'rgba(124, 58, 237, 0.8)',
                          'rgba(139, 92, 246, 0.8)',
                          'rgba(167, 139, 250, 0.8)',
                          'rgba(196, 181, 253, 0.8)',
                          'rgba(59, 130, 246, 0.8)',
                          'rgba(96, 165, 250, 0.8)',
                          'rgba(147, 197, 253, 0.8)',
                          'rgba(186, 230, 253, 0.8)',
                        ];
                        
                        return enhancedData;
                      }
                      return chartData;
                    })()}
                    options={{
                      plugins: {
                        legend: {
                          position: 'right',
                          labels: {
                            color: isDarkMode ? '#e5e7eb' : '#1f2937',
                            font: {
                              size: 11,
                              weight: 'bold'
                            },
                            usePointStyle: true,
                            boxWidth: 10,
                            padding: 15
                          }
                        },
                        tooltip: {
                          backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
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
                      cutout: '50%',
                      maintainAspectRatio: false,
                      animation: {
                        animateScale: true,
                        animateRotate: true
                      }
                    }}
                  />}
                </div>
                
                <div className="overflow-auto max-h-72 space-y-3">
                  {result.topUrlGroups && result.topUrlGroups.map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex-shrink-0 mr-4 h-10 w-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-200 dark:border-indigo-800/30">
                        <span className="text-sm font-bold">#{index + 1}</span>
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col">
                          <div className="font-medium text-gray-800 dark:text-gray-200 truncate">
                            {item.pattern}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Pattern with ID placeholders</div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4 text-right">
                        <div className="text-sm font-bold text-gray-800 dark:text-gray-200">
                          {item.count.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {((item.count / result.totalRequests) * 100).toFixed(1)}% of total
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Traffic Pattern */}
        <motion.div variants={item} className="mb-8">
          <div className="flex items-center mb-5">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011 1v1.586l-2 2a1 1 0 01-2 0l-2-2a1 1 0 011-1 1.586L17 6H7a1 1 0 000 2h7a1 1 0 011 1v5a1 1 0 01-1 1H7a1 1 0 01-1-1V6a1 1 0 011-1 1.586L14 4z" />
              </svg>
            </div>
            <h3 className="ml-4 text-xl font-semibold text-gray-800 dark:text-gray-100">Traffic Pattern</h3>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <div className="h-2 bg-gradient-to-r from-green-500 to-teal-600"></div>
            <div className="p-6">
              <div className="h-64 mb-6">
                {prepareHourlyActivityChartData() && (
                  <Bar 
                    data={(() => {
                      const chartData = prepareHourlyActivityChartData();
                      if (chartData && chartData.datasets && chartData.datasets[0]) {
                        const enhancedData = JSON.parse(JSON.stringify(chartData));
                        
                        // Add gradient to bars
                        enhancedData.datasets[0].backgroundColor = function(context) {
                          const chart = context.chart;
                          const {ctx, chartArea} = chart;
                          if (!chartArea) {
                            return 'rgba(16, 185, 129, 0.8)';
                          }
                          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                          gradient.addColorStop(0, 'rgba(16, 185, 129, 0.8)');
                          gradient.addColorStop(1, 'rgba(5, 150, 105, 0.8)');
                          return gradient;
                        };
                        
                        // Add borders for better visual 
                        enhancedData.datasets[0].borderWidth = 1;
                        enhancedData.datasets[0].borderColor = isDarkMode ? 'rgba(5, 150, 105, 0.5)' : 'rgba(16, 185, 129, 0.7)';
                        enhancedData.datasets[0].borderRadius = 4;
                        
                        return enhancedData;
                      }
                      return chartData;
                    })()}
                    options={{
                      plugins: {
                        legend: {
                          display: false
                        },
                        tooltip: {
                          backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                          titleColor: isDarkMode ? '#e5e7eb' : '#1f2937',
                          bodyColor: isDarkMode ? '#e5e7eb' : '#1f2937',
                          borderColor: isDarkMode ? 'rgba(55, 65, 81, 1)' : 'rgba(229, 231, 235, 1)',
                          borderWidth: 1,
                          padding: 12,
                          cornerRadius: 8,
                          displayColors: false,
                          callbacks: {
                            title: function(tooltipItems) {
                              return `Hour: ${tooltipItems[0].label}:00`;
                            },
                            label: function(context) {
                              return `Requests: ${context.raw.toLocaleString()}`;
                            }
                          }
                        }
                      },
                      scales: {
                        x: {
                          grid: {
                            color: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                            drawBorder: false,
                          },
                          ticks: {
                            color: isDarkMode ? '#e5e7eb' : '#1f2937',
                            font: {
                              size: 11
                            },
                            padding: 8,
                            callback: function(value) {
                              return `${value}:00`;
                            }
                          }
                        },
                        y: {
                          grid: {
                            color: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                            drawBorder: false,
                          },
                          ticks: {
                            color: isDarkMode ? '#e5e7eb' : '#1f2937',
                            font: {
                              size: 11
                            },
                            padding: 8
                          }
                        }
                      },
                      maintainAspectRatio: false,
                      animation: {
                        duration: 1000,
                        easing: 'easeOutQuart'
                      },
                      barPercentage: 0.7
                    }} 
                  />
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800/30 shadow-sm"
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM16 3a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1H7a1 1 0 010-2h1V3a1 1 0 011-1z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-blue-700 dark:text-blue-400 font-medium">Peak Hour</div>
                      <div className="text-2xl font-bold text-blue-800 dark:text-blue-300">
                        {result.hourlyActivity && result.hourlyActivity.reduce((max, hour) => hour.count > max.count ? hour : max, { count: 0 }).hour}:00
                      </div>
                      <div className="text-sm text-blue-600/70 dark:text-blue-400/70 mt-1">
                        {result.hourlyActivity && result.hourlyActivity.reduce((max, hour) => hour.count > max.count ? hour : max, { count: 0 }).count.toLocaleString()} requests
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800/30 shadow-sm"
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6a1 1 0 10-2 0v1.586l2.828 2.829a1 1 0 101.415-1.415z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-indigo-700 dark:text-indigo-400 font-medium">Quietest Hour</div>
                      <div className="text-2xl font-bold text-indigo-800 dark:text-indigo-300">
                        {result.hourlyActivity && result.hourlyActivity.reduce((min, hour) => hour.count < min.count || min.count === 0 ? hour : min, { count: 0 }).hour}:00
                      </div>
                      <div className="text-sm text-indigo-600/70 dark:text-indigo-400/70 mt-1">
                        {result.hourlyActivity && result.hourlyActivity.reduce((min, hour) => hour.count < min.count || min.count === 0 ? hour : min, { count: 0 }).count.toLocaleString()} requests
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800/30 shadow-sm"
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011 1v1.586l-2 2a1 1 0 01-2 0l-2-2a1 1 0 011-1 1.586L17 6H7a1 1 0 000 2h7a1 1 0 011 1v5a1 1 0 01-1 1H7a1 1 0 01-1-1V6a1 1 0 011-1 1.586L14 4z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-purple-700 dark:text-purple-400 font-medium">Average Per Hour</div>
                      <div className="text-2xl font-bold text-purple-800 dark:text-purple-300">
                        {result.hourlyActivity && Math.round(result.hourlyActivity.reduce((sum, hour) => sum + hour.count, 0) / result.hourlyActivity.length).toLocaleString()}
                      </div>
                      <div className="text-sm text-purple-600/70 dark:text-purple-400/70 mt-1">
                        requests
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* HTTP Methods */}
        {result.methodDistribution && (
          <motion.div variants={item} className="mb-8">
            <div className="flex items-center mb-5">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.586l-2 2a1 1 0 01-2 0l-2-2a1 1 0 011-1 1.586L4 6H3a1 1 0 000 2h1a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1 1.586L7 4H10a1 1 0 011 1v.586l2 2a1 1 0 01-2 0l-2-2a1 1 0 10-1.414 1.414L13 7.414V13h2a1 1 0 001-1V7.414L15.414 6H17a1 1 0 000-2H7a1 1 0 000 2h2v2a1 1 0 001 1v2a1 1 0 01-1 1H7a1 1 0 01-1-1V7a1 1 0 00-1-1H4a1 1 0 000 2h1v.586z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="ml-4 text-xl font-semibold text-gray-800 dark:text-gray-100">HTTP Methods</h3>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <div className="h-2 bg-gradient-to-r from-amber-500 to-orange-600"></div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(result.methodDistribution).map(([method, count], index) => {
                    // Convert number keys to actual HTTP method names if needed
                    const methodName = isNaN(method) ? method : 
                      (['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'][parseInt(method)] || `METHOD-${method}`);
                    
                    // Convert to number if it's an object
                    const countValue = typeof count === 'object' ? (count.count || 0) : count;
                    
                    return (
                    <motion.div 
                      key={method}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex flex-col rounded-lg shadow-sm overflow-hidden h-full`}
                    >
                      <div className={`px-4 py-3 ${
                        methodName === 'GET' ? 'bg-gradient-to-br from-green-500 to-emerald-600' :
                        methodName === 'POST' ? 'bg-gradient-to-br from-blue-500 to-indigo-600' :
                        methodName === 'PUT' ? 'bg-gradient-to-br from-amber-500 to-orange-600' :
                        methodName === 'DELETE' ? 'bg-gradient-to-br from-red-500 to-rose-600' :
                        methodName === 'PATCH' ? 'bg-gradient-to-br from-yellow-500 to-amber-600' :
                        'bg-gradient-to-br from-purple-500 to-indigo-600'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className={`text-xl font-bold text-white`}>
                            {methodName}
                          </div>
                          <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                            {methodName === 'GET' && (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 000 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                              </svg>
                            )}
                            {methodName === 'POST' && (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 01-1 1H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                              </svg>
                            )}
                            {methodName === 'PUT' && (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            )}
                            {methodName === 'DELETE' && (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            )}
                            {methodName === 'PATCH' && (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-4.207 4.207l5.657 5.657-2.121 2.121-5.657-5.657a3 3 0 013.536-3.536l-1.414 1.414zm-.707.707l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414z" />
                              </svg>
                            )}
                            {!['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(methodName) && (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 00-1 1v3a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6a1 1 0 10-2 0v1.586l2.828 2.829a1 1 0 101.415-1.415z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow p-4 bg-white dark:bg-gray-700">
                        <div className="text-lg font-bold text-gray-800 dark:text-gray-100">
                          {countValue.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">requests</div>
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-2 rounded-full ${
                                methodName === 'GET' ? 'bg-green-500 dark:bg-green-500' :
                                methodName === 'POST' ? 'bg-blue-500 dark:bg-blue-500' :
                                methodName === 'PUT' ? 'bg-amber-500 dark:bg-amber-500' :
                                methodName === 'DELETE' ? 'bg-red-500 dark:bg-red-500' :
                                methodName === 'PATCH' ? 'bg-yellow-500 dark:bg-yellow-500' :
                                'bg-purple-500 dark:bg-purple-500'
                              }`}
                              style={{ 
                                width: `${Math.max(5, Math.round((countValue / result.totalRequests) * 100))}%`
                              }}
                            ></div>
                          </div>
                          <div className="text-xs text-right mt-1 font-medium text-gray-600 dark:text-gray-300">
                            {((countValue / result.totalRequests) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )})}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
