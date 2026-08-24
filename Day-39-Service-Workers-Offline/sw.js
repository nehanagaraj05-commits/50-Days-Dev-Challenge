/* ========================================== */
/* sw.js: The Service Worker Background Proxy */
/* ========================================== */

// Define a name for our cache. Changing this version number forces an update.
const CACHE_NAME = 'platform-cache-v1';

// The essential files required to render the application offline
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/main.js',
    '/api.js',
    '/utils.js'
    // Add any crucial images or icons here as well
];

// 1. THE INSTALL LIFECYCLE
// Fires the first time the browser registers this worker
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing phase...');
    
    // Tell the browser to wait until caching is finished before completing installation
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Pre-caching core assets.');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// 2. THE FETCH INTERCEPTOR (Cache-First Strategy)
// Fires every single time the app requests a file, image, or API route
self.addEventListener('fetch', (event) => {
    
    // We only want to intercept standard GET requests
    if (event.request.method !== 'GET') return;

    // Intercept the request and decide how to respond
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                
                // If the file is in the cache, serve it instantly!
                if (cachedResponse) {
                    return cachedResponse;
                }

                // If it's not in the cache, fetch it from the internet normally
                return fetch(event.request).catch(() => {
                    // Bonus: If they are offline AND the file isn't cached, 
                    // you could return a custom "offline.html" page here!
                    console.warn('[Service Worker] Network request failed and no cache available.');
                });
            })
    );
});

// 3. THE ACTIVATE LIFECYCLE (Cleanup)
// Fires when a new service worker takes over. Good for deleting old caches!
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activation phase...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('[Service Worker] Clearing old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});