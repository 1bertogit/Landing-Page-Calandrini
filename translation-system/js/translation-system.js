// ==============================================
// Translation System - Main Controller
// ==============================================

class TranslationSystem {
    constructor() {
        this.translations = new Map();
        this.settings = {
            translationService: 'mock',
            apiKey: '',
            autoSync: true,
            autoBackup: false,
            exportFormat: 'json'
        };
        
        this.init();
    }

    async init() {
        console.log('🚀 Initializing Translation System...');
        
        // Load settings and data
        await this.loadSettings();
        await this.loadTranslations();
        
        // Initialize UI
        this.initializeEventListeners();
        this.updateStats();
        this.renderTranslationsList();
        
        // Load sample data if empty
        if (this.translations.size === 0) {
            this.loadSampleData();
        }
        
        console.log('✅ Translation System initialized successfully');
    }

    initializeEventListeners() {
        // Main action buttons
        document.getElementById('addTextBtn').addEventListener('click', () => this.openTextModal());
        document.getElementById('translateAllBtn').addEventListener('click', () => this.translateAllPending());
        document.getElementById('exportBtn').addEventListener('click', () => this.exportTranslations());
        document.getElementById('importBtn').addEventListener('click', () => this.importTranslations());
        document.getElementById('settingsBtn').addEventListener('click', () => this.openSettingsModal());

        // Modal controls
        document.getElementById('closeModal').addEventListener('click', () => this.closeTextModal());
        document.getElementById('cancelBtn').addEventListener('click', () => this.closeTextModal());
        document.getElementById('textForm').addEventListener('submit', (e) => this.handleFormSubmit(e));

        // Settings modal
        document.getElementById('closeSettingsModal').addEventListener('click', () => this.closeSettingsModal());
        document.getElementById('saveSettings').addEventListener('click', () => this.saveSettings());
        document.getElementById('resetSettings').addEventListener('click', () => this.resetSettings());

        // Auto translation buttons
        document.getElementById('translateEnBtn').addEventListener('click', () => this.autoTranslate('en'));
        document.getElementById('translateEsBtn').addEventListener('click', () => this.autoTranslate('es'));

        // Search and filters
        document.getElementById('searchInput').addEventListener('input', (e) => this.filterTranslations());
        document.getElementById('statusFilter').addEventListener('change', (e) => this.filterTranslations());
        document.getElementById('categoryFilter').addEventListener('change', (e) => this.filterTranslations());

        // File input for import
        document.getElementById('fileInput').addEventListener('change', (e) => this.handleFileImport(e));

        // Close modals on outside click
        document.getElementById('textModal').addEventListener('click', (e) => {
            if (e.target.id === 'textModal') this.closeTextModal();
        });
        
        document.getElementById('settingsModal').addEventListener('click', (e) => {
            if (e.target.id === 'settingsModal') this.closeSettingsModal();
        });
    }

    // Data Management
    async loadTranslations() {
        try {
            const saved = localStorage.getItem('translationSystem_data');
            if (saved) {
                const data = JSON.parse(saved);
                this.translations = new Map(data);
                console.log(`📚 Loaded ${this.translations.size} translations from storage`);
            }
        } catch (error) {
            console.error('Error loading translations:', error);
            this.showToast('Erro ao carregar traduções', 'error');
        }
    }

    async saveTranslations() {
        try {
            const data = Array.from(this.translations.entries());
            localStorage.setItem('translationSystem_data', JSON.stringify(data));
            console.log(`💾 Saved ${this.translations.size} translations to storage`);
        } catch (error) {
            console.error('Error saving translations:', error);
            this.showToast('Erro ao salvar traduções', 'error');
        }
    }

    async loadSettings() {
        try {
            const saved = localStorage.getItem('translationSystem_settings');
            if (saved) {
                this.settings = { ...this.settings, ...JSON.parse(saved) };
                console.log('⚙️ Settings loaded');
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    }

    async saveSettings() {
        try {
            // Get values from form
            this.settings.translationService = document.getElementById('translationService').value;
            this.settings.apiKey = document.getElementById('apiKey').value;
            this.settings.autoSync = document.getElementById('autoSync').checked;
            this.settings.autoBackup = document.getElementById('autoBackup').checked;
            this.settings.exportFormat = document.getElementById('exportFormat').value;

            localStorage.setItem('translationSystem_settings', JSON.stringify(this.settings));
            this.closeSettingsModal();
            this.showToast('Configurações salvas com sucesso!', 'success');
            console.log('⚙️ Settings saved');
        } catch (error) {
            console.error('Error saving settings:', error);
            this.showToast('Erro ao salvar configurações', 'error');
        }
    }

    resetSettings() {
        if (confirm('Tem certeza que deseja resetar todas as configurações?')) {
            this.settings = {
                translationService: 'mock',
                apiKey: '',
                autoSync: true,
                autoBackup: false,
                exportFormat: 'json'
            };
            localStorage.removeItem('translationSystem_settings');
            this.populateSettingsForm();
            this.showToast('Configurações resetadas', 'info');
        }
    }

    // Translation Management
    async addOrUpdateTranslation(key, data) {
        try {
            const translation = {
                key: key,
                category: data.category,
                original: data.original,
                english: data.english || '',
                spanish: data.spanish || '',
                status: this.getTranslationStatus(data),
                lastModified: new Date().toISOString(),
                autoTranslated: {
                    english: data.autoTranslatedEn || false,
                    spanish: data.autoTranslatedEs || false
                }
            };

            this.translations.set(key, translation);
            await this.saveTranslations();
            
            console.log(`📝 Translation ${key} saved`);
            return translation;
        } catch (error) {
            console.error('Error saving translation:', error);
            throw error;
        }
    }

    getTranslationStatus(data) {
        if (!data.english || !data.spanish) return 'pending';
        if (data.english && data.spanish) return 'synced';
        return 'error';
    }

    async deleteTranslation(key) {
        if (confirm(`Tem certeza que deseja excluir a tradução "${key}"?`)) {
            this.translations.delete(key);
            await this.saveTranslations();
            this.renderTranslationsList();
            this.updateStats();
            this.showToast('Tradução excluída com sucesso', 'success');
        }
    }

    async duplicateTranslation(key) {
        const original = this.translations.get(key);
        if (original) {
            const newKey = `${key}_copy_${Date.now()}`;
            const newTranslation = {
                ...original,
                key: newKey,
                lastModified: new Date().toISOString()
            };
            
            this.translations.set(newKey, newTranslation);
            await this.saveTranslations();
            this.renderTranslationsList();
            this.updateStats();
            this.showToast('Tradução duplicada com sucesso', 'success');
        }
    }

    // Auto Translation
    async autoTranslate(targetLang) {
        const originalText = document.getElementById('originalText').value.trim();
        if (!originalText) {
            this.showToast('Digite o texto original primeiro', 'warning');
            return;
        }

        const targetField = targetLang === 'en' ? 'englishText' : 'spanishText';
        const button = targetLang === 'en' ? 'translateEnBtn' : 'translateEsBtn';
        
        try {
            // Show loading state
            const btnElement = document.getElementById(button);
            const originalBtnContent = btnElement.innerHTML;
            btnElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traduzindo...';
            btnElement.disabled = true;

            // Call translation API
            const translatedText = await TranslationAPI.translate(
                originalText, 
                'pt', 
                targetLang, 
                this.settings.translationService,
                this.settings.apiKey
            );

            // Update field
            document.getElementById(targetField).value = translatedText;
            
            // Mark as auto-translated
            if (targetLang === 'en') {
                document.getElementById('englishText').dataset.autoTranslated = 'true';
            } else {
                document.getElementById('spanishText').dataset.autoTranslated = 'true';
            }

            this.showToast(`Texto traduzido para ${targetLang === 'en' ? 'inglês' : 'espanhol'}!`, 'success');

        } catch (error) {
            console.error('Translation error:', error);
            this.showToast('Erro na tradução automática', 'error');
        } finally {
            // Restore button
            const btnElement = document.getElementById(button);
            btnElement.innerHTML = '<i class="fas fa-magic text-sm"></i> Auto';
            btnElement.disabled = false;
        }
    }

    async translateAllPending() {
        const pendingTranslations = Array.from(this.translations.values())
            .filter(t => t.status === 'pending');

        if (pendingTranslations.length === 0) {
            this.showToast('Nenhuma tradução pendente encontrada', 'info');
            return;
        }

        if (!confirm(`Traduzir automaticamente ${pendingTranslations.length} textos pendentes?`)) {
            return;
        }

        this.showLoading('Traduzindo textos pendentes...');

        try {
            let successCount = 0;
            let errorCount = 0;

            for (const translation of pendingTranslations) {
                try {
                    const updates = { ...translation };

                    // Translate to English if missing
                    if (!translation.english) {
                        updates.english = await TranslationAPI.translate(
                            translation.original, 'pt', 'en',
                            this.settings.translationService, this.settings.apiKey
                        );
                        updates.autoTranslated.english = true;
                    }

                    // Translate to Spanish if missing
                    if (!translation.spanish) {
                        updates.spanish = await TranslationAPI.translate(
                            translation.original, 'pt', 'es',
                            this.settings.translationService, this.settings.apiKey
                        );
                        updates.autoTranslated.spanish = true;
                    }

                    updates.status = 'synced';
                    updates.lastModified = new Date().toISOString();

                    this.translations.set(translation.key, updates);
                    successCount++;

                    // Small delay to avoid rate limiting
                    await new Promise(resolve => setTimeout(resolve, 100));

                } catch (error) {
                    console.error(`Error translating ${translation.key}:`, error);
                    errorCount++;
                }
            }

            await this.saveTranslations();
            this.renderTranslationsList();
            this.updateStats();

            this.showToast(
                `Tradução concluída: ${successCount} sucessos, ${errorCount} erros`,
                errorCount > 0 ? 'warning' : 'success'
            );

        } catch (error) {
            console.error('Batch translation error:', error);
            this.showToast('Erro na tradução em lote', 'error');
        } finally {
            this.hideLoading();
        }
    }

    // UI Management
    updateStats() {
        const translations = Array.from(this.translations.values());
        const total = translations.length;
        const synced = translations.filter(t => t.status === 'synced').length;
        const pending = translations.filter(t => t.status === 'pending').length;
        const error = translations.filter(t => t.status === 'error').length;

        document.getElementById('totalTexts').textContent = total;
        document.getElementById('syncedTexts').textContent = synced;
        document.getElementById('pendingTexts').textContent = pending;
        document.getElementById('errorTexts').textContent = error;
    }

    renderTranslationsList() {
        const container = document.getElementById('translationsList');
        const translations = this.getFilteredTranslations();

        if (translations.length === 0) {
            container.innerHTML = `
                <div class="p-8 text-center text-gray-500">
                    <i class="fas fa-language text-4xl mb-4"></i>
                    <p class="text-lg">Nenhuma tradução encontrada</p>
                    <p class="text-sm">Adicione seu primeiro texto para começar</p>
                </div>
            `;
            return;
        }

        container.innerHTML = translations.map(translation => this.renderTranslationCard(translation)).join('');
    }

    renderTranslationCard(translation) {
        const statusClass = {
            'synced': 'status-synced',
            'pending': 'status-pending',
            'error': 'status-error'
        }[translation.status];

        const statusText = {
            'synced': 'Sincronizado',
            'pending': 'Pendente',
            'error': 'Erro'
        }[translation.status];

        return `
            <div class="translation-card p-6 hover:bg-gray-50" data-key="${translation.key}">
                <div class="flex items-start justify-between">
                    <div class="flex-1">
                        <div class="flex items-center space-x-3 mb-2">
                            <h3 class="font-semibold text-gray-800">${translation.key}</h3>
                            <span class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                ${translation.category}
                            </span>
                            <span class="flex items-center text-xs text-gray-500">
                                <span class="status-indicator ${statusClass}"></span>
                                ${statusText}
                            </span>
                        </div>
                        
                        <div class="space-y-3">
                            <div>
                                <div class="flex items-center space-x-2 mb-1">
                                    <span class="language-flag flag-pt"></span>
                                    <span class="text-sm font-medium text-gray-700">Português</span>
                                </div>
                                <p class="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                    ${translation.original}
                                </p>
                            </div>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <div class="flex items-center space-x-2 mb-1">
                                        <span class="language-flag flag-en"></span>
                                        <span class="text-sm font-medium text-gray-700">English</span>
                                        ${translation.autoTranslated.english ? '<i class="fas fa-magic text-xs text-blue-500" title="Traduzido automaticamente"></i>' : ''}
                                    </div>
                                    <p class="text-sm text-gray-600 bg-gray-50 p-2 rounded min-h-[2.5rem]">
                                        ${translation.english || '<span class="text-gray-400 italic">Não traduzido</span>'}
                                    </p>
                                </div>
                                
                                <div>
                                    <div class="flex items-center space-x-2 mb-1">
                                        <span class="language-flag flag-es"></span>
                                        <span class="text-sm font-medium text-gray-700">Español</span>
                                        ${translation.autoTranslated.spanish ? '<i class="fas fa-magic text-xs text-blue-500" title="Traduzido automaticamente"></i>' : ''}
                                    </div>
                                    <p class="text-sm text-gray-600 bg-gray-50 p-2 rounded min-h-[2.5rem]">
                                        ${translation.spanish || '<span class="text-gray-400 italic">No traducido</span>'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                            <span class="text-xs text-gray-500">
                                Modificado: ${new Date(translation.lastModified).toLocaleString('pt-BR')}
                            </span>
                            
                            <div class="flex space-x-2">
                                <button onclick="translationSystem.editTranslation('${translation.key}')" 
                                        class="text-blue-600 hover:text-blue-800 text-sm">
                                    <i class="fas fa-edit"></i> Editar
                                </button>
                                <button onclick="translationSystem.duplicateTranslation('${translation.key}')" 
                                        class="text-green-600 hover:text-green-800 text-sm">
                                    <i class="fas fa-copy"></i> Duplicar
                                </button>
                                <button onclick="translationSystem.deleteTranslation('${translation.key}')" 
                                        class="text-red-600 hover:text-red-800 text-sm">
                                    <i class="fas fa-trash"></i> Excluir
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getFilteredTranslations() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const statusFilter = document.getElementById('statusFilter').value;
        const categoryFilter = document.getElementById('categoryFilter').value;

        return Array.from(this.translations.values()).filter(translation => {
            const matchesSearch = !searchTerm || 
                translation.key.toLowerCase().includes(searchTerm) ||
                translation.original.toLowerCase().includes(searchTerm) ||
                translation.english.toLowerCase().includes(searchTerm) ||
                translation.spanish.toLowerCase().includes(searchTerm);

            const matchesStatus = !statusFilter || translation.status === statusFilter;
            const matchesCategory = !categoryFilter || translation.category === categoryFilter;

            return matchesSearch && matchesStatus && matchesCategory;
        }).sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
    }

    filterTranslations() {
        this.renderTranslationsList();
    }

    // Modal Management
    openTextModal(key = null) {
        const modal = document.getElementById('textModal');
        const title = document.getElementById('modalTitle');
        
        if (key) {
            title.textContent = 'Editar Tradução';
            this.populateForm(key);
        } else {
            title.textContent = 'Adicionar Novo Texto';
            this.clearForm();
        }
        
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }

    closeTextModal() {
        const modal = document.getElementById('textModal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
        this.clearForm();
    }

    openSettingsModal() {
        const modal = document.getElementById('settingsModal');
        this.populateSettingsForm();
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }

    closeSettingsModal() {
        const modal = document.getElementById('settingsModal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }

    populateForm(key) {
        const translation = this.translations.get(key);
        if (translation) {
            document.getElementById('textKey').value = translation.key;
            document.getElementById('textCategory').value = translation.category;
            document.getElementById('originalText').value = translation.original;
            document.getElementById('englishText').value = translation.english;
            document.getElementById('spanishText').value = translation.spanish;
            
            // Disable key editing for existing translations
            document.getElementById('textKey').readOnly = true;
        }
    }

    populateSettingsForm() {
        document.getElementById('translationService').value = this.settings.translationService;
        document.getElementById('apiKey').value = this.settings.apiKey;
        document.getElementById('autoSync').checked = this.settings.autoSync;
        document.getElementById('autoBackup').checked = this.settings.autoBackup;
        document.getElementById('exportFormat').value = this.settings.exportFormat;
    }

    clearForm() {
        document.getElementById('textForm').reset();
        document.getElementById('textKey').readOnly = false;
        document.getElementById('englishText').dataset.autoTranslated = 'false';
        document.getElementById('spanishText').dataset.autoTranslated = 'false';
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const key = document.getElementById('textKey').value.trim();
        const category = document.getElementById('textCategory').value;
        const original = document.getElementById('originalText').value.trim();
        const english = document.getElementById('englishText').value.trim();
        const spanish = document.getElementById('spanishText').value.trim();
        const autoTranslate = document.getElementById('autoTranslate').checked;

        if (!key || !category || !original) {
            this.showToast('Preencha todos os campos obrigatórios', 'warning');
            return;
        }

        try {
            this.showLoading('Salvando tradução...');

            const data = {
                category,
                original,
                english,
                spanish,
                autoTranslatedEn: document.getElementById('englishText').dataset.autoTranslated === 'true',
                autoTranslatedEs: document.getElementById('spanishText').dataset.autoTranslated === 'true'
            };

            // Auto translate if requested and fields are empty
            if (autoTranslate) {
                if (!english) {
                    data.english = await TranslationAPI.translate(original, 'pt', 'en', this.settings.translationService, this.settings.apiKey);
                    data.autoTranslatedEn = true;
                }
                if (!spanish) {
                    data.spanish = await TranslationAPI.translate(original, 'pt', 'es', this.settings.translationService, this.settings.apiKey);
                    data.autoTranslatedEs = true;
                }
            }

            await this.addOrUpdateTranslation(key, data);
            
            this.closeTextModal();
            this.renderTranslationsList();
            this.updateStats();
            this.showToast('Tradução salva com sucesso!', 'success');

        } catch (error) {
            console.error('Error saving translation:', error);
            this.showToast('Erro ao salvar tradução', 'error');
        } finally {
            this.hideLoading();
        }
    }

    editTranslation(key) {
        this.openTextModal(key);
    }

    // Import/Export
    exportTranslations() {
        try {
            const data = Array.from(this.translations.values());
            const format = this.settings.exportFormat;
            
            let content, filename, mimeType;

            switch (format) {
                case 'json':
                    content = JSON.stringify(data, null, 2);
                    filename = `translations_${new Date().toISOString().split('T')[0]}.json`;
                    mimeType = 'application/json';
                    break;
                    
                case 'csv':
                    content = this.convertToCSV(data);
                    filename = `translations_${new Date().toISOString().split('T')[0]}.csv`;
                    mimeType = 'text/csv';
                    break;
                    
                default:
                    throw new Error('Formato não suportado');
            }

            const blob = new Blob([content], { type: mimeType });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            this.showToast('Traduções exportadas com sucesso!', 'success');

        } catch (error) {
            console.error('Export error:', error);
            this.showToast('Erro ao exportar traduções', 'error');
        }
    }

    convertToCSV(data) {
        const headers = ['Key', 'Category', 'Portuguese', 'English', 'Spanish', 'Status', 'Last Modified'];
        const rows = data.map(item => [
            item.key,
            item.category,
            item.original,
            item.english,
            item.spanish,
            item.status,
            item.lastModified
        ]);

        return [headers, ...rows]
            .map(row => row.map(field => `"${field}"`).join(','))
            .join('\n');
    }

    importTranslations() {
        document.getElementById('fileInput').click();
    }

    async handleFileImport(e) {
        const file = e.target.files[0];
        if (!file) return;

        try {
            this.showLoading('Importando traduções...');

            const text = await file.text();
            let data;

            if (file.name.endsWith('.json')) {
                data = JSON.parse(text);
            } else if (file.name.endsWith('.csv')) {
                data = this.parseCSV(text);
            } else {
                throw new Error('Formato de arquivo não suportado');
            }

            // Validate and import data
            let importCount = 0;
            for (const item of data) {
                if (item.key && item.original) {
                    await this.addOrUpdateTranslation(item.key, {
                        category: item.category || 'content',
                        original: item.original,
                        english: item.english || '',
                        spanish: item.spanish || ''
                    });
                    importCount++;
                }
            }

            this.renderTranslationsList();
            this.updateStats();
            this.showToast(`${importCount} traduções importadas com sucesso!`, 'success');

        } catch (error) {
            console.error('Import error:', error);
            this.showToast('Erro ao importar traduções', 'error');
        } finally {
            this.hideLoading();
            e.target.value = ''; // Reset file input
        }
    }

    parseCSV(text) {
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(h => h.replace(/"/g, ''));
        
        return lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.replace(/"/g, ''));
            const obj = {};
            headers.forEach((header, index) => {
                obj[header.toLowerCase()] = values[index] || '';
            });
            return obj;
        }).filter(obj => obj.key);
    }

    // Utility Methods
    showLoading(text = 'Carregando...') {
        document.getElementById('loadingText').textContent = text;
        document.getElementById('loadingOverlay').classList.remove('hidden');
        document.getElementById('loadingOverlay').classList.add('flex');
    }

    hideLoading() {
        document.getElementById('loadingOverlay').classList.add('hidden');
        document.getElementById('loadingOverlay').classList.remove('flex');
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        
        const bgColor = {
            'success': 'bg-green-500',
            'error': 'bg-red-500',
            'warning': 'bg-yellow-500',
            'info': 'bg-blue-500'
        }[type];

        toast.className = `${bgColor} text-white px-6 py-3 rounded-lg shadow-lg fade-in`;
        toast.textContent = message;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 5000);
    }

    loadSampleData() {
        const sampleData = [
            {
                key: 'hero.title',
                category: 'hero',
                original: 'Procedimentos Combinados',
                english: 'Combined Procedures',
                spanish: 'Procedimientos Combinados'
            },
            {
                key: 'hero.subtitle',
                category: 'hero',
                original: 'Aumente seu faturamento em 30% dominando as técnicas mais avançadas em Cirurgia Facial',
                english: 'Increase your revenue by 30% mastering the most advanced techniques in Facial Surgery',
                spanish: 'Aumente su facturación en un 30% dominando las técnicas más avanzadas en Cirugía Facial'
            },
            {
                key: 'form.submit',
                category: 'form',
                original: 'Reserve Sua Vaga',
                english: 'Reserve Your Spot',
                spanish: 'Reserve Su Plaza'
            },
            {
                key: 'method.title',
                category: 'content',
                original: 'Método Face & Nose Code',
                english: '',
                spanish: ''
            }
        ];

        sampleData.forEach(async (item) => {
            await this.addOrUpdateTranslation(item.key, item);
        });

        this.renderTranslationsList();
        this.updateStats();
        this.showToast('Dados de exemplo carregados!', 'info');
    }
}

// Initialize the system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.translationSystem = new TranslationSystem();
});
