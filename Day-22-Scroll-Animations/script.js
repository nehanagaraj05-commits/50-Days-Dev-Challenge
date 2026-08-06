/* ========================================== */
/* DAY 22: INTERSECTION OBSERVER API          */
/* ========================================== */

// 1. SETUP THE OBSERVER
// The observer takes a callback function that receives 'entries' (the things it is watching)
const scrollObserver = new IntersectionObserver((entries) => {
    
    // Loop through all the entries that the observer is tracking
    entries.forEach((entry) => {
        
        // Step A: Check if the element is currently visible on the screen
        if (entry.isIntersecting) {
            
            // Step B: Add the '.show' class to trigger the CSS transition
            // Hint: entry.target is the specific HTML element
            entry.target.classList.add('show');
            
            // Optional: Stop observing the element once it has animated in 
            // so it doesn't run the math again!
            // scrollObserver.unobserve(entry.target);
            
        } else {
            // Optional Bonus: Remove the class when it leaves the screen to animate it out!
            // entry.target.classList.remove('show');
        }
    });
});

// 2. SELECT ALL HIDDEN ELEMENTS
// Hint: Grab everything with the '.hidden' class
const hiddenElements = document.querySelectorAll('.hidden');

// 3. DEPLOY THE WATCHERS
// Loop through the NodeList and tell the observer to watch each one
hiddenElements.forEach((element) => {
    scrollObserver.observe(element);
});