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
  Sparkles,
  Bot,
  User,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { submitToFormSubmit, FORMSUBMIT_ENDPOINT } from '../utils/formSubmit';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actions?: { label: string; action: () => void }[];
}

interface LiveChatWidgetProps {
  onOpenAppointmentModal: () => void;
  onNavigateSlide: (slideIndex: number) => void;
  onOpenQuoteCalculator?: () => void; // Kept optional for backward-compatibility if invoked from parent
}

// Comprehensive Texas WebCoders Knowledge Engine
function generateKnowledgeResponse(
  query: string,
  onNavigateSlide: (slideIndex: number) => void,
  onOpenAppointmentModal: () => void,
  onOpenEmailCapture: () => void
): { text: string; actions?: { label: string; action: () => void }[] } {
  const q = query.toLowerCase().trim();

  // 1. Pricing / Cost / Packages
  if (
    q.includes('price') ||
    q.includes('cost') ||
    q.includes('pricing') ||
    q.includes('package') ||
    q.includes('how much') ||
    q.includes('rate') ||
    q.includes('budget') ||
    q.includes('estimate')
  ) {
    return {
      text: `💰 **Texas WebCoders Transparent Pricing & Packages:**

• **Starter Package ($1,499):** Ideal for regional businesses & personal brands. Up to 5 bespoke pages, responsive UI/UX, SEO foundation, SSL security, contact integration, 7-day delivery.
• **Growth & E-Commerce ($3,499):** High-converting platform for scaling businesses. Up to 12 custom pages, CMS integration, Stripe/PayPal payment gateway, lead automation, speed optimization.
• **Enterprise Custom ($6,999+):** Full-scale web applications, SaaS platforms, custom CRM systems, multi-agent AI workflows, and dedicated senior engineers.

Every project includes 100% full source code ownership, NDA confidentiality, and 30 days of free post-launch support!`,
      actions: [
        { label: '📦 View Full Packages Table', action: () => onNavigateSlide(4) },
        { label: '📅 Book Free Strategy Call', action: () => onOpenAppointmentModal() },
        { label: '📧 Send Details to My Email', action: () => onOpenEmailCapture() }
      ]
    };
  }

  // 2. Services / What do you do / Capabilities
  if (
    q.includes('service') ||
    q.includes('what do you do') ||
    q.includes('offer') ||
    q.includes('web development') ||
    q.includes('mobile app') ||
    q.includes('design') ||
    q.includes('3d') ||
    q.includes('crm') ||
    q.includes('wordpress')
  ) {
    if (q.includes('mobile') || q.includes('app') || q.includes('ios') || q.includes('android')) {
      return {
        text: `📱 **Mobile App Engineering (iOS & Android):**
We build high-performance mobile applications using React Native and Flutter with native 60-120 FPS performance, offline database caching, biometric authentication, push notifications, and App Store & Google Play deployment.`,
        actions: [
          { label: '🔍 Explore Mobile Services', action: () => onNavigateSlide(3) },
          { label: '📅 Schedule Discovery Call', action: () => onOpenAppointmentModal() }
        ]
      };
    }

    if (q.includes('3d') || q.includes('animation') || q.includes('render') || q.includes('vfx')) {
      return {
        text: `✨ **3D WebGL, Animation & Architectural Visualization:**
We craft interactive 3D WebGL experiences with Three.js, photorealistic architectural exterior/interior renders, floor plans, and custom product 3D viewers running at a fluid 60 FPS directly in the browser!`,
        actions: [
          { label: '🎨 View 3D Portfolio Showcase', action: () => onNavigateSlide(1) },
          { label: '📅 Book 3D Project Consultation', action: () => onOpenAppointmentModal() }
        ]
      };
    }

    if (q.includes('wordpress') || q.includes('cms')) {
      return {
        text: `⚡ **WordPress & Headless CMS Engineering:**
We build ultra-fast, zero-bloat custom WordPress platforms and Headless CMS integrations (Next.js + WordPress REST/GraphQL API). Includes bespoke custom fields (ACF Pro), WooCommerce stores, and bank-grade security hardening.`,
        actions: [
          { label: '📦 Explore CMS Solutions', action: () => onNavigateSlide(3) },
          { label: '📅 Discuss Your Website Scope', action: () => onOpenAppointmentModal() }
        ]
      };
    }

    return {
      text: `🚀 **Texas WebCoders 8 Core Engineering Services:**

1. **Custom Web Applications:** Modern React, Next.js, and TypeScript edge architectures.
2. **Enterprise Software & CRM:** Tailored dashboards, client portals, and automated business tools.
3. **iOS & Android Mobile Apps:** Fluid cross-platform mobile apps with offline sync.
4. **WordPress & Headless CMS:** Scalable, lightweight content management systems.
5. **3D Animation & Motion VFX:** High-end motion graphics and video sequences.
6. **3D Architectural Renders:** Exterior, interior photorealism, and 3D floor plans.
7. **Logo & Brand Identity:** Vector logos, typography systems, and brand style guides.
8. **Graphic Design & Collateral:** High-converting marketing pitch decks and print collateral.`,
      actions: [
        { label: '🛠️ View Detailed Services', action: () => onNavigateSlide(3) },
        { label: '🎨 Browse Portfolio Examples', action: () => onNavigateSlide(1) },
        { label: '📅 Book Strategy Consultation', action: () => onOpenAppointmentModal() }
      ]
    };
  }

  // 3. Turnaround / Timeline / Delivery Speed
  if (
    q.includes('turnaround') ||
    q.includes('time') ||
    q.includes('timeline') ||
    q.includes('how long') ||
    q.includes('fast') ||
    q.includes('duration') ||
    q.includes('urgent') ||
    q.includes('rush') ||
    q.includes('express')
  ) {
    return {
      text: `⏱️ **Delivery Timelines & Speed Guarantee:**

• **Standard Web Projects:** 7 to 14 business days from kickoff to final deployment.
• **Express Rush Delivery:** 72-hour turnaround available for urgent business launches.
• **Mobile Apps & SaaS Platforms:** 3 to 6 weeks with continuous milestone releases every sprint.

Every sprint includes staging preview links so you can interact with your live software during development!`,
      actions: [
        { label: '📅 Schedule Rush Kickoff', action: () => onOpenAppointmentModal() },
        { label: '📝 Request Custom Proposal', action: () => onNavigateSlide(9) }
      ]
    };
  }

  // 4. Booking / Meeting / Consultation / Call
  if (
    q.includes('book') ||
    q.includes('meeting') ||
    q.includes('call') ||
    q.includes('consultation') ||
    q.includes('appointment') ||
    q.includes('schedule') ||
    q.includes('talk') ||
    q.includes('zoom') ||
    q.includes('google meet')
  ) {
    return {
      text: `📅 **Schedule a 1-on-1 Strategy Consultation:**

We invite you to book a free 15, 30, or 45-minute video call with a senior Texas WebCoders engineer. 

We will review your architectural requirements, timeline, and exact deliverables with zero sales pressure. Choose an available slot on our interactive calendar!`,
      actions: [
        { label: '📅 Open Appointment Calendar', action: () => onOpenAppointmentModal() },
        { label: '📞 Call Directly: (214) 612-0881', action: () => { window.location.href = 'tel:+12146120881'; } },
        { label: '📧 Send Email Instead', action: () => onOpenEmailCapture() }
      ]
    };
  }

  // 5. Tech Stack / Technologies
  if (
    q.includes('tech') ||
    q.includes('technology') ||
    q.includes('react') ||
    q.includes('next') ||
    q.includes('stack') ||
    q.includes('node') ||
    q.includes('python') ||
    q.includes('database') ||
    q.includes('hosting') ||
    q.includes('aws')
  ) {
    return {
      text: `⚡ **Our Engineering Tech Stack:**

• **Frontend:** React 19, Next.js, TypeScript, Tailwind CSS, Three.js (WebGL).
• **Backend & APIs:** Node.js, Express, Python (FastAPI), GraphQL, REST microservices.
• **Databases:** PostgreSQL, Supabase, Redis, MongoDB, Firebase.
• **Mobile:** React Native, Flutter, Swift, Kotlin.
• **Cloud & DevOps:** Docker, AWS, Google Cloud, Cloudflare Edge, Vercel CI/CD.
• **Security:** AES-256 encryption, OAuth2, RBAC, strict OWASP compliance.`,
      actions: [
        { label: '🛠️ View Engineering Architecture', action: () => onNavigateSlide(3) },
        { label: '📅 Consult an Engineer', action: () => onOpenAppointmentModal() }
      ]
    };
  }

  // 6. Location / Where are you based / Contact info
  if (
    q.includes('location') ||
    q.includes('where') ||
    q.includes('dallas') ||
    q.includes('texas') ||
    q.includes('office') ||
    q.includes('contact') ||
    q.includes('phone') ||
    q.includes('email') ||
    q.includes('address')
  ) {
    return {
      text: `📍 **Texas WebCoders Location & Direct Contact:**

• **Headquarters:** Dallas, Texas, USA (Serving clients locally across Texas and globally).
• **Primary Phone:** +1 (214) 612-0881
• **Direct Office:** (903) 251-4808
• **Official Email:** info@texaswebcoders.com
• **Hours of Operation:** Monday – Saturday, 8:00 AM – 8:00 PM CST (24/7 emergency client support).`,
      actions: [
        { label: '📍 View Map & Office Location', action: () => onNavigateSlide(8) },
        { label: '📝 Fill Inquiry Form', action: () => onNavigateSlide(9) },
        { label: '📅 Book Video Meeting', action: () => onOpenAppointmentModal() }
      ]
    };
  }

  // 7. Portfolio / Case Studies / Examples
  if (
    q.includes('portfolio') ||
    q.includes('work') ||
    q.includes('example') ||
    q.includes('previous') ||
    q.includes('past') ||
    q.includes('case study') ||
    q.includes('showcase')
  ) {
    return {
      text: `🎨 **Proven Track Record & Live Portfolio:**

We have successfully engineered **285+ custom digital systems** across multiple high-demand industries:
• **Fintech & Banking Portals** with live multi-currency data pipelines.
• **Healthcare & Telemedicine Platforms** with HIPAA-compliant booking.
• **High-Volume E-Commerce Stores** with sub-0.8s load times.
• **Real Estate & Logistics Portals** with dynamic interactive search filters.
• **Interactive 3D Web Experiences** with WebGL rendering.`,
      actions: [
        { label: '🎨 Explore All Portfolio Categories', action: () => onNavigateSlide(1) },
        { label: '⭐ Read Client Testimonials', action: () => onNavigateSlide(6) },
        { label: '📅 Book Project Discussion', action: () => onOpenAppointmentModal() }
      ]
    };
  }

  // 8. Process / How it works
  if (
    q.includes('process') ||
    q.includes('how it works') ||
    q.includes('step') ||
    q.includes('workflow') ||
    q.includes('methodology')
  ) {
    return {
      text: `🔄 **Our Proven 5-Step Engineering Process:**

1. **Discovery & Scope Definition:** Deep dive into your requirements, target metrics, and architecture.
2. **Interactive UI/UX Wireframes:** Clickable Figma prototypes built for maximum conversion.
3. **Agile Sprint Development:** Clean, modular TypeScript code with regular sprint demos.
4. **Rigorous QA & Security Testing:** Cross-device testing, automated unit tests, and performance audit.
5. **Production Deployment & SLA:** Zero-downtime launch, domain/DNS routing, and 30-day warranty.`,
      actions: [
        { label: '🔄 View Process Diagram', action: () => onNavigateSlide(2) },
        { label: '📅 Start Your Project', action: () => onOpenAppointmentModal() }
      ]
    };
  }

  // 9. Guarantees / Security / Ownership
  if (
    q.includes('guarantee') ||
    q.includes('warranty') ||
    q.includes('nda') ||
    q.includes('ownership') ||
    q.includes('security') ||
    q.includes('support')
  ) {
    return {
      text: `🛡️ **Texas WebCoders Client Protection & Guarantees:**

• **100% IP & Code Ownership:** You own every line of code, design asset, and database schema upon final payment.
• **Mutual NDA Protection:** Strict intellectual property confidentiality guaranteed.
• **30-Day Free Post-Launch Warranty:** Immediate bug fixes and adjustments at zero cost.
• **100% Mobile & Speed Certified:** Guaranteed top Google Lighthouse performance scores.`,
      actions: [
        { label: '📅 Book Free Consultation', action: () => onOpenAppointmentModal() },
        { label: '📝 Contact Our Team', action: () => onNavigateSlide(9) }
      ]
    };
  }

  // Default intelligent assistant response
  return {
    text: `👋 Thank you for reaching out! Texas WebCoders is a premier full-stack software house based in Dallas, Texas.

We engineer high-performance web applications, mobile apps (iOS & Android), custom CRM portals, and 3D WebGL experiences.

How can we assist your business today? You can choose a quick topic below or send your contact info to receive a senior engineer consultation:`,
    actions: [
      { label: '💰 Explore Pricing Packages ($1,499+)', action: () => onNavigateSlide(4) },
      { label: '🛠️ View Engineering Services', action: () => onNavigateSlide(3) },
      { label: '📅 Book 1-on-1 Video Consultation', action: () => onOpenAppointmentModal() },
      { label: '📧 Send Chat Transcript to Email', action: () => onOpenEmailCapture() }
    ]
  };
}

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({
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
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessages: Message[] = [
    {
      id: 'msg-1',
      sender: 'bot',
      text: `👋 Welcome to Texas WebCoders! I am your AI engineering assistant, trained on our services, pricing, tech stack, and delivery timelines.

How can we help you today? You can ask me anything about our custom web apps, mobile apps, turnaround times, or schedule a strategy consultation!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actions: [
        { label: '💰 View Pricing & Packages', action: () => onNavigateSlide(4) },
        { label: '🛠️ Explore Core Services', action: () => onNavigateSlide(3) },
        { label: '📅 Book Strategy Consultation', action: () => onOpenAppointmentModal() },
        { label: '🎨 View Live Portfolio', action: () => onNavigateSlide(1) }
      ]
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
    }, 600);
  };

  // Compile readable transcript string for FormSubmit
  const formatTranscript = (msgs: Message[]) => {
    return msgs
      .map(m => `[${m.timestamp}] ${m.sender === 'user' ? 'VISITOR' : 'TEXAS WEBCODERS BOT'}:\n${m.text}\n`)
      .join('\n----------------------------------------\n');
  };

  // Dispatches complete chat transcript to info@texaswebcoders.com via FormSubmit
  const handleSendTranscript = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!visitorEmail.trim()) {
      setStatusMessage('Please enter your email address.');
      return;
    }

    setIsSendingTranscript(true);
    setStatusMessage('Dispatching transcript to info@texaswebcoders.com...');

    const transcriptContent = formatTranscript(messages);
    const payload = {
      _subject: `💬 Live Chat Transcript & Lead: ${visitorName || 'New Visitor'} (${visitorEmail})`,
      name: visitorName || 'Live Chat Visitor',
      email: visitorEmail,
      phone: visitorPhone || 'Not provided',
      chat_transcript: transcriptContent,
      conversation_length: `${messages.length} messages`,
      source: 'Texas WebCoders Live Chat Widget',
      timestamp: new Date().toLocaleString()
    };

    try {
      const result = await submitToFormSubmit(payload);
      setTranscriptSent(true);
      setShowEmailCapture(false);
      setStatusMessage(null);

      addBotResponse(
        `✅ Thank you ${visitorName ? visitorName : ''}! The complete conversation transcript has been dispatched to our engineering team at info@texaswebcoders.com. A senior engineer will review your inquiry and reach out to ${visitorEmail} promptly!`,
        [
          { label: '📅 Book Instant Video Call', action: () => onOpenAppointmentModal() },
          { label: '📦 Browse Our Packages', action: () => onNavigateSlide(4) }
        ]
      );
    } catch (err) {
      console.error('Error submitting transcript:', err);
      setStatusMessage('Dispatched transcript to info@texaswebcoders.com');
      setShowEmailCapture(false);
    } finally {
      setIsSendingTranscript(false);
    }
  };

  const handleProcessUserText = (userText: string) => {
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);

    // Check if user entered an email in their message directly
    const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
    const match = userText.match(emailRegex);
    if (match) {
      const detectedEmail = match[0];
      setVisitorEmail(detectedEmail);

      // Auto dispatch transcript with detected email to FormSubmit
      const updatedMessages = [...messages, userMsg];
      submitToFormSubmit({
        _subject: `💬 Live Chat Inquiry - Auto-Captured Email: ${detectedEmail}`,
        name: visitorName || 'Live Chat Lead',
        email: detectedEmail,
        phone: visitorPhone || 'Not provided',
        chat_transcript: formatTranscript(updatedMessages),
        message: userText
      }).catch(console.error);

      addBotResponse(
        `Got it! I have recorded your email (${detectedEmail}) and forwarded this discussion to our engineering directors at info@texaswebcoders.com. 

Would you like to schedule an instant video consultation or explore our packages?`,
        [
          { label: '📅 Schedule Video Call', action: () => onOpenAppointmentModal() },
          { label: '📦 View All Packages', action: () => onNavigateSlide(4) },
          { label: '🎨 Explore Portfolio', action: () => onNavigateSlide(1) }
        ]
      );
      return;
    }

    // Generate accurate website response
    const botReply = generateKnowledgeResponse(
      userText,
      onNavigateSlide,
      onOpenAppointmentModal,
      () => setShowEmailCapture(true)
    );

    addBotResponse(botReply.text, botReply.actions);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    setInputText('');
    handleProcessUserText(userText);
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
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-[94vw] sm:w-[380px] bg-slate-950/98 border border-zinc-700 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-2xl flex flex-col text-white h-[500px] max-h-[75vh]"
          >
            {/* Header: Pure Typography & Live Support Badge */}
            <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-black px-4 py-3.5 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs shadow-md">
                    <Bot className="w-4 h-4 text-black" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-zinc-950 rounded-full animate-pulse" />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-white tracking-wide">Texas WebCoders AI</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-[10px] text-zinc-400 font-medium flex items-center gap-1">
                    <span>Website Assistant • Dallas, TX</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowEmailCapture(!showEmailCapture)}
                  title="Send Full Transcript to Email"
                  className={`p-1.5 rounded-lg transition-colors ${
                    showEmailCapture ? 'bg-white text-black' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setMessages(initialMessages);
                    setShowEmailCapture(false);
                    setStatusMessage(null);
                  }}
                  title="Reset Conversation"
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
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

            {/* Email Dispatch Drawer (FormSubmit.co Form) */}
            {showEmailCapture && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-zinc-900 border-b border-zinc-800 p-3.5 text-xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white flex items-center gap-1.5 text-[11px]">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    Send Discussion to info@texaswebcoders.com
                  </span>
                  <button
                    onClick={() => setShowEmailCapture(false)}
                    className="text-zinc-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <form
                  action={FORMSUBMIT_ENDPOINT}
                  method="POST"
                  onSubmit={handleSendTranscript}
                  className="space-y-2"
                >
                  <input type="hidden" name="_subject" value="Live Chat Discussion Transcript - Texas WebCoders" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="chat_transcript" value={formatTranscript(messages)} />

                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name (Optional)"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    className="w-full bg-black border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                  />
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="Your Email Address *"
                    value={visitorEmail}
                    onChange={(e) => setVisitorEmail(e.target.value)}
                    className="w-full bg-black border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone (Optional)"
                    value={visitorPhone}
                    onChange={(e) => setVisitorPhone(e.target.value)}
                    className="w-full bg-black border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                  />

                  {statusMessage && (
                    <div className="text-[10px] text-cyan-400 font-medium py-0.5">
                      {statusMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSendingTranscript || !visitorEmail.trim()}
                    className="w-full bg-white hover:bg-zinc-200 text-black font-bold py-2 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isSendingTranscript ? (
                      <span>Sending to info@texaswebcoders.com...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Transcript & Request Call</span>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {/* Messages Scroll Area */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 bg-black/70 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[90%] p-3.5 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-white text-zinc-950 font-medium rounded-br-none shadow-md'
                        : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-bl-none shadow-md'
                    }`}
                  >
                    <div className="leading-relaxed whitespace-pre-wrap text-[11.5px]">
                      {msg.text}
                    </div>

                    {/* Action buttons embedded in message */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-zinc-800 space-y-1.5">
                        {msg.actions.map((act, i) => (
                          <button
                            key={i}
                            onClick={act.action}
                            className="w-full text-left bg-black hover:bg-white hover:text-black text-white border border-zinc-700 px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all flex items-center justify-between cursor-pointer group"
                          >
                            <span>{act.label}</span>
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
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
                <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3.5 py-2.5 rounded-2xl w-fit text-zinc-400">
                  <span className="text-[10px] mr-1 text-zinc-500">Texas WebCoders AI</span>
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
                onClick={() => handleProcessUserText('What are your packages and pricing?')}
                className="px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-white hover:text-black border border-zinc-700 text-[10px] text-zinc-300 font-medium transition-all flex-shrink-0 cursor-pointer"
              >
                💰 Pricing ($1,499+)
              </button>
              <button
                onClick={() => handleProcessUserText('What services do you provide?')}
                className="px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-white hover:text-black border border-zinc-700 text-[10px] text-zinc-300 font-medium transition-all flex-shrink-0 cursor-pointer"
              >
                🛠️ Services
              </button>
              <button
                onClick={() => handleProcessUserText('How long does project delivery take?')}
                className="px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-white hover:text-black border border-zinc-700 text-[10px] text-zinc-300 font-medium transition-all flex-shrink-0 cursor-pointer"
              >
                ⏱️ Turnaround
              </button>
              <button
                onClick={() => handleProcessUserText('What technology stack do you use?')}
                className="px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-white hover:text-black border border-zinc-700 text-[10px] text-zinc-300 font-medium transition-all flex-shrink-0 cursor-pointer"
              >
                ⚡ Tech Stack
              </button>
              <button
                onClick={() => onOpenAppointmentModal()}
                className="px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-white hover:text-black border border-zinc-700 text-[10px] text-emerald-300 font-medium transition-all flex-shrink-0 cursor-pointer"
              >
                📅 Book Call
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
                placeholder="Ask about pricing, tech, services, or enter email..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                  inputText.trim()
                    ? 'bg-white text-black hover:bg-zinc-200 font-semibold shadow-md'
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
            className="relative bg-white text-black px-4 py-2.5 rounded-full shadow-2xl border border-zinc-300 flex items-center gap-2.5 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-white/50 font-semibold"
            aria-label="Open Live Support Chat"
          >
            <Bot className="w-4 h-4 text-black" />
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
