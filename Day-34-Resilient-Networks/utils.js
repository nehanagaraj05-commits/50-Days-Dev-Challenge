/* ========================================== */
/* utils.js: Helper Functions                 */
/* ========================================== */

export function debounce(func, delay = 500) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// NEW: Network Resilience Wrapper
export async function fetchWithRetry(url, options = {}, retries = 3, backoff = 500) {
    
    // Optional Bonus: Check for hard offline states first
    if (!navigator.onLine) {
        throw new Error("No internet connection detected.");
    }

    for (let i = 0; i < retries; i++) {
        try {
            // Attempt the network request
            const response = await fetch(url, options);
            
            // If it's a 400-level error (like 404 Not Found), don't retry. It's a user error!
            if (response.status >= 400 && response.status < 500) {
                return response; // Return it so api.js can handle the specific 404/403 error
            }
            
            // If it fails with a 500 (Server Error) or network drop, throw to trigger the catch block
            if (!response.ok) {
                throw new Error(`Server Error: ${response.status}`);
            }

            // If everything is perfect, return the raw response object
            return response;

        } catch (error) {
            // If we are on the very last loop iteration, finally give up
            if (i === retries - 1) {
                console.error(`Fetch completely failed after ${retries} attempts.`);
                throw error;
            }

            console.warn(`⚠️ Network attempt ${i + 1} failed. Retrying in ${backoff}ms...`);
            
            // Pause the function execution using a Promise-wrapped timeout
            await new Promise(resolve => setTimeout(resolve, backoff));
            
            // Exponential math: double the wait time for the next loop
            backoff *= 2; 
        }
    }
}