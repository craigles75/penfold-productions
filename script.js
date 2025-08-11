// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        // Track form field interactions
        const formFields = contactForm.querySelectorAll('input, textarea');
        formFields.forEach(field => {
            field.addEventListener('focus', function() {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_field_focus', {
                        'event_category': 'Contact Form',
                        'event_label': field.name || field.id,
                        'value': 1
                    });
                }
            });
            
            // Track when users start typing (first interaction)
            field.addEventListener('input', function() {
                if (!this.dataset.tracked) {
                    this.dataset.tracked = 'true';
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'form_started', {
                            'event_category': 'Contact Form',
                            'event_label': 'Form Started',
                            'value': 1
                        });
                    }
                }
            });
        });
        
        // Track form abandonment
        let formStarted = false;
        formFields.forEach(field => {
            field.addEventListener('input', function() {
                formStarted = true;
            });
        });
        
        window.addEventListener('beforeunload', function() {
            if (formStarted && typeof gtag !== 'undefined') {
                gtag('event', 'form_abandoned', {
                    'event_category': 'Contact Form',
                    'event_label': 'Form Abandoned',
                    'value': 1
                });
            }
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const company = formData.get('company');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission (replace with actual form handling)
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Track form submission with Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'event_category': 'Contact Form',
                    'event_label': 'Contact Form Submission',
                    'value': 1
                });
            }
            
            // Simulate API call delay
            setTimeout(() => {
                alert('Thank you for your message! We\'ll get back to you soon.');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .about-content, .contact-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Update copyright year dynamically
document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Handle obfuscated contact elements
    const obfuscatedContacts = document.querySelectorAll('.obfuscated-contact');
    obfuscatedContacts.forEach(contact => {
        contact.addEventListener('click', function() {
            if (!this.classList.contains('revealed')) {
                // Reveal the contact information
                this.textContent = this.dataset.contact;
                this.classList.add('revealed');
                
                // Track in Google Analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'contact_revealed', {
                        'event_category': 'Contact Information',
                        'event_label': this.dataset.type,
                        'value': 1
                    });
                }
            }
        });
    });
});

// Add loading animation for images (excluding hero, about, client logo, navigation logo, and footer logo images)
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img:not(.hero-logo):not(.about-logo):not(.nav-logo):not(.footer-logo-img)');
    
    images.forEach(img => {
        // Skip client logo images
        if (img.closest('.client-logo')) {
            return;
        }
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            console.log('Image loaded:', this.src);
        });
        
        img.addEventListener('error', function() {
            console.error('Image failed to load:', this.src);
            this.style.opacity = '1'; // Show broken image icon
        });
        
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
    
    // Debug: Check all images
    console.log('All images found:', document.querySelectorAll('img'));
    console.log('Client logos found:', document.querySelectorAll('.client-logo img'));
    console.log('Navigation logos found:', document.querySelectorAll('.nav-logo'));
    console.log('Footer logos found:', document.querySelectorAll('.footer-logo-img'));
});
