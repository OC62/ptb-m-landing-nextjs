"use client";
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';

const About = () => {
  const advantages = [
    {
      title: 'Более 8 лет на рынке',
      description: 'Опыт в защите от актов незаконного вмешательства на объектах транспортной инфраструктуры',
      icon: '🏆',
    },
    {
      title: 'Аттестованные специалисты',
      description: 'Команда аттестованных специалистов, прошедших подготовку по требованиям ФЗ-16',
      icon: '👨‍💼',
    },
    {
      title: 'Работа с госзаказчиками',
      description: 'Имеем успешный опыт многолетнего сотрудничества с государственными структурами и администрациями различных регионов.',
      icon: '🏛️',
    },
    {
      title: 'Комплексный подход',
      description: 'Полный цикл работ: от разработки проекта до сдачи объекта',
      icon: '🔧',
    },
  ];

  const teamPhotos = [
    {
      src: '/images/team1.webp',
      name: 'Группа быстрого реагирования',
      position: 'Автомобиль ГБР в режиме ожидания',
      width: 600,
      height: 400
    },
    {
      src: '/images/team2.webp',
      name: 'Дежурная смена',
      position: 'Коллектив перед заступлением на дежурство',
      width: 600,
      height: 400
    },
    {
      src: '/images/team3.webp',
      name: 'Группа быстрого реагирования',
      position: 'Инструктаж перед выездом на объект',
      width: 600,
      height: 400
    },
    {
      src: '/images/team4.webp',
      name: 'Группа быстрого реагирования',
      position: 'Выезд на проверку объекта транспортной безопасности',
      width: 600,
      height: 400
    },
    {
      src: '/images/team5.webp',
      name: 'Сотрудники дежурной смены',
      position: 'В полной экипировке перед началом дежурства',
      width: 600,
      height: 400
    },
    {
      src: '/images/team6.webp',
      name: 'Специалисты ТСО',
      position: 'Настройка и диагностика технических средств охраны',
      width: 600,
      height: 400
    },
    {
      src: '/images/team7.webp',
      name: 'Группа быстрого реагирования',
      position: 'Проверка объекта транспортной безопасности',
      width: 600,
      height: 400
    },
    {
      src: '/images/team8.webp',
      name: 'Дежурная смена',
      position: 'Тренировка и инструктаж перед заступлением на дежурство',
      width: 600,
      height: 400
    },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50" aria-labelledby="about-heading">
      <h2 id="about-heading" className="sr-only">О нашей компании</h2>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            О нашей компании
          </h3>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Мы специализируемся на реализации комплекса мер по обеспечению
            транспортной безопасности, защищая интересы государственных и
            частных организаций
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mb-16"
        >
          <h4 className="text-2xl font-bold text-gray-800 mb-4">Наша задача</h4>
          <p className="text-gray-700 mb-6">
            Обеспечение транспортой безопасности объектов дорожного хозяйства.
            Для этого мы сочетаем строгое соблюдение закона № 16-ФЗ с
            современными технологиями и экспертным подходом. Наша работа — это
            ваше спокойствие и защита от рисков.
          </p>

          <h4 className="text-2xl font-bold text-gray-800 mb-4">Наш опыт</h4>
          <p className="text-gray-700">
            Более 8 лет успешной работы в сфере транспортной безопасности. Мы
            являемся надежным партнером для государственных структур и частных
            компаний, обеспечивая безопасность на всех этапах — от строительства
            до эксплуатации ключевых объектов транспортной инфраструктуры.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16" role="list" aria-label="Преимущества компании">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow"
              role="listitem"
            >
              <div className="text-4xl mb-4" aria-hidden="true">{advantage.icon}</div>
              <h5 className="text-xl font-semibold text-gray-800 mb-2">
                {advantage.title}
              </h5>
              <p className="text-gray-700">{advantage.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto"
        >
          <h4 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Наша команда в действии
          </h4>
          <p className="text-center text-gray-700 mb-6 text-sm">
            Фото из архива ООО "ПТБ-М"
          </p>

          <div className="relative mx-auto w-full max-w-4xl rounded-xl overflow-hidden group slider-container">
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={0}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              navigation={{
                nextEl: '.about-swiper-next',
                prevEl: '.about-swiper-prev',
              }}
              className="w-full"
              style={{ height: '60vh' }} 
              aria-label="Галерея фотографий команды"
            >
              {teamPhotos.map((member, index) => (
                <SwiperSlide
                  key={index}
                  className="flex items-center justify-center"
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden flex flex-col items-center justify-center">
                    <div className="w-full h-[80%] relative">
                      <Image
                        src={member.src}
                        alt={`${member.name} - ${member.position}`}
                        width={member.width}
                        height={member.height}
                        quality={75}
                        className="w-full h-full object-cover rounded-t-xl"
                        style={{ objectPosition: 'top' }}
                        loading={index < 2 ? "eager" : "lazy"}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgDRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk9SQILJdsSDbq6t//Z"
                      />
                    </div>
                    
                    <div className="bg-black/50 text-white rounded-b-xl w-full h-[20%] flex items-center justify-center">
                      <div className="p-2 h-full w-full flex flex-col justify-center items-center text-center">
                        <p
                          className="font-semibold text-xs sm:text-xs md:text-sm xs:text-[0.65rem] xxs:text-[0.7rem] xxxs:text-[0.6rem] xxxxs:text-[0.5rem] mb-0.5"
                          style={{ lineHeight: '1.1' }}
                        >
                          {member.name}
                        </p>
                        <p
                          className="text-xs sm:text-xs md:text-sm xs:text-[0.55rem] xxs:text-[0.6rem] xxxs:text-[0.5rem] xxxxs:text-[0.4rem]"
                          style={{ lineHeight: '1.1' }}
                        >
                          {member.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            <button 
              className="about-swiper-prev absolute top-1/2 left-4 transform -translate-y-1/2 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-white transition-opacity duration-300"
              aria-label="Предыдущее фото"
            >
              <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              className="about-swiper-next absolute top-1/2 right-4 transform -translate-y-1/2 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-white transition-opacity duration-300"
              aria-label="Следующее фото"
            >
              <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;