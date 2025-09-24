// src/app/about/page.js
import About from '@/components/sections/About';
import Breadcrumbs from '@/components/Breadcrumbs';

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

export const metadata = {
  title: 'О компании | ООО "ПТБ-М" - Опыт и профессионализм с 2017 года',
  description: 'ООО "ПТБ-М" - более 8 лет успешной работы в сфере транспортной безопасности. Наша команда, опыт работы с госзаказчиками, комплексный подход.',
  keywords: 'о компании ПТБ-М, опыт работы, команда специалистов, госзаказчики, транспортная безопасность Россия',
};