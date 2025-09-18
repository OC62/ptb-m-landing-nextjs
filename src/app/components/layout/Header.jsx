// nextjs/src/app/components/layout/Header.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import GlassmorphicButton from '../ui/GlassmorphicButton';
import DropdownMenu from './DropdownMenu'; // 🔥 Подключаем новый компонент

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // состояние открытия мобильного меню
  const [isMobileView, setIsMobileView] = useState(false); // отслеживаем мобильный режим просмотра
  const headerRef = useRef(null); // ссылка на заголовок
  const pathname = usePathname(); // получаем текущий адрес страницы

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 1024);
    };
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  useEffect(() => {
    if (isMenuOpen && isMobileView) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, isMobileView]);

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const id = sectionId.startsWith('#') ? sectionId.slice(1) : sectionId;
      const element = document.getElementById(id);
      if (element) {
        const headerHeight = headerRef.current?.offsetHeight || 0;
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 100);
  };

  const navItems = [
    { name: 'Главная', href: '/' },
    {
      name: 'О компании',
      href: '/about',
      submenu: [
        { name: 'О нас', href: '/about' },
        { name: 'Преимущества', href: '/about' },
        { name: 'Лицензии', href: '/licenses' },
        { name: 'Партнеры', href: '/partners' },
      ],
    },
    {
      name: 'Услуги',
      href: '/services',
      submenu: [
        { name: 'Все услуги', href: '/services' },
        { name: 'Аудит безопасности', href: '/services' },
        { name: 'Мониторинг угроз', href: '/services' },
        { name: 'Обучение персонала', href: '/services' },
        { name: 'Техническое оснащение', href: '/services' },
      ],
    },
    {
      name: 'Проекты',
      href: '/cases',
      submenu: [
        { name: 'Наши кейсы', href: '/cases' },
        { name: 'Реализованные проекты', href: '/cases' },
        { name: 'Социальная ответственность', href: '/community' },
      ],
    },
    {
      name: 'Вакансии',
      href: '/careers',
      submenu: [
        { name: 'Текущие вакансии', href: '/careers' },
        { name: 'Карьера в компании', href: '/careers' },
      ],
    },
    { name: 'Контакты', href: '/contacts' },
  ];

  return (
    <header
      ref={headerRef}
      className="fixed w-full bg-white/90 backdrop-blur-sm shadow-sm z-50"
      style={{ overflow: 'visible' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Логотип с названием компании */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => scrollToSection('#hero')}
          >
            <img src="/images/logo.webp" alt="Логотип ООО ПТБ-М" className="h-8" />
            <span className="text-xl lg:text-base font-bold text-primary">ООО "ПТБ-М"</span>
          </div>
          
          {/* Навигация для десктопа */}
          <nav
            className={`${isMobileView ? 'hidden' : 'flex'} items-center space-x-2`}
          >
            <div className="flex space-x-2">
              {navItems.map((item, index) =>
                item.submenu ? (
                  <DropdownMenu
                    key={index}
                    item={item}
                    scrollToSection={scrollToSection}
                    setIsMenuOpen={setIsMenuOpen}
                    pathname={pathname} // 🔥 Добавил передачу current path
                  />
                ) : (
                  <Link
                    key={index}
                    href={item.href}
                    className={`text-gray-700 hover:text-primary font-medium transition-colors text-xs lg:text-sm whitespace-nowrap py-2 px-2 ${
                      pathname === item.href ? 'text-primary font-bold' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>
          </nav>
          
          {/* Кнопка CTA для десктопа */}
          <GlassmorphicButton
            variant="onWhite"
            size="large"
            onClick={() => scrollToSection('#contact')}
            className={`${isMobileView ? 'hidden' : 'block'} text-xs`}
          >
            Получить консультацию
          </GlassmorphicButton>
          
          {/* Кнопка мобильного меню */}
          <button
            className={`${isMobileView ? 'block' : 'hidden'} text-gray-700 hover:text-primary transition-colors`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 18"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        
        {/* Мобильное меню */}
        {isMenuOpen && isMobileView && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="py-4 border-t border-gray-200"
            style={{ maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}
          >
            <div className="space-y-3">
              {navItems.map((item, index) => (
                <div key={index}>
                  {item.submenu ? (
                    <DropdownMenu
                      item={item}
                      scrollToSection={scrollToSection}
                      setIsMenuOpen={setIsMenuOpen}
                      pathname={pathname} // 🔥 Добавил передачу current path
                    />
                  ) : (
                    <Link
                      href={item.href}
                      className={`block text-gray-700 hover:text-primary font-medium py-2 px-2 w-full text-left transition-colors ${
                        pathname === item.href ? 'text-primary font-bold' : ''
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <GlassmorphicButton
                variant="onWhite"
                size="large"
                onClick={() => scrollToSection('#contact')}
                className="w-full mt-4"
              >
                Получить консультацию
              </GlassmorphicButton>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;