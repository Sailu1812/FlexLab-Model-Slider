'use client';

import React, { useState, useEffect } from 'react';
import { Activity, Layers, Stethoscope, CreditCard, CalendarCheck, Menu, X } from 'lucide-react';
import { useBooking } from './BookingContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Track active section for indicator
      const sections = ['what-we-treat', 'our-method', 'services', 'insurance'];
      const scrollPos = window.scrollY + 220;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            return;
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'What We Treat', href: '#what-we-treat', id: 'what-we-treat', icon: Activity },
    { label: 'Our Method', href: '#our-method', id: 'our-method', icon: Layers },
    { label: 'Services', href: '#services', id: 'services', icon: Stethoscope },
    { label: 'Insurance', href: '#insurance', id: 'insurance', icon: CreditCard }
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
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-500 ease-in-out">
      {/* Container: transitions between full-width top bar and centered compact shrunk dock */}
      <div
        className={`pointer-events-auto transition-all duration-500 ease-in-out ${
          scrolled
            ? 'mt-4 mx-auto w-fit px-3.5 py-2 rounded-full bg-[#fffaf2]/95 backdrop-blur-md border border-[#ead8c3] shadow-[0_10px_35px_rgba(36,25,27,0.12)] flex items-center gap-3 sm:gap-4'
            : 'w-full max-w-7xl mx-auto px-6 sm:px-8 py-5 flex items-center justify-between bg-transparent'
        }`}
      >
        {/* Brand */}
        <a
          href="#"
          className="group flex items-center gap-2 focus:outline-none shrink-0"
          aria-label="FlexLab Physical Therapy Home"
        >
          <div className="w-8 h-8 rounded-full bg-[var(--crimson)] text-[#fffaf2] font-bold text-xs flex items-center justify-center shadow-sm transition-transform group-hover:scale-105">
            F
          </div>
          {!scrolled && (
            <div className="flex items-center gap-2 transition-opacity duration-300">
              <span className="font-serif text-2xl font-bold tracking-tight text-[var(--crimson-dark)] transition-colors group-hover:text-[var(--crimson)]">
                FLEXLAB
              </span>
              <span className="text-[10px] tracking-widest uppercase font-mono px-1.5 py-0.5 rounded bg-[#fbeddc] border border-[#ead8c3] text-[var(--taupe)]">
                PT
              </span>
            </div>
          )}
        </a>

        {/* Separator when shrunk */}
        {scrolled && <div className="w-[1px] h-4 bg-[#ead8c3]" />}

        {/* Navigation Elements */}
        {scrolled ? (
          /* SHRUNK DOCK: Icons arranged in center with tooltips */
          <nav className="flex items-center gap-1.5 sm:gap-2" aria-label="Quick Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  aria-label={item.label}
                  className={`relative group p-2 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-[#fbeddc] text-[var(--crimson)] shadow-sm'
                      : 'text-[var(--ink)]/80 hover:text-[var(--crimson)] hover:bg-[#fbeddc]/60'
                  }`}
                >
                  <Icon size={18} />
                  {/* Floating tooltip */}
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none px-2 py-0.5 rounded-md bg-[var(--ink)] text-[#fffaf2] text-[10px] font-mono whitespace-nowrap shadow-md">
                    {item.label}
                  </span>
                </a>
              );
            })}
          </nav>
        ) : (
          /* FULL WIDTH: Text links */
          <nav
            className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--ink)]/80"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="hover:text-[var(--crimson)] transition-colors relative py-1 focus-visible:outline-2 focus-visible:outline-[var(--crimson)] rounded"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}

        {/* Separator when shrunk */}
        {scrolled && <div className="w-[1px] h-4 bg-[#ead8c3]" />}

        {/* Right CTA */}
        {scrolled ? (
          /* SHRUNK DOCK: Icon button for Booking */
          <button
            type="button"
            onClick={openBooking}
            aria-label="Book an Evaluation"
            className="relative group p-2 rounded-full bg-[var(--crimson)] hover:bg-[var(--crimson-dark)] text-[#fffaf2] shadow-sm transition-all duration-200 hover:scale-105 cursor-pointer shrink-0"
          >
            <CalendarCheck size={18} />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none px-2 py-0.5 rounded-md bg-[var(--crimson-dark)] text-[#fffaf2] text-[10px] font-mono whitespace-nowrap shadow-md">
              Book Evaluation
            </span>
          </button>
        ) : (
          /* FULL WIDTH: Full button */
          <div className="hidden md:flex items-center gap-4">
            <button
              type="button"
              onClick={openBooking}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[var(--crimson)] text-[#fffaf2] text-sm font-medium tracking-wide shadow-sm hover:bg-[var(--crimson-dark)] active:scale-[0.98] transition-all focus-visible:outline-2 focus-visible:outline-[var(--crimson-dark)] cursor-pointer"
            >
              Book Evaluation
            </button>
          </div>
        )}

        {/* Mobile menu trigger only when NOT shrunk */}
        {!scrolled && (
          <div className="flex md:hidden items-center gap-3">
            <button
              type="button"
              onClick={openBooking}
              className="px-3.5 py-1.5 rounded-full bg-[var(--crimson)] text-[#fffaf2] text-xs font-medium cursor-pointer"
            >
              Book
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[var(--ink)] hover:text-[var(--crimson)] transition-colors focus:outline-none rounded"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Drawer (Only when top bar is expanded) */}
      {!scrolled && mobileMenuOpen && (
        <div className="md:hidden pointer-events-auto bg-[#fff5e8] border-b border-[#ead8c3] px-6 py-6 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-base font-medium text-[var(--ink)] hover:text-[var(--crimson)] py-1.5 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openBooking();
              }}
              className="w-full text-center py-3 rounded-full bg-[var(--crimson)] text-[#fffaf2] text-sm font-medium hover:bg-[var(--crimson-dark)] transition-colors cursor-pointer"
            >
              Book an Evaluation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
