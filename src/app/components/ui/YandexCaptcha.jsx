'use client';

import { useEffect, useRef, useState } from 'react';

const YandexCaptcha = ({ onLoad, onError, sitekey = 'YOUR_SITE_KEY_HERE' }) => {
  const captchaContainerRef = useRef(null);
  const captchaRef = useRef(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const initCaptcha = () => {
      if (!captchaContainerRef.current || !window.smartCaptcha) {
        setStatus('error');
        onError?.('Captcha script not loaded');
        return;
      }

      try {
        // Очищаем предыдущий инстанс
        if (captchaRef.current) {
          try {
            window.smartCaptcha.destroy(captchaRef.current);
          } catch (e) {
            console.warn('Error destroying previous captcha:', e);
          }
        }

        // Создаем изолированный контейнер
        const container = document.createElement('div');
        container.className = 'smart-captcha';
        captchaContainerRef.current.innerHTML = '';
        captchaContainerRef.current.appendChild(container);

        captchaRef.current = window.smartCaptcha.render(container, {
          sitekey: sitekey,
          callback: (token) => {
            setStatus('success');
            onLoad?.(token);
          },
          'error-callback': (error) => {
            setStatus('error');
            onError?.(error);
          },
        });

        setStatus('ready');
      } catch (error) {
        console.error('Captcha init error:', error);
        setStatus('error');
        onError?.(error);
      }
    };

    const loadCaptchaScript = () => {
      if (window.smartCaptcha) {
        initCaptcha();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://captcha-api.yandex.ru/captcha.js?render=onload&onload=onYandexCaptchaLoad';
      script.async = true;
      
      window.onYandexCaptchaLoad = () => {
        setTimeout(initCaptcha, 100);
      };

      script.onerror = () => {
        setStatus('error');
        onError?.('Failed to load captcha script');
      };

      document.head.appendChild(script);
    };

    loadCaptchaScript();

    return () => {
      if (captchaRef.current && window.smartCaptcha) {
        try {
          window.smartCaptcha.destroy(captchaRef.current);
        } catch (e) {
          console.warn('Error cleaning up captcha:', e);
        }
      }
    };
  }, [onLoad, onError, sitekey]);

  return (
    <div 
      ref={captchaContainerRef}
      className="yandex-captcha-container min-h-[85px] flex items-center justify-center"
      aria-live="polite"
      aria-label="Загрузка проверки безопасности"
    >
      {status === 'loading' && (
        <div className="text-gray-500 text-sm">Загрузка проверки безопасности...</div>
      )}
      {status === 'error' && (
        <div className="text-red-500 text-sm">
          Ошибка загрузки проверки безопасности. Пожалуйста, обновите страницу.
        </div>
      )}
    </div>
  );
};

export default YandexCaptcha;