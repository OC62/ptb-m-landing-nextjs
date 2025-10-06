// src/app/utils/yandexMetrikaHelper.js
/**
 * Вспомогательные функции для работы с Яндекс.Метрикой
 */

const YANDEX_METRIKA_ID = 97540185;

// Проверяем, доступна ли Яндекс.Метрика
export const isYandexMetrikaAvailable = () => {
  if (typeof window === 'undefined') return false;
  
  return !(
    window.localStorage?.getItem('ym_disable') === '1' ||
    navigator.doNotTrack === '1' ||
    navigator.globalPrivacyControl ||
    // Проверяем блокировщики рекламы
    document.querySelector('script[src*="mc.yandex.ru"]') === null
  );
};

// Безопасная отправка событий
export const safeYandexMetrikaEvent = (eventName, eventParams = {}) => {
  if (!isYandexMetrikaAvailable()) return false;
  
  try {
    if (window.ym && YANDEX_METRIKA_ID) {
      window.ym(YANDEX_METRIKA_ID, 'reachGoal', eventName, eventParams);
      return true;
    }
  } catch (error) {
    console.warn('Yandex Metrika event failed:', error);
  }
  
  return false;
};

// Отправка pageview
export const safeYandexMetrikaPageView = (url = null) => {
  if (!isYandexMetrikaAvailable()) return false;
  
  try {
    if (window.ym && YANDEX_METRIKA_ID) {
      window.ym(YANDEX_METRIKA_ID, 'hit', url || window.location.pathname);
      return true;
    }
  } catch (error) {
    console.warn('Yandex Metrika pageview failed:', error);
  }
  
  return false;
};

// Функция для отключения метрики (для GDPR/пользовательских предпочтений)
export const disableYandexMetrika = () => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('ym_disable', '1');
      // Очищаем существующие данные
      if (window.ym) {
        delete window.ym;
      }
    } catch (error) {
      console.warn('Failed to disable Yandex Metrika:', error);
    }
  }
};