/**
 * Advanced Animation System
 * Handles complex animations, transitions, and interactive effects
 */

class AnimationSystem {
    constructor() {
        this.animations = new Map();
        this.observers = new Map();
        this.timeline = new Map();
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.performanceMode = 'high'; // high, medium, low
        this.activeAnimations = new Set();
        
        this.init();
    }

    init() {
        // Detect performance capabilities
        this.detectPerformance();
        
        // Setup intersection observers
        this.setupIntersectionObservers();
        
        // Setup resize observer
        this.setupResizeObserver();
        
        // Initialize animation timeline
        this.initTimeline();
        
        // Setup performance monitoring
        this.setupPerformanceMonitoring();
    }

    detectPerformance() {
        // Detect device performance
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const hardwareConcurrency = navigator.hardwareConcurrency || 4;
        const memory = navigator.deviceMemory || 4;
        
        // Determine performance mode
        if (this.isReducedMotion) {
            this.performanceMode = 'low';
        } else if (connection && connection.effectiveType) {
            const effectiveType = connection.effectiveType;
            if (effectiveType === 'slow-2g' || effectiveType === '2g') {
                this.performanceMode = 'low';
            } else if (effectiveType === '3g') {
                this.performanceMode = 'medium';
            } else {
                this.performanceMode = 'high';
            }
        } else if (hardwareConcurrency < 4 || memory < 4) {
            this.performanceMode = 'medium';
        }
    }

    setupIntersectionObservers() {
        // Scroll animations
        this.setupScrollAnimations();
        
        // Parallax effects
        this.setupParallaxEffects();
        
        // Reveal animations
        this.setupRevealAnimations();
        
        // Counter animations
        this.setupCounterAnimations();
    }

    setupScrollAnimations() {
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationType = element.getAttribute('data-animate');
                    const delay = element.getAttribute('data-delay') || 0;
                    
                    setTimeout(() => {
                        this.animateElement(element, animationType);
                    }, delay);
                    
                    scrollObserver.unobserve(element);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        document.querySelectorAll('[data-animate]').forEach(element => {
            scrollObserver.observe(element);
        });
    }

    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (this.performanceMode === 'low') {
            return; // Skip parallax on low performance
        }

        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-parallax') || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        };

        let ticking = false;
        const requestTick = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
                setTimeout(() => { ticking = false; }, 100);
            }
        };

        window.addEventListener('scroll', requestTick);
    }

    setupRevealAnimations() {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const direction = element.getAttribute('data-reveal') || 'up';
                    
                    this.revealElement(element, direction);
                    revealObserver.unobserve(element);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        document.querySelectorAll('[data-reveal]').forEach(element => {
            revealObserver.observe(element);
        });
    }

    setupCounterAnimations() {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const target = parseInt(element.getAttribute('data-counter'));
                    const duration = parseInt(element.getAttribute('data-duration')) || 2000;
                    
                    this.animateCounter(element, target, duration);
                    counterObserver.unobserve(element);
                }
            });
        }, {
            threshold: 0.5
        });

        document.querySelectorAll('[data-counter]').forEach(element => {
            counterObserver.observe(element);
        });
    }

    setupResizeObserver() {
        const resizeObserver = new ResizeObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                
                // Update animations based on new size
                if (element.hasAttribute('data-responsive-animation')) {
                    this.updateResponsiveAnimation(element);
                }
            });
        });

        document.querySelectorAll('[data-responsive-animation]').forEach(element => {
            resizeObserver.observe(element);
        });
    }

    initTimeline() {
        // Create animation timeline for complex sequences
        this.timeline.set('hero', {
            duration: 1000,
            animations: [
                { element: '.hero h1', animation: 'fadeInUp', delay: 0 },
                { element: '.hero .subtitle', animation: 'fadeInUp', delay: 200 },
                { element: '.hero-buttons', animation: 'fadeInUp', delay: 400 }
            ]
        });

        this.timeline.set('about', {
            duration: 1500,
            animations: [
                { element: '.about-text', animation: 'slideInLeft', delay: 0 },
                { element: '.about-image', animation: 'slideInRight', delay: 300 },
                { element: '.highlight-item', animation: 'fadeInUp', delay: 600, stagger: 100 }
            ]
        });
    }

    setupPerformanceMonitoring() {
        // Monitor animation performance
        let frameCount = 0;
        let lastTime = performance.now();
        
        const measureFPS = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime >= lastTime + 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                // Adjust performance mode based on FPS
                if (fps < 30 && this.performanceMode !== 'low') {
                    this.performanceMode = 'low';
                    this.reduceAnimations();
                } else if (fps > 50 && this.performanceMode === 'low') {
                    this.performanceMode = 'medium';
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(measureFPS);
        };
        
        requestAnimationFrame(measureFPS);
    }

    animateElement(element, animationType) {
        if (this.isReducedMotion) {
            element.style.opacity = '1';
            element.style.transform = 'none';
            return;
        }

        const animations = {
            'fade-in': () => this.fadeIn(element),
            'fade-in-up': () => this.fadeInUp(element),
            'fade-in-down': () => this.fadeInDown(element),
            'fade-in-left': () => this.fadeInLeft(element),
            'fade-in-right': () => this.fadeInRight(element),
            'slide-in-up': () => this.slideInUp(element),
            'slide-in-down': () => this.slideInDown(element),
            'slide-in-left': () => this.slideInLeft(element),
            'slide-in-right': () => this.slideInRight(element),
            'zoom-in': () => this.zoomIn(element),
            'rotate-in': () => this.rotateIn(element),
            'bounce-in': () => this.bounceIn(element),
            'typewriter': () => this.typewriter(element),
            'glitch': () => this.glitch(element),
            'neon': () => this.neon(element)
        };

        if (animations[animationType]) {
            animations[animationType]();
        } else {
            this.fadeIn(element);
        }
    }

    revealElement(element, direction) {
        const directions = {
            'up': { transform: 'translateY(50px)', opacity: 0 },
            'down': { transform: 'translateY(-50px)', opacity: 0 },
            'left': { transform: 'translateX(50px)', opacity: 0 },
            'right': { transform: 'translateX(-50px)', opacity: 0 }
        };

        const initial = directions[direction] || directions['up'];
        element.style.transform = initial.transform;
        element.style.opacity = initial.opacity;
        element.style.transition = 'transform 0.6s ease, opacity 0.6s ease';

        setTimeout(() => {
            element.style.transform = 'translate(0)';
            element.style.opacity = '1';
        }, 50);
    }

    animateCounter(element, target, duration) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }

    // Individual animation methods
    fadeIn(element) {
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.6s ease';
        setTimeout(() => {
            element.style.opacity = '1';
        }, 50);
    }

    fadeInUp(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 50);
    }

    fadeInDown(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(-30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 50);
    }

    fadeInLeft(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, 50);
    }

    fadeInRight(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, 50);
    }

    slideInUp(element) {
        element.style.transform = 'translateY(100%)';
        element.style.transition = 'transform 0.6s ease';
        setTimeout(() => {
            element.style.transform = 'translateY(0)';
        }, 50);
    }

    slideInDown(element) {
        element.style.transform = 'translateY(-100%)';
        element.style.transition = 'transform 0.6s ease';
        setTimeout(() => {
            element.style.transform = 'translateY(0)';
        }, 50);
    }

    slideInLeft(element) {
        element.style.transform = 'translateX(-100%)';
        element.style.transition = 'transform 0.6s ease';
        setTimeout(() => {
            element.style.transform = 'translateX(0)';
        }, 50);
    }

    slideInRight(element) {
        element.style.transform = 'translateX(100%)';
        element.style.transition = 'transform 0.6s ease';
        setTimeout(() => {
            element.style.transform = 'translateX(0)';
        }, 50);
    }

    zoomIn(element) {
        element.style.transform = 'scale(0)';
        element.style.opacity = '0';
        element.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
        }, 50);
    }

    rotateIn(element) {
        element.style.transform = 'rotate(-180deg) scale(0)';
        element.style.opacity = '0';
        element.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
        setTimeout(() => {
            element.style.transform = 'rotate(0) scale(1)';
            element.style.opacity = '1';
        }, 50);
    }

    bounceIn(element) {
        element.style.transform = 'scale(0)';
        element.style.opacity = '0';
        element.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 0.6s ease';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
        }, 50);
    }

    typewriter(element) {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        typeWriter();
    }

    glitch(element) {
        if (this.performanceMode === 'low') {
            this.fadeIn(element);
            return;
        }

        element.style.opacity = '1';
        const originalText = element.textContent;
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        let iterations = 0;
        const maxIterations = 10;
        
        const glitch = () => {
            if (iterations < maxIterations) {
                let glitchText = '';
                for (let i = 0; i < originalText.length; i++) {
                    if (Math.random() < 0.1) {
                        glitchText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    } else {
                        glitchText += originalText[i];
                    }
                }
                element.textContent = glitchText;
                iterations++;
                setTimeout(glitch, 50);
            } else {
                element.textContent = originalText;
            }
        };
        
        glitch();
    }

    neon(element) {
        element.style.opacity = '0';
        element.style.textShadow = '0 0 10px rgba(0, 212, 255, 0)';
        element.style.transition = 'opacity 0.6s ease, text-shadow 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.textShadow = '0 0 20px rgba(0, 212, 255, 0.8), 0 0 40px rgba(0, 212, 255, 0.6)';
        }, 50);
    }

    // Timeline animations
    playTimeline(timelineName) {
        const timeline = this.timeline.get(timelineName);
        if (!timeline) return;

        timeline.animations.forEach((animation, index) => {
            const delay = animation.delay || (index * 100);
            const stagger = animation.stagger || 0;
            
            if (Array.isArray(animation.element)) {
                animation.element.forEach((el, i) => {
                    setTimeout(() => {
                        this.animateElement(el, animation.animation);
                    }, delay + (i * stagger));
                });
            } else {
                const elements = document.querySelectorAll(animation.element);
                elements.forEach((el, i) => {
                    setTimeout(() => {
                        this.animateElement(el, animation.animation);
                    }, delay + (i * stagger));
                });
            }
        });
    }

    // Particle animations
    createParticles(container, options = {}) {
        if (this.performanceMode === 'low') {
            return;
        }

        const defaults = {
            count: 50,
            size: 2,
            speed: 1,
            color: '#00d4ff',
            opacity: 0.6
        };

        const config = { ...defaults, ...options };
        const particles = [];

        for (let i = 0; i < config.count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${config.size}px;
                height: ${config.size}px;
                background: ${config.color};
                opacity: ${config.opacity};
                border-radius: 50%;
                pointer-events: none;
            `;
            
            container.appendChild(particle);
            particles.push(particle);
            
            this.animateParticle(particle, config);
        }

        return particles;
    }

    animateParticle(particle, config) {
        const animate = () => {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = (Math.random() * 3 + 2) / config.speed;
            
            particle.style.transition = `transform ${duration}s linear`;
            particle.style.transform = `translate(${x}vw, ${y}vh)`;
            
            setTimeout(() => {
                if (particle.parentNode) {
                    animate();
                }
            }, duration * 1000);
        };
        
        animate();
    }

    // Morphing animations
    morphElement(element, fromShape, toShape, duration = 1000) {
        element.style.transition = `clip-path ${duration}ms ease`;
        
        setTimeout(() => {
            element.style.clipPath = toShape;
        }, 50);
    }

    // Loading animations
    createLoader(container, type = 'spinner') {
        const loader = document.createElement('div');
        loader.className = `loader loader-${type}`;
        
        switch (type) {
            case 'spinner':
                loader.innerHTML = '<div class="spinner"></div>';
                break;
            case 'dots':
                loader.innerHTML = '<div class="dots"><span></span><span></span><span></span></div>';
                break;
            case 'pulse':
                loader.innerHTML = '<div class="pulse"></div>';
                break;
            case 'bars':
                loader.innerHTML = '<div class="bars"><span></span><span></span><span></span><span></span></div>';
                break;
        }
        
        container.appendChild(loader);
        return loader;
    }

    // Interactive animations
    addHoverAnimation(element, animationType) {
        element.addEventListener('mouseenter', () => {
            this.animateElement(element, animationType);
        });
    }

    addClickAnimation(element, animationType) {
        element.addEventListener('click', () => {
            this.animateElement(element, animationType);
        });
    }

    // Performance optimization
    reduceAnimations() {
        // Reduce animation complexity for low performance
        document.querySelectorAll('[data-animate]').forEach(element => {
            const animation = element.getAttribute('data-animate');
            if (animation.includes('glitch') || animation.includes('parallax')) {
                element.setAttribute('data-animate', 'fade-in');
            }
        });
    }

    updateResponsiveAnimation(element) {
        const rect = element.getBoundingClientRect();
        const animationType = rect.width < 768 ? 'fade-in' : element.getAttribute('data-animate');
        element.setAttribute('data-animate', animationType);
    }

    // Utility methods
    pauseAnimation(element) {
        element.style.animationPlayState = 'paused';
    }

    resumeAnimation(element) {
        element.style.animationPlayState = 'running';
    }

    resetAnimation(element) {
        element.style.animation = 'none';
        element.offsetHeight; // Trigger reflow
        element.style.animation = '';
    }

    // Cleanup
    cleanup() {
        // Remove all observers
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        this.observers.clear();

        // Clear active animations
        this.activeAnimations.clear();
    }
}

// Initialize animation system
const animationSystem = new AnimationSystem();

// Export for global use
window.animationSystem = animationSystem;

// Auto-cleanup on page unload
window.addEventListener('beforeunload', () => {
    animationSystem.cleanup();
});
