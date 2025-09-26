// src/app/partners/page.js
import Partners from '@/components/sections/Partners';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateMetadataForPage } from '../lib/generateMetadata'; // Убедитесь в правильности пути

// Используем шаблон 'partners'
export const metadata = generateMetadataForPage('partners', {
  title: 'Партнеры | ООО "ПТБ-М" - Наши клиенты и партнеры',
  description: 'ООО "ПТБ-М" сотрудничает с ведущими компаниями и организациями России. Наши партнеры в сфере транспортной инфраструктуры. Ростов-на-Дону.',
  keywords: ['партнеры ПТБ-М', 'клиенты', 'сотрудничество', 'транспортная инфраструктура', 'компании-партнеры', 'Ростов-на-Дону'],
  path: '/partners',
});

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs />
      <main role="main">
        <Partners />
      </main>
    </div>
  );
}