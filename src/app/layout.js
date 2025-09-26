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

// !! ИМПОРТ ИЗ НОВОЙ СИСТЕМЫ SEO !!
import { SEO_BASE_DATA, generateSchemaJSONLD } from './seo.config'; // Убедитесь, что путь правильный

const inter = Inter({ subsets: ['latin'] });

// !! ОБНОВЛЁННАЯ SCHEMA.ORG РАЗМЕТКА из новой системы !!
const organizationSchema = generateSchemaJSONLD(); // Получаем JSON строку

// !! ГЛОБАЛЬНЫЕ МЕТАДАННЫЕ из новой системы !!
export const metadata = {
  // !! Эти значения могут быть ПЕРЕОПРЕДЕЛЕНЫ в конкретных page.js !!
  title: {
    default: SEO_BASE_DATA.defaultTitle,
    template: `%s | ${SEO_BASE_DATA.siteName}`
  },
  description: SEO_BASE_DATA.defaultDescription,
  keywords: SEO_BASE_DATA.defaultKeywords.join(', '), // Объединяем в строку
  authors: [{ name: SEO_BASE_DATA.author }],
  creator: SEO_BASE_DATA.author,
  publisher: SEO_BASE_DATA.author,
  robots: 'index, follow',
  verification: {
    yandex: SEO_BASE_DATA.yandexVerification,
  },
  openGraph: {
    title: SEO_BASE_DATA.defaultTitle,
    description: SEO_BASE_DATA.defaultDescription,
    url: SEO_BASE_DATA.siteUrl, // !! ИСПОЛЬЗУЕМ URL ИЗ КОНФИГА !!
    siteName: SEO_BASE_DATA.siteName,
    images: [
      {
        url: SEO_BASE_DATA.defaultImage,
        width: 1200,
        height: 630,
        alt: SEO_BASE_DATA.defaultImageAlt,
      },
    ],
    locale: SEO_BASE_DATA.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_BASE_DATA.defaultTitle,
    description: SEO_BASE_DATA.defaultDescription,
    images: [SEO_BASE_DATA.defaultImage],
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

        {/* DNS Prefetch для внешних ресурсов - !! УБРАНЫ ПРОБЕЛЫ !! */}
        <link rel="preconnect" href="https://smartcaptcha.yandexcloud.net" />
        <link rel="preconnect" href="https://mc.yandex.ru" />
        <link rel="preconnect" href="https://yastatic.net" />
        <link rel="dns-prefetch" href="https://smartcaptcha.yandexcloud.net" />
        <link rel="dns-prefetch" href="https://mc.yandex.ru" />
        <link rel="dns-prefetch" href="https://yastatic.net" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: organizationSchema, // !! ИСПОЛЬЗУЕМ ОБНОВЛЁННЫЙ ОБЪЕКТ ИЗ НОВОЙ СИСТЕМЫ !!
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
          src="https://smartcaptcha.yandexcloud.net/captcha.js" // !! УБРАНЫ ПРОБЕЛЫ !!
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
              })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym"); // !! УБРАНЫ ПРОБЕЛЫ !!

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
              src="https://mc.yandex.ru/watch/103534344" // !! УБРАНЫ ПРОБЕЛЫ !!
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