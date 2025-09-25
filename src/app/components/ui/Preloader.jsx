// nextjs/src/app/components/ui/Preloader.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showFinalAnimation, setShowFinalAnimation] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const videoRef = useRef(null);

  // Ускоренные шаги прелоадера (2 секунды вместо 8)
  const steps = [
    { time: 100, action: 'start' },
    { time: 300, action: 'step1' },
    { time: 600, action: 'step2' },
    { time: 900, action: 'step3' },
    { time: 1200, action: 'step4' },
    { time: 1500, action: 'step5' },
    { time: 1800, action: 'final' },
    { time: 2000, action: 'complete' }
  ];

  useEffect(() => {
    const startVideo = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(error => {
          console.log('Автовоспроизведение заблокировано, пробуем с задержкой');
          setTimeout(() => {
            if (videoRef.current) {
              videoRef.current.play().catch(e => {
                console.log('Не удалось запустить видео, используем фоновый градиент');
                setVideoError(true);
              });
            }
          }, 200);
        });
      }
    };

    // Запускаем видео с небольшой задержкой
    const videoTimer = setTimeout(startVideo, 100);

    // Управление шагами анимации
    const stepTimers = steps.map(step => 
      setTimeout(() => {
        setCurrentStep(steps.indexOf(step) + 1);
        if (step.action === 'final') setShowFinalAnimation(true);
        if (step.action === 'complete') {
          setIsLoading(false);
          document.body.classList.add('loaded');
        }
      }, step.time)
    );

    return () => {
      clearTimeout(videoTimer);
      stepTimers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  const handleVideoError = () => {
    console.error('Ошибка загрузки видео прелоадера');
    setVideoError(true);
  };

  if (!isLoading) return null;

  return (
    <>
      <div 
        className="animation-preloader" 
        role="status" 
        aria-live="polite"
        aria-label="Загрузка страницы"
      >
        {/* Фоновое видео или градиент */}
        <div className="absolute inset-0 z-0">
          {!videoError ? (
            <video 
              ref={videoRef}
              autoPlay 
              loop 
              muted 
              playsInline
              preload="auto"
              className="preloader-video-bg"
              onError={handleVideoError}
              aria-hidden="true"
            >
              <source src="/videos/backgroundanime.webm" type="video/webm" />
            </video>
          ) : (
            <div 
              className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"
              aria-hidden="true"
            />
          )}
        </div>
        
        {/* Контейнер для логотипов */}
        <div className="preloader-image-container" aria-hidden="true">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <Image
              key={num}
              src={`/images/preloadimg/preloader${num}.png`}
              alt=""
              width={180}
              height={180}
              className={`preloader-img preloader-${num} ${
                currentStep >= num ? 'opacity-100' : 'opacity-0'
              }`}
              priority
            />
          ))}
        </div>
        
        {/* Анимированный текст */}
        <div className="txt-loading" aria-hidden="true">
          {['П', 'Т', 'Б', '-', 'М'].map((letter, index) => (
            <span 
              key={index}
              className={`letters-loading letter-${index + 1} ${
                currentStep >= 6 + index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={`/images/letterpre/letter${index + 1}.png`}
                alt={letter}
                width={80}
                height={80}
                className="letter-img"
              />
            </span>
          ))}
        </div>
        
        {/* Скрытый индикатор прогресса для скринридеров */}
        <div className="sr-only">
          Загрузка: {Math.min(currentStep * 12.5, 100)}% завершено
        </div>

        {/* Кредиты */}
        <div className="vecteezy-credit" aria-hidden="true">
          <a 
            href="https://www.vecteezy.com/free-videos/cyclone" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Cyclone Stock Videos by Vecteezy"
          >
            Cyclone Stock Videos by Vecteezy
          </a>
        </div>
      </div>
      
      {/* Финальная анимация */}
      {showFinalAnimation && (
        <div 
          className="final-animation" 
          aria-hidden="true"
          role="presentation"
        />
      )}
    </>
  );
};

export default Preloader;