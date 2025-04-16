'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Image from "next/image";
import PresentationLayout from '@/components/layout/PresentationLayout';
import Slide from '@/components/presentation/Slide';
import SlideContent from '@/components/presentation/SlideContent';
import { initAccessibility } from '@/utils/accessibility';
import { initPerformanceMonitoring, startTiming, endTiming } from '@/utils/performance';

// Dynamically import RevealWrapper to avoid SSR issues
const RevealWrapper = dynamic(
  () => import('@/components/presentation/RevealWrapper'),
  { ssr: false }
);

export default function Home() {
  // Initialize monitoring and accessibility
  useEffect(() => {
    startTiming('page-initialization');
    initAccessibility();
    initPerformanceMonitoring();
    
    return () => {
      endTiming('page-initialization');
    };
  }, []);

  return (
    <PresentationLayout 
      title="Optimized Presentation System" 
      description="High-performance presentation system for Vercel deployment"
      showControls={true}
      transition="slide"
    >
      <RevealWrapper
        config={{
          controls: true,
          progress: true,
          center: true,
          transition: 'slide',
          backgroundTransition: 'fade',
          viewDistance: 3,
          autoPlayMedia: true,
          fragments: true,
          // For accessibility
          accessibility: {
            keyboardNavigation: true,
            skipLinks: true,
            navigationMode: 'linear',
            help: true,
          },
          // Track performance metrics during the presentation
          presentationRecording: process.env.NODE_ENV === 'development',
        }}
      >
        {/* Title Slide */}
        <Slide
          id="title-slide"
          background={{ color: '#0369a1' }}
          transition={{ in: 'zoom', out: 'fade' }}
        >
          <SlideContent>
            <h1 className="text-5xl font-bold text-white mb-6">
              Optimized Presentation System
            </h1>
            <h2 className="text-3xl text-white/90 mb-8">
              For Vercel Deployment
            </h2>
            <p className="text-xl text-white/80">
              High Performance • Accessibility • Global Reach
            </p>
          </SlideContent>
        </Slide>

        {/* Features Slide */}
        <Slide
          id="features"
          background={{ color: '#ffffff' }}
        >
          <SlideContent>
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Key Features</h2>
          </SlideContent>
          
          <SlideContent fragment animateFrom="left" delay={0.2}>
            <div className="flex items-center mb-6 p-4 bg-blue-50 rounded-lg shadow-sm">
              <div className="bg-blue-600 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">Optimized Performance</h3>
                <p className="text-gray-600">Progressive loading, CDN configuration, and asset optimization</p>
              </div>
            </div>
          </SlideContent>
          
          <SlideContent fragment animateFrom="left" delay={0.4}>
            <div className="flex items-center mb-6 p-4 bg-purple-50 rounded-lg shadow-sm">
              <div className="bg-purple-600 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">Global Distribution</h3>
                <p className="text-gray-600">Content delivery network for global audiences with low latency</p>
              </div>
            </div>
          </SlideContent>
          
          <SlideContent fragment animateFrom="left" delay={0.6}>
            <div className="flex items-center p-4 bg-green-50 rounded-lg shadow-sm">
              <div className="bg-green-600 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">Accessibility</h3>
                <p className="text-gray-600">WCAG 2.1 AA compliance with responsive design</p>
              </div>
            </div>
          </SlideContent>
        </Slide>

        {/* Architecture Slide */}
        <Slide
          id="architecture"
          background={{ color: '#f8fafc' }}
        >
          <SlideContent>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Deployment Architecture</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="col-span-3 bg-blue-600 text-white p-4 rounded-t-lg font-bold">
                  Client Experience
                </div>
                
                <div className="col-span-3 grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-blue-100 p-3 rounded">
                    <div className="font-medium">Browser Caching</div>
                    <div className="text-sm text-gray-600">Optimized Headers</div>
                  </div>
                  <div className="bg-blue-100 p-3 rounded">
                    <div className="font-medium">PWA Support</div>
                    <div className="text-sm text-gray-600">Offline Access</div>
                  </div>
                  <div className="bg-blue-100 p-3 rounded">
                    <div className="font-medium">Reduced Bundle</div>
                    <div className="text-sm text-gray-600">Code Splitting</div>
                  </div>
                </div>
                
                <div className="col-span-3 bg-purple-600 text-white p-4 font-bold">
                  Vercel Edge Network
                </div>
                
                <div className="col-span-3 grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-purple-100 p-3 rounded">
                    <div className="font-medium">Global CDN</div>
                    <div className="text-sm text-gray-600">200+ Locations</div>
                  </div>
                  <div className="bg-purple-100 p-3 rounded">
                    <div className="font-medium">Edge Functions</div>
                    <div className="text-sm text-gray-600">Low Latency</div>
                  </div>
                  <div className="bg-purple-100 p-3 rounded">
                    <div className="font-medium">ISR Caching</div>
                    <div className="text-sm text-gray-600">Dynamic Content</div>
                  </div>
                </div>
                
                <div className="col-span-3 bg-green-600 text-white p-4 font-bold">
                  Backend Services
                </div>
                
                <div className="col-span-3 grid grid-cols-2 gap-4">
                  <div className="bg-green-100 p-3 rounded">
                    <div className="font-medium">O'Reilly API</div>
                    <div className="text-sm text-gray-600">Content Source</div>
                  </div>
                  <div className="bg-green-100 p-3 rounded">
                    <div className="font-medium">Azure Services</div>
                    <div className="text-sm text-gray-600">Analytics & Auth</div>
                  </div>
                </div>
              </div>
            </div>
          </SlideContent>
        </Slide>

        {/* Performance Slide */}
        <Slide
          id="performance"
          background={{ color: '#0c4a6e' }}
          transition={{ in: 'slide', out: 'fade' }}
        >
          <SlideContent>
            <h2 className="text-4xl font-bold text-white mb-8">Performance Metrics</h2>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <h3 className="text-2xl font-semibold text-white mb-4">Load Time</h3>
                <div className="flex items-end">
                  <div className="text-5xl font-bold text-white">
                    <span className="tabular-nums">&lt;1s</span>
                  </div>
                  <div className="text-xl text-white/70 ml-2 pb-1">FCP</div>
                </div>
                <div className="text-sm text-white/60 mt-2">
                  First contentful paint on a global CDN
                </div>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <h3 className="text-2xl font-semibold text-white mb-4">Bundle Size</h3>
                <div className="flex items-end">
                  <div className="text-5xl font-bold text-white">
                    <span className="tabular-nums">~120kb</span>
                  </div>
                  <div className="text-xl text-white/70 ml-2 pb-1">gzipped</div>
                </div>
                <div className="text-sm text-white/60 mt-2">
                  Optimized JavaScript with code splitting
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-semibold text-white mb-4">Web Vitals</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="font-medium text-white">LCP</div>
                  <div className="text-xl font-bold text-green-400">1.2s</div>
                  <div className="text-xs text-white/60">Largest Contentful Paint</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-white">CLS</div>
                  <div className="text-xl font-bold text-green-400">0.05</div>
                  <div className="text-xs text-white/60">Cumulative Layout Shift</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-white">FID</div>
                  <div className="text-xl font-bold text-green-400">70ms</div>
                  <div className="text-xs text-white/60">First Input Delay</div>
                </div>
              </div>
            </div>
          </SlideContent>
          
          <aside className="notes">
            Our system achieves excellent performance metrics through careful optimization:
            - Load time under 1s for first contentful paint
            - Small bundle size through code splitting and tree shaking
            - Excellent Web Vitals scores that exceed Google's recommendations
          </aside>
        </Slide>

        {/* Environment Variables Slide */}
        <Slide
          id="environment-variables"
          background={{ color: '#ffffff' }}
        >
          <SlideContent>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Environment Configuration</h2>
            
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg font-mono text-sm overflow-hidden">
              <div className="bg-gray-800 text-white p-3 -mx-6 -mt-6 mb-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <div className="flex-1 text-center">Environment Variables</div>
                </div>
              </div>
              
              <div className="mb-4">
                <span className="text-purple-600 font-semibold"># API Connections</span>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div>
                    <span className="text-blue-600">NEXT_PUBLIC_API_URL</span>=
                    <span className="text-green-600">https://api.example.com</span>
                  </div>
                  <div>
                    <span className="text-blue-600">NEXT_PUBLIC_API_VERSION</span>=
                    <span className="text-green-600">v2</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <span className="text-purple-600 font-semibold"># Integration Points</span>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div>
                    <span className="text-blue-600">NEXT_PUBLIC_OREILLY_API_URL</span>=
                    <span className="text-green-600">https://api.oreilly.com</span>
                  </div>
                  <div>
                    <span className="text-blue-600">NEXT_PUBLIC_AZURE_API_URL</span>=
                    <span className="text-green-600">https://api.azure.com</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <span className="text-purple-600 font-semibold"># Feature Flags</span>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div>
                    <span className="text-blue-600">NEXT_PUBLIC_ENABLE_ANALYTICS</span>=
                    <span className="text-green-600">true</span>
                  </div>
                  <div>
                    <span className="text-blue-600">NEXT_PUBLIC_ENABLE_RECORDING</span>=
                    <span className="text-green-600">false</span>
                  </div>
                </div>
              </div>
              
              <div>
                <span className="text-purple-600 font-semibold"># Performance Monitoring</span>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div>
                    <span className="text-blue-600">NEXT_PUBLIC_PERFORMANCE_MONITORING</span>=
                    <span className="text-green-600">true</span>
                  </div>
                  <div>
                    <span className="text-blue-600">NEXT_PUBLIC_ANALYTICS_ID</span>=
                    <span className="text-green-600">UA-XXXXXXXXX-X</span>
                  </div>
                </div>
              </div>
            </div>
          </SlideContent>
        </Slide>

        {/* Final Slide with Call to Action */}
        <Slide
          id="final"
          background={{ color: '#0ea5e9' }}
          transition={{ in: 'zoom', out: 'fade' }}
        >
          <SlideContent>
            <h2 className="text-5xl font-bold text-white mb-8">Ready to Deploy</h2>
            
            <div className="bg-white/20 backdrop-blur-sm p-8 rounded-lg max-w-2xl mx-auto">
              <p className="text-2xl text-white mb-6">
                The presentation system is optimized for global delivery with Vercel, ensuring reliable performance and accessibility.
              </p>
              
              <div className="flex justify-center mt-8">
                <a 
                  href="https://vercel.com/new" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-xl shadow-lg hover:bg-blue-50 transition-colors flex items-center"
                >
                  <Image
                    className="mr-2"
                    src="/vercel.svg"
                    alt="Vercel logomark"
                    width={20}
                    height={20}
                  />
                  Deploy to Vercel
                </a>
              </div>
            </div>
          </SlideContent>
        </Slide>
      </RevealWrapper>
    </PresentationLayout>
  );
}
