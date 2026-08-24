/* ========================================== */
/* main.js: Integration & Event Binding       */
/* ========================================== */

import { connectWebSocket, sendLiveMessage } from './websocket.js';

// 1. INITIALIZE THE CONNECTION ON LOAD
document.addEventListener('DOMContentLoaded', () => {
    connectWebSocket();
});

// 2. BIND THE UI
const wsInput = document.getElementById('ws-input');
const wsSendBtn = document.getElementById('ws-send');

if (wsSendBtn && wsInput) {
    wsSendBtn.addEventListener('click', () => {
        const text = wsInput.value.trim();
        
        if (text === '') return; // Don't send empty messages

        // Fire the transmission
        sendLiveMessage(text);
        
        // Clear the input box
        wsInput.value = '';
    });
    
    // Quality of Life: Allow sending with the Enter key
    wsInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            wsSendBtn.click();
        }
    });
}