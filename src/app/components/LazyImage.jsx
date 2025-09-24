'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const LazyImage = ({ 
  src, 
  alt, 
  className = '',
  width, 
  height, 
  priority = false,
  quality = 80,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!imgRef.current || priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  // Генерация простого placeholder
  const generatePlaceholder = () => {
    return 'data:image/svg+xml;base64,' + btoa(`
      <svg width="${width || 100}" height="${height || 100}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
      </svg>
    `);
  };

  if (hasError) {
    return (
      <div 
        ref={imgRef}
        className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}
        style={{ width, height }}
        role="img"
        aria-label={alt || 'Изображение не загружено'}
      >
        <span className="text-gray-400 text-sm">⚠️ Не удалось загрузить</span>
      </div>
    );
  }

  return (
    <div 
      ref={priority ? null : imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {isInView && (
        <>
          <Image
            src={src}
            alt={alt || ''}
            width={width}
            height={height}
            priority={priority}
            quality={quality}
            sizes={sizes}
            placeholder="blur"
            blurDataURL={generatePlaceholder()}
            className={`
              transition-opacity duration-300
              ${isLoaded ? 'opacity-100' : 'opacity-0'}
              object-cover
            `}
            onLoad={handleLoad}
            onError={handleError}
            {...props}
          />
          
          {/* Skeleton loader */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
        </>
      )}
      
      {!isInView && !priority && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
    </div>
  );
};

export default LazyImage;