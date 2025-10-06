import './globals.css';
import { Inter } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

// Импорты с использованием алиасов из jsconfig.json
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/layout/CookieBanner';
import ErrorBoundary from '@/components/ui/ErrorBoundary';

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export const metadata = {
  // ... остальная metadata без изменений
};

function generateSchemaJSONLD() {
  // ... без изменений
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        {/* ... head без изменений */}
      </head>
      <body className={`${inter.className} antialiased`}>
        <ErrorBoundary>
          <div className="main-content">
            <Header />
            <main>{children}</main>
            <Footer />
            <CookieBanner />
          </div>

          {/* Улучшенная загрузка Яндекс Капчи (оставьте на будущее) */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  function loadCaptcha() {
                    if (typeof window !== 'undefined' && !window.smartCaptcha) {
                      var script = document.createElement('script');
                      script.src = 'https://smartcaptcha.yandexcloud.net/captcha.js?render=onload&onload=onYandexCaptchaLoad';
                      script.async = true;
                      script.defer = true;
                      document.head.appendChild(script);
                    }
                  }
                  
                  window.onYandexCaptchaLoad = function() {
                    console.log('Yandex Captcha loaded successfully');
                  };
                  
                  if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', loadCaptcha);
                  } else {
                    loadCaptcha();
                  }
                })();
              `,
            }}
          />

                  {/* Безопасная Яндекс.Метрика с отложенной загрузкой */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  // Ждем полной загрузки страницы
                  if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', initMetrika);
                  } else {
                    setTimeout(initMetrika, 3000);
                  }
                  
                  function initMetrika() {
                    // Проверяем, не загружена ли уже метрика
                    if (window.ym || document.querySelector('script[src*="mc.yandex.ru"]')) {
                      return;
                    }
                    
                    var script = document.createElement('script');
                    script.src = 'https://mc.yandex.ru/metrika/tag.js';
                    script.async = true;
                    script.defer = true;
                    
                    script.onload = function() {
                      console.log('Yandex Metrika loaded safely');
                      
                      // Минимальная инициализация чтобы избежать конфликтов
                      if (typeof ym === 'function') {
                        ym(103534344, 'init', {
                          defer: true,
                          clickmap: true,
                          trackLinks: true,
                          accurateTrackBounce: true,
                          webvisor: false, // Отключаем вебвизор для уменьшения конфликтов
                          trackForms: false, // Полностью отключаем отслеживание форм
                          triggerEvent: false,
                          trackHash: false,
                          ecommerce: false
                        });
                      }
                    };
                    
                    script.onerror = function() {
                      console.warn('Yandex Metrika failed to load');
                    };
                    
                    document.head.appendChild(script);
                  }
                })();
              `,
            }}
          />

          <SpeedInsights />
          <Analytics />
        </ErrorBoundary>
      </body>
    </html>
  );
}