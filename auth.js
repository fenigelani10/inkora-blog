/**
 * INKORA - Demo Authentication System
 * Uses localStorage for client-side demo authentication.
 * 
 * NOTE FOR REVIEWERS & PORTFOLIO:
 * This localStorage-based authentication is strictly for demonstration,
 * educational, and static portfolio purposes (such as GitHub Pages).
 * It is NOT secure for production applications. A real production application
 * must use secure server-side sessions or JWTs, bcrypt password hashing,
 * HTTPS, and a hardened database.
 */

// Storage Keys
const USERS_STORAGE_KEY = "inkora_registered_users";
const SESSION_STORAGE_KEY = "inkora_current_user";
const REMEMBER_ME_KEY = "inkora_remember_email";

// Initialize default demo user if not already present
function initDemoUsers() {
  const users = getStoredUsers();
  if (users.length === 0) {
    const demoUser = {
      fullName: "Alex Mercer",
      email: "demo@inkora.com",
      password: "password123",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
      bio: "Lifelong reader, essayist, and creative minimalist.",
      registeredAt: new Date().toISOString()
    };
    saveUsers([demoUser]);
  }
}

// Retrieve registered users from localStorage
function getStoredUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

// Save users to localStorage
function saveUsers(users) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

// Get currently logged-in user
function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY)) || null;
  } catch (e) {
    return null;
  }
}

// Set current logged-in user
function setCurrentUser(user) {
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
}

// Clear current session (Logout)
function logoutUser() {
  localStorage.removeItem(SESSION_STORAGE_KEY);
  if (window.showToast) {
    window.showToast("Logged out successfully. Have a wonderful day!", "info");
  }
  // Re-render auth UI in navbar
  updateNavbarAuth();
  // If on a page that was user-specific, redirect to home
  if (window.location.pathname.endsWith("login.html") || window.location.pathname.endsWith("register.html")) {
    window.location.href = "index.html";
  }
}

// Email format validator
function isValidEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).trim().toLowerCase());
}

/**
 * Handle Registration
 */
function handleRegister(event) {
  event.preventDefault();

  const nameInput = document.getElementById("regFullName");
  const emailInput = document.getElementById("regEmail");
  const passwordInput = document.getElementById("regPassword");
  const confirmPasswordInput = document.getElementById("regConfirmPassword");

  const nameError = document.getElementById("regNameError");
  const emailError = document.getElementById("regEmailError");
  const passwordError = document.getElementById("regPasswordError");
  const confirmError = document.getElementById("regConfirmError");
  const generalAlert = document.getElementById("regGeneralAlert");

  // Reset errors
  clearErrors([nameError, emailError, passwordError, confirmError]);
  if (generalAlert) {
    generalAlert.className = "form-alert d-none";
    generalAlert.textContent = "";
  }
  [nameInput, emailInput, passwordInput, confirmPasswordInput].forEach(inp => inp && inp.classList.remove("input-error"));

  let hasError = false;

  // Full Name validation
  const fullName = nameInput ? nameInput.value.trim() : "";
  if (!fullName) {
    setError(nameInput, nameError, "Full name cannot be empty.");
    hasError = true;
  } else if (fullName.length < 2) {
    setError(nameInput, nameError, "Please enter your real full name (at least 2 letters).");
    hasError = true;
  }

  // Email validation
  const email = emailInput ? emailInput.value.trim() : "";
  if (!email) {
    setError(emailInput, emailError, "Email address cannot be empty.");
    hasError = true;
  } else if (!isValidEmail(email)) {
    setError(emailInput, emailError, "Please enter a valid email address (e.g. name@domain.com).");
    hasError = true;
  }

  // Password validation
  const password = passwordInput ? passwordInput.value : "";
  if (!password) {
    setError(passwordInput, passwordError, "Password cannot be empty.");
    hasError = true;
  } else if (password.length < 6) {
    setError(passwordInput, passwordError, "Password must be at least 6 characters long.");
    hasError = true;
  }

  // Confirm Password validation
  const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : "";
  if (!confirmPassword) {
    setError(confirmPasswordInput, confirmError, "Please confirm your password.");
    hasError = true;
  } else if (confirmPassword !== password) {
    setError(confirmPasswordInput, confirmError, "Passwords do not match. Please verify.");
    hasError = true;
  }

  if (hasError) return;

  // Check if email already registered
  const users = getStoredUsers();
  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (existingUser) {
    setError(emailInput, emailError, "An account with this email address already exists.");
    return;
  }

  // Save new user
  const newUser = {
    fullName,
    email,
    password, // Stored in plain text for localStorage demo only
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
    registeredAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);

  // Show inline success alert
  if (generalAlert) {
    generalAlert.className = "form-alert alert-success";
    generalAlert.innerHTML = `
      <strong>Account created successfully!</strong><br />
      Redirecting you to the login page in a moment...
    `;
  }

  if (window.showToast) {
    window.showToast("Account created successfully! Redirecting...", "success");
  }

  // Clear form
  document.getElementById("registerForm").reset();

  // Redirect to login page after 1.8 seconds
  setTimeout(() => {
    window.location.href = `login.html?registered=${encodeURIComponent(email)}`;
  }, 1800);
}

/**
 * Handle Login
 */
function handleLogin(event) {
  event.preventDefault();

  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");
  const rememberCheckbox = document.getElementById("rememberMe");

  const emailError = document.getElementById("loginEmailError");
  const passwordError = document.getElementById("loginPasswordError");
  const generalAlert = document.getElementById("loginGeneralAlert");

  // Reset errors
  clearErrors([emailError, passwordError]);
  if (generalAlert) {
    generalAlert.className = "form-alert d-none";
    generalAlert.textContent = "";
  }
  [emailInput, passwordInput].forEach(inp => inp && inp.classList.remove("input-error"));

  let hasError = false;

  // Email validation
  const email = emailInput ? emailInput.value.trim() : "";
  if (!email) {
    setError(emailInput, emailError, "Please enter your email address.");
    hasError = true;
  } else if (!isValidEmail(email)) {
    setError(emailInput, emailError, "Please enter a valid email address.");
    hasError = true;
  }

  // Password validation
  const password = passwordInput ? passwordInput.value : "";
  if (!password) {
    setError(passwordInput, passwordError, "Please enter your password.");
    hasError = true;
  } else if (password.length < 6) {
    setError(passwordInput, passwordError, "Password must be at least 6 characters.");
    hasError = true;
  }

  if (hasError) return;

  // Verify credentials
  const users = getStoredUsers();
  const matchedUser = users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!matchedUser) {
    if (generalAlert) {
      generalAlert.className = "form-alert alert-danger";
      generalAlert.textContent = "Invalid email or password. Please check your credentials.";
    }
    if (window.showToast) {
      window.showToast("Invalid email or password.", "error");
    }
    setError(passwordInput, null, null);
    return;
  }

  // Handle Remember Me
  if (rememberCheckbox && rememberCheckbox.checked) {
    localStorage.setItem(REMEMBER_ME_KEY, email);
  } else {
    localStorage.removeItem(REMEMBER_ME_KEY);
  }

  // Save session
  const sessionUser = {
    fullName: matchedUser.fullName,
    email: matchedUser.email,
    avatar: matchedUser.avatar
  };
  setCurrentUser(sessionUser);

  if (generalAlert) {
    generalAlert.className = "form-alert alert-success";
    generalAlert.textContent = `Welcome back, ${matchedUser.fullName}! Redirecting...`;
  }

  if (window.showToast) {
    window.showToast(`Welcome back, ${matchedUser.fullName}! ✨`, "success");
  }

  // Redirect to home page after 1 second
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1000);
}

// Helpers for inline validation
function setError(inputElement, errorElement, message) {
  if (inputElement) {
    inputElement.classList.add("input-error");
  }
  if (errorElement && message) {
    errorElement.textContent = message;
    errorElement.classList.remove("d-none");
  }
}

function clearErrors(errorElements) {
  errorElements.forEach(el => {
    if (el) {
      el.textContent = "";
      el.classList.add("d-none");
    }
  });
}

// Toggle password visibility
function togglePasswordVisibility(inputId, buttonEl) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const isPassword = input.getAttribute("type") === "password";
  input.setAttribute("type", isPassword ? "text" : "password");

  if (buttonEl) {
    buttonEl.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
    buttonEl.innerHTML = isPassword
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
          <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>`;
  }
}

// Update Navbar to reflect logged-in or logged-out state
function updateNavbarAuth() {
  const user = getCurrentUser();
  const authContainer = document.getElementById("navbarAuth");
  const mobileAuthContainer = document.getElementById("mobileNavAuth");

  const desktopHtml = user
    ? `
      <div class="user-profile-menu">
        <button class="profile-trigger" id="profileDropdownBtn" aria-label="User menu" aria-expanded="false">
          <img src="${user.avatar}" alt="${user.fullName}" class="user-avatar-sm" />
          <span class="user-display-name">${user.fullName.split(" ")[0]}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div class="profile-dropdown-content" id="profileDropdown">
          <div class="dropdown-header">
            <strong>${user.fullName}</strong>
            <span class="dropdown-email">${user.email}</span>
          </div>
          <div class="dropdown-divider"></div>
          <a href="blogs.html" class="dropdown-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            Saved Reading List
          </a>
          <button class="dropdown-item logout-btn" onclick="logoutUser()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    `
    : `
      <a href="login.html" class="btn btn-outline btn-sm">Sign In</a>
      <a href="register.html" class="btn btn-primary btn-sm">Get Started</a>
    `;

  if (authContainer) authContainer.innerHTML = desktopHtml;

  const mobileHtml = user
    ? `
      <div class="mobile-user-card">
        <img src="${user.avatar}" alt="${user.fullName}" class="user-avatar-sm" />
        <div class="mobile-user-info">
          <strong>${user.fullName}</strong>
          <small>${user.email}</small>
        </div>
      </div>
      <button class="btn btn-outline btn-full logout-btn" onclick="logoutUser()">Sign Out</button>
    `
    : `
      <a href="login.html" class="btn btn-outline btn-full">Sign In</a>
      <a href="register.html" class="btn btn-primary btn-full">Get Started</a>
    `;

  if (mobileAuthContainer) mobileAuthContainer.innerHTML = mobileHtml;

  // Bind dropdown toggle
  const profileBtn = document.getElementById("profileDropdownBtn");
  const dropdown = document.getElementById("profileDropdown");
  if (profileBtn && dropdown) {
    profileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isExpanded = profileBtn.getAttribute("aria-expanded") === "true";
      profileBtn.setAttribute("aria-expanded", !isExpanded);
      dropdown.classList.toggle("show");
    });

    document.addEventListener("click", () => {
      dropdown.classList.remove("show");
      profileBtn.setAttribute("aria-expanded", "false");
    });
  }
}

// Prefill registered email or remembered email if available
document.addEventListener("DOMContentLoaded", () => {
  initDemoUsers();
  updateNavbarAuth();

  // If on login page
  const loginEmail = document.getElementById("loginEmail");
  if (loginEmail) {
    const urlParams = new URLSearchParams(window.location.search);
    const registeredEmail = urlParams.get("registered");
    const rememberedEmail = localStorage.getItem(REMEMBER_ME_KEY);

    if (registeredEmail) {
      loginEmail.value = registeredEmail;
      const pwd = document.getElementById("loginPassword");
      if (pwd) pwd.focus();
    } else if (rememberedEmail) {
      loginEmail.value = rememberedEmail;
      const rememberCheckbox = document.getElementById("rememberMe");
      if (rememberCheckbox) rememberCheckbox.checked = true;
    }
  }

  // Bind login form if present
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  // Bind register form if present
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister);
  }
});

// Demo prompt for forgot password
function promptForgotPassword() {
  const email = prompt("Enter your registered email address to receive password reset instructions:");
  if (email) {
    if (isValidEmail(email)) {
      alert(`[Demo Mode] A password reset link has been dispatched to ${email}. Check your inbox!`);
    } else {
      alert("Please provide a valid email format.");
    }
  }
}

window.INKORA_AUTH = {
  getCurrentUser,
  logoutUser,
  togglePasswordVisibility,
  promptForgotPassword,
  updateNavbarAuth
};
