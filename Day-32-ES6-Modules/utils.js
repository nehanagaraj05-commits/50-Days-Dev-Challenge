/* ========================================== */
/* utils.js: Helper Functions                 */
/* ========================================== */

// By adding 'export', we allow other files to use this function
export function debounce(func, delay = 500) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// You can export as many things as you want from a single file
export function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}