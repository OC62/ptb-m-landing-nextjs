"use client";
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, A11y } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/a11y';

const CasesSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const sliderRef = useRef(null);
  const isMounted = useRef(true);

  const cases = [
    {
      id: 1,
      title: 'Реализация комплексной системы транспортной безопасности на автовокзалах',
      description: 'Комплексное решение для защиты автовокзалов',
      results: 'Снижение инцидентов на 85%, экономия 2 млн руб. в год',
      image: '/images/Main_Bus_Station.webp',
      imageAlt: 'Автовокзал с системой транспортной безопасности'
    },
    {
      id: 2,
      title: 'Реализация комплексной системы транспортной безопасности на строящихся объектах транспортной инфраструктуры (СОТИ)',
      description: 'Комплексное решение для защиты СОТИ',
      results: 'Снижение инцидентов на 90%, экономия 2 млн руб. в год',
      image: '/images/Rost_Sea.webp',
      imageAlt: 'Строящийся объект транспортной инфраструктуры'
    },
    {
      id: 3,
      title: 'Реализация комплексной системы транспортной безопасности на действующих объектах транспортной инфраструктуры (ОТИ)',
      description: 'Проведение комплексного аудита системы транспортной безопасности ОТИ',
      results: 'Выявлено 15 критических уязвимостей, разработан план улучшений',
      image: '/images/bg_Hero.webp',
      imageAlt: 'Действующий объект транспортной инфраструктуры'
    },
  ];

  const handleSlideChange = useCallback((swiper) => {
    if (isMounted.current) {
      setCurrentSlide(swiper.realIndex);
    }
  }, []);

  const handleAutoplayPause = useCallback(() => {
    if (isMounted.current) {
      setIsAutoplayPaused(true);
    }
  }, []);

  const handleAutoplayResume = useCallback(() => {
    if (isMounted.current) {
      setIsAutoplayPaused(false);
    }
  }, []);

  // Безопасное управление состоянием
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <section 
      id="cases" 
      className="py-20 bg-gray-900 text-white"
      aria-labelledby="cases-heading"
    >
      <h2 id="cases-heading" className="sr-only">Наши кейсы и проекты</h2>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Наши кейсы
          </h3>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Успешные проекты по обеспечению транспортной безопасности по всей России
          </p>
        </div>

        <div 
          className="max-w-6xl mx-auto bg-gray-800 rounded-xl overflow-hidden relative group"
          onMouseEnter={handleAutoplayPause}
          onMouseLeave={handleAutoplayResume}
          onFocus={handleAutoplayPause}
          onBlur={handleAutoplayResume}
        >
          <Swiper
            ref={sliderRef}
            modules={[Autoplay, Keyboard, A11y]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            keyboard={{
              enabled: true,
              onlyInViewport: true,
            }}
            a11y={{
              prevSlideMessage: 'Предыдущий слайд',
              nextSlideMessage: 'Следующий слайд',
              firstSlideMessage: 'Это первый слайд',
              lastSlideMessage: 'Это последний слайд',
              paginationBulletMessage: 'Перейти к слайду {{index}}',
            }}
            onSlideChange={handleSlideChange}
            className="min-h-[400px] md:min-h-[450px]"
          >
            {cases.map((item, index) => (
              <SwiperSlide key={item.id}>
                <div className="grid md:grid-cols-2 gap-6 p-6 md:p-8 items-center">
                  <div className="flex flex-col justify-center">
                    <h4 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-gray-300 mb-6 text-base md:text-lg">
                      {item.description}
                    </p>
                    <div 
                      className="bg-red-500/20 border-l-4 border-red-500 p-4 rounded"
                      role="status"
                    >
                      <p className="font-semibold text-sm md:text-base">
                        <strong>Результаты:</strong> {item.results}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center md:justify-end">
                    <div className="relative w-full max-w-md">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        width={600}
                        height={400}
                        className="w-full h-auto max-h-[300px] md:max-h-[350px] object-contain rounded-lg shadow-lg"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Индикаторы прогресса */}
          <div className="flex justify-center mt-4 pb-6" role="tablist" aria-label="Выбор слайда">
            {cases.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const swiper = sliderRef.current?.swiper;
                  if (swiper) swiper.slideToLoop(index);
                }}
                className={`w-3 h-3 rounded-full transition-colors mx-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ${
                  index === currentSlide ? 'bg-red-500' : 'bg-gray-600 hover:bg-gray-500'
                }`}
                role="tab"
                aria-selected={index === currentSlide}
                aria-label={`Слайд ${index + 1}: ${cases[index].title}`}
                tabIndex={index === currentSlide ? 0 : -1}
              />
            ))}
          </div>

          <div className="text-center pb-2">
            <span className="text-xs text-gray-400">
              {isAutoplayPaused ? 'Наведите курсор для продолжения' : 'Автовоспроизведение включено'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CasesSlider;