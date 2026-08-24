import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, CheckCircle2, Star, Sparkles, ExternalLink, Lock, Check } from 'lucide-react';

interface TrustIndicatorsSectionProps {
  onOpenAppointmentModal?: () => void;
  variant?: 'light-blue' | 'black' | 'white' | 'none' | 'transparent';
}

export const TrustIndicatorsSection: React.FC<TrustIndicatorsSectionProps> = ({
  onOpenAppointmentModal,
  variant = 'none'
}) => {
  const isBlack = variant === 'black';
  const isWhite = variant === 'white';
  const isNone = variant === 'none' || variant === 'transparent' || variant === 'light-blue';

  const trustBadges = [
    {
      id: 'ownership',
      title: '100% Full Code Ownership',
      category: 'Client Rights',
      rating: 'Zero Vendor Lock-in',
      description: 'You own 100% of your source code, design files, domain, and database credentials upon project completion.',
      icon: <Award className="w-5 h-5" />,
      tag: 'Full Ownership'
    },
    {
      id: 'performance',
      title: 'Fast Page Speed & Core Web Vitals',
      category: 'Speed & SEO',
      rating: 'Sub-1s Load Time',
      description: 'Optimized for high Google Core Web Vitals scores to ensure visitors stay engaged and rank well on search engines.',
      icon: <CheckCircle2 className="w-5 h-5" />,
      tag: 'Fast & Optimized'
    },
    {
      id: 'responsive',
      title: 'Mobile-First & Cross-Browser Tested',
      category: 'User Experience',
      rating: 'iOS, Android & Desktop',
      description: 'Hand-tested across modern mobile devices, tablets, and web browsers for a flawless customer experience.',
      icon: <ShieldCheck className="w-5 h-5" />,
      tag: 'Fully Responsive'
    },
    {
      id: 'security',
      title: 'Secure Hosting & NDA Protection',
      category: 'Security & Privacy',
      rating: 'Strict Confidentiality',
      description: 'Mutual non-disclosure agreements (NDAs) to protect your business ideas, customer data, and intellectual property.',
      icon: <Lock className="w-5 h-5" />,
      tag: 'Protected & Secure'
    },
    {
      id: 'communication',
      title: 'Direct Communication with Developers',
      category: 'Client Service',
      rating: 'Texas-Based Team',
      description: 'Direct phone, email, and live messaging access to your project lead with clear milestones and regular progress updates.',
      icon: <Star className="w-5 h-5 fill-current" />,
      tag: 'Direct Access'
    },
    {
      id: 'support',
      title: 'Dedicated Post-Launch Support',
      category: 'Ongoing Reliability',
      rating: 'Warranty & Maintenance',
      description: 'Every project includes a post-launch warranty, bug fixing support, and optional monthly maintenance plans.',
      icon: <Sparkles className="w-5 h-5" />,
      tag: 'Reliable Support'
    }
  ];

  const enterprisePartners = [
    { name: 'React & Vite', symbol: '⚛️ Frontend' },
    { name: 'Node.js & Express', symbol: '🟢 Backend' },
    { name: 'WordPress & WooCommerce', symbol: '🚀 CMS' },
    { name: 'Shopify Storefronts', symbol: '🛒 E-Commerce' },
    { name: 'AWS & Cloud Hosting', symbol: '☁️ Cloud' },
    { name: 'Stripe & PayPal', symbol: '💳 Payments' }
  ];

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Curved Round Section Container */}
      <div
        className={`max-w-7xl mx-auto rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 lg:p-14 relative overflow-hidden transition-all duration-300 ${
          isNone
            ? 'bg-transparent text-white border border-white/10 shadow-none'
            : isBlack
              ? 'bg-[#080c14] text-white border border-slate-800 shadow-2xl'
              : 'bg-white text-slate-900 border border-zinc-200 shadow-zinc-900/5'
        }`}
      >
        {/* Background Subtle Accent */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-slate-800/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Top Header Signature */}
          <div className="text-center mb-12 space-y-3">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-medium uppercase tracking-widest font-['Montserrat'] shadow-sm ${
                isNone || isBlack
                  ? 'bg-slate-900/90 border border-slate-700 text-white'
                  : 'bg-white/90 border border-zinc-300 text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              <span>Quality Standards & Guarantees • Texas WebCoders</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-2xl sm:text-4xl font-semibold uppercase tracking-tight font-['Montserrat',sans-serif] ${
                isNone || isBlack ? 'text-white' : 'text-slate-950'
              }`}
            >
              Our Engineering & Quality Standards
            </motion.h2>

            <p className={`text-xs sm:text-sm max-w-2xl mx-auto font-normal leading-relaxed ${
              isNone || isBlack ? 'text-slate-300' : 'text-slate-700'
            }`}>
              We build custom websites and software with clean code, fast page speeds, complete ownership, and dependable Texas-based developer support.
            </p>
          </div>

          {/* 6 Trust Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {trustBadges.map((badge, idx) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                onClick={onOpenAppointmentModal}
                className={`rounded-2xl p-5 transition-all duration-300 group hover:shadow-xl flex flex-col justify-between cursor-pointer border ${
                  isNone
                    ? 'bg-slate-950/60 border-white/10 text-white hover:border-white/60 hover:bg-slate-900/80'
                    : isBlack
                      ? 'bg-slate-950 border-slate-800 text-white hover:border-white/60'
                      : 'bg-white/95 border-zinc-200 text-slate-900 hover:border-slate-950'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl transition-all duration-300 ${
                      isNone || isBlack
                        ? 'bg-slate-900 border border-slate-700 text-white group-hover:bg-white group-hover:text-slate-950'
                        : 'bg-zinc-100 border border-zinc-200 text-slate-900 group-hover:bg-slate-950 group-hover:text-white'
                    }`}>
                      {React.cloneElement(badge.icon, {
                        className: 'w-5 h-5'
                      })}
                    </div>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-950 bg-white px-2.5 py-1 rounded-md font-['Montserrat']">
                      {badge.tag}
                    </span>
                  </div>

                  <h3 className={`text-base font-semibold font-['Montserrat'] transition-colors mb-1 ${
                    isNone || isBlack
                      ? 'text-white group-hover:text-slate-200'
                      : 'text-slate-950 group-hover:text-black'
                  }`}>
                    {badge.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded border ${
                      isNone || isBlack
                        ? 'bg-slate-900 text-slate-300 border-slate-700'
                        : 'bg-zinc-100 text-zinc-700 border-zinc-200'
                    }`}>
                      {badge.category}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>{badge.rating}</span>
                    </span>
                  </div>

                  <p className={`text-xs leading-relaxed font-normal ${
                    isNone || isBlack ? 'text-slate-300' : 'text-zinc-600'
                  }`}>
                    {badge.description}
                  </p>
                </div>

                <div className={`mt-4 pt-3 border-t flex items-center justify-between text-[10px] ${
                  isNone || isBlack ? 'border-slate-800 text-slate-400' : 'border-zinc-100 text-zinc-500'
                }`}>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className={`w-3 h-3 ${isNone || isBlack ? 'text-white' : 'text-slate-900'}`} />
                    <span>Verified Standard</span>
                  </span>
                  <span className={`font-mono font-medium group-hover:underline flex items-center gap-1 ${
                    isNone || isBlack ? 'text-white' : 'text-slate-950'
                  }`}>
                    <span>Inquire Team</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enterprise Partner Marquee Bar */}
          <div className={`border rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm ${
            isNone || isBlack
              ? 'bg-slate-950/60 border-white/10 text-white'
              : 'bg-white/90 border-zinc-200 text-slate-900'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className={`text-xs font-medium font-['Montserrat'] uppercase tracking-wider block ${
                  isNone || isBlack ? 'text-white' : 'text-slate-950'
                }`}>
                  Enterprise Engineering Stack
                </span>
                <span className={`text-[11px] ${isNone || isBlack ? 'text-slate-300' : 'text-zinc-600'}`}>
                  Deploying software built on modern industry platforms and cloud infrastructure.
                </span>
              </div>
            </div>

            <div className="overflow-hidden w-full md:w-auto max-w-xl relative">
              <motion.div
                animate={{ x: ['0%', '-50%'] }}
                transition={{ repeat: Infinity, ease: 'linear', duration: 18 }}
                className="flex items-center gap-2 flex-nowrap w-max"
              >
                {[...enterprisePartners, ...enterprisePartners].map((partner, pIdx) => (
                  <span
                    key={pIdx}
                    className={`px-3 py-1.5 rounded-lg border text-[11px] font-medium flex items-center gap-1.5 shadow-sm whitespace-nowrap flex-shrink-0 ${
                      isNone || isBlack
                        ? 'bg-slate-900/90 border-slate-700 text-slate-200'
                        : 'bg-zinc-100 border-zinc-200 text-zinc-800'
                    }`}
                  >
                    <span>{partner.symbol}</span>
                    <span className={`font-mono ${isNone || isBlack ? 'text-white' : 'text-slate-950'}`}>
                      {partner.name}
                    </span>
                  </span>
                ))}
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
