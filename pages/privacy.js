document.addEventListener('DOMContentLoaded', () => {
    // Initialize variables
    const sections = document.querySelectorAll('.privacy-section');
    const navLinks = document.querySelectorAll('.privacy-nav a');
    let currentSection = '';

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Smooth scroll to section
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Update active link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Intersection Observer for section visibility
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                currentSection = id;
                
                // Update active link
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => observer.observe(section));

    // Handle scroll events for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(() => {
            // Update active section based on scroll position
            const scrollPosition = window.scrollY;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    const id = section.getAttribute('id');
                    if (currentSection !== id) {
                        currentSection = id;
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${id}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                }
            });
        });
    }, { passive: true });

    // Mobile navigation optimization
    const privacyNav = document.querySelector('.privacy-nav');
    if (privacyNav) {
        let isScrolling = false;
        let startX;
        let scrollLeft;

        privacyNav.addEventListener('touchstart', (e) => {
            isScrolling = true;
            startX = e.touches[0].pageX - privacyNav.offsetLeft;
            scrollLeft = privacyNav.scrollLeft;
        }, { passive: true });

        privacyNav.addEventListener('touchmove', (e) => {
            if (!isScrolling) return;
            e.preventDefault();
            const x = e.touches[0].pageX - privacyNav.offsetLeft;
            const walk = (x - startX) * 2;
            privacyNav.scrollLeft = scrollLeft - walk;
        }, { passive: false });

        privacyNav.addEventListener('touchend', () => {
            isScrolling = false;
        }, { passive: true });
    }

    // Performance optimizations
    const optimizePerformance = () => {
        // Add will-change to elements that will animate
        sections.forEach(section => {
            section.style.willChange = 'transform, opacity';
        });

        // Remove will-change after animations complete
        setTimeout(() => {
            sections.forEach(section => {
                section.style.willChange = 'auto';
            });
        }, 1000);
    };

    // Initialize performance optimizations
    optimizePerformance();

    // Handle orientation changes
    window.addEventListener('orientationchange', () => {
        // Reset scroll position
        window.scrollTo(0, 0);
        
        // Recalculate active section
        const scrollPosition = window.scrollY;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const id = section.getAttribute('id');
                currentSection = id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}); 