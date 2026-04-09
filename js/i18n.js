/**
 * Advanced Internationalization (i18n) System
 * Supports multiple languages with dynamic loading, caching, and fallback mechanisms
 */

class I18nManager {
    constructor() {
        this.currentLanguage = 'es';
        this.fallbackLanguage = 'en';
        this.translations = {};
        this.cache = new Map();
        this.loadedLanguages = new Set();
        this.observers = [];
        this.loadingPromises = new Map();
        
        // Language detection order
        this.detectionOrder = [
            'localStorage',
            'navigator',
            'url',
            'htmlAttribute'
        ];
        
        // Initialize
        this.init();
    }

    async init() {
        // Detect initial language
        this.currentLanguage = await this.detectLanguage();
        
        // Load translations
        await this.loadTranslations(this.currentLanguage);
        
        // Set HTML lang attribute
        document.documentElement.lang = this.currentLanguage;
        
        // Update meta tags
        this.updateMetaTags();
        
        // Apply translations to DOM
        this.applyTranslations();
        
        // Setup language change observers
        this.setupObservers();
    }

    async detectLanguage() {
        // Check localStorage first
        const storedLang = localStorage.getItem('preferredLanguage');
        if (storedLang && this.isLanguageSupported(storedLang)) {
            return storedLang;
        }

        // Check navigator
        if (navigator.language) {
            const navLang = navigator.language.split('-')[0];
            if (this.isLanguageSupported(navLang)) {
                return navLang;
            }
        }

        // Check URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang && this.isLanguageSupported(urlLang)) {
            return urlLang;
        }

        // Check HTML lang attribute
        const htmlLang = document.documentElement.lang;
        if (htmlLang && this.isLanguageSupported(htmlLang)) {
            return htmlLang;
        }

        // Return fallback
        return this.fallbackLanguage;
    }

    isLanguageSupported(lang) {
        return ['es', 'en', 'fr', 'de', 'zh', 'ja'].includes(lang);
    }

    async loadTranslations(language) {
        // Return cached translations if available
        if (this.cache.has(language)) {
            this.translations[language] = this.cache.get(language);
            return this.translations[language];
        }

        // Check if already loading
        if (this.loadingPromises.has(language)) {
            return await this.loadingPromises.get(language);
        }

        // Create loading promise
        const loadingPromise = this.fetchTranslations(language);
        this.loadingPromises.set(language, loadingPromise);

        try {
            const translations = await loadingPromise;
            this.translations[language] = translations;
            this.cache.set(language, translations);
            this.loadedLanguages.add(language);
            return translations;
        } catch (error) {
            console.error(`Failed to load translations for ${language}:`, error);
            
            // Load fallback if not already loaded
            if (language !== this.fallbackLanguage && !this.loadedLanguages.has(this.fallbackLanguage)) {
                return await this.loadTranslations(this.fallbackLanguage);
            }
            
            throw error;
        } finally {
            this.loadingPromises.delete(language);
        }
    }

    async fetchTranslations(language) {
        try {
            const response = await fetch(`/i18n/translations.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const allTranslations = await response.json();
            return allTranslations[language] || allTranslations[this.fallbackLanguage];
        } catch (error) {
            console.error('Error fetching translations:', error);
            
            // Fallback to embedded translations
            return this.getEmbeddedTranslations(language);
        }
    }

    getEmbeddedTranslations(language) {
        // Embedded fallback translations
        const embedded = {
            es: {
                nav: {
                    home: "Inicio",
                    about: "Sobre Mí",
                    experience: "Experiencia",
                    projects: "Proyectos",
                    skills: "Habilidades",
                    contact: "Contacto"
                },
                hero: {
                    title: "Hola, Soy Oscar de La Cruz",
                    subtitle: "Desarrollador Full Stack & Gaming Enthusiast"
                }
            },
            en: {
                nav: {
                    home: "Home",
                    about: "About",
                    experience: "Experience",
                    projects: "Projects",
                    skills: "Skills",
                    contact: "Contact"
                },
                hero: {
                    title: "Hello, I'm Oscar de La Cruz",
                    subtitle: "Full Stack Developer & Gaming Enthusiast"
                }
            }
        };
        
        return embedded[language] || embedded[this.fallbackLanguage];
    }

    t(key, params = {}) {
        const keys = key.split('.');
        let translation = this.translations[this.currentLanguage];
        
        // Navigate through nested keys
        for (const k of keys) {
            if (translation && typeof translation === 'object' && k in translation) {
                translation = translation[k];
            } else {
                // Try fallback language
                translation = this.translations[this.fallbackLanguage];
                for (const k of keys) {
                    if (translation && typeof translation === 'object' && k in translation) {
                        translation = translation[k];
                    } else {
                        translation = key; // Return key as last resort
                        break;
                    }
                }
                break;
            }
        }
        
        // Handle parameters
        if (typeof translation === 'string' && Object.keys(params).length > 0) {
            return this.interpolate(translation, params);
        }
        
        return translation || key;
    }

    interpolate(str, params) {
        return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return params[key] !== undefined ? params[key] : match;
        });
    }

    async setLanguage(language) {
        if (!this.isLanguageSupported(language)) {
            console.warn(`Language ${language} is not supported`);
            return false;
        }

        if (language === this.currentLanguage) {
            return true;
        }

        try {
            // Load translations if not already loaded
            if (!this.loadedLanguages.has(language)) {
                await this.loadTranslations(language);
            }

            const previousLanguage = this.currentLanguage;
            this.currentLanguage = language;

            // Save preference
            localStorage.setItem('preferredLanguage', language);

            // Update HTML lang attribute
            document.documentElement.lang = language;

            // Update meta tags
            this.updateMetaTags();

            // Apply translations
            this.applyTranslations();

            // Update URL if needed
            this.updateURL(language);

            // Notify observers
            this.notifyObservers(language, previousLanguage);

            return true;
        } catch (error) {
            console.error(`Failed to set language ${language}:`, error);
            return false;
        }
    }

    applyTranslations() {
        // Update elements with data-i18n attributes
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else if (element.tagName === 'IMG') {
                element.alt = translation;
            } else {
                element.textContent = translation;
            }
        });

        // Update elements with data-i18n-html attributes
        const htmlElements = document.querySelectorAll('[data-i18n-html]');
        htmlElements.forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            element.innerHTML = this.t(key);
        });

        // Update page title
        const titleKey = 'meta.title';
        const title = this.t(titleKey);
        if (title && title !== titleKey) {
            document.title = title;
        }
    }

    updateMetaTags() {
        const metaTags = {
            'description': 'meta.description',
            'keywords': 'meta.keywords',
            'og:title': 'meta.title',
            'og:description': 'meta.description',
            'twitter:title': 'meta.title',
            'twitter:description': 'meta.description'
        };

        Object.entries(metaTags).forEach(([property, key]) => {
            const content = this.t(key);
            if (content && content !== key) {
                let element;
                
                if (property.startsWith('og:') || property.startsWith('twitter:')) {
                    element = document.querySelector(`meta[property="${property}"]`);
                } else {
                    element = document.querySelector(`meta[name="${property}"]`);
                }
                
                if (element) {
                    element.content = content;
                }
            }
        });
    }

    updateURL(language) {
        const url = new URL(window.location);
        if (url.searchParams.has('lang')) {
            url.searchParams.set('lang', language);
        } else if (language !== this.fallbackLanguage) {
            url.searchParams.set('lang', language);
        }
        
        // Update URL without page reload
        window.history.replaceState({}, '', url);
    }

    setupObservers() {
        // Observe DOM changes for dynamic content
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            this.applyTranslationsToNode(node);
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    applyTranslationsToNode(node) {
        // Apply to the node itself
        const i18nAttr = node.getAttribute('data-i18n');
        if (i18nAttr) {
            const translation = this.t(i18nAttr);
            if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
                node.placeholder = translation;
            } else if (node.tagName === 'IMG') {
                node.alt = translation;
            } else {
                node.textContent = translation;
            }
        }

        // Apply to children
        const elements = node.querySelectorAll('[data-i18n], [data-i18n-html]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (key) {
                const translation = this.t(key);
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else if (element.tagName === 'IMG') {
                    element.alt = translation;
                } else {
                    element.textContent = translation;
                }
            }
            
            const htmlKey = element.getAttribute('data-i18n-html');
            if (htmlKey) {
                element.innerHTML = this.t(htmlKey);
            }
        });
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

    notifyObservers(newLanguage, previousLanguage) {
        this.observers.forEach(callback => {
            callback(newLanguage, previousLanguage);
        });
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }

    getSupportedLanguages() {
        return [
            { code: 'es', name: 'Español', flag: 'es' },
            { code: 'en', name: 'English', flag: 'gb' },
            { code: 'fr', name: 'Français', flag: 'fr' },
            { code: 'de', name: 'Deutsch', flag: 'de' },
            { code: 'zh', name: 'Chinese', flag: 'cn' },
            { code: 'ja', name: 'Japanese', flag: 'jp' }
        ];
    }

    formatNumber(number, options = {}) {
        try {
            return new Intl.NumberFormat(this.currentLanguage, options).format(number);
        } catch (error) {
            return number.toString();
        }
    }

    formatDate(date, options = {}) {
        try {
            return new Intl.DateTimeFormat(this.currentLanguage, options).format(date);
        } catch (error) {
            return date.toString();
        }
    }

    formatCurrency(amount, currency = 'EUR') {
        try {
            return new Intl.NumberFormat(this.currentLanguage, {
                style: 'currency',
                currency: currency
            }).format(amount);
        } catch (error) {
            return `${currency} ${amount}`;
        }
    }

    // Advanced features
    async preloadLanguages(languages) {
        const promises = languages.filter(lang => 
            !this.loadedLanguages.has(lang) && this.isLanguageSupported(lang)
        ).map(lang => this.loadTranslations(lang));
        
        await Promise.all(promises);
    }

    clearCache() {
        this.cache.clear();
        this.loadedLanguages.clear();
        this.translations = {};
    }

    getTranslationStats() {
        return {
            currentLanguage: this.currentLanguage,
            loadedLanguages: Array.from(this.loadedLanguages),
            cacheSize: this.cache.size,
            supportedLanguages: this.getSupportedLanguages().length
        };
    }
}

// Initialize i18n system
const i18n = new I18nManager();

// Export for global use
window.i18n = i18n;

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        i18n.init();
    });
} else {
    i18n.init();
}
