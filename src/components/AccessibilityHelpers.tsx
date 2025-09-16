import React from 'react';

// ARIA live region for announcements
interface LiveAnnouncerProps {
  message: string;
  politeness?: 'polite' | 'assertive';
  clearAfter?: number;
}

export function LiveAnnouncer({ 
  message, 
  politeness = 'polite', 
  clearAfter = 3000 
}: LiveAnnouncerProps) {
  const [currentMessage, setCurrentMessage] = React.useState(message);

  React.useEffect(() => {
    setCurrentMessage(message);
    
    if (clearAfter > 0) {
      const timer = setTimeout(() => {
        setCurrentMessage('');
      }, clearAfter);
      
      return () => clearTimeout(timer);
    }
  }, [message, clearAfter]);

  return (
    <div
      aria-live={politeness}
      aria-atomic="true"
      className="sr-only"
    >
      {currentMessage}
    </div>
  );
}

// Skip to main content link
export function SkipToMainContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 transition-all"
    >
      Skip to main content
    </a>
  );
}

// Focus trap for modals and dialogs
interface FocusTrapProps {
  children: React.ReactNode;
  active: boolean;
  onEscape?: () => void;
}

export function FocusTrap({ children, active, onEscape }: FocusTrapProps) {
  const trapRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!active || !trapRef.current) return;

    const trap = trapRef.current;
    const focusableElements = trap.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onEscape) {
        onEscape();
        return;
      }

      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    // Focus first element when trap activates
    firstElement?.focus();

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [active, onEscape]);

  if (!active) return <>{children}</>;

  return (
    <div ref={trapRef} className="focus-trap">
      {children}
    </div>
  );
}

// Accessible button with proper ARIA attributes
interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export function AccessibleButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  ariaLabel,
  ariaDescribedBy,
  disabled,
  className = '',
  ...props
}: AccessibleButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-luxury focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground'
  };
  
  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-12 px-8 text-lg'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-disabled={disabled || loading}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="mr-2 h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      <span className={loading ? 'sr-only' : ''}>{children}</span>
      {loading && <span aria-live="polite">Loading...</span>}
    </button>
  );
}

// Accessible form field with proper labeling
interface AccessibleFieldProps {
  label: string;
  id: string;
  error?: string;
  description?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function AccessibleField({
  label,
  id,
  error,
  description,
  required = false,
  children
}: AccessibleFieldProps) {
  const errorId = error ? `${id}-error` : undefined;
  const descriptionId = description ? `${id}-description` : undefined;
  const ariaDescribedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="space-y-2">
      <label 
        htmlFor={id}
        className="block text-sm font-medium text-foreground"
      >
        {label}
        {required && (
          <span className="text-destructive ml-1" aria-label="required">
            *
          </span>
        )}
      </label>
      
      {description && (
        <p id={descriptionId} className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
      
      <div className="relative">
        {React.cloneElement(children as React.ReactElement, {
          id,
          'aria-describedby': ariaDescribedBy,
          'aria-invalid': error ? 'true' : undefined,
          'aria-required': required,
        })}
      </div>
      
      {error && (
        <p id={errorId} className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// Screen reader only text
export function ScreenReaderOnly({ children }: { children: React.ReactNode }) {
  return (
    <span className="sr-only">
      {children}
    </span>
  );
}

// High contrast mode detection
export function useHighContrastMode() {
  const [isHighContrast, setIsHighContrast] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    
    setIsHighContrast(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsHighContrast(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return isHighContrast;
}

// Reduced motion preference detection
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

// Accessibility announcements hook
export function useAccessibilityAnnouncements() {
  const [announcement, setAnnouncement] = React.useState('');

  const announce = React.useCallback((message: string, politeness: 'polite' | 'assertive' = 'polite') => {
    setAnnouncement(''); // Clear first to ensure re-announcement
    setTimeout(() => {
      setAnnouncement(message);
    }, 10);
  }, []);

  return {
    announcement,
    announce,
    LiveRegion: () => (
      <LiveAnnouncer 
        message={announcement} 
        politeness="polite"
        clearAfter={3000}
      />
    )
  };
}