'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showFinalAnimation, setShowFinalAnimation] = useState(false);

  useEffect(() => {
    // Таймер для основной анимации прелоадера
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      document.body.classList.add('loaded');
    }, 11500); // 11.5 секунд - общее время анимации

    // Таймер для финальной анимации (расхождение серого экрана)
    const finalAnimationTimer = setTimeout(() => {
      setShowFinalAnimation(true);
    }, 10000); // Запускаем через 10 секунд

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(finalAnimationTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <>
      <div className="animation-preloader">
        {/* Видео-бэкграунд */}
        <video 
          autoPlay 
          loop 
          muted 
          className="preloader-video-bg"
          poster="/videos/backgroundanime-poster.jpg" // Замените на путь к постеру, если нужно
        >
          <source src="/videos/backgroundanime.mp4" type="video/mp4" />
          <source src="/videos/backgroundanime.webm" type="video/webm" />
          Ваш браузер не поддерживает видео.
        </video>
        
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
        
        {/* Надпись Vecteezy.com с ссылкой */}
        <div className="vecteezy-credit">
          <a href="https://www.vecteezy.com/free-videos/cyclone" target="_blank" rel="noopener noreferrer">
            Cyclone Stock Videos by Vecteezy
          </a>
        </div>
      </div>
      
      {/* Финальная анимация - серый экран */}
      {showFinalAnimation && (
        <div className="final-animation"></div>
      )}
    </>
  );
};

export default Preloader;