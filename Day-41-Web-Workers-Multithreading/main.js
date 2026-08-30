/* ========================================== */
/* main.js: The Main UI Thread & Orchestrator */
/* ========================================== */

const processBtn = document.getElementById('process-btn');
const terminateBtn = document.getElementById('terminate-btn'); // Optional Bonus button
const outputDisplay = document.getElementById('computation-output');

// 1. INITIALIZE THE WORKER
// Point this to your new worker.js file
let backgroundWorker;

if (window.Worker) {
    backgroundWorker = new Worker('worker.js');

    // 2. LISTEN FOR THE WORKER'S RESPONSE
    backgroundWorker.onmessage = function(event) {
        const payload = event.data;
        
        if (payload.status === 'SUCCESS') {
            console.log("🖥️ [Main] Result received from Worker:", payload.data);
            
            outputDisplay.innerHTML = `<p style="color: green;">✅ Math Complete: ${payload.data}</p>`;
            
            // Re-enable the button
            processBtn.disabled = false;
            processBtn.textContent = "Run Heavy Process";
        }
    };
} else {
    console.error("Web Workers are not supported in your browser.");
}

// 3. SEND COMMANDS TO THE WORKER
if (processBtn) {
    processBtn.addEventListener('click', () => {
        outputDisplay.innerHTML = `<p class="loading-text">Processing 2 billion iterations in the background... Notice how the UI animations don't freeze?</p>`;
        
        // Disable button to prevent spam clicking
        processBtn.disabled = true;
        processBtn.textContent = "Processing...";

        // Dispatch the command to the background thread
        backgroundWorker.postMessage('START_COMPUTATION');
    });
}

// 4. BONUS: TERMINATE THE THREAD EARLY
if (terminateBtn && backgroundWorker) {
    terminateBtn.addEventListener('click', () => {
        console.warn("🖥️ [Main] Terminating the background thread instantly.");
        
        // Kills the worker dead in its tracks
        backgroundWorker.terminate(); 
        
        outputDisplay.innerHTML = `<p style="color: red;">🛑 Process forcibly canceled by user.</p>`;
        
        // Reset the button states
        processBtn.disabled = false;
        processBtn.textContent = "Run Heavy Process";
        
        // Note: You must instantiate a NEW worker if you want to run it again after terminating!
        backgroundWorker = new Worker('worker.js'); 
        // (You would also need to re-attach the .onmessage listener here)
    });
}