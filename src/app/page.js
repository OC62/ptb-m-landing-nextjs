// nextjs/src/app/page.js
import Breadcrumbs from '@/app/components/Breadcrumbs';
import ErrorBoundary from '@/app/components/ErrorBoundary';

// Импортируем компоненты напрямую
import Hero from '@/app/components/sections/Hero';
import About from '@/app/components/sections/About';
import ServicesGrid from '@/app/components/sections/ServicesGrid';
import CasesSlider from '@/app/components/sections/CasesSlider';
import Careers from '@/app/components/sections/Careers';
import Licenses from '@/app/components/sections/Licenses';
import Partners from '@/app/components/sections/Partners';
import CommunitySupport from '@/app/components/sections/CommunitySupport';
import ContactForm from '@/app/components/sections/ContactForm';
import Skeleton from './components/ui/Skeleton';

export default function Home() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <Breadcrumbs />
        <main role="main">
          <Hero />
          <About />
          <ServicesGrid />
          <CasesSlider />
          <Careers />
          <Licenses />
          <Partners />
          <CommunitySupport />
          <ContactForm />
        </main>
      </div>
    </ErrorBoundary>
  );
}

// Улучшаем метаданные для SEO
export const metadata = {
  title: 'Транспортная безопасность | ООО "ПТБ-М" | Профессиональные услуги с 2017 года',
  description: 'ООО "ПТБ-М" - комплексное обеспечение транспортной безопасности объектов дорожного хозяйства. Аудит, мониторинг, обучение, техническое оснащение. Работаем по всей России.',
  keywords: 'транспортная безопасность, ОТИ, аудит безопасности, мониторинг угроз, обучение персонала, техническое оснащение, ФЗ-16',
  authors: [{ name: 'ООО ПТБ-М' }],
  openGraph: {
    title: 'ООО "ПТБ-М" | Профессионалы в области транспортной безопасности',
    description: 'Комплексное обеспечение транспортной безопасности для объектов дорожного хозяйства с 2017 года',
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
};