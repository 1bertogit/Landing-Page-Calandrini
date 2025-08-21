// ==============================================
// UI Manager - User Interface Components
// ==============================================

class UIManager {
    constructor() {
        this.activeModal = null;
        this.toastQueue = [];
        this.loadingStack = 0;
        this.shortcuts = new Map();
        
        this.init();
    }

    init() {
        this.setupKeyboardShortcuts();
        this.setupTooltips();
        this.setupResponsiveHandlers();
        console.log('🎨 UI Manager initialized');
    }

    // Modal Management
    showModal(modalId, options = {}) {
        const modal = document.getElementById(modalId);
        if (!modal) {
            console.error(`Modal ${modalId} not found`);
            return false;
        }

        // Close any existing modal
        if (this.activeModal && this.activeModal !== modalId) {
            this.hideModal(this.activeModal);
        }

        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
        this.activeModal = modalId;

        // Focus management
        if (options.focusElement) {
            setTimeout(() => {
                const element = modal.querySelector(options.focusElement);
                if (element) element.focus();
            }, 100);
        }

        // Animation
        if (options.animate !== false) {
            modal.style.opacity = '0';
            modal.style.transform = 'scale(0.95)';
            
            requestAnimationFrame(() => {
                modal.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
                modal.style.opacity = '1';
                modal.style.transform = 'scale(1)';
            });
        }

        return true;
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return false;

        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
        
        if (this.activeModal === modalId) {
            this.activeModal = null;
        }

        // Reset styles
        modal.style.opacity = '';
        modal.style.transform = '';
        modal.style.transition = '';

        return true;
    }

    // Loading States
    showLoading(message = 'Carregando...', target = null) {
        this.loadingStack++;
        
        if (target) {
            this.showElementLoading(target, message);
        } else {
            this.showGlobalLoading(message);
        }
    }

    hideLoading(target = null) {
        this.loadingStack = Math.max(0, this.loadingStack - 1);
        
        if (target) {
            this.hideElementLoading(target);
        } else if (this.loadingStack === 0) {
            this.hideGlobalLoading();
        }
    }

    showGlobalLoading(message) {
        const overlay = document.getElementById('loadingOverlay');
        const text = document.getElementById('loadingText');
        
        if (overlay && text) {
            text.textContent = message;
            overlay.classList.remove('hidden');
            overlay.classList.add('flex');
        }
    }

    hideGlobalLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.add('hidden');
            overlay.classList.remove('flex');
        }
    }

    showElementLoading(element, message) {
        if (typeof element === 'string') {
            element = document.getElementById(element) || document.querySelector(element);
        }
        
        if (!element) return;

        // Create loading overlay for element
        const overlay = document.createElement('div');
        overlay.className = 'absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10';
        overlay.innerHTML = `
            <div class="text-center">
                <div class="loading-spinner mx-auto mb-2"></div>
                <p class="text-sm text-gray-600">${message}</p>
            </div>
        `;

        element.style.position = 'relative';
        element.appendChild(overlay);
        element.dataset.loading = 'true';
    }

    hideElementLoading(element) {
        if (typeof element === 'string') {
            element = document.getElementById(element) || document.querySelector(element);
        }
        
        if (!element || element.dataset.loading !== 'true') return;

        const overlay = element.querySelector('.absolute.inset-0');
        if (overlay) {
            overlay.remove();
        }
        
        delete element.dataset.loading;
    }

    // Toast Notifications
    showToast(message, type = 'info', duration = 5000, actions = []) {
        const toast = this.createToast(message, type, duration, actions);
        const container = document.getElementById('toastContainer');
        
        if (!container) {
            console.error('Toast container not found');
            return;
        }

        container.appendChild(toast);
        
        // Animate in
        requestAnimationFrame(() => {
            toast.style.transform = 'translateX(0)';
            toast.style.opacity = '1';
        });

        // Auto remove
        if (duration > 0) {
            setTimeout(() => {
                this.removeToast(toast);
            }, duration);
        }

        return toast;
    }

    createToast(message, type, duration, actions) {
        const toast = document.createElement('div');
        
        const typeClasses = {
            'success': 'bg-green-500 border-green-600',
            'error': 'bg-red-500 border-red-600',
            'warning': 'bg-yellow-500 border-yellow-600',
            'info': 'bg-blue-500 border-blue-600'
        };

        const typeIcons = {
            'success': 'fas fa-check-circle',
            'error': 'fas fa-exclamation-circle',
            'warning': 'fas fa-exclamation-triangle',
            'info': 'fas fa-info-circle'
        };

        toast.className = `${typeClasses[type]} text-white px-6 py-4 rounded-lg shadow-lg border-l-4 max-w-md transform translate-x-full opacity-0 transition-all duration-300 ease-out`;
        
        let actionsHTML = '';
        if (actions.length > 0) {
            actionsHTML = `
                <div class="flex space-x-2 mt-2">
                    ${actions.map(action => `
                        <button onclick="${action.onClick}" class="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded">
                            ${action.text}
                        </button>
                    `).join('')}
                </div>
            `;
        }

        toast.innerHTML = `
            <div class="flex items-start">
                <i class="${typeIcons[type]} text-lg mr-3 mt-0.5"></i>
                <div class="flex-1">
                    <p class="text-sm font-medium">${message}</p>
                    ${actionsHTML}
                </div>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        return toast;
    }

    removeToast(toast) {
        toast.style.transform = 'translateX(full)';
        toast.style.opacity = '0';
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }

    // Form Helpers
    validateForm(formElement) {
        const inputs = formElement.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        const errors = [];

        inputs.forEach(input => {
            const value = input.value.trim();
            const fieldName = input.getAttribute('data-field-name') || input.name || input.id;

            // Clear previous error state
            this.clearFieldError(input);

            if (!value) {
                this.showFieldError(input, `${fieldName} é obrigatório`);
                errors.push(`${fieldName} é obrigatório`);
                isValid = false;
            } else {
                // Type-specific validation
                if (input.type === 'email' && !this.isValidEmail(value)) {
                    this.showFieldError(input, 'Email inválido');
                    errors.push('Email inválido');
                    isValid = false;
                }
            }
        });

        return { isValid, errors };
    }

    showFieldError(input, message) {
        input.classList.add('border-red-500', 'bg-red-50');
        
        // Remove existing error message
        const existingError = input.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        // Add error message
        const errorElement = document.createElement('p');
        errorElement.className = 'field-error text-red-500 text-xs mt-1';
        errorElement.textContent = message;
        input.parentNode.appendChild(errorElement);
    }

    clearFieldError(input) {
        input.classList.remove('border-red-500', 'bg-red-50');
        
        const errorElement = input.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Button States
    setButtonLoading(button, loadingText = 'Carregando...') {
        if (typeof button === 'string') {
            button = document.getElementById(button) || document.querySelector(button);
        }
        
        if (!button) return;

        button.dataset.originalText = button.textContent;
        button.textContent = loadingText;
        button.disabled = true;
        button.classList.add('opacity-75', 'cursor-not-allowed');
    }

    setButtonSuccess(button, successText = 'Sucesso!', duration = 2000) {
        if (typeof button === 'string') {
            button = document.getElementById(button) || document.querySelector(button);
        }
        
        if (!button) return;

        const originalText = button.dataset.originalText || button.textContent;
        button.textContent = successText;
        button.classList.remove('opacity-75', 'cursor-not-allowed');
        button.classList.add('bg-green-500');

        setTimeout(() => {
            this.resetButton(button);
        }, duration);
    }

    setButtonError(button, errorText = 'Erro', duration = 3000) {
        if (typeof button === 'string') {
            button = document.getElementById(button) || document.querySelector(button);
        }
        
        if (!button) return;

        const originalText = button.dataset.originalText || button.textContent;
        button.textContent = errorText;
        button.classList.remove('opacity-75', 'cursor-not-allowed');
        button.classList.add('bg-red-500');
        button.disabled = false;

        setTimeout(() => {
            this.resetButton(button);
        }, duration);
    }

    resetButton(button) {
        if (typeof button === 'string') {
            button = document.getElementById(button) || document.querySelector(button);
        }
        
        if (!button) return;

        const originalText = button.dataset.originalText;
        if (originalText) {
            button.textContent = originalText;
            delete button.dataset.originalText;
        }
        
        button.disabled = false;
        button.classList.remove('opacity-75', 'cursor-not-allowed', 'bg-green-500', 'bg-red-500');
    }

    // Keyboard Shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + S: Save
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                this.triggerShortcut('save');
            }
            
            // Ctrl/Cmd + N: New
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                this.triggerShortcut('new');
            }
            
            // Escape: Close modal
            if (e.key === 'Escape' && this.activeModal) {
                e.preventDefault();
                this.hideModal(this.activeModal);
            }
            
            // Ctrl/Cmd + F: Focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                e.preventDefault();
                const searchInput = document.getElementById('searchInput');
                if (searchInput) {
                    searchInput.focus();
                    searchInput.select();
                }
            }
        });
    }

    registerShortcut(key, callback) {
        this.shortcuts.set(key, callback);
    }

    triggerShortcut(key) {
        const callback = this.shortcuts.get(key);
        if (callback && typeof callback === 'function') {
            callback();
        }
    }

    // Tooltips
    setupTooltips() {
        // Simple tooltip implementation
        document.addEventListener('mouseover', (e) => {
            const element = e.target.closest('[data-tooltip]');
            if (element) {
                this.showTooltip(element, element.dataset.tooltip);
            }
        });

        document.addEventListener('mouseout', (e) => {
            const element = e.target.closest('[data-tooltip]');
            if (element) {
                this.hideTooltip();
            }
        });
    }

    showTooltip(element, text) {
        this.hideTooltip(); // Remove any existing tooltip

        const tooltip = document.createElement('div');
        tooltip.id = 'tooltip';
        tooltip.className = 'absolute bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg z-50 pointer-events-none';
        tooltip.textContent = text;

        document.body.appendChild(tooltip);

        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
    }

    hideTooltip() {
        const tooltip = document.getElementById('tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    // Responsive Handlers
    setupResponsiveHandlers() {
        let resizeTimeout;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }

    handleResize() {
        // Close mobile menus on resize
        const isMobile = window.innerWidth < 768;
        
        if (!isMobile && this.activeModal) {
            // Adjust modal positioning if needed
            const modal = document.getElementById(this.activeModal);
            if (modal) {
                // Modal adjustments for different screen sizes
            }
        }
    }

    // Animation Helpers
    fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        let start = null;
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            
            element.style.opacity = Math.min(progress / duration, 1);
            
            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    fadeOut(element, duration = 300) {
        let start = null;
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            
            element.style.opacity = Math.max(1 - (progress / duration), 0);
            
            if (progress < duration) {
                requestAnimationFrame(animate);
            } else {
                element.style.display = 'none';
            }
        };
        
        requestAnimationFrame(animate);
    }

    slideDown(element, duration = 300) {
        element.style.height = '0';
        element.style.overflow = 'hidden';
        element.style.display = 'block';
        
        const targetHeight = element.scrollHeight;
        
        let start = null;
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            
            element.style.height = Math.min((progress / duration) * targetHeight, targetHeight) + 'px';
            
            if (progress < duration) {
                requestAnimationFrame(animate);
            } else {
                element.style.height = '';
                element.style.overflow = '';
            }
        };
        
        requestAnimationFrame(animate);
    }

    // Utility Functions
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
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Accessibility Helpers
    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    focusFirstElement(container) {
        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    }

    trapFocus(container) {
        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        container.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIManager;
} else {
    window.UIManager = UIManager;
}
