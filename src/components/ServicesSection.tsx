import React, { useState } from 'react';
import { 
  HeartPulse, 
  Baby, 
  ShieldPlus, 
  Stethoscope, 
  Activity, 
  Bandage,
  ArrowRight, 
  X, 
  Calendar, 
  Phone,
  Sparkles,
  CheckCircle2,
  Clock,
  Users
} from 'lucide-react';
import { CLINIC_SERVICES, ServiceItem, CLINIC_INFO } from '../data/clinicData';

interface ServicesSectionProps {
  onOpenAppointmentModal: (preselectedService?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenAppointmentModal }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'Child Health', label: 'Pediatrics & Child' },
    { id: 'Maternal Wellness', label: 'Maternal & Antenatal' },
    { id: 'Primary Healthcare', label: 'General Medicine' },
    { id: 'Diagnostics', label: 'Diagnostics & Vitals' },
    { id: 'Clinical Care', label: 'First Aid & Procedures' },
  ];

  const filteredServices = activeCategory === 'all'
    ? CLINIC_SERVICES
    : CLINIC_SERVICES.filter(s => s.category.toLowerCase().includes(activeCategory.toLowerCase()));

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-[#087F8C]" />;
      case 'Baby':
        return <Baby className="w-6 h-6 text-[#087F8C]" />;
      case 'ShieldPlus':
        return <ShieldPlus className="w-6 h-6 text-[#087F8C]" />;
      case 'Stethoscope':
        return <Stethoscope className="w-6 h-6 text-[#087F8C]" />;
      case 'Bandage':
        return <Bandage className="w-6 h-6 text-[#087F8C]" />;
      case 'Activity':
      default:
        return <Activity className="w-6 h-6 text-[#087F8C]" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-[#F4FAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs font-bold tracking-wider text-[#087F8C] uppercase mb-3 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Healthcare Services &amp; Specialties</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17324D] tracking-tight mb-4 [text-wrap:balance]">
            Comprehensive Medical Care at {CLINIC_INFO.name}
          </h2>
          <p className="text-base text-[#4B637B] leading-relaxed">
            From pediatric care and maternal wellness to routine family consultations and vital diagnostics, our medical team provides clean, attentive, and dependable care.
          </p>
        </div>

        {/* Category Filters (Clean Segmented Tabs) */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#087F8C] text-white shadow-xs'
                    : 'bg-white text-[#17324D] hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-[#65B89A]/60 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Category & Icon & Unboxed Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#E7F5F1] group-hover:bg-[#d8efe8] transition-colors flex items-center justify-center">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#087F8C] font-semibold">
                    <span>{service.badge}</span>
                    <span className="text-slate-300" aria-hidden="true">&bull;</span>
                    <span className="text-[#4B637B] font-medium text-[11px]">{service.category}</span>
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-lg font-bold text-[#17324D] group-hover:text-[#087F8C] transition-colors mb-2 leading-snug">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-[#4B637B] leading-relaxed mb-4">
                  {service.shortDescription}
                </p>

                {/* Quick Info Tags */}
                <div className="pt-3 border-t border-slate-100 space-y-1.5 mb-6 text-xs text-[#4B637B]">
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-[#087F8C] shrink-0" />
                    <span className="truncate">{service.suitableFor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#65B89A] shrink-0" />
                    <span className="truncate">{service.turnaroundTime}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedService(service)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#087F8C] hover:text-[#06646E] group-hover:translate-x-0.5 transition-all focus:outline-hidden"
                >
                  <span>Learn Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onOpenAppointmentModal(service.title)}
                  className="text-xs font-semibold text-[#17324D] hover:text-[#087F8C] bg-slate-50 hover:bg-[#E7F5F1] px-3.5 py-1.5 rounded-lg border border-slate-200 transition-colors"
                >
                  Book Service
                </button>
              </div>
            </div>
          ))}
        </div>


      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 animate-in zoom-in-95 duration-150">
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4 pr-6">
              <div className="w-12 h-12 rounded-xl bg-[#E7F5F1] flex items-center justify-center shrink-0">
                {getServiceIcon(selectedService.iconName)}
              </div>
              <div>
                <span className="text-xs font-semibold text-[#087F8C] uppercase tracking-wider block">
                  {selectedService.category}
                </span>
                <h3 className="text-xl font-bold text-[#17324D] leading-snug">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="text-sm text-[#4B637B] leading-relaxed mb-6 space-y-3">
              <p>{selectedService.fullDescription}</p>
              
              <div className="p-3 bg-[#F4FAFA] rounded-xl border border-[#65B89A]/30 text-xs text-[#17324D] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#17324D]">Target Patients:</span>
                  <span className="text-[#087F8C] font-medium">{selectedService.suitableFor}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#17324D]">Turnaround:</span>
                  <span className="text-[#65B89A] font-semibold">{selectedService.turnaroundTime}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  const serviceName = selectedService.title;
                  setSelectedService(null);
                  onOpenAppointmentModal(serviceName);
                }}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#087F8C] hover:bg-[#06646E] rounded-xl shadow-xs"
              >
                <Calendar className="w-4 h-4" />
                <span>Request Appointment</span>
              </button>

              <a
                href={`https://wa.me/${CLINIC_INFO.phoneRaw}?text=${encodeURIComponent(`Hello ${CLINIC_INFO.name}, I would like to inquire about ${selectedService.title}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#087F8C] bg-[#E7F5F1] hover:bg-[#d8efe8] rounded-xl border border-[#65B89A]/40"
              >
                <Phone className="w-4 h-4" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
