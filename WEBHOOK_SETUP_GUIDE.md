# 📡 Guia de Configuração de Webhook - Face & Nose Code

## 🎯 Visão Geral

Este guia irá ajudá-lo a configurar o webhook para receber os leads da landing page. O sistema já está preparado para integrar com várias plataformas.

---

## 🚀 Opção 1: Make (Integromat) - RECOMENDADO

### Passo a Passo:

1. **Criar Conta no Make**
   - Acesse: https://www.make.com
   - Crie uma conta gratuita (500 operações/mês)

2. **Criar Novo Cenário**
   - Clique em "Create a new scenario"
   - Busque por "Webhooks" no menu de apps
   - Selecione "Custom webhook"

3. **Configurar Webhook**
   - Clique em "Add" para criar novo webhook
   - Nomeie como "Face Nose Code - Landing Page"
   - Copie a URL gerada (exemplo: `https://hook.us1.make.com/xyz123abc`)

4. **Configurar Ações**
   - Adicione módulo "Google Sheets" → "Add a Row"
   - Ou "Email" → "Send an Email"
   - Ou "Slack" → "Send a Message"
   - Configure os campos mapeando com os dados do webhook

5. **Atualizar Landing Page**
   ```javascript
   // Em src/assets/js/backend-config.js
   webhook: {
       url: 'https://hook.us1.make.com/SEU_WEBHOOK_ID_AQUI',
       method: 'POST'
   }
   ```

6. **Testar**
   - Preencha o formulário na landing page
   - Verifique se o lead chegou no Make
   - Confirme se as ações foram executadas

---

## ⚡ Opção 2: Zapier

### Passo a Passo:

1. **Criar Conta no Zapier**
   - Acesse: https://zapier.com
   - Plano gratuito: 100 tasks/mês

2. **Criar Novo Zap**
   - Clique em "Create Zap"
   - Trigger: "Webhooks by Zapier"
   - Event: "Catch Hook"

3. **Configurar Webhook**
   - Copie a URL do webhook
   - Exemplo: `https://hooks.zapier.com/hooks/catch/123456/abcdef/`

4. **Adicionar Ações**
   - Google Sheets: "Create Spreadsheet Row"
   - Gmail: "Send Email"
   - Slack: "Send Channel Message"
   - CRM: "Create Contact"

5. **Atualizar Landing Page**
   ```javascript
   webhook: {
       url: 'https://hooks.zapier.com/hooks/catch/SEU_ID/SEU_TOKEN/',
       method: 'POST'
   }
   ```

---

## 🔧 Opção 3: n8n (Self-Hosted)

### Passo a Passo:

1. **Instalar n8n**
   ```bash
   # Docker
   docker run -it --rm --name n8n -p 5678:5678 n8nio/n8n
   
   # NPM
   npm install n8n -g
   n8n start
   ```

2. **Criar Workflow**
   - Acesse: http://localhost:5678
   - Adicione node "Webhook"
   - Configure como "POST"
   - Copie a URL de produção

3. **Configurar Ações**
   - Adicione nodes para suas integrações
   - Configure mapeamento de campos

4. **Deploy**
   - Configure n8n em servidor com HTTPS
   - Use a URL de produção no backend-config.js

---

## 📊 Configuração Google Sheets (Opcional)

### Criar Planilha de Backup:

1. **Criar Nova Planilha**
   - Acesse: https://sheets.google.com
   - Crie planilha "Face Nose Code - Leads"

2. **Configurar Colunas**
   ```
   A: Data/Hora
   B: Nome
   C: Email
   D: WhatsApp
   E: CRM
   F: Especialidade
   G: Lead Score
   H: Origem
   I: UTM Source
   J: Tags
   ```

3. **Habilitar API**
   - Acesse: https://console.cloud.google.com
   - Ative "Google Sheets API"
   - Crie credenciais (API Key)

4. **Configurar na Landing Page**
   ```javascript
   googleSheets: {
       enabled: true,
       spreadsheetId: 'ID_DA_SUA_PLANILHA',
       apiKey: 'SUA_API_KEY',
       range: 'Leads!A:J'
   }
   ```

---

## 📱 Configuração WhatsApp (Opcional)

### Via Twilio:

1. **Criar Conta Twilio**
   - Acesse: https://www.twilio.com
   - Ative WhatsApp Sandbox ou Business API

2. **Obter Credenciais**
   - Account SID
   - Auth Token
   - Número WhatsApp

3. **Configurar**
   ```javascript
   whatsapp: {
       enabled: true,
       provider: 'twilio',
       accountSid: 'SEU_ACCOUNT_SID',
       authToken: 'SEU_AUTH_TOKEN',
       from: '+5511999999999',
       to: '+5511888888888'
   }
   ```

---

## 🎯 Estrutura de Dados Enviada

O webhook receberá os seguintes dados:

```json
{
  "name": "Dr. João Silva",
  "email": "joao@clinica.com.br",
  "whatsapp": "+5511999999999",
  "crm": "12345/SP",
  "specialty": "cirurgia-plastica",
  "terms": true,
  "language": "pt-BR",
  "form_fill_time": 45,
  "source": {
    "url": "https://seusite.com?utm_source=google",
    "referrer": "https://google.com",
    "campaign": {
      "utm_source": "google",
      "utm_medium": "cpc",
      "utm_campaign": "face-nose-code"
    },
    "device": {
      "type": "mobile",
      "screen": "375x812",
      "viewport": "375x700"
    }
  },
  "timestamps": {
    "created": "2025-01-21T10:30:00Z",
    "timezone": "America/Sao_Paulo",
    "localTime": "21/01/2025 10:30:00"
  },
  "leadScore": 75,
  "tags": [
    "lang_pt-BR",
    "specialty_cirurgia-plastica",
    "source_google",
    "device_mobile"
  ]
}
```

---

## 🧪 Como Testar

### 1. Teste Local
```bash
# Inicie servidor local
python3 -m http.server 8000

# Acesse
http://localhost:8000
```

### 2. Use RequestBin para Debug
- Acesse: https://requestbin.com
- Crie um bin temporário
- Use a URL no webhook para ver os dados

### 3. Teste de Envio
```javascript
// Console do navegador
await window.backendIntegration.sendToWebhook({
    name: "Teste",
    email: "teste@exemplo.com",
    whatsapp: "+5511999999999",
    terms: true
});
```

---

## ⚠️ Checklist de Configuração

### Antes do Lançamento:
- [ ] Webhook URL configurada em `backend-config.js`
- [ ] Teste de envio funcionando
- [ ] Email de notificação configurado
- [ ] Backup em Google Sheets (opcional)
- [ ] WhatsApp notificação (opcional)

### Testes Essenciais:
- [ ] Formulário envia dados corretamente
- [ ] Lead score calculado
- [ ] UTM parameters capturados
- [ ] Fallback localStorage funcionando
- [ ] Retry automático ativado

### Monitoramento:
- [ ] Webhook respondendo < 3 segundos
- [ ] Taxa de sucesso > 95%
- [ ] Notificações chegando
- [ ] Dados completos na planilha

---

## 🆘 Troubleshooting

### Problema: Webhook não recebe dados
**Solução:**
1. Verifique a URL no backend-config.js
2. Confirme que não há CORS bloqueando
3. Teste com RequestBin primeiro

### Problema: Dados incompletos
**Solução:**
1. Verifique o console do navegador
2. Confirme que todos campos estão preenchidos
3. Valide o JSON enviado

### Problema: Erro 500 no webhook
**Solução:**
1. Verifique limites da plataforma
2. Reduza o tamanho dos dados
3. Implemente retry logic

### Problema: Leads perdidos
**Solução:**
1. localStorage está salvando (fallback)
2. Verificar em: DevTools → Application → Local Storage
3. Leads pendentes tentam reenvio a cada 5 min

---

## 📞 Suporte

### Plataformas:
- **Make**: https://www.make.com/en/help
- **Zapier**: https://help.zapier.com
- **n8n**: https://docs.n8n.io

### Documentação API:
- **Google Sheets**: https://developers.google.com/sheets
- **Twilio WhatsApp**: https://www.twilio.com/docs/whatsapp
- **SendGrid**: https://docs.sendgrid.com

---

## 🎉 Próximos Passos

Após configurar o webhook:

1. **Instalar Analytics** (GA4, Facebook Pixel)
2. **Fazer Deploy** (Vercel, Netlify, AWS)
3. **Configurar Domínio** e SSL
4. **Monitorar Primeiras Conversões**
5. **Ajustar Lead Scoring** baseado em dados reais

---

*Guia criado em: 21/01/2025*
*Tempo estimado de configuração: 30-60 minutos*