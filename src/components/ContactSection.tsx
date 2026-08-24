import React, { useState, useEffect } from 'react';
import { PricingPackage, ServiceItem } from '../types';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Send, Sparkles, Phone, Mail, Clock, ShieldCheck, MapPin, Award, Lock, MessageSquare, ArrowRight, Calendar, Check, Copy } from 'lucide-react';

interface ContactSectionProps {
  selectedPackage?: PricingPackage | null;
  selectedService?: ServiceItem | null;
  onOpenAppointmentModal?: () => void;
  variant?: 'white' | 'black' | 'light-blue' | 'none' | 'transparent';
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  selectedPackage,
  selectedService,
  onOpenAppointmentModal,
  variant = 'white'
}) => {
  const isWhite = variant === 'white';
  const isBlack = variant === 'black';
  const isNone = variant === 'none' || variant === 'transparent' || variant === 'light-blue';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: 'Website Design & Dev',
    packageSelect: 'Business Package ($949)',
    budget: '$1,000 - $2,500',
    details: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [projectId, setProjectId] = useState('');
  const [copiedId, setCopiedId] = useState(false);

  const handleCopyTicket = () => {
    if (projectId) {
      navigator.clipboard.writeText(projectId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2500);
    }
  };

  useEffect(() => {
    if (selectedPackage) {
      setFormData(prev => ({
        ...prev,
        packageSelect: `${selectedPackage.name} Package ($${selectedPackage.price})`,
        details: prev.details || `Interested in ${selectedPackage.name} Package ($${selectedPackage.price}).`
      }));
    }
  }, [selectedPackage]);

  useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({
        ...prev,
        serviceType: selectedService.title,
        details: prev.details || `Inquiry regarding ${selectedService.title}.`
      }));
    }
  }, [selectedService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = 'TWC-' + Math.floor(100000 + Math.random() * 900000);
    setProjectId(generatedId);
    setSubmitted(true);

    // Send email dispatch to backend API
    try {
      fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: generatedId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.serviceType || formData.packageSelect,
          budget: formData.budget,
          message: formData.details
        })
      }).catch(err => console.error('Inquiry email notification error:', err));
    } catch (err) {
      console.error('Contact submit error:', err);
    }

    // Fire confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0284c7', '#2563eb', '#0f172a', '#1e293b']
      });
    } catch {
      // fallback
    }
  };

  return (
    <section id="contact" className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative z-10 min-h-screen flex flex-col justify-center">
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
        {/* Decorative Background Accents */}
        <div
          className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
            isNone || isBlack ? 'bg-white/5' : 'bg-slate-200/30'
          }`}
        />
        <div
          className={`absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
            isNone || isBlack ? 'bg-slate-800/20' : 'bg-slate-200/30'
          }`}
        />

        <div className="relative z-10">
          {/* Page Top Header Signature */}
          <div className="text-center mb-10">
            <span className={`text-xs font-medium uppercase tracking-widest block mb-2 font-['Montserrat'] flex items-center justify-center gap-1.5 ${
              isNone || isBlack ? 'text-slate-300' : 'text-slate-700'
            }`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Engineering Inquiry • TexasWebCoders</span>
            </span>
            <h2 className={`text-2xl sm:text-4xl md:text-5xl font-semibold mb-3 uppercase tracking-tight font-['Montserrat',sans-serif] ${
              isNone || isBlack ? 'text-white' : 'text-slate-950'
            }`}>
              Get Started Today
            </h2>
            <p className={`text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed ${
              isNone || isBlack ? 'text-slate-300' : 'text-zinc-600'
            }`}>
              Ready to bring your project to life? Fill out the form below to receive a custom proposal and architectural plan from our senior Texas engineering team.
            </p>
          </div>

          <div className={`rounded-3xl overflow-hidden shadow-xl flex flex-col lg:flex-row border ${
            isNone || isBlack ? 'bg-slate-950/80 border-slate-800' : 'bg-zinc-50 border-zinc-200'
          }`}>
            
            {/* Left Form Area */}
            <div className={`lg:w-7/12 p-6 sm:p-10 flex flex-col justify-center ${
              isNone || isBlack ? 'bg-slate-950/90' : 'bg-white'
            }`}>
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-[11px] font-medium uppercase tracking-wider mb-1.5 ${
                          isBlack ? 'text-slate-300' : 'text-zinc-700'
                        }`}>
                          Your Name *
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="e.g. John Smith"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors border ${
                            isBlack
                              ? 'bg-slate-900 border-slate-700 text-white focus:border-white'
                              : 'bg-zinc-50 border-zinc-300 text-slate-950 focus:border-slate-950'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-[11px] font-medium uppercase tracking-wider mb-1.5 ${
                          isBlack ? 'text-slate-300' : 'text-zinc-700'
                        }`}>
                          Your Email *
                        </label>
                        <input
                          required
                          type="email"
                          placeholder="e.g. john@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors border ${
                            isBlack
                              ? 'bg-slate-900 border-slate-700 text-white focus:border-white'
                              : 'bg-zinc-50 border-zinc-300 text-slate-950 focus:border-slate-950'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-[11px] font-medium uppercase tracking-wider mb-1.5 ${
                          isBlack ? 'text-slate-300' : 'text-zinc-700'
                        }`}>
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+1 9032226022"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors border ${
                            isBlack
                              ? 'bg-slate-900 border-slate-700 text-white focus:border-white'
                              : 'bg-zinc-50 border-zinc-300 text-slate-950 focus:border-slate-950'
                          }`}
                        />
                      </div>

                      <div>
                        <label className={`block text-[11px] font-medium uppercase tracking-wider mb-1.5 ${
                          isBlack ? 'text-slate-300' : 'text-zinc-700'
                        }`}>
                          Est. Project Budget
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors border ${
                            isBlack
                              ? 'bg-slate-900 border-slate-700 text-white focus:border-white'
                              : 'bg-zinc-50 border-zinc-300 text-slate-950 focus:border-slate-950'
                          }`}
                        >
                          <option value="$500 - $1,000">$500 - $1,000</option>
                          <option value="$1,000 - $2,500">$1,000 - $2,500</option>
                          <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                          <option value="$5,000+">$5,000+ Enterprise</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={`block text-[11px] font-medium uppercase tracking-wider mb-1.5 ${
                        isBlack ? 'text-slate-300' : 'text-zinc-700'
                      }`}>
                        Selected Package / Service Scope
                      </label>
                      <input
                        type="text"
                        value={formData.packageSelect}
                        onChange={(e) => setFormData({ ...formData, packageSelect: e.target.value })}
                        className={`w-full font-medium rounded-xl px-4 py-2.5 text-xs focus:outline-none border ${
                          isBlack
                            ? 'bg-slate-900 border-slate-700 text-white'
                            : 'bg-zinc-100 border-zinc-300 text-slate-950'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-[11px] font-medium uppercase tracking-wider mb-1.5 ${
                        isBlack ? 'text-slate-300' : 'text-zinc-700'
                      }`}>
                        Project Details & Goals
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Describe your website requirements, desired features, or launch timeline..."
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors border ${
                          isBlack
                            ? 'bg-slate-900 border-slate-700 text-white focus:border-white'
                            : 'bg-zinc-50 border-zinc-300 text-slate-950 focus:border-slate-950'
                        }`}
                      />
                    </div>

                    <button
                      type="submit"
                      className={`w-full font-semibold py-4 rounded-xl transition-all duration-300 uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
                        isBlack
                          ? 'bg-white hover:bg-zinc-200 text-slate-950'
                          : 'bg-slate-950 hover:bg-zinc-800 text-white'
                      }`}
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry & Get Free Estimate</span>
                    </button>

                    {/* SMS Consent Notice */}
                    <p className={`text-[10px] leading-relaxed pt-2 ${
                      isBlack ? 'text-slate-400' : 'text-zinc-500'
                    }`}>
                      By providing a telephone number and submitting this form you are consenting to be contacted by SMS text message. Message & data rates may apply. You can reply STOP to opt-out of further messaging.
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="contact-success"
                    initial={{ opacity: 0, scale: 0.94, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: 16 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className={`p-6 sm:p-8 rounded-2xl text-center space-y-5 border relative overflow-hidden ${
                      isBlack ? 'bg-slate-900 border-slate-800' : 'bg-zinc-50 border-zinc-200'
                    }`}
                  >
                    {/* Animated Checkmark Badge */}
                    <motion.div
                      initial={{ scale: 0, rotate: -25 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.15 }}
                      className="relative w-16 h-16 mx-auto"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.7, 0.35] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                        className="absolute inset-0 rounded-full bg-emerald-500/20 blur-sm"
                      />
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-xl relative z-10 border ${
                        isBlack
                          ? 'bg-gradient-to-br from-emerald-400 to-teal-600 text-slate-950 border-emerald-300/40'
                          : 'bg-gradient-to-br from-slate-950 to-slate-800 text-white border-slate-700'
                      }`}>
                        <CheckCircle2 className="w-9 h-9" />
                      </div>
                    </motion.div>

                    {/* Headline and Confirmation Message */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="space-y-1.5"
                    >
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                        <Sparkles className="w-3 h-3" />
                        Message Received & Confirmed
                      </span>
                      <h3 className={`text-xl sm:text-2xl font-semibold font-['Montserrat'] uppercase tracking-tight ${
                        isBlack ? 'text-white' : 'text-slate-950'
                      }`}>
                        Inquiry Successfully Transmitted
                      </h3>
                      <p className={`text-xs leading-relaxed max-w-md mx-auto ${
                        isBlack ? 'text-slate-300' : 'text-zinc-600'
                      }`}>
                        Thank you, <span className="font-semibold text-emerald-400">{formData.name}</span>! Our lead engineering team in Tyler, Texas has logged your inquiry.
                      </p>
                    </motion.div>

                    {/* Digital Receipt Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className={`p-4 rounded-xl text-left text-xs space-y-2.5 border shadow-sm ${
                        isBlack ? 'bg-slate-950/90 border-slate-800 text-slate-300' : 'bg-white border-zinc-200 text-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                        <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">Reference Ticket ID</span>
                        <button
                          onClick={handleCopyTicket}
                          type="button"
                          className="flex items-center gap-1.5 font-mono font-bold text-xs bg-slate-800 hover:bg-slate-700 text-emerald-400 px-2 py-0.5 rounded border border-slate-700 transition-colors cursor-pointer"
                        >
                          {copiedId ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                          <span>{projectId}</span>
                          <span className="text-[9px] text-slate-400 uppercase font-sans">({copiedId ? 'Copied!' : 'Copy'})</span>
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase">Client Contact</span>
                          <span className="font-medium truncate block">{formData.email}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase">Estimated Scope</span>
                          <span className="font-medium truncate block">{formData.packageSelect}</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-emerald-400" />
                          Senior Engineer SLA:
                        </span>
                        <span className="text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded text-[11px]">
                          &lt; 2 Hours Guaranteed
                        </span>
                      </div>
                    </motion.div>

                    {/* Action Next Steps */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                      className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
                    >
                      {onOpenAppointmentModal && (
                        <button
                          onClick={onOpenAppointmentModal}
                          type="button"
                          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-slate-950 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer font-['Montserrat']"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Book Discovery Call</span>
                        </button>
                      )}
                      <button
                        onClick={() => setSubmitted(false)}
                        type="button"
                        className={`text-xs font-medium underline transition-colors cursor-pointer py-1 ${
                          isBlack ? 'text-slate-400 hover:text-white' : 'text-zinc-600 hover:text-slate-950'
                        }`}
                      >
                        Submit Another Inquiry
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Direct Contact & SLA Guarantee Hub */}
            <div className={`lg:w-5/12 p-6 sm:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l space-y-6 ${
              isBlack ? 'bg-slate-900/90 border-slate-800' : 'bg-zinc-100 border-zinc-200'
            }`}>
              
              {/* Top SLA Badge */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-[11px] font-medium uppercase tracking-wider mb-4">
                  <Clock className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Under 2-Hour Response SLA Guarantee</span>
                </div>
                <h3 className={`text-2xl font-semibold font-['Montserrat'] uppercase tracking-tight ${
                  isBlack ? 'text-white' : 'text-slate-950'
                }`}>
                  Direct Engineering Support
                </h3>
                <p className={`text-xs leading-relaxed mt-2 ${
                  isBlack ? 'text-slate-400' : 'text-zinc-600'
                }`}>
                  When you contact TexasWebCoders, you talk directly to lead software engineers in Texas — no sales middlemen or offshore call queues.
                </p>
              </div>

              {/* Direct Contact Methods List */}
              <div className={`space-y-3 p-5 rounded-2xl border shadow-sm ${
                isBlack ? 'bg-slate-950 border-slate-800' : 'bg-white border-zinc-200'
              }`}>
                <a
                  href="tel:+19032226022"
                  className={`flex items-center gap-3.5 p-3 rounded-xl border transition-all group ${
                    isBlack
                      ? 'bg-slate-900 border-slate-800 hover:border-white'
                      : 'bg-zinc-50 border-zinc-200 hover:border-slate-950'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg transition-all ${
                    isBlack ? 'bg-white text-slate-950' : 'bg-slate-950 text-white'
                  }`}>
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-[10px] uppercase font-medium ${
                      isBlack ? 'text-slate-400' : 'text-zinc-500'
                    }`}>Direct Phone Contact</div>
                    <div className={`text-sm font-medium font-mono transition-colors ${
                      isBlack ? 'text-white group-hover:text-slate-200' : 'text-slate-950 group-hover:text-black'
                    }`}>
                      +1 9032226022
                    </div>
                  </div>
                </a>

                <a
                  href="mailto:info@texaswebcoders.com"
                  className={`flex items-center gap-3.5 p-3 rounded-xl border transition-all group ${
                    isBlack
                      ? 'bg-slate-900 border-slate-800 hover:border-white'
                      : 'bg-zinc-50 border-zinc-200 hover:border-slate-950'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg transition-all ${
                    isBlack ? 'bg-white text-slate-950' : 'bg-slate-950 text-white'
                  }`}>
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-[10px] uppercase font-medium ${
                      isBlack ? 'text-slate-400' : 'text-zinc-500'
                    }`}>Engineering Inquiry Email</div>
                    <div className={`text-xs font-medium transition-colors ${
                      isBlack ? 'text-white group-hover:text-slate-200' : 'text-slate-950 group-hover:text-black'
                    }`}>
                      info@texaswebcoders.com
                    </div>
                  </div>
                </a>

                <a
                  href="https://maps.google.com/?q=5221+S+Broadway+Ave,+Tyler,+TX+75703,+United+States"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3.5 p-3 rounded-xl border transition-all group ${
                    isBlack
                      ? 'bg-slate-900 border-slate-800 hover:border-white'
                      : 'bg-zinc-50 border-zinc-200 hover:border-slate-950'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg transition-all ${
                    isBlack ? 'bg-white text-slate-950' : 'bg-slate-950 text-white'
                  }`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-[10px] uppercase font-medium ${
                      isBlack ? 'text-slate-400' : 'text-zinc-500'
                    }`}>USA Headquarters</div>
                    <div className={`text-xs font-medium transition-colors ${
                      isBlack ? 'text-white group-hover:text-slate-200' : 'text-slate-950 group-hover:text-black'
                    }`}>
                      5221 S Broadway Ave, Tyler, TX 75703, United States
                    </div>
                  </div>
                </a>

                {/* Direct Office Hours Card */}
                <div
                  className={`flex items-center gap-3.5 p-3 rounded-xl border transition-all ${
                    isBlack ? 'bg-slate-900 border-slate-800' : 'bg-zinc-50 border-zinc-200'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg ${
                    isBlack ? 'bg-slate-800 text-emerald-400' : 'bg-zinc-200 text-emerald-600'
                  }`}>
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-[10px] uppercase font-medium ${
                      isBlack ? 'text-slate-400' : 'text-zinc-500'
                    }`}>Hours of Operation</div>
                    <div className={`text-xs font-medium ${isBlack ? 'text-white' : 'text-slate-950'}`}>
                      Mon - Fri: 8:00 AM - 6:00 PM CST
                    </div>
                  </div>
                </div>
              </div>

              {/* Client Protections Matrix */}
              <div className={`grid grid-cols-2 gap-2 text-[10px] font-medium pt-2 border-t ${
                isBlack ? 'border-slate-800 text-slate-400' : 'border-zinc-300 text-zinc-700'
              }`}>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 ${isBlack ? 'text-white' : 'text-slate-950'}`} />
                  <span>NDA Protected Inquiry</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 flex-shrink-0 text-amber-500" />
                  <span>100% W3C Validated</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
                  <span>1-Year Bug Warranty</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 flex-shrink-0 text-white" />
                  <span>0.5s Page Load SLA</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

