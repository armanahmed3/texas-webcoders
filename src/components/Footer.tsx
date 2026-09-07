import React from 'react';
import {
  Phone,
  Mail,
  ArrowUpRight,
  ShieldCheck,
  MapPin,
  Globe,
  Cpu,
  Smartphone,
  Boxes,
  Film,
  Box,
  PenTool,
  Palette
} from 'lucide-react';
import { TexasWebcodersLogo } from './TexasWebcodersLogo';

interface FooterProps {
  onNavigateSlide: (slideIndex: number) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSlide }) => {
  return (
    <footer className="bg-white text-slate-900 pt-16 pb-20 lg:pb-8 border-t border-zinc-200 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand & Contact Column */}
          <div className="md:col-span-2 space-y-4">
            <TexasWebcodersLogo size="lg" variant="light" />

            <p className="text-zinc-600 text-sm max-w-sm leading-relaxed font-normal">
              Let&apos;s Build Something Extraordinary Together. High-performance, custom web and mobile app solutions built for maximum conversions and brand authority.
            </p>

            <div className="pt-2 space-y-3 text-sm text-zinc-600">
              <p className="text-xs uppercase font-medium text-slate-950 tracking-wider font-['Montserrat']">
                Direct Contact & USA Headquarters
              </p>
              
              {/* Phone Link */}
              <div className="flex items-center gap-2.5 text-slate-950 text-base font-medium font-['Montserrat']">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center flex-shrink-0 text-slate-900">
                  <Phone className="w-4 h-4 text-slate-800" />
                </div>
                <a
                  href="tel:+19032226022"
                  className="hover:text-slate-700 transition-colors font-mono"
                >
                  +1 9032226022
                </a>
              </div>

              {/* Email Link */}
              <div className="flex items-center gap-2.5 text-zinc-700 text-sm font-medium">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center flex-shrink-0 text-slate-900">
                  <Mail className="w-4 h-4 text-slate-800" />
                </div>
                <a
                  href="mailto:info@texaswebcoders.com"
                  className="font-medium text-slate-900 hover:text-slate-700 hover:underline transition-colors"
                >
                  info@texaswebcoders.com
                </a>
              </div>

              {/* Address Link */}
              <div className="flex items-start gap-2.5 text-zinc-700 text-xs font-medium pt-0.5">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center flex-shrink-0 text-slate-900 mt-0.5">
                  <MapPin className="w-4 h-4 text-slate-800" />
                </div>
                <a
                  href="https://maps.google.com/?q=5221+S+Broadway+Ave,+Tyler,+TX+75703,+United+States"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-900 hover:text-slate-700 hover:underline transition-colors leading-snug"
                >
                  <span className="font-medium block text-slate-950">Texas WebCoders</span>
                  <span>5221 S Broadway Ave, Tyler, TX 75703, United States</span>
                </a>
              </div>
            </div>
          </div>

          {/* Company Links - Strictly Navbar Header Pages */}
          <div>
            <h4 className="font-semibold mb-4 uppercase text-xs tracking-wider text-slate-950 font-['Montserrat']">
              Navigation & Pages
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-600 font-medium">
              <li>
                <button onClick={() => onNavigateSlide(0)} className="hover:text-slate-950 transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSlide(5)} className="hover:text-slate-950 transition-colors cursor-pointer">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSlide(3)} className="hover:text-slate-950 transition-colors cursor-pointer">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSlide(1)} className="hover:text-slate-950 transition-colors cursor-pointer">
                  Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSlide(4)} className="hover:text-slate-950 transition-colors cursor-pointer">
                  Packages
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSlide(6)} className="hover:text-slate-950 transition-colors cursor-pointer">
                  Testimonials
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSlide(7)} className="hover:text-slate-950 transition-colors cursor-pointer">
                  Blog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSlide(9)} className="hover:text-slate-950 transition-colors cursor-pointer">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services Links with Icons */}
          <div>
            <h4 className="font-semibold mb-4 uppercase text-xs tracking-wider text-slate-950 font-['Montserrat']">
              Core Engineering Services
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-600 font-medium">
              <li>
                <button onClick={() => onNavigateSlide(3)} className="hover:text-slate-950 transition-colors cursor-pointer flex items-center gap-2 group text-left">
                  <span className="w-6 h-6 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-slate-900 group-hover:bg-slate-950 group-hover:text-white transition-colors flex-shrink-0">
                    <Globe className="w-3.5 h-3.5" />
                  </span>
                  <span>Custom Web Applications</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSlide(3)} className="hover:text-slate-950 transition-colors cursor-pointer flex items-center gap-2 group text-left">
                  <span className="w-6 h-6 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-slate-900 group-hover:bg-slate-950 group-hover:text-white transition-colors flex-shrink-0">
                    <Cpu className="w-3.5 h-3.5" />
                  </span>
                  <span>Enterprise Software & CRM</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSlide(3)} className="hover:text-slate-950 transition-colors cursor-pointer flex items-center gap-2 group text-left">
                  <span className="w-6 h-6 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-slate-900 group-hover:bg-slate-950 group-hover:text-white transition-colors flex-shrink-0">
                    <Smartphone className="w-3.5 h-3.5" />
                  </span>
                  <span>iOS & Android Mobile Apps</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSlide(3)} className="hover:text-slate-950 transition-colors cursor-pointer flex items-center gap-2 group text-left">
                  <span className="w-6 h-6 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-slate-900 group-hover:bg-slate-950 group-hover:text-white transition-colors flex-shrink-0">
                    <Boxes className="w-3.5 h-3.5" />
                  </span>
                  <span>WordPress & Headless CMS</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSlide(3)} className="hover:text-slate-950 transition-colors cursor-pointer flex items-center gap-2 group text-left">
                  <span className="w-6 h-6 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-slate-900 group-hover:bg-slate-950 group-hover:text-white transition-colors flex-shrink-0">
                    <Film className="w-3.5 h-3.5" />
                  </span>
                  <span>3D Animation & Motion VFX</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSlide(3)} className="hover:text-slate-950 transition-colors cursor-pointer flex items-center gap-2 group text-left">
                  <span className="w-6 h-6 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-slate-900 group-hover:bg-slate-950 group-hover:text-white transition-colors flex-shrink-0">
                    <Box className="w-3.5 h-3.5" />
                  </span>
                  <span>3D Architectural Renders & Floor Plans</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSlide(3)} className="hover:text-slate-950 transition-colors cursor-pointer flex items-center gap-2 group text-left">
                  <span className="w-6 h-6 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-slate-900 group-hover:bg-slate-950 group-hover:text-white transition-colors flex-shrink-0">
                    <PenTool className="w-3.5 h-3.5" />
                  </span>
                  <span>Logo Designing & Brand Identity</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSlide(3)} className="hover:text-slate-950 transition-colors cursor-pointer flex items-center gap-2 group text-left">
                  <span className="w-6 h-6 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-slate-900 group-hover:bg-slate-950 group-hover:text-white transition-colors flex-shrink-0">
                    <Palette className="w-3.5 h-3.5" />
                  </span>
                  <span>Graphic Design & Marketing Collateral</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-200 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-medium gap-4">
          <p>© 2026 Texas WebCoders. All Rights Reserved.</p>
          <div className="flex items-center gap-2 text-slate-900 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Accepting New Client Projects • Texas HQ</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

