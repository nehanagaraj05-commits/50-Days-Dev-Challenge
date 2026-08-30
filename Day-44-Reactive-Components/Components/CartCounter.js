/* ========================================== */
/* CartCounter.js: The Reactive Subscriber    */
/* ========================================== */

import { globalStore } from '../store.js';

class CartCounter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Setup initial UI with a span we can easily target later
        this.shadowRoot.innerHTML = `
            <style>
                .badge {
                    background: #007bff;
                    color: white;
                    padding: 5px 12px;
                    border-radius: 20px;
                    font-weight: bold;
                    transition: transform 0.2s ease;
                    display: inline-block;
                }
                .pop {
                    transform: scale(1.2);
                }
            </style>
            <div class="badge">🛒 Cart: <span id="count">0</span></div>
        `;
    }

    connectedCallback() {
        // 1. Initial Render (Grab the current state instantly)
        const initialState = globalStore.getState();
        this.updateUI(initialState.cartCount);

        // 2. Subscribe to future changes
        // We save the returned function to 'this.unsubscribe' so we can call it later
        this.unsubscribe = globalStore.subscribe((newState) => {
            this.updateUI(newState.cartCount);
        });
    }

    // Helper method to keep the UI logic clean
    updateUI(count) {
        // MUST use this.shadowRoot, not document!
        const countSpan = this.shadowRoot.getElementById('count');
        const badge = this.shadowRoot.querySelector('.badge');
        
        if (countSpan) countSpan.textContent = count || 0;
        
        // Add a quick visual pop effect
        if (badge) {
            badge.classList.add('pop');
            setTimeout(() => badge.classList.remove('pop'), 200);
        }
    }

    // 3. MEMORY MANAGEMENT (CRITICAL)
    disconnectedCallback() {
        // If this component is ever removed from the screen (e.g., the user navigates 
        // to a different page in our SPA), we MUST sever the connection to the store!
        if (this.unsubscribe) {
            this.unsubscribe();
            console.log("🧹 CartCounter unsubscribed to prevent memory leaks.");
        }
    }
}

customElements.define('cart-counter', CartCounter);