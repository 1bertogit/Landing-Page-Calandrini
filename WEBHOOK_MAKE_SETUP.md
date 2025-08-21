# 🚀 Configuração Webhook Make.com - Face & Nose Code

## ✅ Status: CONFIGURADO

O sistema de webhook já está preparado e configurado para funcionar com Make.com. Siga os passos abaixo para ativar a captura de leads.

---

## 📋 Passo a Passo Completo

### 1. Criar Conta no Make.com

1. Acesse: https://www.make.com
2. Clique em "Sign up for free"
3. Use o email: `dr.calandrini@facenosecodde.com.br`
4. Confirme o email e faça login

### 2. Criar Novo Cenário

1. No dashboard, clique em **"Create a new scenario"**
2. Busque por **"Webhooks"** na lista de apps
3. Selecione **"Webhooks"** → **"Custom webhook"**
4. Clique em **"Add"** para criar um novo webhook

### 3. Configurar o Webhook

1. **Nome do Webhook**: `Face Nose Code - Landing Page`
2. Clique em **"Save"**
3. **IMPORTANTE**: Copie a URL gerada (algo como: `https://hook.us1.make.com/abc123def456`)
4. **Substitua** a URL no arquivo `backend-config.js`:

```javascript
// Linha 10 em src/assets/js/backend-config.js
url: 'https://hook.us1.make.com/SUA_URL_AQUI',
```

### 4. Configurar Ações do Webhook

#### Opção A: Enviar para Google Sheets

1. Clique no **"+"** após o webhook
2. Busque por **"Google Sheets"**
3. Selecione **"Add a row"**
4. Conecte sua conta Google
5. **Criar nova planilha**:
   - Nome: `Face Nose Code - Leads`
   - Colunas: `Data | Nome | Email | WhatsApp | CRM | Especialidade | Lead Score | Origem`

6. **Mapear campos**:
   - **A (Data)**: `{{formatDate(now; "DD/MM/YYYY HH:mm:ss")}}`
   - **B (Nome)**: `{{1.name}}`
   - **C (Email)**: `{{1.email}}`
   - **D (WhatsApp)**: `{{1.whatsapp}}`
   - **E (CRM)**: `{{1.crm}}`
   - **F (Especialidade)**: `{{1.specialty}}`
   - **G (Lead Score)**: `{{1.leadScore}}`
   - **H (Origem)**: `{{1.source.url}}`

#### Opção B: Enviar Email de Notificação

1. Adicione outro módulo: **"Email"** → **"Send an email"**
2. **Para**: `dr.calandrini@facenosecodde.com.br`
3. **Assunto**: `🎯 Novo Lead - Face & Nose Code`
4. **Corpo do Email**:

```html
<h2>🎯 Novo Lead Capturado!</h2>

<p><strong>Nome:</strong> {{1.name}}</p>
<p><strong>Email:</strong> {{1.email}}</p>
<p><strong>WhatsApp:</strong> {{1.whatsapp}}</p>
<p><strong>CRM:</strong> {{1.crm}}</p>
<p><strong>Especialidade:</strong> {{1.specialty}}</p>
<p><strong>Lead Score:</strong> {{1.leadScore}}/100</p>
<p><strong>Origem:</strong> {{1.source.url}}</p>
<p><strong>Data:</strong> {{formatDate(now; "DD/MM/YYYY HH:mm:ss")}}</p>

<hr>
<p><em>Enviado automaticamente pelo sistema Face & Nose Code</em></p>
```

### 5. Ativar o Cenário

1. Clique em **"Save"** (disquete no canto superior direito)
2. Ative o toggle **"ON"** no cenário
3. O webhook agora está **ATIVO** e pronto para receber leads!

---

## 🧪 Testar o Sistema

### Teste Rápido:

1. Acesse sua landing page: `http://localhost:9000`
2. Preencha o formulário com dados de teste:
   - **Nome**: `Dr. Teste Silva`
   - **Email**: `teste@exemplo.com`
   - **WhatsApp**: `+55 11 99999-9999`
3. Clique em **"Reserve Sua Vaga"**
4. Verifique se:
   - ✅ Redirecionou para página de agradecimento
   - ✅ Dados apareceram no Make.com
   - ✅ Linha foi adicionada no Google Sheets
   - ✅ Email de notificação foi enviado

### Teste Avançado (Console do Navegador):

```javascript
// Cole no console do navegador (F12)
await window.backendIntegration.sendToWebhook({
    name: "Dr. João Teste",
    email: "joao.teste@clinica.com.br",
    whatsapp: "+55 11 98765-4321",
    crm: "54321/SP",
    specialty: "cirurgia-plastica",
    terms: true
});
```

---

## 📊 Dados Capturados

O webhook recebe automaticamente:

### Dados do Formulário:
- ✅ Nome completo
- ✅ Email profissional
- ✅ WhatsApp
- ✅ CRM (se preenchido)
- ✅ Especialidade médica
- ✅ Aceite dos termos

### Dados de Tracking:
- ✅ Lead Score (0-100)
- ✅ Origem (URL, UTM parameters)
- ✅ Dispositivo (mobile/desktop)
- ✅ Idioma selecionado
- ✅ Tempo de preenchimento
- ✅ Data/hora com timezone

### Dados de Marketing:
- ✅ UTM Source, Medium, Campaign
- ✅ Referrer (de onde veio)
- ✅ Tags automáticas
- ✅ Resolução de tela
- ✅ Navegador usado

---

## ⚡ Recursos Avançados

### Backup Automático:
- ✅ **LocalStorage**: Leads salvos localmente se webhook falhar
- ✅ **Retry Logic**: 3 tentativas automáticas
- ✅ **Google Sheets**: Backup secundário habilitado

### Integrações Futuras:
- 🔄 **CRM**: RD Station, HubSpot, Pipedrive
- 📱 **WhatsApp**: Notificação via Twilio
- 📧 **Email Marketing**: SendGrid, Mailgun
- 📈 **Analytics**: Eventos personalizados

---

## 🎯 Próximos Passos

Após configurar o webhook:

1. ✅ **Webhook configurado** ← VOCÊ ESTÁ AQUI
2. ⏳ **Configurar Google Analytics 4**
3. ⏳ **Configurar Facebook Pixel**
4. ⏳ **Deploy da landing page**
5. ⏳ **Configurar domínio personalizado**
6. ⏳ **Testes em produção**

---

## 🆘 Suporte

### Se algo não funcionar:

1. **Verifique a URL** no `backend-config.js`
2. **Console do navegador** (F12) para ver erros
3. **Make.com logs** para ver se dados chegaram
4. **Teste com RequestBin** primeiro: https://requestbin.com

### Contatos:
- **Make.com Help**: https://www.make.com/en/help
- **Documentação**: https://docs.make.com

---

*Configuração criada em: 21/01/2025*
*Tempo estimado: 15-30 minutos*
*Status: ✅ PRONTO PARA USO*