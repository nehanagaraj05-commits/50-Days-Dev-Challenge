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
