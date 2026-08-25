/* ========================================== */
/* DAY 11: DOM FUNDAMENTALS & EVENTS          */
/* ========================================== */

console.log("Synexus Engine Initialized. Ready for logic.");

// 1. DOM SELECTION
const heroHeadline = document.querySelector("#home h1");
const heroButton = document.querySelector(".btn-cta");

// 2. EVENT LISTENER
heroButton.addEventListener("click", function () {
  // 3. DOM MANIPULATION
  heroHeadline.textContent = "Welcome to the Synexus Core!";

  // Bonus Challenge
  heroHeadline.classList.toggle("active-state");
});
