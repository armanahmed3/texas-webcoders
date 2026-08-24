import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Award, TrendingUp, CheckCircle2, Zap, ShieldCheck, Users, Code, BarChart3, Sparkles } from 'lucide-react';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 2.2
}) => {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    const startTime = performance.now();
    const durationMs = duration * 1000;

    const updateCounter = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Custom easeOutExpo curve for smooth finish
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = value * easeProgress;
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-mono tracking-tight">
      {prefix}
      {displayValue.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      })}
      {suffix}
    </span>
  );
};

export const ResultsMetricsCounter: React.FC = () => {
  const metrics = [
    {
      id: 'projects',
      label: 'Projects Delivered',
      value: 285,
      suffix: '+',
      prefix: '',
      decimals: 0,
      icon: CheckCircle2,
      color: 'text-slate-950',
      description: 'Enterprise web apps, custom portals & mobile tools delivered on schedule.'
    },
    {
      id: 'roi',
      label: 'Client ROI Average',
      value: 340,
      suffix: '%',
      prefix: '+',
      decimals: 0,
      icon: TrendingUp,
      color: 'text-slate-900',
      description: 'Measurable expansion in organic traffic, user retention & conversion rates.'
    },
    {
      id: 'speed',
      label: 'Page Load Benchmark',
      value: 0.38,
      suffix: 's',
      prefix: '',
      decimals: 2,
      icon: Zap,
      color: 'text-slate-950',
      description: 'Sub-second initial paint times verified by Google Lighthouse audit standard.'
    },
    {
      id: 'satisfaction',
      label: 'Client Retention Rate',
      value: 98.6,
      suffix: '%',
      prefix: '',
      decimals: 1,
      icon: Users,
      color: 'text-slate-900',
      description: 'Long-term ongoing support contracts and repeat enterprise client partnerships.'
    }
  ];

  return (
    <section className="relative py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full font-['Montserrat',sans-serif]">
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-slate-950 text-xs font-medium uppercase tracking-wider font-['Montserrat',sans-serif]"
          >
            <BarChart3 className="w-3.5 h-3.5 text-slate-800" />
            <span>Proven Track Record • Verified Performance</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-medium font-['Montserrat',sans-serif] uppercase tracking-tight text-slate-950"
          >
            Results & Performance Metrics
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-600 text-xs sm:text-sm font-medium tracking-normal font-['Montserrat',sans-serif]"
          >
            Real technical impact engineered into every digital platform we build for our partners.
          </motion.p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="bg-zinc-50/80 border border-zinc-200/90 hover:border-slate-950 p-6 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-slate-950 text-white group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest font-['Montserrat',sans-serif]">
                      Metric #{idx + 1}
                    </span>
                  </div>

                  <div className={`text-3xl sm:text-4xl font-medium ${metric.color} font-['Montserrat',sans-serif] mb-1`}>
                    <AnimatedCounter
                      value={metric.value}
                      prefix={metric.prefix}
                      suffix={metric.suffix}
                      decimals={metric.decimals}
                    />
                  </div>

                  <h3 className="font-medium text-sm sm:text-base text-slate-950 uppercase tracking-wider font-['Montserrat',sans-serif] mb-2">
                    {metric.label}
                  </h3>
                </div>

                <p className="text-zinc-600 text-xs leading-relaxed pt-2.5 border-t border-zinc-200 font-medium tracking-normal font-['Montserrat',sans-serif]">
                  {metric.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
