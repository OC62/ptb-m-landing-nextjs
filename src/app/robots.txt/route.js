// src/app/robots.txt/route.js
// !! ИМПОРТ ИЗ НОВОЙ СИСТЕМЫ SEO !!
import { SEO_BASE_DATA } from '../../seo.config'; // Убедитесь, что путь правильный

export async function GET() {
  // !! ИСПОЛЬЗУЕМ БАЗОВЫЙ URL ИЗ КОНФИГА !!
  const baseUrl = SEO_BASE_DATA.siteUrl;

  const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: ${baseUrl}/sitemap.xml
Host: ${baseUrl}

# Yandex
User-agent: Yandex
Disallow: /api/
Disallow: /admin/
Host: ${baseUrl}`;

  return new Response(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}