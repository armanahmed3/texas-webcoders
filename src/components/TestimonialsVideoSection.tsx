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

  // Intersection observer for section visibility (auto-plays when scrolled into view, stops when scrolled away)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const v1 = video1Ref.current;
        const v2 = video2Ref.current;
        if (entry.isIntersecting) {
          if (v1 && !userPaused1Ref.current) {
            v1.muted = true;
            v1.play().then(() => setIsPlaying1(true)).catch(() => {});
          }
          if (v2 && !userPaused2Ref.current) {
            v2.muted = true;
            v2.play().then(() => setIsPlaying2(true)).catch(() => {});
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
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
              ? 'bg-white text-zinc-900 border border-zinc-200 shadow-zinc-900/5'
              : 'bg-zinc-950 text-white border border-zinc-800 shadow-2xl'
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
                  ? 'bg-zinc-100 border border-zinc-300 text-zinc-900'
                  : 'bg-zinc-900/90 border border-white/20 text-white'
              }`}
            >
              <Video className={`w-3.5 h-3.5 ${isWhite ? 'text-zinc-900' : 'text-white'}`} />
              <span>Verified Client Video Reviews • Texas WebCoders</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-2xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-tight font-['Montserrat',sans-serif] ${
                isWhite ? 'text-black' : 'text-white'
              }`}
            >
              What Our Verified Clients Say
            </motion.h2>

            <p
              className={`text-xs sm:text-sm max-w-2xl mx-auto font-normal leading-relaxed ${
                isWhite ? 'text-zinc-600' : 'text-zinc-300'
              }`}
            >
              Real clients sharing their authentic video reviews and personal experience partnering with Texas WebCoders.
            </p>
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
                    : 'bg-zinc-950/90 border-white/20 shadow-black/50'
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
                      muted
                      loop
                      preload="none"
                      onTimeUpdate={handleTimeUpdate1}
                      onPlay={() => setIsPlaying1(true)}
                      onPause={() => setIsPlaying1(false)}
                    >
                      <source src="/videos/1.mp4" type="video/mp4" />
                      <track kind="captions" srcLang="en" label="English" default />
                    </video>

                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none transition-opacity duration-300 ${
                        isPlaying1 ? 'opacity-30' : 'opacity-60'
                      }`}
                    />

                    {/* Center Play/Pause Button Overlay - Just pause/play button shown */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                      <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 border-2 border-white">
                        {isPlaying1 ? (
                          <Pause className="w-7 h-7 text-black fill-black" />
                        ) : (
                          <Play className="w-7 h-7 text-black fill-black ml-1" />
                        )}
                      </div>
                    </div>

                    {/* Bottom Scrubbable Progress Bar */}
                    <div
                      className="absolute bottom-3 inset-x-3 z-20"
                      onClick={(e) => e.stopPropagation()}
                    >
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
                          isWhite ? 'ring-2 ring-black/20' : 'ring-2 ring-white/60'
                        }`}
                      />
                      <div>
                        <h3
                          className={`text-lg sm:text-xl font-bold font-['Montserrat'] flex items-center gap-2 ${
                            isWhite ? 'text-black' : 'text-white'
                          }`}
                        >
                          <span>Emily Watson</span>
                          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500" />
                        </h3>
                        <p className={`text-xs font-semibold ${isWhite ? 'text-zinc-700' : 'text-zinc-200'}`}>
                          Freelance Journalist & Author
                        </p>
                        <p className={`text-[11px] ${isWhite ? 'text-zinc-500' : 'text-zinc-400'}`}>
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
                      <span className={`text-xs font-bold font-mono ml-0.5 ${isWhite ? 'text-black' : 'text-white'}`}>
                        5.0
                      </span>
                    </div>
                  </div>

                  {/* Spoken Testimonial Box */}
                  <div
                    className={`p-4 sm:p-5 rounded-2xl border space-y-2.5 relative overflow-hidden ${
                      isWhite
                        ? 'bg-white border-zinc-200 text-zinc-900 shadow-md'
                        : 'bg-zinc-900/95 border-zinc-800 text-white shadow-xl'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider font-['Montserrat']">
                      <span className={`flex items-center gap-2 ${isWhite ? 'text-black' : 'text-white'}`}>
                        <Quote className="w-4 h-4 text-zinc-800" />
                        <span className="font-bold">Spoken Client Testimonial</span>
                      </span>
                      <span className="text-emerald-500 font-mono text-[10px] font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        100% Authentic Audio
                      </span>
                    </div>

                    <blockquote
                      className={`text-xs sm:text-[13px] leading-relaxed italic font-normal pt-0.5 ${
                        isWhite ? 'text-zinc-800' : 'text-zinc-200'
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
                      <span className={`text-xs font-semibold leading-snug block ${isWhite ? 'text-black' : 'text-white'}`}>
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
                      <span className={`text-xs font-semibold leading-snug block ${isWhite ? 'text-black' : 'text-white'}`}>
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
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white text-black hover:bg-zinc-200 transition-all shadow-md cursor-pointer"
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
                    : 'bg-zinc-950/90 border-white/20 shadow-black/40'
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
                      muted
                      loop
                      preload="none"
                      onTimeUpdate={handleTimeUpdate2}
                      onPlay={() => setIsPlaying2(true)}
                      onPause={() => setIsPlaying2(false)}
                    >
                      <source src="/videos/4.mp4" type="video/mp4" />
                      <track kind="captions" srcLang="en" label="English" default />
                    </video>

                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none transition-opacity duration-300 ${
                        isPlaying2 ? 'opacity-30' : 'opacity-60'
                      }`}
                    />

                    {/* Center Play/Pause Button Overlay - Just pause/play button shown */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                      <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 border-2 border-white">
                        {isPlaying2 ? (
                          <Pause className="w-7 h-7 text-black fill-black" />
                        ) : (
                          <Play className="w-7 h-7 text-black fill-black ml-1" />
                        )}
                      </div>
                    </div>

                    {/* Bottom Scrubbable Progress Bar */}
                    <div
                      className="absolute bottom-4 inset-x-4 z-20"
                      onClick={(e) => e.stopPropagation()}
                    >
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
                      <span className={`text-xs font-semibold leading-snug block ${isWhite ? 'text-black' : 'text-white'}`}>
                        Custom Application Engineering
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
                      <span className={`text-xs font-semibold leading-snug block ${isWhite ? 'text-black' : 'text-white'}`}>
                        Proactive Problem Solving & Rapid Fixes
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
                        &ldquo;Excellent Support • Highly Recommend&rdquo;
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
                          isWhite ? 'ring-2 ring-black/20' : 'ring-2 ring-white/60'
                        }`}
                      />
                      <div>
                        <h3
                          className={`text-lg sm:text-xl font-bold font-['Montserrat'] flex items-center gap-2 ${
                            isWhite ? 'text-black' : 'text-white'
                          }`}
                        >
                          <span>David C. Vance</span>
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        </h3>
                        <p className={`text-xs font-semibold ${isWhite ? 'text-zinc-700' : 'text-zinc-200'}`}>
                          Founder & Chief Executive Officer
                        </p>
                        <p className={`text-[11px] ${isWhite ? 'text-zinc-500' : 'text-zinc-400'}`}>
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
                      <span className={`text-xs font-bold font-mono ml-0.5 ${isWhite ? 'text-black' : 'text-white'}`}>
                        5.0
                      </span>
                    </div>
                  </div>

                  {/* Spoken Testimonial Box */}
                  <div
                    className={`p-5 sm:p-6 rounded-2xl border space-y-3 relative overflow-hidden flex-1 flex flex-col justify-between ${
                      isWhite
                        ? 'bg-white border-zinc-200 text-zinc-900 shadow-md'
                        : 'bg-zinc-900/95 border-zinc-800 text-white shadow-xl'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider font-['Montserrat']">
                      <span className={`flex items-center gap-2 ${isWhite ? 'text-black' : 'text-white'}`}>
                        <Quote className="w-4 h-4 text-zinc-800" />
                        <span className="font-bold">Spoken Client Testimonial</span>
                      </span>
                      <span className="text-emerald-500 font-mono text-[10px] font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        100% Authentic Audio
                      </span>
                    </div>

                    <blockquote
                      className={`text-xs sm:text-[13px] leading-relaxed italic font-normal pt-1 ${
                        isWhite ? 'text-zinc-800' : 'text-zinc-200'
                      }`}
                    >
                      &ldquo;I built my application with Texas WebCoders. They&apos;re doing a fantastic job, helped me solve my problems, and their support has been excellent. I highly recommend them.&rdquo;
                    </blockquote>

                    <div
                      className={`pt-2.5 border-t text-xs flex items-center justify-between ${
                        isWhite ? 'border-zinc-100 text-zinc-500' : 'border-zinc-800 text-zinc-400'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 text-[11px]">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Custom Application & Dedicated Support Client</span>
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
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-zinc-200 transition-all shadow-lg hover:shadow-white/20 cursor-pointer"
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
