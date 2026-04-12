// Navegación móvil
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Scroll Reveal Animation - DESACTIVADO
function reveal() {
    // Función desactivada - los elementos ahora son visibles inmediatamente
    return;
}

// window.addEventListener('scroll', reveal); // Desactivado
// reveal(); // Desactivado - no llamar al cargar la página

// Smooth scrolling para enlaces de navegación
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

// Mantener estilo de navegación militarizado al hacer scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'var(--bg-secondary)';
        navbar.style.boxShadow = 'var(--shadow-lg)';
    } else {
        navbar.style.background = 'var(--bg-secondary)';
        navbar.style.boxShadow = 'var(--shadow-lg)';
    }
});

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

// Animación de escritura para el hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
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

// Parallax effect para hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
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
