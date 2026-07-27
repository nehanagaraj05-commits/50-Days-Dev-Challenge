/* ========================================== */
/* DAY 13: FORM VALIDATION LOGIC              */
/* ========================================== */

// 1. SELECT THE FORM (Not the button!)
const membershipForm = document.querySelector('.membership-form');
const nameInput = document.getElementById('fullName');
const emailInput = document.getElementById('emailAddress');

// Ensure the form exists on this page before adding the listener
if (membershipForm) {
    
    // 2. INTERCEPT THE SUBMIT EVENT
    // We pass 'e' (the event object) into the function
    membershipForm.addEventListener('submit', function(e) {
        
        // CRITICAL: Stop the browser from reloading the page
        e.preventDefault();
        
        // 3. EXTRACT THE VALUES
        // .trim() removes accidental whitespace the user might have typed
        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();
        
        // 4. CONDITIONAL LOGIC (The Gatekeeper)
        // Hint: Check if nameValue is empty. If it is, show an error.
        
        if (nameValue === "") {
            // Logic for empty name (e.g., change border to red)
            console.log("Error: Name cannot be blank.");
            nameInput.style.borderColor = "red";
            
        } else if (!emailValue.includes('@')) {
            // Logic for invalid email
            console.log("Error: Please enter a valid email address.");
            emailInput.style.borderColor = "red";
            
        } else {
            // Success Logic!
            console.log("Success! Application Data:", { nameValue, emailValue });
            
            // Reset the form styling and clear the inputs
            nameInput.style.borderColor = "#ccc";
            emailInput.style.borderColor = "#ccc";
            membershipForm.reset();
        }
        
    });
}