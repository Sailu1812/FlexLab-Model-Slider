'use client';

import React, { useEffect, useRef } from 'react';
import { UserCheck, Activity, HeartHandshake, Quote } from 'lucide-react';
import { gsap, registerGsapPlugins, isPrefersReducedMotion } from '@/lib/animation';

export default function ProofSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const pillars = [
    {
      number: '01',
      title: 'Personalized care',
      subtitle: 'Tailored kinematic protocols',
      description:
        'Every body carries a unique injury history and movement profile. Your evaluation dictates an individual progression plan—never generic routine exercise printouts.',
      icon: UserCheck,
    },
    {
      number: '02',
      title: 'Movement-focused treatment',
      subtitle: 'Active functional restoration',
      description:
        'We prioritize restoring dynamic mechanical efficiency and joint confidence so you regain long-term resilience rather than temporary passive symptom relief.',
      icon: Activity,
    },
    {
      number: '03',
      title: 'One-on-one attention',
      subtitle: 'Dedicated clinician time',
      description:
        'Your sessions are spent directly with your licensed physical therapist. We evaluate, treat, and adjust each rep in real time without passing you off to aides.',
      icon: HeartHandshake,
    },
  ];

  useEffect(() => {
    registerGsapPlugins();
    if (isPrefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.proof-header-anim',
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
        '.proof-card-anim',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.proof-cards-container',
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
      id="proof"
      className="py-24 px-6 sm:px-10 lg:px-12 bg-transparent relative"
      aria-label="Clinical Standards and Verified Practice"
    >
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="proof-header-anim mb-12">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#fbeddc] border border-[#ead8c3]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)]" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[var(--crimson-dark)] font-semibold">
              Clinical Integrity
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--ink)] leading-tight mb-4">
            Movement is measurable. <br />
            <span className="italic text-[var(--crimson)]">Progress is personal.</span>
          </h2>
          <p className="text-sm sm:text-base text-[var(--ink)]/80 font-sans leading-relaxed">
            Our treatment methodology is built around precision metrics and dedicated clinician attention at every phase of your recovery.
          </p>
        </div>

        {/* 3 Pillars Cards */}
        <div className="proof-cards-container space-y-5 mb-10">
          {pillars.map((p) => {
            const IconComponent = p.icon;
            return (
              <div
                key={p.number}
                className="proof-card-anim rounded-3xl p-6 sm:p-7 bg-[#fffaf2] border border-[#ead8c3] hover:border-[var(--rose)] transition-all duration-300 shadow-xs"
              >
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#ead8c3]">
                  <span className="font-serif text-2xl font-bold text-[var(--crimson)]">
                    {p.number}
                  </span>
                  <div className="p-2 rounded-xl bg-[#fbeddc] border border-[#ead8c3]">
                    <IconComponent size={16} className="text-[var(--crimson-dark)]" />
                  </div>
                </div>

                <h3 className="font-serif text-xl font-bold text-[var(--ink)] mb-1">
                  {p.title}
                </h3>
                <div className="text-xs font-mono text-[var(--crimson-dark)] mb-3">
                  {p.subtitle}
                </div>
                <p className="text-xs sm:text-sm text-[var(--ink)]/80 leading-relaxed font-sans">
                  {p.description}
                </p>

                <div className="pt-3 mt-4 border-t border-[#ead8c3]/60 text-[10px] font-mono tracking-wider uppercase text-[var(--taupe)]">
                  FlexLab Patient Standard
                </div>
              </div>
            );
          })}
        </div>

        {/* Patient Review Verification Container */}
        <div className="proof-card-anim rounded-3xl bg-[#fbeddc]/60 border border-[#ead8c3] p-6 relative">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--taupe)] uppercase tracking-wider mb-3">
            <Quote size={14} className="text-[var(--crimson)]" />
            <span>Verified Patient Review Protocol</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#fffaf2] border border-[#ead8c3] border-dashed">
            <p className="font-mono text-xs text-[var(--ink)]/75 italic leading-relaxed mb-3">
              &ldquo;Comprehensive 60-minute kinematic evaluation with licensed physical therapists. Evidence-driven rehabilitation focused on measurable tissue remodeling and lasting movement confidence.&rdquo;
            </p>
            <div className="flex items-center justify-between text-[10px] font-mono text-[var(--taupe)] pt-2 border-t border-[#ead8c3]/60">
              <span>Patient Outcomes Documentation</span>
              <span className="text-[var(--crimson-dark)] font-semibold">AUTHENTIC CLINICAL STANDARD</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
