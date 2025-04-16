// Utility functions for monitoring, analytics, and error tracking

// Send a performance metric to the monitoring API
export async function trackPerformanceMetric({
  metricType,
  value,
  sessionId,
  additionalData = {}
}: {
  metricType: string;
  value: number;
  sessionId?: number;
  additionalData?: Record<string, any>;
}) {
  if (typeof window === 'undefined' || !process.env.NEXT_PUBLIC_PERFORMANCE_MONITORING) {
    return;
  }
  
  try {
    // Get device and browser info
    const deviceInfo = {
      type: getDeviceType(),
      browser: getBrowserInfo(),
      os: getOSInfo(),
    };
    
    const response = await fetch('/api/monitor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: metricType,
        value,
        sessionId,
        deviceInfo,
        ...additionalData,
      }),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to track performance metric:', error);
    return null;
  }
}

// Track critical page metrics using Performance API
export function trackPageMetrics(sessionId?: number) {
  if (typeof window === 'undefined' || !process.env.NEXT_PUBLIC_PERFORMANCE_MONITORING) {
    return;
  }
  
  // Wait for all resources to load
  window.addEventListener('load', () => {
    setTimeout(() => {
      const performanceEntries = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      // Track page load time
      trackPerformanceMetric({
        metricType: 'page_load',
        value: performanceEntries.duration,
        sessionId,
      });
      
      // Track Time to First Byte (TTFB)
      trackPerformanceMetric({
        metricType: 'ttfb',
        value: performanceEntries.responseStart - performanceEntries.requestStart,
        sessionId,
      });
      
      // Track First Contentful Paint (FCP) if available
      const paintEntries = performance.getEntriesByType('paint');
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      
      if (fcpEntry) {
        trackPerformanceMetric({
          metricType: 'fcp',
          value: fcpEntry.startTime,
          sessionId,
        });
      }
    }, 0);
  });
}

// Log a message to the backend logging service
export async function logMessage({
  type,
  message,
  sessionId,
  slideType,
  metadata = {}
}: {
  type: 'info' | 'warning' | 'error';
  message: string;
  sessionId?: number;
  slideType?: string;
  metadata?: Record<string, any>;
}) {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    const response = await fetch('/api/logger', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        message,
        sessionId,
        slideType,
        metadata,
      }),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to log message:', error);
    return null;
  }
}

// Session recording functions
export function initSessionRecording(sessionId: number) {
  if (
    typeof window === 'undefined' ||
    !process.env.NEXT_PUBLIC_FEATURE_SESSION_RECORDING ||
    !sessionId
  ) {
    return null;
  }
  
  let events: Array<{
    type: string;
    timestamp: number;
    data: any;
  }> = [];
  
  // Record user interactions
  const recordEvent = (type: string, data: any) => {
    events.push({
      type,
      timestamp: Date.now(),
      data,
    });
    
    // If we have accumulated many events, flush them to the server
    if (events.length >= 50) {
      flushEvents();
    }
  };
  
  // Send events to the server
  const flushEvents = async () => {
    if (events.length === 0) return;
    
    const eventsToSend = [...events];
    events = [];
    
    try {
      await fetch('/api/session-recording', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          events: eventsToSend,
          metadata: {
            browser: getBrowserInfo(),
            os: getOSInfo(),
            deviceType: getDeviceType(),
          },
        }),
      });
    } catch (error) {
      console.error('Failed to send session recording events:', error);
      // Add events back to the queue
      events = [...eventsToSend, ...events];
    }
  };
  
  // Set up event listeners
  window.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    recordEvent('click', {
      target: target.tagName,
      id: target.id,
      className: target.className,
      innerText: target.innerText?.substring(0, 50),
      path: getElementPath(target),
    });
  });
  
  // Record slide changes
  const recordSlideChange = (slideIndex: number, slideType: string) => {
    recordEvent('slide_change', {
      slideIndex,
      slideType,
    });
  };
  
  // Record participant engagement
  const recordEngagement = (type: string, data: any) => {
    recordEvent('engagement', {
      type,
      ...data,
    });
  };
  
  // Flush events periodically and before unload
  const intervalId = setInterval(flushEvents, 10000);
  window.addEventListener('beforeunload', flushEvents);
  
  // Cleanup function
  const cleanup = () => {
    clearInterval(intervalId);
    window.removeEventListener('beforeunload', flushEvents);
    flushEvents();
  };
  
  return {
    recordSlideChange,
    recordEngagement,
    cleanup,
  };
}

// Helper functions
function getDeviceType(): string {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
}

function getBrowserInfo(): string {
  const userAgent = navigator.userAgent;
  let browserName = 'Unknown';
  
  if (userAgent.match(/chrome|chromium|crios/i)) {
    browserName = 'Chrome';
  } else if (userAgent.match(/firefox|fxios/i)) {
    browserName = 'Firefox';
  } else if (userAgent.match(/safari/i)) {
    browserName = 'Safari';
  } else if (userAgent.match(/opr\//i)) {
    browserName = 'Opera';
  } else if (userAgent.match(/edg/i)) {
    browserName = 'Edge';
  }
  
  return browserName;
}

function getOSInfo(): string {
  const userAgent = navigator.userAgent;
  let osName = 'Unknown';
  
  if (userAgent.indexOf('Win') !== -1) {
    osName = 'Windows';
  } else if (userAgent.indexOf('Mac') !== -1) {
    osName = 'MacOS';
  } else if (userAgent.indexOf('Linux') !== -1) {
    osName = 'Linux';
  } else if (userAgent.indexOf('Android') !== -1) {
    osName = 'Android';
  } else if (userAgent.indexOf('like Mac') !== -1) {
    osName = 'iOS';
  }
  
  return osName;
}

function getElementPath(element: HTMLElement): string {
  let path = '';
  let currentElement: HTMLElement | null = element;
  
  while (currentElement && currentElement !== document.body) {
    let selector = currentElement.tagName.toLowerCase();
    
    if (currentElement.id) {
      selector += `#${currentElement.id}`;
    } else if (currentElement.className) {
      selector += `.${currentElement.className.split(' ')[0]}`;
    }
    
    path = path ? `${selector} > ${path}` : selector;
    currentElement = currentElement.parentElement;
  }
  
  return path;
}
