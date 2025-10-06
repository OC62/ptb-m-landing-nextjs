// src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import CookieBanner from "./components/layout/CookieBanner";
import YandexMetrika from "./components/analytics/YandexMetrika";

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <meta 
          httpEquiv="Permissions-Policy" 
          content="accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()" 
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CookieBanner />
        
        {/* Яндекс.Метрика */}
        <YandexMetrika />
      </body>
    </html>
  );
}