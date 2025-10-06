'use client';

import { useEffect } from 'react';

const YandexMetrika = () => {
  useEffect(() => {
    // Проверяем, не заблокирована ли Метрика
    const isMetrikaBlocked = () => {
      return typeof window === 'undefined' || 
             window.ym === undefined || 
             navigator.doNotTrack === '1' ||
             navigator.globalPrivacyControl;
    };

    if (isMetrikaBlocked()) {
      console.log('Yandex Metrika blocked by user preferences');
      return;
    }

    try {
      // Создаем скрипт Метрики
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML = `
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        
        ym(97540185, "init", {
          clickmap:true,
          trackLinks:true,
          accurateTrackBounce:true,
          webvisor:true,
          ecommerce:"dataLayer",
          defer: true
        });
      `;
      
      document.head.appendChild(script);
      
      // Добавляем noscript для случаев, когда JavaScript отключен
      const noscript = document.createElement('noscript');
      noscript.innerHTML = `
        <div><img src="https://mc.yandex.ru/watch/97540185" style="position:absolute; left:-9999px;" alt="" /></div>
      `;
      document.body.appendChild(noscript);

      console.log('Yandex Metrika loaded safely');
    } catch (error) {
      console.error('Yandex Metrika loading error:', error);
    }
  }, []);

  return null;
};

export default YandexMetrika;