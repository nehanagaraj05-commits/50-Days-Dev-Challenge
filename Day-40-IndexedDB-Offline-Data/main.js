/* ========================================== */
/* main.js: Form Submission Handler           */
/* ========================================== */

import { submitInitiative } from './api.js';

const proposalForm = document.getElementById('proposal-form');
const feedbackMessage = document.getElementById('feedback-message');

if (proposalForm) {
    proposalForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        feedbackMessage.innerHTML = `<p class="loading-text">Processing...</p>`;

        const payload = {
            title: document.getElementById('initiative-title').value,
            body: document.getElementById('initiative-desc').value
        };

        try {
            const result = await submitInitiative(payload);
            feedbackMessage.innerHTML = `<p style="color: green;">✅ Proposal submitted to server!</p>`;
            proposalForm.reset();
            
        } catch (error) {
            // Handle the specific offline state we threw in api.js
            if (error.message === "OFFLINE_SAVED") {
                feedbackMessage.innerHTML = `<p style="color: orange;">📡 You are offline. Proposal saved securely to your device and will sync later!</p>`;
                proposalForm.reset();
            } else {
                feedbackMessage.innerHTML = `<p style="color: red;">⚠️ ${error.message}</p>`;
            }
        }
    });
}