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
      setTimeout(() => setAnimationStage(1), 300),   // Preloader1 - окаймление
      setTimeout(() => setAnimationStage(2), 600),   // Preloader2 - фон
      setTimeout(() => setAnimationStage(3), 900),   // Preloader3 - текст сверху
      setTimeout(() => setAnimationStage(4), 1200),  // Preloader5 - текст слева
      setTimeout(() => setAnimationStage(5), 1500),  // Preloader6 - текст справа
      setTimeout(() => setAnimationStage(6), 1800),  // Preloader7 - часть 1
      setTimeout(() => setAnimationStage(7), 2100),  // Preloader8 - часть 2
      setTimeout(() => setAnimationStage(8), 2400),  // Preloader9 - часть 3
      setTimeout(() => setAnimationStage(9), 2700),  // Preloader4 - часть 4
      setTimeout(() => setAnimationStage(10), 3200), // Финальная сборка
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
      {/* Основной контейнер для сборки логотипа с параллаксом */}
      <div className="logo-parallax-container">
        {/* Preloader1 - окаймление щита (самый задний слой) */}
        <div className={`parallax-layer layer-1 ${animationStage >= 1 ? 'visible' : ''}`}>
          <Image
            src="/images/preloadimg/preloader1.png"
            alt="Окаймление щита"
            width={360}
            height={360}
            className="parallax-image"
          />
        </div>

        {/* Preloader2 - фон щита */}
        <div className={`parallax-layer layer-2 ${animationStage >= 2 ? 'visible' : ''}`}>
          <Image
            src="/images/preloadimg/preloader2.png"
            alt="Фон щита"
            width={360}
            height={360}
            className="parallax-image"
          />
        </div>

        {/* Preloader3 - "Подразделение" (сверху) */}
        <div className={`parallax-layer layer-3 ${animationStage >= 3 ? 'visible' : ''}`}>
          <Image
            src="/images/preloadimg/preloader3.png"
            alt="Подразделение"
            width={360}
            height={120}
            className="parallax-image"
          />
        </div>

        {/* Preloader5 - "Транспортной" (слева) */}
        <div className={`parallax-layer layer-4 ${animationStage >= 4 ? 'visible' : ''}`}>
          <Image
            src="/images/preloadimg/preloader5.png"
            alt="Транспортной"
            width={120}
            height={360}
            className="parallax-image"
          />
        </div>

        {/* Preloader6 - "Безопасности" (справа) */}
        <div className={`parallax-layer layer-5 ${animationStage >= 5 ? 'visible' : ''}`}>
          <Image
            src="/images/preloadimg/preloader6.png"
            alt="Безопасности"
            width={120}
            height={360}
            className="parallax-image"
          />
        </div>

        {/* Preloader7 - часть логотипа 1 */}
        <div className={`parallax-layer layer-6 ${animationStage >= 6 ? 'visible' : ''}`}>
          <Image
            src="/images/preloadimg/preloader7.png"
            alt="Часть логотипа 1"
            width={180}
            height={180}
            className="parallax-image"
          />
        </div>

        {/* Preloader8 - часть логотипа 2 */}
        <div className={`parallax-layer layer-7 ${animationStage >= 7 ? 'visible' : ''}`}>
          <Image
            src="/images/preloadimg/preloader8.png"
            alt="Часть логотипа 2"
            width={180}
            height={180}
            className="parallax-image"
          />
        </div>

        {/* Preloader9 - часть логотипа 3 */}
        <div className={`parallax-layer layer-8 ${animationStage >= 8 ? 'visible' : ''}`}>
          <Image
            src="/images/preloadimg/preloader9.png"
            alt="Часть логотипа 3"
            width={180}
            height={180}
            className="parallax-image"
          />
        </div>

        {/* Preloader4 - часть логотипа 4 (самый передний слой) */}
        <div className={`parallax-layer layer-9 ${animationStage >= 9 ? 'visible' : ''}`}>
          <Image
            src="/images/preloadimg/preloader4.png"
            alt="Часть логотипа 4"
            width={180}
            height={180}
            className="parallax-image"
          />
        </div>
      </div>

      {/* Анимированные буквы из изображений */}
      <div className="txt-loading-images">
        <div className="letters-loading-image" data-letter="1">
          <Image
            src="/images/letterpre/letter1.png"
            alt="П"
            width={80}
            height={80}
            className="letter-image-back"
          />
          <Image
            src="/images/letterpre/letter1.png"
            alt="П"
            width={80}
            height={80}
            className="letter-image-front"
          />
        </div>
        <div className="letters-loading-image" data-letter="2">
          <Image
            src="/images/letterpre/letter2.png"
            alt="Т"
            width={80}
            height={80}
            className="letter-image-back"
          />
          <Image
            src="/images/letterpre/letter2.png"
            alt="Т"
            width={80}
            height={80}
            className="letter-image-front"
          />
        </div>
        <div className="letters-loading-image" data-letter="3">
          <Image
            src="/images/letterpre/letter3.png"
            alt="Б"
            width={80}
            height={80}
            className="letter-image-back"
          />
          <Image
            src="/images/letterpre/letter3.png"
            alt="Б"
            width={80}
            height={80}
            className="letter-image-front"
          />
        </div>
        <div className="letters-loading-image" data-letter="4">
          <Image
            src="/images/letterpre/letter4.png"
            alt="-"
            width={80}
            height={80}
            className="letter-image-back"
          />
          <Image
            src="/images/letterpre/letter4.png"
            alt="-"
            width={80}
            height={80}
            className="letter-image-front"
          />
        </div>
        <div className="letters-loading-image" data-letter="5">
          <Image
            src="/images/letterpre/letter5.png"
            alt="М"
            width={80}
            height={80}
            className="letter-image-back"
          />
          <Image
            src="/images/letterpre/letter5.png"
            alt="М"
            width={80}
            height={80}
            className="letter-image-front"
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;