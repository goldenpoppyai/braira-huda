import React from 'react';

// Web app manifest for PWA functionality
export function PWAManifest() {
  React.useEffect(() => {
    const manifest = {
      name: 'Braira Al Olaya Hotel',
      short_name: 'Braira Al Olaya',
      description: 'Experience luxury at Braira Al Olaya Hotel in Riyadh. Premium accommodations, world-class dining, and exceptional service.',
      start_url: '/',
      display: 'standalone',
      background_color: '#1a1a2e',
      theme_color: '#1a1a2e',
      orientation: 'portrait-primary',
      scope: '/',
      lang: 'en',
      categories: ['travel', 'hospitality', 'hotels'],
      icons: [
        {
          src: '/favicon.ico',
          sizes: '48x48',
          type: 'image/x-icon',
          purpose: 'any'
        },
        {
          src: '/icon-192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable any'
        },
        {
          src: '/icon-512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable any'
        }
      ],
      screenshots: [
        {
          src: '/screenshot-mobile.jpg',
          sizes: '390x844',
          type: 'image/jpeg',
          form_factor: 'narrow'
        },
        {
          src: '/screenshot-desktop.jpg',
          sizes: '1920x1080',
          type: 'image/jpeg',
          form_factor: 'wide'
        }
      ],
      shortcuts: [
        {
          name: 'Book Room',
          short_name: 'Book',
          description: 'Book a room at Braira Al Olaya Hotel',
          url: '/rooms',
          icons: [
            {
              src: '/shortcut-book.png',
              sizes: '96x96'
            }
          ]
        },
        {
          name: 'Dining',
          short_name: 'Dine',
          description: 'Explore our dining options',
          url: '/dining',
          icons: [
            {
              src: '/shortcut-dining.png',
              sizes: '96x96'
            }
          ]
        },
        {
          name: 'Contact',
          short_name: 'Contact',
          description: 'Get in touch with us',
          url: '/contact',
          icons: [
            {
              src: '/shortcut-contact.png',
              sizes: '96x96'
            }
          ]
        }
      ]
    };

    // Create manifest blob and URL
    const manifestBlob = new Blob([JSON.stringify(manifest, null, 2)], {
      type: 'application/json'
    });
    const manifestURL = URL.createObjectURL(manifestBlob);

    // Add manifest link to head
    const link = document.createElement('link');
    link.rel = 'manifest';
    link.href = manifestURL;
    document.head.appendChild(link);

    // Cleanup
    return () => {
      document.head.removeChild(link);
      URL.revokeObjectURL(manifestURL);
    };
  }, []);

  return null;
}

// Service Worker registration for PWA
export function ServiceWorkerRegistration() {
  React.useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Register service worker
      navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      }).then((registration) => {
        console.log('SW registered: ', registration);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available
                if (confirm('New content is available! Click OK to refresh.')) {
                  window.location.reload();
                }
              }
            });
          }
        });
      }).catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });

      // Listen for SW messages
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'CACHE_UPDATED') {
          // Cache has been updated
          console.log('Cache updated');
        }
      });
    }
  }, []);

  return null;
}

// Install prompt for PWA
export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = React.useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = React.useState(false);

  React.useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show our custom install prompt
      setShowInstallPrompt(true);
    };

    const handleAppInstalled = () => {
      console.log('PWA was installed');
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Optional: Set a flag to not show again for this session
    sessionStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Don't show if already dismissed this session
  if (sessionStorage.getItem('pwa-install-dismissed')) {
    return null;
  }

  if (!showInstallPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-card border border-border rounded-lg shadow-luxury p-4 z-50">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-foreground">
            Install Braira Al Olaya App
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Get quick access to hotel services, bookings, and exclusive offers.
          </p>
          <div className="flex space-x-2 mt-3">
            <button
              onClick={handleInstallClick}
              className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded-md hover:bg-primary/90 transition-colors"
            >
              Install
            </button>
            <button
              onClick={handleDismiss}
              className="px-3 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Offline indicator
export function OfflineIndicator() {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-destructive text-destructive-foreground px-4 py-2 text-center text-sm z-50">
      <div className="flex items-center justify-center space-x-2">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <span>You're currently offline. Some features may not be available.</span>
      </div>
    </div>
  );
}