/**
 * Advanced Content Management System
 * Handles dynamic content loading, caching, and component management
 */

class ContentManager {
    constructor() {
        this.cache = new Map();
        this.components = new Map();
        this.templates = new Map();
        this.loadingPromises = new Map();
        this.observers = [];
        this.performanceMetrics = {
            loadTimes: new Map(),
            cacheHits: 0,
            cacheMisses: 0
        };
        
        // Cache configuration
        this.cacheConfig = {
            maxAge: 5 * 60 * 1000, // 5 minutes
            maxSize: 50, // max items in cache
            compressionEnabled: true
        };
        
        this.init();
    }

    async init() {
        // Load component templates
        await this.loadTemplates();
        
        // Setup cache cleanup
        this.setupCacheCleanup();
        
        // Initialize performance monitoring
        this.initPerformanceMonitoring();
    }

    async loadTemplates() {
        const templateConfigs = [
            { name: 'hero', path: '/templates/hero.html' },
            { name: 'about', path: '/templates/about.html' },
            { name: 'experience', path: '/templates/experience.html' },
            { name: 'projects', path: '/templates/projects.html' },
            { name: 'skills', path: '/templates/skills.html' },
            { name: 'contact', path: '/templates/contact.html' },
            { name: 'project-card', path: '/templates/project-card.html' },
            { name: 'skill-bar', path: '/templates/skill-bar.html' }
        ];

        for (const config of templateConfigs) {
            try {
                const template = await this.loadTemplate(config.name, config.path);
                this.templates.set(config.name, template);
            } catch (error) {
                console.warn(`Failed to load template ${config.name}:`, error);
                // Create fallback template
                this.templates.set(config.name, this.createFallbackTemplate(config.name));
            }
        }
    }

    async loadTemplate(name, path) {
        const cacheKey = `template_${name}`;
        
        if (this.cache.has(cacheKey)) {
            this.performanceMetrics.cacheHits++;
            return this.cache.get(cacheKey);
        }

        this.performanceMetrics.cacheMisses++;
        
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`Failed to load template: ${response.status}`);
            }
            const template = await response.text();
            
            // Cache the template
            this.cache.set(cacheKey, template);
            
            return template;
        } catch (error) {
            console.error(`Error loading template ${name}:`, error);
            throw error;
        }
    }

    createFallbackTemplate(name) {
        const fallbacks = {
            hero: `
                <section class="hero">
                    <div class="container">
                        <div class="hero-content">
                            <h1 data-i18n="hero.title">Loading...</h1>
                            <p data-i18n="hero.subtitle">Loading...</p>
                        </div>
                    </div>
                </section>
            `,
            about: `
                <section class="about">
                    <div class="container">
                        <h2 data-i18n="about.title">Loading...</h2>
                        <p data-i18n="about.description">Loading...</p>
                    </div>
                </section>
            `,
            projects: `
                <section class="projects">
                    <div class="container">
                        <h2 data-i18n="projects.title">Loading...</h2>
                        <div class="projects-grid"></div>
                    </div>
                </section>
            `,
            'project-card': `
                <div class="project-card">
                    <h3 class="project-title">{{title}}</h3>
                    <p class="project-description">{{description}}</p>
                    <div class="project-technologies">
                        {{#each technologies}}
                        <span class="tech-tag">{{this}}</span>
                        {{/each}}
                    </div>
                    <div class="project-links">
                        {{#if github}}
                        <a href="{{github}}" target="_blank" class="btn">GitHub</a>
                        {{/if}}
                        {{#if demo}}
                        <a href="{{demo}}" target="_blank" class="btn">Demo</a>
                        {{/if}}
                    </div>
                </div>
            `,
            skills: `
                <section class="skills">
                    <div class="container">
                        <h2 data-i18n="skills.title">Loading...</h2>
                        <div class="skills-grid"></div>
                    </div>
                </section>
            `,
            'skill-bar': `
                <div class="skill-item">
                    <h4 class="skill-name">{{name}}</h4>
                    <div class="skill-bar">
                        <div class="skill-progress" style="width: {{level}}%"></div>
                    </div>
                    <span class="skill-level">{{level}}%</span>
                </div>
            `
        };

        return fallbacks[name] || `<div class="error">Template ${name} not found</div>`;
    }

    async loadComponent(name, data = {}) {
        const startTime = performance.now();
        
        try {
            // Check cache first
            const cacheKey = `component_${name}_${JSON.stringify(data)}`;
            if (this.cache.has(cacheKey)) {
                this.performanceMetrics.cacheHits++;
                return this.cache.get(cacheKey);
            }

            this.performanceMetrics.cacheMisses++;

            // Get template
            const template = this.templates.get(name);
            if (!template) {
                throw new Error(`Template ${name} not found`);
            }

            // Process template
            let processedContent = template;
            
            // Simple template processing
            processedContent = this.processTemplate(processedContent, data);
            
            // Cache the result
            this.cache.set(cacheKey, processedContent);
            
            // Record performance
            const loadTime = performance.now() - startTime;
            this.performanceMetrics.loadTimes.set(name, loadTime);
            
            return processedContent;
        } catch (error) {
            console.error(`Error loading component ${name}:`, error);
            return this.createFallbackTemplate(name);
        }
    }

    processTemplate(template, data) {
        // Simple string interpolation
        let processed = template;
        
        // Replace {{variable}} patterns
        processed = processed.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return data[key] !== undefined ? data[key] : match;
        });
        
        // Handle #each blocks for arrays
        processed = processed.replace(/\{\{#each (\w+)\}\}([\s\S]*?)\{\{\/each\}\}/g, (match, arrayKey, content) => {
            const array = data[arrayKey];
            if (!Array.isArray(array)) return '';
            
            return array.map(item => {
                let itemContent = content;
                if (typeof item === 'object') {
                    Object.keys(item).forEach(key => {
                        const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
                        itemContent = itemContent.replace(regex, item[key]);
                    });
                } else {
                    itemContent = itemContent.replace(/\{\{this\}\}/g, item);
                }
                return itemContent;
            }).join('');
        });
        
        // Handle #if blocks
        processed = processed.replace(/\{\{#if (\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (match, condition, content) => {
            return data[condition] ? content : '';
        });
        
        return processed;
    }

    async renderComponent(container, componentName, data = {}) {
        try {
            const content = await this.loadComponent(componentName, data);
            
            if (typeof container === 'string') {
                container = document.querySelector(container);
            }
            
            if (container) {
                container.innerHTML = content;
                
                // Apply i18n translations
                if (window.i18n) {
                    window.i18n.applyTranslationsToNode(container);
                }
                
                // Notify observers
                this.notifyObservers('component-rendered', {
                    container,
                    componentName,
                    data
                });
            }
        } catch (error) {
            console.error(`Error rendering component ${componentName}:`, error);
        }
    }

    async loadExternalContent(url, options = {}) {
        const {
            cache = true,
            timeout = 10000,
            headers = {}
        } = options;

        const cacheKey = `external_${url}`;
        
        if (cache && this.cache.has(cacheKey)) {
            this.performanceMetrics.cacheHits++;
            return this.cache.get(cacheKey);
        }

        this.performanceMetrics.cacheMisses++;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, {
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                }
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const content = await response.text();
            
            if (cache) {
                this.cache.set(cacheKey, content);
            }

            return content;
        } catch (error) {
            clearTimeout(timeoutId);
            console.error(`Error loading external content from ${url}:`, error);
            throw error;
        }
    }

    setupCacheCleanup() {
        // Clean cache periodically
        setInterval(() => {
            this.cleanupCache();
        }, 60000); // Every minute
    }

    cleanupCache() {
        const now = Date.now();
        const keysToDelete = [];

        this.cache.forEach((value, key) => {
            if (value.timestamp && (now - value.timestamp) > this.cacheConfig.maxAge) {
                keysToDelete.push(key);
            }
        });

        keysToDelete.forEach(key => this.cache.delete(key));
        
        // Limit cache size
        if (this.cache.size > this.cacheConfig.maxSize) {
            const entries = Array.from(this.cache.entries());
            const toDelete = entries.slice(0, entries.length - this.cacheConfig.maxSize);
            toDelete.forEach(([key]) => this.cache.delete(key));
        }
    }

    initPerformanceMonitoring() {
        // Monitor cache performance
        setInterval(() => {
            const stats = this.getPerformanceStats();
            console.log('Content Manager Performance:', stats);
        }, 30000); // Every 30 seconds
    }

    getPerformanceStats() {
        const totalRequests = this.performanceMetrics.cacheHits + this.performanceMetrics.cacheMisses;
        const hitRate = totalRequests > 0 ? (this.performanceMetrics.cacheHits / totalRequests * 100).toFixed(2) : 0;
        
        return {
            cacheSize: this.cache.size,
            cacheHits: this.performanceMetrics.cacheHits,
            cacheMisses: this.performanceMetrics.cacheMisses,
            hitRate: `${hitRate}%`,
            averageLoadTime: this.getAverageLoadTime(),
            componentCount: this.components.size,
            templateCount: this.templates.size
        };
    }

    getAverageLoadTime() {
        if (this.performanceMetrics.loadTimes.size === 0) return 0;
        
        const times = Array.from(this.performanceMetrics.loadTimes.values());
        const sum = times.reduce((acc, time) => acc + time, 0);
        return (sum / times.length).toFixed(2);
    }

    subscribe(callback) {
        this.observers.push(callback);
        return () => {
            const index = this.observers.indexOf(callback);
            if (index > -1) {
                this.observers.splice(index, 1);
            }
        };
    }

    notifyObservers(event, data) {
        this.observers.forEach(callback => {
            callback(event, data);
        });
    }

    // Advanced features
    async preloadComponents(components) {
        const promises = components.map(name => 
            this.loadComponent(name, {})
        );
        
        await Promise.all(promises);
    }

    clearCache() {
        this.cache.clear();
        this.performanceMetrics.cacheHits = 0;
        this.performanceMetrics.cacheMisses = 0;
        this.performanceMetrics.loadTimes.clear();
    }

    registerComponent(name, template) {
        this.templates.set(name, template);
    }

    getCacheInfo() {
        return {
            size: this.cache.size,
            maxSize: this.cacheConfig.maxSize,
            maxAge: this.cacheConfig.maxAge,
            keys: Array.from(this.cache.keys())
        };
    }

    // Lazy loading for images and other resources
    lazyLoad(selector = '[data-lazy]') {
        const elements = document.querySelectorAll(selector);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const src = element.getAttribute('data-lazy');
                    
                    if (element.tagName === 'IMG') {
                        element.src = src;
                        element.removeAttribute('data-lazy');
                    } else {
                        // Handle other elements (background images, etc.)
                        element.style.backgroundImage = `url(${src})`;
                        element.removeAttribute('data-lazy');
                    }
                    
                    observer.unobserve(element);
                }
            });
        });

        elements.forEach(element => observer.observe(element));
    }

    // Progressive enhancement
    enhanceContent(container) {
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }

        if (!container) return;

        // Add interactive elements
        this.addInteractiveElements(container);
        
        // Enhance accessibility
        this.enhanceAccessibility(container);
        
        // Add animations
        this.addAnimations(container);
    }

    addInteractiveElements(container) {
        // Add tooltips
        container.querySelectorAll('[data-tooltip]').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.showTooltip(e.target, e.target.getAttribute('data-tooltip'));
            });
            
            element.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });

        // Add keyboard navigation
        container.querySelectorAll('[data-navigable]').forEach(element => {
            element.setAttribute('tabindex', '0');
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    element.click();
                }
            });
        });
    }

    enhanceAccessibility(container) {
        // Add ARIA labels
        container.querySelectorAll('img').forEach(img => {
            if (!img.alt) {
                img.alt = img.getAttribute('data-alt') || 'Image';
            }
        });

        // Add role attributes
        container.querySelectorAll('.project-card').forEach(card => {
            card.setAttribute('role', 'article');
        });

        container.querySelectorAll('.skill-bar').forEach(bar => {
            bar.setAttribute('role', 'progressbar');
            bar.setAttribute('aria-label', 'Skill level');
        });
    }

    addAnimations(container) {
        // Add scroll animations
        container.querySelectorAll('[data-animate]').forEach(element => {
            const animation = element.getAttribute('data-animate');
            element.classList.add('animate-on-scroll');
            element.setAttribute('data-animation', animation);
        });

        // Setup scroll observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animation = element.getAttribute('data-animation');
                    element.classList.add(animation);
                    observer.unobserve(element);
                }
            });
        });

        container.querySelectorAll('.animate-on-scroll').forEach(element => {
            observer.observe(element);
        });
    }

    showTooltip(element, text) {
        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        tooltip.style.position = 'absolute';
        tooltip.style.background = 'rgba(0, 0, 0, 0.8)';
        tooltip.style.color = 'white';
        tooltip.style.padding = '4px 8px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.fontSize = '12px';
        tooltip.style.zIndex = '1000';
        tooltip.style.pointerEvents = 'none';

        document.body.appendChild(tooltip);

        // Position tooltip
        const rect = element.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - 30}px`;
        tooltip.style.transform = 'translateX(-50%)';
    }

    hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }
}

// Initialize content manager
const contentManager = new ContentManager();

// Export for global use
window.contentManager = contentManager;
