// nextjs/src/app/page.js
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import ErrorBoundary from '@/app/components/ErrorBoundary';

// Импортируем компоненты напрямую (без lazy)
import Hero from '@/app/components/sections/Hero';
import About from '@/app/components/sections/About';
import ServicesGrid from '@/app/components/sections/ServicesGrid';
import CasesSlider from '@/app/components/sections/CasesSlider';
import Careers from '@/app/components/sections/Careers';
import Licenses from '@/app/components/sections/Licenses';
import Partners from '@/app/components/sections/Partners';
import CommunitySupport from '@/app/components/sections/CommunitySupport';
import ContactForm from '@/app/components/sections/ContactForm';

export default function Home() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <Header />
        <Breadcrumbs />
        <main>
          <Hero />
          <About />
          <ServicesGrid />
          <CasesSlider />
          <Careers />
          <Licenses />
          <Partners />
          <CommunitySupport />
          <ContactForm />
        </main>
        <Footer />   
      </div>
    </ErrorBoundary>
  );
}