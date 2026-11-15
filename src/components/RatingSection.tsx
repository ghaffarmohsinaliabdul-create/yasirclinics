import React from 'react';
import { Star, ShieldCheck, ThumbsUp, Users, HeartHandshake, Phone } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

export const RatingSection: React.FC = () => {
  return (
    <section className="py-16 bg-[#F4FAFA] border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Rating Metric Box */}
            <div className="lg:col-span-5 text-center lg:text-left border-b lg:border-b-0 lg:border-r border-slate-200 pb-8 lg:pb-0 lg:pr-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#E7F5F1] text-[#087F8C] text-xs font-bold uppercase tracking-wider mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Public Rating</span>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-4 mb-3">
                <span className="text-6xl sm:text-7xl font-extrabold text-[#17324D] tracking-tight">
                  {CLINIC_INFO.rating}
                </span>
                <div className="flex flex-col items-start">
                  <div className="flex items-center text-amber-400 gap-1 mb-1">
                    {[1, 2, 3, 4].map((star) => (
                      <Star key={star} className="w-6 h-6 fill-amber-400 text-amber-400" />
                    ))}
                    {/* Partial star for 4.8 */}
                    <div className="relative">
                      <Star className="w-6 h-6 text-slate-200 fill-slate-200" />
                      <div className="absolute top-0 left-0 overflow-hidden w-[80%]">
                        <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-[#17324D]">
                    out of 5 stars
                  </span>
                </div>
              </div>

              <p className="text-base font-medium text-[#4B637B]">
                Based on <strong className="font-bold text-[#17324D]">{CLINIC_INFO.totalRatings} ratings</strong> submitted by patients on public clinic profiles.
              </p>

              <p className="text-xs text-slate-400 mt-3 italic">
                * Official directory score for {CLINIC_INFO.name}. In adherence to medical transparency guidelines, individual patient reviews are not fabricated.
              </p>
            </div>

            {/* Right Trust Pillars */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-5 rounded-2xl bg-[#F4FAFA] border border-slate-100 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#E7F5F1] text-[#087F8C] flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#17324D] mb-1">
                    Compassionate Care
                  </h4>
                  <p className="text-xs text-[#4B637B] leading-relaxed">
                    Prioritizing comfortable, respectful clinical attention tailored to individuals and families in Karachi.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#F4FAFA] border border-slate-100 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#E7F5F1] text-[#087F8C] flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#17324D] mb-1">
                    Family &amp; Child Health
                  </h4>
                  <p className="text-xs text-[#4B637B] leading-relaxed">
                    Gentle, dedicated approach for all age groups to ease outpatient consultations and checkups.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#F4FAFA] border border-slate-100 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#E7F5F1] text-[#087F8C] flex items-center justify-center shrink-0">
                  <ThumbsUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#17324D] mb-1">
                    Central Location
                  </h4>
                  <p className="text-xs text-[#4B637B] leading-relaxed">
                    Accessible medical center in Karachi with fast live map pin dispatch on WhatsApp.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#F4FAFA] border border-slate-100 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#E7F5F1] text-[#087F8C] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#087F8C]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#17324D] mb-1">
                    Direct WhatsApp Support
                  </h4>
                  <p className="text-xs text-[#4B637B] leading-relaxed">
                    Fast WhatsApp connectivity ({CLINIC_INFO.phoneFormatted}) for schedule check, queries, and appointments.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
