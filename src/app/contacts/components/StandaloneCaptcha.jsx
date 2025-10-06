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
          // Явно указываем уровень надежности и отключаем проблемные функции
          robustnessLevel: 'easy',
          webview: false,
          hideChallengeContainer: false
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

    // Загружаем скрипт с улучшенными параметрами
    const script = document.createElement('script');
    script.src = 'https://captcha-api.yandex.ru/captcha.js?render=onload';
    script.async = true;
    script.defer = true;
    
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
    <div className="standalone-captcha w-full">
      <div className="mb-3 text-sm text-gray-600 text-center">
        Подтвердите, что вы не робот
      </div>
      
      <div 
        ref={captchaContainerRef}
        className="captcha-container w-full min-h-[140px] border border-gray-300 rounded-lg bg-white flex items-center justify-center overflow-visible"
      />
      
      <div className="mt-3 text-xs text-gray-500 text-center">
        Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности
      </div>
    </div>
  );
};

export default StandaloneCaptcha;