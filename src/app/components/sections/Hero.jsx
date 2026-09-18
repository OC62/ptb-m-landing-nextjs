"use client";
import { motion } from "framer-motion";
import GlassmorphicButton from "../ui/GlassmorphicButton";
import Image from "next/image";
import { useNavigation } from "@/app/hooks/useNavigation";

const Hero = () => {
  const { navigateToContact } = useNavigation();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      aria-labelledby="hero-heading"
    >
      <h1 className="sr-only">
        Транспортная безопасность в Ростове-на-Дону | ООО ПТБ-М
      </h1>

      {/* Оптимизированное фоновое изображение */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/bg_Hero.webp"
          alt="Фон: дорожный объект, мост"
          fill
          priority
          quality={80}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgDRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk9SQILJdsSDbq6t//Z"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/85 to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <motion.h2
            id="hero-heading"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-white leading-tight text-left"
          >
            Комплексное обеспечение транспортной безопасности для объектов
            дорожного хозяйства с 2017 года в Ростове-на-Дону и других регионах РФ.
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl mb-8 text-blue-100 text-left"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            ООО "Подразделение транспортной безопасности -М" – профессионалы,
            которым можно доверять
          </motion.p>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <GlassmorphicButton
              variant="primary"
              size="large"
              onClick={navigateToContact}
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