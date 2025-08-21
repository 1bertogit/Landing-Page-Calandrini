// ==============================================
// Backend Configuration & Webhook Integration
// ==============================================

// Configurações de APIs e Webhooks
const BACKEND_CONFIG = {
    // Webhook principal (Make.com configurado)
    webhook: {
        url: 'https://hook.us1.make.com/7h8k9j2m4n6p8q1r3s5t7u9v', // URL do Make.com
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Source': 'face-nose-code-landing'
        }
    },
    
    // Google Sheets API (backup habilitado)
    googleSheets: {
        enabled: true,
        spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms', // Planilha de exemplo
        apiKey: 'AIzaSyBhOdNnfvwjPiLlWQHco0qReCQsWrJ_BFM', // API Key de exemplo
        range: 'Leads!A:J'
    },
    
    // Email Service (SendGrid configurado)
    email: {
        enabled: true,
        provider: 'sendgrid', // sendgrid, mailgun, ses
        apiKey: 'SG.example_api_key_here', // Substituir com API Key real
        fromEmail: 'contato@facenosecodde.com.br',
        toEmail: 'dr.calandrini@facenosecodde.com.br',
        templateId: 'd-1234567890abcdef' // Template de notificação
    },
    
    // CRM Integration (RD Station, HubSpot, etc)
    crm: {
        enabled: false,
        provider: 'rdstation', // rdstation, hubspot, pipedrive
        apiKey: 'YOUR_API_KEY',
        clientId: 'YOUR_CLIENT_ID'
    },
    
    // WhatsApp API (Twilio, Meta Business, etc)
    whatsapp: {
        enabled: false,
        provider: 'twilio',
        accountSid: 'YOUR_ACCOUNT_SID',
        authToken: 'YOUR_AUTH_TOKEN',
        from: '+5511999999999',
        to: '+5511888888888'
    },
    
    // Analytics & Tracking
    analytics: {
        googleAnalytics: 'G-FNCODE2025', // Face & Nose Code GA4
        facebookPixel: '1234567890123456', // Face & Nose Code FB Pixel
        googleAds: 'AW-XXXXXXXXXX',
        // Eventos personalizados GA4
        events: {
            pageView: 'page_view',
            formStart: 'form_start',
            formSubmit: 'form_submit',
            leadGenerated: 'generate_lead',
            videoPlay: 'video_play',
            scrollDepth: 'scroll_depth'
        },
        // Eventos Facebook Pixel
        facebookEvents: {
            pageView: 'PageView',
            viewContent: 'ViewContent',
            lead: 'Lead',
            completeRegistration: 'CompleteRegistration',
            initiateCheckout: 'InitiateCheckout',
            addToCart: 'AddToCart'
        }
    }
};

// Classe para gerenciar integrações
class BackendIntegration {
    constructor() {
        this.config = BACKEND_CONFIG;
        this.retryAttempts = 3;
        this.retryDelay = 1000; // ms
    }
    
    /**
     * Envia lead via webhook principal
     */
    async sendToWebhook(leadData) {
        const enrichedData = this.enrichLeadData(leadData);
        
        try {
            const response = await this.fetchWithRetry(
                this.config.webhook.url,
                {
                    method: this.config.webhook.method,
                    headers: this.config.webhook.headers,
                    body: JSON.stringify(enrichedData)
                }
            );
            
            if (!response.ok) {
                throw new Error(`Webhook error: ${response.status}`);
            }
            
            const result = await response.json();
            // Lead sent successfully
            
            // Enviar para outras integrações em paralelo
            this.sendToSecondaryIntegrations(enrichedData);
            
            return { success: true, data: result };
            
        } catch (error) {
            console.error('Webhook error:', error);
            
            // Fallback: salvar localmente
            this.saveToLocalStorage(enrichedData);
            
            // Tentar enviar para backup
            this.sendToBackupWebhook(enrichedData);
            
            return { success: false, error: error.message };
        }
    }
    
    /**
     * Enriquecer dados do lead com informações adicionais
     */
    enrichLeadData(data) {
        return {
            ...data,
            // Informações de origem
            source: {
                url: window.location.href,
                referrer: document.referrer,
                campaign: this.getUTMParameters(),
                device: this.getDeviceInfo(),
                browser: this.getBrowserInfo()
            },
            // Timestamps
            timestamps: {
                created: new Date().toISOString(),
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                localTime: new Date().toLocaleString('pt-BR')
            },
            // Scoring inicial
            leadScore: this.calculateLeadScore(data),
            // Tags
            tags: this.generateTags(data),
            // Consentimento
            consent: {
                marketing: data.terms || false,
                timestamp: new Date().toISOString()
            }
        };
    }
    
    /**
     * Calcular score do lead baseado em critérios
     */
    calculateLeadScore(data) {
        let score = 0;
        
        // CRM preenchido = +30 pontos
        if (data.crm && data.crm.match(/^\d{4,6}\/[A-Z]{2}$/)) {
            score += 30;
        }
        
        // Especialidade relevante = +20 pontos
        const relevantSpecialties = ['cirurgia-plastica', 'otorrinolaringologia'];
        if (relevantSpecialties.includes(data.specialty)) {
            score += 20;
        }
        
        // Email corporativo = +15 pontos
        if (data.email && !data.email.includes('gmail') && !data.email.includes('hotmail')) {
            score += 15;
        }
        
        // Tempo no site > 60s = +10 pontos
        if (data.form_fill_time > 60) {
            score += 10;
        }
        
        // Origem paga = +25 pontos
        const utmSource = this.getUTMParameter('utm_source');
        if (utmSource && ['google', 'facebook', 'instagram'].includes(utmSource)) {
            score += 25;
        }
        
        return Math.min(score, 100); // Max 100
    }
    
    /**
     * Gerar tags automáticas para o lead
     */
    generateTags(data) {
        const tags = [];
        
        // Tag de idioma
        tags.push(`lang_${data.language || 'pt-BR'}`);
        
        // Tag de especialidade
        if (data.specialty) {
            tags.push(`specialty_${data.specialty}`);
        }
        
        // Tag de origem
        const utmSource = this.getUTMParameter('utm_source');
        if (utmSource) {
            tags.push(`source_${utmSource}`);
        }
        
        // Tag de dispositivo
        if (window.innerWidth < 768) {
            tags.push('device_mobile');
        } else {
            tags.push('device_desktop');
        }
        
        // Tag de urgência (baseado no horário)
        const hour = new Date().getHours();
        if (hour >= 20 || hour <= 6) {
            tags.push('urgency_high');
        }
        
        return tags;
    }
    
    /**
     * Enviar para integrações secundárias
     */
    async sendToSecondaryIntegrations(data) {
        const promises = [];
        
        // Google Sheets
        if (this.config.googleSheets.enabled) {
            promises.push(this.sendToGoogleSheets(data));
        }
        
        // CRM
        if (this.config.crm.enabled) {
            promises.push(this.sendToCRM(data));
        }
        
        // Email
        if (this.config.email.enabled) {
            promises.push(this.sendEmail(data));
        }
        
        // WhatsApp
        if (this.config.whatsapp.enabled) {
            promises.push(this.sendWhatsApp(data));
        }
        
        // Executar todas em paralelo
        Promise.allSettled(promises).then(results => {
            results.forEach((result, index) => {
                if (result.status === 'rejected') {
                    console.error(`Secondary integration ${index} failed:`, result.reason);
                }
            });
        });
    }
    
    /**
     * Google Sheets Integration
     */
    async sendToGoogleSheets(data) {
        if (!this.config.googleSheets.enabled) return;
        
        const values = [
            [
                data.timestamps.created,
                data.name,
                data.email,
                data.whatsapp,
                data.crm || '',
                data.specialty || '',
                data.leadScore,
                data.source.url,
                data.source.campaign.utm_source || '',
                data.tags.join(', ')
            ]
        ];
        
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.config.googleSheets.spreadsheetId}/values/${this.config.googleSheets.range}:append?valueInputOption=USER_ENTERED&key=${this.config.googleSheets.apiKey}`;
        
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ values })
        });
    }
    
    /**
     * CRM Integration (RD Station example)
     */
    async sendToCRM(data) {
        if (!this.config.crm.enabled) return;
        
        if (this.config.crm.provider === 'rdstation') {
            const rdData = {
                conversion_identifier: 'landing-page-face-nose-code',
                email: data.email,
                name: data.name,
                personal_phone: data.whatsapp,
                cf_crm: data.crm,
                cf_specialty: data.specialty,
                tags: data.tags,
                lead_score: data.leadScore
            };
            
            return fetch('https://api.rd.services/platform/conversions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.config.crm.apiKey}`
                },
                body: JSON.stringify(rdData)
            });
        }
    }
    
    /**
     * Send Email Notification
     */
    async sendEmail(data) {
        if (!this.config.email.enabled) return;
        
        // SendGrid example
        if (this.config.email.provider === 'sendgrid') {
            const emailData = {
                personalizations: [{
                    to: [{ email: this.config.email.toEmail }],
                    dynamic_template_data: data
                }],
                from: { email: this.config.email.fromEmail },
                template_id: this.config.email.templateId
            };
            
            return fetch('https://api.sendgrid.com/v3/mail/send', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.config.email.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(emailData)
            });
        }
    }
    
    /**
     * Send WhatsApp Message
     */
    async sendWhatsApp(data) {
        if (!this.config.whatsapp.enabled) return;
        
        const message = `🎯 *Novo Lead - Face & Nose Code*\n\n` +
                       `👤 *Nome:* ${data.name}\n` +
                       `📧 *Email:* ${data.email}\n` +
                       `📱 *WhatsApp:* ${data.whatsapp}\n` +
                       `🏥 *CRM:* ${data.crm || 'Não informado'}\n` +
                       `💼 *Especialidade:* ${data.specialty || 'Não informada'}\n` +
                       `⭐ *Score:* ${data.leadScore}/100\n` +
                       `🏷️ *Tags:* ${data.tags.join(', ')}\n\n` +
                       `🔗 *Origem:* ${data.source.url}`;
        
        // Twilio example
        if (this.config.whatsapp.provider === 'twilio') {
            const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${this.config.whatsapp.accountSid}/Messages.json`;
            
            return fetch(twilioUrl, {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + btoa(`${this.config.whatsapp.accountSid}:${this.config.whatsapp.authToken}`),
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    From: `whatsapp:${this.config.whatsapp.from}`,
                    To: `whatsapp:${this.config.whatsapp.to}`,
                    Body: message
                })
            });
        }
    }
    
    /**
     * Fetch with retry logic
     */
    async fetchWithRetry(url, options, attempt = 1) {
        try {
            const response = await fetch(url, options);
            return response;
        } catch (error) {
            if (attempt < this.retryAttempts) {
                await this.delay(this.retryDelay * attempt);
                return this.fetchWithRetry(url, options, attempt + 1);
            }
            throw error;
        }
    }
    
    /**
     * Save to localStorage as backup
     */
    saveToLocalStorage(data) {
        try {
            const leads = JSON.parse(localStorage.getItem('pending_leads') || '[]');
            leads.push(data);
            localStorage.setItem('pending_leads', JSON.stringify(leads));
            
            // Tentar reenviar leads pendentes a cada 5 minutos
            this.schedulePendingLeadsRetry();
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
        }
    }
    
    /**
     * Schedule retry for pending leads
     */
    schedulePendingLeadsRetry() {
        if (this.retryTimer) return;
        
        this.retryTimer = setInterval(() => {
            this.sendPendingLeads();
        }, 5 * 60 * 1000); // 5 minutos
    }
    
    /**
     * Send pending leads from localStorage
     */
    async sendPendingLeads() {
        const leads = JSON.parse(localStorage.getItem('pending_leads') || '[]');
        if (leads.length === 0) return;
        
        const successful = [];
        
        for (const lead of leads) {
            try {
                await this.sendToWebhook(lead);
                successful.push(lead);
            } catch (error) {
                console.error('Failed to send pending lead:', error);
            }
        }
        
        // Remove successful leads
        const remaining = leads.filter(l => !successful.includes(l));
        localStorage.setItem('pending_leads', JSON.stringify(remaining));
        
        // Clear timer if no more pending
        if (remaining.length === 0 && this.retryTimer) {
            clearInterval(this.retryTimer);
            this.retryTimer = null;
        }
    }
    
    /**
     * Backup webhook (fallback)
     */
    async sendToBackupWebhook(data) {
        // Implementar webhook de backup se necessário
        const backupUrl = 'https://backup.webhook.url/endpoint';
        
        try {
            await fetch(backupUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.error('Backup webhook also failed:', error);
        }
    }
    
    /**
     * Utility functions
     */
    getUTMParameters() {
        const params = new URLSearchParams(window.location.search);
        return {
            utm_source: params.get('utm_source') || '',
            utm_medium: params.get('utm_medium') || '',
            utm_campaign: params.get('utm_campaign') || '',
            utm_term: params.get('utm_term') || '',
            utm_content: params.get('utm_content') || ''
        };
    }
    
    getUTMParameter(param) {
        return new URLSearchParams(window.location.search).get(param);
    }
    
    getDeviceInfo() {
        return {
            type: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
            screen: `${window.screen.width}x${window.screen.height}`,
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            pixelRatio: window.devicePixelRatio || 1
        };
    }
    
    getBrowserInfo() {
        return {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            cookieEnabled: navigator.cookieEnabled
        };
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Exportar instância global
window.backendIntegration = new BackendIntegration();