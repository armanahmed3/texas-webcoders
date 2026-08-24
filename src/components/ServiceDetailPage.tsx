import React from 'react';
import { ServiceItem } from '../types';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Clock, Wrench, Shield, Sparkles, Phone, MessageSquare, Code2, Layers, Check } from 'lucide-react';
import { ServiceIcon } from './ServiceIcon';
import { SERVICES_LIST } from '../data/portfolioData';

interface ServiceDetailPageProps {
  service: ServiceItem;
  onBack: () => void;
  onInquire: (service: ServiceItem) => void;
  onNavigateSlide: (slideIndex: number) => void;
  onSelectServiceDetail: (service: ServiceItem) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  onBack,
  onInquire,
  onNavigateSlide,
  onSelectServiceDetail
}) => {
  // Deep service architectural specifications
  const serviceDetailsMap: Record<string, {
    subtitle: string;
    overview: string;
    processTimeline: { step: string; title: string; desc: string }[];
    techStackTools: string[];
    guarantees: string[];
    startingPrice: string;
  }> = {
    custom_web_dev: {
      subtitle: 'Sub-0.3s TTFB Edge Web Applications & Multi-Tenant SaaS Architecture',
      overview: 'We architect and engineer bespoke, conversion-optimized web applications with React 19, Next.js 15, Vite, and Tailwind CSS. Backed by global CDN edge execution, 3D WebGL motion physics, and structured Schema.org data, our web solutions command top search rankings in Tyler and nationwide.',
      processTimeline: [
        { step: '01', title: 'System Architecture & Wireframes', desc: 'Defining data schemas, conversion funnels, API routes, and Google Core Web Vitals targets.' },
        { step: '02', title: 'Interactive UI & Motion Prototyping', desc: 'Crafting responsive high-fidelity Figma components, dark mode UI, and 3D WebGL canvas motion.' },
        { step: '03', title: 'Full-Stack TypeScript Engineering', desc: 'Writing modular, zero-bloat code with edge serverless execution, SSR, and Redis micro-caching.' },
        { step: '04', title: 'Cloud Launch & Performance Audit', desc: 'Executing 100/100 Lighthouse audits, W3C validation, SSL encryption, and global CDN deployment.' }
      ],
      techStackTools: ['React 19', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'Vite', 'Three.js / WebGL', 'PostgreSQL', 'Cloudflare Edge'],
      guarantees: ['100/100 Google Core Web Vitals', 'Sub-0.3s Average Page Speed', '100% Full IP Code Transfer', 'Free 2 Months SLA & Hosting'],
      startingPrice: '$599'
    },
    custom_software_crm: {
      subtitle: 'Enterprise Workflow Systems, Multi-Tenant Databases & ERP Integration',
      overview: 'We engineer proprietary business automation software, automated billing engines, customer intake pipelines, and custom ERP platforms designed to eliminate recurring monthly SaaS licensing fees and unify operations.',
      processTimeline: [
        { step: '01', title: 'Workflow & Process Discovery', desc: 'Analyzing operational bottlenecks, manual spreadsheet processes, and legacy software pain points.' },
        { step: '02', title: 'Relational Database Design', desc: 'Structuring high-concurrency PostgreSQL schemas, role-based access control (RBAC), and API hooks.' },
        { step: '03', title: 'Custom Portal Development', desc: 'Engineering executive KPI dashboards, real-time WebSocket notifications, and automated invoicing.' },
        { step: '04', title: 'Enterprise Training & SLA Handoff', desc: 'Staff onboarding, automated backup testing, security hardening, and dedicated ongoing support.' }
      ],
      techStackTools: ['Node.js', 'PostgreSQL', 'Fastify / Express', 'React', 'Docker', 'Redis', 'QuickBooks API', 'Zapier Webhooks'],
      guarantees: ['Zero Monthly Per-Seat Licensing Fees', '99.99% Uptime SLA Architecture', 'Granular Role-Based Access Control', 'Automated Daily Cloud Backups'],
      startingPrice: '$1,499'
    },
    mobile_app_dev: {
      subtitle: 'Native 120Hz React Native & Cross-Platform iOS / Android Systems',
      overview: 'We build ultra-fast, smooth mobile applications using React Native with the Fabric C++ rendering engine and Swift/Kotlin native modules. Designed for high conversion, offline functionality, and seamless App Store / Google Play approval.',
      processTimeline: [
        { step: '01', title: 'UX Flow & Touch Mapping', desc: 'Wireframing user journeys, gesture interactions, bottom sheets, and biometric authentication.' },
        { step: '02', title: 'Design System & Micro-Motion', desc: 'Designing 120 FPS fluid micro-animations, dark mode palettes, and responsive screen layouts.' },
        { step: '03', title: 'Cross-Platform App Development', desc: 'Connecting native device sensors, camera/storage APIs, offline SQLite caching, and WebSockets.' },
        { step: '04', title: 'App Store Submission & QA', desc: 'Managing Apple App Store Review, Google Play Store compliance, and push notification servers.' }
      ],
      techStackTools: ['React Native (Fabric)', 'TypeScript', 'Expo Application Services', 'SwiftUI', 'Kotlin', 'SQLite / Realm', 'Firebase / APNs'],
      guarantees: ['Apple & Google Store Guaranteed Approval', '120 FPS Fluid Native UI', 'Offline Data Caching Support', 'Biometric Security Standards'],
      startingPrice: '$1,299'
    },
    wordpress_headless: {
      subtitle: 'High-Performance WordPress, Custom Gutenberg Blocks & Headless CMS',
      overview: 'Enterprise WordPress engineering with bespoke Gutenberg block suites, zero heavy third-party page builders, and headless REST/GraphQL endpoints connected to high-speed React frontends.',
      processTimeline: [
        { step: '01', title: 'Information Architecture', desc: 'Custom post type definitions, tax-exempt rules, and content taxonomy planning.' },
        { step: '02', title: 'Custom Block Suite Design', desc: 'Developing tailor-made native Gutenberg blocks that give clients effortless content editing.' },
        { step: '03', title: 'Speed & Security Hardening', desc: 'Nginx micro-caching, Redis object cache, brute force shielding, and SSL encryption.' },
        { step: '04', title: 'Content Migration & Launch', desc: 'Zero-downtime DNS cutover, database sanitation, and white-label client training videos.' }
      ],
      techStackTools: ['WordPress Core', 'Custom Gutenberg (React)', 'PHP 8.3', 'MySQL / MariaDB', 'Redis Cache', 'WPGraphQL', 'WooCommerce'],
      guarantees: ['Sub-0.4s Cached Response Time', 'Zero Slow Page Builder Bloat', 'Daily Automated Cloud Backups', 'Easy Non-Technical Editor UI'],
      startingPrice: '$499'
    },
    video_3d_animation: {
      subtitle: 'Cinema 4K 60FPS Product Reveals, Mechanical Visualizations & Ray-Tracing',
      overview: 'Photorealistic 3D product animations, exploded-view mechanical breakdowns, architectural fly-throughs, and cinematic commercial video created with Blender, Cinema 4D, and Unreal Engine 5.4.',
      processTimeline: [
        { step: '01', title: 'Storyboarding & CAD Import', desc: 'Scripting visual beats, camera trajectories, and importing precision STEP/OBJ CAD models.' },
        { step: '02', title: 'PBR Texturing & HDR Lighting', desc: 'Creating physically accurate metallic, glass, and fabric materials with studio lighting setups.' },
        { step: '03', title: '4K Ray-Traced Rendering', desc: 'High-speed GPU cluster rendering with motion blur, depth of field, and camera physics.' },
        { step: '04', title: 'Sound Design & Master Delivery', desc: 'Spatial 5.1 sound effects, musical score mixing, color grading, and multi-format exports.' }
      ],
      techStackTools: ['Blender 4.2', 'Cinema 4D', 'Unreal Engine 5.4', 'Octane / Redshift', 'Adobe After Effects', 'DaVinci Resolve'],
      guarantees: ['4K 60FPS ProRes & MP4 Master Files', '100% Commercial Broadcast Rights', 'Multi-Ratio Cuts (16:9, 9:16, 1:1)', 'High Precision CAD Accuracy'],
      startingPrice: '$699'
    },
    graphic_designing: {
      subtitle: 'Vector Logo Suites, Master Brand Identity Books & Promotional Collateral',
      overview: 'Bespoke corporate identity design, mathematical vector logos, comprehensive PDF brand books, and high-impact marketing collateral engineered to command market authority.',
      processTimeline: [
        { step: '01', title: 'Brand Archetype Discovery', desc: 'Analyzing target market demographics, industry visual whitespace, and brand core values.' },
        { step: '02', title: 'Vector Mark Sculpting', desc: 'Designing 4 to 6 unique vector concepts with typography pairings and color theory.' },
        { step: '03', title: 'Brand Book & Stationery', desc: 'Creating business cards, letterheads, packaging, and digital social media kits.' },
        { step: '04', title: 'Master Production Handoff', desc: 'Delivering full print-ready AI, EPS, SVG, PDF, and RGB/CMYK master source files.' }
      ],
      techStackTools: ['Adobe Illustrator', 'Photoshop', 'InDesign', 'Figma', 'Pantone Color Bridge'],
      guarantees: ['100% Vector Scalability (Infinite DPI)', 'Full Trademark & Copyright IP Ownership', 'Print-Ready 300DPI Bleed Formats', 'Complete Master Brand Guidelines'],
      startingPrice: '$299'
    }
  };

  const details = serviceDetailsMap[service.id] || {
    subtitle: 'Custom High-Performance Digital Engineering & Design Solution',
    overview: service.description,
    processTimeline: [
      { step: '01', title: 'Discovery & Planning', desc: 'Detailed analysis of business logic, goals, and technical requirements.' },
      { step: '02', title: 'Design & Prototyping', desc: 'Interactive visual mockups and architectural blueprints.' },
      { step: '03', title: 'Engineering & QA', desc: 'Clean, modular implementation with rigorous performance testing.' },
      { step: '04', title: 'Deployment & SLA', desc: 'Zero-downtime production deployment and dedicated client support.' }
    ],
    techStackTools: ['React 19', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Figma'],
    guarantees: ['100% Satisfaction Guarantee', 'Full IP Code Transfer', 'Sub-0.5s Performance Target', 'Dedicated Post-Launch Warranty'],
    startingPrice: '$399'
  };

  // Other services for bottom navigation
  const otherServices = SERVICES_LIST.filter(s => s.id !== service.id);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-['Montserrat'] pb-24 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Sticky-Style Breadcrumb Navigation */}
        <div className="flex items-center justify-between py-6 border-b border-zinc-800 mb-10">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-300 hover:text-white transition-colors cursor-pointer bg-zinc-900 border border-zinc-800 hover:border-zinc-500 px-4 py-2.5 rounded-xl shadow-md group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-white" />
            <span>Back to All Services</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg">
              Texas WebCoders Engineering
            </span>
          </div>
        </div>

        {/* Hero Section of Service Detail */}
        <div className="relative rounded-3xl bg-zinc-950 border border-zinc-800 p-6 sm:p-10 lg:p-12 overflow-hidden mb-12 shadow-2xl">
          {/* Subtle Ambient Light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-700 shadow-lg flex items-center justify-center text-white">
                  <ServiceIcon serviceId={service.id} size="lg" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                    Enterprise Capability • Texas WebCoders
                  </span>
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase mt-1">
                    {service.title}
                  </h1>
                </div>
              </div>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl mb-6">
                {details.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    onInquire(service);
                    onNavigateSlide(9);
                  }}
                  className="px-6 py-3.5 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-xl flex items-center gap-2 cursor-pointer"
                >
                  <span>Inquire For This Service</span>
                  <ArrowUpRight className="w-4 h-4 text-black" />
                </button>

                <button
                  onClick={() => onNavigateSlide(4)}
                  className="px-6 py-3.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-bold text-xs uppercase tracking-wider hover:bg-zinc-800 hover:border-white transition-all shadow-md cursor-pointer"
                >
                  View Pricing Packages
                </button>
              </div>
            </div>

            {/* Investment & Quick Specs Box */}
            <div className="w-full lg:w-80 bg-black border border-zinc-800 p-6 rounded-2xl space-y-4 shadow-xl flex-shrink-0">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block font-mono">
                Investment Tier
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                  Starting at {details.startingPrice}
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Custom scoped based on project complexity, integrations, and performance SLAs.
              </p>
              <div className="pt-3 border-t border-zinc-800 space-y-2">
                {details.guarantees.slice(0, 3).map((g, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                    <Check className="w-3.5 h-3.5 text-white flex-shrink-0" />
                    <span>{g}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Overview & Architectural Value */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 bg-zinc-950 border border-zinc-800 p-6 sm:p-8 rounded-3xl space-y-4 shadow-xl">
            <h2 className="text-lg sm:text-xl font-bold uppercase text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-white" />
              <span>Architectural Overview & Engineering Standard</span>
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {details.overview}
            </p>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed pt-2">
              Every system built by Texas WebCoders comes with full source code transfer, zero proprietary vendor lock-in, and strict performance audits meeting modern enterprise standards.
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 p-6 sm:p-8 rounded-3xl space-y-4 shadow-xl">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">
              Technologies & Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {details.techStackTools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-semibold text-white font-mono"
                >
                  {tool}
                </span>
              ))}
            </div>
            <div className="pt-4 border-t border-zinc-800">
              <span className="text-xs text-zinc-400 block mb-1">Deployment Target</span>
              <span className="text-sm font-bold text-white">Global Edge CDN / Cloud Native</span>
            </div>
          </div>
        </div>

        {/* Section 2: Features & Deliverables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Key Capabilities */}
          <div className="bg-zinc-950 border border-zinc-800 p-6 sm:p-8 rounded-3xl space-y-5 shadow-xl">
            <h3 className="text-base sm:text-lg font-bold uppercase text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-white" />
              <span>Key Features & Engineering Capabilities</span>
            </h3>
            <ul className="space-y-3">
              {service.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                  <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Master Deliverables */}
          <div className="bg-zinc-950 border border-zinc-800 p-6 sm:p-8 rounded-3xl space-y-5 shadow-xl">
            <h3 className="text-base sm:text-lg font-bold uppercase text-white flex items-center gap-2">
              <Wrench className="w-5 h-5 text-white" />
              <span>Master Deliverables Included in Scope</span>
            </h3>
            <ul className="space-y-3">
              {service.deliverables.map((del, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                  <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                  <span>{del}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 3: Step-by-Step Delivery Roadmap */}
        <div className="bg-zinc-950 border border-zinc-800 p-6 sm:p-10 rounded-3xl space-y-8 mb-12 shadow-xl">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block mb-1 font-mono">
              End-to-End Execution Process
            </span>
            <h3 className="text-xl sm:text-3xl font-extrabold uppercase text-white">
              Step-by-Step Delivery Roadmap
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {details.processTimeline.map((item, idx) => (
              <div
                key={idx}
                className="bg-black border border-zinc-800 p-5 rounded-2xl space-y-3 hover:border-zinc-500 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 text-white">
                    Phase {item.step}
                  </span>
                  <Clock className="w-4 h-4 text-zinc-500" />
                </div>
                <h4 className="text-sm font-bold text-white uppercase">
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Explore Other Services */}
        <div className="mb-16">
          <h3 className="text-lg font-bold uppercase text-white mb-6">
            Explore Other Engineering Disciplines
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherServices.slice(0, 3).map((srv) => (
              <div
                key={srv.id}
                onClick={() => {
                  onSelectServiceDetail(srv);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-zinc-950 border border-zinc-800 p-5 rounded-2xl hover:border-white transition-all cursor-pointer group flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white">
                    <ServiceIcon serviceId={srv.id} size="sm" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-zinc-200 transition-colors">
                      {srv.title}
                    </h4>
                    <span className="text-[10px] text-zinc-400 font-mono">View Full Specifications →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-white/20 p-8 sm:p-12 rounded-3xl text-center space-y-6 shadow-2xl">
          <h3 className="text-2xl sm:text-4xl font-extrabold uppercase text-white max-w-2xl mx-auto leading-tight">
            Ready to Build Your Custom {service.title}?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Speak directly with our technical team. We provide full architectural roadmaps, milestone breakdown estimates, and guaranteed turnaround timelines.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                onInquire(service);
                onNavigateSlide(9);
              }}
              className="px-8 py-4 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-2xl flex items-center gap-2 cursor-pointer"
            >
              <span>Get Free Architectural Consultation</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </button>
            <a
              href="tel:9032514808"
              className="px-8 py-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-bold text-xs uppercase tracking-wider hover:bg-zinc-800 hover:border-white transition-all shadow-md inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>Call (903) 251-4808</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
