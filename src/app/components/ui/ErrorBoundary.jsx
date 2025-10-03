'use client';
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      showDetails: false 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      errorInfo: errorInfo,
    });

    // УДАЛЕНО: отправка ошибки в Яндекс.Метрику
    // Используем только console.error для логирования ошибок
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  toggleDetails = () => {
    this.setState(prevState => ({ showDetails: !prevState.showDetails }));
  };

  render() {
    if (this.state.hasError) {
      return (
        <div 
          className="min-h-screen flex items-center justify-center bg-gray-50 p-4"
          role="alert"
          aria-live="assertive"
        >
          <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
            <div className="mb-4" aria-hidden="true">
              <svg className="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Что-то пошло не так
            </h2>
            <p className="text-gray-700 mb-6">
              Приносим извинения за неудобства. Пожалуйста, попробуйте обновить страницу или вернуться на главную.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
              <button
                onClick={this.handleReload}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Обновить страницу
              </button>
              <button
                onClick={this.handleGoHome}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                На главную
              </button>
            </div>

            {this.state.errorInfo && (
              <div className="mt-4 text-left">
                <button
                  onClick={this.toggleDetails}
                  className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                  aria-expanded={this.state.showDetails}
                >
                  {this.state.showDetails ? 'Скрыть детали' : 'Показать детали ошибки'}
                </button>
                
                {this.state.showDetails && (
                  <div className="mt-2 p-3 bg-gray-100 rounded text-xs">
                    <p className="font-mono text-red-600 mb-2">
                      {this.state.error?.toString() || 'Неизвестная ошибка'}
                    </p>
                    <pre className="overflow-auto max-h-32">
                      {this.state.errorInfo.componentStack || 'Нет дополнительной информации'}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;