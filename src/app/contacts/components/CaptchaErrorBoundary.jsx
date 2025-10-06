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
    console.log('Captcha error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 border border-yellow-300 bg-yellow-50 rounded-lg">
          <p className="text-yellow-800 text-sm">
            Проверка безопасности временно недоступна. Вы можете отправить форму без проверки.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default CaptchaErrorBoundary;