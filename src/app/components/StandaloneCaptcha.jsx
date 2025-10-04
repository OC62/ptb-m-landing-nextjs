'use client';

import { useEffect, useRef, useState } from 'react';

const StandaloneCaptcha = () => {
  const captchaContainerRef = useRef(null);
  const [status, setStatus] = useState('loading');
  const [token, setToken] = useState('');

  useEffect(() => {
    const initCaptcha = () => {
      if (!captchaContainerRef.current || !window.smartCaptcha) {
        setStatus('error');
        return;
      }

      try {
        // Создаем изолированный контейнер
        const container = document.createElement('div');
        container.className = 'smart-captcha';
        captchaContainerRef.current.innerHTML = '';
        captchaContainerRef.current.appendChild(container);

        window.smartCaptcha.render(container, {
          sitekey: 'ysc1_681R2JVIY5o2ATwA42ZLkMeQdsQFKMu1eVaFX7Zm00b26bf0', // ЗАМЕНИТЕ НА РЕАЛЬНЫЙ КЛЮЧ
          callback: (captchaToken) => {
            setToken(captchaToken);
            setStatus('success');
            // Сохраняем токен в localStorage для использования в форме
            localStorage.setItem('yandex_captcha_token', captchaToken);
            localStorage.setItem('yandex_captcha_timestamp', Date.now().toString());
          },
          'error-callback': (error) => {
            console.error('Captcha error:', error);
            setStatus('error');
          },
        });

        setStatus('ready');
      } catch (error) {
        console.error('Captcha init error:', error);
        setStatus('error');
      }
    };

    const loadCaptchaScript = () => {
      if (window.smartCaptcha) {
        initCaptcha();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://captcha-api.yandex.ru/captcha.js?render=onload&onload=onStandaloneCaptchaLoad';
      script.async = true;
      
      window.onStandaloneCaptchaLoad = () => {
        setTimeout(initCaptcha, 100);
      };

      script.onerror = () => {
        setStatus('error');
      };

      document.head.appendChild(script);
    };

    // Очищаем старые токены при загрузке
    localStorage.removeItem('yandex_captcha_token');
    localStorage.removeItem('yandex_captcha_timestamp');

    loadCaptchaScript();

    return () => {
      // Очищаем при размонтировании
      localStorage.removeItem('yandex_captcha_token');
      localStorage.removeItem('yandex_captcha_timestamp');
    };
  }, []);

  const getTokenStatus = () => {
    if (!token) return 'not-received';
    
    const timestamp = localStorage.getItem('yandex_captcha_timestamp');
    if (timestamp && (Date.now() - parseInt(timestamp)) < 120000) { // 2 минуты
      return 'valid';
    }
    return 'expired';
  };

  const tokenStatus = getTokenStatus();

  return (
    <div className="standalone-captcha">
      <div 
        ref={captchaContainerRef}
        className="captcha-container min-h-[85px] flex items-center justify-center border border-gray-300 rounded-lg bg-white"
      />
      
      {status === 'loading' && (
        <div className="text-blue-600 text-sm text-center mt-2">
          Загрузка проверки безопасности...
        </div>
      )}
      
      {status === 'error' && (
        <div className="text-red-600 text-sm text-center mt-2">
          Ошибка загрузки проверки безопасности. Обновите страницу.
        </div>
      )}
      
      {tokenStatus === 'valid' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
          <div className="flex items-center text-green-700">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Проверка пройдена успешно</span>
          </div>
          <p className="text-green-600 text-xs mt-1">
            Токен действителен в течение 2 минут. Вы можете отправить форму.
          </p>
        </div>
      )}
      
      {tokenStatus === 'expired' && token && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
          <div className="flex items-center text-yellow-700">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Токен истек</span>
          </div>
          <p className="text-yellow-600 text-xs mt-1">
            Пожалуйста, пройдите проверку снова.
          </p>
        </div>
      )}
    </div>
  );
};

export default StandaloneCaptcha;