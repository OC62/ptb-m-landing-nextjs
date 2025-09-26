// src/app/about/page.js
import About from '@/components/sections/About';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateMetadataForPage } from '../lib/generateMetadata'; // Убедитесь в правильности пути

// Используем шаблон 'about'
export const metadata = generateMetadataForPage('about', {
  title: 'О компании ООО "ПТБ-М" | Опыт в сфере транспортной безопасности с 2017 года',
  description: 'Узнайте о нашей команде, опыте работы и подходе к обеспечению транспортной безопасности в Ростове-на-Дону и по всей России.',
  keywords: ['о компании ПТБ-М', 'опыт работы', 'команда специалистов', 'транспортная безопасность', 'Ростов-на-Дону', '2017'],
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs />
      <main role="main">
        <About />
      </main>
    </div>
  );
}