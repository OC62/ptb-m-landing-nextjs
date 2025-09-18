'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    // Создаем аудио элемент
    const audio = new Audio('/sounds/background.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    // Функция для воспроизведения звука с обработкой авто-политики
    const playAudio = async () => {
      try {
        await audio.play();
        console.log('Музыка начала играть');
      } catch (error) {
        console.warn('Автовоспроизведение заблокировано:', error);
        // Можно добавить кнопку для ручного запуска музыки
      }
    };

    // Запускаем музыку
    playAudio();

    // Таймер для завершения прелоадера
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      document.body.classList.add('loaded');
    }, 7000);

    // Очистка
    return () => {
      clearTimeout(loadingTimer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="animation-preloader">
      {/* Логотип с вращением */}
      <div className="mb-8">
        <Image
          src="/images/preloader.png"
          alt="Логотип ПТБ-М"
          width={120}
          height={120}
          className="animate-spin"
          style={{ 
            animation: 'spin 4s linear infinite',
            filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))'
          }}
          priority
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

      {/* Скрытый аудио элемент для мобильных устройств */}
      <audio ref={audioRef} className="hidden" />
    </div>
  );
};

export default Preloader;