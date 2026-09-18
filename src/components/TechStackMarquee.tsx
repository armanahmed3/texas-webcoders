import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import {
  Cpu,
  ShieldCheck,
  Zap,
  Layers,
  Globe,
  Code2,
  Database,
  Cloud,
  Terminal,
  Sparkles,
  CheckCircle2,
  Box,
  Server,
  Smartphone,
  Boxes,
  Film,
  Palette,
  Search,
  Lock,
  Workflow,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface TechItem {
  name: string;
  category: string;
  icon: React.ElementType;
  desc: string;
  badge: string;
}

interface TechCardProps {
  tech: TechItem;
  index: number;
  isLight?: boolean;
}

const TechCard: React.FC<TechCardProps> = ({ tech, isLight = false }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const Icon = tech.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 15, y: -y * 15 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
      className={`relative w-[280px] sm:w-[320px] p-5 rounded-2xl transition-all duration-300 group cursor-pointer flex-shrink-0 select-none border ${
        isLight
          ? 'bg-white border-zinc-200 hover:border-black hover:shadow-2xl text-zinc-900'
          : 'bg-zinc-950/90 border-zinc-800/90 hover:bg-zinc-900 hover:border-white/60 hover:shadow-[0_15px_35px_rgba(255,255,255,0.15)] text-white'
      }`}
    >
      {/* Glow Hover Accent */}
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-all pointer-events-none" />

      <div className="flex items-center justify-between gap-2 mb-3">
        <div
          className={`p-2.5 rounded-xl border shadow-md transition-colors ${
            isLight
              ? 'bg-zinc-100 border-zinc-300 text-zinc-900 group-hover:bg-black group-hover:text-white group-hover:border-black'
              : 'bg-zinc-900 border-zinc-700/80 text-white group-hover:bg-white group-hover:text-black group-hover:border-white'
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>

        <span
          className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium border transition-colors ${
            isLight
              ? 'bg-zinc-100 border-zinc-200 text-zinc-800'
              : 'bg-zinc-900 border-zinc-800 text-zinc-300 group-hover:bg-white group-hover:text-black'
          }`}
        >
          {tech.badge}
        </span>
      </div>

      <div className="space-y-1">
        <h3 className="font-semibold text-sm font-['Montserrat'] tracking-tight">
          {tech.name}
        </h3>
        <span className="block text-[11px] text-zinc-400 group-hover:text-zinc-300 font-medium font-mono">
          {tech.category}
        </span>
      </div>

      <p className="text-xs leading-relaxed mt-2 text-zinc-400 group-hover:text-zinc-200 font-normal">
        {tech.desc}
      </p>

      <div className="mt-3.5 pt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
        <span>Continuous Auto-Scroll</span>
        <span className="text-white group-hover:translate-x-1 transition-transform font-medium">
          Active Skill ✦
        </span>
      </div>
    </div>
  );
};

interface TechStackMarqueeProps {
  onNavigateSlide: (slideIndex: number) => void;
  variant?: 'black' | 'white' | 'none' | 'light-blue' | 'transparent';
}

export const TechStackMarquee: React.FC<TechStackMarqueeProps> = ({
  onNavigateSlide,
  variant = 'none'
}) => {
  const isWhite = variant === 'white';
  const isBlack = variant === 'black';
  const isNone = variant === 'none' || variant === 'transparent' || variant === 'light-blue';
  const [isPaused, setIsPaused] = useState(false);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const handleSwapBack = () => {
    setIsPaused(true);
    if (row1Ref.current) row1Ref.current.scrollBy({ left: -360, behavior: 'smooth' });
    if (row2Ref.current) row2Ref.current.scrollBy({ left: -360, behavior: 'smooth' });
  };

  const handleSwapForward = () => {
    setIsPaused(true);
    if (row1Ref.current) row1Ref.current.scrollBy({ left: 360, behavior: 'smooth' });
    if (row2Ref.current) row2Ref.current.scrollBy({ left: 360, behavior: 'smooth' });
  };

  // Skill row 1: Frontend, Full-Stack & Creative Engineering
  const skillsRow1: TechItem[] = [
    {
      name: 'React 19 & Next.js 15',
      category: 'Frontend Core',
      icon: Code2,
      desc: 'Server components, sub-0.3s hydration & optimized edge bundle size.',
      badge: 'React 19'
    },
    {
      name: 'TypeScript Strict',
      category: 'Type Safety & Logic',
      icon: Terminal,
      desc: '100% strict static compilation preventing runtime edge bugs.',
      badge: 'TypeScript 5'
    },
    {
      name: 'Tailwind CSS v4',
      category: 'Design Systems',
      icon: Layers,
      desc: 'Modern utility tokens, container queries & dark-mode variables.',
      badge: 'Tailwind'
    },
    {
      name: 'Three.js & WebGL',
      category: '3D Graphics & Shaders',
      icon: Sparkles,
      desc: 'GPU-accelerated 3D mesh rendering, particle physics & GLSL lighting.',
      badge: '3D Canvas'
    },
    {
      name: 'Framer Motion & GSAP',
      category: 'Dynamic Animation',
      icon: Zap,
      desc: 'Ultra-fluid 60 FPS scroll-driven animations & spring layout physics.',
      badge: '60 FPS'
    },
    {
      name: 'Figma UI/UX Systems',
      category: 'Product Design',
      icon: Palette,
      desc: 'Atomic design kits, clickable prototypes & WCAG 2.1 AA accessibility.',
      badge: 'Figma Pro'
    },
    {
      name: 'WordPress & Gutenberg',
      category: 'CMS Architecture',
      icon: Boxes,
      desc: 'Bespoke Gutenberg block themes & headless REST API integrations.',
      badge: 'WP 6.7'
    },
    {
      name: 'Blender & 3D Cinema',
      category: '3D Modeling & VFX',
      icon: Film,
      desc: 'Photorealistic 4K 60FPS product reveals & architectural fly-throughs.',
      badge: 'Ray-Tracing'
    }
  ];

  // Skill row 2: Backend, Mobile, Cloud, Database & Security
  const skillsRow2: TechItem[] = [
    {
      name: 'Node.js & Express / Fastify',
      category: 'Backend Microservices',
      icon: Cpu,
      desc: 'High-throughput async API endpoints with JWT token encryption.',
      badge: 'Node 22'
    },
    {
      name: 'PostgreSQL & Relational DB',
      category: 'Data Storage & ACID',
      icon: Database,
      desc: 'Indexed relational models, migrations & row-level security policies.',
      badge: 'PostgreSQL'
    },
    {
      name: 'Docker & Google Cloud Run',
      category: 'Cloud & Serverless',
      icon: Cloud,
      desc: 'Zero-downtime container CI/CD pipelines with auto-scaling to zero.',
      badge: 'Cloud Run'
    },
    {
      name: 'Swift & iOS Native SDK',
      category: 'Apple App Ecosystem',
      icon: Smartphone,
      desc: 'SwiftUI, FaceID biometric security & App Store publication pipeline.',
      badge: 'iOS 18'
    },
    {
      name: 'Kotlin & Android SDK',
      category: 'Google Play Mobile',
      icon: Smartphone,
      desc: 'Jetpack Compose, reactive flows & Google Play distribution.',
      badge: 'Android 15'
    },
    {
      name: 'Redis Cache & Micro-Caching',
      category: 'In-Memory Speed',
      icon: Server,
      desc: 'Sub-5ms query caching, session management & high-traffic queue buffers.',
      badge: 'Redis 7'
    },
    {
      name: 'Stripe Connect & Multi-Ledger',
      category: 'Payment Infrastructure',
      icon: Lock,
      desc: 'PCI-DSS Level 1 split payments, subscriptions & multi-currency rails.',
      badge: 'Stripe SDK'
    },
    {
      name: 'Google Core Web Vitals SEO',
      category: 'Speed & Entity Ranking',
      icon: Search,
      desc: 'Semantic JSON-LD schema, sub-0.3s TTFB & Texas local search dominance.',
      badge: '100/100 CWV'
    }
  ];

  const guarantees = [
    { title: 'Sub-400ms Page Loads', desc: 'Optimized asset bundles, edge CDN caching & Next.js SSR.' },
    { title: '100% W3C & WCAG Accessible', desc: 'Screen-reader compatible with keyboard accessibility.' },
    { title: 'SEO Score 95+ Guaranteed', desc: 'Google Lighthouse audit top tier ranking performance.' },
    { title: 'Enterprise Encryption', desc: 'TLS 1.3, SSL security, and OWASP top-10 defense.' }
  ];

  return (
    <section className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full overflow-hidden">
      {/* Background Section Container with Curved Round Styling */}
      <div
        className={`border rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 lg:p-14 relative overflow-hidden transition-all duration-300 ${
          isNone
            ? 'bg-transparent border-white/10 text-white shadow-none'
            : isWhite
              ? 'bg-white border-zinc-200 text-zinc-900 shadow-zinc-900/5'
              : 'bg-zinc-950 border-zinc-800 text-white shadow-2xl'
        }`}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-zinc-800/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium uppercase tracking-widest font-mono ${
              isWhite
                ? 'bg-zinc-100 border border-zinc-300 text-zinc-900'
                : 'bg-zinc-900 border border-zinc-700 text-white'
            }`}
          >
            <Workflow className="w-4 h-4 text-white" />
            <span>Continuous Auto-Scrolling Skills Engine • Texas WebCoders</span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`text-2xl sm:text-4xl font-semibold font-['Montserrat',sans-serif] uppercase tracking-tight ${
              isWhite ? 'text-zinc-950' : 'text-white'
            }`}
          >
            Engineered Across All Modern Skills & Technologies
          </motion.h2>

          <p
            className={`text-xs sm:text-sm font-normal leading-relaxed ${
              isWhite ? 'text-zinc-600' : 'text-zinc-400'
            }`}
          >
            Every technology skill scrolls continuously in real time. Hover over any skill to pause the animation and interact in 3D.
          </p>
        </div>

        {/* Interactive Controls Bar: Swap Back, Pause/Resume, Swap Forward */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 px-2">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Continuous Auto-Slide • Hover cursor to freeze &amp; inspect</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSwapBack}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-md active:scale-95 ${
                isWhite
                  ? 'bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-zinc-900'
                  : 'bg-zinc-900 hover:bg-white hover:text-black border border-zinc-700 text-white'
              }`}
              title="Slide / Swap Technologies Back"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Swap Back</span>
            </button>

            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                isWhite
                  ? 'bg-zinc-100 border border-zinc-300 text-zinc-700'
                  : 'bg-zinc-900/80 border border-zinc-700/80 text-zinc-300 hover:text-white'
              }`}
            >
              {isPaused ? '▶ Resume Auto-Slide' : '⏸ Pause'}
            </button>

            <button
              onClick={handleSwapForward}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-md active:scale-95 ${
                isWhite
                  ? 'bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-zinc-900'
                  : 'bg-zinc-900 hover:bg-white hover:text-black border border-zinc-700 text-white'
              }`}
              title="Slide / Swap Technologies Forward"
            >
              <span>Swap Forward</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Auto-Scrolling Skills Tracks with Pause-on-Hover */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="space-y-4 sm:space-y-6 mb-12 relative overflow-hidden py-2"
        >
          {/* Inject pure CSS keyframe styles for rock-solid freeze-on-hover & resume */}
          <style>{`
            @keyframes twcMarqueeLeft {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            @keyframes twcMarqueeRight {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0%); }
            }
            .twc-track-left {
              animation: twcMarqueeLeft 36s linear infinite;
            }
            .twc-track-right {
              animation: twcMarqueeRight 40s linear infinite;
            }
            .twc-paused {
              animation-play-state: paused !important;
            }
          `}</style>

          {/* Gradient Edge Masks for Smooth Fade Out */}
          <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

          {/* Row 1: Auto-scroll Left + Scrollable/Draggable */}
          <div
            ref={row1Ref}
            className="flex overflow-x-auto no-scrollbar w-full py-1 cursor-grab active:cursor-grabbing"
          >
            <div
              className={`flex gap-4 sm:gap-5 flex-nowrap shrink-0 twc-track-left ${isPaused ? 'twc-paused' : ''}`}
            >
              {[...skillsRow1, ...skillsRow1, ...skillsRow1].map((tech, idx) => (
                <TechCard
                  key={`r1-${tech.name}-${idx}`}
                  tech={tech}
                  index={idx}
                  isLight={isWhite}
                />
              ))}
            </div>
          </div>

          {/* Row 2: Auto-scroll Right + Scrollable/Draggable */}
          <div
            ref={row2Ref}
            className="flex overflow-x-auto no-scrollbar w-full py-1 cursor-grab active:cursor-grabbing"
          >
            <div
              className={`flex gap-4 sm:gap-5 flex-nowrap shrink-0 twc-track-right ${isPaused ? 'twc-paused' : ''}`}
            >
              {[...skillsRow2, ...skillsRow2, ...skillsRow2].map((tech, idx) => (
                <TechCard
                  key={`r2-${tech.name}-${idx}`}
                  tech={tech}
                  index={idx}
                  isLight={isWhite}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Guarantees Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-zinc-800/80">
          {guarantees.map((g, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-xs text-white font-['Montserrat']">{g.title}</h4>
                <p className="text-zinc-400 text-xs mt-0.5 leading-normal">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Teaser */}
        <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 bg-zinc-950/60 p-4 sm:p-6 rounded-2xl">
          <div className="text-xs text-zinc-300">
            <span className="text-white font-semibold block sm:inline">
              Need a custom architecture recommendation?
            </span>{' '}
            Our lead engineers in Texas provide technical consultations free of charge.
          </div>
          <button
            onClick={() => onNavigateSlide(3)}
            className="bg-white hover:bg-zinc-200 text-black px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-lg font-['Montserrat',sans-serif]"
          >
            Explore Custom Services & Architecture →
          </button>
        </div>
      </div>
    </section>
  );
};
