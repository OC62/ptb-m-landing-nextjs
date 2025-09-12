// nextjs/src/app/page.js
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import ErrorBoundary from '../components/ErrorBoundary';

// Импортируем компоненты напрямую (без lazy)
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import ServicesGrid from '../components/sections/ServicesGrid';
import CasesSlider from '../components/sections/CasesSlider';
import Careers from '../components/sections/Careers';
import Licenses from '../components/sections/Licenses';
import Partners from '../components/sections/Partners';
import CommunitySupport from '../components/sections/CommunitySupport';
import ContactForm from '../components/sections/ContactForm';

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