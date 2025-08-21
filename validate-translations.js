#!/usr/bin/env node

/**
 * Translation Validation Script
 * Verifica se todas as chaves de tradução estão presentes em todos os idiomas
 */

const fs = require('fs');
const path = require('path');

// Função para extrair chaves de um objeto de forma recursiva
function extractKeys(obj, prefix = '') {
    let keys = [];
    
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const fullKey = prefix ? `${prefix}.${key}` : key;
            
            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                keys = keys.concat(extractKeys(obj[key], fullKey));
            } else {
                keys.push(fullKey);
            }
        }
    }
    
    return keys;
}

// Função para carregar e avaliar arquivo de tradução
function loadTranslationFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Remove comentários e exports para poder avaliar
        const cleanContent = content
            .replace(/\/\/.*$/gm, '') // Remove comentários de linha
            .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comentários de bloco
            .replace(/if \(typeof module.*$/gm, '') // Remove exports
            .replace(/module\.exports.*$/gm, '')
            .replace(/window\.translations.*$/gm, '');
        
        // Extrai o objeto de tradução
        const match = cleanContent.match(/const translations_\w+ = ({[\s\S]*?});/);
        if (match) {
            return eval(`(${match[1]})`);
        }
        
        throw new Error('Não foi possível extrair o objeto de tradução');
    } catch (error) {
        console.error(`Erro ao carregar ${filePath}:`, error.message);
        return null;
    }
}

// Função principal de validação
function validateTranslations() {
    const translationDir = path.join(__dirname, 'src', 'i18n');
    const languages = ['pt-BR', 'en-US', 'es-ES'];
    
    console.log('🔍 Validando traduções...\n');
    
    const translations = {};
    const allKeys = new Set();
    
    // Carrega todas as traduções
    for (const lang of languages) {
        const filePath = path.join(translationDir, `${lang}.js`);
        console.log(`📂 Carregando ${lang}...`);
        
        translations[lang] = loadTranslationFile(filePath);
        
        if (translations[lang]) {
            const keys = extractKeys(translations[lang]);
            keys.forEach(key => allKeys.add(key));
            console.log(`   ✅ ${keys.length} chaves encontradas`);
        } else {
            console.log(`   ❌ Erro ao carregar`);
        }
    }
    
    console.log(`\n📊 Total de chaves únicas: ${allKeys.size}\n`);
    
    // Verifica chaves faltantes
    let hasErrors = false;
    
    for (const lang of languages) {
        console.log(`🔍 Verificando ${lang}:`);
        
        if (!translations[lang]) {
            console.log(`   ❌ Arquivo não carregado`);
            hasErrors = true;
            continue;
        }
        
        const langKeys = new Set(extractKeys(translations[lang]));
        const missingKeys = [...allKeys].filter(key => !langKeys.has(key));
        
        if (missingKeys.length === 0) {
            console.log(`   ✅ Todas as chaves presentes`);
        } else {
            console.log(`   ❌ ${missingKeys.length} chaves faltando:`);
            missingKeys.forEach(key => console.log(`      - ${key}`));
            hasErrors = true;
        }
    }
    
    // Verifica chaves extras
    console.log('\n🔍 Verificando chaves extras:');
    
    for (const lang of languages) {
        if (!translations[lang]) continue;
        
        const langKeys = new Set(extractKeys(translations[lang]));
        const baseKeys = new Set(extractKeys(translations['pt-BR'] || {}));
        const extraKeys = [...langKeys].filter(key => !baseKeys.has(key));
        
        if (extraKeys.length === 0) {
            console.log(`   ✅ ${lang}: Sem chaves extras`);
        } else {
            console.log(`   ⚠️  ${lang}: ${extraKeys.length} chaves extras:`);
            extraKeys.forEach(key => console.log(`      + ${key}`));
        }
    }
    
    // Relatório final
    console.log('\n' + '='.repeat(50));
    if (hasErrors) {
        console.log('❌ VALIDAÇÃO FALHOU - Corrija os erros acima');
        process.exit(1);
    } else {
        console.log('✅ VALIDAÇÃO PASSOU - Todas as traduções estão completas!');
    }
    
    // Estatísticas detalhadas
    console.log('\n📈 Estatísticas:');
    for (const lang of languages) {
        if (translations[lang]) {
            const keys = extractKeys(translations[lang]);
            console.log(`   ${lang}: ${keys.length} chaves`);
        }
    }
}

// Executa a validação
if (require.main === module) {
    validateTranslations();
}

module.exports = { validateTranslations, extractKeys, loadTranslationFile };
