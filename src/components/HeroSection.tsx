import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Calendar, ShieldCheck, Zap, Award } from 'lucide-react';
import { ResultsMetricsCounter } from './ResultsMetricsCounter';
import { HeroRightAnimation } from './HeroRightAnimation';

interface HeroSectionProps {
  onNavigateSlide: (index: number) => void;
  onOpenQuoteCalculator: () => void;
  onOpenAppointmentModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateSlide,
  onOpenQuoteCalculator,
  onOpenAppointmentModal
}) => {
  const heroBgImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDczXnEUzCJAyTCdmr7D-8JMKrBLKpy86CaEuUjUu17VtEfzU4YN0cgCVoZXX_o3J11upUyh7yZGTAxsY9C8FE8gKe8h4yM_AFi4bEvuF1IxMnPZyOwE9WLdcJqVLS4huNQ_MrbRRdUqNKuErpnZYYOEKkF9ue1NRSAZ43LbEVEOSyUu8jwotOaBeDaa-KhHEwzrkLxhX_p8lISe0JUij46jKbu4iz6OGkK0qbb_X9MoNocF2zt07US_A';

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-28 pb-12 bg-[#080c14] text-white border-b border-slate-800 font-['Montserrat',sans-serif]">
      {/* Background Image / Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBgImage}
          alt="TexasWebCoders Hero Background"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-[#080c14]/85 to-slate-950/75" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.16)_0%,transparent_70%)] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Hero Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Eyebrow badge in Montserrat */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-white/20 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider font-['Montserrat',sans-serif] backdrop-blur-md shadow-lg shadow-white/5"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Tyler, TX Custom Software & Web Engineering Agency</span>
            </motion.div>

            {/* Main Headline in Bebas Neue Font */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-bebas text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-normal text-white leading-[1.05] tracking-wide uppercase"
            >
              Custom Websites, Apps <br />
              <span className="font-bebas text-white">
                & Business Software
              </span>{' '}
              <br />
              <span className="font-bebas text-slate-300 text-2xl sm:text-3xl md:text-4xl font-normal block mt-1 tracking-wide">
                Engineered in Tyler, Texas for Regional Leaders
              </span>
            </motion.h1>

            {/* Subtitle in Montserrat */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed font-['Montserrat',sans-serif]"
            >
              TexasWebCoders partners with East Texas medical clinics, legal practices, contractors, logistics providers, and growing enterprises to build lightning-fast websites, custom client portals, iOS/Android mobile apps, and dominant local SEO systems that generate qualified client leads.
            </motion.p>

            {/* Key USPs Bar in Montserrat */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs sm:text-sm text-slate-300 font-semibold font-['Montserrat',sans-serif]"
            >
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-white/10">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Rapid 7–14 Day Delivery</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                <span>100% Code & IP Ownership</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-white/10">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tyler & East Texas Developers</span>
              </div>
            </motion.div>

            {/* Action CTA Buttons in Montserrat */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateSlide(8);
                }}
                className="bg-white hover:bg-zinc-200 text-slate-950 px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider font-['Montserrat',sans-serif] transition-all duration-300 shadow-xl shadow-white/10 rounded-xl flex items-center gap-2 cursor-pointer group"
              >
                <span>Request Free Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={onOpenQuoteCalculator}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider font-['Montserrat',sans-serif] transition-all duration-300 rounded-xl flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Calculate Project Cost</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Professional Animation Showcase with Dedicated Background */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <HeroRightAnimation
              onOpenAppointmentModal={onOpenAppointmentModal}
              onOpenQuoteCalculator={onOpenQuoteCalculator}
            />
          </div>

        </div>
      </div>

      {/* Dynamic Results & Metrics Counter Section */}
      <div className="relative z-10 w-full mt-6">
        <ResultsMetricsCounter />
      </div>
    </section>
  );
};
