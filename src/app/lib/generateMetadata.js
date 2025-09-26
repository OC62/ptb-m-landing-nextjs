// src/lib/generateMetadata.js
import { SEO_BASE_DATA, SEO_PAGE_TEMPLATES } from '../seo.config'; // Убедитесь, что путь правильный

// !! ФУНКЦИЯ ГЕНЕРАЦИИ МЕТАДАННЫХ !!
export function generateMetadataForPage(templateName, customData = {}) {
  const template = SEO_PAGE_TEMPLATES[templateName] || SEO_PAGE_TEMPLATES.default; // Используем шаблон по умолчанию, если не найден

  // Применяем шаблоны к предоставленным данным
  const title = template.title(customData.title);
  const description = template.description(customData.description);
  const keywords = template.keywords(customData.keywords).join(', ');

  // Генерация Open Graph и Twitter данных
  const ogUrl = `${SEO_BASE_DATA.siteUrl}${customData.path || ''}`;
  const ogImage = customData.image || SEO_BASE_DATA.defaultImage;
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
      type: customData.type || 'website', // можно указать 'article' для постов
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