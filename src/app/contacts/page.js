// src/app/contacts/page.js
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
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-8 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">
                  Наши контакты
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Телефон</h3>
                      <p className="text-gray-600">+7 (909) 407 23 74</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                      <p className="text-gray-600">dtsm.rnd@gmail.com</p>
                      <p className="text-gray-600">oc611164@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Адрес</h3>
                      <p className="text-gray-600">344019 г. Ростов-на-Дону, ул. Большая Садовая, 102, офис 15</p>
                      <p className="text-gray-600 text-sm">Пн-Пт: 9:00-18:00</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Режим работы</h3>
                      <p className="text-gray-600">Понедельник - Пятница</p>
                      <p className="text-gray-600">9:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {/* Security Section */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Проверка безопасности
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Для защиты от автоматических отправок, пожалуйста, пройдите проверку безопасности ниже. 
                    Токен действителен в течение 2 минут после прохождения.
                  </p>
                  
                  <StandaloneCaptcha />
                  
                  <div className="mt-4 text-sm text-gray-500">
                    <p>✓ Защита от спама и автоматических отправок</p>
                    <p>✓ Один токен для всех форм на странице</p>
                    <p>✓ Токен автоматически обновляется</p>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white border border-gray-200 rounded-xl p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Форма обратной связи
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Заполните форму ниже и наш специалист свяжется с вами в ближайшее время. 
                    Все поля обязательны для заполнения.
                  </p>
                  
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}