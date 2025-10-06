// src/app/components/analytics/YandexMetrika.jsx
'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const YANDEX_METRIKA_ID = 97540185;

const YandexMetrika = () => {
  useEffect(() => {
    // Безопасная инициализация Яндекс.Метрики
    const initYandexMetrika = () => {
      if (typeof window === 'undefined') return;

      // Проверяем, не заблокирована ли метрика
      const isBlocked = 
        window.localStorage?.getItem('ym_disable') === '1' ||
        navigator.doNotTrack === '1' ||
        navigator.globalPrivacyControl;

      if (isBlocked) {
        console.log('Yandex Metrika blocked by user preferences');
        return;
      }

      // Создаем глобальную функцию ym если ее нет
      if (!window.ym) {
        window.ym = function() {
          (window.ym.a = window.ym.a || []).push(arguments);
        };
        window.ym.l = Date.now();
      }

      // Инициализируем счетчик
      try {
        window.ym(YANDEX_METRIKA_ID, 'init', {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
          trackHash: true,
          ecommerce: false,
          // Отключаем рекламные функции чтобы избежать блокировки
          ut: 'noindex'
        });
        
        console.log('Yandex Metrika initialized successfully');
      } catch (error) {
        console.error('Yandex Metrika initialization error:', error);
      }
    };

    // Запускаем инициализацию
    initYandexMetrika();
  }, []);

  return (
    <>
      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        src="https://mc.yandex.ru/metrika/tag.js"
        onLoad={() => {
          // Дополнительная инициализация после загрузки скрипта
          if (typeof window !== 'undefined' && window.ym && YANDEX_METRIKA_ID) {
            try {
              window.ym(YANDEX_METRIKA_ID, 'init', {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true,
                trackHash: true,
                ecommerce: false,
                ut: 'noindex'
              });
            } catch (error) {
              console.error('Yandex Metrika onLoad error:', error);
            }
          }
        }}
        onError={(e) => {
          console.error('Yandex Metrika script failed to load', e);
        }}
      />
      
      {/* Noscript для случаев с отключенным JavaScript */}
      <noscript>
        <div>
          <img 
            src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
            style={{ 
              position: 'absolute', 
              left: '-9999px',
              width: '1px',
              height: '1px'
            }} 
            alt=""
            loading="lazy"
          />
        </div>
      </noscript>
    </>
  );
};

// Вспомогательная функция для отправки событий
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