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
/* ========================================== */
/* DAY 15: ARRAY FILTERING & SEARCH           */
/* ========================================== */

const projectsData = [
  {
    title: "Project StoreLane",
    description:
      "A phygital hyperlocal commerce platform designed to digitize small local vendors.",
    status: "Active",
  },
  {
    title: "QR Attendance Tracker",
    description:
      "Automated student attendance system utilizing progressive web app (PWA) tech and real-time scanning.",
    status: "Active",
  },
  {
    title: "Logistics Management System",
    description:
      "Desktop architecture built for tracking shipments and driver status in real-time.",
    status: "Completed",
  },
];

const gridContainer = document.getElementById("dynamic-grid");
const searchInput = document.getElementById("search-projects");

function renderProjects(dataArray) {
  if (!gridContainer) return;

  gridContainer.innerHTML = "";

  if (dataArray.length === 0) {
    gridContainer.innerHTML = "<p>No initiatives match your search.</p>";
    return;
  }

  dataArray.forEach(function (project) {
    const statusClass =
      project.status === "Active" ? "status-active" : "status-completed";

    const cardHTML = `
            <div class="initiative-card ${statusClass}">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <span class="badge">${project.status}</span>
            </div>
        `;
    gridContainer.innerHTML += cardHTML;
  });
}

renderProjects(projectsData);

if (searchInput) {
  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();

    const filteredProjects = projectsData.filter((project) =>
      project.title.toLowerCase().includes(searchTerm),
    );

    renderProjects(filteredProjects);
  });
}
