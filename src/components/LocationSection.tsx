import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check, Phone, ExternalLink, Send, ShieldCheck } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { copyToClipboard } from '../utils/appointment';

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyToClipboard(CLINIC_INFO.address);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="location" className="py-20 bg-[#F4FAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E7F5F1] text-[#087F8C] text-xs font-bold tracking-wider uppercase mb-3">
            <MapPin className="w-3.5 h-3.5" />
            Clinic Location &amp; Directions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17324D] tracking-tight mb-4">
            Visit {CLINIC_INFO.name}
          </h2>
          <p className="text-base text-[#4B637B] leading-relaxed">
            Easily reachable from across Karachi. Need the exact real-time GPS pin? Tap below to receive our live location directly on your WhatsApp.
          </p>
        </div>

        {/* Map & Address Card Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Address Details Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#E7F5F1] text-[#087F8C] flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#087F8C]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#17324D] leading-tight">
                      {CLINIC_INFO.name}
                    </h3>
                    <p className="text-xs text-[#4B637B]">Healthcare &amp; Medical Center</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified
                </span>
              </div>

              {/* Full Address Block */}
              <div className="mb-6 p-4 rounded-2xl bg-[#F4FAFA] border border-[#65B89A]/30">
                <span className="text-xs font-bold text-[#087F8C] uppercase tracking-wider block mb-1">
                  Clinic Location:
                </span>
                <p className="text-sm font-semibold text-[#17324D] leading-relaxed">
                  {CLINIC_INFO.address}
                </p>
              </div>

              {/* Highlights & Convenience Features */}
              <div className="space-y-3 mb-8 text-xs sm:text-sm text-[#4B637B]">
                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#087F8C] mt-1.5 shrink-0" />
                  <span><strong>Accessible Route:</strong> Easy road access with convenient drop-off and patient parking.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#087F8C] mt-1.5 shrink-0" />
                  <span><strong>Instant Live GPS:</strong> Receive the exact real-time map pin directly on WhatsApp with one click.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#087F8C] mt-1.5 shrink-0" />
                  <span><strong>Direct Assistance:</strong> Our front desk assists arriving patients with turn-by-turn landmark directions.</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              
              {/* PRIMARY: Request Live Pin on WhatsApp */}
              <a
                href={`https://wa.me/${CLINIC_INFO.phoneRaw}?text=${encodeURIComponent(`Hello ${CLINIC_INFO.name}, please send your exact live clinic location pin on WhatsApp.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-all hover:shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Send Live Location Pin on WhatsApp</span>
              </a>

              {/* Get Directions Button */}
              <a
                href={CLINIC_INFO.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#087F8C] hover:bg-[#06646E] rounded-xl shadow-xs transition-colors"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
              </a>

              {/* Copy Address Button */}
              <button
                onClick={handleCopy}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#17324D] bg-[#F4FAFA] hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Address Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#087F8C]" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>

              {/* Quick Call / WhatsApp Contact Button */}
              <a
                href={`https://wa.me/${CLINIC_INFO.phoneRaw}?text=${encodeURIComponent(`Hello ${CLINIC_INFO.name}, I need help with directions to the clinic.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#087F8C] bg-[#E7F5F1] hover:bg-[#d8efe8] rounded-xl border border-[#65B89A]/30 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp Helpline: {CLINIC_INFO.phoneFormatted}</span>
              </a>
            </div>

          </div>

          {/* Embedded Google Map */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-3 border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="relative w-full h-full min-h-[400px] sm:min-h-[460px] rounded-2xl overflow-hidden bg-slate-100">
              <iframe
                title={`${CLINIC_INFO.name} Location Map`}
                src={CLINIC_INFO.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full absolute inset-0"
              />
            </div>
            <div className="p-3 text-center sm:text-left text-xs text-[#4B637B] flex flex-col sm:flex-row items-center justify-between gap-2">
              <span>Interactive Navigation Map &bull; Karachi</span>
              <a
                href={CLINIC_INFO.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#087F8C] hover:underline font-semibold"
              >
                Open Full Interactive Map &rarr;
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
