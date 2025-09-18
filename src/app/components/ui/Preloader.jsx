'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Создаем аудио элемент
    const audio = new Audio('/sounds/background.mp3');
    audio.loop = true;
    audio.volume = 0.3; // Уменьшаем громкость для фонового звука
    audioRef.current = audio;

    // Функция для воспроизведения звука
    const playAudio = async () => {
      try {
        await audio.play();
        setIsAudioPlaying(true);
        console.log('Музыка начала играть');
      } catch (error) {
        console.warn('Автовоспроизведение заблокировано:', error);
        // Предлагаем пользователю взаимодействие для включения звука
      }
    };

    // Пытаемся запустить музыку сразу
    playAudio();

    // Таймер для завершения прелоадера
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      document.body.classList.add('loaded');
    }, 13500);

    // Очистка
    return () => {
      clearTimeout(loadingTimer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Функция для ручного запуска музыки по клику
  const handleUserInteraction = async () => {
    if (!isAudioPlaying && audioRef.current) {
      try {
        await audioRef.current.play();
        setIsAudioPlaying(true);
      } catch (error) {
        console.error('Ошибка воспроизведения:', error);
      }
    }
  };

  if (!isLoading) return null;

  return (
    <div 
      className="animation-preloader" 
      onClick={handleUserInteraction} // Запуск музыки по клику
      style={{ cursor: !isAudioPlaying ? 'pointer' : 'default' }}
    >
      {/* Индикатор состояния звука */}
      {!isAudioPlaying && (
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
          🔊 Нажмите для включения звука
        </div>
      )}

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

      {/* Скрытый аудио элемент */}
      <audio ref={audioRef} className="hidden" />
    </div>
  );
};

export default Preloader;