// Custom Cursor
const cursorDot = document.getElementById("cursor-dot");
const cursorOutline = document.getElementById("cursor-outline");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows immediately
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with slight delay (animation in CSS helps, but keyframes would be smoother)
    // Using simple animate for smooth trailing effect
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Header scroll effect
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// Intersection Observer for Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

const elementsToAnimate = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
elementsToAnimate.forEach(el => observer.observe(el));

// Parallax effect for Hero (Subtle)
const heroContent = document.querySelector('.hero-content');
window.addEventListener('scroll', () => {
    const scrollValue = window.scrollY;
    if (scrollValue < 800) {
        heroContent.style.transform = `translateY(${scrollValue * 0.3}px)`;
        heroContent.style.opacity = 1 - Math.max(0, scrollValue / 700);
    }
});

// Contact Form Submission (Simulation)
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const btn = this.querySelector('.btn-submit');
        const btnText = btn.querySelector('.btn-text');
        const btnLoading = btn.querySelector('.btn-loading');

        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-block';
        btn.disabled = true;

        // Simulate network request (2 seconds)
        setTimeout(() => {
            // Reset button
            btnText.style.display = 'inline-block';
            btnLoading.style.display = 'none';
            btn.disabled = false;

            // Show success message
            formMessage.textContent = "Gracias por su mensaje. Nos pondremos en contacto con usted en breve.";
            formMessage.className = "form-message success";

            // Reset form
            contactForm.reset();

            // Remove message after 5 seconds
            setTimeout(() => {
                formMessage.textContent = "";
                formMessage.className = "form-message";
            }, 5000);

        }, 2000);
    });
}

// Gallery Navigation
const galleryTrackWrapper = document.querySelector('.gallery-track-wrapper');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const itemWidth = 320 + 32; // card width + gap (approx)

if (prevBtn && nextBtn && galleryTrackWrapper) {
    prevBtn.addEventListener('click', () => {
        galleryTrackWrapper.scrollBy({
            left: -itemWidth,
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', () => {
        galleryTrackWrapper.scrollBy({
            left: itemWidth,
            behavior: 'smooth'
        });
    });
}

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-link');

if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}