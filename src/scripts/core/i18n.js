// ==============================================
// i18n System - Internationalization Handler
// ==============================================

class I18nSystem {
    constructor() {
        this.supportedLanguages = ['pt-BR', 'en-US', 'es-ES'];
        this.fallbackLanguage = 'pt-BR';
        this.currentLanguage = this.detectLanguage();
        this.translations = {};
        this.initialized = false;
    }

    // Initialize the i18n system
    async init() {
        try {
            // Load all translation files
            await this.loadTranslations();
            
            // Apply initial translations
            this.applyTranslations();
            
            // Setup language selector
            this.setupLanguageSelector();
            
            // Update HTML lang attribute
            this.updateHtmlLang();
            
            // Mark as initialized
            this.initialized = true;
            
            // i18n System initialized
        } catch (error) {
            console.error('Error initializing i18n system:', error);
        }
    }

    // Detect user's preferred language
    detectLanguage() {
        // Check localStorage first
        const savedLang = localStorage.getItem('preferred-language');
        if (savedLang && this.supportedLanguages.includes(savedLang)) {
            return savedLang;
        }

        // Check URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang) {
            const formattedLang = this.formatLanguageCode(urlLang);
            if (this.supportedLanguages.includes(formattedLang)) {
                return formattedLang;
            }
        }

        // Check browser language
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang) {
            const formattedBrowserLang = this.formatLanguageCode(browserLang);
            
            // Check if exact match exists
            if (this.supportedLanguages.includes(formattedBrowserLang)) {
                return formattedBrowserLang;
            }

            // Check for language family match (e.g., 'en' for 'en-US')
            const langFamily = browserLang.split('-')[0].toLowerCase();
            const familyMatch = this.supportedLanguages.find(lang => 
                lang.toLowerCase().startsWith(langFamily)
            );
            
            if (familyMatch) {
                return familyMatch;
            }
        }

        // Return fallback language
        return this.fallbackLanguage;
    }

    // Format language code to match our standard
    formatLanguageCode(code) {
        if (!code) return this.fallbackLanguage;
        
        const parts = code.split('-');
        if (parts.length === 1) {
            // Convert 'pt' to 'pt-BR', 'en' to 'en-US', 'es' to 'es-ES'
            switch(parts[0].toLowerCase()) {
                case 'pt': return 'pt-BR';
                case 'en': return 'en-US';
                case 'es': return 'es-ES';
                default: return this.fallbackLanguage;
            }
        }
        
        // Format as 'xx-XX'
        return `${parts[0].toLowerCase()}-${(parts[1] || '').toUpperCase()}`;
    }

    // Load translation files
    async loadTranslations() {
        // In a real application, these would be loaded via fetch()
        // For now, we'll assume the translation files are loaded as scripts
        this.translations = {
            'pt-BR': window.translations_pt || {},
            'en-US': window.translations_en || {},
            'es-ES': window.translations_es || {}
        };
    }

    // Get translation for a specific key
    translate(key) {
        // Handle array notation like "items[0].title"
        const arrayMatch = key.match(/(.+)\[(\d+)\](.*)$/);
        if (arrayMatch) {
            const [, basePath, index, restPath] = arrayMatch;
            const baseTranslation = this.getNestedProperty(this.translations[this.currentLanguage], basePath);
            
            if (Array.isArray(baseTranslation) && baseTranslation[index]) {
                if (restPath) {
                    // Remove leading dot and get nested property
                    const cleanPath = restPath.startsWith('.') ? restPath.substring(1) : restPath;
                    const result = this.getNestedProperty(baseTranslation[index], cleanPath);
                    // Return the result only if it's a valid value (not null/undefined)
                    return result !== null && result !== undefined ? result : key;
                }
                return baseTranslation[index];
            }
            
            // Try fallback language
            const fallbackTranslation = this.getNestedProperty(this.translations[this.fallbackLanguage], basePath);
            if (Array.isArray(fallbackTranslation) && fallbackTranslation[index]) {
                if (restPath) {
                    const cleanPath = restPath.startsWith('.') ? restPath.substring(1) : restPath;
                    const result = this.getNestedProperty(fallbackTranslation[index], cleanPath);
                    // Return the result only if it's a valid value (not null/undefined)
                    return result !== null && result !== undefined ? result : key;
                }
                return fallbackTranslation[index];
            }
            
            return key;
        }
        
        // Regular key handling (no array notation)
        const keys = key.split('.');
        let translation = this.translations[this.currentLanguage];
        
        // Navigate through nested object
        for (const k of keys) {
            if (translation && translation[k]) {
                translation = translation[k];
            } else {
                // Fallback to default language
                translation = this.translations[this.fallbackLanguage];
                for (const fallbackKey of keys) {
                    if (translation && translation[fallbackKey]) {
                        translation = translation[fallbackKey];
                    } else {
                        return key; // Return key if translation not found
                    }
                }
                break;
            }
        }
        
        return translation;
    }

    // Apply translations to the DOM
    applyTranslations() {
        // Update all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                // For form inputs, update placeholder
                if (element.hasAttribute('placeholder')) {
                    element.placeholder = translation;
                }
            } else {
                // For other elements, update innerHTML to preserve HTML tags
                // Only update if we got a valid translation (not the key itself)
                if (translation && translation !== key) {
                    element.innerHTML = translation;
                }
                // If translation failed, keep the fallback text that's already there
            }
        });

        // Update page title
        document.title = this.translate('meta.title');

        // Update meta tags
        this.updateMetaTags();

        // Format dates and numbers
        this.formatLocaleContent();
        
        // Regenerate dynamic content with new translations
        if (typeof initializeDynamicContent === 'function') {
            setTimeout(() => {
                initializeDynamicContent();
            }, 100);
        }
    }

    // Update meta tags for SEO
    updateMetaTags() {
        // Update description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            document.head.appendChild(metaDescription);
        }
        metaDescription.content = this.translate('meta.description');

        // Update keywords
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.name = 'keywords';
            document.head.appendChild(metaKeywords);
        }
        metaKeywords.content = this.translate('meta.keywords');

        // Update OG tags
        this.updateOpenGraphTags();
    }

    // Update Open Graph tags for social media
    updateOpenGraphTags() {
        const ogTags = {
            'og:title': this.translate('meta.title'),
            'og:description': this.translate('meta.description'),
            'og:locale': this.currentLanguage.replace('-', '_')
        };

        Object.entries(ogTags).forEach(([property, content]) => {
            let tag = document.querySelector(`meta[property="${property}"]`);
            if (!tag) {
                tag = document.createElement('meta');
                tag.setAttribute('property', property);
                document.head.appendChild(tag);
            }
            tag.content = content;
        });
    }

    // Update HTML lang attribute
    updateHtmlLang() {
        document.documentElement.lang = this.currentLanguage;
    }

    // Format dates and numbers according to locale
    formatLocaleContent() {
        // Format dates
        const dateElements = document.querySelectorAll('[data-i18n-date]');
        dateElements.forEach(element => {
            const dateStr = element.getAttribute('data-i18n-date');
            const date = new Date(dateStr);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            element.textContent = date.toLocaleDateString(this.currentLanguage, options);
        });

        // Format numbers
        const numberElements = document.querySelectorAll('[data-i18n-number]');
        numberElements.forEach(element => {
            const number = parseFloat(element.getAttribute('data-i18n-number'));
            element.textContent = number.toLocaleString(this.currentLanguage);
        });

        // Format currency
        const currencyElements = document.querySelectorAll('[data-i18n-currency]');
        currencyElements.forEach(element => {
            const amount = parseFloat(element.getAttribute('data-i18n-currency'));
            const currency = element.getAttribute('data-i18n-currency-code') || 'BRL';
            const formatter = new Intl.NumberFormat(this.currentLanguage, {
                style: 'currency',
                currency: currency
            });
            element.textContent = formatter.format(amount);
        });
    }

    // Update all page content with translations
    updatePageContent() {
        // Update all elements with data-i18n attributes
        this.updateTranslations();
        
        // Regenerate dynamic content
        if (typeof initializeDynamicContent === 'function') {
            initializeDynamicContent();
        }
    }

    // Setup language selector
    setupLanguageSelector() {
        const selector = document.getElementById('language-selector');
        if (!selector) return;

        // Clear existing options
        selector.innerHTML = '';

        // Add language options
        this.supportedLanguages.forEach(lang => {
            const option = document.createElement('option');
            option.value = lang;
            option.textContent = this.getLanguageName(lang);
            option.selected = lang === this.currentLanguage;
            selector.appendChild(option);
        });

        // Add change event listener
        selector.addEventListener('change', (e) => {
            this.changeLanguage(e.target.value);
        });
    }

    // Get display name for language
    getLanguageName(langCode) {
        const names = {
            'pt-BR': '🇧🇷',
            'en-US': '🇺🇸',
            'es-ES': '🇪🇸'
        };
        return names[langCode] || langCode;
    }

    // Change current language
    changeLanguage(newLang) {
        if (!this.supportedLanguages.includes(newLang)) {
            console.error(`Language ${newLang} is not supported`);
            return;
        }

        // Save preference
        localStorage.setItem('preferred-language', newLang);
        
        // Update current language
        this.currentLanguage = newLang;
        
        // Update HTML lang
        this.updateHtmlLang();
        
        // Apply new translations
        this.applyTranslations();
        
        // Update URL without reload
        this.updateURL(newLang);
        
        // Trigger custom event
        window.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: newLang } 
        }));
    }

    // Update URL with language parameter
    updateURL(lang) {
        const url = new URL(window.location);
        url.searchParams.set('lang', lang);
        window.history.replaceState({}, '', url);
    }

    // Helper function to get nested property from object
    getNestedProperty(obj, path) {
        return path.split('.').reduce((curr, prop) => curr?.[prop], obj);
    }

    // Format phone number based on locale
    formatPhoneNumber(phone, locale) {
        // Remove all non-numeric characters
        const cleaned = phone.replace(/\D/g, '');
        
        switch(locale) {
            case 'pt-BR':
                // Brazilian format: (XX) XXXXX-XXXX
                if (cleaned.length === 11) {
                    return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
                }
                break;
            case 'en-US':
                // US format: (XXX) XXX-XXXX
                if (cleaned.length === 10) {
                    return cleaned.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3');
                }
                break;
            case 'es-ES':
                // Spanish format: XXX XX XX XX
                if (cleaned.length === 9) {
                    return cleaned.replace(/^(\d{3})(\d{2})(\d{2})(\d{2})$/, '$1 $2 $3 $4');
                }
                break;
        }
        
        return phone; // Return original if no format matches
    }
}

// Initialize i18n system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.i18n = new I18nSystem();
    window.i18n.init();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = I18nSystem;
}