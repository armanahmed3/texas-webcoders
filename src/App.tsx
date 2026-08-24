import React, { useState, useEffect } from 'react';
import { ThreeBackgroundCanvas } from './components/ThreeBackgroundCanvas';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustIndicatorsSection } from './components/TrustIndicatorsSection';
import { TestimonialsVideoSection } from './components/TestimonialsVideoSection';
import { PortfolioShowcaseSection } from './components/PortfolioShowcaseSection';
import { ProcessSection } from './components/ProcessSection';
import { ServicesSection } from './components/ServicesSection';
import { PricingSection } from './components/PricingSection';
import { AboutSection } from './components/AboutSection';
import { TestimonialsPage } from './components/TestimonialsPage';
import { InsightsSection, ARTICLES_LIST, Article } from './components/InsightsSection';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { BlogDetailPage } from './components/BlogDetailPage';
import { ReviewsFaqSection } from './components/ReviewsFaqSection';
import { ContactSection } from './components/ContactSection';
import { MapLocationSection } from './components/MapLocationSection';
import { Footer } from './components/Footer';
import { SlideControls } from './components/SlideControls';
import { ProjectModal } from './components/ProjectModal';
import { CustomQuoteCalculatorModal } from './components/CustomQuoteCalculatorModal';
import { BookAppointmentModal } from './components/BookAppointmentModal';
import { TechStackMarquee } from './components/TechStackMarquee';
import { LiveChatWidget } from './components/LiveChatWidget';
import { BackToTopButton } from './components/BackToTopButton';
import { PortfolioProject, PricingPackage, ServiceItem } from './types';
import { motion, AnimatePresence } from 'motion/react';

// Framer Motion Page Transition Wrapper for Multi-Page View
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, filter: 'blur(8px)', scale: 0.98 }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
    exit={{ opacity: 0, y: -30, filter: 'blur(8px)', scale: 0.98 }}
    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    className="w-full flex-1"
  >
    {children}
  </motion.div>
);

export default function App() {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [isSlideMode, setIsSlideMode] = useState<boolean>(true); // Multi-Page view active by default
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<PricingPackage | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeServiceDetail, setActiveServiceDetail] = useState<ServiceItem | null>(null);
  const [activeBlogArticle, setActiveBlogArticle] = useState<Article | null>(null);
  const [dynamicArticles, setDynamicArticles] = useState<Article[]>(ARTICLES_LIST);
  const [quoteCalculatorOpen, setQuoteCalculatorOpen] = useState<boolean>(false);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState<boolean>(false);

  // Sync live published blog articles
  useEffect(() => {
    fetch('/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.blogs) && data.blogs.length > 0) {
          setDynamicArticles(data.blogs);
        }
      })
      .catch(() => {});
  }, [activeBlogArticle]);

  const totalSlides = 10;
  const sectionIds = ['home', 'portfolio', 'process', 'services', 'packages', 'about', 'testimonials', 'insights', 'faq', 'contact'];

  // Hash navigation listener & route state sync
  useEffect(() => {
    const syncHashToSlide = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const matchedIdx = sectionIds.indexOf(hash);
      if (matchedIdx !== -1) {
        setActiveServiceDetail(null);
        setActiveBlogArticle(null);
        setActiveSlide(matchedIdx);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    syncHashToSlide();
    window.addEventListener('hashchange', syncHashToSlide);
    return () => window.removeEventListener('hashchange', syncHashToSlide);
  }, []);

  // Keyboard navigation between pages in multi-page mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProject || quoteCalculatorOpen || activeServiceDetail || activeBlogArticle) return;

      if (e.ctrlKey || e.altKey) {
        if (e.key === 'ArrowRight') {
          handleNavigateSlide(Math.min(totalSlides - 1, activeSlide + 1));
        } else if (e.key === 'ArrowLeft') {
          handleNavigateSlide(Math.max(0, activeSlide - 1));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlide, selectedProject, quoteCalculatorOpen, activeServiceDetail, activeBlogArticle]);

  // Navigate to specific standalone page or scroll to section
  const handleNavigateSlide = (slideIndex: number) => {
    setActiveServiceDetail(null);
    setActiveBlogArticle(null);
    setActiveSlide(slideIndex);

    const targetHash = `#/${sectionIds[slideIndex]}`;
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash);
    }

    if (!isSlideMode) {
      const targetElement = document.getElementById(sectionIds[slideIndex]);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    // Scroll to top of the new page view
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSimilarProject = (project: PortfolioProject) => {
    setSelectedPackage(null);
    setSelectedService({
      id: 'custom',
      title: `Similar to ${project.title}`,
      description: project.subtitle,
      icon: '✨',
      features: project.keyFeatures,
      deliverables: project.techStack
    });
    handleNavigateSlide(9);
  };

  const handleApplyCustomQuote = (summary: string, total: number) => {
    setSelectedPackage({
      id: 'custom_quote',
      name: 'Custom Scope Package',
      price: total,
      originalPrice: total + 300,
      category: 'website',
      description: summary,
      features: ['Custom Selected Scope', 'Free SSL & Hosting', '3D Motion Animation', 'Priority Support']
    });
    handleNavigateSlide(9);
  };

  // Render slides in Dedicated Multi-Page View Mode with Framer Motion PageTransitions
  const slides = [
    /* 0: Home Page with Hero, Trust Badges, Featured Portfolio Showcase, AI Testimonials, Tech Stack Marquee, Blog Insights, Location Map */
    <PageTransition key="0">
      <div>
        <HeroSection
          onNavigateSlide={handleNavigateSlide}
          onOpenQuoteCalculator={() => setQuoteCalculatorOpen(true)}
          onOpenAppointmentModal={() => setAppointmentModalOpen(true)}
        />
        <TrustIndicatorsSection variant="white" />
        
        {/* Featured Portfolio Showcase Section on Main Page Flow */}
        <PortfolioShowcaseSection
          onSelectProject={(proj) => setSelectedProject(proj)}
          onNavigateSlide={handleNavigateSlide}
          variant="black"
          isHomePage={true}
        />

        <TestimonialsVideoSection variant="none" />
        <TechStackMarquee onNavigateSlide={handleNavigateSlide} variant="black" />
        <InsightsSection
          variant="white"
          onNavigateSlide={handleNavigateSlide}
          onSelectArticle={(art) => {
            setActiveBlogArticle(art);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
        <MapLocationSection variant="black" />
        <Footer onNavigateSlide={handleNavigateSlide} />
      </div>
    </PageTransition>,

    /* 1: Portfolio Page */
    <PageTransition key="1">
      <div className="pt-12">
        <PortfolioShowcaseSection
          onSelectProject={(proj) => setSelectedProject(proj)}
          onNavigateSlide={handleNavigateSlide}
          variant="black"
          isHomePage={false}
        />
        <Footer onNavigateSlide={handleNavigateSlide} />
      </div>
    </PageTransition>,

    /* 2: Process Page */
    <PageTransition key="2">
      <div className="pt-12">
        <ProcessSection
          onNavigateSlide={handleNavigateSlide}
          variant="black"
        />
        <Footer onNavigateSlide={handleNavigateSlide} />
      </div>
    </PageTransition>,

    /* 3: Services Page */
    <PageTransition key="3">
      <div className="pt-12">
        <ServicesSection
          onNavigateSlide={handleNavigateSlide}
          onSelectService={(serv) => setSelectedService(serv)}
          onSelectServiceDetail={(serv) => {
            setActiveServiceDetail(serv);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          variant="black"
        />
        <Footer onNavigateSlide={handleNavigateSlide} />
      </div>
    </PageTransition>,

    /* 4: Packages & Pricing Page */
    <PageTransition key="4">
      <div className="pt-12">
        <PricingSection
          onSelectPackage={(pkg) => setSelectedPackage(pkg)}
          onNavigateSlide={handleNavigateSlide}
          onOpenQuoteCalculator={() => setQuoteCalculatorOpen(true)}
          variant="black"
        />
        <Footer onNavigateSlide={handleNavigateSlide} />
      </div>
    </PageTransition>,

    /* 5: About Page */
    <PageTransition key="5">
      <div className="pt-12">
        <AboutSection
          onNavigateSlide={handleNavigateSlide}
          variant="black"
        />
        <Footer onNavigateSlide={handleNavigateSlide} />
      </div>
    </PageTransition>,

    /* 6: Testimonials Page */
    <PageTransition key="6">
      <div className="pt-12">
        <TestimonialsPage
          onNavigateSlide={handleNavigateSlide}
          onOpenQuoteCalculator={() => setQuoteCalculatorOpen(true)}
          onOpenAppointmentModal={() => setAppointmentModalOpen(true)}
        />
        <Footer onNavigateSlide={handleNavigateSlide} />
      </div>
    </PageTransition>,

    /* 7: Insights & Industry Articles Page */
    <PageTransition key="7">
      <div className="pt-12">
        <InsightsSection
          variant="black"
          onNavigateSlide={handleNavigateSlide}
          onSelectArticle={(art) => {
            setActiveBlogArticle(art);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
        <Footer onNavigateSlide={handleNavigateSlide} />
      </div>
    </PageTransition>,

    /* 8: Reviews & FAQ Page */
    <PageTransition key="8">
      <div className="pt-12">
        <ReviewsFaqSection variant="black" />
        <Footer onNavigateSlide={handleNavigateSlide} />
      </div>
    </PageTransition>,

    /* 9: Contact Page */
    <PageTransition key="9">
      <div className="pt-12">
        <ContactSection
          selectedPackage={selectedPackage}
          selectedService={selectedService}
          onOpenAppointmentModal={() => setAppointmentModalOpen(true)}
          variant="black"
        />
        <MapLocationSection variant="black" />
        <Footer onNavigateSlide={handleNavigateSlide} />
      </div>
    </PageTransition>
  ];

  return (
    <div className="min-h-screen bg-[#06080d] text-white relative font-['Montserrat',sans-serif] selection:bg-white selection:text-slate-950 overflow-x-hidden scroll-smooth">
      {/* Three.js Interactive 3D Canvas Background */}
      <ThreeBackgroundCanvas activeSlide={activeSlide} />

      {/* Navigation Header */}
      <Navbar
        activeSlide={activeSlide}
        onNavigateSlide={handleNavigateSlide}
        isSlideMode={isSlideMode}
        onToggleMode={() => setIsSlideMode(!isSlideMode)}
        onOpenQuoteCalculator={() => setQuoteCalculatorOpen(true)}
        onOpenAppointmentModal={() => setAppointmentModalOpen(true)}
      />

      {/* Main Multi-Page View Area */}
      {isSlideMode ? (
        <div className="relative z-10 pt-16 min-h-screen flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {activeServiceDetail ? (
              <PageTransition key={`service-detail-${activeServiceDetail.id}`}>
                <ServiceDetailPage
                  service={activeServiceDetail}
                  onBack={() => {
                    setActiveServiceDetail(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onInquire={(srv) => {
                    setSelectedService(srv);
                    setActiveServiceDetail(null);
                    handleNavigateSlide(9);
                  }}
                  onNavigateSlide={(slideIdx) => {
                    setActiveServiceDetail(null);
                    handleNavigateSlide(slideIdx);
                  }}
                  onSelectServiceDetail={(srv) => {
                    setActiveServiceDetail(srv);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
                <Footer onNavigateSlide={handleNavigateSlide} />
              </PageTransition>
            ) : activeBlogArticle ? (
              <PageTransition key={`blog-detail-${activeBlogArticle.id}`}>
                <BlogDetailPage
                  article={activeBlogArticle}
                  onBack={() => {
                    setActiveBlogArticle(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onSelectArticle={(art) => {
                    setActiveBlogArticle(art);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onNavigateSlide={(slideIdx) => {
                    setActiveBlogArticle(null);
                    handleNavigateSlide(slideIdx);
                  }}
                  allArticles={dynamicArticles}
                />
                <Footer onNavigateSlide={handleNavigateSlide} />
              </PageTransition>
            ) : (
              slides[activeSlide]
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* Continuous Page Scroll Mode with Framer Motion Section Transitions */
        <div className="relative z-10 space-y-0">
          <motion.div
            id="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroSection
              onNavigateSlide={handleNavigateSlide}
              onOpenQuoteCalculator={() => setQuoteCalculatorOpen(true)}
              onOpenAppointmentModal={() => setAppointmentModalOpen(true)}
            />
          </motion.div>

          {/* Section 2: Trust Badges (White) */}
          <motion.div
            initial={{ opacity: 0, y: 35, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <TrustIndicatorsSection variant="white" />
          </motion.div>

          {/* Section 3: AI Video Testimonials (None) */}
          <motion.div
            initial={{ opacity: 0, y: 35, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <TestimonialsVideoSection variant="none" />
          </motion.div>

          {/* Section 4: Tech Stack Marquee (Black) */}
          <motion.div
            initial={{ opacity: 0, y: 35, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <TechStackMarquee onNavigateSlide={handleNavigateSlide} variant="black" />
          </motion.div>

          {/* Section 5: Portfolio Showcase (White) */}
          <motion.div
            id="portfolio"
            initial={{ opacity: 0, y: 35, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <PortfolioShowcaseSection
              onSelectProject={(proj) => setSelectedProject(proj)}
              onNavigateSlide={handleNavigateSlide}
              variant="white"
            />
          </motion.div>

          {/* Section 6: Process (None) */}
          <motion.div
            id="process"
            initial={{ opacity: 0, y: 35, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProcessSection
              onNavigateSlide={handleNavigateSlide}
              variant="none"
            />
          </motion.div>

          {/* Section 7: Core Engineering Services (Black) */}
          <motion.div
            id="services"
            initial={{ opacity: 0, y: 35, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <ServicesSection
              onNavigateSlide={handleNavigateSlide}
              onSelectService={(serv) => setSelectedService(serv)}
              variant="black"
            />
          </motion.div>

          {/* Section 8: Packages & Pricing (White) */}
          <motion.div
            id="packages"
            initial={{ opacity: 0, y: 35, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <PricingSection
              onSelectPackage={(pkg) => setSelectedPackage(pkg)}
              onNavigateSlide={handleNavigateSlide}
              onOpenQuoteCalculator={() => setQuoteCalculatorOpen(true)}
              variant="white"
            />
          </motion.div>

          {/* Section 9: About TexasWebCoders (None) */}
          <motion.div
            id="about"
            initial={{ opacity: 0, y: 35, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <AboutSection
              onNavigateSlide={handleNavigateSlide}
              variant="none"
            />
          </motion.div>

          {/* Section 10: Engineering Insights & Industry Articles (Black) */}
          <motion.div
            id="insights"
            initial={{ opacity: 0, y: 35, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <InsightsSection variant="black" />
          </motion.div>

          {/* Section 11: Reviews & FAQ (White) */}
          <motion.div
            id="faq"
            initial={{ opacity: 0, y: 35, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <ReviewsFaqSection variant="white" />
          </motion.div>

          {/* Section 12: Contact Form (None) */}
          <motion.div
            id="contact"
            initial={{ opacity: 0, y: 35, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <ContactSection
              selectedPackage={selectedPackage}
              selectedService={selectedService}
              onOpenAppointmentModal={() => setAppointmentModalOpen(true)}
              variant="none"
            />
          </motion.div>

          {/* Section 13: Texas Office Google Maps Location */}
          <motion.div
            id="location-map"
            initial={{ opacity: 0, y: 35, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <MapLocationSection variant="black" />
          </motion.div>

          {/* Section 14: Footer */}
          <Footer onNavigateSlide={handleNavigateSlide} />
        </div>
      )}

      {/* Interactive Project Preview Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onOrderSimilar={handleOrderSimilarProject}
          />
        )}
      </AnimatePresence>

      {/* Custom Quote Calculator Modal */}
      <AnimatePresence>
        {quoteCalculatorOpen && (
          <CustomQuoteCalculatorModal
            isOpen={quoteCalculatorOpen}
            onClose={() => setQuoteCalculatorOpen(false)}
            onApplyQuote={handleApplyCustomQuote}
          />
        )}
      </AnimatePresence>

      {/* Direct Lead Engineer Appointment Booking Modal */}
      <AnimatePresence>
        {appointmentModalOpen && (
          <BookAppointmentModal
            isOpen={appointmentModalOpen}
            onClose={() => setAppointmentModalOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Floating Interactive Live Chat Widget on Bottom-Right */}
      <LiveChatWidget
        onOpenQuoteCalculator={() => setQuoteCalculatorOpen(true)}
        onOpenAppointmentModal={() => setAppointmentModalOpen(true)}
        onNavigateSlide={handleNavigateSlide}
      />

      {/* Floating Circular Back To Top Button */}
      <BackToTopButton />
    </div>
  );
}
