// nextjs/src/app/components/ui/Preloader.jsx
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
    audio.volume = 0.3;
    audioRef.current = audio;

    const playAudio = async () => {
      try {
        await audio.play();
        setIsAudioPlaying(true);
      } catch (error) {
        console.warn('Автовоспроизведение заблокировано:', error);
      }
    };

    playAudio();

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      // Добавляем класс к body для показа основного контента
      document.body.classList.add('loaded');
    }, 7000);

    // Резервный таймер на случай если основной не сработает
    const backupTimer = setTimeout(() => {
      document.body.classList.add('loaded');
    }, 8000);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(backupTimer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

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
      onClick={handleUserInteraction}
      style={{ cursor: !isAudioPlaying ? 'pointer' : 'default' }}
    >
      {!isAudioPlaying && (
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
          🔊 Нажмите для включения звука
        </div>
      )}

      <div className="mb-8">
        <Image
          src="/images/preloader.png"
          alt="Логотип ПТБ-М"
          width={120}
          height={120}
          className="rotate-Y"
          priority
        />
      </div>
      
      <div className="txt-loading">
        <span className="letters-loading" data-text-preloader="П">П</span>
        <span className="letters-loading" data-text-preloader="Т">Т</span>
        <span className="letters-loading" data-text-preloader="Б">Б</span>
        <span className="letters-loading" data-text-preloader="-">-</span>
        <span className="letters-loading" data-text-preloader="М">М</span>
      </div>

      <audio ref={audioRef} className="hidden" />
    </div>
  );
};

export default Preloader;