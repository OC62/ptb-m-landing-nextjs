'use client';

import { motion } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import GlassmorphicButton from '../ui/GlassmorphicButton';

const services = [
  {
    id: 1,
    title: 'Аудит транспортной безопасности',
    description: 'Комплексная оценка системы обеспечения транспортной безопасности объекта на соответствие требованиям Федерального закона № 16-ФЗ.',
    icon: '🔍',
    features: ['Анализ уязвимостей', 'Проверка соответствия нормам', 'Рекомендации по улучшению'],
  },
  {
    id: 2,
    title: 'Мониторинг угроз',
    description: 'Постоянное наблюдение за потенциальными угрозами и реагирование на инциденты',
    icon: '🛡️',
    features: ['24/7 мониторинг', 'Система раннего предупреждения', 'Оперативное реагирование'],
  },
  {
    id: 3,
    title: 'Обучение персонала',
    description: 'Повышение квалификации сотрудников в области транспортной безопасности',
    icon: '🎓',
    features: ['Программы обучения', 'Аттестация специалистов', 'Практические тренинги'],
  },
  {
    id: 4,
    title: 'Консультации',
    description: 'Экспертные консультации по вопросам транспортной безопасности',
    icon: '💡',
    features: ['Индивидуальный подход', 'Разработка стратегий', 'Поддержка при сертификации'],
  },
  {
    id: 5,
    title: 'Лицензирование',
    description: 'Помощь в получении аккредитации на деятельность в сфере транспортной безопасности',
    icon: '📋',
    features: ['Подготовка документов', 'Взаимодействие с органами', 'Сопровождение процесса'],
  },
  {
    id: 6,
    title: 'Техническое оснащение',
    description: 'Поставка и установка оборудования для обеспечения транспортной безопасности',
    icon: '⚙️',
    features: ['Системы видеонаблюдения', 'Сигнализации и датчики', 'Комплексные решения'],
  },
];

const ServicesGrid = () => {
  const router = useRouter();
  const pathname = usePathname();

  const scrollToContact = () => {
    if (pathname === '/') {
      // На главной странице - скроллим к форме
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        const headerHeight = 80;
        const elementPosition = contactSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    } else {
      // На других страницах - переходим на страницу контактов
      router.push('/contacts');
    }
  };

  return (
    <section id="services" className="py-20 bg-white" aria-labelledby="services-heading">
      <h2 id="services-heading" className="sr-only">Наши услуги</h2>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Наши услуги
          </h3>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Комплексные решения для обеспечения транспортной безопасности на
            объектах дорожного хозяйства
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="list" aria-label="Список услуг">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              role="listitem"
            >
              <div className="flex-1 flex flex-col">
                <div className="text-5xl mb-6" aria-hidden="true">{service.icon}</div>
                <h4 className="text-2xl font-bold text-gray-800 mb-4">
                  {service.title}
                </h4>
                <p className="text-gray-700 mb-6 flex-1">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6" aria-label={`Особенности услуги: ${service.title}`}>
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0" aria-hidden="true"></span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <GlassmorphicButton
                variant="onWhite"
                size="large"
                onClick={scrollToContact}
                className="w-full mt-auto focus-visible"
                aria-label={`Узнать больше об услуге: ${service.title}`}
              >
                Узнать больше
              </GlassmorphicButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;