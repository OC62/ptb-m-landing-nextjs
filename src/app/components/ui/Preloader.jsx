'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  // ✅ Ускоренный прелоадер - 1.5 секунды
  useEffect(() => {
    const totalTime = 1500;
    const steps = 10;
    const stepTime = totalTime / steps;
    
    let currentStep = 0;
    const progressTimer = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);
      
      if (currentStep >= steps) {
        clearInterval(progressTimer);
        setIsLoading(false);
        document.body.classList.add('loaded');
      }
    }, stepTime);

    // Запуск видео
    const startVideo = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {
          // Игнорируем ошибки автовоспроизведения
        });
      }
    };

    const videoTimer = setTimeout(startVideo, 100);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(videoTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      className="animation-preloader" 
      role="status" 
      aria-live="polite"
      aria-label="Загрузка страницы"
    >
      {/* Фоновое видео */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
          className="preloader-video-bg"
          aria-hidden="true"
        >
          <source src="/videos/backgroundanime.webm" type="video/webm" />
        </video>
      </div>
      
      {/* Основной контент прелоадера */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* Логотип */}
        <div className="mb-8">
          <Image
            src="/images/preloader.png"
            alt="ООО ПТБ-М"
            width={120}
            height={120}
            className="animate-pulse"
            priority
          />
        </div>
        
        {/* Прогресс бар */}
        <div className="w-64 bg-white/20 rounded-full h-2 mb-4">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Текст */}
        <p className="text-white text-lg font-medium mb-2">
          Загрузка {Math.round(progress)}%
        </p>
        <p className="text-white/80 text-sm">
          ООО "Подразделение транспортной безопасности -М"
        </p>
      </div>

      {/* Скрытый индикатор для скринридеров */}
      <div className="sr-only">
        Загрузка страницы: {Math.round(progress)}% завершено
      </div>

      {/* Кредиты */}
      <div className="vecteezy-credit absolute bottom-4 right-4">
        <a 
          href="https://www.vecteezy.com/free-videos/cyclone" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Cyclone Stock Videos by Vecteezy"
          className="text-white/60 text-xs hover:text-white transition-colors"
        >
          Cyclone Stock Videos by Vecteezy
        </a>
      </div>
    </div>
  );
};

export default Preloader;