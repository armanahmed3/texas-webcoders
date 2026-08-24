import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronDown, MessageSquare, ShieldCheck, Quote, HelpCircle, CheckCircle2 } from 'lucide-react';

interface ReviewsFaqSectionProps {
  variant?: 'light-blue' | 'black' | 'white' | 'none' | 'transparent';
}

export const ReviewsFaqSection: React.FC<ReviewsFaqSectionProps> = ({ variant = 'none' }) => {
  const isBlack = variant === 'black';
  const isWhite = variant === 'white';
  const isNone = variant === 'none' || variant === 'transparent' || variant === 'light-blue';
  const isDarkBlue = isNone;
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const reviews = [
    {
      id: 1,
      name: 'Brandon A. Vela',
      role: 'UI Designer & Digital Product Lead',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      comment: 'Texas WebCoders delivered an exceptional, high-converting digital platform. The design fidelity, mobile smoothness, and clean code architecture exceeded every expectation.',
      project: 'Custom Web & Brand System'
    },
    {
      id: 2,
      name: 'David Thorne',
      role: 'Founder & CEO of CyberGuard',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      comment: 'The 3D canvas animations and mobile responsiveness are unmatched. Working directly with their Senior Architects made the entire development process seamless.',
      project: 'SaaS Mobile & Web App'
    },
    {
      id: 3,
      name: 'Michael Miller',
      role: 'Director of Marketing at LoneStar Health',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      comment: 'They delivered our custom medical portal ahead of schedule. Flawless execution, zero bugs, and 100% Core Web Vitals performance score!',
      project: 'Enterprise Portal'
    }
  ];

  const faqs = [
    {
      question: 'How fast can Texas WebCoders build and launch my website?',
      answer: 'Standard website packages are delivered in as little as 5 to 7 business days. Custom complex portals and mobile applications typically take 2 to 3 weeks depending on requirements.'
    },
    {
      question: 'Are your websites 100% custom or built with generic templates?',
      answer: 'Every website and mobile application we build is 100% custom-designed and custom-engineered using modern React, TypeScript, and Tailwind CSS. We never use restrictive pre-bought templates.'
    },
    {
      question: 'Do you provide mobile design optimization and responsive support?',
      answer: 'Yes! All of our builds are mobile-first optimized for all smartphone screens, tablets, laptops, and ultra-wide desktop displays with 60 FPS touch animations.'
    },
    {
      question: 'Is domain registration, free SSL, and high-speed hosting included?',
      answer: 'Absolutely. Every package comes standard with free SSL security certificates, global Cloudflare CDN integration, and zero-maintenance hosting options.'
    },
    {
      question: 'What happens after launch? Do you offer ongoing maintenance?',
      answer: 'We offer full post-launch support and monthly care plans that cover continuous backups, security monitoring, SEO updates, and feature additions.'
    }
  ];

  return (
    <section id="faq" className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative z-10 min-h-screen flex flex-col justify-center">
      {/* Curved Rounded Section Shell */}
      <div
        className={`max-w-7xl mx-auto w-full rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 lg:p-14 relative overflow-hidden transition-colors duration-300 ${
          isNone
            ? 'bg-transparent text-white border border-white/10 shadow-none'
            : isBlack
              ? 'bg-[#080c14] text-white border border-slate-800 shadow-2xl'
              : 'bg-white text-slate-900 border border-zinc-200 shadow-zinc-900/5'
        }`}
      >
        {/* Decorative Background Glow */}
        <div
          className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
            isNone || isBlack ? 'bg-cyan-500/10' : 'bg-cyan-400/15'
          }`}
        />
        <div
          className={`absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
            isNone || isBlack ? 'bg-blue-600/10' : 'bg-blue-300/20'
          }`}
        />

        <div className="relative z-10 space-y-16">
          {/* PART 1: Client Reviews & Testimonials */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className={`text-xs font-medium uppercase tracking-widest block mb-2 font-['Montserrat'] ${
                isNone || isBlack ? 'text-cyan-400' : 'text-cyan-600'
              }`}>
                Client Testimonials & Reviews
              </span>
              <h2 className={`text-2xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-tight font-['Montserrat',sans-serif] ${
                isNone || isBlack ? 'text-white' : 'text-slate-950'
              }`}>
                Trusted By Industry Leaders Across USA
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((rev) => (
                <motion.div
                  key={rev.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`p-6 rounded-2xl flex flex-col justify-between space-y-4 relative shadow-lg border transition-all ${
                    isDarkBlue || isBlack
                      ? 'bg-slate-950/80 border-slate-800 hover:border-cyan-400 text-white'
                      : 'bg-white border-cyan-200 hover:border-cyan-400 text-slate-900'
                  }`}
                >
                  <Quote className={`absolute top-6 right-6 w-8 h-8 pointer-events-none ${
                    isDarkBlue || isBlack ? 'text-cyan-400/20' : 'text-cyan-600/10'
                  }`} />
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className={`text-xs sm:text-sm leading-relaxed italic ${
                      isDarkBlue || isBlack ? 'text-slate-300' : 'text-zinc-700'
                    }`}>
                      &quot;{rev.comment}&quot;
                    </p>
                  </div>

                  <div className={`flex items-center gap-3 pt-4 border-t ${
                    isDarkBlue || isBlack ? 'border-slate-800' : 'border-zinc-200'
                  }`}>
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-cyan-500/40"
                    />
                    <div>
                      <h4 className={`font-semibold text-sm font-['Montserrat'] ${
                        isDarkBlue || isBlack ? 'text-white' : 'text-slate-950'
                      }`}>{rev.name}</h4>
                      <p className={`text-[11px] ${
                        isDarkBlue || isBlack ? 'text-slate-400' : 'text-zinc-500'
                      }`}>{rev.role}</p>
                      <span className={`inline-flex items-center gap-1 text-[10px] font-medium mt-0.5 ${
                        isDarkBlue || isBlack ? 'text-cyan-400' : 'text-cyan-600'
                      }`}>
                        <ShieldCheck className="w-3 h-3" />
                        <span>{rev.project}</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* PART 2: Interactive FAQ Accordion Portal */}
          <div className="max-w-4xl mx-auto pt-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider mb-3 border ${
                isDarkBlue || isBlack
                  ? 'bg-slate-900 border-slate-700 text-cyan-300'
                  : 'bg-white border-cyan-200 text-cyan-700 shadow-sm'
              }`}>
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <span>Got Questions? We Have Answers</span>
              </div>
              <h3 className={`text-2xl sm:text-4xl font-semibold font-['Montserrat',sans-serif] uppercase tracking-tight ${
                isDarkBlue || isBlack ? 'text-white' : 'text-slate-950'
              }`}>
                Frequently Asked Questions
              </h3>
            </motion.div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-xl overflow-hidden transition-all duration-200 border shadow-sm ${
                      isDarkBlue || isBlack
                        ? 'bg-slate-950/80 border-slate-800'
                        : 'bg-white border-cyan-200'
                    }`}
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className={`w-full px-6 py-4 text-left flex items-center justify-between font-medium text-sm sm:text-base font-['Montserrat'] transition-colors cursor-pointer ${
                        isDarkBlue || isBlack
                          ? 'text-white hover:text-cyan-300'
                          : 'text-slate-950 hover:text-cyan-700'
                      }`}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 flex-shrink-0 ${
                          isDarkBlue || isBlack ? 'text-cyan-400' : 'text-cyan-600'
                        } ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`px-6 pb-5 text-xs sm:text-sm leading-relaxed border-t pt-3 ${
                            isDarkBlue || isBlack
                              ? 'text-slate-300 border-slate-800/60'
                              : 'text-zinc-700 border-zinc-200'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                              isDarkBlue || isBlack ? 'text-cyan-400' : 'text-cyan-600'
                            }`} />
                            <span>{faq.answer}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
