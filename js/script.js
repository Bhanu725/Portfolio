"use strict";

/* ===== Element references ===== */
const rootElement = document.documentElement;
const themeToggleButton = document.getElementById("theme-toggle");
const themeToggleIcon = document.getElementById("theme-toggle-icon");
const themeToggleLabel = document.getElementById("theme-toggle-label");
const navToggleButton = document.getElementById("nav-toggle");
const siteNav = document.getElementById("site-nav");
const navLinks = document.querySelectorAll(".nav-list a");
const greetingElement = document.getElementById("greeting");
const welcomeButton = document.getElementById("welcome-btn");
const welcomeMessage = document.getElementById("welcome-message");
const contactForm = document.getElementById("contact-form");
const submitButton = document.getElementById("submit-btn");
const formStatus = document.getElementById("form-status");

const THEME_STORAGE_KEY = "portfolio-theme";

/* ===== Theme toggle ===== */
function readSavedTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null; // storage may be blocked; fall back to default
  }
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  rootElement.setAttribute("data-theme", theme);
  themeToggleButton.setAttribute("aria-pressed", String(isDark));
  themeToggleIcon.textContent = isDark ? "☀" : "☾";
  themeToggleLabel.textContent = isDark ? "Light mode" : "Dark mode";
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* ignore: theme just won't persist */
  }
}

function initTheme() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(readSavedTheme() || (prefersDark ? "dark" : "light"));
}

themeToggleButton.addEventListener("click", () => {
  const currentTheme = rootElement.getAttribute("data-theme");
  applyTheme(currentTheme === "dark" ? "light" : "dark");
});

/* ===== Dynamic greeting ===== */
function getGreeting(hour) {
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

function showGreeting() {
  greetingElement.textContent = `${getGreeting(new Date().getHours())}!`;
}

/* ===== Welcome interaction ===== */
welcomeButton.addEventListener("click", () => {
  welcomeMessage.textContent =
    `${getGreeting(new Date().getHours())}! Welcome to my portfolio. Scroll down to explore my skills and projects.`;
  welcomeMessage.hidden = false;
});

/* ===== Navigation ===== */
navToggleButton.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggleButton.setAttribute("aria-expanded", String(isOpen));
});

// Close the mobile menu after choosing a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    navToggleButton.setAttribute("aria-expanded", "false");
  });
});

// Highlight the nav link of the section currently in view
function initActiveNavHighlight() {
  if (!("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", isActive);
          if (isActive) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px" } // a section counts when it crosses the viewport middle
  );
  document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
}

/* ===== Contact form validation ===== */
// Simple pattern: something@something.tld, no spaces
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Returns an error message, or "" when the value is valid
const fieldValidators = {
  name(value) {
    if (value === "") return "Please enter your full name.";
    if (value.length < 2) return "Name must be at least 2 characters.";
    return "";
  },
  email(value) {
    if (value === "") return "Please enter your email address.";
    if (!EMAIL_PATTERN.test(value)) return "Please enter a valid email address, e.g. name@example.com.";
    return "";
  },
  message(value) {
    if (value === "") return "Please enter a message.";
    if (value.length < 10) return "Message must be at least 10 characters.";
    return "";
  },
};

function showFieldError(field, errorMessage) {
  const errorElement = document.getElementById(`${field.id}-error`);
  errorElement.textContent = errorMessage;
  field.classList.toggle("input-invalid", errorMessage !== "");
  field.setAttribute("aria-invalid", String(errorMessage !== ""));
}

// Trimming makes whitespace-only input count as empty
function validateField(field) {
  const errorMessage = fieldValidators[field.name](field.value.trim());
  showFieldError(field, errorMessage);
  return errorMessage === "";
}

let isSubmitting = false;

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (isSubmitting) return; // ignore repeated clicks while handling a submission

  formStatus.hidden = true;
  const fields = [...contactForm.elements].filter((el) => el.name in fieldValidators);
  // Validate every field (no short-circuit) so all errors are shown at once
  const results = fields.map(validateField);
  const firstInvalid = fields[results.indexOf(false)];

  if (firstInvalid) {
    firstInvalid.focus();
    return;
  }

  isSubmitting = true;
  submitButton.disabled = true;
  formStatus.textContent = `Thank you, ${contactForm.elements.name.value.trim()}! Your message has been sent successfully.`;
  formStatus.hidden = false;
  contactForm.reset();

  // Re-enable after a short pause so rapid repeated clicks can't resubmit
  setTimeout(() => {
    isSubmitting = false;
    submitButton.disabled = false;
  }, 2000);
});

// Re-validate as the user corrects a field that currently shows an error
contactForm.addEventListener("input", (event) => {
  if (event.target.classList.contains("input-invalid")) validateField(event.target);
});

/* ===== Footer year ===== */
document.getElementById("current-year").textContent = new Date().getFullYear();

/* ===== Init ===== */
initTheme();
showGreeting();
initActiveNavHighlight();
