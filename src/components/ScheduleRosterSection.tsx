import React, { useState } from 'react';
import { Clock, Calendar, ShieldCheck, CheckCircle2, Phone, Sparkles } from 'lucide-react';
import { WEEKLY_SCHEDULE, CLINIC_INFO, SCHEDULE_INFO } from '../data/clinicData';

interface ScheduleRosterSectionProps {
  onOpenAppointmentModal: (careArea?: string) => void;
}

export const ScheduleRosterSection: React.FC<ScheduleRosterSectionProps> = ({ onOpenAppointmentModal }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const activeDay = WEEKLY_SCHEDULE[selectedDayIndex];

  return (
    <section id="schedule" className="py-20 bg-[#F4FAFA] border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-bold tracking-wider text-[#087F8C] uppercase mb-3 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consultation Timetable</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17324D] tracking-tight mb-4 [text-wrap:balance]">
            Doctor Consultation Hours &amp; Roster
          </h2>
          <p className="text-base text-[#4B637B] leading-relaxed">
            {CLINIC_INFO.name} operates structured morning and evening shifts to accommodate working parents and families throughout the week.
          </p>
        </div>

        {/* Day Selector Tabs (Clean Segmented Control) */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {WEEKLY_SCHEDULE.map((item, idx) => {
            const isSelected = selectedDayIndex === idx;
            return (
              <button
                key={item.day}
                onClick={() => setSelectedDayIndex(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-[#087F8C] text-white shadow-xs'
                    : 'bg-white text-[#17324D] hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {item.day}
              </button>
            );
          })}
        </div>

        {/* Active Day Detail Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
            <div>
              <span className="text-xs font-bold text-[#087F8C] uppercase tracking-wider block">
                Selected Day Schedule
              </span>
              <h3 className="text-2xl font-bold text-[#17324D] mt-1">
                {activeDay.day} Consultation Routine
              </h3>
            </div>
            <div>
              {activeDay.isOpen ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Regular Duty Hours Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
                  <Phone className="w-3.5 h-3.5 text-amber-600" />
                  WhatsApp Support On-Call
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Morning Shift */}
            <div className="p-5 rounded-2xl bg-[#F4FAFA] border border-slate-200">
              <div className="flex items-center gap-2.5 text-xs font-bold text-[#087F8C] uppercase tracking-wider mb-2">
                <Clock className="w-4 h-4 text-[#087F8C]" />
                <span>Morning Shift</span>
              </div>
              <p className="text-lg font-bold text-[#17324D] tabular-nums mb-2">
                {activeDay.morningSlot}
              </p>
              <p className="text-xs text-[#4B637B]">
                Ideal for routine fasting blood tests, newborn pediatric checks, and quiet morning consultations.
              </p>
            </div>

            {/* Evening Shift */}
            <div className="p-5 rounded-2xl bg-[#F4FAFA] border border-slate-200">
              <div className="flex items-center gap-2.5 text-xs font-bold text-[#087F8C] uppercase tracking-wider mb-2">
                <Clock className="w-4 h-4 text-[#087F8C]" />
                <span>Evening Shift</span>
              </div>
              <p className="text-lg font-bold text-[#17324D] tabular-nums mb-2">
                {activeDay.eveningSlot}
              </p>
              <p className="text-xs text-[#4B637B]">
                Convenient after-office slot for working parents, follow-up checkups, and general outpatient treatment.
              </p>
            </div>
          </div>

          {/* Active Departments on this day */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-8 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#087F8C] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-[#17324D] uppercase tracking-wider">
                Active Medical Departments:
              </p>
              <p className="text-sm font-medium text-[#4B637B] mt-0.5">
                {activeDay.departments}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <div className="text-xs text-[#4B637B] text-center sm:text-left">
              Need to visit on <strong>{activeDay.day}</strong>? Pre-book to secure your time slot.
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => onOpenAppointmentModal(`Consultation on ${activeDay.day}`)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#087F8C] hover:bg-[#06646E] rounded-xl shadow-xs transition-colors whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                <span>Book for {activeDay.day}</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
