"use client";
import React, { useState, useRef, useCallback } from 'react';
import GlassmorphicButton from '../ui/GlassmorphicButton';

const ContactForm = () => {
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
  
  // Капча временно отключена
  const IS_CAPTCHA_DISABLED = true;

  // Безопасная отправка целей в Яндекс.Метрику
  const sendGoal = useCallback((goalName) => {
    if (typeof window !== 'undefined' && window.ym) {
      try {
        setTimeout(() => {
          if (window.ym && typeof window.ym.reachGoal === 'function') {
            window.ym(103534344, 'reachGoal', goalName);
          }
        }, 100);
      } catch (e) {
        console.warn('Yandex Metrika goal error:', e);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очищаем ошибку при изменении поля
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendFormData = async (data) => {
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          smartcaptcha_token: IS_CAPTCHA_DISABLED ? 'test_token_disabled' : ''
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
        // Отправляем цель в Яндекс.Метрику
        sendGoal('FORM_SUBMIT');

        setSubmitSuccess(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
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

  return (
    <section id="contact" className="py-20 bg-white" aria-labelledby="contact-heading">
      {/* ... остальной JSX без изменений ... */}
    </section>
  );
};

export default ContactForm;