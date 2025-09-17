// nextjs/src/app/components/ui/Preloader.jsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Скрываем прелоадер через 1.5 секунды
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    // Альтернатива: можно слушать событие window.onload
    // window.addEventListener('load', () => setIsVisible(false));

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-500">
      <Image
        src="/images/loader.svg" // Путь к SVG в public/images/
        alt="Загрузка сайта..."
        width={64}
        height={64}
        className="animate-spin" // Добавляем CSS-анимацию вращения (на всякий случай)
        priority={true} // Приоритетная загрузка
        aria-hidden="true"
      />
    </div>
  );
};

export default Preloader;