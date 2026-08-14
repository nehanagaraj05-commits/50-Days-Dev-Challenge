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

// Day 16: Restore saved draft on page load
const savedDraft = localStorage.getItem("synexus_form_draft");

if (savedDraft) {
  const parsedData = JSON.parse(savedDraft);
  nameInput.value = parsedData.name;
  emailInput.value = parsedData.email;
}

function saveProgress() {
  const draftData = {
    name: nameInput.value,
    email: emailInput.value,
  };
  localStorage.setItem("synexus_form_draft", JSON.stringify(draftData));
}

nameInput.addEventListener("input", saveProgress);
emailInput.addEventListener("input", saveProgress);
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
      localStorage.removeItem("synexus_form_draft"); // Day 16: clear saved draft
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
            <div class="initiative-card ${statusClass} hidden">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <span class="badge">${project.status}</span>
<button class="view-btn" data-title="${project.title}">View Details</button>
            </div>
        `;
    gridContainer.innerHTML += cardHTML;
  });
}

renderProjects(projectsData);

/* ========================================== */
/* DAY 21: PERFORMANCE DEBOUNCING             */
/* ========================================== */

function debounce(func, delay = 300) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function executeHeavySearch(event) {
  const searchTerm = event.target.value.toLowerCase();

  console.log(`📡 Fetching results for: "${searchTerm}"...`);

  const filteredProjects = projectsData.filter((project) =>
    project.title.toLowerCase().includes(searchTerm),
  );

  renderProjects(filteredProjects);
  observeHiddenElements(); // re-attach observer to freshly rendered cards
}

if (searchInput) {
  const optimizedSearch = debounce(executeHeavySearch, 400);
  searchInput.addEventListener("input", optimizedSearch);
}
/* ========================================== */
/* DAY 17: THEME TOGGLE & STATE PERSISTENCE   */
/* ========================================== */

const themeToggleBtn = document.getElementById("theme-toggle");

const currentTheme = localStorage.getItem("synexus_theme");

if (currentTheme === "dark") {
  document.body.classList.add("dark-theme");
  themeToggleBtn.textContent = "☀️";
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");

    let theme = "light";
    if (document.body.classList.contains("dark-theme")) {
      theme = "dark";
      themeToggleBtn.textContent = "☀️";
    } else {
      themeToggleBtn.textContent = "🌙";
    }

    localStorage.setItem("synexus_theme", theme);
  });
}
/* ========================================== */
/* DAY 18: TIMERS & THE EVENT LOOP            */
/* ========================================== */

const testimonialsData = [
  {
    name: "Anant Sharma",
    quote: "It's about logic, not just languages.",
  },
  {
    name: "Harshit Singh",
    quote:
      "Synexus changed how I approach engineering. It's about logic, not just languages.",
  },
  {
    name: "P V Pavithra",
    quote:
      "Building real-world architecture in this community has been a game changer.",
  },
  {
    name: "Abhay Aditya R S",
    quote:
      "The focus on standard protocols over fleeting trends is exactly what the industry needs.",
  },
];

const testimonialName = document.getElementById("testimonial-name");
const testimonialQuote = document.getElementById("testimonial-quote");

let currentIndex = 0;

function updateTestimonial() {
  if (!testimonialName || !testimonialQuote) return;

  const currentData = testimonialsData[currentIndex];

  testimonialName.textContent = currentData.name;
  testimonialQuote.textContent = currentData.quote;

  currentIndex++;

  if (currentIndex >= testimonialsData.length) {
    currentIndex = 0;
  }
}

updateTestimonial();

const carouselTimer = setInterval(updateTestimonial, 3000);
/* ========================================== */
/* DAY 19: EVENT DELEGATION & MODALS          */
/* ========================================== */

const projectModal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const closeModalBtn = document.getElementById("close-modal");

if (gridContainer) {
  gridContainer.addEventListener("click", function (e) {
    const clickedButton = e.target.closest(".view-btn");
    if (!clickedButton) return;

    const projectTitle = clickedButton.getAttribute("data-title");
    modalTitle.textContent = projectTitle;
    projectModal.style.display = "flex";
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", function () {
    projectModal.style.display = "none";
  });
}

projectModal.addEventListener("click", function (e) {
  if (e.target === projectModal) {
    projectModal.style.display = "none";
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    projectModal.style.display = "none";
  }
});
/* ========================================== */
/* DAY 20: STATEFUL UI ARCHITECTURE           */
/* ========================================== */

let taskState = [];

const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskListContainer = document.getElementById("task-list");

function renderTasks() {
  if (!taskListContainer) return;

  taskListContainer.innerHTML = "";

  taskState.forEach((task) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "done" : ""}`;

    li.innerHTML = `
            <input type="checkbox" class="toggle-check" data-id="${task.id}" ${task.completed ? "checked" : ""}>
            <span>${task.text}</span>
            <button class="delete-btn" data-id="${task.id}">&times;</button>
        `;

    taskListContainer.appendChild(li);
  });
}

if (addTaskBtn && taskInput) {
  addTaskBtn.addEventListener("click", () => {
    const textValue = taskInput.value.trim();
    if (textValue === "") return;

    const newTask = {
      id: Date.now(),
      text: textValue,
      completed: false,
    };

    taskState.push(newTask);

    taskInput.value = "";
    renderTasks();
  });
}

if (taskListContainer) {
  taskListContainer.addEventListener("click", (e) => {
    const targetId = Number(e.target.getAttribute("data-id"));
    if (!targetId) return;

    if (e.target.classList.contains("delete-btn")) {
      taskState = taskState.filter((task) => task.id !== targetId);
    }

    if (e.target.classList.contains("toggle-check")) {
      const foundTask = taskState.find((task) => task.id === targetId);
      if (foundTask) {
        foundTask.completed = !foundTask.completed;
      }
    }

    renderTasks();
  });
}
/* ========================================== */
/* DAY 22: INTERSECTION OBSERVER API          */
/* ========================================== */

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      scrollObserver.unobserve(entry.target);
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");

hiddenElements.forEach((element) => {
  scrollObserver.observe(element);
});
function observeHiddenElements() {
  const hiddenElements = document.querySelectorAll(".hidden:not(.show)");
  hiddenElements.forEach((element) => {
    scrollObserver.observe(element);
  });
}

observeHiddenElements();
/* ========================================== */
/* DAY 23: DRAG AND DROP API                  */
/* ========================================== */

const taskCards = document.querySelectorAll(".task-card");
const kanbanColumns = document.querySelectorAll(".kanban-column .task-list");

taskCards.forEach((card) => {
  card.addEventListener("dragstart", () => {
    card.classList.add("is-dragging");
  });

  card.addEventListener("dragend", () => {
    card.classList.remove("is-dragging");
  });
});

kanbanColumns.forEach((column) => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();

    const draggedCard = document.querySelector(".is-dragging");
    if (draggedCard) {
      column.appendChild(draggedCard);
    }
  });
});
/* ========================================== */
/* DAY 24: SPA CLIENT-SIDE ROUTING            */
/* ========================================== */

const appRoot = document.getElementById("app-root");
const homeHTML = appRoot.innerHTML; // save your full existing page as the "/" route

const routes = {
  "/": homeHTML,
  "/initiatives": `
    <div class="view-container" style="padding:60px 50px;text-align:center;">
      <h2>Community Initiatives</h2>
      <p>Our project gallery will render here.</p>
      <a href="/" class="nav-link">← Back Home</a>
    </div>
  `,
  "/team": `
    <div class="view-container" style="padding:60px 50px;text-align:center;">
      <h2>Leadership Team</h2>
      <p>Core committee profiles will render here.</p>
      <a href="/" class="nav-link">← Back Home</a>
    </div>
  `,
  404: `
    <div class="view-container" style="padding:60px 50px;text-align:center;">
      <h1>404</h1>
      <p>Page not found.</p>
      <a href="/" class="nav-link">Go Home</a>
    </div>
  `,
};

function router() {
  let path = window.location.pathname;
  if (path.includes("index.html")) path = "/";

  const viewHTML = routes[path] || routes[404];
  appRoot.innerHTML = viewHTML;

  // Re-init anything that depends on elements inside #app-root,
  // ONLY needed when path === "/" since that's the only route with those elements
  if (path === "/") {
    renderProjects(projectsData); // Day 15
    renderTasks(); // Day 20
    updateTestimonial(); // Day 18
    observeHiddenElements(); // Day 22
  }
}

document.body.addEventListener("click", (e) => {
  if (e.target.matches(".nav-link")) {
    e.preventDefault();
    const newUrl = e.target.getAttribute("href");
    window.history.pushState(null, "", newUrl);
    router();
  }
});

window.addEventListener("popstate", router);
router(); // initial render
