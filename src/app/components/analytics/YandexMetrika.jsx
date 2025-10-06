// src/app/components/analytics/YandexMetrika.jsx
'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const YANDEX_METRIKA_ID = 97540185;

const YandexMetrika = () => {
  useEffect(() => {
    // Функция для безопасной инициализации
    const initMetrika = () => {
      if (typeof window === 'undefined' || !window.ym) return;

      try {
        window.ym(YANDEX_METRIKA_ID, 'init', {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
          trackHash: true,
          ecommerce: false,
        });
        
        console.log('Yandex Metrika initialized successfully');
      } catch (error) {
        console.error('Yandex Metrika initialization error:', error);
      }
    };

    // Инициализируем после загрузки скрипта
    if (window.ym) {
      initMetrika();
    } else {
      window.ym = window.ym || function() {
        (window.ym.a = window.ym.a || []).push(arguments);
      };
      window.ym.l = Date.now();
    }
  }, []);

  return (
    <>
      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        src="https://mc.yandex.ru/metrika/tag.js"
        onLoad={() => {
          if (window.ym && YANDEX_METRIKA_ID) {
            window.ym(YANDEX_METRIKA_ID, 'init', {
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              webvisor: true,
              trackHash: true
            });
          }
        }}
        onError={(e) => {
          console.error('Yandex Metrika script failed to load', e);
        }}
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

export const sendYandexMetricaEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.ym && YANDEX_METRIKA_ID) {
    try {
      window.ym(YANDEX_METRIKA_ID, 'reachGoal', eventName, eventParams);
    } catch (error) {
      console.error('Yandex Metrika event error:', error);
    }
  }
};

export default YandexMetrika;