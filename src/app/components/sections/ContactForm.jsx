'use client';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion'; // Добавлен импорт motion
import GlassmorphicButton from '../ui/GlassmorphicButton';
import StandaloneCaptcha from '../../contacts/components/StandaloneCaptcha';

const ContactForm = ({ isStandalone = false }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [captchaStatus, setCaptchaStatus] = useState('checking');

  // Проверяем валидность капчи
  useEffect(() => {
    const checkCaptcha = () => {
      const token = localStorage.getItem('yandex_captcha_token');
      const timestamp = localStorage.getItem('yandex_captcha_timestamp');
      
      if (!token) {
        setCaptchaStatus('missing');
        return;
      }

      if (timestamp && (Date.now() - parseInt(timestamp)) < 120000) { // 2 минуты
        setCaptchaStatus('valid');
      } else {
        setCaptchaStatus('expired');
      }
    };

    checkCaptcha();
    // Проверяем каждые 10 секунд
    const interval = setInterval(checkCaptcha, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Неверный формат email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Телефон обязателен';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Сообщение обязательно';
    }

    if (captchaStatus !== 'valid') {
      setSubmitError('Пожалуйста, пройдите проверку безопасности');
      return false;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendFormData = async (data) => {
    try {
      const token = localStorage.getItem('yandex_captcha_token');
      
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          smartcaptcha_token: token
        }),
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
        setFormData({ name: '', email: '', phone: '', message: '' });
        // Очищаем использованный токен
        localStorage.removeItem('yandex_captcha_token');
        localStorage.removeItem('yandex_captcha_timestamp');
        setCaptchaStatus('missing');
        
        setTimeout(() => setSubmitSuccess(false), 5000);
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

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    await sendFormData(formData);
    setIsSubmitting(false);
  };

  const getCaptchaMessage = () => {
    switch (captchaStatus) {
      case 'valid':
        return { type: 'success', text: '✓ Проверка безопасности пройдена' };
      case 'expired':
        return { type: 'error', text: '✗ Токен проверки истек. Пройдите проверку снова.' };
      case 'missing':
        return { type: 'error', text: '✗ Требуется пройти проверку безопасности.' };
      default:
        return { type: 'info', text: 'Проверка безопасности...' };
    }
  };

  const captchaMessage = getCaptchaMessage();

  return (
    <div className={`${isStandalone ? 'min-h-screen pt-20' : 'py-16'} bg-transparent`}>
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {isStandalone ? 'Свяжитесь с нами' : 'Готовы начать сотрудничество?'}
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            {isStandalone 
              ? 'Оставьте заявку и мы свяжемся с вами в ближайшее время'
              : 'Оставьте заявку и наши специалисты свяжутся с вами для консультации'
            }
          </p>
        </motion.div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200">
          <form onSubmit={onSubmit} className="space-y-6" noValidate>
            {submitError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg" role="alert" aria-live="assertive">
                <p className="text-red-700 text-sm font-medium">{submitError}</p>
              </div>
            )}

            {/* Captcha Status */}
            <div className={`p-4 rounded-lg border-l-4 ${
              captchaMessage.type === 'success' 
                ? 'bg-green-50 border-green-500 text-green-700'
                : captchaMessage.type === 'error'
                ? 'bg-red-50 border-red-500 text-red-700'
                : 'bg-blue-50 border-blue-500 text-blue-700'
            }`}>
              <p className="text-sm font-medium">{captchaMessage.text}</p>
            </div>

            {/* Капча для всех форм */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <StandaloneCaptcha />
            </div>

            {submitSuccess ? (
              <div className="text-center py-8" role="alert" aria-live="polite">
                <div className="text-5xl mb-4 text-green-500" aria-hidden="true">✓</div>
                <h4 className="text-2xl font-bold text-green-600 mb-2">
                  Спасибо за заявку!
                </h4>
                <p className="text-gray-700">
                  Мы свяжемся с вами в ближайшее время.
                </p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Имя *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 focus:outline-none"
                      placeholder="Введите ваше имя"
                      aria-invalid={errors.name ? "true" : "false"}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-red-500 text-sm" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 focus:outline-none"
                      placeholder="your@email.com"
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-red-500 text-sm" role="alert">
                        {errors.email}
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
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 focus:outline-none"
                    placeholder="+7 (___) ___-__-__"
                    aria-invalid={errors.phone ? "true" : "false"}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-1 text-red-500 text-sm" role="alert">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Сообщение *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 focus:outline-none"
                    placeholder="Расскажите о вашем проекте..."
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  ></textarea>
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-red-500 text-sm" role="alert">
                      {errors.message}
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

                <GlassmorphicButton
                  type="submit"
                  variant="onLight"
                  size="large"
                  disabled={isSubmitting || captchaStatus !== 'valid'}
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
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;