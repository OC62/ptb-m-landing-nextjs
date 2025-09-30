// src/app/sitemap.xml/route.js
import { SEO_BASE_DATA } from '../seo.config';

export async function GET() {
  const baseUrl = SEO_BASE_DATA.siteUrl;

  const pages = [
    { url: '', priority: 1.0, changeFreq: 'daily' },
    { url: '/about', priority: 0.8, changeFreq: 'monthly' },
    { url: '/services', priority: 0.9, changeFreq: 'monthly' },
    { url: '/cases', priority: 0.7, changeFreq: 'weekly' },
    { url: '/careers', priority: 0.6, changeFreq: 'weekly' },
    { url: '/licenses', priority: 0.5, changeFreq: 'monthly' },
    { url: '/partners', priority: 0.5, changeFreq: 'monthly' },
    { url: '/contacts', priority: 0.8, changeFreq: 'monthly' },
    { url: '/policy', priority: 0.3, changeFreq: 'yearly' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${pages.map(page => `
    <url>
      <loc>${baseUrl}${page.url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>${page.changeFreq}</changefreq>
      <priority>${page.priority}</priority>
      <xhtml:link rel="alternate" hreflang="ru" href="${baseUrl}${page.url}"/>
    </url>
  `).join('')}
  <url>
    <loc>${baseUrl}</loc>
    <xhtml:link rel="alternate" hreflang="ru" href="${baseUrl}"/>
  </url>
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}