// src/app/services/page.js
import ServicesGrid from '@/components/sections/ServicesGrid';
import Breadcrumbs from '@/components/Breadcrumbs';

// !! ИМПОРТ ИЗ НОВОЙ СИСТЕМЫ SEO !!
import { generateMetadataForPage } from '../../lib/generateMetadata'; // Убедитесь, что путь правильный

// !! ОБНОВЛЁННЫЕ МЕТАДАННЫЕ ДЛЯ СТРАНИЦЫ УСЛУГ - ИСПОЛЬЗУЕМ НОВУЮ СИСТЕМУ !!
export const metadata = generateMetadataForPage('services', { // Используем шаблон 'services'
  title: 'Услуги транспортной безопасности | ПТБ, ОТИ | ООО "ПТБ-М"', // Уточняем заголовок, если нужно, иначе шаблон использует базовый
  description: 'Профессиональные услуги по обеспечению транспортной безопасности (ПТБ, ОТИ) от ООО "ПТБ-М". Аудит, мониторинг, обучение, оснащение. Подразделение транспортной безопасности.',
  keywords: ['транспортная безопасность', 'ПТБ', 'ОТИ', 'услуги транспортной безопасности', 'аудит безопасности', 'мониторинг угроз', 'обучение персонала', 'техническое оснащение', 'ФЗ-16', 'Подразделение транспортной безопасности', 'ПТБ-М'],
  path: '/services', // Указываем путь для Open Graph
  // image и imageAlt можно опционально переопределить, если отличаются от базовых
});

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