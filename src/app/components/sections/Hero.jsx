// nextjs/src/app/components/sections/Hero.jsx
'use client';

import { motion } from 'framer-motion';
import GlassmorphicButton from '../ui/GlassmorphicButton';

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      aria-labelledby="hero-heading"
    >
      {/* Фоновое видео */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/bg_Hero.webp" // ✅ Используем прямой путь к изображению из public/images/
          className="w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src="/videos/Bridge.mp4" type="video/mp4" />
          {/* Fallback изображение, если видео не поддерживается */}
          <img
            src="/images/bg_Hero.webp"
            alt="Фон: дорожный объект, мост"
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        </video>

        {/* Полупрозрачный градиент для улучшения читаемости текста */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-900 to-transparent opacity-80"
          aria-hidden="true"
        ></div>
      </div>

      {/* Основной контент */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
              },
            },
          }}
          className="max-w-3xl"
        >
          {/* Заголовок с градиентным текстом */}
          <motion.h1
            id="hero-heading"
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 12 }}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-green-200 leading-tight"
          >
            Комплексное обеспечение транспортной безопасности для объектов
            дорожного хозяйства с 2017 года.
          </motion.h1>

          {/* Подзаголовок */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: -15 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            className="text-lg md:text-xl mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-blue-200"
          >
            ООО "Подразделение транспортной безопасности -М" – профессионалы,
            которым можно доверять
          </motion.p>

          {/* Кнопка */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <GlassmorphicButton
              variant="primary"
              size="large"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              aria-label="Получить консультацию по транспортной безопасности"
            >
              Получить консультацию
            </GlassmorphicButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Индикатор прокрутки вниз */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        aria-hidden="true"
      >
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;