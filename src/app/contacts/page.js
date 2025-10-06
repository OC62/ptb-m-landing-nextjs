import ContactForm from '@/components/sections/ContactForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateMetadataForPage } from '../lib/generateMetadata';

export const metadata = generateMetadataForPage('contacts', {
  title: 'Контакты | ООО "ПТБ-М" - Свяжитесь с нами',
  description: 'Свяжитесь с ООО "ПТБ-М" для консультации по вопросам транспортной безопасности. Наши контакты и форма обратной связи.',
  keywords: ['контакты ПТБ-М', 'связаться', 'обратная связь', 'транспортная безопасность', 'Ростов-на-Дону'],
  path: '/contacts',
});

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Breadcrumbs />
      <main role="main">
        <ContactForm isStandalone={true} />
      </main>
    </div>
  );
}