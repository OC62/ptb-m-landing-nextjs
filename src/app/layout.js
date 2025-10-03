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
    default: 'ПТБ-М - Профессиональные решения в области предоставления услуг в сфере транспортной безопасности',
    template: `%s | ООО "ПТБ-М"`
  },
  description: 'Компания ПТБ-М - лидер в области предоставления услуг в сфере транспортной безопасности. Профессиональный подход, надежность и качество.',
  keywords: 'Защита объектов транспортной инфраструктуры, аудит, обучение, ПТБ-М',
  authors: [{ name: 'ООО "ПТБ-М"' }],
  robots: 'index, follow, max-image-preview:large',
  verification: {
    yandex: '6c8d32099a45287d',
  },
  openGraph: {
    title: 'ПТБ-М - Профессиональные решения в области предоставления услуг в сфере транспортной безопасности',
    description: 'Компания ПТБ-М - лидер в области предоставления услуг в сфере транспортной безопасности',
    url: 'https://www.xn----9sb8ajp.xn--p1ai',
    siteName: 'ООО "ПТБ-М"',
    images: [
      {
        url: '/images/og-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'ООО ПТБ-М - Профессиональные решения в области предоставления услуг в сфере транспортной безопасности',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ПТБ-М - Профессиональные решения в области предоставления услуг в сфере транспортной безопасности',
    description: 'Компания ПТБ-М - лидер в области предоставления услуг в сфере транспортной безопасности',
    images: ['/images/og-preview.jpg'],
  },
};

// Функция для генерации структурированных данных
function generateSchemaJSONLD() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ООО ПТБ-М",
    "description": "Комплексное обеспечение транспортной безопасности для объектов дорожного хозяйства",
    "url": "https://www.xn----9sb8ajp.xn--p1ai",
    "logo": "https://www.xn----9sb8ajp.xn--p1ai/images/logo.webp",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ул. Большая Садовая, 102",
      "addressLocality": "Ростов-на-Дону",
      "postalCode": "344019",
      "addressCountry": "RU"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+7-909-407-23-74",
      "contactType": "customer service",
      "email": "dtsm.rnd@gmail.com"
    }
  });
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        {/* Предподключение шрифтов */}
        <link 
          rel="preconnect" 
          href="https://fonts.googleapis.com" 
          crossOrigin="anonymous"
        />
        <link 
          rel="preconnect" 
          href="https://fonts.gstatic.com" 
          crossOrigin="anonymous"
        />
        
        {/* DNS prefetch для сторонних ресурсов */}
        <link rel="dns-prefetch" href="https://captcha-api.yandex.ru" />
        <link rel="dns-prefetch" href="https://smartcaptcha.yandexcloud.net" />

        <meta name="yandex-verification" content="6c8d32099a45287d" />
        <meta name="yandex-verification" content="f5bc48680f827787" />
        <meta name="google" content="notranslate" />
        
        {/* Favicon */}
        <link rel="icon" type="image/webp" href="/images/logo.webp" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateSchemaJSONLD(),
          }}
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

          {/* УБРАН Яндекс.Метрика - используем только Vercel Analytics */}

          <SpeedInsights />
          <Analytics />
        </ErrorBoundary>
      </body>
    </html>
  );
}