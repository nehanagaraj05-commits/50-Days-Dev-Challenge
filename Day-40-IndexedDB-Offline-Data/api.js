/* ========================================== */
/* api.js: Network Requests & Intercepts      */
/* ========================================== */

import { fetchWithRetry } from './utils.js';
import { saveOfflineData } from './db.js'; // Import our new database module

// (Assume this is your POST request function from Day 29)
export async function submitInitiative(dataPayload) {
    
    // ⚡ THE OFFLINE GATEKEEPER
    if (!navigator.onLine) {
        console.warn("🌐 Network offline. Routing payload to local database.");
        
        // Save to IndexedDB instead of failing
        await saveOfflineData(dataPayload);
        
        // Throw a specific error so the UI knows to show an "Offline Saved" message
        throw new Error("OFFLINE_SAVED");
    }

    try {
        // Standard online fetch logic...
        const response = await fetchWithRetry('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(dataPayload)
        });

        if (!response.ok) throw new Error("Server rejected payload.");
        return await response.json();

    } catch (error) {
        throw error;
    }
}