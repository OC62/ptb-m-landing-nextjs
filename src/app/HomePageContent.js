// src/app/HomePageContent.js
'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

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
const ContactForm = dynamic(() => import('@/app/components/sections/ContactForm'));

const SectionFallback = () => (
  <div className="h-32 bg-gray-100 animate-pulse rounded-lg my-4"></div>
);

export default function HomePageContent() {
  return (
    <div className="min-h-screen bg-white">
      <main role="main">
        <Hero />

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
          <ContactForm />
        </Suspense>
      </main>
    </div>
  );
}