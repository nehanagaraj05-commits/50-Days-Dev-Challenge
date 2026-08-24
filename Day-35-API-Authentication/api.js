/* ========================================== */
/* api.js: Network Requests & Authentication  */
/* ========================================== */

// Import our resilient fetch wrapper from yesterday
import { fetchWithRetry } from './utils.js';

// 1. THE AUTHENTICATION UTILITY
// A helper function to dry up our code so we don't rewrite this everywhere
function getAuthHeaders() {
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
        // If they aren't logged in, stop them here.
        throw new Error("Access Denied: No authentication token found. Please log in.");
    }

    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // The industry standard formatting
    };
}

// 2. THE SECURE DELETE FUNCTION
export async function secureDeleteResource(targetId) {
    try {
        console.log(`🔒 Initiating secure deletion for resource #${targetId}...`);

        // Generate the secure headers (this will throw an error if no token exists)
        const headers = getAuthHeaders();

        // 3. THE SECURE FETCH
        const response = await fetchWithRetry(`https://jsonplaceholder.typicode.com/posts/${targetId}`, {
            method: 'DELETE',
            headers: headers
        });

        // 4. SECURITY GATEKEEPING
        if (response.status === 401) {
            // 401 means the token is invalid, tampered with, or expired
            // Usually, you would automatically trigger a "logout" function here!
            localStorage.removeItem('auth_token');
            throw new Error("Unauthorized: Your session has expired. Please log in again.");
        }

        if (response.status === 403) {
            // 403 means they are logged in, but don't have ADMIN rights to do this
            throw new Error("Forbidden: You do not have permission to delete this resource.");
        }

        if (!response.ok) {
            throw new Error(`Server Error: ${response.status}`);
        }

        console.log(`✅ Resource #${targetId} securely deleted.`);
        return true;

    } catch (error) {
        console.error("Security/Network Error:", error);
        throw error;
    }
}