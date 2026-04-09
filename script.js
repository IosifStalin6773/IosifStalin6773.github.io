// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initThemeLanguage();
    initSmartImages();
    initPipboyTerminal();
    initFalloutRadio();
    initParticles();
    initNavigation();
    initScrollEffects();
    initFormHandler();
    initAnimations();
    initSkillBars();
    
    // Inicializar gestor de recursos del pip-terminal-dev
    initPipTerminalResources();
    
    // Inicializar componentes Pip-Boy mejorados
    initPipBoyComponents();
    
    // Restaurar estados guardados
    restoreAllStates();
});

// Gestor de recursos del Pip-Boy Terminal
function initPipTerminalResources() {
    // Crear gestor de recursos si no existe
    if (!window.ResourceManager) {
        // Definir gestor de recursos
        window.ResourceManager = {
            resources: {
                // Imágenes del sistema
                images: {
                    crtEffect: '/assets/pip-terminal-resources/images/crt-effect.png',
                    staticNoise: '/assets/pip-terminal-resources/images/static-noise.png',
                    scanlines: '/assets/pip-terminal-resources/images/scanlines.png',
                    terminalBg: '/assets/pip-terminal-resources/images/terminal-bg.jpg',
                    buttonHover: '/assets/pip-terminal-resources/images/button-hover.png',
                    buttonPressed: '/assets/pip-terminal-resources/images/button-pressed.png'
                },
                // Audio del sistema
                audio: {
                    boot: '/assets/pip-terminal-resources/audio/boot.mp3',
                    error: '/assets/pip-terminal-resources/audio/error.mp3',
                    success: '/assets/pip-terminal-resources/audio/success.mp3',
                    click: '/assets/pip-terminal-resources/audio/click.mp3',
                    typing: '/assets/pip-terminal-resources/audio/typing.mp3',
                    static: '/assets/pip-terminal-resources/audio/static.mp3'
                },
                // Estaciones de radio
                radio: {
                    galaxyNews: '/assets/pip-terminal-resources/audio/galaxy-news.mp3',
                    enclave: '/assets/pip-terminal-resources/audio/enclave.mp3',
                    diamondCity: '/assets/pip-terminal-resources/audio/diamond-city.mp3',
                    classical: '/assets/pip-terminal-resources/audio/classical.mp3'
                }
            },
            
            loadedResources: new Map(),
            audioContext: null,
            
            // Inicializar gestor de audio
            initAudio() {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            },
            
            // Cargar imagen
            async loadImage(path) {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => resolve(img);
                    img.onerror = () => reject(new Error(`Failed to load image: ${path}`));
                    img.src = path;
                });
            },
            
            // Cargar audio
            async loadAudio(path) {
                return new Promise((resolve, reject) => {
                    const audio = new Audio();
                    audio.oncanplay = () => resolve(audio);
                    audio.onerror = () => reject(new Error(`Failed to load audio: ${path}`));
                    audio.src = path;
                });
            },
            
            // Cargar recurso con caché
            async loadResource(type, path) {
                const cacheKey = `${type}_${path}`;
                
                if (this.loadedResources.has(cacheKey)) {
                    return this.loadedResources.get(cacheKey);
                }
                
                try {
                    let resource;
                    if (type === 'image') {
                        resource = await this.loadImage(path);
                    } else if (type === 'audio') {
                        resource = await this.loadAudio(path);
                    }
                    
                    this.loadedResources.set(cacheKey, resource);
                    return resource;
                } catch (error) {
                    console.warn(`Failed to load resource ${type}:${path}`, error);
                    return null;
                }
            },
            
            // Reproducir sonido
            playSound(soundType) {
                if (!this.audioContext) this.initAudio();
                
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                // Sonidos del sistema según el tipo
                const sounds = {
                    boot: { frequency: 220, duration: 0.5, type: 'square' },
                    error: { frequency: 110, duration: 0.3, type: 'sawtooth' },
                    success: { frequency: 440, duration: 0.2, type: 'sine' },
                    click: { frequency: 880, duration: 0.05, type: 'square' },
                    typing: { frequency: 600, duration: 0.02, type: 'square' },
                    static: { frequency: 50, duration: 0.1, type: 'triangle' }
                };
                
                const sound = sounds[soundType];
                if (sound) {
                    oscillator.frequency.value = sound.frequency;
                    oscillator.type = sound.type;
                    gainNode.gain.value = 0.1;
                    
                    oscillator.start();
                    
                    setTimeout(() => {
                        oscillator.stop();
                    }, sound.duration * 1000);
                }
            },
            
            // Obtener lista de recursos
            getResourceList() {
                return {
                    images: Object.keys(this.resources.images),
                    audio: Object.keys(this.resources.audio),
                    radio: Object.keys(this.resources.radio)
                };
            },
            
            // Liberar memoria
            cleanup() {
                this.loadedResources.clear();
                if (this.audioContext) {
                    this.audioContext.close();
                }
            }
        };
        
        // Inicializar audio
        window.ResourceManager.initAudio();
        
        console.log('Pip-Boy Terminal Resources Manager initialized');
        console.log('Available resources:', window.ResourceManager.getResourceList());
    }
}

// Sistema de imágenes inteligente optimizado con lazy loading
function initSmartImages() {
    loadProfileImage();
    loadHeroImage();
    loadProjectImages();
    loadBackgroundImages();
}

function loadProfileImage() {
    const profileElements = document.querySelectorAll('.profile-placeholder, .profile-image');
    const imageFormats = ['webp', 'avif', 'png', 'jpg', 'jpeg'];
    
    profileElements.forEach(element => {
        let imageLoaded = false;
        
        for (const format of imageFormats) {
            const img = new Image();
            img.loading = 'lazy';
            img.onload = function() {
                if (!imageLoaded) {
                    imageLoaded = true;
                    element.innerHTML = '';
                    element.className = 'profile-image';
                    element.appendChild(img);
                    img.style.cssText = 'width:100%;height:100%;object-fit:cover;border-radius:50%';
                    console.log(`Profile image loaded: profile.${format}`);
                }
            };
            img.onerror = function() {
                if (format === imageFormats[imageFormats.length - 1] && !imageLoaded) {
                    console.log('Profile image not found, keeping placeholder');
                }
            };
            img.src = `assets/images/profile.${format}`;
            break;
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
    
    for (const format of imageFormats) {
        const img = new Image();
        img.onload = function() {
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                heroSection.style.position = 'relative';
                const bgImg = document.createElement('div');
                bgImg.className = 'hero-bg-image';
                bgImg.style.backgroundImage = `url('assets/images/backgrounds/hero-bg.${format}')`;
                bgImg.style.cssText = 'background-size:cover;background-position:center;background-repeat:no-repeat';
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
    let savedTheme = localStorage.getItem('theme') || 'dark';
    const savedLang = localStorage.getItem('language') || 'es';
    
    // Si el tema guardado es 'fallout', cambiarlo a 'dark'
    if (savedTheme === 'fallout') {
        savedTheme = 'dark';
        localStorage.setItem('theme', 'dark');
    }
    
    // Aplicar tema inicial (solo dark o light)
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
        'hero.title': 'Hola, Soy Oscar de la Cruz',
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
        'hero.title': 'Hi, I\'m Oscar de la Cruz',
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
    // Verificar si la terminal está activa
    const terminalActive = document.body.classList.contains('terminal-active');
    
    if (terminalActive) {
        // No permitir cambio de tema cuando terminal está activa
        showTerminalMessage('CANNOT CHANGE THEME - TERMINAL ACTIVE');
        return;
    }
    
    // Solo ciclar entre dark y light
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Aplicar nuevo tema
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Actualizar icono
    updateThemeIcon(newTheme);
    
    // Guardar preferencia
    localStorage.setItem('theme', newTheme);
    
    // Animación de transición
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('#themeToggle i');
    if (theme === 'light') {
        themeIcon.className = 'fas fa-sun';
    } else {
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

// Terminal Pip-Boy
function initPipboyTerminal() {
    // Crear terminal flotante dinámicamente
    createFloatingTerminal();
    
    // Event listeners para botones flotantes
    const floatBtn = document.getElementById('pipboyFloat');
    const terminalToggleBtn = document.getElementById('terminalToggle');
    
    if (floatBtn) {
        floatBtn.addEventListener('click', toggleFloatingTerminal);
    }
    
    if (terminalToggleBtn) {
        terminalToggleBtn.addEventListener('click', toggleFloatingTerminal);
    }
}

function createFloatingTerminal() {
    // Crear estructura HTML de la terminal flotante
    const terminalHTML = `
        <div id="pipboy-floating-terminal" class="pipboy-floating-terminal">
            <div class="pipboy-floating-header">
                <span>ROBCO INDUSTRIES</span>
                <button class="minimize-btn" id="minimize-terminal">_</button>
                <button class="close-floating-btn" id="close-floating-terminal">X</button>
            </div>
            <div class="pipboy-floating-content" id="floating-terminal-output">
                <div class="terminal-line">ROBCO INDUSTRIES PIP-BOY v3.0.1</div>
                <div class="terminal-line">Type "help" for commands</div>
                <div class="terminal-line">&gt;</div>
            </div>
            <div class="terminal-input-container">
                <div class="terminal-input-line">
                    <span class="terminal-prompt">&gt;</span>
                    <input type="text" class="terminal-input" placeholder="Enter command..." autocomplete="off">
                </div>
            </div>
            <div class="pipboy-floating-controls">
                <button class="minimize-btn" id="clear-floating-terminal">CLEAR</button>
                <button class="minimize-btn" id="help-floating-terminal">HELP</button>
            </div>
        </div>
    `;
    
    // Insertar en el body
    document.body.insertAdjacentHTML('beforeend', terminalHTML);
    
    // Inicializar funcionalidad
    initFloatingTerminalEvents();
    updateFloatingTime();
    setInterval(updateFloatingTime, 1000);
}

// Variables globales para la terminal
let commandHistory = [];
let historyIndex = -1;

// Función para crear el juego de Asteroids
function createAsteroidsGame() {
    // Crear ventana modal del juego
    const gameModal = document.createElement('div');
    gameModal.className = 'asteroids-game-modal';
    gameModal.innerHTML = `
        <div class="asteroids-game-container">
            <div class="asteroids-game-header">
                <h3>🚀 ASTEROIDS</h3>
                <button class="close-game-btn" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
            <div class="asteroids-game-screen">
                <canvas id="asteroids-canvas" width="600" height="400"></canvas>
                <div class="game-overlay">
                    <div class="game-score">SCORE: <span id="game-score">0</span></div>
                    <div class="game-lives">LIVES: <span id="game-lives">3</span></div>
                </div>
            </div>
            <div class="asteroids-game-controls">
                <div class="control-info">
                    <p>← → MOVE | SPACE: SHOOT | P: PAUSE</p>
                </div>
            </div>
        </div>
    `;
    
    // Añadir estilos CSS para el juego
    const gameStyles = document.createElement('style');
    gameStyles.textContent = `
        .asteroids-game-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--bg-secondary);
            border: 2px solid var(--terminal-green);
            border-radius: var(--border-radius-md);
            z-index: 10000;
            box-shadow: 0 0 30px var(--crt-glow);
            font-family: 'Courier New', monospace;
            color: var(--terminal-green);
        }
        
        .asteroids-game-container {
            width: 650px;
            height: 500px;
            position: relative;
        }
        
        .asteroids-game-header {
            background: var(--bg-primary);
            padding: 10px;
            border-bottom: 1px solid var(--terminal-green);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .asteroids-game-header h3 {
            margin: 0;
            color: var(--terminal-green);
            font-size: 1.2rem;
            text-shadow: 0 0 10px var(--crt-glow);
        }
        
        .close-game-btn {
            background: none;
            border: 1px solid var(--terminal-green);
            color: var(--terminal-green);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 5px 10px;
            border-radius: 3px;
            transition: all 0.3s ease;
        }
        
        .close-game-btn:hover {
            background: var(--terminal-green);
            color: var(--bg-primary);
            box-shadow: 0 0 10px var(--crt-glow);
        }
        
        .asteroids-game-screen {
            position: relative;
            background: #000;
            border: 2px solid var(--terminal-green);
            margin: 10px;
            border-radius: var(--border-radius-sm);
        }
        
        #asteroids-canvas {
            display: block;
            background: #000;
            image-rendering: pixelated;
            image-rendering: crisp-edges;
        }
        
        .game-overlay {
            position: absolute;
            top: 10px;
            left: 10px;
            right: 10px;
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
            color: var(--terminal-green);
            text-shadow: 0 0 5px var(--crt-glow);
        }
        
        .asteroids-game-controls {
            background: var(--bg-primary);
            padding: 10px;
            border-top: 1px solid var(--terminal-green);
            text-align: center;
        }
        
        .control-info p {
            margin: 0;
            color: var(--terminal-green);
            font-size: 0.8rem;
            opacity: 0.8;
        }
        
        @keyframes gameGlow {
            0% { box-shadow: 0 0 20px var(--crt-glow); }
            100% { box-shadow: 0 0 30px var(--crt-glow); }
        }
        
        .asteroids-game-modal {
            animation: gameGlow 2s ease-in-out infinite alternate;
        }
    `;
    
    document.head.appendChild(gameStyles);
    document.body.appendChild(gameModal);
    
    // Inicializar el juego
    initAsteroidsGame();
}

// Función para inicializar el juego de Asteroids
function initAsteroidsGame() {
    const canvas = document.getElementById('asteroids-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let gameRunning = true;
    let gamePaused = false;
    let score = 0;
    let lives = 3;
    let level = 1;
    let gameOver = false;
    
    // Nave del jugador
    const ship = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        angle: -Math.PI / 2,
        vx: 0,
        vy: 0,
        size: 10,
        invulnerable: false,
        invulnerableTime: 0
    };
    
    // Asteroides
    let asteroids = [];
    function createAsteroids(count) {
        for (let i = 0; i < count; i++) {
            let x, y;
            do {
                x = Math.random() * canvas.width;
                y = Math.random() * canvas.height;
            } while (Math.hypot(x - ship.x, y - ship.y) < 100);
            
            asteroids.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 3,
                vy: (Math.random() - 0.5) * 3,
                size: 30 + Math.random() * 20,
                angle: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.1,
                vertices: generateAsteroidVertices()
            });
        }
    }
    
    function generateAsteroidVertices() {
        const vertices = [];
        const numVertices = 8 + Math.floor(Math.random() * 5);
        for (let i = 0; i < numVertices; i++) {
            const angle = (i / numVertices) * Math.PI * 2;
            const radius = 0.8 + Math.random() * 0.4;
            vertices.push({ angle, radius });
        }
        return vertices;
    }
    
    // Balas
    let bullets = [];
    
    // Partículas para explosiones
    let particles = [];
    
    function createExplosion(x, y, color = '#00ff41') {
        for (let i = 0; i < 20; i++) {
            particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: 30 + Math.random() * 20,
                color: color
            });
        }
    }
    
    // Controles
    const keys = {};
    document.addEventListener('keydown', (e) => {
        keys[e.key] = true;
        if (e.key === 'p' || e.key === 'P') {
            gamePaused = !gamePaused;
        }
    });
    document.addEventListener('keyup', (e) => keys[e.key] = false);
    
    // Funciones de colisión
    function checkCollision(obj1, obj2, radius1, radius2) {
        const dx = obj1.x - obj2.x;
        const dy = obj1.y - obj2.y;
        const distance = Math.hypot(dx, dy);
        return distance < radius1 + radius2;
    }
    
    function checkShipAsteroidCollision(ship, asteroid) {
        if (ship.invulnerable) return false;
        
        // Convertir coordenadas polares de la nave a cartesianas
        const shipPoints = [
            { x: ship.x + Math.cos(ship.angle) * ship.size, y: ship.y + Math.sin(ship.angle) * ship.size },
            { x: ship.x + Math.cos(ship.angle + 2.4) * ship.size, y: ship.y + Math.sin(ship.angle + 2.4) * ship.size },
            { x: ship.x + Math.cos(ship.angle - 2.4) * ship.size, y: ship.y + Math.sin(ship.angle - 2.4) * ship.size }
        ];
        
        for (let point of shipPoints) {
            if (checkCollision(point, asteroid, 0, asteroid.size)) {
                return true;
            }
        }
        return false;
    }
    
    function checkBulletAsteroidCollision(bullet, asteroid) {
        return checkCollision(bullet, asteroid, 2, asteroid.size);
    }
    
    // Dibujar nave triangular
    function drawShip() {
        ctx.save();
        ctx.translate(ship.x, ship.y);
        ctx.rotate(ship.angle);
        
        // Efecto de invulnerabilidad
        if (ship.invulnerable && Math.floor(ship.invulnerableTime / 5) % 2 === 0) {
            ctx.strokeStyle = '#00ff4180';
        } else {
            ctx.strokeStyle = '#00ff41';
        }
        
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        // Triángulo de la nave
        ctx.moveTo(ship.size, 0);
        ctx.lineTo(-ship.size, -ship.size * 0.7);
        ctx.lineTo(-ship.size * 0.5, 0);
        ctx.lineTo(-ship.size, ship.size * 0.7);
        ctx.closePath();
        ctx.stroke();
        
        // Motor de propulsión
        if (keys['ArrowUp']) {
            ctx.strokeStyle = '#ff6b35';
            ctx.beginPath();
            ctx.moveTo(-ship.size * 0.5, 0);
            ctx.lineTo(-ship.size * 1.5, -ship.size * 0.3);
            ctx.lineTo(-ship.size * 1.5, ship.size * 0.3);
            ctx.closePath();
            ctx.stroke();
        }
        
        ctx.restore();
    }
    
    // Dibujar asteroide
    function drawAsteroid(asteroid) {
        ctx.save();
        ctx.translate(asteroid.x, asteroid.y);
        ctx.rotate(asteroid.angle);
        ctx.strokeStyle = '#00ff41';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        for (let i = 0; i < asteroid.vertices.length; i++) {
            const vertex = asteroid.vertices[i];
            const x = Math.cos(vertex.angle) * asteroid.size * vertex.radius;
            const y = Math.sin(vertex.angle) * asteroid.size * vertex.radius;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }
    
    // Dividir asteroide
    function splitAsteroid(asteroid) {
        if (asteroid.size < 15) return [];
        
        const newAsteroids = [];
        const numPieces = asteroid.size < 25 ? 2 : 3;
        
        for (let i = 0; i < numPieces; i++) {
            newAsteroids.push({
                x: asteroid.x,
                y: asteroid.y,
                vx: asteroid.vx + (Math.random() - 0.5) * 4,
                vy: asteroid.vy + (Math.random() - 0.5) * 4,
                size: asteroid.size / 2,
                angle: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.2,
                vertices: generateAsteroidVertices()
            });
        }
        
        return newAsteroids;
    }
    
    // Reiniciar juego
    function resetShip() {
        ship.x = canvas.width / 2;
        ship.y = canvas.height / 2;
        ship.angle = -Math.PI / 2;
        ship.vx = 0;
        ship.vy = 0;
        ship.invulnerable = true;
        ship.invulnerableTime = 120;
    }
    
    // Game Over
    function gameOverScreen() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff41';
        ctx.font = 'bold 30px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 30);
        
        ctx.font = '20px Courier New';
        ctx.fillText(`FINAL SCORE: ${score}`, canvas.width / 2, canvas.height / 2 + 10);
        
        ctx.font = '16px Courier New';
        ctx.fillText('Press R to restart', canvas.width / 2, canvas.height / 2 + 50);
    }
    
    // Bucle del juego
    function gameLoop() {
        if (!gameRunning) return;
        
        if (gamePaused) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#00ff41';
            ctx.font = 'bold 30px Courier New';
            ctx.textAlign = 'center';
            ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
            requestAnimationFrame(gameLoop);
            return;
        }
        
        if (gameOver) {
            if (keys['r'] || keys['R']) {
                // Reiniciar juego
                gameOver = false;
                score = 0;
                lives = 3;
                level = 1;
                asteroids = [];
                bullets = [];
                particles = [];
                resetShip();
                createAsteroids(4);
            }
            gameOverScreen();
            requestAnimationFrame(gameLoop);
            return;
        }
        
        // Limpiar canvas
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Actualizar nave
        if (keys['ArrowLeft']) ship.angle -= 0.1;
        if (keys['ArrowRight']) ship.angle += 0.1;
        if (keys['ArrowUp']) {
            ship.vx += Math.cos(ship.angle) * 0.5;
            ship.vy += Math.sin(ship.angle) * 0.5;
        }
        
        // Aplicar fricción
        ship.vx *= 0.98;
        ship.vy *= 0.98;
        ship.x += ship.vx;
        ship.y += ship.vy;
        
        // Actualizar invulnerabilidad
        if (ship.invulnerable) {
            ship.invulnerableTime--;
            if (ship.invulnerableTime <= 0) {
                ship.invulnerable = false;
            }
        }
        
        // Mantener nave en pantalla
        if (ship.x < 0) ship.x = canvas.width;
        if (ship.x > canvas.width) ship.x = 0;
        if (ship.y < 0) ship.y = canvas.height;
        if (ship.y > canvas.height) ship.y = 0;
        
        // Dibujar nave
        drawShip();
        
        // Actualizar y dibujar asteroides
        asteroids = asteroids.filter(asteroid => {
            asteroid.x += asteroid.vx;
            asteroid.y += asteroid.vy;
            asteroid.angle += asteroid.rotationSpeed;
            
            // Mantener asteroides en pantalla
            if (asteroid.x < 0) asteroid.x = canvas.width;
            if (asteroid.x > canvas.width) asteroid.x = 0;
            if (asteroid.y < 0) asteroid.y = canvas.height;
            if (asteroid.y > canvas.height) asteroid.y = 0;
            
            // Colisión con la nave
            if (checkShipAsteroidCollision(ship, asteroid)) {
                lives--;
                createExplosion(ship.x, ship.y, '#ff6b35');
                resetShip();
                
                if (lives <= 0) {
                    gameOver = true;
                }
            }
            
            drawAsteroid(asteroid);
            return true;
        });
        
        // Actualizar y dibujar balas
        bullets = bullets.filter(bullet => {
            bullet.x += bullet.vx;
            bullet.y += bullet.vy;
            bullet.life--;
            
            // Eliminar balas fuera de pantalla o sin vida
            if (bullet.x < 0 || bullet.x > canvas.width || 
                bullet.y < 0 || bullet.y > canvas.height || 
                bullet.life <= 0) {
                return false;
            }
            
            // Colisión con asteroides
            for (let i = 0; i < asteroids.length; i++) {
                if (checkBulletAsteroidCollision(bullet, asteroids[i])) {
                    createExplosion(asteroids[i].x, asteroids[i].y);
                    
                    // Dividir asteroide
                    const newAsteroids = splitAsteroid(asteroids[i]);
                    asteroids.splice(i, 1);
                    asteroids.push(...newAsteroids);
                    
                    // Actualizar puntuación
                    score += Math.floor(50 / (asteroids[i].size / 10));
                    
                    return false;
                }
            }
            
            // Dibujar bala
            ctx.fillStyle = '#00ff41';
            ctx.fillRect(bullet.x - 2, bullet.y - 2, 4, 4);
            return true;
        });
        
        // Disparar balas
        if (keys[' ']) {
            keys[' '] = false;
            bullets.push({
                x: ship.x + Math.cos(ship.angle) * ship.size,
                y: ship.y + Math.sin(ship.angle) * ship.size,
                vx: Math.cos(ship.angle) * 10,
                vy: Math.sin(ship.angle) * 10,
                life: 30
            });
        }
        
        // Actualizar y dibujar partículas
        particles = particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vx *= 0.98;
            particle.vy *= 0.98;
            particle.life--;
            
            if (particle.life <= 0) return false;
            
            ctx.fillStyle = particle.color + Math.floor((particle.life / 50) * 255).toString(16).padStart(2, '0');
            ctx.fillRect(particle.x - 1, particle.y - 1, 2, 2);
            return true;
        });
        
        // Verificar si se completó el nivel
        if (asteroids.length === 0) {
            level++;
            createAsteroids(3 + level);
        }
        
        // Actualizar UI
        document.getElementById('game-score').textContent = score;
        document.getElementById('game-lives').textContent = lives;
        
        requestAnimationFrame(gameLoop);
    }
    
    // Inicializar juego
    createAsteroids(4);
    gameLoop();
}

// Función global para manejar comandos de terminal
function handleTerminalCommand(command) {
    const cmd = command.toLowerCase().trim();
    
    // Comandos de la terminal
    switch (cmd) {
        case 'help':
            addFloatingLineWithTyping('Available commands:', 'info', () => {
                addFloatingLine('  help     - Show this help message', 'info');
                addFloatingLine('  clear    - Clear terminal screen', 'info');
                addFloatingLine('  about    - Show about information', 'info');
                addFloatingLine('  projects - List projects', 'info');
                addFloatingLine('  skills   - Show skills', 'info');
                addFloatingLine('  contact  - Show contact information', 'info');
                addFloatingLine('  radio    - Open Fallout Radio', 'info');
                addFloatingLine('  play     - Entertainment system', 'info');
                addFloatingLine('  time     - Show current time', 'info');
                addFloatingLine('  status   - Show system status', 'info');
                setTimeout(() => addFloatingLine('>'), 100);
            });
            break;
            
        case 'play':
            addFloatingLineWithTyping('Launching entertainment system...', 'info', () => {
                addFloatingLine('ROBCO INDUSTRIES - ENTERTAINMENT MODULE', 'success');
                addFloatingLine('VERSION: 1.0.1 - ARCADE GAMES', 'success');
                addFloatingLine('STATUS: INITIALIZING...', 'warning');
                
                setTimeout(() => {
                    addFloatingLineWithTyping('ENTERTAINMENT SYSTEM READY', 'success', () => {
                        addFloatingLine('AVAILABLE GAMES:', 'info');
                        addFloatingLine('  asteroids - Classic arcade game', 'info');
                        addFloatingLine('  Coming soon: More games...', 'info');
                        addFloatingLine('SELECT GAME TO PLAY:', 'info');
                        addFloatingLine('> Type "play asteroids" to start', 'info');
                        setTimeout(() => addFloatingLine('>'), 100);
                    });
                }, 2000);
            });
            break;
            
        case 'play asteroids':
            addFloatingLineWithTyping('Initializing ASTEROIDS game...', 'info', () => {
                addFloatingLine('ROBCO INDUSTRIES - PIP-BOY 3000 GAME SYSTEM', 'success');
                addFloatingLine('VERSION: 1.0.1 - ASTEROIDS CLONE', 'success');
                addFloatingLine('STATUS: LOADING...', 'warning');
                
                setTimeout(() => {
                    addFloatingLineWithTyping('GAME LOADED SUCCESSFULLY!', 'success', () => {
                        addFloatingLine('CONTROLS:', 'info');
                        addFloatingLine('  LEFT KNOB: TURN LEFT', 'info');
                        addFloatingLine('  RIGHT KNOB: TURN RIGHT', 'info');
                        addFloatingLine('  FIRE BUTTON: SHOOT', 'info');
                        addFloatingLine('  POWER BUTTON: EXIT GAME', 'info');
                        addFloatingLine('SCORE: 0 | HIGH SCORE: 10000', 'warning');
                        
                        setTimeout(() => {
                            addFloatingLineWithTyping('STARTING GAME...', 'info', () => {
                                addFloatingLine('ASTEROIDS GAME ACTIVATED!', 'success');
                                addFloatingLine('Use arrow keys to move, SPACE to shoot!', 'info');
                                addFloatingLine('Good luck, Vault Dweller!', 'success');
                                
                                // Crear ventana de juego
                                createAsteroidsGame();
                                
                                setTimeout(() => addFloatingLine('>'), 500);
                            });
                        }, 1500);
                    });
                }, 2000);
            });
            break;
            
        case 'clear':
            const output = document.getElementById('floating-terminal-output');
            output.innerHTML = '<div class="terminal-line">ROBCO INDUSTRIES PIP-BOY v3.0.1</div><div class="terminal-line">Type "help" for commands</div><div class="terminal-line">&gt;</div>';
            saveTerminalState();
            break;
            
        case 'about':
            addFloatingLineWithTyping('ROBCO INDUSTRIES UNIFIED TERMINAL', 'success', () => {
                addFloatingLine('Version 3.0.1 - Fallout Edition', 'success');
                addFloatingLine('© 2077 RobCo Industries', 'success');
                addFloatingLine('All rights reserved', 'success');
                setTimeout(() => addFloatingLine('>'), 100);
            });
            break;
            
        case 'projects':
            addFloatingLineWithTyping('Installed Projects:', 'info', () => {
                addFloatingLine('  > All-in-One Bot [ACTIVE]', 'success');
                addFloatingLine('  > Portfolio Website [ACTIVE]', 'success');
                addFloatingLine('  > Terminal Interface [ACTIVE]', 'success');
                setTimeout(() => addFloatingLine('>'), 100);
            });
            break;
            
        case 'skills':
            addFloatingLineWithTyping('Technical Skills:', 'info', () => {
                addFloatingLine('  > JavaScript: EXPERT', 'success');
                addFloatingLine('  > Python: ADVANCED', 'success');
                addFloatingLine('  > Web Development: EXPERT', 'success');
                addFloatingLine('  > System Administration: ADVANCED', 'success');
                setTimeout(() => addFloatingLine('>'), 100);
            });
            break;
            
        case 'contact':
            addFloatingLineWithTyping('Contact Information:', 'info', () => {
                addFloatingLine('  > Email: contact@example.com', 'info');
                addFloatingLine('  > GitHub: @username', 'info');
                addFloatingLine('  > LinkedIn: /in/username', 'info');
                setTimeout(() => addFloatingLine('>'), 100);
            });
            break;
            
        case 'radio':
            addFloatingLineWithTyping('Initializing Fallout Radio...', 'info', () => {
                addFloatingLine('ROBCO PIPMAN 3000 ONLINE', 'success');
                if (falloutRadio) {
                    falloutRadio.show();
                    addFloatingLine('Radio interface loaded', 'success');
                } else {
                    addFloatingLine('ERROR: Radio system not available', 'error');
                }
                setTimeout(() => addFloatingLine('>'), 100);
            });
            break;
            
        case 'time':
            const now = new Date();
            addFloatingLineWithTyping(`Current time: ${now.toLocaleTimeString()}`, 'info', () => {
                addFloatingLine(`Date: ${now.toLocaleDateString()}`, 'info');
                setTimeout(() => addFloatingLine('>'), 100);
            });
            break;
            
        case 'status':
            addFloatingLineWithTyping('System Status:', 'info', () => {
                addFloatingLine('  > Terminal: ONLINE', 'success');
                addFloatingLine('  > Theme: FALLOUT MODE', 'success');
                addFloatingLine('  > Radio: STANDBY', 'warning');
                addFloatingLine('  > Connection: STABLE', 'success');
                setTimeout(() => addFloatingLine('>'), 100);
            });
            break;
            
        default:
            addFloatingLineWithTyping(`Command not recognized: ${cmd}`, 'error', () => {
                addFloatingLine('Type "help" for available commands', 'warning');
                setTimeout(() => addFloatingLine('>'), 100);
            });
    }
}

function initFloatingTerminalEvents() {
    const terminal = document.getElementById('pipboy-floating-terminal');
    const minimizeBtn = document.getElementById('minimize-terminal');
    const closeBtn = document.getElementById('close-floating-terminal');
    const clearBtn = document.getElementById('clear-floating-terminal');
    const helpBtn = document.getElementById('help-floating-terminal');
    const output = document.getElementById('floating-terminal-output');
    
    if (!terminal) return;
    
    let isMinimized = false;
    
    // Configurar el input fijo
    function setupFixedInput() {
        const inputContainer = document.querySelector('.terminal-input-container');
        const inputField = inputContainer.querySelector('.terminal-input');
        
        // Event listeners
        inputField.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const command = inputField.value.trim().toLowerCase();
                if (command) {
                    addFloatingLine(`&gt; ${command}`, 'command');
                    commandHistory.push(command);
                    historyIndex = commandHistory.length;
                    
                    handleTerminalCommand(command);
                    
                    inputField.value = '';
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    inputField.value = commandHistory[historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    inputField.value = commandHistory[historyIndex];
                }
            }
        });
        
        inputField.focus();
    }
    
    // Configurar el input fijo en lugar de crear inputs dinámicos
    setupFixedInput();
    
    // Botones
    minimizeBtn.addEventListener('click', () => {
        isMinimized = !isMinimized;
        terminal.classList.toggle('minimized');
        minimizeBtn.textContent = isMinimized ? '□' : '_';
    });
    
    closeBtn.addEventListener('click', () => {
        terminal.remove();
        const floatBtn = document.getElementById('pipboyFloat');
        if (floatBtn) {
            floatBtn.style.display = 'none';
        }
    });
    
    clearBtn.addEventListener('click', () => {
        commands.clear();
    });
    
    helpBtn.addEventListener('click', () => {
        commands.help();
    });
}

function addFloatingLine(text, type = 'default') {
    const output = document.getElementById('floating-terminal-output');
    if (output) {
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        line.textContent = text;
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
        
        // Guardar estado de la terminal
        saveTerminalState();
        
        // Añadir efecto de glitch aleatorio
        if (Math.random() < 0.1) {
            setTimeout(() => {
                line.classList.add('glitch-effect');
                setTimeout(() => {
                    line.classList.remove('glitch-effect');
                }, 300);
            }, Math.random() * 2000);
        }
    }
}

function saveTerminalState() {
    const output = document.getElementById('floating-terminal-output');
    if (output) {
        const content = output.innerHTML;
        stateManager.saveTerminalState(content, commandHistory);
    }
}

function restoreTerminalState() {
    const savedState = stateManager.loadTerminalState();
    if (savedState.content) {
        const output = document.getElementById('floating-terminal-output');
        if (output) {
            output.innerHTML = savedState.content;
            output.scrollTop = output.scrollHeight;
        }
    }
    
    // Restaurar historial
    if (savedState.history.length > 0) {
        commandHistory = savedState.history;
        historyIndex = commandHistory.length;
    }
}

function addFloatingLineWithTyping(text, type = 'default', callback) {
    const output = document.getElementById('floating-terminal-output');
    if (output) {
        const line = document.createElement('div');
        line.className = `terminal-line ${type} typing-effect`;
        output.appendChild(line);
        
        let index = 0;
        const typingSpeed = 30;
        
        function typeChar() {
            if (index < text.length) {
                line.textContent = text.substring(0, index + 1);
                index++;
                output.scrollTop = output.scrollHeight;
                setTimeout(typeChar, typingSpeed);
            } else {
                line.classList.remove('typing-effect');
                if (callback) callback();
            }
        }
        
        typeChar();
    }
}

function updateFloatingTime() {
    const timeElement = document.querySelector('.pipboy-floating-header span:first-child');
    if (timeElement) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

function toggleFloatingTerminal() {
    const terminal = document.getElementById('pipboy-floating-terminal');
    const terminalToggleBtn = document.getElementById('terminalToggle');
    const themeToggleBtn = document.getElementById('themeToggle');
    
    if (!terminal) {
        createFloatingTerminal();
        const floatBtn = document.getElementById('pipboyFloat');
        if (floatBtn) {
            floatBtn.style.display = 'none';
        }
        return;
    }
    
    if (terminal.style.display === 'none' || terminal.style.display === '') {
        // Activar terminal y tema Fallout
        terminal.style.display = 'block';
        document.body.classList.add('terminal-active');
        
        // Activar tema Fallout
        document.documentElement.setAttribute('data-theme', 'fallout');
        localStorage.setItem('theme', 'fallout');
        stateManager.saveThemeState(true);
        
        // Actualizar botones
        const floatBtn = document.getElementById('pipboyFloat');
        if (floatBtn) {
            floatBtn.style.display = 'none';
        }
        
        if (terminalToggleBtn) {
            terminalToggleBtn.classList.add('terminal-active');
        }
        
        // Inhabilitar botón de tema
        if (themeToggleBtn) {
            themeToggleBtn.style.opacity = '0.3';
            themeToggleBtn.style.pointerEvents = 'none';
            themeToggleBtn.style.cursor = 'not-allowed';
        }
        
        // Guardar visibilidad de terminal
        stateManager.saveTerminalVisible(true);
        
        // Efectos de sonido y mensaje
        playTerminalSound();
        showTerminalMessage('SYSTEM MODE: FALLOUT - TERMINAL ACTIVATED');
        addFloatingLine('Type "help" for available commands');
        
    } else {
        // Desactivar terminal y volver al tema anterior
        terminal.style.display = 'none';
        document.body.classList.remove('terminal-active');
        
        // Volver al tema dark por defecto
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        stateManager.saveThemeState(false);
        
        // Actualizar icono de tema
        updateThemeIcon('dark');
        
        // Restaurar botones
        const floatBtn = document.getElementById('pipboyFloat');
        if (floatBtn) {
            floatBtn.style.display = 'flex';
        }
        
        if (terminalToggleBtn) {
            terminalToggleBtn.classList.remove('terminal-active');
        }
        
        // Rehabilitar botón de tema
        if (themeToggleBtn) {
            themeToggleBtn.style.opacity = '1';
            themeToggleBtn.style.pointerEvents = 'auto';
            themeToggleBtn.style.cursor = 'pointer';
        }
        
        // Guardar visibilidad de terminal
        stateManager.saveTerminalVisible(false);
        
        showTerminalMessage('TERMINAL DEACTIVATED - RETURNING TO NORMAL MODE');
    }
}

function addTerminalLine(text) {
    const output = document.getElementById('floating-terminal-output');
    if (output) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.textContent = text;
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    }
}

function updatePipboyTime() {
    const timeElement = document.querySelector('.pipboy-floating-header span:first-child');
    if (timeElement) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

function showPipboyTerminal() {
    const terminal = document.getElementById('pipboy-floating-terminal');
    if (terminal) {
        terminal.style.display = 'block';
        addFloatingLine('TERMINAL ACTIVATED');
        addFloatingLine('Type "help" for available commands');
    }
}

function hidePipboyTerminal() {
    const terminal = document.getElementById('pipboy-floating-terminal');
    if (terminal) {
        terminal.style.display = 'none';
    }
}

// Sistema de persistencia de estado
class StateManager {
    constructor() {
        this.keys = {
            terminalContent: 'pipboy_terminal_content',
            terminalHistory: 'pipboy_terminal_history',
            radioStation: 'pipboy_radio_station',
            radioVolume: 'pipboy_radio_volume',
            radioPower: 'pipboy_radio_power',
            radioPlaying: 'pipboy_radio_playing',
            falloutTheme: 'pipboy_fallout_theme',
            terminalVisible: 'pipboy_terminal_visible'
        };
    }

    saveTerminalState(content, history) {
        try {
            localStorage.setItem(this.keys.terminalContent, content);
            localStorage.setItem(this.keys.terminalHistory, JSON.stringify(history));
        } catch (error) {
            console.warn('Error saving terminal state:', error);
        }
    }

    loadTerminalState() {
        try {
            const content = localStorage.getItem(this.keys.terminalContent);
            const history = JSON.parse(localStorage.getItem(this.keys.terminalHistory) || '[]');
            return { content, history };
        } catch (error) {
            console.warn('Error loading terminal state:', error);
            return { content: null, history: [] };
        }
    }

    saveRadioState(station, volume, power, playing) {
        try {
            localStorage.setItem(this.keys.radioStation, station || '');
            localStorage.setItem(this.keys.radioVolume, volume.toString());
            localStorage.setItem(this.keys.radioPower, power.toString());
            localStorage.setItem(this.keys.radioPlaying, playing.toString());
        } catch (error) {
            console.warn('Error saving radio state:', error);
        }
    }

    loadRadioState() {
        try {
            return {
                station: localStorage.getItem(this.keys.radioStation),
                volume: parseInt(localStorage.getItem(this.keys.radioVolume) || '50'),
                power: localStorage.getItem(this.keys.radioPower) === 'true',
                playing: localStorage.getItem(this.keys.radioPlaying) === 'true'
            };
        } catch (error) {
            console.warn('Error loading radio state:', error);
            return { station: null, volume: 50, power: false, playing: false };
        }
    }

    saveThemeState(isFallout) {
        try {
            localStorage.setItem(this.keys.falloutTheme, isFallout.toString());
        } catch (error) {
            console.warn('Error saving theme state:', error);
        }
    }

    loadThemeState() {
        try {
            return localStorage.getItem(this.keys.falloutTheme) === 'true';
        } catch (error) {
            console.warn('Error loading theme state:', error);
            return false;
        }
    }

    saveTerminalVisible(visible) {
        try {
            localStorage.setItem(this.keys.terminalVisible, visible.toString());
        } catch (error) {
            console.warn('Error saving terminal visibility:', error);
        }
    }

    loadTerminalVisible() {
        try {
            return localStorage.getItem(this.keys.terminalVisible) === 'true';
        } catch (error) {
            console.warn('Error loading terminal visibility:', error);
            return false;
        }
    }

    clearAll() {
        try {
            Object.values(this.keys).forEach(key => {
                localStorage.removeItem(key);
            });
        } catch (error) {
            console.warn('Error clearing state:', error);
        }
    }
}

// Instancia global del gestor de estado
const stateManager = new StateManager();

// Sistema de Radio de Fallout
class FalloutRadio {
    constructor() {
        this.stations = {
            DX01: { name: "Galaxy News Radio", freq: 87.5, url: "https://stations.fallout.radio/listen/fallout_3_-_galaxy_news_radio/radio.mp3" },
            DX02: { name: "Enclave Radio", freq: 88.7, url: "https://stations.fallout.radio/listen/fallout_3_-_enclave_radio/radio.mp3" },
            DX03: { name: "Agatha's Station", freq: 89.3, url: "https://stations.fallout.radio/listen/fallout_3_-_agathas_station/radio.mp3" },
            MX01: { name: "Vault 101 PA System", freq: 90.1, url: "https://stations.fallout.radio/listen/fallout_3_-_vault_101_pa_system/radio.mp3" },
            MX02: { name: "Mojave Music Radio", freq: 91.5, url: "https://stations.fallout.radio/listen/fallout_new_vegas_-_mojave_music_radio/radio.mp3" },
            MX03: { name: "Radio New Vegas", freq: 92.3, url: "https://stations.fallout.radio/listen/fallout_new_vegas_-_radio_new_vegas/radio.mp3" },
            MX04: { name: "Black Mountain Radio", freq: 93.7, url: "https://stations.fallout.radio/listen/fallout_new_vegas_-_black_mountain_radio/radio.mp3" },
            MX05: { name: "Mysterious Broadcast", freq: 94.5, url: "https://stations.fallout.radio/listen/fallout_new_vegas_-_mysterious_broadcast/radio.mp3" },
            MX06: { name: "Diamond City Radio", freq: 95.3, url: "https://stations.fallout.radio/listen/fallout_4_-_diamond_city_radio/radio.mp3" },
            MX07: { name: "Classical Radio", freq: 96.1, url: "https://stations.fallout.radio/listen/fallout_4_-_classical_radio/radio.mp3" },
            MX08: { name: "Vault 101 Emergency", freq: 97.9, url: "https://stations.fallout.radio/listen/fallout_3_-_vault_101_pa_system/radio.mp3" }
        };
        
        this.currentStation = null;
        this.isPlaying = false;
        this.volume = 50;
        this.audioElement = null;
        this.iframeElement = null;
        this.powerOn = false;
        
        this.init();
    }
    
    init() {
        this.audioElement = document.getElementById('radio-audio');
        this.iframeElement = document.getElementById('tunein-iframe');
        this.setupEventListeners();
        
        // Restaurar estado guardado
        this.restoreState();
    }
    
    restoreState() {
        const savedState = stateManager.loadRadioState();
        
        if (savedState.power) {
            this.powerOn = savedState.power;
            this.volume = savedState.volume;
            
            // Actualizar UI
            const powerBtn = document.getElementById('radio-power');
            if (powerBtn) {
                powerBtn.classList.add('active');
            }
            
            // Restaurar volumen
            const volumeSlider = document.getElementById('volume-slider');
            const volumeValue = document.getElementById('volume-value');
            if (volumeSlider && volumeValue) {
                volumeSlider.value = this.volume;
                volumeValue.textContent = this.volume;
            }
            
            // Si había una estación guardada, restaurarla
            if (savedState.station && this.stations[savedState.station]) {
                setTimeout(() => {
                    this.selectStation(savedState.station);
                }, 1000);
            }
        }
    }
    
    saveState() {
        stateManager.saveRadioState(
            this.currentStation ? Object.keys(this.stations).find(key => this.stations[key] === this.currentStation) : null,
            this.volume,
            this.powerOn,
            this.isPlaying
        );
    }
    
    setupEventListeners() {
        // Botones de estaciones
        document.querySelectorAll('.station-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const station = btn.dataset.station;
                this.selectStation(station);
            });
        });
        
        // Control de volumen
        const volumeSlider = document.getElementById('volume-slider');
        volumeSlider.addEventListener('input', (e) => {
            this.setVolume(e.target.value);
        });
        
        // Botón de power
        document.getElementById('radio-power').addEventListener('click', () => {
            this.togglePower();
        });
        
        // Botón de cerrar
        document.getElementById('radio-close').addEventListener('click', () => {
            this.hide();
        });
        
        // Eventos del audio
        this.audioElement.addEventListener('loadstart', () => {
            this.updateSignalStrength(1);
        });
        
        this.audioElement.addEventListener('canplay', () => {
            this.updateSignalStrength(5);
        });
        
        this.audioElement.addEventListener('error', () => {
            this.updateSignalStrength(0);
            this.showStationInfo("SIGNAL LOST", "NO CONNECTION");
        });
    }
    
    togglePower() {
        this.powerOn = !this.powerOn;
        const powerBtn = document.getElementById('radio-power');
        
        if (this.powerOn) {
            powerBtn.classList.add('active');
            this.showStationInfo("RADIO ONLINE", "SELECT STATION");
            playTerminalSound();
        } else {
            powerBtn.classList.remove('active');
            this.stopRadio();
            this.showStationInfo("--- OFF AIR ---", "NO SIGNAL");
            this.updateSignalStrength(0);
        }
        
        // Guardar estado
        this.saveState();
    }
    
    selectStation(stationId) {
        if (!this.powerOn) {
            this.togglePower();
        }
        
        const station = this.stations[stationId];
        if (!station) return;
        
        // Actualizar UI
        document.querySelectorAll('.station-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-station="${stationId}"]`).classList.add('active');
        
        // Actualizar display
        document.getElementById('radio-freq').textContent = station.freq.toFixed(1);
        this.showStationInfo(station.name, "TUNING...");
        
        // Reproducir estación
        this.playStation(station);
        
        // Guardar estado
        this.saveState();
    }
    
    async playStation(station) {
        this.stopRadio();
        
        try {
            // Mostrar estado de carga
            this.showStationInfo(station.name, "LOADING...");
            this.updateSignalStrength(2);
            
            // Configurar el audio con el stream real de Fallout
            this.audioElement.src = station.url;
            this.audioElement.crossOrigin = "anonymous";
            this.audioElement.volume = this.volume / 100;
            
            // Intentar reproducir
            await this.audioElement.play();
            
            this.currentStation = station;
            this.isPlaying = true;
            
            // Actualizar UI cuando comience a reproducir
            this.showStationInfo(station.name, "PLAYING");
            this.updateSignalStrength(5);
            
            // Guardar estado
            this.saveState();
            
            // Manejar eventos de audio
            this.audioElement.addEventListener('playing', () => {
                this.showStationInfo(station.name, "PLAYING");
                this.updateSignalStrength(5);
            });
            
            this.audioElement.addEventListener('waiting', () => {
                this.showStationInfo(station.name, "BUFFERING...");
                this.updateSignalStrength(3);
            });
            
            this.audioElement.addEventListener('error', (e) => {
                console.error('Audio error:', e);
                this.showStationInfo(station.name, "CONNECTION ERROR");
                this.updateSignalStrength(0);
                this.isPlaying = false;
            });
            
        } catch (error) {
            console.error('Error playing station:', error);
            this.showStationInfo(station.name, "FAILED TO LOAD");
            this.updateSignalStrength(0);
            this.isPlaying = false;
        }
    }
    
    tryFallbackStation(originalStation) {
        // URLs de streaming gratuitas que deberían funcionar
        const fallbackStations = [
            "https://stream.zeno.fm/94r6m8r7t8zuv",
            "https://stream.zeno.fm/3s9p7r6t4z8uv",
            "https://stream.zeno.fm/7s8p9r6t2z8uv",
            "https://icecast.radiomast.io/e9rr69c8v8zuv",
            "https://stream.laut.fm/laut"
        ];
        
        const randomFallback = fallbackStations[Math.floor(Math.random() * fallbackStations.length)];
        
        this.audioElement.src = randomFallback;
        this.audioElement.crossOrigin = "anonymous";
        this.audioElement.volume = this.volume / 100;
        
        this.audioElement.play().then(() => {
            this.showStationInfo(originalStation.name, "PLAYING (FALLBACK)");
            this.updateSignalStrength(3);
            this.currentStation = originalStation;
            this.isPlaying = true;
        }).catch(error => {
            console.error('Fallback also failed:', error);
            this.showStationInfo(originalStation.name, "ALL STREAMS FAILED");
            this.updateSignalStrength(0);
        });
    }
    
    stopRadio() {
        if (this.audioElement) {
            this.audioElement.pause();
            this.audioElement.src = '';
        }
        this.isPlaying = false;
        this.currentStation = null;
    }
    
    setVolume(value) {
        this.volume = value;
        document.getElementById('volume-value').textContent = value;
        if (this.audioElement) {
            this.audioElement.volume = value / 100;
        }
        
        // Guardar estado
        this.saveState();
    }
    
    showStationInfo(name, info) {
        document.getElementById('station-name').textContent = name;
        document.getElementById('station-info').textContent = info;
    }
    
    updateSignalStrength(bars) {
        const signalBars = document.querySelectorAll('.signal-bar');
        signalBars.forEach((bar, index) => {
            if (index < bars) {
                bar.classList.add('active');
            } else {
                bar.classList.remove('active');
            }
        });
    }
    
    show() {
        document.getElementById('fallout-radio').classList.add('active');
        if (this.powerOn) {
            this.showStationInfo(this.currentStation?.name || "--- OFF AIR ---", 
                              this.isPlaying ? "PLAYING" : "SELECT STATION");
        }
    }
    
    hide() {
        document.getElementById('fallout-radio').classList.remove('active');
    }
}

// Inicializar radio
let falloutRadio;

function initFalloutRadio() {
    falloutRadio = new FalloutRadio();
}

// Restaurar estados guardados al cargar la página
function restoreAllStates() {
    // DESACTIVADO: Restaurar tema Fallout primero con mejor sincronización
    // const wasFalloutTheme = stateManager.loadThemeState();
    // if (wasFalloutTheme) {
    //     // Aplicar tema Fallout inmediatamente
    //     document.documentElement.setAttribute('data-theme', 'fallout');
    //     localStorage.setItem('theme', 'fallout');
    //     document.body.classList.add('terminal-active');
    //     
    //     // Actualizar botones
    //     const themeToggleBtn = document.getElementById('themeToggle');
    //     if (themeToggleBtn) {
    //         themeToggleBtn.style.opacity = '0.3';
    //         themeToggleBtn.style.pointerEvents = 'none';
    //         themeToggleBtn.style.cursor = 'not-allowed';
    //     }
    //     
    //     const terminalToggleBtn = document.getElementById('terminalToggle');
    //     if (terminalToggleBtn) {
    //         terminalToggleBtn.classList.add('terminal-active');
    //     }
    //     
    //     // NO llamar a updateThemeIcon para mantener el tema Fallout
    // }
    
    // Limpiar estado de tema Fallout guardado
    try {
        localStorage.removeItem('pipboy_fallout_theme');
        localStorage.removeItem('pipboy_terminal_visible');
        localStorage.removeItem('pipboy_radio_power');
        localStorage.removeItem('pipboy_radio_playing');
        localStorage.removeItem('pipboy_radio_volume');
        localStorage.removeItem('pipboy_radio_frequency');
    } catch (error) {
        console.warn('Error clearing Fallout theme state:', error);
    }
    
    // Asegurar que el cuerpo no tenga clases de Fallout
    document.body.classList.remove('terminal-active');
    
    // Asegurar que los botones de tema funcionen normalmente
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        themeToggleBtn.style.opacity = '1';
        themeToggleBtn.style.pointerEvents = 'auto';
        themeToggleBtn.style.cursor = 'pointer';
    }
    
    const terminalToggleBtn = document.getElementById('terminalToggle');
    if (terminalToggleBtn) {
        terminalToggleBtn.classList.remove('terminal-active');
    }
    
    // Limpiar estilos de Fallout de la tarjeta de perfil
    const profileCard = document.querySelector('.profile-card');
    if (profileCard) {
        // Remover clases de Fallout
        profileCard.classList.remove('vault-tec-card', 'crt-effect');
        
        // Remover contenido de VAULT-TEC si existe
        const vaultTecLabel = profileCard.querySelector('::before');
        if (vaultTecLabel) {
            profileCard.style.removeProperty('--vault-tec-label');
        }
        
        // Restaurar estilos normales
        profileCard.style.border = '';
        profileCard.style.background = '';
        profileCard.style.boxShadow = '';
        
        // Remover elementos de Vault-Tec si fueron añadidos
        const vaultTecElements = profileCard.querySelectorAll('.vault-tec-avatar, .vault-tec-info');
        vaultTecElements.forEach(el => {
            el.classList.remove('vault-tec-avatar', 'vault-tec-info');
        });
    }
    
    // Restaurar visibilidad de la terminal con mejor timing
    const terminalWasVisible = stateManager.loadTerminalVisible();
    if (terminalWasVisible) {
        // Esperar más tiempo para asegurar que todo esté cargado
        setTimeout(() => {
            // Verificar si el terminal existe antes de intentar activarlo
            let terminal = document.getElementById('pipboy-floating-terminal');
            if (!terminal) {
                // Si no existe, crearlo primero
                createFloatingTerminal();
                terminal = document.getElementById('pipboy-floating-terminal');
            }
            
            if (terminal) {
                terminal.style.display = 'block';
                
                // Actualizar botones si es necesario
                const terminalToggleBtn = document.getElementById('terminalToggle');
                if (terminalToggleBtn) {
                    terminalToggleBtn.classList.add('terminal-active');
                }
                
                const floatBtn = document.getElementById('pipboyFloat');
                if (floatBtn) {
                    floatBtn.style.display = 'none';
                }
            }
        }, 800); // Aumentado el tiempo para mejor sincronización
    }
    
    // Restaurar contenido de la terminal con más tiempo
    setTimeout(() => {
        restoreTerminalState();
    }, 1200); // Más tiempo para asegurar que el terminal esté completamente cargado
}

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

// Pip-Boy Dialog Component System
class PipDialog {
    constructor(options = {}) {
        this.title = options.title || 'SYSTEM MESSAGE';
        this.content = options.content || '';
        this.actions = options.actions || [];
        this.onClose = options.onClose || null;
        this.overlay = null;
        this.dialog = null;
    }

    show() {
        // Play sound effect
        if (window.ResourceManager) {
            window.ResourceManager.playSound('click');
        }

        // Create overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'pip-dialog-overlay';
        this.overlay.addEventListener('click', () => this.close());

        // Create dialog
        this.dialog = document.createElement('div');
        this.dialog.className = 'pip-dialog crt-effect';
        this.dialog.innerHTML = `
            <div class="pip-dialog-header">${this.title}</div>
            <div class="pip-dialog-content">${this.content}</div>
            <div class="pip-dialog-actions">
                ${this.actions.map(action => 
                    `<button class="pip-button" data-action="${action.id}">${action.text}</button>`
                ).join('')}
            </div>
        `;

        // Add event listeners
        this.dialog.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const actionId = e.target.dataset.action;
                const action = this.actions.find(a => a.id === actionId);
                if (action && action.handler) {
                    action.handler();
                }
                this.close();
            });
        });

        // Append to body
        document.body.appendChild(this.overlay);
        document.body.appendChild(this.dialog);

        // Animate in
        requestAnimationFrame(() => {
            this.overlay.style.opacity = '1';
            this.dialog.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    }

    close() {
        if (window.ResourceManager) {
            window.ResourceManager.playSound('click');
        }

        // Animate out
        this.overlay.style.opacity = '0';
        this.dialog.style.transform = 'translate(-50%, -50%) scale(0.9)';

        setTimeout(() => {
            if (this.overlay) {
                this.overlay.remove();
                this.overlay = null;
            }
            if (this.dialog) {
                this.dialog.remove();
                this.dialog = null;
            }
            if (this.onClose) {
                this.onClose();
            }
        }, 300);
    }
}

// Pip-Boy Button Factory
class PipButton {
    static create(options = {}) {
        const button = document.createElement('button');
        button.className = 'pip-button';
        button.textContent = options.text || 'BUTTON';
        button.disabled = options.disabled || false;

        if (options.disabled) {
            button.classList.add('disabled');
        }

        if (options.onClick) {
            button.addEventListener('click', (e) => {
                if (window.ResourceManager) {
                    window.ResourceManager.playSound('click');
                }
                options.onClick(e);
            });
        }

        if (options.id) {
            button.id = options.id;
        }

        return button;
    }
}

// Vault-Tec User Card Component
class VaultTecCard {
    constructor(container, userData = {}) {
        this.container = container;
        this.userData = {
            name: userData.name || 'User',
            title: userData.title || 'Developer',
            avatar: userData.avatar || null,
            stats: userData.stats || { projects: 0, experience: 0 }
        };
        this.render();
    }

    render() {
        this.container.className = 'vault-tec-card crt-effect';
        this.container.innerHTML = `
            <div class="vault-tec-avatar">
                ${this.userData.avatar ? 
                    `<img src="${this.userData.avatar}" alt="${this.userData.name}">` : 
                    '<i class="fas fa-user"></i>'
                }
            </div>
            <div class="vault-tec-info">
                <h3>${this.userData.name}</h3>
                <p>${this.userData.title}</p>
                <div class="profile-stats">
                    <div class="stat-item">
                        <span class="stat-number">${this.userData.stats.projects}+</span>
                        <span class="stat-label">Projects</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${this.userData.stats.experience}+</span>
                        <span class="stat-label">Years Exp.</span>
                    </div>
                </div>
            </div>
        `;
    }
}

// Pip-Boy Loading Component
class PipLoading {
    static show(container, text = 'LOADING') {
        const loadingElement = document.createElement('div');
        loadingElement.className = 'pip-loading-container';
        loadingElement.innerHTML = `
            <div class="pip-loading"></div>
            <span class="pip-loading-text">${text}</span>
        `;
        
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        
        if (container) {
            container.appendChild(loadingElement);
        }
        
        return loadingElement;
    }

    static hide(element) {
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }
}

// Enhanced Theme System with Pip-Boy fonts
function initEnhancedThemeSystem() {
    // Add Roboto Mono font for Pip-Boy theme
    const fontLink = document.createElement('link');
    fontLink.href = '/assets/fallout-assets/fonts/roboto-mono-latin.woff2';
    fontLink.rel = 'preload';
    fontLink.as = 'font';
    fontLink.type = 'font/woff2';
    fontLink.crossOrigin = 'anonymous';
    document.head.appendChild(fontLink);

    // Enhanced theme toggle with Pip-Boy sounds
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const themes = ['light', 'dark', 'fallout'];
            const currentIndex = themes.indexOf(currentTheme) || 0;
            const nextTheme = themes[(currentIndex + 1) % themes.length];
            
            document.documentElement.setAttribute('data-theme', nextTheme);
            localStorage.setItem('theme', nextTheme);
            
            // Add CRT effect to body in Fallout theme
            if (nextTheme === 'fallout') {
                document.body.classList.add('crt-effect');
            } else {
                document.body.classList.remove('crt-effect');
            }
            
            // Play theme change sound
            if (window.ResourceManager) {
                window.ResourceManager.playSound('success');
            }
            
            // Update icon
            const icon = themeToggle.querySelector('i');
            if (nextTheme === 'light') {
                icon.className = 'fas fa-sun';
            } else if (nextTheme === 'dark') {
                icon.className = 'fas fa-moon';
            } else {
                icon.className = 'fas fa-tv';
            }
        });
    }
}

// Initialize Pip-Boy components
function initPipBoyComponents() {
    // Initialize enhanced theme system
    initEnhancedThemeSystem();
    
    // Convert existing buttons to Pip-Boy style in Fallout theme
    const observer = new MutationObserver(() => {
        const isFallout = document.documentElement.getAttribute('data-theme') === 'fallout';
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        
        buttons.forEach(btn => {
            if (isFallout && !btn.classList.contains('pip-button')) {
                btn.classList.add('pip-button');
            } else if (!isFallout && btn.classList.contains('pip-button')) {
                btn.classList.remove('pip-button');
            }
        });
    });
    
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
    
    // DESACTIVADO: Add Vault-Tec card to profile section
    // const profileCard = document.querySelector('.profile-card');
    // if (profileCard) {
    //     new VaultTecCard(profileCard, {
    //         name: 'Oscar de La Cruz',
    //         title: 'Desarrollador Full Stack',
    //         stats: { projects: 40, experience: 8 }
    //     });
    // }
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

// Admin Panel JavaScript
let isAdminAuthenticated = false;
const ADMIN_PASSWORD = 'admin123'; // Cambiar esto por una contraseña segura

// Show admin login modal
function showAdminLogin() {
    document.getElementById('adminLoginModal').style.display = 'block';
    document.getElementById('adminPassword').focus();
}

// Close admin login modal
function closeAdminLogin() {
    document.getElementById('adminLoginModal').style.display = 'none';
    document.getElementById('adminPassword').value = '';
}

// Authenticate admin
function authenticateAdmin() {
    const password = document.getElementById('adminPassword').value;
    if (password === ADMIN_PASSWORD) {
        isAdminAuthenticated = true;
        closeAdminLogin();
        showAdminPanel();
        loadAdminData();
    } else {
        alert('Contraseña incorrecta. Por favor, inténtelo de nuevo.');
        document.getElementById('adminPassword').value = '';
        document.getElementById('adminPassword').focus();
    }
}

// Show admin panel
function showAdminPanel() {
    document.getElementById('adminPanel').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close admin panel
function closeAdminPanel() {
    document.getElementById('adminPanel').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Switch tabs
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName + 'Tab').classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Load admin data from localStorage
function loadAdminData() {
    // Load content data
    const aboutTitle = localStorage.getItem('admin_aboutTitle') || 'Sobre Mí';
    const aboutDescription = localStorage.getItem('admin_aboutDescription') || 'Soy un desarrollador apasionado con especialización en crear soluciones tecnológicas innovadoras para el gaming y automatización. Mi enfoque se centra en desarrollar herramientas robustas que resuelvan problemas reales y mejoren la experiencia del usuario en entornos digitales complejos.';
    const profileName = localStorage.getItem('admin_profileName') || 'Oscar de La Cruz';
    const profileTitle = localStorage.getItem('admin_profileTitle') || 'Desarrollador Full Stack';
    const projectCount = localStorage.getItem('admin_projectCount') || '40+';
    const experienceYears = localStorage.getItem('admin_experienceYears') || '8+';
    
    document.getElementById('aboutTitle').value = aboutTitle;
    document.getElementById('aboutDescription').value = aboutDescription;
    document.getElementById('profileName').value = profileName;
    document.getElementById('profileTitle').value = profileTitle;
    document.getElementById('projectCount').value = projectCount;
    document.getElementById('experienceYears').value = experienceYears;
    
    // Load style data
    const primaryColor = localStorage.getItem('admin_primaryColor') || '#00d4ff';
    const secondaryColor = localStorage.getItem('admin_secondaryColor') || '#0099cc';
    const accentColor = localStorage.getItem('admin_accentColor') || '#ff006e';
    const mainFont = localStorage.getItem('admin_mainFont') || 'system-ui';
    const baseFontSize = localStorage.getItem('admin_baseFontSize') || '16';
    
    document.getElementById('primaryColor').value = primaryColor;
    document.getElementById('secondaryColor').value = secondaryColor;
    document.getElementById('accentColor').value = accentColor;
    document.getElementById('mainFont').value = mainFont;
    document.getElementById('baseFontSize').value = baseFontSize;
    document.getElementById('fontSizeValue').textContent = baseFontSize + 'px';
    
    // Load settings data
    const siteTitle = localStorage.getItem('admin_siteTitle') || 'Portfolio - Oscar de La Cruz';
    const siteDescription = localStorage.getItem('admin_siteDescription') || 'Desarrollador Full Stack especializado en gaming y automatización';
    const enableParticles = localStorage.getItem('admin_enableParticles') !== 'false';
    const enableSmoothScroll = localStorage.getItem('admin_enableSmoothScroll') !== 'false';
    
    document.getElementById('siteTitle').value = siteTitle;
    document.getElementById('siteDescription').value = siteDescription;
    document.getElementById('enableParticles').checked = enableParticles;
    document.getElementById('enableSmoothScroll').checked = enableSmoothScroll;
    
    // Apply loaded styles
    applyAdminStyles();
}

// Apply admin styles to the page
function applyAdminStyles() {
    const primaryColor = document.getElementById('primaryColor').value;
    const secondaryColor = document.getElementById('secondaryColor').value;
    const accentColor = document.getElementById('accentColor').value;
    const mainFont = document.getElementById('mainFont').value;
    const baseFontSize = document.getElementById('baseFontSize').value;
    
    // Update CSS variables
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    document.documentElement.style.setProperty('--accent-color', accentColor);
    document.documentElement.style.setProperty('--font-family', mainFont);
    document.documentElement.style.fontSize = baseFontSize + 'px';
    
    // Update page title
    const siteTitle = document.getElementById('siteTitle').value;
    if (siteTitle) {
        document.title = siteTitle;
    }
}

// Save all changes
function saveAllChanges() {
    // Save content data
    localStorage.setItem('admin_aboutTitle', document.getElementById('aboutTitle').value);
    localStorage.setItem('admin_aboutDescription', document.getElementById('aboutDescription').value);
    localStorage.setItem('admin_profileName', document.getElementById('profileName').value);
    localStorage.setItem('admin_profileTitle', document.getElementById('profileTitle').value);
    localStorage.setItem('admin_projectCount', document.getElementById('projectCount').value);
    localStorage.setItem('admin_experienceYears', document.getElementById('experienceYears').value);
    
    // Save style data
    localStorage.setItem('admin_primaryColor', document.getElementById('primaryColor').value);
    localStorage.setItem('admin_secondaryColor', document.getElementById('secondaryColor').value);
    localStorage.setItem('admin_accentColor', document.getElementById('accentColor').value);
    localStorage.setItem('admin_mainFont', document.getElementById('mainFont').value);
    localStorage.setItem('admin_baseFontSize', document.getElementById('baseFontSize').value);
    
    // Save settings data
    localStorage.setItem('admin_siteTitle', document.getElementById('siteTitle').value);
    localStorage.setItem('admin_siteDescription', document.getElementById('siteDescription').value);
    localStorage.setItem('admin_enableParticles', document.getElementById('enableParticles').checked);
    localStorage.setItem('admin_enableSmoothScroll', document.getElementById('enableSmoothScroll').checked);
    
    // Apply changes to the page
    updatePageContent();
    applyAdminStyles();
    
    // Show success message
    showNotification('Cambios guardados exitosamente', 'success');
}

// Update page content with admin changes
function updatePageContent() {
    // Update About section
    const aboutTitle = document.getElementById('aboutTitle').value;
    const aboutDescription = document.getElementById('aboutDescription').value;
    const profileName = document.getElementById('profileName').value;
    const profileTitle = document.getElementById('profileTitle').value;
    const projectCount = document.getElementById('projectCount').value;
    const experienceYears = document.getElementById('experienceYears').value;
    
    // Update section title
    const sectionTitle = document.querySelector('#sobre-mi .section-title');
    if (sectionTitle) {
        sectionTitle.textContent = aboutTitle;
    }
    
    // Update description
    const description = document.querySelector('#sobre-mi .about-description');
    if (description) {
        description.textContent = aboutDescription;
    }
    
    // Update profile info
    const profileNameElement = document.querySelector('#sobre-mi .profile-info h3');
    if (profileNameElement) {
        profileNameElement.textContent = profileName;
    }
    
    const profileTitleElement = document.querySelector('#sobre-mi .profile-info p');
    if (profileTitleElement) {
        profileTitleElement.textContent = profileTitle;
    }
    
    // Update stats
    const projectCountElement = document.querySelector('#sobre-mi .stat-item:first-child .stat-number');
    if (projectCountElement) {
        projectCountElement.textContent = projectCount;
    }
    
    const experienceYearsElement = document.querySelector('#sobre-mi .stat-item:last-child .stat-number');
    if (experienceYearsElement) {
        experienceYearsElement.textContent = experienceYears;
    }
    
    // Update particles setting
    const enableParticles = document.getElementById('enableParticles').checked;
    const particlesCanvas = document.getElementById('particles-canvas');
    if (particlesCanvas) {
        particlesCanvas.style.display = enableParticles ? 'block' : 'none';
    }
    
    // Update smooth scroll setting
    const enableSmoothScroll = document.getElementById('enableSmoothScroll').checked;
    document.documentElement.style.scrollBehavior = enableSmoothScroll ? 'smooth' : 'auto';
}

// Reset to defaults
function resetToDefaults() {
    if (confirm('¿Está seguro de que desea restablecer todos los valores a los predeterminados?')) {
        // Clear admin localStorage
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('admin_')) {
                localStorage.removeItem(key);
            }
        });
        
        // Reload admin data
        loadAdminData();
        updatePageContent();
        
        showNotification('Valores restablecidos exitosamente', 'info');
    }
}

// Clear localStorage
function clearLocalStorage() {
    if (confirm('¿Está seguro de que desea limpiar todos los datos locales? Esto eliminará toda la configuración personalizada.')) {
        localStorage.clear();
        location.reload();
    }
}

// Add experience item
function addExperienceItem() {
    const experienceList = document.getElementById('experienceList');
    const newItem = document.createElement('div');
    newItem.className = 'experience-item';
    newItem.innerHTML = `
        <input type="text" placeholder="Título del puesto">
        <input type="text" placeholder="Empresa">
        <input type="text" placeholder="Período">
        <textarea placeholder="Descripción" rows="3"></textarea>
        <button class="remove-btn" onclick="removeExperienceItem(this)">
            <i class="fas fa-trash"></i>
        </button>
    `;
    experienceList.appendChild(newItem);
}

// Remove experience item
function removeExperienceItem(button) {
    button.parentElement.remove();
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `admin-notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? 'var(--primary-color)' : type === 'error' ? 'var(--accent-color)' : 'var(--secondary-color)'};
        color: white;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 10002;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Handle font size slider
document.getElementById('baseFontSize')?.addEventListener('input', function() {
    document.getElementById('fontSizeValue').textContent = this.value + 'px';
});

// Handle Enter key in password field
document.getElementById('adminPassword')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        authenticateAdmin();
    }
});

// Handle Escape key to close modals
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeAdminLogin();
        if (isAdminAuthenticated) {
            closeAdminPanel();
        }
    }
});

// Add slideIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
