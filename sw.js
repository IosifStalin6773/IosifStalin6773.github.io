// Enhanced Service Worker with advanced caching strategies and performance optimizations
const CACHE_VERSION = '2.0.0';
const STATIC_CACHE = `portfolio-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `portfolio-dynamic-${CACHE_VERSION}`;
const API_CACHE = `portfolio-api-${CACHE_VERSION}`;
const FONT_CACHE = `portfolio-fonts-${CACHE_VERSION}`;
const IMAGE_CACHE = `portfolio-images-${CACHE_VERSION}`;

// Cache TTL configuration
const CACHE_TTL = {
    static: 7 * 24 * 60 * 60 * 1000, // 7 days
    dynamic: 24 * 60 * 60 * 1000, // 24 hours
    api: 5 * 60 * 60 * 1000, // 5 hours
    fonts: 30 * 24 * 60 * 60 * 1000, // 30 days
    images: 7 * 24 * 60 * 60 * 1000 // 7 days
};

// Critical resources to cache
const STATIC_RESOURCES = [
    '/',
    '/index.html',
    '/index-enhanced.html',
    '/styles.css',
    '/js/performance-optimizer.js',
    '/js/i18n.js',
    '/js/content-manager.js',
    '/script.js',
    '/i18n/translations.json',
    '/assets/images/og-image.jpg',
    '/assets/images/favicon.ico',
    '/assets/images/apple-touch-icon.png',
    '/assets/images/mstile-144x144.png'
];

// External resources to cache
const EXTERNAL_RESOURCES = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto+Mono:wght@400;500&display=swap',
    'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
    'https://fonts.gstatic.com/s/robotomono/v23/L0x5DF4xlVMF-BfR8bXMIjhLq3-cXbKD.woff2',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-solid-900.woff2'
];

// Install event - cache critical resources
self.addEventListener('install', function(event) {
    event.waitUntil(
        Promise.all([
            // Cache static resources
            caches.open(STATIC_CACHE).then(cache => {
                return cache.addAll(STATIC_RESOURCES);
            }),
            // Cache external resources
            caches.open(FONT_CACHE).then(cache => {
                return cache.addAll(EXTERNAL_RESOURCES);
            })
        ]).then(() => {
            // Skip waiting for immediate activation
            self.skipWaiting();
        })
    );
});

// Fetch event - implement advanced caching strategies
self.addEventListener('fetch', function(event) {
    const request = event.request;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Handle different request types
    if (isStaticResource(url)) {
        event.respondWith(cacheFirst(request, STATIC_CACHE));
    } else if (isFontResource(url)) {
        event.respondWith(cacheFirst(request, FONT_CACHE));
    } else if (isImageResource(url)) {
        event.respondWith(staleWhileRevalidate(request, IMAGE_CACHE));
    } else if (isAPIRequest(url)) {
        event.respondWith(networkFirst(request, API_CACHE));
    } else {
        event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE));
    }
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
        Promise.all([
            // Delete old caches
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (!isCurrentCache(cacheName)) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            // Take control of all pages
            self.clients.claim()
        ])
    );
});

// Message event - handle cache management
self.addEventListener('message', function(event) {
    const data = event.data;
    
    if (data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    } else if (data.type === 'CACHE_UPDATE') {
        updateCache(data.url);
    } else if (data.type === 'CACHE_CLEAR') {
        clearCache(data.cacheName);
    }
});

// Push event - handle push notifications
self.addEventListener('push', function(event) {
    const options = {
        body: event.data ? event.data.text() : 'New update available',
        icon: '/assets/images/icon-192x192.png',
        badge: '/assets/images/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Explore',
                icon: '/assets/images/checkmark.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/assets/images/xmark.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Portfolio Update', options)
    );
});

// Notification click event
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Background sync event
self.addEventListener('sync', function(event) {
    if (event.tag === 'background-sync') {
        event.waitUntil(
            doBackgroundSync()
        );
    }
});

// Helper functions
function isStaticResource(url) {
    return url.pathname.includes('/js/') || 
           url.pathname.includes('/css/') || 
           url.pathname.includes('/styles.css') ||
           url.pathname === '/' ||
           url.pathname.endsWith('.html');
}

function isFontResource(url) {
    return url.hostname.includes('fonts.googleapis.com') || 
           url.hostname.includes('fonts.gstatic.com') ||
           url.pathname.includes('.woff') ||
           url.pathname.includes('.woff2') ||
           url.pathname.includes('.ttf');
}

function isImageResource(url) {
    return url.pathname.includes('/assets/images/') ||
           url.pathname.includes('.jpg') ||
           url.pathname.includes('.jpeg') ||
           url.pathname.includes('.png') ||
           url.pathname.includes('.gif') ||
           url.pathname.includes('.webp');
}

function isAPIRequest(url) {
    return url.pathname.includes('/api/') || 
           url.hostname.includes('api.');
}

function isCurrentCache(cacheName) {
    return cacheName.includes(CACHE_VERSION);
}

// Caching strategies
function cacheFirst(request, cacheName) {
    return caches.match(request).then(response => {
        if (response) {
            // Check if cache is still valid
            return isCacheValid(response) ? response : fetchAndCache(request, cacheName);
        }
        
        return fetchAndCache(request, cacheName);
    });
}

function networkFirst(request, cacheName) {
    return fetch(request).then(response => {
        if (response.ok) {
            const responseClone = response.clone();
            caches.open(cacheName).then(cache => {
                cache.put(request, responseClone);
            });
        }
        return response;
    }).catch(() => {
        return caches.match(request);
    });
}

function staleWhileRevalidate(request, cacheName) {
    const cachePromise = caches.match(request);
    const networkPromise = fetch(request).then(response => {
        if (response.ok) {
            const responseClone = response.clone();
            caches.open(cacheName).then(cache => {
                cache.put(request, responseClone);
            });
        }
        return response;
    });
    
    return cachePromise.then(response => {
        return response || networkPromise;
    });
}

function fetchAndCache(request, cacheName) {
    return fetch(request).then(response => {
        if (response.ok) {
            const responseClone = response.clone();
            caches.open(cacheName).then(cache => {
                cache.put(request, responseClone);
            });
        }
        return response;
    });
}

function isCacheValid(response) {
    if (!response.headers.has('date')) {
        return false;
    }
    
    const date = new Date(response.headers.get('date'));
    const now = new Date();
    const age = now - date;
    
    // Check cache age based on resource type
    const url = response.url;
    let maxAge = CACHE_TTL.dynamic;
    
    if (isStaticResource(new URL(url))) {
        maxAge = CACHE_TTL.static;
    } else if (isFontResource(new URL(url))) {
        maxAge = CACHE_TTL.fonts;
    } else if (isImageResource(new URL(url))) {
        maxAge = CACHE_TTL.images;
    } else if (isAPIRequest(new URL(url))) {
        maxAge = CACHE_TTL.api;
    }
    
    return age < maxAge;
}

// Cache management functions
async function updateCache(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const cacheName = getCacheNameForUrl(url);
            const cache = await caches.open(cacheName);
            await cache.put(url, response);
        }
    } catch (error) {
        console.error('Cache update failed:', error);
    }
}

async function clearCache(cacheName) {
    if (cacheName) {
        await caches.delete(cacheName);
    } else {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
    }
}

function getCacheNameForUrl(url) {
    if (isStaticResource(url)) return STATIC_CACHE;
    if (isFontResource(url)) return FONT_CACHE;
    if (isImageResource(url)) return IMAGE_CACHE;
    if (isAPIRequest(url)) return API_CACHE;
    return DYNAMIC_CACHE;
}

// Background sync function
async function doBackgroundSync() {
    try {
        // Sync any pending data
        console.log('Background sync completed');
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

// Performance monitoring
self.addEventListener('fetch', function(event) {
    const start = performance.now();
    
    event.respondWith(
        (async () => {
            try {
                const response = await fetch(event.request);
                const duration = performance.now() - start;
                
                // Log performance metrics
                if (duration > 1000) {
                    console.warn(`Slow request: ${event.request.url} took ${duration.toFixed(2)}ms`);
                }
                
                return response;
            } catch (error) {
                const duration = performance.now() - start;
                console.error(`Request failed: ${event.request.url} after ${duration.toFixed(2)}ms`, error);
                throw error;
            }
        })()
    );
});
