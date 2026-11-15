import React from 'react';
import { Phone, MessageCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { CLINIC_IMAGES } from '../data/clinicImages';

interface AboutSectionProps {
  onOpenAppointmentModal: () => void;
  onNavigateToContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenAppointmentModal, onNavigateToContact }) => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Clean Facility Photography */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-100 bg-[#F4FAFA]">
                <img
                  src={CLINIC_IMAGES.facility}
                  alt={`${CLINIC_INFO.name} clean consultation room and vitals diagnostics`}
                  className="w-full h-[380px] sm:h-[460px] object-cover hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Right Column: About Content */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center">
            
            <div className="text-xs font-bold tracking-wider text-[#087F8C] uppercase mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About Our Practice</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#17324D] tracking-tight mb-5 leading-tight [text-wrap:balance]">
              Welcome to {CLINIC_INFO.name}
            </h2>

            <p className="text-base sm:text-lg text-[#4B637B] leading-relaxed mb-6 font-normal">
              {CLINIC_INFO.name} is dedicated to providing compassionate, high-quality medical care in Karachi, Pakistan. Our clinic helps patients discover vital healthcare services, receive timely consultations, and conveniently communicate via direct WhatsApp support.
            </p>

            {/* Core Values & Commitments */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#087F8C] shrink-0 mt-0.5" />
                <p className="text-sm text-[#17324D]">
                  <strong className="font-semibold text-[#17324D]">Dedicated Maternal Focus:</strong> Focused support for expectant mothers, prenatal health checks, post-delivery recovery, and maternal counseling.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#087F8C] shrink-0 mt-0.5" />
                <p className="text-sm text-[#17324D]">
                  <strong className="font-semibold text-[#17324D]">Child &amp; Infant Care:</strong> Caring medical environment designed for infants, toddlers, and young children with developmental guidance.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#087F8C] shrink-0 mt-0.5" />
                <p className="text-sm text-[#17324D]">
                  <strong className="font-semibold text-[#17324D]">Instant WhatsApp Booking &amp; Location:</strong> Zero waiting time anxiety. Pre-book your slot or get our exact live GPS pin directly on WhatsApp.
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onNavigateToContact}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#087F8C] hover:bg-[#06646E] rounded-xl shadow-xs hover:shadow-sm transition-all focus:outline-hidden"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Get in Touch</span>
              </button>

              <button
                onClick={onOpenAppointmentModal}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#087F8C] bg-[#E7F5F1] hover:bg-[#d8efe8] rounded-xl border border-[#65B89A]/40 transition-colors"
              >
                <span>Request Appointment</span>
              </button>

              <a
                href={`https://wa.me/${CLINIC_INFO.phoneRaw}?text=${encodeURIComponent(`Hello, I am inquiring about ${CLINIC_INFO.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#4B637B] hover:text-[#087F8C] py-2 px-3 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#65B89A]" />
                <span>{CLINIC_INFO.phoneFormatted}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
