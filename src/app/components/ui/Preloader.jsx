// nextjs/src/app/components/ui/Preloader.jsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Howl } from 'howler'; // Импортируем библиотеку для воспроизведения звука

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Воспроизводим звук сразу
    const sound = new Howl({
      src: ['/sounds/background.mp3'], // Путь к звуковому файлу
      loop: true,
      volume: 0.5,
    });
    sound.play();

    // После семи секунд устанавливаем флажок завершения загрузки
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      sound.stop(); // Остановка звука при завершении прелоадера
    }, 7000); // 7 секунд

    return () => {
      clearTimeout(loadingTimer);
      sound.stop(); // Остановка звука при завершении прелоадера
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500">
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/images/preloader.png"
          alt="Logo"
          width={128}
          height={128}
          className="rotate-Y animate-volumeSpin"
          priority={true}
          aria-hidden="true"
        />
        <div className="txt-loading">
          <span className="letters-loading" data-text-preloader="П">П</span>
          <span className="letters-loading" data-text-preloader="Т">Т</span>
          <span className="letters-loading" data-text-preloader="Б">Б</span>
          <span className="letters-loading" data-text-preloader="-">-</span>
          <span className="letters-loading" data-text-preloader="М">М</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;