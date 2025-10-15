// src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import CookieBanner from "./components/layout/CookieBanner";
import YandexMetrika from "./components/analytics/YandexMetrika";
import DynamicBreadcrumbSchema from "./components/DynamicBreadcrumbSchema";
import PermissionsPolicy from "./components/PermissionsPolicy";
import { generateSchemaJSONLD, generateServiceSchema } from "./seo.config";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "ООО 'ПТБ-М' - Транспортная безопасность в Ростове-на-Дону",
    template: "%s | ООО 'ПТБ-М'"
  },
  description: "ООО 'Подразделение транспортной безопасности -М' - обеспечение транспортной безопасности объектов дорожного хозяйства с 2017 года в Ростове-на-Дону и других регионах РФ.",
  keywords: ["транспортная безопасность", "Ростов-на-Дону", "ООО ПТБ-М", "объекты дорожного хозяйства", "ФЗ-16"],
  authors: [{ name: "ООО 'ПТБ-М'" }],
  creator: "ООО 'ПТБ-М'",
  publisher: "ООО 'ПТБ-М'",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.xn----9sb8ajp.xn--p1ai'),
  alternates: {
    canonical: '/',
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

  // Добавленные метаданные для фавиконок
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-120x120.png', sizes: '120x120', type: 'image/png' },
    ],
    apple: [
      { url: '/images/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'icon',
        url: '/favicon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'icon',
        url: '/favicon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },

  // Open Graph метаданные для соцсетей
  openGraph: {
    title: "ООО 'ПТБ-М' - Транспортная безопасность",
    description: "Обеспечение транспортной безопасности объектов дорожного хозяйства с 2017 года",
    url: "https://www.xn----9sb8ajp.xn--p1ai",
    siteName: "ООО 'ПТБ-М'",
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

  // Twitter метаданные
  twitter: {
    card: 'summary_large_image',
    title: "ООО 'ПТБ-М' - Транспортная безопасность",
    description: "Обеспечение транспортной безопасности объектов дорожного хозяйства с 2017 года",
    images: ['/images/og-preview.jpg'],
  },

  // Manifest для PWA
  manifest: '/site.webmanifest',
};

const localBusinessSchema = generateSchemaJSONLD();
const serviceSchema = generateServiceSchema();

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        
        {/* Политика разрешений */}
        <PermissionsPolicy />
        
        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: localBusinessSchema }}
        />
        
        {/* Service Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serviceSchema }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Dynamic Breadcrumb Schema для каждой страницы */}
        <DynamicBreadcrumbSchema />
        
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CookieBanner />
        
        {/* Vercel Analytics и Speed Insights */}
        <Analytics />
        <SpeedInsights />
        
        <YandexMetrika />
      </body>
    </html>
  );
}