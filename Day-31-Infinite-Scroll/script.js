/* ========================================== */
/* DAY 31: PAGINATION & INFINITE SCROLL       */
/* ========================================== */

const feedContainer = document.getElementById('data-feed');
const sentinel = document.getElementById('scroll-sentinel');

// 1. STATE TRACKING
let currentPage = 1;
const limit = 10;
let isLoading = false; // THE LOCK: Prevents multiple fetches at the exact same time
let hasMoreData = true; // Tracks if we have reached the end of the database

// 2. THE PAGINATED FETCH FUNCTION
async function fetchNextPage() {
    // Step A: The Gatekeeper checks
    if (isLoading || !hasMoreData) return;
    
    // Lock the function so it can't be called again until this finishes
    isLoading = true;

    try {
        // Notice the query parameters! ?_page=1&_limit=10
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${limit}`);
        
        if (!response.ok) throw new Error("Failed to fetch data.");
        
        const data = await response.json();

        // Step B: End of Data Check
        if (data.length === 0) {
            hasMoreData = false;
            sentinel.textContent = "You've reached the end of the feed.";
            return;
        }

        // Step C: Render the chunk
        data.forEach(item => {
            const cardHTML = `
                <div class="feed-card" style="padding: 15px; border: 1px solid #ccc; margin-bottom: 10px;">
                    <h4>${item.id}. ${item.title}</h4>
                    <p>${item.body}</p>
                </div>
            `;
            // CRITICAL: Use += to ADD to the container, do not overwrite it!
            feedContainer.innerHTML += cardHTML;
        });

    } catch (error) {
        console.error("Pagination Error:", error);
        sentinel.textContent = "Error loading more items.";
    } finally {
        // Step D: Unlock the function so the observer can trigger it again later
        isLoading = false;
    }
}

// 3. THE INTERSECTION OBSERVER
const scrollObserver = new IntersectionObserver((entries) => {
    // Loop through the entries (we are only watching the sentinel)
    entries.forEach(entry => {
        // If the sentinel crosses into the screen...
        if (entry.isIntersecting) {
            
            // Increment the page number
            currentPage++;
            
            // Fetch the next chunk!
            fetchNextPage();
        }
    });
}, { rootMargin: "100px" }); // rootMargin tells it to trigger 100px BEFORE it enters the screen for a smoother experience!

// 4. INITIALIZE
if (feedContainer && sentinel) {
    // Load page 1 immediately
    fetchNextPage();
    
    // Tell the observer to start watching the sentinel at the bottom
    scrollObserver.observe(sentinel);
}