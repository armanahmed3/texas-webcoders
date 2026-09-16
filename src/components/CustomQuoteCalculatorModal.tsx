import React, { useState } from 'react';
import { CustomQuoteOptions } from '../types';
import { X, Sparkles, Sliders, Check, ArrowRight, DollarSign, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { submitToFormSubmit } from '../utils/formSubmit';

interface CustomQuoteCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyQuote: (summary: string, total: number) => void;
}

export const CustomQuoteCalculatorModal: React.FC<CustomQuoteCalculatorModalProps> = ({
  isOpen,
  onClose,
  onApplyQuote
}) => {
  const [options, setOptions] = useState<CustomQuoteOptions>({
    pagesCount: 5,
    designStyle: 'custom',
    hasEcommerce: false,
    hasCMS: true,
    hasSEO: true,
    hasLogoDesign: false,
    deliverySpeed: 'standard'
  });

  if (!isOpen) return null;

  // Calculate live total price
  const basePrice = 300;
  const pagePrice = options.pagesCount * 75;
  const designPrice = options.designStyle === '3d_interactive' ? 450 : options.designStyle === 'custom' ? 250 : 0;
  const ecomPrice = options.hasEcommerce ? 400 : 0;
  const cmsPrice = options.hasCMS ? 250 : 0;
  const seoPrice = options.hasSEO ? 200 : 0;
  const logoPrice = options.hasLogoDesign ? 300 : 0;
  const speedPrice = options.deliverySpeed === 'rush' ? 400 : options.deliverySpeed === 'express' ? 200 : 0;

  const totalEstimate = basePrice + pagePrice + designPrice + ecomPrice + cmsPrice + seoPrice + logoPrice + speedPrice;

  const handleApply = () => {
    const summary = `Custom Package: ${options.pagesCount} Pages, ${
      options.designStyle === '3d_interactive' ? '3D Interactive' : 'Custom'
    } Design, Addons: [${options.hasEcommerce ? 'E-Commerce, ' : ''}${
      options.hasCMS ? 'CMS, ' : ''
    }${options.hasSEO ? 'SEO, ' : ''}${options.hasLogoDesign ? 'Logo Suite' : ''}], Speed: ${options.deliverySpeed}. Estimated Total: $${totalEstimate}`;

    onApplyQuote(summary, totalEstimate);
    onClose();
  };

  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [quoteSent, setQuoteSent] = useState(false);
  const [isSendingQuote, setIsSendingQuote] = useState(false);

  const handleDirectEmailQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail.trim()) return;

    setIsSendingQuote(true);
    const summary = `Custom Package: ${options.pagesCount} Pages, ${
      options.designStyle === '3d_interactive' ? '3D Interactive' : 'Custom'
    } Design, Addons: [${options.hasEcommerce ? 'E-Commerce, ' : ''}${
      options.hasCMS ? 'CMS, ' : ''
    }${options.hasSEO ? 'SEO, ' : ''}${options.hasLogoDesign ? 'Logo Suite' : ''}], Speed: ${options.deliverySpeed}. Estimated Total: $${totalEstimate}`;

    try {
      await submitToFormSubmit({
        _subject: `⚡ Custom WebScope Quote Specification ($${totalEstimate}): ${userName || userEmail}`,
        name: userName || 'Quote Requester',
        email: userEmail,
        pages_count: options.pagesCount,
        design_style: options.designStyle,
        has_ecommerce: options.hasEcommerce ? 'Yes' : 'No',
        has_cms: options.hasCMS ? 'Yes' : 'No',
        has_seo: options.hasSEO ? 'Yes' : 'No',
        has_logo: options.hasLogoDesign ? 'Yes' : 'No',
        delivery_speed: options.deliverySpeed,
        total_estimate: `$${totalEstimate}`,
        full_summary: summary
      });
      setQuoteSent(true);
    } catch (err) {
      console.error(err);
      setQuoteSent(true);
    } finally {
      setIsSendingQuote(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white border border-zinc-200 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 my-auto text-slate-900"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-zinc-100 border border-zinc-200 text-slate-950">
              <Sliders className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-['Montserrat'] uppercase text-slate-950">
                Custom WebScope Estimator
              </h2>
              <p className="text-xs text-zinc-600">Configure your specific features and calculate real-time pricing.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-slate-950 transition-colors cursor-pointer border border-zinc-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Configuration Sliders & Checkboxes */}
        <div className="space-y-6 text-xs sm:text-sm">
          {/* Page Count Slider */}
          <div className="bg-zinc-50 p-4 sm:p-5 rounded-2xl border border-zinc-200 space-y-2.5">
            <div className="flex justify-between items-center font-bold">
              <span className="text-zinc-800 font-['Montserrat']">Number of Custom Pages:</span>
              <span className="text-slate-950 text-base font-bold font-mono bg-white px-3 py-1 rounded-lg border border-zinc-300 shadow-sm">
                {options.pagesCount} Pages
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={options.pagesCount}
              onChange={(e) => setOptions({ ...options, pagesCount: parseInt(e.target.value) })}
              className="w-full accent-slate-950 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-zinc-500 font-medium">
              <span>1 Page (Landing)</span>
              <span>10 Pages</span>
              <span>20+ Pages (Enterprise)</span>
            </div>
          </div>

          {/* Design Style */}
          <div className="space-y-2">
            <label className="font-bold text-zinc-800 block uppercase tracking-wider text-xs font-['Montserrat']">
              Visual Design Architecture:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'standard', label: 'Clean Modern', price: '+$0', desc: 'Minimalist corporate styling' },
                { id: 'custom', label: 'Bespoke Agency', price: '+$250', desc: 'Custom branding & UI kit' },
                { id: '3d_interactive', label: '3D WebGL / VFX', price: '+$450', desc: 'Three.js interactive experience' }
              ].map((style) => {
                const isSelected = options.designStyle === style.id;
                return (
                  <button
                    key={style.id}
                    onClick={() => setOptions({ ...options, designStyle: style.id as any })}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-slate-950 border-slate-950 text-white shadow-md'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:border-zinc-400 hover:bg-zinc-100'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs">{style.label}</div>
                      <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                        {style.desc}
                      </div>
                    </div>
                    <div className={`text-xs font-mono font-bold mt-2 ${isSelected ? 'text-cyan-300' : 'text-slate-950'}`}>
                      {style.price}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add-on Feature Checkboxes */}
          <div className="space-y-2">
            <label className="font-bold text-zinc-800 block uppercase tracking-wider text-xs font-['Montserrat']">
              Integrated Capabilities & Addons:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: 'hasEcommerce', label: 'E-Commerce & Stripe Checkout', price: '+$400', desc: 'Cart, payment gateway, orders' },
                { key: 'hasCMS', label: 'Custom Content Management (CMS)', price: '+$250', desc: 'Self-edit blogs, projects & text' },
                { key: 'hasSEO', label: 'Advanced Technical SEO Engine', price: '+$200', desc: 'Schema, sitemaps, Core Web Vitals' },
                { key: 'hasLogoDesign', label: 'Complete Vector Logo & Brand Kit', price: '+$300', desc: 'Typography, colors, vectors' }
              ].map((item) => {
                const isChecked = options[item.key as keyof CustomQuoteOptions] as boolean;
                return (
                  <div
                    key={item.key}
                    onClick={() => setOptions({ ...options, [item.key]: !isChecked })}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isChecked
                        ? 'bg-zinc-900 border-zinc-900 text-white shadow-sm'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-800 hover:bg-zinc-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                          isChecked ? 'bg-white text-black border-white' : 'border-zinc-400 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="font-bold text-xs">{item.label}</div>
                        <div className={`text-[10px] ${isChecked ? 'text-zinc-300' : 'text-zinc-500'}`}>
                          {item.desc}
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs font-mono font-bold ${isChecked ? 'text-cyan-300' : 'text-slate-950'}`}>
                      {item.price}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Turnaround Speed */}
          <div className="space-y-2">
            <label className="font-bold text-zinc-800 block uppercase tracking-wider text-xs font-['Montserrat']">
              Delivery Turnaround Speed:
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'standard', label: 'Standard (7 Days)', price: '+$0' },
                { id: 'express', label: 'Express (3 Days)', price: '+$200' },
                { id: 'rush', label: 'Rush (48 Hours)', price: '+$400' }
              ].map((sp) => {
                const isSelected = options.deliverySpeed === sp.id;
                return (
                  <button
                    key={sp.id}
                    onClick={() => setOptions({ ...options, deliverySpeed: sp.id as any })}
                    className={`p-3 rounded-2xl border text-center text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-950 border-slate-950 text-white shadow-md'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:border-zinc-400 hover:bg-zinc-100'
                    }`}
                  >
                    <div>{sp.label}</div>
                    <div className={`text-[11px] font-mono mt-0.5 ${isSelected ? 'text-cyan-300' : 'text-slate-950'}`}>
                      {sp.price}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Total & Direct FormSubmit Dispatch Form */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 text-white shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block font-['Montserrat']">
                Estimated Total Investment:
              </span>
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-['Montserrat'] tracking-tight">
                ${totalEstimate}
              </span>
              <span className="text-[11px] text-zinc-400 block mt-0.5 font-mono">
                Includes free SSL certificate, DNS setup & priority support
              </span>
            </div>

            <button
              onClick={handleApply}
              className="w-full sm:w-auto bg-white hover:bg-zinc-200 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all font-['Montserrat']"
            >
              <span>Transfer Quote to Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* FormSubmit Direct Email Section */}
          <div className="pt-3 border-t border-zinc-800">
            {quoteSent ? (
              <div className="p-3 bg-emerald-950/80 border border-emerald-700 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Quote specifications dispatched to info@texaswebcoders.com and your email!</span>
              </div>
            ) : (
              <form
                action="https://formsubmit.co/info@texaswebcoders.com"
                method="POST"
                onSubmit={handleDirectEmailQuote}
                className="flex flex-col sm:flex-row gap-2"
              >
                <input type="hidden" name="_subject" value={`Custom WebScope Quote Estimate: $${totalEstimate}`} />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name (Optional)"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white sm:w-1/3"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter email to receive quote spec *"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white flex-1"
                />
                <button
                  type="submit"
                  disabled={isSendingQuote || !userEmail.trim()}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer flex-shrink-0 disabled:opacity-50"
                >
                  {isSendingQuote ? 'Sending...' : 'Email Quote Spec'}
                </button>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
