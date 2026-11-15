/**
 * Official Clinic Information & Verified Data
 * Yasir Clinic – Advanced Healthcare & Multi-Specialty Center
 */

export interface ClinicInfo {
  name: string;
  shortName: string;
  tagline: string;
  address: string;
  addressShort: string;
  phoneRaw: string;
  phoneFormatted: string;
  whatsAppNumber: string;
  email: string;
  appointmentEmail: string;
  rating: number;
  totalRatings: number;
  googleMapsEmbedUrl: string;
  googleMapsDirectionsUrl: string;
}

export const CLINIC_INFO: ClinicInfo = {
  name: "Yasir Clinic",
  shortName: "Yasir Clinic",
  tagline: "Excellence in Healthcare. Compassion in Every Care.",
  address: "Main Medical Boulevard, Central City Healthcare Zone, Karachi, Pakistan",
  addressShort: "Central City Healthcare Zone, Karachi",
  phoneRaw: "923293179587",
  phoneFormatted: "+92 329 3179587",
  whatsAppNumber: "+92 329 3179587",
  email: "tiktokpakistanmedia344@gmail.com",
  appointmentEmail: "tiktokpakistanmedia344@gmail.com",
  rating: 4.8,
  totalRatings: 142,
  googleMapsEmbedUrl: "https://maps.google.com/maps?q=Karachi%20Healthcare%20Clinic&t=&z=14&ie=UTF8&iwloc=&output=embed",
  googleMapsDirectionsUrl: "https://www.google.com/maps/search/?api=1&query=Karachi+Healthcare+Clinic",
};

export const CLINIC_IMAGES = {
  hero: "/src/assets/images/hero_medical_consultation_1794262218478.jpg",
  facility: "/src/assets/images/clinic_facility_room_1794262218633.jpg",
  pediatric: "/src/assets/images/clinic_pediatric_maternal_1794262218192.jpg",
};

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  badge: string;
  suitableFor: string;
  turnaroundTime: string;
}

export const CLINIC_SERVICES: ServiceItem[] = [
  {
    id: "general-consultation",
    title: "General Medicine & Outpatient Care",
    category: "Primary Healthcare",
    shortDescription: "Comprehensive diagnostic evaluations, disease management, and family health consultations.",
    fullDescription: "Our primary medical care unit provides expert clinical evaluations for acute and chronic health conditions, routine checkups, fever management, prescription reviews, and specialized specialist referrals.",
    iconName: "Stethoscope",
    badge: "Popular",
    suitableFor: "All adults, elderly, and family members",
    turnaroundTime: "Same-Day Walk-in & Scheduled"
  },
  {
    id: "pediatric-care",
    title: "Pediatric & Child Health Care",
    category: "Child Health",
    shortDescription: "Gentle healthcare consultations, infant developmental assessments, and childhood illness care.",
    fullDescription: "Dedicated pediatric services tailored to infants, toddlers, and adolescents. Includes physical wellness checkups, developmental milestone tracking, growth monitoring, and common childhood ailment treatment.",
    iconName: "Baby",
    badge: "Specialized",
    suitableFor: "Newborns, infants, and children up to 14 yrs",
    turnaroundTime: "Priority Pediatric Queue"
  },
  {
    id: "maternal-care",
    title: "Maternal Health & Antenatal Support",
    category: "Maternal Wellness",
    shortDescription: "Focused clinical support for expectant mothers, prenatal advice, and postpartum wellness.",
    fullDescription: "Compassionate maternal healthcare providing prenatal checkups, post-delivery recovery consultations, maternal nutritional counseling, blood pressure monitoring, and general mother-care guidance.",
    iconName: "HeartPulse",
    badge: "Dedicated",
    suitableFor: "Expectant mothers & postpartum care",
    turnaroundTime: "Scheduled Confidential Consultation"
  },
  {
    id: "diagnostic-vitals",
    title: "Clinical Diagnostics & Vitals Monitoring",
    category: "Diagnostics",
    shortDescription: "On-site blood pressure, blood glucose, oxygen saturation, and rapid diagnostic health screenings.",
    fullDescription: "Fast, accurate clinical measurements including blood pressure monitoring, random/fasting blood sugar screening, digital pulse oximetry, temperature tracking, and diagnostic lab test coordination.",
    iconName: "Activity",
    badge: "Essential",
    suitableFor: "Hypertension, diabetes monitoring, routine checks",
    turnaroundTime: "Immediate On-Site Results (5–10 mins)"
  },
  {
    id: "immunization-guidance",
    title: "Immunization & Preventive Healthcare",
    category: "Preventive Care",
    shortDescription: "Vaccination schedule guidance, preventive health counseling, and seasonal infection protection.",
    fullDescription: "Expert guidance on routine child vaccinations, booster immunizations, seasonal flu preventive measures, and lifestyle health counseling designed to safeguard your family's health.",
    iconName: "ShieldPlus",
    badge: "Preventive",
    suitableFor: "Infants, children & at-risk individuals",
    turnaroundTime: "Consultation & Record Card"
  },
  {
    id: "wound-care",
    title: "First Aid & Minor Procedural Care",
    category: "Clinical Care",
    shortDescription: "Sterile wound cleaning, antiseptic dressing, minor burn care, and first-aid medical support.",
    fullDescription: "Clean, hygienic outpatient procedure suite for non-emergency wound dressing, suture removal, minor burns treatment, antiseptic bandaging, and medical first-aid stabilization.",
    iconName: "Bandage",
    badge: "Clinical",
    suitableFor: "Minor domestic injuries, cuts, burns, dressing",
    turnaroundTime: "Immediate Clinical Attention"
  }
];

export interface SymptomGuide {
  id: string;
  symptom: string;
  recommendedDepartment: string;
  timingAdvice: string;
  keyInstructions: string;
  prefilledReason: string;
}

export const SYMPTOM_CARE_TRIAGE: SymptomGuide[] = [
  {
    id: "child-fever",
    symptom: "Child Fever, Cough or Flu",
    recommendedDepartment: "Pediatric & Child Health Care",
    timingAdvice: "Morning Shift (10 AM - 2 PM) or Evening (5 PM - 10 PM)",
    keyInstructions: "Keep child hydrated. Bring previous prescription if given paracetamol/ibuprofen.",
    prefilledReason: "Child has fever and persistent flu/cough. Requesting pediatric evaluation."
  },
  {
    id: "prenatal-check",
    symptom: "Prenatal / Pregnancy Routine Checkup",
    recommendedDepartment: "Maternal Health & Antenatal Support",
    timingAdvice: "Advance WhatsApp slot booking recommended",
    keyInstructions: "Bring earlier ultrasound reports and maternal health card if available.",
    prefilledReason: "Routine antenatal pregnancy checkup, BP monitoring and maternal counseling."
  },
  {
    id: "bp-sugar",
    symptom: "High Blood Pressure or Sugar Check",
    recommendedDepartment: "Clinical Diagnostics & Vitals Monitoring",
    timingAdvice: "Fasting morning or routine evening check",
    keyInstructions: "Rest 10 minutes before testing. Bring list of daily medications.",
    prefilledReason: "Blood pressure screening and random/fasting blood sugar testing."
  },
  {
    id: "stomach-infection",
    symptom: "Vomiting, Diarrhea or Stomach Pain",
    recommendedDepartment: "General Medicine & Outpatient Care",
    timingAdvice: "Prompt visit recommended to prevent dehydration",
    keyInstructions: "Start ORS fluid intake immediately. Note frequency of symptoms.",
    prefilledReason: "Acute gastrointestinal symptoms, stomach cramps, and weakness."
  },
  {
    id: "routine-vaccination",
    symptom: "Childhood Vaccination / Booster Due",
    recommendedDepartment: "Immunization & Preventive Healthcare",
    timingAdvice: "Morning Shift (10:00 AM – 01:00 PM)",
    keyInstructions: "Bring government/clinic vaccination booklet to update immunization records.",
    prefilledReason: "Scheduled vaccination dose and growth milestone checkup for child."
  },
  {
    id: "minor-wound",
    symptom: "Cut, Minor Burn or Dressing Change",
    recommendedDepartment: "First Aid & Minor Procedural Care",
    timingAdvice: "Walk-in available during all open clinic hours",
    keyInstructions: "Clean gently with clean water. Avoid applying unsterile powders.",
    prefilledReason: "Sterile wound cleaning, antiseptic dressing, and bandage change."
  }
];

export interface ScheduleDay {
  day: string;
  morningSlot: string;
  eveningSlot: string;
  departments: string;
  isOpen: boolean;
}

export const WEEKLY_SCHEDULE: ScheduleDay[] = [
  {
    day: "Monday",
    morningSlot: "10:00 AM – 02:00 PM",
    eveningSlot: "05:00 PM – 10:00 PM",
    departments: "General Medicine, Pediatrics & Antenatal",
    isOpen: true
  },
  {
    day: "Tuesday",
    morningSlot: "10:00 AM – 02:00 PM",
    eveningSlot: "05:00 PM – 10:00 PM",
    departments: "Pediatrics, Child Immunization & General OPD",
    isOpen: true
  },
  {
    day: "Wednesday",
    morningSlot: "10:00 AM – 02:00 PM",
    eveningSlot: "05:00 PM – 10:00 PM",
    departments: "Maternal Health, Vitals Screening & OPD",
    isOpen: true
  },
  {
    day: "Thursday",
    morningSlot: "10:00 AM – 02:00 PM",
    eveningSlot: "05:00 PM – 10:00 PM",
    departments: "Pediatrics, First Aid & Outpatient Medicine",
    isOpen: true
  },
  {
    day: "Friday",
    morningSlot: "10:00 AM – 01:00 PM",
    eveningSlot: "05:00 PM – 10:00 PM",
    departments: "General Consultations, Antenatal Checkups",
    isOpen: true
  },
  {
    day: "Saturday",
    morningSlot: "10:00 AM – 02:00 PM",
    eveningSlot: "05:00 PM – 10:00 PM",
    departments: "Full Outpatient, Pediatrics, Maternal & Diagnostics",
    isOpen: true
  },
  {
    day: "Sunday",
    morningSlot: "Emergency On-Call",
    eveningSlot: "WhatsApp Helpline Active",
    departments: "Urgent inquiries via WhatsApp (+92 329 3179587)",
    isOpen: false
  }
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const CLINIC_FAQS: FaqItem[] = [
  {
    question: "How do I schedule an appointment at Yasir Clinic?",
    answer: "You can easily submit an appointment request through our online booking form on this website. Your request is immediately dispatched to our official clinic inbox (tiktokpakistanmedia344@gmail.com) and prepared for WhatsApp verification (+92 329 3179587) where our medical reception confirms your preferred slot."
  },
  {
    question: "Can I consult via WhatsApp or request exact location pin?",
    answer: "Yes! You can message us directly on WhatsApp at +92 329 3179587 anytime. If you need our exact GPS location pin, simply click 'Get Live Location on WhatsApp' in the Location section and we will send you the live map pin instantly."
  },
  {
    question: "What are the clinic consultation timings?",
    answer: "Our consultation shifts run from Morning (10:00 AM - 2:00 PM) and Evening (5:00 PM - 10:00 PM). Emergency first aid inquiries can be messaged on WhatsApp throughout the day."
  },
  {
    question: "Are walk-in patients accepted without appointment?",
    answer: "Yes, walk-ins are welcomed during active clinic duty hours. However, scheduling via WhatsApp in advance is recommended to minimize waiting times."
  },
  {
    question: "Which medical departments are available at Yasir Clinic?",
    answer: "We offer General Outpatient Care, Pediatric & Child Health, Maternal & Family Wellness, Clinical Vitals Monitoring, Immunization Counseling, and Minor First Aid Care."
  }
];

export const SCHEDULE_INFO = {
  morning: "10:00 AM – 02:00 PM",
  evening: "05:00 PM – 10:00 PM",
  days: "Monday to Saturday (Sunday on WhatsApp on-call)",
  statusNote: "Open Today for Regular Consultations",
  whatsappNote: "Fast response via WhatsApp (+92 329 3179587) for appointment booking & live location."
};
