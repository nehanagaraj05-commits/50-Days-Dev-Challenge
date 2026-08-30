/* ========================================== */
/* main.js: Testing the Reactive Store        */
/* ========================================== */

import { globalStore } from './store.js';

// --- COMPONENT A: The Header (The Subscriber) ---
const cartCounterDisplay = document.getElementById('cart-count-display'); // Make sure this exists in your HTML!

if (cartCounterDisplay) {
    // We tell the store: "Hey, whenever ANY data changes, run this function!"
    globalStore.subscribe((currentState) => {
        // The UI automatically reacts to the new data
        cartCounterDisplay.textContent = `Items in Cart: ${currentState.cartCount}`;
        
        // Add a quick animation class to show it updated
        cartCounterDisplay.classList.add('flash-update');
        setTimeout(() => cartCounterDisplay.classList.remove('flash-update'), 300);
    });
}

// --- COMPONENT B: The Product Button (The Publisher) ---
const addToCartBtn = document.getElementById('add-to-cart-btn'); // Make sure this exists in your HTML!

if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
        // We do NOT touch the DOM here. We don't care about the Header.
        // We only care about updating the core truth: The Global Store.
        
        const currentData = globalStore.getState();
        
        // Dispatch the state change. 
        // This will instantly trigger the Header's subscribe function above!
        globalStore.setState({ 
            cartCount: currentData.cartCount + 1 
        });
    });
}