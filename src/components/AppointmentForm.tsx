import React, { useState } from 'react';
import { 
  Calendar, 
  User, 
  Phone, 
  Mail,
  Clock, 
  AlertCircle, 
  ExternalLink,
  Loader2,
  Copy,
  Check,
  Send
} from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { 
  AppointmentFormData, 
  ValidationErrors, 
  validateAppointmentForm, 
  formatAppointmentEmailSubject,
  formatAppointmentEmailBody,
  generateMailtoAppointmentUrl,
  generateWhatsAppAppointmentUrl,
  sendAppointmentNotification,
  copyToClipboard
} from '../utils/appointment';

interface AppointmentFormProps {
  initialDoctor?: string;
  onSuccess?: () => void;
  isModal?: boolean;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  initialDoctor = '',
  onSuccess,
  isModal = false
}) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const [formData, setFormData] = useState<AppointmentFormData>({
    patientName: '',
    phoneNumber: '',
    patientEmail: '',
    patientAge: '',
    appointmentDate: minDate,
    preferredTime: 'Morning (10:00 AM - 1:00 PM)',
    doctor: initialDoctor || 'First Available Consultant',
    reason: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    data: AppointmentFormData;
    mailtoUrl: string;
    whatsAppUrl: string;
    emailBody: string;
    emailSubject: string;
    method: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const timeSlots = [
    'Morning (10:00 AM - 1:00 PM)',
    'Afternoon (2:00 PM - 5:00 PM)',
    'Evening (6:00 PM - 9:00 PM)',
    'Flexible / Any Available Slot',
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name as keyof ValidationErrors]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateAppointmentForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Send directly to clinic email: tiktokpakistanmedia344@gmail.com
      const res = await sendAppointmentNotification(formData);

      const mailtoUrl = generateMailtoAppointmentUrl(formData);
      const whatsAppUrl = generateWhatsAppAppointmentUrl(formData);
      const emailBody = formatAppointmentEmailBody(formData);
      const emailSubject = formatAppointmentEmailSubject(formData);

      setSubmittedData({
        data: { ...formData },
        mailtoUrl,
        whatsAppUrl,
        emailBody,
        emailSubject,
        method: res.method,
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = async () => {
    if (!submittedData) return;
    const ok = await copyToClipboard(
      `Subject: ${submittedData.emailSubject}\nTo: ${CLINIC_INFO.appointmentEmail}\n\n${submittedData.emailBody}`
    );
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const resetForm = () => {
    setSubmittedData(null);
    setFormData({
      patientName: '',
      phoneNumber: '',
      patientEmail: '',
      patientAge: '',
      appointmentDate: minDate,
      preferredTime: 'Morning (10:00 AM - 1:00 PM)',
      doctor: 'First Available Consultant',
      reason: '',
    });
    setErrors({});
  };

  return (
    <div className="w-full">
      {/* Success Notification Card with Big Green Tick Mark and Patient Details */}
      {submittedData ? (
        <div className="p-6 sm:p-8 bg-white rounded-2xl border-2 border-emerald-400/80 shadow-lg text-center animate-in fade-in zoom-in-95 duration-200">
          
          {/* Prominent Big Green Tick Mark (Tik Ka Nishan) */}
          <div className="w-20 h-20 rounded-full bg-emerald-100 border-4 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm animate-in zoom-in-50 duration-300">
            <Check className="w-12 h-12 text-emerald-600 stroke-[3]" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#17324D] tracking-tight mb-1">
            Appointment Booked Successfully!
          </h3>
          <p className="text-xs sm:text-sm text-emerald-700 font-medium mb-6">
            Aapki appointment request kamyabi se record kar li gayi hai.
          </p>

          {/* Patient Details Card (Name and Age Highlighted) */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 sm:p-6 mb-6 text-left">
            <div className="text-xs uppercase tracking-wider font-extrabold text-emerald-900 mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-700" />
              <span>Patient Information (Mareez Ki Maloomat)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              
              {/* Patient Name */}
              <div className="bg-white p-3.5 rounded-xl border border-emerald-100 shadow-xs">
                <span className="text-xs text-slate-500 font-semibold block uppercase tracking-wider">
                  Patient Name (Mareez Ka Naam):
                </span>
                <strong className="text-base sm:text-lg text-[#17324D] block mt-0.5">
                  {submittedData.data.patientName}
                </strong>
              </div>

              {/* Patient Age */}
              <div className="bg-white p-3.5 rounded-xl border border-emerald-100 shadow-xs">
                <span className="text-xs text-slate-500 font-semibold block uppercase tracking-wider">
                  Patient Age (Umar):
                </span>
                <strong className="text-base sm:text-lg text-emerald-800 block mt-0.5">
                  {submittedData.data.patientAge}
                </strong>
              </div>

              {/* Patient Phone */}
              <div className="bg-white p-3.5 rounded-xl border border-emerald-100 shadow-xs">
                <span className="text-xs text-slate-500 font-semibold block uppercase tracking-wider">
                  Phone / WhatsApp:
                </span>
                <strong className="text-sm sm:text-base text-[#17324D] block mt-0.5">
                  {submittedData.data.phoneNumber}
                </strong>
              </div>

              {/* Appointment Date & Slot */}
              <div className="bg-white p-3.5 rounded-xl border border-emerald-100 shadow-xs">
                <span className="text-xs text-slate-500 font-semibold block uppercase tracking-wider">
                  Appointment Date &amp; Slot:
                </span>
                <strong className="text-sm sm:text-base text-[#17324D] block mt-0.5">
                  {submittedData.data.appointmentDate} ({submittedData.data.preferredTime})
                </strong>
              </div>

              {/* Care Area & Notes */}
              <div className="sm:col-span-2 bg-white p-3.5 rounded-xl border border-emerald-100 shadow-xs">
                <span className="text-xs text-slate-500 font-semibold block uppercase tracking-wider">
                  Department / Reason:
                </span>
                <strong className="text-sm text-[#17324D] block mt-0.5">
                  {submittedData.data.doctor}
                </strong>
                <p className="text-xs text-slate-600 mt-1 italic">
                  &ldquo;{submittedData.data.reason}&rdquo;
                </p>
              </div>

            </div>
          </div>

          {/* Email Delivery Confirmation Card */}
          <div className="p-4 bg-[#F4FAFA] rounded-2xl border border-[#087F8C]/20 text-xs sm:text-sm text-[#17324D] mb-6 flex items-start gap-3 text-left">
            <div className="w-9 h-9 rounded-full bg-[#E7F5F1] text-[#087F8C] flex items-center justify-center shrink-0 mt-0.5">
              <Mail className="w-5 h-5 text-[#087F8C]" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-[#087F8C] flex items-center gap-2">
                <span>Sent to Official Clinic Email</span>
                <span className="text-[10px] uppercase font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Dispatched
                </span>
              </div>
              <p className="mt-1 text-slate-700 leading-relaxed text-xs sm:text-sm">
                Ye tamam details clinic ke email address <strong className="font-mono text-[#17324D] underline font-bold">{CLINIC_INFO.appointmentEmail}</strong> par send ho chuki hain.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <a
              href={submittedData.mailtoUrl}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#087F8C] hover:bg-[#06646E] rounded-xl shadow-xs transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Open Email App (Send Copy)</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>

            <a
              href={submittedData.whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl shadow-xs transition-colors"
            >
              <Send className="w-4 h-4 text-emerald-600" />
              <span>Send on WhatsApp ({CLINIC_INFO.phoneFormatted})</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1 text-emerald-600" />
            </a>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              title="Copy details to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
              <span>{copied ? 'Copied!' : 'Copy Info'}</span>
            </button>

            <button
              onClick={resetForm}
              className="px-4 py-3 text-sm font-semibold text-[#17324D] hover:bg-slate-100 rounded-xl transition-colors"
            >
              Book Another
            </button>
          </div>

        </div>
      ) : (
        /* Appointment Booking Form */
        <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
          
          {/* General error banner if errors exist */}
          {Object.keys(errors).length > 0 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>Please correct the highlighted fields below before submitting your request.</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Patient Name */}
            <div>
              <label htmlFor="patientName" className="block text-xs font-bold text-[#17324D] uppercase tracking-wider mb-1.5">
                Patient Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="patientName"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  placeholder="e.g. Fatima Khan"
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm text-[#17324D] placeholder-slate-400 focus:outline-hidden focus:ring-2 transition-all ${
                    errors.patientName
                      ? 'border-red-500 focus:ring-red-300 bg-red-50/20'
                      : 'border-slate-300 focus:border-[#087F8C] focus:ring-[#087F8C]/20 bg-white'
                  }`}
                  required
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              </div>
              {errors.patientName && (
                <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.patientName}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-xs font-bold text-[#17324D] uppercase tracking-wider mb-1.5">
                WhatsApp / Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="e.g. 0329 3179587"
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm text-[#17324D] placeholder-slate-400 focus:outline-hidden focus:ring-2 transition-all ${
                    errors.phoneNumber
                      ? 'border-red-500 focus:ring-red-300 bg-red-50/20'
                      : 'border-slate-300 focus:border-[#087F8C] focus:ring-[#087F8C]/20 bg-white'
                  }`}
                  required
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              </div>
              {errors.phoneNumber && (
                <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.phoneNumber}</p>
              )}
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Patient Email (Optional) */}
            <div>
              <label htmlFor="patientEmail" className="block text-xs font-bold text-[#17324D] uppercase tracking-wider mb-1.5">
                Your Email <span className="text-slate-400 font-normal lowercase">(optional)</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="patientEmail"
                  name="patientEmail"
                  value={formData.patientEmail}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm text-[#17324D] placeholder-slate-400 focus:outline-hidden focus:ring-2 transition-all ${
                    errors.patientEmail
                      ? 'border-red-500 focus:ring-red-300 bg-red-50/20'
                      : 'border-slate-300 focus:border-[#087F8C] focus:ring-[#087F8C]/20 bg-white'
                  }`}
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              </div>
              {errors.patientEmail && (
                <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.patientEmail}</p>
              )}
            </div>

            {/* Patient Age */}
            <div>
              <label htmlFor="patientAge" className="block text-xs font-bold text-[#17324D] uppercase tracking-wider mb-1.5">
                Patient Age <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="patientAge"
                name="patientAge"
                value={formData.patientAge}
                onChange={handleChange}
                placeholder="e.g. 28 yrs or 6 mos"
                className={`w-full px-3 py-2.5 rounded-xl border text-sm text-[#17324D] placeholder-slate-400 focus:outline-hidden focus:ring-2 transition-all ${
                  errors.patientAge
                    ? 'border-red-500 focus:ring-red-300 bg-red-50/20'
                    : 'border-slate-300 focus:border-[#087F8C] focus:ring-[#087F8C]/20 bg-white'
                }`}
                required
              />
              {errors.patientAge && (
                <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.patientAge}</p>
              )}
            </div>

            {/* Appointment Date */}
            <div>
              <label htmlFor="appointmentDate" className="block text-xs font-bold text-[#17324D] uppercase tracking-wider mb-1.5">
                Preferred Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="appointmentDate"
                  name="appointmentDate"
                  min={minDate}
                  value={formData.appointmentDate}
                  onChange={handleChange}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm text-[#17324D] focus:outline-hidden focus:ring-2 transition-all ${
                    errors.appointmentDate
                      ? 'border-red-500 focus:ring-red-300 bg-red-50/20'
                      : 'border-slate-300 focus:border-[#087F8C] focus:ring-[#087F8C]/20 bg-white'
                  }`}
                  required
                />
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              </div>
              {errors.appointmentDate && (
                <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.appointmentDate}</p>
              )}
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Preferred Time */}
            <div>
              <label htmlFor="preferredTime" className="block text-xs font-bold text-[#17324D] uppercase tracking-wider mb-1.5">
                Preferred Time Slot <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm text-[#17324D] focus:outline-hidden focus:ring-2 transition-all appearance-none bg-white ${
                    errors.preferredTime
                      ? 'border-red-500 focus:ring-red-300 bg-red-50/20'
                      : 'border-slate-300 focus:border-[#087F8C] focus:ring-[#087F8C]/20'
                  }`}
                  required
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              </div>
              {errors.preferredTime && (
                <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.preferredTime}</p>
              )}
            </div>

            {/* Select Consultation / Care Department */}
            <div>
              <label htmlFor="doctor" className="block text-xs font-bold text-[#17324D] uppercase tracking-wider mb-1.5">
                Care Area / Department <span className="text-slate-400 font-normal lowercase">(optional)</span>
              </label>
              <select
                id="doctor"
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm text-[#17324D] focus:border-[#087F8C] focus:ring-2 focus:ring-[#087F8C]/20 bg-white"
              >
                <option value="First Available Consultant / Any Doctor">
                  First Available Consultant / Any Doctor
                </option>
                <option value="Maternal Health & Antenatal Checkup">
                  Maternal Health & Antenatal Checkup
                </option>
                <option value="Child Health & Pediatric Wellness">
                  Child Health & Pediatric Wellness
                </option>
                <option value="Routine Immunization & Vaccination Guidance">
                  Routine Immunization & Vaccination Guidance
                </option>
                <option value="Family & General Outpatient Consultation">
                  Family & General Outpatient Consultation
                </option>
                <option value="Maternal & Child Nutritional Guidance">
                  Maternal & Child Nutritional Guidance
                </option>
                <option value="Basic Clinical Tests & Vitals Check">
                  Basic Clinical Tests & Vitals Check
                </option>
              </select>
            </div>
          </div>

          {/* Message / Reason for Appointment */}
          <div>
            <label htmlFor="reason" className="block text-xs font-bold text-[#17324D] uppercase tracking-wider mb-1.5">
              Reason for Visit / Symptoms <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <textarea
                id="reason"
                name="reason"
                rows={isModal ? 3 : 4}
                value={formData.reason}
                onChange={handleChange}
                placeholder="Briefly describe the symptoms, checkup reason, or clinical questions..."
                className={`w-full p-3 rounded-xl border text-sm text-[#17324D] placeholder-slate-400 focus:outline-hidden focus:ring-2 transition-all ${
                  errors.reason
                    ? 'border-red-500 focus:ring-red-300 bg-red-50/20'
                    : 'border-slate-300 focus:border-[#087F8C] focus:ring-[#087F8C]/20 bg-white'
                }`}
                required
              />
            </div>
            {errors.reason && (
              <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.reason}</p>
            )}
          </div>

          {/* Email destination highlight */}
          <div className="p-3.5 bg-[#F4FAFA] rounded-xl border border-[#65B89A]/40 text-xs text-[#17324D] flex items-center gap-2.5">
            <Mail className="w-4 h-4 text-[#087F8C] shrink-0" />
            <div>
              <span className="font-semibold text-[#087F8C]">Direct Clinic Delivery:</span> Your appointment details will be sent directly to the official clinic inbox at <strong className="font-mono text-[#17324D]">{CLINIC_INFO.appointmentEmail}</strong>.
            </div>
          </div>

          {/* Primary Submit Button: Book Appointment */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 text-base sm:text-lg font-bold text-white bg-[#087F8C] hover:bg-[#06646E] active:bg-[#055058] disabled:opacity-75 disabled:cursor-not-allowed rounded-xl shadow-md hover:shadow-lg transition-all focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-[#087F8C] cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Booking Appointment...</span>
              </>
            ) : (
              <>
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
              </>
            )}
          </button>

        </form>
      )}
    </div>
  );
};
