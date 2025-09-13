import React, { useEffect, useState } from 'react';

export default function PerformanceMonitor() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionType, setConnectionType] = useState('unknown');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check connection type if available
    if ('connection' in navigator) {
      setConnectionType(navigator.connection.effectiveType || 'unknown');
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Show offline indicator
  if (!isOnline) {
    return (
      <div className="fixed top-0 left-0 right-0 bg-red-500 text-white text-center py-2 text-sm z-50">
        📡 You're offline. Some features may not work.
      </div>
    );
  }

  // Show slow connection warning
  if (connectionType === 'slow-2g' || connectionType === '2g') {
    return (
      <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-white text-center py-2 text-sm z-50">
        🐌 Slow connection detected. Loading optimized version...
      </div>
    );
  }

  return null;
}
