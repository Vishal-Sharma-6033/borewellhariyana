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
        updateStarRating(selectedRating);
    });

    star.addEventListener('touchstart', (e) => {
        e.preventDefault();
        selectedRating = e.target.dataset.value;
        updateStarRating(selectedRating);
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

function updateStarRating(rating) {
    starRatings.forEach((s, index) => {
        if (index < rating) {
            s.classList.add('active');
        } else {
            s.classList.remove('active');
        }
    });
}

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
        
        // Get form values
        const formData = new FormData(feedbackForm);
        
        // Show success message
        showNotification('Thank you for your feedback! We will review it and get back to you soon.', 'success');
        
        // Reset form
        feedbackForm.reset();
        starRatings.forEach(star => star.classList.remove('active'));
        selectedRating = 0;
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        
        // Show success message
        showNotification('Thank you for reaching out! We will contact you shortly.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// Notification Function
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 15px 25px;
            background-color: ${type === 'success' ? '#4caf50' : '#f44336'};
            color: white;
            border-radius: 5px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            z-index: 2000;
            animation: slideDown 0.3s ease, slideUp 0.3s ease 2.7s;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification i {
            font-size: 20px;
        }
        
        @keyframes slideDown {
            from {
                transform: translateX(-50%) translateY(-100%);
                opacity: 0;
            }
            to {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes slideUp {
            from {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
            to {
                transform: translateX(-50%) translateY(-100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
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
                navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply animation to cards
document.querySelectorAll('.service-card, .reason-card, .testimonial-card, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Handle Window Resize for Responsive Adjustments
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reset scroll position if needed
        if (window.innerWidth > 768) {
            scrollPosition = 0;
            carousel.scrollLeft = 0;
        }
    }, 250);
});

// Prevent double-tap zoom on buttons
document.querySelectorAll('button, a, .clickable').forEach(el => {
    let lastTouchEnd = 0;
    el.addEventListener('touchend', function(e) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
});

// Viewport Height Fix for Mobile Browsers
function updateViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

updateViewportHeight();
window.addEventListener('resize', updateViewportHeight);

// Service Worker Registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Lazy Loading Images (if you add images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Log mobile device info (for debugging)
console.log('Device Info:', {
    userAgent: navigator.userAgent,
    viewport: {
        width: window.innerWidth,
        height: window.innerHeight
    },
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
});
