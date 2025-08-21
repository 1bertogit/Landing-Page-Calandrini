# 🚀 Guia de Deploy - Face & Nose Code Landing Page

## 🎯 Opções de Hospedagem

### 1️⃣ Vercel (RECOMENDADO - Grátis)

**Vantagens:**
- Deploy automático via GitHub
- SSL grátis automático
- CDN global incluído
- Analytics básico grátis
- Zero configuração

**Deploy em 3 minutos:**

1. **Via GitHub:**
   ```bash
   # 1. Criar repositório no GitHub
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/seu-usuario/face-nose-code.git
   git push -u origin main
   ```

2. **Conectar Vercel:**
   - Acesse: https://vercel.com
   - "Import Project" → Selecione repo GitHub
   - Deploy automático!

3. **Configurar Domínio:**
   - Settings → Domains
   - Add: facennosecode.com.br
   - Configure DNS no registro.br

**Configuração DNS (Registro.br):**
```
Tipo: A
Nome: @
Valor: 76.76.21.21

Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
```

---

### 2️⃣ Netlify (Alternativa Grátis)

**Deploy Rápido:**

1. **Arrastar e Soltar:**
   - Acesse: https://app.netlify.com
   - Arraste a pasta do projeto para o browser
   - Deploy instantâneo!

2. **Via Git:**
   ```bash
   # Instalar CLI
   npm install -g netlify-cli
   
   # Deploy
   netlify deploy --prod --dir=.
   ```

3. **Domínio Customizado:**
   - Site Settings → Domain Management
   - Add custom domain

**DNS Configuration:**
```
Tipo: A
Nome: @
Valor: 75.2.60.5

Tipo: CNAME
Nome: www
Valor: [seu-site].netlify.app
```

---

### 3️⃣ GitHub Pages (100% Grátis)

**Setup Simples:**

1. **Criar Repositório:**
   - Nome: `seu-usuario.github.io/face-nose-code`
   - Público ou Privado

2. **Habilitar Pages:**
   ```
   Settings → Pages
   Source: Deploy from branch
   Branch: main
   Folder: / (root)
   ```

3. **Push do Código:**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

4. **Acessar:**
   - https://seu-usuario.github.io/face-nose-code

---

### 4️⃣ AWS S3 + CloudFront (Profissional)

**Para Alta Performance:**

1. **Criar Bucket S3:**
   ```bash
   aws s3 mb s3://facennosecode
   aws s3 website s3://facennosecode --index-document index.html
   ```

2. **Upload Files:**
   ```bash
   aws s3 sync . s3://facennosecode --exclude ".git/*"
   ```

3. **CloudFront CDN:**
   - Create Distribution
   - Origin: S3 bucket
   - SSL Certificate: Request from ACM

4. **Route 53 DNS:**
   - Create Hosted Zone
   - Point domain to CloudFront

---

## ⚙️ Preparação para Deploy

### 1. Otimização de Performance

```bash
# Instalar ferramentas
npm install -g terser cssnano-cli html-minifier-terser

# Minificar JavaScript
terser src/assets/js/main.js -o src/assets/js/main.min.js -c -m
terser src/assets/js/i18n.js -o src/assets/js/i18n.min.js -c -m
terser src/assets/js/form-validation.js -o src/assets/js/form-validation.min.js -c -m

# Minificar CSS
cssnano src/assets/css/main.css src/assets/css/main.min.css
cssnano src/assets/css/animations.css src/assets/css/animations.min.css

# Minificar HTML
html-minifier-terser index.html -o index.min.html --collapse-whitespace --remove-comments
```

### 2. Atualizar Referências no HTML

```html
<!-- Trocar para versões minificadas -->
<link rel="stylesheet" href="src/assets/css/main.min.css">
<script src="src/assets/js/main.min.js"></script>
```

### 3. Configurar Headers de Segurança

**vercel.json:**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        }
      ]
    }
  ]
}
```

**netlify.toml:**
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Strict-Transport-Security = "max-age=31536000; includeSubDomains"
```

---

## 🔒 Configuração SSL/HTTPS

### Vercel/Netlify:
- ✅ Automático com Let's Encrypt
- ✅ Renovação automática
- ✅ Zero configuração

### Hosting Tradicional:
```bash
# Certbot (Let's Encrypt)
sudo certbot --nginx -d facennosecode.com.br -d www.facennosecode.com.br

# Auto-renovação
sudo certbot renew --dry-run
```

---

## 📱 Configuração de PWA

### 1. Criar manifest.json:
```json
{
  "name": "Face & Nose Code - Dr. Calandrini",
  "short_name": "Face&Nose",
  "description": "Curso de Procedimentos Combinados em Cirurgia Facial",
  "theme_color": "#0F172A",
  "background_color": "#ffffff",
  "display": "standalone",
  "start_url": "/",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 2. Adicionar ao HTML:
```html
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#0F172A">
```

---

## 🌐 Configuração de Domínio

### 1. Registro.br:

1. **Acessar Painel:**
   - https://registro.br
   - Entrar com CPF/CNPJ

2. **Configurar DNS:**
   ```
   Servidores DNS:
   - ns1.vercel-dns.com
   - ns2.vercel-dns.com
   
   OU configurar registros A/CNAME
   ```

3. **Aguardar Propagação:**
   - 1-48 horas para propagação completa
   - Verificar: https://dnschecker.org

### 2. Configurar WWW Redirect:

**Vercel:**
```json
{
  "redirects": [
    {
      "source": "/(.*)",
      "has": [
        {
          "type": "host",
          "value": "www.facennosecode.com.br"
        }
      ],
      "destination": "https://facennosecode.com.br/$1",
      "permanent": true
    }
  ]
}
```

---

## 📊 Monitoramento Pós-Deploy

### 1. Uptime Monitoring:

**UptimeRobot (Grátis):**
- https://uptimerobot.com
- Monitor a cada 5 minutos
- Alertas por email/SMS

**Better Uptime:**
- https://betteruptime.com
- Status page pública
- Incident management

### 2. Performance Monitoring:

```javascript
// Real User Monitoring (RUM)
// Adicionar ao main.js

// Web Vitals
import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';

function sendToAnalytics(metric) {
  // Enviar para GA4
  gtag('event', metric.name, {
    value: Math.round(metric.value),
    metric_id: metric.id,
    metric_value: metric.value,
    metric_delta: metric.delta
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### 3. Error Tracking:

**Sentry (Grátis até 5k eventos/mês):**
```html
<script
  src="https://browser.sentry-cdn.com/7.0.0/bundle.min.js"
  integrity="sha384-..."
  crossorigin="anonymous"></script>
<script>
  Sentry.init({
    dsn: "https://xxxxx@sentry.io/xxxxx",
    integrations: [new Sentry.BrowserTracing()],
    tracesSampleRate: 0.1,
  });
</script>
```

---

## ✅ Checklist de Deploy

### Pré-Deploy:
- [ ] Minificar CSS/JS/HTML
- [ ] Otimizar imagens (WebP)
- [ ] Configurar meta tags SEO
- [ ] Testar formulário localmente
- [ ] Configurar webhook URL real
- [ ] Instalar analytics tags
- [ ] Criar arquivo robots.txt
- [ ] Criar sitemap.xml

### Deploy:
- [ ] Push código para Git
- [ ] Conectar plataforma de hosting
- [ ] Configurar domínio customizado
- [ ] Verificar SSL certificate
- [ ] Testar HTTPS redirect
- [ ] Configurar headers de segurança

### Pós-Deploy:
- [ ] Testar formulário em produção
- [ ] Verificar analytics funcionando
- [ ] Configurar monitoring
- [ ] Testar em mobile real
- [ ] Verificar Service Worker
- [ ] Submeter sitemap ao Google
- [ ] Configurar backup automático

---

## 🚨 Troubleshooting

### Problema: Site não carrega
```bash
# Verificar DNS
nslookup facennosecode.com.br
dig facennosecode.com.br

# Limpar cache DNS local
sudo dscacheutil -flushcache # macOS
ipconfig /flushdns # Windows
```

### Problema: SSL não funciona
- Aguardar propagação DNS (até 48h)
- Verificar: https://www.ssllabs.com/ssltest/

### Problema: Formulário não envia
- Verificar webhook URL em backend-config.js
- Testar com RequestBin primeiro
- Verificar CORS headers

### Problema: Service Worker não funciona
- HTTPS é obrigatório em produção
- Verificar scope do SW
- Clear cache and hard reload

---

## 🎉 Lançamento

### Dia do Lançamento:

1. **09:00** - Deploy em produção
2. **10:00** - Testes finais
3. **11:00** - Ativar campanhas
4. **12:00** - Monitorar métricas
5. **18:00** - Primeiro relatório

### Comunicação:
```
✅ Site no ar: https://facennosecode.com.br
📊 Analytics configurado e rastreando
📧 Formulário testado e funcionando
🚀 Campanhas podem ser ativadas
```

---

## 📈 Otimizações Futuras

1. **CDN**: CloudFlare para cache global
2. **Imagens**: Implementar AVIF format
3. **HTTP/3**: Ativar QUIC protocol
4. **Brotli**: Compressão avançada
5. **Edge Functions**: Lógica no edge

---

*Guia criado em: 21/01/2025*
*Tempo estimado de deploy: 30-60 minutos*