import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Phone } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface NavbarProps {
  onOpenAppointmentModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAppointmentModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'services', 'triage', 'schedule', 'location'];
      const scrollPosition = window.scrollY + 180;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Symptom Guide', href: '#triage', id: 'triage' },
    { name: 'Schedule', href: '#schedule', id: 'schedule' },
    { name: 'Location', href: '#location', id: 'location' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      {/* Main Navigation Bar */}
      <div
        className={`transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs py-3 border-slate-200'
            : 'bg-white/90 backdrop-blur-xs py-4 border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Brand Wordmark (Single Text Element Wordmark) */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="text-xl sm:text-2xl font-bold tracking-tight text-[#17324D] hover:text-[#087F8C] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2.5 focus:outline-hidden"
            >
              <span className="w-8 h-8 rounded-lg bg-[#E7F5F1] text-[#087F8C] flex items-center justify-center font-black text-sm border border-[#65B89A]/40">
                +
              </span>
              <span>{CLINIC_INFO.name}</span>
            </a>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`text-sm font-medium transition-colors whitespace-nowrap shrink-0 py-1 ${
                      isActive
                        ? 'text-[#087F8C] font-semibold border-b-2 border-[#087F8C]'
                        : 'text-[#17324D]/80 hover:text-[#087F8C]'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* Zone 3: 1 Primary Action (Single Primary CTA) */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <button
                onClick={onOpenAppointmentModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#087F8C] hover:bg-[#06646E] active:bg-[#055058] rounded-xl shadow-xs transition-all whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={onOpenAppointmentModal}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-[#087F8C] rounded-lg"
              >
                Book
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-[#17324D] hover:bg-[#F4FAFA]"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-[#E7F5F1] text-[#087F8C] font-semibold'
                    : 'text-[#17324D] hover:bg-[#F4FAFA]'
                }`}
              >
                {link.name}
              </a>
            ))}

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAppointmentModal();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-[#087F8C] hover:bg-[#06646E] rounded-xl shadow-xs"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>

              <a
                href={`https://wa.me/${CLINIC_INFO.phoneRaw}?text=${encodeURIComponent(`Hello ${CLINIC_INFO.name}, I would like to get clinic information.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#087F8C] bg-[#E7F5F1] hover:bg-[#d8efe8] rounded-xl border border-[#65B89A]/30"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp Helpline ({CLINIC_INFO.phoneFormatted})</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
