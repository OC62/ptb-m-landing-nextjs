// src/app/careers/page.js
import Careers from '@/components/sections/Careers';
import Breadcrumbs from '@/components/Breadcrumbs';

// !! ИМПОРТ ИЗ НОВОЙ СИСТЕМЫ SEO !!
import { generateMetadataForPage } from '../../lib/generateMetadata'; // Убедитесь, что путь правильный

// !! ОБНОВЛЁННЫЕ МЕТАДАННЫЕ ДЛЯ СТРАНИЦЫ КАРЬЕРЫ - ИСПОЛЬЗУЕМ НОВУЮ СИСТЕМУ !!
export const metadata = generateMetadataForPage('careers', { // Используем шаблон 'careers'
  title: 'Работа в сфере транспортной безопасности | Вакансии в Ростове-на-Дону | ООО "ПТБ-М"',
  description: 'Ищете работу в сфере транспортной безопасности в Ростове-на-Дону? ООО "ПТБ-М" предлагает вакансии для специалистов по обеспечению безопасности. Подразделение транспортной безопасности.',
  keywords: ['работа транспортная безопасность', 'вакансии транспортная безопасность', 'работа ПТБ', 'транспортная безопасность работа', 'вакансии Ростов-на-Дону', 'Подразделение транспортной безопасности', 'ПТБ-М'],
  path: '/careers', // Указываем путь для Open Graph
  // image и imageAlt можно опционально переопределить, если отличаются от базовых
});

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