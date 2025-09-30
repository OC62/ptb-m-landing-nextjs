// src/app/robots.txt/route.js
import { SEO_BASE_DATA } from '../seo.config';

export async function GET() {
  const baseUrl = SEO_BASE_DATA.siteUrl;

  const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: ${baseUrl}/sitemap.xml

User-agent: Yandex
Disallow: /api/
Disallow: /admin/
Host: ${baseUrl}

Host: https://www.xn----9sb8ajp.xn--p1ai/`;

  return new Response(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}