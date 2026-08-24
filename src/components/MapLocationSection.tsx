import React from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, ShieldCheck, Sparkles, ExternalLink, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface MapLocationSectionProps {
  variant?: 'white' | 'black' | 'light-blue' | 'none' | 'transparent';
  onOpenAppointmentModal?: () => void;
}

export const MapLocationSection: React.FC<MapLocationSectionProps> = ({
  variant = 'black',
  onOpenAppointmentModal
}) => {
  const isBlack = variant === 'black' || variant === 'none' || variant === 'transparent';

  // Schema.org LocalBusiness & ProfessionalService Structured Data for Local SEO
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": "https://texaswebcoders.com/#localbusiness",
    "name": "Texas WebCoders",
    "alternateName": ["Texas WebCoders", "Texas WebCoders LLC"],
    "description": "Texas WebCoders is a top-rated Texas web design, mobile application engineering, SEO optimization, and custom software development agency in Tyler, TX.",
    "url": "https://texaswebcoders.com",
    "telephone": "+1-903-222-6022",
    "email": "info@texaswebcoders.com",
    "priceRange": "$$",
    "image": "https://texaswebcoders.com/logo.png",
    "logo": "https://texaswebcoders.com/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "5221 S Broadway Ave",
      "addressLocality": "Tyler",
      "addressRegion": "TX",
      "postalCode": "75703",
      "addressCountry": "US"
    },
    "location": [
      {
        "@type": "Place",
        "name": "Texas WebCoders Headquarters",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "5221 S Broadway Ave",
          "addressLocality": "Tyler",
          "addressRegion": "TX",
          "postalCode": "75703",
          "addressCountry": "US"
        }
      }
    ],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 32.2920662,
      "longitude": -95.3058193
    },
    "hasMap": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.2448266455185!2d-95.30581939036828!3d32.292066208505034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8649cddd3346a79f%3A0x5a82323ccd2edae3!2sTexas%20WebCoders!5e1!3m2!1sen!2s!4v1787084450785!5m2!1sen!2s",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://texaswebcoders.com",
      "https://maps.google.com/?q=5221+S+Broadway+Ave,+Tyler,+TX+75703,+United+States"
    ],
    "areaServed": [
      {
        "@type": "State",
        "name": "Texas"
      },
      {
        "@type": "City",
        "name": "Tyler"
      },
      {
        "@type": "Country",
        "name": "United States"
      }
    ],
    "currenciesAccepted": "USD",
    "paymentAccepted": "Cash, Credit Card, Invoice, Stripe",
    "knowsAbout": [
      "Custom Website Design",
      "Web Application Development",
      "Mobile App UI/UX Design",
      "Search Engine Optimization (SEO)",
      "E-Commerce Solutions",
      "Brand Identity & Logo Design"
    ]
  };

  return (
    <section id="location-map" className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Schema.org LocalBusiness Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {/* Curved Rounded Section Shell */}
      <div
        className={`max-w-7xl mx-auto w-full rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 lg:p-14 relative overflow-hidden transition-colors duration-300 ${
          isBlack
            ? 'bg-[#080c14] text-white border border-slate-800 shadow-2xl'
            : 'bg-white text-slate-900 border border-zinc-200 shadow-zinc-900/5'
        }`}
      >
        {/* Decorative Background Glow Accents */}
        <div
          className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
            isBlack ? 'bg-white/5' : 'bg-slate-200/30'
          }`}
        />
        <div
          className={`absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
            isBlack ? 'bg-slate-800/20' : 'bg-slate-200/30'
          }`}
        />

        <div className="relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-10"
          >
            <span
              className={`text-xs font-semibold uppercase tracking-widest mb-2 block font-['Montserrat'] flex items-center justify-center gap-1.5 ${
                isBlack ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Visit Our Texas Headquarters • Global Reach</span>
            </span>
            <h2
              className={`text-2xl sm:text-4xl md:text-5xl font-semibold mb-3 tracking-tight uppercase font-['Montserrat',sans-serif] ${
                isBlack ? 'text-white' : 'text-slate-950'
              }`}
            >
              Our Tyler, Texas Office
            </h2>
            <p
              className={`max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed ${
                isBlack ? 'text-slate-300' : 'text-zinc-600'
              }`}
            >
              Based in Tyler, Texas, we serve ambitious startups and enterprise brands with top-tier web, mobile app, and custom software engineering.
            </p>
          </motion.div>

          {/* Map & Office Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Google Maps Embed Card */}
            <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-700/60 shadow-xl bg-slate-950/80 relative min-h-[380px] sm:min-h-[440px] flex flex-col">
              {/* Map Floating Header Tag */}
              <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
                <div className="bg-slate-950/90 border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2 pointer-events-auto">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-semibold text-white font-['Montserrat']">Texas WebCoders</span>
                </div>
                <a
                  href="https://maps.google.com/?q=5221+S+Broadway+Ave,+Tyler,+TX+75703,+United+States"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-zinc-200 text-slate-950 px-3 py-1.5 rounded-xl text-[11px] font-semibold shadow-lg flex items-center gap-1.5 transition-all pointer-events-auto cursor-pointer"
                >
                  <Navigation className="w-3 h-3 text-slate-950" />
                  <span>Get Directions</span>
                </a>
              </div>

              {/* Exact Google Map Iframe Provided */}
              <div className="w-full h-full flex-1 relative min-h-[350px]">
                <iframe
                  title="Texas WebCoders Google Map Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.2448266455185!2d-95.30581939036828!3d32.292066208505034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8649cddd3346a79f%3A0x5a82323ccd2edae3!2sTexas%20WebCoders!5e1!3m2!1sen!2s!4v1787084450785!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>

              {/* Bottom Quick Bar */}
              <div className="bg-slate-950/95 border-t border-slate-800 p-3 px-4 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-white" />
                  <span>5221 S Broadway Ave, Tyler, TX 75703, United States</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                  Open Mon - Fri: 8:00 AM - 6:00 PM CST
                </span>
              </div>
            </div>

            {/* Office Contact & Direct Actions Column */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              {/* Primary Address & Direct Hub Card */}
              <div
                className={`p-6 rounded-3xl border shadow-lg space-y-4 flex-1 ${
                  isBlack ? 'bg-slate-950/90 border-slate-800' : 'bg-zinc-50 border-zinc-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[11px] font-semibold uppercase tracking-wider text-slate-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-white" />
                    <span>Verified Texas Business</span>
                  </span>
                  <span className="text-xs font-mono text-slate-400">Tyler, TX 75703</span>
                </div>

                <div>
                  <h3
                    className={`text-xl font-semibold uppercase font-['Montserrat'] tracking-tight ${
                      isBlack ? 'text-white' : 'text-slate-950'
                    }`}
                  >
                    Texas WebCoders
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Custom Web & Mobile App Development • SEO & Digital Systems
                  </p>
                </div>

                {/* Contact List */}
                <div className="space-y-2.5 pt-1">
                  {/* Address */}
                  <a
                    href="https://maps.google.com/?q=5221+S+Broadway+Ave,+Tyler,+TX+75703,+United+States"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-2xl border flex items-start gap-3 transition-colors ${
                      isBlack ? 'bg-slate-900/90 border-slate-800 hover:border-white' : 'bg-white border-zinc-200 hover:border-slate-950'
                    }`}
                  >
                    <div className="p-2 rounded-xl bg-white/10 text-white flex-shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="text-xs">
                      <div className="text-[10px] uppercase font-semibold text-slate-400">Headquarters Address</div>
                      <div className="font-semibold text-white mt-0.5">5221 S Broadway Ave, Tyler, TX 75703, United States</div>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+19032226022"
                    className={`p-3 rounded-2xl border flex items-center gap-3 transition-colors ${
                      isBlack ? 'bg-slate-900/90 border-slate-800 hover:border-white' : 'bg-white border-zinc-200 hover:border-slate-950'
                    }`}
                  >
                    <div className="p-2 rounded-xl bg-white/10 text-white flex-shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="text-xs">
                      <div className="text-[10px] uppercase font-semibold text-slate-400">Call Us Directly</div>
                      <div className="font-mono font-semibold text-white text-sm">+1 9032226022</div>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:info@texaswebcoders.com"
                    className={`p-3 rounded-2xl border flex items-center gap-3 transition-colors ${
                      isBlack ? 'bg-slate-900/90 border-slate-800 hover:border-white' : 'bg-white border-zinc-200 hover:border-slate-950'
                    }`}
                  >
                    <div className="p-2 rounded-xl bg-white/10 text-white flex-shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="text-xs">
                      <div className="text-[10px] uppercase font-semibold text-slate-400">Official Inquiries</div>
                      <div className="font-semibold text-white">info@texaswebcoders.com</div>
                    </div>
                  </a>
                </div>

                {/* Direct Call / Booking CTA */}
                <div className="pt-2">
                  <a
                    href="tel:+19032226022"
                    className="w-full bg-white hover:bg-zinc-200 text-slate-950 font-semibold py-3.5 px-4 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer font-['Montserrat']"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call +1 (903) 222-6022</span>
                  </a>
                </div>
              </div>

              {/* SMS Disclaimer Box */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed space-y-1">
                <div className="font-semibold text-slate-300 text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>SMS Consent & Communications</span>
                </div>
                <p>
                  By providing a telephone number and submitting any inquiry forms on this site, you are consenting to be contacted by SMS text message. Message & data rates may apply. You can reply STOP to opt-out of further messaging.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
