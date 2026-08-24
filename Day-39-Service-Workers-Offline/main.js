/* ========================================== */
/* main.js: Service Worker Registration       */
/* ========================================== */

// Wait for the window to fully load so we don't delay the initial rendering
window.addEventListener('load', () => {
    
    // Feature detection: Check if the browser actually supports Service Workers
    if ('serviceWorker' in navigator) {
        
        // Point to the sw.js file located at the root of the project
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('✅ Service Worker registered successfully with scope:', registration.scope);
            })
            .catch((error) => {
                console.error('⚠️ Service Worker registration failed:', error);
            });
            
    } else {
        console.log('Service Workers are not supported in this browser.');
    }
});