// src/app/contacts/components/CaptchaErrorBoundary.jsx
'use client';

import { Component } from 'react';

class CaptchaErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('Captcha failed to load:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 border border-yellow-300 bg-yellow-50 rounded-lg">
          <p className="text-yellow-800">Капча временно недоступна. Пожалуйста, попробуйте отправить форму позже.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default CaptchaErrorBoundary;