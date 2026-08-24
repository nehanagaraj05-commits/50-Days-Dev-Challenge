/* ========================================== */
/* api.js: Network Requests                   */
/* ========================================== */

// We export this function so main.js can call it
export async function fetchUserData(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        
        if (response.status === 403 || response.status === 429) {
            throw new Error("API Rate Limit exceeded.");
        }
        
        if (!response.ok) {
            throw new Error("User not found.");
        }

        // Return the data back to whoever called this function
        return await response.json();

    } catch (error) {
        // We throw the error upwards so main.js can decide how to show it on the UI
        throw error; 
    }
}