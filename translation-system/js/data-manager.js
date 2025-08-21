// ==============================================
// Data Manager - Storage and Synchronization
// ==============================================

class DataManager {
    constructor() {
        this.storageKey = 'translationSystem_data';
        this.settingsKey = 'translationSystem_settings';
        this.backupKey = 'translationSystem_backup';
        this.syncEnabled = false;
        this.lastSync = null;
    }

    // Local Storage Management
    async saveData(data) {
        try {
            const serialized = JSON.stringify(Array.from(data.entries()));
            localStorage.setItem(this.storageKey, serialized);
            
            // Create automatic backup
            if (this.shouldCreateBackup()) {
                await this.createBackup(data);
            }
            
            console.log(`💾 Data saved: ${data.size} translations`);
            return true;
        } catch (error) {
            console.error('Error saving data:', error);
            throw new Error('Falha ao salvar dados localmente');
        }
    }

    async loadData() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (!stored) return new Map();
            
            const parsed = JSON.parse(stored);
            const data = new Map(parsed);
            
            console.log(`📚 Data loaded: ${data.size} translations`);
            return data;
        } catch (error) {
            console.error('Error loading data:', error);
            
            // Try to recover from backup
            const backup = await this.loadBackup();
            if (backup.size > 0) {
                console.log('🔄 Recovered from backup');
                return backup;
            }
            
            return new Map();
        }
    }

    async saveSettings(settings) {
        try {
            localStorage.setItem(this.settingsKey, JSON.stringify(settings));
            console.log('⚙️ Settings saved');
            return true;
        } catch (error) {
            console.error('Error saving settings:', error);
            throw new Error('Falha ao salvar configurações');
        }
    }

    async loadSettings() {
        try {
            const stored = localStorage.getItem(this.settingsKey);
            return stored ? JSON.parse(stored) : {};
        } catch (error) {
            console.error('Error loading settings:', error);
            return {};
        }
    }

    // Backup Management
    shouldCreateBackup() {
        const lastBackup = localStorage.getItem(`${this.backupKey}_timestamp`);
        if (!lastBackup) return true;
        
        const lastBackupTime = new Date(lastBackup);
        const now = new Date();
        const hoursSinceBackup = (now - lastBackupTime) / (1000 * 60 * 60);
        
        return hoursSinceBackup >= 24; // Backup every 24 hours
    }

    async createBackup(data) {
        try {
            const backup = {
                timestamp: new Date().toISOString(),
                version: '1.0',
                data: Array.from(data.entries()),
                count: data.size
            };
            
            localStorage.setItem(this.backupKey, JSON.stringify(backup));
            localStorage.setItem(`${this.backupKey}_timestamp`, backup.timestamp);
            
            console.log(`🔄 Backup created: ${data.size} translations`);
            return true;
        } catch (error) {
            console.error('Error creating backup:', error);
            return false;
        }
    }

    async loadBackup() {
        try {
            const stored = localStorage.getItem(this.backupKey);
            if (!stored) return new Map();
            
            const backup = JSON.parse(stored);
            const data = new Map(backup.data);
            
            console.log(`🔄 Backup loaded: ${data.size} translations from ${backup.timestamp}`);
            return data;
        } catch (error) {
            console.error('Error loading backup:', error);
            return new Map();
        }
    }

    async restoreFromBackup() {
        try {
            const backup = await this.loadBackup();
            if (backup.size === 0) {
                throw new Error('Nenhum backup encontrado');
            }
            
            await this.saveData(backup);
            console.log('🔄 Restored from backup successfully');
            return backup;
        } catch (error) {
            console.error('Error restoring from backup:', error);
            throw error;
        }
    }

    // Export/Import Functions
    async exportToJSON(data) {
        const exportData = {
            metadata: {
                exportDate: new Date().toISOString(),
                version: '1.0',
                totalTranslations: data.size,
                exportedBy: 'Translation System'
            },
            translations: Array.from(data.values())
        };
        
        return JSON.stringify(exportData, null, 2);
    }

    async exportToCSV(data) {
        const headers = [
            'Key',
            'Category', 
            'Portuguese',
            'English',
            'Spanish',
            'Status',
            'Last Modified',
            'Auto Translated EN',
            'Auto Translated ES'
        ];
        
        const rows = Array.from(data.values()).map(item => [
            this.escapeCSV(item.key),
            this.escapeCSV(item.category),
            this.escapeCSV(item.original),
            this.escapeCSV(item.english),
            this.escapeCSV(item.spanish),
            this.escapeCSV(item.status),
            this.escapeCSV(item.lastModified),
            item.autoTranslated?.english ? 'Yes' : 'No',
            item.autoTranslated?.spanish ? 'Yes' : 'No'
        ]);
        
        return [headers, ...rows]
            .map(row => row.join(','))
            .join('\n');
    }

    async exportToExcel(data) {
        // For Excel export, we'll create a CSV that Excel can import
        // In a real implementation, you might use a library like SheetJS
        const csvData = await this.exportToCSV(data);
        return csvData;
    }

    escapeCSV(field) {
        if (field === null || field === undefined) return '""';
        const str = String(field);
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
            return `"${str.replace(/"/g, '""')}"`;
        }
        return `"${str}"`;
    }

    async importFromJSON(jsonString) {
        try {
            const parsed = JSON.parse(jsonString);
            
            // Handle different JSON formats
            let translations;
            if (parsed.translations && Array.isArray(parsed.translations)) {
                // New format with metadata
                translations = parsed.translations;
            } else if (Array.isArray(parsed)) {
                // Simple array format
                translations = parsed;
            } else {
                throw new Error('Formato JSON inválido');
            }
            
            const importedData = new Map();
            let validCount = 0;
            
            for (const item of translations) {
                if (this.validateTranslationItem(item)) {
                    importedData.set(item.key, {
                        ...item,
                        lastModified: item.lastModified || new Date().toISOString(),
                        autoTranslated: item.autoTranslated || { english: false, spanish: false }
                    });
                    validCount++;
                }
            }
            
            console.log(`📥 Imported ${validCount} valid translations from JSON`);
            return importedData;
        } catch (error) {
            console.error('Error importing JSON:', error);
            throw new Error('Erro ao importar arquivo JSON: ' + error.message);
        }
    }

    async importFromCSV(csvString) {
        try {
            const lines = csvString.trim().split('\n');
            if (lines.length < 2) {
                throw new Error('Arquivo CSV vazio ou inválido');
            }
            
            const headers = this.parseCSVLine(lines[0]);
            const importedData = new Map();
            let validCount = 0;
            
            for (let i = 1; i < lines.length; i++) {
                const values = this.parseCSVLine(lines[i]);
                if (values.length < headers.length) continue;
                
                const item = {};
                headers.forEach((header, index) => {
                    item[header.toLowerCase().replace(/\s+/g, '')] = values[index] || '';
                });
                
                // Map CSV columns to our data structure
                const translation = {
                    key: item.key,
                    category: item.category || 'content',
                    original: item.portuguese || item.original,
                    english: item.english,
                    spanish: item.spanish,
                    status: item.status || 'pending',
                    lastModified: item.lastmodified || new Date().toISOString(),
                    autoTranslated: {
                        english: item.autotranslatedEN?.toLowerCase() === 'yes',
                        spanish: item.autotranslatedES?.toLowerCase() === 'yes'
                    }
                };
                
                if (this.validateTranslationItem(translation)) {
                    importedData.set(translation.key, translation);
                    validCount++;
                }
            }
            
            console.log(`📥 Imported ${validCount} valid translations from CSV`);
            return importedData;
        } catch (error) {
            console.error('Error importing CSV:', error);
            throw new Error('Erro ao importar arquivo CSV: ' + error.message);
        }
    }

    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                if (inQuotes && line[i + 1] === '"') {
                    current += '"';
                    i++; // Skip next quote
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                result.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        
        result.push(current);
        return result;
    }

    validateTranslationItem(item) {
        return item && 
               typeof item.key === 'string' && 
               item.key.trim() !== '' &&
               typeof item.original === 'string' &&
               item.original.trim() !== '';
    }

    // Data Analysis and Statistics
    getDataStatistics(data) {
        const translations = Array.from(data.values());
        
        const stats = {
            total: translations.length,
            byStatus: {
                synced: 0,
                pending: 0,
                error: 0
            },
            byCategory: {},
            autoTranslated: {
                english: 0,
                spanish: 0
            },
            totalCharacters: {
                portuguese: 0,
                english: 0,
                spanish: 0
            },
            lastModified: null,
            oldestModified: null
        };
        
        translations.forEach(translation => {
            // Status count
            stats.byStatus[translation.status] = (stats.byStatus[translation.status] || 0) + 1;
            
            // Category count
            stats.byCategory[translation.category] = (stats.byCategory[translation.category] || 0) + 1;
            
            // Auto-translated count
            if (translation.autoTranslated?.english) stats.autoTranslated.english++;
            if (translation.autoTranslated?.spanish) stats.autoTranslated.spanish++;
            
            // Character count
            stats.totalCharacters.portuguese += translation.original.length;
            stats.totalCharacters.english += (translation.english || '').length;
            stats.totalCharacters.spanish += (translation.spanish || '').length;
            
            // Date tracking
            const modifiedDate = new Date(translation.lastModified);
            if (!stats.lastModified || modifiedDate > new Date(stats.lastModified)) {
                stats.lastModified = translation.lastModified;
            }
            if (!stats.oldestModified || modifiedDate < new Date(stats.oldestModified)) {
                stats.oldestModified = translation.lastModified;
            }
        });
        
        return stats;
    }

    // Data Validation and Cleanup
    async validateAndCleanData(data) {
        const cleaned = new Map();
        const issues = [];
        
        for (const [key, translation] of data.entries()) {
            const cleanedTranslation = { ...translation };
            let hasIssues = false;
            
            // Validate key
            if (!key || typeof key !== 'string' || key.trim() === '') {
                issues.push(`Invalid key: ${key}`);
                continue;
            }
            
            // Validate original text
            if (!translation.original || typeof translation.original !== 'string') {
                issues.push(`Missing original text for key: ${key}`);
                hasIssues = true;
                cleanedTranslation.original = '';
            }
            
            // Ensure required fields exist
            cleanedTranslation.english = cleanedTranslation.english || '';
            cleanedTranslation.spanish = cleanedTranslation.spanish || '';
            cleanedTranslation.category = cleanedTranslation.category || 'content';
            cleanedTranslation.status = cleanedTranslation.status || 'pending';
            cleanedTranslation.lastModified = cleanedTranslation.lastModified || new Date().toISOString();
            cleanedTranslation.autoTranslated = cleanedTranslation.autoTranslated || { english: false, spanish: false };
            
            // Update status based on translations
            if (cleanedTranslation.english && cleanedTranslation.spanish) {
                cleanedTranslation.status = 'synced';
            } else if (!cleanedTranslation.english || !cleanedTranslation.spanish) {
                cleanedTranslation.status = 'pending';
            }
            
            cleaned.set(key, cleanedTranslation);
        }
        
        console.log(`🧹 Data cleaned: ${cleaned.size} translations, ${issues.length} issues found`);
        
        return {
            data: cleaned,
            issues: issues
        };
    }

    // Search and Filter Functions
    searchTranslations(data, query, filters = {}) {
        const searchTerm = query.toLowerCase();
        const results = [];
        
        for (const translation of data.values()) {
            let matches = false;
            
            // Text search
            if (!query || 
                translation.key.toLowerCase().includes(searchTerm) ||
                translation.original.toLowerCase().includes(searchTerm) ||
                translation.english.toLowerCase().includes(searchTerm) ||
                translation.spanish.toLowerCase().includes(searchTerm)) {
                matches = true;
            }
            
            // Apply filters
            if (matches && filters.status && translation.status !== filters.status) {
                matches = false;
            }
            
            if (matches && filters.category && translation.category !== filters.category) {
                matches = false;
            }
            
            if (matches && filters.autoTranslated !== undefined) {
                const hasAutoTranslated = translation.autoTranslated?.english || translation.autoTranslated?.spanish;
                if (filters.autoTranslated !== hasAutoTranslated) {
                    matches = false;
                }
            }
            
            if (matches) {
                results.push(translation);
            }
        }
        
        return results.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
    }

    // Utility Functions
    generateUniqueKey(baseKey, existingKeys) {
        let counter = 1;
        let newKey = baseKey;
        
        while (existingKeys.has(newKey)) {
            newKey = `${baseKey}_${counter}`;
            counter++;
        }
        
        return newKey;
    }

    async clearAllData() {
        try {
            localStorage.removeItem(this.storageKey);
            localStorage.removeItem(this.backupKey);
            localStorage.removeItem(`${this.backupKey}_timestamp`);
            console.log('🗑️ All data cleared');
            return true;
        } catch (error) {
            console.error('Error clearing data:', error);
            return false;
        }
    }

    getStorageUsage() {
        try {
            const data = localStorage.getItem(this.storageKey) || '';
            const settings = localStorage.getItem(this.settingsKey) || '';
            const backup = localStorage.getItem(this.backupKey) || '';
            
            return {
                data: data.length,
                settings: settings.length,
                backup: backup.length,
                total: data.length + settings.length + backup.length,
                totalMB: (data.length + settings.length + backup.length) / (1024 * 1024)
            };
        } catch (error) {
            console.error('Error calculating storage usage:', error);
            return { data: 0, settings: 0, backup: 0, total: 0, totalMB: 0 };
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataManager;
} else {
    window.DataManager = DataManager;
}
