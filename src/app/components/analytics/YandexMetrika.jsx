// src/app/components/analytics/YandexMetrika.jsx
'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const YANDEX_METRIKA_ID = 103534344;

export default function YandexMetrika() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Проверяем блокировку
    const isBlocked = 
      localStorage?.getItem('ym_disable') === '1' ||
      localStorage?.getItem('cookie_decision') === 'rejected' ||
      navigator.doNotTrack === '1';

    if (isBlocked) {
      console.log('Yandex Metrika disabled by user');
      return;
    }

    // Проверяем существующую инициализацию
    if (window.ym && window.ym._init) return;

    window.ym = window.ym || function() {
      (window.ym.a = window.ym.a || []).push(arguments);
    };
    window.ym.l = Date.now();
    window.ym._init = true;

    try {
      window.ym(YANDEX_METRIKA_ID, 'init', {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: false, // Отключаем вебвизор
        trackHash: false,
        ecommerce: false,
        ut: 'noindex'
      });
    } catch (error) {
      console.warn('Yandex Metrika init error:', error);
    }
  }, []);

  // Не рендерим скрипт если метрика отключена
  if (typeof window !== 'undefined') {
    const isBlocked = 
      localStorage?.getItem('ym_disable') === '1' ||
      localStorage?.getItem('cookie_decision') === 'rejected';
    
    if (isBlocked) return null;
  }

  return (
    <>
      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        src="https://mc.yandex.ru/metrika/tag.js"
        onError={(e) => console.warn('Yandex Metrika script failed to load')}
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
}