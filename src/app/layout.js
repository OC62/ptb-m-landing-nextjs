import './globals.css';
import { Inter } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import SafeMetrics from '@/app/components/analytics/SafeMetrics';

// ... остальные импорты

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        {/* ... остальной head контент */}
      </head>
      <body className={`${inter.className} antialiased`}>
        <ErrorBoundary>
          <div className="main-content">
            <Header />
            <main>{children}</main>
            <Footer />
            <CookieBanner />
          </div>

          {/* Улучшенная загрузка Яндекс Капчи */}
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

          {/* Безопасная метрика как компонент */}
          <SafeMetrics />

          <SpeedInsights />
          <Analytics />
        </ErrorBoundary>
      </body>
    </html>
  );
}