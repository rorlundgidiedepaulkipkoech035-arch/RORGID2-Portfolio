// ===================================
// RORGID WEBSITE JAVASCRIPT
// ===================================


// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");


if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";

    });


    // CLOSE MENU AFTER CLICKING A LINK

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.textContent = "☰";

        });

    });

}


// ===================================
// COPYRIGHT YEAR
// ===================================

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


// ===================================
// CONTACT FORM
// ===================================

const contactForm = document.getElementById("contactForm");

const formMessage = document.getElementById("formMessage");

const submitButton = document.getElementById("submitButton");


if (contactForm) {

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        if (!submitButton || !formMessage) return;

        submitButton.disabled = true;

        submitButton.textContent = "Sending...";

        formMessage.textContent = "";


        const formData = Object.fromEntries(
            new FormData(contactForm)
        );


        try {

            const response = await fetch("/api/contact", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(formData)

            });


            const result = await response.json();


            if (!response.ok) {

                throw new Error(
                    result.error || "Unable to send message."
                );

            }


            formMessage.textContent =
                "Message sent successfully!";

            contactForm.reset();


        } catch (error) {

            formMessage.textContent =
                error.message || "Something went wrong. Please try again.";

        } finally {

            submitButton.disabled = false;

            submitButton.textContent = "Send Message ↗";

        }

    });

}