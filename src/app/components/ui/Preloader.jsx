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
      setTimeout(() => setAnimationStage(1), 400),   // Окаймление щита
      setTimeout(() => setAnimationStage(2), 800),   // Фон щита
      setTimeout(() => setAnimationStage(3), 1200),  // "Подразделение" сверху
      setTimeout(() => setAnimationStage(4), 1600),  // "Транспортной" слева
      setTimeout(() => setAnimationStage(5), 2000),  // "Безопасности" справа
      setTimeout(() => setAnimationStage(6), 2400),  // Часть сверху
      setTimeout(() => setAnimationStage(7), 2800),  // Часть снизу
      setTimeout(() => setAnimationStage(8), 3200),  // Часть из центра
      setTimeout(() => setAnimationStage(9), 3600),  // Часть изнутри
      setTimeout(() => setAnimationStage(10), 4000), // Финальная сборка
    ];

    // Завершение прелоадера через 9 секунд
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      document.body.classList.add('loaded');
    }, 9000);

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
            priority
          />
        </div>

        {/* Фон щита */}
        <div className={`logo-part shield-background ${animationStage >= 2 ? 'visible' : ''}`}>
          <Image
            src="/images/preloadimg/preloader2.png"
            alt="Фон щита"
            width={120}
            height={120}
            priority
          />
        </div>

        {/* Текст "Подразделение" (сверху) */}
        <div className={`logo-part text-top ${animationStage >= 3 ? 'visible' : ''}`}>
          <Image
            src="/images/preloadimg/preloader3.png"
            alt="Подразделение"
            width={120}
            height={40}
            priority
          />
        </div>

        {/* Текст "Транспортной" (слева) */}
        <div className={`logo-part text-left ${animationStage >= 4 ? 'visible' : ''}`}>
          <Image
            src="/images/preloadimg/preloader5.png"
            alt="Транспортной"
            width={40}
            height={120}
            priority
          />
        </div>

        {/* Текст "Безопасности" (справа) */}
        <div className={`logo-part text-right ${animationStage >= 5 ? 'visible' : ''}`}>
          <Image
            src="/images/preloadimg/preloader6.png"
            alt="Безопасности"
            width={40}
            height={120}
            priority
          />
        </div>

        {/* Часть сверху */}
        <div className={`logo-part part-top ${animationStage >= 6 ? 'visible' : ''}`}>
          <Image
            src="/images/preloadimg/preloader6.png"
            alt="Часть сверху"
            width={120}
            height={120}
            priority
          />
        </div>

        {/* Часть снизу */}
        <div className={`logo-part part-bottom ${animationStage >= 7 ? 'visible' : ''}`}>
          <Image
            src="/images/preloadimg/preloader7.png"
            alt="Часть снизу"
            width={120}
            height={120}
            priority
          />
        </div>

        {/* Часть из центра */}
        <div className={`logo-part part-center ${animationStage >= 8 ? 'visible' : ''}`}>
          <Image
            src="/images/preloadimg/preloader9.png"
            alt="Часть из центра"
            width={120}
            height={120}
            priority
          />
        </div>

        {/* Часть изнутри */}
        <div className={`logo-part part-inside ${animationStage >= 9 ? 'visible' : ''}`}>
          <Image
            src="/images/preloadimg/preloader8.png"
            alt="Часть изнутри"
            width={120}
            height={120}
            priority
          />
        </div>

        {/* Финальный собранный логотип */}
        {animationStage >= 10 && (
          <div className="final-logo-container">
            <div className="final-logo-stack">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <div key={num} className="final-logo-part">
                  <Image
                    src={`/images/preloadimg/preloader${num}.png`}
                    alt={`Часть логотипа ${num}`}
                    width={540}
                    height={540}
                    priority
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Анимированные буквы из изображений */}
      <div className="txt-loading-images">
        <div className="letters-loading-image">
          <Image
            src="/images/letterpre/letter1.png"
            alt="П"
            width={60}
            height={60}
            className="letter-image-back"
            priority
          />
          <Image
            src="/images/letterpre/letter1.png"
            alt="П"
            width={60}
            height={60}
            className="letter-image-front"
            priority
          />
        </div>
        <div className="letters-loading-image">
          <Image
            src="/images/letterpre/letter2.png"
            alt="Т"
            width={60}
            height={60}
            className="letter-image-back"
            priority
          />
          <Image
            src="/images/letterpre/letter2.png"
            alt="Т"
            width={60}
            height={60}
            className="letter-image-front"
            priority
          />
        </div>
        <div className="letters-loading-image">
          <Image
            src="/images/letterpre/letter3.png"
            alt="Б"
            width={60}
            height={60}
            className="letter-image-back"
            priority
          />
          <Image
            src="/images/letterpre/letter3.png"
            alt="Б"
            width={60}
            height={60}
            className="letter-image-front"
            priority
          />
        </div>
        <div className="letters-loading-image">
          <Image
            src="/images/letterpre/letter4.png"
            alt="-"
            width={60}
            height={60}
            className="letter-image-back"
            priority
          />
          <Image
            src="/images/letterpre/letter4.png"
            alt="-"
            width={60}
            height={60}
            className="letter-image-front"
            priority
          />
        </div>
        <div className="letters-loading-image">
          <Image
            src="/images/letterpre/letter5.png"
            alt="М"
            width={60}
            height={60}
            className="letter-image-back"
            priority
          />
          <Image
            src="/images/letterpre/letter5.png"
            alt="М"
            width={60}
            height={60}
            className="letter-image-front"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;