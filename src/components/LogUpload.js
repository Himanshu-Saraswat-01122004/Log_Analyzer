'use client';

import React, { useState, useRef } from 'react';

export default function LogUpload({ 
  file, 
  handleUpload, 
  isUploading, 
  error, 
  setFile, 
  previousFiles, 
  handlePreviousFileSelect,
  handleRemoveRecentFile
}) {
  const [dragActive, setDragActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [recentFilesExpanded, setRecentFilesExpanded] = useState(true);
  const [formatSectionExpanded, setFormatSectionExpanded] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  // Filter previous files based on search term
  const filteredPreviousFiles = previousFiles ? 
    previousFiles.filter(prevFile => 
      prevFile.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-all">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        Log Input
      </h2>
      
      {/* Recent Files Access Button - Quick Access */}
      {previousFiles && previousFiles.length > 0 && (
        <div className="mb-4">
          <button
            onClick={() => setRecentFilesExpanded(!recentFilesExpanded)}
            className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
            aria-expanded={recentFilesExpanded}
            aria-controls="recent-files-panel"
          >
            <svg xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 mr-1 transition-transform duration-200 ${recentFilesExpanded ? 'rotate-90' : ''}`} 
                viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            Access Recent Files ({previousFiles.length})
          </button>
        </div>
      )}
      
      <form onSubmit={handleUpload} className="space-y-4">
        <div 
          className={`border-2 ${dragActive ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' : 'border-dashed border-gray-300 dark:border-gray-600'} 
                      rounded-lg p-8 text-center transition-all duration-200 ease-in-out
                      ${isUploading ? 'opacity-60' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            id="logfile"
            className="hidden"
            accept=".log,.txt"
            onChange={(e) => setFile(e.target.files[0])}
            disabled={isUploading}
          />
          <div 
            onClick={handleButtonClick}
            className="cursor-pointer flex flex-col items-center justify-center"
          >
            {!file ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 ${dragActive ? 'text-indigo-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {dragActive ? 'Drop your file here' : 'Drag & drop your log file here'}
                </p>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">or</p>
                <button 
                  type="button"
                  className="mt-2 px-4 py-2 text-sm text-indigo-600 dark:text-indigo-400 border border-indigo-300 dark:border-indigo-700 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                  disabled={isUploading}
                >
                  Browse files
                </button>
              </>
            ) : (
              <div className="py-4">
                <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-md p-4 flex items-center max-w-md mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div className="ml-3 flex-1 text-left">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                  <button 
                    type="button" 
                    className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                    disabled={isUploading}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  Click to change file
                </p>
              </div>
            )}
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isUploading || !file}
          className={`w-full py-3 px-4 rounded-md ${isUploading ? 'bg-indigo-400 dark:bg-indigo-800' : 'bg-indigo-600 hover:bg-indigo-700'} text-white font-medium 
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all
                      ${(isUploading || !file) ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          {isUploading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </div>
          ) : 'Upload & Analyze'}
        </button>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-md relative animate-fade-in" role="alert">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="block sm:inline">{error}</span>
            </div>
          </div>
        )}
      </form>
      
      {/* Enhanced Recent Files Section */}
      {previousFiles && previousFiles.length > 0 && (
        <div id="recent-files-panel" className={`mt-6 ${recentFilesExpanded ? 'block' : 'hidden'}`}>
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 rounded-lg overflow-hidden border border-indigo-100 dark:border-indigo-800">
            <div className="px-5 py-4 bg-indigo-500 dark:bg-indigo-600">
              <div className="flex items-center justify-between">
                <h3 className="font-medium flex items-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                  Recent Files
                </h3>
                
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search files..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 pr-8 py-1 text-sm border border-indigo-300 focus:border-indigo-500 dark:border-indigo-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 absolute left-2.5 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zm-7-4a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-5 space-y-4 border-t border-indigo-400 dark:border-indigo-700">
              {filteredPreviousFiles.length > 0 ? (
                <div className="space-y-2">
                  {filteredPreviousFiles.map((prevFile, index) => (
                    <div 
                      key={index} 
                      className="bg-white dark:bg-gray-800 rounded-md overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-200"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', prevFile.name);
                        e.dataTransfer.effectAllowed = 'copy';
                      }}
                    >
                      <div className="flex items-center justify-between p-3 cursor-pointer group hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors duration-200">
                        <div 
                          className="flex items-center overflow-hidden flex-grow"
                          onClick={() => handlePreviousFileSelect(prevFile)} 
                          role="button"
                          tabIndex={0}
                          aria-label={`Select ${prevFile.name}`}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              handlePreviousFileSelect(prevFile);
                            }
                          }}
                        >
                          <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-md border-l-4 border-indigo-500 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/50 transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="ml-3 overflow-hidden group-hover:translate-x-1 transition-transform duration-200">
                            <p className="truncate text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-200">{prevFile.name}</p>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-0.5 group-hover:text-indigo-600/70 dark:group-hover:text-indigo-400/70 transition-colors duration-200">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>{new Date(prevFile.lastModified).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                              {prevFile.size && (
                                <>
                                  <span className="mx-1">•</span>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7" />
                                  </svg>
                                  <span>{(prevFile.size / 1024).toFixed(2)} KB</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center ml-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePreviousFileSelect(prevFile);
                            }}
                            disabled={isUploading}
                            className={`px-3 py-1.5 text-xs rounded-md bg-indigo-100 text-indigo-700 hover:bg-indigo-200 hover:scale-105
                                      dark:bg-indigo-900/50 dark:text-indigo-300 dark:hover:bg-indigo-800
                                      transition-all duration-200 transform ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            aria-label={`Analyze ${prevFile.name}`}
                          >
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                              </svg>
                              <span className="hidden sm:inline">Analyze</span>
                              <span className="sm:hidden">Use</span>
                            </div>
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Confirm before removing
                              if (window.confirm(`Remove ${prevFile.name} from recent files?`)) {
                                handleRemoveRecentFile(prevFile);
                              }
                            }}
                            className="ml-1 p-1.5 text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors duration-200"
                            aria-label={`Remove ${prevFile.name} from recent files`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    {searchTerm ? 'No files match your search' : 'No recent files available'}
                  </p>
                </div>
              )}

              <div className="flex items-center bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-md border border-indigo-100 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-800/30 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="text-xs text-indigo-700 dark:text-indigo-300">
                  Tip: Click on a file or drag a file to the drop area to use it
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Instructions */}
      <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg overflow-hidden border border-indigo-100 dark:border-indigo-800">
          <button 
            onClick={() => setFormatSectionExpanded(!formatSectionExpanded)}
            className="w-full px-5 py-4 bg-indigo-500 dark:bg-indigo-600 text-left focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
            aria-expanded={formatSectionExpanded}
            aria-controls="format-section-content"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium flex items-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Supported Log Formats
              </h3>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 text-white transform transition-transform duration-200 ${formatSectionExpanded ? 'rotate-180' : ''}`} 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </button>
          
          <div 
            id="format-section-content" 
            className={`transition-all duration-300 ease-in-out ${formatSectionExpanded ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
          >
            <div className="p-5 space-y-4 border-t border-indigo-400 dark:border-indigo-700">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Our analyzer supports the following common log formats:
              </p>
              
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-md overflow-hidden shadow-sm">
                  <div className="bg-indigo-100 dark:bg-indigo-900/50 px-4 py-2 border-l-4 border-indigo-500">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">Custom Format</h4>
                      <span className="text-xs px-2 py-1 bg-indigo-200 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-200 rounded-full">Recommended</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700 overflow-x-auto">
                      <pre className="p-3 text-xs leading-relaxed text-gray-800 dark:text-gray-200 font-mono">
                        <span className="text-blue-600 dark:text-blue-400">[</span><span className="text-green-600 dark:text-green-400">:custom-date</span><span className="text-blue-600 dark:text-blue-400">]</span> <span className="text-blue-600 dark:text-blue-400">"</span><span className="text-green-600 dark:text-green-400">:method :url</span><span className="text-blue-600 dark:text-blue-400">"</span> <span className="text-purple-600 dark:text-purple-400">:status</span> <span className="text-blue-600 dark:text-blue-400">(</span><span className="text-orange-600 dark:text-orange-400">:response-time</span> ms<span className="text-blue-600 dark:text-blue-400">)</span> <span className="text-gray-600 dark:text-gray-400">|</span> IP:<span className="text-orange-600 dark:text-orange-400">:remote-addr</span> <span className="text-gray-600 dark:text-gray-400">|</span> User:<span className="text-orange-600 dark:text-orange-400">:user-email</span> <span className="text-gray-600 dark:text-gray-400">|</span> ReqID:<span className="text-orange-600 dark:text-orange-400">:request-id</span> <span className="text-gray-600 dark:text-gray-400">|</span> <span className="text-orange-600 dark:text-orange-400">:res[content-length]</span> bytes
                      </pre>
                    </div>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      A feature-rich format with detailed request information including user email and request ID.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-md overflow-hidden shadow-sm">
                  <div className="bg-indigo-100 dark:bg-indigo-900/50 px-4 py-2 border-l-4 border-indigo-500">
                    <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">Standard Apache/Nginx Format</h4>
                  </div>
                  <div className="p-4">
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700 overflow-x-auto">
                      <pre className="p-3 text-xs leading-relaxed text-gray-800 dark:text-gray-200 font-mono">
                        <span className="text-orange-600 dark:text-orange-400">123.45.67.89</span> <span className="text-gray-500 dark:text-gray-500">- -</span> <span className="text-blue-600 dark:text-blue-400">[</span><span className="text-green-600 dark:text-green-400">01/Jan/2023:12:34:56 +0000</span><span className="text-blue-600 dark:text-blue-400">]</span> <span className="text-blue-600 dark:text-blue-400">"</span><span className="text-purple-600 dark:text-purple-400">GET</span> <span className="text-green-600 dark:text-green-400">/example/path</span> <span className="text-gray-500 dark:text-gray-500">HTTP/1.1</span><span className="text-blue-600 dark:text-blue-400">"</span> <span className="text-purple-600 dark:text-purple-400">200</span> <span className="text-orange-600 dark:text-orange-400">1234</span>
                      </pre>
                    </div>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Standard format used by Apache and Nginx web servers, showing IP, timestamp, HTTP method, path, status and size.
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-md overflow-hidden shadow-sm">
                  <div className="bg-indigo-100 dark:bg-indigo-900/50 px-4 py-2 border-l-4 border-indigo-500">
                    <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">Combined Log Format</h4>
                  </div>
                  <div className="p-4">
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700 overflow-x-auto">
                      <pre className="p-3 text-xs leading-relaxed text-gray-800 dark:text-gray-200 font-mono">
                        <span className="text-orange-600 dark:text-orange-400">123.45.67.89</span> <span className="text-gray-500 dark:text-gray-500">- user1</span> <span className="text-blue-600 dark:text-blue-400">[</span><span className="text-green-600 dark:text-green-400">01/Jan/2023:12:34:56 +0000</span><span className="text-blue-600 dark:text-blue-400">]</span> <span className="text-blue-600 dark:text-blue-400">"</span><span className="text-purple-600 dark:text-purple-400">GET</span> <span className="text-green-600 dark:text-green-400">/example/path</span> <span className="text-gray-500 dark:text-gray-500">HTTP/1.1</span><span className="text-blue-600 dark:text-blue-400">"</span> <span className="text-purple-600 dark:text-purple-400">200</span> <span className="text-orange-600 dark:text-orange-400">1234</span> <span className="text-blue-600 dark:text-blue-400">"</span><span className="text-gray-500 dark:text-gray-500">https://referrer.com</span><span className="text-blue-600 dark:text-blue-400">"</span> <span className="text-blue-600 dark:text-blue-400">"</span><span className="text-gray-500 dark:text-gray-500">Mozilla/5.0...</span><span className="text-blue-600 dark:text-blue-400">"</span>
                      </pre>
                    </div>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Extended format with referrer information and user agent details.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 flex items-center bg-blue-50 dark:bg-blue-900/30 p-3 rounded-md border border-blue-100 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="text-xs text-blue-700 dark:text-blue-300">
                  Other common log formats are automatically detected. Upload your log file and our analyzer will determine the best parsing strategy.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
