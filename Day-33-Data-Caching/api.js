/* ========================================== */
/* api.js: Network Requests & Caching         */
/* ========================================== */

// 1. THE MEMORY BANK
// This variable lives entirely inside this module. It cannot be touched by main.js!
const apiCache = new Map();

export async function fetchUserData(username) {
    
    // Normalize the username just in case
    const safeUsername = username.toLowerCase();

    // 2. THE CACHE INTERCEPT
    // Gatekeeper: Do we already have this data?
    if (apiCache.has(safeUsername)) {
        console.log(`⚡ Serving [${safeUsername}] from local cache!`);
        
        // Return the saved data instantly, bypassing the network entirely
        return apiCache.get(safeUsername);
    }

    console.log(`📡 Fetching [${safeUsername}] from external server...`);

    try {
        const response = await fetch(`https://api.github.com/users/${safeUsername}`);
        
        if (response.status === 403 || response.status === 429) {
            throw new Error("API Rate Limit exceeded.");
        }
        
        if (!response.ok) {
            throw new Error("User not found.");
        }

        const data = await response.json();

        // 3. SAVE TO MEMORY
        // If the fetch was successful, save the payload for next time
        apiCache.set(safeUsername, data);

        return data;

    } catch (error) {
        throw error; 
    }
}