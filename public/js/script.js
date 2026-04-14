// Enhanced mobile navigation with touch optimizations
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
let touchStartX = 0;
let touchEndX = 0;
let isMenuOpen = false;

// Touch gesture detection for swipe menu
document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
}, { passive: true });

function handleSwipeGesture() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    // Swipe right to open menu (from left edge)
    if (swipeDistance > swipeThreshold && touchStartX < 50 && !isMenuOpen) {
        openMobileMenu();
    }
    // Swipe left to close menu
    else if (swipeDistance < -swipeThreshold && isMenuOpen) {
        closeMobileMenu();
    }
}

function openMobileMenu() {
    mobileMenu?.classList.add('active');
    navMenu?.classList.add('active');
    isMenuOpen = true;
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

function closeMobileMenu() {
    mobileMenu?.classList.remove('active');
    navMenu?.classList.remove('active');
    isMenuOpen = false;
    document.body.style.overflow = ''; // Restore scroll
    document.body.style.overflowY = 'auto'; // Ensure vertical scroll works
    document.documentElement.style.overflow = ''; // Restore html overflow
}

// Ensure scroll works properly on page load
function ensureScrollWorks() {
    document.body.style.overflow = '';
    document.body.style.overflowY = 'auto';
    document.documentElement.style.overflow = '';
    document.documentElement.style.overflowY = 'auto';
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
}

// Initialize scroll on page load
document.addEventListener('DOMContentLoaded', ensureScrollWorks);

// Also ensure scroll works on window resize (orientation change)
window.addEventListener('resize', ensureScrollWorks);

// Enhanced menu toggle with haptic feedback simulation
mobileMenu?.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (isMenuOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
    
    // Visual feedback
    mobileMenu.style.transform = 'scale(0.95)';
    setTimeout(() => {
        mobileMenu.style.transform = '';
    }, 100);
}, { passive: true });

// Optimized menu closing with better touch handling
document.addEventListener('click', (e) => {
    if (e.target.matches('.nav-link')) {
        // Add ripple effect for touch feedback
        createRippleEffect(e.target, e);
        closeMobileMenu();
    }
    
    // Close menu when clicking outside
    if (isMenuOpen && !navMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
        closeMobileMenu();
    }
}, { passive: true });

// Create ripple effect for touch feedback
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Scroll Reveal Animation - DESACTIVADO
function reveal() {
    // Función desactivada - los elementos ahora son visibles inmediatamente
    return;
}

// window.addEventListener('scroll', reveal); // Desactivado
// reveal(); // Desactivado - no llamar al cargar la página

// Optimized smooth scrolling with requestAnimationFrame
const smoothScroll = (target) => {
    const targetPosition = target.offsetTop - 60;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, 500);
        window.scrollTo(0, run);
        if (timeElapsed < 500) requestAnimationFrame(animation);
    };

    const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
};

document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) smoothScroll(target);
    }
}, { passive: true });

// Optimized scroll performance with throttling
const navbar = document.querySelector('.navbar');
let ticking = false;

const updateNavbar = () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'var(--bg-secondary)';
        navbar.style.boxShadow = 'var(--shadow-lg)';
    }
    ticking = false;
};

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}, { passive: true });

// Security Functions
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateName(name) {
    // Only allow letters, spaces, and certain special characters
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]{2,50}$/;
    return nameRegex.test(name.trim());
}

function validateMessage(message) {
    // Allow most characters but limit length
    return message.trim().length >= 10 && message.trim().length <= 1000;
}

// Rate Limiting
const rateLimiter = {
    attempts: 0,
    lastAttempt: 0,
    maxAttempts: 3,
    cooldownPeriod: 60000, // 1 minute
    
    canSubmit() {
        const now = Date.now();
        if (now - this.lastAttempt > this.cooldownPeriod) {
            this.attempts = 0;
        }
        
        if (this.attempts >= this.maxAttempts) {
            const remainingTime = Math.ceil((this.cooldownPeriod - (now - this.lastAttempt)) / 1000);
            return { allowed: false, remainingTime };
        }
        
        return { allowed: true };
    },
    
    recordAttempt() {
        this.attempts++;
        this.lastAttempt = Date.now();
    },
    
    reset() {
        this.attempts = 0;
        this.lastAttempt = 0;
    }
};

// XSS Protection for dynamic content
function secureContent(content) {
    const temp = document.createElement('div');
    temp.textContent = content;
    return temp.innerHTML;
}

// Enhanced Contact Form with Security
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Rate limiting check
        const rateLimitCheck = rateLimiter.canSubmit();
        if (!rateLimitCheck.allowed) {
            showNotification(`Demasiados intentos. Espera ${rateLimitCheck.remainingTime} segundos`, 'error');
            return;
        }
        
        // Get and sanitize form data
        const nameInput = this.querySelector('#name');
        const emailInput = this.querySelector('#email');
        const messageInput = this.querySelector('#message');
        
        const name = sanitizeInput(nameInput.value);
        const email = sanitizeInput(emailInput.value);
        const message = sanitizeInput(messageInput.value);
        
        // Enhanced validation
        if (!name || !email || !message) {
            showNotification('Por favor completa todos los campos', 'error');
            rateLimiter.recordAttempt();
            return;
        }
        
        if (!validateName(name)) {
            showNotification('Nombre inválido. Usa solo letras y caracteres válidos', 'error');
            rateLimiter.recordAttempt();
            return;
        }
        
        if (!validateEmail(email)) {
            showNotification('Por favor ingresa un email válido', 'error');
            rateLimiter.recordAttempt();
            return;
        }
        
        if (!validateMessage(message)) {
            showNotification('El mensaje debe tener entre 10 y 1000 caracteres', 'error');
            rateLimiter.recordAttempt();
            return;
        }
        
        // Additional XSS checks
        const xssPatterns = [
            /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            /javascript:/gi,
            /on\w+\s*=/gi,
            /<iframe\b[^>]*>/gi,
            /<object\b[^>]*>/gi,
            /<embed\b[^>]*>/gi
        ];
        
        const combinedInput = name + email + message;
        const hasXSS = xssPatterns.some(pattern => pattern.test(combinedInput));
        
        if (hasXSS) {
            showNotification('Contenido no permitido detectado', 'error');
            rateLimiter.recordAttempt();
            return;
        }
        
        // Simulate secure form submission
        showNotification('Mensaje enviado correctamente', 'success');
        this.reset();
        rateLimiter.reset(); // Reset on successful submission
    });
    
    // Add input event listeners for real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            // Remove any potentially dangerous content on paste
            this.value = sanitizeInput(this.value);
        });
        
        input.addEventListener('paste', function(e) {
            e.preventDefault();
            const pastedText = (e.clipboardData || window.clipboardData).getData('text');
            this.value = sanitizeInput(pastedText);
        });
    });
}

// Validación de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    
    // Colores según el tipo
    switch(type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #f56565, #ed8936)';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, #4299e1, #667eea)';
    }
    
    // Añadir al DOM
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Optimized typewriter animation with requestAnimationFrame
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    const startTime = performance.now();
    
    function type(currentTime) {
        const elapsed = currentTime - startTime;
        const charIndex = Math.floor(elapsed / speed);
        
        if (charIndex < text.length) {
            element.textContent = text.substring(0, charIndex + 1);
            requestAnimationFrame(type);
        } else {
            element.textContent = text;
        }
    }
    
    requestAnimationFrame(type);
}

// Inicializar animación de escritura cuando la página cargue
window.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
    
    // Añadir clase reveal a elementos para animación - DESACTIVADO
    // const elementsToReveal = document.querySelectorAll('section > div, .project-card, .skill-category');
    // elementsToReveal.forEach(element => {
    //     element.classList.add('reveal');
    // });
});

// Contador animado para estadísticas (si se añaden en el futuro)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Optimized parallax effect with throttling
const hero = document.querySelector('.hero');
let parallaxTicking = false;

const updateParallax = () => {
    const scrolled = window.pageYOffset;
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    parallaxTicking = false;
};

window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
        requestAnimationFrame(updateParallax);
        parallaxTicking = true;
    }
}, { passive: true });

// Enhanced mobile form interactions
const mobileContactForm = document.querySelector('.form');
if (mobileContactForm) {
    // Mobile-optimized form handling
    const inputs = mobileContactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Better focus handling for mobile
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
            
            // Scroll to input on mobile (avoid keyboard overlap)
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            validateField(input);
        });
        
        // Touch feedback
        input.addEventListener('touchstart', () => {
            input.style.transform = 'scale(0.98)';
        });
        
        input.addEventListener('touchend', () => {
            input.style.transform = '';
        });
    });
    
    // Enhanced form submission with mobile feedback
    mobileContactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = mobileContactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        // Simulate form submission (replace with actual submission)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success feedback
        submitBtn.textContent = '¡Enviado!';
        submitBtn.classList.add('success');
        
        // Reset form
        setTimeout(() => {
            mobileContactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading', 'success');
            
            // Show success message
            showMobileMessage('¡Mensaje enviado con éxito!', 'success');
        }, 1500);
    });
}

// Field validation with visual feedback
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';
    
    if (field.type === 'email') {
        isValid = validateEmail(value);
        message = isValid ? '' : 'Email inválido';
    } else if (field.type === 'text' && field.name === 'name') {
        isValid = validateName(value);
        message = isValid ? '' : 'Nombre inválido';
    } else if (field.tagName === 'TEXTAREA') {
        isValid = validateMessage(value);
        message = isValid ? '' : 'Mensaje debe tener entre 10 y 1000 caracteres';
    }
    
    // Show validation feedback
    const feedbackElement = field.parentElement.querySelector('.field-feedback');
    if (feedbackElement) {
        feedbackElement.textContent = message;
        feedbackElement.style.display = message ? 'block' : 'none';
    }
    
    field.classList.toggle('valid', isValid && value);
    field.classList.toggle('invalid', !isValid && value);
    
    return isValid;
}

// Mobile toast notifications
function showMobileMessage(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `mobile-toast ${type}`;
    toast.textContent = message;
    
    // Add to page
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Auto remove
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Enhanced mobile scroll indicators
function addScrollIndicators() {
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        // Add scroll indicator for long sections on mobile
        if (window.innerWidth <= 768 && section.scrollHeight > window.innerHeight * 1.5) {
            const indicator = document.createElement('div');
            indicator.className = 'scroll-indicator';
            indicator.innerHTML = '<i class="fas fa-chevron-down"></i>';
            section.appendChild(indicator);
        }
    });
}

// Pull-to-refresh functionality for mobile
let pullStartY = 0;
let pullDistance = 0;
let isPulling = false;

document.addEventListener('touchstart', (e) => {
    if (window.scrollY === 0) {
        pullStartY = e.touches[0].clientY;
        isPulling = true;
    }
}, { passive: true });

document.addEventListener('touchmove', (e) => {
    if (isPulling) {
        pullDistance = e.touches[0].clientY - pullStartY;
        
        if (pullDistance > 0 && pullDistance < 150) {
            document.body.style.transform = `translateY(${pullDistance * 0.5}px)`;
        }
    }
}, { passive: true });

document.addEventListener('touchend', () => {
    if (isPulling) {
        document.body.style.transform = '';
        
        if (pullDistance > 100) {
            // Trigger refresh
            location.reload();
        }
        
        isPulling = false;
        pullDistance = 0;
    }
}, { passive: true });

// Mobile performance optimizations
if ('serviceWorker' in navigator && window.innerWidth <= 768) {
    // Register service worker for better mobile performance
    navigator.serviceWorker.register('/sw.js').catch(() => {
        // Service worker registration failed (optional)
    });
}

// Initialize mobile enhancements
document.addEventListener('DOMContentLoaded', () => {
    addScrollIndicators();
    
    // Add mobile-specific classes
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile-device');
    }
});

// Cambiar tema (opcional - para futura implementación)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Cargar tema guardado
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

// Preloader simple
window.addEventListener('load', () => {
    const preloader = document.createElement('div');
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea, #764ba2);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    const loader = document.createElement('div');
    loader.style.cssText = `
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255,255,255,0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    preloader.appendChild(loader);
    document.body.appendChild(preloader);
    
    // Animación de rotación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Eliminar preloader después de cargar
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            if (preloader.parentNode) {
                preloader.parentNode.removeChild(preloader);
            }
        }, 500);
    }, 1000);
});

// Optimización de rendimiento - Lazy loading para imágenes
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading
lazyLoadImages();

// Detectar dispositivo móvil
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustar comportamientos según dispositivo
if (isMobile()) {
    // Reducir animaciones en móviles para mejor rendimiento
    document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
}
