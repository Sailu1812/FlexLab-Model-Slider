'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SERVICES } from '@/lib/services';
import { registerGsapPlugins, gsap, ScrollTrigger, isPrefersReducedMotion } from '@/lib/animation';
import { Target, Activity, ArrowUpRight } from 'lucide-react';
import { BookingTriggerButton } from './BookingContext';

const SERVICE_TELEMETRY = [
  {
    rotY: 0.5, // 3/4 front
    region: 'KNEE, HIP & SHOULDER',
    movement: 'Arthrokinematic Glide',
    angle: 83,
    effort: 85,
    metricLabel: 'POST-SURGICAL RECONSTRUCTION',
    side: '3/4 Frontal View',
    shows: 'Knee, hip and shoulder joints',
    angleName: 'Three-Quarter Front',
  },
  {
    rotY: 2.4, // 3/4 back
    region: 'CALF, HAMSTRING & ANKLE',
    movement: 'Talocrural Dorsiflexion',
    angle: 24,
    effort: 92,
    metricLabel: 'POSTERIOR KINETIC TENSION',
    side: '3/4 Posterior View',
    shows: 'Calf, hamstring, ankle',
    angleName: 'Three-Quarter Back',
  },
  {
    rotY: Math.PI, // 180 deg back
    region: 'LOWER & UPPER SPINE',
    movement: 'Vertebral Articulation',
    angle: 42,
    effort: 74,
    metricLabel: 'SEGMENTAL DECOMPRESSION',
    side: 'Direct Posterior View',
    shows: 'Lower and upper spine',
    angleName: 'Full Back View',
  },
  {
    rotY: 0.65, // close 3/4
    region: 'PERITENDINOUS TISSUE',
    movement: 'Capsular Translation',
    angle: 65,
    effort: 58,
    metricLabel: 'MYOFASCIAL MOBILIZATION',
    side: 'Close 3/4 Focus',
    shows: 'One joint and surrounding tissue',
    angleName: 'Close Three-Quarter',
  },
  {
    rotY: 0.0, // front
    region: 'QUADS & GLUTES TIGHTENING',
    movement: 'Concentric Contraction',
    angle: 90,
    effort: 96,
    metricLabel: 'MOTOR UNIT RECRUITMENT',
    side: 'Direct Anterior View',
    shows: 'Quads and glutes tightening',
    angleName: 'Front View',
  },
  {
    rotY: 0.1, // front wider shot
    region: 'ANKLES, HIPS & DEEP CORE',
    movement: 'Somatosensory Alignment',
    angle: 6,
    effort: 82,
    metricLabel: 'PROPRIOCEPTIVE RECALIBRATION',
    side: 'Frontal Wide Plane',
    shows: 'Ankles, hips, deep core',
    angleName: 'Front / Wider Shot',
  },
  {
    rotY: -2.4, // three-quarter back opposite
    region: 'NECK & UPPER BACK',
    movement: 'Craniocervical Flexion',
    angle: 34,
    effort: 68,
    metricLabel: 'PIP CERVICAL RESTORATION',
    side: '3/4 Posterior Oblique',
    shows: 'Neck and upper back',
    angleName: 'Three-Quarter Back',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const activateService = (idx: number) => {
    setActiveIdx(idx);
    const telem = SERVICE_TELEMETRY[idx];
    if (!telem || typeof window === 'undefined') return;

    // Dispatch smooth model rotation
    window.dispatchEvent(
      new CustomEvent('flexlab-model-pose', {
        detail: {
          rotY: telem.rotY,
          animName: idx === 1 ? 'Running' : 'Idle',
        },
      })
    );

    // Dispatch telemetry readout update
    window.dispatchEvent(
      new CustomEvent('flexlab-readout-update', {
        detail: {
          region: telem.region,
          movement: telem.movement,
          angle: telem.angle,
          effort: telem.effort,
          metricLabel: telem.metricLabel,
          side: telem.side,
        },
      })
    );
  };

  useEffect(() => {
    registerGsapPlugins();
    if (isPrefersReducedMotion()) return;

    const cards = sectionRef.current?.querySelectorAll('.service-scroll-card');
    if (!cards || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        '.services-header-anim',
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

      // Card entrance & active triggers
      cards.forEach((card, idx) => {
        // Entrance animation
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );

        // Model rotation trigger when card enters focus
        ScrollTrigger.create({
          trigger: card,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => activateService(idx),
          onEnterBack: () => activateService(idx),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 px-6 sm:px-10 lg:px-12 bg-transparent relative"
      aria-label="Clinical Services"
    >
      <div className="w-full max-w-xl">
        {/* Section Header */}
        <div className="services-header-anim mb-14">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#fbeddc] border border-[#ead8c3]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)]" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[var(--crimson-dark)] font-semibold">
              The Seven Disciplines
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--ink)] leading-tight mb-4">
            The Services, <br />
            <span className="italic text-[var(--crimson)]">& the Biomechanical Spin.</span>
          </h2>
          <p className="text-sm sm:text-base text-[var(--ink)]/80 font-sans leading-relaxed">
            As you scroll through each real clinical service, the 3D anatomical figure smoothly turns to isolate the exact joints, musculature, and kinetic vectors being rehabilitated.
          </p>
        </div>

        {/* 7 Vertical Service Cards */}
        <div className="space-y-8">
          {SERVICES.map((s, idx) => {
            const telem = SERVICE_TELEMETRY[idx];
            const isActive = activeIdx === idx;

            return (
              <div
                key={s.id}
                id={`service-${idx}`}
                onClick={() => activateService(idx)}
                className={`service-scroll-card rounded-3xl p-6 sm:p-7 bg-[#fffaf2] border transition-all duration-500 cursor-pointer shadow-xs ${
                  isActive
                    ? 'border-[var(--crimson)] ring-2 ring-[var(--crimson)]/10 shadow-[0_10px_30px_rgba(160,20,47,0.06)]'
                    : 'border-[#ead8c3] hover:border-[var(--rose)]'
                }`}
              >
                {/* Card Top Row: Number, Title, and Angle Badge */}
                <div className="flex items-start justify-between gap-3 pb-3 mb-4 border-b border-[#ead8c3]/80">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-[var(--crimson)]">
                        {s.number}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)]" />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--taupe)]">
                        {telem?.shows}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[var(--ink)] leading-tight">
                      {s.title}
                    </h3>
                  </div>

                  {/* Camera Angle Tag */}
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono whitespace-nowrap border shrink-0 transition-colors ${
                      isActive
                        ? 'bg-[var(--crimson)] text-white border-[var(--crimson)]'
                        : 'bg-[#fbeddc] text-[var(--crimson-dark)] border-[#ead8c3]'
                    }`}
                  >
                    Angle: {telem?.angleName}
                  </span>
                </div>

                {/* Tagline */}
                <p className="text-xs font-mono text-[var(--crimson-dark)] mb-3 font-medium">
                  {s.tagline}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[var(--ink)]/80 leading-relaxed font-sans mb-5">
                  {s.description}
                </p>

                {/* Target Joints */}
                <div className="p-3 rounded-2xl bg-[#fbeddc]/60 border border-[#ead8c3] mb-5">
                  <div className="text-[10px] font-mono uppercase text-[var(--taupe)] font-semibold mb-1.5 flex items-center gap-1.5">
                    <Target size={11} className="text-[var(--crimson)]" />
                    <span>Focus Articulations</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {s.focusJoints.map((j) => (
                      <span
                        key={j}
                        className="text-[11px] font-sans px-2.5 py-0.5 rounded-full bg-[#fffaf2] border border-[#ead8c3] text-[var(--ink)]"
                      >
                        {j}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer with Indications and CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-[#ead8c3]/60 text-xs">
                  <span className="text-[10px] font-mono text-[var(--taupe)] flex items-center gap-1">
                    <Activity size={12} className="text-[var(--crimson)]" />
                    <span>{s.clinicalNote}</span>
                  </span>
                  <BookingTriggerButton className="text-xs font-semibold text-[var(--crimson)] hover:text-[var(--crimson-dark)] flex items-center gap-0.5 cursor-pointer">
                    <span>Evaluate</span>
                    <ArrowUpRight size={13} />
                  </BookingTriggerButton>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
