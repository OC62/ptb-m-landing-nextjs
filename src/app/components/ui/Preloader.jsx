'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showFinalAnimation, setShowFinalAnimation] = useState(false);
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    // Принудительно запускаем видео
    const startVideo = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(error => {
          console.log('Автовоспроизведение заблокировано:', error);
          setTimeout(() => {
            if (videoRef.current) {
              videoRef.current.play().catch(e => {
                console.log('Не удалось запустить видео:', e);
                setVideoError(true);
              });
            }
          }, 1000);
        });
      }
    };

    // Запускаем видео сразу после монтирования компонента
    const timer = setTimeout(() => {
      startVideo();
    }, 100);

    // Таймеры для анимаций - общее время 8 секунд
    const finalAnimationTimer = setTimeout(() => {
      setShowFinalAnimation(true);
    }, 7000); // Финальная анимация начинается на 7 секунде

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      document.body.classList.add('loaded');
    }, 8000); // Прелоадер завершается на 8 секунде

    return () => {
      clearTimeout(timer);
      clearTimeout(finalAnimationTimer);
      clearTimeout(loadingTimer);
    };
  }, []);

  const handleVideoError = () => {
    console.error('Ошибка загрузки видео');
    setVideoError(true);
  };

  if (!isLoading) return null;

  return (
    <>
      <div className="animation-preloader">
        {/* Видео-бэкграунд в формате WebM */}
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
          className="preloader-video-bg"
          onError={handleVideoError}
        >
          <source src="/videos/backgroundanime.webm" type="video/webm" />
          
          Ваш браузер не поддерживает видеоформаты.
        </video>

        {videoError && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 z-0"></div>
        )}
        
        {/* Preloader Images */}
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
        
        {/* Letters Animation */}
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