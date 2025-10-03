'use client';
import Image from 'next/image';
// nextjs/src/app/components/sections/CommunitySupport.jsx


import { motion } from 'framer-motion';
import GlassmorphicButton from '../ui/GlassmorphicButton';
import { useRouter } from 'next/navigation';

const CommunitySupport = () => {
  const router = useRouter();

  const scrollToContact = () => {
    router.push('/#contact');
  };

  return (
    <section id="community" className="relative py-32 md:py-40 bg-gray-50" aria-labelledby="community-heading">
      {/* Скрытый семантический заголовок */}
      <h2 className="sr-only" id="community-heading">
        Поддержка детского спорта ООО ПТБ-М
      </h2>

      {/* Фон с улучшенным контрастом */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/team-football.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '500px',
          minWidth: '100%'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/75 to-green-800/80"></div>
      </div>

      {/* Скрытый img для SEO */}
      <div className="sr-only" aria-hidden="true">
        <Image  src="/images/team-football.webp"  alt="Футбольная команда юных спортсменов, поддерживаемая ООО ПТБ-М"  width={1200}  height={800} />
      </div>

      {/* Контент с улучшенным контрастом */}
      <div className="container mx-auto px-4 relative z-10 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-white">
            Поддержка детского спорта
          </h3>
          <p className="text-lg md:text-xl mb-8 text-blue-50 leading-relaxed">
            ООО "ПТБ-М" активно участвует в развитии детского и юношеского
            спорта, поддерживая футбольные команды и спортивные школы в
            Ростовской области. Мы верим, что здоровое поколение — основа
            сильной страны.
          </p>
          <p className="text-md md:text-lg mb-10 text-blue-100">
            Наша команда помогает юным спортсменам в приобретении формы,
            инвентаря и организации турниров, внося вклад в будущее региона.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.3 }}
          >
            <GlassmorphicButton
              variant="onLight"
              size="large"
              onClick={scrollToContact}
              className="mt-4 text-white focus-visible"
              aria-label="Связаться с нами для поддержки детского спорта"
            >
              Связаться с нами
            </GlassmorphicButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySupport;