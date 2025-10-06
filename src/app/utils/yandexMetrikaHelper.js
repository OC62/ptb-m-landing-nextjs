// src/app/utils/yandexMetrikaHelper.js
const YANDEX_METRIKA_ID = 103534344; // Исправьте ID

export const isYandexMetrikaAvailable = () => {
  if (typeof window === 'undefined') return false;
  
  return !(
    window.localStorage?.getItem('ym_disable') === '1' ||
    navigator.doNotTrack === '1' ||
    navigator.globalPrivacyControl
  );
};

export const safeYandexMetrikaEvent = (eventName, eventParams = {}) => {
  if (!isYandexMetrikaAvailable()) return false;
  
  try {
    if (window.ym && typeof window.ym === 'function') {
      window.ym(YANDEX_METRIKA_ID, 'reachGoal', eventName, eventParams);
      return true;
    }
  } catch (error) {
    console.warn('Yandex Metrika event failed:', error);
  }
  
  return false;
};

// Аналогично обновите хук useYandexMetrica