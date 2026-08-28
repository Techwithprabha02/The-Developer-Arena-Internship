
// ==========================================
// INTERACTIVE PORTFOLIO - script.js
// ==========================================

// ==========================================
// 1. PAGE LOAD
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
    console.log("Portfolio JavaScript Loaded Successfully!");
  createThemeButton();
    loadDarkMode();
    addWelcomeMessage();
    setupNavigation();
    setupContactForm();
    setupProjectLinks();
    setupInteractiveEffects();
   setupKeyboardEvents();

});


// ==========================================
// 2. DARK / LIGHT MODE
// ==========================================

function createThemeButton() {

    // Check if button already exists
    if (document.getElementById("themeButton")) {
        return;
    }

    const button = document.createElement("button");

    button.id = "themeButton";
    button.textContent = "🌙 Dark Mode";

    // Button styling
    button.style.position = "fixed";
    button.style.top = "20px";
    button.style.right = "20px";
    button.style.padding = "10px 15px";
    button.style.border = "none";
    button.style.borderRadius = "8px";
    button.style.cursor = "pointer";
    button.style.zIndex = "1000";
    button.style.fontWeight = "bold";

    document.body.appendChild(button);

    // Button click event
    button.addEventListener("click", toggleDarkMode);
}


// Toggle Dark Mode
function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");

    const isDarkMode =
        document.body.classList.contains("dark-mode");

    const button = document.getElementById("themeButton");

    if (isDarkMode) {

        button.textContent = "☀️ Light Mode";

        localStorage.setItem("theme", "dark");

    } else {

        button.textContent = "🌙 Dark Mode";

        localStorage.setItem("theme", "light");
    }
}


// Load saved theme
function loadDarkMode() {

    const savedTheme = localStorage.getItem("theme");

    const button = document.getElementById("themeButton");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        if (button) {
            button.textContent = "☀️ Light Mode";
        }

    } else {

        document.body.classList.remove("dark-mode");

        if (button) {
            button.textContent = "🌙 Dark Mode";
        }
    }
}


// ==========================================
// 3. WELCOME MESSAGE
// ==========================================

function addWelcomeMessage() {

    const header = document.querySelector("header");

    if (!header) {
        return;
    }

    // Prevent duplicate message
    if (document.getElementById("welcomeMessage")) {
        return;
    }

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

    const navLinks =
        document.querySelectorAll("nav a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                link.getAttribute("href");

            if (
                targetId &&
                targetId.startsWith("#") &&
                targetId.length > 1
            ) {

                const targetSection =
                    document.querySelector(targetId);

                if (targetSection) {

                    event.preventDefault();

                    targetSection.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }
        });
    });
}


// ==========================================
// 5. CONTACT FORM
// ==========================================

function setupContactForm() {

    const form =
        document.querySelector("#contact form");

    if (!form) {
        console.log("Contact form not found.");
        return;
    }

    form.addEventListener("submit", validateForm);

    // Get form fields
    const name =
        document.getElementById("name");

    const email =
        document.getElementById("email");

    const subject =
        document.getElementById("subject");

    const message =
        document.getElementById("message");


    // Real-time validation

    if (name) {
        name.addEventListener("input", function () {
            validateName();
        });
    }

    if (email) {
        email.addEventListener("input", function () {
            validateEmail();
        });
    }

    if (subject) {
        subject.addEventListener("input", function () {
            validateSubject();
        });
    }

    if (message) {
        message.addEventListener("input", function () {
            validateMessage();
        });
    }
}


// ==========================================
// 6. MAIN FORM VALIDATION
// ==========================================

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

        const form =
            document.querySelector("#contact form");

        if (form) {
            form.reset();
        }

        clearErrors();
    }
}


// ==========================================
// 7. NAME VALIDATION
// ==========================================

function validateName() {

    const name =
        document.getElementById("name");

    if (!name) {
        return false;
    }

    const value = name.value.trim();


    if (value === "") {

        showError(
            name,
            "Name is required."
        );

        return false;
    }


    if (value.length < 3) {

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
// 8. EMAIL VALIDATION
// ==========================================

function validateEmail() {

    const email =
        document.getElementById("email");

    if (!email) {
        return false;
    }

    const value =
        email.value.trim();

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (value === "") {

        showError(
            email,
            "Email is required."
        );

        return false;
    }


    if (!emailPattern.test(value)) {

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
// 9. SUBJECT VALIDATION
// ==========================================

function validateSubject() {

    const subject =
        document.getElementById("subject");

    if (!subject) {
        return false;
    }

    const value =
        subject.value.trim();


    if (value === "") {

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
// 10. MESSAGE VALIDATION
// ==========================================

function validateMessage() {

    const message =
        document.getElementById("message");

    if (!message) {
        return false;
    }

    const value =
        message.value.trim();


    if (value === "") {

        showError(
            message,
            "Message is required."
        );

        return false;
    }


    if (value.length < 10) {

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
// 11. SHOW ERROR
// ==========================================

function showError(input, message) {

    if (!input) {
        return;
    }

    clearError(input);

    input.style.border =
        "2px solid red";


    const error =
        document.createElement("small");

    error.className =
        "error-message";

    error.textContent =
        message;

    error.style.color =
        "red";

    error.style.display =
        "block";

    error.style.marginTop =
        "5px";


    if (input.parentNode) {

        input.parentNode.insertBefore(
            error,
            input.nextSibling
        );
    }
}


// ==========================================
// 12. CLEAR ERROR
// ==========================================

function clearError(input) {

    if (!input) {
        return;
    }

    input.style.border = "";

    const nextElement =
        input.nextElementSibling;


    if (
        nextElement &&
        nextElement.classList.contains(
            "error-message"
        )
    ) {

        nextElement.remove();
    }
}


// ==========================================
// 13. CLEAR ALL ERRORS
// ==========================================

function clearErrors() {

    const errors =
        document.querySelectorAll(
            ".error-message"
        );

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
// 14. SUCCESS MESSAGE
// ==========================================

function showSuccess(message) {

    let success =
        document.getElementById(
            "successMessage"
        );


    if (!success) {

        success =
            document.createElement("p");

        success.id =
            "successMessage";


        const form =
            document.querySelector(
                "#contact form"
            );


        if (form && form.parentNode) {

            form.parentNode.insertBefore(
                success,
                form
            );
        }
    }


    success.textContent =
        message;

    success.style.color =
        "green";

    success.style.fontWeight =
        "bold";

    success.style.marginBottom =
        "15px";


    setTimeout(function () {

        if (success) {
            success.remove();
        }

    }, 5000);
}


// ==========================================
// 15. PROJECT INTERACTION
// ==========================================

function setupProjectLinks() {

    const projectLinks =
        document.querySelectorAll(
            "#projects article a"
        );


    projectLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const projectName =
                    link.parentElement
                        ?.querySelector("h3");


                if (
                    link.getAttribute("href") === "#"
                ) {

                    event.preventDefault();


                    const projectTitle =
                        projectName
                            ? projectName.textContent
                            : "Unknown Project";


                    alert(
                        "Project: " +
                        projectTitle +
                        "\n\nProject link will be available soon! 🚀"
                    );
                }
            }
        );
    });
}


// ==========================================
// 16. HOVER EFFECT
// ==========================================

function setupInteractiveEffects() {

    const articles =
        document.querySelectorAll(
            "#projects article"
        );


    articles.forEach(function (article) {

        article.addEventListener(
            "mouseenter",
            function () {

                article.style.transform =
                    "scale(1.03)";

                article.style.transition =
                    "0.3s";
            }
        );


        article.addEventListener(
            "mouseleave",
            function () {

                article.style.transform =
                    "scale(1)";
            }
        );
    });
}


// ==========================================
// 17. SCROLL EVENT
// ==========================================

window.addEventListener(
    "scroll",
    function () {

        const sections =
            document.querySelectorAll(
                "main section"
            );

        const navLinks =
            document.querySelectorAll(
                "nav a"
            );


        let currentSection = "";


        sections.forEach(
            function (section) {

                const sectionTop =
                    section.offsetTop - 100;


                if (
                    window.scrollY >=
                    sectionTop
                ) {

                    currentSection =
                        section.getAttribute(
                            "id"
                        );
                }
            }
        );


        navLinks.forEach(
            function (link) {

                link.style.fontWeight =
                    "normal";


                if (
                    link.getAttribute("href") ===
                    "#" + currentSection
                ) {

                    link.style.fontWeight =
                        "bold";
                }
            }
        );
    }
);


// ==========================================
// 18. KEYBOARD EVENT
// ==========================================

function setupKeyboardEvents() {

    document.addEventListener(
        "keydown",
        function (event) {

            // Press D to toggle Dark Mode

            if (
                event.key.toLowerCase() === "d" &&
                !event.target.matches(
                    "input, textarea"
                )
            ) {

                toggleDarkMode();
            }
        }
    );
}


// ==========================================
// 19. FINAL MESSAGE
// ==========================================

console.log(
    "All JavaScript features initialized successfully!"
);

