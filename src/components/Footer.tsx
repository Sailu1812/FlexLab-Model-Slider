import React from 'react';
import { BookingTriggerButton } from './BookingContext';

interface FooterProps {
  onOpenBooking?: () => void;
}

export default function Footer({ onOpenBooking }: FooterProps) {
  return (
    <footer className="bg-[#fbeddc] border-t border-[#ead8c3] py-16 px-6 sm:px-10 lg:px-16 text-[var(--ink)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#ead8c3]">
        {/* Brand & Mission */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold tracking-tight text-[var(--crimson-dark)]">
              FLEXLAB
            </span>
            <span className="text-[10px] tracking-widest uppercase font-mono px-1.5 py-0.5 rounded bg-[#fff5e8] border border-[#ead8c3] text-[var(--taupe)]">
              PT
            </span>
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--crimson)] font-semibold">
            Physical Therapy
          </p>
          <p className="text-xs text-[var(--ink)]/75 max-w-sm font-sans leading-relaxed">
            Movement-focused rehabilitation clinic dedicated to biomechanical precision, evidence-based joint restoration, and long-term functional autonomy.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="md:col-span-4 space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--taupe)] mb-2">
            Navigation
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#what-we-treat" className="hover:text-[var(--crimson)] transition-colors">
                What We Treat
              </a>
            </li>
            <li>
              <a href="#our-method" className="hover:text-[var(--crimson)] transition-colors">
                Our Method
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-[var(--crimson)] transition-colors">
                Services
              </a>
            </li>
            <li>
              <a href="#insurance" className="hover:text-[var(--crimson)] transition-colors">
                Insurance & Payment
              </a>
            </li>
            <li>
              <BookingTriggerButton className="text-[var(--crimson)] hover:text-[var(--crimson-dark)] font-semibold transition-colors cursor-pointer text-left">
                Book an Evaluation →
              </BookingTriggerButton>
            </li>
          </ul>
        </div>

        {/* Contact (Strictly Authentic Placeholders per Section 22 & 35) */}
        <div className="md:col-span-4 space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--taupe)] mb-2">
            Clinical Practice Location
          </div>
          <div className="space-y-1.5 text-xs font-mono text-[var(--ink)]/80">
            <div>
              <span className="text-[var(--taupe)] block text-[10px]">ADDRESS</span>
              <span>[Clinic Address Placeholder]</span>
            </div>
            <div>
              <span className="text-[var(--taupe)] block text-[10px]">PHONE</span>
              <span>[Clinic Phone Placeholder]</span>
            </div>
            <div>
              <span className="text-[var(--taupe)] block text-[10px]">EMAIL</span>
              <span>contact@flexlabpt.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright & Disclaimer */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[var(--taupe)] gap-4">
        <div>
          © {new Date().getFullYear()} FlexLab Physical Therapy. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <span>Privacy Practice Notice</span>
          <span>HIPAA Compliance</span>
          <span>Accessibility (WCAG AA)</span>
        </div>
      </div>
    </footer>
  );
}
