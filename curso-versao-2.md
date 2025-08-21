# PRD - Página de Vendas 2 Face & Nose CODE

## 1. Visão Geral do Produto

### 1.1 Objetivo
Criar uma página de vendas de alta conversão para o curso "Face & Nose CODE" do Dr. Alexandre Calandrini, mantendo a identidade visual luxuosa e profissional da página principal, adaptada para maximizar conversões através de uma estrutura de vendas comprovada.

### 1.2 Público-Alvo
- **Primário**: Cirurgiões plásticos seniores (20+ anos de experiência)
- **Secundário**: Residentes e recém-formados em cirurgia plástica/otorrinolaringologia

### 1.3 Métricas de Sucesso
- Taxa de conversão > 5%
- Tempo médio na página > 8 minutos
- Taxa de scroll depth > 80%
- CTA clicks > 15%

## 2. Arquitetura da Informação

### 2.1 Estrutura de Seções

```
1. HERO Section
2. Identificação de Problemas
3. O Mecanismo (Solução)
4. O Programa (Módulos)
5. Bônus Exclusivos
6. Investimento
7. Garantia Tripla
8. Urgência Real
9. Comparação COM vs SEM
10. Processo Pós-Compra
11. Para Quem É/Não É
12. FAQ
13. Decisão Final
```

## 3. Especificações Técnicas

### 3.1 Stack Tecnológico
```html
<!-- Manter a mesma base da página principal -->
- HTML5 Semântico
- Tailwind CSS (CDN)
- JavaScript Vanilla
- Sistema i18n existente
- Google Fonts (Montserrat + Cormorant Garamond)
```

### 3.2 Estrutura de Arquivos
```
/sales-page/
├── index.html
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── sales.css (estilos específicos)
│   │   │   └── animations.css (reutilizar)
│   │   ├── js/
│   │   │   ├── sales.js (lógica de vendas)
│   │   │   ├── countdown.js (timer de urgência)
│   │   │   └── i18n.js (reutilizar)
│   │   └── images/
│   │       ├── testimonials/
│   │       ├── results/
│   │       └── icons/
│   └── i18n/
│       ├── pt-BR-sales.js
│       └── en-US-sales.js
```

## 4. Design System

### 4.1 Paleta de Cores
```css
/* Manter consistência com página principal */
--primary: #5E3CEA (Roxo principal)
--secondary: #4E33C4 (Roxo escuro)
--luxury: #C7C2DF (Periwinkle)
--success: #10B981 (Verde para CTAs de conversão)
--urgent: #EF4444 (Vermelho para urgência)
--background: #0A0A0A (Preto luxuoso)
--text-primary: #FFFFFF
--text-secondary: rgba(255, 255, 255, 0.8)
--text-muted: rgba(255, 255, 255, 0.6)
```

### 4.2 Tipografia
```css
/* Headlines */
.headline-primary {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 700;
  line-height: 1.1;
}

/* Body Text */
.body-sales {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.125rem;
  line-height: 1.8;
}

/* CTA Buttons */
.cta-primary {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
}
```

## 5. Componentes Específicos

### 5.1 Hero Section com VSL
```html
<section class="hero-sales min-h-screen">
  <!-- Background gradient luxuoso -->
  <div class="luxury-gradient-sales"></div>
  
  <!-- Container principal -->
  <div class="max-w-6xl mx-auto">
    <!-- Headline Matador -->
    <h1 class="headline-killer">
      <span class="reveal-text">Domine a Técnica que</span>
      <span class="text-luxury emphasis">99% dos Cirurgiões</span>
      <span class="reveal-text">Não Conseguem Executar</span>
    </h1>
    
    <!-- VSL Container -->
    <div class="vsl-container">
      <div class="vsl-frame">
        <iframe src="vimeo-vsl-url"></iframe>
      </div>
      <div class="vsl-progress"></div>
    </div>
    
    <!-- CTA Principal (aparece após 10min de vídeo) -->
    <div class="cta-container hidden" id="main-cta">
      <button class="cta-luxury-animated">
        QUERO DOMINAR O PAN REJUVENESCIMENTO
        <span class="arrow-animation">→</span>
      </button>
      <p class="scarcity-text">
        <span class="spots-counter">17</span> de 50 vagas restantes
      </p>
    </div>
  </div>
</section>
```

### 5.2 Seção de Problemas (Pain Points)
```html
<section class="problems-section">
  <div class="problem-card reveal-on-scroll">
    <div class="problem-icon pulse">
      <svg><!-- Ícone de alerta --></svg>
    </div>
    <h3>Você está perdendo pacientes premium?</h3>
    <p>Pacientes que querem fazer rinoplastia E facelift...</p>
    <div class="problem-highlight">
      R$ 40.000 perdidos por indicação
    </div>
  </div>
</section>
```

### 5.3 Módulos do Programa
```html
<section class="program-modules">
  <div class="module-timeline">
    <!-- Linha de conexão vertical -->
    <div class="timeline-line"></div>
    
    <!-- Módulo Card -->
    <div class="module-card" data-module="1">
      <div class="module-number">01</div>
      <div class="module-content">
        <h3>Avaliação Integrada Face & Nariz</h3>
        <ul class="module-benefits">
          <li>✓ Protocolo de consulta R$ 80.000</li>
          <li>✓ Identificação do paciente ideal</li>
        </ul>
      </div>
      <div class="module-unlock">
        <span class="unlock-badge">DESBLOQUEADO</span>
      </div>
    </div>
  </div>
</section>
```

### 5.4 Seção de Investimento
```html
<section class="investment-section">
  <div class="price-comparison">
    <!-- Coluna SEM o curso -->
    <div class="price-column without">
      <h3>Cirurgias Separadas</h3>
      <div class="price-breakdown">
        <div class="price-item">Rinoplastia: R$ 40.000</div>
        <div class="price-item">Facelift: R$ 60.000</div>
        <div class="price-total strikethrough">R$ 100.000</div>
      </div>
    </div>
    
    <!-- VS Divider -->
    <div class="vs-divider">VS</div>
    
    <!-- Coluna COM o curso -->
    <div class="price-column with">
      <h3>Pan Rejuvenescimento</h3>
      <div class="price-highlight">R$ 80.000</div>
      <div class="savings-badge">
        Economia de R$ 20.000 por paciente
      </div>
    </div>
  </div>
  
  <!-- Preço do Curso -->
  <div class="course-price">
    <div class="price-original">De R$ 24.997</div>
    <div class="price-current">
      12x R$ 997
      <span class="price-vista">ou R$ 9.997 à vista</span>
    </div>
    <button class="cta-purchase pulse-animation">
      GARANTIR MINHA VAGA AGORA
    </button>
  </div>
</section>
```

### 5.5 Timer de Urgência
```html
<div class="urgency-bar fixed">
  <div class="countdown-timer">
    <div class="timer-unit">
      <span id="hours">23</span>
      <label>horas</label>
    </div>
    <div class="timer-unit">
      <span id="minutes">59</span>
      <label>min</label>
    </div>
    <div class="timer-unit">
      <span id="seconds">47</span>
      <label>seg</label>
    </div>
  </div>
  <div class="urgency-message">
    Bônus exclusivos expiram em:
  </div>
</div>
```

## 6. Interações e Animações

### 6.1 Scroll Animations
```javascript
// Reveal on scroll com Intersection Observer
const revealElements = document.querySelectorAll('.reveal-on-scroll');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));
```

### 6.2 CTA Progressive Disclosure
```javascript
// Mostrar CTA após tempo de vídeo
let videoWatchTime = 0;
const ctaThreshold = 600; // 10 minutos

setInterval(() => {
  if (isVideoPlaying()) {
    videoWatchTime++;
    if (videoWatchTime >= ctaThreshold) {
      showMainCTA();
    }
  }
}, 1000);
```

### 6.3 Scarcity Counter
```javascript
// Contador de vagas em tempo real
let spotsRemaining = 17;
const updateSpots = () => {
  const random = Math.random();
  if (random < 0.1 && spotsRemaining > 5) {
    spotsRemaining--;
    document.querySelectorAll('.spots-counter').forEach(el => {
      el.textContent = spotsRemaining;
      el.classList.add('pulse-once');
    });
  }
};
setInterval(updateSpots, 30000); // Atualiza a cada 30s
```

## 7. Otimizações de Performance

### 7.1 Loading Strategy
```html
<!-- Preload crítico -->
<link rel="preload" href="/fonts/montserrat.woff2" as="font" crossorigin>
<link rel="preload" href="/css/critical.css" as="style">

<!-- Lazy load não-crítico -->
<script>
  // Carregar módulos conforme scroll
  const lazyLoadModules = () => {
    if (scrollY > 1000) {
      import('./modules/testimonials.js');
    }
  };
</script>
```

### 7.2 Image Optimization
```html
<!-- Usar WebP com fallback -->
<picture>
  <source srcset="dr-alexandre.webp" type="image/webp">
  <source srcset="dr-alexandre.jpg" type="image/jpeg">
  <img src="dr-alexandre.jpg" alt="Dr. Alexandre" loading="lazy">
</picture>
```

## 8. Tracking e Analytics

### 8.1 Eventos para Rastreamento
```javascript
// Google Analytics 4 Events
const trackingEvents = {
  videoPlay: 'video_play',
  videoComplete: 'video_complete',
  ctaClick: 'cta_click',
  scrollDepth: 'scroll_depth',
  moduleView: 'module_view',
  bonusView: 'bonus_view',
  faqInteraction: 'faq_interaction',
  purchaseIntent: 'purchase_intent'
};

// Facebook Pixel Events
fbq('track', 'ViewContent', {
  content_name: 'Face & Nose CODE Sales Page',
  content_category: 'Medical Education',
  value: 9997,
  currency: 'BRL'
});
```

## 9. Responsividade

### 9.1 Breakpoints
```css
/* Mobile First Approach */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

### 9.2 Mobile Optimizations
```css
/* Touch-friendly CTAs */
.cta-mobile {
  min-height: 56px;
  font-size: 18px;
  position: sticky;
  bottom: 0;
  z-index: 999;
}

/* Optimized video container */
.vsl-container-mobile {
  aspect-ratio: 16/9;
  width: 100%;
  max-width: 100vw;
}
```

## 10. Testes A/B Sugeridos

### 10.1 Variações para Teste
1. **Headline Principal**
   - A: "99% dos Cirurgiões Não Conseguem"
   - B: "Aumente seu Faturamento em 300%"

2. **CTA Text**
   - A: "QUERO DOMINAR O PAN REJUVENESCIMENTO"
   - B: "GARANTIR MINHA VAGA AGORA"

3. **Preço Display**
   - A: Mostrar parcelamento primeiro
   - B: Mostrar valor à vista primeiro

4. **Urgência**
   - A: Timer countdown
   - B: Vagas restantes apenas

## 11. Checklist de Implementação

### Fase 1 - Estrutura Base (Semana 1)
- [ ] Setup do projeto e estrutura de arquivos
- [ ] Implementar HTML semântico das 13 seções
- [ ] Configurar sistema de i18n
- [ ] Integrar estilos base e design system

### Fase 2 - Componentes (Semana 2)
- [ ] Desenvolver componentes reutilizáveis
- [ ] Implementar VSL player
- [ ] Criar cards de módulos
- [ ] Desenvolver seção de investimento

### Fase 3 - Interatividade (Semana 3)
- [ ] Implementar animações de scroll
- [ ] Adicionar timer de urgência
- [ ] Configurar progressive disclosure
- [ ] Implementar FAQ interativo

### Fase 4 - Otimização (Semana 4)
- [ ] Otimizar performance e loading
- [ ] Implementar tracking completo
- [ ] Testes cross-browser
- [ ] Testes de responsividade
- [ ] Setup de A/B testing

### Fase 5 - Launch (Semana 5)
- [ ] QA completo
- [ ] Configurar analytics
- [ ] Deploy em produção
- [ ] Monitoramento inicial

## 12. KPIs de Monitoramento Pós-Launch

### Métricas Primárias
- Conversão total
- Valor médio do pedido
- Taxa de abandono por seção
- Tempo até primeira conversão

### Métricas Secundárias
- Engajamento com vídeo
- Clicks em bônus
- Interações com FAQ
- Taxa de retorno à página

## 13. Considerações Finais

Este PRD deve ser tratado como documento vivo, atualizado conforme feedback e métricas reais. A implementação deve priorizar:

1. **Performance**: Página deve carregar em < 3s
2. **Conversão**: Cada elemento deve guiar para a venda
3. **Luxo**: Manter identidade visual premium
4. **Mobile**: 60% do tráfego esperado é mobile

O sucesso da página depende da harmonia entre design luxuoso, copy persuasivo e experiência fluida do usuário.