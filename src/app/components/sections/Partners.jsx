"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import Image from 'next/image';

// Импорт стилей Swiper
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';

// Массив с партнерами
const partners = [
  {
    id: 1,
    name: "ООО 'Ростдонавтовокзал'",
    logo: '/images/logo_rda.webp',
    url: 'https://rostdonavtokozal.ru',
  },
  {
    id: 2,
    name: 'ФКУ УПРДОР МОСКВА-ВОЛГОГРАД',
    logo: '/images/fkuLogo.svg',
    url: 'https://mv.rosavtodor.gov.ru',
  },
  {
    id: 3,
    name: 'ГБУ Вокзал-Авто',
    logo: '/images/GBUVolgograd.webp',
    url: 'https://vokzal-avto.ru',
  },
  {
    id: 4,
    name: 'ООО Т-Транс',
    logo: '/images/Ttrans.webp',
    url: 'https://t-trans61.ru',
  },
  {
    id: 5,
    name: 'ГКУ Транспортная дирекция РБ',
    logo: '/images/logoBashkiria.webp',
    url: 'https://tdrb.bashkortostan.ru',
  },
  {
    id: 6,
    name: "МКУ 'Комитет внешнего благоустройства Казани'",
    logo: '/images/logoKazan.webp',
    url: 'https://kzn.ru/meriya/ispolnitelnyy-komitet/komitet-vneshnego-blagoustroystva',
  },
  {
    id: 7,
    name: 'СК Автодор-Казань',
    logo: '/images/logoAvtodor.webp',
    url: 'https://skavtodor.ru',
  },
  {
    id: 8,
    name: 'АО Донавтовокзал',
    logo: '/images/LogoDonavto.webp',
    url: 'https://donavto.ru',
  },
  {
    id: 9,
    name: "Ассоциация 'Транспортная безопасность Юга'",
    logo: '/images/logoAsTb.svg',
    url: 'https://atb-y.ru',
  },
];

const Partners = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="partners" className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Наши партнеры
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            С нами сотрудничают ведущие компании и организации России
          </p>
        </motion.div>

        <div
          className="relative h-[256px] md:h-[288px] slider-container group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="h-full">
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={20}
              slidesPerView={2}
              loop={true}
              speed={800}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              navigation={{
                nextEl: '.partners-swiper-next',
                prevEl: '.partners-swiper-prev',
              }}
              breakpoints={{
                320: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                  navigation: { enabled: false },
                },
                480: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                  navigation: { enabled: false },
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                  navigation: { enabled: false },
                },
                1024: {
                  slidesPerView: 5,
                  navigation: { enabled: true },
                },
                1280: {
                  slidesPerView: 6,
                  navigation: { enabled: true },
                },
              }}
              className="h-full"
              touchMoveStopPropagation={false}
              grabCursor={true}
            >
              {partners.map((partner) => {
                const cleanUrl = partner.url?.trim();
                const isValidUrl = cleanUrl && /^https?:\/\//i.test(cleanUrl);

                return (
                  <SwiperSlide key={partner.id} className="h-full">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                      whileHover={{
                        scale: 1.03,
                        transition: {
                          type: 'spring',
                          stiffness: 300,
                          damping: 15,
                        },
                      }}
                    >
                      <a
                        href={isValidUrl ? cleanUrl : undefined}
                        target={isValidUrl ? '_blank' : undefined}
                        rel={isValidUrl ? 'noopener noreferrer' : undefined}
                        className={`h-full w-full flex flex-col justify-center items-center bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-100 text-center transition-all duration-300 ${
                          isValidUrl
                            ? 'cursor-pointer'
                            : 'cursor-default pointer-events-none'
                        }`}
                        title={partner.name}
                        onMouseEnter={(e) => {
                          e.currentTarget.classList.add('shadow-md');
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.classList.remove('shadow-md');
                        }}
                      >
                        <div className="flex items-center justify-center w-full h-16 sm:h-20 mb-2">
                          <Image
                            src={partner.logo}
                            alt={`${partner.name} логотип`}
                            width={120}
                            height={60}
                            className="max-h-12 sm:max-h-16 w-auto object-contain"
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4="
                          />
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-gray-700 leading-tight px-1 w-full">
                          {partner.name}
                        </p>
                      </a>
                    </motion.div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          <button
            className="partners-swiper-prev absolute top-1/2 left-4 transform -translate-y-1/2 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-white transition-opacity duration-300"
            aria-label="Предыдущий слайд"
          >
            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="partners-swiper-next absolute top-1/2 right-4 transform -translate-y-1/2 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-white transition-opacity duration-300"
            aria-label="Следующий слайд"
          >
            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Partners;