'use client';

import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { BookingTriggerButton } from './BookingContext';
import { gsap, registerGsapPlugins, isPrefersReducedMotion } from '@/lib/animation';

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    if (isPrefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-anim-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="py-24 px-6 sm:px-10 lg:px-12 bg-transparent relative"
      aria-label="Call to Action"
    >
      <div className="w-full max-w-xl">
        <div className="cta-anim-item inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#fbeddc] border border-[#ead8c3]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)]" />
          <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[var(--crimson-dark)] font-semibold">
            Begin Your Recovery
          </span>
        </div>

        <h2 className="cta-anim-item font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--ink)] leading-[1.1] mb-4">
          Ready to move <br />
          <span className="italic text-[var(--crimson)]">forward?</span>
        </h2>

        <p className="cta-anim-item text-sm sm:text-base text-[var(--ink)]/85 font-sans leading-relaxed mb-8">
          Let&apos;s understand what&apos;s limiting your movement and build a clear, measurable path back to it.
        </p>

        <div className="cta-anim-item flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
          <BookingTriggerButton className="px-8 py-3.5 rounded-full bg-[var(--crimson)] text-[#fffaf2] text-sm font-semibold tracking-wide shadow-md hover:bg-[var(--crimson-dark)] active:scale-[0.98] transition-all cursor-pointer text-center">
            Book an Evaluation
          </BookingTriggerButton>
          <a
            href="#services"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#ead8c3] bg-[#fffaf2] text-[var(--ink)] text-sm font-medium hover:bg-[#fbeddc] transition-colors"
          >
            <span>Explore our services</span>
            <ArrowDown size={13} className="text-[var(--crimson)]" />
          </a>
        </div>

        <div className="cta-anim-item text-xs font-mono text-[var(--taupe)]">
          Initial evaluations include a comprehensive 60-minute kinematic assessment.
        </div>
      </div>
    </section>
  );
}
