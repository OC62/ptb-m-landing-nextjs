"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import GlassmorphicButton from '../ui/GlassmorphicButton';

const schema = yup
  .object({
    name: yup.string().required('Имя обязательно'),
    email: yup.string().email('Неверный формат email').required('Email обязателен'),
    phone: yup.string().required('Телефон обязателен'),
    message: yup.string().required('Сообщение обязательно'),
  })
  .required();

const BACKEND_ENDPOINT = '/api/send';
const CAPTCHA_SITE_KEY = 'ysc1_681R2JVIY5o2ATwA42ZLkMeQdsQFKMu1eVaFX7Zm00b26bf0';
const IS_CAPTCHA_DISABLED_FOR_DEV = false;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [captchaLoaded, setCaptchaLoaded] = useState(false);
  
  const captchaContainerRef = useRef(null);
  const widgetId = useRef(null);
  const isMounted = useRef(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Безопасное управление капчей
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
    setCaptchaLoaded(false);
  }, []);

  const initializeCaptcha = useCallback(() => {
    if (!isMounted.current) return;
    
    if (IS_CAPTCHA_DISABLED_FOR_DEV) {
      setCaptchaLoaded(true);
      return;
    }

    if (!captchaContainerRef.current) {
      setTimeout(initializeCaptcha, 100);
      return;
    }

    if (!window.smartCaptcha) {
      console.log('SmartCaptcha еще не загружен, ждем...');
      setCaptchaError('Капча загружается...');
      
      const checkCaptcha = setInterval(() => {
        if (window.smartCaptcha) {
          clearInterval(checkCaptcha);
          initializeCaptcha();
        }
      }, 100);

      setTimeout(() => {
        clearInterval(checkCaptcha);
        if (!window.smartCaptcha && isMounted.current) {
          setCaptchaError('Не удалось загрузить капчу. Обновите страницу.');
        }
      }, 10000);
      
      return;
    }

    if (!CAPTCHA_SITE_KEY) {
      setCaptchaError('Ключ капчи не настроен');
      return;
    }

    // Очистка предыдущей капчи
    if (captchaContainerRef.current) {
      captchaContainerRef.current.innerHTML = '';
    }

    try {
      widgetId.current = window.smartCaptcha.render(captchaContainerRef.current, {
        sitekey: CAPTCHA_SITE_KEY,
        hl: 'ru',
        callback: (token) => {
          if (isMounted.current) {
            setCaptchaToken(token);
            setCaptchaError('');
            setCaptchaLoaded(true);
          }
        },
        'error-callback': (error) => {
          console.error('Yandex SmartCaptcha error:', error);
          if (isMounted.current) {
            setCaptchaError('Ошибка капчи. Попробуйте ещё раз.');
            setCaptchaLoaded(false);
          }
        },
      });
      if (isMounted.current) {
        setCaptchaLoaded(true);
      }
    } catch (error) {
      console.error('Ошибка инициализации капчи:', error);
      if (isMounted.current) {
        setCaptchaError('Не удалось загрузить капчу');
        setCaptchaLoaded(false);
      }
    }
  }, []);

  // Инициализация и очистка капчи
  useEffect(() => {
    isMounted.current = true;
    initializeCaptcha();

    return () => {
      isMounted.current = false;
      if (!IS_CAPTCHA_DISABLED_FOR_DEV) {
        reloadCaptcha();
      }
    };
  }, [initializeCaptcha, reloadCaptcha]);

  const sendFormData = async (formData) => {
    try {
      const response = await fetch(BACKEND_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      let result;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        result = await response.json();
      } else {
        const text = await response.text();
        result = { status: response.ok ? 'success' : 'error', message: text || `Ошибка ${response.status}` };
      }

      if (!response.ok) throw new Error(result.message || `Ошибка ${response.status}`);

      if (result.status === 'success') {
        setSubmitSuccess(true);
        reset();
        setTimeout(() => setSubmitSuccess(false), 5000);

        if (!IS_CAPTCHA_DISABLED_FOR_DEV) {
          reloadCaptcha();
          setTimeout(initializeCaptcha, 500);
        }

        return true;
      } else throw new Error(result.message || 'Ошибка сервера');
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
      if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
        setSubmitError('Нет соединения с сервером. Проверьте интернет или попробуйте позже.');
      } else setSubmitError(error.message || 'Произошла ошибка при отправке формы.');
      return false;
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    if (!IS_CAPTCHA_DISABLED_FOR_DEV && !captchaToken) {
      setCaptchaError('Пожалуйста, подтвердите, что вы не робот.');
      setIsSubmitting(false);
      return;
    }

    const processedData = { ...data };

    if (!IS_CAPTCHA_DISABLED_FOR_DEV) processedData.smartcaptcha_token = captchaToken;
    else processedData.smartcaptcha_token = 'test_token_disabled';

    await sendFormData(processedData);
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 bg-white" aria-labelledby="contact-heading">
      <h2 id="contact-heading" className="sr-only">Форма обратной связи</h2>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Свяжитесь с нами
            </h3>
            <p className="text-xl text-gray-700">
              Получите консультацию специалиста по транспортной безопасности
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 md:p-12">
            {submitSuccess ? (
              <div className="text-center py-12" role="alert" aria-live="polite">
                <div className="text-5xl mb-4 text-green-500" aria-hidden="true">✓</div>
                <h4 className="text-2xl font-bold text-green-600 mb-2">
                  Спасибо за заявку!
                </h4>
                <p className="text-gray-700">
                  Мы свяжемся с вами в ближайшее время.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                {submitError && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg" role="alert" aria-live="assertive">
                    <p className="text-red-700 text-sm font-medium">{submitError}</p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Имя *
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register('name')}
                      autoComplete="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 focus:outline-none"
                      placeholder="Введите ваше имя"
                      aria-invalid={errors.name ? "true" : "false"}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-red-500 text-sm" role="alert">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      autoComplete="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 focus:outline-none"
                      placeholder="your@email.com"
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-red-500 text-sm" role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                    Телефон *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    autoComplete="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 focus:outline-none"
                    placeholder="+7 (___) ___-__-__"
                    aria-invalid={errors.phone ? "true" : "false"}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-1 text-red-500 text-sm" role="alert">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Сообщение *
                  </label>
                  <textarea
                    id="message"
                    {...register('message')}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 focus:outline-none"
                    placeholder="Расскажите о вашем проекте..."
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  ></textarea>
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-red-500 text-sm" role="alert">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="privacy"
                    required
                    className="mt-1 mr-2 h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300 focus:outline-none"
                  />
                  <label htmlFor="privacy" className="text-gray-700 text-sm cursor-pointer">
                    Согласен с обработкой персональных данных *
                  </label>
                </div>

                {!IS_CAPTCHA_DISABLED_FOR_DEV ? (
                  <div className="mt-4 w-full">
                    <div
                      ref={captchaContainerRef}
                      className="captcha-container w-full h-20 relative bg-transparent flex items-center justify-center border border-gray-300 rounded-lg"
                      style={{ minHeight: '80px' }}
                      role="region"
                      aria-label="Проверка: я не робот"
                    >
                      {!captchaLoaded && !captchaError && (
                        <div className="text-gray-500 text-sm">
                          Загрузка капчи...
                        </div>
                      )}
                    </div>
                    {captchaError && (
                      <div className="mt-2 text-center">
                        <p className="text-red-500 text-sm mb-2" role="alert">
                          {captchaError}
                        </p>
                        <button
                          type="button"
                          onClick={() => { 
                            reloadCaptcha(); 
                            setTimeout(initializeCaptcha, 500); 
                          }}
                          className="text-blue-500 text-sm underline hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                        >
                          Обновить капчу
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mt-4 p-2 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 text-sm">
                    <p>Капча отключена для локальной разработки.</p>
                  </div>
                )}

                <GlassmorphicButton
                  type="submit"
                  variant="onLight"
                  size="large"
                  disabled={isSubmitting || (!captchaToken && !IS_CAPTCHA_DISABLED_FOR_DEV)}
                  className="w-full flex items-center justify-center mt-6 focus-visible"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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