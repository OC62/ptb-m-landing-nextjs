'use client';
import { useRouter, usePathname } from 'next/navigation';

export const useNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navigateToContact = () => {
    if (pathname === '/') {
      // На главной странице - скроллим к форме
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const headerHeight = 80;
        const elementPosition = contactSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else if (pathname === '/contacts') {
      // На странице контактов - скроллим к форме
      const contactSection = document.getElementById('contact-form');
      if (contactSection) {
        const headerHeight = 80;
        const elementPosition = contactSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // На других страницах - переходим на страницу контактов
      router.push('/contacts');
    }
  };

  return { navigateToContact };
};