import React, { useState } from 'react';
import { PortfolioProject } from '../types';
import { 
  X, 
  Monitor, 
  Tablet, 
  Smartphone, 
  CheckCircle, 
  ExternalLink, 
  ArrowRight, 
  ShieldCheck,
  Play,
  Pause,
  Maximize2,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

interface ProjectModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onOrderSimilar: (project: PortfolioProject) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOrderSimilar
}) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isAutoScrollActive, setIsAutoScrollActive] = useState<boolean>(true);

  if (!project) return null;

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const isPitchDeck = project.subCategory === 'Pitch Deck';
  const isVideo = project.mediaType === 'video' || !!project.videoUrl;
  const isGraphicOrDesign = 
    project.category === 'Graphic Designing' ||
    project.category === 'Graphic Design' ||
    project.category === 'Logo Designing' ||
    project.category === 'Logo & Branding' ||
    project.category === 'Interior & 3D Design' ||
    project.category === 'Interior 3D' ||
    project.subCategory === 'Logo Design' ||
    project.subCategory === 'Typography' ||
    project.subCategory === 'Pitch Deck' ||
    project.subCategory === 'Book Cover' ||
    project.subCategory === 'Children Book Illustration' ||
    project.subCategory === 'Flyers / Brochures' ||
    project.subCategory === 'Packaging' ||
    project.subCategory === 'Business Card';

  const isWebsiteProject = !isVideo && !isGraphicOrDesign && (
    project.category === 'Website Development' ||
    project.category === 'WordPress Development' ||
    project.category === 'UI / UX Design' ||
    project.category === 'UI/UX Design' ||
    project.category === 'E-Commerce' ||
    project.isAutoScroll === true ||
    project.mediaType === 'auto-scroll'
  );

  const deviceDimensions = {
    desktop: 'w-full max-w-4xl h-[480px]',
    tablet: 'w-[560px] max-w-full h-[500px]',
    mobile: 'w-[320px] max-w-full h-[520px]'
  };

  // Smooth bounded auto-scroll for long full-page websites without overshooting or creating black space
  React.useEffect(() => {
    if (!isWebsiteProject || !isAutoScrollActive) return;

    const el = scrollContainerRef.current;
    if (!el) return;

    let isScrollingDown = true;
    let pauseTimer: ReturnType<typeof setTimeout> | null = null;

    const interval = setInterval(() => {
      if (!el || pauseTimer) return;

      const maxScroll = el.scrollHeight - el.clientHeight;
      if (maxScroll <= 0) return;

      if (isScrollingDown) {
        if (el.scrollTop >= maxScroll - 2) {
          pauseTimer = setTimeout(() => {
            isScrollingDown = false;
            pauseTimer = null;
          }, 2000);
        } else {
          el.scrollTop += 1.5;
        }
      } else {
        if (el.scrollTop <= 2) {
          pauseTimer = setTimeout(() => {
            isScrollingDown = true;
            pauseTimer = null;
          }, 2000);
        } else {
          el.scrollTop -= 2.5;
        }
      }
    }, 25);

    return () => {
      clearInterval(interval);
      if (pauseTimer) clearTimeout(pauseTimer);
    };
  }, [isWebsiteProject, isAutoScrollActive, deviceMode]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/90 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-slate-950 border border-slate-800 rounded-3xl max-w-5xl w-full max-h-[94vh] overflow-y-auto shadow-2xl flex flex-col my-auto"
      >
        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-950/95 backdrop-blur-md z-30">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest bg-slate-900 border border-slate-700 px-2.5 py-0.5 rounded-full font-['Montserrat']">
                {project.category}
              </span>
              {project.subCategory && (
                <span className="text-[10px] font-bold text-white uppercase tracking-widest bg-slate-800 border border-slate-700 px-2.5 py-0.5 rounded-full font-['Montserrat']">
                  {project.subCategory}
                </span>
              )}
              <span className="text-xs text-slate-400 font-mono">
                {project.year}
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-white font-['Montserrat'] tracking-tight">
              {project.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Viewport Switcher (for interactive responsive web projects only) */}
            {isWebsiteProject && (
              <div className="hidden sm:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setDeviceMode('desktop')}
                  title="Desktop Viewport"
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    deviceMode === 'desktop' ? 'bg-white text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeviceMode('tablet')}
                  title="Tablet Viewport"
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    deviceMode === 'tablet' ? 'bg-white text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeviceMode('mobile')}
                  title="Mobile Viewport"
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    deviceMode === 'mobile' ? 'bg-white text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-8 space-y-8">
          {/* Device Mockup Frame / Video Showcase Container */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
            
            {/* Video Player Display */}
            {isVideo ? (
              <div className="w-full max-w-4xl rounded-xl overflow-hidden bg-black border border-slate-800 shadow-2xl">
                <video
                  src={project.videoUrl}
                  poster={project.imageUrl}
                  controls
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full max-h-[500px] object-contain mx-auto bg-black"
                />
              </div>
            ) : isWebsiteProject ? (
              /* Image / Website Showcase Canvas Frame with bounded native scroll */
              <div className="w-full flex flex-col items-center">
                <div 
                  ref={scrollContainerRef}
                  className={`transition-all duration-300 overflow-y-auto border border-slate-800 rounded-2xl shadow-2xl bg-slate-950 ${deviceDimensions[deviceMode]}`}
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-auto object-cover block"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('unsplash')) {
                        target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';
                      }
                    }}
                  />
                </div>

                {/* Auto-scroll toggle control for websites */}
                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={() => setIsAutoScrollActive(!isAutoScrollActive)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700 shadow-md"
                  >
                    {isAutoScrollActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isAutoScrollActive ? 'Pause Auto-Scroll' : 'Resume Auto-Scroll'}</span>
                  </button>
                  <span className="text-xs text-slate-400">
                    Scroll mouse wheel inside the frame to inspect manually.
                  </span>
                </div>
              </div>
            ) : (
              /* Graphic Design, Logo, Book Cover, Typography, Packaging & 3D Render Pristine Full-View */
              <div className="w-full flex flex-col items-center justify-center p-2 sm:p-5 bg-slate-950/90 rounded-2xl border border-slate-800 shadow-2xl">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="max-h-[76vh] w-auto max-w-full object-contain rounded-xl shadow-2xl mx-auto block"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('unsplash')) {
                      target.src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80';
                    }
                  }}
                />
              </div>
            )}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.stats.map((stat, i) => (
              <div key={i} className="glass-panel p-4 rounded-xl border border-slate-800 text-center">
                <div className="text-2xl font-bold text-white font-['Montserrat']">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-5">
              <div>
                <h3 className="text-xl font-bold text-white font-['Montserrat'] mb-2">
                  Project Overview
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {project.overview || project.description}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 font-['Montserrat'] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Key Features Delivered</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.keyFeatures.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl text-xs text-slate-200">
                      <CheckCircle className="w-4 h-4 text-white shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6 glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div className="space-y-5">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Client & Year
                  </span>
                  <p className="text-base font-bold text-white font-['Montserrat']">
                    {project.clientName} ({project.year})
                  </p>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                    Tech Stack Applied
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-slate-800 space-y-3">
                <button
                  onClick={() => {
                    onOrderSimilar(project);
                    onClose();
                  }}
                  className="w-full bg-white hover:bg-zinc-200 text-slate-950 font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl cursor-pointer transition-all"
                >
                  <span>Request Similar Build</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
