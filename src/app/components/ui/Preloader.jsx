'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      document.body.classList.add('loaded');
    }, 7000);

    const backupTimer = setTimeout(() => {
      document.body.classList.add('loaded');
    }, 8000);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(backupTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="animation-preloader">
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
        <span className="letters-loading" data-text-preloader="П">
          <Image
            src="/images/letterpre/letter1.png"
            alt="П"
            width={80}
            height={80}
            className="letter-img"
          />
        </span>
        <span className="letters-loading" data-text-preloader="Т">
          <Image
            src="/images/letterpre/letter2.png"
            alt="Т"
            width={80}
            height={80}
            className="letter-img"
          />
        </span>
        <span className="letters-loading" data-text-preloader="Б">
          <Image
            src="/images/letterpre/letter3.png"
            alt="Б"
            width={80}
            height={80}
            className="letter-img"
          />
        </span>
        <span className="letters-loading" data-text-preloader="-">
          <Image
            src="/images/letterpre/letter4.png"
            alt="-"
            width={80}
            height={80}
            className="letter-img"
          />
        </span>
        <span className="letters-loading" data-text-preloader="М">
          <Image
            src="/images/letterpre/letter5.png"
            alt="М"
            width={80}
            height={80}
            className="letter-img"
          />
        </span>
      </div>
    </div>
  );
};

export default Preloader;