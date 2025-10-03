'use client';
import { useEffect } from 'react';

const SafeMetrics = () => {
  useEffect(() => {
    // Загрузка после полной инициализации React
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && !window.ym) {
        const script = document.createElement('script');
        script.src = 'https://mc.yandex.ru/metrika/watch.js';
        script.async = true;
        script.defer = true;
        
        script.onload = () => {
          if (window.Ya && window.Ya.Metrika2) {
            try {
              window.ym = new window.Ya.Metrika2({
                id: 103534344,
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true,
                trackForms: false, // ВАЖНО: отключаем отслеживание форм
                triggerEvent: false, // ВАЖНО: отключаем триггеры
                childIframe: false,
                // Минимальные безопасные настройки
              });
              console.log('Yandex Metrika initialized safely in component');
            } catch (error) {
              console.error('Safe Metrika initialization failed:', error);
            }
          }
        };
        
        document.head.appendChild(script);
      }
    }, 3000); // Задержка 3 секунды для полной загрузки React

    return () => clearTimeout(timer);
  }, []);

  // Функция для безопасной отправки целей
  const safeReachGoal = (goalName) => {
    if (window.ym && typeof window.ym.reachGoal === 'function') {
      try {
        setTimeout(() => {
          window.ym.reachGoal(goalName);
        }, 100);
      } catch (e) {
        console.warn('Safe goal error:', e);
      }
    }
  };

  return null;
};

export default SafeMetrics;