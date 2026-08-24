import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ServiceItem } from '../types';
import { X, CheckCircle2, Clock, Wrench, Shield, ArrowRight, Sparkles, Phone, MessageSquare } from 'lucide-react';
import { ServiceIcon } from './ServiceIcon';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onInquire: (service: ServiceItem) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onInquire
}) => {
  if (!service) return null;

  // Extended service metadata for deep exploration
  const serviceDetailsMap: Record<string, {
    subtitle: string;
    overview: string;
    processTimeline: { step: string; title: string; desc: string }[];
    techStackTools: string[];
    guarantees: string[];
    startingPrice: string;
  }> = {
    logo: {
      subtitle: 'Premium Vector Logo Suite & Master Brand Identity System',
      overview: 'Our Custom Logo Design service provides your company with an unmistakable visual mark engineered to command authority in your niche. We do not use clipart or generator templates; every concept is sculpted by senior brand designers with full copyright ownership transferred to you.',
      processTimeline: [
        { step: '01', title: 'Brand Discovery', desc: 'Analyzing target demographics, competitor positioning, and brand values.' },
        { step: '02', title: 'Vector Sketching', desc: 'Crafting 3 to 5 distinct vector concepts with color variants.' },
        { step: '03', title: 'Refinement & Typography', desc: 'Precision font pairing, kerning, and color palette assignment.' },
        { step: '04', title: 'Master Export', desc: 'Delivering full print-ready AI, EPS, SVG, PNG, and PDF source files.' }
      ],
      techStackTools: ['Adobe Illustrator', 'Figma', 'Vector Magic', 'Pantone Color Guide'],
      guarantees: ['100% Vector Scalability', 'Full Trademark Ownership', 'Unlimited Concept Revisions'],
      startingPrice: '$249'
    },
    app: {
      subtitle: 'Native & Cross-Platform iOS / Android Mobile Application Design',
      overview: 'We design intuitive, high-converting mobile user experiences tailored for touch screens. From smooth tab navigation and biometrics to offline synchronization and dark mode UI, we ensure your app stands out on Apple App Store and Google Play.',
      processTimeline: [
        { step: '01', title: 'Wireframing & UX', desc: 'Mapping user journeys, screen flows, and interactive touch states.' },
        { step: '02', title: 'UI Design System', desc: 'Building reusable Figma component libraries, typography, and dark UI.' },
        { step: '03', title: 'Clickable Prototype', desc: 'Testing real gesture interactions, micro-animations, and screen transitions.' },
        { step: '04', title: 'Handoff & Specs', desc: 'Providing full Xcode / Android Studio assets, SVG icons, and dev handoff.' }
      ],
      techStackTools: ['Figma', 'React Native', 'Flutter', 'SwiftUI', 'Tailwind CSS'],
      guarantees: ['Apple & Google Design Compliance', '60 FPS Gesture Motion', 'Full Figma UI Kit Included'],
      startingPrice: '$1,299'
    },
    website: {
      subtitle: 'Full-Stack Modern Web Design, 3D WebGL Motion & Custom Code',
      overview: 'We build ultra-fast, high-converting web applications using modern React, TypeScript, and Tailwind CSS. Backed by interactive Three.js 3D canvas visuals and Google Core Web Vitals optimization, your website will load in under 0.5 seconds.',
      processTimeline: [
        { step: '01', title: 'Architecture & Wireframes', desc: 'Structuring content, copy, conversion funnels, and SEO schematics.' },
        { step: '02', title: '3D & Motion Prototyping', desc: 'Designing custom WebGL particle backgrounds, hover states, and slides.' },
        { step: '03', title: 'Full-Stack Development', desc: 'Writing clean, TypeScript code with zero bloat and instant load speeds.' },
        { step: '04', title: 'QA & Cloud Launch', desc: 'Testing mobile responsiveness, W3C validation, SSL, and CDN deployment.' }
      ],
      techStackTools: ['React 19', 'TypeScript', 'Tailwind CSS', 'Three.js / WebGL', 'Node.js', 'Vite'],
      guarantees: ['0.4s Avg Page Speed', 'Mobile & Touch Responsive', 'Free 2 Months Hosting & SSL'],
      startingPrice: '$599'
    },
    branding: {
      subtitle: 'End-to-End Corporate Identity, Brand Book & Stationery Suite',
      overview: 'Establish a cohesive visual language across all customer touchpoints. We craft comprehensive brand identity guidelines that define color psychology, voice tone, iconography, and physical print collateral.',
      processTimeline: [
        { step: '01', title: 'Audience Research', desc: 'Defining your company archetype, tone of voice, and visual market gap.' },
        { step: '02', title: 'Brand Style Guide', desc: 'Creating typography rules, color hex grids, and usage guidelines.' },
        { step: '03', title: 'Stationery & Collateral', desc: 'Designing business cards, letterheads, packaging, and email templates.' },
        { step: '04', title: 'Brand Book Delivery', desc: 'Compiling a full 20+ page PDF brand manual for your internal team.' }
      ],
      techStackTools: ['Adobe InDesign', 'Illustrator', 'Photoshop', 'Figma'],
      guarantees: ['Complete Brand Guidelines PDF', 'Print-Ready 300DPI Files', 'Commercial Rights Included'],
      startingPrice: '$499'
    },
    social: {
      subtitle: 'High-Impact Social Media Graphics, Story Motion & Ad Creative',
      overview: 'Stop the scroll and convert viewers into loyal followers. We design custom social media content kits, Instagram post grids, LinkedIn banners, and animated ad creatives tailored for viral engagement.',
      processTimeline: [
        { step: '01', title: 'Campaign Strategy', desc: 'Planning content pillars, post schedules, and brand aesthetic tone.' },
        { step: '02', title: 'Graphic Creation', desc: 'Designing carousel posts, story graphics, and highlight icon covers.' },
        { step: '03', title: 'Motion Snippets', desc: 'Adding animated text and visual transitions for video reels and ads.' },
        { step: '04', title: 'Editable Templates', desc: 'Delivering editable Canva or Photoshop templates for easy updates.' }
      ],
      techStackTools: ['Canva Pro', 'Photoshop', 'After Effects', 'Figma'],
      guarantees: ['Pixel-Perfect Platform Sizes', 'Editable Master Templates', 'Fast 48-Hour Turnaround'],
      startingPrice: '$299'
    },
    promotion: {
      subtitle: 'Physical & Digital Marketing Collateral, Banners & HTML Emails',
      overview: 'Maximize your campaign ROI with professionally engineered promo materials. Whether you need trade show flyers, billboard displays, digital banners, or custom HTML email templates, we deliver print and web-ready assets.',
      processTimeline: [
        { step: '01', title: 'Copy & Offer Framing', desc: 'Structuring strong headlines, calls to action, and promo discounts.' },
        { step: '02', title: 'High-Res Layout', desc: 'Balancing typography, visual contrast, and high-impact imagery.' },
        { step: '03', title: 'Multi-Format Export', desc: 'Exporting vector PDFs for printers and optimized WebP graphics for web.' },
        { step: '04', title: 'Email Code Sync', desc: 'Coding responsive HTML email templates for Mailchimp, Klaviyo, or HubSpot.' }
      ],
      techStackTools: ['Adobe Photoshop', 'Illustrator', 'HTML5 / CSS3', 'Klaviyo / Mailchimp'],
      guarantees: ['Print-Ready Bleed & Crop Marks', 'Responsive Email Code', 'High Lead Conversion Focus'],
      startingPrice: '$349'
    }
  };

  const details = serviceDetailsMap[service.id] || {
    subtitle: 'Custom Professional Engineering & Design Service',
    overview: service.description,
    processTimeline: [
      { step: '01', title: 'Consultation', desc: 'Understanding your specific project requirements.' },
      { step: '02', title: 'Execution', desc: 'Crafting pixel-perfect designs and clean code.' },
      { step: '03', title: 'Delivery', desc: 'Final review and launch handoff.' }
    ],
    techStackTools: ['Figma', 'React', 'Tailwind CSS', 'Illustrator'],
    guarantees: ['100% Satisfaction Guarantee', 'Fast Turnaround', 'Dedicated Support'],
    startingPrice: '$399'
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative bg-slate-900 border border-white/30 rounded-3xl max-w-3xl w-full text-white shadow-2xl overflow-hidden my-8"
        >
          {/* Top Banner Header */}
          <div className="bg-gradient-to-r from-zinc-900 via-slate-900 to-zinc-900 p-6 sm:p-8 border-b border-slate-800 flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <ServiceIcon serviceId={service.id} size="lg" />
              <div>
                <span className="text-[10px] font-medium uppercase tracking-widest text-white font-['Montserrat'] block mb-1">
                  Service Specifications • Texas WebCoders
                </span>
                <h3 className="text-2xl sm:text-3xl font-medium text-white font-['Montserrat']">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                  {details.subtitle}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content Body */}
          <div className="p-6 sm:p-8 space-y-8 max-h-[70vh] overflow-y-auto">
            {/* Overview */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium uppercase tracking-wider text-white font-['Montserrat'] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-white" />
                <span>Service Overview & Value</span>
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                {details.overview}
              </p>
            </div>

            {/* Key Deliverables & Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h5 className="text-xs font-medium text-white font-['Montserrat'] uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Key Features & Capabilities</span>
                </h5>
                <ul className="space-y-2 text-xs text-slate-300">
                  {service.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h5 className="text-xs font-medium text-white font-['Montserrat'] uppercase tracking-wider flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-white" />
                  <span>Master Deliverables Included</span>
                </h5>
                <ul className="space-y-2 text-xs text-slate-300">
                  {service.deliverables.map((del, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Step-by-Step Execution Timeline */}
            <div className="space-y-3">
              <h4 className="text-xs font-medium uppercase tracking-wider text-white font-['Montserrat'] flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-white" />
                <span>Step-by-Step Delivery Process</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {details.processTimeline.map((item, idx) => (
                  <div key={idx} className="bg-slate-950/90 p-4 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-white font-['Montserrat']">{item.title}</span>
                      <span className="text-[10px] bg-white/10 text-white px-2 py-0.5 rounded font-mono font-medium">
                        Phase {item.step}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack & Guarantees Bar */}
            <div className="bg-gradient-to-r from-zinc-900 via-slate-950 to-zinc-900 p-5 rounded-2xl border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div>
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block mb-1">
                  Technologies & Industry Tools Used
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {details.techStackTools.map((tool, tIdx) => (
                    <span key={tIdx} className="px-2.5 py-1 rounded-md bg-slate-800 text-white text-[11px] font-medium border border-slate-700">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-right sm:text-right w-full sm:w-auto">
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block">
                  Starting Price Investment
                </span>
                <span className="text-2xl font-medium text-white font-['Montserrat']">
                  {details.startingPrice}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="p-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Shield className="w-4 h-4 text-white" />
              <span>Back by 100% Satisfaction & Speed Guarantee</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="px-5 py-3 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 text-xs font-medium uppercase tracking-wider cursor-pointer transition-colors"
              >
                Close
              </button>

              <button
                onClick={() => {
                  onInquire(service);
                  onClose();
                }}
                className="bg-white hover:bg-zinc-200 text-slate-950 font-medium px-6 py-3 rounded-lg text-xs uppercase tracking-wider shadow-lg shadow-white/10 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>Book This Service</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
