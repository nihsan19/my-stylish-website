/**
 * GET STYLISH WITH US - Core Website Interactions (2026)
 */

document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initScrollAnimations();
    initBookingForm();
});

/**
 * 1. Dynamic Navigation Highlighting
 * Automatically sets the 'active' class on the navigation links based on the current URL.
 */
function initNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        // Remove default active class first
        link.classList.remove("active");

        // If the href matches the current page name, set it to active
        const linkPath = link.getAttribute("href");
        if (currentPath.includes(linkPath) || (currentPath === "/" && linkPath === "index.html")) {
            link.classList.add("active");
        }
    });
}

/**
 * 2. Smooth Scroll Animations for Cards
 * Uses an IntersectionObserver to gently fade/slide in cards as they scroll into view.
 */
function initScrollAnimations() {
    const cards = document.querySelectorAll(".image-card, .product-card, .style-item, .promo-section");
    
    // Check if browser supports IntersectionObserver
    if (!('IntersectionObserver' in window)) return;

    // Apply initial hidden styles programmatically so users with JS disabled still see content
    cards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
                observer.unobserve(card); // Stop observing once animated
            }
        });
    }, observerOptions);

    cards.forEach(card => cardObserver.observe(card));
}

/**
 * 3. Booking Form Handler (For booking.html)
 * intercept booking form submission to provide beautiful interactive feedback.
 */
function initBookingForm() {
    const bookingForm = document.querySelector("#booking-form") || document.querySelector("form");
    if (!bookingForm) return;

    bookingForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent page reload

        // Gather basic data
        const formData = new FormData(bookingForm);
        const name = formData.get("name") || "Guest";
        const date = formData.get("date") || "scheduled date";
        const service = formData.get("service") || "your appointment";

        // Display confirmation state directly in the form area
        const originalContent = bookingForm.innerHTML;
        
        bookingForm.style.transition = "opacity 0.3s ease";
        bookingForm.style.opacity = "0";

        setTimeout(() => {
            bookingForm.innerHTML = `
                <div style="text-align: center; padding: 40px 20px; background: #1a1a1a; border-radius: 8px; border: 1px solid #d4af37;">
                    <span style="font-size: 3rem; color: #d4af37;">✓</span>
                    <h3 style="color: #fff; margin-top: 15px; font-size: 1.8rem;">Booking Confirmed!</h3>
                    <p style="color: #ccc; margin: 15px 0 25px;">Thank you, <strong>${name}</strong>. Your ${service} is scheduled. We look forward to seeing you at our Osaka Namba studio!</p>
                    <button id="reset-booking-btn" class="btn" style="cursor: pointer;">Book Another Session</button>
                </div>
            `;
            bookingForm.style.opacity = "1";

            // Allow user to reset form if needed
            document.getElementById("reset-booking-btn").addEventListener("click", () => {
                bookingForm.style.opacity = "0";
                setTimeout(() => {
                    bookingForm.innerHTML = originalContent;
                    bookingForm.style.opacity = "1";
                    initBookingForm(); // Reinitialize event listener
                }, 300);
            });
        }, 300);
    });
}