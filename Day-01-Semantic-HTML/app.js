/* ========================================== */
/* SYNEXUS CORE ENGINE — app.js               */
/* Day 25: Unified Application Architecture   */
/* ========================================== */

// ==========================================
// 1. GLOBAL UI MODULES (Run once on load)
// ==========================================

function initThemeToggle() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  if (!themeToggleBtn) return;

  const currentTheme = localStorage.getItem("synexus_theme");
  if (currentTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeToggleBtn.textContent = "☀️";
  }

  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const isDark = document.body.classList.contains("dark-theme");
    themeToggleBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("synexus_theme", isDark ? "dark" : "light");
  });
}

function initMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector("nav ul");
  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("nav-active");
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !isExpanded);
  });
}

// ==========================================
// 2. VIEW-SPECIFIC MODULES (Run when routed to "/")
// ==========================================

// --- Day 13 + 16: Form Validation + Draft Persistence ---
function initFormValidation() {
  const membershipForm = document.querySelector(".membership-form");
  const nameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("emailAddress");
  if (!membershipForm || !nameInput || !emailInput) return;

  const savedDraft = localStorage.getItem("synexus_form_draft");
  if (savedDraft) {
    const parsed = JSON.parse(savedDraft);
    nameInput.value = parsed.name || "";
    emailInput.value = parsed.email || "";
  }

  function saveProgress() {
    localStorage.setItem(
      "synexus_form_draft",
      JSON.stringify({
        name: nameInput.value,
        email: emailInput.value,
      }),
    );
  }
  nameInput.addEventListener("input", saveProgress);
  emailInput.addEventListener("input", saveProgress);

  membershipForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();

    if (nameValue === "") {
      nameInput.style.borderColor = "red";
    } else if (!emailValue.includes("@")) {
      emailInput.style.borderColor = "red";
    } else {
      nameInput.style.borderColor = "#ccc";
      emailInput.style.borderColor = "#ccc";
      membershipForm.reset();
      localStorage.removeItem("synexus_form_draft");
    }
  });
}

// --- Day 22: Scroll Observer ---
let scrollObserver = null;
function initScrollObserver() {
  const hiddenElements = document.querySelectorAll(".hidden:not(.show)");
  if (hiddenElements.length === 0) return;

  if (!scrollObserver) {
    scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          scrollObserver.unobserve(entry.target);
        }
      });
    });
  }

  hiddenElements.forEach((el) => scrollObserver.observe(el));
}

// --- Day 15 + 21: Initiatives Search + Debounce ---
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

function renderProjects(dataArray) {
  const gridContainer = document.getElementById("dynamic-grid");
  if (!gridContainer) return;

  gridContainer.innerHTML = "";
  if (dataArray.length === 0) {
    gridContainer.innerHTML = "<p>No initiatives match your search.</p>";
    return;
  }

  dataArray.forEach((project) => {
    const statusClass =
      project.status === "Active" ? "status-active" : "status-completed";
    gridContainer.innerHTML += `
            <div class="initiative-card ${statusClass} hidden">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <span class="badge">${project.status}</span>
                <button class="view-btn" data-title="${project.title}">View Details</button>
            </div>
        `;
  });
}

function debounce(func, delay = 300) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

function initInitiativesSearch() {
  const gridContainer = document.getElementById("dynamic-grid");
  const searchInput = document.getElementById("search-projects");
  if (!gridContainer) return;

  renderProjects(projectsData);
  initScrollObserver();

  if (searchInput) {
    const optimizedSearch = debounce((event) => {
      const term = event.target.value.toLowerCase();
      const filtered = projectsData.filter((p) =>
        p.title.toLowerCase().includes(term),
      );
      renderProjects(filtered);
      initScrollObserver();
    }, 400);
    searchInput.addEventListener("input", optimizedSearch);
  }
}

// --- Day 19: Modal ---
function initProjectModal() {
  const gridContainer = document.getElementById("dynamic-grid");
  const projectModal = document.getElementById("project-modal");
  const modalTitle = document.getElementById("modal-title");
  const closeModalBtn = document.getElementById("close-modal");
  if (!gridContainer || !projectModal) return;

  gridContainer.addEventListener("click", (e) => {
    const clickedButton = e.target.closest(".view-btn");
    if (!clickedButton) return;
    modalTitle.textContent = clickedButton.getAttribute("data-title");
    projectModal.style.display = "flex";
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      projectModal.style.display = "none";
    });
  }
  projectModal.addEventListener("click", (e) => {
    if (e.target === projectModal) projectModal.style.display = "none";
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") projectModal.style.display = "none";
  });
}

// --- Day 18: Testimonials Carousel (interval-safe) ---
let testimonialInterval = null;
function initTestimonials() {
  const testimonialName = document.getElementById("testimonial-name");
  const testimonialQuote = document.getElementById("testimonial-quote");
  if (!testimonialName || !testimonialQuote) return;

  const testimonialsData = [
    { name: "Anant Sharma", quote: "It's about logic, not just languages." },
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

  let currentIndex = 0;
  function updateTestimonial() {
    const data = testimonialsData[currentIndex];
    testimonialName.textContent = data.name;
    testimonialQuote.textContent = data.quote;
    currentIndex = (currentIndex + 1) % testimonialsData.length;
  }

  updateTestimonial();

  if (testimonialInterval) clearInterval(testimonialInterval); // prevent stacked carousels
  testimonialInterval = setInterval(updateTestimonial, 3000);
}

// --- Day 20: Task Tracker ---
function initTaskTracker() {
  const taskInput = document.getElementById("task-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskListContainer = document.getElementById("task-list");
  if (!taskListContainer || !addTaskBtn || !taskInput) return;

  let taskState = [];

  function renderTasks() {
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

  addTaskBtn.addEventListener("click", () => {
    const textValue = taskInput.value.trim();
    if (textValue === "") return;
    taskState.push({ id: Date.now(), text: textValue, completed: false });
    taskInput.value = "";
    renderTasks();
  });

  taskListContainer.addEventListener("click", (e) => {
    const targetId = Number(e.target.getAttribute("data-id"));
    if (!targetId) return;
    if (e.target.classList.contains("delete-btn")) {
      taskState = taskState.filter((t) => t.id !== targetId);
    }
    if (e.target.classList.contains("toggle-check")) {
      const found = taskState.find((t) => t.id === targetId);
      if (found) found.completed = !found.completed;
    }
    renderTasks();
  });
}

// --- Day 23 + Bonus: Kanban Board with LocalStorage persistence ---
function saveKanbanState() {
  const columns = document.querySelectorAll(".kanban-column");
  const state = {};
  columns.forEach((col) => {
    const status = col.dataset.status;
    const cards = col.querySelectorAll(".task-card");
    state[status] = Array.from(cards).map((c) => c.textContent);
  });
  localStorage.setItem("synexus_kanban_state", JSON.stringify(state));
}

function loadKanbanState() {
  const saved = localStorage.getItem("synexus_kanban_state");
  if (!saved) return;

  const state = JSON.parse(saved);
  Object.keys(state).forEach((status) => {
    const column = document.querySelector(
      `.kanban-column[data-status="${status}"] .task-list`,
    );
    if (!column) return;
    column.innerHTML = "";
    state[status].forEach((text) => {
      const card = document.createElement("div");
      card.className = "task-card";
      card.setAttribute("draggable", "true");
      card.textContent = text;
      column.appendChild(card);
    });
  });
}

function initKanbanBoard() {
  const kanbanColumns = document.querySelectorAll(".kanban-column .task-list");
  if (kanbanColumns.length === 0) return;

  loadKanbanState();

  function attachCardListeners(card) {
    card.addEventListener("dragstart", () => card.classList.add("is-dragging"));
    card.addEventListener("dragend", () =>
      card.classList.remove("is-dragging"),
    );
  }

  document.querySelectorAll(".task-card").forEach(attachCardListeners);

  kanbanColumns.forEach((column) => {
    column.addEventListener("dragover", (e) => {
      e.preventDefault();
      const draggedCard = document.querySelector(".is-dragging");
      if (draggedCard) column.appendChild(draggedCard);
    });

    column.addEventListener("drop", () => {
      saveKanbanState();
    });
  });
}

// ==========================================
// 3. THE SPA ROUTER
// ==========================================

let routes = {};

function buildRoutes() {
  const appRoot = document.getElementById("app-root");
  const homeHTML = appRoot.innerHTML;

  routes = {
    "/": homeHTML,
    404: `
            <div class="view-container" style="padding:60px 50px;text-align:center;">
                <h1>404</h1>
                <p>Page not found.</p>
                <a href="/">Go Home</a>
            </div>
        `,
  };
}

function router() {
  let path = window.location.pathname;
  if (path.includes("index.html")) path = "/";

  const viewHTML = routes[path] || routes[404];
  document.getElementById("app-root").innerHTML = viewHTML;

  if (path === "/") {
    initInitiativesSearch();
    initProjectModal();
    initTestimonials();
    initTaskTracker();
    initKanbanBoard();
    initFormValidation();
    initDevLookup();
    initProposalForm();
    initProposalManagement();
  }
}

// ==========================================
// 4. ENGINE INITIALIZATION
// ==========================================

function initApp() {
  console.log("Synexus Core Engine: Online.");

  buildRoutes();

  initThemeToggle();
  initMobileMenu();

  document.body.addEventListener("click", (e) => {
    if (e.target.matches(".nav-link")) {
      e.preventDefault();
      window.history.pushState(null, "", e.target.getAttribute("href"));
      router();
    }
  });

  window.addEventListener("popstate", router);

  router();
}

document.addEventListener("DOMContentLoaded", initApp);
// --- Day 26: Async GitHub Contributor Lookup ---
// --- Day 26 + 27: Async GitHub Contributor + Repository Lookup ---
// --- Day 26 + 27 + 28: Real-time Debounced GitHub Lookup with Rate-Limit + Abort handling ---
function initDevLookup() {
  const usernameInput = document.getElementById("github-username");
  const profileContainer = document.getElementById("dev-profile-card");
  const reposGrid = document.getElementById("repos-grid");
  if (!usernameInput || !profileContainer || !reposGrid) return;

  let currentController = null; // Bonus: tracks the in-flight request so we can cancel it

  async function fetchRepositories(username, signal) {
    reposGrid.innerHTML = `<p class="loading-text">Loading repositories...</p>`;

    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
        { signal },
      );

      if (!response.ok) {
        throw new Error("Could not fetch repositories.");
      }

      const data = await response.json();
      reposGrid.innerHTML = "";

      if (data.length === 0) {
        reposGrid.innerHTML = `<p>No public repositories found for this user.</p>`;
        return;
      }

      data.forEach((repo) => {
        const repoCard = `
                    <div class="initiative-card">
                        <h3>${repo.name}</h3>
                        <p>${repo.description || "No description provided for this project."}</p>
                        <div class="repo-meta" style="margin-top: 15px; display: flex; gap: 10px; font-size: 0.9rem;">
                            <span>⭐ ${repo.stargazers_count}</span>
                            <span>🍴 ${repo.forks_count}</span>
                        </div>
                        <a href="${repo.html_url}" target="_blank" class="btn-cta" style="margin-top: 15px; display: inline-block;">View Code</a>
                    </div>
                `;
        reposGrid.innerHTML += repoCard;
      });
    } catch (error) {
      if (error.name === "AbortError") return; // silently ignore cancelled requests
      console.error("Repo Fetch Error:", error);
      reposGrid.innerHTML = `<p class="error-text">⚠️ Failed to load repositories.</p>`;
    }
  }

  async function fetchContributor() {
    const username = usernameInput.value.trim();

    // Bonus: cancel any request still in flight before starting a new one
    if (currentController) currentController.abort();
    currentController = new AbortController();
    const signal = currentController.signal;

    if (username === "") {
      profileContainer.innerHTML = "";
      reposGrid.innerHTML = "";
      return;
    }

    profileContainer.innerHTML = `<p class="loading-text">Searching for ${username}...</p>`;
    reposGrid.innerHTML = "";

    try {
      const response = await fetch(`https://api.github.com/users/${username}`, {
        signal,
      });

      if (response.status === 403 || response.status === 429) {
        throw new Error(
          "API Rate Limit exceeded! You searched too many times. Take a breath.",
        );
      }

      if (!response.ok) {
        throw new Error("Developer not found.");
      }

      const data = await response.json();

      profileContainer.innerHTML = `
                <div class="profile-card">
                    <img src="${data.avatar_url}" alt="${data.name || data.login}'s Avatar">
                    <h3>${data.name || data.login}</h3>
                    <p>${data.bio || "No bio available."}</p>
                    <a href="${data.html_url}" target="_blank" class="btn-cta">View GitHub</a>
                </div>
            `;

      fetchRepositories(username, signal); // chained, and cancellable via the same signal
    } catch (error) {
      if (error.name === "AbortError") return; // request was cancelled by a newer keystroke, not a real error
      console.error("API Error:", error);
      profileContainer.innerHTML = `<p class="error-text">⚠️ ${error.message}</p>`;
    }
  }

  const optimizedSearch = debounce(fetchContributor, 500);
  usernameInput.addEventListener("input", optimizedSearch);
}
// --- Day 29: POST Requests - Propose an Initiative ---
function initProposalForm() {
  const proposalForm = document.getElementById("proposal-form");
  const titleInput = document.getElementById("proposal-title");
  const descInput = document.getElementById("proposal-description");
  const submitBtn = document.getElementById("proposal-submit-btn");
  const feedbackContainer = document.getElementById("proposal-feedback");
  if (
    !proposalForm ||
    !titleInput ||
    !descInput ||
    !submitBtn ||
    !feedbackContainer
  )
    return;

  proposalForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newInitiative = {
      title: titleInput.value.trim(),
      body: descInput.value.trim(),
      userId: 1,
    };

    // Bonus: prevent duplicate submissions
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";
    feedbackContainer.innerHTML = "";

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(newInitiative),
        },
      );

      const data = await response.json();

      if (response.status === 201) {
        feedbackContainer.innerHTML = `<p class="success-text">✅ Proposal submitted! (ID: ${data.id})</p>`;
        proposalForm.reset();
      } else {
        throw new Error(`Server responded with status ${response.status}`);
      }
    } catch (error) {
      console.error("Proposal Submission Error:", error);
      feedbackContainer.innerHTML = `<p class="error-text">⚠️ Failed to submit proposal. Please try again.</p>`;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Proposal";
    }
  });
}
// --- Day 30: Full CRUD - PUT & DELETE Requests ---
function initProposalManagement() {
  const updateBtn = document.getElementById("update-btn");
  const deleteBtn = document.getElementById("delete-btn");
  const feedbackMessage = document.getElementById("manage-feedback");
  if (!updateBtn || !deleteBtn || !feedbackMessage) return;

  async function updateInitiative(targetId, updatedData) {
    try {
      feedbackMessage.innerHTML = `<p class="loading-text">Updating initiative #${targetId}...</p>`;

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${targetId}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(updatedData),
        },
      );

      if (!response.ok) throw new Error("Failed to update data.");

      const serverResponse = await response.json();
      console.log("Update Confirmed:", serverResponse);

      feedbackMessage.innerHTML = `<p style="color: blue;">🔄 Initiative #${targetId} updated successfully!</p>`;
    } catch (error) {
      console.error(error);
      feedbackMessage.innerHTML = `<p style="color: red;">⚠️ ${error.message}</p>`;
    }
  }

  async function deleteInitiative(targetId) {
    try {
      feedbackMessage.innerHTML = `<p class="loading-text">Deleting initiative #${targetId}...</p>`;

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${targetId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) throw new Error("Failed to delete data.");

      console.log(`Initiative #${targetId} destroyed.`);

      feedbackMessage.innerHTML = `<p style="color: red;">🗑️ Initiative #${targetId} was permanently deleted.</p>`;
    } catch (error) {
      console.error(error);
      feedbackMessage.innerHTML = `<p style="color: red;">⚠️ ${error.message}</p>`;
    }
  }

  updateBtn.addEventListener("click", () => {
    const payload = {
      id: 1,
      title: "StoreLane V2 Architecture [UPDATED]",
      body: "Revised specifications for the hyperlocal platform.",
      userId: 1,
    };
    updateInitiative(1, payload);
  });

  deleteBtn.addEventListener("click", () => {
    const isConfirmed = window.confirm(
      "WARNING: Are you sure you want to delete this? This cannot be undone.",
    );
    if (isConfirmed) {
      deleteInitiative(1);
    }
  });
}
