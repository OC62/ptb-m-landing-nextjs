// src/app/components/analytics/YandexMetrika.jsx
'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const YANDEX_METRIKA_ID = 103534344; // ЗАМЕНИТЕ НА ЭТОТ ID

export default function YandexMetrika() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const cookiesAccepted = localStorage?.getItem('cookie_decision') === 'accepted';
    const cookiesRejected = localStorage?.getItem('cookie_decision') === 'rejected';
    
    if (cookiesRejected) return;
    if (!cookiesAccepted && !window.ym) return;

    window.ym = window.ym || function() {(window.ym.a = window.ym.a || []).push(arguments);};
    window.ym.l = new Date();
    
    try {
      window.ym(YANDEX_METRIKA_ID, 'init', {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: false,
        childIframe: false,
        noIndex: true,
        ecommerce: false
      });
    } catch (error) {
      console.warn('Yandex Metrika init error:', error);
    }
  }, []);

  if (typeof window !== 'undefined' && localStorage?.getItem('cookie_decision') === 'rejected') {
    return null;
  }

  return (
    <>
      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        src="https://mc.yandex.ru/metrika/tag.js"
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