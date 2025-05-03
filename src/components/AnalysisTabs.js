'use client';

import React from 'react';

export default function AnalysisTabs({ analysisTab, setAnalysisTab }) {
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
    <div className="mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="px-4 sm:px-6 py-5 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Analysis Results</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Explore the detailed analysis of your log file through different perspectives
          </p>
        </div>
        
        <div className="px-4 sm:px-6 py-2">
          <nav className="flex space-x-1 sm:space-x-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setAnalysisTab(tab.id)}
                className={`
                  flex items-center py-3 px-3 sm:px-4 text-center whitespace-nowrap rounded-md font-medium text-sm 
                  transition-all duration-200 ease-in-out
                  ${
                    analysisTab === tab.id
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-100'
                  }
                `}
                aria-current={analysisTab === tab.id ? 'page' : undefined}
              >
                <span className={`transition-all duration-200 ${analysisTab === tab.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'}`}>
                  {tab.icon}
                </span>
                {tab.label}
                {analysisTab === tab.id && (
                  <span className="ml-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400"></span>
                )}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
      </div>
    </div>
  );
}
