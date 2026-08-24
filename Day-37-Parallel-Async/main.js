/* ========================================== */
/* main.js: Dashboard View Injection          */
/* ========================================== */

import { debounce } from './utils.js';
import { fetchDashboardData } from './api.js';

const searchInput = document.getElementById('username-search');
const dashboardContainer = document.getElementById('dashboard-view'); // Add this to your HTML!

async function renderDashboard() {
    const username = searchInput.value.trim();
    if (!username) return;

    dashboardContainer.innerHTML = `<p class="loading-text">Assembling dashboard...</p>`;

    try {
        // Fetch everything in one highly optimized parallel blast
        const dashboard = await fetchDashboardData(username);
        
        // --- 1. PROFILE SECTION ---
        let html = `
            <div class="dashboard-header">
                <img src="${dashboard.profile.avatar_url}" width="80" style="border-radius: 50%;">
                <h2>${dashboard.profile.name || dashboard.profile.login}</h2>
                <p>Total Repos: ${dashboard.profile.public_repos} | Followers: ${dashboard.profile.followers}</p>
            </div>
            <hr>
        `;

        // --- 2. REPOSITORIES SECTION ---
        html += `<h3>Recent Work</h3><div class="repo-grid" style="display: flex; gap: 10px;">`;
        if (dashboard.recentRepos.length === 0) {
            html += `<p>No public repositories found.</p>`;
        } else {
            dashboard.recentRepos.forEach(repo => {
                html += `
                    <div class="card" style="border: 1px solid #ccc; padding: 10px; width: 30%;">
                        <h4>${repo.name}</h4>
                        <p style="font-size: 0.8rem;">${repo.description || 'No description'}</p>
                    </div>
                `;
            });
        }
        html += `</div><hr>`;

        // --- 3. FOLLOWERS SECTION ---
        html += `<h3>Recent Followers</h3><div class="follower-list" style="display: flex; gap: 10px;">`;
        if (dashboard.recentFollowers.length === 0) {
            html += `<p>No followers found.</p>`;
        } else {
            dashboard.recentFollowers.forEach(follower => {
                html += `
                    <div style="text-align: center;">
                        <img src="${follower.avatar_url}" width="40" style="border-radius: 50%;">
                        <p style="font-size: 0.7rem;">${follower.login}</p>
                    </div>
                `;
            });
        }
        html += `</div>`;

        // Inject the fully assembled dashboard
        dashboardContainer.innerHTML = html;

    } catch (error) {
        dashboardContainer.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}

if (searchInput) {
    searchInput.addEventListener('input', debounce(renderDashboard, 600));
}