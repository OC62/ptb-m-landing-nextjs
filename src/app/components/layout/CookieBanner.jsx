// nextjs/src/app/components/layout/CookieBanner.jsx
'use client';

import { useState, useEffect } from 'react';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Проверяем, есть ли consent в localStorage
    const consent = localStorage.getItem('cookie-consent');
    
    // Показываем баннер, только если consent ещё не дан
    if (!consent) {
      // Небольшая задержка для лучшего UX
      const timer = setTimeout(() => setShowBanner(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-8 md:right-8 z-50">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 md:p-6 max-w-2xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              🍪 Мы используем cookies
            </h3>
            <p className="text-sm text-gray-700">
              Этот сайт использует cookies для улучшения работы и анализа трафика. 
              Продолжая использовать сайт, вы соглашаетесь с нашей{' '}
              <a 
                href="/policy" 
                className="text-blue-600 hover:text-blue-800 underline text-xs"
                target="_blank"
                rel="noopener noreferrer"
              >
                Политикой конфиденциальности
              </a>.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <button
              onClick={acceptCookies}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Принять
            </button>
            <button
              onClick={declineCookies}
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Отклонить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;