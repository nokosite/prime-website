// Simple and Reliable Loading Screen
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, starting loading screen...');
    
    let progress = 0;
    let currentStep = 0;
    const totalSteps = 6;
    
    const percentageEl = document.getElementById('percentage');
    const statusEl = document.getElementById('statusText');
    const loadingEl = document.getElementById('loadingScreen');
    const stepsEl = document.getElementById('stepsContainer');

    const statusMessages = [
        "Initializing...",
        "Loading assets...",
        "Processing data...",
        "Optimizing performance...",
        "Finalizing setup...",
        "Ready to launch..."
    ];

    // Create step indicators
    function createSteps() {
        if (!stepsEl) return;
        stepsEl.innerHTML = '';
        for (let i = 0; i < totalSteps; i++) {
            const step = document.createElement('div');
            step.className = 'step';
            step.id = `step-${i}`;
            stepsEl.appendChild(step);
        }
        console.log('Steps created');
    }

    // Update loading progress
    function updateLoading() {
        console.log('Updating progress:', progress);
        
        // Increment progress more slowly
        progress += Math.random() * 5 + 2; // Reduced increment
        if (progress > 100) progress = 100;
        
        // Update percentage
        if (percentageEl) {
            percentageEl.textContent = Math.floor(progress) + '%';
        }
        
        // Update status and steps
        const stepIndex = Math.floor((progress / 100) * totalSteps);
        if (stepIndex > currentStep && stepIndex < totalSteps) {
            if (statusEl && statusMessages[currentStep]) {
                statusEl.textContent = statusMessages[currentStep];
            }
            
            const stepEl = document.getElementById(`step-${currentStep}`);
            if (stepEl) {
                stepEl.classList.add('active');
            }
            
            currentStep = stepIndex;
        }
        
        // Continue or finish
        if (progress < 100) {
            setTimeout(updateLoading, 200); // Increased delay
        } else {
            // Add a delay before finishing
            setTimeout(finishLoading, 1000);
        }
    }

    // Finish loading and hide screen
    function finishLoading() {
        console.log('Finishing loading...');
        
        // Activate all remaining steps
        for (let i = 0; i < totalSteps; i++) {
            const stepEl = document.getElementById(`step-${i}`);
            if (stepEl) {
                stepEl.classList.add('active');
            }
        }
        
        if (statusEl) {
            statusEl.textContent = "Complete!";
        }
        
        // Add a delay before hiding
        setTimeout(() => {
            if (loadingEl) {
                loadingEl.style.opacity = '0';
                loadingEl.style.pointerEvents = 'none';
                
                // Add a longer delay before removing from DOM
                setTimeout(() => {
                    loadingEl.style.display = 'none';
                }, 1000);
            }
        }, 1000);
    }

    // Start the loading process
    function startLoading() {
        console.log('Starting loading process...');
        createSteps();
        setTimeout(() => {
            updateLoading();
        }, 500); // Increased initial delay
    }

    // Initialize
    startLoading();
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('stats-section')) {
                animateStats(entry.target);
            }
        }
    });
}, observerOptions);

// Wait for DOM to be ready before observing
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 1500) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    let lastTime = performance.now();
    
    function updateCounter(currentTime) {
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;
        
        current += increment * (deltaTime / 16);
        if (current >= target) {
            element.textContent = target;
            return;
        }
        
            element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
    }
    
    requestAnimationFrame(updateCounter);
}

// Stats animation when visible
document.addEventListener('DOMContentLoaded', function() {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numbers = entry.target.querySelectorAll('.stat-number');
                numbers.forEach(num => {
                    const target = parseFloat(num.getAttribute('data-target'));
                    animateCounter(num, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Mobile Menu - Enhanced Version
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.mobile-menu-btn');
    const menuLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Only initialize menu if both elements exist
    if (menuButton && menuLinks) {
        let isMenuOpen = false;

        // Toggle menu function with enhanced animations
        function toggleMenu() {
            isMenuOpen = !isMenuOpen;
            menuButton.classList.toggle('active');
            menuLinks.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            body.style.overflow = isMenuOpen ? 'hidden' : '';
            
            // Add/remove active class to body for additional styling
            body.classList.toggle('menu-open', isMenuOpen);
            
            // Animate menu items
            const links = menuLinks.querySelectorAll('.nav-link');
            links.forEach((link, index) => {
                if (isMenuOpen) {
                    link.style.transitionDelay = `${0.1 + (index * 0.1)}s`;
                } else {
                    link.style.transitionDelay = '0s';
                }
            });
        }

        // Menu button click with ripple effect
        menuButton.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            
            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
            
            toggleMenu();
        };

        // Close menu when clicking links
        const links = menuLinks.querySelectorAll('a');
        links.forEach(link => {
            link.onclick = function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    toggleMenu();
                    const navbar = document.querySelector('.navbar');
                    const navbarHeight = navbar ? navbar.offsetHeight : 0;
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    // Smooth scroll after menu closes
                    setTimeout(() => {
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }, 500);
                }
            };
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (isMenuOpen && 
                !menuLinks.contains(e.target) && 
                !menuButton.contains(e.target)) {
                toggleMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isMenuOpen) {
                toggleMenu();
            }
        });

        // Handle orientation changes
        window.addEventListener('orientationchange', function() {
            if (isMenuOpen) {
                toggleMenu();
            }
        });

        // Add touch feedback to menu items
        links.forEach(link => {
            link.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            link.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    } else {
        console.warn('Mobile menu elements not found');
    }
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// Loading Screen Script
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingPercentage = document.querySelector('.loading-percentage');
    const statusText = document.querySelector('.status-text');
    const steps = document.querySelectorAll('.step');
    
    // Set total duration to 5 seconds
    const totalDuration = 5000; // 5 seconds in milliseconds
    const stepDuration = totalDuration / 5; // 1 second per step
    let currentStep = 0;
    let startTime = Date.now();

    // Loading messages for each step
    const loadingMessages = [
        'Initializing system...',
        'Loading assets...',
        'Preparing interface...',
        'Connecting to network...',
        'Launching application...'
    ];

    function updateLoading() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        const progress = Math.min((elapsedTime / totalDuration) * 100, 100);
        
        // Update percentage
        loadingPercentage.textContent = `${Math.floor(progress)}%`;
        
        // Update steps
        const currentStepIndex = Math.floor(progress / 20);
        if (currentStepIndex !== currentStep) {
            currentStep = currentStepIndex;
            steps.forEach((step, index) => {
                if (index < currentStep) {
                    step.classList.add('completed');
                    step.classList.remove('active');
                } else if (index === currentStep) {
                    step.classList.add('active');
                } else {
                    step.classList.remove('active', 'completed');
                }
            });
            
            // Update status text
            if (currentStep < loadingMessages.length) {
                statusText.textContent = loadingMessages[currentStep];
            }
        }

        // Check if loading is complete
        if (progress < 100) {
            requestAnimationFrame(updateLoading);
        } else {
            // Add a small delay before hiding the loading screen
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                // Remove loading screen from DOM after animation
                setTimeout(() => {
                    loadingScreen.remove();
                }, 800);
            }, 200);
        }
    }

    // Start the loading animation
    requestAnimationFrame(updateLoading);
});

// Improved Stats Animation
function animateStats(section) {
    const numbers = section.querySelectorAll('.stat-number');
    numbers.forEach(num => {
        const target = parseFloat(num.getAttribute('data-target'));
        animateCounter(num, target);
    });
}

// Improved Touch Feedback
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.cta-button, .nav-link, .footer-link');
    
    buttons.forEach(btn => {
        btn.addEventListener('touchstart', () => {
            btn.style.transform = 'scale(0.98)';
            btn.style.transition = 'transform 0.1s ease';
        });
        
        btn.addEventListener('touchend', () => {
            btn.style.transform = '';
            btn.style.transition = 'transform 0.2s ease';
        });
    });
});

// Handle Mobile Viewport
function setMobileViewport() {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
        if (window.innerWidth <= 768) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        } else {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
        }
    }
}

// Call on load and resize
window.addEventListener('load', setMobileViewport);
window.addEventListener('resize', setMobileViewport);

// Handle orientation changes
window.addEventListener('orientationchange', function() {
    // Reset any fixed positioning or transforms
    document.body.style.height = window.innerHeight + 'px';
    
    // Update viewport
    setMobileViewport();
    
    // Close mobile menu if open
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenuBtn && navLinks && mobileMenuBtn.classList.contains('active')) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    }
});

// Prevent double-tap zoom on mobile
document.addEventListener('touchend', function(e) {
    if (e.touches.length < 2) {
        e.preventDefault();
    }
}, { passive: false });

// Scroll Indicator Control
document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    let lastScrollTop = 0;
    let scrollTimeout;

    function updateScrollIndicator() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Show indicator only when at the top of the page
        if (scrollTop < 100) {
            scrollIndicator.classList.add('visible');
        } else {
            scrollIndicator.classList.remove('visible');
        }

        // Clear previous timeout
        clearTimeout(scrollTimeout);
        
        // Hide indicator after scrolling stops
        scrollTimeout = setTimeout(() => {
            if (scrollTop > 100) {
                scrollIndicator.classList.remove('visible');
            }
        }, 1000);

        lastScrollTop = scrollTop;
    }

    // Initial check
    updateScrollIndicator();

    // Update on scroll
    window.addEventListener('scroll', updateScrollIndicator);
});

// Optimized Footer Performance
document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('.footer');
    const footerLinks = document.querySelectorAll('.footer-link');
    const socialLinks = document.querySelectorAll('.social-link');
    const legalLinks = document.querySelectorAll('.legal-link');
    
    // Check if device is mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Optimize touch events for mobile
    if (isMobile) {
        // Prevent double-tap zoom on links
        const preventDoubleTap = (e) => {
            e.preventDefault();
            const target = e.currentTarget;
            target.click();
        };

        // Add touch events with passive listeners
        footerLinks.forEach(link => {
            link.addEventListener('touchstart', () => {
                link.style.transform = 'scale(0.98)';
            }, { passive: true });
            
            link.addEventListener('touchend', () => {
                link.style.transform = '';
            }, { passive: true });
        });

        socialLinks.forEach(link => {
            link.addEventListener('touchstart', () => {
                link.style.transform = 'scale(0.95)';
            }, { passive: true });
            
            link.addEventListener('touchend', () => {
                link.style.transform = '';
            }, { passive: true });
        });

        legalLinks.forEach(link => {
            link.addEventListener('touchstart', () => {
                link.style.opacity = '0.8';
            }, { passive: true });
            
            link.addEventListener('touchend', () => {
                link.style.opacity = '';
            }, { passive: true });
        });
    }

    // Optimize scroll performance for mobile
    let ticking = false;
    const handleScroll = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const rect = footer.getBoundingClientRect();
                const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
                
                if (isVisible) {
                    footer.classList.add('visible');
                }
                ticking = false;
            });
            ticking = true;
        }
    };

    // Use passive scroll listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();

    // Handle orientation changes
    window.addEventListener('orientationchange', () => {
        // Reset any transforms
        footerLinks.forEach(link => link.style.transform = '');
        socialLinks.forEach(link => link.style.transform = '');
        legalLinks.forEach(link => link.style.opacity = '');
        
        // Recalculate visibility
        handleScroll();
    }, { passive: true });
});