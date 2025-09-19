// nextjs/src/app/components/ui/Preloader.jsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    // Таймеры для различных стадий анимации
    const animationTimers = [
      setTimeout(() => setAnimationStage(1), 300),   // Окаймление щита
      setTimeout(() => setAnimationStage(2), 600),   // Фон щита
      setTimeout(() => setAnimationStage(3), 900),   // "Подразделение" сверху
      setTimeout(() => setAnimationStage(4), 1200),  // "Транспортной" слева
      setTimeout(() => setAnimationStage(5), 1500),  // "Безопасности" справа
      setTimeout(() => setAnimationStage(6), 1800),  // Часть логотипа 1
      setTimeout(() => setAnimationStage(7), 2100),  // Часть логотипа 2
      setTimeout(() => setAnimationStage(8), 2400),  // Часть логотипа 3
      setTimeout(() => setAnimationStage(9), 2700),  // Часть логотипа 4
      setTimeout(() => setAnimationStage(10), 3200), // Сборка завершена
    ];

    // Завершение прелоадера через 5.5 секунд
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      document.body.classList.add('loaded');
    }, 5500);

    return () => {
      animationTimers.forEach(timer => clearTimeout(timer));
      clearTimeout(loadingTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="animation-preloader">
      {/* Основной контейнер для сборки логотипа */}
      <div className="logo-assembly-container">
        {/* Окаймление щита */}
        <div className={`logo-part shield-frame ${animationStage >= 1 ? 'visible' : ''}`}>
          <Image
            src="/images/preloadimg/preloader1.png"
            alt="Окаймление щита"
            width={120}
            height={120}
            className="logo-image"
          />
        </div>

        {/* Фон щита */}
        <div className={`logo-part shield-background ${animationStage >= 2 ? 'visible' : ''}`}>
          <Image
            src="/images/preloadimg/preloader2.png"
            alt="Фон щита"
            width={120}
            height={120}
            className="logo-image"
          />
        </div>

        {/* Текст "Подразделение" (сверху) */}
        <div className={`logo-part text-top ${animationStage >= 3 ? 'visible' : ''}`}>
          <Image
            src="/images/preloadimg/preloader3.png"
            alt="Подразделение"
            width={120}
            height={40}
            className="logo-image"
          />
        </div>

        {/* Текст "Транспортной" (слева) */}
        <div className={`logo-part text-left ${animationStage >= 4 ? 'visible' : ''}`}>
          <Image
            src="/images/preloadimg/preloader5.png"
            alt="Транспортной"
            width={40}
            height={120}
            className="logo-image"
          />
        </div>

        {/* Текст "Безопасности" (справа) */}
        <div className={`logo-part text-right ${animationStage >= 5 ? 'visible' : ''}`}>
          <Image
            src="/images/preloadimg/preloader6.png"
            alt="Безопасности"
            width={40}
            height={120}
            className="logo-image"
          />
        </div>

        {/* Части логотипа */}
        <div className={`logo-part part-1 ${animationStage >= 6 ? 'visible' : ''}`}>
          <Image
            src="/images/preloadimg/preloader7.png"
            alt="Часть логотипа 1"
            width={60}
            height={60}
            className="logo-image"
          />
        </div>

        <div className={`logo-part part-2 ${animationStage >= 7 ? 'visible' : ''}`}>
          <Image
            src="/images/preloadimg/preloader8.png"
            alt="Часть логотипа 2"
            width={60}
            height={60}
            className="logo-image"
          />
        </div>

        <div className={`logo-part part-3 ${animationStage >= 8 ? 'visible' : ''}`}>
          <Image
            src="/images/preloadimg/preloader9.png"
            alt="Часть логотипа 3"
            width={60}
            height={60}
            className="logo-image"
          />
        </div>

        <div className={`logo-part part-4 ${animationStage >= 9 ? 'visible' : ''}`}>
          <Image
            src="/images/preloadimg/preloader4.png"
            alt="Часть логотипа 4"
            width={60}
            height={60}
            className="logo-image"
          />
        </div>

        {/* Собранный логотип (финальное состояние) */}
        {animationStage >= 10 && (
          <div className="logo-assembled">
            <Image
              src="/images/preloader.png"
              alt="ПТБ-М"
              width={120}
              height={120}
              className="assembled-logo"
            />
          </div>
        )}
      </div>

      {/* Анимированные буквы из изображений */}
      <div className="txt-loading-images">
        <div className="letters-loading-image" data-letter="1">
          <Image
            src="/images/letterpre/letter1.png"
            alt="П"
            width={60}
            height={60}
            className="letter-image-back"
          />
          <Image
            src="/images/letterpre/letter1.png"
            alt="П"
            width={60}
            height={60}
            className="letter-image-front"
          />
        </div>
        <div className="letters-loading-image" data-letter="2">
          <Image
            src="/images/letterpre/letter2.png"
            alt="Т"
            width={60}
            height={60}
            className="letter-image-back"
          />
          <Image
            src="/images/letterpre/letter2.png"
            alt="Т"
            width={60}
            height={60}
            className="letter-image-front"
          />
        </div>
        <div className="letters-loading-image" data-letter="3">
          <Image
            src="/images/letterpre/letter3.png"
            alt="Б"
            width={60}
            height={60}
            className="letter-image-back"
          />
          <Image
            src="/images/letterpre/letter3.png"
            alt="Б"
            width={60}
            height={60}
            className="letter-image-front"
          />
        </div>
        <div className="letters-loading-image" data-letter="4">
          <Image
            src="/images/letterpre/letter4.png"
            alt="-"
            width={60}
            height={60}
            className="letter-image-back"
          />
          <Image
            src="/images/letterpre/letter4.png"
            alt="-"
            width={60}
            height={60}
            className="letter-image-front"
          />
        </div>
        <div className="letters-loading-image" data-letter="5">
          <Image
            src="/images/letterpre/letter5.png"
            alt="М"
            width={60}
            height={60}
            className="letter-image-back"
          />
          <Image
            src="/images/letterpre/letter5.png"
            alt="М"
            width={60}
            height={60}
            className="letter-image-front"
          />
        </div>
      </div>

      {/* Дополнительные эффекты */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            animationDelay: `${i * 0.1}s`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }} />
        ))}
      </div>
    </div>
  );
};

export default Preloader;