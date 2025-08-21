// ==============================================
// Translation API - Multiple Services Support
// ==============================================

class TranslationAPI {
    static async translate(text, sourceLang, targetLang, service = 'mock', apiKey = '') {
        try {
            console.log(`🌐 Translating "${text.substring(0, 50)}..." from ${sourceLang} to ${targetLang} using ${service}`);
            
            switch (service) {
                case 'google':
                    return await this.translateWithGoogle(text, sourceLang, targetLang, apiKey);
                case 'deepl':
                    return await this.translateWithDeepL(text, sourceLang, targetLang, apiKey);
                case 'azure':
                    return await this.translateWithAzure(text, sourceLang, targetLang, apiKey);
                case 'mock':
                default:
                    return await this.translateWithMock(text, sourceLang, targetLang);
            }
        } catch (error) {
            console.error('Translation error:', error);
            throw new Error(`Erro na tradução: ${error.message}`);
        }
    }

    // Google Translate API
    static async translateWithGoogle(text, sourceLang, targetLang, apiKey) {
        if (!apiKey) {
            throw new Error('Chave da API do Google Translate não configurada');
        }

        const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: text,
                source: sourceLang,
                target: targetLang,
                format: 'text'
            })
        });

        if (!response.ok) {
            throw new Error(`Google Translate API error: ${response.status}`);
        }

        const data = await response.json();
        return data.data.translations[0].translatedText;
    }

    // DeepL API
    static async translateWithDeepL(text, sourceLang, targetLang, apiKey) {
        if (!apiKey) {
            throw new Error('Chave da API do DeepL não configurada');
        }

        // Map language codes for DeepL
        const langMap = {
            'pt': 'PT-BR',
            'en': 'EN-US',
            'es': 'ES'
        };

        const url = 'https://api-free.deepl.com/v2/translate';
        
        const formData = new FormData();
        formData.append('auth_key', apiKey);
        formData.append('text', text);
        formData.append('source_lang', langMap[sourceLang] || sourceLang.toUpperCase());
        formData.append('target_lang', langMap[targetLang] || targetLang.toUpperCase());

        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`DeepL API error: ${response.status}`);
        }

        const data = await response.json();
        return data.translations[0].text;
    }

    // Azure Translator API
    static async translateWithAzure(text, sourceLang, targetLang, apiKey) {
        if (!apiKey) {
            throw new Error('Chave da API do Azure Translator não configurada');
        }

        const url = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=${sourceLang}&to=${targetLang}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Ocp-Apim-Subscription-Key': apiKey,
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Region': 'global'
            },
            body: JSON.stringify([{ text: text }])
        });

        if (!response.ok) {
            throw new Error(`Azure Translator API error: ${response.status}`);
        }

        const data = await response.json();
        return data[0].translations[0].text;
    }

    // Mock Translation (for testing)
    static async translateWithMock(text, sourceLang, targetLang) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

        // Mock translations with some intelligence
        const mockTranslations = {
            'pt-en': {
                'Procedimentos Combinados': 'Combined Procedures',
                'Aumente seu faturamento': 'Increase your revenue',
                'Reserve Sua Vaga': 'Reserve Your Spot',
                'Método Face & Nose Code': 'Face & Nose Code Method',
                'Masterclass Exclusiva': 'Exclusive Masterclass',
                'Cirurgia Facial': 'Facial Surgery',
                'Dr. Alexandre Calandrini': 'Dr. Alexandre Calandrini',
                'Transforme Sua Prática Médica': 'Transform Your Medical Practice',
                'Experiência limitada': 'Limited experience',
                'participantes selecionados': 'selected participants',
                'Nome Completo': 'Full Name',
                'E-mail Executivo': 'Executive Email',
                'WhatsApp Pessoal': 'Personal WhatsApp',
                'Horário de Brasília': 'Brasilia Time',
                'Vagas Limitadas': 'Limited Spots',
                'Garantir Acesso': 'Secure Access',
                'Só Mais Um Passo': 'Just One More Step',
                'Junte-se ao Grupo': 'Join the Group',
                'Grupo do WhatsApp': 'WhatsApp Group',
                'Acesso exclusivo': 'Exclusive access',
                'Grupo silencioso': 'Silent group',
                'Materiais exclusivos': 'Exclusive materials'
            },
            'pt-es': {
                'Procedimentos Combinados': 'Procedimientos Combinados',
                'Aumente seu faturamento': 'Aumente su facturación',
                'Reserve Sua Vaga': 'Reserve Su Plaza',
                'Método Face & Nose Code': 'Método Face & Nose Code',
                'Masterclass Exclusiva': 'Masterclass Exclusiva',
                'Cirurgia Facial': 'Cirugía Facial',
                'Dr. Alexandre Calandrini': 'Dr. Alexandre Calandrini',
                'Transforme Sua Prática Médica': 'Transforme Su Práctica Médica',
                'Experiência limitada': 'Experiencia limitada',
                'participantes selecionados': 'participantes seleccionados',
                'Nome Completo': 'Nombre Completo',
                'E-mail Executivo': 'Email Ejecutivo',
                'WhatsApp Pessoal': 'WhatsApp Personal',
                'Horário de Brasília': 'Horario de Brasilia',
                'Vagas Limitadas': 'Plazas Limitadas',
                'Garantir Acesso': 'Garantizar Acceso',
                'Só Mais Um Passo': 'Solo Un Paso Más',
                'Junte-se ao Grupo': 'Únete al Grupo',
                'Grupo do WhatsApp': 'Grupo de WhatsApp',
                'Acesso exclusivo': 'Acceso exclusivo',
                'Grupo silencioso': 'Grupo silencioso',
                'Materiais exclusivos': 'Materiales exclusivos'
            }
        };

        const key = `${sourceLang}-${targetLang}`;
        const translations = mockTranslations[key] || {};

        // Try exact match first
        if (translations[text]) {
            return translations[text];
        }

        // Try partial matches
        for (const [original, translated] of Object.entries(translations)) {
            if (text.includes(original)) {
                return text.replace(original, translated);
            }
        }

        // Fallback: generate mock translation
        return this.generateMockTranslation(text, targetLang);
    }

    static generateMockTranslation(text, targetLang) {
        const prefixes = {
            'en': '[EN] ',
            'es': '[ES] '
        };

        const prefix = prefixes[targetLang] || '[TRANSLATED] ';
        
        // Simple mock: add prefix and some basic transformations
        let mockTranslation = prefix + text;

        // Some basic transformations for realism
        if (targetLang === 'en') {
            mockTranslation = mockTranslation
                .replace(/ção/g, 'tion')
                .replace(/ões/g, 'ions')
                .replace(/ê/g, 'e')
                .replace(/ô/g, 'o')
                .replace(/ã/g, 'a');
        } else if (targetLang === 'es') {
            mockTranslation = mockTranslation
                .replace(/ção/g, 'ción')
                .replace(/ões/g, 'iones')
                .replace(/nh/g, 'ñ');
        }

        return mockTranslation;
    }

    // Batch translation
    static async translateBatch(texts, sourceLang, targetLang, service = 'mock', apiKey = '') {
        const results = [];
        
        for (const text of texts) {
            try {
                const translation = await this.translate(text, sourceLang, targetLang, service, apiKey);
                results.push({ original: text, translated: translation, success: true });
                
                // Small delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 100));
            } catch (error) {
                results.push({ original: text, translated: '', success: false, error: error.message });
            }
        }
        
        return results;
    }

    // Language detection (mock implementation)
    static async detectLanguage(text, service = 'mock', apiKey = '') {
        // Simple heuristic-based detection for mock
        if (service === 'mock') {
            const portugueseWords = ['que', 'com', 'para', 'uma', 'seu', 'sua', 'não', 'mais', 'como', 'por'];
            const englishWords = ['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had'];
            const spanishWords = ['que', 'con', 'para', 'una', 'por', 'más', 'como', 'pero', 'sus', 'les'];

            const words = text.toLowerCase().split(/\s+/);
            
            let ptScore = 0, enScore = 0, esScore = 0;
            
            words.forEach(word => {
                if (portugueseWords.includes(word)) ptScore++;
                if (englishWords.includes(word)) enScore++;
                if (spanishWords.includes(word)) esScore++;
            });

            if (ptScore > enScore && ptScore > esScore) return 'pt';
            if (enScore > ptScore && enScore > esScore) return 'en';
            if (esScore > ptScore && esScore > enScore) return 'es';
            
            return 'pt'; // Default fallback
        }

        // For real services, implement actual detection API calls
        throw new Error('Language detection not implemented for this service');
    }

    // Get supported languages
    static getSupportedLanguages(service = 'mock') {
        const languages = {
            mock: [
                { code: 'pt', name: 'Português' },
                { code: 'en', name: 'English' },
                { code: 'es', name: 'Español' }
            ],
            google: [
                { code: 'pt', name: 'Portuguese' },
                { code: 'en', name: 'English' },
                { code: 'es', name: 'Spanish' },
                { code: 'fr', name: 'French' },
                { code: 'de', name: 'German' },
                { code: 'it', name: 'Italian' }
            ],
            deepl: [
                { code: 'PT-BR', name: 'Portuguese (Brazil)' },
                { code: 'EN-US', name: 'English (US)' },
                { code: 'ES', name: 'Spanish' },
                { code: 'FR', name: 'French' },
                { code: 'DE', name: 'German' },
                { code: 'IT', name: 'Italian' }
            ],
            azure: [
                { code: 'pt', name: 'Portuguese' },
                { code: 'en', name: 'English' },
                { code: 'es', name: 'Spanish' },
                { code: 'fr', name: 'French' },
                { code: 'de', name: 'German' },
                { code: 'it', name: 'Italian' }
            ]
        };

        return languages[service] || languages.mock;
    }

    // Validate API key
    static async validateApiKey(service, apiKey) {
        if (!apiKey) return false;

        try {
            // Test with a simple translation
            await this.translate('test', 'pt', 'en', service, apiKey);
            return true;
        } catch (error) {
            console.error('API key validation failed:', error);
            return false;
        }
    }

    // Get usage statistics (mock implementation)
    static async getUsageStats(service, apiKey) {
        if (service === 'mock') {
            return {
                charactersUsed: Math.floor(Math.random() * 50000),
                charactersLimit: 500000,
                requestsUsed: Math.floor(Math.random() * 1000),
                requestsLimit: 10000,
                resetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
            };
        }

        // For real services, implement actual usage API calls
        throw new Error('Usage stats not implemented for this service');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TranslationAPI;
} else {
    window.TranslationAPI = TranslationAPI;
}
