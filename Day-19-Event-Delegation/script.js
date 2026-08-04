/* ========================================== */
/* DAY 19: EVENT DELEGATION & MODALS          */
/* ========================================== */

// 1. SELECT TARGETS
const gridContainer = document.getElementById('dynamic-grid');
const projectModal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const closeModalBtn = document.getElementById('close-modal');

// 2. EVENT DELEGATION (The Core Logic)
if (gridContainer) {
    // We attach ONE listener to the parent container
    gridContainer.addEventListener('click', function(e) {
        
        // Use .closest() to find out if a .view-btn was clicked (or clicked inside of)
        const clickedButton = e.target.closest('.view-btn');
        
        // If the click wasn't on a button, ignore it and stop the function
        if (!clickedButton) return;
        
        // Step A: Extract the data from the button's data-title attribute
        const projectTitle = clickedButton.getAttribute('data-title');
        
        // Step B: Inject that data into the modal's title
        modalTitle.textContent = projectTitle;
        
        // Step C: Show the modal by changing its display style
        projectModal.style.display = 'flex'; // Assuming you use flexbox to center the modal
    });
}

// 3. CLOSING THE MODAL
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', function() {
        projectModal.style.display = 'none';
    });
}

// Bonus Challenge: Try closing the modal by clicking the 'projectModal' overlay itself!