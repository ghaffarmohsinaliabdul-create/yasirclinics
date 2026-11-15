/**
 * Appointment validation and WhatsApp integration utilities
 * Yasir Clinic - Medical & Healthcare Center
 */

import { CLINIC_INFO } from '../data/clinicData';

export interface AppointmentFormData {
  patientName: string;
  phoneNumber: string;
  patientEmail?: string;
  patientAge: string;
  appointmentDate: string;
  preferredTime: string;
  doctor: string;
  reason: string;
}

export interface ValidationErrors {
  patientName?: string;
  phoneNumber?: string;
  patientEmail?: string;
  patientAge?: string;
  appointmentDate?: string;
  preferredTime?: string;
  reason?: string;
}

export interface SavedAppointment extends AppointmentFormData {
  id: string;
  createdAt: string;
  status: 'Pending' | 'Confirmed' | 'Completed';
  targetEmail: string;
}

export const INITIAL_APPOINTMENT_DATA: AppointmentFormData = {
  patientName: '',
  phoneNumber: '',
  patientEmail: '',
  patientAge: '',
  appointmentDate: '',
  preferredTime: '',
  doctor: 'First Available Consultant / Any Doctor',
  reason: '',
};

/**
 * Validates appointment form fields
 */
export function validateAppointmentForm(data: AppointmentFormData): {
  isValid: boolean;
  errors: ValidationErrors;
} {
  const errors: ValidationErrors = {};

  // Patient Name
  const cleanName = data.patientName.trim();
  if (!cleanName) {
    errors.patientName = 'Patient name is required.';
  } else if (cleanName.length < 2) {
    errors.patientName = 'Please enter a valid patient name (minimum 2 characters).';
  }

  // Phone Number (support Pakistani & international formats e.g. 0329-3179587, +923293179587, 03001234567)
  const cleanPhone = data.phoneNumber.trim().replace(/[\s\-()]/g, '');
  if (!cleanPhone) {
    errors.phoneNumber = 'Phone number is required for WhatsApp confirmation.';
  } else if (!/^\+?[0-9]{9,15}$/.test(cleanPhone)) {
    errors.phoneNumber = `Please enter a valid phone number (at least 9-15 digits, e.g. ${CLINIC_INFO.phoneRaw}).`;
  }

  // Patient Email (Optional, but if given must be valid)
  if (data.patientEmail && data.patientEmail.trim()) {
    const cleanEmail = data.patientEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      errors.patientEmail = 'Please enter a valid email address.';
    }
  }

  // Patient Age
  const cleanAge = data.patientAge.trim();
  if (!cleanAge) {
    errors.patientAge = 'Patient age is required (e.g. 6 months, 4 years, 28 years).';
  } else {
    const num = parseInt(cleanAge, 10);
    if (isNaN(num) || num < 0 || num > 120) {
      errors.patientAge = 'Please enter a realistic age between 0 and 120.';
    }
  }

  // Appointment Date
  if (!data.appointmentDate.trim()) {
    errors.appointmentDate = 'Please select a preferred appointment date.';
  } else {
    const selectedDate = new Date(data.appointmentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(selectedDate.getTime())) {
      errors.appointmentDate = 'Please enter a valid date.';
    } else if (selectedDate < today) {
      errors.appointmentDate = 'Appointment date cannot be in the past.';
    }
  }

  // Preferred Time
  if (!data.preferredTime.trim()) {
    errors.preferredTime = 'Please select a preferred time slot.';
  }

  // Reason / Message
  const cleanReason = data.reason.trim();
  if (!cleanReason) {
    errors.reason = 'Please briefly state the reason or symptoms for the appointment.';
  } else if (cleanReason.length < 3) {
    errors.reason = 'Please provide a little more detail (minimum 3 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Formats appointment request text for WhatsApp message
 */
export function formatAppointmentMessage(data: AppointmentFormData): string {
  return [
    `🏥 *APPOINTMENT REQUEST*`,
    `*Clinic:* ${CLINIC_INFO.name}`,
    `--------------------------------`,
    `👤 *Patient Name:* ${data.patientName.trim()}`,
    `📞 *Phone Number:* ${data.phoneNumber.trim()}`,
    data.patientEmail ? `📧 *Patient Email:* ${data.patientEmail.trim()}` : null,
    `🎂 *Patient Age:* ${data.patientAge.trim()}`,
    `📅 *Preferred Date:* ${data.appointmentDate.trim()}`,
    `⏰ *Preferred Time:* ${data.preferredTime.trim()}`,
    `👨‍⚕️ *Doctor / Unit:* ${data.doctor ? data.doctor.trim() : 'First Available Consultant'}`,
    `📝 *Reason / Notes:* ${data.reason.trim()}`,
    `--------------------------------`,
    `📩 *Notified Email:* ${CLINIC_INFO.appointmentEmail}`,
    `_Sent via official website. Please reply to confirm availability and schedule._`
  ].filter(Boolean).join('\n');
}

/**
 * Formats email subject line
 */
export function formatAppointmentEmailSubject(data: AppointmentFormData): string {
  return `New Appointment Request: ${data.patientName.trim()} (${data.appointmentDate.trim()}) - ${CLINIC_INFO.name}`;
}

/**
 * Formats full plain-text email message body for clinic inbox
 */
export function formatAppointmentEmailBody(data: AppointmentFormData): string {
  const dateNow = new Date().toLocaleString('en-US', { timeZoneName: 'short' });
  return [
    `=========================================================`,
    `🏥 ${CLINIC_INFO.name.toUpperCase()} - NEW APPOINTMENT REQUEST`,
    `=========================================================`,
    ``,
    `PATIENT INFORMATION:`,
    `• Full Name:      ${data.patientName.trim()}`,
    `• Contact Phone:  ${data.phoneNumber.trim()}`,
    `• Patient Email:  ${data.patientEmail ? data.patientEmail.trim() : 'Not provided'}`,
    `• Patient Age:    ${data.patientAge.trim()}`,
    ``,
    `APPOINTMENT DETAILS:`,
    `• Preferred Date: ${data.appointmentDate.trim()}`,
    `• Preferred Time: ${data.preferredTime.trim()}`,
    `• Care Area / Unit: ${data.doctor ? data.doctor.trim() : 'First Available Consultant'}`,
    ``,
    `REASON FOR VISIT / CLINICAL NOTES:`,
    `${data.reason.trim()}`,
    ``,
    `---------------------------------------------------------`,
    `NOTIFICATION METADATA:`,
    `• Target Clinic Inbox: ${CLINIC_INFO.appointmentEmail}`,
    `• Clinic Phone / WhatsApp: ${CLINIC_INFO.phoneFormatted}`,
    `• Timestamp: ${dateNow}`,
    `• Source: Yasir Clinic Official Web Booking System`,
    `=========================================================`,
  ].join('\n');
}

/**
 * Generates mailto link to tiktokpakistanmedia344@gmail.com
 */
export function generateMailtoAppointmentUrl(data: AppointmentFormData): string {
  const subject = formatAppointmentEmailSubject(data);
  const body = formatAppointmentEmailBody(data);
  return `mailto:${CLINIC_INFO.appointmentEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Generates the official WhatsApp wa.me link for appointment request
 */
export function generateWhatsAppAppointmentUrl(data: AppointmentFormData): string {
  const message = formatAppointmentMessage(data);
  return `https://wa.me/${CLINIC_INFO.phoneRaw}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates standard quick chat WhatsApp link
 */
export function generateQuickWhatsAppUrl(customMessage?: string): string {
  const defaultMsg = 'Hello, I would like to get information about the clinic and book an appointment.';
  const msg = customMessage || defaultMsg;
  return `https://wa.me/${CLINIC_INFO.phoneRaw}?text=${encodeURIComponent(msg)}`;
}

const STORAGE_KEY = 'yasir_clinic_appointments_v1';

/**
 * Saves appointment record to browser local storage registry
 */
export function saveAppointmentToRegistry(data: AppointmentFormData): SavedAppointment {
  const record: SavedAppointment = {
    ...data,
    id: `YC-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    status: 'Pending',
    targetEmail: CLINIC_INFO.appointmentEmail,
  };

  try {
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    const existing: SavedAppointment[] = existingRaw ? JSON.parse(existingRaw) : [];
    existing.unshift(record);
    // Keep max 50 recent records
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 50)));
  } catch (e) {
    console.warn('LocalStorage save failed:', e);
  }

  return record;
}

/**
 * Retrieves saved appointments from browser local storage
 */
export function getSavedAppointments(): SavedAppointment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Sends appointment notification via web service directly to clinic email
 * Target: tiktokpakistanmedia344@gmail.com
 */
export async function sendAppointmentNotification(
  data: AppointmentFormData
): Promise<{ success: boolean; message: string; method: 'formsubmit' | 'mailto_ready' }> {
  // Always register in local storage first so nothing is lost
  saveAppointmentToRegistry(data);

  try {
    // Dispatch to FormSubmit AJAX endpoint for direct inbox delivery
    const response = await fetch(`https://formsubmit.co/ajax/${CLINIC_INFO.appointmentEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        _subject: formatAppointmentEmailSubject(data),
        _template: 'table',
        _captcha: 'false',
        clinic_name: CLINIC_INFO.name,
        target_inbox: CLINIC_INFO.appointmentEmail,
        patient_name: data.patientName.trim(),
        patient_phone: data.phoneNumber.trim(),
        patient_email: data.patientEmail ? data.patientEmail.trim() : 'Not provided',
        patient_age: data.patientAge.trim(),
        appointment_date: data.appointmentDate.trim(),
        preferred_time_slot: data.preferredTime.trim(),
        doctor_or_department: data.doctor ? data.doctor.trim() : 'First Available Consultant',
        reason_symptoms: data.reason.trim(),
        booking_source: 'Yasir Clinic Web Booking Portal',
        submission_time: new Date().toISOString(),
      }),
    });

    if (response.ok) {
      return {
        success: true,
        message: `Appointment details successfully dispatched to ${CLINIC_INFO.appointmentEmail}`,
        method: 'formsubmit',
      };
    }
  } catch (err) {
    console.warn('Direct web dispatch experienced network delay, mailto ready:', err);
  }

  // Fallback return - ready for mailto / WhatsApp
  return {
    success: true,
    message: `Appointment prepared for ${CLINIC_INFO.appointmentEmail}`,
    method: 'mailto_ready',
  };
}

/**
 * Copies text to clipboard and returns true on success
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
}
