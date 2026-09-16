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
  Palette,
  Facebook,
  Linkedin,
  Instagram,
  Shield
} from 'lucide-react';
import { TexasWebcodersLogo } from './TexasWebcodersLogo';
import { submitToFormSubmit } from '../utils/formSubmit';

interface FooterProps {
  onNavigateSlide: (slideIndex: number) => void;
  onOpenPrivacyPolicy?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSlide, onOpenPrivacyPolicy }) => {
  return (
    <footer className="bg-white text-zinc-900 pt-16 pb-20 lg:pb-8 border-t border-zinc-200 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand & Contact Column */}
          <div className="md:col-span-2 space-y-4">
            <TexasWebcodersLogo size="lg" variant="light" />

            <p className="text-zinc-600 text-sm max-w-sm leading-relaxed font-normal">
              Let&apos;s Build Something Extraordinary Together. High-performance, custom web and mobile app solutions built for maximum conversions and brand authority.
            </p>

            <div className="pt-2 space-y-3 text-sm text-zinc-600">
              <p className="text-xs uppercase font-medium text-black tracking-wider font-['Montserrat']">
                Direct Contact & USA Headquarters
              </p>
              
              {/* Phone Link */}
              <div className="flex items-center gap-2.5 text-black text-base font-medium font-['Montserrat']">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center flex-shrink-0 text-zinc-900">
                  <Phone className="w-4 h-4 text-zinc-800" />
                </div>
                <a
                  href="tel:+19032226022"
                  className="hover:text-zinc-700 transition-colors font-mono"
                >
                  +1 9032226022
                </a>
              </div>

              {/* Email Link */}
              <div className="flex items-center gap-2.5 text-zinc-700 text-sm font-medium">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center flex-shrink-0 text-zinc-900">
                  <Mail className="w-4 h-4 text-zinc-800" />
                </div>
                <a
                  href="mailto:info@texaswebcoders.com"
                  className="font-medium text-black hover:text-zinc-700 hover:underline transition-colors"
                >
                  info@texaswebcoders.com
                </a>
              </div>

              {/* Address Link */}
              <div className="flex items-start gap-2.5 text-zinc-700 text-xs font-medium pt-0.5">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center flex-shrink-0 text-zinc-900 mt-0.5">
                  <MapPin className="w-4 h-4 text-zinc-800" />
                </div>
                <a
                  href="https://maps.google.com/?q=5221+S+Broadway+Ave,+Tyler,+TX+75703,+United+States"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-900 hover:text-zinc-700 hover:underline transition-colors leading-snug"
                >
                  <span className="font-medium block text-black">Texas WebCoders</span>
                  <span>5221 S Broadway Ave, Tyler, TX 75703, United States</span>
                </a>
              </div>

              {/* Social Media Channels */}
              <div className="pt-2">
                <p className="text-[11px] font-bold text-black uppercase tracking-wider mb-2 font-['Montserrat']">
                  Follow Texas WebCoders
                </p>
                <div className="flex items-center gap-2.5">
                  <a
                    href="https://www.facebook.com/share/1CNUeH9kjm/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Texas WebCoders Facebook"
                    className="w-9 h-9 rounded-xl bg-zinc-100 hover:bg-black text-zinc-800 hover:text-white border border-zinc-200 flex items-center justify-center transition-all shadow-sm group"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/texas-web-coders/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Texas WebCoders LinkedIn"
                    className="w-9 h-9 rounded-xl bg-zinc-100 hover:bg-black text-zinc-800 hover:text-white border border-zinc-200 flex items-center justify-center transition-all shadow-sm group"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.instagram.com/texaswebcoders"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Texas WebCoders Instagram"
                    className="w-9 h-9 rounded-xl bg-zinc-100 hover:bg-black text-zinc-800 hover:text-white border border-zinc-200 flex items-center justify-center transition-all shadow-sm group"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Quick Newsletter & Project Updates Form with Payment Card Image to the Right */}
              <div className="pt-3">
                <p className="text-[11px] font-bold text-black uppercase tracking-wider mb-2 font-['Montserrat']">
                  Subscribe for Engineering Updates &amp; Insights
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <form
                    action="https://formsubmit.co/info@texaswebcoders.com"
                    method="POST"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const email = (form.elements.namedItem('email') as HTMLInputElement)?.value;
                      if (email) {
                        submitToFormSubmit({
                          _subject: `📬 New Newsletter Subscriber: ${email}`,
                          email,
                          source: 'Footer Subscription'
                        });
                        alert('Thank you! You are now subscribed to Texas WebCoders engineering insights.');
                        form.reset();
                      }
                    }}
                    className="flex flex-col sm:flex-row gap-2 max-w-sm w-full"
                  >
                    <input type="hidden" name="_subject" value="New Newsletter Subscription - Texas WebCoders" />
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_template" value="table" />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Enter your work email..."
                      className="flex-1 bg-zinc-50 border border-zinc-300 rounded-xl px-3.5 py-2 text-xs text-zinc-900 focus:outline-none focus:border-black font-medium"
                    />
                    <button
                      type="submit"
                      className="bg-black hover:bg-zinc-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer flex-shrink-0 font-['Montserrat'] uppercase tracking-wider"
                    >
                      Subscribe
                    </button>
                  </form>

                  {/* Card Payment Image right side of newsletter */}
                  <div className="flex-shrink-0 bg-white rounded-xl p-1.5 border border-zinc-200 shadow-sm flex items-center justify-center">
                    <img
                      src="/assets/payment-methods.png"
                      alt="Accepted Payment Methods: Visa, PayPal, Mastercard, AMEX, Zelle, Apple Pay, Google Pay, Stripe"
                      className="h-10 sm:h-12 w-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Company Links - Strictly Navbar Header Pages */}
          <div>
            <h4 className="font-semibold mb-4 uppercase text-xs tracking-wider text-black font-['Montserrat']">
              Navigation & Pages
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-600 font-medium">
              <li>
                <button onClick={() => onNavigateSlide(0)} className="hover:text-black transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSlide(5)} className="hover:text-black transition-colors cursor-pointer">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSlide(3)} className="hover:text-black transition-colors cursor-pointer">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSlide(1)} className="hover:text-black transition-colors cursor-pointer">
                  Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSlide(4)} className="hover:text-black transition-colors cursor-pointer">
                  Packages
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSlide(6)} className="hover:text-black transition-colors cursor-pointer">
                  Testimonials
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSlide(7)} className="hover:text-black transition-colors cursor-pointer">
                  Blog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSlide(9)} className="hover:text-black transition-colors cursor-pointer">
                  Contact
                </button>
              </li>
              {onOpenPrivacyPolicy && (
                <li>
                  <button
                    onClick={onOpenPrivacyPolicy}
                    className="hover:text-emerald-700 text-black font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Shield className="w-3.5 h-3.5 text-black" />
                    <span>Privacy Policy</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Services Links with Icons */}
          <div>
            <h4 className="font-semibold mb-4 uppercase text-xs tracking-wider text-black font-['Montserrat']">
              Core Engineering Services
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-600 font-medium">
              <li>
                <button onClick={() => onNavigateSlide(3)} className="hover:text-black transition-colors cursor-pointer flex items-center gap-2 group text-left">
                  <span className="w-6 h-6 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 group-hover:bg-black group-hover:text-white transition-colors flex-shrink-0">
                    <Globe className="w-3.5 h-3.5" />
                  </span>
                  <span>Custom Web Applications</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSlide(3)} className="hover:text-black transition-colors cursor-pointer flex items-center gap-2 group text-left">
                  <span className="w-6 h-6 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 group-hover:bg-black group-hover:text-white transition-colors flex-shrink-0">
                    <Cpu className="w-3.5 h-3.5" />
                  </span>
                  <span>Enterprise Software & CRM</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSlide(3)} className="hover:text-black transition-colors cursor-pointer flex items-center gap-2 group text-left">
                  <span className="w-6 h-6 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 group-hover:bg-black group-hover:text-white transition-colors flex-shrink-0">
                    <Smartphone className="w-3.5 h-3.5" />
                  </span>
                  <span>iOS & Android Mobile Apps</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSlide(3)} className="hover:text-black transition-colors cursor-pointer flex items-center gap-2 group text-left">
                  <span className="w-6 h-6 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 group-hover:bg-black group-hover:text-white transition-colors flex-shrink-0">
                    <Boxes className="w-3.5 h-3.5" />
                  </span>
                  <span>WordPress & Headless CMS</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSlide(3)} className="hover:text-black transition-colors cursor-pointer flex items-center gap-2 group text-left">
                  <span className="w-6 h-6 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 group-hover:bg-black group-hover:text-white transition-colors flex-shrink-0">
                    <Film className="w-3.5 h-3.5" />
                  </span>
                  <span>3D Animation & Motion VFX</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSlide(3)} className="hover:text-black transition-colors cursor-pointer flex items-center gap-2 group text-left">
                  <span className="w-6 h-6 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 group-hover:bg-black group-hover:text-white transition-colors flex-shrink-0">
                    <Box className="w-3.5 h-3.5" />
                  </span>
                  <span>3D Architectural Renders & Floor Plans</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSlide(3)} className="hover:text-black transition-colors cursor-pointer flex items-center gap-2 group text-left">
                  <span className="w-6 h-6 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 group-hover:bg-black group-hover:text-white transition-colors flex-shrink-0">
                    <PenTool className="w-3.5 h-3.5" />
                  </span>
                  <span>Logo Designing & Brand Identity</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSlide(3)} className="hover:text-black transition-colors cursor-pointer flex items-center gap-2 group text-left">
                  <span className="w-6 h-6 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 group-hover:bg-black group-hover:text-white transition-colors flex-shrink-0">
                    <Palette className="w-3.5 h-3.5" />
                  </span>
                  <span>Graphic Design & Marketing Collateral</span>
                </button>
              </li>
            </ul>
          </div>

        </div>



        {/* Bottom Bar */}
        <div className="border-t border-zinc-200 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-medium gap-4">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <p>© 2026 Texas WebCoders. All Rights Reserved.</p>
            {onOpenPrivacyPolicy && (
              <button
                onClick={onOpenPrivacyPolicy}
                className="underline hover:text-black transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 text-black font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Accepting New Client Projects • Texas HQ</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

