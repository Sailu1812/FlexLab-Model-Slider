'use client';

import React, { useEffect, useRef } from 'react';
import { gsap, registerGsapPlugins, isPrefersReducedMotion } from '@/lib/animation';

export default function TreatmentSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const clinicalIndicators = [
    {
      title: 'MOBILITY',
      desc: 'Restoring arthrokinematic glide and unrestricted joint excursion.',
    },
    {
      title: 'STRENGTH',
      desc: 'Rebuilding muscular torque and force-generating capacity.',
    },
    {
      title: 'BALANCE',
      desc: 'Recalibrating vestibular and somatosensory postural reflexes.',
    },
    {
      title: 'CONTROL',
      desc: 'Fine-tuning neuromuscular recruitment and movement precision.',
    },
    {
      title: 'RECOVERY',
      desc: 'Progressive tissue remodeling and sustainable return to activity.',
    }
  ];

  useEffect(() => {
    registerGsapPlugins();
    if (isPrefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.treatment-header-anim',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.treatment-card-anim',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.treatment-grid-container',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="what-we-treat"
      className="py-24 px-6 sm:px-10 lg:px-12 bg-[#fbeddc]/30 border-y border-[#ead8c3] relative"
      aria-label="What We Treat and Clinical Philosophy"
    >
      <div className="w-full max-w-xl">
        {/* Section Header */}
        <div className="treatment-header-anim mb-12">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#fbeddc] border border-[#ead8c3]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)]" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[var(--crimson-dark)] font-semibold">
              Clinical Philosophy
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--ink)] leading-tight mb-4">
            Your body <span className="italic text-[var(--crimson)]">is the story.</span>
          </h2>
          <p className="text-sm sm:text-base text-[var(--ink)]/80 font-sans leading-relaxed">
            We don&apos;t treat symptoms in isolation. We look at how your body moves, where it compensates, and what needs to change to get you moving confidently again.
          </p>
        </div>

        {/* Foundational Pillars Header */}
        <div className="treatment-header-anim flex items-center justify-between pb-2 mb-6 border-b border-[#ead8c3]">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--taupe)] font-semibold">
            Foundational Movement Pillars
          </span>
          <span className="text-[10px] font-mono text-[var(--crimson)] font-bold">
            5 Kinetic Tiers
          </span>
        </div>

        {/* Modular Indicator Cards */}
        <div className="treatment-grid-container grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
          {clinicalIndicators.map((ind, i) => (
            <div
              key={ind.title}
              className="treatment-card-anim p-4 rounded-2xl bg-[#fffaf2] border border-[#ead8c3] hover:border-[var(--rose)] transition-colors flex flex-col justify-between shadow-xs"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-[var(--crimson)] font-bold">
                  0{i + 1}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)]" />
                <h3 className="font-mono text-xs font-bold tracking-wider text-[var(--ink)]">
                  {ind.title}
                </h3>
              </div>
              <p className="text-xs text-[var(--ink)]/75 leading-relaxed font-sans">
                {ind.desc}
              </p>
            </div>
          ))}

          {/* Integrative Assessment Card */}
          <div className="treatment-card-anim p-4 rounded-2xl bg-[#fbeddc] border border-[#ead8c3] flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[var(--taupe)] font-semibold mb-2">
              <span>Clinical Standard</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            </div>
            <div className="text-xs font-mono font-bold text-[var(--crimson-dark)] leading-tight">
              Integrative Whole-Body Kinetic Excursion & Arthrokinematics
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

