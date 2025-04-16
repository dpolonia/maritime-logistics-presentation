import axios from 'axios';
import { useState, useEffect } from 'react';
import useSWR from 'swr';

// Configuration based on environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
const OREILLY_API_URL = process.env.NEXT_PUBLIC_OREILLY_API_URL || '';
const AZURE_API_URL = process.env.NEXT_PUBLIC_AZURE_API_URL || '';

// API connection timeouts
const DEFAULT_TIMEOUT = 10000; // 10 seconds
const EXTENDED_TIMEOUT = 30000; // 30 seconds for larger operations

// Create pre-configured API clients
export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const oreillyClient = axios.create({
  baseURL: OREILLY_API_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const azureClient = axios.create({
  baseURL: AZURE_API_URL,
  timeout: EXTENDED_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication tokens
apiClient.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle session expiration
    if (error.response?.status === 401) {
      // Clear invalid credentials
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        window.dispatchEvent(new Event('auth_changed'));
      }
    }
    
    // Log errors for monitoring
    console.error('API Error:', error.response?.data || error.message);
    
    // Network errors handling for offline situations
    if (error.message === 'Network Error') {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('connection_lost'));
      }
    }
    
    return Promise.reject(error);
  }
);

// SWR fetcher function for data fetching
export const fetcher = async (url: string) => {
  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Hook for feature flags
export function useFeatureFlag(flagName: string, defaultValue = false) {
  const [enabled, setEnabled] = useState(defaultValue);
  
  useEffect(() => {
    // Check if feature flags are available in localStorage or remote config
    const checkFeatureFlag = async () => {
      try {
        // First check local storage
        const localFlags = localStorage.getItem('feature_flags');
        if (localFlags) {
          const parsedFlags = JSON.parse(localFlags);
          if (flagName in parsedFlags) {
            setEnabled(parsedFlags[flagName]);
            return;
          }
        }
        
        // Then try to fetch from remote config
        const response = await apiClient.get('/api/feature-flags');
        const remoteFlags = response.data;
        
        if (flagName in remoteFlags) {
          setEnabled(remoteFlags[flagName]);
          
          // Update local cache
          localStorage.setItem('feature_flags', JSON.stringify({
            ...JSON.parse(localFlags || '{}'),
            [flagName]: remoteFlags[flagName],
          }));
        }
      } catch (error) {
        console.error('Error fetching feature flags:', error);
        // Fall back to default value
      }
    };
    
    checkFeatureFlag();
  }, [flagName, defaultValue]);
  
  return enabled;
}

// Hook for using remote configuration
export function useConfig<T>(configKey: string, defaultValue: T) {
  const { data, error } = useSWR<T>(`/api/config/${configKey}`, fetcher);
  
  return {
    data: data || defaultValue,
    isLoading: !error && !data,
    error,
  };
}

// Analytics event tracking
export function trackEvent(eventName: string, eventData: Record<string, any> = {}) {
  // If Google Analytics is available
  if (typeof window !== 'undefined' && 'gtag' in window) {
    // @ts-ignore
    window.gtag('event', eventName, eventData);
  }
  
  // Send to our own analytics service
  apiClient.post('/api/analytics/event', {
    event: eventName,
    data: eventData,
    timestamp: new Date().toISOString(),
    sessionId: getSessionId(),
  }).catch(err => {
    // Silently fail analytics calls
    console.error('Analytics error:', err);
  });
}

// Get or create a unique session ID
function getSessionId() {
  if (typeof window === 'undefined') return '';
  
  let sessionId = localStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem('session_id', sessionId);
  }
  
  return sessionId;
}