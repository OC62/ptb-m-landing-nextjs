// src/app/robots.txt/route.js
import { SEO_BASE_DATA } from '../seo.config';

export async function GET() {
  const baseUrl = SEO_BASE_DATA.siteUrl;

  const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

User-agent: Yandex
Allow: /
Disallow: /api/
Disallow: /admin/
Clean-param: utm_source&utm_medium&utm_campaign /

Sitemap: ${baseUrl}/sitemap.xml`;

  return new Response(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}