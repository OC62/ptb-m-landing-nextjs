// nextjs/src/app/components/sections/ContactForm.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import GlassmorphicButton from '../ui/GlassmorphicButton';

// --- Схема валидации ---
const schema = yup
  .object({
    name: yup.string().required('Имя обязательно'),
    email: yup
      .string()
      .email('Неверный формат email')
      .required('Email обязателен'),
    phone: yup.string().required('Телефон обязателен'),
    message: yup.string().required('Сообщение обязательно'),
  })
  .required();

// --- Конфигурация ---
// Используем process.env.NEXT_PUBLIC_... для клиентской части
const BACKEND_ENDPOINT = '/api/send'; // Относительный путь к API-маршруту Next.js
const CAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY;
// Флаг для отключения капчи на фронтенде
const IS_CAPTCHA_DISABLED_FOR_DEV = process.env.NEXT_PUBLIC_DISABLE_CAPTCHA_FOR_LOCAL_DEV === 'true';

// --- Номер счётчика Яндекс.Метрики ---
const YANDEX_METRIKA_COUNTER = 103534344;

// --- Основной компонент ---
const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const captchaContainerRef = useRef(null);
  const widgetId = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // --- Перезагрузка капчи ---
  const reloadCaptcha = useCallback(() => {
    if (widgetId.current && window.smartCaptcha) {
      try {
        window.smartCaptcha.destroy(widgetId.current);
      } catch (error) {
        console.warn('Ошибка при уничтожении капчи:', error);
      }
    }
    widgetId.current = null;
    setCaptchaToken('');
    setCaptchaError('');
  }, []);

  // --- Инициализация капчи ---
  const initializeCaptcha = useCallback(() => {
    // Если капча отключена, ничего не делаем
    if (IS_CAPTCHA_DISABLED_FOR_DEV) {
        return;
    }

    if (!captchaContainerRef.current) {
      console.warn('Контейнер капчи не найден. Повторная попытка...');
      setTimeout(initializeCaptcha, 100);
      return;
    }

    if (!window.smartCaptcha) {
      setCaptchaError('Скрипт капчи не загрузился');
      return;
    }

    if (!CAPTCHA_SITE_KEY) {
      setCaptchaError('Ключ sitekey не задан');
      return;
    }

    reloadCaptcha();

    try {
      widgetId.current = window.smartCaptcha.render(
        captchaContainerRef.current,
        {
          sitekey: CAPTCHA_SITE_KEY,
          hl: 'ru',
          callback: (token) => {
            setCaptchaToken(token);
            setCaptchaError('');
          },
          'error-callback': (error) => {
            console.error('Yandex SmartCaptcha error:', error);
            setCaptchaError('Ошибка капчи. Попробуйте ещё раз.');
          },
        }
      );
    } catch (error) {
      console.error('Ошибка инициализации капчи:', error);
      setCaptchaError('Не удалось загрузить капчу');
    }
  }, [reloadCaptcha]);

  // --- Улучшенная инициализация с повторными попытками ---
  useEffect(() => {
    // Если капча отключена, пропускаем инициализацию
    if (IS_CAPTCHA_DISABLED_FOR_DEV) {
        console.log("Капча отключена для разработки. Инициализация пропущена.");
        return;
    }

    let attempts = 0;
    const maxAttempts = 15;

    const init = () => {
      if (captchaContainerRef.current) {
        if (window.smartCaptcha) {
          initializeCaptcha();
        } else {
          // Ждём события от Yandex
          const onReady = () => {
            window.removeEventListener('smartcaptcha-ready', onReady);
            initializeCaptcha();
          };
          window.addEventListener('smartcaptcha-ready', onReady);

          // Дополнительная проверка
          const interval = setInterval(() => {
            if (window.smartCaptcha || attempts >= maxAttempts) {
              clearInterval(interval);
              if (window.smartCaptcha) {
                initializeCaptcha();
              } else {
                setCaptchaError('Не удалось загрузить скрипт капчи');
              }
            }
            attempts++;
          }, 100);
        }
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(init, 100); // Повтор через 100 мс
      } else {
        setCaptchaError('Контейнер капчи не найден');
      }
    };

    init();

    return () => {
      if (!IS_CAPTCHA_DISABLED_FOR_DEV) {
        window.removeEventListener('smartcaptcha-ready', initializeCaptcha);
        reloadCaptcha();
      }
    };
  }, [initializeCaptcha, reloadCaptcha]);

  // --- Отправка формы ---
  const sendFormData = async (formData) => {
    try {
      const response = await fetch(BACKEND_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
        // credentials: 'same-origin', // Обычно не нужно для API-маршрутов Next.js
      });

      let result;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        result = await response.json();
      } else {
        // Если ответ не JSON, обрабатываем как текст
        const text = await response.text();
        console.warn('Non-JSON response from server:', text);
        result = { status: response.ok ? 'success' : 'error', message: text || `Ошибка ${response.status}` };
      }

      if (!response.ok) {
        throw new Error(result.message || `Ошибка ${response.status}`);
      }

      if (result.status === 'success') {
        // Отправка события в Яндекс.Метрику
        if (window.ym) {
          try {
            window.ym(YANDEX_METRIKA_COUNTER, 'reachGoal', 'FORM_SUBMIT');
          } catch (e) {
            console.warn('Ошибка отправки в Яндекс.Метрику:', e);
          }
        }

        setSubmitSuccess(true);
        reset();
        setTimeout(() => setSubmitSuccess(false), 5000);

        // Перезагрузка капчи (если не отключена)
        if (!IS_CAPTCHA_DISABLED_FOR_DEV) {
            reloadCaptcha();
            setTimeout(initializeCaptcha, 150);
        }

        return true;
      } else {
        throw new Error(result.message || 'Ошибка сервера');
      }
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
      if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
        setSubmitError('Нет соединения с сервером. Проверьте интернет или попробуйте позже.');
      } else {
        setSubmitError(error.message || 'Произошла ошибка при отправке формы.');
      }
      return false;
    }
  };

  // --- Обработчик отправки ---
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    // Проверка капчи только если она НЕ отключена
    if (!IS_CAPTCHA_DISABLED_FOR_DEV && !captchaToken) {
      setCaptchaError('Пожалуйста, подтвердите, что вы не робот.');
      setIsSubmitting(false);
      return;
    }

    // Подготавливаем данные для отправки
    let dataToSend = { ...data };
    if (!IS_CAPTCHA_DISABLED_FOR_DEV) {
        dataToSend.smartcaptcha_token = captchaToken;
    } else {
        // Можно отправить пустую строку или опустить поле
        dataToSend.smartcaptcha_token = '';
    }

    await sendFormData(dataToSend);
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Свяжитесь с нами
            </h2>
            <p className="text-xl text-gray-600">
              Получите консультацию специалиста по транспортной безопасности
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 md:p-12">
            {submitSuccess ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4 text-green-500">✓</div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">
                  Спасибо за заявку!
                </h3>
                <p className="text-gray-600">
                  Мы свяжемся с вами в ближайшее время.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {submitError && (
                  <div className="bg-red-50 border-l-4 border-red-200 rounded-lg p-4">
                    <p className="text-red-700 text-sm">{submitError}</p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Имя *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      {...register('name')}
                      autoComplete="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Введите ваше имя"
                    />
                    {errors.name && (
                      <p className="mt-1 text-red-500 text-sm">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      {...register('email')}
                      autoComplete="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Телефон *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    {...register('phone')}
                    autoComplete="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+7 (___) ___-__-__"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Сообщение *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    {...register('message')}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Расскажите о вашем проекте..."
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* ✅ Исправлено: input вложен в label + id и name */}
                <div className="flex items-start mt-4">
                  <label className="flex items-start text-gray-600 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      id="privacy"
                      name="privacy"
                      required
                      className="mt-1 mr-2 h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                    />
                    Согласен с обработкой персональных данных *
                  </label>
                </div>

                {/* Условное отображение капчи или заглушки */}
                {!IS_CAPTCHA_DISABLED_FOR_DEV ? (
                  // Оригинальный блок капчи
                  <div className="mt-4 w-full">
                    <div
                      ref={captchaContainerRef}
                      className="captcha-container w-full h-20 relative bg-transparent flex items-center justify-center"
                      style={{ minHeight: '80px' }}
                      role="region"
                      aria-label="Проверка: я не робот"
                    ></div>

                    {captchaError && (
                      <div className="mt-2 text-center">
                        <p className="text-red-500 text-sm mb-2">
                          {captchaError}
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            reloadCaptcha();
                            setTimeout(initializeCaptcha, 150);
                          }}
                          className="text-blue-500 text-sm underline hover:text-blue-700"
                        >
                          Обновить капчу
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  // Заглушка/предупреждение для разработки
                  <div className="mt-4 p-2 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 text-sm">
                    <p>Капча отключена для локальной разработки. Отправка формы происходит без проверки "Я не робот".</p>
                  </div>
                )}

                <GlassmorphicButton
                  type="submit"
                  variant="onLight"
                  size="large"
                  disabled={isSubmitting || (!captchaToken && !IS_CAPTCHA_DISABLED_FOR_DEV)}
                  className="w-full flex items-center justify-center mt-6"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Отправка...
                    </>
                  ) : (
                    'Отправить заявку'
                  )}
                </GlassmorphicButton>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;