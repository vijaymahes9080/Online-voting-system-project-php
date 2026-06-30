// Mock Database Initialization
const DEFAULT_LANGUAGES = [
    { lan_id: 1, fullname: "JAVA", about: "JAVA is a class-based, object-oriented programming language.", votecount: 5 },
    { lan_id: 2, fullname: "PYTHON", about: "Python is an interpreted, high-level, general-purpose programming language.", votecount: 6 },
    { lan_id: 3, fullname: "C++", about: "C++ is a general-purpose programming language created by Bjarne Stroustrup.", votecount: 21 },
    { lan_id: 4, fullname: "PHP", about: "PHP is a popular general-purpose scripting language suited for web development.", votecount: 17 },
    { lan_id: 5, fullname: ".NET", about: ".NET is a free, cross-platform developer platform by Microsoft.", votecount: 4 }
];

// Initialize local DB
if (!localStorage.getItem("languages")) {
    localStorage.setItem("languages", JSON.stringify(DEFAULT_LANGUAGES));
}

// Helper to get active session
function getCurrentUser() {
    return localStorage.getItem("currentUser");
}

// Redirect helpers
function requireAuth() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = "login.html";
    }
    return user;
}

function requireNoAuth() {
    const user = getCurrentUser();
    if (user) {
        window.location.href = "voter.html";
    }
}

// Inject standard Navigation Header
function renderNavbar() {
    const user = getCurrentUser();
    const nav = document.createElement("nav");
    const activePage = window.location.pathname.split("/").pop();

    if (user) {
        nav.innerHTML = `
            <a href="voter.html" class="${activePage === 'voter.html' ? 'active' : ''}">Home</a>
            <a href="lan_view.html" class="${activePage === 'lan_view.html' ? 'active' : ''}">Vote Results</a>
            <a href="profile.html" class="${activePage === 'profile.html' ? 'active' : ''}">Profile</a>
            <a href="change_pass.html" class="${activePage === 'change_pass.html' ? 'active' : ''}">Change Password</a>
            <a href="#" id="logout-btn">Logout</a>
        `;
    } else {
        nav.innerHTML = `
            <a href="index.html" class="${activePage === 'index.html' || activePage === '' ? 'active' : ''}">Home</a>
            <a href="register.html" class="${activePage === 'register.html' ? 'active' : ''}">Register</a>
            <a href="login.html" class="${activePage === 'login.html' ? 'active' : ''}">Login</a>
        `;
    }
    
    document.body.insertBefore(nav, document.body.firstChild);

    // Logout Click Handler
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("currentUser");
            window.location.href = "index.html";
        });
    }
}

// Inject Ticker Banner
function renderTicker() {
    const ticker = document.createElement("div");
    ticker.className = "ticker-wrap";
    ticker.innerHTML = `
        <div class="ticker">
            Welcome To Online Voting System Coded By Vijay Mahes &nbsp;&bull;&nbsp; Safe, Secure & Purely Client-Side Voting Experience
        </div>
    `;
    document.body.insertBefore(ticker, document.body.firstChild);
}

// Inject Footer
function renderFooter() {
    const footer = document.createElement("footer");
    footer.innerHTML = `
        <span>Developer: <strong>Vijay Mahes</strong> &bull; Host: <strong>GitHub Pages</strong></span>
    `;
    document.body.appendChild(footer);
}

// Initialize layout elements
document.addEventListener("DOMContentLoaded", () => {
    renderNavbar();
    renderTicker();
    renderFooter();
});
