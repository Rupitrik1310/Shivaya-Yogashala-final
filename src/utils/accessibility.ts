/**
 * Accessibility & Responsive Design Utilities
 * Helper functions and hooks for implementing a11y best practices
 */

/**
 * Get screen size breakpoint
 * Returns: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
 */
export function getBreakpoint(): 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' {
  if (typeof window === 'undefined') return 'md';
  
  const width = window.innerWidth;
  
  if (width < 480) return 'xs';
  if (width < 640) return 'sm';
  if (width < 768) return 'md';
  if (width < 1024) return 'lg';
  if (width < 1280) return 'xl';
  return '2xl';
}

/**
 * Check if device is mobile
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

/**
 * Check if device is tablet
 */
export function isTablet(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 768 && window.innerWidth < 1024;
}

/**
 * Check if device is desktop
 */
export function isDesktop(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 1024;
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if user prefers dark mode
 */
export function prefersDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Check if user prefers high contrast
 */
export function prefersHighContrast(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-contrast: more)').matches;
}

/**
 * Check if device supports touch
 */
export function supportsTouchScreen(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  );
}

/**
 * Announce a message to screen readers
 * Uses aria-live region
 */
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void {
  // Create or get the announcement region
  let region = document.getElementById('sr-announcements');
  
  if (!region) {
    region = document.createElement('div');
    region.id = 'sr-announcements';
    region.setAttribute('aria-live', priority);
    region.setAttribute('aria-atomic', 'true');
    region.className = 'sr-only';
    document.body.appendChild(region);
  }
  
  // Update the region's aria-live level
  region.setAttribute('aria-live', priority);
  
  // Clear and set the message
  region.textContent = message;
  
  // Clear after announcement
  setTimeout(() => {
    region!.textContent = '';
  }, 1000);
}

/**
 * Generate unique ID for form fields
 */
export function generateId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get aria-label with context
 */
export function getAriaLabel(
  baseLabel: string,
  context?: string,
  state?: string
): string {
  let label = baseLabel;
  
  if (context) {
    label += ` (${context})`;
  }
  
  if (state) {
    label += `, ${state}`;
  }
  
  return label;
}

/**
 * Trap focus within an element (for modals/dialogs)
 */
export function trapFocus(container: HTMLElement): void {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ) as NodeListOf<HTMLElement>;
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };
  
  container.addEventListener('keydown', handleKeyDown);
  
  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * Make element visible to screen readers only
 */
export function setScreenReaderOnly(element: HTMLElement, value: boolean): void {
  if (value) {
    element.classList.add('sr-only');
  } else {
    element.classList.remove('sr-only');
  }
}

/**
 * Get responsive class based on breakpoint
 */
export function getResponsiveClass(
  breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl',
  classMap: Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl', string>>
): string {
  const classes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  const currentIndex = classes.indexOf(breakpoint);
  
  // Get the highest priority class available
  for (let i = currentIndex; i >= 0; i--) {
    const size = classes[i] as keyof typeof classMap;
    if (classMap[size]) {
      return classMap[size];
    }
  }
  
  return '';
}

/**
 * Get responsive value based on breakpoint
 */
export function getResponsiveValue<T>(
  breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl',
  valueMap: Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl', T>>
): T | undefined {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  const currentIndex = sizes.indexOf(breakpoint);
  
  // Get the highest priority value available
  for (let i = currentIndex; i >= 0; i--) {
    const size = sizes[i] as keyof typeof valueMap;
    if (valueMap[size] !== undefined) {
      return valueMap[size];
    }
  }
  
  return undefined;
}

/**
 * Handle keyboard shortcuts
 */
export function handleKeyboardShortcut(
  key: string,
  modifier: 'ctrl' | 'alt' | 'shift' | 'meta' | 'none' = 'none',
  callback: () => void
): (e: KeyboardEvent) => void {
  return (e: KeyboardEvent) => {
    const keyMatch = e.key.toLowerCase() === key.toLowerCase();
    const modifierMatch =
      modifier === 'none' ? true :
      modifier === 'ctrl' ? e.ctrlKey :
      modifier === 'alt' ? e.altKey :
      modifier === 'shift' ? e.shiftKey :
      modifier === 'meta' ? e.metaKey :
      false;
    
    if (keyMatch && modifierMatch) {
      e.preventDefault();
      callback();
    }
  };
}

/**
 * Scroll to element with announcement
 */
export function scrollToElement(
  element: HTMLElement,
  message?: string
): void {
  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  
  if (message) {
    announceToScreenReader(message);
  }
  
  // Set focus
  const focusableChild = element.querySelector(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ) as HTMLElement;
  
  if (focusableChild) {
    focusableChild.focus();
  } else if (element.getAttribute('tabindex') === null) {
    element.setAttribute('tabindex', '-1');
    element.focus();
  }
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Get ARIA label for interactive element
 */
export function getInteractiveLabel(
  label: string,
  disabled?: boolean,
  loading?: boolean
): string {
  let fullLabel = label;
  
  if (disabled) {
    fullLabel += ', disabled';
  }
  
  if (loading) {
    fullLabel += ', loading';
  }
  
  return fullLabel;
}

/**
 * Format error message for accessibility
 */
export function formatErrorMessage(
  fieldName: string,
  errorMessage: string
): string {
  return `${fieldName} error: ${errorMessage}`;
}

/**
 * Manage focus on element mount
 */
export function manageFocus(element: HTMLElement | null, shouldFocus: boolean = true): void {
  if (!element) return;
  
  if (shouldFocus) {
    // Ensure element is focusable
    if (!element.hasAttribute('tabindex')) {
      element.setAttribute('tabindex', '-1');
    }
    element.focus();
  } else {
    element.blur();
  }
}

/**
 * Check if browser supports specific feature
 */
export function supportsFeature(feature: 'IntersectionObserver' | 'ResizeObserver' | 'MutationObserver'): boolean {
  return feature in window;
}

/**
 * Debounce function for resize/scroll events
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export default {
  getBreakpoint,
  isMobile,
  isTablet,
  isDesktop,
  prefersReducedMotion,
  prefersDarkMode,
  prefersHighContrast,
  supportsTouchScreen,
  announceToScreenReader,
  generateId,
  getAriaLabel,
  trapFocus,
  setScreenReaderOnly,
  getResponsiveClass,
  getResponsiveValue,
  handleKeyboardShortcut,
  scrollToElement,
  isInViewport,
  getInteractiveLabel,
  formatErrorMessage,
  manageFocus,
  supportsFeature,
  debounce,
};
