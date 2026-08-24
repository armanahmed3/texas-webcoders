import React, { useState } from 'react';
import { PROCESS_STEPS } from '../data/portfolioData';
import { CheckCircle, Clock, Target, Search, Code, Rocket, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ProcessSectionProps {
  onNavigateSlide: (index: number) => void;
  variant?: 'white' | 'black' | 'none' | 'light-blue' | 'transparent';
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onNavigateSlide, variant = 'white' }) => {
  const isWhite = variant === 'white';
  const isBlack = variant === 'black';
  const isNone = variant === 'none' || variant === 'transparent' || variant === 'light-blue';
  const [activeStepNumber, setActiveStepNumber] = useState<number>(1);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target':
        return <Target className={`w-5 h-5 ${isWhite ? 'text-cyan-600' : 'text-sky-400'}`} />;
      case 'Search':
        return <Search className={`w-5 h-5 ${isWhite ? 'text-cyan-600' : 'text-sky-400'}`} />;
      case 'Code':
        return <Code className={`w-5 h-5 ${isWhite ? 'text-cyan-600' : 'text-sky-400'}`} />;
      case 'Rocket':
        return <Rocket className={`w-5 h-5 ${isWhite ? 'text-cyan-600' : 'text-sky-400'}`} />;
      default:
        return <Target className={`w-5 h-5 ${isWhite ? 'text-cyan-600' : 'text-sky-400'}`} />;
    }
  };

  const currentStep = PROCESS_STEPS.find(s => s.number === activeStepNumber) || PROCESS_STEPS[0];

  return (
    <section id="process" className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative z-10 min-h-screen flex flex-col justify-center">
      {/* Curved Rounded Section Shell */}
      <div
        className={`max-w-7xl mx-auto w-full rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 lg:p-14 relative overflow-hidden transition-colors duration-300 ${
          isNone
            ? 'bg-transparent text-white border border-white/10 shadow-none'
            : isWhite
              ? 'bg-white text-slate-900 border border-zinc-200 shadow-zinc-900/5'
              : 'bg-[#080c14] text-white border border-slate-800 shadow-2xl'
        }`}
      >
        {/* Decorative Background Accents */}
        <div
          className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
            isWhite ? 'bg-cyan-400/10' : 'bg-cyan-500/10'
          }`}
        />
        <div
          className={`absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
            isWhite ? 'bg-blue-300/10' : 'bg-blue-600/10'
          }`}
        />

        <div className="relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className={`text-xs font-medium uppercase tracking-widest mb-2 block font-['Montserrat'] ${
              isWhite ? 'text-cyan-600' : 'text-sky-400'
            }`}>
              How We Build Greatness
            </span>
            <h2 className={`text-2xl sm:text-4xl md:text-5xl font-semibold mb-4 uppercase tracking-tight font-['Montserrat',sans-serif] ${
              isWhite ? 'text-slate-950' : 'text-white'
            }`}>
              Our 4-Step Agile Process
            </h2>
            <p className={`max-w-2xl mx-auto text-sm sm:text-base ${
              isWhite ? 'text-zinc-600' : 'text-slate-400'
            }`}>
              A streamlined, sprint-based approach engineered to bring high-performance web systems to life on time and within budget.
            </p>
          </motion.div>

          {/* Connecting Timeline Bar & Steps */}
          <div className="relative mb-12">
            {/* Desktop Connecting Line */}
            <div className={`hidden md:block absolute top-1/2 left-12 right-12 h-1 -translate-y-1/2 z-0 rounded-full ${
              isWhite ? 'bg-zinc-200' : 'bg-slate-800'
            }`}>
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  isWhite
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600'
                    : 'bg-gradient-to-r from-sky-400 to-blue-600'
                }`}
                style={{ width: `${((activeStepNumber - 1) / 3) * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
              {PROCESS_STEPS.map((step) => {
                const isActive = activeStepNumber === step.number;
                const isPassed = activeStepNumber >= step.number;

                return (
                  <div
                    key={step.number}
                    onClick={() => setActiveStepNumber(step.number)}
                    className={`p-6 rounded-2xl transition-all duration-300 cursor-pointer border text-center ${
                      isWhite
                        ? isActive
                          ? 'bg-slate-950 text-white border-slate-950 shadow-xl scale-105'
                          : isPassed
                            ? 'bg-cyan-50 border-cyan-200 text-slate-900'
                            : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:border-zinc-300'
                        : isActive
                          ? 'bg-slate-900 border-sky-400 shadow-xl shadow-sky-400/10 scale-105 text-white'
                          : isPassed
                            ? 'bg-slate-900/60 border-sky-500/30 text-white'
                            : 'bg-slate-900/30 border-white/5 opacity-70 hover:opacity-100 hover:border-white/20 text-white'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-medium mx-auto mb-4 border-2 transition-all ${
                        isWhite
                          ? isActive
                            ? 'bg-cyan-400 text-slate-950 border-white shadow-lg font-medium'
                            : isPassed
                              ? 'bg-white text-cyan-700 border-cyan-300'
                              : 'bg-zinc-200 text-zinc-600 border-zinc-300'
                          : isActive
                            ? 'bg-sky-400 text-slate-950 border-white shadow-lg shadow-sky-400/30 font-medium'
                            : isPassed
                              ? 'bg-sky-950/80 text-sky-300 border-sky-500/40'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {step.number}
                    </div>
                    <h4 className={`font-semibold text-lg mb-1 font-['Montserrat'] ${
                      isWhite ? (isActive ? 'text-white' : 'text-slate-950') : 'text-white'
                    }`}>
                      {step.title}
                    </h4>
                    <p className={`text-xs leading-relaxed ${
                      isWhite ? (isActive ? 'text-zinc-300' : 'text-zinc-600') : 'text-slate-400'
                    }`}>
                      {step.shortDesc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Step Detail Card */}
          <motion.div
            key={currentStep.number}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`p-8 sm:p-10 rounded-2xl max-w-4xl mx-auto shadow-2xl border ${
              isWhite
                ? 'bg-zinc-50 border-zinc-200'
                : 'bg-slate-950/90 border-sky-400/20'
            }`}
          >
            <div className={`flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b ${
              isWhite ? 'border-zinc-200' : 'border-slate-800'
            }`}>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl border ${
                  isWhite
                    ? 'bg-cyan-50 border-cyan-200'
                    : 'bg-sky-400/10 border-sky-400/30'
                }`}>
                  {getStepIcon(currentStep.iconName)}
                </div>
                <div>
                  <span className={`text-xs font-medium uppercase tracking-wider ${
                    isWhite ? 'text-cyan-600' : 'text-sky-400'
                  }`}>
                    Phase {currentStep.number} of 4
                  </span>
                  <h3 className={`text-2xl font-semibold font-['Montserrat'] ${
                    isWhite ? 'text-slate-950' : 'text-white'
                  }`}>
                    {currentStep.title} Phase
                  </h3>
                </div>
              </div>

              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-medium ${
                isWhite
                  ? 'bg-white border-zinc-200 text-zinc-700'
                  : 'bg-white/5 border-white/10 text-slate-300'
              }`}>
                <Clock className={`w-4 h-4 ${isWhite ? 'text-cyan-600' : 'text-sky-400'}`} />
                <span>Timeline: {currentStep.duration}</span>
              </div>
            </div>

            <p className={`text-sm leading-relaxed my-6 ${
              isWhite ? 'text-zinc-600' : 'text-slate-300'
            }`}>
              {currentStep.fullDesc}
            </p>

            <div>
              <h5 className={`text-xs font-medium uppercase tracking-wider mb-3 font-['Montserrat'] ${
                isWhite ? 'text-cyan-600' : 'text-sky-400'
              }`}>
                Phase Deliverables Checklist:
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentStep.deliverables.map((deliv, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg border text-xs ${
                      isWhite
                        ? 'bg-white border-zinc-200 text-zinc-800 shadow-sm'
                        : 'bg-slate-900/60 border-slate-800 text-slate-200'
                    }`}
                  >
                    <CheckCircle className={`w-4 h-4 flex-shrink-0 ${isWhite ? 'text-cyan-600' : 'text-sky-400'}`} />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`mt-8 pt-6 border-t flex justify-between items-center ${
              isWhite ? 'border-zinc-200' : 'border-slate-800'
            }`}>
              <button
                onClick={() => setActiveStepNumber(prev => (prev % 4) + 1)}
                className={`text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors ${
                  isWhite
                    ? 'text-zinc-600 hover:text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Next Phase ({activeStepNumber === 4 ? 'Phase 1' : `Phase ${activeStepNumber + 1}`})</span>
                <ArrowRight className={`w-3.5 h-3.5 ${isWhite ? 'text-cyan-600' : 'text-sky-400'}`} />
              </button>

              <button
                onClick={() => onNavigateSlide(8)}
                className="bg-gradient-to-r from-sky-400 to-blue-600 text-slate-950 px-6 py-2.5 rounded-lg font-medium text-xs uppercase tracking-wider hover:from-sky-300 hover:to-blue-500 transition-all cursor-pointer shadow-md shadow-sky-500/20"
              >
                Start Project Now
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
