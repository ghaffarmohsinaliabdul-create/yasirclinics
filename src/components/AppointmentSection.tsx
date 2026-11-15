import React from 'react';
import { AppointmentForm } from './AppointmentForm';

export const AppointmentSection: React.FC = () => {
  return (
    <section id="book-appointment" className="py-20 bg-gradient-to-b from-white to-[#F4FAFA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E7F5F1] text-[#087F8C] text-xs font-bold tracking-wider uppercase mb-3">
            Schedule a Visit
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17324D] tracking-tight mb-4 [text-wrap:balance]">
            Book an Appointment
          </h2>
          <p className="text-base text-[#4B637B] leading-relaxed max-w-2xl mx-auto">
            Fill out the form below with your preferred consultation date and details. Your request is sent directly to the clinic's inbox (<span className="font-semibold text-[#087F8C]">tiktokpakistanmedia344@gmail.com</span>) and prepared for rapid WhatsApp confirmation.
          </p>
        </div>

        {/* Appointment Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md">
          <AppointmentForm isModal={false} />
        </div>

      </div>
    </section>
  );
};
