// nextjs/src/app/components/layout/DropdownMenu.jsx
'use client';

import { motion } from 'framer-motion'; // ✅ Добавили импорт motion
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const DropdownMenu = ({ item, scrollToSection, setIsMenuOpen, pathname }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({
    vertical: 'bottom',
    horizontal: 'left',
  });
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
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

  useEffect(() => {
    if (isOpen && dropdownRef.current && buttonRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;
      const verticalPosition =
        spaceBelow < dropdownRect.height && spaceAbove > dropdownRect.height
          ? 'top'
          : 'bottom';
      const spaceRight = window.innerWidth - buttonRect.left;
      const spaceLeft = buttonRect.right;
      let horizontalPosition = 'left';
      if (spaceRight < dropdownRect.width && spaceLeft > dropdownRect.width) {
        horizontalPosition = 'right';
      }
      setPosition({
        vertical: verticalPosition,
        horizontal: horizontalPosition,
      });
    }
  }, [isOpen]);

  return (
    <div
      className="relative dropdown-menu"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={buttonRef}
        className="flex items-center text-gray-700 hover:text-primary font-medium transition-colors text-xs lg:text-sm whitespace-nowrap py-2 px-2 group"
      >
        {item.name}
        <svg
          className="ml-1 w-3 h-3 transition-transform duration-200 group-hover:rotate-180"
          viewBox="0 0 12 12"
          fill="currentColor"
        >
          <path d="M6 8.5L2.5 5l.7-.7L6 7.1l2.8-2.8.7.7L6 8.5z" />
        </svg>
      </button>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: position.vertical === 'bottom' ? -10 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
          className={`absolute w-56 bg-white rounded-md shadow-xl py-1 z-[9999] border border-gray-100 ${
            position.vertical === 'bottom'
              ? 'top-full mt-1'
              : 'bottom-full mb-1'
          } ${position.horizontal === 'right' ? 'right-0' : 'left-0'}`}
          style={{
            maxHeight: 'calc(100vh - 100px)',
            overflowY: 'auto',
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {item.submenu.map((subItem, index) => {
            // Определяем путь для подменю
            let href = '/';
            switch (subItem.name) {
              case 'О нас':
              case 'Преимущества':
                href = '/about';
                break;
              case 'Лицензии':
                href = '/licenses';
                break;
              case 'Партнеры':
                href = '/partners';
                break;
              case 'Все услуги':
              case 'Аудит безопасности':
              case 'Мониторинг угроз':
              case 'Обучение персонала':
              case 'Техническое оснащение':
                href = '/services';
                break;
              case 'Наши кейсы':
              case 'Реализованные проекты':
                href = '/cases';
                break;
              case 'Социальная ответственность':
                href = '/community';
                break;
              case 'Текущие вакансии':
              case 'Карьера в компании':
                href = '/careers';
                break;
              default:
                href = '/';
            }

            const isActive = pathname === href;

            return (
              <Link
                key={index}
                href={href}
                className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors whitespace-normal ${
                  isActive
                    ? 'bg-blue-50 text-primary font-medium'
                    : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {subItem.name}
              </Link>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default DropdownMenu;