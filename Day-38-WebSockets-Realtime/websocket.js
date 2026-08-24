/* ========================================== */
/* websocket.js: Persistent Data Streams      */
/* ========================================== */

// 1. ESTABLISH THE CONNECTION
// We use 'wss://' (WebSocket Secure) instead of 'https://'
const wsUrl = 'wss://ws.postman-echo.com/raw';
let liveSocket;

export function connectWebSocket() {
    console.log("🔌 Attempting to connect to live server...");
    
    // Initialize the native browser WebSocket object
    liveSocket = new WebSocket(wsUrl);

    // 2. EVENT: CONNECTION OPENED
    liveSocket.onopen = (event) => {
        console.log("🟢 Live Connection Established!");
        
        // Optional: Update UI to show "Online" status
        const statusIndicator = document.getElementById('connection-status');
        if (statusIndicator) statusIndicator.innerHTML = '🟢 Online';
    };

    // 3. EVENT: MESSAGE RECEIVED FROM SERVER
    liveSocket.onmessage = (event) => {
        console.log("📥 Incoming Stream:", event.data);
        
        const feedContainer = document.getElementById('live-feed');
        if (feedContainer) {
            // Append the incoming message to the UI
            const messageHTML = `<div class="msg received" style="color: blue;">Server: ${event.data}</div>`;
            feedContainer.innerHTML += messageHTML;
            
            // Auto-scroll to the bottom of the feed
            feedContainer.scrollTop = feedContainer.scrollHeight;
        }
    };

    // 4. EVENT: ERRORS AND DISCONNECTS
    liveSocket.onerror = (error) => {
        console.error("⚠️ WebSocket Error:", error);
    };

    liveSocket.onclose = (event) => {
        console.warn("🔴 Connection Lost.");
        
        const statusIndicator = document.getElementById('connection-status');
        if (statusIndicator) statusIndicator.innerHTML = '🔴 Offline';

        // Bonus: Implement auto-reconnect logic here!
        // setTimeout(connectWebSocket, 3000);
    };
}

// 5. TRANSMISSION UTILITY
export function sendLiveMessage(payloadText) {
    // Defensive check: Is the socket actually open and ready?
    if (liveSocket && liveSocket.readyState === WebSocket.OPEN) {
        
        // Send the payload to the server
        liveSocket.send(payloadText);
        console.log("📤 Outgoing Stream:", payloadText);
        
        // Update the UI immediately for the user
        const feedContainer = document.getElementById('live-feed');
        if (feedContainer) {
            const messageHTML = `<div class="msg sent" style="color: green;">You: ${payloadText}</div>`;
            feedContainer.innerHTML += messageHTML;
        }
        
    } else {
        console.error("Cannot transmit: Connection is not open.");
        alert("Wait for the connection to establish before sending.");
    }
}