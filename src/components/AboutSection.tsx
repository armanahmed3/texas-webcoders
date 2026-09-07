import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Shield, Target, Users, Award, Code2, Sparkles, CheckCircle } from 'lucide-react';

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

const StatCounter: React.FC<StatCounterProps> = ({
  value,
  suffix = '',
  prefix = '',
  duration = 2.2
}) => {
  const [count, setCount] = useState<number>(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    const startTime = performance.now();
    const durationMs = duration * 1000;
    let animationFrameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Smooth cubic-out easing curve for natural counter deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(value * easeProgress);

      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        setCount(value);
      }
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-mono tracking-tight">
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

interface AboutSectionProps {
  onNavigateSlide: (index: number) => void;
  variant?: 'white' | 'black' | 'none' | 'light-blue' | 'transparent';
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigateSlide, variant = 'white' }) => {
  const isWhite = variant === 'white';
  const isBlack = variant === 'black';
  const isNone = variant === 'none' || variant === 'transparent' || variant === 'light-blue';

  const localSectors = [
    'Medical & Healthcare Practices',
    'Commercial Contractors & Trades',
    'Legal & Financial Firms',
    'Logistics & Energy Providers',
    'Retail & E-Commerce Stores'
  ];

  return (
    <section id="about" className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative z-10 min-h-screen flex flex-col justify-center">
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
        {/* Decorative background glow */}
        <div
          className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
            isWhite ? 'bg-slate-200/40' : 'bg-white/5'
          }`}
        />
        <div
          className={`absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
            isWhite ? 'bg-slate-200/30' : 'bg-slate-800/20'
          }`}
        />

        <div className="relative z-10">
          {/* Section Header */}
          <div className="text-center mb-14">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-xs font-semibold uppercase tracking-widest mb-2 block font-['Montserrat'] ${
                isWhite ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              Texas Engineering Firm • 5221 S Broadway Ave, Tyler, TX 75703
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-2xl sm:text-4xl md:text-5xl font-semibold mb-4 uppercase tracking-tight font-['Montserrat',sans-serif] max-w-4xl mx-auto ${
                isWhite ? 'text-slate-950' : 'text-white'
              }`}
            >
              Engineering Reliable Digital Platforms for Texas Leaders
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`max-w-3xl mx-auto text-sm sm:text-base leading-relaxed ${
                isWhite ? 'text-zinc-600' : 'text-slate-300'
              }`}
            >
              Based at 5221 S Broadway Ave, Tyler, TX 75703, TexasWebCoders delivers tailored software engineering, conversion-focused web development, and localized search optimization. We partner directly with medical practices, legal counsel, commercial contractors, logistics companies, and retail operators across Smith County, Longview, and surrounding East Texas communities to build dependable digital systems that drive measurable client acquisition.
            </motion.p>
          </div>

          {/* Key Agency Statistics Counter Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className={`p-6 rounded-2xl text-center border shadow-sm ${
                isWhite ? 'bg-zinc-50 border-zinc-200' : 'bg-slate-950/80 border-slate-800'
              }`}
            >
              <div className={`text-3xl sm:text-4xl font-semibold font-mono tracking-tight ${
                isWhite ? 'text-slate-950' : 'text-white'
              }`}>
                <StatCounter value={400} suffix="+" duration={2.2} />
              </div>
              <div className="text-xs uppercase font-semibold tracking-wider text-slate-400 mt-1">Satisfied Clients</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className={`p-6 rounded-2xl text-center border shadow-sm ${
                isWhite ? 'bg-zinc-50 border-zinc-200' : 'bg-slate-950/80 border-slate-800'
              }`}
            >
              <div className={`text-3xl sm:text-4xl font-semibold font-mono tracking-tight ${
                isWhite ? 'text-slate-950' : 'text-white'
              }`}>
                <StatCounter value={500} suffix="+" duration={2.2} />
              </div>
              <div className="text-xs uppercase font-semibold tracking-wider text-slate-400 mt-1">Projects Completed</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className={`p-6 rounded-2xl text-center border shadow-sm ${
                isWhite ? 'bg-zinc-50 border-zinc-200' : 'bg-slate-950/80 border-slate-800'
              }`}
            >
              <div className={`text-3xl sm:text-4xl font-semibold font-mono tracking-tight ${
                isWhite ? 'text-slate-950' : 'text-white'
              }`}>
                <StatCounter value={100} suffix="%" duration={2.0} />
              </div>
              <div className="text-xs uppercase font-semibold tracking-wider text-slate-400 mt-1">Code & IP Ownership</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className={`p-6 rounded-2xl text-center border shadow-sm ${
                isWhite ? 'bg-zinc-50 border-zinc-200' : 'bg-slate-950/80 border-slate-800'
              }`}
            >
              <div className={`text-3xl sm:text-4xl font-semibold font-mono tracking-tight ${
                isWhite ? 'text-slate-950' : 'text-white'
              }`}>
                <StatCounter value={10} suffix="+" duration={1.8} />
              </div>
              <div className="text-xs uppercase font-semibold tracking-wider text-slate-400 mt-1">Years Local Experience</div>
            </motion.div>
          </div>

          {/* 3 Core Pillars Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`p-8 rounded-2xl space-y-4 group transition-all shadow-sm border ${
                isWhite
                  ? 'bg-zinc-50 border-zinc-200 hover:border-slate-950 text-slate-900'
                  : 'bg-slate-950/80 border-slate-800 hover:border-white/60 text-white'
              }`}
            >
              <div className={`p-3 w-fit rounded-xl group-hover:scale-110 transition-transform shadow-sm border ${
                isWhite ? 'bg-white border-zinc-200 text-slate-950' : 'bg-slate-900 border-slate-700 text-white'
              }`}>
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className={`text-xl font-semibold font-['Montserrat'] ${
                isWhite ? 'text-slate-950' : 'text-white'
              }`}>
                High-Converting Web Design & Texas SEO
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${
                isWhite ? 'text-zinc-600' : 'text-slate-400'
              }`}>
                We build high-performance WordPress systems, custom React applications, and WooCommerce storefronts architected to rank #1 across Texas and regional search queries, converting local traffic into booked consultations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className={`p-8 rounded-2xl space-y-4 group transition-all shadow-sm border ${
                isWhite
                  ? 'bg-zinc-50 border-zinc-200 hover:border-slate-950 text-slate-900'
                  : 'bg-slate-950/80 border-slate-800 hover:border-white/60 text-white'
              }`}
            >
              <div className={`p-3 w-fit rounded-xl group-hover:scale-110 transition-transform shadow-sm border ${
                isWhite ? 'bg-white border-zinc-200 text-slate-950' : 'bg-slate-900 border-slate-700 text-white'
              }`}>
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className={`text-xl font-semibold font-['Montserrat'] ${
                isWhite ? 'text-slate-950' : 'text-white'
              }`}>
                Custom iOS & Android Mobile Apps
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${
                isWhite ? 'text-zinc-600' : 'text-slate-400'
              }`}>
                From contractor dispatch and quoting software to patient check-in portals and internal CRM pipelines, we build custom web and mobile applications that automate administrative workloads and scale business operations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`p-8 rounded-2xl space-y-4 group transition-all shadow-sm border ${
                isWhite
                  ? 'bg-zinc-50 border-zinc-200 hover:border-slate-950 text-slate-900'
                  : 'bg-slate-950/80 border-slate-800 hover:border-white/60 text-white'
              }`}
            >
              <div className={`p-3 w-fit rounded-xl group-hover:scale-110 transition-transform shadow-sm border ${
                isWhite ? 'bg-white border-zinc-200 text-slate-950' : 'bg-slate-900 border-slate-700 text-white'
              }`}>
                <Shield className="w-6 h-6" />
              </div>
              <h3 className={`text-xl font-semibold font-['Montserrat'] ${
                isWhite ? 'text-slate-950' : 'text-white'
              }`}>
                Direct Texas Developer Access & Security
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${
                isWhite ? 'text-zinc-600' : 'text-slate-400'
              }`}>
                Work directly with senior Texas software engineers without middle managers. Every client receives 100% intellectual property ownership, strict NDA coverage, transparent milestone billing, and local support.
              </p>
            </motion.div>
          </div>

          {/* Local Industry Specialization Strip */}
          <div className="mb-14 text-center">
            <span className={`text-[11px] font-semibold uppercase tracking-widest mb-3 block ${
              isWhite ? 'text-slate-500' : 'text-slate-400'
            }`}>
              Specialized Software Engineering For East Texas Industries
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
              {localSectors.map((sector, idx) => (
                <span
                  key={idx}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border ${
                    isWhite
                      ? 'bg-zinc-100 border-zinc-300 text-slate-800'
                      : 'bg-slate-900/90 border-slate-800 text-slate-300'
                  }`}
                >
                  {sector}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Consultation CTA */}
          <div className={`rounded-2xl p-8 border flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl ${
            isWhite ? 'bg-zinc-50 border-zinc-200 text-slate-950' : 'bg-slate-950 border-slate-800 text-white'
          }`}>
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <h4 className={`text-base font-bold font-['Montserrat'] uppercase ${
                  isWhite ? 'text-slate-950' : 'text-white'
                }`}>
                  Ready to Modernize Your Business Technology?
                </h4>
                <p className={`text-xs mt-0.5 ${
                  isWhite ? 'text-zinc-600' : 'text-slate-400'
                }`}>
                  Partner with TexasWebCoders for high-speed custom software, mobile apps, and 3D web systems.
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigateSlide(9)}
              className={`px-7 py-3 rounded-xl text-xs font-bold font-['Montserrat'] uppercase tracking-wider transition-all cursor-pointer shadow-lg shrink-0 ${
                isWhite
                  ? 'bg-slate-950 text-white hover:bg-slate-800'
                  : 'bg-white text-slate-950 hover:bg-zinc-200'
              }`}
            >
              Schedule Technical Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
