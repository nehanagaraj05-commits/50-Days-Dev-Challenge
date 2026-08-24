/* ========================================== */
/* api.js: Parallel Network Requests          */
/* ========================================== */

import { fetchWithRetry } from './utils.js';

export async function fetchDashboardData(username) {
    const safeUsername = username.toLowerCase();
    console.log(`📡 Dispatching parallel requests for [${safeUsername}]...`);

    try {
        // 1. SETUP THE PROMISES (Notice there is NO 'await' here!)
        // We are firing these requests off at the exact same time.
        const profileReq = fetchWithRetry(`https://api.github.com/users/${safeUsername}`);
        const reposReq = fetchWithRetry(`https://api.github.com/users/${safeUsername}/repos?sort=updated&per_page=3`);
        const followersReq = fetchWithRetry(`https://api.github.com/users/${safeUsername}/followers?per_page=5`);

        // 2. THE MASTER AWAIT
        // Wait for ALL of them to cross the finish line
        const responses = await Promise.all([profileReq, reposReq, followersReq]);

        // Gatekeeping: Check if any of them failed (Promise.all rejects if even one 404s, 
        // but we should still check for standard HTTP errors if our utility doesn't throw them)
        responses.forEach(res => {
            if (!res.ok) throw new Error("A network request failed.");
        });

        // 3. PARSE IN PARALLEL
        // .json() is also asynchronous, so we use Promise.all again!
        const parsedData = await Promise.all(responses.map(res => res.json()));

        // 4. ARRAY DESTRUCTURING
        // We extract the data based on the exact order we put the promises in
        const [profile, repos, followers] = parsedData;

        // 5. RETURN A UNIFIED PAYLOAD
        return {
            profile: profile,
            recentRepos: repos,
            recentFollowers: followers
        };

    } catch (error) {
        console.error("Dashboard Fetch Error:", error);
        throw error;
    }
}