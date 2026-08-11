/* ========================================== */
/* DAY 24: SPA CLIENT-SIDE ROUTING            */
/* ========================================== */

// 1. DEFINE THE VIEWS (The "Pages")
// We store our HTML structures as strings to inject later
const routes = {
    404: `
        <div class="view-container text-center">
            <h1>404</h1>
            <p>Page not found. You strayed from the path.</p>
            <a href="/" class="nav-link btn-primary">Go Home</a>
        </div>
    `,
    "/": `
        <div class="view-container hero-section">
            <h1>Welcome to Synexus Core</h1>
            <p>Standard, not a trend. The logic, not a language.</p>
        </div>
    `,
    "/initiatives": `
        <div class="view-container">
            <h2>Community Initiatives</h2>
            <p>Our project gallery will render here.</p>
        </div>
    `,
    "/team": `
        <div class="view-container">
            <h2>Leadership Team</h2>
            <p>Core committee profiles will render here.</p>
        </div>
    `
};

// 2. THE ROUTER ENGINE
// This function looks at the URL and injects the correct HTML
function router() {
    // Grab the URL path (e.g., "/", "/team")
    let path = window.location.pathname;

    // Fix for GitHub Pages or local subfolders (optional, depending on setup)
    if (path.includes('index.html')) path = '/';

    // Get the HTML string from our routes object, fallback to 404 if it doesn't exist
    const viewHTML = routes[path] || routes[404];

    // Inject the HTML into our app root
    document.getElementById('app-root').innerHTML = viewHTML;
    
    // Hint: If your new page needs specific JavaScript to run (like Day 14's array loops), 
    // you would call those functions right here after the HTML is injected!
}

// 3. INTERCEPT NAVIGATION
// We listen to the whole document to catch any clicks on our links
document.body.addEventListener('click', e => {
    
    // Check if the clicked element has the '.nav-link' class
    if (e.target.matches('.nav-link')) {
        
        // CRITICAL: Stop the browser from hard-reloading the page
        e.preventDefault();
        
        // Push the new URL to the browser's history
        const newUrl = e.target.href;
        window.history.pushState(null, "", newUrl);
        
        // Manually trigger the router to update the UI
        router();
    }
});

// 4. HANDLE THE BROWSER BACK BUTTON
// The 'popstate' event fires when the user clicks Back or Forward in their browser
window.addEventListener('popstate', router);

// 5. INITIALIZE
// Run the router once when the script first loads to render the initial page
router();