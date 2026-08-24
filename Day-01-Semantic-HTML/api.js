/* ========================================== */
/* api.js: All Network Requests + Caching     */
/* ========================================== */

import { fetchWithRetry } from "./utils.js";

const userCache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000;

export async function fetchGithubUser(username, signal) {
  const safeUsername = username.toLowerCase();

  if (userCache.has(safeUsername)) {
    const cached = userCache.get(safeUsername);
    const isExpired = Date.now() - cached.timestamp > CACHE_TTL_MS;

    if (!isExpired) {
      console.log(`⚡ Serving [${safeUsername}] from local cache!`);
      return cached.data;
    } else {
      console.log(`⏳ Cache expired for [${safeUsername}], refetching...`);
      userCache.delete(safeUsername);
    }
  }

  console.log(`📡 Fetching [${safeUsername}] from external server...`);

  const response = await fetchWithRetry(
    `https://api.github.com/users/${safeUsername}`,
    { signal },
  );

  if (response.status === 403 || response.status === 429) {
    throw new Error(
      "API Rate Limit exceeded! You searched too many times. Take a breath.",
    );
  }
  if (!response.ok) {
    throw new Error("Developer not found.");
  }

  const data = await response.json();
  userCache.set(safeUsername, { data, timestamp: Date.now() });

  return data;
}

export async function fetchGithubRepos(username, signal) {
  const response = await fetchWithRetry(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
    { signal },
  );
  if (!response.ok) throw new Error("Could not fetch repositories.");
  return await response.json();
}

export async function postProposal(data) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (response.status !== 201)
    throw new Error(`Server responded with status ${response.status}`);
  return result;
}

export async function updateProposal(id, data) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      method: "PUT",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(data),
    },
  );
  if (!response.ok) throw new Error("Failed to update data.");
  return await response.json();
}

export async function deleteProposal(id) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    { method: "DELETE" },
  );
  if (!response.ok) throw new Error("Failed to delete data.");
  return await response.json();
}

export async function fetchPostsPage(page, limit) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`,
  );
  if (!response.ok) throw new Error("Failed to fetch data.");
  return await response.json();
}
