// src/app/components/analytics/YandexMetrika.jsx
'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const YANDEX_METRIKA_ID = 103534344;

export default function YandexMetrika() {
  useEffect(() => {
    // Ждем немного перед инициализацией
    const timer = setTimeout(() => {
      if (typeof window === 'undefined') return;

      // Проверяем блокировку
      const isBlocked = 
        localStorage?.getItem('ym_disable') === '1' ||
        localStorage?.getItem('cookie_decision') === 'rejected';

      if (isBlocked) {
        console.log('Yandex Metrika disabled by user');
        return;
      }

      // Инициализация
      if (!window.ym) {
        window.ym = function() {
          (window.ym.a = window.ym.a || []).push(arguments);
        };
        window.ym.l = Date.now();
      }

      // Инициализация счетчика
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
        
        console.log('Yandex Metrika initialized with ID:', YANDEX_METRIKA_ID);
      } catch (error) {
        console.warn('Yandex Metrika init error:', error);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Не загружаем если пользователь отказался
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
        onLoad={() => console.log('Yandex Metrika script loaded')}
        onError={() => console.warn('Yandex Metrika script failed to load')}
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