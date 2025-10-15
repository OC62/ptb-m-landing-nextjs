// src/app/licenses/page.js
import Licenses from '@/components/sections/Licenses';
import SectionNavigation from '@/components/SectionNavigation';
import { generateMetadataForPage } from '../lib/generateMetadata'; // Убедитесь в правильности пути

// Используем шаблон 'licenses'
export const metadata = generateMetadataForPage('licenses', {
  title: 'Лицензии и свидетельства | ООО "ПТБ-М" - Официальные документы',
  description: 'Официальные лицензии и свидетельства ООО "ПТБ-М". Свидетельство об аккредитации, лицензия на работу с источниками ионизирующего излучения. Ростов-на-Дону.',
  keywords: ['лицензии ПТБ-М', 'свидетельства', 'аккредитация', 'официальные документы', 'разрешительные документы', 'Ростов-на-Дону'],
  path: '/licenses',
});

export default function LicensesPage() {
  return (
    <div className="min-h-screen bg-white">
      <SectionNavigation />
      <main role="main">
        <Licenses />
      </main>
    </div>
  );
}