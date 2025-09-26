// src/seo.config.js

// !! БАЗОВЫЕ ДАННЫЕ САЙТА !!
export const SEO_BASE_DATA = {
  siteName: 'ООО "ПТБ-М"',
  siteUrl: 'https://xn----9sb8ajp.xn--p1ai', // !! Убедитесь, что URL правильный !!
  defaultTitle: 'ООО "ПТБ-М" | Комплексное обеспечение транспортной безопасности',
  defaultDescription: 'Обеспечение транспортной безопасности объектов дорожного хозяйства. Аудит, мониторинг, оснащение, обучение. Работаем по всей России.',
  defaultKeywords: ['транспортная безопасность', 'ПТБ', 'ОТИ', 'Ростов-на-Дону', 'ПТБ-М', 'Подразделение транспортной безопасности'],
  defaultImage: '/images/og-preview.jpg',
  defaultImageAlt: 'ООО ПТБ-М - Транспортная безопасность',
  locale: 'ru_RU',
  author: 'ООО ПТБ-М',
  twitter: '@your_twitter_handle', // если есть
  yandexVerification: 'f5bc48680f827787',
  // ... другие глобальные данные
};

// !! ШАБЛОНЫ ДЛЯ РАЗНЫХ ТИПОВ СТРАНИЦ !!
export const SEO_PAGE_TEMPLATES = {
  // Шаблон для главной страницы
  home: {
    title: (customTitle = '') => customTitle || SEO_BASE_DATA.defaultTitle,
    description: (customDesc = '') => customDesc || SEO_BASE_DATA.defaultDescription,
    keywords: (customKeywords = []) => [...SEO_BASE_DATA.defaultKeywords, ...customKeywords],
  },
  // Шаблон для страницы "Услуги"
  services: {
    title: (serviceName = '') => serviceName ? `${serviceName} | Услуги | ${SEO_BASE_DATA.siteName}` : `Услуги | ${SEO_BASE_DATA.siteName}`,
    description: (serviceDesc = '') => serviceDesc || SEO_BASE_DATA.defaultDescription,
    keywords: (serviceKeywords = []) => [...SEO_BASE_DATA.defaultKeywords, 'услуги', ...serviceKeywords],
  },
  // Шаблон для страницы "Карьера"
  careers: {
    title: (jobTitle = '') => jobTitle ? `Работа "${jobTitle}" | Карьера | ${SEO_BASE_DATA.siteName}` : `Карьера | ${SEO_BASE_DATA.siteName}`,
    description: (jobDesc = '') => jobDesc || SEO_BASE_DATA.defaultDescription.replace('транспортной безопасности', 'в сфере транспортной безопасности'),
    keywords: (jobKeywords = []) => [...SEO_BASE_DATA.defaultKeywords, 'работа', 'вакансии', ...jobKeywords],
  },
  // Шаблон для других страниц (например, about, contacts)
  default: {
    title: (customTitle = '') => customTitle ? `${customTitle} | ${SEO_BASE_DATA.siteName}` : SEO_BASE_DATA.defaultTitle,
    description: (customDesc = '') => customDesc || SEO_BASE_DATA.defaultDescription,
    keywords: (customKeywords = []) => [...SEO_BASE_DATA.defaultKeywords, ...customKeywords],
  },
  // ... другие шаблоны
};

// !! СХЕМА Schema.org (Organization) !!
export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization", // Или "LocalBusiness", если фокус на регион
  "name": SEO_BASE_DATA.siteName,
  "url": SEO_BASE_DATA.siteUrl,
  "logo": `${SEO_BASE_DATA.siteUrl}/images/logo.webp`,
  "description": SEO_BASE_DATA.defaultDescription,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ул. Большая Садовая, 102, офис 15",
    "addressLocality": "Ростов-на-Дону",
    "addressRegion": "Ростовская область",
    "postalCode": "344019",
    "addressCountry": "RU"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+7-909-407-23-74",
    "contactType": "customer service",
    "email": "dtsm.rnd@gmail.com",
    "areaServed": [
      {"@type": "City", "name": "Ростов-на-Дону"},
      {"@type": "State", "name": "Ростовская область"},
      {"@type": "Country", "name": "Россия"}
    ],
    "availableLanguage": ["Russian"]
  },
  "sameAs": [
    "https://vk.com/ptbm_rnd",
    "https://t.me/ptbm_rnd"
  ],
  "foundingDate": "2017",
  "serviceArea": {
    "@type": "AdministrativeArea",
    "name": "Ростов-на-Дону и Ростовская область, Россия"
  }
};

// !! ФУНКЦИЯ ДЛЯ ГЕНЕРАЦИИ JSON-LD (экспортируем отдельно) !!
export const generateSchemaJSONLD = () => {
  return JSON.stringify(ORGANIZATION_SCHEMA);
};