import React, { useState } from 'react';
import { X, Calendar, Clock, Sparkles, CheckCircle2, User, Mail, Phone, Video, Download, ExternalLink, ShieldCheck, ArrowRight, Building2, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AppointmentType {
  id: string;
  title: string;
  duration: string;
  description: string;
  badge: string;
  icon: string;
}

export const BookAppointmentModal: React.FC<BookAppointmentModalProps> = ({
  isOpen,
  onClose
}) => {
  const [step, setStep] = useState<'service' | 'datetime' | 'details' | 'confirmed'>('service');
  
  // Selected appointment options
  const [selectedType, setSelectedType] = useState<string>('30min_strategy');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [timeZone, setTimeZone] = useState<string>('CST (Texas HQ)');
  const [meetingPlatform, setMeetingPlatform] = useState<string>('Google Meet');

  // Form details
  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: ''
  });

  const [bookingId, setBookingId] = useState<string>('');

  if (!isOpen) return null;

  const appointmentTypes: AppointmentType[] = [
    {
      id: '15min_intro',
      title: '15-Min Quick Discovery Call',
      duration: '15 Mins',
      description: 'Quick discovery chat to discuss project feasibility, scope, and timeline.',
      badge: 'Fastest',
      icon: '⚡'
    },
    {
      id: '30min_strategy',
      title: '30-Min Web Strategy & Architecture',
      duration: '30 Mins',
      description: 'Comprehensive technical roadmap, UI/UX discussion, and live price estimate.',
      badge: 'Most Popular',
      icon: '🎯'
    },
    {
      id: '45min_fullstack',
      title: '45-Min Full Stack & App Deep Dive',
      duration: '45 Mins',
      description: 'In-depth review of complex database models, 3D WebGL requirements, or mobile apps.',
      badge: 'Enterprise',
      icon: '🚀'
    }
  ];

  // Helper to generate upcoming 14 dates (excluding weekends)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; dates.length < 10; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      const day = nextDate.getDay();
      if (day !== 0 && day !== 6) { // Weekdays only
        dates.push({
          fullDate: nextDate.toISOString().split('T')[0],
          dayName: nextDate.toLocaleDateString('en-US', { weekday: 'short' }),
          monthDay: nextDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        });
      }
    }
    return dates;
  };

  const availableDates = generateAvailableDates();

  const timeSlots = [
    '09:00 AM',
    '10:15 AM',
    '11:30 AM',
    '01:30 PM',
    '02:45 PM',
    '03:30 PM',
    '04:15 PM',
    '05:00 PM'
  ];

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientInfo.name || !clientInfo.email) return;

    const generatedId = `TWC-APP-${Math.floor(10000 + Math.random() * 90000)}`;
    setBookingId(generatedId);
    setStep('confirmed');

    const activeType = appointmentTypes.find(t => t.id === selectedType);

    // Send email dispatch to backend API
    try {
      fetch('/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: generatedId,
          serviceTitle: activeType?.title || 'Architecture & Scope Discovery',
          duration: activeType?.duration || '30 Min',
          date: selectedDate,
          time: selectedTime,
          meetingPlatform,
          clientName: clientInfo.name,
          clientEmail: clientInfo.email,
          clientPhone: clientInfo.phone || '',
          clientNotes: clientInfo.notes || ''
        })
      }).catch(err => console.error('Appointment email notification error:', err));
    } catch (err) {
      console.error('Appointment booking error:', err);
    }

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Fallback
    }
  };

  const handleDownloadICS = () => {
    const activeType = appointmentTypes.find(t => t.id === selectedType);
    const title = `TexasWebCoders Consultation: ${activeType?.title || 'Web Strategy Session'}`;
    const description = `Consultation with TexasWebCoders Lead Architect.\\nBooking ID: ${bookingId}\\nMeeting Link: https://meet.google.com/twc-${bookingId.toLowerCase()}`;
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//TexasWebCoders//Appointment System//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${meetingPlatform}`,
      `STATUS:CONFIRMED`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TexasWebcoders-Appointment-${bookingId}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white border border-zinc-200 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 my-auto text-slate-900 relative"
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-slate-950 hover:bg-zinc-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-300 text-slate-900 text-xs font-semibold uppercase tracking-wider mb-2 font-['Montserrat']">
            <Sparkles className="w-3.5 h-3.5 text-slate-900" />
            <span>Direct Lead Engineer Booking</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-['Montserrat'] uppercase tracking-tight text-slate-950">
            Book 1-On-1 Technical Consultation
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm mt-1">
            Schedule a direct video call with lead web architects at TexasWebCoders. Zero sales fluff, pure engineering clarity.
          </p>
        </div>

        {/* Progress Tracker Steps */}
        <div className="flex items-center justify-between border-y border-zinc-200 py-3 text-xs font-semibold">
          <div className={`flex items-center gap-1.5 ${step === 'service' ? 'text-slate-950' : 'text-zinc-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'service' ? 'bg-slate-950 text-white font-bold' : 'bg-zinc-100 text-zinc-500'}`}>1</span>
            <span>Session Type</span>
          </div>
          <div className="w-6 h-px bg-zinc-200" />
          <div className={`flex items-center gap-1.5 ${step === 'datetime' ? 'text-slate-950' : 'text-zinc-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'datetime' ? 'bg-slate-950 text-white font-bold' : 'bg-zinc-100 text-zinc-500'}`}>2</span>
            <span>Date & Time</span>
          </div>
          <div className="w-6 h-px bg-zinc-200" />
          <div className={`flex items-center gap-1.5 ${step === 'details' ? 'text-slate-950' : 'text-zinc-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'details' ? 'bg-slate-950 text-white font-bold' : 'bg-zinc-100 text-zinc-500'}`}>3</span>
            <span>Your Info</span>
          </div>
        </div>

        {/* STEP 1: SELECT APPOINTMENT TYPE */}
        {step === 'service' && (
          <div className="space-y-4">
            <p className="text-xs font-bold text-zinc-700 uppercase tracking-wider font-['Montserrat']">
              Select Your Preferred Consultation Format:
            </p>

            <div className="space-y-3">
              {appointmentTypes.map((type) => {
                const isSelected = selectedType === type.id;
                return (
                  <div
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                      isSelected
                        ? 'bg-slate-950 text-white border-slate-950 shadow-xl'
                        : 'bg-zinc-50 border-zinc-200 hover:border-zinc-400 hover:bg-zinc-100 text-slate-900'
                    }`}
                  >
                    <div className={`text-2xl p-2.5 rounded-xl border ${
                      isSelected ? 'bg-slate-900 border-slate-800' : 'bg-white border-zinc-200'
                    }`}>
                      {type.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-bold text-sm font-['Montserrat'] ${
                          isSelected ? 'text-white' : 'text-slate-950'
                        }`}>
                          {type.title}
                        </h3>
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                          isSelected
                            ? 'bg-white/20 text-white border border-white/30'
                            : 'bg-zinc-200 text-slate-900 border border-zinc-300'
                        }`}>
                          {type.duration} • Free
                        </span>
                      </div>
                      <p className={`text-xs leading-relaxed ${
                        isSelected ? 'text-zinc-300' : 'text-zinc-600'
                      }`}>
                        {type.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep('datetime')}
                className="bg-slate-950 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg font-['Montserrat']"
              >
                <span>Select Date & Time</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SELECT DATE & TIME SLOT */}
        {step === 'datetime' && (
          <div className="space-y-5">
            {/* Date Selection */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 font-['Montserrat']">
                <Calendar className="w-3.5 h-3.5 text-slate-950" />
                <span>1. Choose Available Date (Upcoming Weekdays):</span>
              </label>

              <div className="grid grid-cols-5 gap-2">
                {availableDates.map((d) => {
                  const isSelected = selectedDate === d.fullDate;
                  return (
                    <button
                      key={d.fullDate}
                      onClick={() => setSelectedDate(d.fullDate)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-950 text-white border-slate-950 font-bold shadow-md scale-105'
                          : 'bg-zinc-50 border-zinc-200 text-slate-800 hover:border-zinc-400 hover:bg-zinc-100'
                      }`}
                    >
                      <div className="text-[10px] uppercase font-bold tracking-wider">{d.dayName}</div>
                      <div className="text-xs font-semibold">{d.monthDay}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 font-['Montserrat']">
                <Clock className="w-3.5 h-3.5 text-slate-950" />
                <span>2. Select Preferred Time Slot:</span>
              </label>

              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((slot) => {
                  const isSelected = selectedTimeSlot === slot;
                  return (
                    <button
                      key={slot}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`py-2 px-3 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-950 text-white border-slate-950 shadow-md scale-105'
                          : 'bg-zinc-50 border-zinc-200 text-slate-800 hover:border-zinc-400 hover:bg-zinc-100'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Timezone & Platform Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1 flex items-center gap-1 font-['Montserrat']">
                  <Globe className="w-3 h-3 text-slate-950" />
                  <span>Your Timezone</span>
                </label>
                <select
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-950 font-medium"
                >
                  <option value="CST (Texas HQ)">Central Time (CST/CDT) - Texas HQ</option>
                  <option value="EST">Eastern Time (EST/EDT)</option>
                  <option value="PST">Pacific Time (PST/PDT)</option>
                  <option value="MST">Mountain Time (MST/MDT)</option>
                  <option value="GMT/UTC">London / GMT (UTC)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1 flex items-center gap-1 font-['Montserrat']">
                  <Video className="w-3 h-3 text-slate-950" />
                  <span>Meeting Platform</span>
                </label>
                <select
                  value={meetingPlatform}
                  onChange={(e) => setMeetingPlatform(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-950 font-medium"
                >
                  <option value="Google Meet">Google Meet Video Link</option>
                  <option value="Zoom">Zoom Video Conference</option>
                  <option value="Direct Phone Call">Direct Phone Call</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center border-t border-zinc-200">
              <button
                onClick={() => setStep('service')}
                className="text-zinc-600 hover:text-slate-950 text-xs font-bold cursor-pointer font-['Montserrat']"
              >
                ← Back
              </button>
              <button
                disabled={!selectedDate || !selectedTimeSlot}
                onClick={() => setStep('details')}
                className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer font-['Montserrat'] ${
                  selectedDate && selectedTimeSlot
                    ? 'bg-slate-950 hover:bg-slate-800 text-white shadow-lg'
                    : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                }`}
              >
                <span>Continue To Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CLIENT DETAILS FORM */}
        {step === 'details' && (
          <form onSubmit={handleConfirmBooking} className="space-y-4">
            <div className="bg-zinc-50 p-3.5 rounded-2xl border border-zinc-200 text-xs flex items-center justify-between">
              <div>
                <span className="text-zinc-500 font-medium">Scheduled Time: </span>
                <span className="font-bold text-slate-950">{selectedDate} at {selectedTimeSlot} ({timeZone})</span>
              </div>
              <button
                type="button"
                onClick={() => setStep('datetime')}
                className="text-slate-950 underline font-bold text-[10px] cursor-pointer"
              >
                Change
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1 flex items-center gap-1 font-['Montserrat']">
                  <User className="w-3 h-3 text-slate-950" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Marcus Vance"
                  value={clientInfo.name}
                  onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-slate-950 font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1 flex items-center gap-1 font-['Montserrat']">
                  <Mail className="w-3 h-3 text-slate-950" />
                  <span>Email Address *</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. marcus@company.com"
                  value={clientInfo.email}
                  onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-slate-950 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1 flex items-center gap-1 font-['Montserrat']">
                  <Phone className="w-3 h-3 text-slate-950" />
                  <span>Phone Number</span>
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={clientInfo.phone}
                  onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-slate-950 font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1 flex items-center gap-1 font-['Montserrat']">
                  <Building2 className="w-3 h-3 text-slate-950" />
                  <span>Company / Organization</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Apex Innovations"
                  value={clientInfo.company}
                  onChange={(e) => setClientInfo({ ...clientInfo, company: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-slate-950 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1 font-['Montserrat']">
                Project Notes / Core Focus Area
              </label>
              <textarea
                rows={2}
                placeholder="What web application or redesign features would you like to discuss on the call?"
                value={clientInfo.notes}
                onChange={(e) => setClientInfo({ ...clientInfo, notes: e.target.value })}
                className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-950 font-medium"
              />
            </div>

            <div className="pt-3 flex justify-between items-center border-t border-zinc-200">
              <button
                type="button"
                onClick={() => setStep('datetime')}
                className="text-zinc-600 hover:text-slate-950 text-xs font-bold cursor-pointer font-['Montserrat']"
              >
                ← Back
              </button>

              <button
                type="submit"
                className="bg-slate-950 hover:bg-slate-800 text-white px-7 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-xl font-['Montserrat']"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Confirm & Lock Appointment</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: CONFIRMED SCREEN */}
        {step === 'confirmed' && (
          <div className="text-center space-y-5 py-2">
            <div className="w-16 h-16 bg-slate-950 rounded-full flex items-center justify-center text-white mx-auto shadow-xl">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-slate-950 bg-zinc-100 px-3 py-1 rounded-full border border-zinc-300">
                BOOKING CONFIRMED #{bookingId}
              </span>
              <h3 className="text-2xl font-bold text-slate-950 font-['Montserrat'] uppercase tracking-tight mt-3">
                Appointment Scheduled!
              </h3>
              <p className="text-zinc-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed mt-1">
                Thank you <span className="text-slate-950 font-bold">{clientInfo.name}</span>! Calendar invitation has been dispatched to <span className="text-slate-950 font-bold">{clientInfo.email}</span>.
              </p>
            </div>

            {/* Details Box */}
            <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200 text-left text-xs space-y-2.5 max-w-lg mx-auto text-slate-900">
              <div className="flex justify-between border-b border-zinc-200 pb-2">
                <span className="text-zinc-500 font-medium">Date & Time:</span>
                <span className="text-slate-950 font-bold">{selectedDate} @ {selectedTimeSlot} ({timeZone})</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200 pb-2">
                <span className="text-zinc-500 font-medium">Lead Consultant:</span>
                <span className="text-slate-950 font-bold">Austin Vance (Principal Architect)</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200 pb-2">
                <span className="text-zinc-500 font-medium">Meeting Platform:</span>
                <span className="text-slate-950 font-bold flex items-center gap-1">
                  <Video className="w-3.5 h-3.5 text-slate-950" />
                  {meetingPlatform}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 font-medium">Video Link:</span>
                <a
                  href={`https://meet.google.com/twc-${bookingId.toLowerCase()}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-950 font-mono font-bold hover:underline flex items-center gap-1"
                >
                  <span>meet.google.com/twc-{bookingId.toLowerCase()}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Action Buttons: Add Calendar / Download .ics */}
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={handleDownloadICS}
                className="bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-slate-900 px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer font-['Montserrat']"
              >
                <Download className="w-4 h-4 text-slate-950" />
                <span>Download .ICS Calendar File</span>
              </button>

              <button
                onClick={onClose}
                className="bg-slate-950 hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider cursor-pointer shadow-lg font-['Montserrat']"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
};
