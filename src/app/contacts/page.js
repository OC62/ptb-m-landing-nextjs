// src/app/contacts/page.js
import ContactForm from '@/components/sections/ContactForm';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs />
      <main role="main">
        <ContactForm />
      </main>
    </div>
  );
}

export const metadata = {
  title: 'Контакты | ООО "ПТБ-М" - Свяжитесь с нами',
  description: 'Контактная информация ООО "ПТБ-М". Адрес, телефоны, email. Получите консультацию по транспортной безопасности.',
  keywords: 'контакты ПТБ-М, адрес, телефоны, email, связаться с нами, консультация',
};