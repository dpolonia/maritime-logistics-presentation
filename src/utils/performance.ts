// Performance monitoring utilities
import { trackEvent } from './api';

export interface PerformanceMetric {
  name: string;
  value: number;
  startTime?: number;
  rating?: 'good' | 'needs-improvement' | 'poor';
  context?: Record<string, any>;
}

interface PerformanceTimings {
  [key: string]: number;
}

// Store timing marks for performance measurements
const timings: PerformanceTimings = {};

/**
 * Start timing a performance metric
 */
export function startTiming(name: string): void {
  timings[name] = performance.now();
}

/**
 * End timing a performance metric and report it
 */
export function endTiming(name: string, context: Record<string, any> = {}): PerformanceMetric {
  if (!timings[name]) {
    console.warn(`No timing started for ${name}`);
    return { name, value: 0, context };
  }

  const startTime = timings[name];
  const endTime = performance.now();
  const duration = endTime - startTime;
  
  // Clean up timing
  delete timings[name];
  
  // Create metric object
  const metric: PerformanceMetric = {
    name,
    value: Math.round(duration),
    startTime,
    context,
  };
  
  // Set performance rating
  metric.rating = getRating(name, duration);
  
  // Report the metric
  reportPerformanceMetric(metric);
  
  return metric;
}

/**
 * Get performance rating based on metric name and value
 */
function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  // Define thresholds for different types of operations
  const thresholds: Record<string, { good: number; poor: number }> = {
    'slide-transition': { good: 300, poor: 1000 },
    'slide-load': { good: 500, poor: 2000 },
    'api-request': { good: 300, poor: 1000 },
    'render': { good: 100, poor: 300 },
    'animation': { good: 16, poor: 50 }, // For 60fps, frames should take <16ms
    'default': { good: 200, poor: 1000 },
  };
  
  // Find the appropriate threshold category
  let category = 'default';
  for (const key of Object.keys(thresholds)) {
    if (name.includes(key)) {
      category = key;
      break;
    }
  }
  
  const { good, poor } = thresholds[category];
  
  if (value <= good) return 'good';
  if (value >= poor) return 'poor';
  return 'needs-improvement';
}

/**
 * Report a performance metric to analytics and monitoring services
 */
function reportPerformanceMetric(metric: PerformanceMetric): void {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    const color = metric.rating === 'good' ? 'green' : metric.rating === 'poor' ? 'red' : 'orange';
    console.log(
      `%cPerformance: ${metric.name} - ${metric.value}ms (${metric.rating})`,
      `color: ${color}; font-weight: bold;`
    );
  }
  
  // Send to analytics
  trackEvent('performance_metric', {
    metric_name: metric.name,
    metric_value: metric.value,
    metric_rating: metric.rating,
    ...metric.context,
  });
  
  // If real-time monitoring is enabled and Web Vitals is supported
  if (typeof window !== 'undefined' && 'reportWebVitals' in window) {
    // @ts-ignore - Custom global function
    window.reportWebVitals({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
    });
  }
  
  // Report to monitoring dashboards for real-time display if enabled
  if (
    typeof window !== 'undefined' && 
    process.env.NEXT_PUBLIC_PERFORMANCE_MONITORING === 'true'
  ) {
    try {
      // If socket connection exists, send the metric
      if ('_monitor' in window && typeof window._monitor?.emit === 'function') {
        // @ts-ignore - Custom global socket
        window._monitor.emit('performance', metric);
      }
    } catch (error) {
      // Silently fail socket reporting
      console.error('Performance monitoring error:', error);
    }
  }
}

/**
 * Track resource loading performance
 */
export function trackResourceLoading(): void {
  if (typeof window === 'undefined') return;
  
  // Track resources on load
  window.addEventListener('load', () => {
    // Use Performance API to get resource timings
    const resources = performance.getEntriesByType('resource');
    
    // Group resources by type
    const resourcesByType: Record<string, PerformanceResourceTiming[]> = {};
    
    resources.forEach((resource) => {
      const entry = resource as PerformanceResourceTiming;
      const url = entry.name;
      let type = 'other';
      
      // Determine resource type
      if (url.match(/\.(js)(\?|$)/)) type = 'script';
      else if (url.match(/\.(css)(\?|$)/)) type = 'style';
      else if (url.match(/\.(jpe?g|png|gif|svg|webp)(\?|$)/)) type = 'image';
      else if (url.match(/\.(woff2?|ttf|otf|eot)(\?|$)/)) type = 'font';
      
      if (!resourcesByType[type]) resourcesByType[type] = [];
      resourcesByType[type].push(entry);
    });
    
    // Report summary metrics by type
    Object.entries(resourcesByType).forEach(([type, entries]) => {
      // Calculate total and average
      const total = entries.reduce((sum, entry) => sum + entry.duration, 0);
      const average = Math.round(total / entries.length);
      const count = entries.length;
      
      // Report as performance metric
      reportPerformanceMetric({
        name: `resources-${type}`,
        value: average,
        context: { count, total },
      });
    });
  });
}

/**
 * Initialize performance monitoring
 */
export function initPerformanceMonitoring(): void {
  if (typeof window === 'undefined') return;
  
  // Track page load performance
  startTiming('page-load');
  
  window.addEventListener('load', () => {
    endTiming('page-load', {
      url: window.location.pathname,
    });
    
    // Track FCP and LCP using Web Vitals if available
    if ('webVitals' in window) {
      import('web-vitals').then(({ onFCP, onLCP, onCLS, onFID, onTTFB }) => {
        onFCP((metric) => {
          reportPerformanceMetric({
            name: 'first-contentful-paint',
            value: Math.round(metric.value),
            rating: metric.rating as any,
          });
        });
        
        onLCP((metric) => {
          reportPerformanceMetric({
            name: 'largest-contentful-paint',
            value: Math.round(metric.value),
            rating: metric.rating as any,
          });
        });
        
        onCLS((metric) => {
          reportPerformanceMetric({
            name: 'cumulative-layout-shift',
            value: metric.value * 1000, // Scale to compare with time metrics
            rating: metric.rating as any,
          });
        });
        
        onFID((metric) => {
          reportPerformanceMetric({
            name: 'first-input-delay',
            value: Math.round(metric.value),
            rating: metric.rating as any,
          });
        });
        
        onTTFB((metric) => {
          reportPerformanceMetric({
            name: 'time-to-first-byte',
            value: Math.round(metric.value),
            rating: metric.rating as any,
          });
        });
      }).catch(err => {
        console.error('Failed to load web-vitals:', err);
      });
    }
  });
  
  // Track resource loading
  trackResourceLoading();
}