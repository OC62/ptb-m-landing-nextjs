// src/app/components/DynamicBreadcrumbSchema.jsx
"use client";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { generateBreadcrumbSchema } from '../seo.config';

export default function DynamicBreadcrumbSchema() {
  const pathname = usePathname();
  const [schema, setSchema] = useState('');

  useEffect(() => {
    if (pathname) {
      const breadcrumbs = [
        { name: 'Главная', url: '/' }
      ];

      // Добавляем текущую страницу в цепочку навигации
      if (pathname !== '/') {
        const pathMap = {
          '/about': 'О компании',
          '/services': 'Услуги',
          '/careers': 'Карьера',
          '/contacts': 'Контакты',
          '/licenses': 'Лицензии',
          '/partners': 'Партнеры',
          '/community': 'Сообщество',
          '/policy': 'Политика конфиденциальности',
          '/cases': 'Кейсы',
        };

        const currentPageName = pathMap[pathname];
        if (currentPageName) {
          breadcrumbs.push({ 
            name: currentPageName, 
            url: pathname 
          });
        } else {
          // Для неизвестных путей используем базовое название
          const pathSegment = pathname.split('/').pop();
          breadcrumbs.push({ 
            name: pathSegment || pathname, 
            url: pathname 
          });
        }
      }

      const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
      setSchema(breadcrumbSchema);
    }
  }, [pathname]);

  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schema }}
    />
  );
}