'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';

// ✅ Динамический импорт всех тяжелых компонентов
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
const ContactForm = dynamic(() => import('@/app/components/sections/ContactForm'));

// ✅ Легкий скелетон для загрузки
const SectionSkeleton = () => (
  <div className="animate-pulse bg-gray-200 h-64 rounded-lg mb-8"></div>
);

export default function HomePageContent() {
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Ускоренная загрузка - 1.5 секунды вместо 3.5
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.classList.add('content-loaded');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <SectionSkeleton />
          <SectionSkeleton />
          <SectionSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main role="main" className="main-content">
        <Suspense fallback={<SectionSkeleton />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <ServicesGrid />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <CasesSlider />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Careers />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Licenses />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Partners />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <CommunitySupport />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <ContactForm />
        </Suspense>
      </main>
    </div>
  );
}