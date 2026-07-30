/* ========================================== */
/* DAY 16: LOCAL STORAGE PERSISTENCE          */
/* ========================================== */

const appForm = document.querySelector('.membership-form');
const nameInput = document.getElementById('fullName');
const emailInput = document.getElementById('emailAddress');

// 1. STATE RECOVERY ON PAGE LOAD
// This blocks executes immediately when the file loads in the browser.
const savedDraft = localStorage.getItem('synexus_form_draft');

if (savedDraft) {
    // Hint: Turn the text back into an object using JSON.parse()
    const parsedData = JSON.parse(savedDraft);
    
    // YOUR CODE HERE: Assign parsedData.name and parsedData.email 
    // to nameInput.value and emailInput.value to restore them!
    
}

// 2. SAVING DATA IN REAL-TIME
function saveProgress() {
    if (!nameInput || !emailInput) return;
    
    // Construct the data payload object
    const draftData = {
        name: nameInput.value,
        email: emailInput.value
    };
    
    // YOUR CODE HERE: Use JSON.stringify() to serialize draftData, 
    // then use localStorage.setItem() to save it under the key 'synexus_form_draft'

}

// Bind the real-time saver to input events
if (nameInput && emailInput) {
    nameInput.addEventListener('input', saveProgress);
    emailInput.addEventListener('input', saveProgress);
}

// 3. CLEAN UP ON SUCCESSFUL SUBMIT
if (appForm) {
    appForm.addEventListener('submit', function(e) {
        // (Assuming your validation logic from Day 13 is running here)
        
        // YOUR CODE HERE: Once everything is verified, wipe the 
        // local storage key clean so the next draft is completely fresh!
        
    });
}