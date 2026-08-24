import React, { useState } from 'react';
import { SERVICES_LIST } from '../data/portfolioData';
import { ServiceItem } from '../types';
import { ArrowUpRight, Check, Sparkles, Layers, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { ServiceDetailModal } from './ServiceDetailModal';
import { ServiceIcon } from './ServiceIcon';

interface ServicesSectionProps {
  onNavigateSlide: (slideIndex: number) => void;
  onSelectService: (service: ServiceItem) => void;
  onSelectServiceDetail?: (service: ServiceItem) => void;
  variant?: 'black' | 'white' | 'light-blue' | 'none' | 'transparent';
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onNavigateSlide,
  onSelectService,
  onSelectServiceDetail,
  variant = 'black'
}) => {
  const isBlack = variant === 'black';
  const isWhite = variant === 'white';
  const isNone = variant === 'none' || variant === 'transparent' || variant === 'light-blue';
  const isDarkBlue = isNone;

  const handleOpenSpecs = (service: ServiceItem) => {
    if (onSelectServiceDetail) {
      onSelectServiceDetail(service);
    }
  };

  return (
    <section id="services" className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative z-10 min-h-screen flex flex-col justify-center font-['Montserrat']">
      {/* Curved Rounded Section Shell */}
      <div
        className={`max-w-7xl mx-auto w-full rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 lg:p-14 relative overflow-hidden transition-colors duration-300 ${
          isNone
            ? 'bg-transparent text-white border border-white/10 shadow-none'
            : isBlack
              ? 'bg-[#080c14] text-white border border-slate-800 shadow-2xl'
              : 'bg-white text-slate-900 border border-zinc-200 shadow-zinc-900/5'
        }`}
      >
        {/* Decorative Background Accents */}
        <div
          className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
            isDarkBlue || isBlack ? 'bg-white/5' : 'bg-slate-200/40'
          }`}
        />
        <div
          className={`absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
            isDarkBlue || isBlack ? 'bg-slate-800/20' : 'bg-slate-200/30'
          }`}
        />

        <div className="relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left mb-16"
          >
            <span className={`text-xs font-semibold uppercase tracking-widest mb-2 block font-mono ${
              isDarkBlue || isBlack ? 'text-zinc-400' : 'text-slate-700'
            }`}>
              Our Custom Engineering Services • Texas WebCoders
            </span>
            <h2 className={`text-2xl sm:text-4xl md:text-5xl font-extrabold mb-4 uppercase tracking-tight font-['Montserrat',sans-serif] ${
              isDarkBlue || isBlack ? 'text-white' : 'text-slate-950'
            }`}>
              Crafting Digital Excellence Across All Channels
            </h2>
            <p className={`max-w-2xl text-sm sm:text-base leading-relaxed ${
              isDarkBlue || isBlack ? 'text-zinc-300' : 'text-zinc-600'
            }`}>
              From enterprise software, custom CRMs, and high-speed web apps to mobile UI/UX and digital promotional collateral. Click any service to explore full specifications and technical architecture.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_LIST.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => handleOpenSpecs(service)}
                className={`p-8 rounded-3xl transition-all duration-300 flex flex-col justify-between relative group shadow-lg cursor-pointer ${
                  isDarkBlue || isBlack
                    ? 'bg-slate-950/90 border border-slate-800 hover:border-white hover:shadow-2xl text-white'
                    : 'bg-white border border-zinc-200 hover:border-slate-950 hover:shadow-xl text-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 shadow-md flex items-center justify-center text-white">
                      <ServiceIcon serviceId={service.id} size="lg" isLight={isWhite} />
                    </div>
                    <span className={`text-[10px] font-mono font-semibold px-3 py-1 rounded-full border uppercase tracking-wider ${
                      isDarkBlue || isBlack
                        ? 'text-slate-300 bg-slate-900/90 border-slate-700'
                        : 'text-slate-700 bg-zinc-100 border-zinc-300'
                    }`}>
                      Texas WebCoders
                    </span>
                  </div>

                  <h3 className={`text-xl sm:text-2xl font-bold mb-3 font-['Montserrat'] transition-colors ${
                    isDarkBlue || isBlack
                      ? 'text-white group-hover:text-zinc-200'
                      : 'text-slate-950 group-hover:text-zinc-800'
                  }`}>
                    {service.title}
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                    isDarkBlue || isBlack ? 'text-slate-400' : 'text-zinc-600'
                  }`}>
                    {service.description}
                  </p>
                </div>

                <div>
                  {/* Features tags with White Checkmarks */}
                  <div className={`flex flex-wrap gap-1.5 mb-6 pt-4 border-t ${
                    isDarkBlue || isBlack ? 'border-slate-800' : 'border-zinc-200'
                  }`}>
                    {service.features.map((feat, i) => (
                      <span
                        key={i}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium flex items-center gap-1.5 border shadow-sm ${
                          isDarkBlue || isBlack
                            ? 'bg-slate-900 text-slate-300 border-slate-700'
                            : 'bg-white text-zinc-800 border-zinc-200'
                        }`}
                      >
                        <Check className="w-3 h-3 text-white flex-shrink-0" />
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>

                  {/* Balanced Equal-Size Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenSpecs(service);
                      }}
                      className={`h-11 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-200 border shadow-sm ${
                        isDarkBlue || isBlack
                          ? 'bg-slate-900 border-slate-700 text-slate-200 hover:text-white hover:border-white hover:bg-slate-800'
                          : 'bg-zinc-100 border-zinc-300 text-slate-900 hover:bg-zinc-200 hover:border-slate-400'
                      }`}
                    >
                      <Info className="w-3.5 h-3.5 text-white" />
                      <span>View Full Specs</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectService(service);
                        onNavigateSlide(9);
                      }}
                      className={`h-11 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-200 shadow-md ${
                        isDarkBlue || isBlack
                          ? 'bg-white text-slate-950 hover:bg-zinc-200'
                          : 'bg-slate-950 text-white hover:bg-zinc-800'
                      }`}
                    >
                      <span>Inquire Now</span>
                      <ArrowUpRight className={`w-3.5 h-3.5 ${isDarkBlue || isBlack ? 'text-slate-950' : 'text-white'}`} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

