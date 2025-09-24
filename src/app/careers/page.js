// src/app/careers/page.js
import Careers from '@/components/sections/Careers';
import Breadcrumbs from '@/components/Breadcrumbs';

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

export const metadata = {
  title: 'Карьера и вакансии | ООО "ПТБ-М" - Присоединяйтесь к команде',
  description: 'Карьерные возможности в ООО "ПТБ-М". Текущие вакансии специалистов по транспортной безопасности. Присоединяйтесь к команде профессионалов.',
  keywords: 'вакансии ПТБ-М, карьера, работа в транспортной безопасности, специалист по ТБ, трудоустройство',
};