/* ========================================== */
/* DAY 23: DRAG AND DROP API                  */
/* ========================================== */

// 1. SELECT TARGETS
const taskCards = document.querySelectorAll('.task-card');
const kanbanColumns = document.querySelectorAll('.kanban-column .task-list');

// 2. CONFIGURE THE DRAGGABLE ITEMS
taskCards.forEach(card => {
    
    // When the user clicks and holds the card
    card.addEventListener('dragstart', () => {
        // Step A: Add a class to identify what is being dragged
        // YOUR CODE HERE: card.classList.add('is-dragging');
        
    });

    // When the user lets go of the mouse click
    card.addEventListener('dragend', () => {
        // Step B: Remove the class so it drops normally
        // YOUR CODE HERE
        
    });
});

// 3. CONFIGURE THE DROP ZONES (COLUMNS)
kanbanColumns.forEach(column => {
    
    // As a dragged item hovers over this column...
    column.addEventListener('dragover', (e) => {
        
        // CRITICAL: You must prevent default browser behavior, 
        // otherwise it will show a "cannot drop" cursor!
        e.preventDefault();

        // Step C: Find the specific card that has the '.is-dragging' class
        // YOUR CODE HERE: const draggedCard = document.querySelector('.is-dragging');
        
        
        // Step D: Append that card to this column!
        // YOUR CODE HERE: column.appendChild(draggedCard);
        
    });
});