import React from 'react';
import { ChevronUp, ChevronDown, Sliders } from 'lucide-react';

interface SlideControlsProps {
  activeSlide: number;
  totalSlides: number;
  onNavigateSlide: (index: number) => void;
  isSlideMode: boolean;
}

export const SlideControls: React.FC<SlideControlsProps> = ({
  activeSlide,
  totalSlides,
  onNavigateSlide,
  isSlideMode
}) => {
  const slideTitles = [
    'Home Hero',
    'Portfolio Showcase',
    'Our Process',
    'Our Services',
    'Pricing Packages',
    'About Us',
    'Industry Insights',
    'Reviews & FAQ',
    'Get In Touch'
  ];

  return (
    <div className="hidden sm:flex fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-3">
      {/* Up Arrow */}
      {isSlideMode && (
        <button
          disabled={activeSlide === 0}
          onClick={() => onNavigateSlide(Math.max(0, activeSlide - 1))}
          className={`p-2 rounded-full bg-slate-950/80 border border-slate-800 text-white hover:border-white/50 transition-all ${
            activeSlide === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110 cursor-pointer'
          }`}
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      )}

      {/* Dots Indicator */}
      <div className="glass-panel py-3 px-2 rounded-full flex flex-col gap-2.5 border border-slate-800 shadow-xl">
        {Array.from({ length: totalSlides }).map((_, i) => {
          const isActive = activeSlide === i;
          return (
            <button
              key={i}
              onClick={() => onNavigateSlide(i)}
              className="group relative flex items-center justify-center p-1 cursor-pointer"
            >
              {/* Tooltip on hover */}
              <span className="absolute right-8 px-2.5 py-1 rounded bg-slate-950/90 text-[10px] font-medium text-white border border-white/30 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-['Montserrat'] shadow-lg">
                0{i + 1} • {slideTitles[i]}
              </span>

              {/* Dot Shape */}
              <span
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-3 h-3 bg-white shadow-md shadow-white/50 ring-2 ring-white/30'
                    : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Down Arrow */}
      {isSlideMode && (
        <button
          disabled={activeSlide === totalSlides - 1}
          onClick={() => onNavigateSlide(Math.min(totalSlides - 1, activeSlide + 1))}
          className={`p-2 rounded-full bg-slate-950/80 border border-slate-800 text-white hover:border-white/50 transition-all ${
            activeSlide === totalSlides - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110 cursor-pointer'
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      )}

      {/* Slide Index counter */}
      <div className="hidden sm:block text-[10px] font-mono font-medium text-white tracking-wider">
        0{activeSlide + 1} / 0{totalSlides}
      </div>
    </div>
  );
};
