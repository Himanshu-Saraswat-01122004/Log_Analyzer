'use client';

import React from 'react';

export default function TimeFilter({ timeFilter, setTimeFilter, timeSpan }) {
  const filters = [
    { id: 'all', label: 'All Time' },
    { id: 'last24h', label: 'Last 24h' },
    { id: 'last7d', label: 'Last 7d' },
    { id: 'last30d', label: 'Last 30d' }
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-gray-700 dark:text-gray-300">Time Range</h3>
        <div className="flex space-x-2 text-sm">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setTimeFilter(filter.id)}
              className={`px-3 py-1 rounded-md ${
                timeFilter === filter.id 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
      {timeSpan && (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <span>From: {new Date(timeSpan.start).toLocaleString()}</span>
          <span className="mx-2">-</span>
          <span>To: {new Date(timeSpan.end).toLocaleString()}</span>
        </div>
      )}
    </div>
  );
}
