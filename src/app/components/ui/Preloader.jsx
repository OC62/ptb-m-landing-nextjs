// nextjs/src/app/components/ui/Preloader.jsx
'use client';

import { useState, useEffect } from 'react';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // После трех секунд устанавливаем флажок завершения загрузки
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(loadingTimer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-500">
      <div className="animation-preloader">
        <div className="spinner"></div>
        <div className="txt-loading">
          <span className="letters-loading" data-text-preloader="П">П</span>
          <span className="letters-loading" data-text-preloader="Т">Т</span>
          <span className="letters-loading" data-text-preloader="Б">Б</span>
          <span className="letters-loading" data-text-preloader="-">-</span>
          <span className="letters-loading" data-text-preloader="М">М</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;