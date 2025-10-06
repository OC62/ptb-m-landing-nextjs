// src/app/hooks/useYandexMetrica.js
'use client';

import { useCallback } from 'react';

const YANDEX_METRIKA_ID = 97540185;

export const useYandexMetrica = () => {
  const sendEvent = useCallback((eventName, eventParams = {}) => {
    if (typeof window !== 'undefined' && window.ym && process.env.NODE_ENV === 'production') {
      try {
        window.ym(YANDEX_METRIKA_ID, 'reachGoal', eventName, eventParams);
        console.log(`Yandex Metrika event sent: ${eventName}`, eventParams);
      } catch (error) {
        console.error('Yandex Metrika event error:', error);
      }
    }
  }, []);

  const sendPageView = useCallback((url = null) => {
    if (typeof window !== 'undefined' && window.ym && process.env.NODE_ENV === 'production') {
      try {
        window.ym(YANDEX_METRIKA_ID, 'hit', url || window.location.pathname);
        console.log('Yandex Metrika pageview sent');
      } catch (error) {
        console.error('Yandex Metrika pageview error:', error);
      }
    }
  }, []);

  return {
    sendEvent,
    sendPageView
  };
};