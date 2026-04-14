// Advanced Mobile-Specific Interactions and Enhancements

// Mobile Device Detection with capabilities
const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           (window.innerWidth <= 768 && 'ontouchstart' in window);
};

// Advanced Touch State Management
class TouchStateManager {
    constructor() {
        this.touches = new Map();
        this.gestureStartTime = 0;
        this.lastTapTime = 0;
        this.tapCount = 0;
        this.pinchDistance = 0;
        this.isPinching = false;
        this.gestureType = null;
        
        this.init();
    }
    
    init() {
        if (!isMobileDevice()) return;
        
        this.setupAdvancedGestures();
        this.setupMultiTouch();
        this.setupGestureRecognition();
    }
    
    setupAdvancedGestures() {
        // Only track touch events on specific interactive elements, not entire body
        const interactiveElements = document.querySelectorAll('.btn, .nav-link, .project-card, .blog-card, .skill-category');
        
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', (e) => {
                this.handleTouchStart(e);
            }, { passive: true });
            
            element.addEventListener('touchmove', (e) => {
                this.handleTouchMove(e);
            }, { passive: true });
            
            element.addEventListener('touchend', (e) => {
                this.handleTouchEnd(e);
            }, { passive: true });
        });
    }
    
    handleTouchStart(e) {
        const now = Date.now();
        this.gestureStartTime = now;
        
        // Track each touch point
        for (let i = 0; i < e.changedTouches.length; i++) {
            const touch = e.changedTouches[i];
            this.touches.set(touch.identifier, {
                startX: touch.clientX,
                startY: touch.clientY,
                currentX: touch.clientX,
                currentY: touch.clientY,
                startTime: now
            });
        }
        
        // Detect gesture type based on number of touches
        if (e.touches.length === 1) {
            this.gestureType = 'single';
        } else if (e.touches.length === 2) {
            this.gestureType = 'pinch';
            this.calculatePinchDistance(e.touches);
        } else if (e.touches.length > 2) {
            this.gestureType = 'multi';
        }
        
        // Prevent default for certain gestures
        if (this.gestureType === 'pinch') {
            e.preventDefault();
        }
    }
    
    handleTouchMove(e) {
        if (!this.touches.size) return;
        
        // Update touch positions
        for (let i = 0; i < e.changedTouches.length; i++) {
            const touch = e.changedTouches[i];
            const touchData = this.touches.get(touch.identifier);
            if (touchData) {
                touchData.currentX = touch.clientX;
                touchData.currentY = touch.clientY;
            }
        }
        
        // Only handle pinch gestures, allow normal scrolling for single touch
        if (this.gestureType === 'pinch' && e.touches.length === 2) {
            this.handlePinchGesture(e.touches);
        }
        // Don't prevent default for single touch to allow normal scrolling
    }
    
    handleTouchEnd(e) {
        const now = Date.now();
        
        // Handle double-tap detection
        if (e.changedTouches.length === 1) {
            const timeSinceLastTap = now - this.lastTapTime;
            if (timeSinceLastTap < 300) {
                this.tapCount++;
                if (this.tapCount === 2) {
                    this.handleDoubleTap(e.changedTouches[0]);
                    this.tapCount = 0;
                }
            } else {
                this.tapCount = 1;
            }
            this.lastTapTime = now;
        }
        
        // Remove ended touches
        for (let i = 0; i < e.changedTouches.length; i++) {
            this.touches.delete(e.changedTouches[i].identifier);
        }
        
        // Reset gesture type if no touches remain
        if (this.touches.size === 0) {
            this.gestureType = null;
            this.isPinching = false;
        }
    }
    
    handleTouchCancel(e) {
        // Clear all touches on cancel
        this.touches.clear();
        this.gestureType = null;
        this.isPinching = false;
    }
    
    calculatePinchDistance(touches) {
        if (touches.length < 2) return;
        
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        this.pinchDistance = Math.sqrt(dx * dx + dy * dy);
    }
    
    handlePinchGesture(touches) {
        if (touches.length < 2) return;
        
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        const currentDistance = Math.sqrt(dx * dx + dy * dy);
        
        if (!this.isPinching) {
            this.pinchDistance = currentDistance;
            this.isPinching = true;
            return;
        }
        
        const scale = currentDistance / this.pinchDistance;
        this.handleZoom(scale);
        
        this.pinchDistance = currentDistance;
    }
    
    handleZoom(scale) {
        // Apply zoom to readable content
        const target = document.querySelector('.hero-content, .blog-content, .project-card:hover');
        if (target) {
            const currentScale = parseFloat(target.style.transform.replace('scale(', '').replace(')', '') || 1);
            const newScale = Math.max(0.8, Math.min(2, currentScale * scale));
            
            target.style.transform = `scale(${newScale})`;
            target.style.transformOrigin = 'center';
            target.style.transition = 'transform 0.1s ease';
        }
    }
    
    handleDoubleTap(touch) {
        // Double tap to zoom
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        if (element) {
            this.toggleZoom(element);
        }
    }
    
    toggleZoom(element) {
        const currentScale = parseFloat(element.style.transform.replace('scale(', '').replace(')', '') || 1);
        const newScale = currentScale === 1 ? 1.5 : 1;
        
        element.style.transform = `scale(${newScale})`;
        element.style.transformOrigin = 'center';
        element.style.transition = 'transform 0.3s ease';
        
        // Add visual feedback
        this.createZoomFeedback(element, newScale);
    }
    
    createZoomFeedback(element, scale) {
        const feedback = document.createElement('div');
        feedback.className = 'zoom-feedback';
        feedback.innerHTML = scale > 1 ? '150%' : '100%';
        feedback.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(220, 38, 38, 0.9);
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
            z-index: 1000;
            pointer-events: none;
            animation: fade-out 1s ease-out forwards;
        `;
        
        element.style.position = 'relative';
        element.appendChild(feedback);
        
        setTimeout(() => feedback.remove(), 1000);
    }
    
    handleSingleTouchMove(touch) {
        // Handle swipe gestures and drag interactions
        const touchData = this.touches.get(touch.identifier);
        if (!touchData) return;
        
        const deltaX = touch.currentX - touch.startX;
        const deltaY = touch.currentY - touch.startY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (distance > 10) {
            this.handleSwipe(touchData, deltaX, deltaY);
        }
    }
    
    handleSwipe(touchData, deltaX, deltaY) {
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);
        
        if (absX > absY && absX > 50) {
            // Horizontal swipe
            if (deltaX > 0) {
                this.handleSwipeRight(touchData);
            } else {
                this.handleSwipeLeft(touchData);
            }
        } else if (absY > absX && absY > 50) {
            // Vertical swipe
            if (deltaY > 0) {
                this.handleSwipeDown(touchData);
            } else {
                this.handleSwipeUp(touchData);
            }
        }
    }
    
    handleSwipeRight(touchData) {
        // Swipe right - next section or open menu
        this.navigateToSection('next');
    }
    
    handleSwipeLeft(touchData) {
        // Swipe left - previous section or close menu
        this.navigateToSection('prev');
    }
    
    handleSwipeUp(touchData) {
        // Swipe up - scroll to next section
        this.scrollToSection('next');
    }
    
    handleSwipeDown(touchData) {
        // Swipe down - scroll to previous section or refresh
        if (window.scrollY === 0) {
            this.triggerRefresh();
        } else {
            this.scrollToSection('prev');
        }
    }
    
    navigateToSection(direction) {
        const sections = document.querySelectorAll('section[id]');
        const currentSection = this.getCurrentSection();
        const currentIndex = Array.from(sections).indexOf(currentSection);
        
        let targetIndex;
        if (direction === 'next') {
            targetIndex = Math.min(currentIndex + 1, sections.length - 1);
        } else {
            targetIndex = Math.max(currentIndex - 1, 0);
        }
        
        if (sections[targetIndex]) {
            sections[targetIndex].scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    scrollToSection(direction) {
        const currentScroll = window.scrollY;
        const sections = document.querySelectorAll('section[id]');
        
        for (let section of sections) {
            const rect = section.getBoundingClientRect();
            if (direction === 'next' && rect.top > 100) {
                section.scrollIntoView({ behavior: 'smooth' });
                break;
            } else if (direction === 'prev' && rect.top < -100) {
                section.scrollIntoView({ behavior: 'smooth' });
                break;
            }
        }
    }
    
    getCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        for (let section of sections) {
            const rect = section.getBoundingClientRect();
            const absoluteTop = rect.top + window.scrollY;
            
            if (absoluteTop <= scrollPosition && absoluteTop + rect.height > scrollPosition) {
                return section;
            }
        }
        
        return sections[0];
    }
    
    triggerRefresh() {
        // Visual refresh indicator
        const indicator = document.createElement('div');
        indicator.className = 'refresh-indicator';
        indicator.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Actualizando...';
        indicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: var(--accent-color);
            color: white;
            padding: 10px;
            text-align: center;
            z-index: 9999;
            animation: slide-down 0.3s ease-out;
        `;
        
        document.body.appendChild(indicator);
        
        setTimeout(() => {
            location.reload();
        }, 1000);
    }
    
    setupMultiTouch() {
        // Handle 3+ finger gestures - only on specific elements to avoid blocking scroll
        const interactiveElements = document.querySelectorAll('.btn, .nav-link, .project-card, .blog-card, .skill-category');
        
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', (e) => {
                if (e.touches.length >= 3) {
                    this.handleMultiTouchGesture(e.touches);
                }
            }, { passive: true });
        });
    }
    
    handleMultiTouchGesture(touches) {
        if (touches.length === 3) {
            // Three finger gesture - toggle dark mode or special action
            this.toggleSpecialMode();
        } else if (touches.length === 4) {
            // Four finger gesture - screenshot or share
            this.triggerSpecialAction();
        }
    }
    
    toggleSpecialMode() {
        document.body.classList.toggle('high-contrast-mode');
        this.showGestureFeedback('Modo especial activado');
    }
    
    triggerSpecialAction() {
        // Take screenshot or share functionality
        if (navigator.share) {
            navigator.share({
                title: 'Oscar de la Cruz - Portfolio',
                text: 'Check out this amazing portfolio!',
                url: window.location.href
            });
        }
    }
    
    showGestureFeedback(message) {
        const feedback = document.createElement('div');
        feedback.className = 'gesture-feedback';
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            font-size: 16px;
            z-index: 10000;
            animation: fade-in-out 2s ease-in-out;
        `;
        
        document.body.appendChild(feedback);
        setTimeout(() => feedback.remove(), 2000);
    }
    
    setupGestureRecognition() {
        // Add gesture hints for users
        this.addGestureHints();
    }
    
    addGestureHints() {
        const hint = document.createElement('div');
        hint.className = 'gesture-hints';
        hint.innerHTML = `
            <div class="hint-item">
                <i class="fas fa-hand-point-up"></i>
                <span>Tap: Acción normal</span>
            </div>
            <div class="hint-item">
                <i class="fas fa-hand-peace"></i>
                <span>Doble tap: Zoom</span>
            </div>
            <div class="hint-item">
                <i class="fas fa-arrows-alt-h"></i>
                <span>Swipe: Navegar</span>
            </div>
            <div class="hint-item">
                <i class="fas fa-search-plus"></i>
                <span>Pinch: Zoom</span>
            </div>
        `;
        
        hint.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px;
            border-radius: 8px;
            font-size: 12px;
            z-index: 1000;
            max-width: 200px;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;
        
        document.body.appendChild(hint);
        
        // Show hints on first load
        setTimeout(() => {
            hint.style.opacity = '1';
            setTimeout(() => {
                hint.style.opacity = '0';
                setTimeout(() => hint.remove(), 300);
            }, 5000);
        }, 1000);
    }
}

// Enhanced Touch Interactions
class MobileTouchHandler {
    constructor() {
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchEndX = 0;
        this.touchEndY = 0;
        this.longPressTimer = null;
        this.isLongPress = false;
        
        this.init();
    }
    
    init() {
        if (!isMobileDevice()) return;
        
        // Add touch event listeners to interactive elements
        this.addTouchListeners();
        this.setupGestures();
        this.setupLongPress();
    }
    
    addTouchListeners() {
        const interactiveElements = document.querySelectorAll('.btn, .nav-link, .project-card, .blog-card, .skill-category');
        
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
            element.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
            element.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: true });
        });
    }
    
    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
        this.isLongPress = false;
        
        // Start long press timer
        this.longPressTimer = setTimeout(() => {
            this.isLongPress = true;
            this.handleLongPress(e.target);
        }, 500);
        
        // Add visual feedback
        e.target.style.transform = 'scale(0.95)';
        e.target.style.transition = 'transform 0.1s ease';
    }
    
    handleTouchEnd(e) {
        clearTimeout(this.longPressTimer);
        
        // Remove visual feedback
        e.target.style.transform = '';
        
        if (!this.isLongPress) {
            // Handle regular tap
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            
            // Check if it was a tap (not a scroll)
            const distance = Math.sqrt(
                Math.pow(touchEndX - this.touchStartX, 2) + 
                Math.pow(touchEndY - this.touchStartY, 2)
            );
            
            if (distance < 10) {
                this.handleTap(e.target);
            }
        }
    }
    
    handleTouchMove() {
        // Cancel long press on move
        clearTimeout(this.longPressTimer);
    }
    
    handleTap(element) {
        // Add haptic feedback simulation (visual)
        this.createTapFeedback(element);
        
        // Handle specific element types
        if (element.classList.contains('project-card')) {
            this.handleProjectCardTap(element);
        } else if (element.classList.contains('blog-card')) {
            this.handleBlogCardTap(element);
        }
    }
    
    handleLongPress(element) {
        // Long press functionality
        if (element.classList.contains('project-card') || element.classList.contains('blog-card')) {
            this.showContextMenu(element);
        }
    }
    
    createTapFeedback(element) {
        const feedback = document.createElement('div');
        feedback.className = 'tap-feedback';
        feedback.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            background: rgba(220, 38, 38, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: tap-feedback 0.3s ease-out;
            z-index: 1000;
        `;
        
        const rect = element.getBoundingClientRect();
        feedback.style.left = (rect.width / 2 - 10) + 'px';
        feedback.style.top = (rect.height / 2 - 10) + 'px';
        
        element.style.position = 'relative';
        element.appendChild(feedback);
        
        setTimeout(() => feedback.remove(), 300);
    }
    
    handleProjectCardTap(card) {
        // Quick action for project cards
        const link = card.querySelector('.project-link');
        if (link && this.touchStartX > card.offsetWidth * 0.7) {
            // Tap on right side = quick link
            link.click();
        }
    }
    
    handleBlogCardTap(card) {
        // Quick action for blog cards
        const link = card.querySelector('.blog-link');
        if (link && this.touchStartX > card.offsetWidth * 0.7) {
            // Tap on right side = quick read
            link.click();
        }
    }
    
    showContextMenu(element) {
        // Create custom context menu for mobile
        const existingMenu = document.querySelector('.mobile-context-menu');
        if (existingMenu) existingMenu.remove();
        
        const menu = document.createElement('div');
        menu.className = 'mobile-context-menu';
        menu.innerHTML = `
            <div class="context-menu-item" data-action="share">Compartir</div>
            <div class="context-menu-item" data-action="copy">Copiar enlace</div>
            <div class="context-menu-item" data-action="open">Abrir</div>
        `;
        
        document.body.appendChild(menu);
        
        // Position menu
        const rect = element.getBoundingClientRect();
        menu.style.cssText = `
            position: fixed;
            top: ${rect.bottom + 10}px;
            left: ${rect.left}px;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 9999;
            min-width: 150px;
        `;
        
        // Handle menu clicks
        menu.addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            this.handleContextMenuAction(action, element);
            menu.remove();
        });
        
        // Close menu on outside click
        setTimeout(() => {
            document.addEventListener('click', () => menu.remove(), { once: true });
        }, 100);
    }
    
    handleContextMenuAction(action, element) {
        switch (action) {
            case 'share':
                this.shareContent(element);
                break;
            case 'copy':
                this.copyLink(element);
                break;
            case 'open':
                element.querySelector('a').click();
                break;
        }
    }
    
    shareContent(element) {
        const title = element.querySelector('h3').textContent;
        const url = element.querySelector('a').href;
        
        if (navigator.share) {
            navigator.share({
                title: title,
                url: url
            });
        } else {
            // Fallback
            this.copyToClipboard(url);
            this.showMobileMessage('Enlace copiado al portapapeles', 'success');
        }
    }
    
    copyLink(element) {
        const url = element.querySelector('a').href;
        this.copyToClipboard(url);
        this.showMobileMessage('Enlace copiado al portapapeles', 'success');
    }
    
    copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
    
    showMobileMessage(message, type = 'info') {
        // Reuse the existing showMobileMessage function if available
        if (typeof showMobileMessage === 'function') {
            showMobileMessage(message, type);
        }
    }
    
    setupGestures() {
        // Swipe gestures for navigation
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const diffX = endX - startX;
            const diffY = endY - startY;
            
            // Horizontal swipe
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.handleSwipeRight();
                } else {
                    this.handleSwipeLeft();
                }
            }
        }, { passive: true });
    }
    
    handleSwipeRight() {
        // Swipe right - could open navigation or go back
        const navMenu = document.querySelector('.nav-menu');
        if (!navMenu.classList.contains('active')) {
            document.getElementById('mobile-menu')?.click();
        }
    }
    
    handleSwipeLeft() {
        // Swipe left - could close navigation or go forward
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu.classList.contains('active')) {
            document.getElementById('mobile-menu')?.click();
        }
    }
    
    setupLongPress() {
        // Additional long press functionality for special elements
        const specialElements = document.querySelectorAll('.hero-title, .section-title');
        
        specialElements.forEach(element => {
            let pressTimer;
            
            element.addEventListener('touchstart', () => {
                pressTimer = setTimeout(() => {
                    this.handleSpecialLongPress(element);
                }, 800);
            });
            
            element.addEventListener('touchend', () => {
                clearTimeout(pressTimer);
            });
        });
    }
    
    handleSpecialLongPress(element) {
        // Special actions for long press on titles
        this.showMobileMessage('Mantén presionado para más opciones', 'info');
    }
}

// Mobile Performance Optimizations
class MobilePerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        if (!isMobileDevice()) return;
        
        this.optimizeImages();
        this.optimizeAnimations();
        this.setupIntersectionObserver();
        this.optimizeScroll();
    }
    
    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
            img.decoding = 'async';
        });
    }
    
    optimizeAnimations() {
        // Reduce animation complexity on mobile
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                * {
                    animation-duration: 0.2s !important;
                    transition-duration: 0.2s !important;
                }
                
                .hero, .project-card, .blog-card {
                    transform: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setupIntersectionObserver() {
        // Lazy load sections
        const sections = document.querySelectorAll('section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        sections.forEach(section => observer.observe(section));
    }
    
    optimizeScroll() {
        let ticking = false;
        
        const optimizedScroll = () => {
            // Throttled scroll operations
            this.updateScrollPosition();
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(optimizedScroll);
                ticking = true;
            }
        }, { passive: true });
    }
    
    updateScrollPosition() {
        const scrolled = window.scrollY;
        const navbar = document.querySelector('.navbar');
        
        if (navbar) {
            if (scrolled > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = '';
                navbar.style.backdropFilter = '';
            }
        }
    }
}

// Advanced Mobile Performance Optimizations
class MobilePerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        if (!isMobileDevice()) return;
        
        this.optimizeImages();
        this.optimizeAnimations();
        this.setupIntersectionObserver();
        this.optimizeScroll();
        this.setupServiceWorker();
        this.optimizeMemory();
    }
    
    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
            img.decoding = 'async';
            
            // Add error handling
            img.addEventListener('error', () => {
                img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDMyMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMjQwIiBmaWxsPSIjMUYxRjFGIi8+CjxwYXRoIGQ9Ik0xNjAgMTIwQzE2MCAxMDIuNCAxNDUuNiA4OCAxMjggODhDMTA5LjMgODggOTYuMSAxMDIuNCA5Ni4xIDEyMEM5Ni4xIDEzNy42IDEwOS4zIDE1MiAxMjggMTUyQzE0NS42IDE1MiAxNjAgMTM3LjYgMTYwIDEyMFoiIGZpbGw9IiM0NDRBOTQiLz4KPHN2ZyB4PSIxNjAiIHk9IjgwIiB3aWR0aD0iMjQiIGhlaWdodD0iODAiPgo8cGF0aCBkPSJNMTIgNEMxMiAyIDEwIDQgMTAgNEM0IDQgMiA2IDIgOEMyIDEwIDQgMTIgNCAxMkM0IDE0IDIgMTYgMiAxOEMyIDIwIDQgMjIgNCAyMkM0IDI0IDYgMjYgNiAyNkM2IDI4IDQgMzAgNCAzMEM0IDM0IDIgMzYgMiAzOEMyIDQwIDQgNDIgNCA0MkM0IDQ0IDYgNDYgNiA0NkM2IDQ4IDQgNTAgNCA1MkM0IDU0IDIgNTYgMiA1OEMyIDYwIDQgNjIgNCA2MkM0IDY0IDYgNjYgNiA2NkM2IDY4IDQgNzAgNCA3MkM0IDc0IDIgNzYgMiA3OEMyIDgwIDQgODIgNCA4MkM0IDg0IDYgODYgNiA4NkM2IDg4IDQgOTAgNCA5MkM0IDk0IDIgOTYgMiA5OEMyIDEwMCA0IDEwMiA0IDEwMkM0IDEwNCA2IDEwNiA2IDEwNkM2IDEwOCA0IDExMCA0IDExMkM0IDExNCAyIDExNiAyIDExOEMyIDEyMCA0IDEyMiA0IDEyMkM0IDEyNCA2IDEyNiA2IDEyNkM2IDEyOCA0IDEzMCA0IDEzMkM0IDEzNCAyIDEzNiAyIDEzOEMyIDE0MCA0IDE0MiA0IDE0MkM0IDE0NCA2IDE0NiA2IDE0NkM2IDE0OCA0IDE1MCA0IDE1MkM0IDE1NCAyIDE1NiAyIDE1OEMyIDE2MCA0IDE2MiA0IDE2MkM0IDE2NCA2IDE2NiA2IDE2NkM2IDE2OCA0IDE3MCA0IDE3MkM0IDE3NCAyIDE3NiAyIDE3OEMyIDE4MCA0IDE4MiA0IDE4MkM0IDE4NCA2IDE4NiA2IDE4NkM2IDE4OCA0IDE5MCA0IDE5MkM0IDE5NCAyIDE5NiAyIDE5OEMyIDIwMCA0IDIwMiA0IDIwMkM0IDIwNCA2IDIwNiA2IDIwNkM2IDIwOCA0IDIxMCA0IDIxMkM0IDIxNCAyIDIxNiAyIDIxOEMyIDIyMCA0IDIyMiA0IDIyMkM0IDIyNCA2IDIyNiA2IDIyNkM2IDIyOCA0IDIzMCA0IDIzMkM0IDIzNCAyIDIzNiAyIDIzOEMyIDI0MCA0IDI0MiA0IDI0MkM0IDI0NCA2IDI0NiA2IDI0NkM2IDI0OCA0IDI1MCA0IDI1MkM0IDI1NCAyIDI1NiAyIDI1OEMyIDI2MCA0IDI2MiA0IDI2MkM0IDI2NCA2IDI2NiA2IDI2NkM2IDI2OCA0IDI3MCA0IDI3MkM0IDI3NCAyIDI3NiAyIDI3OEMyIDI4MCA0IDI4MiA0IDI4MkM0IDI4NCA2IDI4NiA2IDI4NkM2IDI4OCA0IDI5MCA0IDI5MkM0IDI5NCAyIDI5NiAyIDI5OEMyIDMwMCA0IDMwMiA0IDMwMkM0IDMwNCA2IDMwNiA2IDMwNkM2IDMwOCA0IDMxMCA0IDMxMkM0IDMxNCAyIDMxNiAyIDMxOEMyIDMyMCA0IDMyMiA0IDMyMkM0IDMyNCA2IDMyNiA2IDMyNkM2IDMyOCA0IDMzMCA0IDMzMkM0IDMzNCAyIDMzNiAyIDMzOEMyIDM0MCA0IDM0MiA0IDM0MkM0IDM0NCA2IDM0NiA2IDM0NkM2IDM0OCA0IDM1MCA0IDM1MkM0IDM1NCAyIDM1NiAyIDM1OEMyIDM2MCA0IDM2MiA0IDM2MkM0IDM2NCA2IDM2NiA2IDM2NkM2IDM2OCA0IDM3MCA0IDM3MkM0IDM3NCAyIDM3NiAyIDM3OEMyIDM4MCA0IDM4MiA0IDM4MkM0IDM4NCA2IDM4NiA2IDM4NkM2IDM4OCA0IDM5MCA0IDM5MkM0IDM5NCAyIDM5NiAyIDM5OEMyIDQwMCA0IDQwMiA0IDQwMkM0IDQwNCA2IDQwNiA2IDQwNkM2IDQwOCA0IDQxMCA0IDQxMkM0IDQxNCAyIDQxNiAyIDQxOEMyIDQyMCA0IDQyMiA0IDQyMkM0IDQyNCA2IDQyNiA2IDQyNkM2IDQyOCA0IDQzMCA0IDQzMkM0IDQzNCAyIDQzNiAyIDQzOEMyIDQ0MCA0IDQ0MiA0IDQ0MkM0IDQ0NCA2IDQ0NiA2IDQ0NkM2IDQ0OCA0IDQ1MCA0IDQ1MkM0IDQ1NCAyIDQ1NiAyIDQ1OEMyIDQ2MCA0IDQ2MiA0IDQ2MkM0IDQ2NCA2IDQ2NiA2IDQ2NkM2IDQ2OCA0IDQ3MCA0IDQ3MkM0IDQ3NCAyIDQ3NiAyIDQ3OEMyIDQ4MCA0IDQ4MiA0IDQ4MkM0IDQ4NCA2IDQ4NiA2IDQ4NkM2IDQ4OCA0IDQ5MCA0IDQ5MkM0IDQ5NCAyIDQ5NiAyIDQ5OEMyIDUwMCA1MCA1MDAiIGZpbGw9IiM0NDRBOTQiLz4KPC9zdmc+Cg==';
            });
        });
    }
    
    optimizeAnimations() {
        // Reduce animation complexity on mobile
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                * {
                    animation-duration: 0.2s !important;
                    transition-duration: 0.2s !important;
                }
                
                .hero, .project-card, .blog-card {
                    transform: none !important;
                }
                
                body {
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setupIntersectionObserver() {
        // Lazy load sections with performance optimization
        const sections = document.querySelectorAll('section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Stop observing after first intersection
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px 0px'
        });
        
        sections.forEach(section => observer.observe(section));
    }
    
    optimizeScroll() {
        let ticking = false;
        let scrollTimeout;
        
        const optimizedScroll = () => {
            // Throttled scroll operations
            this.updateScrollPosition();
            this.lazyLoadImages();
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(optimizedScroll);
                ticking = true;
            }
            
            // Clear existing timeout
            clearTimeout(scrollTimeout);
            
            // Set new timeout for scroll end detection
            scrollTimeout = setTimeout(() => {
                this.onScrollEnd();
            }, 150);
        }, { passive: true });
    }
    
    updateScrollPosition() {
        const scrolled = window.scrollY;
        const navbar = document.querySelector('.navbar');
        
        if (navbar) {
            if (scrolled > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = '';
                navbar.style.backdropFilter = '';
            }
        }
    }
    
    lazyLoadImages() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            if (img.getBoundingClientRect().top < window.innerHeight + 200) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
            }
        });
    }
    
    onScrollEnd() {
        // Perform expensive operations only when scroll ends
        this.updateActiveSection();
        this.preloadNextSection();
    }
    
    updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const absoluteTop = rect.top + window.scrollY;
            
            if (absoluteTop <= scrollPosition && absoluteTop + rect.height > scrollPosition) {
                // Update active section indicator
                document.body.setAttribute('data-active-section', section.id);
            }
        });
    }
    
    preloadNextSection() {
        const currentSection = document.querySelector('[data-active-section]');
        if (!currentSection) return;
        
        const sectionId = currentSection.getAttribute('data-active-section');
        const nextSection = document.querySelector(`section[id="${sectionId}"] ~ section[id]`);
        
        if (nextSection) {
            // Preload images in next section
            const images = nextSection.querySelectorAll('img[data-src]');
            images.forEach(img => {
                if (img.dataset.src) {
                    const preloadImg = new Image();
                    preloadImg.src = img.dataset.src;
                }
            });
        }
    }
    
    setupServiceWorker() {
        // Register service worker for caching
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered:', registration);
                })
                .catch(error => {
                    console.log('SW registration failed:', error);
                });
        }
    }
    
    optimizeMemory() {
        // Memory management for mobile
        const cleanup = () => {
            // Clean up unused event listeners
            const unusedElements = document.querySelectorAll('.removed');
            unusedElements.forEach(el => el.remove());
            
            // Force garbage collection hint
            if (window.gc) {
                window.gc();
            }
        };
        
        // Run cleanup periodically
        setInterval(cleanup, 30000);
        
        // Run cleanup on page hide
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                cleanup();
            }
        });
    }
}

// Initialize all mobile enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Initialize advanced touch state management
    new TouchStateManager();
    
    // Initialize basic touch interactions
    new MobileTouchHandler();
    
    // Initialize performance optimizations
    new MobilePerformanceOptimizer();
    
    // Add mobile-specific CSS
    const mobileCSS = document.createElement('style');
    mobileCSS.textContent = `
        @keyframes tap-feedback {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .mobile-context-menu {
            animation: slide-up 0.3s ease-out;
        }
        
        @keyframes slide-up {
            from {
                transform: translateY(10px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        .context-menu-item {
            padding: 12px 16px;
            cursor: pointer;
            border-bottom: 1px solid var(--border-color);
            transition: background 0.2s ease;
        }
        
        .context-menu-item:hover {
            background: var(--bg-hover);
        }
        
        .context-menu-item:last-child {
            border-bottom: none;
        }
        
        /* Performance optimizations */
        img.loaded {
            animation: fade-in 0.3s ease-out;
        }
        
        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        /* Reduced motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    document.head.appendChild(mobileCSS);
    
    // Add mobile device class
    if (isMobileDevice()) {
        document.body.classList.add('mobile-device');
    }
});
