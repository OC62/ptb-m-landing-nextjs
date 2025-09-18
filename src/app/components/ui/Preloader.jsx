// nextjs/src/app/components/ui/Preloader.jsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Прелоадер скрывается автоматически спустя 1.5 секунды
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-500">
      <Image
        src="/images/preloader-pitbm.svg" // 👈 Новый путь к нашему SVG-изображению
        alt="Загрузка сайта..."
        width={64}
        height={64}
        className="transition-all ease-in-out duration-500"
        priority={true}
        aria-hidden="true"
      />
    </div>
  );
};

export default Preloader;