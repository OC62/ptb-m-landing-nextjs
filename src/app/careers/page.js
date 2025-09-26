// src/app/careers/page.js
import Careers from '@/components/sections/Careers';
import Breadcrumbs from '@/components/Breadcrumbs';

// !! ОБНОВЛЁННЫЕ МЕТАДАННЫЕ ДЛЯ СТРАНИЦЫ КАРЬЕРЫ !!
export const metadata = {
  title: 'Работа в сфере транспортной безопасности | Вакансии в Ростове-на-Дону | ООО "ПТБ-М"',
  description: 'Ищете работу в сфере транспортной безопасности в Ростове-на-Дону? ООО "ПТБ-М" предлагает вакансии для специалистов по обеспечению безопасности. Подразделение транспортной безопасности.',
  keywords: 'работа транспортная безопасность, вакансии транспортная безопасность, работа ПТБ, транспортная безопасность работа, вакансии Ростов-на-Дону, Подразделение транспортной безопасности, ПТБ-М',
  authors: [{ name: "ООО ПТБ-М" }],
  creator: 'ООО ПТБ-М',
  publisher: 'ООО ПТБ-М',
  robots: 'index, follow',
  openGraph: {
    title: 'Работа в сфере транспортной безопасности | ООО "ПТБ-М"',
    description: 'Откройте возможности для карьеры в сфере транспортной безопасности с ООО "ПТБ-М". Вакансии в Ростове-на-Дону. Подразделение транспортной безопасности.',
    url: "https://xn----9sb8ajp.xn--p1ai/careers",
    siteName: "ООО ПТБ-М",
    images: [
      {
        url: "/images/og-preview.jpg", // Или другое изображение, подходящее для карьеры
        width: 1200,
        height: 630,
        alt: "Работа в сфере транспортной безопасности - ООО ПТБ-М",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Работа в сфере транспортной безопасности | ООО "ПТБ-М"',
    description: 'Откройте возможности для карьеры в сфере транспортной безопасности с ООО "ПТБ-М". Вакансии в Ростове-на-Дону.',
    images: ["/images/og-preview.jpg"],
  },
};

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs />
      <main role="main">
        <Careers />
      </main>
    </div>
  );
}