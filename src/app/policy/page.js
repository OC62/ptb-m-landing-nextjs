// nextjs/src/app/policy/page.js
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateMetadataForPage } from '../lib/generateMetadata'; // Убедитесь в правильности пути

// Используем шаблон 'policy'
export const metadata = generateMetadataForPage('policy', {
  title: 'Политика конфиденциальности | ООО "ПТБ-М"',
  description: 'Политика конфиденциальности и обработки персональных данных ООО "ПТБ-М". Узнайте о сборе, использовании и защите ваших данных. Ростов-на-Дону.',
  keywords: ['политика конфиденциальности', 'персональные данные', 'обработка', 'ПТБ-М', 'Ростов-на-Дону'],
  path: '/policy',
});

export default function PolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <article>
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Политика конфиденциальности
            </h1>
            <p className="text-gray-600 text-lg">
              Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                1. Общие положения
              </h2>
              <p className="mb-4 text-gray-700">
                Настоящая Политика конфиденциальности регулирует порядок сбора, использования, 
                хранения и раскрытия персональных данных пользователей сайта ООО &quot;ПТБ-М&quot; 
                (далее — &quot;Компания&quot;, &quot;Мы&quot;).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                2. Сбор и использование информации
              </h2>
              <p className="mb-4 text-gray-700">
                Мы собираем информацию, которую вы предоставляете нам добровольно при заполнении 
                формы обратной связи. Это может включать:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Имя и контактные данные (email, телефон)</li>
                <li>Содержание вашего сообщения</li>
                <li>Технические данные (IP-адрес, тип браузера)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                3. Использование cookies и аналогичных технологий
              </h2>
              <p className="mb-4 text-gray-700">
                Наш сайт использует файлы cookies и аналогичные технологии для:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Аналитики посещаемости (Яндекс.Метрика)</li>
                <li>Защиты от автоматических запросов (Яндекс SmartCaptcha)</li>
                <li>Улучшения пользовательского опыта</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                4. Защита данных
              </h2>
              <p className="mb-4 text-gray-700">
                Мы принимаем разумные меры для защиты ваших персональных данных от 
                несанкционированного доступа, использования или раскрытия.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                5. Ваши права
              </h2>
              <p className="mb-4 text-gray-700">
                Вы имеете право:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Знать, какие ваши данные мы обрабатываем</li>
                <li>Требовать исправления неточных данных</li>
                <li>Отозвать согласие на обработку данных</li>
                <li>Требовать удаления ваших данных</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                6. Контакты
              </h2>
              <p className="mb-4 text-gray-700">
                По всем вопросам, связанным с настоящей Политикой конфиденциальности 
                и обработкой персональных данных, вы можете связаться с нами:
              </p>
              <address className="not-italic text-gray-700">
                <p>Email: <a href="mailto:dtsm.rnd@gmail.com" className="text-blue-600 hover:underline">dtsm.rnd@gmail.com</a></p>
                <p>Телефон: <a href="tel:+79094072374" className="text-blue-600 hover:underline">+7 (909) 407-23-74</a></p>
                <p>Адрес: 344019, г. Ростов-на-Дону, ул. Большая Садовая, 102, офис 15</p>
              </address>
            </section>

            <footer className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                ООО &quot;ПТБ-М&quot; оставляет за собой право вносить изменения в настоящую 
                Политику конфиденциальности. Актуальная версия всегда доступна на этой странице.
              </p>
            </footer>
          </div>
        </article>
      </main>
    </div>
  );
}