// src/app/components/analytics/YandexMetrika.jsx
'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const YANDEX_METRIKA_ID = 97540185;

const YandexMetrika = () => {
  useEffect(() => {
    // Проверяем, не заблокирована ли метрика пользователем
    const isBlockedByUser = 
      localStorage?.getItem('ym_disable') === '1' ||
      navigator.doNotTrack === '1' ||
      navigator.globalPrivacyControl;

    if (isBlockedByUser) {
      console.log('Yandex Metrika blocked by user preferences');
      return;
    }

    // Инициализируем только один раз
    if (window.ym && window.ym.a && window.ym.a.length > 0) {
      console.log('Yandex Metrika already initialized');
      return;
    }

    // Создаем глобальную функцию ym
    window.ym = window.ym || function() {
      (window.ym.a = window.ym.a || []).push(arguments);
    };
    window.ym.l = Date.now();

    // Инициализируем счетчик
    try {
      window.ym(YANDEX_METRIKA_ID, 'init', {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
        trackHash: true,
        ecommerce: false,
        ut: 'noindex' // Отключаем рекламные функции
      });
    } catch (error) {
      console.error('Yandex Metrika init error:', error);
    }
  }, []);

  return (
    <>
      <Script
        id="yandex-metrika-script"
        strategy="afterInteractive"
        src="https://mc.yandex.ru/metrika/tag.js"
      />
      
      <noscript>
        <div>
          <img 
            src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
            style={{ position: 'absolute', left: '-9999px' }} 
            alt=""
          />
        </div>
      </noscript>
    </>
  );
};

export default YandexMetrika;