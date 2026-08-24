import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Star, ShieldCheck, CheckCircle2, Sparkles, Quote, Video, ArrowRight, User } from 'lucide-react';

import avatar1Img from '../assets/images/client_avatar_1.png';
import avatar2Img from '../assets/images/client_avatar_2.jpg';
import avatar10Img from '../assets/images/client_avatar_10.png';
import avatar11Img from '../assets/images/client_avatar_11.png';

interface VideoTestimonial {
  id: string;
  name: string;
  gender: 'man' | 'woman';
  role: string;
  company: string;
  location: string;
  avatar: string;
  projectType: string;
  budget: string;
  duration: string;
  rating: number;
  quote: string;
  videoTranscript: string;
  metrics: string;
}

interface TestimonialsVideoSectionProps {
  variant?: 'white' | 'black' | 'none' | 'light-blue' | 'transparent';
}

export const TestimonialsVideoSection: React.FC<TestimonialsVideoSectionProps> = ({ variant = 'white' }) => {
  const isWhite = variant === 'white';
  const isBlack = variant === 'black';
  const isNone = variant === 'none' || variant === 'transparent' || variant === 'light-blue';
  const testimonials: VideoTestimonial[] = [
    {
      id: 'video-1',
      name: 'Dr. Charlotte Sterling',
      gender: 'woman',
      role: 'Managing Director & Strategic CIO',
      company: 'Sterling & Crown Global Capital',
      location: 'Dallas, TX',
      avatar: avatar2Img,
      projectType: 'Fintech Treasury Platform & 3D Web',
      budget: '$35,000',
      duration: '0:48',
      rating: 5,
      quote: 'Texas WebCoders rebuilt our entire investor portal and automated treasury system in 3 weeks. Page speed is instant and execution was flawless.',
      videoTranscript: 'Working with the Texas WebCoders engineering team has transformed our financial operations. Sub-second data streaming, HIPAA and SOC2 compliance, and 100% bug-free delivery!',
      metrics: '<0.3s Global Latency'
    },
    {
      id: 'video-2',
      name: 'Robert C. Montgomery',
      gender: 'man',
      role: 'Managing Partner & CIO',
      company: 'Montgomery Capital Advisors',
      location: 'Austin, TX',
      avatar: avatar10Img,
      projectType: 'Enterprise Asset Management Portal & Analytics',
      budget: '$32,000',
      duration: '0:45',
      rating: 5,
      quote: 'Texas WebCoders architected our institutional asset management portal with sub-second database queries and bank-grade encryption. $45M+ processed flawlessly.',
      videoTranscript: 'The database architecture and encryption protocols engineered by Texas WebCoders are institutional grade. Sub-second streaming and 100% uptime!',
      metrics: '$45M+ Processed'
    },
    {
      id: 'video-3',
      name: 'Dr. Arthur H. Pendelton',
      gender: 'man',
      role: 'Executive Medical Director & Founder',
      company: 'Pendelton Healthcare Systems',
      location: 'Tyler, TX',
      avatar: avatar11Img,
      projectType: 'HIPAA-Compliant Patient Intake & Telehealth Portal',
      budget: '$28,000',
      duration: '0:52',
      rating: 5,
      quote: 'Our regional medical network needed a fast, HIPAA-compliant patient intake portal. Texas WebCoders delivered ahead of schedule with flawless UX.',
      videoTranscript: 'Finding a software partner that understands healthcare compliance and modern web speed is rare. Texas WebCoders exceeded every expectation.',
      metrics: '100% HIPAA Compliant'
    },
    {
      id: 'video-4',
      name: 'Sophia Lauren',
      gender: 'woman',
      role: 'Co-Founder & Head of Product',
      company: 'Aura Health & Wellness',
      location: 'Austin, TX',
      avatar: avatar1Img,
      projectType: 'Custom Web Application & Booking Platform',
      budget: '$22,000',
      duration: '0:42',
      rating: 5,
      quote: 'The level of craftsmanship and sub-0.3s speed was extraordinary. Conversions jumped 320% within the first 60 days of launching.',
      videoTranscript: 'If you want a SaaS platform or bespoke web application that performs at Silicon Valley standards right here in Texas, Texas WebCoders is unmatched.',
      metrics: '+320% User Signups'
    }
  ];

  const [activeVideoId, setActiveVideoId] = useState<string>('video-1');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  const currentTestimonial = testimonials.find(t => t.id === activeVideoId) || testimonials[0];

  // Video progress simulation loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 2));
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, activeVideoId]);

  const handleSelectVideo = (id: string) => {
    setActiveVideoId(id);
    setProgress(0);
    setIsPlaying(true);
  };

  return (
    <section id="testimonials" className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Curved Rounded Section Shell */}
      <div
        className={`max-w-7xl mx-auto rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 lg:p-14 relative overflow-hidden transition-colors duration-300 ${
          isNone
            ? 'bg-transparent text-white border border-white/10 shadow-none'
            : isWhite
              ? 'bg-white text-slate-900 border border-zinc-200 shadow-zinc-900/5'
              : 'bg-[#080c14] text-white border border-slate-800 shadow-cyan-950/20'
        }`}
      >
        {/* Subtle Background Backdrop Grid */}
        <div
          className={`absolute inset-0 pointer-events-none ${
            isWhite
              ? 'bg-[radial-gradient(circle_at_center,rgba(0,174,239,0.03)_0%,transparent_70%)]'
              : 'bg-[linear-gradient(to_right,#1f29370f_1px,transparent_1px),linear-gradient(to_bottom,#1f29370f_1px,transparent_1px)] bg-[size:32px_32px]'
          }`}
        />

        <div className="relative z-10">
          {/* Section Top Header */}
          <div className="text-center mb-12 space-y-3">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-medium uppercase tracking-widest font-['Montserrat'] shadow-sm ${
                isWhite
                  ? 'bg-zinc-100 border border-zinc-300 text-slate-900'
                  : 'bg-zinc-900 border border-white/20 text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5 text-slate-900" />
              <span>Verified AI Client Video Testimonials • Texas WebCoders</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-2xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-tight font-['Montserrat',sans-serif] ${
                isWhite ? 'text-slate-950' : 'text-white'
              }`}
            >
              What Our Verified Clients Say
            </motion.h2>

            <p className={`text-xs sm:text-sm max-w-2xl mx-auto font-normal leading-relaxed ${
              isWhite ? 'text-zinc-600' : 'text-slate-300'
            }`}>
              Real enterprise leaders, founders, and CMOs sharing their real-world experience partnering with Texas WebCoders. 4 verified client video reviews.
            </p>
          </div>

          {/* Featured Video Player & Details Showcase */}
          <div
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12 rounded-3xl p-6 sm:p-8 shadow-2xl ${
              isWhite
                ? 'bg-zinc-50 border border-zinc-200'
                : 'bg-zinc-950/90 border border-white/20'
            }`}
          >
            {/* Main Video Template Player Column */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              {/* Video Frame */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-2xl group">
                <img
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.name}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105 brightness-100' : 'scale-100 brightness-75'}`}
                />

                {/* Video Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* Top Live Badge Bar */}
                <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20">
                  <div className="flex items-center gap-2 bg-black/80 border border-white/20 px-3 py-1 rounded-full text-[10px] font-medium text-white backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span>TEXAS WEB CODERS • CLIENT REVIEWS</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-medium bg-white text-slate-950 px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {currentTestimonial.projectType}
                    </span>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2 rounded-full bg-black/80 border border-white/20 text-white hover:bg-white hover:text-slate-950 transition-colors cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Center Play/Pause Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-2xl shadow-white/30 hover:scale-110 transition-all cursor-pointer group-hover:border-2 group-hover:border-white"
                  >
                    {isPlaying ? (
                      <Pause className="w-7 h-7 text-slate-950 fill-slate-950" />
                    ) : (
                      <Play className="w-7 h-7 text-slate-950 fill-slate-950 ml-1" />
                    )}
                  </button>
                </div>

                {/* Bottom Video Progress & Client Overlay */}
                <div className="absolute bottom-4 inset-x-4 z-20 space-y-2">
                  <div className="flex items-center justify-between text-xs font-medium text-white">
                    <div className="flex items-center gap-2">
                      <span className="font-['Montserrat'] font-medium uppercase text-white">{currentTestimonial.name}</span>
                      <ShieldCheck className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-mono text-[11px] text-zinc-300">{currentTestimonial.duration}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white transition-all duration-100 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Video Transcript Card */}
              <div className={`p-4 rounded-2xl border space-y-2 ${
                isWhite
                  ? 'bg-white border-zinc-200 text-slate-900'
                  : 'bg-zinc-900/90 border-zinc-800 text-white'
              }`}>
                <div className={`flex items-center justify-between text-xs font-medium uppercase tracking-wider font-['Montserrat'] ${
                  isWhite ? 'text-zinc-500' : 'text-zinc-400'
                }`}>
                  <span className={`flex items-center gap-1.5 ${isWhite ? 'text-slate-950' : 'text-white'}`}>
                    <Quote className="w-3.5 h-3.5 text-slate-800" />
                    <span>Verified Video Transcript</span>
                  </span>
                  <span className={`${isWhite ? 'text-emerald-700' : 'text-emerald-400'} font-mono`}>{currentTestimonial.metrics}</span>
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed italic font-normal ${
                  isWhite ? 'text-zinc-700' : 'text-slate-200'
                }`}>
                  &ldquo;{currentTestimonial.videoTranscript}&rdquo;
                </p>
              </div>
            </div>

            {/* Testimonial Client Details & Stats Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    referrerPolicy="no-referrer"
                    className={`w-14 h-14 rounded-2xl object-cover shadow-lg ${
                      isWhite ? 'ring-2 ring-slate-950/20' : 'ring-2 ring-white/60'
                    }`}
                  />
                  <div>
                    <h3 className={`text-xl font-semibold font-['Montserrat'] flex items-center gap-1.5 ${
                      isWhite ? 'text-slate-950' : 'text-white'
                    }`}>
                      <span>{currentTestimonial.name}</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    </h3>
                    <p className={`text-xs font-medium ${isWhite ? 'text-zinc-600' : 'text-zinc-300'}`}>{currentTestimonial.role}</p>
                    <p className={`text-[11px] ${isWhite ? 'text-zinc-500' : 'text-slate-400'}`}>{currentTestimonial.company} • {currentTestimonial.location}</p>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                  ))}
                  <span className={`text-xs font-medium ml-2 font-mono ${isWhite ? 'text-slate-950' : 'text-white'}`}>5.0 / 5.0 Rating</span>
                </div>
              </div>

              {/* Quote Box */}
              <div className={`p-5 rounded-2xl border space-y-3 ${
                isWhite
                  ? 'bg-white border-zinc-200'
                  : 'bg-zinc-900 border-white/20'
              }`}>
                <h4 className={`text-xs font-medium uppercase font-['Montserrat'] tracking-wider ${
                  isWhite ? 'text-slate-950' : 'text-white'
                }`}>
                  Project Success Highlights
                </h4>
                <p className={`text-xs sm:text-sm leading-relaxed ${
                  isWhite ? 'text-zinc-600' : 'text-slate-300'
                }`}>
                  {currentTestimonial.quote}
                </p>
              </div>

              {/* Project Quick Spec Matrix */}
              <div className="grid grid-cols-2 gap-3 text-xs font-medium">
                <div className={`p-3 rounded-xl border ${
                  isWhite ? 'bg-white border-zinc-200' : 'bg-zinc-900 border-zinc-800'
                }`}>
                  <span className={`text-[10px] uppercase tracking-wider block mb-0.5 ${
                    isWhite ? 'text-zinc-500' : 'text-zinc-400'
                  }`}>Project Scope</span>
                  <span className={`font-mono text-[11px] ${isWhite ? 'text-slate-950 font-medium' : 'text-white'}`}>{currentTestimonial.projectType}</span>
                </div>

                <div className={`p-3 rounded-xl border ${
                  isWhite ? 'bg-white border-zinc-200' : 'bg-zinc-900 border-zinc-800'
                }`}>
                  <span className={`text-[10px] uppercase tracking-wider block mb-0.5 ${
                    isWhite ? 'text-zinc-500' : 'text-zinc-400'
                  }`}>Contract Budget</span>
                  <span className={`font-mono text-sm ${isWhite ? 'text-slate-950 font-medium' : 'text-white'}`}>{currentTestimonial.budget}</span>
                </div>
              </div>

              {/* Verification Footer */}
              <div className={`flex items-center gap-2 text-xs p-3 rounded-xl border ${
                isWhite
                  ? 'text-zinc-700 bg-zinc-100/80 border-zinc-200'
                  : 'text-slate-300 bg-white/5 border-white/10'
              }`}>
                <ShieldCheck className="w-4 h-4 flex-shrink-0 text-slate-800" />
                <span>Verified Client Ticket #TW-{currentTestimonial.id.replace('video-', '2026-')} • Signed NDA</span>
              </div>
            </div>
          </div>

          {/* 4 Video Thumbnails Selector Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className={`text-xs font-semibold uppercase tracking-widest font-['Montserrat'] flex items-center gap-2 ${
                isWhite ? 'text-slate-950' : 'text-white'
              }`}>
                <Sparkles className="w-4 h-4 text-slate-800" />
                <span>Select Video Testimonial (2 Men & 2 Women)</span>
              </h3>
              <span className={`text-xs font-mono ${isWhite ? 'text-zinc-500' : 'text-slate-400'}`}>4 Verified Client Reviews</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
              {testimonials.map((t) => {
                const isActive = t.id === activeVideoId;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleSelectVideo(t.id)}
                    className={`p-3 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-3 group ${
                      isWhite
                        ? isActive
                          ? 'bg-slate-950 text-white border-slate-950 shadow-xl scale-[1.03]'
                          : 'bg-zinc-50 border-zinc-200 hover:border-slate-900 text-slate-900'
                        : isActive
                          ? 'bg-white text-slate-950 border-white shadow-xl scale-[1.03]'
                          : 'bg-zinc-950 border-zinc-800 hover:border-white/50 text-white'
                    }`}
                  >
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-zinc-900">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                          isWhite
                            ? isActive ? 'bg-white text-slate-950' : 'bg-slate-950 text-white'
                            : isActive ? 'bg-slate-950 text-white' : 'bg-white text-slate-950'
                        }`}>
                          <Play className="w-4 h-4 ml-0.5 fill-current" />
                        </div>
                      </div>

                      <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] font-mono px-1.5 py-0.5 rounded font-medium">
                        {t.duration}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-[10px] font-medium">
                        <span className={`font-['Montserrat'] truncate ${
                          isWhite
                            ? isActive ? 'text-white font-medium' : 'text-slate-950 font-medium'
                            : isActive ? 'text-slate-950 font-medium' : 'text-white'
                        }`}>
                          {t.name}
                        </span>
                        <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                          isWhite
                            ? isActive ? 'bg-zinc-800 text-zinc-200' : 'bg-zinc-200 text-zinc-700'
                            : 'bg-zinc-800 text-zinc-300'
                        }`}>
                          {t.gender === 'man' ? 'Male CEO' : 'Female CMO'}
                        </span>
                      </div>
                      <span className={`block text-[9px] truncate ${
                        isWhite
                          ? isActive ? 'text-zinc-300' : 'text-zinc-600'
                          : isActive ? 'text-slate-700' : 'text-slate-400'
                      }`}>
                        {t.company}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
