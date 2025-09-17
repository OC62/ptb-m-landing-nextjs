// nextjs/src/app/components/layout/CookieBanner.jsx
'use client';

import { useState, useEffect } from 'react';
import GlassmorphicButton from '../ui/GlassmorphicButton';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
    // Здесь можно инициализировать Яндекс.Метрику, Google Analytics и т.д.
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
    // Отключить все скрипты аналитики
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-[9999] shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm">
            Мы используем cookies для улучшения работы сайта и аналитики. Продолжая использовать сайт, вы соглашаетесь с{' '}
            <a href="/policy" className="underline hover:text-blue-300">
              политикой конфиденциальности
            </a>.
          </p>
          <div className="flex space-x-2">
            <GlassmorphicButton
              onClick={acceptCookies}
              variant="onWhite"
              size="large"
              className="text-xs"
            >
              Принять
            </GlassmorphicButton>
            <GlassmorphicButton
              onClick={declineCookies}
              variant="onWhite"
              size="large"
              className="text-xs"
            >
              Отклонить
            </GlassmorphicButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;