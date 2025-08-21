# Landing Page - Face & Nose Code

Landing page premium para captação de leads do curso de Procedimentos Combinados em Cirurgia Facial do Dr. Alexandre Calandrini.

## 🚀 Características

- **Design Premium**: Interface luxuosa com animações suaves
- **Multi-idioma**: Suporte para PT-BR, EN-US e ES-ES
- **Responsivo**: Otimizado para todos dispositivos
- **Performance**: Lazy loading, cache offline e otimizações
- **Validação Avançada**: Formulário com scoring de leads
- **Integração Backend**: Webhooks, CRM, Google Sheets

## 📁 Estrutura do Projeto

```
├── index.html           # Página principal
├── sw.js               # Service Worker para cache offline
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── main.css         # Estilos principais
│   │   │   ├── animations.css   # Animações
│   │   │   └── responsive.css   # Responsividade
│   │   ├── js/
│   │   │   ├── main.js             # Script principal
│   │   │   ├── i18n.js             # Sistema de traduções
│   │   │   ├── performance.js      # Otimizações
│   │   │   ├── form-validation.js  # Validação do formulário
│   │   │   └── backend-config.js   # Configuração de integrações
│   │   └── images/
│   │       └── dr-calandrini.webp  # Imagem principal
│   └── i18n/
│       ├── pt-BR.js    # Traduções português
│       ├── en-US.js    # Traduções inglês
│       └── es-ES.js    # Traduções espanhol
└── PRD.md             # Documentação do projeto
```

## 🔧 Configuração

### 1. Backend/Webhook

Edite `src/assets/js/backend-config.js`:

```javascript
const BACKEND_CONFIG = {
    webhook: {
        url: 'https://hook.us1.make.com/SEU_WEBHOOK_ID',
        method: 'POST'
    },
    // ... outras configurações
};
```

### 2. Analytics

Configure Google Analytics, Facebook Pixel e Google Ads no arquivo `backend-config.js`.

### 3. Servidor Local

Para testar localmente:

```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx serve

# Acesse: http://localhost:8000
```

## 📱 Recursos

### Formulário de Captação
- Nome completo
- Email corporativo
- WhatsApp com máscara
- CRM (opcional)
- Especialidade médica
- Aceite de termos
- Lead scoring automático

### Integrações Disponíveis
- Webhooks (Make, Zapier, n8n)
- Google Sheets
- CRM (RD Station, HubSpot)
- Email (SendGrid, Mailgun)
- WhatsApp (Twilio)

### Performance
- Service Worker para funcionamento offline
- Lazy loading de imagens
- Cache de recursos estáticos
- Minificação automática
- CDN para bibliotecas externas

## 🌍 Idiomas

O sistema detecta automaticamente o idioma do navegador. Também é possível:
- Selecionar manualmente no seletor
- Usar parâmetro URL: `?lang=en-US`
- Persistência em localStorage

## 📊 Métricas

O sistema rastreia automaticamente:
- Tempo de preenchimento do formulário
- UTM parameters
- Device e browser info
- Lead score (0-100)
- Tags automáticas

## 🚀 Deploy

1. Configure as integrações em `backend-config.js`
2. Faça upload dos arquivos para seu servidor
3. Configure HTTPS (obrigatório)
4. Teste o formulário de captação
5. Configure tracking de conversão

## 📝 Licença

Projeto proprietário - Todos os direitos reservados © Dr. Alexandre Calandrini 2024

## 👨‍💻 Desenvolvimento

Desenvolvido para Neo Doctor LTDA