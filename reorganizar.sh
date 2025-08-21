#!/usr/bin/env bash
set -euo pipefail

echo ">> Criando estrutura de pastas…"
mkdir -p public/images
mkdir -p src/pages
mkdir -p src/scripts/{core,features/{analytics,forms,ui},entrypoints}
mkdir -p src/styles
mkdir -p src/i18n
mkdir -p src/assets/{images,css}
mkdir -p config
mkdir -p docs

echo ">> Movendo HTMLs para src/pages/…"
git mv -f index.html                     src/pages/index.html          2>/dev/null || mv -f index.html src/pages/
git mv -f confirmacao.html               src/pages/confirmacao.html    2>/dev/null || mv -f confirmacao.html src/pages/
git mv -f curso-completo.html            src/pages/curso-completo.html 2>/dev/null || mv -f curso-completo.html src/pages/
git mv -f diagnostico.html               src/pages/diagnostico.html    2>/dev/null || mv -f diagnostico.html src/pages/
git mv -f lista-espera.html              src/pages/lista-espera.html   2>/dev/null || mv -f lista-espera.html src/pages/
git mv -f obrigado.html                  src/pages/obrigado.html       2>/dev/null || mv -f obrigado.html src/pages/
git mv -f privacidade.html               src/pages/privacidade.html    2>/dev/null || mv -f privacidade.html src/pages/
git mv -f termos.html                    src/pages/termos.html         2>/dev/null || mv -f termos.html src/pages/
[ -f test-page.html ] && (git mv -f test-page.html src/pages/test-page.html 2>/dev/null || mv -f test-page.html src/pages/)

echo ">> Movendo JS para src/scripts/…"
# core
[ -f assets/js/i18n.js ]             && (git mv -f assets/js/i18n.js src/scripts/core/i18n.js                   2>/dev/null || mv -f assets/js/i18n.js src/scripts/core/)
[ -f assets/js/performance.js ]      && (git mv -f assets/js/performance.js src/scripts/core/performance.js     2>/dev/null || mv -f assets/js/performance.js src/scripts/core/)
[ -f assets/js/backend-config.js ]   && (git mv -f assets/js/backend-config.js src/scripts/core/backend-config.js 2>/dev/null || mv -f assets/js/backend-config.js src/scripts/core/)
# features
[ -f assets/js/analytics.js ]        && (git mv -f assets/js/analytics.js src/scripts/features/analytics/index.js 2>/dev/null || mv -f assets/js/analytics.js src/scripts/features/analytics/)
[ -f assets/js/form-validation.js ]  && (git mv -f assets/js/form-validation.js src/scripts/features/forms/validate.js 2>/dev/null || mv -f assets/js/form-validation.js src/scripts/features/forms/)
[ -f assets/js/main.js ]             && (git mv -f assets/js/main.js src/scripts/features/ui/main.js            2>/dev/null || mv -f assets/js/main.js src/scripts/features/ui/)

echo ">> Criando entrypoints vazios (ajuste depois se quiser por página)…"
cat > src/scripts/entrypoints/index.page.js <<'EOF'
// Ponto de entrada da home (adicione somente o que a página usa)
import '../features/ui/main.js';
import '../features/analytics/index.js';
import '../features/forms/validate.js';
EOF

echo ">> Movendo imagens e estáticos…"
# Se suas imagens atuais estão em assets/images:
if [ -d assets/images ]; then
  git mv -f assets/images/* public/images/ 2>/dev/null || mv -f assets/images/* public/images/ || true
fi
# Favicon e SW
[ -f favicon.svg ] && (git mv -f favicon.svg public/favicon.svg 2>/dev/null || mv -f favicon.svg public/)
[ -f sw.js ]       && (git mv -f sw.js public/sw.js             2>/dev/null || mv -f sw.js public/)
# dicionários i18n (se existirem como pasta i18n/)
if [ -d i18n ]; then
  git mv -f i18n/* src/i18n/ 2>/dev/null || mv -f i18n/* src/i18n/ || true
fi

echo ">> Movendo configs de deploy…"
[ -f netlify.toml ] && (git mv -f netlify.toml config/netlify.toml 2>/dev/null || mv -f netlify.toml config/)
[ -f vercel.json ]  && (git mv -f vercel.json  config/vercel.json  2>/dev/null || mv -f vercel.json  config/)

echo ">> Movendo documentação para docs/…"
for f in ANALYTICS_SETUP.md FACEBOOK_PIXEL_SETUP.md GA4_SETUP_GUIDE.md FORM_CONNECTION_GUIDE.md \
         INTERNATIONALIZATION_GUIDE.md TRANSLATION_STATUS.md VERCEL_DEPLOY_GUIDE.md \
         WEBHOOK_SETUP_GUIDE.md WEBHOOK_MAKE_SETUP.md DEPLOYMENT_GUIDE.md PROJECT_STATUS.md \
         PROBLEMAS_CORRIGIDOS.md PRD.md README.md backup-inex.md; do
  [ -f "$f" ] && (git mv -f "$f" "docs/${f/backup-inex.md/backup-index.md}" 2>/dev/null || mv -f "$f" "docs/${f/backup-inex.md/backup-index.md}")
done

echo ">> Mantendo .prettierrc e .gitignore na raiz (ok)."

echo ">> Feito! Revise os caminhos em src/pages/*.html:"
echo "   - Atualize <script> para usar: <script type=\"module\" src=\"/src/scripts/entrypoints/index.page.js\"></script>"
echo "   - Atualize imagens: src=\"/images/...\" (pois agora estão em /public/images)"
echo "   - Se houver referências a assets/js/*.js, troque para os novos módulos."
