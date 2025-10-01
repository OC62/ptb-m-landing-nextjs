"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import GlassmorphicButton from "../ui/GlassmorphicButton";
import Image from "next/image";

// Импортируем локальный Preloader для Hero
import HeroPreloader from "../ui/HeroPreloader";

const Hero = ({ onLoadComplete }) => {
  const [isHeroLoading, setIsHeroLoading] = useState(true);
  const [heroProgress, setHeroProgress] = useState(0);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Локальная загрузка Hero
  useEffect(() => {
    const totalTime = 2000;
    const steps = 10;
    const stepTime = totalTime / steps;
    
    let currentStep = 0;
    const progressTimer = setInterval(() => {
      currentStep++;
      setHeroProgress((currentStep / steps) * 100);
      
      if (currentStep >= steps) {
        clearInterval(progressTimer);
        setIsHeroLoading(false);
        
        // Сообщаем родителю что Hero загружен
        if (onLoadComplete) {
          setTimeout(() => {
            onLoadComplete();
          }, 300);
        }
      }
    }, stepTime);

    return () => {
      clearInterval(progressTimer);
    };
  }, [onLoadComplete]);

  // Показываем прелоадер пока Hero загружается
  if (isHeroLoading) {
    return <HeroPreloader progress={heroProgress} />;
  }

  // Основной контент Hero после загрузки
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      aria-labelledby="hero-heading"
    >
      <h1 className="sr-only">
        Транспортная безопасность в Ростове-на-Дону | ООО ПТБ-М
      </h1>

      {/* Фоновое изображение */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/bg_Hero.webp"
          alt="Фон: дорожный объект, мост"
          fill
          priority
          quality={75}
          className="object-cover"
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgDRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk9SQILJdsSDbq6t//Z"
        />

        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/85 to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Основной контент */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <motion.h2
            id="hero-heading"
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-white leading-tight text-left"
          >
            Комплексное обеспечение транспортной безопасности для объектов
            дорожного хозяйства с 2017 года в Ростове-на-Дону и других регионах РФ.
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl mb-8 text-blue-100 text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            ООО "Подразделение транспортной безопасности -М" – профессионалы,
            которым можно доверять
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <GlassmorphicButton
              variant="primary"
              size="large"
              onClick={scrollToContact}
              aria-label="Получить консультацию по транспортной безопасности"
              className="focus-visible"
            >
              Получить консультацию
            </GlassmorphicButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;