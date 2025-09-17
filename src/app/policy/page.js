// nextjs/src/app/policy/page.js
'use client';

import { useEffect } from 'react';

export default function PolicyPage() {
  useEffect(() => {
    // Прокручиваем к верху страницы при загрузке
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Также можно добавить фокус на заголовок для доступности
    const heading = document.querySelector('h1');
    if (heading) {
      heading.tabIndex = -1;
      heading.focus();
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="max-w-4xl mx-auto pt-20 pb-16"> {/* Добавлен pt-20 для отступа сверху */}
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
          Политика конфиденциальности
        </h1>
        <div className="prose prose-gray max-w-none">
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
            <p className="mb-6 text-gray-600">
              Настоящая Политика конфиденциальности регулирует порядок сбора, использования и раскрытия персональных данных пользователей сайта ООО &quot;ПТБ-М&quot;.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
              1. Сбор и использование информации
            </h2>
            <p className="mb-6 text-gray-600">
              Мы собираем информацию, которую вы предоставляете нам добровольно при заполнении формы обратной связи. Это может включать ваше имя, email, телефон и сообщение.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
              2. Использование cookies
            </h2>
            <p className="mb-4 text-gray-600">
              Наш сайт использует файлы cookies для улучшения работы сайта и сбора аналитики. Cookies — это небольшие текстовые файлы, которые сохраняются на вашем устройстве.
            </p>
            <p className="mb-4 text-gray-600">
              Мы используем cookies для:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2">
              <li>Аналитики (Яндекс.Метрика)</li>
              <li>Защиты от ботов (Яндекс SmartCaptcha)</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
              3. Ваши права
            </h2>
            <p className="mb-6 text-gray-600">
              Вы имеете право в любой момент отозвать согласие на обработку персональных данных, направив письмо на email: 
              <a 
                href="mailto:dtsm.rnd@gmail.com" 
                className="text-blue-600 hover:text-blue-800 underline ml-1"
              >
                dtsm.rnd@gmail.com
              </a>.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
              4. Контакты
            </h2>
            <p className="mb-6 text-gray-600">
              По всем вопросам, связанным с настоящей Политикой конфиденциальности, вы можете связаться с нами по email: 
              <a 
                href="mailto:dtsm.rnd@gmail.com" 
                className="text-blue-600 hover:text-blue-800 underline ml-1"
              >
                dtsm.rnd@gmail.com
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}