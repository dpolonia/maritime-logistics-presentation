/**
 * Accessibility utilities for presentation system
 */

// Interface for screen reader announcements
interface Announcement {
  message: string;
  politeness?: 'polite' | 'assertive';
  timeout?: number;
}

// Keep track of user preferences
let userPreferences = {
  reducedMotion: false,
  highContrast: false,
  largeText: false,
  screenReader: false,
};

/**
 * Initialize accessibility features and detect user preferences
 */
export function initAccessibility(): void {
  if (typeof window === 'undefined') return;
  
  // Create screen reader live region if it doesn't exist
  if (!document.getElementById('sr-announcer')) {
    const announcer = document.createElement('div');
    announcer.id = 'sr-announcer';
    announcer.className = 'sr-only';
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    document.body.appendChild(announcer);
  }
  
  // Detect user preferences
  detectUserPreferences();
  
  // Listen for preference changes
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', detectUserPreferences);
  window.matchMedia('(prefers-contrast: more)').addEventListener('change', detectUserPreferences);
  
  // Add keyboard navigation listeners
  document.addEventListener('keydown', handleAccessibilityKeys);
}

/**
 * Detect user accessibility preferences from system settings
 */
function detectUserPreferences(): void {
  if (typeof window === 'undefined') return;
  
  // Check for reduced motion preference
  userPreferences.reducedMotion = 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Check for high contrast preference
  userPreferences.highContrast = 
    window.matchMedia('(prefers-contrast: more)').matches;
  
  // Check for larger text preference
  userPreferences.largeText = 
    window.matchMedia('(prefers-reduced-transparency: reduce)').matches;
  
  // Check for screen reader (best guess based on certain behaviors)
  userPreferences.screenReader = false; // Will be updated by user interaction patterns
  
  // Apply preference-based classes to the document
  if (userPreferences.reducedMotion) {
    document.documentElement.classList.add('reduced-motion');
  } else {
    document.documentElement.classList.remove('reduced-motion');
  }
  
  if (userPreferences.highContrast) {
    document.documentElement.classList.add('high-contrast');
  } else {
    document.documentElement.classList.remove('high-contrast');
  }
  
  if (userPreferences.largeText) {
    document.documentElement.classList.add('large-text');
  } else {
    document.documentElement.classList.remove('large-text');
  }
}

/**
 * Handle keyboard shortcuts for accessibility
 */
function handleAccessibilityKeys(event: KeyboardEvent): void {
  // Alt+A to open accessibility menu
  if (event.altKey && event.key === 'a') {
    event.preventDefault();
    toggleAccessibilityMenu();
  }
  
  // Alt+C to toggle high contrast
  if (event.altKey && event.key === 'c') {
    event.preventDefault();
    toggleHighContrast();
  }
  
  // Alt+M to toggle reduced motion
  if (event.altKey && event.key === 'm') {
    event.preventDefault();
    toggleReducedMotion();
  }
  
  // Alt+T to toggle large text
  if (event.altKey && event.key === 't') {
    event.preventDefault();
    toggleLargeText();
  }
}

/**
 * Toggle accessibility menu
 */
function toggleAccessibilityMenu(): void {
  // This would be implemented with a UI component
  console.log('Toggle accessibility menu');
  
  // If menu doesn't exist, create it
  if (!document.getElementById('accessibility-menu')) {
    // This would create a visual menu with accessibility options
    announce('Accessibility menu opened. Use arrow keys to navigate options.');
  } else {
    announce('Accessibility menu closed.');
  }
}

/**
 * Toggle high contrast mode
 */
function toggleHighContrast(): void {
  userPreferences.highContrast = !userPreferences.highContrast;
  
  if (userPreferences.highContrast) {
    document.documentElement.classList.add('high-contrast');
    localStorage.setItem('highContrast', 'true');
    announce('High contrast mode enabled');
  } else {
    document.documentElement.classList.remove('high-contrast');
    localStorage.setItem('highContrast', 'false');
    announce('High contrast mode disabled');
  }
}

/**
 * Toggle reduced motion
 */
function toggleReducedMotion(): void {
  userPreferences.reducedMotion = !userPreferences.reducedMotion;
  
  if (userPreferences.reducedMotion) {
    document.documentElement.classList.add('reduced-motion');
    localStorage.setItem('reducedMotion', 'true');
    announce('Reduced motion enabled');
  } else {
    document.documentElement.classList.remove('reduced-motion');
    localStorage.setItem('reducedMotion', 'false');
    announce('Reduced motion disabled');
  }
}

/**
 * Toggle large text
 */
function toggleLargeText(): void {
  userPreferences.largeText = !userPreferences.largeText;
  
  if (userPreferences.largeText) {
    document.documentElement.classList.add('large-text');
    localStorage.setItem('largeText', 'true');
    announce('Large text enabled');
  } else {
    document.documentElement.classList.remove('large-text');
    localStorage.setItem('largeText', 'false');
    announce('Large text disabled');
  }
}

/**
 * Make an announcement to screen readers
 */
export function announce(message: string, politeness: 'polite' | 'assertive' = 'polite'): void {
  if (typeof window === 'undefined') return;
  
  const announcer = document.getElementById('sr-announcer');
  if (!announcer) return;
  
  // Set the appropriate aria-live attribute
  announcer.setAttribute('aria-live', politeness);
  
  // Clear the announcer first (necessary for repeated announcements)
  announcer.textContent = '';
  
  // Use setTimeout to ensure the change is registered
  setTimeout(() => {
    announcer.textContent = message;
  }, 50);
}

/**
 * Check if reduced motion is preferred
 */
export function isReducedMotionPreferred(): boolean {
  if (typeof window === 'undefined') return false;
  
  // First check localStorage for user's explicit preference
  const storedPreference = localStorage.getItem('reducedMotion');
  if (storedPreference) {
    return storedPreference === 'true';
  }
  
  // Then check system preference
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if high contrast is preferred
 */
export function isHighContrastPreferred(): boolean {
  if (typeof window === 'undefined') return false;
  
  // First check localStorage for user's explicit preference
  const storedPreference = localStorage.getItem('highContrast');
  if (storedPreference) {
    return storedPreference === 'true';
  }
  
  // Then check system preference
  return window.matchMedia('(prefers-contrast: more)').matches;
}

/**
 * Focus trap utility for modals and dialogs
 */
export function createFocusTrap(element: HTMLElement): {
  activate: () => void;
  deactivate: () => void;
} {
  let previouslyFocused: Element | null = null;
  
  // Get all focusable elements
  const getFocusableElements = () => {
    return Array.from(
      element.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[];
  };
  
  // Handle tab key to keep focus inside the element
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;
    
    const focusable = getFocusableElements();
    if (focusable.length === 0) return;
    
    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];
    
    if (event.shiftKey && document.activeElement === firstFocusable) {
      lastFocusable.focus();
      event.preventDefault();
    } else if (!event.shiftKey && document.activeElement === lastFocusable) {
      firstFocusable.focus();
      event.preventDefault();
    }
  };
  
  return {
    activate: () => {
      previouslyFocused = document.activeElement;
      
      // Focus the first focusable element
      const focusable = getFocusableElements();
      if (focusable.length > 0) {
        setTimeout(() => {
          focusable[0].focus();
        }, 0);
      }
      
      // Add event listener
      element.addEventListener('keydown', handleKeyDown);
    },
    deactivate: () => {
      // Remove event listener
      element.removeEventListener('keydown', handleKeyDown);
      
      // Return focus to previously focused element
      if (previouslyFocused && 'focus' in previouslyFocused) {
        // @ts-ignore
        previouslyFocused.focus();
      }
    },
  };
}