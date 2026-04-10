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

// Scroll Reveal Animation
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
reveal(); // Llamar a la función al cargar la página

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

// Formulario de contacto
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener datos del formulario
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Validación básica
    if (!name || !email || !subject || !message) {
        showNotification('Por favor, completa todos los campos', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Por favor, introduce un email válido', 'error');
        return;
    }
    
    // Simular envío del formulario
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    // Simular delay de envío
    setTimeout(() => {
        showNotification('Mensaje enviado correctamente. Te contactaré pronto.', 'success');
        this.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
});

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
    
    // Añadir clase reveal a elementos para animación
    const elementsToReveal = document.querySelectorAll('section > div, .project-card, .skill-category');
    elementsToReveal.forEach(element => {
        element.classList.add('reveal');
    });
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

// Sistema de Edición en Tiempo Real
class RealTimeEditor {
    constructor() {
        this.isEditMode = false;
        this.originalContent = {};
        this.editableElements = [];
        this.saveTimeout = null;
        this.indicator = null;
        
        this.init();
    }
    
    init() {
        this.setupElements();
        this.setupEventListeners();
        this.loadSavedContent();
    }
    
    setupElements() {
        this.editControls = document.getElementById('edit-controls');
        this.enableEditBtn = document.getElementById('enable-edit');
        this.closeEditBtn = document.getElementById('close-edit');
        this.saveBtn = document.getElementById('save-changes');
        this.resetBtn = document.getElementById('reset-changes');
        this.editStatus = document.getElementById('edit-status');
        
        this.editableElements = document.querySelectorAll('.editable');
    }
    
    setupEventListeners() {
        // Botón de activar edición
        this.enableEditBtn.addEventListener('click', () => this.toggleEditMode());
        
        // Botón de cerrar edición
        this.closeEditBtn.addEventListener('click', () => this.exitEditMode());
        
        // Botón de guardar
        this.saveBtn.addEventListener('click', () => this.saveChanges());
        
        // Botón de resetear
        this.resetBtn.addEventListener('click', () => this.resetChanges());
        
        // Eventos en elementos editables
        this.editableElements.forEach(element => {
            element.addEventListener('click', (e) => this.handleElementClick(e));
            element.addEventListener('blur', (e) => this.handleElementBlur(e));
            element.addEventListener('input', (e) => this.handleElementInput(e));
            element.addEventListener('keydown', (e) => this.handleKeyDown(e));
        });
        
        // Tecla ESC para salir del modo edición
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isEditMode) {
                this.exitEditMode();
            }
        });
    }
    
    toggleEditMode() {
        if (this.isEditMode) {
            this.exitEditMode();
        } else {
            this.enterEditMode();
        }
    }
    
    enterEditMode() {
        this.isEditMode = true;
        this.saveOriginalContent();
        
        // Mostrar controles de edición
        this.editControls.style.display = 'block';
        this.enableEditBtn.classList.add('active');
        
        // Añadir clase al body
        document.body.classList.add('editing-mode');
        
        // Crear indicador de edición
        this.createEditingIndicator();
        
        // Hacer elementos editables
        this.editableElements.forEach(element => {
            element.contentEditable = true;
        });
        
        this.updateStatus('Modo edición activado');
        this.showNotification('Modo edición activado', 'info');
    }
    
    exitEditMode() {
        this.isEditMode = false;
        
        // Ocultar controles de edición
        this.editControls.style.display = 'none';
        this.enableEditBtn.classList.remove('active');
        
        // Remover clase del body
        document.body.classList.remove('editing-mode');
        
        // Remover indicador
        this.removeEditingIndicator();
        
        // Quitar contenteditable
        this.editableElements.forEach(element => {
            element.contentEditable = false;
        });
        
        this.updateStatus('Modo edición desactivado');
        this.showNotification('Modo edición desactivado', 'info');
    }
    
    saveOriginalContent() {
        this.originalContent = {};
        this.editableElements.forEach(element => {
            const field = element.dataset.field;
            if (field) {
                this.originalContent[field] = element.innerHTML;
            }
        });
    }
    
    handleElementClick(e) {
        if (!this.isEditMode) return;
        
        e.preventDefault();
        const element = e.target;
        
        // Seleccionar todo el texto
        const range = document.createRange();
        range.selectNodeContents(element);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        
        this.updateStatus('Editando: ' + (element.dataset.field || 'elemento'));
    }
    
    handleElementBlur(e) {
        if (!this.isEditMode) return;
        
        // Auto-guardar después de perder el foco
        this.autoSave();
    }
    
    handleElementInput(e) {
        if (!this.isEditMode) return;
        
        // Actualizar estado
        this.updateStatus('Escribiendo...');
        
        // Auto-guardar con delay
        clearTimeout(this.saveTimeout);
        this.saveTimeout = setTimeout(() => this.autoSave(), 2000);
    }
    
    handleKeyDown(e) {
        if (!this.isEditMode) return;
        
        // Prevenir edición de ciertos elementos si es necesario
        if (e.target.tagName === 'H1' && e.key === 'Enter') {
            e.preventDefault();
        }
    }
    
    autoSave() {
        this.saveChanges(true);
    }
    
    saveChanges(isAuto = false) {
        const content = {};
        
        this.editableElements.forEach(element => {
            const field = element.dataset.field;
            if (field) {
                content[field] = element.innerHTML;
            }
        });
        
        // Guardar en localStorage
        localStorage.setItem('portfolio-content', JSON.stringify(content));
        
        this.updateStatus(isAuto ? 'Guardado automáticamente' : 'Cambios guardados');
        
        if (!isAuto) {
            this.showNotification('Cambios guardados exitosamente', 'success');
        }
        
        // Actualizar timestamp
        localStorage.setItem('portfolio-last-save', new Date().toISOString());
    }
    
    loadSavedContent() {
        const savedContent = localStorage.getItem('portfolio-content');
        
        if (savedContent) {
            try {
                const content = JSON.parse(savedContent);
                
                this.editableElements.forEach(element => {
                    const field = element.dataset.field;
                    if (field && content[field]) {
                        element.innerHTML = content[field];
                    }
                });
                
                const lastSave = localStorage.getItem('portfolio-last-save');
                if (lastSave) {
                    const saveDate = new Date(lastSave);
                    this.showNotification(`Contenido cargado (guardado: ${saveDate.toLocaleString()})`, 'info');
                }
            } catch (error) {
                console.error('Error al cargar contenido guardado:', error);
            }
        }
    }
    
    resetChanges() {
        if (confirm('¿Estás seguro de que quieres resetear todos los cambios?')) {
            // Restaurar contenido original
            this.editableElements.forEach(element => {
                const field = element.dataset.field;
                if (field && this.originalContent[field]) {
                    element.innerHTML = this.originalContent[field];
                }
            });
            
            // Limpiar localStorage
            localStorage.removeItem('portfolio-content');
            localStorage.removeItem('portfolio-last-save');
            
            this.updateStatus('Cambios reseteados');
            this.showNotification('Todos los cambios han sido reseteados', 'warning');
        }
    }
    
    createEditingIndicator() {
        if (this.indicator) return;
        
        this.indicator = document.createElement('div');
        this.indicator.className = 'editing-indicator';
        document.body.appendChild(this.indicator);
    }
    
    removeEditingIndicator() {
        if (this.indicator) {
            this.indicator.remove();
            this.indicator = null;
        }
    }
    
    updateStatus(message) {
        if (this.editStatus) {
            this.editStatus.textContent = message;
        }
    }
    
    showNotification(message, type = 'info') {
        // Crear notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Estilos para la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 15px 25px;
            border-radius: 4px;
            color: white;
            font-weight: 500;
            z-index: 10002;
            transform: translateX(-50%) translateY(-100px);
            transition: transform 0.3s ease;
            max-width: 400px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        
        // Colores según el tipo
        switch(type) {
            case 'success':
                notification.style.background = 'linear-gradient(135deg, #00c851, #00ff00)';
                break;
            case 'warning':
                notification.style.background = 'linear-gradient(135deg, #ff6b00, #ff9800)';
                break;
            case 'error':
                notification.style.background = 'linear-gradient(135deg, #ff0000, #cc0000)';
                break;
            default:
                notification.style.background = 'linear-gradient(135deg, var(--accent-color), var(--text-primary))';
        }
        
        // Añadir al DOM
        document.body.appendChild(notification);
        
        // Animación de entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(-50%) translateY(0)';
        }, 100);
        
        // Eliminar después de 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(-50%) translateY(-100px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Detectar dispositivo móvil
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustar comportamientos según dispositivo
if (isMobile()) {
    // Reducir animaciones en móviles para mejor rendimiento
    document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
}

// Inicializar el editor cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioEditor = new RealTimeEditor();
});
