# Guia de Internacionalização - Face & Nose Code

## 🌍 Visão Geral

O sistema de internacionalização (i18n) do Face & Nose Code suporta 3 idiomas:
- **Português Brasileiro (pt-BR)** - Idioma padrão
- **Inglês Americano (en-US)** - Tradução profissional
- **Espanhol (es-ES)** - Tradução profissional

## 🚀 Como Usar

### Para Usuários Finais

#### Mudança Automática de Idioma
O sistema detecta automaticamente o idioma do navegador e aplica a tradução correspondente.

#### Mudança Manual de Idioma
1. Clique no seletor de idioma no canto superior direito
2. Escolha entre: 🇧🇷 Português, 🇺🇸 English, 🇪🇸 Español
3. A página será traduzida instantaneamente
4. Sua escolha será salva para futuras visitas

#### Via URL
Adicione o parâmetro `lang` na URL:
- `?lang=pt-BR` - Português
- `?lang=en-US` - Inglês
- `?lang=es-ES` - Espanhol

Exemplo: `https://seusite.com/index.html?lang=en-US`

### Para Desenvolvedores

#### Estrutura de Arquivos
```
src/
├── i18n/
│   ├── pt-BR.js    # Traduções em português
│   ├── en-US.js    # Traduções em inglês
│   └── es-ES.js    # Traduções em espanhol
└── assets/js/
    └── i18n.js     # Sistema de internacionalização
```

#### Adicionando Traduções a Elementos HTML

##### Tradução de Conteúdo
```html
<h1 data-i18n="hero.title">Texto padrão</h1>
```

##### Tradução de Atributos
```html
<meta name="description" content="Descrição padrão" data-i18n-content="meta.description">
<input placeholder="Nome" data-i18n-placeholder="form.name">
```

##### Tradução com HTML
```html
<p data-i18n="hero.subtitle">
    Aumente seu faturamento em <strong>30%</strong>
</p>
```

#### Estrutura das Chaves de Tradução

As chaves seguem uma estrutura hierárquica:

```javascript
const translations_pt = {
    meta: {
        title: "Título da página",
        description: "Descrição da página"
    },
    hero: {
        title: "Título principal",
        subtitle: "Subtítulo",
        form: {
            name: "Nome",
            email: "E-mail",
            submit: "Enviar"
        }
    }
};
```

Uso no HTML:
```html
<h1 data-i18n="hero.title">Título principal</h1>
<input data-i18n-placeholder="hero.form.name">
<button data-i18n="hero.form.submit">Enviar</button>
```

#### Adicionando Novas Traduções

1. **Adicione a chave em todos os arquivos de idioma:**

```javascript
// pt-BR.js
newSection: {
    title: "Novo Título",
    description: "Nova descrição"
}

// en-US.js
newSection: {
    title: "New Title",
    description: "New description"
}

// es-ES.js
newSection: {
    title: "Nuevo Título",
    description: "Nueva descripción"
}
```

2. **Use no HTML:**
```html
<h2 data-i18n="newSection.title">Novo Título</h2>
<p data-i18n="newSection.description">Nova descrição</p>
```

3. **Valide as traduções:**
```bash
node validate-translations.js
```

## 🔧 Configuração Técnica

### Inicialização do Sistema

O sistema é inicializado automaticamente quando a página carrega:

```javascript
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        if (window.i18n && window.i18n.applyTranslations) {
            window.i18n.applyTranslations();
        }
    }, 100);
});
```

### Carregamento dos Arquivos

Inclua os scripts na ordem correta:

```html
<!-- Arquivos de tradução -->
<script src="src/i18n/pt-BR.js"></script>
<script src="src/i18n/en-US.js"></script>
<script src="src/i18n/es-ES.js"></script>

<!-- Sistema de i18n -->
<script src="src/assets/js/i18n.js"></script>
```

### Seletor de Idioma

Adicione o seletor em todas as páginas:

```html
<div class="fixed top-4 right-4 z-50">
    <select id="language-selector" class="bg-black/50 text-white px-4 py-2 rounded-lg">
        <option value="pt-BR">🇧🇷 Português</option>
        <option value="en-US">🇺🇸 English</option>
        <option value="es-ES">🇪🇸 Español</option>
    </select>
</div>
```

## 🧪 Testes e Validação

### Arquivo de Teste
Use `test-translations.html` para testar as traduções:

1. Abra o arquivo no navegador
2. Teste a mudança de idiomas
3. Verifique se todas as traduções são aplicadas
4. Observe o console para erros

### Script de Validação
Execute o script para verificar consistência:

```bash
node validate-translations.js
```

O script verifica:
- ✅ Todas as chaves presentes em todos os idiomas
- ✅ Nenhuma chave faltando
- ✅ Nenhuma chave extra
- ✅ Estrutura consistente

### Checklist de Teste Manual

- [ ] Mudança de idioma funciona
- [ ] Traduções são aplicadas corretamente
- [ ] Escolha é persistida no localStorage
- [ ] URL com parâmetro lang funciona
- [ ] Meta tags são atualizadas
- [ ] Formulários mantêm funcionalidade
- [ ] Layout não quebra com textos longos

## 🎨 Considerações de Design

### Comprimento do Texto
- **Português**: Texto base
- **Inglês**: ~10-15% mais longo
- **Espanhol**: Similar ao português

### Adaptações Necessárias
- Teste layouts com textos mais longos
- Verifique quebras de linha
- Ajuste espaçamentos se necessário

### Formatos Culturais
- **Datas**: DD.MM.YYYY (PT/ES) vs MM.DD.YYYY (EN)
- **Horários**: 24h (PT/ES) vs 12h AM/PM (EN)
- **Moeda**: R$ (PT) vs $ (EN/ES com contexto)

## 🚨 Solução de Problemas

### Traduções Não Aparecem
1. Verifique se os arquivos de tradução estão carregando
2. Confirme se o atributo `data-i18n` está correto
3. Verifique o console para erros JavaScript
4. Teste com `test-translations.html`

### Chave de Tradução Não Encontrada
1. Execute `node validate-translations.js`
2. Adicione a chave faltante em todos os idiomas
3. Recarregue a página

### Seletor de Idioma Não Funciona
1. Verifique se o ID `language-selector` está correto
2. Confirme se o script i18n.js está carregado
3. Verifique se não há conflitos de JavaScript

### Layout Quebrado
1. Teste com textos mais longos
2. Ajuste CSS para acomodar variações
3. Use `text-overflow: ellipsis` se necessário

## 📚 Referência de API

### Métodos Principais

```javascript
// Aplicar traduções manualmente
window.i18n.applyTranslations();

// Mudar idioma programaticamente
window.i18n.changeLanguage('en-US');

// Obter idioma atual
const currentLang = window.i18n.getCurrentLanguage();

// Obter tradução específica
const translation = window.i18n.getTranslation('hero.title');
```

### Eventos Personalizados

```javascript
// Escutar mudanças de idioma
document.addEventListener('languageChanged', function(event) {
    console.log('Idioma mudou para:', event.detail.language);
});
```

## 🔄 Manutenção

### Adicionando Novo Idioma

1. Crie arquivo `src/i18n/novo-idioma.js`
2. Adicione ao array `supportedLanguages` em `i18n.js`
3. Inclua o script no HTML
4. Adicione opção no seletor de idioma
5. Execute validação

### Atualizando Traduções

1. Modifique os arquivos de tradução
2. Execute `node validate-translations.js`
3. Teste com `test-translations.html`
4. Faça deploy das alterações

---

## 📞 Suporte

Para dúvidas sobre o sistema de internacionalização:

1. Consulte este guia
2. Execute os testes de validação
3. Verifique o console do navegador
4. Use o arquivo de teste para diagnósticos

**Versão**: 1.0  
**Última atualização**: 21 de Agosto de 2025
