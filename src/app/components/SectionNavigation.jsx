// src/app/components/SectionNavigation.jsx
"use client";
import { useState, useEffect } from 'react';

const sections = [
  { id: 'hero', name: 'Главная' },
  { id: 'about', name: 'О нас' },
  { id: 'services', name: 'Услуги' },
  { id: 'cases', name: 'Кейсы' },
  { id: 'careers', name: 'Вакансии' },
  { id: 'licenses', name: 'Лицензии' },
  { id: 'partners', name: 'Партнеры' },
  { id: 'community', name: 'Социальная ответственность' },
  { id: 'contact', name: 'Контакты' },
];

const SectionNavigation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter(entry => entry.isIntersecting && entry.intersectionRatio >= 0.3)
          .map(entry => ({
            id: entry.target.id,
            ratio: entry.intersectionRatio,
            top: entry.boundingClientRect.top,
          }));

        if (visibleSections.length > 0) {
          visibleSections.sort((a, b) => {
            if (Math.abs(a.ratio - b.ratio) < 0.01) {
              return Math.abs(a.top) - Math.abs(b.top);
            }
            return b.ratio - a.ratio;
          });
          setActiveSection(visibleSections[0].id);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: [0.1, 0.2, 0.3, 0.4, 0.5],
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (!isVisible) return null;

  return (
    <nav
      aria-label="Навигация по разделам страницы"
      className="bg-white/95 backdrop-blur-sm py-3 px-4 text-sm shadow-sm border-b border-gray-200 sticky top-16 z-40 hidden md:block"
    >
      <ol className="list-none p-0 inline-flex flex-wrap gap-1" role="list">
        {sections.map((section, index) => (
          <li key={section.id} className="flex items-center">
            {index > 0 && (
              <span
                className="mx-2 text-gray-400"
                aria-hidden="true"
              >
                ›
              </span>
            )}
            {section.id === activeSection ? (
              <span
                className="text-blue-600 font-medium px-2 py-1 rounded bg-blue-50"
                aria-current="location"
              >
                {section.name}
              </span>
            ) : (
              <button
                onClick={() => scrollToSection(section.id)}
                className="text-gray-700 hover:text-blue-800 transition-colors px-2 py-1 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label={`Перейти к разделу: ${section.name}`}
              >
                {section.name}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default SectionNavigation;