import React from 'react';
import { Calendar, MessageSquare, Star, Heart, Baby, ShieldCheck, MapPin, Clock } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { CLINIC_IMAGES } from '../data/clinicImages';

interface HeroProps {
  onOpenAppointmentModal: () => void;
  onNavigateToContact?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAppointmentModal }) => {
  return (
    <section id="home" className="relative pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-b from-[#F4FAFA] via-[#F4FAFA]/50 to-white overflow-hidden">
      {/* Background Soft Ambient Accents */}
      <div className="absolute top-12 right-0 -mr-20 w-96 h-96 bg-[#E7F5F1] rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute top-64 left-0 -ml-20 w-80 h-80 bg-[#65B89A]/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Editorial Location Kicker */}
            <div className="text-xs font-semibold tracking-wider text-[#087F8C] uppercase mb-4 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#087F8C]" />
              <span>Shahrah-e-Qaideen &bull; Karachi Medical Center</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-[#17324D] tracking-tight leading-[1.15] mb-6 [text-wrap:balance]">
              {CLINIC_INFO.name} <br className="hidden sm:inline" />
              <span className="text-[#087F8C]">Maternal and Child Care Clinic</span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-[#4B637B] leading-relaxed max-w-2xl mb-8">
              Your trusted destination for maternal and child healthcare. We provide personalized outpatient medicine, gentle pediatric care, antenatal wellness, and fast WhatsApp booking with zero long waiting times.
            </p>

            {/* Action Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <button
                onClick={onOpenAppointmentModal}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-[#087F8C] hover:bg-[#06646E] active:bg-[#055058] rounded-xl shadow-md hover:shadow-lg transition-all focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-[#087F8C]"
              >
                <Calendar className="w-5 h-5" />
                <span>Book an Appointment</span>
              </button>
            </div>

            {/* Quick Clinic Info Snippet - Clean Unboxed Metadata */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 pt-6 border-t border-slate-200/80 text-xs sm:text-sm text-[#4B637B]">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-[#17324D]">{CLINIC_INFO.rating} / 5</span>
                <span className="text-slate-400">({CLINIC_INFO.totalRatings} patient reviews)</span>
              </div>
              
              <span className="text-slate-300 hidden sm:inline" aria-hidden="true">&bull;</span>

              <div className="flex items-center gap-1.5 text-slate-600">
                <Clock className="w-4 h-4 text-[#087F8C] shrink-0" />
                <span>Two Daily Shifts: 10AM–2PM &amp; 5PM–10PM</span>
              </div>
            </div>

          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Subtle Ambient Glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#65B89A]/20 to-[#087F8C]/20 rounded-3xl blur-md" />

              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white border border-white">
                <img
                  src={CLINIC_IMAGES.hero}
                  alt={`${CLINIC_INFO.name} consultation room with physician consulting mother and child`}
                  className="w-full h-[380px] sm:h-[440px] object-cover object-center hover:scale-[1.02] transition-transform duration-500"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />

                {/* Quiet Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#E7F5F1] text-[#087F8C] flex items-center justify-center shrink-0">
                      <Baby className="w-5 h-5 text-[#087F8C]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#17324D]">{CLINIC_INFO.name}</p>
                      <p className="text-[11px] text-[#4B637B]">Maternal &amp; Child Focused Care</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#087F8C]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#65B89A]" /> Verified
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* 3 Information Highlights Under Hero */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Highlight 1 */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#65B89A]/60 transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#E7F5F1] text-[#087F8C] flex items-center justify-center shrink-0">
                <Heart className="w-6 h-6 text-[#087F8C]" />
              </div>
              <div>
                <h3 className="font-bold text-[#17324D] text-base mb-1">
                  1. Patient-Focused Healthcare
                </h3>
                <p className="text-sm text-[#4B637B] leading-relaxed">
                  Dedicated to respectful, empathetic care designed around maternal comfort and child wellbeing.
                </p>
              </div>
            </div>

            {/* Highlight 2 */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#65B89A]/60 transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#E7F5F1] text-[#087F8C] flex items-center justify-center shrink-0">
                <Baby className="w-6 h-6 text-[#087F8C]" />
              </div>
              <div>
                <h3 className="font-bold text-[#17324D] text-base mb-1">
                  2. Maternal &amp; Child Care
                </h3>
                <p className="text-sm text-[#4B637B] leading-relaxed">
                  Specialized clinical environment tailored specifically to mothers, infants, and growing children.
                </p>
              </div>
            </div>

            {/* Highlight 3 */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#65B89A]/60 transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#E7F5F1] text-[#087F8C] flex items-center justify-center shrink-0">
                <MessageSquare className="w-6 h-6 text-[#087F8C]" />
              </div>
              <div>
                <h3 className="font-bold text-[#17324D] text-base mb-1">
                  3. Convenient Clinic Communication
                </h3>
                <p className="text-sm text-[#4B637B] leading-relaxed">
                  Direct WhatsApp access for easy schedule queries, directions, and streamlined appointment requests.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
