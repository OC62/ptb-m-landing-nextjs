// src/app/layout.js
import './globals.css';
import { Inter } from 'next/font/google';
import Preloader from '@/app/components/ui/Preloader';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import Script from 'next/script';
import CookieBanner from '@/app/components/layout/CookieBanner';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'] });

// !! ОБНОВЛЁННАЯ SCHEMA.ORG РАЗМЕТКА !!
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization", // Или "LocalBusiness", если фокус на регион
  "name": "ООО \"ПТБ-М\"",
  "url": "https://xn----9sb8ajp.xn--p1ai", // !! Проверьте URL !!
  "logo": "https://xn----9sb8ajp.xn--p1ai/images/logo.webp", // !! Проверьте URL !!
  "description": "Обеспечение транспортной безопасности объектов дорожного хозяйства. ООО ПТБ-М. Аудит, мониторинг, обучение, техническое оснащение.",
  // !! ДОБАВЛЕН АДРЕС !!
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ул. Большая Садовая, 102, офис 15",
    "addressLocality": "Ростов-на-Дону",
    "addressRegion": "Ростовская область", // !! ДОБАВЛЕНО !!
    "postalCode": "344019",
    "addressCountry": "RU"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+7-909-407-23-74",
    "contactType": "customer service",
    "email": "dtsm.rnd@gmail.com",
    // !! ДОБАВЛЕНО areaServed !!
    "areaServed": [
      {
        "@type": "City",
        "name": "Ростов-на-Дону"
      },
      {
        "@type": "State",
        "name": "Ростовская область"
      },
      {
        "@type": "Country",
        "name": "Россия"
      }
    ],
    "availableLanguage": ["Russian"]
  },
  // !! ДОБАВЛЕНО sameAs !!
  "sameAs": [
    "https://vk.com/ptbm_rnd",
    "https://t.me/ptbm_rnd"
  ],
  // !! ДОБАВЛЕНО foundingDate !!
  "foundingDate": "2017", // Уточните год основания
  // !! ДОБАВЛЕНО serviceArea !!
  "serviceArea": {
    "@type": "AdministrativeArea",
    "name": "Ростов-на-Дону и Ростовская область, Россия"
  },
  // !! ДОБАВЛЕНО mainEntityOfPage !!
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://xn----9sb8ajp.xn--p1ai"
  }
};

export const metadata = {
  // !! ГЛОБАЛЬНЫЕ МЕТАДАННЫЕ !!
  // !! Эти значения могут быть ПЕРЕОПРЕДЕЛЕНЫ в конкретных page.js !!
  title: {
    default: 'ООО "ПТБ-М" | Комплексное обеспечение транспортной безопасности',
    template: '%s | ООО "ПТБ-М"'
  },
  description: 'ООО "ПТБ-М". Обеспечение транспортной безопасности объектов дорожного хозяйства. Аудит, мониторинг, оснащение, обучение. Работаем по всей России.',
  keywords: 'транспортная безопасность, ПТБ, ОТИ, аудит, мониторинг, обучение, Ростов-на-Дону, Подразделение транспортной безопасности, ПТБ-М',
  authors: [{ name: 'ООО ПТБ-М' }],
  creator: 'ООО ПТБ-М',
  publisher: 'ООО ПТБ-М',
  robots: 'index, follow',
  verification: {
    yandex: 'f5bc48680f827787',
  },
  openGraph: {
    title: 'ООО "ПТБ-М" | Профессионалы в области транспортной безопасности',
    description: 'Обеспечиваем транспортную безопасность на объектах дорожного хозяйства с 2017 года. Комплексный подход, лицензии, квалифицированные специалисты.',
    url: 'https://xn----9sb8ajp.xn--p1ai',
    siteName: 'ООО ПТБ-М',
    images: [
      {
        url: '/images/og-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'ООО ПТБ-М - Транспортная безопасность',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ООО "ПТБ-М" | Профессионалы в области транспортной безопасности',
    description: 'Обеспечиваем транспортную безопасность на объектах дорожного хозяйства с 2017 года.',
    images: ['/images/og-preview.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <meta name="google" content="notranslate" />
        <link rel="icon" type="image/webp" href="/images/logo.webp" />
        <link rel="icon" type="image/png" sizes="120x120" href="/images/favicon-120x120.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />

        {/* DNS Prefetch для внешних ресурсов */}
        <link rel="preconnect" href="https://smartcaptcha.yandexcloud.net" />
        <link rel="preconnect" href="https://mc.yandex.ru" />
        <link rel="preconnect" href="https://yastatic.net" />
        <link rel="dns-prefetch" href="https://smartcaptcha.yandexcloud.net" />
        <link rel="dns-prefetch" href="https://mc.yandex.ru" />
        <link rel="dns-prefetch" href="https://yastatic.net" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={inter.className}>
        <Preloader />
        <div className="main-content">
          <Header />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
        </div>

        <Script
          src="https://smartcaptcha.yandexcloud.net/captcha.js"
          strategy="afterInteractive"
        />

        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();

                for (var j = 0; j < document.scripts.length; j++) {
                  if (document.scripts[j].src === r) { return; }
                }

                k=e.createElement(t),a=e.getElementsByTagName(t)[0];
                k.async=1;
                k.src=r;
                a.parentNode.insertBefore(k,a);
              })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(103534344, "init", {
                defer: true,
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: false,
                ecommerce: false,
                triggerEvent: false
              });
            `,
          }}
        />

        <noscript>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://mc.yandex.ru/watch/103534344"
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
              width="1"
              height="1"
            />
          </div>
        </noscript>

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}