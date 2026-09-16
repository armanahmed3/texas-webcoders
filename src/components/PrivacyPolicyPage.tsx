import React, { useEffect } from 'react';
import { ArrowLeft, Shield, Lock, Eye, FileText, CheckCircle2, Mail, Phone, MapPin, Globe } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onBack: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4 sm:px-6 lg:px-8 font-['Montserrat',sans-serif] relative z-20">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 transition-all mb-8 cursor-pointer text-xs font-semibold uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </button>

        {/* Header */}
        <div className="border-b border-zinc-800 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium uppercase tracking-wider mb-4">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Legal & Privacy Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-zinc-400">
            Last Updated: January 2025 • Effective Date: January 1, 2025
          </p>
          <p className="text-xs text-zinc-500 mt-1">
            Texas WebCoders LLC • 5221 S Broadway Ave, Tyler, TX 75703, United States
          </p>
        </div>

        {/* Policy Content */}
        <div className="space-y-10 text-sm text-zinc-300 leading-relaxed">
          
          {/* Section 1 */}
          <section className="space-y-3 bg-zinc-950 border border-zinc-800/80 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2.5 text-white font-semibold text-lg">
              <Eye className="w-5 h-5 text-emerald-400" />
              <h2>1. Introduction & Scope</h2>
            </div>
            <p>
              Texas WebCoders (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to respecting and protecting the privacy of our website visitors, clients, and partners. This Privacy Policy governs your use of the website <strong className="text-white">texaswebcoders.com</strong>, our digital services, client portals, and all direct communications with our team.
            </p>
            <p>
              By accessing or using our website, submitting an inquiry, or engaging our software engineering services, you acknowledge that you have read and agreed to the terms outlined in this policy.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 bg-zinc-950 border border-zinc-800/80 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2.5 text-white font-semibold text-lg">
              <FileText className="w-5 h-5 text-emerald-400" />
              <h2>2. Information We Collect</h2>
            </div>
            <p>We only collect personal information that you voluntarily provide to us when contacting us or requesting a service quote:</p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-300 text-xs sm:text-sm">
              <li><strong className="text-white">Contact Information:</strong> Full name, company name, email address, telephone number, and physical business address.</li>
              <li><strong className="text-white">Project Specifications:</strong> Technical requirements, project goals, estimated budget range, design references, and domain details.</li>
              <li><strong className="text-white">Automated Technical Telemetry:</strong> Anonymized browser type, operating system, IP address, referral sources, and page interaction timestamps gathered strictly for performance optimization and Core Web Vitals monitoring.</li>
            </ul>
          </section>

          {/* Section 3: SMS Disclosure (CRITICAL FOR US COMPLIANCE) */}
          <section className="space-y-3 bg-zinc-950 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
            <div className="flex items-center gap-2.5 text-emerald-400 font-semibold text-lg">
              <Shield className="w-5 h-5 text-emerald-400" />
              <h2>3. SMS / Text Messaging Disclosure &amp; Consent</h2>
            </div>
            <p className="text-zinc-200">
              When you submit your telephone number through our contact or inquiry forms, you expressly consent to receive direct text messages (SMS) from Texas WebCoders regarding your project estimates, meeting confirmations, or urgent technical notices.
            </p>
            <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-2 text-xs text-zinc-300">
              <p className="font-semibold text-white uppercase tracking-wider">
                Strict A2P 10DLC Non-Sharing Guarantee:
              </p>
              <p>
                <strong>No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.</strong> All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties under any circumstances.
              </p>
              <p>
                Message &amp; data rates may apply. Message frequency varies based on project communication status. You may cancel SMS notifications at any time by replying <strong>STOP</strong>. For support, reply <strong>HELP</strong> or contact <span className="text-emerald-400">info@texaswebcoders.com</span>.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 bg-zinc-950 border border-zinc-800/80 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2.5 text-white font-semibold text-lg">
              <Lock className="w-5 h-5 text-emerald-400" />
              <h2>4. How We Use Your Information</h2>
            </div>
            <p>Your information is utilized solely to:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2 p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Prepare accurate technical architecture proposals and project estimates.</span>
              </div>
              <div className="flex items-start gap-2 p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Execute software engineering agreements, NDA protection, and code warranties.</span>
              </div>
              <div className="flex items-start gap-2 p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Coordinate developer schedules and project milestone reviews.</span>
              </div>
              <div className="flex items-start gap-2 p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Deliver security patches, uptime monitoring, and SLA maintenance updates.</span>
              </div>
            </div>
          </section>

          {/* Section 5: Third-party Processors */}
          <section className="space-y-3 bg-zinc-950 border border-zinc-800/80 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2.5 text-white font-semibold text-lg">
              <Globe className="w-5 h-5 text-emerald-400" />
              <h2>5. Third-Party Infrastructure &amp; Security</h2>
            </div>
            <p>
              Texas WebCoders partners with enterprise-grade infrastructure providers to securely transmit and host digital assets:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-zinc-300">
              <li><strong className="text-white">FormSubmit.co:</strong> Secure SSL-encrypted dispatch protocol to immediately route client project submissions to our verified engineering mailbox without storing persistent tracking cookies.</li>
              <li><strong className="text-white">Vercel Inc.:</strong> Global edge network hosting with end-to-end HTTPS/TLS 1.3 encryption, DDoS mitigation, and zero third-party behavioral trackers.</li>
              <li><strong className="text-white">Google Maps Platform:</strong> Embedded location display adhering strictly to standard mapping APIs without personally identifying individual users.</li>
            </ul>
          </section>

          {/* Section 6: Data Rights */}
          <section className="space-y-3 bg-zinc-950 border border-zinc-800/80 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2.5 text-white font-semibold text-lg">
              <Shield className="w-5 h-5 text-emerald-400" />
              <h2>6. Your Privacy Rights (Texas &amp; US Law)</h2>
            </div>
            <p>
              Under Texas and applicable US federal privacy laws, you have the right to access, rectify, or request the permanent deletion of any personal data maintained by Texas WebCoders. To exercise any of these rights, contact our Data Protection Officer at <span className="text-white font-mono">info@texaswebcoders.com</span>. We respond to all formal data inquiries within 14 business days.
            </p>
          </section>

          {/* Section 7: Contact Information */}
          <section className="space-y-4 bg-zinc-950 border border-zinc-800/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-white font-semibold text-lg">7. Contact Texas WebCoders</h2>
            <p className="text-xs sm:text-sm">
              If you have any questions or concerns regarding our Privacy Policy or data handling practices, please contact us:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                <Mail className="w-4 h-4 text-emerald-400 mb-2" />
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Official Email</span>
                <a href="mailto:info@texaswebcoders.com" className="text-xs text-white font-medium hover:underline">
                  info@texaswebcoders.com
                </a>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                <Phone className="w-4 h-4 text-emerald-400 mb-2" />
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Direct Phone</span>
                <a href="tel:+19032226022" className="text-xs text-white font-medium hover:underline font-mono">
                  +1 (903) 222-6022
                </a>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                <MapPin className="w-4 h-4 text-emerald-400 mb-2" />
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Headquarters</span>
                <p className="text-xs text-white leading-relaxed">
                  5221 S Broadway Ave, Tyler, TX 75703
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Footer Return */}
        <div className="text-center pt-12 pb-6">
          <button
            onClick={onBack}
            type="button"
            className="px-6 py-3 rounded-xl bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all cursor-pointer shadow-lg inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Texas WebCoders</span>
          </button>
        </div>

      </div>
    </div>
  );
};
