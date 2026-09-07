import { PortfolioProject, PricingPackage, ProcessStep, ServiceItem, Testimonial, TechStackCategory } from '../types';

import { WEBSITE_PROJECTS } from './categories/websiteProjects';
import { WORDPRESS_PROJECTS } from './categories/wordpressProjects';
import { VIDEO_ANIMATION_PROJECTS } from './categories/videoAnimationProjects';
import { MOBILE_APP_PROJECTS } from './categories/mobileAppProjects';
import { SOFTWARE_CRM_PROJECTS } from './categories/softwareCrmProjects';
import { GRAPHIC_DESIGN_PROJECTS } from './categories/graphicDesignProjects';
import { UI_UX_PROJECTS } from './categories/uiUxProjects';
import { ECOMMERCE_PROJECTS } from './categories/ecommerceProjects';

// Combine all authentic categories directly backed by portfolio files
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  ...WEBSITE_PROJECTS,
  ...WORDPRESS_PROJECTS,
  ...ECOMMERCE_PROJECTS,
  ...UI_UX_PROJECTS,
  ...VIDEO_ANIMATION_PROJECTS,
  ...MOBILE_APP_PROJECTS,
  ...SOFTWARE_CRM_PROJECTS,
  ...GRAPHIC_DESIGN_PROJECTS
];

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: 'starter_website',
    name: 'Starter Custom Website',
    price: 499,
    originalPrice: 799,
    category: 'website',
    popular: false,
    description: 'Perfect for East Texas small businesses, local services, and medical/legal practices wanting an ultra-fast custom website.',
    features: [
      'Up to 5 Custom Responsive Pages',
      'Local SEO & Google Maps Setup',
      'Sub-0.5s Load Speed Optimization',
      'SSL Security & Contact Inquiry Forms',
      '100% Full Code & Domain Ownership',
      'Rapid 7-Day Turnaround'
    ]
  },
  {
    id: 'pro_business_portal',
    name: 'Professional Business & App Portal',
    price: 999,
    originalPrice: 1499,
    category: 'website',
    popular: true,
    description: 'Our most popular package for growing Texas companies needing custom client portals, automated booking, and advanced SEO.',
    features: [
      'Up to 10+ Custom Dynamic Pages & Portals',
      'Interactive 3D WebGL / Framer Animations',
      'Online Appointment & Booking Scheduler',
      'Custom Client Quote Estimator Tool',
      'Advanced On-Page & Technical SEO Suite',
      'Sub-0.3s Fast TTFB Cloud CDN',
      '30 Days Free Post-Launch Support'
    ]
  },
  {
    id: 'enterprise_software',
    name: 'Enterprise Full-Stack & App Suite',
    price: 1999,
    originalPrice: 2999,
    category: 'ecommerce',
    popular: false,
    description: 'Comprehensive software engineering for high-volume enterprises, SaaS platforms, native iOS/Android mobile apps, and CRMs.',
    features: [
      'Full-Stack Custom Web & Mobile Application',
      'PostgreSQL / Firebase Real-Time Database',
      'Role-Based Staff & Client Portals',
      'Automated Invoicing & Stripe Payment Gateway',
      'Dedicated Texas Engineering Lead',
      'Full IP Transfer & GitHub Repository'
    ]
  }
];

export const LOGO_PACKAGES: PricingPackage[] = [
  {
    id: 'starter_logo',
    name: 'Essential Identity & Vector Mark',
    price: 199,
    originalPrice: 349,
    category: 'logo',
    popular: false,
    description: 'Crisp vector logo mark and essential typography identity for new businesses and startups.',
    features: [
      '3 Unique Custom Logo Concepts',
      '100% Scalable Vector Master Files (AI, EPS, SVG, PNG)',
      'Full Color, Monochrome & Inverted Versions',
      'Social Media Avatar & Favicon Formats',
      'Full Commercial & Trademark IP Ownership'
    ]
  },
  {
    id: 'pro_brand_identity',
    name: 'Complete Corporate Brand Suite',
    price: 449,
    originalPrice: 799,
    category: 'logo',
    popular: true,
    description: 'Comprehensive corporate identity package with full brand style guide, business collateral, and stationery.',
    features: [
      '6 Bespoke Custom Logo Concepts',
      'Comprehensive 30-Page Brand Style Manual',
      'Print-Ready Business Cards & Letterhead Kit',
      'Social Media Branding & Cover Banner Suite',
      '3D Realistic Photorealistic Mockups',
      'Unlimited Fine-Tuning Revisions'
    ]
  },
  {
    id: 'enterprise_brand_system',
    name: 'Enterprise 3D & Dynamic Identity',
    price: 899,
    originalPrice: 1499,
    category: 'logo',
    popular: false,
    description: 'Full-scale enterprise identity engineering with animated 3D logo reveal, motion guidelines, and packaging design.',
    features: [
      'Unlimited Concept Exploration',
      '4K 3D Motion Animated Logo Reveal Video',
      'Complete Packaging & Retail Merch Design',
      'Full Vector Sub-Brand & Division Architecture',
      'Dedicated Art Director & Fast 48hr Turnaround'
    ]
  }
];

export const ECOMMERCE_PACKAGES: PricingPackage[] = [
  {
    id: 'starter_store',
    name: 'Boutique Storefront',
    price: 799,
    originalPrice: 1299,
    category: 'ecommerce',
    popular: false,
    description: 'High-converting custom store for boutique retail and local merchants.',
    features: [
      'Shopify Plus or Custom Headless Architecture',
      'Up to 50 Product Listings & Variation Matrix',
      'Stripe, Apple Pay & Google Pay Express Checkout',
      'Automated Order & Shipping Email Notification',
      '100% Mobile Optimized Shopping Experience'
    ]
  },
  {
    id: 'pro_ecommerce_growth',
    name: 'Omnichannel Commerce Engine',
    price: 1499,
    originalPrice: 2299,
    category: 'ecommerce',
    popular: true,
    description: 'Scale your retail sales with abandoned cart recovery, product reviews, custom filters, and 3D previews.',
    features: [
      'Unlimited Product Catalog Support',
      '3D Interactive Product Orbit / Zoom View',
      'Automated Abandoned Cart & Upsell Engine',
      'QuickBooks / ERP Inventory Sync',
      'Multi-Currency & Tax Auto-Calculation',
      'Sub-0.4s Fast Checkout Speed'
    ]
  },
  {
    id: 'enterprise_custom_commerce',
    name: 'Headless Global Marketplace',
    price: 2899,
    originalPrice: 4499,
    category: 'ecommerce',
    popular: false,
    description: 'High-volume custom marketplace with multi-vendor portals, automated split payouts, and real-time ERP integration.',
    features: [
      'Custom React 19 / Next.js Headless Architecture',
      'Multi-Vendor Dashboard & Commission Engine',
      'Custom Subscription & Recurring Billing Flows',
      'Enterprise Redis Caching & Global CDN',
      'Dedicated SLA Support & Security Hardening'
    ]
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: 1,
    title: 'Discovery',
    shortDesc: 'Strategic discovery and roadmap.',
    fullDesc: 'We analyze your business requirements, competitors, customer demographics, and technical architecture to build a guaranteed milestone roadmap.',
    iconName: 'Compass',
    deliverables: ['Discovery Brief', 'Architecture Blueprint', 'Fixed Price Quote', 'Project Timeline'],
    duration: 'Day 1'
  },
  {
    number: 2,
    title: 'UI/UX Design',
    shortDesc: 'Wireframes and interactive prototyping.',
    fullDesc: 'Our design team crafts responsive Figma wireframes and interactive prototypes with custom typography, 3D assets, and branded color palettes.',
    iconName: 'Palette',
    deliverables: ['Figma High-Fidelity Prototype', 'Design System Library', 'Mobile & Desktop Views', 'Design Review'],
    duration: 'Days 2-3'
  },
  {
    number: 3,
    title: 'Engineering',
    shortDesc: 'Full-stack development & testing.',
    fullDesc: 'We write clean, high-performance TypeScript code using React 19, Next.js, Node.js, and PostgreSQL with automated unit tests and sub-second edge deployment.',
    iconName: 'Code2',
    deliverables: ['Production Web & App Code', 'API Integrations', 'Local SEO & Schema Setup', 'Staging Link Access'],
    duration: 'Days 4-6'
  },
  {
    number: 4,
    title: 'Launch & Scale',
    shortDesc: 'Deployment, training & support.',
    fullDesc: 'We push your project live to production with SSL security, Google Maps optimization, Google Search Console indexing, and 30 days of complimentary support.',
    iconName: 'Rocket',
    deliverables: ['Live Cloud Deployment', 'Google Search Indexing', 'CMS Video Tutorial', '30-Day Warranty'],
    duration: 'Day 7'
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'custom_web_dev',
    title: 'Custom Web Application & High-Performance SaaS',
    description: 'Ultra-fast, conversion-optimized web applications and SaaS platforms engineered with React 19, Next.js 15, Vite, and Tailwind CSS. Built with sub-0.3s TTFB load speed to outrank competitors in Texas and regional search.',
    icon: '🌐',
    features: [
      'Sub-0.3s Page Load Speed & 100/100 Google Core Web Vitals',
      'Full-Stack Edge Serverless Architecture & Global Cloud CDN',
      'Texas Entity SEO, Schema.org & Google SGE Search Domination',
      'Interactive 3D WebGL / Framer Motion Physics Animations',
      'Encrypted REST & GraphQL Microservices Integration',
      '100% Full IP Code Transfer & GitHub Repository Ownership'
    ],
    deliverables: ['Custom Source Code & Git Repo', 'Production Edge Deployment', 'SEO Audit & Schema Setup', 'Admin CMS Dashboard'],
    imageUrl: '/portfolio-media/texaswebcoders/Website/website_solex_sneaker_store.png'
  },
  {
    id: 'custom_software_crm',
    title: 'Enterprise Custom Software, CRM & ERP Systems',
    description: 'Proprietary enterprise workflow systems, automated quoting engines, multi-tenant databases, and custom ERP platforms designed to eliminate SaaS licensing fees and streamline East Texas operations.',
    icon: '💻',
    features: [
      'PostgreSQL & Cloud Run Serverless Relational Architecture',
      'Granular Role-Based Access Control (Admin, Manager, Staff, Client)',
      'Automated Invoicing, Payment Rails & Multi-Currency Processing',
      'Real-Time WebSocket Analytics & Executive KPI Dashboards',
      'Bi-Directional ERP, QuickBooks, SAP & Zapier Integrations',
      'Continuous Automated Backups & 99.99% Uptime SLA'
    ],
    deliverables: ['Enterprise Software Platform', 'PostgreSQL Schema & Migrations', 'Staff Onboarding & Training', 'Annual SLA Warranty'],
    imageUrl: '/portfolio-media/texaswebcoders/software/software_crm_nexora_sales_pipeline.png'
  },
  {
    id: 'mobile_app_dev',
    title: 'iOS & Android Native & Cross-Platform Mobile Apps',
    description: 'End-to-end mobile app engineering using React Native (120Hz Fabric Architecture) and Swift/Kotlin. Ultra-smooth mobile experiences ready for App Store and Google Play publication.',
    icon: '📱',
    features: [
      'Cross-Platform 120 FPS iOS & Android Single Codebase',
      'Instant Push Notifications & Real-Time Socket Messaging',
      'Offline Data Synchronization with Local SQLite / Realm Caching',
      'Biometric FaceID / TouchID Secure Authentication',
      'Apple Pay, Google Pay & In-App Subscription Management',
      'Complete App Store Review & Google Play Release Management'
    ],
    deliverables: ['Production iOS & Android Builds', 'Store Screenshots & Metadata', 'Backend API Infrastructure', 'Developer Documentation'],
    imageUrl: '/portfolio-media/texaswebcoders/app/mobile_app_dentacare_clinic.png'
  },
  {
    id: 'wordpress_headless',
    title: 'WordPress & Headless CMS Engineering',
    description: 'Enterprise WordPress engineering, custom Gutenberg block systems, headless CMS architectures, and high-security WooCommerce store development built for maximum speed and editorial ease.',
    icon: '📦',
    features: [
      'Bespoke Custom Gutenberg Blocks with Zero Heavy Page Builders',
      'Headless WordPress API Linked to Next.js / React Frontends',
      'Enterprise Speed Optimization with Redis & Nginx Micro-Caching',
      'Multi-Tier Security Hardening & Automated Vulnerability Scanning',
      'Seamless Data Migration from Legacy CMS Systems',
      'Intuitive White-Label Client Editorial Dashboard'
    ],
    deliverables: ['Custom WordPress Theme', 'Block Design System', 'Speed Optimization Suite', 'Editor Video Training'],
    imageUrl: '/portfolio-media/texaswebcoders/wordpress/wp_furnicasa_modern_furniture.png'
  },
  {
    id: 'video_3d_animation',
    title: '3D Ray-Traced Animation & Cinema Motion Graphics',
    description: 'Cinema-grade 4K 60FPS product reveals, exploded-view mechanical animations, architectural fly-throughs, and photorealistic CGI created with Blender, Cinema 4D, and Unreal Engine 5.4.',
    icon: '🎬',
    features: [
      '4K 60FPS Ray-Traced 3D Photorealistic Product Reveals',
      'Detailed Exploded-View Mechanical Engineering Visualizations',
      'Cinematic Architectural Fly-Throughs & Aerial Sequences',
      'Physically Based Rendering (PBR) Materials & HDR Lighting',
      'Spatial 5.1 Surround Sound Design & Custom Orchestration',
      'Multi-Platform Aspect Ratios (16:9 Cinema, 9:16 Social, 1:1)'
    ],
    deliverables: ['4K ProRes & MP4 Master Files', 'Social Media Variations', 'Raw 3D Project Assets', 'Commercial Broadcast License'],
    videoUrl: '/portfolio-media/texaswebcoders/animation/animation1.mp4'
  },
  {
    id: 'interior_exterior_renders',
    title: '3D Architectural Visualizations, BIM & Floor Plans',
    description: 'Photorealistic 8K architectural renderings, interior design staging, exterior commercial visualizations, and interactive 3D floor plans for real estate developers and general contractors.',
    icon: '📐',
    features: [
      '8K Ultra-High Definition Exterior & Interior Renders',
      'Day/Night & Dynamic Seasonal Environmental Lighting',
      'Accurate Material & Finish Representation from CAD/BIM',
      'Interactive 3D Virtual Tour & Panoramas (360° VR)',
      'Drone Photo-Matching & Exact Geographic Compositing',
      'Fast Turnaround for Commercial Real Estate Presentations'
    ],
    deliverables: ['8K Still Render Package', '360° Virtual Tour Link', 'Print-Ready Pitch Deck Graphics', 'BIM Asset Library'],
    imageUrl: '/portfolio-media/texaswebcoders/interior/interiorexterior3drendersfloorplans1.jpg'
  },
  {
    id: 'ui_ux_product_design',
    title: 'UI/UX Product Design & Scalable Design Systems',
    description: 'Human-centered user experience design, comprehensive Figma design systems, interactive prototypes, and conversion rate optimization (CRO) backed by user testing and cognitive psychology.',
    icon: '🎨',
    features: [
      'Full End-to-End User Journey Mapping & Information Architecture',
      'Atomic Design Systems with Documented Components & Tokens',
      'Interactive Clickable High-Fidelity Figma Prototypes',
      'Usability Testing, Heatmap Analysis & User Interviews',
      'Accessibility Standards Compliance (WCAG 2.1 AA)',
      'Direct Developer Handoff with Clean CSS & React Specs'
    ],
    deliverables: ['Figma Master UI Kit', 'Design Token Library', 'User Flow Specifications', 'Interactive Prototype'],
    imageUrl: '/portfolio-media/texaswebcoders/Website/3.png'
  },
  {
    id: 'graphic_design',
    title: 'Graphic Design, Corporate Stationery & Packaging',
    description: 'Master-grade brand identity collateral, luxury hot foil stationery, custom packaging carton dielines, 80-page brand manuals, vehicle fleet wraps, and large-format exhibition booths.',
    icon: '✒️',
    features: [
      'Luxury Cotton Stock Hot-Foil & Embossed Stationery Suites',
      'Exhaustive 80-Page Corporate Brand Identity Standards Manuals',
      'Custom Structural Packaging Dielines with Spot UV & Foil Finishes',
      'Large-Format 3M Commercial Fleet Vehicle Livery & SEG Trade Booths',
      'Print-Ready 300+ DPI Pantone Spot Color Pre-Press Vector Separations',
      'Editorial Magazines, Annual ESG Reports & Michelin Dining Menus'
    ],
    deliverables: ['Vector Master Dielines', 'Pantone Color Formulas', 'Print Press Ready PDFs', '3D Packaging Mockups'],
    imageUrl: '/portfolio-media/texaswebcoders/Graphic/13graphic.jpg'
  },
  {
    id: 'headless_ecommerce',
    title: 'Headless E-Commerce & Multi-Vendor Marketplaces',
    description: 'High-converting custom digital storefronts and marketplace engines powered by Next.js, Shopify Plus, and Stripe Connect. Engineered for sub-400ms checkouts and maximum order value.',
    icon: '🛍️',
    features: [
      'Headless Next.js Storefront with Instant Page Transitions',
      'Stripe Custom Connect Split Multi-Party Payouts',
      'Dynamic 3D Product Configurator & Interactive AR Previews',
      'Automated Abandoned Cart Recovery & One-Click Upsells',
      'Real-Time ERP, Warehouse & Inventory Synchronization',
      'Global Multi-Currency, Multi-Language & Tax Calculation'
    ],
    deliverables: ['Headless Storefront Code', 'Stripe Connect Dashboard', 'Inventory Integration Bridge', 'Analytics & Pixel Setup'],
    imageUrl: '/portfolio-media/texaswebcoders/Website/4.png'
  },
  {
    id: 'local_seo_growth',
    title: 'Texas Local SEO & Google Maps Domination',
    description: 'Dominate Google search results and Google Maps across Texas and regional markets. We engineer semantic schema markup, Google Business Profile authority, and speed optimization for maximum phone calls.',
    icon: '🚀',
    features: [
      'Google Business Profile Geo-Optimized Citation Matrix',
      'High-Intent Local Keyword Strategy (East Texas, Dallas, Austin)',
      'Rich Snippet & LocalBusiness JSON-LD Schema Structuring',
      'Top-Tier High-Authority Texas Business Directory Citations',
      'Core Web Vitals Speed Tuning (<0.3s Server Response)',
      'Monthly Ranking, Call Volume & Organic Revenue Tracking'
    ],
    deliverables: ['Google Maps Top 3 Plan', 'Citation Audit Report', 'On-Page SEO Execution', 'Monthly Executive Report'],
    imageUrl: '/portfolio-media/texaswebcoders/Website/5.png'
  },
  {
    id: 'cloud_devops_security',
    title: 'Cloud DevOps, Zero-Trust Cybersecurity & Compliance',
    description: 'Enterprise cloud infrastructure, automated Docker/Kubernetes CI/CD deployment pipelines, penetration testing, and HIPAA / SOC2 Type II regulatory security compliance.',
    icon: '🛡️',
    features: [
      'Google Cloud Run, AWS & Kubernetes Auto-Scaling Setup',
      'Automated Zero-Downtime CI/CD Pipelines (GitHub Actions)',
      'Zero-Trust Network Architecture & Cloudflare DDoS Shield',
      'Comprehensive Vulnerability Audits & Penetration Testing',
      'HIPAA, BAA & SOC2 Type II Compliance Architecture',
      '24/7 Uptime Monitoring, Threat Detection & Instant Alerts'
    ],
    deliverables: ['Infrastructure as Code (Terraform)', 'CI/CD Pipeline Suite', 'Security Audit Certificate', '24/7 Monitoring Dashboard'],
    imageUrl: '/portfolio-media/texaswebcoders/software/Software and CRM Development3.jpg'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test_1',
    name: 'Sophia Lauren',
    role: 'Co-Founder & Head of Product',
    company: 'Aura Health & Wellness',
    location: 'Austin, TX',
    rating: 5.0,
    metrics: '+320% User Signups • 0.3s Load',
    budget: '$22,000',
    category: 'Website Development',
    verified: true,
    avatar: '/assets/testimonials/client_avatar_1.png',
    comment: 'Texas WebCoders rebuilt our client booking application and digital platform from scratch. The interface is lightning fast, sleek, and conversion rates jumped by 320% within the first two months. Their team is communicative, transparent, and incredibly skilled.',
    projectType: 'Custom Web Application & Booking Platform',
    year: '2025'
  },
  {
    id: 'test_2',
    name: 'Dr. Charlotte Sterling',
    role: 'Managing Director & Strategic CIO',
    company: 'Sterling & Crown Global Capital',
    location: 'Dallas, TX',
    rating: 5.0,
    metrics: '<0.3s TTFB • $1M+ Processed',
    budget: '$35,000',
    category: 'Software & CRM',
    verified: true,
    avatar: '/assets/testimonials/client_avatar_2.png',
    comment: 'We needed an enterprise-grade financial management portal with zero latency and strict security compliance. Texas WebCoders delivered ahead of deadline. The real-time database architecture and automated reporting tools have saved our team hundreds of hours.',
    projectType: 'Fintech Client Portal & Security Dashboard',
    year: '2025'
  },
  {
    id: 'test_4',
    name: 'Emma Richardson',
    role: 'Creative Director',
    company: 'Monarch Publishing House',
    location: 'New York, NY',
    rating: 5.0,
    metrics: '15,000+ Book Sales • Top 10 Bestseller',
    budget: '$14,500',
    category: 'Graphic Designing',
    verified: true,
    avatar: '/assets/testimonials/client_avatar_4.png',
    comment: 'The graphic design suite, brand identity guidelines, and book covers crafted by Texas WebCoders were absolutely stunning. Their eye for modern typography and visual storytelling created instant bestsellers.',
    projectType: 'Brand Identity, Typography & Cover Suite',
    year: '2025'
  },
  {
    id: 'test_6',
    name: 'Elena Rostova',
    role: 'Founder & Creative Director',
    company: 'Luxe Design Studio',
    location: 'Fort Worth, TX',
    rating: 4.0,
    metrics: '45h/wk Saved • 99.9% Cloud Uptime',
    budget: '$40,000',
    category: 'Software & CRM',
    verified: true,
    avatar: '/assets/testimonials/client_avatar_6.png',
    comment: 'The custom logistics CRM and dispatch engine handles complex operations effortlessly. Excellent technical execution on automated workflow dispatch, tracking metrics, and inventory pipelines.',
    projectType: 'Logistics CRM & Fleet Dispatch Engine',
    year: '2025'
  },
  {
    id: 'test_7',
    name: 'Sarah Kensington',
    role: 'Managing Partner',
    company: 'Kensington Financial Advisory',
    location: 'Chicago, IL',
    rating: 5.0,
    metrics: '+85% Retention • 250+ Projects',
    budget: '$16,500',
    category: 'Website Development',
    verified: true,
    avatar: '/assets/testimonials/client_avatar_7.png',
    comment: 'From initial concept architecture to final launch, the process was seamless. The aesthetic is clean, modern, and perfectly reflects our brand values with phenomenal client engagement and feedback.',
    projectType: 'Custom Brand Architecture & Interactive Web Portal',
    year: '2025'
  },
  {
    id: 'test_8',
    name: 'Evelyn Moore',
    role: 'Director of Enterprise Systems',
    company: 'Apex Cloud Security',
    location: 'San Antonio, TX',
    rating: 4.5,
    metrics: 'Sub-50ms API • Zero Security Incidents',
    budget: '$29,000',
    category: 'Software & CRM',
    verified: true,
    avatar: '/assets/testimonials/client_avatar_8.png',
    comment: 'Superb full-stack engineering. Their engineers designed our security analytics dashboard with React 19 and real-time WebSockets, giving our enterprise clients instant visibility into network threats.',
    projectType: 'Real-Time Cybersecurity Analytics Portal',
    year: '2025'
  },
  {
    id: 'test_10',
    name: 'Robert C. Montgomery',
    role: 'Managing Partner & CIO',
    company: 'Montgomery Capital Advisors',
    location: 'Austin, TX',
    rating: 5.0,
    metrics: '$45M+ Processed • 0.2s API',
    budget: '$32,000',
    category: 'Software & CRM',
    verified: true,
    avatar: '/assets/testimonials/client_avatar_10.png',
    comment: 'Texas WebCoders architected our institutional asset management portal with sub-second database queries and bank-grade encryption. The system has processed over $45M in transactions with zero downtime. Exceptional professionalism and technical prowess.',
    projectType: 'Enterprise Asset Management Portal & Analytics',
    year: '2025'
  },
  {
    id: 'test_11',
    name: 'Dr. Arthur H. Pendelton',
    role: 'Executive Medical Director & Founder',
    company: 'Pendelton Healthcare Systems',
    location: 'Texas',
    rating: 5.0,
    metrics: '100% HIPAA Compliant • 4,800+ Patients',
    budget: '$28,000',
    category: 'Website Development',
    verified: true,
    avatar: '/assets/testimonials/client_avatar_11.png',
    comment: 'Our regional medical network needed a fast, HIPAA-compliant patient intake portal and automated consultation scheduling engine. Texas WebCoders delivered ahead of schedule with flawless UX that our staff and elderly patients find intuitive.',
    projectType: 'HIPAA-Compliant Patient Intake & Telehealth Portal',
    year: '2025'
  },
  {
    id: 'test_12',
    name: 'Thomas R. Bradley',
    role: 'Chief Operating Officer & VP of Logistics',
    company: 'Lone Star Freight & Supply Chain',
    location: 'Dallas, TX',
    rating: 5.0,
    metrics: '40+ hrs/wk Saved • Real-Time GPS',
    budget: '$38,000',
    category: 'Software & CRM',
    verified: true,
    avatar: '/assets/testimonials/client_avatar_12.png',
    comment: 'We automated our interstate fleet dispatch and bill-of-lading workflows with a custom web application built by Texas WebCoders. Our dispatchers save over 40 administrative hours every single week.',
    projectType: 'Real-Time Fleet Dispatch & Logistics CRM',
    year: '2025'
  }
];

export const TECH_STACK_CATEGORIES: TechStackCategory[] = [
  {
    name: 'Frontend & UI',
    technologies: [
      { name: 'React 19', icon: 'React', description: 'Concurrent UI rendering' },
      { name: 'Next.js 15', icon: 'Globe', description: 'Serverless SSR & edge routing' },
      { name: 'TypeScript', icon: 'Code2', description: 'Strict end-to-end type safety' },
      { name: 'Tailwind CSS', icon: 'Palette', description: 'Utility-first modern styling' },
      { name: 'Three.js / WebGL', icon: 'Layers', description: 'Interactive 3D graphics' }
    ]
  },
  {
    name: 'Mobile & Cross-Platform',
    technologies: [
      { name: 'React Native', icon: 'Smartphone', description: 'Native 60 FPS iOS & Android' },
      { name: 'Flutter', icon: 'Cpu', description: 'High-performance multiplatform apps' },
      { name: 'Swift / Kotlin', icon: 'Shield', description: 'Direct hardware API access' },
      { name: 'WebSockets', icon: 'Zap', description: 'Sub-50ms real-time event streaming' }
    ]
  },
  {
    name: 'Backend & Cloud',
    technologies: [
      { name: 'Node.js / FastAPI', icon: 'Server', description: 'High-concurrency microservices' },
      { name: 'PostgreSQL', icon: 'Database', description: 'Relational ACID persistence' },
      { name: 'Redis', icon: 'Zap', description: 'Ultra-fast in-memory caching' },
      { name: 'Google Cloud / Docker', icon: 'Cloud', description: 'Serverless auto-scaling containers' }
    ]
  },
  {
    name: 'AI & Data Engineering',
    technologies: [
      { name: 'LangGraph / CrewAI', icon: 'Cpu', description: 'Autonomous agent workflows' },
      { name: 'Gemini 2.0 / OpenAI', icon: 'Sparkles', description: 'Fine-tuned enterprise LLMs' },
      { name: 'Qdrant / RAG', icon: 'Search', description: 'Vector embeddings & knowledge graphs' },
      { name: 'YOLOv11 / OpenCV', icon: 'Eye', description: 'Edge computer vision & inspection' }
    ]
  }
];
