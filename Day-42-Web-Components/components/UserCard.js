/* ========================================== */
/* UserCard.js: Native Web Component          */
/* ========================================== */

class UserCard extends HTMLElement {
    constructor() {
        // Always call super first in a class extending another class
        super();
        
        // Attach the Shadow DOM to protect this component's CSS from the rest of the app
        this.attachShadow({ mode: 'open' });
    }

    // This lifecycle method runs the exact moment the tag is placed on the screen
    connectedCallback() {
        this.render();
    }

    // A custom method to handle painting the UI
    render() {
        // Extract the data passed into the HTML attributes
        // We use logical OR (||) to provide fallbacks if the attribute is missing
        const name = this.getAttribute('name') || 'Unknown User';
        const role = this.getAttribute('role') || 'Member';
        const avatar = this.getAttribute('avatar') || 'https://via.placeholder.com/150';

        // Inject the HTML and the encapsulated CSS into the Shadow DOM
        this.shadowRoot.innerHTML = `
            <style>
                /* This CSS ONLY affects this specific component. It will not leak out! */
                .card {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: #ffffff;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    padding: 20px;
                    width: 250px;
                    text-align: center;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                    transition: transform 0.2s ease;
                }
                .card:hover {
                    transform: translateY(-5px);
                }
                .avatar {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 3px solid #f0f0f0;
                    margin-bottom: 15px;
                }
                h3 {
                    margin: 0 0 5px 0;
                    color: #333;
                    font-size: 1.2rem;
                }
                p {
                    margin: 0;
                    color: #666;
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
            </style>

            <div class="card">
                <img src="${avatar}" alt="${name}" class="avatar">
                <h3>${name}</h3>
                <p>${role}</p>
            </div>
        `;
    }
}

// Register the class with the browser's custom element registry
// The tag name MUST contain a hyphen!
window.customElements.define('user-card', UserCard);
