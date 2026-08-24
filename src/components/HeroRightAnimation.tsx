import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe2,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface HeroRightAnimationProps {
  onOpenAppointmentModal: () => void;
  onOpenQuoteCalculator: () => void;
}

export const HeroRightAnimation: React.FC<HeroRightAnimationProps> = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const laptopCardRef = useRef<HTMLDivElement>(null);

  // Directly showcases user-uploaded verified projects from /portfolio-media/texaswebcoders/
  const laptopProjects = [
    {
      id: 'anim_1',
      title: 'Kinetic 3D Typography & Brand Reveal',
      category: '3D Video Animation',
      subtitle: 'Dynamic 3D typography, volumetric lighting & brand reveal.',
      videoUrl: '/portfolio-media/texaswebcoders/animation/animation1.mp4',
      imageUrl: '/portfolio-media/texaswebcoders/animation/animation1.jpeg',
      mediaType: 'video' as const,
      speed: '4K Ultra-HD',
      rating: '60 FPS Master',
      badge: '3D Motion Animation'
    },
    {
      id: 'web_solex_footwear',
      title: 'SOLEX Premium Sneaker & Footwear Marketplace',
      category: 'Website Development',
      subtitle: 'Direct-to-consumer shoe marketplace with 3D product zoom & instant checkout.',
      imageUrl: '/portfolio-media/texaswebcoders/Website/website_solex_sneaker_store.png',
      mediaType: 'auto-scroll' as const,
      speed: '0.22s TTFB',
      rating: '99/100 Speed',
      badge: 'Live Website • Auto-Scroll'
    },
    {
      id: 'anim_10',
      title: 'Cyberpunk Holographic Interface VFX',
      category: '3D Video Animation',
      subtitle: 'Futuristic sci-fi UI viewport and volumetric hologram animation.',
      videoUrl: '/portfolio-media/texaswebcoders/animation/animation10.mp4',
      imageUrl: '/portfolio-media/texaswebcoders/animation/animation10.jpeg',
      mediaType: 'video' as const,
      speed: 'Ray-Traced Octane',
      rating: '60 FPS Cinema',
      badge: 'Holographic 3D VFX'
    },
    {
      id: 'software_crm_nexora',
      title: 'Nexora Enterprise CRM & Revenue Operations',
      category: 'Software & CRM',
      subtitle: 'Full-scale enterprise CRM suite with live deal pipelines & sales rep leaderboards.',
      imageUrl: '/portfolio-media/texaswebcoders/software/software_crm_nexora_sales_pipeline.png',
      mediaType: 'auto-scroll' as const,
      speed: '< 50ms Queries',
      rating: '100% Uptime',
      badge: 'Enterprise Software'
    },
    {
      id: 'anim_3',
      title: 'Abstract 3D Fluid Simulation & Morphing',
      category: '3D Video Animation',
      subtitle: 'Organic fluid dynamics and refractive glass motion simulation.',
      videoUrl: '/portfolio-media/texaswebcoders/animation/animation3.mp4',
      imageUrl: '/portfolio-media/texaswebcoders/animation/animation3.jpeg',
      mediaType: 'video' as const,
      speed: 'Cinema 4D',
      rating: '60 FPS Smooth',
      badge: 'Fluid 3D Motion'
    },
    {
      id: 'app_luxe_handbag',
      title: 'Luxe Handbag & Luxury Fashion Boutique App',
      category: 'Mobile App Development',
      subtitle: 'Minimalist luxury mobile boutique with interactive color variant selectors & Apple Pay.',
      imageUrl: '/portfolio-media/texaswebcoders/app/mobile_app_luxe_handbag.png',
      mediaType: 'auto-scroll' as const,
      speed: 'Native 120Hz',
      rating: '4.9 ★ iOS & Android',
      badge: 'Mobile App Development'
    },
    {
      id: 'wp_furnicasa_furniture',
      title: 'FurniCasa Modern Furniture WooCommerce Store',
      category: 'WordPress Development',
      subtitle: 'High-converting WordPress & WooCommerce store with multi-category room filtering.',
      imageUrl: '/portfolio-media/texaswebcoders/wordpress/wp_furnicasa_modern_furniture.png',
      mediaType: 'auto-scroll' as const,
      speed: '0.28s Fast',
      rating: '100/100',
      badge: 'Custom WordPress'
    }
  ];

  // Auto slide interval for Laptop Screen
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentProjectIndex((prev) => (prev + 1) % laptopProjects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, laptopProjects.length]);

  // Handle 3D Mouse Parallax Tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!laptopCardRef.current) return;
    const rect = laptopCardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const activeProject = laptopProjects[currentProjectIndex];

  return (
    <div
      ref={laptopCardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-xl mx-auto py-2 perspective-1000"
    >
      {/* Background Animated Glowing Radial Aura */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.35, 0.15]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-12 -right-12 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.15, 1, 1.15],
          opacity: [0.1, 0.25, 0.1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-12 -left-12 w-80 h-80 bg-slate-400/10 rounded-full blur-3xl pointer-events-none"
      />

      {/* Interactive 3D Tilted Laptop Wrapper */}
      <motion.div
        animate={{
          rotateY: mousePos.x * 14,
          rotateX: -mousePos.y * 14
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className="relative z-10 w-full flex flex-col items-center font-['Montserrat',sans-serif]"
      >
        {/* ================= SLEEK HIGH-TECH SCREEN DISPLAY ================= */}
        <div className="relative w-full bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 p-2.5 sm:p-3.5 rounded-3xl border border-slate-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden group">
          {/* Top Camera Notch & Glossy Aluminum Edge */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-30">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-950 border border-slate-800 inline-block" />
            <span className="w-1 h-1 rounded-full bg-emerald-500/80 inline-block animate-pulse" />
          </div>

          {/* Glowing Glass Screen Display Inner Box */}
          <div className="relative w-full aspect-[16/10] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-inner flex flex-col justify-between">
            {/* Laptop Screen Active Portfolio Media Render */}
            <div className="relative flex-1 overflow-hidden group/screen bg-black">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  {/* Media Switcher: Video vs. Auto-Scroll Image vs. Standard Image */}
                  {activeProject.mediaType === 'video' && activeProject.videoUrl ? (
                    <div className="relative w-full h-full bg-black flex items-center justify-center">
                      <video
                        src={activeProject.videoUrl}
                        autoPlay
                        loop
                        muted={isMuted}
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMuted(!isMuted);
                        }}
                        className="absolute bottom-16 right-3 z-30 p-1.5 rounded-full bg-slate-950/80 text-white hover:bg-white hover:text-slate-950 transition-all border border-slate-700"
                        title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                      >
                        {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  ) : activeProject.mediaType === 'auto-scroll' ? (
                    <div className="relative w-full h-full overflow-hidden bg-slate-950">
                      <div className="w-full h-auto animate-auto-scroll">
                        <img
                          src={activeProject.imageUrl}
                          alt={activeProject.title}
                          className="w-full h-auto object-cover block"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/portfolio-media/texaswebcoders/Website/screencapture-allcountystaffingdade-2025-05-08-22_31_15.png';
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full overflow-hidden bg-slate-900 flex items-center justify-center">
                      <img
                        src={activeProject.imageUrl}
                        alt={activeProject.title}
                        className="w-full h-full object-cover object-center filter brightness-95"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/portfolio-media/texaswebcoders/software/Software and CRM Development1.jpg';
                        }}
                      />
                    </div>
                  )}

                  {/* Gradient bottom shade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Overlay Badge Top Left */}
              <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-slate-950/90 border border-slate-700 text-white text-[10px] font-bold font-['Montserrat',sans-serif] tracking-wider uppercase backdrop-blur-md shadow-lg">
                  {activeProject.badge}
                </span>
              </div>

              {/* Overlay Badge Top Right - Speed & Rating */}
              <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-['Montserrat',sans-serif] font-bold backdrop-blur-md">
                  ⚡ {activeProject.speed}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-white text-[10px] font-['Montserrat',sans-serif] font-bold backdrop-blur-md">
                  {activeProject.rating}
                </span>
              </div>

              {/* Screen Bottom Details Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 z-20 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent flex flex-col justify-end">
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-['Montserrat',sans-serif] mb-0.5">
                      {activeProject.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-extrabold text-white leading-tight font-['Montserrat',sans-serif] uppercase tracking-wide">
                      {activeProject.title}
                    </h3>
                    <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5 font-['Montserrat',sans-serif]">
                      {activeProject.subtitle}
                    </p>
                  </div>

                  {/* On-Screen Manual Controls */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                      className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white hover:bg-white hover:text-slate-950 transition-all cursor-pointer"
                      title={isAutoPlaying ? 'Pause Slideshow' : 'Start Slideshow'}
                    >
                      {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() =>
                        setCurrentProjectIndex(
                          (prev) => (prev - 1 + laptopProjects.length) % laptopProjects.length
                        )
                      }
                      className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white hover:bg-white hover:text-slate-950 transition-all cursor-pointer"
                      title="Previous Uploaded Project"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentProjectIndex((prev) => (prev + 1) % laptopProjects.length)
                      }
                      className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white hover:bg-white hover:text-slate-950 transition-all cursor-pointer"
                      title="Next Uploaded Project"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ambient Subtle Shadow Glow */}
        <div className="w-[85%] h-3 bg-white/5 rounded-full blur-md mt-2" />
      </motion.div>
    </div>
  );
};
