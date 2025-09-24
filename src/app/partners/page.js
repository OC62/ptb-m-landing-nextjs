// src/app/partners/page.js
import Partners from '@/components/sections/Partners';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs />
      <main role="main">
        <Partners />
      </main>
    </div>
  );
}

export const metadata = {
  title: 'Партнеры | ООО "ПТБ-М" - Наши клиенты и партнеры',
  description: 'ООО "ПТБ-М" сотрудничает с ведущими компаниями и организациями России. Наши партнеры в сфере транспортной инфраструктуры.',
  keywords: 'партнеры ПТБ-М, клиенты, сотрудничество, транспортная инфраструктура, компании-партнеры',
};