// src/app/services/page.js
import ServicesGrid from '@/components/sections/ServicesGrid';
import Breadcrumbs from '@/components/Breadcrumbs';

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

export const metadata = {
  title: 'Услуги | ООО "ПТБ-М" - Комплексные решения транспортной безопасности',
  description: 'Полный спектр услуг по транспортной безопасности: аудит, мониторинг угроз, обучение персонала, техническое оснащение, лицензирование, консультации.',
  keywords: 'услуги транспортной безопасности, аудит ОТИ, мониторинг угроз, обучение специалистов, техническое оснащение, лицензирование',
};