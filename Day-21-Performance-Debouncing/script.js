/* ========================================== */
/* DAY 21: PERFORMANCE DEBOUNCING             */
/* ========================================== */

// 1. THE DEBOUNCE UTILITY (Higher-Order Function)
// It takes a function (func) and a delay time in ms (delay)
function debounce(func, delay = 300) {
    let timeoutId; // This variable is protected by the closure

    // We return a new function that acts as the "gatekeeper"
    return function (...args) {
        
        // Step A: If the user types again before the delay finishes, cancel the old timer!
        // YOUR CODE HERE: Use clearTimeout(timeoutId)
        

        // Step B: Set a new timer. 
        timeoutId = setTimeout(() => {
            // Once the timer finishes, execute the original function
            func.apply(this, args);
        }, delay);
    };
}

// 2. THE HEAVY LOGIC (Mock Search API)
const searchInput = document.getElementById('search-projects');

function executeHeavySearch(event) {
    const searchTerm = event.target.value;
    
    // Imagine this line makes a request to a database!
    console.log(`📡 Fetching results for: "${searchTerm}"...`);
    
    // (You would put your filtering logic from Day 15 here)
}

// 3. APPLY THE OPTIMIZATION
if (searchInput) {
    // We wrap our heavy function inside our utility function
    const optimizedSearch = debounce(executeHeavySearch, 400);

    // Watch the console: It will only log AFTER you stop typing for 400ms!
    searchInput.addEventListener('input', optimizedSearch);
}