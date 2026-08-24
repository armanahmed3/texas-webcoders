import React, { useState } from 'react';
import { PRICING_PACKAGES, LOGO_PACKAGES, ECOMMERCE_PACKAGES } from '../data/portfolioData';
import { PricingPackage } from '../types';
import { Check, Sparkles, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PricingSectionProps {
  onSelectPackage: (pkg: PricingPackage) => void;
  onNavigateSlide: (slideIndex: number) => void;
  onOpenQuoteCalculator: () => void;
  variant?: 'light-blue' | 'black' | 'white' | 'none' | 'transparent';
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onSelectPackage,
  onNavigateSlide,
  onOpenQuoteCalculator,
  variant = 'black'
}) => {
  const [activeTab, setActiveTab] = useState<'website' | 'logo' | 'ecommerce'>('website');

  const packagesMap = {
    website: PRICING_PACKAGES,
    logo: LOGO_PACKAGES,
    ecommerce: ECOMMERCE_PACKAGES
  };

  const currentPackages = packagesMap[activeTab];

  return (
    <section id="packages" className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative z-10 min-h-screen flex flex-col justify-center bg-black text-white font-['Montserrat']">
      {/* Curved Rounded Section Shell - Pure Black & White */}
      <div className="max-w-7xl mx-auto w-full rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 lg:p-14 relative overflow-hidden bg-black text-white border border-white/20 shadow-2xl">
        {/* Subtle white ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 rounded-full blur-3xl pointer-events-none bg-white/[0.03]" />

        <div className="relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold uppercase tracking-widest mb-2 block text-zinc-400 font-mono">
              Transparent Pricing & Packages • Texas WebCoders
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-4 uppercase tracking-tight text-white max-w-4xl mx-auto leading-tight">
              Pocket-Friendly Pricing <br />
              For The Perfect Design And Templates For All
            </h2>

            {/* Category Tabs */}
            <div className="flex justify-center gap-4 sm:gap-8 mt-8 border-b border-zinc-800 pb-4 max-w-md mx-auto">
              <button
                onClick={() => setActiveTab('website')}
                className={`font-semibold text-sm sm:text-base pb-2 transition-all cursor-pointer ${
                  activeTab === 'website'
                    ? 'border-b-2 border-white text-white font-bold'
                    : 'text-zinc-500 hover:text-white'
                }`}
              >
                Website Packages
              </button>
              <button
                onClick={() => setActiveTab('logo')}
                className={`font-semibold text-sm sm:text-base pb-2 transition-all cursor-pointer ${
                  activeTab === 'logo'
                    ? 'border-b-2 border-white text-white font-bold'
                    : 'text-zinc-500 hover:text-white'
                }`}
              >
                Logo Packages
              </button>
              <button
                onClick={() => setActiveTab('ecommerce')}
                className={`font-semibold text-sm sm:text-base pb-2 transition-all cursor-pointer ${
                  activeTab === 'ecommerce'
                    ? 'border-b-2 border-white text-white font-bold'
                    : 'text-zinc-500 hover:text-white'
                }`}
              >
                E-Commerce
              </button>
            </div>
          </motion.div>

          {/* Package Cards Grid - Strictly Black & White */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            <AnimatePresence mode="wait">
              {currentPackages.map((pkg) => {
                const isPopular = pkg.popular;
                return (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className={`p-8 rounded-3xl flex flex-col justify-between relative transition-all duration-300 shadow-2xl ${
                      isPopular
                        ? 'bg-zinc-900/90 border-2 border-white text-white transform md:-translate-y-3'
                        : 'bg-zinc-950 border border-zinc-800 hover:border-white text-white'
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute top-0 right-6 text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-b bg-white text-black shadow-md font-mono">
                        Best Value
                      </div>
                    )}

                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-white">
                        {pkg.name}
                      </h3>
                      <p className="text-xs mb-6 min-h-[36px] leading-relaxed text-zinc-400">
                        {pkg.description}
                      </p>

                      <div className="flex items-baseline mb-6 border-b border-zinc-800 pb-6">
                        <span className="text-4xl sm:text-5xl font-extrabold text-white">
                          ${pkg.price}
                        </span>
                        <span className="line-through text-lg ml-3 font-medium text-zinc-500">
                          ${pkg.originalPrice}
                        </span>
                      </div>

                      <ul className="space-y-3 mb-8 text-xs sm:text-sm text-zinc-300">
                        {pkg.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-white" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col gap-3 pt-4 border-t border-zinc-800">
                      <button
                        onClick={() => {
                          onSelectPackage(pkg);
                          onNavigateSlide(8);
                        }}
                        className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md ${
                          isPopular
                            ? 'bg-white hover:bg-zinc-200 text-black shadow-xl'
                            : 'bg-zinc-900 hover:bg-white hover:text-black text-white border border-zinc-700 hover:border-white'
                        }`}
                      >
                        Order Now
                      </button>
                      <button
                        onClick={() => onNavigateSlide(1)}
                        className="text-center text-xs font-semibold transition-colors cursor-pointer py-1 text-zinc-400 hover:text-white"
                      >
                        View Portfolio Showcase
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Custom Scope Estimator Banner */}
          <div className="mt-16 text-center max-w-2xl mx-auto">
            <p className="text-xs sm:text-sm mb-3 text-zinc-400">
              Need custom features, enterprise integrations, or specific page counts?
            </p>
            <button
              onClick={onOpenQuoteCalculator}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg bg-zinc-900 border border-zinc-700 hover:border-white text-white hover:bg-zinc-800"
            >
              <Sliders className="w-4 h-4 text-white" />
              <span>Launch Interactive Custom Price Estimator</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
