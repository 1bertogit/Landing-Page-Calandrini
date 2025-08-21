
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title data-i18n="meta.title">
      Masterclass Procedimentos Combinados em Cirurgia Facial - Dr. Alexandre
      Calandrini
    </title>

    <!-- SEO Meta Tags -->
    <meta
      name="description"
      content="Aumente seu faturamento em 30% dominando as técnicas mais avançadas em Cirurgia Facial"
      data-i18n-content="meta.description"
    />
    <meta
      name="keywords"
      content="cirurgia facial, procedimentos combinados, rinoplastia, lifting facial, dr calandrini"
      data-i18n-content="meta.keywords"
    />

    <!-- Open Graph Tags -->
    <meta
      property="og:title"
      content="Masterclass Procedimentos Combinados - Dr. Alexandre Calandrini"
    />
    <meta
      property="og:description"
      content="Aumente seu faturamento em 30% dominando as técnicas mais avançadas em Cirurgia Facial"
    />
    <meta property="og:locale" content="pt_BR" />

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Google Fonts -->
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Cormorant+Garamond:wght@400;500;700&display=swap"
      rel="stylesheet"
    />

    <!-- Custom Stylesheets -->
    <link rel="stylesheet" href="src/assets/css/main.css" />
    <link rel="stylesheet" href="src/assets/css/animations.css" />

    <!-- i18n Translation Files -->
    <script src="src/i18n/pt-BR.js"></script>
    <script src="src/i18n/en-US.js"></script>
    <script src="src/i18n/es-ES.js"></script>

    <!-- i18n System -->
    <script src="src/assets/js/i18n.js"></script>
    
    <!-- Initialize i18n immediately -->
    <script>
        // Ensure i18n is initialized and applies translations as soon as possible
        document.addEventListener('DOMContentLoaded', function() {
            // Small delay to ensure all scripts are loaded
            setTimeout(function() {
                if (window.i18n && window.i18n.applyTranslations) {
                    window.i18n.applyTranslations();
                }
            }, 100);
        });
    </script>
    
  </head>
  <body class="relative" data-animated="false">
    <div class="texture-overlay"></div>

    <!-- Language Selector -->
    <div class="language-selector">
      <select id="language-selector">
        <!-- Options will be populated by i18n.js -->
      </select>
    </div>

    <!-- Hero Section with 2 Columns -->
    <section
      class="min-h-screen flex items-center justify-center px-4 py-12 relative"
    >
      <div class="luxury-gradient absolute inset-0"></div>

      <div class="max-w-7xl mx-auto w-full relative z-10">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <!-- Left Column - Expert Image -->
          <div class="relative float-luxury">
            <div class="relative">
              <img
                src="src/assets/images/dr-calandrini.webp"
                alt="Dr. Alexandre Calandrini"
                class="w-full rounded-lg object-cover object-top"
                style="
                  filter: contrast(1.05) brightness(0.95);
                  max-width: 500px;
                  height: 680px;
                  margin: 0 auto;
                "
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-lg"
              ></div>
            </div>
            <div
              class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center"
            >
              <div class="badge-luxury" data-i18n="hero.expertBadge">
                30 Anos de Experiência • 14.000 Cirurgias
              </div>
            </div>
          </div>

          <!-- Right Column - Info + Form -->
          <div>
            <p
              class="text-xs tracking-[0.3em] mb-8 opacity-60"
              data-i18n="hero.badge"
            >
              MASTERCLASS EXCLUSIVA
            </p>
            <h1 class="text-5xl md:text-7xl mb-8 leading-tight">
              <span data-i18n="hero.title">Procedimentos</span><br />
              <span class="text-luxury italic" data-i18n="hero.titleHighlight"
                >Combinados</span
              >
            </h1>
            <p
              class="text-lg mb-12 opacity-80 max-w-md leading-relaxed"
              data-i18n="hero.subtitle"
            >
              Aumente seu faturamento em <strong>30%</strong> dominando as
              técnicas mais avançadas em Cirurgia Facial.
            </p>

            <div class="flex items-center gap-8 mb-12 text-sm">
              <div>
                <p class="opacity-60 mb-1" data-i18n="hero.date.label">Data</p>
                <p class="font-medium" data-i18n="hero.date.value">
                  07.08.2025
                </p>
              </div>
              <div class="w-px h-8 bg-gray-700"></div>
              <div>
                <p class="opacity-60 mb-1" data-i18n="hero.time.label">
                  Horário
                </p>
                <p class="font-medium" data-i18n="hero.time.value">20:00 BRT</p>
              </div>
              <div class="w-px h-8 bg-gray-700"></div>
              <div>
                <p class="opacity-60 mb-1" data-i18n="hero.spots.label">
                  Vagas
                </p>
                <p class="font-medium" data-i18n="hero.spots.value">
                  Limitadas
                </p>
              </div>
            </div>

            <!-- Registration Form -->
            <form id="leadForm" class="space-y-6">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Nome Completo"
                  data-i18n="hero.form.name"
                  class="w-full input-luxury"
                />
              </div>
              <div>
                <input
                  type="email"
                  required
                  placeholder="E-mail Executivo"
                  data-i18n="hero.form.email"
                  class="w-full input-luxury"
                />
              </div>
              <div>
                <input
                  type="tel"
                  id="whatsapp"
                  required
                  placeholder="WhatsApp Pessoal"
                  data-i18n="hero.form.whatsapp"
                  class="w-full input-luxury"
                />
              </div>
              <button
                type="submit"
                class="w-full py-4 btn-luxury text-white text-xs mt-8 btn-ripple"
                data-i18n="hero.form.submit"
              >
                Reserve Sua Vaga
              </button>
            </form>

            <p
              class="text-xs mt-8 text-center opacity-40"
              data-i18n="hero.form.disclaimer"
            >
              Experiência limitada a 50 participantes selecionados
            </p>
          </div>
        </div>
      </div>
    </section>

    <div class="divider-luxury"></div>

    <!-- What You'll Learn -->
    <section class="py-24 px-4 relative">
        <div class="max-w-6xl mx-auto">
            <div class="text-center mb-20">
                <p class="text-xs tracking-[0.3em] mb-6 opacity-60" data-i18n="pillars.sectionBadge">O QUE VOCÊ VAI DOMINAR</p>
                <h2 class="text-5xl md:text-6xl text-luxury mb-6 animate-titleGlow" data-i18n="pillars.title">5 Pilares da Excelência</h2>
                <div class="w-24 h-px bg-gradient-to-r from-transparent via-[#C7C2DF] to-transparent mx-auto"></div>
            </div>
            
            <div class="grid md:grid-cols-5 gap-6">
                <div class="group relative">
                    <div class="card-luxury p-8 text-center card-hover reveal h-full transition-all duration-500 group-hover:bg-gradient-to-b group-hover:from-[rgba(94,60,234,0.1)] group-hover:to-transparent">
                        <div class="number-luxury mb-6 transition-transform group-hover:scale-110">I</div>
                        <h3 class="text-sm mb-4 tracking-wider font-medium" data-i18n="pillars.items[0].title">ORQUESTRAÇÃO FACIAL</h3>
                        <div class="w-12 h-px bg-gradient-to-r from-transparent via-[#C7C2DF] to-transparent mx-auto mb-4 opacity-50"></div>
                        <p class="text-xs opacity-60 leading-loose" data-i18n="pillars.items[0].description">Como combinar procedimentos para otimizar tempo e resultados</p>
                        <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div class="w-2 h-2 bg-[#5E3CEA] rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>
                
                <div class="group relative">
                    <div class="card-luxury p-8 text-center card-hover reveal h-full transition-all duration-500 group-hover:bg-gradient-to-b group-hover:from-[rgba(94,60,234,0.1)] group-hover:to-transparent">
                        <div class="number-luxury mb-6 transition-transform group-hover:scale-110">II</div>
                        <h3 class="text-sm mb-4 tracking-wider font-medium" data-i18n="pillars.items[1].title">RESULTADOS HARMÔNICOS</h3>
                        <div class="w-12 h-px bg-gradient-to-r from-transparent via-[#C7C2DF] to-transparent mx-auto mb-4 opacity-50"></div>
                        <p class="text-xs opacity-60 leading-loose" data-i18n="pillars.items[1].description">Técnicas para garantir naturalidade e satisfação do paciente</p>
                        <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div class="w-2 h-2 bg-[#5E3CEA] rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>
                
                <div class="group relative">
                    <div class="card-luxury p-8 text-center card-hover reveal h-full transition-all duration-500 group-hover:bg-gradient-to-b group-hover:from-[rgba(94,60,234,0.1)] group-hover:to-transparent">
                        <div class="number-luxury mb-6 transition-transform group-hover:scale-110">III</div>
                        <h3 class="text-sm mb-4 tracking-wider font-medium" data-i18n="pillars.items[2].title">RINOPLASTIA + LIFTING</h3>
                        <div class="w-12 h-px bg-gradient-to-r from-transparent via-[#C7C2DF] to-transparent mx-auto mb-4 opacity-50"></div>
                        <p class="text-xs opacity-60 leading-loose" data-i18n="pillars.items[2].description">Protocolo exclusivo para combinar os procedimentos com segurança</p>
                        <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div class="w-2 h-2 bg-[#5E3CEA] rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>
                
                <div class="group relative">
                    <div class="card-luxury p-8 text-center card-hover reveal h-full transition-all duration-500 group-hover:bg-gradient-to-b group-hover:from-[rgba(94,60,234,0.1)] group-hover:to-transparent">
                        <div class="number-luxury mb-6 transition-transform group-hover:scale-110">IV</div>
                        <h3 class="text-sm mb-4 tracking-wider font-medium" data-i18n="pillars.items[3].title">BLEFAROPLASTIA AVANÇADA</h3>
                        <div class="w-12 h-px bg-gradient-to-r from-transparent via-[#C7C2DF] to-transparent mx-auto mb-4 opacity-50"></div>
                        <p class="text-xs opacity-60 leading-loose" data-i18n="pillars.items[3].description">Integração perfeita com outros procedimentos faciais</p>
                        <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div class="w-2 h-2 bg-[#5E3CEA] rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>
                
                <div class="group relative">
                    <div class="card-luxury p-8 text-center card-hover reveal h-full transition-all duration-500 group-hover:bg-gradient-to-b group-hover:from-[rgba(94,60,234,0.1)] group-hover:to-transparent">
                        <div class="number-luxury mb-6 transition-transform group-hover:scale-110">V</div>
                        <h3 class="text-sm mb-4 tracking-wider font-medium" data-i18n="pillars.items[4].title">GESTÃO DO PÓS-OPERATÓRIO</h3>
                        <div class="w-12 h-px bg-gradient-to-r from-transparent via-[#C7C2DF] to-transparent mx-auto mb-4 opacity-50"></div>
                        <p class="text-xs opacity-60 leading-loose" data-i18n="pillars.items[4].description">Protocolos para recuperação otimizada em múltiplos procedimentos</p>
                        <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div class="w-2 h-2 bg-[#5E3CEA] rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="divider-luxury"></div>

    <!-- For Who -->
    <section class="py-24 px-4 relative overflow-hidden">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-20">
          <p
            class="text-xs tracking-[0.3em] mb-4 opacity-60"
            data-i18n="audience.sectionBadge"
          >
          </p>
          <h2
            class="text-5xl md:text-6xl text-luxury mb-6 animate-titleGlow"
            data-i18n="audience.title"
          >
          </h2>
          <p
            class="text-sm opacity-60 max-w-2xl mx-auto"
            data-i18n="audience.subtitle"
          >
          </p>
        </div>

        <!-- Visual Divider with Animation -->
        <div class="flex items-center justify-center mb-16">
          <div
            class="h-px w-32 bg-gradient-to-r from-transparent to-purple-500/30"
          ></div>
          <div class="mx-4">
            <svg
              class="w-8 h-8 text-purple-400 animate-pulse"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <div
            class="h-px w-32 bg-gradient-to-l from-transparent to-purple-500/30"
          ></div>
        </div>

        <div class="grid lg:grid-cols-2 gap-8 relative">
          <!-- Approved Section -->
          <div class="space-y-6">
            <div class="flex items-center gap-4 mb-8">
              <div
                class="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3
                class="text-2xl tracking-wider"
                data-i18n="audience.idealFor.title"
              >
              </h3>
            </div>

            <!-- Approved Cards -->
            <div
              class="audience-card approved p-6 rounded-lg reveal"
              style="animation-delay: 0.1s"
            >
              <div class="flex items-start gap-4">
                <div class="profession-icon">
                  <svg
                    class="w-6 h-6 text-periwinkle"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                    />
                  </svg>
                </div>
                <div class="flex-1">
                  <h4 class="text-sm font-medium mb-2">
                    <span data-i18n="audience.idealFor.items[0].title"></span>
                    <span class="expertise-badge" data-i18n="audience.idealFor.items[0].badge"></span>
                  </h4>
                  <p class="text-xs opacity-70 leading-relaxed" data-i18n="audience.idealFor.items[0].description">
                  </p>
                </div>
              </div>
              <div class="absolute top-4 right-4">
                <svg class="check-icon" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <div
              class="audience-card approved p-6 rounded-lg reveal"
              style="animation-delay: 0.2s"
            >
              <div class="flex items-start gap-4">
                <div class="profession-icon">
                  <svg
                    class="w-6 h-6 text-periwinkle"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
                <div class="flex-1">
                  <h4 class="text-sm font-medium mb-2">
                    <span data-i18n="audience.idealFor.items[1].title"></span>
                    <span class="expertise-badge" data-i18n="audience.idealFor.items[1].badge"></span>
                  </h4>
                  <p class="text-xs opacity-70 leading-relaxed" data-i18n="audience.idealFor.items[1].description">
                  </p>
                </div>
              </div>
              <div class="absolute top-4 right-4">
                <svg class="check-icon" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <div
              class="audience-card approved p-6 rounded-lg reveal"
              style="animation-delay: 0.3s"
            >
              <div class="flex items-start gap-4">
                <div class="profession-icon">
                  <svg
                    class="w-6 h-6 text-periwinkle"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                    />
                  </svg>
                </div>
                <div class="flex-1">
                  <h4 class="text-sm font-medium mb-2">
                    <span data-i18n="audience.idealFor.items[2].title"></span>
                    <span class="expertise-badge" data-i18n="audience.idealFor.items[2].badge"></span>
                  </h4>
                  <p class="text-xs opacity-70 leading-relaxed" data-i18n="audience.idealFor.items[2].description">
                  </p>
                </div>
              </div>
              <div class="absolute top-4 right-4">
                <svg class="check-icon" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <div
              class="audience-card approved p-6 rounded-lg reveal"
              style="animation-delay: 0.4s"
            >
              <div class="flex items-start gap-4">
                <div class="profession-icon">
                  <svg
                    class="w-6 h-6 text-periwinkle"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div class="flex-1">
                  <h4 class="text-sm font-medium mb-2">
                    <span data-i18n="audience.idealFor.items[3].title"></span>
                    <span class="expertise-badge" data-i18n="audience.idealFor.items[3].badge"></span>
                  </h4>
                  <p class="text-xs opacity-70 leading-relaxed" data-i18n="audience.idealFor.items[3].description">
                  </p>
                </div>
              </div>
              <div class="absolute top-4 right-4">
                <svg class="check-icon" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Vertical Divider -->
          <div
            class="hidden lg:block absolute left-1/2 top-20 bottom-20 transform -translate-x-1/2"
          >
            <div class="audience-divider">
              <div
                class="floating-element"
                style="top: 20%; left: -2px; animation-delay: 0s"
              ></div>
              <div
                class="floating-element"
                style="top: 50%; left: -2px; animation-delay: 1s"
              ></div>
              <div
                class="floating-element"
                style="top: 80%; left: -2px; animation-delay: 2s"
              ></div>
            </div>
          </div>

          <!-- Rejected Section -->
          <div class="space-y-6">
            <div class="flex items-center gap-4 mb-8">
              <div
                class="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-red-400/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h3
                class="text-2xl tracking-wider opacity-40"
                data-i18n="audience.notFor.title"
              >
              </h3>
            </div>

            <!-- Rejected Cards -->
            <div
              class="audience-card rejected p-6 rounded-lg reveal"
              style="animation-delay: 0.5s"
            >
              <div class="flex items-start gap-4">
                <div class="cross-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h4 class="text-sm font-medium mb-2 opacity-60" data-i18n="audience.notFor.items[0].title">
                  </h4>
                  <p class="text-xs opacity-50 leading-relaxed" data-i18n="audience.notFor.items[0].description">
                  </p>
                </div>
              </div>
            </div>

            <div
              class="audience-card rejected p-6 rounded-lg reveal"
              style="animation-delay: 0.6s"
            >
              <div class="flex items-start gap-4">
                <div class="cross-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h4 class="text-sm font-medium mb-2 opacity-60" data-i18n="audience.notFor.items[1].title">
                  </h4>
                  <p class="text-xs opacity-50 leading-relaxed" data-i18n="audience.notFor.items[1].description">
                  </p>
                </div>
              </div>
            </div>

            <div
              class="audience-card rejected p-6 rounded-lg reveal"
              style="animation-delay: 0.7s"
            >
              <div class="flex items-start gap-4">
                <div class="cross-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h4 class="text-sm font-medium mb-2 opacity-60" data-i18n="audience.notFor.items[2].title">
                  </h4>
                  <p class="text-xs opacity-50 leading-relaxed" data-i18n="audience.notFor.items[2].description">
                  </p>
                </div>
              </div>
            </div>

            <div
              class="audience-card rejected p-6 rounded-lg reveal"
              style="animation-delay: 0.8s"
            >
              <div class="flex items-start gap-4">
                <div class="cross-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h4 class="text-sm font-medium mb-2 opacity-60" data-i18n="audience.notFor.items[3].title">
                  </h4>
                  <p class="text-xs opacity-50 leading-relaxed" data-i18n="audience.notFor.items[3].description">
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Statistics Section -->
      </div>
    </section>

    <div class="divider-luxury"></div>

    <!-- About -->
    <section class="py-24 px-4 relative mentor-hero">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <p
            class="text-xs tracking-[0.3em] mb-4 opacity-60"
            data-i18n="mentor.sectionBadge"
          >
            CONHEÇA SEU MENTOR
          </p>
          <h2
            class="text-5xl md:text-6xl mb-6 text-luxury animate-titleGlow"
            data-i18n="mentor.title"
          >
            Dr. Alexandre Calandrini
          </h2>
          <p
            class="text-sm opacity-60 max-w-2xl mx-auto"
            data-i18n="mentor.subtitle"
          >
            Referência nacional em cirurgia facial combinada e harmonização
            estética
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <!-- Left: Image and Main Info -->
          <div class="text-center lg:text-left">
            <div class="mentor-image-container mb-12">
              <div class="mentor-image-frame"></div>
              <img
                src="src/assets/images/dr-calandrini.webp"
                alt="Dr. Alexandre Calandrini"
                class="mentor-image"
              />
            </div>

            <div class="space-y-4">
              <h3
                class="text-2xl font-light tracking-wider"
                data-i18n="mentor.role"
              >
                Cirurgião Plástico
              </h3>
              <div class="flex flex-wrap gap-2 justify-center lg:justify-start">
                <span class="expertise-tag">Rinoplastia</span>
                <span class="expertise-tag">Lifting Facial</span>
                <span class="expertise-tag">Blefaroplastia</span>
                <span class="expertise-tag">Harmonização</span>
                <span class="expertise-tag">Procedimentos Combinados</span>
              </div>
              <p
                class="text-sm opacity-70 leading-relaxed max-w-md mx-auto lg:mx-0"
                data-i18n="mentor.bio"
              >
                Pioneiro em técnicas de procedimentos combinados, o Dr.
                Calandrini desenvolveu protocolos únicos que permitem realizar
                múltiplas intervenções faciais com segurança e resultados
                superiores.
              </p>
            </div>
          </div>

          <!-- Right: Timeline and Achievements -->
          <div>
            <h3
              class="text-xl mb-8 tracking-wider opacity-80"
              data-i18n="mentor.trajectoryTitle"
            >
              TRAJETÓRIA DE EXCELÊNCIA
            </h3>

            <div class="space-y-6 mb-12">
              <div class="timeline-item reveal">
                <div class="timeline-dot"></div>
                <div>
                  <p class="text-sm font-medium mb-1" data-i18n="mentor.timeline[0].title">Formação Médica</p>
                  <p class="text-xs opacity-60" data-i18n="mentor.timeline[0].description">
                    Especialização em Cirurgia Plástica com foco em
                    procedimentos faciais
                  </p>
                </div>
              </div>

              <div class="timeline-item reveal">
                <div class="timeline-dot"></div>
                <div>
                  <p class="text-sm font-medium mb-1" data-i18n="mentor.timeline[1].title">
                    Desenvolvimento do Método Face & Nose Code
                  </p>
                  <p class="text-xs opacity-60" data-i18n="mentor.timeline[1].description">
                    Criação de protocolos exclusivos para procedimentos
                    combinados
                  </p>
                </div>
              </div>

              <div class="timeline-item reveal">
                <div class="timeline-dot"></div>
                <div>
                  <p class="text-sm font-medium mb-1" data-i18n="mentor.timeline[2].title">Centro de Referência</p>
                  <p class="text-xs opacity-60" data-i18n="mentor.timeline[2].description">
                    Clínica especializada em cirurgia facial avançada
                  </p>
                </div>
              </div>

              <div class="timeline-item reveal">
                <div class="timeline-dot"></div>
                <div>
                  <p class="text-sm font-medium mb-1" data-i18n="mentor.timeline[3].title">Mentor e Educador</p>
                  <p class="text-xs opacity-60" data-i18n="mentor.timeline[3].description">
                    Compartilhando conhecimento com a nova geração de cirurgiões
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Quote Section -->
        <div class="text-center max-w-4xl mx-auto">
          <div class="quote-mark">“</div>
          <blockquote
            class="text-xl md:text-2xl italic opacity-80 leading-relaxed mb-8"
            data-i18n="mentor.quote"
          >
            A excelência em cirurgia facial não é apenas domínio técnico. É a
            capacidade de enxergar cada rosto como único, harmonizando múltiplos
            procedimentos em uma única intervenção segura e transformadora.
          </blockquote>
          <p
            class="text-xs opacity-60 tracking-wider"
            data-i18n="mentor.signature"
          >
            — DR. ALEXANDRE CALANDRINI
          </p>
        </div>
      </div>
    </section>

    <div class="divider-luxury"></div>

    <!-- Method -->
    <section class="py-24 px-4 relative overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <!-- Header da Metodologia -->
        <div class="text-center mb-20 reveal">
          <p
            class="text-xs tracking-[0.3em] mb-4 opacity-60"
            data-i18n="method.sectionBadge"
          >METODOLOGIA EXCLUSIVA
          </p>
          <h2 class="text-5xl mb-8 text-luxury" data-i18n="method.title">Método Face & Nose Code
          </h2>
          <p
            class="text-lg opacity-70 max-w-3xl mx-auto"
            data-i18n="method.subtitle"
          >Sistema proprietário desenvolvido ao longo de 15 anos de prática cirúrgica avançada
            Sistema proprietário desenvolvido ao longo de 15 anos de prática
            cirúrgica avançada
          </p>
        </div>

        <!-- Citação Principal -->
        <div class="relative mb-24 reveal">
          <div
            class="absolute -inset-4 bg-gradient-to-r from-[#5E3CEA]/10 to-[#4E33C4]/10 blur-3xl"
          ></div>
          <div class="relative card-luxury p-12 text-center">
            <svg
              class="w-12 h-12 mx-auto mb-6 text-[#5E3CEA] opacity-30"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
              />
            </svg>
            <p
              class="text-xl leading-relaxed opacity-90 italic mb-4"
              data-i18n="method.quote"
            >
              "Uma abordagem revolucionária que permite realizar múltiplos
              procedimentos com segurança máxima e recuperação otimizada."
            </p>
            <p class="text-xs opacity-50 tracking-wider">
              — DR. ALEXANDRE CALANDRINI
            </p>
          </div>
        </div>

        <!-- Fluxo Visual do Método -->
        <div class="mb-24">
          <div class="relative">
            <!-- Linha de Conexão -->
            <div
              class="absolute inset-x-0 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#5E3CEA]/20 to-transparent hidden md:block"
            ></div>

            <!-- Cards do Método -->
            <div class="grid md:grid-cols-3 gap-8 relative">
              <!-- Fase 1: Análise -->
              <div
                class="method-card group reveal"
                style="animation-delay: 0.1s"
              >
                <div
                  class="absolute -inset-1 bg-gradient-to-b from-[#5E3CEA]/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                ></div>
                <div class="relative card-luxury p-8 h-full">
                  <!-- Número da Fase -->
                  <div
                    class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#5E3CEA] to-[#4E33C4] mb-6"
                  >
                    <span class="text-2xl font-bold">01</span>
                  </div>

                  <!-- Ícone 3D -->
                  <div class="mb-6">
                    <svg
                      class="w-20 h-20 mx-auto text-[#5E3CEA] opacity-60"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 01.553-.894L9 2m0 18l6-3m-6 3V2m6 3l5.447-2.724A1 1 0 0121 3.118v10.764a1 1 0 01-.553.894L15 17.5M9 2l6 3m0 0v10.5"
                      />
                    </svg>
                  </div>

                  <h3 class="text-xl mb-3 tracking-wider font-light" data-i18n="method.phases[0].title">ANÁLISE TRIDIMENSIONAL
                  </h3>
                  <p class="text-sm opacity-60 mb-4 leading-relaxed" data-i18n="method.phases[0].description">Planejamento cirúrgico com tecnologia 3D de última geração
                  </p>

                  <!-- Detalhes Técnicos -->
                  <div class="mt-6 pt-6 border-t border-white/10">
                    <ul class="space-y-2 text-xs opacity-50">
                      <li class="flex items-center gap-2">
                        <span class="w-1 h-1 bg-[#5E3CEA] rounded-full"></span>
                        <span data-i18n="method.phases[0].details[0]">Tomografia computadorizada</span>
                      </li>
                      <li class="flex items-center gap-2">
                        <span class="w-1 h-1 bg-[#5E3CEA] rounded-full"></span>
                        <span data-i18n="method.phases[0].details[1]">Modelagem virtual</span>
                      </li>
                      <li class="flex items-center gap-2">
                        <span class="w-1 h-1 bg-[#5E3CEA] rounded-full"></span>
                        <span data-i18n="method.phases[0].details[2]">Simulação de resultados</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Fase 2: Sequenciamento -->
              <div
                class="method-card group reveal"
                style="animation-delay: 0.2s"
              >
                <div
                  class="absolute -inset-1 bg-gradient-to-b from-[#5E3CEA]/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                ></div>
                <div class="relative card-luxury p-8 h-full">
                  <!-- Número da Fase -->
                  <div
                    class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#5E3CEA] to-[#4E33C4] mb-6"
                  >
                    <span class="text-2xl font-bold">02</span>
                  </div>

                  <!-- Ícone de Sequenciamento -->
                  <div class="mb-6">
                    <svg
                      class="w-20 h-20 mx-auto text-[#5E3CEA] opacity-60"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                      />
                    </svg>
                  </div>

                  <h3 class="text-xl mb-3 tracking-wider font-light" data-i18n="method.phases[1].title">SEQUENCIAMENTO ESTRATÉGICO
                  </h3>
                  <p class="text-sm opacity-60 mb-4 leading-relaxed" data-i18n="method.phases[1].description">Ordem ideal de procedimentos combinados para máxima eficiência
                  </p>

                  <!-- Detalhes Técnicos -->
                  <div class="mt-6 pt-6 border-t border-white/10">
                    <ul class="space-y-2 text-xs opacity-50">
                      <li class="flex items-center gap-2">
                        <span class="w-1 h-1 bg-[#5E3CEA] rounded-full"></span>
                        <span data-i18n="method.phases[1].details[0]">Priorização anatômica</span>
                      </li>
                      <li class="flex items-center gap-2">
                        <span class="w-1 h-1 bg-[#5E3CEA] rounded-full"></span>
                        <span data-i18n="method.phases[1].details[1]">Otimização do tempo cirúrgico</span>
                      </li>
                      <li class="flex items-center gap-2">
                        <span class="w-1 h-1 bg-[#5E3CEA] rounded-full"></span>
                        <span data-i18n="method.phases[1].details[2]">Redução de trauma tecidual</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Fase 3: Recuperação -->
              <div
                class="method-card group reveal"
                style="animation-delay: 0.3s"
              >
                <div
                  class="absolute -inset-1 bg-gradient-to-b from-[#5E3CEA]/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                ></div>
                <div class="relative card-luxury p-8 h-full">
                  <!-- Número da Fase -->
                  <div
                    class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#5E3CEA] to-[#4E33C4] mb-6"
                  >
                    <span class="text-2xl font-bold">03</span>
                  </div>

                  <!-- Ícone de Recuperação -->
                  <div class="mb-6">
                    <svg
                      class="w-20 h-20 mx-auto text-[#5E3CEA] opacity-60"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>

                  <h3 class="text-xl mb-3 tracking-wider font-light" data-i18n="method.phases[2].title">PROTOCOLOS DE RECUPERAÇÃO
                  </h3>
                  <p class="text-sm opacity-60 mb-4 leading-relaxed" data-i18n="method.phases[2].description">Cuidados específicos para múltiplas intervenções simultâneas
                  </p>

                  <!-- Detalhes Técnicos -->
                  <div class="mt-6 pt-6 border-t border-white/10">
                    <ul class="space-y-2 text-xs opacity-50">
                      <li class="flex items-center gap-2">
                        <span class="w-1 h-1 bg-[#5E3CEA] rounded-full"></span>
                        <span data-i18n="method.phases[2].details[0]">Cronograma personalizado</span>
                      </li>
                      <li class="flex items-center gap-2">
                        <span class="w-1 h-1 bg-[#5E3CEA] rounded-full"></span>
                        <span data-i18n="method.phases[2].details[1]">Fisioterapia integrada</span>
                      </li>
                      <li class="flex items-center gap-2">
                        <span class="w-1 h-1 bg-[#5E3CEA] rounded-full"></span>
                        <span data-i18n="method.phases[2].details[2]">Acompanhamento pós-operatório</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Resultados do Método -->
        <div class="grid md:grid-cols-4 gap-6 mb-20">
          <div class="text-center reveal" style="animation-delay: 0.1s">
            <div class="text-4xl font-bold text-[#5E3CEA] mb-2">-60%</div>
            <p class="text-xs opacity-60 uppercase tracking-wider">
              Tempo de Recuperação
            </p>
          </div>
          <div class="text-center reveal" style="animation-delay: 0.2s">
            <div class="text-4xl font-bold text-[#5E3CEA] mb-2">3X</div>
            <p class="text-xs opacity-60 uppercase tracking-wider">
              Mais Precisão
            </p>
          </div>
          <div class="text-center reveal" style="animation-delay: 0.3s">
            <div class="text-4xl font-bold text-[#5E3CEA] mb-2">95%</div>
            <p class="text-xs opacity-60 uppercase tracking-wider">
              Previsibilidade
            </p>
          </div>
          <div class="text-center reveal" style="animation-delay: 0.4s">
            <div class="text-4xl font-bold text-[#5E3CEA] mb-2">0</div>
            <p class="text-xs opacity-60 uppercase tracking-wider">
              Complicações Graves
            </p>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="text-center reveal">
          <div
            class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#5E3CEA]/10 to-[#4E33C4]/10 rounded-full"
          >
            <svg
              class="w-5 h-5 text-[#5E3CEA]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-sm tracking-wider" data-i18n="method.validation"
              >MÉTODO VALIDADO POR +500 CIRURGIAS</span
            >
          </div>
        </div>
      </div>

      <style>
        .method-card {
          transform: translateY(0);
          transition: transform 0.3s ease;
        }

        .method-card:hover {
          transform: translateY(-10px);
        }

        .method-card .card-luxury {
          transition: all 0.3s ease;
        }

        .method-card:hover .card-luxury {
          background: linear-gradient(
            135deg,
            rgba(94, 60, 234, 0.05),
            transparent
          );
          border-color: rgba(94, 60, 234, 0.3);
        }
      </style>
    </section>

    <div class="divider-luxury"></div>

    <!-- Final CTA -->
    <section class="py-24 px-4 relative">
      <div class="luxury-gradient absolute inset-0"></div>

      <div class="max-w-3xl mx-auto text-center relative z-10">
        <h2 class="text-5xl md:text-6xl mb-8">
          <span data-i18n="cta.title">Transforme Sua</span><br />
          <span class="text-luxury italic" data-i18n="cta.titleHighlight"
            >Prática Médica</span
          >
        </h2>
        <p class="text-lg mb-12 opacity-80" data-i18n="cta.subtitle">
          Domine as técnicas que irão elevar seu patamar profissional
        </p>
        <button
          onclick="document.getElementById('leadForm').scrollIntoView({behavior: 'smooth'})"
          class="btn-luxury px-16 py-5 text-xs inline-block"
          data-i18n="cta.button"
        >
          Garantir Acesso
        </button>
        <p class="mt-12 text-xs opacity-40" data-i18n="cta.disclaimer">
          Vagas limitadas para garantir qualidade e interação direta
        </p>
      </div>
    </section>

    <!-- Footer -->
    <footer
      class="py-16 px-4 border-t relative"
      style="border-color: rgba(199, 194, 223, 0.1)"
    >
      <div class="max-w-6xl mx-auto text-center">
        <p class="text-luxury text-lg mb-4" data-i18n="footer.brand">
          Face & Nose Code
        </p>
        <p class="text-xs opacity-40 mb-8" data-i18n="footer.company">
          Neo Doctor LTDA • CNPJ: 60.005.706/0001-78
        </p>
        <div class="flex justify-center gap-12 text-xs tracking-wider">
          <a
            href="#"
            class="opacity-40 hover:opacity-80 transition"
            data-i18n="footer.links.terms"
            >TERMOS</a
          >
          <a
            href="#"
            class="opacity-40 hover:opacity-80 transition"
            data-i18n="footer.links.privacy"
            >PRIVACIDADE</a
          >
        </div>
        <p class="mt-12 text-xs opacity-20" data-i18n="footer.copyright">
          © Dr Alexandre Calandrini - 2025 • Todos os direitos reservados
        </p>
      </div>
    </footer>

    <!-- Main JavaScript -->
    <script src="src/assets/js/main.js"></script>
  </body>
</html>
