// app.js
// Vanilla JavaScript Todo application with localStorage persistence.
// This file defines all core behaviors: add, delete, toggle complete,
// filter tasks, and update counters.

/**
 * Task structure:
 * {
 *   id: string,
 *   text: string,
 *   completed: boolean
 * }
 */

// ----- State -----

const STORAGE_KEY = "todo-devops-assignment-tasks";

/** @type {Array<{id: string, text: string, completed: boolean}>} */
let tasks = [];

// Possible values: "all" | "active" | "completed"
let currentFilter = "all";

// ----- DOM Elements -----

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const emptyState = document.getElementById("empty-state");

const filterButtons = document.querySelectorAll(".filter-btn");

const totalCountEl = document.getElementById("total-count");
const activeCountEl = document.getElementById("active-count");
const completedCountEl = document.getElementById("completed-count");

// ----- Local Storage Helpers -----

/**
 * Load tasks array from localStorage.
 */
function loadTasksFromStorage() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      tasks = [];
      return;
    }
    const parsed = JSON.parse(raw);

    // Basic validation to keep structure consistent.
    if (Array.isArray(parsed)) {
      tasks = parsed
        .filter(
          (task) =>
            typeof task.id === "string" &&
            typeof task.text === "string" &&
            typeof task.completed === "boolean"
        )
        .map((task) => ({
          id: task.id,
          text: task.text,
          completed: task.completed,
        }));
    } else {
      tasks = [];
    }
  } catch (error) {
    console.error("Failed to read tasks from localStorage:", error);
    tasks = [];
  }
}

/**
 * Save current tasks array to localStorage.
 */
function saveTasksToStorage() {
  try {
    const serialized = JSON.stringify(tasks);
    window.localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    console.error("Failed to save tasks to localStorage:", error);
  }
}

// ----- Core Functions (Required by spec) -----

/**
 * Add a new task.
 * @param {string} text
 */
export function addTask(text) {
  const trimmed = text.trim();
  if (!trimmed) {
    return;
  }

  const newTask = {
    id: String(Date.now()) + "-" + Math.random().toString(16).slice(2),
    text: trimmed,
    completed: false,
  };

  tasks.unshift(newTask); // newest tasks at the top
  saveTasksToStorage();
  renderTasks();
}

/**
 * Delete a task by its id.
 * @param {string} id
 */
export function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasksToStorage();
  renderTasks();
}

/**
 * Toggle completion state of a task by its id.
 * @param {string} id
 */
export function toggleComplete(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasksToStorage();
  renderTasks();
}

/**
 * Change current filter and re-render.
 * @param {"all" | "active" | "completed"} type
 */
export function filterTasks(type) {
  currentFilter = type;

  // Update button styles and aria-pressed state.
  filterButtons.forEach((btn) => {
    const isActive = btn.dataset.filter === type;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  renderTasks();
}

/**
 * Update the counters shown in the UI.
 */
export function updateCounter() {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const active = total - completed;

  totalCountEl.textContent = `Total: ${total}`;
  activeCountEl.textContent = `Active: ${active}`;
  completedCountEl.textContent = `Completed: ${completed}`;
}

// ----- Rendering -----

/**
 * Render tasks based on current filter.
 */
function renderTasks() {
  // Filter tasks in memory before rendering.
  const visibleTasks = tasks.filter((task) => {
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true;
  });

  // Clear existing list.
  taskList.innerHTML = "";

  if (visibleTasks.length === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }

  // Create list items.
  visibleTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item";
    if (task.completed) {
      li.classList.add("completed");
    }
    li.setAttribute("data-id", task.id);

    const left = document.createElement("div");
    left.className = "task-left";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Toggle task: ${task.text}`);
    checkbox.addEventListener("change", () => toggleComplete(task.id));

    const textSpan = document.createElement("span");
    textSpan.className = "task-text";
    textSpan.textContent = task.text;

    left.appendChild(checkbox);
    left.appendChild(textSpan);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn icon";
    deleteBtn.setAttribute("aria-label", `Delete task: ${task.text}`);
    deleteBtn.innerHTML = "&#10005;"; // simple "x" icon
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(left);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });

  updateCounter();
}

// ----- Event Listeners & Initialization -----

/**
 * Handle form submission for adding a new task.
 */
function handleFormSubmit(event) {
  event.preventDefault();
  if (!taskInput) return;
  addTask(taskInput.value);
  taskInput.value = "";
  taskInput.focus();
}

/**
 * Initialize filters.
 */
function bindFilterButtons() {
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.filter;
      if (!type) return;
      filterTasks(type);
    });
  });
}

/**
 * Initialize the application when DOM is ready.
 */
function init() {
  loadTasksFromStorage();
  renderTasks();

  if (taskForm) {
    taskForm.addEventListener("submit", handleFormSubmit);
  }

  bindFilterButtons();
}

// Run init once DOM is fully loaded.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

