import './styles/main.scss';

// Cargar recursos del Pip-Boy Terminal
class ResourceManager {
    constructor() {
        this.resources = {
            // Imágenes del sistema
            images: {
                crtEffect: '/assets/images/crt-effect.png',
                staticNoise: '/assets/images/static-noise.png',
                scanlines: '/assets/images/scanlines.png',
                terminalBg: '/assets/images/terminal-bg.jpg',
                buttonHover: '/assets/images/button-hover.png',
                buttonPressed: '/assets/images/button-pressed.png'
            },
            // Audio del sistema
            audio: {
                boot: '/assets/audio/boot.mp3',
                error: '/assets/audio/error.mp3',
                success: '/assets/audio/success.mp3',
                click: '/assets/audio/click.mp3',
                typing: '/assets/audio/typing.mp3',
                static: '/assets/audio/static.mp3'
            },
            // Estaciones de radio
            radio: {
                galaxyNews: '/assets/audio/galaxy-news.mp3',
                enclave: '/assets/audio/enclave.mp3',
                diamondCity: '/assets/audio/diamond-city.mp3',
                classical: '/assets/audio/classical.mp3'
            }
        };
        
        this.loadedResources = new Map();
        this.audioContext = null;
    }
    
    // Inicializar gestor de audio
    initAudio() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    // Cargar imagen
    async loadImage(path) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load image: ${path}`));
            img.src = path;
        });
    }
    
    // Cargar audio
    async loadAudio(path) {
        return new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.oncanplay = () => resolve(audio);
            audio.onerror = () => reject(new Error(`Failed to load audio: ${path}`));
            audio.src = path;
        });
    }
    
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
    }
    
    // Reproducir sonido
    playSound(soundType) {
        if (!this.audioContext) return;
        
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
    }
    
    // Obtener lista de recursos
    getResourceList() {
        return {
            images: Object.keys(this.resources.images),
            audio: Object.keys(this.resources.audio),
            radio: Object.keys(this.resources.radio)
        };
    }
    
    // Liberar memoria
    cleanup() {
        this.loadedResources.clear();
        if (this.audioContext) {
            this.audioContext.close();
        }
    }
}

// Exportar para uso global
window.ResourceManager = ResourceManager;
