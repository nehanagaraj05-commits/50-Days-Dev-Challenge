/* ========================================== */
/* DAY 25: PHASE 2 CAPSTONE ENGINE            */
/* ========================================== */

// ==========================================
// 1. GLOBAL UI MODULES (Run once on load)
// ==========================================

function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return; // Safety check

    const currentTheme = localStorage.getItem('synexus_theme');
    if (currentTheme === 'dark') document.body.classList.add('dark-theme');

    // Make sure we only attach this once!
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('synexus_theme', theme);
    });
}

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('nav ul');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => navLinks.classList.toggle('nav-active'));
    }
}

// ==========================================
// 2. VIEW-SPECIFIC MODULES (Run when routed)
// ==========================================

function initFormValidation() {
    const membershipForm = document.querySelector('.membership-form');
    if (!membershipForm) return;

    // Paste your Day 13 Validation & Day 16 LocalStorage code here
    // ...
}

function initScrollObserver() {
    const hiddenElements = document.querySelectorAll('.hidden');
    if (hiddenElements.length === 0) return;

    // Paste your Day 22 Intersection Observer code here
    // ...
}

// ==========================================
// 3. THE SPA ROUTER (The Orchestrator)
// ==========================================

const routes = {
    // Paste your routes from Day 24 here
};

function router() {
    let path = window.location.pathname;
    if (path.includes('index.html')) path = '/';

    const viewHTML = routes[path] || routes[404];
    document.getElementById('app-root').innerHTML = viewHTML;

    // ⚡ THE CRITICAL STEP: Re-initialize local logic after injecting new HTML!
    if (path === '/') {
        initScrollObserver();
    } else if (path === '/join') {
        initFormValidation();
    } else if (path === '/team') {
        // initKanbanBoard(); 
    }
}

// ==========================================
// 4. ENGINE INITIALIZATION
// ==========================================

function initApp() {
    console.log("Synexus Core Engine: Online.");

    // 1. Start global features
    initThemeToggle();
    initMobileMenu();

    // 2. Intercept navigation for the SPA
    document.body.addEventListener('click', e => {
        if (e.target.matches('.nav-link')) {
            e.preventDefault();
            window.history.pushState(null, "", e.target.href);
            router();
        }
    });

    window.addEventListener('popstate', router);

    // 3. Render the initial view
    router();
}

// ⏳ Wait for the browser to build the HTML before starting the engine
document.addEventListener('DOMContentLoaded', initApp);