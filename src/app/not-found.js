// src/app/not-found.js
import Link from 'next/link';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

export default function NotFound() {
  return (
    <>
      {/* Используем ваш Header */}
      <Header />

      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-2xl w-full text-center">
          {/* Иконка 404 */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <span className="text-5xl font-bold">4</span>
              <span className="text-5xl font-bold mx-2">0</span>
              <span className="text-5xl font-bold">4</span>
            </div>
          </div>

          {/* Заголовок */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Страница не найдена
          </h1>

          {/* Описание */}
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Извините, запрашиваемая вами страница не существует или была перемещена.
          </p>

          {/* Кнопки навигации */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/" 
              className="btn-primary inline-block"
            >
              На главную
            </Link>
            <Link 
              href="/contacts" 
              className="btn-secondary inline-block"
            >
              Контакты
            </Link>
          </div>
        </div>
      </main>

      {/* Используем ваш Footer */}
      <Footer />
    </>
  );
}