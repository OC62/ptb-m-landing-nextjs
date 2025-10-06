'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

const HeroPreloader = ({ progress }) => {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Попытка воспроизвести видео после загрузки
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          await videoRef.current.play();
          setVideoLoaded(true);
        } catch (error) {
          console.log('Autoplay blocked, using fallback:', error);
          setVideoLoaded(true); // Все равно продолжаем без видео
        }
      }
    };

    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', playVideo);
      // Fallback: если видео не загрузилось за 2 секунды, продолжаем без него
      const timeout = setTimeout(() => {
        setVideoLoaded(true);
      }, 2000);

      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('loadeddata', playVideo);
        }
        clearTimeout(timeout);
      };
    }
  }, []);

  return (
    <div 
      className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"
      role="status" 
      aria-live="polite"
      aria-label="Загрузка главного раздела"
    >
      {/* Фоновое видео с улучшенной загрузкой */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          preload="metadata" // Изменено с "auto" на "metadata" для оптимизации
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            videoLoaded ? 'opacity-60' : 'opacity-0'
          }`}
          aria-hidden="true"
        >
          <source src="/videos/backgroundanime.webm" type="video/webm" />
          {/* Fallback для браузеров без поддержки webm */}
          Ваш браузер не поддерживает видео в формате WebM.
        </video>
        
        {/* Fallback градиент если видео не загрузилось */}
        <div className={`absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 transition-opacity duration-500 ${
          videoLoaded ? 'opacity-80' : 'opacity-100'
        }`}></div>
      </div>
      
      {/* Основной контент прелоадера */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        {/* Логотип с анимацией */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Image
            src="/images/preloader.png"
            alt="ООО ПТБ-М"
            width={120}
            height={120}
            priority
          />
        </motion.div>
        
        {/* Прогресс бар */}
        <div className="w-64 bg-white/20 rounded-full h-2 mb-4">
          <motion.div 
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Текст */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white text-lg font-medium mb-2"
        >
          Загрузка {Math.round(progress)}%
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/80 text-sm"
        >
          Подготавливаем главный раздел...
        </motion.p>

        {/* Анимированные точки */}
        <motion.div
          className="flex space-x-1 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-white rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Скрытый индикатор для скринридеров */}
      <div className="sr-only">
        Загрузка главного раздела: {Math.round(progress)}% завершено
      </div>

      {/* Кредиты */}
      <div className="absolute bottom-4 right-4">
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

export default HeroPreloader;