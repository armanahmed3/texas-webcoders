import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Star, CheckCircle2, Sparkles, Quote, Video, ArrowRight } from 'lucide-react';

import avatarV1Img from '../assets/images/client_avatar_v1.png';
import video4ThumbImg from '../assets/images/video_4_thumbnail.jpg';
import avatarDavidV4Img from '../assets/images/avatar_david_v4.jpg';

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

  const [isPlaying1, setIsPlaying1] = useState<boolean>(false);
  const [isMuted1, setIsMuted1] = useState<boolean>(true);
  const [progress1, setProgress1] = useState<number>(0);

  const [isPlaying2, setIsPlaying2] = useState<boolean>(false);
  const [isMuted2, setIsMuted2] = useState<boolean>(true);
  const [progress2, setProgress2] = useState<number>(0);

  const video1Ref = useRef<HTMLVideoElement | null>(null);
  const video2Ref = useRef<HTMLVideoElement | null>(null);

  const formatTime = (t: number) => {
    if (isNaN(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const togglePlay1 = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const v = video1Ref.current;
    if (!v) return;
    if (v.paused) {
      if (video2Ref.current && !video2Ref.current.paused) { video2Ref.current.pause(); setIsPlaying2(false); }
      v.muted = true;
      v.play().then(() => setIsPlaying1(true)).catch(() => {});
    } else { v.pause(); setIsPlaying1(false); }
  };

  const toggleMute1 = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isMuted1;
    setIsMuted1(next);
    if (video1Ref.current) video1Ref.current.muted = next;
  };

  const handleTimeUpdate1 = () => {
    const v = video1Ref.current;
    if (v && v.duration) setProgress1((v.currentTime / v.duration) * 100);
  };

  const handleSeek1 = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const v = video1Ref.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) * v.duration;
  };

  const togglePlay2 = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const v = video2Ref.current;
    if (!v) return;
    if (v.paused) {
      if (video1Ref.current && !video1Ref.current.paused) { video1Ref.current.pause(); setIsPlaying1(false); }
      v.muted = true;
      v.play().then(() => setIsPlaying2(true)).catch(() => {});
    } else { v.pause(); setIsPlaying2(false); }
  };

  const toggleMute2 = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isMuted2;
    setIsMuted2(next);
    if (video2Ref.current) video2Ref.current.muted = next;
  };

  const handleTimeUpdate2 = () => {
    const v = video2Ref.current;
    if (v && v.duration) setProgress2((v.currentTime / v.duration) * 100);
  };

  const handleSeek2 = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const v = video2Ref.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) * v.duration;
  };

  useEffect(() => {
    const tryPlay = (v: HTMLVideoElement | null) => {
      if (!v) return;
      v.muted = true;
      v.defaultMuted = true;
      if (!v.paused) return;
      v.play().catch(() => {});
    };

    const tryPause = (v: HTMLVideoElement | null) => {
      if (v && !v.paused) v.pause();
    };

    const checkVisibility = () => {
      const section = document.getElementById('testimonials');
      if (!section) return false;
      const rect = section.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    const handleScroll = () => {
      const inView = checkVisibility();
      if (inView) {
        tryPlay(video1Ref.current);
        tryPlay(video2Ref.current);
      } else {
        tryPause(video1Ref.current);
        tryPause(video2Ref.current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    handleScroll();

    const retryInterval = setInterval(() => {
      handleScroll();
    }, 1000);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearInterval(retryInterval);
    };
  }, []);

  void toggleMute1; void toggleMute2; void formatTime;

  return (
    <section id="testimonials" className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div
        className={`max-w-7xl mx-auto rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 lg:p-14 relative overflow-hidden transition-colors duration-300 ${
          isNone ? 'bg-transparent text-white border border-white/10 shadow-none'
          : isWhite ? 'bg-white text-zinc-900 border border-zinc-200 shadow-zinc-900/5'
          : 'bg-zinc-950 text-white border border-zinc-800 shadow-2xl'
        }`}
      >
        <div className={`absolute inset-0 pointer-events-none ${isWhite ? 'bg-[radial-gradient(circle_at_center,rgba(0,174,239,0.03)_0%,transparent_70%)]' : 'bg-[linear-gradient(to_right,#1f29370f_1px,transparent_1px),linear-gradient(to_bottom,#1f29370f_1px,transparent_1px)] bg-[size:32px_32px]'}`} />

        <div className="relative z-10 space-y-10 sm:space-y-12">
          <div className="text-center space-y-3">
            <motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-widest font-['Montserrat'] shadow-sm ${isWhite ? 'bg-zinc-100 border border-zinc-300 text-zinc-900' : 'bg-zinc-900/90 border border-white/20 text-white'}`}>
              <Video className={`w-3.5 h-3.5 ${isWhite ? 'text-zinc-900' : 'text-white'}`} />
              <span>Verified Client Video Reviews • Texas WebCoders</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-2xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-tight font-['Montserrat',sans-serif] ${isWhite ? 'text-black' : 'text-white'}`}>
              What Our Verified Clients Say
            </motion.h2>
            <p className={`text-xs sm:text-sm max-w-2xl mx-auto font-normal leading-relaxed ${isWhite ? 'text-zinc-600' : 'text-zinc-300'}`}>
              Real clients sharing their authentic video reviews and personal experience partnering with Texas WebCoders.
            </p>
          </div>

          <div className="space-y-10 sm:space-y-12">

            {/* VIDEO 1: Emily Watson */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center rounded-3xl p-5 sm:p-6 lg:p-7 border shadow-xl transition-all duration-300 ${isWhite ? 'bg-zinc-50/90 border-zinc-200 shadow-zinc-200/50' : 'bg-zinc-950/90 border-white/20 shadow-black/50'}`}>
              <div className="lg:col-span-4 w-full max-w-[260px] sm:max-w-[280px] mx-auto">
                <div className="relative aspect-[9/15] rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-2xl group cursor-pointer" onClick={() => togglePlay1()}>
                  <video ref={video1Ref} src="/videos/1.mp4" poster={avatarV1Img}
                    className="w-full h-full object-cover" playsInline muted loop preload="auto"
                    onTimeUpdate={handleTimeUpdate1} onPlay={() => setIsPlaying1(true)} onPause={() => setIsPlaying1(false)}>
                  </video>
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none transition-opacity duration-300 ${isPlaying1 ? 'opacity-30' : 'opacity-60'}`} />
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 border-2 border-white">
                      {isPlaying1 ? <Pause className="w-7 h-7 text-black fill-black" /> : <Play className="w-7 h-7 text-black fill-black ml-1" />}
                    </div>
                  </div>
                  <div className="absolute bottom-3 inset-x-3 z-20" onClick={(e) => e.stopPropagation()}>
                    <div className="w-full h-1.5 bg-zinc-800/80 rounded-full overflow-hidden cursor-pointer hover:h-2 transition-all" onClick={handleSeek1}>
                      <div className="h-full bg-white transition-all duration-100 rounded-full" style={{ width: `${progress1}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={avatarV1Img} alt="Emily Watson" className={`w-13 h-13 sm:w-14 sm:h-14 rounded-xl object-cover shadow-md ${isWhite ? 'ring-2 ring-black/20' : 'ring-2 ring-white/60'}`} />
                    <div>
                      <h3 className={`text-lg sm:text-xl font-bold font-['Montserrat'] flex items-center gap-2 ${isWhite ? 'text-black' : 'text-white'}`}>
                        <span>Emily Watson</span><CheckCircle2 className="w-4.5 h-4.5 text-emerald-500" />
                      </h3>
                      <p className={`text-xs font-semibold ${isWhite ? 'text-zinc-700' : 'text-zinc-200'}`}>Freelance Journalist & Author</p>
                      <p className={`text-[11px] ${isWhite ? 'text-zinc-500' : 'text-zinc-400'}`}>Independent Author & Media • Dallas, TX</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    <div className="flex items-center gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />)}</div>
                    <span className={`text-xs font-bold font-mono ml-0.5 ${isWhite ? 'text-black' : 'text-white'}`}>5.0</span>
                  </div>
                </div>
                <div className={`p-4 sm:p-5 rounded-2xl border space-y-2.5 ${isWhite ? 'bg-white border-zinc-200 text-zinc-900 shadow-md' : 'bg-zinc-900/95 border-zinc-800 text-white shadow-xl'}`}>
                  <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider font-['Montserrat']">
                    <span className={`flex items-center gap-2 ${isWhite ? 'text-black' : 'text-white'}`}><Quote className="w-4 h-4 text-zinc-800" /><span className="font-bold">Spoken Client Testimonial</span></span>
                    <span className="text-emerald-500 font-mono text-[10px] font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">100% Authentic Audio</span>
                  </div>
                  <blockquote className={`text-xs sm:text-[13px] leading-relaxed italic pt-0.5 ${isWhite ? 'text-zinc-800' : 'text-zinc-200'}`}>
                    &ldquo;I&apos;m a freelance journalist and author, and I hired Texas WebCoders to redesign my website and also to maintain it, and the process was really great!&rdquo;
                  </blockquote>
                  <div className={`pt-2 border-t text-xs flex items-center justify-between ${isWhite ? 'border-zinc-100 text-zinc-500' : 'border-zinc-800 text-zinc-400'}`}>
                    <span className="flex items-center gap-1.5 text-[11px]"><Sparkles className="w-3.5 h-3.5 text-amber-500" /><span>Redesign & Ongoing Maintenance Client</span></span>
                    <span className="font-mono text-[10px] font-semibold text-emerald-500">Verified Review</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs font-medium">
                  {[['Project Scope','Website Redesign & Ongoing Maintenance',false],['Execution Speed','Rapid Delivery & 100% Bug-Free Launch',false],['Client Satisfaction','"Process Was Really Great!"',true]].map(([label,value,hl]) => (
                    <div key={label as string} className={`p-3 rounded-xl border ${isWhite ? 'bg-white border-zinc-200 shadow-sm' : 'bg-zinc-900 border-zinc-800'}`}>
                      <span className={`text-[10px] uppercase tracking-wider block mb-0.5 font-mono font-bold ${isWhite ? 'text-zinc-500' : 'text-zinc-400'}`}>{label}</span>
                      <span className={`text-xs font-semibold leading-snug block ${hl ? 'text-emerald-500' : isWhite ? 'text-black' : 'text-white'}`}>{value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  {onOpenQuoteCalculator && <button type="button" onClick={onOpenQuoteCalculator} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white text-black hover:bg-zinc-200 transition-all shadow-md cursor-pointer"><span>Get a Free Quote</span><ArrowRight className="w-3 h-3" /></button>}
                  {onOpenAppointmentModal && <button type="button" onClick={onOpenAppointmentModal} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-700 transition-all cursor-pointer"><span>Schedule Consultation</span></button>}
                </div>
              </div>
            </motion.div>

            {/* VIDEO 2: David C. Vance */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch rounded-3xl p-6 sm:p-8 lg:p-10 border shadow-2xl transition-all duration-300 ${isWhite ? 'bg-zinc-50/90 border-zinc-200 shadow-zinc-200/50' : 'bg-zinc-950/90 border-white/20 shadow-black/40'}`}>
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-2xl group cursor-pointer" onClick={() => togglePlay2()}>
                  <video ref={video2Ref} src="/videos/4.mp4" poster={video4ThumbImg}
                    className="w-full h-full object-cover" playsInline muted loop preload="auto"
                    onTimeUpdate={handleTimeUpdate2} onPlay={() => setIsPlaying2(true)} onPause={() => setIsPlaying2(false)}>
                  </video>
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none transition-opacity duration-300 ${isPlaying2 ? 'opacity-30' : 'opacity-60'}`} />
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 border-2 border-white">
                      {isPlaying2 ? <Pause className="w-7 h-7 text-black fill-black" /> : <Play className="w-7 h-7 text-black fill-black ml-1" />}
                    </div>
                  </div>
                  <div className="absolute bottom-4 inset-x-4 z-20" onClick={(e) => e.stopPropagation()}>
                    <div className="w-full h-1.5 bg-zinc-800/80 rounded-full overflow-hidden cursor-pointer hover:h-2 transition-all" onClick={handleSeek2}>
                      <div className="h-full bg-white transition-all duration-100 rounded-full" style={{ width: `${progress2}%` }} />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-medium">
                  {[['Project Scope','Custom Application Engineering',false],['Execution Speed','Proactive Problem Solving & Rapid Fixes',false],['Client Satisfaction','"Excellent Support • Highly Recommend"',true]].map(([label,value,hl]) => (
                    <div key={label as string} className={`p-3.5 rounded-xl border ${isWhite ? 'bg-white border-zinc-200 shadow-sm' : 'bg-zinc-900/90 border-zinc-800'}`}>
                      <span className={`text-[10px] uppercase tracking-wider block mb-1 font-mono font-bold ${isWhite ? 'text-zinc-500' : 'text-zinc-400'}`}>{label}</span>
                      <span className={`text-xs font-semibold leading-snug block ${hl ? 'text-emerald-500' : isWhite ? 'text-black' : 'text-white'}`}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between space-y-5 h-full">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <img src={avatarDavidV4Img} alt="David C. Vance" className={`w-14 h-14 rounded-2xl object-cover shadow-lg ${isWhite ? 'ring-2 ring-black/20' : 'ring-2 ring-white/60'}`} />
                    <div>
                      <h3 className={`text-lg sm:text-xl font-bold font-['Montserrat'] flex items-center gap-2 ${isWhite ? 'text-black' : 'text-white'}`}>
                        <span>David C. Vance</span><CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      </h3>
                      <p className={`text-xs font-semibold ${isWhite ? 'text-zinc-700' : 'text-zinc-200'}`}>Founder & Chief Executive Officer</p>
                      <p className={`text-[11px] ${isWhite ? 'text-zinc-500' : 'text-zinc-400'}`}>Vance Global Enterprise • Austin, TX</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    <div className="flex items-center gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />)}</div>
                    <span className={`text-xs font-bold font-mono ml-0.5 ${isWhite ? 'text-black' : 'text-white'}`}>5.0</span>
                  </div>
                </div>
                <div className={`p-5 sm:p-6 rounded-2xl border space-y-3 flex-1 flex flex-col justify-between ${isWhite ? 'bg-white border-zinc-200 text-zinc-900 shadow-md' : 'bg-zinc-900/95 border-zinc-800 text-white shadow-xl'}`}>
                  <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider font-['Montserrat']">
                    <span className={`flex items-center gap-2 ${isWhite ? 'text-black' : 'text-white'}`}><Quote className="w-4 h-4 text-zinc-800" /><span className="font-bold">Spoken Client Testimonial</span></span>
                    <span className="text-emerald-500 font-mono text-[10px] font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">100% Authentic Audio</span>
                  </div>
                  <blockquote className={`text-xs sm:text-[13px] leading-relaxed italic pt-1 ${isWhite ? 'text-zinc-800' : 'text-zinc-200'}`}>
                    &ldquo;I built my application with Texas WebCoders. They&apos;re doing a fantastic job, helped me solve my problems, and their support has been excellent. I highly recommend them.&rdquo;
                  </blockquote>
                  <div className={`pt-2.5 border-t text-xs flex items-center justify-between ${isWhite ? 'border-zinc-100 text-zinc-500' : 'border-zinc-800 text-zinc-400'}`}>
                    <span className="flex items-center gap-1.5 text-[11px]"><Sparkles className="w-3.5 h-3.5 text-amber-500" /><span>Custom Application & Dedicated Support Client</span></span>
                    <span className="font-mono text-[10px] font-semibold text-emerald-500">Verified Review</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  {onOpenQuoteCalculator && <button type="button" onClick={onOpenQuoteCalculator} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-zinc-200 transition-all shadow-lg cursor-pointer"><span>Get a Free Quote</span><ArrowRight className="w-3 h-3.5" /></button>}
                  {onOpenAppointmentModal && <button type="button" onClick={onOpenAppointmentModal} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-700 transition-all cursor-pointer"><span>Schedule a Consultation</span></button>}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};
