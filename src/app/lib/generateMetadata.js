// src/app/lib/generateMetadata.js

// !! ИСПРАВЛЕН ПУТЬ ИМПОРТА !!
import { SEO_BASE_DATA, SEO_PAGE_TEMPLATES } from '../seo.config';

// !! ФУНКЦИЯ ГЕНЕРАЦИИ МЕТАДАННЫХ С ЗАЩИТОЙ ОТ ОТНОСИТЕЛЬНЫХ ПУТЕЙ !!
export function generateMetadataForPage(templateName, customData = {}) {
  const template = SEO_PAGE_TEMPLATES[templateName] || SEO_PAGE_TEMPLATES.default;

  const title = template.title(customData.title);
  const description = template.description(customData.description);
  const keywords = template.keywords(customData.keywords).join(', ');

  const ogUrl = `${SEO_BASE_DATA.siteUrl}${customData.path || ''}`;

  // Гарантируем, что ogImage — абсолютный URL
  let ogImage = customData.image || SEO_BASE_DATA.defaultImage;
  if (ogImage.startsWith('/')) {
    ogImage = `${SEO_BASE_DATA.siteUrl}${ogImage}`;
  }

  const ogImageAlt = customData.imageAlt || SEO_BASE_DATA.defaultImageAlt;

  return {
    title: title,
    description: description,
    keywords: keywords,
    authors: [{ name: SEO_BASE_DATA.author }],
    creator: SEO_BASE_DATA.author,
    publisher: SEO_BASE_DATA.author,
    robots: 'index, follow',
    openGraph: {
      title: title,
      description: description,
      url: ogUrl,
      siteName: SEO_BASE_DATA.siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
      locale: SEO_BASE_DATA.locale,
      type: customData.type || 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [ogImage],
    },
    verification: {
      yandex: SEO_BASE_DATA.yandexVerification,
    },
  };
}