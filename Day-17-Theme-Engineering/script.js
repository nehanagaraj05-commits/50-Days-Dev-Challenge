/* ========================================== */
/* DAY 17: THEME TOGGLE & STATE PERSISTENCE   */
/* ========================================== */

const themeToggleBtn = document.getElementById('theme-toggle');

// 1. CHECK PREFERENCES ON LOAD
// Look into local storage to see if they visited before
const currentTheme = localStorage.getItem('synexus_theme');

// If they explicitly saved 'dark' before, apply the class immediately
if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    // Optional: Change button icon to a sun ☀️
}

// 2. THE TOGGLE LOGIC
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function() {
        
        // Step A: Toggle the 'dark-theme' class on the document body
        // YOUR CODE HERE
        

        // Step B: Determine what theme is currently active
        let theme = 'light';
        if (document.body.classList.contains('dark-theme')) {
            theme = 'dark';
        }
        
        // Step C: Save that preference to LocalStorage
        // YOUR CODE HERE: Use localStorage.setItem()
        
        
        // Optional: Swap the button icon between 🌙 and ☀️ based on the theme
    });
}