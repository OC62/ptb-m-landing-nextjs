// src/app/components/analytics/YandexMetrika.jsx
'use client';

const YANDEX_METRIKA_ID = 103534344;

export default function YandexMetrika() {
  // ТОЛЬКО noscript версия - никакого JavaScript
  return (
    <noscript>
      <div>
        <img 
          src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
          style={{ position: 'absolute', left: '-9999px' }} 
          alt="" 
        />
      </div>
    </noscript>
  );
}