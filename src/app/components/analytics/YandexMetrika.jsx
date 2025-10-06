// src/app/components/analytics/YandexMetrika.jsx
'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const YANDEX_METRIKA_ID = 103534344;

export default function YandexMetrika() {
  useEffect(() => {
    // Ждем полной загрузки страницы
    const initMetrika = () => {
      if (typeof window === 'undefined') return;
      
      // Проверяем блокировку
      const isBlocked = 
        localStorage?.getItem('ym_disable') === '1' ||
        localStorage?.getItem('cookie_decision') === 'rejected';

      if (isBlocked) {
        console.log('🔴 Яндекс.Метрика отключена пользователем');
        return;
      }

      // Защищенная инициализация
      try {
        if (!window.ym) {
          window.ym = function() {
            (window.ym.a = window.ym.a || []).push(arguments);
          };
          window.ym.l = Date.now();
        }

        // Минимальная конфигурация
        window.ym(YANDEX_METRIKA_ID, 'init', {
          clickmap: false,
          trackLinks: false,
          accurateTrackBounce: false,
          webvisor: false,
          trackHash: false,
          ecommerce: false,
          ut: 'noindex'
        });

        console.log('🟢 Яндекс.Метрика инициализирована, ID:', YANDEX_METRIKA_ID);
        
        // Принудительно отправляем pageview
        setTimeout(() => {
          if (window.ym) {
            window.ym(YANDEX_METRIKA_ID, 'hit', window.location.href);
            console.log('📊 PageView отправлен в Яндекс.Метрику');
          }
        }, 2000);
        
      } catch (error) {
        console.warn('⚠️ Ошибка инициализации Яндекс.Метрики:', error);
      }
    };

    // Запускаем после полной загрузки
    if (document.readyState === 'complete') {
      initMetrika();
    } else {
      window.addEventListener('load', initMetrika);
    }

    return () => {
      window.removeEventListener('load', initMetrika);
    };
  }, []);

  // Не рендерим если пользователь отказался
  if (typeof window !== 'undefined') {
    const isBlocked = 
      localStorage?.getItem('ym_disable') === '1' ||
      localStorage?.getItem('cookie_decision') === 'rejected';
    
    if (isBlocked) {
      console.log('🔴 Яндекс.Метрика не загружена - пользователь отказался');
      return null;
    }
  }

  return (
    <>
      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        src="https://mc.yandex.ru/metrika/tag.js"
        onLoad={() => {
          console.log('🟢 Скрипт Яндекс.Метрики загружен');
        }}
        onError={(e) => {
          console.warn('🔴 Ошибка загрузки скрипта Яндекс.Метрики:', e);
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
}