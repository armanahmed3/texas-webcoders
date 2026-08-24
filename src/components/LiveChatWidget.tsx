import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  X,
  Send,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  Mail,
  CheckCircle2,
  Phone,
  Clock,
  Sparkles
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actions?: { label: string; action: () => void }[];
}

interface LiveChatWidgetProps {
  onOpenQuoteCalculator: () => void;
  onOpenAppointmentModal: () => void;
  onNavigateSlide: (slideIndex: number) => void;
}

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({
  onOpenQuoteCalculator,
  onOpenAppointmentModal,
  onNavigateSlide
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [visitorEmail, setVisitorEmail] = useState('');
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [transcriptSent, setTranscriptSent] = useState(false);
  const [isSendingTranscript, setIsSendingTranscript] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessages: Message[] = [
    {
      id: 'msg-1',
      sender: 'bot',
      text: "👋 Hi! Welcome to Texas WebCoders. Looking to build a custom web app, explore packages, or schedule a strategy consultation?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
    }
  }, [isOpen, messages, isTyping, showEmailCapture]);

  const handleOpenChat = () => {
    setIsOpen(true);
    setUnreadCount(0);
  };

  const addBotResponse = (text: string, actions?: { label: string; action: () => void }[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          sender: 'bot',
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actions
        }
      ]);
    }, 900);
  };

  const handleSendTranscript = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!visitorEmail.trim()) return;

    setIsSendingTranscript(true);
    try {
      const response = await fetch('/api/chat-transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: visitorName || 'Live Chat Visitor',
          clientEmail: visitorEmail,
          clientPhone: visitorPhone || '',
          messages: messages.map(m => ({
            sender: m.sender,
            text: m.text,
            timestamp: m.timestamp
          }))
        })
      });

      if (response.ok) {
        setTranscriptSent(true);
        setShowEmailCapture(false);
        addBotResponse(
          `✅ Thank you ${visitorName ? visitorName : ''}! The complete chat transcript has been dispatched to our engineering team (info@texaswebcoders.com) and a copy was sent to ${visitorEmail}. We will get back to you within 2 business hours!`
        );
      }
    } catch (err) {
      console.error('Error sending chat transcript:', err);
    } finally {
      setIsSendingTranscript(false);
    }
  };

  const handleQuickQuestion = (questionText: string) => {
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: questionText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);

    const lower = questionText.toLowerCase();

    // Check if user entered an email in their message directly
    const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
    const match = lower.match(emailRegex);
    if (match) {
      const detectedEmail = match[0];
      setVisitorEmail(detectedEmail);
      // Auto dispatch transcript
      fetch('/api/chat-transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: visitorName || 'Live Chat Lead',
          clientEmail: detectedEmail,
          clientPhone: visitorPhone || '',
          messages: [...messages, userMsg].map(m => ({
            sender: m.sender,
            text: m.text,
            timestamp: m.timestamp
          }))
        })
      }).catch(console.error);

      addBotResponse(
        `Got it! I've linked your email (${detectedEmail}) and forwarded this whole chat directly to our team at Texas WebCoders. Would you like to schedule a strategy consultation or calculate an instant quote?`,
        [
          { label: '📅 Book Strategy Consultation', action: () => { setIsOpen(false); onOpenAppointmentModal(); } },
          { label: '⚡ Calculate Instant Quote', action: () => { setIsOpen(false); onOpenQuoteCalculator(); } }
        ]
      );
      return;
    }

    if (lower.includes('pricing') || lower.includes('cost') || lower.includes('package')) {
      addBotResponse(
        "Our web development packages start at $1,499 for full-stack responsive web systems up to complete enterprise custom portals. You can calculate an instant transparent quote right now!",
        [
          { label: '🧮 Open Price Calculator', action: () => { setIsOpen(false); onOpenQuoteCalculator(); } },
          { label: '📦 View All Packages', action: () => { setIsOpen(false); onNavigateSlide(4); } },
          { label: '📧 Send Chat to My Email', action: () => setShowEmailCapture(true) }
        ]
      );
    } else if (lower.includes('book') || lower.includes('consultation') || lower.includes('appointment') || lower.includes('call')) {
      addBotResponse(
        "We'd be glad to meet with you! You can choose an available 15, 30, or 45-minute video call slot directly on our calendar with zero sales pressure.",
        [
          { label: '📅 Book 1-on-1 Video Call', action: () => { setIsOpen(false); onOpenAppointmentModal(); } },
          { label: '📧 Email Me Instead', action: () => setShowEmailCapture(true) }
        ]
      );
    } else if (lower.includes('portfolio') || lower.includes('work') || lower.includes('examples')) {
      addBotResponse(
        "We have delivered 285+ custom web platforms across Fintech, SaaS, E-Commerce, Healthcare, and Real Estate.",
        [
          { label: '🎨 Explore Portfolio', action: () => { setIsOpen(false); onNavigateSlide(1); } },
          { label: '📧 Send Details to My Email', action: () => setShowEmailCapture(true) }
        ]
      );
    } else if (lower.includes('turnaround') || lower.includes('time') || lower.includes('fast')) {
      addBotResponse(
        "Standard custom web builds take 7 to 14 business days. Express 72-hour delivery is also available for urgent project launches!",
        [
          { label: '⚡ Request Express Timeline', action: () => { setIsOpen(false); onNavigateSlide(7); } }
        ]
      );
    } else {
      addBotResponse(
        "Thanks for reaching out! Our team in Texas specializes in high-performance web apps, custom API integrations, mobile applications, and 3D WebGL experiences. Would you like to send this chat to your email, book a video call, or get a custom quote?",
        [
          { label: '📧 Send Chat to Email & Get Contacted', action: () => setShowEmailCapture(true) },
          { label: '📅 Schedule Strategy Consultation', action: () => { setIsOpen(false); onOpenAppointmentModal(); } },
          { label: '⚡ Get Instant Quote', action: () => { setIsOpen(false); onOpenQuoteCalculator(); } }
        ]
      );
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    setInputText('');

    handleQuickQuestion(userText);
  };

  return (
    <div className="fixed bottom-16 sm:bottom-5 right-3 sm:right-5 z-40 flex flex-col items-end font-['Montserrat']">
      {/* Slide-In Interactive Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-[92vw] sm:w-[350px] bg-slate-950/95 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl flex flex-col text-white h-[440px] max-h-[70vh]"
          >
            {/* Header: Pure Typography & Live Support Badge */}
            <div className="bg-gradient-to-r from-zinc-900 via-black to-zinc-900 px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {/* Live Support Icon Badge */}
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-600 flex items-center justify-center text-white font-bold text-xs tracking-wider shadow-inner">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-zinc-950 rounded-full animate-pulse" />
                </div>

                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-xs text-white font-['Montserrat'] tracking-wide">Live Support</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="text-[10px] text-zinc-400 font-medium flex items-center gap-1">
                    <span>Texas WebCoders Team • Online</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowEmailCapture(!showEmailCapture)}
                  title="Send Transcript via Email"
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    setMessages(initialMessages);
                    setShowEmailCapture(false);
                  }}
                  title="Reset Conversation"
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                  title="Close Live Chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Email Dispatch Drawer (When requested or toggled) */}
            {showEmailCapture && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-zinc-900 border-b border-zinc-800 p-3 text-xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    Send Full Chat to Support Team
                  </span>
                  <button
                    onClick={() => setShowEmailCapture(false)}
                    className="text-zinc-400 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <form onSubmit={handleSendTranscript} className="space-y-2">
                  <input
                    type="text"
                    placeholder="Your Name (Optional)"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    className="w-full bg-black border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Your Email Address *"
                    value={visitorEmail}
                    onChange={(e) => setVisitorEmail(e.target.value)}
                    className="w-full bg-black border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                  />
                  <input
                    type="tel"
                    placeholder="Your Phone Number (Optional)"
                    value={visitorPhone}
                    onChange={(e) => setVisitorPhone(e.target.value)}
                    className="w-full bg-black border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                  />
                  <button
                    type="submit"
                    disabled={isSendingTranscript || !visitorEmail.trim()}
                    className="w-full bg-white hover:bg-zinc-200 text-black font-bold py-2 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isSendingTranscript ? (
                      <span>Sending to info@texaswebcoders.com...</span>
                    ) : (
                      <>
                        <Send className="w-3 h-3" />
                        <span>Send Transcript & Request Contact</span>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {/* Messages Scroll Area */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-black/60 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] p-3 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-white text-zinc-950 font-medium rounded-br-none shadow-md'
                        : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-bl-none shadow-md'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                    {/* Action buttons embedded in message */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-zinc-800 space-y-1.5">
                        {msg.actions.map((act, i) => (
                          <button
                            key={i}
                            onClick={act.action}
                            className="w-full text-left bg-black hover:bg-white hover:text-black text-white border border-zinc-700 px-3 py-1.5 rounded-xl text-[11px] font-medium transition-all flex items-center justify-between cursor-pointer"
                          >
                            <span>{act.label}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-zinc-500 mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-2xl w-fit text-zinc-400">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts Bar */}
            <div className="p-2 bg-zinc-950 border-t border-zinc-800 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-1.5">
              <button
                onClick={() => handleQuickQuestion('What are your project packages & pricing?')}
                className="px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-white hover:text-black border border-zinc-700 text-[10px] text-zinc-300 font-medium transition-all flex-shrink-0 cursor-pointer"
              >
                💰 View Pricing
              </button>
              <button
                onClick={() => handleQuickQuestion('I want to schedule a strategy consultation call.')}
                className="px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-white hover:text-black border border-zinc-700 text-[10px] text-zinc-300 font-medium transition-all flex-shrink-0 cursor-pointer"
              >
                📅 Book Appointment
              </button>
              <button
                onClick={() => setShowEmailCapture(true)}
                className="px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-white hover:text-black border border-zinc-700 text-[10px] text-cyan-300 font-medium transition-all flex-shrink-0 cursor-pointer flex items-center gap-1"
              >
                <Mail className="w-3 h-3" />
                <span>Email Transcript</span>
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 bg-black border-t border-zinc-800 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a message or enter your email..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className={`p-2 rounded-xl transition-all cursor-pointer ${
                  inputText.trim()
                    ? 'bg-white text-black hover:bg-zinc-200 font-medium'
                    : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      {!isOpen && (
        <div className="flex items-center gap-2">
          <motion.button
            id="live-chat-trigger-btn"
            onClick={handleOpenChat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative bg-white text-black px-4 py-2.5 rounded-full shadow-2xl border border-zinc-300 flex items-center gap-2.5 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Open Live Support Chat"
          >
            <MessageSquare className="w-4 h-4 text-black" />
            <span className="text-xs font-bold text-black font-['Montserrat']">Live Chat</span>

            {/* Unread status badge */}
            {unreadCount > 0 && (
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            )}
          </motion.button>
        </div>
      )}
    </div>
  );
};
