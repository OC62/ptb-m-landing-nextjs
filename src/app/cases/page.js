// src/app/cases/page.js
import CasesSlider from '@/components/sections/CasesSlider';
import SectionNavigation from '@/components/SectionNavigation';

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-white">
      <SectionNavigation />
      <main role="main">
        <CasesSlider />
      </main>
    </div>
  );
}

export const metadata = {
  title: 'Наши кейсы | ООО "ПТБ-М" - Реализованные проекты',
  description: 'Успешные кейсы и реализованные проекты ООО "ПТБ-М" по обеспечению транспортной безопасности объектов дорожного хозяйства.',
  keywords: 'кейсы ПТБ-М, реализованные проекты, успешные кейсы, объекты транспортной инфраструктуры',
};