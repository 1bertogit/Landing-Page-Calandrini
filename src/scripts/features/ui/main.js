// ==============================================
// Main JavaScript - Landing Page Dr. Calandrini
// ==============================================

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations immediately
    initializeAnimations();
    
    // Initialize form handlers immediately
    initializeFormHandlers();
    
    // Initialize scroll effects immediately
    initializeScrollEffects();
    
    // Initialize parallax effects immediately
    initializeParallaxEffects();
    
    // Initialize dynamic content after a small delay to ensure i18n is ready
    setTimeout(function() {
        initializeDynamicContent();
    }, 200);
    
    // Listen for language changes
    window.addEventListener('languageChanged', function(e) {
        // Reinitialize dynamic content with new language
        initializeDynamicContent();
    });
});

// Initialize dynamic content that uses i18n
function initializeDynamicContent() {
    // Don't generate content for sections that already have fallback content
    // Only generate for empty containers
    
    // Check if i18n is ready, but don't block if it's not
    const i18nReady = window.i18n && window.i18n.initialized;
    
    // Always generate Pillars - they have fallback data
    generatePillars();
    
    // Generate Audience Cards (these are empty by default)
    generateAudienceCards();
    
    // Generate Mentor Timeline (empty by default)
    generateMentorTimeline();
    
    // Generate Expertise Tags (empty by default)
    generateExpertiseTags();
    
    // Generate Method Phases (empty by default)
    generateMethodPhases();
    
    // Generate Method Results (empty by default)
    generateMethodResults();
}

// Generate Pillars Section
function generatePillars() {
    const container = document.getElementById('pillars-container');
    if (!container) return;
    
    // Clear container including any loading placeholders
    container.innerHTML = '';
    
    // Try to get translations, or use fallback
    let pillars;
    try {
        pillars = window.i18n && window.i18n.translate ? 
            window.i18n.translate('pillars.items') : null;
    } catch(e) {
        pillars = null;
    }
    
    // Fallback data if i18n is not ready
    if (!Array.isArray(pillars)) {
        pillars = [
            {
                number: "I",
                title: "ORQUESTRAÇÃO FACIAL",
                description: "Como combinar procedimentos para otimizar tempo e resultados"
            },
            {
                number: "II",
                title: "RESULTADOS HARMÔNICOS",
                description: "Técnicas para garantir naturalidade e satisfação do paciente"
            },
            {
                number: "III",
                title: "RINOPLASTIA + LIFTING",
                description: "Protocolo exclusivo para combinar os procedimentos com segurança"
            },
            {
                number: "IV",
                title: "BLEFAROPLASTIA AVANÇADA",
                description: "Integração perfeita com outros procedimentos faciais"
            },
            {
                number: "V",
                title: "GESTÃO DO PÓS-OPERATÓRIO",
                description: "Protocolos para recuperação otimizada em múltiplos procedimentos"
            }
        ];
    }
    
    if (Array.isArray(pillars)) {
        pillars.forEach((pillar, index) => {
            const pillarHTML = `
                <div class="group relative">
                    <div class="card-luxury p-8 text-center card-hover reveal h-full transition-all duration-500 group-hover:bg-gradient-to-b group-hover:from-[rgba(94,60,234,0.1)] group-hover:to-transparent">
                        <div class="number-luxury mb-6 transition-transform group-hover:scale-110">${pillar.number}</div>
                        <h3 class="text-sm mb-4 tracking-wider font-medium">${pillar.title}</h3>
                        <div class="w-12 h-px bg-gradient-to-r from-transparent via-[#C7C2DF] to-transparent mx-auto mb-4 opacity-50"></div>
                        <p class="text-xs opacity-60 leading-loose">${pillar.description}</p>
                        <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div class="w-2 h-2 bg-[#5E3CEA] rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += pillarHTML;
        });
    }
}

// Generate Audience Cards
function generateAudienceCards() {
    const approvedContainer = document.getElementById('approved-audience-container');
    const rejectedContainer = document.getElementById('rejected-audience-container');
    
    if (approvedContainer) {
        approvedContainer.innerHTML = '';
        
        // Try to get translations, or use fallback
        let approvedItems;
        try {
            approvedItems = window.i18n && window.i18n.translate ? 
                window.i18n.translate('audience.idealFor.items') : null;
        } catch(e) {
            approvedItems = null;
        }
        
        // Fallback data if i18n is not ready
        if (!Array.isArray(approvedItems)) {
            approvedItems = [
                {
                    title: "Médicos Residentes",
                    badge: "R3+",
                    description: "Em formação cirúrgica avançada com interesse em procedimentos faciais combinados"
                },
                {
                    title: "Cirurgiões Plásticos",
                    badge: "5+ anos",
                    description: "Especialistas buscando aperfeiçoamento em técnicas combinadas e otimização de resultados"
                },
                {
                    title: "Cirurgiões Bucomaxilofaciais",
                    badge: "Especialista",
                    description: "Profissionais com foco em harmonização facial e procedimentos integrados"
                },
                {
                    title: "Oftalmologistas",
                    badge: "Oculoplástica",
                    description: "Especializados em plástica ocular com interesse em procedimentos faciais integrados"
                }
            ];
        }
        
        if (Array.isArray(approvedItems)) {
            approvedItems.forEach((item, index) => {
                const cardHTML = `
                    <div class="audience-card approved p-6 rounded-lg reveal" style="animation-delay: ${0.1 * (index + 1)}s;">
                        <div class="flex items-start gap-4">
                            <div class="profession-icon">
                                ${getProfessionIcon(index)}
                            </div>
                            <div class="flex-1">
                                <h4 class="text-sm font-medium mb-2">
                                    ${item.title}
                                    <span class="expertise-badge">${item.badge}</span>
                                </h4>
                                <p class="text-xs opacity-70 leading-relaxed">${item.description}</p>
                            </div>
                        </div>
                        <div class="absolute top-4 right-4">
                            <svg class="check-icon" viewBox="0 0 24 24">
                                <path d="M5 13l4 4L19 7"/>
                            </svg>
                        </div>
                    </div>
                `;
                approvedContainer.innerHTML += cardHTML;
            });
        }
    }
    
    if (rejectedContainer) {
        rejectedContainer.innerHTML = '';
        
        // Try to get translations, or use fallback
        let rejectedItems;
        try {
            rejectedItems = window.i18n && window.i18n.translate ? 
                window.i18n.translate('audience.notFor.items') : null;
        } catch(e) {
            rejectedItems = null;
        }
        
        // Fallback data if i18n is not ready
        if (!Array.isArray(rejectedItems)) {
            rejectedItems = [
                {
                    title: "Sem Experiência Cirúrgica",
                    description: "Profissionais sem formação ou prática em procedimentos cirúrgicos"
                },
                {
                    title: "Estudantes de Medicina",
                    description: "Alunos sem formação completa ou residência médica"
                },
                {
                    title: "Profissionais Não Médicos",
                    description: "Profissionais de outras áreas sem formação médica"
                },
                {
                    title: "Sem CRM Ativo",
                    description: "Médicos sem registro ativo no Conselho Regional de Medicina"
                }
            ];
        }
        
        if (Array.isArray(rejectedItems)) {
            rejectedItems.forEach((item, index) => {
                const cardHTML = `
                    <div class="audience-card rejected p-6 rounded-lg reveal" style="animation-delay: ${0.1 * (index + 5)}s;">
                        <div class="flex items-start gap-4">
                            <div class="cross-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </div>
                            <div class="flex-1">
                                <h4 class="text-sm font-medium mb-2 opacity-60">${item.title}</h4>
                                <p class="text-xs opacity-50 leading-relaxed">${item.description}</p>
                            </div>
                        </div>
                    </div>
                `;
                rejectedContainer.innerHTML += cardHTML;
            });
        }
    }
}

// Generate Mentor Timeline
function generateMentorTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Try to get translations, or use fallback
    let timeline;
    try {
        timeline = window.i18n && window.i18n.translate ? 
            window.i18n.translate('mentor.timeline') : null;
    } catch(e) {
        timeline = null;
    }
    
    // Fallback data if i18n is not ready
    if (!Array.isArray(timeline)) {
        timeline = [
            {
                title: "Formação Médica",
                description: "Especialização em Cirurgia Plástica com foco em procedimentos faciais"
            },
            {
                title: "Desenvolvimento do Método Face & Nose Code",
                description: "Criação de protocolos exclusivos para procedimentos combinados"
            },
            {
                title: "Centro de Referência",
                description: "Clínica especializada em cirurgia facial avançada"
            },
            {
                title: "Mentor e Educador",
                description: "Compartilhando conhecimento com a nova geração de cirurgiões"
            }
        ];
    }
    
    if (Array.isArray(timeline)) {
        timeline.forEach(item => {
            const itemHTML = `
                <div class="timeline-item reveal">
                    <div class="timeline-dot"></div>
                    <div>
                        <p class="text-sm font-medium mb-1">${item.title}</p>
                        <p class="text-xs opacity-60">${item.description}</p>
                    </div>
                </div>
            `;
            container.innerHTML += itemHTML;
        });
    }
}

// Generate Expertise Tags
function generateExpertiseTags() {
    const container = document.getElementById('expertise-tags');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Try to get translations, or use fallback
    let expertise;
    try {
        expertise = window.i18n && window.i18n.translate ? 
            window.i18n.translate('mentor.expertise') : null;
    } catch(e) {
        expertise = null;
    }
    
    // Fallback data if i18n is not ready
    if (!Array.isArray(expertise)) {
        expertise = ["Rinoplastia", "Lifting Facial", "Blefaroplastia", "Harmonização", "Procedimentos Combinados"];
    }
    
    if (Array.isArray(expertise)) {
        expertise.forEach(tag => {
            container.innerHTML += `<span class="expertise-tag">${tag}</span>`;
        });
    }
}

// Generate Method Phases
function generateMethodPhases() {
    const container = document.getElementById('method-phases-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Try to get translations, or use fallback
    let phases;
    try {
        phases = window.i18n && window.i18n.translate ? 
            window.i18n.translate('method.phases') : null;
    } catch(e) {
        phases = null;
    }
    
    // Fallback data if i18n is not ready
    if (!Array.isArray(phases)) {
        phases = [
            {
                number: "01",
                title: "ANÁLISE TRIDIMENSIONAL",
                description: "Planejamento cirúrgico com tecnologia 3D de última geração",
                details: [
                    "Tomografia computadorizada",
                    "Modelagem virtual",
                    "Simulação de resultados"
                ]
            },
            {
                number: "02",
                title: "SEQUENCIAMENTO ESTRATÉGICO",
                description: "Ordem ideal de procedimentos combinados para máxima eficiência",
                details: [
                    "Priorização anatômica",
                    "Otimização do tempo cirúrgico",
                    "Redução de trauma tecidual"
                ]
            },
            {
                number: "03",
                title: "PROTOCOLOS DE RECUPERAÇÃO",
                description: "Cuidados específicos para múltiplas intervenções simultâneas",
                details: [
                    "Cronograma personalizado",
                    "Fisioterapia integrada",
                    "Acompanhamento pós-operatório"
                ]
            }
        ];
    }
    
    if (Array.isArray(phases)) {
        phases.forEach((phase, index) => {
            const phaseHTML = `
                <div class="method-card group reveal" style="animation-delay: ${0.1 * (index + 1)}s">
                    <div class="absolute -inset-1 bg-gradient-to-b from-[#5E3CEA]/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div class="relative card-luxury p-8 h-full">
                        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#5E3CEA] to-[#4E33C4] mb-6">
                            <span class="text-2xl font-bold">${phase.number}</span>
                        </div>
                        
                        <div class="mb-6">
                            ${getMethodIcon(index)}
                        </div>
                        
                        <h3 class="text-xl mb-3 tracking-wider font-light">${phase.title}</h3>
                        <p class="text-sm opacity-60 mb-4 leading-relaxed">
                            ${phase.description}
                        </p>
                        
                        <div class="mt-6 pt-6 border-t border-white/10">
                            <ul class="space-y-2 text-xs opacity-50">
                                ${phase.details.map(detail => `
                                    <li class="flex items-center gap-2">
                                        <span class="w-1 h-1 bg-[#5E3CEA] rounded-full"></span>
                                        ${detail}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += phaseHTML;
        });
    }
}

// Generate Method Results
function generateMethodResults() {
    const container = document.getElementById('method-results-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Try to get translations, or use fallback
    let results;
    try {
        results = window.i18n && window.i18n.translate ? 
            window.i18n.translate('method.results') : null;
    } catch(e) {
        results = null;
    }
    
    // Fallback data if i18n is not ready
    if (!results || typeof results !== 'object') {
        results = {
            recovery: {
                value: "-60%",
                label: "Tempo de Recuperação"
            },
            precision: {
                value: "3X",
                label: "Mais Precisão"
            },
            predictability: {
                value: "95%",
                label: "Previsibilidade"
            },
            complications: {
                value: "0",
                label: "Complicações Graves"
            }
        };
    }
    
    if (results && typeof results === 'object') {
        Object.entries(results).forEach(([key, result], index) => {
            const resultHTML = `
                <div class="text-center reveal" style="animation-delay: ${0.1 * (index + 1)}s">
                    <div class="text-4xl font-bold text-[#5E3CEA] mb-2">${result.value}</div>
                    <p class="text-xs opacity-60 uppercase tracking-wider">${result.label}</p>
                </div>
            `;
            container.innerHTML += resultHTML;
        });
    }
}

// Get profession icon based on index
function getProfessionIcon(index) {
    const icons = [
        // Medical Residents
        `<svg class="w-6 h-6 text-periwinkle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/>
        </svg>`,
        // Plastic Surgeons
        `<svg class="w-6 h-6 text-periwinkle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
        </svg>`,
        // Maxillofacial Surgeons
        `<svg class="w-6 h-6 text-periwinkle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/>
        </svg>`,
        // Ophthalmologists
        `<svg class="w-6 h-6 text-periwinkle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>`
    ];
    
    return icons[index] || icons[0];
}

// Get method icon based on index
function getMethodIcon(index) {
    const icons = [
        // 3D Analysis
        `<svg class="w-20 h-20 mx-auto text-[#5E3CEA] opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 01.553-.894L9 2m0 18l6-3m-6 3V2m6 3l5.447-2.724A1 1 0 0121 3.118v10.764a1 1 0 01-.553.894L15 17.5M9 2l6 3m0 0v10.5"/>
        </svg>`,
        // Strategic Sequencing
        `<svg class="w-20 h-20 mx-auto text-[#5E3CEA] opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
        </svg>`,
        // Recovery Protocols
        `<svg class="w-20 h-20 mx-auto text-[#5E3CEA] opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>`
    ];
    
    return icons[index] || icons[0];
}

// Initialize animations
function initializeAnimations() {
    // Trigger hero animations
    const animatedElements = document.querySelectorAll('.animate-fadeReveal, .animate-slideLeft, .animate-slideRight');
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'running';
    });
    
    // Ripple effect on buttons
    document.querySelectorAll('.btn-ripple').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255,255,255,0.5)';
            ripple.style.width = ripple.style.height = '40px';
            ripple.style.top = (e.clientY - this.offsetTop - 20) + 'px';
            ripple.style.left = (e.clientX - this.offsetLeft - 20) + 'px';
            ripple.style.animation = 'ripple 0.6s';
            ripple.style.pointerEvents = 'none';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Initialize form handlers
function initializeFormHandlers() {
    // WhatsApp Mask
    const whatsappField = document.getElementById('whatsapp');
    if (whatsappField) {
        whatsappField.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Get current language for phone formatting
            const currentLang = (window.i18n && typeof window.i18n.getCurrentLanguage === 'function') ? window.i18n.getCurrentLanguage() : 'pt-BR';
            
            switch(currentLang) {
                case 'pt-BR':
                    // Brazilian format: (XX) XXXXX-XXXX
                    if (value.length <= 11) {
                        value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
                    }
                    break;
                case 'en-US':
                    // US format: (XXX) XXX-XXXX
                    if (value.length <= 10) {
                        value = value.replace(/^(\d{3})(\d{3})(\d{4}).*/, '($1) $2-$3');
                    }
                    break;
                case 'es-ES':
                    // Spanish format: XXX XX XX XX
                    if (value.length <= 9) {
                        value = value.replace(/^(\d{3})(\d{2})(\d{2})(\d{2}).*/, '$1 $2 $3 $4');
                    }
                    break;
            }
            
            e.target.value = value;
        });
    }
    
    // Form submission
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const button = e.target.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            // Disable button and show loading state
            button.disabled = true;
            button.textContent = window.i18n.translate('hero.form.submitting') || 'Processando...';
            
            try {
                // Collect form data
                const formData = new FormData(e.target);
                const leadData = {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    whatsapp: formData.get('whatsapp'),
                    timestamp: new Date().toISOString(),
                    source: 'landing-page',
                    page: 'index.html',
                    language: (window.i18n && typeof window.i18n.getCurrentLanguage === 'function') ? window.i18n.getCurrentLanguage() : 'pt-BR',
                    utm_source: new URLSearchParams(window.location.search).get('utm_source'),
                    utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
                    utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign')
                };

                // Store data in localStorage for the thank you page
                localStorage.setItem('leadData', JSON.stringify(leadData));

                // Try to send to backend (if configured)
                if (window.BACKEND_CONFIG && window.BACKEND_CONFIG.webhook.url !== 'https://hook.us1.make.com/YOUR_WEBHOOK_ID') {
                    try {
                        const response = await fetch(window.BACKEND_CONFIG.webhook.url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(leadData)
                        });

                        if (!response.ok) {
                            throw new Error('Webhook failed');
                        }
                    } catch (webhookError) {
                        console.warn('Webhook failed, but continuing with redirect:', webhookError);
                        // Continue with redirect even if webhook fails
                    }
                }

                // Show success state briefly
                button.textContent = window.i18n.translate('hero.form.success') || 'Acesso Confirmado';
                button.style.background = 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)';
                
                // Redirect to thank you page after short delay
                setTimeout(() => {
                    // Preserve language parameter in redirect
                    const currentLang = (window.i18n && typeof window.i18n.getCurrentLanguage === 'function') ? window.i18n.getCurrentLanguage() : 'pt-BR';
                    const langParam = currentLang && currentLang !== 'pt-BR' ? `?lang=${currentLang}` : '';
                    window.location.href = `obrigado.html${langParam}`;
                }, 1500);

            } catch (error) {
                console.error('Form submission error:', error);
                
                // Show error state
                button.textContent = 'Erro - Tente novamente';
                button.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
                
                // Reset button after delay
                setTimeout(() => {
                    button.disabled = false;
                    button.textContent = originalText;
                    button.style.background = '';
                }, 3000);
            }
        });
    }
}

// Initialize scroll effects
function initializeScrollEffects() {
    // Scroll reveal observer
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Reveal children with stagger
                const children = entry.target.querySelectorAll('.card-hover');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('active');
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

// Initialize parallax effects
function initializeParallaxEffects() {
    // Parallax on mouse move
    document.addEventListener('mousemove', (e) => {
        const parallaxElements = document.querySelectorAll('.parallax');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 5;
            el.style.transform = `translateX(${x * speed}px) translateY(${y * speed}px)`;
        });
    });
    
    // Specific parallax for floating elements
    const parallaxElement = document.querySelector('[data-parallax]');
    if (parallaxElement) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX - window.innerWidth / 2) / 50;
            const y = (e.clientY - window.innerHeight / 2) / 50;
            parallaxElement.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    }
}