import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface SlideContentProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
  fragment?: boolean;
  animateFrom?: 'left' | 'right' | 'top' | 'bottom' | 'center';
  delay?: number;
  duration?: number;
  index?: number;
}

export default function SlideContent({
  children,
  className = '',
  animate = true,
  fragment = false,
  animateFrom = 'bottom',
  delay = 0,
  duration = 0.5,
  index = 0,
}: SlideContentProps) {
  // Define animation variants based on direction
  const getVariants = () => {
    switch (animateFrom) {
      case 'left':
        return {
          hidden: { x: -100, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        };
      case 'right':
        return {
          hidden: { x: 100, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        };
      case 'top':
        return {
          hidden: { y: -100, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
      case 'bottom':
        return {
          hidden: { y: 100, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
      case 'center':
        return {
          hidden: { scale: 0.8, opacity: 0 },
          visible: { scale: 1, opacity: 1 },
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  // Main content container classes
  const contentClasses = [
    className,
    fragment ? 'fragment' : '',
  ].filter(Boolean).join(' ');

  // Accessibility attributes
  const accessibilityProps: Record<string, string> = {};
  if (fragment) {
    accessibilityProps['aria-hidden'] = 'true';
    accessibilityProps['data-fragment-index'] = index.toString();
  }

  // If animations are disabled, just return the content
  if (!animate) {
    return (
      <div className={contentClasses} {...accessibilityProps}>
        {children}
      </div>
    );
  }

  // Return animated content with Framer Motion
  return (
    <motion.div
      className={contentClasses}
      variants={getVariants()}
      initial="hidden"
      animate="visible"
      transition={{
        duration,
        delay: delay + index * 0.15, // Stagger animations for multiple items
        ease: "easeOut",
      }}
      {...accessibilityProps}
    >
      {children}
    </motion.div>
  );
}