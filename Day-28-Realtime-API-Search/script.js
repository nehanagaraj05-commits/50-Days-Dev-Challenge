/* ========================================== */
/* DAY 28: REAL-TIME API SEARCH & THROTTLING  */
/* ========================================== */

const searchInput = document.getElementById('github-username');
const profileContainer = document.getElementById('dev-profile-card');

// 1. THE DEBOUNCE UTILITY (From Day 21)
function debounce(func, delay = 500) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// 2. THE ASYNC FETCH FUNCTION
async function fetchContributor() {
    // We grab the value directly from the input element
    const username = searchInput.value.trim();

    // Step A: Handle the empty state
    // If the user deletes all text, clear the screen and stop the function
    if (username === '') {
        profileContainer.innerHTML = '';
        return;
    }

    profileContainer.innerHTML = `<p class="loading-text">Searching for ${username}...</p>`;

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        
        // Step B: Explicitly handle API Rate Limits
        if (response.status === 403 || response.status === 429) {
            throw new Error("API Rate Limit exceeded! You searched too many times. Take a breath.");
        }
        
        // Handle standard 404 Not Found
        if (!response.ok) {
            throw new Error("Developer not found.");
        }

        const data = await response.json();
        
        // Inject the data (Reusing Day 26 layout)
        profileContainer.innerHTML = `
            <div class="profile-card">
                <img src="${data.avatar_url}" alt="Avatar" style="width: 100px; border-radius: 50%;">
                <h3>${data.name || data.login}</h3>
                <p>${data.bio || "No bio available."}</p>
                <a href="${data.html_url}" target="_blank" class="btn-primary">View GitHub</a>
            </div>
        `;

        // Optional: Call your fetchRepositories(username) function from Day 27 here!

    } catch (error) {
        console.error(error);
        profileContainer.innerHTML = `<p class="error-text">⚠️ ${error.message}</p>`;
    }
}

// 3. BINDING THE DEBOUNCED EVENT
if (searchInput) {
    // We wrap our fetch function inside the debounce utility.
    // The browser will now wait 500ms after the LAST keystroke before running fetchContributor!
    const optimizedSearch = debounce(fetchContributor, 500);
    
    // Listen for every keystroke ('input' event)
    searchInput.addEventListener('input', optimizedSearch);
}