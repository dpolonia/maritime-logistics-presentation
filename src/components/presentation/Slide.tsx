import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface SlideProps {
  children: ReactNode;
  id?: string;
  className?: string;
  background?: string | { color?: string; image?: string; video?: string; iframe?: string };
  transition?: {
    in?: 'fade' | 'slide' | 'zoom' | 'flip' | 'none';
    out?: 'fade' | 'slide' | 'zoom' | 'flip' | 'none';
    duration?: number;
  };
  notes?: string;
  autoAnimate?: boolean;
  dataAutoslide?: number;
}

export default function Slide({
  children,
  id,
  className = '',
  background,
  transition = { in: 'fade', out: 'fade', duration: 0.5 },
  notes,
  autoAnimate = false,
  dataAutoslide,
}: SlideProps) {
  // Process background settings
  let backgroundAttrs: Record<string, string> = {};
  if (background) {
    if (typeof background === 'string') {
      backgroundAttrs['data-background-color'] = background;
    } else {
      if (background.color) backgroundAttrs['data-background-color'] = background.color;
      if (background.image) backgroundAttrs['data-background-image'] = background.image;
      if (background.video) backgroundAttrs['data-background-video'] = background.video;
      if (background.iframe) backgroundAttrs['data-background-iframe'] = background.iframe;
    }
  }

  // Animation variants for Framer Motion
  const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Accessibility improvements
  const slideClasses = `slide ${className}`;
  
  return (
    <section 
      id={id}
      className={slideClasses}
      {...backgroundAttrs}
      data-auto-animate={autoAnimate ? '' : undefined}
      data-autoslide={dataAutoslide}
      aria-roledescription="slide"
    >
      {/* Speaker notes for the presenter */}
      {notes && (
        <aside className="notes" aria-hidden="true">
          {notes}
        </aside>
      )}

      {/* Slide content with animation */}
      <motion.div 
        className="slide-content"
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ duration: transition.duration }}
      >
        {children}
      </motion.div>
    </section>
  );
}