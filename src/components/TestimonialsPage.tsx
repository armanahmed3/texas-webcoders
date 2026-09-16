import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  ShieldCheck,
  ArrowRight,
  Clock,
  Flame,
  CalendarCheck
} from 'lucide-react';
import { TESTIMONIALS } from '../data/portfolioData';

interface TestimonialsPageProps {
  onNavigateSlide: (slideIndex: number) => void;
  onOpenQuoteCalculator: () => void;
  onOpenAppointmentModal: () => void;
}

// Live Countdown Hook - guarantees continuous ticking countdown with zero stalling
const useLiveCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 36,
    seconds: 48
  });

  useEffect(() => {
    // 3-day recurring client intake window countdown
    const getTargetTime = () => {
      try {
        const stored = localStorage.getItem('twc_intake_countdown_target');
        const now = Date.now();
        if (stored) {
          const parsed = parseInt(stored, 10);
          if (parsed > now) return parsed;
        }
        // Target: 2 days, 16 hours, 45 minutes from first load
        const newTarget = now + (2 * 24 * 3600 + 16 * 3600 + 45 * 60) * 1000;
        localStorage.setItem('twc_intake_countdown_target', newTarget.toString());
        return newTarget;
      } catch {
        return Date.now() + (2 * 24 * 3600 + 16 * 3600 + 45 * 60) * 1000;
      }
    };

    let targetTime = getTargetTime();

    const updateTimer = () => {
      const now = Date.now();
      let diff = targetTime - now;

      if (diff <= 0) {
        // Automatically rollover to next 3-day development sprint cycle
        targetTime = now + (3 * 24 * 3600) * 1000;
        try {
          localStorage.setItem('twc_intake_countdown_target', targetTime.toString());
        } catch {}
        diff = targetTime - now;
      }

      const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
      const hours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
      const minutes = Math.max(0, Math.floor((diff / (1000 * 60)) % 60));
      const seconds = Math.max(0, Math.floor((diff / 1000) % 60));

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return timeLeft;
};

// High-Performance Animated Statistic Counter
const StatCounter: React.FC<{
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
}> = ({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 1.8
}) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;
    const durationMs = duration * 1000;

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Smooth cubic out easing
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = decimals > 0 
        ? parseFloat((value * easeProgress).toFixed(decimals))
        : Math.round(value * easeProgress);

      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        setCount(value);
      }
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value, duration, decimals]);

  return (
    <span className="font-mono tracking-tight">
      {prefix}
      {decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()}
      {suffix}
    </span>
  );
};

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({
  onNavigateSlide,
  onOpenQuoteCalculator,
  onOpenAppointmentModal
}) => {
  const countdown = useLiveCountdown();

  // Helper function to render monochrome stars with fractional support
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    return (
      <div className="flex items-center gap-1 text-white">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-4 h-4 fill-white text-white" />
        ))}
        {hasHalf && (
          <div className="relative w-4 h-4">
            <Star className="w-4 h-4 text-zinc-600" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="w-4 h-4 fill-white text-white" />
            </div>
          </div>
        )}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-zinc-700" />
        ))}
        <span className="ml-1.5 text-xs font-mono font-bold text-white">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black pb-20 font-['Montserrat']">
      
      {/* 1. HERO HEADER SECTION (Monochrome Black & White) */}
      <section className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Subtle white ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/[0.04] rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Top Badges & Live Countdown Pill */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 backdrop-blur-md shadow-xl text-xs text-zinc-300"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="font-semibold text-white">250+ Verified Client Reviews</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-200 font-mono font-bold">100% Authentic Feedback</span>
            </motion.div>

            {/* Live Countdown Badge in Hero */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-zinc-950 border border-zinc-800 px-3.5 py-1.5 rounded-full shadow-xl backdrop-blur-md font-mono text-xs"
            >
              <Clock className="w-3.5 h-3.5 text-white animate-pulse" />
              <span className="text-zinc-400 uppercase text-[10px] tracking-wider font-semibold">Intake Closes In:</span>
              <div className="flex items-center gap-1 text-white font-bold">
                <span className="bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">{String(countdown.days)}d</span>
                <span>:</span>
                <span className="bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">{String(countdown.hours).padStart(2, '0')}h</span>
                <span>:</span>
                <span className="bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">{String(countdown.minutes).padStart(2, '0')}m</span>
                <span>:</span>
                <span className="bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800 text-white animate-pulse">{String(countdown.seconds).padStart(2, '0')}s</span>
              </div>
            </motion.div>
          </div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase leading-[1.15]"
          >
            Real Clients.{' '}
            <span className="text-zinc-400">
              Real Results.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            Discover why healthcare networks, venture-backed startups, luxury brands, and enterprise leaders choose Texas WebCoders for high-performance digital engineering.
          </motion.p>

          {/* Dynamic Animated Statistics Counters (250+ Projects, 99.4%, $1M+, 4.8★) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto"
          >
            {[
              {
                component: <StatCounter value={250} suffix="+" duration={2.0} />,
                label: 'Projects Completed',
                sub: 'Across US & Global'
              },
              {
                component: <StatCounter value={99.4} decimals={1} suffix="%" duration={2.0} />,
                label: 'Client Satisfaction',
                sub: 'Verified Client Score'
              },
              {
                component: <StatCounter value={1} prefix="$" suffix="M+" duration={1.8} />,
                label: 'Revenue Generated',
                sub: 'For Client Businesses'
              },
              {
                component: <StatCounter value={4.8} decimals={1} suffix=" ★" duration={1.8} />,
                label: 'Average Rating',
                sub: 'Verified Reviews'
              }
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl backdrop-blur-md text-center hover:border-zinc-700 transition-colors"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
                  {stat.component}
                </div>
                <div className="text-xs font-bold text-zinc-300 mt-1 uppercase">
                  {stat.label}
                </div>
                <div className="text-[10px] text-zinc-500 mt-0.5 font-mono">
                  {stat.sub}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>



      {/* 3. MAIN TESTIMONIALS DIRECTORY (Monochrome Black & White) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-10 text-center md:text-left">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block mb-1 font-mono">
            Verified Client Showcase • Texas WebCoders
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
            Client Testimonials & Case Reviews
          </h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
            Authentic feedback from founders, managing partners, and enterprise directors partnering with Texas WebCoders.
          </p>
        </div>

        {/* Testimonial Cards Grid with Framer Motion (Strictly Black and White) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {TESTIMONIALS.map((test, index) => (
              <motion.div
                key={test.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-6 flex flex-col justify-between hover:border-white/60 transition-all group hover:shadow-[0_10px_30px_rgba(255,255,255,0.05)] relative"
              >
                {/* Card Top Details */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {/* Stars with exact rating */}
                    {renderStars(test.rating || 5)}

                    {/* Verified Badge */}
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-700 text-[10px] font-bold text-zinc-300 font-mono">
                      <ShieldCheck className="w-3 h-3 text-white" />
                      Verified
                    </span>
                  </div>

                  {/* Project Type Badge */}
                  <div className="mb-3">
                    <span className="text-[11px] font-mono text-zinc-300 bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800 block w-fit">
                      {test.projectType}
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-sm text-zinc-200 leading-relaxed relative z-10 italic">
                    "{test.comment}"
                  </p>
                </div>

                {/* Card Footer: Client Info */}
                <div className="mt-6 pt-5 border-t border-zinc-800">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={test.avatar || '/assets/testimonials/client_avatar_1.png'}
                        alt={test.name}
                        className="w-12 h-12 rounded-full object-cover object-center border-2 border-zinc-700 group-hover:border-white transition-colors shadow-md shrink-0"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-1">
                          {test.name}
                        </h4>
                        <p className="text-xs text-zinc-400">
                          {test.role || 'Executive Leader'}
                        </p>
                        <p className="text-[11px] text-zinc-500 font-medium">
                          {test.company} • {test.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </section>

      {/* 4. CALL TO ACTION BANNER (Monochrome Black & White) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="bg-zinc-950 border border-zinc-800 p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block mb-2">
              Start Your Success Story
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
              Ready to Build Your Next High-Impact Digital Asset?
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 mt-3 leading-relaxed">
              Join 250+ satisfied clients who trust Texas WebCoders for speed, custom architecture, and measurable ROI.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenAppointmentModal}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Schedule Discovery Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenQuoteCalculator}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm border border-zinc-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Custom Quote</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
