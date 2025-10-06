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
  title: {
    default: 'ООО "ПТБ-М" - Профессиональная транспортная безопасность',
    template: '%s | ООО "ПТБ-М"'
  },
  description: 'Комплексные решения по обеспечению транспортной безопасности. Аудит, мониторинг, обучение персонала, техническое оснащение объектов транспортной инфраструктуры.',
  keywords: ['транспортная безопасность', 'ПТБ', 'ОТИ', 'аудит безопасности', 'мониторинг', 'обучение персонала', 'техническое оснащение'],
  authors: [{ name: 'ООО "ПТБ-М"' }],
  creator: 'ООО "ПТБ-М"',
  publisher: 'ООО "ПТБ-М"',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ptb-m.ru'),
  alternates: {
    canonical: '/',
    languages: {
      'ru-RU': '/',
    },
  },
  openGraph: {
    title: 'ООО "ПТБ-М" - Профессиональная транспортная безопасность',
    description: 'Комплексные решения по обеспечению транспортной безопасности',
    url: 'https://ptb-m.ru',
    siteName: 'ООО "ПТБ-М"',
    images: [
      {
        url: '/og-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'ООО "ПТБ-М" - Профессиональная транспортная безопасность',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ООО "ПТБ-М" - Профессиональная транспортная безопасность',
    description: 'Комплексные решения по обеспечению транспортной безопасности',
    images: ['/og-preview.jpg'],
  },
  verification: {
    // Яндекс.Вебмастер
    yandex: 'your-yandex-verification-code',
    // Google Search Console
    google: 'your-google-verification-code',
  },
};

function generateSchemaJSONLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ООО "ПТБ-М"',
    description: 'Профессиональная транспортная безопасность',
    url: 'https://ptb-m.ru',
    logo: 'https://ptb-m.ru/logo.webp',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Большая Садовая, 102, офис 15',
      addressLocality: 'Ростов-на-Дону',
      postalCode: '344019',
      addressCountry: 'RU',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+7 (909) 407-23-74',
      contactType: 'customer service',
      email: 'info@ptb-m.ru',
      areaServed: 'RU',
      availableLanguage: 'Russian',
    },
    sameAs: [
      // Добавьте ссылки на соцсети при наличии
    ]
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        {/* Базовые мета-теги */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Фавиконки */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Предзагрузка только критических изображений */}
        <link 
          rel="preload" 
          href="/images/bg_Hero.webp" 
          as="image" 
        />
        
        {/* JSON-LD структурированные данные */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchemaJSONLD()) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ErrorBoundary>
          <div className="main-content">
            <Header />
            <main>{children}</main>
            <Footer />
            <CookieBanner />
          </div>

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