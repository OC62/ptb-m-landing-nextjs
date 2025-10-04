'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Динамическая загрузка с отключением SSR
const YandexCaptcha = dynamic(
  () => import('./YandexCaptcha'),
  { 
    ssr: false,
    loading: () => (
      <div className="captcha-placeholder min-h-[85px] flex items-center justify-center border border-gray-300 rounded-lg bg-gray-50">
        <div className="text-gray-500 text-sm">Подготовка проверки безопасности...</div>
      </div>
    )
  }
);

const LazyYandexCaptcha = (props) => {
  const [isReady, setIsReady] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    // Автоматическая загрузка через 3 секунды
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Загрузка при взаимодействии с формой
  useEffect(() => {
    const handleInteraction = () => {
      if (!userInteracted) {
        setUserInteracted(true);
        setIsReady(true);
      }
    };

    const formElements = document.querySelectorAll('input, textarea, select');
    formElements.forEach(element => {
      element.addEventListener('focus', handleInteraction);
      element.addEventListener('input', handleInteraction);
    });

    return () => {
      formElements.forEach(element => {
        element.removeEventListener('focus', handleInteraction);
        element.removeEventListener('input', handleInteraction);
      });
    };
  }, [userInteracted]);

  if (!isReady) {
    return (
      <div className="captcha-placeholder min-h-[85px] flex flex-col items-center justify-center border border-gray-300 rounded-lg bg-gray-50 p-4">
        <div className="text-gray-500 text-sm mb-2 text-center">
          Проверка безопасности будет загружена автоматически
        </div>
        <button 
          onClick={() => setIsReady(true)}
          className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Загрузить сейчас
        </button>
      </div>
    );
  }

  return <YandexCaptcha {...props} />;
};

export default LazyYandexCaptcha;