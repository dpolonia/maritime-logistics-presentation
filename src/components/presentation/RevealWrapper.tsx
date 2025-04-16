import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Cannot import CSS server-side
const RevealStyles = dynamic(
  () => import('./RevealStyles'),
  { ssr: false }
);

interface RevealWrapperProps {
  children: React.ReactNode;
  config?: {
    controls?: boolean;
    progress?: boolean;
    center?: boolean;
    transition?: string;
    backgroundTransition?: string;
    viewDistance?: number;
    autoPlayMedia?: boolean;
    fragments?: boolean;
    accessibility?: {
      keyboardNavigation?: boolean;
      skipLinks?: boolean;
      navigationMode?: string;
      help?: boolean;
    };
    presentationRecording?: boolean;
  };
}

const RevealWrapper: React.FC<RevealWrapperProps> = ({ children, config = {} }) => {
  const revealRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined' || !revealRef.current) return;
    
    // Check if Reveal is available as global variable from CDN
    if (typeof window.Reveal !== 'undefined') {
      try {
        const reveal = new window.Reveal(revealRef.current, {
          controls: config.controls !== false,
          progress: config.progress !== false,
          center: config.center !== false,
          hash: true,
          transition: config.transition || 'slide',
          backgroundTransition: config.backgroundTransition || 'fade',
          viewDistance: config.viewDistance || 3,
          autoPlayMedia: config.autoPlayMedia !== false,
          fragments: config.fragments !== false,
          ...config
        });
        
        reveal.initialize();
        console.log('Reveal.js initialized successfully from CDN');
      } catch (error) {
        console.error('Failed to initialize Reveal.js from CDN:', error);
      }
    } else {
      // Fallback: Load from npm package if CDN failed
      const loadRevealFromNpm = async () => {
        try {
          const RevealModule = await import('reveal.js');
          const Reveal = RevealModule.default;
          
          const reveal = new Reveal(revealRef.current, {
            controls: config.controls !== false,
            progress: config.progress !== false,
            center: config.center !== false,
            hash: true,
            transition: config.transition || 'slide',
            backgroundTransition: config.backgroundTransition || 'fade',
            viewDistance: config.viewDistance || 3,
            autoPlayMedia: config.autoPlayMedia !== false,
            fragments: config.fragments !== false,
            ...config
          });
          
          await reveal.initialize();
          console.log('Reveal.js initialized successfully from npm package');
        } catch (error) {
          console.error('Failed to initialize Reveal.js from npm package:', error);
        }
      };
      
      // Wait a bit for CDN to potentially load
      setTimeout(() => {
        if (typeof window.Reveal === 'undefined') {
          loadRevealFromNpm();
        }
      }, 1000);
    }
    
    return () => {
      // Cleanup could be added here if needed
    };
  }, [config]);
  
  return (
    <>
      <RevealStyles />
      <div className="reveal-container" style={{ width: '100%', height: '700px', maxHeight: '90vh' }}>
        <div ref={revealRef} className="reveal">
          <div className="slides">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

// Add global type definition
declare global {
  interface Window {
    Reveal?: any;
  }
}

export default RevealWrapper;