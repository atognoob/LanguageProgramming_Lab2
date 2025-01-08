// DOM Elements
const form = document.getElementById("add-password-form");
const passwordsList = document.getElementById("passwords");
const generatePasswordBtn = document.getElementById("generate-password");

// Local Storage Keys
const STORAGE_KEY = "passwords";

// Load passwords from localStorage
function loadPasswords() {
    const passwords = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    passwordsList.innerHTML = "";
    passwords.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `URL: (${item.site}), 
            Login: (${item.login}),
            Password: (${item.password})`;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deletePassword(index);
        li.appendChild(deleteBtn);
        passwordsList.appendChild(li);
    });
}

// Save password
function savePassword(event) {
    event.preventDefault();
    const site = document.getElementById("site").value.trim();
    const login = document.getElementById("login").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!site || !login || !password) {
        alert("Please fill in all fields.");
        return;
    }

    const passwords = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    passwords.push({ site, login, password });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(passwords));

    form.reset();
    loadPasswords();
}

// Delete password
function deletePassword(index) {
    const passwords = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    passwords.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(passwords));
    loadPasswords();
}

// Generate password
function generatePassword() {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < 12; i++) {
        password += charset[Math.floor(Math.random() * charset.length)];
    }
    document.getElementById("password").value = password;
}

// Event Listeners
form.addEventListener("submit", savePassword);
generatePasswordBtn.addEventListener("click", generatePassword);

// Initial Load
loadPasswords();

// Register service worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
        .then(() => console.log("Service Worker registered"))
        .catch((err) => console.error("Service Worker registration failed", err));
}