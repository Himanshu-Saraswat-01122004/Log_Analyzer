'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TimeFilter({ timeFilter, setTimeFilter, timeSpan }) {
  // State to track hover state on buttons
  const [hoveredFilter, setHoveredFilter] = useState(null);

  const filters = [
    { id: 'all', label: 'All Time' },
    { id: 'last24h', label: 'Last 24h' },
    { id: 'last7d', label: 'Last 7d' },
    { id: 'last30d', label: 'Last 30d' }
  ];

  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4 relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/40 to-purple-50/40 dark:from-indigo-900/10 dark:to-purple-900/10 -z-10"></div>
        
        {/* Left accent border */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-600"></div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center"
          >
            <div className="mr-3 bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">Time Range</h3>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap gap-2 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {filters.map((filter, index) => (
                <motion.button
                  key={filter.id}
                  onClick={() => setTimeFilter(filter.id)}
                  onMouseEnter={() => setHoveredFilter(filter.id)}
                  onMouseLeave={() => setHoveredFilter(null)}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0, scale: 0.95 }}
                  className={`relative px-3 py-1.5 rounded-lg font-medium overflow-hidden`}
                >
                  {/* Background for active button */}
                  {timeFilter === filter.id && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 -z-10 shadow-md"
                      layoutId="activePeriodBackground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    />
                  )}
                  
                  {/* Hover background */}
                  {hoveredFilter === filter.id && timeFilter !== filter.id && (
                    <motion.div 
                      className="absolute inset-0 bg-gray-100 dark:bg-gray-700 -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  
                  <span className={timeFilter === filter.id ? 'text-white' : 'text-gray-700 dark:text-gray-300'}>
                    {filter.label}
                  </span>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
        
        {timeSpan && (
          <motion.div 
            className="flex flex-wrap justify-between items-center text-sm bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3 border border-indigo-100 dark:border-indigo-800"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center text-indigo-700 dark:text-indigo-300 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>From:</span>
              <span className="ml-1.5 bg-white dark:bg-gray-800 px-2 py-1 rounded-md text-gray-800 dark:text-gray-200 shadow-sm">
                {new Date(timeSpan.start).toLocaleString()}
              </span>
            </div>
            
            <div className="hidden sm:block">  
              <motion.div 
                className="h-0.5 w-8 bg-indigo-200 dark:bg-indigo-700 rounded-full my-1"
                initial={{ width: 0 }}
                animate={{ width: 32 }}
                transition={{ delay: 0.4 }}
              />
            </div>
            
            <div className="flex items-center text-indigo-700 dark:text-indigo-300 font-medium mt-2 sm:mt-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>To:</span>
              <span className="ml-1.5 bg-white dark:bg-gray-800 px-2 py-1 rounded-md text-gray-800 dark:text-gray-200 shadow-sm">
                {new Date(timeSpan.end).toLocaleString()}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
