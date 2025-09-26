// src/app/services/page.js
import ServicesGrid from '@/components/sections/ServicesGrid';
import Breadcrumbs from '@/components/Breadcrumbs';

// !! ОБНОВЛЁННЫЕ МЕТАДАННЫЕ ДЛЯ СТРАНИЦЫ УСЛУГ !!
export const metadata = {
  title: 'Услуги транспортной безопасности | ПТБ, ОТИ | ООО "ПТБ-М"',
  description: 'Профессиональные услуги по обеспечению транспортной безопасности (ПТБ, ОТИ) от ООО "ПТБ-М". Аудит, мониторинг, обучение, оснащение. Подразделение транспортной безопасности.',
  keywords: 'транспортная безопасность, ПТБ, ОТИ, услуги транспортной безопасности, аудит безопасности, мониторинг угроз, обучение персонала, техническое оснащение, ФЗ-16, Подразделение транспортной безопасности, ПТБ-М',
  authors: [{ name: "ООО ПТБ-М" }],
  creator: 'ООО ПТБ-М',
  publisher: 'ООО ПТБ-М',
  robots: 'index, follow',
  openGraph: {
    title: 'Услуги транспортной безопасности | ООО "ПТБ-М"',
    description: 'Комплексные услуги по обеспечению транспортной безопасности (ПТБ, ОТИ) от ООО "ПТБ-М". Подразделение транспортной безопасности.',
    url: "https://xn----9sb8ajp.xn--p1ai/services",
    siteName: "ООО ПТБ-М",
    images: [
      {
        url: "/images/og-preview.jpg", // Или другое изображение, подходящее для услуг
        width: 1200,
        height: 630,
        alt: "Услуги транспортной безопасности - ООО ПТБ-М",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Услуги транспортной безопасности | ООО "ПТБ-М"',
    description: 'Комплексные услуги по обеспечению транспортной безопасности (ПТБ, ОТИ) от ООО "ПТБ-М". Подразделение транспортной безопасности.',
    images: ["/images/og-preview.jpg"],
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs />
      <main role="main">
        <ServicesGrid />
      </main>
    </div>
  );
}