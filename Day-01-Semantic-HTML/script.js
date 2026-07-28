/* ========================================== */
/* DAY 12: MOBILE MENU TOGGLE LOGIC           */
/* ========================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navLinksContainer = document.querySelector("nav ul");

if (menuToggle && navLinksContainer) {
  menuToggle.addEventListener("click", () => {
    navLinksContainer.classList.toggle("nav-active");

    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !isExpanded);
  });
}
/* ========================================== */
/* DAY 13: FORM VALIDATION LOGIC              */
/* ========================================== */

const membershipForm = document.querySelector(".membership-form");
const nameInput = document.getElementById("fullName");
const emailInput = document.getElementById("emailAddress");

if (membershipForm) {
  membershipForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();

    if (nameValue === "") {
      console.log("Error: Name cannot be blank.");
      nameInput.style.borderColor = "red";
    } else if (!emailValue.includes("@")) {
      console.log("Error: Please enter a valid email address.");
      emailInput.style.borderColor = "red";
    } else {
      console.log("Success! Application Data:", { nameValue, emailValue });

      nameInput.style.borderColor = "#ccc";
      emailInput.style.borderColor = "#ccc";
      membershipForm.reset();
    }
  });
}
