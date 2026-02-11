// Navigation Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Image Slider Functions
let slideIndex = 1;
let slideTimer;

function showSlides(n) {
    let slides = document.getElementsByClassName('slide');
    let dots = document.getElementsByClassName('dot');

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }

    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add('active');
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}

function changeSlide(n) {
    clearTimeout(slideTimer);
    slideIndex += n;
    showSlides(slideIndex);
    autoSlide();
}

function currentSlide(n) {
    clearTimeout(slideTimer);
    slideIndex = n;
    showSlides(slideIndex);
    autoSlide();
}

function autoSlide() {
    slideTimer = setTimeout(() => {
        slideIndex++;
        showSlides(slideIndex);
        autoSlide();
    }, 5000); // Change slide every 5 seconds
}

// Initialize slider
showSlides(slideIndex);
autoSlide();

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = this.querySelector('input[placeholder="Your Name"]').value;
    const email = this.querySelector('input[placeholder="Your Email"]').value;
    const phone = this.querySelector('input[placeholder="Your Phone"]').value;
    const message = this.querySelector('textarea[placeholder="Your Message"]').value;

    // Create mailto link with form data
    const mailtoLink = `mailto:info@borewellpro.com?subject=Contact%20Form%20Submission%20from%20${encodeURIComponent(name)}&body=Name:%20${encodeURIComponent(name)}%0DEmail:%20${encodeURIComponent(email)}%0DPhone:%20${encodeURIComponent(phone)}%0D%0DMessage:%0D${encodeURIComponent(message)}`;

    // Open default email client
    window.location.href = mailtoLink;

    // Optional: Show success message
    alert('Thank you for your message! We will contact you shortly.');

    // Reset form
    this.reset();
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Call button functionality
const callButton = document.querySelector('.call-button');
callButton.addEventListener('click', function() {
    // The href="tel:..." will automatically open the phone dialer
    // This is handled by the browser and OS
});