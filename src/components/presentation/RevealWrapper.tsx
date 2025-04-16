import React, { useEffect, useRef } from 'react';

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
    // Mock Reveal.js initialization for demonstration
    console.log('Initializing presentation with config:', config);
    
    // In a production environment, this would initialize Reveal.js
    // Since we're just demonstrating the UI, we'll add some basic functionality
    if (revealRef.current) {
      // Add some basic styling for the presentation container
      revealRef.current.style.height = '100%';
      revealRef.current.style.width = '100%';
      revealRef.current.style.position = 'relative';
      
      // Apply styles to sections (slides)
      const sections = revealRef.current.querySelectorAll('section');
      sections.forEach((section, index) => {
        const sectionEl = section as HTMLElement;
        
        // Make only the first slide visible initially
        sectionEl.style.display = index === 0 ? 'block' : 'none';
        sectionEl.style.height = '100%';
        sectionEl.style.width = '100%';
        sectionEl.style.padding = '20px';
        sectionEl.style.boxSizing = 'border-box';
      });
      
      // Add a class to indicate initialization is complete
      document.body.classList.add('reveal-initialized');
    }
    
    return () => {
      // Cleanup
      document.body.classList.remove('reveal-initialized');
    };
  }, [config]);
  
  return (
    <div ref={revealRef} className="reveal">
      <div className="slides">
        {children}
      </div>
    </div>
  );
};

export default RevealWrapper;