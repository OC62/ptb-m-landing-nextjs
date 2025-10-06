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
        // Создаем отдельный div для капчи внутри контейнера
        const captchaDiv = document.createElement('div');
        captchaDiv.className = 'yandex-captcha-wrapper';
        captchaDiv.style.width = '100%';
        captchaDiv.style.minHeight = '140px';
        captchaDiv.style.display = 'flex';
        captchaDiv.style.alignItems = 'center';
        captchaDiv.style.justifyContent = 'center';
        
        captchaContainerRef.current.innerHTML = '';
        captchaContainerRef.current.appendChild(captchaDiv);

        window.smartCaptcha.render(captchaDiv, {
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

    // Проверяем, не загружен ли уже скрипт
    if (window.smartCaptcha) {
      initCaptcha();
      return;
    }

    // Создаем глобальную функцию обратного вызова
    window.onYandexCaptchaLoad = initCaptcha;

    // Загружаем скрипт
    const script = document.createElement('script');
    script.src = 'https://captcha-api.yandex.ru/captcha.js?render=onload&onload=onYandexCaptchaLoad';
    script.async = true;

    script.onerror = () => {
      console.error('Failed to load captcha script');
    };

    document.head.appendChild(script);

    // Очистка
    return () => {
      if (window.onYandexCaptchaLoad) {
        delete window.onYandexCaptchaLoad;
      }
      if (captchaContainerRef.current) {
        captchaContainerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="standalone-captcha w-full">
      <div className="mb-2 text-sm text-gray-600">
        Подтвердите, что вы не робот
      </div>
      
      <div 
        ref={captchaContainerRef}
        className="captcha-container w-full min-h-[160px] border border-gray-300 rounded-lg bg-white flex items-center justify-center p-4"
      >
        {!isLoaded && (
          <div className="text-gray-500 text-sm">
            Загрузка проверки безопасности...
          </div>
        )}
      </div>
      
      <div className="mt-2 text-xs text-gray-500">
        Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности
      </div>
    </div>
  );
};

export default StandaloneCaptcha;