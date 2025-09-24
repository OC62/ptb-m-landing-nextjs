// nextjs/src/app/layout.js
import './globals.css';
import { Inter } from 'next/font/google';
import Preloader from '@/components/ui/Preloader';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Script from 'next/script';
import Image from 'next/image';
import CookieBanner from '@/components/layout/CookieBanner';

// ✅ Импортируем SpeedInsights
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Транспортная безопасность | ООО "ПТБ-М" | Предоставляем услуги в сфере транспортной безопасности ОТИ с 2017 года',
  description: 'ООО \'ПТБ-М\'. Обеспечение транспортной безопасности объектов дорожного хозяйства. Аудит, мониторинг, оснащение, обучение. Работаем по всей России.',
  keywords: 'транспортная безопасность, ОТИ, аудит, мониторинг, обучение, Ростов-на-Дону',
  authors: [{ name: 'ООО ПТБ-М' }],
  creator: 'ООО ПТБ-М',
  publisher: 'ООО ПТБ-М',
  robots: 'index, follow',
  openGraph: {
    title: 'ООО \'ПТБ-М\' | Профессионалы в области транспортной безопасности',
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
    title: 'ООО \'ПТБ-М\' | Профессионалы в области транспортной безопасности',
    description: 'Обеспечиваем транспортную безопасность на объектах дорожного хозяйства с 2017 года.',
    images: ['/images/og-preview.jpg'],
  },
  verification: {
    yandex: 'f5bc48680f827787',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <meta name="google" content="notranslate" />
        <link rel="icon" type="image/svg+xml" href="/images/logo.svg" />
        <link rel="icon" type="image/png" sizes="120x120" href="/images/favicon-120x120.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#9ACD32" />
        <link rel="preconnect" href="https://smartcaptcha.yandexcloud.net" />
        <link rel="dns-prefetch" href="https://smartcaptcha.yandexcloud.net" />

        {/* JSON-LD Разметка */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ООО \"ПТБ-М\"",
              "url": "https://xn----9sb8ajp.xn--p1ai",
              "logo": "/images/logo.png",
              "description": "Обеспечение транспортной безопасности объектов дорожного хозяйства.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "ул. Большая Садовая, 102, офис 15",
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
            }),
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
        <Script src="https://smartcaptcha.yandexcloud.net/captcha.js" strategy="beforeInteractive" async defer />
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(103534344, "init", {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: false
              });
            `,
          }}
        />
        <noscript>
          <div>
            <Image
              src="https://mc.yandex.ru/watch/103534344"
              width={1}
              height={1}
              alt=""
              style={{ position: 'absolute', left: '-9999px' }}
            />
          </div>
        </noscript>

        {/* ✅ Добавляем SpeedInsights */}
        <SpeedInsights />
      </body>
    </html>
  );
}