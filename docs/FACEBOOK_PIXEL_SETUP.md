# Guia de Configuração do Facebook Pixel

## Status da Implementação ✅

- ✅ **Código Base Instalado**: Facebook Pixel configurado no `index.html`
- ✅ **ID Configurado**: Pixel ID `1234567890123456` (substituir pelo real)
- ✅ **Eventos Automáticos**: PageView, ViewContent configurados
- ✅ **Eventos Personalizados**: Lead, CompleteRegistration, Video, CTA
- ✅ **Integração com Analytics**: Sincronizado com GA4 e GTM

## Código Instalado

### 1. Pixel Base (index.html)
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
  fbq('init', '1234567890123456');
  fbq('track', 'PageView');
</script>
```

### 2. Eventos Configurados

#### Eventos Padrão:
- **PageView**: Visualização de página automática
- **ViewContent**: Visualização de conteúdo da landing page
- **Lead**: Conversão de lead (formulário)
- **CompleteRegistration**: Registro completo

#### Eventos Personalizados:
- **VideoPlay**: Reprodução de vídeo
- **VideoProgress25/50/75**: Progresso do vídeo
- **VideoComplete**: Vídeo completo
- **CTAClick**: Clique em botões CTA

## Dados Capturados

### Informações do Lead:
- **value**: Pontuação do lead (padrão: 50)
- **currency**: Moeda (BRL)
- **content_name**: Nome do conteúdo
- **content_category**: Categoria (Medical Education)
- **lead_type**: Tipo de especialidade

### Dados de Marketing:
- **content_type**: Tipo de conteúdo
- **cta_position**: Posição do CTA
- **page_section**: Seção da página
- **video_title**: Título do vídeo

## Como Ativar o Facebook Pixel

### Passo 1: Criar Pixel no Facebook
1. Acesse [Facebook Business Manager](https://business.facebook.com)
2. Vá em **Eventos** > **Pixels**
3. Clique em **Criar Pixel**
4. Nomeie como "Face & Nose Code Pixel"
5. Copie o **Pixel ID** (número de 15-16 dígitos)

### Passo 2: Substituir ID nos Arquivos

#### No `index.html`:
```html
<!-- Linha ~15 -->
fbq('init', 'SEU_PIXEL_ID_AQUI');
```

#### No `backend-config.js`:
```javascript
// Linha ~46
facebookPixel: 'SEU_PIXEL_ID_AQUI'
```

### Passo 3: Configurar Eventos de Conversão
1. No Facebook Ads Manager
2. Vá em **Eventos** > **Eventos Personalizados**
3. Configure como conversões:
   - **Lead** (principal)
   - **CompleteRegistration**
   - **CTAClick**

### Passo 4: Criar Audiências
1. **Visitantes da Landing Page**:
   - Evento: PageView
   - URL contém: facenosecodde.com.br

2. **Leads Qualificados**:
   - Evento: Lead
   - Valor > 40

3. **Engajamento com Vídeo**:
   - Evento: VideoProgress75
   - Últimos 30 dias

## Testes e Validação

### Teste Rápido (2 minutos)
1. Abra a landing page
2. Instale a extensão **Facebook Pixel Helper**
3. Verifique se aparece o pixel ativo
4. Preencha o formulário
5. Confirme evento "Lead" no helper

### Teste Completo (10 minutos)
1. **Eventos Manager**: Verifique eventos em tempo real
2. **Teste de Formulário**: Complete o lead
3. **Teste de Vídeo**: Reproduza vídeos
4. **Teste de CTA**: Clique em botões
5. **Verificação Mobile**: Teste no celular

### Modo Debug
```javascript
// Adicione no console do navegador
fbq('track', 'Lead', {
  'value': 100,
  'currency': 'BRL',
  'content_name': 'Teste Debug'
});
```

## KPIs Essenciais

### Métricas de Conversão:
- **Taxa de Conversão**: Leads / Visitantes
- **Custo por Lead (CPL)**
- **Valor do Lead**: Pontuação média
- **ROAS**: Retorno sobre investimento

### Métricas de Engajamento:
- **Tempo na Página**
- **Taxa de Reprodução de Vídeo**
- **Cliques em CTA**
- **Taxa de Rejeição**

## Segmentações Importantes

### Por Comportamento:
- Visitantes que assistiram vídeo
- Leads com alta pontuação (>60)
- Usuários que clicaram em CTA
- Visitantes recorrentes

### Por Demografia:
- Idade: 25-55 anos
- Localização: Brasil
- Interesses: Medicina, Estética
- Dispositivo: Mobile vs Desktop

## Integrações Avançadas

### Facebook Ads:
- Campanhas de remarketing
- Lookalike audiences
- Otimização para conversões
- Pixel de conversão

### Conversions API:
- Backup server-side
- Dados first-party
- Melhor atribuição
- Compliance iOS 14.5+

## Configurações Avançadas

### Custom Conversions:
```javascript
// Evento personalizado para alta qualificação
fbq('trackCustom', 'HighQualityLead', {
  'lead_score': leadData.leadScore,
  'specialty': leadData.specialty,
  'crm_provided': true
});
```

### Parâmetros UTM:
```javascript
// Rastreamento de campanha
fbq('track', 'Lead', {
  'utm_source': getUTMParameter('utm_source'),
  'utm_campaign': getUTMParameter('utm_campaign')
});
```

## Troubleshooting

### Pixel não está disparando:
1. Verifique se o ID está correto
2. Confirme que não há bloqueadores de anúncios
3. Teste em modo incógnito
4. Verifique console do navegador

### Eventos não aparecem:
1. Aguarde até 20 minutos
2. Verifique se o evento está configurado corretamente
3. Teste com Facebook Pixel Helper
4. Confirme parâmetros do evento

### Dados inconsistentes:
1. Compare com Google Analytics
2. Verifique duplicação de eventos
3. Confirme configuração de conversões
4. Analise filtros de audiência

### Problemas iOS 14.5+:
1. Configure Aggregated Event Measurement
2. Implemente Conversions API
3. Use dados first-party
4. Otimize para 8 eventos máximo

## Checklist de Configuração

### Pré-Lançamento:
- [ ] Pixel ID substituído nos arquivos
- [ ] Eventos de conversão configurados
- [ ] Audiências criadas
- [ ] Testes realizados
- [ ] Facebook Pixel Helper instalado

### Pós-Lançamento:
- [ ] Monitoramento de eventos ativo
- [ ] Campanhas de remarketing criadas
- [ ] Relatórios configurados
- [ ] Otimizações implementadas
- [ ] Backup com Conversions API

## Próximos Passos

1. **Substituir Pixel ID**: Use o ID real do Facebook
2. **Configurar Campanhas**: Criar anúncios no Facebook Ads
3. **Implementar Conversions API**: Para melhor rastreamento
4. **Otimizar Audiências**: Refinar segmentações
5. **Análise de Performance**: Monitorar KPIs semanalmente

## Suporte

### Documentação:
- [Facebook Pixel Guide](https://developers.facebook.com/docs/facebook-pixel/)
- [Events Manager](https://www.facebook.com/business/help/898185560232180)
- [Conversions API](https://developers.facebook.com/docs/marketing-api/conversions-api/)

### Ferramentas:
- [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
- [Events Manager](https://business.facebook.com/events_manager2/)
- [Ads Manager](https://www.facebook.com/adsmanager/)

### Contato:
- **Suporte Facebook**: [business.facebook.com/support](https://business.facebook.com/support)
- **Documentação Técnica**: Este guia e arquivos do projeto
- **Implementação**: Verificar `analytics.js` e `form-validation.js`

---

**Nota**: Lembre-se de substituir o Pixel ID `1234567890123456` pelo seu ID real do Facebook antes do lançamento em produção.