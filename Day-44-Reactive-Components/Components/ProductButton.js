/* ========================================== */
/* ProductButton.js: The State Publisher      */
/* ========================================== */

import { globalStore } from '../store.js';

class ProductButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const productName = this.getAttribute('product-name') || 'Item';
        
        this.shadowRoot.innerHTML = `
            <style>
                button {
                    background: #28a745;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 1rem;
                }
                button:hover { background: #218838; }
                button:active { transform: scale(0.98); }
            </style>
            
            <button id="add-btn">Add ${productName} to Cart</button>
        `;

        // Bind the click event to the shadow button
        const btn = this.shadowRoot.getElementById('add-btn');
        
        // Must use an arrow function here to preserve 'this' context if needed!
        btn.addEventListener('click', () => {
            
            // 1. Read current state
            const currentState = globalStore.getState();
            
            // 2. Publish new state
            globalStore.setState({
                // Add 1 to whatever the current count is
                cartCount: (currentState.cartCount || 0) + 1 
            });
            
            console.log(`✅ Published state change: Added ${productName}`);
        });
    }
}

customElements.define('product-button', ProductButton);