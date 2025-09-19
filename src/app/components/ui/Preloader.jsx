// nextjs/src/app/components/ui/Preloader.jsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      document.body.classList.add('loaded');
    }, 7000);

    // Анимация кадров
    const frameIntervals = [
      500,  // preloader1
      1000, // preloader2  
      1500, // preloader3
      2000, // preloader5
      2500, // preloader6
      3000, // preloader6 (повтор)
      3500, // preloader7
      4000, // preloader9
      4500  // preloader8
    ];

    frameIntervals.forEach((interval, index) => {
      setTimeout(() => {
        setCurrentFrame(index + 1);
      }, interval);
    });

    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="animation-preloader">
      {/* Анимированные изображения */}
      <div className="relative w-full h-full">
        {/* Preloader1 - меняющаяся прозрачность */}
        {currentFrame >= 1 && (
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${currentFrame >= 1 ? 'opacity-100' : 'opacity-0'}`}>
            <Image
              src="/images/preloadimg/preloader1.png"
              alt=""
              width={300}
              height={300}
              className="object-contain scale-150"
            />
          </div>
        )}

        {/* Preloader2 - меняющаяся прозрачность */}
        {currentFrame >= 2 && (
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${currentFrame >= 2 ? 'opacity-100' : 'opacity-0'}`}>
            <Image
              src="/images/preloadimg/preloader2.png"
              alt=""
              width={300}
              height={300}
              className="object-contain scale-150"
            />
          </div>
        )}

        {/* Preloader3 - опускается сверху */}
        {currentFrame >= 3 && (
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${currentFrame >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20'}`}>
            <Image
              src="/images/preloadimg/preloader3.png"
              alt=""
              width={300}
              height={300}
              className="object-contain scale-150"
            />
          </div>
        )}

        {/* Preloader5 - появляется слева */}
        {currentFrame >= 4 && (
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${currentFrame >= 4 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <Image
              src="/images/preloadimg/preloader5.png"
              alt=""
              width={300}
              height={300}
              className="object-contain scale-150"
            />
          </div>
        )}

        {/* Preloader6 - появляется справа */}
        {currentFrame >= 5 && (
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${currentFrame >= 5 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <Image
              src="/images/preloadimg/preloader6.png"
              alt=""
              width={300}
              height={300}
              className="object-contain scale-150"
            />
          </div>
        )}

        {/* Preloader6 (повтор) - сверху */}
        {currentFrame >= 6 && (
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${currentFrame >= 6 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <Image
              src="/images/preloadimg/preloader6.png"
              alt=""
              width={300}
              height={300}
              className="object-contain scale-150"
            />
          </div>
        )}

        {/* Preloader7 - снизу */}
        {currentFrame >= 7 && (
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${currentFrame >= 7 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20'}`}>
            <Image
              src="/images/preloadimg/preloader7.png"
              alt=""
              width={300}
              height={300}
              className="object-contain scale-150"
            />
          </div>
        )}

        {/* Preloader9 - из центра с масштабированием */}
        {currentFrame >= 8 && (
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${currentFrame >= 8 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <Image
              src="/images/preloadimg/preloader9.png"
              alt=""
              width={300}
              height={300}
              className="object-contain scale-150"
            />
          </div>
        )}

        {/* Preloader8 - изнутри с масштабированием */}
        {currentFrame >= 9 && (
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${currentFrame >= 9 ? 'opacity-100 scale-100' : 'opacity-0 scale-200'}`}>
            <Image
              src="/images/preloadimg/preloader8.png"
              alt=""
              width={300}
              height={300}
              className="object-contain scale-150"
            />
          </div>
        )}
      </div>

      {/* Анимированный текст из изображений */}
      <div className="txt-loading-images">
        <div className="letters-loading-image" data-letter="1">
          <Image
            src="/images/letterpre/letter1.png"
            alt="П"
            width={120}
            height={120}
            className="letter-image"
          />
        </div>
        <div className="letters-loading-image" data-letter="2">
          <Image
            src="/images/letterpre/letter2.png"
            alt="Т"
            width={120}
            height={120}
            className="letter-image"
          />
        </div>
        <div className="letters-loading-image" data-letter="3">
          <Image
            src="/images/letterpre/letter3.png"
            alt="Б"
            width={120}
            height={120}
            className="letter-image"
          />
        </div>
        <div className="letters-loading-image" data-letter="4">
          <Image
            src="/images/letterpre/letter4.png"
            alt="-"
            width={120}
            height={120}
            className="letter-image"
          />
        </div>
        <div className="letters-loading-image" data-letter="5">
          <Image
            src="/images/letterpre/letter5.png"
            alt="М"
            width={120}
            height={120}
            className="letter-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;