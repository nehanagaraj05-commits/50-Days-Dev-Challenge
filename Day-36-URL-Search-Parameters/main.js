/* ========================================== */
/* main.js: UI Bindings & URL State Sync      */
/* ========================================== */

import { debounce } from './utils.js';
import { fetchUserData } from './api.js';

const searchInput = document.getElementById('username-search');
const profileContainer = document.getElementById('profile-display');

// 1. UPDATE THE URL (Write State)
function updateURLParameter(key, value) {
    // Grab the current window location
    const url = new URL(window.location);
    
    if (value) {
        // Safely set or overwrite the parameter
        url.searchParams.set(key, value);
    } else {
        // Cleanly remove the parameter if the value is empty
        url.searchParams.delete(key);
    }
    
    // Update the address bar without refreshing the page!
    window.history.pushState({}, "", url);
}

// 2. THE SEARCH HANDLER
async function handleSearch(searchTerm) {
    // If we call this from the input event, grab the value. 
    // If we call it from the URL load, use the passed term.
    const username = searchTerm || searchInput.value.trim();
    
    if (!username) {
        profileContainer.innerHTML = '';
        updateURLParameter('user', null); // Clear the URL
        return;
    }

    // Sync the URL with the active search
    updateURLParameter('user', username);
    
    // Ensure the input box reflects the term (critical for page load hydration)
    if (searchInput) searchInput.value = username;

    profileContainer.innerHTML = `<p class="loading-text">Loading...</p>`;

    try {
        const data = await fetchUserData(username);
        
        profileContainer.innerHTML = `
            <h3>${data.name || data.login}</h3>
            <p>${data.bio || 'No bio available'}</p>
        `;
    } catch (error) {
        profileContainer.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}

// 3. EVENT BINDING
if (searchInput) {
    const optimizedSearch = debounce(() => handleSearch(), 500);
    searchInput.addEventListener('input', optimizedSearch);
}

// 4. HYDRATE STATE ON PAGE LOAD (Read State)
function initApp() {
    console.log("App Initialized. Checking URL for state...");
    
    // Parse the query strings from the URL (e.g., ?user=john)
    const params = new URLSearchParams(window.location.search);
    const userFromURL = params.get('user');
    
    // If the URL contains a user, immediately trigger the search!
    if (userFromURL) {
        handleSearch(userFromURL);
    }
}

// Run the initialization sequence when the DOM is ready
document.addEventListener('DOMContentLoaded', initApp);