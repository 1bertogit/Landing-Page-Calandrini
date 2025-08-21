// ==============================================
// Performance Optimizations
// ==============================================

(function() {
    'use strict';

    // 1. Lazy Loading para imagens
    const lazyLoadImages = () => {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('fade-in');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        images.forEach(img => imageObserver.observe(img));
    };

    // 2. Debounce para eventos de scroll e resize
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // 3. Throttle para eventos frequentes
    const throttle = (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    // 4. Preload de recursos críticos
    const preloadCriticalAssets = () => {
        const criticalAssets = [
            { href: 'src/assets/css/main.css', as: 'style' },
            { href: 'src/assets/css/animations.css', as: 'style' },
            { href: 'src/assets/images/dr-calandrini.webp', as: 'image' }
        ];

        criticalAssets.forEach(asset => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = asset.href;
            link.as = asset.as;
            if (asset.as === 'font') {
                link.crossOrigin = 'anonymous';
            }
            document.head.appendChild(link);
        });
    };

    // 5. Otimização de animações com requestAnimationFrame
    const optimizeAnimations = () => {
        let ticking = false;
        
        function updateAnimations() {
            // Atualizar animações aqui
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateAnimations);
                ticking = true;
            }
        }

        window.addEventListener('scroll', throttle(requestTick, 100));
    };

    // 6. Cache de elementos DOM frequentemente acessados
    const DOMCache = {
        elements: {},
        
        get(selector) {
            if (!this.elements[selector]) {
                this.elements[selector] = document.querySelector(selector);
            }
            return this.elements[selector];
        },
        
        getAll(selector) {
            if (!this.elements[selector]) {
                this.elements[selector] = document.querySelectorAll(selector);
            }
            return this.elements[selector];
        },
        
        clear() {
            this.elements = {};
        }
    };

    // 7. Otimização de Web Fonts
    const optimizeFonts = () => {
        if ('fonts' in document) {
            Promise.all([
                document.fonts.load('400 1em Montserrat'),
                document.fonts.load('700 1em Montserrat'),
                document.fonts.load('400 1em Cormorant Garamond')
            ]).then(() => {
                document.body.classList.add('fonts-loaded');
            });
        }
    };

    // 8. Service Worker para cache offline
    const registerServiceWorker = () => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').catch(err => {
                console.log('Service Worker registration failed:', err);
            });
        }
    };

    // 9. Otimização de formulários
    const optimizeForms = () => {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            // Desabilitar validação HTML5 padrão para usar customizada
            form.noValidate = true;
            
            // Adicionar listener otimizado
            form.addEventListener('submit', throttle(function(e) {
                // Validação será tratada pelo form-validation.js
            }, 1000));
        });
    };

    // 10. Resource Hints
    const addResourceHints = () => {
        // DNS Prefetch para domínios externos
        const dnsPrefetchDomains = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com',
            'https://cdn.tailwindcss.com'
        ];

        dnsPrefetchDomains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = domain;
            document.head.appendChild(link);
        });
    };

    // 11. Intersection Observer para elementos pesados
    const lazyLoadSections = () => {
        const sections = document.querySelectorAll('.lazy-section');
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                    // Carregar conteúdo pesado da seção
                    loadSectionContent(entry.target);
                }
            });
        }, {
            rootMargin: '100px',
            threshold: 0.1
        });

        sections.forEach(section => sectionObserver.observe(section));
    };

    function loadSectionContent(section) {
        // Implementar carregamento de conteúdo específico da seção
        const sectionId = section.id;
        
        switch(sectionId) {
            case 'method':
                // Carregar gráficos ou conteúdo pesado do método
                break;
            case 'results':
                // Carregar estatísticas ou gráficos
                break;
        }
    }

    // 12. Monitoramento de Performance
    const monitorPerformance = () => {
        if ('PerformanceObserver' in window) {
            // Observar Long Tasks
            try {
                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        console.log('Long Task detected:', entry);
                    }
                });
                observer.observe({ entryTypes: ['longtask'] });
            } catch (e) {
                // Long Task API pode não estar disponível
            }

            // Métricas de Web Vitals
            if (window.performance && performance.getEntriesByType) {
                window.addEventListener('load', () => {
                    const paintMetrics = performance.getEntriesByType('paint');
                    paintMetrics.forEach(metric => {
                        console.log(`${metric.name}: ${metric.startTime}ms`);
                    });
                });
            }
        }
    };

    // 13. Cleanup de Event Listeners
    const cleanupListeners = () => {
        const originalAddEventListener = EventTarget.prototype.addEventListener;
        const listeners = new WeakMap();

        EventTarget.prototype.addEventListener = function(type, listener, options) {
            if (!listeners.has(this)) {
                listeners.set(this, []);
            }
            listeners.get(this).push({ type, listener, options });
            originalAddEventListener.call(this, type, listener, options);
        };

        window.cleanupAllListeners = function(element) {
            if (listeners.has(element)) {
                listeners.get(element).forEach(({ type, listener, options }) => {
                    element.removeEventListener(type, listener, options);
                });
                listeners.delete(element);
            }
        };
    };

    // 14. Inicialização otimizada
    const init = () => {
        // Executar otimizações críticas imediatamente
        addResourceHints();
        preloadCriticalAssets();
        
        // Executar após DOM carregado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', onDOMReady);
        } else {
            onDOMReady();
        }
        
        // Executar após página totalmente carregada
        window.addEventListener('load', onPageLoad);
    };

    function onDOMReady() {
        lazyLoadImages();
        optimizeForms();
        optimizeFonts();
        lazyLoadSections();
        optimizeAnimations();
        cleanupListeners();
    }

    function onPageLoad() {
        registerServiceWorker();
        monitorPerformance();
        
        // Remover classes de loading
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
    }

    // Expor utilitários globalmente
    window.performanceUtils = {
        debounce,
        throttle,
        DOMCache,
        cleanupAllListeners
    };

    // Inicializar
    init();

})();