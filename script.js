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

function initFloatingTerminalEvents() {
    const terminal = document.getElementById('pipboy-floating-terminal');
    const minimizeBtn = document.getElementById('minimize-terminal');
    const closeBtn = document.getElementById('close-floating-terminal');
    const clearBtn = document.getElementById('clear-floating-terminal');
    const helpBtn = document.getElementById('help-floating-terminal');
    const output = document.getElementById('floating-terminal-output');
    
    if (!terminal) return;
    
    let isMinimized = false;
    let commandHistory = [];
    let historyIndex = -1;
    
    function handleTerminalCommand(command) {
        const cmd = command.toLowerCase().trim();
        
        // Comandos de la terminal
        switch (cmd) {
            case 'help':
                addFloatingLine('Available commands:');
                addFloatingLine('  help     - Show this help message');
                addFloatingLine('  clear    - Clear terminal screen');
                addFloatingLine('  about    - Show about information');
                addFloatingLine('  projects - List projects');
                addFloatingLine('  skills   - Show skills');
                addFloatingLine('  contact  - Show contact information');
                addFloatingLine('  radio    - Open Fallout Radio');
                addFloatingLine('  time     - Show current time');
                addFloatingLine('  status   - Show system status');
                break;
                
            case 'clear':
                const output = document.getElementById('floating-terminal-output');
                output.innerHTML = '<div class="terminal-line">ROBCO INDUSTRIES PIP-BOY v3.0.1</div><div class="terminal-line">Type "help" for commands</div><div class="terminal-line">&gt;</div>';
                break;
                
            case 'about':
                addFloatingLine('ROBCO INDUSTRIES UNIFIED TERMINAL');
                addFloatingLine('Version 3.0.1 - Fallout Edition');
                addFloatingLine(' 2077 RobCo Industries');
                addFloatingLine('All rights reserved');
                break;
                
            case 'projects':
                addFloatingLine('Installed Projects:');
                addFloatingLine('  > All-in-One Bot [ACTIVE]');
                addFloatingLine('  > Portfolio Website [ACTIVE]');
                addFloatingLine('  > Terminal Interface [ACTIVE]');
                break;
                
            case 'skills':
                addFloatingLine('Technical Skills:');
                addFloatingLine('  > JavaScript: EXPERT');
                addFloatingLine('  > Python: ADVANCED');
                addFloatingLine('  > Web Development: EXPERT');
                addFloatingLine('  > System Administration: ADVANCED');
                break;
                
            case 'contact':
                addFloatingLine('Contact Information:');
                addFloatingLine('  > Email: contact@example.com');
                addFloatingLine('  > GitHub: @username');
                addFloatingLine('  > LinkedIn: /in/username');
                break;
                
            case 'radio':
                addFloatingLine('Initializing Fallout Radio...');
                addFloatingLine('ROBCO PIPMAN 3000 ONLINE');
                if (falloutRadio) {
                    falloutRadio.show();
                    addFloatingLine('Radio interface loaded');
                } else {
                    addFloatingLine('ERROR: Radio system not available');
                }
                break;
                
            case 'time':
                const now = new Date();
                addFloatingLine(`Current time: ${now.toLocaleTimeString()}`);
                addFloatingLine(`Date: ${now.toLocaleDateString()}`);
                break;
                
            case 'status':
                addFloatingLine('System Status:');
                addFloatingLine('  > Terminal: ONLINE');
                addFloatingLine('  > Theme: FALLOUT MODE');
                addFloatingLine('  > Radio: STANDBY');
                addFloatingLine('  > Connection: STABLE');
                break;
                
            default:
                addFloatingLine(`Command not recognized: ${cmd}`);
                addFloatingLine('Type "help" for available commands');
        }
        
        // Agregar nueva línea de comando
        setTimeout(() => {
            addFloatingLine('>');
        }, 100);
    }
    
    // Input dinámico
    function createInput() {
        const input = document.createElement('div');
        input.innerHTML = '<span class="terminal-prompt">&gt;</span><input type="text" class="terminal-input" placeholder="Enter command..." autocomplete="off">';
        input.className = 'terminal-input-line';
        output.appendChild(input);
        
        const inputField = input.querySelector('input');
        
        // Event listeners
        inputField.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const command = inputField.value.trim().toLowerCase();
                if (command) {
                    addFloatingLine(`&gt; ${command}`);
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
    
    // Crear input inicial
    createInput();
    
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

function addFloatingLine(text) {
    const output = document.getElementById('floating-terminal-output');
    if (output) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.textContent = text;
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
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

// Sistema de Radio de Fallout
class FalloutRadio {
    constructor() {
        this.stations = {
            DX01: { name: "Diamond City Radio", freq: 87.5, url: "https://tunein.com/embed/player/s311352/" },
            DX02: { name: "Galaxy News Radio", freq: 88.7, url: "https://tunein.com/embed/player/s248473/" },
            DX03: { name: "Enclave Radio", freq: 89.3, url: "https://tunein.com/embed/player/s250643/" },
            MX01: { name: "Classical Station", freq: 90.1, url: "https://tunein.com/embed/player/s180754/" },
            MX02: { name: "Jazz Station", freq: 91.5, url: "https://tunein.com/embed/player/s25470/" },
            MX03: { name: "Country Station", freq: 92.3, url: "https://tunein.com/embed/player/s250696/" },
            MX04: { name: "Rock Station", freq: 93.7, url: "https://tunein.com/embed/player/s24939/" },
            MX05: { name: "Institute Radio", freq: 94.5, url: "https://tunein.com/embed/player/s250643/" },
            MX06: { name: "Vault 101 Radio", freq: 95.3, url: "https://tunein.com/embed/player/s311352/" },
            MX07: { name: "The Silver Shroud", freq: 96.1, url: "https://tunein.com/embed/player/s248473/" },
            MX08: { name: "Atom Cats Radio", freq: 97.9, url: "https://tunein.com/embed/player/s25470/" }
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
    }
    
    async playStation(station) {
        this.stopRadio();
        
        try {
            // Mostrar estado de carga
            this.showStationInfo(station.name, "LOADING...");
            this.updateSignalStrength(2);
            
            // Configurar el iframe de TuneIn
            this.iframeElement.src = station.url;
            this.iframeElement.style.display = 'block';
            
            // Simular que está cargando
            setTimeout(() => {
                this.currentStation = station;
                this.isPlaying = true;
                this.showStationInfo(station.name, "PLAYING");
                this.updateSignalStrength(5);
            }, 2000);
            
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
        if (this.iframeElement) {
            this.iframeElement.src = '';
            this.iframeElement.style.display = 'none';
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
