# INKORA — Modern Editorial Blogging Platform

> **"Stories, Ideas & Perspectives Worth Reading."**

INKORA is an aesthetic, premium editorial blogging platform crafted entirely with **semantic HTML5, modern CSS3, and vanilla JavaScript (ES6+)**. Designed with a tactile, minimalist luxury aesthetic, it evokes the calm feeling of an independent print journal blended with modern digital interactions.

Built as a high-caliber **B.Tech college project** and **personal portfolio showcase**, INKORA is 100% static, client-side driven, zero-dependency, and immediately ready to deploy on **GitHub Pages**.

---

## 🌟 Key Features

### 🎨 Design & Aesthetic
- **Minimal Editorial Layout:** Generous whitespace, refined typography, and tactile luxury feel.
- **Sophisticated Color Palette:** Editorial off-white / cream background, charcoal text, muted lavender / purple accents, and subtle gradient glows.
- **Dark Mode & Light Mode:** Seamless toggle with automatic OS theme detection and `localStorage` persistence.
- **Glassmorphism & Micro-Interactions:** Modern translucent cards (`backdrop-filter: blur`), floating action bars, and subtle drop shadows.
- **Typographic Craft:** Pairing of the classical serif **Newsreader** for headings and the modern grotesque **Plus Jakarta Sans** for readable body text.
- **100% Responsive:** Flawless adaptive layout across desktop monitors, laptops, tablets, and smartphones with zero horizontal scroll.

### 📖 Blog & Content Engine (`js/blogs.js`)
- **9 In-Depth Sample Articles:** Comprehensive editorial essays across 6 distinct categories:
  - **Technology:** *"How AI Is Changing Everyday Life"*, *"The Architecture of Digital Simplicity"*
  - **Travel:** *"7 Places That Make You Want to Travel"*, *"The Art of Slow Wandering"*
  - **Lifestyle:** *"Creating a Slow and Meaningful Morning"*, *"The Curated Home"*
  - **Creativity:** *"Why Creative Thinking Matters in an Algorithmic World"*
  - **Education:** *"Learning Beyond the Classroom: The Rise of Self-Directed Mastery"*
  - **Personal Growth:** *"Small Habits That Create Big Changes: The Science of Tiny Compounding"*
- **Dynamic Search & Filtering:** Instant live text search (title, excerpt, category, author), category pills, and sorting (Newest, Oldest, Most Liked, Shortest Read).
- **Global Quick Search Modal:** Keyboard shortcut <kbd>Ctrl</kbd> + <kbd>K</kbd> (or <kbd>Cmd</kbd> + <kbd>K</kbd>) to search across all articles with live previews.
- **Interactive Engagements:**
  - ❤️ **Like Counter:** Real-time toggling with persistent count stored in `localStorage`.
  - 🔖 **Reading List / Bookmarks:** Save articles for offline reading, synced across cards and details.
  - 📤 **Native & Clipboard Share:** Uses the modern Web Share API when supported, or automatically copies the article link with a toast notification.
  - 💬 **Interactive Comments:** Leave reflections on articles with client-side persistence.
  - 📊 **Reading Progress Bar:** Top indicator bar that visually tracks scroll progress through essays.

### 🔐 Client-Side Demo Authentication (`js/auth.js`)
- **Demo Registration:**
  - Validates Full Name, Email, Password (min 6 characters), and Confirm Password match.
  - Friendly inline error feedback (no disruptive `alert()` popups).
  - Automatically saves registered accounts to `localStorage` and redirects to login.
- **Demo Login:**
  - Validates credentials against registered users.
  - Includes **Show/Hide password** toggle button.
  - **Remember Me** checkbox persists login email.
  - Pre-seeded with a default demo account for immediate grading/testing:
    - **Email:** `demo@inkora.com`
    - **Password:** `password123`
- **Session Management:**
  - Sticky navbar dynamically displays the user's name and avatar when logged in.
  - Dropdown user menu with **Saved Reading List** and **Sign Out** button.

> [!WARNING]
> **Important Security Notice Regarding Demo Authentication:**
> The authentication system in this project uses client-side `localStorage` strictly for demonstration, portfolio, and educational evaluation purposes (so the site runs completely statically on GitHub Pages without requiring a backend server). In a production application, authentication must be implemented with secure server-side sessions or JWTs, bcrypt password hashing, HTTPS, and a hardened database.

---

## 📁 Project Structure

```
Blogging Website/
│
├── index.html           # Home page: Hero, Featured blogs, Trending, Categories, Newsletter
├── blogs.html           # All Blogs: Search bar, Category filter pills, Sort dropdown, Blog grid
├── blog.html            # Blog Details: Full article, Quote, Actions (Like/Bookmark/Share), Comments
├── login.html           # Sign In: Centered card, inline validation, Remember me, Demo account
├── register.html        # Registration: Full name, Email, Password verification, Redirect
├── about.html           # About: Editorial manifesto, Mission pillars, Stats grid, Author team
├── contact.html         # Contact: Interactive form with JS validation, FAQ accordion, Inquiries
│
├── css/
│   └── style.css        # Unified stylesheet: CSS variables, themes, grid, typography, animations
│
├── js/
│   ├── script.js        # Global UI: Theme manager, sticky navbar, mobile drawer, toasts, search modal
│   ├── blogs.js         # Blog database (9 articles), card renderer, likes, bookmarks, comments
│   └── auth.js          # Client-side demo auth, validation engine, user session, navbar state
│
├── images/
│   ├── logo.svg         # High-resolution INKORA brand vector logo
│   ├── hero-art.svg     # Modern abstract editorial visual artwork
│   ├── placeholder.svg  # Fallback image asset for offline resilience
│   ├── author-1.svg     # Vector fallback avatar
│   ├── author-2.svg     # Vector fallback avatar
│   ├── author-3.svg     # Vector fallback avatar
│   └── author-4.svg     # Vector fallback avatar
│
└── README.md            # Comprehensive project documentation
```

---

## 🚀 How to Run Locally

Because INKORA is built with pure vanilla web technologies, you don't need `npm`, `node`, `php`, or any build tools to run it!

### Option 1: Direct File Opening
1. Download or clone this repository to your computer.
2. Double-click `index.html` or right-click and choose **Open with Google Chrome / Firefox / Edge / Safari**.

### Option 2: Live Server (VS Code Extension - Recommended)
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and click **"Open with Live Server"**.
4. The site will launch automatically at `http://127.0.0.1:5500/index.html`.

### Option 3: Python Built-In HTTP Server
Open your terminal in the project directory and run:
```bash
# Python 3
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## 📤 GitHub Upload Instructions

Follow these step-by-step instructions to upload this project to your GitHub account:

1. **Create a new repository on GitHub:**
   - Go to [GitHub.com](https://github.com) and click **"New repository"**.
   - Name it `inkora-blog` (or `blogging-website`).
   - Keep it **Public** (required for free GitHub Pages).
   - Do **not** initialize with a README (one is already included).
   - Click **Create repository**.

2. **Initialize Git in your local folder:**
   Open your terminal (PowerShell or Git Bash) inside the project folder:
   ```bash
   cd "c:\Users\hp\Desktop\Blogging Website"
   git init
   git add .
   git commit -m "feat: complete modern editorial blogging platform INKORA"
   ```

3. **Link to your GitHub remote repository and push:**
   ```bash
   # Replace YOUR_USERNAME and YOUR_REPO with your actual GitHub details:
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/inkora-blog.git
   git push -u origin main
   ```

---

## 🌐 GitHub Pages Deployment Instructions

To make your website live on the web for free using **GitHub Pages**:

1. Open your repository on **GitHub.com**.
2. Click on the **Settings** tab located at the top right of the repository.
3. In the left navigation menu under **"Code and automation"**, click on **Pages**.
4. Under **"Build and deployment"** > **"Source"**, select **Deploy from a branch**.
5. Under **Branch**, select `main` (or `master`) and leave the folder set to `/ (root)`.
6. Click **Save**.
7. Wait 1–2 minutes. Refresh the page until you see a green banner:
   > *"Your site is live at `https://YOUR_USERNAME.github.io/inkora-blog/`"*
8. Click the link to view your live deployed site!

---

## 🛠️ Verification Checklist

- [x] **Semantic HTML5:** Clean tags (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`, `<aside>`).
- [x] **Pure Vanilla Stack:** No React, No Bootstrap, No Tailwind, No npm dependencies.
- [x] **All 7 Pages Working:**
  1. `index.html` (Home)
  2. `blogs.html` (Archive with search, filter, and sort)
  3. `blog.html` (Detail article view with URL params)
  4. `login.html` (Sign In with password toggle and demo auth)
  5. `register.html` (Account creation with validation)
  6. `about.html` (Editorial mission and author team)
  7. `contact.html` (Interactive contact form and FAQ)
- [x] **Dark & Light Mode:** High-contrast, persistent theme switcher.
- [x] **Search & Category Engine:** Dynamic multi-field filter with fallback empty state.
- [x] **Form Validation:** Client-side validation with friendly inline messages (no browser `alert()`).
- [x] **Mobile Responsiveness:** Tested layouts with mobile navigation drawer and hamburger animation.
- [x] **Offline Resilience:** Embedded SVG logos, art, and fallback handlers for external images.

---

## 📄 License & Credits

- **Fonts:** [Newsreader](https://fonts.google.com/specimen/Newsreader) & [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) via Google Fonts.
- **Images:** Curated editorial photography via [Unsplash](https://unsplash.com).
- **License:** MIT License. Free to use for educational, personal, and commercial portfolio projects.
