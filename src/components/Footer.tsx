import React from 'react';
import { MapPin, Phone, Mail, Clock, HeartHandshake, ShieldCheck, ArrowUp, Send } from 'lucide-react';
import { CLINIC_INFO, SCHEDULE_INFO } from '../data/clinicData';

interface FooterProps {
  onOpenAppointmentModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAppointmentModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Clinic', href: '#about' },
    { name: 'Our Services', href: '#services' },
    { name: 'Doctor Schedule', href: '#schedule' },
    { name: 'Location & Directions', href: '#location' },
  ];

  return (
    <footer className="bg-[#17324D] text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-700/80">
          
          {/* Column 1: Clinic Name & Short Intro */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#087F8C] text-white flex items-center justify-center shadow-xs">
                <HeartHandshake className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white leading-tight">
                  {CLINIC_INFO.name}
                </span>
                <span className="text-xs text-slate-300">
                  Healthcare &amp; Medical Center
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
              {CLINIC_INFO.name} provides patient-centered, compassionate medical care for families in Karachi. Dedicated to quality healthcare, routine consultations, and rapid WhatsApp communication.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700 w-fit">
              <ShieldCheck className="w-4 h-4 text-[#65B89A]" />
              <span>Public Patient Rating: <strong>{CLINIC_INFO.rating}/5</strong> ({CLINIC_INFO.totalRatings} verified reviews)</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-[#65B89A] transition-colors focus:outline-hidden"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={onOpenAppointmentModal}
                  className="text-[#65B89A] hover:underline font-semibold text-left"
                >
                  Book Appointment
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Information */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Clinic Contact
            </h4>
            <div className="space-y-3.5 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#65B89A] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {CLINIC_INFO.address}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#65B89A] shrink-0" />
                <a
                  href={`https://wa.me/${CLINIC_INFO.phoneRaw}?text=${encodeURIComponent(`Hello ${CLINIC_INFO.name}, I would like to inquire about the clinic.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#65B89A] transition-colors font-medium text-white"
                >
                  {CLINIC_INFO.phoneFormatted} (WhatsApp)
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#65B89A] shrink-0" />
                <a
                  href={`mailto:${CLINIC_INFO.email}`}
                  className="hover:text-[#65B89A] transition-colors font-medium text-white break-all"
                >
                  {CLINIC_INFO.email}
                </a>
              </div>

              <div>
                <a
                  href={`https://wa.me/${CLINIC_INFO.phoneRaw}?text=${encodeURIComponent(`Hello ${CLINIC_INFO.name}, please send your exact live clinic location pin on WhatsApp.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#65B89A] hover:underline"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request Live GPS Pin on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Consultation Hours */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#65B89A]" />
              <span>Consultation Hours</span>
            </h4>
            
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 space-y-2">
              <div className="flex justify-between items-center text-slate-300">
                <span className="font-medium">Morning Shift:</span>
                <span className="font-semibold text-white">{SCHEDULE_INFO.morning}</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span className="font-medium">Evening Shift:</span>
                <span className="font-semibold text-white">{SCHEDULE_INFO.evening}</span>
              </div>
              <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-700">
                {SCHEDULE_INFO.days}
              </div>
              <div className="pt-2 border-t border-slate-700/80">
                <a
                  href={`https://wa.me/${CLINIC_INFO.phoneRaw}?text=${encodeURIComponent(`Hello ${CLINIC_INFO.name}, could you please confirm today's doctor consultation schedule?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#65B89A] hover:underline font-semibold block"
                >
                  Check Today&apos;s Schedule on WhatsApp &rarr;
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-center sm:text-left">
            &copy; 2026 {CLINIC_INFO.name}. All Rights Reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors focus:outline-hidden"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
