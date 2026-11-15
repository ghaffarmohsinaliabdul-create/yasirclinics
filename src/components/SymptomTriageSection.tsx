import React, { useState } from 'react';
import { HelpCircle, Stethoscope, ArrowRight, Calendar, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { SYMPTOM_CARE_TRIAGE, SymptomGuide, CLINIC_INFO } from '../data/clinicData';

interface SymptomTriageSectionProps {
  onOpenAppointmentModal: (careArea?: string) => void;
}

export const SymptomTriageSection: React.FC<SymptomTriageSectionProps> = ({ onOpenAppointmentModal }) => {
  const [selectedGuide, setSelectedGuide] = useState<SymptomGuide>(SYMPTOM_CARE_TRIAGE[0]);

  return (
    <section id="triage" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-bold tracking-wider text-[#087F8C] uppercase mb-3 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Patient Guidance &amp; Triage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17324D] tracking-tight mb-4 [text-wrap:balance]">
            When to Visit {CLINIC_INFO.name}
          </h2>
          <p className="text-base text-[#4B637B] leading-relaxed">
            Not sure which department to consult? Select your or your child&apos;s symptoms below for immediate care recommendations and shift timing guidance.
          </p>
        </div>

        {/* 2-Column Interactive Triage Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Symptom Selector Buttons */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            <span className="text-xs font-bold text-[#17324D] uppercase tracking-wider mb-1 px-1">
              Select Current Concern:
            </span>
            {SYMPTOM_CARE_TRIAGE.map((item) => {
              const isSelected = selectedGuide.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedGuide(item)}
                  className={`w-full p-4 rounded-xl text-left border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-[#087F8C] bg-[#E7F5F1]/80 shadow-xs ring-1 ring-[#087F8C]'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                        isSelected
                          ? 'bg-[#087F8C] text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <div>
                      <p className={`text-sm font-semibold leading-tight ${isSelected ? 'text-[#087F8C]' : 'text-[#17324D]'}`}>
                        {item.symptom}
                      </p>
                      <p className="text-xs text-[#4B637B] mt-0.5 line-clamp-1">
                        {item.recommendedDepartment}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-[#087F8C] translate-x-1' : 'text-slate-300'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Advice & Direct Booking Panel */}
          <div className="lg:col-span-7 bg-[#F4FAFA] rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-200">
                <div>
                  <span className="text-xs font-bold text-[#087F8C] uppercase tracking-wider block">
                    Recommended Consultation
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#17324D] mt-1">
                    {selectedGuide.recommendedDepartment}
                  </h3>
                </div>
                <div className="w-11 h-11 rounded-xl bg-white text-[#087F8C] flex items-center justify-center shadow-2xs shrink-0 border border-slate-100">
                  <CheckCircle2 className="w-6 h-6 text-[#087F8C]" />
                </div>
              </div>

              {/* Timing Advice */}
              <div className="mb-5 p-4 rounded-xl bg-white border border-slate-200">
                <span className="text-xs font-bold text-[#17324D] block uppercase tracking-wider mb-1">
                  Advised Consultation Hours:
                </span>
                <p className="text-sm font-semibold text-[#087F8C]">
                  {selectedGuide.timingAdvice}
                </p>
              </div>

              {/* Clinical Instructions */}
              <div className="mb-6 space-y-3">
                <span className="text-xs font-bold text-[#17324D] block uppercase tracking-wider">
                  Important Preparation for Visit:
                </span>
                <p className="text-sm text-[#4B637B] leading-relaxed bg-white/70 p-3.5 rounded-xl border border-slate-200/80">
                  {selectedGuide.keyInstructions}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2 mb-6">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Emergency Note:</strong> For acute respiratory distress, severe bleeding, or high trauma, visit hospital emergency services immediately.
                </span>
              </div>
            </div>

            {/* CTA: Book this department */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => onOpenAppointmentModal(selectedGuide.recommendedDepartment)}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#087F8C] hover:bg-[#06646E] rounded-xl shadow-xs transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book for {selectedGuide.symptom}</span>
              </button>

              <a
                href={`https://wa.me/${CLINIC_INFO.phoneRaw}?text=${encodeURIComponent(`Hello ${CLINIC_INFO.name}, I am inquiring about care for: ${selectedGuide.symptom}. ${selectedGuide.prefilledReason}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#087F8C] bg-white hover:bg-[#E7F5F1] rounded-xl border border-slate-200 transition-colors"
              >
                <span>Ask on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
