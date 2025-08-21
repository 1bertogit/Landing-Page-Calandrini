/**
 * Google Analytics 4 - Configuração Avançada
 * Face & Nose Code - Dr. Alexandre Calandrini
 */

(function() {
    'use strict';

    class AnalyticsManager {
        constructor() {
            this.config = {
                measurementId: 'G-FNCODE2025',
                debugMode: false,
                enhancedEcommerce: true,
                userProperties: true
            };
            
            this.events = {
                pageView: 'page_view',
                formStart: 'form_start',
                formProgress: 'form_progress',
                formSubmit: 'form_submit',
                leadGenerated: 'generate_lead',
                videoPlay: 'video_play',
                videoProgress: 'video_progress',
                videoComplete: 'video_complete',
                scrollDepth: 'scroll_depth',
                ctaClick: 'cta_click',
                sectionView: 'section_view',
                languageChange: 'language_change',
                errorOccurred: 'error_occurred'
            };
            
            this.init();
        }

        init() {
            this.setupUserProperties();
            this.setupFacebookPixel();
            this.setupScrollTracking();
            this.setupFormTracking();
            this.setupVideoTracking();
            this.setupCTATracking();
            this.setupSectionTracking();
            this.setupErrorTracking();
        }

        /**
         * Configurar Facebook Pixel
         */
        setupFacebookPixel() {
            if (typeof fbq === 'undefined') return;

            // Evento ViewContent automático
            fbq('track', 'ViewContent', {
                'content_name': 'Face & Nose Code Landing Page',
                'content_category': 'Medical Education',
                'content_type': 'landing_page',
                'value': 100,
                'currency': 'BRL'
            });
        }

        /**
         * Configurar propriedades do usuário
         */
        setupUserProperties() {
            if (typeof gtag === 'undefined') return;

            // Propriedades básicas do usuário
            gtag('config', this.config.measurementId, {
                'user_properties': {
                    'device_type': this.getDeviceType(),
                    'language_preference': this.getLanguagePreference(),
                    'visit_timestamp': new Date().toISOString(),
                    'utm_source': this.getUTMParameter('utm_source'),
                    'utm_medium': this.getUTMParameter('utm_medium'),
                    'utm_campaign': this.getUTMParameter('utm_campaign')
                }
            });
        }

        /**
         * Rastreamento de rolagem da página
         */
        setupScrollTracking() {
            let scrollDepths = [25, 50, 75, 90, 100];
            let triggeredDepths = new Set();

            const trackScrollDepth = () => {
                const scrollPercent = Math.round(
                    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
                );

                scrollDepths.forEach(depth => {
                    if (scrollPercent >= depth && !triggeredDepths.has(depth)) {
                        triggeredDepths.add(depth);
                        this.trackEvent(this.events.scrollDepth, {
                            'scroll_depth': depth,
                            'page_location': window.location.href,
                            'page_title': document.title
                        });
                    }
                });
            };

            window.addEventListener('scroll', this.throttle(trackScrollDepth, 1000));
        }

        /**
         * Rastreamento de formulário
         */
        setupFormTracking() {
            const form = document.getElementById('leadForm');
            if (!form) return;

            let formStarted = false;
            let fieldsCompleted = 0;
            const totalFields = form.querySelectorAll('input[required], select[required]').length;

            // Início do formulário
            form.addEventListener('focusin', () => {
                if (!formStarted) {
                    formStarted = true;
                    this.trackEvent(this.events.formStart, {
                        'form_name': 'face_nose_code_lead',
                        'total_fields': totalFields
                    });
                }
            });

            // Progresso do formulário
            form.addEventListener('input', () => {
                const completedFields = Array.from(form.querySelectorAll('input[required], select[required]'))
                    .filter(field => field.value.trim() !== '').length;

                if (completedFields > fieldsCompleted) {
                    fieldsCompleted = completedFields;
                    const progress = Math.round((fieldsCompleted / totalFields) * 100);

                    this.trackEvent(this.events.formProgress, {
                        'form_name': 'face_nose_code_lead',
                        'fields_completed': fieldsCompleted,
                        'total_fields': totalFields,
                        'completion_percentage': progress
                    });
                }
            });
        }

        /**
         * Rastreamento de vídeo
         */
        setupVideoTracking() {
            const videos = document.querySelectorAll('video, iframe[src*="youtube"], iframe[src*="vimeo"]');
            
            videos.forEach((video, index) => {
                if (video.tagName === 'VIDEO') {
                    this.setupHTMLVideoTracking(video, index);
                } else {
                    this.setupIframeVideoTracking(video, index);
                }
            });
        }

        setupHTMLVideoTracking(video, index) {
            let progressMarkers = [25, 50, 75, 90];
            let triggeredMarkers = new Set();

            video.addEventListener('play', () => {
                this.trackEvent(this.events.videoPlay, {
                    'video_title': video.title || `Video ${index + 1}`,
                    'video_duration': video.duration,
                    'video_position': index
                });
                
                // Facebook Pixel
                this.trackFacebookVideo('play', {
                    title: video.title || `Video ${index + 1}`,
                    duration: video.duration
                });
            });

            video.addEventListener('timeupdate', () => {
                const progress = Math.round((video.currentTime / video.duration) * 100);
                
                progressMarkers.forEach(marker => {
                    if (progress >= marker && !triggeredMarkers.has(marker)) {
                        triggeredMarkers.add(marker);
                        this.trackEvent(this.events.videoProgress, {
                            'video_title': video.title || `Video ${index + 1}`,
                            'video_progress': marker,
                            'video_current_time': video.currentTime
                        });
                    }
                });
            });

            video.addEventListener('ended', () => {
                this.trackEvent(this.events.videoComplete, {
                    'video_title': video.title || `Video ${index + 1}`,
                    'video_duration': video.duration
                });
            });
        }

        setupIframeVideoTracking(iframe, index) {
            // Para vídeos do YouTube/Vimeo em iframe
            // Implementação básica - requer API específica para tracking completo
            iframe.addEventListener('load', () => {
                this.trackEvent(this.events.videoPlay, {
                    'video_title': `Iframe Video ${index + 1}`,
                    'video_src': iframe.src,
                    'video_position': index
                });
            });
        }

        /**
         * Rastreamento de CTAs
         */
        setupCTATracking() {
            const ctaButtons = document.querySelectorAll('[data-cta], .cta-button, .btn-primary');
            
            ctaButtons.forEach((button, index) => {
                button.addEventListener('click', (e) => {
                    const ctaText = button.textContent.trim();
                    const ctaPosition = this.getElementPosition(button);
                    
                    const ctaData = {
                        text: ctaText,
                        position: ctaPosition,
                        section: this.getElementSection(button)
                    };
                    
                    this.trackEvent(this.events.ctaClick, {
                        'cta_text': ctaText,
                        'cta_position': ctaPosition,
                        'cta_index': index,
                        'page_location': window.location.href
                    });
                    
                    // Facebook Pixel
                    this.trackFacebookCTA(ctaData);
                });
            });
        }

        /**
         * Rastreamento de seções da página
         */
        setupSectionTracking() {
            const sections = document.querySelectorAll('section[id], .section');
            const observedSections = new Set();

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !observedSections.has(entry.target.id)) {
                        observedSections.add(entry.target.id);
                        
                        this.trackEvent(this.events.sectionView, {
                            'section_id': entry.target.id,
                            'section_name': entry.target.dataset.sectionName || entry.target.id,
                            'visibility_ratio': entry.intersectionRatio
                        });
                    }
                });
            }, {
                threshold: 0.5
            });

            sections.forEach(section => {
                observer.observe(section);
            });
        }

        /**
         * Rastreamento de erros
         */
        setupErrorTracking() {
            window.addEventListener('error', (e) => {
                this.trackEvent(this.events.errorOccurred, {
                    'error_message': e.message,
                    'error_filename': e.filename,
                    'error_line': e.lineno,
                    'error_column': e.colno,
                    'page_location': window.location.href
                });
            });

            window.addEventListener('unhandledrejection', (e) => {
                this.trackEvent(this.events.errorOccurred, {
                    'error_type': 'unhandled_promise_rejection',
                    'error_message': e.reason?.message || 'Unknown promise rejection',
                    'page_location': window.location.href
                });
            });
        }

        /**
         * Enviar evento personalizado
         */
        trackEvent(eventName, parameters = {}) {
            if (typeof gtag === 'undefined') {
                console.warn('Google Analytics não está disponível');
                return;
            }

            // Adicionar timestamp e dados de contexto
            const enrichedParameters = {
                ...parameters,
                'timestamp': new Date().toISOString(),
                'user_agent': navigator.userAgent,
                'screen_resolution': `${screen.width}x${screen.height}`,
                'viewport_size': `${window.innerWidth}x${window.innerHeight}`
            };

            gtag('event', eventName, enrichedParameters);

            if (this.config.debugMode) {
                console.log('Analytics Event:', eventName, enrichedParameters);
            }
        }

        /**
         * Rastrear mudança de idioma
         */
        trackLanguageChange(newLanguage, oldLanguage) {
            this.trackEvent(this.events.languageChange, {
                'new_language': newLanguage,
                'old_language': oldLanguage,
                'change_method': 'manual_selection'
            });
        }

        /**
         * Rastrear conversão de lead
         */
        trackLeadConversion(leadData) {
            // Google Analytics 4
            this.trackEvent(this.events.leadGenerated, {
                'lead_score': leadData.leadScore || 0,
                'specialty': leadData.specialty || 'general',
                'crm_provided': !!leadData.crm,
                'form_completion_time': leadData.formTime || 0,
                'utm_source': this.getUTMParameter('utm_source'),
                'utm_medium': this.getUTMParameter('utm_medium'),
                'utm_campaign': this.getUTMParameter('utm_campaign')
            });

            // Facebook Pixel
            this.trackFacebookLead(leadData);
        }

        /**
         * Rastrear lead no Facebook Pixel
         */
        trackFacebookLead(leadData) {
            if (typeof fbq === 'undefined') return;

            // Evento Lead principal
            fbq('track', 'Lead', {
                'value': leadData.leadScore || 50,
                'currency': 'BRL',
                'content_name': 'Face & Nose Code Lead',
                'content_category': 'Medical Education',
                'content_type': 'lead_form',
                'lead_type': leadData.specialty || 'general'
            });

            // Evento CompleteRegistration
            fbq('track', 'CompleteRegistration', {
                'value': leadData.leadScore || 50,
                'currency': 'BRL',
                'content_name': 'Face & Nose Code Registration',
                'status': 'completed'
            });
        }

        /**
         * Rastrear eventos de vídeo no Facebook
         */
        trackFacebookVideo(action, videoData) {
            if (typeof fbq === 'undefined') return;

            const eventData = {
                'content_name': videoData.title || 'Face & Nose Code Video',
                'content_category': 'Medical Education',
                'content_type': 'video'
            };

            switch(action) {
                case 'play':
                    fbq('trackCustom', 'VideoPlay', eventData);
                    break;
                case 'progress_25':
                    fbq('trackCustom', 'VideoProgress25', eventData);
                    break;
                case 'progress_50':
                    fbq('trackCustom', 'VideoProgress50', eventData);
                    break;
                case 'progress_75':
                    fbq('trackCustom', 'VideoProgress75', eventData);
                    break;
                case 'complete':
                    fbq('trackCustom', 'VideoComplete', eventData);
                    break;
            }
        }

        /**
         * Rastrear cliques em CTA no Facebook
         */
        trackFacebookCTA(ctaData) {
            if (typeof fbq === 'undefined') return;

            fbq('trackCustom', 'CTAClick', {
                'content_name': ctaData.text || 'CTA Button',
                'content_category': 'Medical Education',
                'cta_position': ctaData.position || 'unknown',
                'page_section': ctaData.section || 'unknown'
            });
        }

        // Métodos utilitários
        getDeviceType() {
            const width = window.innerWidth;
            if (width < 768) return 'mobile';
            if (width < 1024) return 'tablet';
            return 'desktop';
        }

        getLanguagePreference() {
            return localStorage.getItem('selectedLanguage') || 
                   document.documentElement.lang || 
                   navigator.language || 
                   'pt-BR';
        }

        getUTMParameter(param) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param) || '';
        }

        getElementPosition(element) {
            const rect = element.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return Math.round(rect.top + scrollTop);
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
    }

    // Inicializar quando o DOM estiver pronto
    document.addEventListener('DOMContentLoaded', () => {
        window.analyticsManager = new AnalyticsManager();
    });

    // Exportar para uso global
    window.AnalyticsManager = AnalyticsManager;

})();