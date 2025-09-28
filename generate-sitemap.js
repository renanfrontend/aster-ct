const fs = require('fs');
const path = require('path');

// --- Configuração ---
const BASE_URL = 'https://www.SEU-DOMINIO.com.br'; // ⚠️ Substitua pelo seu domínio real
const PAGES_DIR = path.resolve(__dirname, './');
const SITEMAP_PATH = path.resolve(__dirname, './sitemap.xml');
const EXCLUDED_FILES = ['obrigado.html'];
// --------------------

const generateSitemap = () => {
    try {
        const files = fs.readdirSync(PAGES_DIR);
        const htmlFiles = files.filter(file => 
            path.extname(file) === '.html' && !EXCLUDED_FILES.includes(file)
        );

        const urls = htmlFiles.map(file => {
            let priority = '0.80';
            let changefreq = 'monthly';
            const lastmod = new Date().toISOString();

            if (file === 'index.html') {
                priority = '1.00';
                changefreq = 'weekly';
            } else if (file === 'politica-de-privacidade.html') {
                priority = '0.50';
                changefreq = 'yearly';
            }

            return `
  <url>
    <loc>${BASE_URL}/${file}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
    <changefreq>${changefreq}</changefreq>
  </url>`;
        }).join('');

        const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

        fs.writeFileSync(SITEMAP_PATH, sitemapContent.trim());
        console.log(`✅ Sitemap gerado com sucesso em: ${SITEMAP_PATH}`);
    } catch (error) {
        console.error('❌ Erro ao gerar o sitemap:', error);
    }
};

generateSitemap();