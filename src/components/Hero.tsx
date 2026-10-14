'use client';

import React, { useEffect, useRef } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { BookingTriggerButton } from './BookingContext';
import { gsap, registerGsapPlugins, isPrefersReducedMotion } from '@/lib/animation';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    if (isPrefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-anim-item',
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-28 pb-16 px-6 sm:px-10 lg:px-12 bg-transparent"
      aria-label="FlexLab Introduction"
    >
      <div className="w-full max-w-xl">
        {/* Clinical Practice Badge */}
        <div className="hero-anim-item inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full bg-[#fbeddc] border border-[#ead8c3]">
          <span className="w-2 h-2 rounded-full bg-[var(--crimson)] animate-pulse" />
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-[var(--crimson-dark)] font-semibold">
            FlexLab Clinical Practice
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="hero-anim-item font-serif text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-normal tracking-tight text-[var(--ink)] leading-[1.1] mb-6">
          Physical therapy <br />
          for getting back <br />
          <span className="italic font-serif text-[var(--crimson)]">to movement.</span>
        </h1>

        {/* Clinical Thesis */}
        <p className="hero-anim-item text-lg sm:text-xl text-[var(--ink)]/85 leading-relaxed mb-8 font-sans">
          Your body is built to move. Our job is to help you move with confidence again.
        </p>

        {/* Action Buttons */}
        <div className="hero-anim-item flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
          <BookingTriggerButton className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[var(--crimson)] text-[#fffaf2] text-base font-medium tracking-wide shadow-md hover:bg-[var(--crimson-dark)] active:scale-[0.98] transition-all cursor-pointer">
            Book an evaluation
          </BookingTriggerButton>
          <a
            href="#what-we-treat"
            className="inline-flex items-center justify-center px-6 py-4 rounded-full border border-[#ead8c3] bg-[#fffaf2]/80 hover:bg-[#fffaf2] text-[var(--ink)] text-base font-medium transition-colors"
          >
            Clinical Philosophy
          </a>
        </div>

        {/* Scroll Prompt */}
        <div className="hero-anim-item flex items-center gap-3 text-xs tracking-wider uppercase font-mono text-[var(--taupe)]">
          <span className="w-8 h-[1px] bg-[var(--taupe)]/60" />
          <span>Scroll to explore clinical pathway</span>
          <ArrowDown size={14} className="animate-bounce text-[var(--crimson)]" />
        </div>
      </div>
    </section>
  );
}

