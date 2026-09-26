/**
 * INKORA - Global Scripts & Interactive Features
 * Handles theme toggling, sticky navbar, mobile navigation, toast alerts,
 * reading progress bar, back-to-top, newsletter subscription, and scroll animations.
 */

// Theme Management (Light / Dark)
const THEME_STORAGE_KEY = "inkora_theme_preference";

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const systemPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  const currentTheme = savedTheme ? savedTheme : (systemPrefersDark ? "dark" : "light");
  applyTheme(currentTheme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  
  // Update toggle button icons
  document.querySelectorAll(".theme-toggle-btn").forEach(btn => {
    btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    btn.innerHTML = theme === "dark" 
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>`;
  });
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  const newTheme = current === "dark" ? "light" : "dark";
  applyTheme(newTheme);
  showToast(`Switched to ${newTheme} mode`, "info");
}

// Toast Notification Manager
function showToast(message, type = "info") {
  let toastContainer = document.getElementById("toastContainer");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toastContainer";
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = `toast-item toast-${type}`;
  
  let iconSvg = "";
  if (type === "success") {
    iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
  } else if (type === "error") {
    iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
  } else {
    iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
  }

  toast.innerHTML = `
    <span class="toast-icon">${iconSvg}</span>
    <span class="toast-message">${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()" aria-label="Close notification">&times;</button>
  `;

  toastContainer.appendChild(toast);

  // Auto remove after 3.5s
  setTimeout(() => {
    toast.classList.add("fade-out");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
window.showToast = showToast;

// Reading Progress Bar
function updateReadingProgressBar() {
  const progressBar = document.getElementById("readingProgressBar");
  if (!progressBar) return;

  const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
  progressBar.style.width = scrolled + "%";
}

// Back to Top Button
function handleBackToTop() {
  const topBtn = document.getElementById("backToTopBtn");
  if (!topBtn) return;

  if (window.scrollY > 300) {
    topBtn.classList.add("visible");
  } else {
    topBtn.classList.remove("visible");
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// Sticky Navbar effect
function handleStickyNavbar() {
  const navbar = document.querySelector(".site-header");
  if (!navbar) return;

  if (window.scrollY > 20) {
    navbar.classList.add("is-scrolled");
  } else {
    navbar.classList.remove("is-scrolled");
  }
}

// Mobile Navigation Toggle
function initMobileNav() {
  const toggleBtn = document.getElementById("mobileNavToggle");
  const navDrawer = document.getElementById("mobileNavDrawer");
  const overlay = document.getElementById("navOverlay");

  if (!toggleBtn || !navDrawer) return;

  function openMenu() {
    navDrawer.classList.add("is-open");
    if (overlay) overlay.classList.add("is-active");
    toggleBtn.classList.add("is-active");
    toggleBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("no-scroll");
  }

  function closeMenu() {
    navDrawer.classList.remove("is-open");
    if (overlay) overlay.classList.remove("is-active");
    toggleBtn.classList.remove("is-active");
    toggleBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
  }

  toggleBtn.addEventListener("click", () => {
    const isOpen = navDrawer.classList.contains("is-open");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

  // Close when clicking internal links
  navDrawer.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });
}

// Newsletter Subscription Handler
function handleNewsletterSubscription(event) {
  event.preventDefault();
  const form = event.target;
  const input = form.querySelector('input[type="email"]');
  const messageBox = form.querySelector('.newsletter-feedback') || document.getElementById('newsletterFeedback');

  if (!input) return;
  const email = input.value.trim();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || !emailRegex.test(email)) {
    if (messageBox) {
      messageBox.textContent = "Please enter a valid email address.";
      messageBox.className = "newsletter-feedback feedback-error";
    }
    input.classList.add("input-error");
    return;
  }

  input.classList.remove("input-error");
  
  // Store subscriber in localStorage
  try {
    const subscribers = JSON.parse(localStorage.getItem("inkora_subscribers")) || [];
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      localStorage.setItem("inkora_subscribers", JSON.stringify(subscribers));
    }
  } catch (e) {}

  if (messageBox) {
    messageBox.textContent = "Thank you for subscribing! Welcome to INKORA's weekly digest.";
    messageBox.className = "newsletter-feedback feedback-success";
  }

  showToast("Welcome aboard! You're subscribed to INKORA.", "success");
  form.reset();

  setTimeout(() => {
    if (messageBox) {
      messageBox.textContent = "";
      messageBox.className = "newsletter-feedback";
    }
  }, 5000);
}

// Global Quick Search Modal
function initSearchModal() {
  const openButtons = document.querySelectorAll(".open-search-modal");
  const modal = document.getElementById("searchModal");
  const closeBtn = document.getElementById("closeSearchModal");
  const searchInput = document.getElementById("modalSearchInput");
  const resultsContainer = document.getElementById("modalSearchResults");

  if (!modal || !searchInput) return;

  function openSearch() {
    modal.classList.add("is-active");
    searchInput.focus();
    document.body.classList.add("no-scroll");
    renderSearchResults("");
  }

  function closeSearch() {
    modal.classList.remove("is-active");
    document.body.classList.remove("no-scroll");
  }

  openButtons.forEach(btn => btn.addEventListener("click", openSearch));
  if (closeBtn) closeBtn.addEventListener("click", closeSearch);

  // Close when clicking modal backdrop
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeSearch();
  });

  // Keyboard shortcut Ctrl+K or Cmd+K
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (modal.classList.contains("is-active")) {
        closeSearch();
      } else {
        openSearch();
      }
    }
    if (e.key === "Escape" && modal.classList.contains("is-active")) {
      closeSearch();
    }
  });

  // Live search input
  searchInput.addEventListener("input", (e) => {
    renderSearchResults(e.target.value.trim());
  });

  function renderSearchResults(query) {
    if (!window.INKORA_BLOGS || !resultsContainer) return;
    const blogs = window.INKORA_BLOGS.data;

    const filtered = query === "" 
      ? blogs.slice(0, 4) // Show featured/recent if empty
      : blogs.filter(b => 
          b.title.toLowerCase().includes(query.toLowerCase()) ||
          b.category.toLowerCase().includes(query.toLowerCase()) ||
          b.description.toLowerCase().includes(query.toLowerCase()) ||
          b.author.name.toLowerCase().includes(query.toLowerCase())
        );

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div class="search-empty">
          <p>No stories found matching "<strong>${escapeHtml(query)}</strong>"</p>
          <small>Try searching for categories like "Technology", "Travel", or "Creativity"</small>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = filtered.map(blog => `
      <a href="blog.html?id=${blog.id}" class="search-result-item">
        <img 
          src="${blog.image}" 
          alt="${blog.title}" 
          class="result-thumb" 
          onerror="this.onerror=null; this.src='images/placeholder.svg';" 
        />
        <div class="result-info">
          <span class="result-category">${blog.category}</span>
          <h4 class="result-title">${blog.title}</h4>
          <span class="result-meta">${blog.readingTime} • By ${blog.author.name}</span>
        </div>
      </a>
    `).join("");
  }
}

// Simple HTML Escaper
function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// Scroll Reveal Observer
function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal-on-scroll");
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  elements.forEach(el => observer.observe(el));
}

// Dynamic Footer Year
function initFooterYear() {
  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// Active Nav Link Highlighter
function highlightActiveNav() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Global initialization
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMobileNav();
  initSearchModal();
  initScrollReveal();
  initFooterYear();
  highlightActiveNav();

  // Scroll listeners
  window.addEventListener("scroll", () => {
    handleStickyNavbar();
    handleBackToTop();
    updateReadingProgressBar();
  });

  // Back to top button click
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", scrollToTop);
  }

  // Bind newsletter forms
  document.querySelectorAll(".newsletter-form").forEach(form => {
    form.addEventListener("submit", handleNewsletterSubscription);
  });
});
