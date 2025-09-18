'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Howl } from 'howler';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    // Инициализируем звук
    const backgroundSound = new Howl({
      src: ['/sounds/background.mp3'],
      loop: true,
      volume: 0.5,
      onloaderror: () => {
        console.warn('Не удалось загрузить звуковой файл');
      }
    });

    setSound(backgroundSound);

    // Воспроизводим звук
    backgroundSound.play();

    // Таймер для завершения прелоадера
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      backgroundSound.stop();
      document.body.classList.add('loaded');
    }, 7000);

    // Очистка
    return () => {
      clearTimeout(loadingTimer);
      if (backgroundSound) {
        backgroundSound.stop();
        backgroundSound.unload();
      }
    };
  }, []);

  if (!isLoading) return null;

  return (
    <>
      <div className="preloader-background"></div>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center">
        <div className="flex flex-col items-center gap-8">
          {/* Логотип с объемным вращением */}
          <div className="relative">
            <Image
              src="/images/preloader.png"
              alt="Логотип ПТБ-М"
              width={150}
              height={150}
              className="rotate-Y"
              priority={true}
              style={{
                filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))',
                transformStyle: 'preserve-3d'
              }}
            />
          </div>
          
          {/* Анимированный текст */}
          <div className="txt-loading">
            <span className="letters-loading" data-text-preloader="П">П</span>
            <span className="letters-loading" data-text-preloader="Т">Т</span>
            <span className="letters-loading" data-text-preloader="Б">Б</span>
            <span className="letters-loading" data-text-preloader="-">-</span>
            <span className="letters-loading" data-text-preloader="М">М</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preloader;