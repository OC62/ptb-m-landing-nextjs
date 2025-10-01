import './globals.css';
import { Inter } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { SEO_BASE_DATA, generateSchemaJSONLD } from './seo.config';

// Динамический импорт компонентов (БЕЗ Preloader)
import dynamic from 'next/dynamic';
const Header = dynamic(() => import('@/app/components/layout/Header'));
const Footer = dynamic(() => import('@/app/components/layout/Footer'));
const CookieBanner = dynamic(() => import('@/app/components/layout/CookieBanner'));

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  preload: true
});

export const metadata = {
  title: {
    default: SEO_BASE_DATA.defaultTitle,
    template: `%s | ${SEO_BASE_DATA.siteName}`
  },
  description: SEO_BASE_DATA.defaultDescription,
  keywords: SEO_BASE_DATA.defaultKeywords.join(', '),
  authors: [{ name: SEO_BASE_DATA.author }],
  robots: 'index, follow',
  verification: {
    yandex: SEO_BASE_DATA.yandexVerification,
  },
  openGraph: {
    title: SEO_BASE_DATA.defaultTitle,
    description: SEO_BASE_DATA.defaultDescription,
    url: SEO_BASE_DATA.siteUrl,
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
        {/* Предзагрузка критических ресурсов */}
        <link rel="preload" href="/images/bg_Hero.webp" as="image" />
        <link rel="preload" href="/images/logo.webp" as="image" />
        
        <meta name="yandex-verification" content={SEO_BASE_DATA.yandexVerification} />
        <meta name="google" content="notranslate" />
        
        <link rel="icon" type="image/webp" href="/images/logo.webp" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />

        <link rel="dns-prefetch" href="https://smartcaptcha.yandexcloud.net" />
        <link rel="dns-prefetch" href="https://mc.yandex.ru" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateSchemaJSONLD(),
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Preloader УДАЛЕН отсюда */}
        <div className="main-content">
          <Header />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
        </div>

        <script
          src="https://smartcaptcha.yandexcloud.net/captcha.js"
          async
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                k=e.createElement(t),a=e.getElementsByTagName(t)[0];
                k.async=1;k.src=r;a.parentNode.insertBefore(k,a);
              })(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
              ym(103534344,"init",{defer:true,clickmap:true,trackLinks:true,accurateTrackBounce:true});
            `,
          }}
        />

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}