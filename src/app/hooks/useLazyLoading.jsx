// nextjs/src/app/hooks/useLazyLoading.jsx
"use client";
import { useState, useEffect, useRef } from 'react';

export const useLazyLoading = (src, options = {}) => {
  const [sourceLoaded, setSourceLoaded] = useState(null);
  const [loadingError, setLoadingError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!src) {
      setSourceLoaded(null);
      return;
    }

    setIsLoading(true);
    setLoadingError(null);

    const img = new Image();
    
    // Таймаут для обработки зависших загрузок
    timeoutRef.current = setTimeout(() => {
      if (!img.complete) {
        setLoadingError(new Error('Таймаут загрузки изображения'));
        setIsLoading(false);
      }
    }, options.timeout || 10000);

    img.src = src;
    
    img.onload = () => {
      clearTimeout(timeoutRef.current);
      setSourceLoaded(src);
      setIsLoading(false);
    };
    
    img.onerror = (error) => {
      clearTimeout(timeoutRef.current);
      console.error(`Ошибка загрузки изображения: ${src}`, error);
      setLoadingError(error);
      setIsLoading(false);
    };

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [src, options.timeout]);

  return {
    sourceLoaded,
    loadingError,
    isLoading,
    hasError: !!loadingError
  };
};