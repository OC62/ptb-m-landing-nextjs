// src/app/components/layout/CookieBanner.jsx
'use client';

import { useState, useEffect } from 'react';
import { disableYandexMetrika } from '@/app/utils/yandexMetrikaHelper';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Проверяем, было ли уже принято решение о cookies
    const cookieDecision = localStorage.getItem('cookie_decision');
    if (!cookieDecision) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie_decision', 'accepted');
    setIsVisible(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookie_decision', 'rejected');
    // Отключаем Яндекс.Метрику при отказе
    disableYandexMetrika();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
      <div className="flex flex-col space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">
          Использование cookies
        </h3>
        <p className="text-sm text-gray-600">
          Мы используем Яндекс.Метрику для анализа посещаемости сайта. 
          Это помогает нам улучшать наш сервис. Вы можете отказаться от сбора данных.
        </p>
        <div className="flex space-x-3">
          <button
            onClick={acceptCookies}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Принять
          </button>
          <button
            onClick={rejectCookies}
            className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors text-sm font-medium"
          >
            Отклонить
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;