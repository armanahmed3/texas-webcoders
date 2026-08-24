export interface PortfolioProject {
  id: string;
  title: string;
  category:
    | 'Website Development'
    | 'WordPress Development'
    | 'E-Commerce'
    | 'UI / UX Design'
    | 'UI/UX Design'
    | 'Video Animation'
    | 'Mobile App Development'
    | 'Software & CRM'
    | 'Graphic Designing'
    | string;
  subCategory?:
    | 'Logo Design'
    | 'Typography'
    | 'Pitch Deck'
    | 'Book Cover'
    | 'Children Book Illustration'
    | 'Flyers / Brochures'
    | 'Packaging'
    | 'Business Card'
    | string;
  subtitle: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  mediaType?: 'image' | 'video' | 'auto-scroll';
  isAutoScroll?: boolean;
  isUserUploaded?: boolean;
  gallery?: string[];
  mockupImages?: string[];
  clientName: string;
  year: string;
  liveUrl?: string;
  techStack: string[];
  stats: {
    label: string;
    value: string;
  }[];
  overview: string;
  keyFeatures: string[];
}

export interface PricingPackage {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  popular?: boolean;
  category: 'website' | 'logo' | 'ecommerce';
  features: string[];
  description: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  deliverables: string[];
  duration: string;
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  deliverables: string[];
  imageUrl?: string;
  videoUrl?: string;
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  packageSelect: string;
  budget: string;
  details: string;
}

export interface CustomQuoteOptions {
  pagesCount: number;
  designStyle: 'template' | 'custom' | '3d_interactive';
  hasEcommerce: boolean;
  hasCMS: boolean;
  hasSEO: boolean;
  hasLogoDesign: boolean;
  deliverySpeed: 'standard' | 'express' | 'rush';
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company: string;
  location: string;
  rating: number;
  comment: string;
  projectType: string;
  year: string;
  avatar?: string;
  metrics?: string;
  budget?: string;
  category?: string;
  verified?: boolean;
  videoUrl?: string;
}

export interface TechStackCategory {
  name: string;
  technologies: {
    name: string;
    icon: string;
    description: string;
  }[];
}
