import React, { useEffect } from 'react';
import { X, Calendar } from 'lucide-react';
import { AppointmentForm } from './AppointmentForm';
import { CLINIC_INFO } from '../data/clinicData';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDoctor?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preselectedDoctor,
}) => {
  // ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="appointment-modal-title"
    >
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 my-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#087F8C]"
          aria-label="Close appointment modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6 pr-8">
          <div className="w-12 h-12 rounded-2xl bg-[#E7F5F1] text-[#087F8C] flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6 text-[#087F8C]" />
          </div>
          <div>
            <h2 id="appointment-modal-title" className="text-xl sm:text-2xl font-bold text-[#17324D] leading-tight">
              Book an Appointment
            </h2>
            <p className="text-xs sm:text-sm text-[#4B637B] mt-0.5">
              {CLINIC_INFO.name} · Email: {CLINIC_INFO.appointmentEmail} · WhatsApp: {CLINIC_INFO.phoneFormatted}
            </p>
          </div>
        </div>

        {/* Inner Form */}
        <AppointmentForm
          initialDoctor={preselectedDoctor}
          isModal={true}
        />
      </div>
    </div>
  );
};
