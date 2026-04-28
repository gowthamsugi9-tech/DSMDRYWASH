// ===================================
// LOADING SPINNER
// ===================================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 800);
});

// ===================================
// NAVIGATION - STICKY & SMOOTH SCROLL
// ===================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Make navbar sticky with scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }

        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';

        // Update active link
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
    });
});

// Highlight active section in navbar
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===================================
// TESTIMONIALS SLIDER
// ===================================
const testimonialsWrapper = document.getElementById('testimonialsWrapper');
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const sliderDots = document.getElementById('sliderDots');

let currentTestimonial = 0;
let testimonialInterval;

// Create dots
testimonials.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToTestimonial(index));
    sliderDots.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

// Show specific testimonial
function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.remove('active');
        if (i === index) {
            testimonial.classList.add('active');
        }
    });

    dots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) {
            dot.classList.add('active');
        }
    });
}

// Go to specific testimonial
function goToTestimonial(index) {
    currentTestimonial = index;
    showTestimonial(currentTestimonial);
    resetInterval();
}

// Next testimonial
function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Previous testimonial
function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Auto-play testimonials
function startAutoPlay() {
    testimonialInterval = setInterval(nextTestimonial, 5000);
}

function resetInterval() {
    clearInterval(testimonialInterval);
    startAutoPlay();
}

// Button event listeners
nextBtn.addEventListener('click', () => {
    nextTestimonial();
    resetInterval();
});

prevBtn.addEventListener('click', () => {
    prevTestimonial();
    resetInterval();
});

// Start auto-play
startAutoPlay();

// Pause on hover
testimonialsWrapper.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
});

testimonialsWrapper.addEventListener('mouseleave', () => {
    startAutoPlay();
});

// ===================================
// CONTACT FORM VALIDATION
// ===================================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

// Validation functions
function validateName(name) {
    return name.trim().length >= 2;
}

function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/[\s-]/g, ''));
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

// Show error message
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorElement = document.getElementById(`${inputId}Error`);
    
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Clear error message
function clearError(inputId) {
    const input = document.getElementById(inputId);
    const errorElement = document.getElementById(`${inputId}Error`);
    
    input.classList.remove('error');
    errorElement.classList.remove('show');
}

// Real-time validation
document.getElementById('name').addEventListener('input', (e) => {
    if (e.target.value.length > 0) {
        if (validateName(e.target.value)) {
            clearError('name');
        }
    } else {
        clearError('name');
    }
});

document.getElementById('phone').addEventListener('input', (e) => {
    if (e.target.value.length > 0) {
        if (validatePhone(e.target.value)) {
            clearError('phone');
        }
    } else {
        clearError('phone');
    }
});

document.getElementById('email').addEventListener('input', (e) => {
    if (e.target.value.length > 0) {
        if (validateEmail(e.target.value)) {
            clearError('email');
        }
    } else {
        clearError('email');
    }
});

document.getElementById('message').addEventListener('input', (e) => {
    if (e.target.value.length > 0) {
        if (validateMessage(e.target.value)) {
            clearError('message');
        }
    } else {
        clearError('message');
    }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    let isValid = true;

    // Validate name
    if (!validateName(name)) {
        showError('name', 'Please enter a valid name (minimum 2 characters)');
        isValid = false;
    } else {
        clearError('name');
    }

    // Validate phone
    if (!validatePhone(phone)) {
        showError('phone', 'Please enter a valid 10-digit phone number');
        isValid = false;
    } else {
        clearError('phone');
    }

    // Validate email
    if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError('email');
    }

    // Validate message
    if (!validateMessage(message)) {
        showError('message', 'Message must be at least 10 characters long');
        isValid = false;
    } else {
        clearError('message');
    }

    // If form is valid, show success message
    if (isValid) {
        // Hide form success message if it was showing
        formSuccess.classList.remove('show');
        
        // Simulate form submission
        setTimeout(() => {
            contactForm.reset();
            formSuccess.classList.add('show');
            
            // Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.classList.remove('show');
            }, 5000);
        }, 500);
    }
});

// ===================================
// SCROLL ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            // Optionally unobserve after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
const animateElements = document.querySelectorAll('.animate-on-scroll');
animateElements.forEach(element => {
    observer.observe(element);
});

// ===================================
// BACK TO TOP BUTTON
// ===================================
const backToTopBtn = document.getElementById('backToTop');

// Show/hide button based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// Scroll to top when clicked
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// PRICING TABLE - MOBILE SCROLL HINT
// ===================================
const pricingTable = document.querySelector('.pricing-table-wrapper');

if (pricingTable && window.innerWidth < 768) {
    // Add a subtle scroll indicator for mobile users
    pricingTable.addEventListener('scroll', function() {
        if (this.scrollLeft > 10) {
            this.style.boxShadow = 'inset 10px 0 10px -10px rgba(0,0,0,0.1), 0 4px 16px rgba(0, 168, 204, 0.12)';
        } else {
            this.style.boxShadow = '0 4px 16px rgba(0, 168, 204, 0.12)';
        }
    });
}

// ===================================
// DYNAMIC YEAR IN FOOTER
// ===================================
const currentYear = new Date().getFullYear();
const footerYearElements = document.querySelectorAll('.footer-bottom p');
footerYearElements.forEach(element => {
    element.innerHTML = element.innerHTML.replace('2024', currentYear);
});

// ===================================
// SERVICE CARDS HOVER EFFECT
// ===================================
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===================================
// HERO FLOATING CARDS PARALLAX
// ===================================
const floatingCards = document.querySelectorAll('.floating-card');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    floatingCards.forEach((card, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        card.style.transform = `translateY(${yPos}px)`;
    });
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to intensive scroll handlers
const debouncedScroll = debounce(() => {
    // Any intensive scroll calculations can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ===================================
// ACCESSIBILITY IMPROVEMENTS
// ===================================
// Add keyboard navigation for testimonials
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevTestimonial();
        resetInterval();
    } else if (e.key === 'ArrowRight') {
        nextTestimonial();
        resetInterval();
    }
});

// Focus management for mobile menu
navMenu.addEventListener('transitionend', () => {
    if (navMenu.classList.contains('active')) {
        navLinks[0].focus();
    }
});

// ===================================
// CONSOLE WELCOME MESSAGE
// ===================================
console.log('%c🧺 Welcome to FreshWash Laundry! ', 'background: linear-gradient(135deg, #00a8cc, #00d9ff); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 8px;');
console.log('%cWebsite developed with ❤️ for the best laundry service in town!', 'color: #00a8cc; font-size: 12px; padding: 5px;');
