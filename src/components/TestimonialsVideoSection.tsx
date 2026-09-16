import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Star, CheckCircle2, Sparkles, Quote, Video, ArrowRight } from 'lucide-react';

import avatarV1Img from '../assets/images/client_avatar_v1.png';
import video4ThumbImg from '../assets/images/video_4_thumbnail.jpg';
import avatarDavidV4Img from '../assets/images/avatar_david_v4.jpg';

interface VideoTestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  avatar: string;
  videoUrl: string;
  fallbackUrl: string;
  rating: number;
  spokenTestimonial: string;
  badgeText: string;
  scopeLabel: string;
  speedLabel: string;
  satisfactionLabel: string;
}

interface TestimonialsVideoSectionProps {
  variant?: 'white' | 'black' | 'none' | 'light-blue' | 'transparent';
  onOpenQuoteCalculator?: () => void;
  onOpenAppointmentModal?: () => void;
}

export const TestimonialsVideoSection: React.FC<TestimonialsVideoSectionProps> = ({
  variant = 'white',
  onOpenQuoteCalculator,
  onOpenAppointmentModal
}) => {
  const isWhite = variant === 'white';
  const isNone = variant === 'none' || variant === 'transparent' || variant === 'light-blue';

  const sectionRef = useRef<HTMLElement | null>(null);

  // Active filter tab: 'all' | 'video-1' | 'video-4'
  const [activeTab, setActiveTab] = useState<'all' | 'video-1' | 'video-4'>('all');

  // Video 1 State (Emily Watson - 1.mp4)
  const video1Ref = useRef<HTMLVideoElement | null>(null);
  const userPaused1Ref = useRef<boolean>(false);
  const [isPlaying1, setIsPlaying1] = useState<boolean>(false);
  const [isMuted1, setIsMuted1] = useState<boolean>(true);
  const [progress1, setProgress1] = useState<number>(0);
  const [time1, setTime1] = useState<string>('0:00');
  const [dur1, setDur1] = useState<string>('0:09');

  // Video 2 State (David C. Vance - 4.mp4)
  const video2Ref = useRef<HTMLVideoElement | null>(null);
  const userPaused2Ref = useRef<boolean>(false);
  const [isPlaying2, setIsPlaying2] = useState<boolean>(false);
  const [isMuted2, setIsMuted2] = useState<boolean>(true);
  const [progress2, setProgress2] = useState<number>(0);
  const [time2, setTime2] = useState<string>('0:00');
  const [dur2, setDur2] = useState<string>('0:15');

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '0:00';
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Sync mute states to video elements
  useEffect(() => {
    if (video1Ref.current) video1Ref.current.muted = isMuted1;
  }, [isMuted1]);

  useEffect(() => {
    if (video2Ref.current) video2Ref.current.muted = isMuted2;
  }, [isMuted2]);

  // Initial autoplay attempt
  useEffect(() => {
    const v1 = video1Ref.current;
    if (v1) {
      v1.muted = true;
      v1.defaultMuted = true;
      v1.play().then(() => setIsPlaying1(true)).catch(() => setIsPlaying1(false));
    }
  }, []);

  // Intersection observer for section visibility
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const v1 = video1Ref.current;
        const v2 = video2Ref.current;
        if (entry.isIntersecting) {
          if (v1 && !userPaused1Ref.current && (activeTab === 'all' || activeTab === 'video-1')) {
            v1.muted = isMuted1;
            v1.play().then(() => setIsPlaying1(true)).catch(() => {});
          }
        } else {
          if (v1 && !v1.paused) {
            v1.pause();
            setIsPlaying1(false);
          }
          if (v2 && !v2.paused) {
            v2.pause();
            setIsPlaying2(false);
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isMuted1, isMuted2, activeTab]);

  // Controls for Video 1 (Emily Watson)
  const togglePlay1 = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const v = video1Ref.current;
    if (!v) return;
    if (v.paused) {
      userPaused1Ref.current = false;
      // Pause other video
      if (video2Ref.current && !video2Ref.current.paused) {
        video2Ref.current.pause();
        setIsPlaying2(false);
      }
      v.play().then(() => setIsPlaying1(true)).catch(() => {});
    } else {
      userPaused1Ref.current = true;
      v.pause();
      setIsPlaying1(false);
    }
  };

  const toggleMute1 = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = !isMuted1;
    setIsMuted1(nextMuted);
    if (video1Ref.current) video1Ref.current.muted = nextMuted;
  };

  const handleTimeUpdate1 = () => {
    const v = video1Ref.current;
    if (v && v.duration) {
      setProgress1((v.currentTime / v.duration) * 100);
      setTime1(formatTime(v.currentTime));
      setDur1(formatTime(v.duration));
    }
  };

  const handleSeek1 = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const v = video1Ref.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProg = Math.max(0, Math.min(1, clickX / rect.width));
    v.currentTime = newProg * v.duration;
    setProgress1(newProg * 100);
  };

  // Controls for Video 2 (David C. Vance)
  const togglePlay2 = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const v = video2Ref.current;
    if (!v) return;
    if (v.paused) {
      userPaused2Ref.current = false;
      // Pause other video
      if (video1Ref.current && !video1Ref.current.paused) {
        video1Ref.current.pause();
        setIsPlaying1(false);
      }
      v.play().then(() => setIsPlaying2(true)).catch(() => {});
    } else {
      userPaused2Ref.current = true;
      v.pause();
      setIsPlaying2(false);
    }
  };

  const toggleMute2 = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = !isMuted2;
    setIsMuted2(nextMuted);
    if (video2Ref.current) video2Ref.current.muted = nextMuted;
  };

  const handleTimeUpdate2 = () => {
    const v = video2Ref.current;
    if (v && v.duration) {
      setProgress2((v.currentTime / v.duration) * 100);
      setTime2(formatTime(v.currentTime));
      setDur2(formatTime(v.duration));
    }
  };

  const handleSeek2 = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const v = video2Ref.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProg = Math.max(0, Math.min(1, clickX / rect.width));
    v.currentTime = newProg * v.duration;
    setProgress2(newProg * 100);
  };

  const showVideo1 = activeTab === 'all' || activeTab === 'video-1';
  const showVideo2 = activeTab === 'all' || activeTab === 'video-4';

  return (
    <section id="testimonials" ref={sectionRef} className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Outer Shell */}
      <div
        className={`max-w-7xl mx-auto rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 lg:p-14 relative overflow-hidden transition-colors duration-300 ${
          isNone
            ? 'bg-transparent text-white border border-white/10 shadow-none'
            : isWhite
              ? 'bg-white text-slate-900 border border-zinc-200 shadow-zinc-900/5'
              : 'bg-[#080c14] text-white border border-slate-800 shadow-cyan-950/20'
        }`}
      >
        {/* Ambient Grid Backdrop */}
        <div
          className={`absolute inset-0 pointer-events-none ${
            isWhite
              ? 'bg-[radial-gradient(circle_at_center,rgba(0,174,239,0.03)_0%,transparent_70%)]'
              : 'bg-[linear-gradient(to_right,#1f29370f_1px,transparent_1px),linear-gradient(to_bottom,#1f29370f_1px,transparent_1px)] bg-[size:32px_32px]'
          }`}
        />

        <div className="relative z-10 space-y-10 sm:space-y-12">
          {/* Section Top Header */}
          <div className="text-center space-y-3">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-widest font-['Montserrat'] shadow-sm ${
                isWhite
                  ? 'bg-zinc-100 border border-zinc-300 text-slate-900'
                  : 'bg-zinc-900/90 border border-white/20 text-white'
              }`}
            >
              <Video className={`w-3.5 h-3.5 ${isWhite ? 'text-slate-900' : 'text-cyan-400'}`} />
              <span>Verified Client Video Reviews • Texas WebCoders</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-2xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-tight font-['Montserrat',sans-serif] ${
                isWhite ? 'text-slate-950' : 'text-white'
              }`}
            >
              What Our Verified Clients Say
            </motion.h2>

            <p
              className={`text-xs sm:text-sm max-w-2xl mx-auto font-normal leading-relaxed ${
                isWhite ? 'text-zinc-600' : 'text-slate-300'
              }`}
            >
              Real clients sharing their authentic video reviews and personal experience partnering with Texas WebCoders.
            </p>

            {/* Filter / Selector Tab Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? isWhite
                      ? 'bg-slate-950 text-white shadow-md'
                      : 'bg-white text-slate-950 shadow-md'
                    : isWhite
                      ? 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 border border-zinc-200'
                      : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                All Videos (2)
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('video-1')}
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'video-1'
                    ? isWhite
                      ? 'bg-slate-950 text-white shadow-md'
                      : 'bg-white text-slate-950 shadow-md'
                    : isWhite
                      ? 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 border border-zinc-200'
                      : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                <img src={avatarV1Img} alt="Emily Watson" className="w-4 h-4 rounded-full object-cover" />
                <span>Emily Watson</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('video-4')}
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'video-4'
                    ? isWhite
                      ? 'bg-slate-950 text-white shadow-md'
                      : 'bg-white text-slate-950 shadow-md'
                    : isWhite
                      ? 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 border border-zinc-200'
                      : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                <img src={avatarDavidV4Img} alt="David C. Vance" className="w-4 h-4 rounded-full object-cover" />
                <span>David C. Vance</span>
              </button>
            </div>
          </div>

          {/* Videos Container */}
          <div className="space-y-10 sm:space-y-12">
            {/* ==================== VIDEO 1: Emily Watson (1.mp4) ==================== */}
            {showVideo1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center rounded-3xl p-5 sm:p-6 lg:p-7 border shadow-xl transition-all duration-300 ${
                  isWhite
                    ? 'bg-zinc-50/90 border-zinc-200 shadow-zinc-200/50'
                    : 'bg-zinc-950/90 border-white/20 shadow-cyan-950/30'
                }`}
              >
                {/* Left Column: Vertical Video Player (1.mp4) */}
                <div className="lg:col-span-4 w-full max-w-[260px] sm:max-w-[280px] mx-auto">
                  <div
                    className="relative aspect-[9/15] rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-2xl group cursor-pointer"
                    onClick={() => togglePlay1()}
                  >
                    {/* Video Element */}
                    <video
                      ref={video1Ref}
                      src="/videos/1.mp4"
                      poster={avatarV1Img}
                      className="w-full h-full object-cover"
                      playsInline
                      autoPlay
                      muted={isMuted1}
                      loop
                      preload="auto"
                      onTimeUpdate={handleTimeUpdate1}
                      onPlay={() => setIsPlaying1(true)}
                      onPause={() => setIsPlaying1(false)}
                    >
                      <source src="/videos/1.mp4" type="video/mp4" />
                    </video>

                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none transition-opacity duration-300 ${
                        isPlaying1 ? 'opacity-40' : 'opacity-70'
                      }`}
                    />

                    {/* Top Control Bar: Live Badge & Audio Toggle */}
                    <div
                      className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-20"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-2 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-medium text-white border border-white/15 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>VERIFIED REVIEW</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="bg-black/75 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-full font-medium border border-white/15">
                          {time1} / {dur1}
                        </span>

                        <button
                          type="button"
                          onClick={toggleMute1}
                          className="p-1.5 rounded-full bg-black/80 backdrop-blur-md text-white hover:bg-white hover:text-slate-950 transition-colors border border-white/15 cursor-pointer shadow-lg"
                          title={isMuted1 ? 'Unmute Audio (Hear Emily)' : 'Mute Audio'}
                        >
                          {isMuted1 ? (
                            <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Sound Prompt Overlay (if muted) */}
                    {isMuted1 && isPlaying1 && (
                      <div className="absolute top-14 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                        <span className="bg-black/85 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5 shadow-lg">
                          <VolumeX className="w-3 h-3 text-amber-400" />
                          <span>Tap speaker icon to hear audio</span>
                        </span>
                      </div>
                    )}

                    {/* Center Play/Pause Button Overlay */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center z-20 transition-all duration-300 pointer-events-none ${
                        isPlaying1 ? 'opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100' : 'opacity-100 scale-100'
                      }`}
                    >
                      <div className="w-14 h-14 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110 border-2 border-white">
                        {isPlaying1 ? (
                          <Pause className="w-6 h-6 text-slate-950 fill-slate-950" />
                        ) : (
                          <Play className="w-6 h-6 text-slate-950 fill-slate-950 ml-1" />
                        )}
                      </div>
                    </div>

                    {/* Bottom Video Progress & Name Banner */}
                    <div
                      className="absolute bottom-3 inset-x-3 z-20 space-y-1.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-between text-xs text-white font-medium">
                        <div className="flex items-center gap-1.5">
                          <span className="font-['Montserrat'] font-semibold text-[11px]">Emily Watson</span>
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        </div>
                        <span className="text-[10px] font-mono text-zinc-300">
                          {isPlaying1 ? 'Click to pause' : 'Click to play'}
                        </span>
                      </div>

                      {/* Scrubbable Progress Bar */}
                      <div
                        className="w-full h-1.5 bg-zinc-800/80 rounded-full overflow-hidden cursor-pointer hover:h-2 transition-all"
                        onClick={handleSeek1}
                        title="Seek video position"
                      >
                        <div
                          className="h-full bg-white transition-all duration-100 rounded-full"
                          style={{ width: `${progress1}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Spoken Testimonial & Client Success Highlights */}
                <div className="lg:col-span-8 space-y-4">
                  {/* Client Profile Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={avatarV1Img}
                        alt="Emily Watson"
                        className={`w-13 h-13 sm:w-14 sm:h-14 rounded-xl object-cover shadow-md ${
                          isWhite ? 'ring-2 ring-slate-950/20' : 'ring-2 ring-white/60'
                        }`}
                      />
                      <div>
                        <h3
                          className={`text-lg sm:text-xl font-bold font-['Montserrat'] flex items-center gap-2 ${
                            isWhite ? 'text-slate-950' : 'text-white'
                          }`}
                        >
                          <span>Emily Watson</span>
                          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500" />
                        </h3>
                        <p className={`text-xs font-semibold ${isWhite ? 'text-zinc-700' : 'text-zinc-200'}`}>
                          Freelance Journalist & Author
                        </p>
                        <p className={`text-[11px] ${isWhite ? 'text-zinc-500' : 'text-slate-400'}`}>
                          Independent Author & Media • Dallas, TX
                        </p>
                      </div>
                    </div>

                    {/* 5.0 Star Rating */}
                    <div className="flex items-center gap-1.5 text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        ))}
                      </div>
                      <span className={`text-xs font-bold font-mono ml-0.5 ${isWhite ? 'text-slate-950' : 'text-white'}`}>
                        5.0
                      </span>
                    </div>
                  </div>

                  {/* Spoken Testimonial Box */}
                  <div
                    className={`p-4 sm:p-5 rounded-2xl border space-y-2.5 relative overflow-hidden ${
                      isWhite
                        ? 'bg-white border-zinc-200 text-slate-900 shadow-md'
                        : 'bg-zinc-900/95 border-zinc-800 text-white shadow-xl'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider font-['Montserrat']">
                      <span className={`flex items-center gap-2 ${isWhite ? 'text-slate-950' : 'text-white'}`}>
                        <Quote className="w-4 h-4 text-slate-800" />
                        <span className="font-bold">Spoken Client Testimonial</span>
                      </span>
                      <span className="text-emerald-500 font-mono text-[10px] font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        100% Authentic Audio
                      </span>
                    </div>

                    <blockquote
                      className={`text-xs sm:text-[13px] leading-relaxed italic font-normal pt-0.5 ${
                        isWhite ? 'text-zinc-800' : 'text-slate-200'
                      }`}
                    >
                      &ldquo;I&apos;m a freelance journalist and author, and I hired Texas WebCoders to redesign my website and also to maintain it, and the process was really great!&rdquo;
                    </blockquote>

                    <div
                      className={`pt-2 border-t text-xs flex items-center justify-between ${
                        isWhite ? 'border-zinc-100 text-zinc-500' : 'border-zinc-800 text-zinc-400'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 text-[11px]">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Redesign & Ongoing Maintenance Client</span>
                      </span>
                      <span className="font-mono text-[10px] font-semibold text-emerald-500">
                        Verified Review
                      </span>
                    </div>
                  </div>

                  {/* Project Quick Spec Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs font-medium">
                    <div
                      className={`p-3 rounded-xl border ${
                        isWhite ? 'bg-white border-zinc-200 shadow-sm' : 'bg-zinc-900 border-zinc-800'
                      }`}
                    >
                      <span
                        className={`text-[10px] uppercase tracking-wider block mb-0.5 font-mono font-bold ${
                          isWhite ? 'text-zinc-500' : 'text-zinc-400'
                        }`}
                      >
                        Project Scope
                      </span>
                      <span className={`text-xs font-semibold leading-snug block ${isWhite ? 'text-slate-950' : 'text-white'}`}>
                        Website Redesign & Ongoing Maintenance
                      </span>
                    </div>

                    <div
                      className={`p-3 rounded-xl border ${
                        isWhite ? 'bg-white border-zinc-200 shadow-sm' : 'bg-zinc-900 border-zinc-800'
                      }`}
                    >
                      <span
                        className={`text-[10px] uppercase tracking-wider block mb-0.5 font-mono font-bold ${
                          isWhite ? 'text-zinc-500' : 'text-zinc-400'
                        }`}
                      >
                        Execution Speed
                      </span>
                      <span className={`text-xs font-semibold leading-snug block ${isWhite ? 'text-slate-950' : 'text-white'}`}>
                        Rapid Delivery & 100% Bug-Free Launch
                      </span>
                    </div>

                    <div
                      className={`p-3 rounded-xl border ${
                        isWhite ? 'bg-white border-zinc-200 shadow-sm' : 'bg-zinc-900 border-zinc-800'
                      }`}
                    >
                      <span
                        className={`text-[10px] uppercase tracking-wider block mb-0.5 font-mono font-bold ${
                          isWhite ? 'text-zinc-500' : 'text-zinc-400'
                        }`}
                      >
                        Client Satisfaction
                      </span>
                      <span className="text-xs font-semibold leading-snug block text-emerald-500">
                        &ldquo;Process Was Really Great!&rdquo;
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    {onOpenQuoteCalculator && (
                      <button
                        type="button"
                        onClick={onOpenQuoteCalculator}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white text-slate-950 hover:bg-zinc-200 transition-all shadow-md cursor-pointer"
                      >
                        <span>Get a Free Quote</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}

                    {onOpenAppointmentModal && (
                      <button
                        type="button"
                        onClick={onOpenAppointmentModal}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-700 transition-all cursor-pointer"
                      >
                        <span>Schedule Consultation</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ==================== VIDEO 2: David C. Vance (4.mp4 - Original Horizontal Size) ==================== */}
            {showVideo2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch rounded-3xl p-6 sm:p-8 lg:p-10 border shadow-2xl transition-all duration-300 ${
                  isWhite
                    ? 'bg-zinc-50/90 border-zinc-200 shadow-zinc-200/50'
                    : 'bg-zinc-950/90 border-white/20 shadow-cyan-950/30'
                }`}
              >
                {/* Left Column: Horizontal Widescreen Video Player (4.mp4) + Spec Highlights underneath */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                  <div
                    className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-2xl group cursor-pointer"
                    onClick={() => togglePlay2()}
                  >
                    {/* Video Element */}
                    <video
                      ref={video2Ref}
                      src="/videos/4.mp4"
                      poster={video4ThumbImg}
                      className="w-full h-full object-cover"
                      playsInline
                      muted={isMuted2}
                      loop
                      preload="metadata"
                      onTimeUpdate={handleTimeUpdate2}
                      onPlay={() => setIsPlaying2(true)}
                      onPause={() => setIsPlaying2(false)}
                    >
                      <source src="/videos/4.mp4" type="video/mp4" />
                    </video>

                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none transition-opacity duration-300 ${
                        isPlaying2 ? 'opacity-40' : 'opacity-70'
                      }`}
                    />

                    {/* Top Control Bar: Live Badge & Audio Toggle */}
                    <div
                      className="absolute top-4 inset-x-4 flex items-center justify-between z-20"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-2 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-medium text-white border border-white/15 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>VERIFIED REVIEW</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="bg-black/75 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-full font-medium border border-white/15">
                          {time2} / {dur2}
                        </span>

                        <button
                          type="button"
                          onClick={toggleMute2}
                          className="p-2 rounded-full bg-black/80 backdrop-blur-md text-white hover:bg-white hover:text-slate-950 transition-colors border border-white/15 cursor-pointer shadow-lg"
                          title={isMuted2 ? 'Unmute Audio (Hear David)' : 'Mute Audio'}
                        >
                          {isMuted2 ? (
                            <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Sound Prompt Overlay (if muted) */}
                    {isMuted2 && isPlaying2 && (
                      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                        <span className="bg-black/85 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5 shadow-lg">
                          <VolumeX className="w-3 h-3 text-amber-400" />
                          <span>Tap speaker icon to hear audio</span>
                        </span>
                      </div>
                    )}

                    {/* Center Play/Pause Button Overlay */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center z-20 transition-all duration-300 pointer-events-none ${
                        isPlaying2 ? 'opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100' : 'opacity-100 scale-100'
                      }`}
                    >
                      <div className="w-16 h-16 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110 border-2 border-white">
                        {isPlaying2 ? (
                          <Pause className="w-7 h-7 text-slate-950 fill-slate-950" />
                        ) : (
                          <Play className="w-7 h-7 text-slate-950 fill-slate-950 ml-1" />
                        )}
                      </div>
                    </div>

                    {/* Bottom Video Progress & Name Banner */}
                    <div
                      className="absolute bottom-4 inset-x-4 z-20 space-y-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-between text-xs text-white font-medium">
                        <div className="flex items-center gap-1.5">
                          <span className="font-['Montserrat'] font-semibold">David C. Vance</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        <span className="text-[10px] font-mono text-zinc-300">
                          {isPlaying2 ? 'Click to pause' : 'Click to play'}
                        </span>
                      </div>

                      {/* Scrubbable Progress Bar */}
                      <div
                        className="w-full h-1.5 bg-zinc-800/80 rounded-full overflow-hidden cursor-pointer hover:h-2 transition-all"
                        onClick={handleSeek2}
                        title="Seek video position"
                      >
                        <div
                          className="h-full bg-white transition-all duration-100 rounded-full"
                          style={{ width: `${progress2}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Project Quick Spec Highlights underneath video */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-medium">
                    <div
                      className={`p-3.5 rounded-xl border ${
                        isWhite ? 'bg-white border-zinc-200 shadow-sm' : 'bg-zinc-900/90 border-zinc-800'
                      }`}
                    >
                      <span
                        className={`text-[10px] uppercase tracking-wider block mb-1 font-mono font-bold ${
                          isWhite ? 'text-zinc-500' : 'text-zinc-400'
                        }`}
                      >
                        Project Scope
                      </span>
                      <span className={`text-xs font-semibold leading-snug block ${isWhite ? 'text-slate-950' : 'text-white'}`}>
                        Enterprise Cloud & Custom Platform
                      </span>
                    </div>

                    <div
                      className={`p-3.5 rounded-xl border ${
                        isWhite ? 'bg-white border-zinc-200 shadow-sm' : 'bg-zinc-900/90 border-zinc-800'
                      }`}
                    >
                      <span
                        className={`text-[10px] uppercase tracking-wider block mb-1 font-mono font-bold ${
                          isWhite ? 'text-zinc-500' : 'text-zinc-400'
                        }`}
                      >
                        Execution Speed
                      </span>
                      <span className={`text-xs font-semibold leading-snug block ${isWhite ? 'text-slate-950' : 'text-white'}`}>
                        Sub-Second Streaming & Zero Downtime
                      </span>
                    </div>

                    <div
                      className={`p-3.5 rounded-xl border ${
                        isWhite ? 'bg-white border-zinc-200 shadow-sm' : 'bg-zinc-900/90 border-zinc-800'
                      }`}
                    >
                      <span
                        className={`text-[10px] uppercase tracking-wider block mb-1 font-mono font-bold ${
                          isWhite ? 'text-zinc-500' : 'text-zinc-400'
                        }`}
                      >
                        Client Satisfaction
                      </span>
                      <span className="text-xs font-semibold leading-snug block text-emerald-500">
                        +320% Signups • Highly Recommended
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Spoken Testimonial & Client Profile */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-5 h-full">
                  {/* Client Profile Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={avatarDavidV4Img}
                        alt="David C. Vance"
                        className={`w-14 h-14 rounded-2xl object-cover shadow-lg ${
                          isWhite ? 'ring-2 ring-slate-950/20' : 'ring-2 ring-white/60'
                        }`}
                      />
                      <div>
                        <h3
                          className={`text-lg sm:text-xl font-bold font-['Montserrat'] flex items-center gap-2 ${
                            isWhite ? 'text-slate-950' : 'text-white'
                          }`}
                        >
                          <span>David C. Vance</span>
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        </h3>
                        <p className={`text-xs font-semibold ${isWhite ? 'text-zinc-700' : 'text-zinc-200'}`}>
                          Founder & Chief Executive Officer
                        </p>
                        <p className={`text-[11px] ${isWhite ? 'text-zinc-500' : 'text-slate-400'}`}>
                          Vance Global Enterprise • Austin, TX
                        </p>
                      </div>
                    </div>

                    {/* 5.0 Star Rating */}
                    <div className="flex items-center gap-1.5 text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        ))}
                      </div>
                      <span className={`text-xs font-bold font-mono ml-0.5 ${isWhite ? 'text-slate-950' : 'text-white'}`}>
                        5.0
                      </span>
                    </div>
                  </div>

                  {/* Spoken Testimonial Box */}
                  <div
                    className={`p-5 sm:p-6 rounded-2xl border space-y-3 relative overflow-hidden flex-1 flex flex-col justify-between ${
                      isWhite
                        ? 'bg-white border-zinc-200 text-slate-900 shadow-md'
                        : 'bg-zinc-900/95 border-zinc-800 text-white shadow-xl'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider font-['Montserrat']">
                      <span className={`flex items-center gap-2 ${isWhite ? 'text-slate-950' : 'text-white'}`}>
                        <Quote className="w-4 h-4 text-slate-800" />
                        <span className="font-bold">Spoken Client Testimonial</span>
                      </span>
                      <span className="text-emerald-500 font-mono text-[10px] font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        100% Authentic Audio
                      </span>
                    </div>

                    <blockquote
                      className={`text-xs sm:text-[13px] leading-relaxed italic font-normal pt-1 ${
                        isWhite ? 'text-zinc-800' : 'text-slate-200'
                      }`}
                    >
                      &ldquo;Texas WebCoders architected our mission-critical enterprise portal with sub-second data streaming and bank-grade security. Conversions jumped 320% within the first 60 days. If you want an enterprise platform or bespoke web application that performs at Silicon Valley standards right here in Texas, Texas WebCoders is completely unmatched.&rdquo;
                    </blockquote>

                    <div
                      className={`pt-2.5 border-t text-xs flex items-center justify-between ${
                        isWhite ? 'border-zinc-100 text-zinc-500' : 'border-zinc-800 text-zinc-400'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 text-[11px]">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Enterprise Cloud Architecture Client</span>
                      </span>
                      <span className="font-mono text-[10px] font-semibold text-emerald-500">
                        Verified Review
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    {onOpenQuoteCalculator && (
                      <button
                        type="button"
                        onClick={onOpenQuoteCalculator}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-slate-950 hover:bg-zinc-200 transition-all shadow-lg hover:shadow-white/20 cursor-pointer"
                      >
                        <span>Get a Free Quote</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {onOpenAppointmentModal && (
                      <button
                        type="button"
                        onClick={onOpenAppointmentModal}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-700 transition-all cursor-pointer"
                      >
                        <span>Schedule a Consultation</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
