import React, { useState } from 'react';
import { CustomQuoteOptions } from '../types';
import { X, Sparkles, Sliders, Check, ArrowRight, DollarSign, Zap } from 'lucide-react';
import { motion } from 'motion/react';

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
              <span>10 Pages (Standard)</span>
              <span>20 Pages (Portal)</span>
            </div>
          </div>

          {/* Design Style Selector */}
          <div className="space-y-2">
            <label className="font-bold text-zinc-800 block uppercase tracking-wider text-xs font-['Montserrat']">
              Design Style & Motion Level:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'template', label: 'Standard Template', price: '+$0', desc: 'Clean, responsive layouts' },
                { id: 'custom', label: 'Custom Modern', price: '+$250', desc: 'Tailored branding & micro-animations' },
                { id: '3d_interactive', label: '3D Interactive', price: '+$450', desc: 'Three.js WebGL 3D backdrop & canvas' }
              ].map((style) => {
                const isSelected = options.designStyle === style.id;
                return (
                  <button
                    key={style.id}
                    onClick={() => setOptions({ ...options, designStyle: style.id as any })}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-950 text-white border-slate-950 shadow-lg'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:border-zinc-400 hover:bg-zinc-100'
                    }`}
                  >
                    <div className="flex justify-between items-center font-bold text-xs mb-1 font-['Montserrat']">
                      <span className={isSelected ? 'text-white' : 'text-slate-950'}>{style.label}</span>
                      <span className={`font-mono text-[11px] ${isSelected ? 'text-cyan-300' : 'text-slate-900'}`}>{style.price}</span>
                    </div>
                    <p className={`text-[11px] leading-relaxed ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>{style.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Addons Checklist */}
          <div className="space-y-2">
            <label className="font-bold text-zinc-800 block uppercase tracking-wider text-xs font-['Montserrat']">
              Select Key Feature Add-ons:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 cursor-pointer hover:border-zinc-400 transition-colors">
                <span className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={options.hasEcommerce}
                    onChange={(e) => setOptions({ ...options, hasEcommerce: e.target.checked })}
                    className="accent-slate-950 w-4 h-4 rounded cursor-pointer"
                  />
                  <span className="font-medium text-slate-900 text-xs">E-Commerce Cart & Payments</span>
                </span>
                <span className="text-slate-950 font-bold font-mono text-xs">+$400</span>
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 cursor-pointer hover:border-zinc-400 transition-colors">
                <span className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={options.hasCMS}
                    onChange={(e) => setOptions({ ...options, hasCMS: e.target.checked })}
                    className="accent-slate-950 w-4 h-4 rounded cursor-pointer"
                  />
                  <span className="font-medium text-slate-900 text-xs">CMS / Blog Admin Portal</span>
                </span>
                <span className="text-slate-950 font-bold font-mono text-xs">+$250</span>
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 cursor-pointer hover:border-zinc-400 transition-colors">
                <span className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={options.hasSEO}
                    onChange={(e) => setOptions({ ...options, hasSEO: e.target.checked })}
                    className="accent-slate-950 w-4 h-4 rounded cursor-pointer"
                  />
                  <span className="font-medium text-slate-900 text-xs">Full Local SEO & Schema Markup</span>
                </span>
                <span className="text-slate-950 font-bold font-mono text-xs">+$200</span>
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 cursor-pointer hover:border-zinc-400 transition-colors">
                <span className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={options.hasLogoDesign}
                    onChange={(e) => setOptions({ ...options, hasLogoDesign: e.target.checked })}
                    className="accent-slate-950 w-4 h-4 rounded cursor-pointer"
                  />
                  <span className="font-medium text-slate-900 text-xs">Custom Logo Suite & Vector Kit</span>
                </span>
                <span className="text-slate-950 font-bold font-mono text-xs">+$300</span>
              </label>
            </div>
          </div>

          {/* Speed Selector */}
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

        {/* Live Total & Apply Action */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-white shadow-xl">
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
            className="w-full sm:w-auto bg-white hover:bg-zinc-200 text-slate-950 font-bold px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all font-['Montserrat']"
          >
            <span>Transfer Quote to Inquiry</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
