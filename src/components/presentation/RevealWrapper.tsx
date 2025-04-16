import React, { useEffect, useRef } from 'react';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/white.css';

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
    let Reveal: any;
    
    // Dynamically import Reveal.js
    const loadReveal = async () => {
      try {
        Reveal = (await import('reveal.js')).default;
        
        if (revealRef.current) {
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
          console.log('Reveal.js initialized successfully');
        }
      } catch (error) {
        console.error('Failed to initialize Reveal.js:', error);
      }
    };
    
    loadReveal();
    
    return () => {
      // No explicit cleanup needed as Reveal.js doesn't provide a destroy method
      // But we could remove event listeners if needed
    };
  }, [config]);
  
  return (
    <div className="reveal-container" style={{ width: '100%', height: '100%' }}>
      <div ref={revealRef} className="reveal">
        <div className="slides">
          {children}
        </div>
      </div>
    </div>
  );
};

export default RevealWrapper;