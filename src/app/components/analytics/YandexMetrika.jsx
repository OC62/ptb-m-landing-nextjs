// src/app/components/analytics/YandexMetrika.jsx
'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const YANDEX_METRIKA_ID = 103534344; // Используйте правильный ID

const YandexMetrika = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Проверяем блокировку
    const isBlockedByUser = 
      localStorage?.getItem('ym_disable') === '1' ||
      navigator.doNotTrack === '1' ||
      navigator.globalPrivacyControl;

    if (isBlockedByUser) {
      return;
    }

    // Проверяем существующую инициализацию
    if (window.ym && window.ym._isInitialized) {
      return;
    }

    window.ym = window.ym || function() {
      (window.ym.a = window.ym.a || []).push(arguments);
    };
    window.ym.l = Date.now();
    window.ym._isInitialized = true;

    // Минимальная конфигурация
    try {
      window.ym(YANDEX_METRIKA_ID, 'init', {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: false, // Отключаем вебвизор для уменьшения ошибок
        trackHash: false,
        ecommerce: false,
        ut: 'noindex'
      });
    } catch (error) {
      console.warn('Yandex Metrika init error:', error);
    }
  }, []);

  return (
    <>
      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        src="https://mc.yandex.ru/metrika/tag.js"
        onError={(e) => console.warn('Yandex Metrika script failed to load:', e)}
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