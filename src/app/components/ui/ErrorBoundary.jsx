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

          {/* Безопасная версия Яндекс.Метрики */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(m,e,t,r,i,k,a){
                  // Проверяем, не загружен ли уже скрипт
                  if (document.querySelector('script[src="' + r + '"]')) return;
                  
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  
                  // Создаем и настраиваем script элемент
                  k=e.createElement(t);
                  a=e.getElementsByTagName(t)[0];
                  k.async=1;
                  k.src=r;
                  k.onload=function(){
                    console.log('Yandex Metrika loaded successfully');
                    
                    // Инициализируем счетчик после загрузки
                    setTimeout(function() {
                      if (typeof ym === 'function') {
                        ym(103534344, "init", {
                          defer: true,
                          clickmap: true,
                          trackLinks: true,
                          accurateTrackBounce: true,
                          webvisor: true,
                          // Отключаем опасные функции, которые могут конфликтовать с React
                          trackForms: false, // Отключаем отслеживание форм чтобы избежать конфликтов
                          triggerEvent: false
                        });
                      }
                    }, 500);
                  };
                  
                  a.parentNode.insertBefore(k,a);
                })(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
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