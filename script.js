/**
 * Portfolio Website - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initContactForm();
    initBackToTop();
    initSkillBars();
});

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}

/**
 * Initialize contact form
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const subject = this.querySelectorAll('input[type="text"]')[1].value.trim();
            const message = this.querySelector('textarea').value.trim();
            
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show success message
            showNotification('Message sent successfully! I will get back to you soon.', 'success');
            
            // Reset form
            this.reset();
        });
    }
}

/**
 * Email validation
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Show notification
 */
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize back to top button
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Initialize skill bars animation
 */
function initSkillBars() {
    // Animate skill bars when they enter viewport
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target.querySelector('.skill-level');
                if (skillLevel) {
                    const percent = skillLevel.style.width;
                    skillLevel.style.width = '0%';
                    
                    setTimeout(() => {
                        skillLevel.style.width = percent;
                    }, 200);
                }
                
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe all skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        skillObserver.observe(item);
    });
}

/**
 * Smooth scroll for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * Handle download resume clicks
 */
document.querySelectorAll('a[href$="resume.pdf"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // If PDF doesn't exist, show notification
        if (!this.getAttribute('href').includes('resume.pdf')) {
            e.preventDefault();
            showNotification('Please add your resume PDF to the assets folder', 'info');
        }
    });
});

/**
 * Add current year to footer
 */
function updateCurrentYear() {
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    
    yearElements.forEach(element => {
        if (element) {
            element.textContent = currentYear;
        }
    });
}

// Update year on page load
updateCurrentYear();