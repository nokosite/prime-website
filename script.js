// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    console.log('Mobile menu elements:', { mobileMenuBtn, navLinks });

    if (mobileMenuBtn && navLinks) {
        // Toggle menu on button click
        mobileMenuBtn.addEventListener('click', function(e) {
            console.log('Menu button clicked');
            e.preventDefault();
            e.stopPropagation();
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a nav link
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                console.log('Nav link clicked');
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';

                if (targetSection) {
                    const navbar = document.querySelector('.navbar');
                    const navbarHeight = navbar ? navbar.offsetHeight : 0;
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !mobileMenuBtn.contains(e.target)) {
                console.log('Clicked outside menu');
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            }
        });
    } else {
        console.error('Mobile menu elements not found:', { mobileMenuBtn, navLinks });
    }
});

// Scroll Animation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll animations
    initScrollAnimations();
});

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's a grid container, animate its children
                if (entry.target.classList.contains('features-grid') || 
                    entry.target.classList.contains('feature-row')) {
                    const items = entry.target.querySelectorAll('.feature-card, .feature-item');
                    items.forEach(item => item.classList.add('stagger-item'));
                }
            }
        });
    }, observerOptions);

    // Observe all sections with scroll-animate class
    document.querySelectorAll('.scroll-animate').forEach(element => {
        observer.observe(element);
    });

    // Observe grid containers
    document.querySelectorAll('.features-grid, .feature-row').forEach(grid => {
        observer.observe(grid);
    });
}

// Add scroll-animate classes to sections
document.addEventListener('DOMContentLoaded', () => {
    // Hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('scroll-animate', 'from-bottom');
    }

    // Features section
    const featuresHeader = document.querySelector('.features-header');
    if (featuresHeader) {
        featuresHeader.classList.add('scroll-animate', 'from-bottom');
    }

    // Apple Pay section
    const applePayContent = document.querySelector('.apple-pay-content');
    if (applePayContent) {
        applePayContent.classList.add('scroll-animate', 'from-left');
    }

    const phoneShowcase = document.querySelector('.phone-showcase');
    if (phoneShowcase) {
        phoneShowcase.classList.add('scroll-animate', 'from-right');
    }

    // Feature items
    const featureItems = document.querySelectorAll('.feature-card, .feature-item');
    if (featureItems.length > 0) {
        featureItems.forEach(item => {
            if (item) {
                item.classList.add('stagger-item');
            }
        });
    }

    // Circular section
    const circularContent = document.querySelector('.circular-content');
    if (circularContent) {
        circularContent.classList.add('scroll-animate', 'from-bottom');
    }

    // Footer
    const footerContent = document.querySelector('.footer-grid');
    if (footerContent) {
        footerContent.classList.add('scroll-animate', 'from-bottom');
    }
}); 