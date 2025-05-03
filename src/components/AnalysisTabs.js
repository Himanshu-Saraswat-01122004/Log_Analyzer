'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnalysisTabs({ analysisTab, setAnalysisTab }) {
  // State to track hover states
  const [hoveredTab, setHoveredTab] = useState(null);
  
  // Define tab icons and data
  const tabs = [
    { 
      id: 'overview', 
      label: 'Overview',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ) 
    },
    { 
      id: 'requests', 
      label: 'Requests',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      )
    },
    { 
      id: 'users', 
      label: 'Users',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    { 
      id: 'performance', 
      label: 'Performance',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 relative"
        whileHover={{ boxShadow: '0 8px 30px rgba(79, 70, 229, 0.1)' }}
        transition={{ duration: 0.3 }}
      >
        {/* Gradient strip at the top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

        <motion.div 
          className="px-6 sm:px-8 py-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-b border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg md:text-xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">Analysis Results</span>
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Explore the detailed analysis of your log file through different perspectives
              </p>
            </div>
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative hidden md:block"
            >
              <div className="relative z-10">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full h-full bg-indigo-400 dark:bg-indigo-700 rounded-lg blur-xl opacity-30 -z-10"></div>
            </motion.div>
          </div>
        </motion.div>
        
        <div className="px-4 sm:px-6 py-3">
          <nav className="flex flex-wrap md:flex-nowrap justify-between md:justify-start space-x-1 md:space-x-2">
            <AnimatePresence mode="wait">
              {tabs.map(tab => (
                <motion.button
                  key={tab.id}
                  onClick={() => setAnalysisTab(tab.id)}
                  onMouseEnter={() => setHoveredTab(tab.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={`
                    relative overflow-hidden flex items-center py-3 px-3 sm:px-4 text-center whitespace-nowrap rounded-md font-medium text-sm 
                    transition-all duration-200 ease-in-out mb-2 md:mb-0
                    ${
                      analysisTab === tab.id
                        ? 'text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-300'
                    }
                  `}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + tabs.findIndex(t => t.id === tab.id) * 0.1 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  aria-current={analysisTab === tab.id ? 'page' : undefined}
                >
                  {/* Background for active tab */}
                  {analysisTab === tab.id && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-md -z-10"
                      layoutId="activeTabBackground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    />
                  )}
                  
                  {/* Hover background */}
                  {hoveredTab === tab.id && analysisTab !== tab.id && (
                    <motion.div 
                      className="absolute inset-0 bg-gray-100 dark:bg-gray-700/60 rounded-md -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  
                  <span className={`transition-all duration-200 ${
                    analysisTab === tab.id 
                      ? 'text-white' 
                      : hoveredTab === tab.id 
                        ? 'text-indigo-600 dark:text-indigo-400' 
                        : 'text-gray-500 dark:text-gray-400'}`}
                  >
                    {tab.icon}
                  </span>
                  
                  <span className={analysisTab === tab.id ? 'font-semibold' : ''}>
                    {tab.label}
                  </span>
                  
                  {analysisTab === tab.id && (
                    <motion.span 
                      className="ml-1.5 h-2 w-2 rounded-full bg-white" 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    />
                  )}
                </motion.button>
              ))}
            </AnimatePresence>
          </nav>
        </div>
        
        <motion.div 
          className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
}
