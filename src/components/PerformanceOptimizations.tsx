import React, { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyComponentProps {
  componentPath: string;
  fallback?: React.ReactNode;
  errorFallback?: React.ComponentType<any>;
  props?: any;
}

// Error boundary fallback
function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div className="p-8 text-center">
      <h2 className="text-lg font-semibold text-destructive mb-2">
        Something went wrong
      </h2>
      <p className="text-muted-foreground mb-4">
        {error.message}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        Try again
      </button>
    </div>
  );
}

// Default loading skeleton
function DefaultSkeleton() {
  return (
    <div className="space-y-4 p-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    </div>
  );
}

export function LazyComponent({
  componentPath,
  fallback = <DefaultSkeleton />,
  errorFallback,
  props = {}
}: LazyComponentProps) {
  const ErrorFallbackComponent = errorFallback || ErrorFallback;
  // Dynamic import with error handling
  const Component = lazy(() => 
    import(componentPath).catch(() => ({
      default: () => (
        <div className="p-8 text-center">
          <p className="text-muted-foreground">Failed to load component</p>
        </div>
      )
    }))
  );

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallbackComponent}
      onReset={() => window.location.reload()}
    >
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}

// Intersection Observer hook for lazy loading
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
        ...options
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, options]);

  return isIntersecting;
}

// Lazy image component with intersection observer
interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholderSrc?: string;
  className?: string;
}

export function LazyImage({
  src,
  alt,
  placeholderSrc = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+',
  className = '',
  ...props
}: LazyImageProps) {
  const imgRef = React.useRef<HTMLImageElement>(null);
  const isIntersecting = useIntersectionObserver(imgRef);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div className={`relative ${className}`}>
      <img
        ref={imgRef}
        src={isIntersecting ? src : placeholderSrc}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        {...props}
      />
      
      {!isLoaded && !hasError && isIntersecting && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded" />
      )}
      
      {hasError && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <span className="text-muted-foreground text-sm">
            Failed to load image
          </span>
        </div>
      )}
    </div>
  );
}

// Preload critical resources
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;

  // Preload critical images
  const criticalImages = [
    '/braira-hero.jpg',
    '/logo.svg'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });

  // Preload critical fonts
  const criticalFonts = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap'
  ];

  criticalFonts.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    document.head.appendChild(link);
  });
}

// Performance monitoring
export function usePerformanceMonitoring() {
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    // Simple performance monitoring without web-vitals dependency
    console.log('Performance monitoring initialized');
    
    // Monitor basic performance metrics
    if ('performance' in window && 'getEntriesByType' in performance) {
      setTimeout(() => {
        const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
        if (navigationEntries.length > 0) {
          const nav = navigationEntries[0];
          console.log('Page Load Time:', nav.loadEventEnd - nav.loadEventStart);
        }
      }, 1000);
    }

    // Monitor long tasks
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.warn('Long task detected:', entry);
          }
        }
      });
      
      observer.observe({ entryTypes: ['longtask'] });
      
      return () => observer.disconnect();
    }
  }, []);
}