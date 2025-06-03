// Form handling
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    
    // Add loading state
    submitBtn.classList.add('loading');
    
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Simulate API call
    setTimeout(() => {
        // Here you would typically send the data to your backend
        console.log('Form data:', data);
        
        // Show success message
        showNotification('Message sent successfully!', 'success');
        
        // Reset form and button
        form.reset();
        submitBtn.classList.remove('loading');
    }, 1500);
    
    return false;
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    requestAnimationFrame(() => {
        notification.classList.add('show');
    });
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Form validation
function validateForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateInput(input);
        });
        
        input.addEventListener('blur', () => {
            validateInput(input);
        });
    });
}

function validateInput(input) {
    const value = input.value.trim();
    const isValid = input.checkValidity();
    
    if (value === '') {
        input.classList.remove('valid', 'invalid');
    } else {
        input.classList.toggle('valid', isValid);
        input.classList.toggle('invalid', !isValid);
    }
}

// Initialize form validation
document.addEventListener('DOMContentLoaded', () => {
    validateForm();
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
    
    // Add intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe elements for animation
    document.querySelectorAll('.contact-info, .contact-form, .info-item').forEach(el => {
        observer.observe(el);
    });
});

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: #fff;
        font-size: 1rem;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .notification.success {
        background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
    }
    
    .notification.error {
        background: linear-gradient(135deg, #ff4d4d 0%, #f9cb28 100%);
    }
    
    @media (max-width: 480px) {
        .notification {
            left: 20px;
            right: 20px;
            text-align: center;
        }
    }
`;

document.head.appendChild(style); 