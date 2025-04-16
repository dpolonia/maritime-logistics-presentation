import React, { ReactNode, useEffect } from 'react';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Error boundary for presentation components
class ErrorBoundary extends React.Component<
  { children: ReactNode }, 
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to monitoring service
    console.error('Presentation component error:', error, errorInfo);
    
    // Could send to a real monitoring service here
    if (typeof window !== 'undefined' && 'sendErrorTelemetry' in window) {
      // @ts-ignore - Custom global function
      window.sendErrorTelemetry(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
            <p className="text-gray-700 mb-4">
              There was an error in the presentation. Technical support has been notified.
            </p>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-40">
              {this.state.error?.message}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Reload Presentation
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

type PresentationLayoutProps = {
  children: ReactNode;
  title: string;
  description?: string;
  showControls?: boolean;
  transition?: 'none' | 'fade' | 'slide' | 'convex' | 'concave' | 'zoom';
};

export default function PresentationLayout({
  children,
  title,
  description = 'Interactive presentation system',
  showControls = true,
  transition = 'slide',
}: PresentationLayoutProps) {
  // Performance monitoring for presentations
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Report web vitals
      const reportWebVitals = async () => {
        const { onCLS, onFID, onLCP } = await import('web-vitals');
        
        const sendToAnalytics = ({ name, delta, id }: { name: string; delta: number; id: string }) => {
          // Send to analytics service
          console.log('Web vitals:', { name, delta, id });
          
          // Example for real analytics service
          // window.gtag('event', name, {
          //   event_category: 'Web Vitals',
          //   event_label: id,
          //   value: Math.round(name === 'CLS' ? delta * 1000 : delta),
          //   non_interaction: true,
          // });
        };
        
        onCLS(sendToAnalytics);
        onFID(sendToAnalytics);
        onLCP(sendToAnalytics);
      };
      
      reportWebVitals();
    }
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        
        {/* PWA support */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        
        {/* Preload critical assets */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Supports older browsers */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </Head>
      
      <ErrorBoundary>
        <main className="reveal-presentation">
          <div 
            className="reveal" 
            data-transition={transition}
            data-controls={showControls ? 'true' : 'false'}
          >
            <div className="slides">
              {children}
            </div>
          </div>
        </main>
      </ErrorBoundary>
      
      {/* Vercel Analytics for performance monitoring */}
      <Analytics />
      <SpeedInsights />
    </>
  );
}