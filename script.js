// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved dark mode preference or default to false
const isDarkMode = localStorage.getItem('darkMode') === 'true';
if (isDarkMode) {
    body.classList.add('dark-mode');
    updateDarkModeIcon();
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isNowDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isNowDarkMode);
    updateDarkModeIcon();
});

function updateDarkModeIcon() {
    const icon = darkModeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Carousel Functionality
const carousel = document.getElementById('categoriesCarousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let scrollPosition = 0;
let autoScrollInterval;

function scrollCarousel(direction) {
    const scrollAmount = window.innerWidth <= 480 ? 250 : 350;
    if (direction === 'next') {
        scrollPosition += scrollAmount;
    } else {
        scrollPosition -= scrollAmount;
    }
    
    scrollPosition = Math.max(0, Math.min(scrollPosition, carousel.scrollWidth - carousel.clientWidth));
    carousel.scrollLeft = scrollPosition;
}

prevBtn.addEventListener('click', () => scrollCarousel('prev'));
nextBtn.addEventListener('click', () => scrollCarousel('next'));

// Auto-scroll carousel every 5 seconds
function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        const scrollAmount = window.innerWidth <= 480 ? 250 : 350;
        scrollPosition += scrollAmount;
        if (scrollPosition > carousel.scrollWidth - carousel.clientWidth) {
            scrollPosition = 0;
        }
        carousel.scrollLeft = scrollPosition;
    }, 5000);
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

startAutoScroll();

carousel.addEventListener('mouseenter', stopAutoScroll);
carousel.addEventListener('mouseleave', startAutoScroll);
carousel.addEventListener('touchstart', stopAutoScroll);
carousel.addEventListener('touchend', startAutoScroll);

// Star Rating
const starRatings = document.querySelectorAll('.star-rating');
let selectedRating = 0;

starRatings.forEach(star => {
    star.addEventListener('click', (e) => {
        selectedRating = e.target.dataset.value;
        starRatings.forEach((s, index) => {
            if (index < selectedRating) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    });

    star.addEventListener('touchstart', (e) => {
        e.preventDefault();
        selectedRating = e.target.dataset.value;
        starRatings.forEach((s, index) => {
            if (index < selectedRating) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    });

    star.addEventListener('mouseover', (e) => {
        const hoverValue = e.target.dataset.value;
        starRatings.forEach((s, index) => {
            if (index < hoverValue) {
                s.style.color = '#ffc107';
            } else {
                s.style.color = '#ddd';
            }
        });
    });
});

document.querySelector('.rating-input')?.addEventListener('mouseleave', () => {
    starRatings.forEach((s, index) => {
        if (index < selectedRating) {
            s.style.color = '#ffc107';
        } else {
            s.style.color = '#ddd';
        }
    });
});

// Form Submission
const feedbackForm = document.getElementById('feedbackForm');
const contactForm = document.getElementById('contactForm');

if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your feedback! We will review it and get back to you soon.');
        feedbackForm.reset();
        starRatings.forEach(star => star.classList.remove('active'));
        selectedRating = 0;
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for reaching out! We will contact you shortly.');
        contactForm.reset();
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Navbar Background on Scroll
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 5px 20px rgba(0,
