# 📊 Guia de Configuração de Analytics e Tracking

## 🎯 Visão Geral

Configure o tracking completo para medir o desempenho da sua landing page e otimizar campanhas.

---

## 1️⃣ Google Analytics 4 (GA4)

### Configuração Passo a Passo:

1. **Criar Propriedade GA4**
   ```
   1. Acesse: https://analytics.google.com
   2. Admin → Criar Propriedade
   3. Nome: "Face Nose Code - Dr. Calandrini"
   4. Fuso horário: (GMT-03:00) São Paulo
   5. Moeda: Real brasileiro (BRL)
   ```

2. **Obter Measurement ID**
   ```
   Admin → Data Streams → Web → Seu Stream
   Copie o ID: G-XXXXXXXXXX
   ```

3. **Instalar na Landing Page**
   
   Adicione no `<head>` do index.html:
   ```html
   <!-- Google Analytics 4 -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

4. **Configurar Eventos de Conversão**
   
   Já implementado em form-validation.js:
   ```javascript
   // Dispara automaticamente ao enviar formulário
   gtag('event', 'generate_lead', {
     'value': leadScore,
     'currency': 'BRL',
     'lead_type': specialty
   });
   ```

5. **Eventos Personalizados para Rastrear**
   - `form_start`: Início do preenchimento
   - `form_progress`: Campos preenchidos
   - `generate_lead`: Formulário enviado
   - `scroll_depth`: Profundidade de scroll

---

## 2️⃣ Facebook Pixel

### Configuração Completa:

1. **Criar Pixel**
   ```
   1. Acesse: https://business.facebook.com
   2. Events Manager → Conectar Origem de Dados
   3. Web → Facebook Pixel
   4. Nome: "Face Nose Code Pixel"
   ```

2. **Instalar Código Base**
   
   Adicione no `<head>` do index.html:
   ```html
   <!-- Facebook Pixel Code -->
   <script>
     !function(f,b,e,v,n,t,s)
     {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
     n.callMethod.apply(n,arguments):n.queue.push(arguments)};
     if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
     n.queue=[];t=b.createElement(e);t.async=!0;
     t.src=v;s=b.getElementsByTagName(e)[0];
     s.parentNode.insertBefore(t,s)}(window, document,'script',
     'https://connect.facebook.net/en_US/fbevents.js');
     
     fbq('init', 'SEU_PIXEL_ID_AQUI');
     fbq('track', 'PageView');
   </script>
   <noscript>
     <img height="1" width="1" style="display:none"
     src="https://www.facebook.com/tr?id=SEU_PIXEL_ID&ev=PageView&noscript=1"/>
   </noscript>
   ```

3. **Eventos de Conversão**
   
   Já configurado em form-validation.js:
   ```javascript
   // Dispara ao enviar formulário
   fbq('track', 'Lead', {
     content_name: 'Face Nose Code Course',
     content_category: 'Medical Course',
     value: leadScore,
     currency: 'BRL'
   });
   ```

4. **Verificar Instalação**
   - Instale: Facebook Pixel Helper (Chrome Extension)
   - Acesse sua landing page
   - Confirme eventos: PageView, Lead

---

## 3️⃣ Google Ads - Tag de Conversão

### Setup Completo:

1. **Criar Ação de Conversão**
   ```
   1. Acesse: https://ads.google.com
   2. Ferramentas → Conversões
   3. + Nova ação de conversão → Site
   4. Categoria: Envio de formulário de lead
   5. Nome: "Lead - Face Nose Code"
   6. Valor: Usar valores diferentes para cada conversão
   ```

2. **Instalar Tag Global**
   
   Adicione no `<head>`:
   ```html
   <!-- Global site tag (gtag.js) - Google Ads -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'AW-XXXXXXXXX');
   </script>
   ```

3. **Tag de Conversão**
   
   Adicione após envio do formulário:
   ```javascript
   // Em form-validation.js
   gtag('event', 'conversion', {
     'send_to': 'AW-XXXXXXXXX/YYYYYYYYY',
     'value': leadScore,
     'currency': 'BRL',
     'transaction_id': Date.now()
   });
   ```

---

## 4️⃣ Google Tag Manager (Opcional - Recomendado)

### Centralizar Todos os Tags:

1. **Criar Container GTM**
   ```
   1. Acesse: https://tagmanager.google.com
   2. Criar Conta → Criar Container
   3. Nome: "facennosecode.com.br"
   4. Tipo: Web
   ```

2. **Instalar GTM**
   
   Substitua todos os códigos anteriores por:
   ```html
   <!-- No <head> -->
   <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
   new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
   j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
   'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
   })(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
   
   <!-- Logo após <body> -->
   <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
   height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
   ```

3. **Configurar Tags no GTM**
   - GA4 Configuration Tag
   - Facebook Pixel Tag
   - Google Ads Conversion Tag
   - Custom HTML Tags

---

## 5️⃣ Hotjar - Heatmaps e Gravações (Opcional)

### Entender Comportamento do Usuário:

1. **Criar Conta**
   - Acesse: https://www.hotjar.com
   - Plano Basic: Gratuito (até 1000 sessões/mês)

2. **Instalar Script**
   ```html
   <!-- Hotjar Tracking Code -->
   <script>
     (function(h,o,t,j,a,r){
       h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
       h._hjSettings={hjid:SEU_ID,hjsv:6};
       a=o.getElementsByTagName('head')[0];
       r=o.createElement('script');r.async=1;
       r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
       a.appendChild(r);
     })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
   </script>
   ```

---

## 📱 Configuração de Eventos Customizados

### Eventos Já Implementados:

```javascript
// Rastreamento automático em form-validation.js

// 1. Início do formulário
trackEvent('form_start', {
  timestamp: new Date().toISOString()
});

// 2. Progresso do formulário
trackEvent('form_progress', {
  fields_completed: 3,
  total_fields: 6,
  percentage: 50
});

// 3. Conversão
trackEvent('generate_lead', {
  lead_score: 75,
  specialty: 'cirurgia-plastica',
  form_time: 45
});

// 4. Erro no formulário
trackEvent('form_error', {
  field: 'email',
  error: 'invalid_format'
});
```

---

## 📊 Dashboard de Métricas

### KPIs para Monitorar:

| Métrica | Meta | Como Medir |
|---------|------|------------|
| Taxa de Conversão | >5% | (Leads / Visitantes) × 100 |
| Custo por Lead | <R$50 | Investimento / Total de Leads |
| Lead Score Médio | >60 | Média dos scores no GA4 |
| Tempo no Site | >2min | GA4 → Engagement → Average Time |
| Taxa de Rejeição | <40% | GA4 → Bounce Rate |
| Form Completion | >70% | Iniciaram / Completaram |

---

## 🧪 Como Testar

### 1. Google Analytics
```javascript
// Console do navegador
// Verificar se GA está instalado
typeof gtag !== 'undefined' // deve retornar true

// Enviar evento teste
gtag('event', 'test_event', {
  'test_parameter': 'test_value'
});
```

### 2. Facebook Pixel
```javascript
// Verificar instalação
typeof fbq !== 'undefined' // deve retornar true

// Evento teste
fbq('track', 'ViewContent', {
  content_name: 'Test Page'
});
```

### 3. Debug Mode
- **GA4**: Adicione `?gtm_debug=true` na URL
- **Facebook**: Use Pixel Helper Extension
- **Google Ads**: Use Tag Assistant Extension

---

## ⚙️ Configuração Avançada

### Enhanced Conversions (Google Ads):

```javascript
// Enviar dados hash para melhor match
gtag('config', 'AW-XXXXXXXXX', {
  'phone_conversion_number': '+55 11 99999-9999',
  'enhanced_conversions': {
    'email': hashEmail(userData.email),
    'phone_number': hashPhone(userData.phone)
  }
});
```

### Server-Side Tracking:

```javascript
// Backend tracking via Webhook
const trackServerSide = async (eventData) => {
  // Google Analytics Measurement Protocol
  await fetch('https://www.google-analytics.com/mp/collect', {
    method: 'POST',
    body: JSON.stringify({
      client_id: clientId,
      events: [eventData]
    })
  });
  
  // Facebook Conversions API
  await fetch('https://graph.facebook.com/v13.0/PIXEL_ID/events', {
    method: 'POST',
    body: JSON.stringify({
      data: [eventData],
      access_token: 'TOKEN'
    })
  });
};
```

---

## 📋 Checklist de Implementação

### Essencial:
- [ ] GA4 instalado e configurado
- [ ] Evento de conversão (Lead) configurado
- [ ] Facebook Pixel instalado
- [ ] Evento Lead do Facebook configurado
- [ ] Google Ads tag de conversão

### Importante:
- [ ] UTM tracking funcionando
- [ ] Enhanced Conversions ativado
- [ ] Audiências de remarketing criadas
- [ ] Goals/Conversões configuradas

### Nice to Have:
- [ ] Hotjar para heatmaps
- [ ] Microsoft Clarity
- [ ] LinkedIn Insight Tag
- [ ] Twitter Pixel

---

## 🚨 Troubleshooting

### Problema: Conversões duplicadas
**Solução:** Adicione transaction_id único em cada conversão

### Problema: Dados não aparecem
**Solução:** Aguarde 24-48h para processamento inicial

### Problema: Valores incorretos
**Solução:** Verifique currency e value format

### Problema: iOS 14+ tracking issues
**Solução:** Implemente Conversions API (server-side)

---

## 📈 Otimizações Pós-Lançamento

1. **Semana 1-2**: Coletar dados baseline
2. **Semana 3-4**: Identificar pontos de drop-off
3. **Mês 2**: Implementar A/B testing
4. **Mês 3**: Otimizar baseado em dados

---

*Guia atualizado em: 21/01/2025*
*Tempo de implementação: 1-2 horas*