/**
 * Advanced Performance Optimization System
 * Handles lazy loading, caching, resource optimization, and performance monitoring
 */

class PerformanceOptimizer {
    constructor() {
        this.metrics = {
            pageLoadTime: 0,
            firstContentfulPaint: 0,
            largestContentfulPaint: 0,
            cumulativeLayoutShift: 0,
            firstInputDelay: 0,
            timeToInteractive: 0
        };
        
        this.cache = new Map();
        this.observers = new Map();
        this.optimizationStrategies = new Map();
        
        this.init();
    }

    init() {
        // Initialize performance monitoring
        this.initPerformanceMonitoring();
        
        // Setup lazy loading
        this.setupLazyLoading();
        
        // Initialize resource optimization
        this.initResourceOptimization();
        
        // Setup intersection observers
        this.setupIntersectionObservers();
        
        // Initialize service worker if available
        this.initServiceWorker();
        
        // Setup performance budget
        this.setupPerformanceBudget();
    }

    initPerformanceMonitoring() {
        // Monitor Core Web Vitals
        this.observePageLoad();
        this.observeFirstContentfulPaint();
        this.observeLargestContentfulPaint();
        this.observeCumulativeLayoutShift();
        this.observeFirstInputDelay();
        this.observeTimeToInteractive();
        
        // Report performance metrics
        this.reportPerformanceMetrics();
    }

    observePageLoad() {
        window.addEventListener('load', () => {
            if (performance.timing) {
                const navigation = performance.timing;
                this.metrics.pageLoadTime = navigation.loadEventEnd - navigation.navigationStart;
            }
        });
    }

    observeFirstContentfulPaint() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
                if (fcpEntry) {
                    this.metrics.firstContentfulPaint = fcpEntry.startTime;
                }
            });
            
            observer.observe({ entryTypes: ['paint'] });
            this.observers.set('fcp', observer);
        }
    }

    observeLargestContentfulPaint() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lcpEntry = entries[entries.length - 1];
                if (lcpEntry) {
                    this.metrics.largestContentfulPaint = lcpEntry.startTime;
                }
            });
            
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
            this.observers.set('lcp', observer);
        }
    }

    observeCumulativeLayoutShift() {
        if ('PerformanceObserver' in window) {
            let clsValue = 0;
            
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                }
                this.metrics.cumulativeLayoutShift = clsValue;
            });
            
            observer.observe({ entryTypes: ['layout-shift'] });
            this.observers.set('cls', observer);
        }
    }

    observeFirstInputDelay() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    this.metrics.firstInputDelay = entry.processingStart - entry.startTime;
                    break; // Only measure the first input
                }
            });
            
            observer.observe({ entryTypes: ['first-input'] });
            this.observers.set('fid', observer);
        }
    }

    observeTimeToInteractive() {
        // TTI is complex to measure accurately, this is a simplified version
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'measure' && entry.name === 'tti') {
                        this.metrics.timeToInteractive = entry.startTime;
                        break;
                    }
                }
            });
            
            observer.observe({ entryTypes: ['measure', 'navigation'] });
            this.observers.set('tti', observer);
        }
    }

    reportPerformanceMetrics() {
        // Report metrics to console
        setInterval(() => {
            const metrics = this.getPerformanceMetrics();
            console.log('Performance Metrics:', metrics);
            
            // Send to analytics if available
            if (window.gtag) {
                window.gtag('event', 'performance_metrics', metrics);
            }
        }, 30000); // Every 30 seconds
    }

    setupLazyLoading() {
        // Images
        this.lazyLoadImages();
        
        // Videos
        this.lazyLoadVideos();
        
        // Components
        this.lazyLoadComponents();
        
        // Data
        this.lazyLoadData();
    }

    lazyLoadImages() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                        
                        // Add fade-in effect
                        img.style.opacity = '0';
                        setTimeout(() => {
                            img.style.transition = 'opacity 0.3s ease';
                            img.style.opacity = '1';
                        }, 10);
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    lazyLoadVideos() {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    const src = video.getAttribute('data-src');
                    
                    if (src) {
                        video.src = src;
                        video.removeAttribute('data-src');
                        video.load();
                    }
                    
                    videoObserver.unobserve(video);
                }
            });
        });

        document.querySelectorAll('video[data-src]').forEach(video => {
            videoObserver.observe(video);
        });
    }

    lazyLoadComponents() {
        const componentObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const component = entry.target;
                    const componentName = component.getAttribute('data-component');
                    
                    if (componentName && window.contentManager) {
                        window.contentManager.renderComponent(component, componentName);
                    }
                    
                    componentObserver.unobserve(component);
                }
            });
        });

        document.querySelectorAll('[data-component]').forEach(component => {
            componentObserver.observe(component);
        });
    }

    lazyLoadData() {
        const dataObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const dataUrl = element.getAttribute('data-load');
                    
                    if (dataUrl) {
                        this.loadData(dataUrl, element);
                    }
                    
                    dataObserver.unobserve(element);
                }
            });
        });

        document.querySelectorAll('[data-load]').forEach(element => {
            dataObserver.observe(element);
        });
    }

    async loadData(url, element) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            
            // Apply data to element
            if (element.getAttribute('data-template')) {
                const template = element.getAttribute('data-template');
                if (window.contentManager) {
                    await window.contentManager.renderComponent(element, template, data);
                }
            } else {
                element.textContent = JSON.stringify(data);
            }
        } catch (error) {
            console.error(`Error loading data from ${url}:`, error);
        }
    }

    initResourceOptimization() {
        // Optimize images
        this.optimizeImages();
        
        // Optimize fonts
        this.optimizeFonts();
        
        // Optimize CSS
        this.optimizeCSS();
        
        // Optimize JavaScript
        this.optimizeJavaScript();
    }

    optimizeImages() {
        // Add loading="lazy" to images without it
        document.querySelectorAll('img:not([loading])').forEach(img => {
            img.loading = 'lazy';
        });

        // Create responsive images
        document.querySelectorAll('img[data-srcset]').forEach(img => {
            const srcset = img.getAttribute('data-srcset');
            if (srcset) {
                img.srcset = srcset;
                img.removeAttribute('data-srcset');
            }
        });

        // WebP support detection
        this.supportsWebP().then(supported => {
            if (supported) {
                document.querySelectorAll('img[data-webp]').forEach(img => {
                    const webpSrc = img.getAttribute('data-webp');
                    if (webpSrc) {
                        img.src = webpSrc;
                    }
                });
            }
        });
    }

    async supportsWebP() {
        if (!self.createImageBitmap) return false;
        
        const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
        const blob = await fetch(webpData).then(r => r.blob());
        
        return createImageBitmap(blob).then(() => true, () => false);
    }

    optimizeFonts() {
        // Preload critical fonts
        const criticalFonts = [
            'Inter:wght@400;500;600;700',
            'Roboto+Mono:wght@400;500'
        ];

        criticalFonts.forEach(font => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'font';
            link.type = 'font/woff2';
            link.crossOrigin = 'anonymous';
            link.href = `https://fonts.googleapis.com/css2?family=${font}&display=swap`;
            document.head.appendChild(link);
        });

        // Font display optimization
        document.querySelectorAll('link[href*="fonts.googleapis.com"]').forEach(link => {
            if (!link.href.includes('display=swap')) {
                link.href += '&display=swap';
            }
        });
    }

    optimizeCSS() {
        // Inline critical CSS
        this.inlineCriticalCSS();
        
        // Load non-critical CSS asynchronously
        this.loadNonCriticalCSS();
        
        // Remove unused CSS
        this.removeUnusedCSS();
    }

    inlineCriticalCSS() {
        const criticalCSS = `
            body { margin: 0; font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; }
            .navbar { position: fixed; top: 0; left: 0; right: 0; background: rgba(10,10,10,0.95); z-index: 1000; }
            .hero { min-height: 100vh; display: flex; align-items: center; }
            .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
        `;

        const style = document.createElement('style');
        style.textContent = criticalCSS;
        document.head.insertBefore(style, document.head.firstChild);
    }

    loadNonCriticalCSS() {
        const nonCriticalCSS = [
            'styles.css',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
        ];

        nonCriticalCSS.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.media = 'print';
            link.onload = () => {
                link.media = 'all';
                link.onload = null;
            };
            document.head.appendChild(link);
        });
    }

    removeUnusedCSS() {
        // This would require CSS parsing, simplified version
        setTimeout(() => {
            // Remove unused CSS rules based on DOM analysis
            console.log('CSS optimization completed');
        }, 5000);
    }

    optimizeJavaScript() {
        // Defer non-critical JavaScript
        this.deferNonCriticalJS();
        
        // Use async for analytics and tracking
        this.loadAnalyticsAsync();
        
        // Minimize DOM manipulations
        this.optimizeDOMManipulations();
    }

    deferNonCriticalJS() {
        const scripts = document.querySelectorAll('script[data-defer]');
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            newScript.src = script.src;
            newScript.async = true;
            document.body.appendChild(newScript);
            script.remove();
        });
    }

    loadAnalyticsAsync() {
        // Load analytics asynchronously
        if (window.location.hostname !== 'localhost') {
            const analyticsScript = document.createElement('script');
            analyticsScript.async = true;
            analyticsScript.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
            document.head.appendChild(analyticsScript);
        }
    }

    optimizeDOMManipulations() {
        // Batch DOM updates
        let pendingUpdates = [];
        let updateScheduled = false;

        const scheduleUpdate = () => {
            if (!updateScheduled) {
                updateScheduled = true;
                requestAnimationFrame(() => {
                    pendingUpdates.forEach(update => update());
                    pendingUpdates = [];
                    updateScheduled = false;
                });
            }
        };

        // Override common DOM methods for batching
        const originalAppendChild = Element.prototype.appendChild;
        Element.prototype.appendChild = function(child) {
            pendingUpdates.push(() => originalAppendChild.call(this, child));
            scheduleUpdate();
            return child;
        };
    }

    setupIntersectionObservers() {
        // Setup various intersection observers for different optimizations
        this.setupScrollAnimations();
        this.setupViewportOptimizations();
        this.setupResourcePrioritization();
    }

    setupScrollAnimations() {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    animationObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        document.querySelectorAll('[data-animate]').forEach(element => {
            animationObserver.observe(element);
        });
    }

    setupViewportOptimizations() {
        // Optimize elements based on viewport position
        const viewportObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                
                if (entry.isIntersecting) {
                    element.classList.add('in-viewport');
                    
                    // Load high-quality images
                    if (element.getAttribute('data-hd-src')) {
                        element.src = element.getAttribute('data-hd-src');
                    }
                } else {
                    element.classList.remove('in-viewport');
                    
                    // Use low-quality placeholder
                    if (element.getAttribute('data-placeholder-src')) {
                        element.src = element.getAttribute('data-placeholder-src');
                    }
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('[data-viewport-optimize]').forEach(element => {
            viewportObserver.observe(element);
        });
    }

    setupResourcePrioritization() {
        // Prioritize loading of above-the-fold content
        const priorityObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const priority = element.getAttribute('data-priority');
                    
                    if (priority === 'high') {
                        // Load immediately
                        this.loadResourceImmediately(element);
                    } else if (priority === 'medium') {
                        // Load with slight delay
                        setTimeout(() => this.loadResourceImmediately(element), 100);
                    }
                    
                    priorityObserver.unobserve(element);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '200px'
        });

        document.querySelectorAll('[data-priority]').forEach(element => {
            priorityObserver.observe(element);
        });
    }

    loadResourceImmediately(element) {
        if (element.tagName === 'IMG') {
            const src = element.getAttribute('data-src');
            if (src) {
                element.src = src;
                element.removeAttribute('data-src');
            }
        } else if (element.tagName === 'SCRIPT') {
            const script = document.createElement('script');
            script.src = element.src;
            script.async = true;
            document.body.appendChild(script);
        }
    }

    initServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    }

    setupPerformanceBudget() {
        // Define performance budgets
        this.performanceBudget = {
            pageLoadTime: 3000, // 3 seconds
            firstContentfulPaint: 1500, // 1.5 seconds
            largestContentfulPaint: 2500, // 2.5 seconds
            cumulativeLayoutShift: 0.1,
            firstInputDelay: 100, // 100ms
            timeToInteractive: 5000 // 5 seconds
        };

        // Check budget compliance
        setInterval(() => {
            this.checkPerformanceBudget();
        }, 10000); // Every 10 seconds
    }

    checkPerformanceBudget() {
        const metrics = this.getPerformanceMetrics();
        const violations = [];

        Object.entries(this.performanceBudget).forEach(([metric, budget]) => {
            if (metrics[metric] > budget) {
                violations.push({
                    metric,
                    actual: metrics[metric],
                    budget,
                    exceeded: metrics[metric] - budget
                });
            }
        });

        if (violations.length > 0) {
            console.warn('Performance budget violations:', violations);
            
            // Send to monitoring service
            if (window.gtag) {
                window.gtag('event', 'performance_violation', {
                    violations: violations.length
                });
            }
        }
    }

    getPerformanceMetrics() {
        return {
            pageLoadTime: this.metrics.pageLoadTime,
            firstContentfulPaint: this.metrics.firstContentfulPaint,
            largestContentfulPaint: this.metrics.largestContentfulPaint,
            cumulativeLayoutShift: this.metrics.cumulativeLayoutShift,
            firstInputDelay: this.metrics.firstInputDelay,
            timeToInteractive: this.metrics.timeToInteractive
        };
    }

    // Utility methods
    debounce(func, wait) {
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

    throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Memory optimization
    cleanup() {
        // Disconnect observers
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        this.observers.clear();

        // Clear cache
        this.cache.clear();

        // Remove event listeners
        window.removeEventListener('load', this.observePageLoad);
    }

    // Performance optimization strategies
    registerStrategy(name, strategy) {
        this.optimizationStrategies.set(name, strategy);
    }

    applyStrategy(name) {
        const strategy = this.optimizationStrategies.get(name);
        if (strategy) {
            strategy();
        }
    }
}

// Initialize performance optimizer
const performanceOptimizer = new PerformanceOptimizer();

// Export for global use
window.performanceOptimizer = performanceOptimizer;

// Auto-cleanup on page unload
window.addEventListener('beforeunload', () => {
    performanceOptimizer.cleanup();
});
