'use client';

import { useEffect, useRef, useState } from 'react';

const StandaloneCaptcha = () => {
  const captchaContainerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initCaptcha = () => {
      if (!captchaContainerRef.current || !window.smartCaptcha) {
        console.error('Captcha container or script not found');
        return;
      }

      try {
        // Очищаем контейнер
        captchaContainerRef.current.innerHTML = '';

        window.smartCaptcha.render(captchaContainerRef.current, {
          sitekey: 'ysc1_681R2JVIY5o2ATwA42ZLkMeQdsQFKMu1eVaFX7Zm00b26bf0',
          callback: (token) => {
            localStorage.setItem('yandex_captcha_token', token);
            localStorage.setItem('yandex_captcha_timestamp', Date.now().toString());
          },
        });

        setIsLoaded(true);
      } catch (error) {
        console.error('Captcha init error:', error);
      }
    };

    // Если скрипт уже загружен
    if (window.smartCaptcha) {
      initCaptcha();
      return;
    }

    // Загружаем скрипт
    const script = document.createElement('script');
    script.src = 'https://captcha-api.yandex.ru/captcha.js';
    script.async = true;
    
    script.onload = () => {
      setTimeout(initCaptcha, 100);
    };

    script.onerror = () => {
      console.error('Failed to load captcha script');
    };

    document.head.appendChild(script);

    // Очистка
    return () => {
      if (captchaContainerRef.current) {
        captchaContainerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="standalone-captcha">
      <div 
        ref={captchaContainerRef}
        className="captcha-container min-h-[140px] w-full flex items-center justify-center border border-gray-300 rounded-lg bg-white overflow-hidden"
        style={{ minWidth: '300px' }}
      />
      
      {!isLoaded && (
        <div className="text-blue-600 text-sm text-center mt-2">
          Загрузка проверки безопасности...
        </div>
      )}
    </div>
  );
};

export default StandaloneCaptcha;