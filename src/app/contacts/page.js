import ContactForm from '@/components/sections/ContactForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import StandaloneCaptcha from './components/StandaloneCaptcha';
import { generateMetadataForPage } from '../lib/generateMetadata';

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
      
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Контакты
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Свяжитесь с нами для консультации по вопросам транспортной безопасности
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {/* Security Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Проверка безопасности
              </h2>
              <p className="text-gray-600 mb-4">
                Для защиты от автоматических отправок, пожалуйста, пройдите проверку безопасности ниже.
              </p>
              
              <StandaloneCaptcha />
            </div>

            {/* Contact Form */}
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Форма обратной связи
              </h2>
              <p className="text-gray-600 mb-8">
                Заполните форму ниже и наш специалист свяжется с вами в ближайшее время.
              </p>
              
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}