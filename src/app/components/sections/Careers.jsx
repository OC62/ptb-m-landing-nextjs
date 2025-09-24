// nextjs/src/app/components/sections/Careers.jsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import GlassmorphicButton from '../ui/GlassmorphicButton';

const Careers = () => {
  const [openJobId, setOpenJobId] = useState(null);
  const router = useRouter();

  const scrollToContact = () => {
    router.push('/#contact');
  };

  const toggleJob = (id) => {
    setOpenJobId(openJobId === id ? null : id);
  };

  const jobs = [
    {
      id: 1,
      title: 'Специалист по транспортной безопасности',
      department: 'ГБР, Досмотр и дополнительный досмотр, ТСО, Наблюдение и собеседование',
      location: 'Ростов-на-Дону',
      type: 'Полная занятость',
      description: 'Недопущение актов незаконного вмешательства на объектах транспортной инфраструктуры',
      requirements: [
        'Опыт работы - не требуется',
        'Наличие свидетельства об аттестации в качестве специалиста по транспортной безопасности (не обязательно)',
      ],
      responsibilities: [
        'Работа на объектах транспортной инфраструктуры',
        'Недопущение АНВ',
      ],
    },
     {
      id: 1,
      title: 'Специалист по транспортной безопасности',
      department:
        'ГБР, Досмотр и дополнительный досмотр, ТСО, Наблюдение и собеседование',
      location: 'Ростов-на-Дону',
      type: 'Полная занятость',
      description:
        'Недопущение актов незаконного вмешательства на объектах транспортной инфраструктуры',
      requirements: [
        'Опыт работы - не требуется',
        'Наличие свидетельства об аттестации в качестве специалиста по транспортной безопасности (не обязательно)',
      ],
      responsibilities: [
        'Работа на объектах транспортной инфраструктуры',
        'Недопущение АНВ',
      ],
    },
    {
      id: 2,
      title: 'Специалист по транспортной безопасности',
      department:
        'ГБР, Досмотр и дополнительный досмотр, ТСО, Наблюдение и собеседование',
      location: 'Волгоград',
      type: 'Полная занятость',
      description:
        'Недопущение актов незаконного вмешательства на объектах транспортной инфраструктуры',
      requirements: [
        'Опыт работы - не требуется',
        'Наличие свидетельства об аттестации в качестве специалиста по транспортной безопасности (не обязательно)',
      ],
      responsibilities: [
        'Работа на объектах транспортной инфраструктуры',
        'Недопущение АНВ',
      ],
    },
    {
      id: 3,
      title: 'Специалист по транспортной безопасности',
      department:
        'ГБР, Досмотр и дополнительный досмотр, ТСО, Наблюдение и собеседование',
      location: 'Уфа',
      type: 'Полная занятость',
      description:
        'Недопущение актов незаконного вмешательства на объектах транспортной инфраструктуры',
      requirements: [
        'Опыт работы - не требуется',
        'Наличие свидетельства об аттестации в качестве специалиста по транспортной безопасности (не обязательно)',
      ],
      responsibilities: [
        'Работа на объектах транспортной инфраструктуры',
        'Недопущение АНВ',
      ],
    },
    {
      id: 4,
      title: 'Специалист по транспортной безопасности',
      department: 'ГБР, ТСО, Наблюдение и собеседование',
      location: 'Казань',
      type: 'Полная занятость',
      description:
        'Недопущение актов незаконного вмешательства на объектах транспортной инфраструктуры',
      requirements: [
        'Опыт работы - не требуется',
        'Наличие свидетельства об аттестации в качестве специалиста по транспортной безопасности (не обязательно)',
      ],
      responsibilities: [
        'Работа на объектах транспортной инфраструктуры',
        'Недопущение АНВ',
      ],
    },
  ];

  return (
    <section 
      className="py-20 bg-white" 
      id="careers"
      aria-labelledby="careers-heading"
    >
      <h2 id="careers-heading" className="sr-only">Вакансии компании</h2>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Наши вакансии
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Присоединяйтесь к команде профессионалов в сфере транспортной безопасности
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto" role="list" aria-label="Список вакансий">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1 }}
              className="mb-6 border border-gray-200 rounded-xl overflow-hidden"
              role="listitem"
            >
              <button
                className="w-full p-4 md:p-6 text-left bg-white hover:bg-gray-50 transition-colors flex justify-between items-start md:items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => toggleJob(job.id)}
                aria-expanded={openJobId === job.id}
                aria-controls={`job-content-${job.id}`}
              >
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                    {job.title}
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-2" aria-label="Детали вакансии">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs md:text-sm rounded-full">
                      {job.department}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs md:text-sm rounded-full">
                      {job.location}
                    </span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs md:text-sm rounded-full">
                      {job.type}
                    </span>
                  </div>
                </div>
                <div className="text-gray-500 ml-2 flex-shrink-0 transition-transform" aria-hidden="true">
                  <svg
                    className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-200 ${
                      openJobId === job.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {openJobId === job.id && (
                <motion.div
                  id={`job-content-${job.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-4 md:px-6 pb-4 md:pb-6 border-t border-gray-100"
                  role="region"
                  aria-labelledby={`job-heading-${job.id}`}
                >
                  <h5 id={`job-heading-${job.id}`} className="sr-only">
                    Подробности вакансии: {job.title}
                  </h5>
                  
                  <p className="text-gray-600 my-4 text-sm md:text-base">{job.description}</p>

                  <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <h6 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">
                        Обязанности:
                      </h6>
                      <ul className="space-y-2" aria-label="Обязанности">
                        {job.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0" aria-hidden="true"></span>
                            <span className="text-gray-600 text-sm md:text-base">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h6 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">
                        Требования:
                      </h6>
                      <ul className="space-y-2" aria-label="Требования">
                        {job.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0" aria-hidden="true"></span>
                            <span className="text-gray-600 text-sm md:text-base">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <GlassmorphicButton
                      variant="onWhite"
                      size="large"
                      onClick={scrollToContact}
                      className="focus-visible"
                      aria-label={`Откликнуться на вакансию: ${job.title}`}
                    >
                      Откликнуться на вакансию
                    </GlassmorphicButton>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="text-center mt-16 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl"
          role="complementary"
          aria-label="Дополнительная информация о вакансиях"
        >
          <h4 className="text-2xl font-bold text-gray-800 mb-2">
            Не нашли подходящую вакансию?
          </h4>
          <p className="text-gray-600 mb-6">
            Присылайте ваше резюме, мы свяжемся с вами при появлении подходящих предложений
          </p>
          <GlassmorphicButton
            variant="onWhite"
            size="large"
            onClick={scrollToContact}
            className="focus-visible"
            aria-label="Отправить резюме в компанию"
          >
            Отправить резюме
          </GlassmorphicButton>
        </motion.div>
      </div>
    </section>
  );
};

export default Careers;