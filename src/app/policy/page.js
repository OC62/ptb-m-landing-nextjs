// nextjs/src/app/policy/page.js
export default function PolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Политика конфиденциальности</h1>
      <div className="prose prose-sm md:prose-base max-w-none">
        <p className="mb-4 text-sm md:text-base">
          Настоящая Политика конфиденциальности регулирует порядок сбора, использования и раскрытия персональных данных пользователей сайта ООО &quot;ПТБ-М&quot;.
        </p>
        
        <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-3">1. Сбор и использование информации</h2>
        <p className="mb-4 text-sm md:text-base">
          Мы собираем информацию, которую вы предоставляете нам добровольно при заполнении формы обратной связи. Это может включать ваше имя, email, телефон и сообщение.
        </p>
        
        <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-3">2. Использование cookies</h2>
        <p className="mb-4 text-sm md:text-base">
          Наш сайт использует файлы cookies для улучшения работы сайта и сбора аналитики. Cookies — это небольшие текстовые файлы, которые сохраняются на вашем устройстве.
        </p>
        <p className="mb-4 text-sm md:text-base">
          Мы используем cookies для:
        </p>
        <ul className="list-disc pl-6 mb-4 text-sm md:text-base">
          <li>Аналитики (Яндекс.Метрика)</li>
          <li>Защиты от ботов (Яндекс SmartCaptcha)</li>
        </ul>
        
        <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-3">3. Ваши права</h2>
        <p className="mb-4 text-sm md:text-base">
          Вы имеете право в любой момент отозвать согласие на обработку персональных данных, направив письмо на email: dtsm.rnd@gmail.com.
        </p>
        
        <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-3">4. Контакты</h2>
        <p className="mb-4 text-sm md:text-base">
          По всем вопросам, связанным с настоящей Политикой конфиденциальности, вы можете связаться с нами по email: dtsm.rnd@gmail.com.
        </p>
      </div>
    </div>
  );
}