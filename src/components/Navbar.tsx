import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  Sparkles,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Home,
  Briefcase,
  Layers,
  Cpu,
  Users,
  BookOpen,
  HelpCircle,
  Send,
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { TexasWebcodersLogo } from './TexasWebcodersLogo';

interface NavbarProps {
  activeSlide: number;
  onNavigateSlide: (slideIndex: number) => void;
  isSlideMode?: boolean;
  onToggleMode?: () => void;
  onOpenQuoteCalculator: () => void;
  onOpenAppointmentModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSlide,
  onNavigateSlide,
  onOpenQuoteCalculator,
  onOpenAppointmentModal
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile sidebar is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const primaryNavLinks = [
    { label: 'Home', slideIndex: 0, href: '#home', icon: Home },
    { label: 'About', slideIndex: 5, href: '#about', icon: Users },
    { label: 'Services', slideIndex: 3, href: '#services', icon: Cpu },
    { label: 'Portfolio', slideIndex: 1, href: '#portfolio', icon: Briefcase },
    { label: 'Packages', slideIndex: 4, href: '#packages', icon: Layers },
    { label: 'Testimonials', slideIndex: 6, href: '#testimonials', icon: Users },
    { label: 'Blog', slideIndex: 7, href: '#blog', icon: BookOpen },
    { label: 'Contact', slideIndex: 9, href: '#contact', icon: Send }
  ];

  const allNavLinks = [
    { label: 'Home', slideIndex: 0, href: '#home', icon: Home, desc: 'Agency overview & hero' },
    { label: 'Portfolio', slideIndex: 1, href: '#portfolio', icon: Briefcase, desc: '500+ Delivered projects' },
    { label: 'Process', slideIndex: 2, href: '#process', icon: Zap, desc: '4-Step agile framework' },
    { label: 'Services', slideIndex: 3, href: '#services', icon: Cpu, desc: 'Web, Mobile, SEO & AI' },
    { label: 'Packages', slideIndex: 4, href: '#packages', icon: Layers, desc: 'Transparent milestone pricing' },
    { label: 'About', slideIndex: 5, href: '#about', icon: Users, desc: 'Tyler, TX engineering team' },
    { label: 'Testimonials', slideIndex: 6, href: '#testimonials', icon: Users, desc: '500+ Client reviews & video' },
    { label: 'Blog Insights', slideIndex: 7, href: '#blog', icon: BookOpen, desc: 'Tech & SEO strategies' },
    { label: 'Reviews & FAQ', slideIndex: 8, href: '#faq', icon: HelpCircle, desc: 'Client ratings & answers' },
    { label: 'Contact & Hire', slideIndex: 9, href: '#contact', icon: Send, desc: 'Direct Tyler office contact' }
  ];

  const handleLinkClick = (e: React.MouseEvent, slideIndex: number) => {
    e.preventDefault();
    onNavigateSlide(slideIndex);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Main Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
        <div
          className={`transition-all duration-300 ${
            scrolled
              ? 'bg-white/98 backdrop-blur-md border-b border-zinc-200/90 py-2 sm:py-3 shadow-sm'
              : 'bg-white/95 backdrop-blur-md border-b border-zinc-200/70 py-2.5 sm:py-3.5'
          }`}
        >
          <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 lg:gap-6">
            {/* Brand Logo - Responsive sizing */}
            <div className="flex items-center justify-start min-w-0 flex-1 sm:flex-initial pr-1 sm:pr-4 lg:pr-6 z-10">
              <a
                href="#home"
                onClick={(e) => handleLinkClick(e, 0)}
                className="flex items-center group cursor-pointer overflow-hidden"
              >
                <TexasWebcodersLogo size="md" variant="light" />
              </a>
            </div>

            {/* Desktop Navigation Menu (Center Capsule) */}
            <div className="hidden lg:flex items-center justify-center flex-1 min-w-0 px-2">
              <div className="bg-zinc-100/95 border border-zinc-200/90 rounded-full p-1.5 flex items-center gap-1 xl:gap-1.5 shadow-sm backdrop-blur-md">
                {primaryNavLinks.map((link) => {
                  const isActive = activeSlide === link.slideIndex;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.slideIndex)}
                      className={`px-3 py-1.5 xl:px-3.5 xl:py-1.5 rounded-full font-['Montserrat',sans-serif] text-[11px] xl:text-xs font-semibold tracking-wider uppercase transition-all duration-200 whitespace-nowrap ${
                        isActive
                          ? 'bg-slate-950 text-white shadow-sm font-semibold'
                          : 'text-zinc-600 hover:text-slate-950 hover:bg-zinc-200/80'
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Desktop Action Buttons & Mobile Hamburger Button */}
            <div className="flex items-center justify-end flex-shrink-0 gap-2 sm:gap-3 pl-1 sm:pl-4 lg:pl-6 z-10">
              {/* Desktop Book Now Button */}
              <button
                onClick={onOpenAppointmentModal || (() => onNavigateSlide(8))}
                className="hidden sm:inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 active:scale-95 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer border border-slate-800 hover:border-slate-700 group"
              >
                <Calendar className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>Book Now</span>
              </button>

              {/* Mobile Sidebar Toggle Button - Prominent High-Contrast UI */}
              <button
                id="mobile-sidebar-toggle-btn"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open Mobile Navigation Menu"
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 active:scale-95 text-white border border-slate-800 transition-all cursor-pointer shadow-md min-h-[40px]"
              >
                <Menu className="w-5 h-5 text-white" />
                <span className="text-xs font-bold uppercase tracking-wider font-['Montserrat']">Menu</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Slide-out Mobile Sidebar Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[9999] lg:hidden font-['Montserrat',sans-serif] overflow-hidden">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Sidebar Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="fixed top-0 bottom-0 right-0 w-[88vw] max-w-sm sm:max-w-md h-full h-[100dvh] bg-[#080c14] border-l border-slate-800 text-white shadow-2xl flex flex-col justify-between overflow-hidden z-10"
            >
              {/* Drawer Top Header */}
              <div className="p-4 sm:p-5 border-b border-slate-800/90 flex items-center justify-between bg-slate-950/90">
                <div className="flex items-center gap-2">
                  <TexasWebcodersLogo size="sm" variant="dark" />
                </div>
                <button
                  id="mobile-sidebar-close-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation sidebar"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Location & HQ Pill */}
              <div className="px-4 sm:px-5 py-2.5 bg-slate-900/60 border-b border-slate-800/60 flex items-center justify-between text-[11px] text-slate-300">
                <div className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Tyler, TX Headquarters</span>
                </div>
                <span className="text-slate-400 font-mono">Mon–Fri 8am–6pm</span>
              </div>

              {/* Navigation Links Scrollable Area */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-1.5 custom-scrollbar">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 px-3 py-1">
                  Main Navigation
                </div>
                {allNavLinks.map((link) => {
                  const isActive = activeSlide === link.slideIndex;
                  const Icon = link.icon;
                  return (
                    <button
                      key={link.label}
                      onClick={(e) => handleLinkClick(e, link.slideIndex)}
                      className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center justify-between group cursor-pointer border ${
                        isActive
                          ? 'bg-slate-800 border-white/30 text-white shadow-md'
                          : 'bg-slate-950/40 hover:bg-slate-900 border-slate-800/70 text-slate-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg border ${
                            isActive
                              ? 'bg-white text-slate-950 border-white'
                              : 'bg-slate-900 border-slate-800 text-slate-300 group-hover:text-white group-hover:border-slate-700'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold tracking-wide">
                            {link.label}
                          </div>
                          <div className="text-[10px] text-slate-400 font-medium">
                            {link.desc}
                          </div>
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          isActive ? 'text-white translate-x-0.5' : 'text-slate-400 group-hover:translate-x-1'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Drawer Bottom Actions & Direct Contact */}
              <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 space-y-3">
                {/* Fast Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      if (onOpenAppointmentModal) {
                        onOpenAppointmentModal();
                      } else {
                        onNavigateSlide(8);
                      }
                      setMobileMenuOpen(false);
                    }}
                    className="p-2.5 rounded-xl bg-white hover:bg-zinc-200 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all active:scale-95"
                  >
                    <Calendar className="w-3.5 h-3.5 text-slate-950" />
                    <span>Book Now</span>
                  </button>

                  <a
                    href="tel:+19032226022"
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Call Us</span>
                  </a>
                </div>

                {/* Direct Phone & Location Information */}
                <div className="pt-2 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-300">
                  <a
                    href="tel:+19032226022"
                    className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 hover:bg-slate-900 border border-slate-800 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="font-semibold text-white">(903) 222-6022</span>
                    <span className="text-[10px] text-slate-400 ml-auto">Direct Office</span>
                  </a>

                  <div className="flex items-center gap-2 px-2 py-1 text-[11px] text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate">5221 S Broadway Ave, Tyler, TX 75703</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Floating Bottom Bar for Ultra-Fast Thumb Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#080c14]/95 border-t border-slate-800/90 backdrop-blur-xl px-2 py-2 flex items-center justify-around shadow-2xl">
        {/* Menu Button - Opens Sidebar Drawer */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-white hover:text-white transition-colors cursor-pointer active:scale-95"
        >
          <Menu className="w-5 h-5 text-white" />
          <span className="text-[10px] font-semibold tracking-wider uppercase mt-0.5">Sidebar</span>
        </button>

        {/* Portfolio Button */}
        <button
          onClick={(e) => handleLinkClick(e, 1)}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors cursor-pointer active:scale-95 ${
            activeSlide === 1 ? 'text-white font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-5 h-5" />
          <span className="text-[10px] font-semibold tracking-wider uppercase mt-0.5">Work</span>
        </button>

        {/* Services Button */}
        <button
          onClick={(e) => handleLinkClick(e, 3)}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors cursor-pointer active:scale-95 ${
            activeSlide === 3 ? 'text-white font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Cpu className="w-5 h-5" />
          <span className="text-[10px] font-semibold tracking-wider uppercase mt-0.5">Services</span>
        </button>

        {/* Book Now Button */}
        <button
          onClick={onOpenAppointmentModal || (() => onNavigateSlide(8))}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer active:scale-95"
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] font-bold tracking-wider uppercase mt-0.5">Book Now</span>
        </button>

        {/* Call Office Button */}
        <a
          href="tel:+19032226022"
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer active:scale-95"
        >
          <Phone className="w-5 h-5" />
          <span className="text-[10px] font-semibold tracking-wider uppercase mt-0.5">Call</span>
        </a>
      </div>
    </>
  );
};


