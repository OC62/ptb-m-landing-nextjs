// nextjs/src/components/LazyImage.jsx
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const LazyImage = ({ src, alt, className, width, height, priority = false, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: '50px', // Увеличиваем зону предзагрузки
        threshold: 0.1,
      }
    );

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = (e) => {
    console.error(`Ошибка загрузки изображения: ${src}`);
    setHasError(true);
    setIsLoaded(true); // Показываем placeholder даже при ошибке
  };

  if (hasError) {
    return (
      <div 
        ref={imgRef}
        className={`lazy-image-container ${className || ''} flex items-center justify-center bg-gray-100 rounded-lg`}
        role="img"
        aria-label={alt || 'Изображение не загружено'}
      >
        <div className="text-center p-4">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm text-gray-500">Изображение не загружено</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={imgRef}
      className={`lazy-image-container ${className || ''} relative`}
    >
      {isInView ? (
        <>
          {/* Плейсхолдер с тем же соотношением сторон */}
          {!isLoaded && (
            <div 
              className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center"
              aria-hidden="true"
            >
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          
          <Image
            src={src}
            alt={alt || ''}
            width={width || 600}
            height={height || 400}
            className={`transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${className || ''}`}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
            priority={priority}
            {...props}
          />
        </>
      ) : (
        // Плейсхолдер до появления в зоне видимости
        <div 
          className="lazy-image-placeholder bg-gray-100 rounded-lg w-full h-full flex items-center justify-center"
          style={{ 
            minHeight: height ? `${height}px` : '200px',
            aspectRatio: width && height ? `${width}/${height}` : '16/9'
          }}
          aria-hidden="true"
        >
          <svg className="animate-spin h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default LazyImage;