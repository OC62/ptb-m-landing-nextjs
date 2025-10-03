import './globals.css';
import { Inter } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

// Статические импорты
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import CookieBanner from '@/app/components/layout/CookieBanner';

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export const metadata = {
  title: 'ПТБ-М - Профессиональные транспортные решения',
  description: 'Компания ПТБ-М - лидер в области транспортных услуг и логистических решений',
  keywords: 'транспортные услуги, логистика, грузоперевозки, ПТБ-М',
};

function generateSchemaJSONLD() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ООО ПТБ-М",
    "url": "https://www.xn----9sb8ajp.xn--p1ai",
    "logo": "https://www.xn----9sb8ajp.xn--p1ai/images/logo.webp",
  });
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="yandex-verification" content="6c8d32099a45287d" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateSchemaJSONLD() }}
        />
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}