/* ========================================== */
/* api.js: Network Requests & Caching         */
/* ========================================== */

// Import the resilient fetch wrapper
import { fetchWithRetry } from './utils.js';

const apiCache = new Map();

export async function fetchUserData(username) {
    const safeUsername = username.toLowerCase();

    // 1. Check Cache
    if (apiCache.has(safeUsername)) {
        console.log(`⚡ Serving [${safeUsername}] from local cache!`);
        return apiCache.get(safeUsername);
    }

    console.log(`📡 Fetching [${safeUsername}] from external server...`);

    try {
        // 2. Use the wrapper instead of raw fetch()
        // It will automatically try 3 times if the network drops!
        const response = await fetchWithRetry(`https://api.github.com/users/${safeUsername}`);
        
        // Handle specific API rules
        if (response.status === 403 || response.status === 429) {
            throw new Error("API Rate Limit exceeded.");
        }
        
        if (!response.ok) {
            throw new Error("User not found.");
        }

        const data = await response.json();

        // 3. Save to Memory
        apiCache.set(safeUsername, data);

        return data;

    } catch (error) {
        throw error; 
    }
}