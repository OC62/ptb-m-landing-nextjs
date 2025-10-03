// src/app/contacts/page.js
import SimpleContactForm from '@/components/sections/SimpleContactForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateMetadataForPage } from '../lib/generateMetadata'; // Убедитесь в правильности пути

// Используем шаблон 'contacts'
export const metadata = generateMetadataForPage('contacts', {
  title: 'Контакты | ООО "ПТБ-М" - Свяжитесь с нами',
  description: 'Контактная информация ООО "ПТБ-М". Адрес в Ростове-на-Дону, телефоны, email. Получите консультацию по транспортной безопасности.',
  keywords: ['контакты ПТБ-М', 'адрес Ростов-на-Дону', 'телефоны', 'email', 'связаться с нами', 'консультация', 'транспортная безопасность'],
  path: '/contacts',
});

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs />
      <main role="main">
        <SimpleContactForm />
      </main>
    </div>
  );
}