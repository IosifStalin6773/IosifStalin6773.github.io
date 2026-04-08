// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initThemeLanguage();
    initSmartImages();
    initParticles();
    initNavigation();
    initScrollEffects();
    initFormHandler();
    initAnimations();
    initSkillBars();
});

// Sistema de imágenes inteligente
function initSmartImages() {
    // Detectar y cargar imágenes automáticamente
    loadProfileImage();
    loadHeroImage();
    loadProjectImages();
    loadBackgroundImages();
}

function loadProfileImage() {
    const profileElements = document.querySelectorAll('.profile-placeholder, .profile-image');
    const imageFormats = ['png', 'jpg', 'jpeg', 'webp'];
    
    profileElements.forEach(element => {
        // Intentar cargar imagen de perfil
        let imageLoaded = false;
        
        for (const format of imageFormats) {
            const img = new Image();
            img.onload = function() {
                if (!imageLoaded) {
                    imageLoaded = true;
                    element.innerHTML = '';
                    element.className = 'profile-image';
                    element.appendChild(img);
                    console.log(`Profile image loaded: profile.${format}`);
                }
            };
            img.onerror = function() {
                if (format === imageFormats[imageFormats.length - 1] && !imageLoaded) {
                    console.log('Profile image not found, keeping placeholder');
                }
            };
            img.src = `assets/images/profile/profile.${format}`;
        }
    });
}

function loadHeroImage() {
    const heroElements = document.querySelectorAll('.hero-image .project-placeholder');
    const imageFormats = ['jpg', 'jpeg', 'png', 'webp'];
    
    heroElements.forEach(element => {
        for (const format of imageFormats) {
            const img = new Image();
            img.onload = function() {
                element.innerHTML = '';
                element.className = 'smart-image';
                element.appendChild(img);
            };
            img.onerror = function() {
                if (format === imageFormats[imageFormats.length - 1]) {
                    console.log('Hero image not found, keeping placeholder');
                }
            };
            img.src = `assets/images/hero/hero-image.${format}`;
            break;
        }
    });
}

function loadProjectImages() {
    const projects = [
        { id: 'all-in-one-bot', name: 'all-in-one-bot' },
        { id: 'macos-ventura', name: 'macos-ventura' },
        { id: 'eft-helix-framework', name: 'eft-helix-framework' },
        { id: 'permaprops-fivem', name: 'permaprops-fivem' }
    ];
    
    const imageFormats = ['jpg', 'jpeg', 'png', 'webp'];
    
    projects.forEach(project => {
        const elements = document.querySelectorAll(`[data-project="${project.id}"] .project-placeholder, .project-placeholder`);
        
        elements.forEach(element => {
            // Buscar el project card más cercano para determinar el proyecto
            const projectCard = element.closest('.project-card');
            if (!projectCard) return;
            
            const projectTitle = projectCard.querySelector('h3')?.textContent.toLowerCase();
            if (!projectTitle || !projectTitle.includes(project.id.split('-')[0])) return;
            
            for (const format of imageFormats) {
                const img = new Image();
                img.onload = function() {
                    element.innerHTML = '';
                    element.className = 'smart-image';
                    element.appendChild(img);
                };
                img.onerror = function() {
                    if (format === imageFormats[imageFormats.length - 1]) {
                        console.log(`Project image not found: ${project.name}, keeping placeholder`);
                    }
                };
                img.src = `assets/images/projects/${project.name}.${format}`;
                break;
            }
        });
    });
}

function loadBackgroundImages() {
    const imageFormats = ['jpg', 'jpeg', 'png', 'webp'];
    
    // Imagen de fondo para hero section
    for (const format of imageFormats) {
        const img = new Image();
        img.onload = function() {
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                heroSection.style.position = 'relative';
                const bgImg = document.createElement('div');
                bgImg.className = 'hero-bg-image';
                bgImg.style.backgroundImage = `url('assets/images/backgrounds/hero-bg.${format}')`;
                bgImg.style.backgroundSize = 'cover';
                bgImg.style.backgroundPosition = 'center';
                bgImg.style.backgroundRepeat = 'no-repeat';
                heroSection.insertBefore(bgImg, heroSection.firstChild);
            }
        };
        img.onerror = function() {
            if (format === imageFormats[imageFormats.length - 1]) {
                console.log('Background image not found');
            }
        };
        img.src = `assets/images/backgrounds/hero-bg.${format}`;
        break;
    }
}

// Función helper para añadir imágenes manualmente
window.addSmartImage = function(container, imagePath, className = 'smart-image') {
    const element = typeof container === 'string' ? document.querySelector(container) : container;
    if (!element) return;
    
    const img = new Image();
    img.onload = function() {
        element.innerHTML = '';
        element.className = className;
        element.appendChild(img);
    };
    img.src = imagePath;
};

// Sistema de tema e idioma
function initThemeLanguage() {
    // Cargar preferencias guardadas
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedLang = localStorage.getItem('language') || 'es';
    
    // Aplicar tema inicial
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        updateThemeIcon('light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    }
    
    // Aplicar idioma inicial
    setLanguage(savedLang);
    
    // Event listeners
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('langToggle').addEventListener('click', toggleLanguage);
}

// Sistema de traducciones
const translations = {
    es: {
        'nav.home': 'Inicio',
        'nav.experience': 'Experiencia',
        'nav.projects': 'Proyectos',
        'nav.skills': 'Habilidades',
        'nav.contact': 'Contacto',
        'hero.title': 'Hola, Soy IosifStalin6773',
        'hero.subtitle': 'Desarrollador Full Stack & Gaming Enthusiast',
        'hero.description': 'Desarrollador apasionado con experiencia en creación de bots, scripts para gaming, aplicaciones web y herramientas personalizadas. Especializado en automatización, desarrollo de servidores de juego y temas personalizados.',
        'hero.btnExperience': 'Ver Experiencia',
        'hero.btnContact': 'Contactarme',
        'experience.title': 'Experiencia Profesional',
        'projects.title': 'Proyectos Destacados',
        'skills.title': 'Habilidades Técnicas',
        'contact.title': 'Contacto'
    },
    en: {
        'nav.home': 'Home',
        'nav.experience': 'Experience',
        'nav.projects': 'Projects',
        'nav.skills': 'Skills',
        'nav.contact': 'Contact',
        'hero.title': 'Hi, I\'m IosifStalin6773',
        'hero.subtitle': 'Full Stack Developer & Gaming Enthusiast',
        'hero.description': 'Passionate developer with experience in creating bots, gaming scripts, web applications and custom tools. Specialized in automation, game server development and custom themes.',
        'hero.btnExperience': 'View Experience',
        'hero.btnContact': 'Contact Me',
        'experience.title': 'Professional Experience',
        'projects.title': 'Featured Projects',
        'skills.title': 'Technical Skills',
        'contact.title': 'Contact'
    }
};

function setLanguage(lang) {
    // Actualizar atributo lang
    document.documentElement.setAttribute('lang', lang);
    
    // Traducir todos los elementos con data-lang
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Guardar preferencia
    localStorage.setItem('language', lang);
}

function toggleLanguage() {
    const currentLang = localStorage.getItem('language') || 'es';
    const newLang = currentLang === 'es' ? 'en' : 'es';
    setLanguage(newLang);
}

function toggleTheme() {
    const themes = ['dark', 'light', 'fallout'];
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const newTheme = themes[nextIndex];
    
    // Aplicar nuevo tema
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Actualizar icono
    updateThemeIcon(newTheme);
    
    // Guardar preferencia
    localStorage.setItem('theme', newTheme);
    
    // Animación de transición
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    // Efecto de cambio de tema
    if (newTheme === 'fallout') {
        playTerminalSound();
        showTerminalMessage('SYSTEM MODE: FALLOUT');
    }
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('#themeToggle i');
    switch(theme) {
        case 'light':
            themeIcon.className = 'fas fa-sun';
            break;
        case 'fallout':
            themeIcon.className = 'fas fa-tv';
            break;
        default:
            themeIcon.className = 'fas fa-moon';
    }
}

// Efectos de sonido para tema Fallout
function playTerminalSound() {
    // Crear sonido de terminal (simulado)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'square';
    gainNode.gain.value = 0.1;
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Mensaje de terminal
function showTerminalMessage(message) {
    const terminalMsg = document.createElement('div');
    terminalMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--bg-secondary);
        color: var(--terminal-green);
        padding: 20px;
        border: 2px solid var(--terminal-green);
        font-family: 'Courier New', monospace;
        z-index: 10000;
        animation: terminalFade 2s ease-out forwards;
    `;
    terminalMsg.textContent = message;
    
    document.body.appendChild(terminalMsg);
    
    setTimeout(() => {
        terminalMsg.remove();
    }, 2000);
}

// Animación de terminal
const style = document.createElement('style');
style.textContent = `
    @keyframes terminalFade {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
        }
    }
`;
document.head.appendChild(style);

// Sistema de partículas interactivas
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    
    if (!canvas) return;
    
    // Configurar canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Configuración de partículas
    const particles = [];
    const particleCount = 100;
    const connectionDistance = 150;
    const mouseRadius = 200;
    
    let mouseX = 0;
    let mouseY = 0;
    
    // Clase de partícula
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.3;
            this.color = Math.random() > 0.5 ? '#00d4ff' : '#ff006e';
        }
        
        update() {
            // Movimiento básico
            this.x += this.vx;
            this.y += this.vy;
            
            // Rebote en bordes
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
            
            // Interacción con mouse
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouseRadius) {
                const force = (mouseRadius - distance) / mouseRadius;
                const angle = Math.atan2(dy, dx);
                this.vx -= Math.cos(angle) * force * 0.5;
                this.vy -= Math.sin(angle) * force * 0.5;
            }
            
            // Limitar velocidad
            const maxSpeed = 2;
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (speed > maxSpeed) {
                this.vx = (this.vx / speed) * maxSpeed;
                this.vy = (this.vy / speed) * maxSpeed;
            }
        }
        
        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }
    
    // Crear partículas
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Mouse move listener
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Touch support
    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
        }
    });
    
    // Animación
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Actualizar y dibujar partículas
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Dibujar conexiones
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    const opacity = (1 - distance / connectionDistance) * 0.3;
                    ctx.globalAlpha = opacity;
                    ctx.strokeStyle = particles[i].color;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Navegación móvil
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animar las barras del menú hamburguesa
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                // Resetear barras del menú hamburguesa
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            });
        });
    }
}

// Efectos de scroll
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Cambiar estilo de navbar al hacer scroll
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        // Ocultar/mostrar navbar según dirección del scroll
        if (scrollTop > lastScrollTop && scrollTop > 300) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Resaltar sección activa en la navegación
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 200)) {
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
}

// Manejo del formulario de contacto
function initFormHandler() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validar formulario
            if (!validateForm(data)) {
                return;
            }
            
            // Simular envío del formulario
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            
            // Simular tiempo de envío
            setTimeout(() => {
                // Mostrar mensaje de éxito
                showNotification('¡Mensaje enviado con éxito! Te responderé pronto.', 'success');
                
                // Resetear formulario
                contactForm.reset();
                
                // Restaurar botón
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 2000);
        });
    }
}

// Validación del formulario
function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!data.name || data.name.trim().length < 2) {
        showNotification('Por favor, ingresa un nombre válido.', 'error');
        return false;
    }
    
    if (!emailRegex.test(data.email)) {
        showNotification('Por favor, ingresa un email válido.', 'error');
        return false;
    }
    
    if (!data.subject || data.subject.trim().length < 3) {
        showNotification('Por favor, ingresa un asunto válido.', 'error');
        return false;
    }
    
    if (!data.message || data.message.trim().length < 10) {
        showNotification('Por favor, ingresa un mensaje de al menos 10 caracteres.', 'error');
        return false;
    }
    
    return true;
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
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    `;
    
    // Colores según tipo
    switch (type) {
        case 'success':
            notification.style.background = '#10b981';
            break;
        case 'error':
            notification.style.background = '#ef4444';
            break;
        case 'warning':
            notification.style.background = '#f59e0b';
            break;
        default:
            notification.style.background = '#3b82f6';
    }
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Animaciones al hacer scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                
                // Animar barras de habilidades si están en vista
                if (entry.target.classList.contains('skill-progress')) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0';
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 200);
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos para animar
    const elementsToAnimate = document.querySelectorAll('.timeline-item, .project-card, .skill-category, .contact-form');
    elementsToAnimate.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
}

// Inicializar barras de habilidades
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        // Animar cuando la página carga
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Efecto de escritura para el hero title
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

// Smooth scroll mejorado
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Ajustar por altura del navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Preloader simple
window.addEventListener('load', function() {
    // Efecto de fade-in para toda la página
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Detectar preferencia de modo oscuro (opcional)
function detectDarkMode() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Aquí podrías agregar lógica para modo oscuro
        console.log('Modo oscuro detectado');
    }
}

// Performance optimization - Debounce
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

// Aplicar debounce a eventos de scroll
const debouncedScroll = debounce(function() {
    // Aquí puedes agregar funciones que se ejecutan al hacer scroll
}, 100);

window.addEventListener('scroll', debouncedScroll);

// Lazy loading para imágenes (opcional)
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

// Console message personalizado
console.log('%c¡Bienvenido a mi Portfolio! ', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cSi te interesa el código, échale un vistazo a mi GitHub', 'color: #6b7280; font-size: 14px;');
