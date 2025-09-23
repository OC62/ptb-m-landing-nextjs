'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showFinalAnimation, setShowFinalAnimation] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Принудительно запускаем видео
    const startVideo = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(error => {
          console.log('Автовоспроизведение заблокировано, пробуем включить звук:', error);
          // Если автовоспроизведение заблокировано, пробуем с звуком
          videoRef.current.muted = false;
          videoRef.current.play().catch(e => {
            console.log('Не удалось запустить видео:', e);
          });
        });
      }
    };

    // Запускаем видео сразу
    startVideo();

    // Таймеры для анимаций
    const finalAnimationTimer = setTimeout(() => {
      setShowFinalAnimation(true);
    }, 9000);

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      document.body.classList.add('loaded');
    }, 10000);

    return () => {
      clearTimeout(finalAnimationTimer);
      clearTimeout(loadingTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <>
      <div className="animation-preloader">
        {/* Видео-бэкграунд - исправленная версия */}
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
          className="preloader-video-bg"
          poster="/images/bg_Hero.webp" // Добавляем постер как в Hero
        >
          <source src="/videos/backgroundanime.webm" type="video/webm" />
        </video>
        
        {/* Остальной код прелоадера остается без изменений */}
        <div className="preloader-image-container">
          <Image
            src="/images/preloadimg/preloader1.png"
            alt=""
            width={180}
            height={180}
            className="preloader-img preloader-1"
            priority
          />
          <Image
            src="/images/preloadimg/preloader2.png"
            alt=""
            width={180}
            height={180}
            className="preloader-img preloader-2"
            priority
          />
          <Image
            src="/images/preloadimg/preloader3.png"
            alt=""
            width={180}
            height={180}
            className="preloader-img preloader-3"
            priority
          />
          <Image
            src="/images/preloadimg/preloader4.png"
            alt=""
            width={180}
            height={180}
            className="preloader-img preloader-4"
            priority
          />
          <Image
            src="/images/preloadimg/preloader5.png"
            alt=""
            width={180}
            height={180}
            className="preloader-img preloader-5"
            priority
          />
          <Image
            src="/images/preloadimg/preloader6.png"
            alt=""
            width={180}
            height={180}
            className="preloader-img preloader-6"
            priority
          />
          <Image
            src="/images/preloadimg/preloader7.png"
            alt=""
            width={180}
            height={180}
            className="preloader-img preloader-7"
            priority
          />
          <Image
            src="/images/preloadimg/preloader8.png"
            alt=""
            width={180}
            height={180}
            className="preloader-img preloader-8"
            priority
          />
          <Image
            src="/images/preloadimg/preloader9.png"
            alt=""
            width={180}
            height={180}
            className="preloader-img preloader-9"
            priority
          />
        </div>
        
        <div className="txt-loading">
          <span className="letters-loading letter-1" data-text-preloader="П">
            <Image
              src="/images/letterpre/letter1.png"
              alt="П"
              width={80}
              height={80}
              className="letter-img"
            />
          </span>
          <span className="letters-loading letter-2" data-text-preloader="Т">
            <Image
              src="/images/letterpre/letter2.png"
              alt="Т"
              width={80}
              height={80}
              className="letter-img"
            />
          </span>
          <span className="letters-loading letter-3" data-text-preloader="Б">
            <Image
              src="/images/letterpre/letter3.png"
              alt="Б"
              width={80}
              height={80}
              className="letter-img"
            />
          </span>
          <span className="letters-loading letter-4" data-text-preloader="-">
            <Image
              src="/images/letterpre/letter4.png"
              alt="-"
              width={80}
              height={80}
              className="letter-img"
            />
          </span>
          <span className="letters-loading letter-5" data-text-preloader="М">
            <Image
              src="/images/letterpre/letter5.png"
              alt="М"
              width={80}
              height={80}
              className="letter-img"
            />
          </span>
        </div>
        
        <div className="vecteezy-credit">
          <a href="https://www.vecteezy.com/free-videos/cyclone" target="_blank" rel="noopener noreferrer">
            Cyclone Stock Videos by Vecteezy
          </a>
        </div>
      </div>
      
      {showFinalAnimation && (
        <div className="final-animation"></div>
      )}
    </>
  );
};

export default Preloader;