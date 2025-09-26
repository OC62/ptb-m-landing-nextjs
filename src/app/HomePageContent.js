// src/app/HomePageContent.js
// Добавляем директиву 'use client' В ЭТОТ файл
'use client';

import { useState, useEffect } from 'react';
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

// Это Клиентский компонент
export default function HomePageContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Управление последовательностью загрузки: Preloader → Skeleton → Контент
  useEffect(() => {
    // Preloader работает 2 секунды, затем показываем Skeleton
    const preloaderTimer = setTimeout(() => {
      setIsLoading(false);
      
      // Skeleton показывается 1,5 секунды, затем контент
      const skeletonTimer = setTimeout(() => {
        setShowContent(true);
        document.body.classList.add('content-loaded');
      }, 1500); // Skeleton показывается 1,5 секунды

      return () => clearTimeout(skeletonTimer);
    }, 2000); // Preloader работает 2 секунды

    return () => clearTimeout(preloaderTimer);
  }, []);

  // Показываем Skeleton после прелоадера
  if (isLoading) {
    return null; // В это время показывается Preloader из layout.js
  }

  // Показываем Skeleton в течение 1,5 секунд после прелоадера
  if (!showContent) {
    return (
      <ErrorBoundary>
        <div className="min-h-screen bg-white">
          <Skeleton />
        </div>
      </ErrorBoundary>
    );
  }

  // Основной контент после завершения всей последовательности
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <Breadcrumbs />
        <main role="main" className="main-content animated-content">
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

// УБРАНО: экспорт metadata из клиентского компонента
// export const metadata = { ... };