// ==========================================
// INTERACTIVE PORTFOLIO - script.js
// ==========================================


// ==========================================
// 1. PAGE LOAD
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
    console.log("Portfolio JavaScript Loaded Successfully!");

    loadDarkMode();
    addWelcomeMessage();
    setupNavigation();
    setupContactForm();
    setupProjectLinks();
    setupInteractiveEffects();
});


// ==========================================
// DARK / LIGHT MODE
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // Create Dark Mode button
    const button = document.createElement("button");

    button.id = "themeButton";
    button.textContent = "🌙 Dark Mode";

    button.style.position = "fixed";
    button.style.top = "20px";
    button.style.right = "20px";
    button.style.padding = "10px 15px";
    button.style.border = "none";
    button.style.borderRadius = "8px";
    button.style.cursor = "pointer";
    button.style.zIndex = "1000";

    document.body.appendChild(button);


    // Check saved theme
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        button.textContent = "☀️ Light Mode";
    }


    // Button click
    button.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");


        // Check current mode
        if (document.body.classList.contains("dark-mode")) {

            // Dark Mode
            button.textContent = "☀️ Light Mode";

            localStorage.setItem("theme", "dark");

        } else {

            // Light Mode
            button.textContent = "🌙 Dark Mode";

            localStorage.setItem("theme", "light");
        }

    });

});


// ==========================================
// 3. WELCOME MESSAGE
// ==========================================

function addWelcomeMessage() {

    const header = document.querySelector("header");

    if (!header) return;

    const welcome = document.createElement("p");

    welcome.id = "welcomeMessage";

    welcome.textContent =
        "Welcome to my portfolio! 🚀";

    welcome.style.fontWeight = "bold";

    header.appendChild(welcome);
}


// ==========================================
// 4. NAVIGATION
// ==========================================

function setupNavigation() {

    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (targetId && targetId.startsWith("#")) {

                event.preventDefault();

                const targetSection =
                    document.querySelector(targetId);

                if (targetSection) {

                    targetSection.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }
        });
    });
}


// ==========================================
// 5. CONTACT FORM VALIDATION
// ==========================================

function setupContactForm() {

    const form = document.querySelector("#contact form");

    if (!form) return;

    form.addEventListener("submit", validateForm);

    // Real-time validation
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    name.addEventListener("input", function () {
        validateName();
    });

    email.addEventListener("input", function () {
        validateEmail();
    });

    subject.addEventListener("input", function () {
        validateSubject();
    });

    message.addEventListener("input", function () {
        validateMessage();
    });
}


// Main validation function
function validateForm(event) {

    event.preventDefault();

    let isValid = true;

    if (!validateName()) {
        isValid = false;
    }

    if (!validateEmail()) {
        isValid = false;
    }

    if (!validateSubject()) {
        isValid = false;
    }

    if (!validateMessage()) {
        isValid = false;
    }

    if (isValid) {

        showSuccess(
            "Message sent successfully! Thank you for contacting me. 😊"
        );

        document.querySelector("#contact form").reset();

        clearErrors();
    }
}


// ==========================================
// 6. NAME VALIDATION
// ==========================================

function validateName() {

    const name = document.getElementById("name");

    if (name.value.trim() === "") {

        showError(name, "Name is required.");

        return false;
    }

    if (name.value.trim().length < 3) {

        showError(
            name,
            "Name must contain at least 3 characters."
        );

        return false;
    }

    clearError(name);

    return true;
}


// ==========================================
// 7. EMAIL VALIDATION
// ==========================================

function validateEmail() {

    const email = document.getElementById("email");

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {

        showError(email, "Email is required.");

        return false;
    }

    if (!emailPattern.test(email.value.trim())) {

        showError(
            email,
            "Please enter a valid email address."
        );

        return false;
    }

    clearError(email);

    return true;
}


// ==========================================
// 8. SUBJECT VALIDATION
// ==========================================

function validateSubject() {

    const subject =
        document.getElementById("subject");

    if (subject.value.trim() === "") {

        showError(
            subject,
            "Subject is required."
        );

        return false;
    }

    clearError(subject);

    return true;
}


// ==========================================
// 9. MESSAGE VALIDATION
// ==========================================

function validateMessage() {

    const message =
        document.getElementById("message");

    if (message.value.trim() === "") {

        showError(
            message,
            "Message is required."
        );

        return false;
    }

    if (message.value.trim().length < 10) {

        showError(
            message,
            "Message must contain at least 10 characters."
        );

        return false;
    }

    clearError(message);

    return true;
}


// ==========================================
// 10. SHOW ERROR
// ==========================================

function showError(input, message) {

    clearError(input);

    input.style.border = "2px solid red";

    const error = document.createElement("small");

    error.className = "error-message";

    error.textContent = message;

    error.style.color = "red";
    error.style.display = "block";
    error.style.marginTop = "5px";

    input.parentNode.insertBefore(
        error,
        input.nextSibling
    );
}


// ==========================================
// 11. CLEAR ERROR
// ==========================================

function clearError(input) {

    input.style.border = "";

    const nextElement = input.nextElementSibling;

    if (
        nextElement &&
        nextElement.classList.contains("error-message")
    ) {
        nextElement.remove();
    }
}


// Clear all errors
function clearErrors() {

    const errors =
        document.querySelectorAll(".error-message");

    errors.forEach(function (error) {
        error.remove();
    });

    const inputs =
        document.querySelectorAll(
            "#contact input, #contact textarea"
        );

    inputs.forEach(function (input) {
        input.style.border = "";
    });
}


// ==========================================
// 12. SUCCESS MESSAGE
// ==========================================

function showSuccess(message) {

    let success =
        document.getElementById("successMessage");

    if (!success) {

        success = document.createElement("p");

        success.id = "successMessage";

        const form =
            document.querySelector("#contact form");

        form.parentNode.insertBefore(
            success,
            form
        );
    }

    success.textContent = message;

    success.style.color = "green";
    success.style.fontWeight = "bold";
    success.style.marginBottom = "15px";

    setTimeout(function () {

        success.remove();

    }, 5000);
}


// ==========================================
// 13. PROJECT INTERACTION
// ==========================================

function setupProjectLinks() {

    const projectLinks =
        document.querySelectorAll(
            "#projects article a"
        );

    projectLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const projectName =
                link.parentElement.querySelector("h3");

            if (link.getAttribute("href") === "#") {

                event.preventDefault();

                alert(
                    "Project: " +
                    projectName.textContent +
                    "\n\nProject link will be available soon! 🚀"
                );
            }
        });
    });
}


// ==========================================
// 14. HOVER EFFECT
// ==========================================

function setupInteractiveEffects() {

    const articles =
        document.querySelectorAll(
            "#projects article"
        );

    articles.forEach(function (article) {

        article.addEventListener("mouseenter", function () {

            article.style.transform =
                "scale(1.03)";

            article.style.transition =
                "0.3s";

        });

        article.addEventListener("mouseleave", function () {

            article.style.transform =
                "scale(1)";
        });
    });
}


// ==========================================
// 15. SCROLL EVENT
// ==========================================

window.addEventListener("scroll", function () {

    const sections =
        document.querySelectorAll("main section");

    const navLinks =
        document.querySelectorAll("nav a");

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 100;

        if (window.scrollY >= sectionTop) {

            currentSection =
                section.getAttribute("id");
        }
    });

    navLinks.forEach(function (link) {

        link.style.fontWeight = "normal";

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {
            link.style.fontWeight = "bold";
        }
    });
});


// ==========================================
// 16. KEYBOARD EVENT
// ==========================================

document.addEventListener("keydown", function (event) {

    // Press "D" to toggle dark mode
    if (
        event.key.toLowerCase() === "d" &&
        !event.target.matches("input, textarea")
    ) {
        toggleDarkMode();
    }
});


// ==========================================
// END
// ==========================================

console.log(
    "All JavaScript features initialized successfully!"
);