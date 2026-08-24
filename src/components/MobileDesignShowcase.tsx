import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, ShoppingBag, BarChart2, Smartphone as MobileIcon, ShieldCheck, Zap, Sparkles, CheckCircle2, ChevronRight, Video } from 'lucide-react';

import mobileAppVideoImg from '../assets/images/mobile_app_video_1786147610233.jpg';

interface MobileDesignShowcaseProps {
  className?: string;
}

export const MobileDesignShowcase: React.FC<MobileDesignShowcaseProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const videoFeatures = [
    {
      title: 'Mobile Application Engineering',
      tag: 'REACT NATIVE & NATIVE SWIFT',
      metric: '60 FPS Smooth Gesture Engine',
      icon: '📱'
    },
    {
      title: 'Enterprise AI Agent Systems',
      tag: 'GEMINI LLM & STREAMING API',
      metric: 'Real-Time Voice & Text Inference',
      icon: '⚡'
    },
    {
      title: 'Sub-0.5s High Speed Websites',
      tag: 'VITE & CLOUDFLARE EDGE',
      metric: '100/100 Core Web Vitals',
      icon: '🌐'
    }
  ];

  // Rotate through features smoothly
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setActiveVideoIndex((prev) => (prev + 1) % videoFeatures.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Decorative Glow Ambient Backdrop - White/Monochrome */}
      <div className="absolute -inset-4 bg-gradient-to-r from-white/10 via-zinc-400/10 to-white/10 rounded-3xl blur-2xl opacity-50 animate-pulse pointer-events-none" />

      {/* Titanium Frame Smartphone Body */}
      <div className="relative z-10 w-[280px] sm:w-[320px] h-[540px] bg-slate-950 border-[8px] border-zinc-800 rounded-[48px] shadow-2xl shadow-black ring-1 ring-white/20 overflow-hidden flex flex-col group transition-transform duration-500 hover:scale-[1.02]">
        
        {/* Top Speaker & Camera Notch (Dynamic Island) */}
        <div className="absolute top-0 inset-x-0 h-7 bg-slate-950 z-30 flex items-center justify-center pt-1">
          <div className="w-24 h-4 bg-black rounded-full flex items-center justify-between px-3 border border-zinc-800">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 ring-1 ring-zinc-700" />
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>

        {/* Mobile Status Bar */}
        <div className="absolute top-7 inset-x-0 px-6 py-1 flex items-center justify-between text-[10px] text-slate-400 font-mono z-20 bg-slate-950/90 backdrop-blur-sm">
          <span>09:41</span>
          <div className="flex items-center gap-1.5 text-white font-medium">
            <span className="text-[9px]">5G</span>
            <div className="w-4 h-2 rounded-sm border border-white p-0.5 flex items-center">
              <div className="h-full w-3 bg-white rounded-2xs" />
            </div>
          </div>
        </div>

        {/* Live Animated Screen Display Container */}
        <div className="pt-14 pb-8 px-3 h-full overflow-hidden bg-[#05070c] text-white relative flex flex-col justify-between">
          
          {/* Main Continuous Video Showcase */}
          <div className="relative rounded-2xl h-full border border-white/20 overflow-hidden group flex flex-col justify-between p-3 bg-zinc-900">
            <img
              src={mobileAppVideoImg}
              alt="Mobile Application & AI Web Development Preview"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover brightness-90 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/30" />

            {/* Header Badge */}
            <div className="relative z-10 flex items-center justify-between pt-1">
              <span className="text-[9px] font-mono text-white bg-black/80 px-2 py-0.5 rounded border border-white/20 font-medium flex items-center gap-1">
                <Video className="w-3 h-3 text-white" />
                <span>Mobile App Showcase</span>
              </span>
              <span className="text-[9px] font-medium uppercase text-slate-950 bg-white px-2 py-0.5 rounded font-['Montserrat']">
                Texas WebCoders
              </span>
            </div>

            {/* Dynamic Feature Switcher */}
            <div className="relative z-10 space-y-2 mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeVideoIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-1 bg-black/80 p-3 rounded-xl border border-white/20 backdrop-blur-md"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{videoFeatures[activeVideoIndex].icon}</span>
                    <span className="text-[9px] font-mono font-medium text-slate-300 uppercase">
                      {videoFeatures[activeVideoIndex].tag}
                    </span>
                  </div>
                  <h4 className="text-xs font-medium text-white font-['Montserrat'] leading-snug">
                    {videoFeatures[activeVideoIndex].title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>{videoFeatures[activeVideoIndex].metric}</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress Indicators */}
              <div className="flex items-center gap-1.5 pt-1">
                {videoFeatures.map((_, vIdx) => (
                  <button
                    key={vIdx}
                    onClick={() => setActiveVideoIndex(vIdx)}
                    className={`h-1 rounded-full transition-all cursor-pointer ${
                      vIdx === activeVideoIndex ? 'w-8 bg-white' : 'w-2 bg-zinc-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Video Controls Overlay */}
          <div className="absolute bottom-2 inset-x-3 bg-zinc-950/95 border border-zinc-800 rounded-xl p-2 flex items-center justify-between text-[10px] backdrop-blur-md z-30">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1 text-white font-medium hover:text-zinc-300 transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-white" /> : <Play className="w-3.5 h-3.5 text-white" />}
              <span>{isPlaying ? 'Pause Demo' : 'Play Demo'}</span>
            </button>

            <div className="flex items-center gap-1 text-slate-300 font-mono text-[9px]">
              <Sparkles className="w-3 h-3 text-white" />
              <span>Real Human Demo</span>
            </div>
          </div>
        </div>

        {/* Bottom Home Swipe Bar */}
        <div className="absolute bottom-1 inset-x-0 flex justify-center z-30">
          <div className="w-32 h-1 bg-zinc-600 rounded-full" />
        </div>
      </div>

      {/* Floating Badge */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-4 -left-6 sm:-left-12 z-20 bg-zinc-950/90 border border-white/20 px-3.5 py-2 rounded-xl backdrop-blur-md shadow-xl flex items-center gap-2 text-xs font-medium text-white"
      >
        <div className="w-7 h-7 rounded-lg bg-white/10 text-white flex items-center justify-center border border-white/20">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <div>
          <span className="block text-[11px] text-white font-medium font-['Montserrat']">Texas WebCoders Apps</span>
          <span className="block text-[9px] text-slate-400">iOS & Android Custom Native Apps</span>
        </div>
      </motion.div>
    </div>
  );
};
