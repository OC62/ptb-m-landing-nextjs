'use client';
import Image from 'next/image';
// nextjs/src/app/components/layout/Header.jsx


import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import GlassmorphicButton from '../ui/GlassmorphicButton';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const headerRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

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
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 100);
  };

  const scrollToContact = () => {
    router.push('/#contact');
  };

  const navItems = [
    { name: 'Главная', href: '/', aria: 'Перейти на главную страницу' },
    {
      name: 'О компании',
      href: '/about',
      aria: 'Открыть меню о компании',
      submenu: [
        { name: 'О нас', href: '/about', aria: 'Перейти к информации о компании' },
        { name: 'Преимущества', href: '/about', aria: 'Перейти к преимуществам' },
        { name: 'Лицензии', href: '/licenses', aria: 'Перейти к лицензиям' },
        { name: 'Партнеры', href: '/partners', aria: 'Перейти к партнерам' },
      ],
    },
    {
      name: 'Услуги',
      href: '/services',
      aria: 'Открыть меню услуг',
      submenu: [
        { name: 'Все услуги', href: '/services', aria: 'Перейти ко всем услугам' },
        { name: 'Аудит безопасности', href: '/services', aria: 'Перейти к аудиту безопасности' },
        { name: 'Мониторинг угроз', href: '/services', aria: 'Перейти к мониторингу угроз' },
        { name: 'Обучение персонала', href: '/services', aria: 'Перейти к обучению персонала' },
        { name: 'Техническое оснащение', href: '/services', aria: 'Перейти к техническому оснащению' },
      ],
    },
    {
      name: 'Проекты',
      href: '/cases',
      aria: 'Открыть меню проектов',
      submenu: [
        { name: 'Наши кейсы', href: '/cases', aria: 'Перейти к нашим кейсам' },
        { name: 'Реализованные проекты', href: '/cases', aria: 'Перейти к реализованным проектам' },
        { name: 'Социальная ответственность', href: '/community', aria: 'Перейти к социальной ответственности' },
      ],
    },
    {
      name: 'Вакансии',
      href: '/careers',
      aria: 'Открыть меню вакансий',
      submenu: [
        { name: 'Текущие вакансии', href: '/careers', aria: 'Перейти к текущим вакансиям' },
        { name: 'Карьера в компании', href: '/careers', aria: 'Перейти к карьере в компании' },
      ],
    },
    { name: 'Контакты', href: '/contacts', aria: 'Перейти к контактам' },
  ];

  const DropdownMenu = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef(null);

    const handleMouseEnter = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsOpen(true);
    };

    const handleMouseLeave = () => {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 100);
    };

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    return (
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          href={item.href}
          className="flex items-center text-gray-700 hover:text-primary font-medium transition-colors text-xs lg:text-sm whitespace-nowrap py-2 px-2 group focus-visible"
          onClick={() => setIsMenuOpen(false)}
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-label={item.aria}
        >
          {item.name}
          <svg
            className="ml-1 w-3 h-3 transition-transform duration-200 group-hover:rotate-180"
            viewBox="0 0 12 12"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M6 8.5L2.5 5l.7-.7L6 7.1l2.8-2.8.7.7L6 8.5z" />
          </svg>
        </Link>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1 }}
            className="absolute w-56 bg-white rounded-md shadow-xl py-1 z-[9999] border border-gray-100 top-full mt-1 left-0"
            style={{
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto',
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role="menu"
          >
            {item.submenu.map((subItem, index) => (
              <Link
                key={index}
                href={subItem.href}
                className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors whitespace-normal focus-visible ${pathname === subItem.href ? 'bg-blue-50 text-primary font-medium' : ''}`}
                onClick={() => setIsMenuOpen(false)}
                role="menuitem"
                aria-label={subItem.aria}
              >
                {subItem.name}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <header
      ref={headerRef}
      className="fixed w-full bg-white/90 backdrop-blur-sm shadow-sm z-50"
      style={{ overflow: 'visible' }}
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Логотип с названием компании */}
          <div
            className="flex items-center space-x-2 cursor-pointer focus-visible"
            onClick={() => router.push('/')}
            onKeyPress={(e) => e.key === 'Enter' && router.push('/')}
            tabIndex={0}
            role="button"
            aria-label="Перейти на главную страницу"
          >
            <Image  src="/images/preloader.png"  alt="Логотип ООО ПТБ-М"  width={100}  height={194} className="h-8" />
            <span className="header-company-name">
              ООО "ПТБ-М"
            </span>
          </div>
          
          {/* Навигация для десктопа */}
          <nav
            className={`${isMobileView ? 'hidden' : 'flex'} items-center space-x-2`}
            role="navigation"
            aria-label="Основное меню"
          >
            <div className="flex space-x-2">
              {navItems.map((item, index) =>
                item.submenu ? (
                  <DropdownMenu
                    key={index}
                    item={item}
                  />
                ) : (
                  <Link
                    key={index}
                    href={item.href}
                    className={`text-gray-700 hover:text-primary font-medium transition-colors text-xs lg:text-sm whitespace-nowrap py-2 px-2 focus-visible ${pathname === item.href ? 'text-primary font-bold' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                    aria-label={item.aria}
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
            onClick={scrollToContact}
            className={`${isMobileView ? 'hidden' : 'block'} text-xs focus-visible`}
            aria-label="Получить консультацию"
          >
            Получить консультацию
          </GlassmorphicButton>
          
          {/* Кнопка мобильного меню */}
          <button
            className={`${isMobileView ? 'block' : 'hidden'} text-gray-700 hover:text-primary transition-colors focus-visible p-2 rounded`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
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
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="py-4 border-t border-gray-200"
            style={{ maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}
            role="menu"
          >
            <div className="space-y-3">
              {navItems.map((item, index) => (
                <div key={index}>
                  {item.submenu ? (
                    <div>
                      <Link
                        href={item.href}
                        className="flex items-center w-full text-left px-2 py-2 text-gray-700 hover:text-primary font-medium transition-colors focus-visible"
                        onClick={() => setIsMenuOpen(false)}
                        aria-expanded="false"
                      >
                        {item.name}
                        <svg
                          className="ml-1 w-3 h-3"
                          viewBox="0 0 12 12"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M6 8.5L2.5 5l.7-.7L6 7.1l2.8-2.8.7.7L6 8.5z" />
                        </svg>
                      </Link>
                      <div className="pl-4 space-y-2" role="menu">
                        {item.submenu.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            className={`block text-gray-700 hover:text-primary font-medium py-1 px-2 w-full text-left text-sm transition-colors focus-visible ${pathname === subItem.href ? 'text-primary font-medium' : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                            role="menuitem"
                            aria-label={subItem.aria}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block text-gray-700 hover:text-primary font-medium py-2 px-2 w-full text-left transition-colors focus-visible ${pathname === item.href ? 'text-primary font-bold' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                      role="menuitem"
                      aria-label={item.aria}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <GlassmorphicButton
                variant="onWhite"
                size="large"
                onClick={scrollToContact}
                className="w-full mt-4 focus-visible"
                aria-label="Получить консультацию"
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