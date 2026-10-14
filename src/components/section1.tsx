import React from 'react';
import { BookingTriggerButton } from './BookingContext';

const Section1 = () => {
  return (
    <div id="section1" className="w-full h-screen relative overflow-hidden bg-transparent text-[#24191b] flex flex-col justify-between px-8 md:px-16 py-6 pointer-events-none">
      
      {/* Top clearance for fixed Navbar */}
      <div className="w-full h-20 pointer-events-none" aria-hidden="true" />

      {/* Hero Content Section - High z-index to guarantee zero overlap */}
      <div className="max-w-xl relative z-40 pointer-events-auto my-auto">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-[var(--crimson)]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#a0142f] font-mono">
            PHYSICAL THERAPY FOR CONFIDENT RECOVERY
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-[1.05] text-[#24191b] mb-6 drop-shadow-sm">
          Precision rehab for the way you move.
        </h1>

        <p className="text-[#5d1024] text-base md:text-lg font-normal leading-relaxed max-w-lg mb-8">
          A modern physical therapy clinic for pain relief, mobility, strength, and return to activity. Clear plans. Focused visits. Progress you can understand.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <BookingTriggerButton className="bg-[#a0142f] text-white font-medium px-6 py-3.5 rounded-full flex items-center gap-2 hover:bg-[#5d1024] transition-all shadow-md cursor-pointer">
            Start with an evaluation
          </BookingTriggerButton>
          <a
            href="#our-method"
            className="bg-transparent text-[#24191b] font-medium px-6 py-3.5 rounded-full hover:bg-[#ead8c3]/40 transition-all border border-[#ead8c3] inline-flex items-center justify-center"
          >
            See the method
          </a>
        </div>
      </div>

      {/* Bottom Scroll Indicator / Footer space */}
      <div className="w-full flex items-center justify-between pt-4 relative z-40 pointer-events-auto text-xs text-[#5d1024] font-medium">
        <a href="#what-we-treat" className="hover:text-[#a0142f] transition-colors cursor-pointer flex items-center gap-1.5 font-mono">
          <span>WHAT WE TREAT</span>
          <span className="text-base leading-none">↓</span>
        </a>
        <div className="hidden lg:block tracking-widest uppercase font-mono text-[11px] text-[var(--taupe)]">
          Scroll to explore clinical model ↓
        </div>
      </div>

    </div>
  );
};

export default Section1;