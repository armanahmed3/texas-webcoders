import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Zap, Award, CheckCircle2, Phone, Calendar, Sparkles, MapPin, Star, ArrowRight, Clock, Lock } from 'lucide-react';

interface ProfessionalDashboardShowcaseProps {
  onOpenAppointmentModal?: () => void;
  onOpenQuoteCalculator?: () => void;
  onNavigateSlide?: (index: number) => void;
}

export const ProfessionalDashboardShowcase: React.FC<ProfessionalDashboardShowcaseProps> = ({
  onOpenAppointmentModal,
  onOpenQuoteCalculator,
  onNavigateSlide
}) => {
  return (
    <div className="w-full max-w-xl mx-auto lg:max-w-none bg-white rounded-2xl border border-zinc-200/90 p-6 shadow-2xl relative overflow-hidden group">
      {/* Top Header & Status Bar */}
      <div className="flex items-center justify-between border-b border-zinc-200/80 pb-4 mb-5">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-slate-950 text-cyan-400 flex items-center justify-center font-medium shadow-sm">
            <Award className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="text-xs font-medium uppercase text-slate-950 font-['Montserrat'] tracking-wider">
              Texas WebCoders
            </div>
            <div className="text-[11px] text-zinc-500 font-medium flex items-center gap-1">
              <MapPin className="w-3 h-3 text-cyan-600" />
              <span>Tyler & Austin, Texas • USA</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 font-medium shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Q3/Q4 Slots Open</span>
          </span>
        </div>
      </div>

      {/* Main Card Heading */}
      <div className="space-y-2 mb-5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-800 text-[10px] font-mono font-medium uppercase tracking-wider">
          <Sparkles className="w-3 h-3 text-cyan-600" />
          <span>Full-Stack Web & Mobile Engineering</span>
        </div>
        <h3 className="text-xl font-medium text-slate-950 uppercase font-['Montserrat'] tracking-tight">
          Executive Engineering Standards
        </h3>
        <p className="text-xs text-zinc-600 leading-relaxed font-normal">
          We build custom software, web applications, and mobile products engineered for maximum conversions, speed, and brand authority.
        </p>
      </div>

      {/* 4 Pillar Highlights Grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-zinc-50/90 border border-zinc-200/80 p-3.5 rounded-xl hover:border-slate-950 transition-colors">
          <div className="flex items-center gap-2 mb-1 text-slate-950 font-medium text-xs uppercase font-['Montserrat']">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Sub-0.5s Speed</span>
          </div>
          <p className="text-[11px] text-zinc-600 font-normal leading-snug">
            Google Lighthouse 98+ score guaranteed.
          </p>
        </div>

        <div className="bg-zinc-50/90 border border-zinc-200/80 p-3.5 rounded-xl hover:border-slate-950 transition-colors">
          <div className="flex items-center gap-2 mb-1 text-slate-950 font-medium text-xs uppercase font-['Montserrat']">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>100% Hand-Coded</span>
          </div>
          <p className="text-[11px] text-zinc-600 font-normal leading-snug">
            React 19, Node.js & clean architecture.
          </p>
        </div>

        <div className="bg-zinc-50/90 border border-zinc-200/80 p-3.5 rounded-xl hover:border-slate-950 transition-colors">
          <div className="flex items-center gap-2 mb-1 text-slate-950 font-medium text-xs uppercase font-['Montserrat']">
            <ShieldCheck className="w-4 h-4 text-cyan-600" />
            <span>Bank Security</span>
          </div>
          <p className="text-[11px] text-zinc-600 font-normal leading-snug">
            SSL, TLS 1.3 & DDoS mitigation active.
          </p>
        </div>

        <div className="bg-zinc-50/90 border border-zinc-200/80 p-3.5 rounded-xl hover:border-slate-950 transition-colors">
          <div className="flex items-center gap-2 mb-1 text-slate-950 font-medium text-xs uppercase font-['Montserrat']">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>5.0 Client Rating</span>
          </div>
          <p className="text-[11px] text-zinc-600 font-normal leading-snug">
            120+ successful USA enterprise launches.
          </p>
        </div>
      </div>

      {/* Lead Action Card Callout */}
      <div className="bg-slate-950 text-white p-4.5 rounded-xl shadow-lg mb-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-cyan-400 font-['Montserrat'] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Free 15-Min Strategy Consultation</span>
          </span>
          <span className="text-[10px] bg-white/10 text-zinc-300 px-2 py-0.5 rounded font-mono font-medium">
            No Obligation
          </span>
        </div>

        <p className="text-xs text-zinc-300 font-normal leading-relaxed">
          Speak directly with our Lead Systems Architect about your project scope, technical timeline, and budget estimate.
        </p>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={onOpenAppointmentModal}
            className="flex-1 bg-white hover:bg-zinc-200 text-slate-950 text-xs font-medium py-2.5 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 uppercase font-['Montserrat'] cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-cyan-600" />
            <span>Book Meeting</span>
          </button>

          <button
            onClick={onOpenQuoteCalculator}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-medium py-2.5 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 uppercase font-['Montserrat'] cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Estimate Price</span>
          </button>
        </div>
      </div>

      {/* Direct Contact Footer Link */}
      <div className="flex items-center justify-between text-xs text-zinc-600 font-medium pt-1">
        <div className="flex items-center gap-1.5">
          <Phone className="w-3.5 h-3.5 text-cyan-600" />
          <a href="tel:+19032226022" className="font-medium text-slate-950 hover:text-cyan-600 transition-colors font-mono">
            +1 9032226022
          </a>
        </div>
        <a
          href="mailto:info@texaswebcoders.com"
          className="text-xs font-medium text-slate-950 hover:text-cyan-600 transition-colors"
        >
          info@texaswebcoders.com
        </a>
      </div>
    </div>
  );
};


