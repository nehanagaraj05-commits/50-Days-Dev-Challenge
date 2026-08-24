/* ========================================== */
/* main.js: UI Bindings and Orchestration     */
/* ========================================== */

// 1. IMPORT DEPENDENCIES
// IMPORTANT: You must include the .js extension in native browser modules!
import { debounce } from './utils.js';
import { fetchUserData } from './api.js';

// 2. DOM SELECTION
const searchInput = document.getElementById('username-search');
const profileContainer = document.getElementById('profile-display');

// 3. UI LOGIC
async function handleSearch() {
    const username = searchInput.value.trim();
    if (!username) return;

    profileContainer.innerHTML = `<p>Loading...</p>`;

    try {
        // Call the imported API function
        const data = await fetchUserData(username);
        
        // Build the UI
        profileContainer.innerHTML = `
            <h3>${data.name || data.login}</h3>
            <p>${data.bio || 'No bio available'}</p>
        `;
    } catch (error) {
        // Handle the error thrown by api.js
        profileContainer.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}

// 4. BIND EVENTS
if (searchInput) {
    // Wrap our handler in the imported debounce utility
    const optimizedSearch = debounce(handleSearch, 500);
    searchInput.addEventListener('input', optimizedSearch);
}

console.log("Modular Architecture Initialized.");