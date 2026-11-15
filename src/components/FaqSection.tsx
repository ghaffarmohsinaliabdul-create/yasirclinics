import React, { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { CLINIC_FAQS, CLINIC_INFO } from '../data/clinicData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E7F5F1] text-[#087F8C] text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Patient Help &amp; FAQs
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17324D] tracking-tight mb-4 [text-wrap:balance]">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-[#4B637B] leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about consulting at {CLINIC_INFO.name}, appointment scheduling, and visiting our Karachi clinic.
          </p>
        </div>

        {/* Accordion FAQ Items */}
        <div className="space-y-4">
          {CLINIC_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#65B89A] bg-[#F4FAFA]/50 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  className="w-full py-4 sm:py-5 px-5 sm:px-6 flex items-center justify-between text-left focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-[#17324D] text-sm sm:text-base pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-[#087F8C] text-white rotate-180'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#4B637B] leading-relaxed border-t border-slate-100 animate-in fade-in duration-150">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
