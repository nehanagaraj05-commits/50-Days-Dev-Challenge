/* ========================================== */
/* DAY 27: API ARRAY ITERATION & FEEDS        */
/* ========================================== */

const reposGrid = document.getElementById('repos-grid');

// 1. THE REPOSITORY FETCH FUNCTION
async function fetchRepositories(username) {
    
    // Step A: Provide a loading state for the grid
    if (reposGrid) {
        reposGrid.innerHTML = `<p class="loading-text">Loading repositories...</p>`;
    }

    try {
        // Step B: Fetch the array of repositories
        // We use query parameters (?sort... &per_page...) to limit the data size
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        
        if (!response.ok) {
            throw new Error("Could not fetch repositories.");
        }

        const data = await response.json();
        
        // Console log the data so you can see exactly what GitHub gives us!
        console.log("Repository Data:", data);

        // Step C: Clear the loading text before injecting new data
        reposGrid.innerHTML = '';

        // Step D: Handle the Empty State
        if (data.length === 0) {
            reposGrid.innerHTML = `<p>No public repositories found for this user.</p>`;
            return; // Stop the function here
        }

        // Step E: Iterate through the array and build the UI
        data.forEach(repo => {
            
            // Hint: Use ${repo.name}, ${repo.description || 'Fallback text'}, and ${repo.html_url}
            const repoCard = `
                <div class="initiative-card">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || "No description provided for this project."}</p>
                    
                    <div class="repo-meta" style="margin-top: 15px; display: flex; gap: 10px; font-size: 0.9rem;">
                        <span>⭐ ${repo.stargazers_count}</span>
                        <span>🍴 ${repo.forks_count}</span>
                    </div>

                    <a href="${repo.html_url}" target="_blank" class="btn-secondary" style="margin-top: 15px; display: inline-block;">View Code</a>
                </div>
            `;
            
            // Inject into the grid!
            reposGrid.innerHTML += repoCard;
        });

    } catch (error) {
        console.error("Repo Fetch Error:", error);
        reposGrid.innerHTML = `<p class="error-text">⚠️ Failed to load repositories.</p>`;
    }
}

// 2. INTEGRATE WITH YESTERDAY'S CODE
// (Go find your fetchContributor function from Day 26 and add this to the bottom of the try block!)

/* async function fetchContributor(username) {
      try {
          // ... (Your Day 26 code) ...
          
          // NEW: If the profile succeeds, fetch the repos!
          fetchRepositories(username);

      } catch (error) {
          // ...
      }
  }
*/