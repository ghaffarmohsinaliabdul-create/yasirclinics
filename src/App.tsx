/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { SymptomTriageSection } from './components/SymptomTriageSection';
import { ScheduleRosterSection } from './components/ScheduleRosterSection';
import { RatingSection } from './components/RatingSection';
import { AppointmentSection } from './components/AppointmentSection';
import { LocationSection } from './components/LocationSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AppointmentModal } from './components/AppointmentModal';

export default function App() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [preselectedCareArea, setPreselectedCareArea] = useState<string | undefined>(undefined);

  const handleOpenAppointmentModal = (careArea?: string) => {
    setPreselectedCareArea(careArea);
    setIsAppointmentModalOpen(true);
  };

  const handleCloseAppointmentModal = () => {
    setIsAppointmentModalOpen(false);
    setPreselectedCareArea(undefined);
  };

  const handleNavigateToContact = () => {
    const el = document.getElementById('location');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#17324D] flex flex-col font-sans selection:bg-[#E7F5F1] selection:text-[#087F8C]">
      {/* Top Fixed Navigation Bar */}
      <Navbar onOpenAppointmentModal={() => handleOpenAppointmentModal()} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onOpenAppointmentModal={() => handleOpenAppointmentModal()}
          onNavigateToContact={handleNavigateToContact}
        />

        {/* 2. Clinic Information / About Us Section */}
        <AboutSection
          onOpenAppointmentModal={() => handleOpenAppointmentModal()}
          onNavigateToContact={handleNavigateToContact}
        />

        {/* 3. Medical Services Section with Category Filters */}
        <ServicesSection
          onOpenAppointmentModal={(serviceName) => handleOpenAppointmentModal(serviceName)}
        />

        {/* 4. Patient Guidance & Symptom Triage Tool */}
        <SymptomTriageSection
          onOpenAppointmentModal={(careArea) => handleOpenAppointmentModal(careArea)}
        />

        {/* 5. Doctor Consultation Hours & Weekly Roster */}
        <ScheduleRosterSection
          onOpenAppointmentModal={(careArea) => handleOpenAppointmentModal(careArea)}
        />

        {/* 6. Rating Section (4.8 / 5 from 142 ratings) */}
        <RatingSection />

        {/* 7. In-Page Appointment Booking Form */}
        <AppointmentSection />

        {/* 8. Location, Live WhatsApp Pin, and Google Maps Section */}
        <LocationSection />

        {/* 9. Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer onOpenAppointmentModal={() => handleOpenAppointmentModal()} />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp />

      {/* Appointment Request Modal */}
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={handleCloseAppointmentModal}
        preselectedDoctor={preselectedCareArea}
      />
    </div>
  );
}
