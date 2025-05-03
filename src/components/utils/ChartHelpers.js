'use client';

// Helper functions for chart-related functionality

export const getChartColors = (count, isDark = false) => {
  const baseColors = isDark 
    ? ['#60a5fa', '#34d399', '#a78bfa', '#f87171', '#fbbf24', '#ec4899', '#14b8a6', '#f97316', '#64748b']
    : ['#3b82f6', '#10b981', '#8b5cf6', '#ef4444', '#f59e0b', '#ec4899', '#06b6d4', '#ea580c', '#475569'];
  
  return Array(count).fill(0).map((_, i) => baseColors[i % baseColors.length]);
};

export const formatDuration = (ms) => {
  if (!ms) return 'N/A';
  
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
};
