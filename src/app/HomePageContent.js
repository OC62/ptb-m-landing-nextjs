'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';

// Импортируем улучшенный Skeleton
import Skeleton from './components/ui/Skeleton';

// Динамический импорт компонентов
const Hero = dynamic(() => import('@/app/components/sections/Hero'), {
  loading: () => <div className="min-h-screen bg-gray-100" />
});
const About = dynamic(() => import('@/app/components/sections/About'));
const ServicesGrid = dynamic(() => import('@/app/components/sections/ServicesGrid'));
const CasesSlider = dynamic(() => import('@/app/components/sections/CasesSlider'));
const Careers = dynamic(() => import('@/app/components/sections/Careers'));
const Licenses = dynamic(() => import('@/app/components/sections/Licenses'));
const Partners = dynamic(() => import('@/app/components/sections/Partners'));
const CommunitySupport = dynamic(() => import('@/app/components/sections/CommunitySupport'));
const SimpleContactForm = dynamic(() => import('@/app/components/sections/SimpleContactForm'));

// Простой fallback для секций
const SectionFallback = () => (
  <div className="h-20 bg-gray-100 animate-pulse rounded-lg my-4"></div>
);

export default function HomePageContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [heroLoaded, setHeroLoaded] = useState(false);

  // Ускоренная загрузка Skeleton
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Callback когда Hero завершил свою анимацию
  const handleHeroLoadComplete = () => {
    setHeroLoaded(true);
    document.body.classList.add('content-loaded');
  };

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div className="min-h-screen bg-white">
      <main role="main">
        {/* Hero с локальным Preloader */}
        <Hero onLoadComplete={handleHeroLoadComplete} />
        
        {/* Остальные компоненты загружаются после Hero */}
        {heroLoaded && (
          <>
            <Suspense fallback={<SectionFallback />}>
              <About />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <ServicesGrid />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <CasesSlider />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <Careers />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <Licenses />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <Partners />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <CommunitySupport />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <SimpleContactForm />
            </Suspense>
          </>
        )}
      </main>
    </div>
  );
}