'use client';
import { useEffect } from 'react';

const SafeYandexMetrika = () => {
  useEffect(() => {
    // Загружаем Яндекс.Метрику только после полной инициализации React
    const timer = setTimeout(() => {
      if (typeof window === 'undefined') return;

      // Проверяем, не загружена ли уже метрика
      if (window.ym) return;

      const script = document.createElement('script');
      script.src = 'https://mc.yandex.ru/metrika/watch.js';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        // Используем безопасную инициализацию
        if (window.Ya && window.Ya.Metrika2) {
          try {
            window.ym = new window.Ya.Metrika2({
              id: 103534344,
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              webvisor: true,
              // КРИТИЧЕСКИ ВАЖНО: отключаем конфликтующие функции
              trackForms: false,
              triggerEvent: false,
              childIframe: false,
              // Минимальные настройки
              ut: 'noindex'
            });
            console.log('Yandex Metrika initialized safely');
          } catch (error) {
            console.error('Safe Metrika initialization failed:', error);
          }
        }
      };
      
      document.head.appendChild(script);
    }, 3000); // Задержка 3 секунды для полной загрузки React

    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default SafeYandexMetrika;