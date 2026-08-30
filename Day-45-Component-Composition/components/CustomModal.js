/* ========================================== */
/* CustomModal.js: Template Cloning Module    */
/* ========================================== */

class CustomModal extends HTMLElement {
    constructor() {
        super();
        
        // 1. Attach the Shadow DOM to protect the component
        this.attachShadow({ mode: 'open' });
        
        // 2. Query the main document for the template element
        const template = document.getElementById('modal-template');
        
        // Safety check: Does the template exist in the HTML file?
        if (template) {
            // 3. Clone the nodes deeply (true means clone all nested children too)
            const templateContent = template.content.cloneNode(true);
            
            // 4. Inject the clone into the Shadow DOM
            this.shadowRoot.appendChild(templateContent);
        } else {
            console.error("CustomModal Error: Cannot find 'modal-template' in the DOM.");
        }
    }
}

// Register the custom element
customElements.define('custom-modal', CustomModal);