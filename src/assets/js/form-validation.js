// ==============================================
// Advanced Form Validation & Backend Integration
// ==============================================

(function() {
    'use strict';

    // Configuração do Backend
    const API_CONFIG = {
        endpoint: 'https://api.exemplo.com/leads', // Substituir com URL real
        apiKey: 'YOUR_API_KEY', // Substituir com chave real
        timeout: 10000,
        retryAttempts: 3
    };

    // Regex patterns para validação
    const VALIDATION_PATTERNS = {
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        
        phone: {
            'pt-BR': /^(?:\+55\s?)?(?:\(?\d{2}\)?\s?)?(?:9\s?)?(?:\d{4})-?(?:\d{4})$/,
            'en-US': /^(?:\+1\s?)?(?:\(?\d{3}\)?\s?)?(?:\d{3})-?(?:\d{4})$/,
            'es-ES': /^(?:\+34\s?)?(?:\d{3}\s?)?(?:\d{3}\s?)?(?:\d{3})$/
        },
        
        name: /^[a-zA-ZÀ-ÿ\s]{3,100}$/,
        
        // CRM para médicos brasileiros
        crm: /^\d{4,6}\/[A-Z]{2}$/,
        
        // Especialidades médicas válidas
        specialties: [
            'cirurgia-plastica',
            'otorrinolaringologia',
            'oftalmologia',
            'dermatologia',
            'cirurgia-geral'
        ]
    };

    // Mensagens de erro personalizadas
    const ERROR_MESSAGES = {
        'pt-BR': {
            required: 'Este campo é obrigatório',
            email: 'Por favor, insira um e-mail válido',
            phone: 'Por favor, insira um telefone válido (ex: 11 99999-9999)',
            name: 'Por favor, insira seu nome completo (mínimo 3 caracteres)',
            crm: 'Por favor, insira um CRM válido (ex: 12345/SP)',
            specialty: 'Por favor, selecione uma especialidade válida',
            terms: 'Você deve aceitar os termos para continuar',
            server: 'Erro ao enviar. Por favor, tente novamente.',
            network: 'Erro de conexão. Verifique sua internet.',
            timeout: 'Tempo esgotado. Por favor, tente novamente.'
        },
        'en-US': {
            required: 'This field is required',
            email: 'Please enter a valid email',
            phone: 'Please enter a valid phone number',
            name: 'Please enter your full name (minimum 3 characters)',
            crm: 'Please enter a valid medical license',
            specialty: 'Please select a valid specialty',
            terms: 'You must accept the terms to continue',
            server: 'Error sending. Please try again.',
            network: 'Connection error. Check your internet.',
            timeout: 'Request timeout. Please try again.'
        },
        'es-ES': {
            required: 'Este campo es obligatorio',
            email: 'Por favor, ingrese un email válido',
            phone: 'Por favor, ingrese un teléfono válido',
            name: 'Por favor, ingrese su nombre completo (mínimo 3 caracteres)',
            crm: 'Por favor, ingrese una licencia médica válida',
            specialty: 'Por favor, seleccione una especialidad válida',
            terms: 'Debe aceptar los términos para continuar',
            server: 'Error al enviar. Por favor, intente nuevamente.',
            network: 'Error de conexión. Verifique su internet.',
            timeout: 'Tiempo agotado. Por favor, intente nuevamente.'
        }
    };

    class FormValidator {
        constructor(formElement) {
            this.form = formElement;
            this.fields = {};
            this.errors = {};
            this.isSubmitting = false;
            this.currentLang = (window.i18n && window.i18n.currentLanguage) ? window.i18n.currentLanguage : 'pt-BR';
            
            this.init();
        }

        init() {
            this.setupFields();
            this.attachListeners();
            this.addAdvancedFields();
        }

        setupFields() {
            // Campos existentes
            this.fields.name = this.form.querySelector('input[type="text"]');
            this.fields.email = this.form.querySelector('input[type="email"]');
            this.fields.whatsapp = this.form.querySelector('#whatsapp');
            
            // Adicionar atributos de validação
            if (this.fields.name) {
                this.fields.name.setAttribute('minlength', '3');
                this.fields.name.setAttribute('maxlength', '100');
            }
            
            if (this.fields.email) {
                this.fields.email.setAttribute('pattern', VALIDATION_PATTERNS.email.source);
            }
        }

        addAdvancedFields() {
            // Adicionar campo CRM após o WhatsApp
            const crmField = this.createField('crm', 'text', 'CRM (ex: 12345/SP)', false);
            if (this.fields.whatsapp && this.fields.whatsapp.parentElement) {
                this.fields.whatsapp.parentElement.after(crmField);
            }

            // Adicionar campo de especialidade
            const specialtyField = this.createSelectField('specialty', 'Especialidade', [
                { value: '', text: 'Selecione sua especialidade' },
                { value: 'cirurgia-plastica', text: 'Cirurgia Plástica' },
                { value: 'otorrinolaringologia', text: 'Otorrinolaringologia' },
                { value: 'oftalmologia', text: 'Oftalmologia' },
                { value: 'dermatologia', text: 'Dermatologia' },
                { value: 'cirurgia-geral', text: 'Cirurgia Geral' },
                { value: 'outro', text: 'Outro' }
            ]);
            crmField.after(specialtyField);

            // Adicionar checkbox de termos
            const termsField = this.createCheckboxField('terms', 
                'Aceito receber informações sobre o curso e concordo com os termos de uso');
            specialtyField.after(termsField);

            // Adicionar campo de UTM (hidden)
            this.addUTMFields();
        }

        createField(name, type, placeholder, required = true) {
            const div = document.createElement('div');
            const input = document.createElement('input');
            input.type = type;
            input.name = name;
            input.id = name;
            input.placeholder = placeholder;
            input.className = 'w-full input-luxury';
            if (required) input.required = true;
            
            const error = document.createElement('span');
            error.className = 'error-message text-red-400 text-xs mt-1 hidden';
            
            div.appendChild(input);
            div.appendChild(error);
            
            this.fields[name] = input;
            return div;
        }

        createSelectField(name, label, options) {
            const div = document.createElement('div');
            const select = document.createElement('select');
            select.name = name;
            select.id = name;
            select.className = 'w-full input-luxury';
            select.required = true;
            
            options.forEach(opt => {
                const option = document.createElement('option');
                option.value = opt.value;
                option.textContent = opt.text;
                select.appendChild(option);
            });
            
            const error = document.createElement('span');
            error.className = 'error-message text-red-400 text-xs mt-1 hidden';
            
            div.appendChild(select);
            div.appendChild(error);
            
            this.fields[name] = select;
            return div;
        }

        createCheckboxField(name, label) {
            const div = document.createElement('div');
            div.className = 'flex items-start gap-3';
            
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.name = name;
            input.id = name;
            input.className = 'mt-1';
            input.required = true;
            
            const labelEl = document.createElement('label');
            labelEl.htmlFor = name;
            labelEl.className = 'text-xs opacity-70 cursor-pointer';
            labelEl.textContent = label;
            
            const error = document.createElement('span');
            error.className = 'error-message text-red-400 text-xs mt-1 hidden block';
            
            div.appendChild(input);
            div.appendChild(labelEl);
            
            const wrapper = document.createElement('div');
            wrapper.appendChild(div);
            wrapper.appendChild(error);
            
            this.fields[name] = input;
            return wrapper;
        }

        addUTMFields() {
            const urlParams = new URLSearchParams(window.location.search);
            const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
            
            utmParams.forEach(param => {
                const value = urlParams.get(param);
                if (value) {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = param;
                    input.value = value;
                    this.form.appendChild(input);
                    this.fields[param] = input;
                }
            });
        }

        attachListeners() {
            // Validação em tempo real
            Object.entries(this.fields).forEach(([name, field]) => {
                if (field && field.type !== 'hidden') {
                    field.addEventListener('blur', () => this.validateField(name));
                    field.addEventListener('input', () => this.clearError(name));
                }
            });

            // Submit handler
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        validateField(fieldName) {
            const field = this.fields[fieldName];
            if (!field) return true;

            const value = field.value.trim();
            let isValid = true;
            let errorKey = '';

            // Validação required
            if (field.required && !value) {
                isValid = false;
                errorKey = 'required';
            }
            // Validações específicas
            else if (value) {
                switch (fieldName) {
                    case 'email':
                        isValid = VALIDATION_PATTERNS.email.test(value);
                        errorKey = 'email';
                        break;
                        
                    case 'whatsapp':
                        const phonePattern = VALIDATION_PATTERNS.phone[this.currentLang];
                        isValid = phonePattern.test(value.replace(/\s/g, ''));
                        errorKey = 'phone';
                        break;
                        
                    case 'name':
                        isValid = VALIDATION_PATTERNS.name.test(value) && value.split(' ').length >= 2;
                        errorKey = 'name';
                        break;
                        
                    case 'crm':
                        if (value) { // CRM é opcional
                            isValid = VALIDATION_PATTERNS.crm.test(value);
                            errorKey = 'crm';
                        }
                        break;
                        
                    case 'specialty':
                        isValid = value !== '';
                        errorKey = 'specialty';
                        break;
                        
                    case 'terms':
                        isValid = field.checked;
                        errorKey = 'terms';
                        break;
                }
            }

            if (!isValid) {
                this.showError(fieldName, errorKey);
            } else {
                this.clearError(fieldName);
            }

            return isValid;
        }

        showError(fieldName, errorKey) {
            const field = this.fields[fieldName];
            if (!field) return;

            const errorElement = field.parentElement.querySelector('.error-message') || 
                                field.parentElement.parentElement.querySelector('.error-message');
            
            if (errorElement) {
                const messages = ERROR_MESSAGES[this.currentLang];
                errorElement.textContent = messages[errorKey] || messages.required;
                errorElement.classList.remove('hidden');
                field.classList.add('border-red-400');
            }

            this.errors[fieldName] = errorKey;
        }

        clearError(fieldName) {
            const field = this.fields[fieldName];
            if (!field) return;

            const errorElement = field.parentElement.querySelector('.error-message') || 
                                field.parentElement.parentElement.querySelector('.error-message');
            
            if (errorElement) {
                errorElement.classList.add('hidden');
                field.classList.remove('border-red-400');
            }

            delete this.errors[fieldName];
        }

        validateAll() {
            let isValid = true;
            
            Object.keys(this.fields).forEach(fieldName => {
                if (this.fields[fieldName].type !== 'hidden') {
                    const fieldValid = this.validateField(fieldName);
                    if (!fieldValid) isValid = false;
                }
            });

            return isValid;
        }

        async handleSubmit(e) {
            e.preventDefault();

            if (this.isSubmitting) return;

            // Validar todos os campos
            if (!this.validateAll()) {
                this.showNotification('Por favor, corrija os erros no formulário', 'error');
                return;
            }

            this.isSubmitting = true;
            this.showLoadingState();

            try {
                const formData = this.collectFormData();
                const response = await this.sendToBackend(formData);
                
                if (response.success) {
                    this.handleSuccess(response);
                } else {
                    this.handleError(response.error || 'server');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                this.handleError(error.message || 'network');
            } finally {
                this.isSubmitting = false;
                this.hideLoadingState();
            }
        }

        collectFormData() {
            const data = {
                timestamp: new Date().toISOString(),
                language: this.currentLang,
                page_url: window.location.href,
                referrer: document.referrer,
                user_agent: navigator.userAgent
            };

            Object.entries(this.fields).forEach(([name, field]) => {
                if (field.type === 'checkbox') {
                    data[name] = field.checked;
                } else {
                    data[name] = field.value.trim();
                }
            });

            // Adicionar dados de sessão
            data.session_id = this.getSessionId();
            data.form_fill_time = this.getFormFillTime();

            return data;
        }

        async sendToBackend(data) {
            // Implementação real da API
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

            try {
                const response = await fetch(API_CONFIG.endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-API-Key': API_CONFIG.apiKey
                    },
                    body: JSON.stringify(data),
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                return await response.json();
            } catch (error) {
                clearTimeout(timeoutId);
                
                // Para desenvolvimento - simular sucesso
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    console.log('Development mode - Form data:', data);
                    return { success: true, message: 'Lead capturado com sucesso (modo desenvolvimento)' };
                }
                
                throw error;
            }
        }

        handleSuccess(response) {
            // Limpar formulário
            this.form.reset();
            
            // Mostrar mensagem de sucesso
            this.showNotification('Inscrição realizada com sucesso! Redirecionando...', 'success');
            
            // Tracking de conversão
            this.trackConversion();
            
            // Redirecionar para página de obrigado
            setTimeout(() => {
                const redirectUrl = response.redirect_url || '/obrigado.html';
                window.location.href = redirectUrl;
            }, 1500);
        }

        handleError(errorType) {
            const messages = ERROR_MESSAGES[this.currentLang];
            const message = messages[errorType] || messages.server;
            this.showNotification(message, 'error');
        }

        showNotification(message, type = 'info') {
            // Criar elemento de notificação
            const notification = document.createElement('div');
            notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
                type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'
            } text-white`;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            // Animar entrada
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 10);
            
            // Remover após 5 segundos
            setTimeout(() => {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => notification.remove(), 300);
            }, 5000);
        }

        showLoadingState() {
            const submitBtn = this.form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner"></span> Enviando...';
            }
        }

        hideLoadingState() {
            const submitBtn = this.form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = submitBtn.dataset.originalText || 'Reserve Sua Vaga';
            }
        }

        getSessionId() {
            let sessionId = sessionStorage.getItem('session_id');
            if (!sessionId) {
                sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                sessionStorage.setItem('session_id', sessionId);
            }
            return sessionId;
        }

        getFormFillTime() {
            if (!this.formStartTime) {
                this.formStartTime = Date.now();
            }
            return Math.floor((Date.now() - this.formStartTime) / 1000);
        }

        trackConversion() {
            // Google Analytics 4 - Lead Generation Event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'generate_lead', {
                    'value': this.calculateLeadScore(),
                    'currency': 'BRL',
                    'lead_type': this.getFieldValue('specialty') || 'general',
                    'form_name': 'face_nose_code_lead',
                    'method': 'landing_page_form'
                });
                
                // Evento de conversão personalizado
                gtag('event', 'conversion', {
                    'send_to': 'G-FNCODE2025',
                    'value': this.calculateLeadScore(),
                    'currency': 'BRL',
                    'transaction_id': Date.now().toString()
                });
            }
            
            // Facebook Pixel
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead', {
                    'value': this.calculateLeadScore(),
                    'currency': 'BRL',
                    'content_name': 'Face & Nose Code Lead',
                    'content_category': 'Medical Education'
                });
            }
            
            // Google Tag Manager
            if (typeof dataLayer !== 'undefined') {
                dataLayer.push({
                    'event': 'formSubmission',
                    'formName': 'leadCapture',
                    'leadScore': this.calculateLeadScore(),
                    'specialty': this.getFieldValue('specialty') || 'general'
                });
            }
        }
    }

    // Inicializar quando o DOM estiver pronto
    document.addEventListener('DOMContentLoaded', () => {
        const leadForm = document.getElementById('leadForm');
        if (leadForm) {
            window.formValidator = new FormValidator(leadForm);
        }
    });

})();