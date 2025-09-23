'use client';
import React, { forwardRef } from 'react';

const GlassmorphicButton = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'medium',
      className = '',
      disabled = false,
      ...props
    },
    ref
  ) => {
    // Базовые классы для стеклянного эффекта
    const baseClasses =
      'font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 backdrop-blur-md border disabled:opacity-50 disabled:cursor-not-allowed';

    // Варианты кнопок с улучшенным контрастом
    const variantClasses = {
      primary:
        'bg-white/20 border-white/30 text-white hover:bg-white/30 focus:ring-blue-500 focus:ring-offset-blue-900 active:bg-white/40',
      secondary:
        'bg-white/15 border-white/25 text-white hover:bg-white/25 focus:ring-blue-400 focus:ring-offset-gray-900 active:bg-white/35',
      onLight:
        'bg-gray-800/10 border-gray-800/20 text-gray-900 hover:bg-gray-800/20 focus:ring-blue-500 focus:ring-offset-white active:bg-gray-800/30',
      onWhite:
        'bg-gray-900/10 border-gray-900/20 text-gray-900 hover:bg-gray-900/20 focus:ring-blue-500 focus:ring-offset-gray-50 active:bg-gray-900/30',
    }[variant];

    // Размеры кнопок
    const sizeClasses = {
      small: 'py-2 px-3 text-sm',
      medium: 'py-2.5 px-4 text-base',
      large: 'py-3 px-6 text-lg',
    }[size];

    // Объединяем все классы
    const combinedClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;

    return (
      <button 
        ref={ref} 
        className={combinedClasses}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

GlassmorphicButton.displayName = 'GlassmorphicButton';

export default GlassmorphicButton;