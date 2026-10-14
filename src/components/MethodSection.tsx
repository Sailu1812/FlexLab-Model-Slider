'use client';

import React, { useEffect, useRef } from 'react';
import { registerGsapPlugins, gsap, isPrefersReducedMotion } from '@/lib/animation';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function MethodSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      number: '01',
      title: 'Assess',
      subtitle: 'Kinematic & joint diagnostics',
      points: [
        'Understand how you move.',
        'Identify the limitation.',
        'Measure what matters.'
      ],
      annotation: 'Range, torque & compensatory patterns'
    },
    {
      number: '02',
      title: 'Treat',
      subtitle: 'Targeted tissue & joint release',
      points: [
        'Reduce pain.',
        'Restore mobility.',
        'Address the source.'
      ],
      annotation: 'Hands-on manual joint mobilization'
    },
    {
      number: '03',
      title: 'Train',
      subtitle: 'Neuromuscular reprogramming',
      points: [
        'Build strength.',
        'Improve control.',
        'Restore confidence.'
      ],
      annotation: 'Progressive biomechanical loading'
    },
    {
      number: '04',
      title: 'Return',
      subtitle: 'Sustainable functional autonomy',
      points: [
        'Get back to the movement',
        'that matters to you.'
      ],
      annotation: 'Resilient athletic & daily performance'
    }
  ];

  useEffect(() => {
    registerGsapPlugins();
    if (isPrefersReducedMotion()) return;

    const cards = cardsRef.current?.querySelectorAll('.method-step-card');
    if (!cards || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.18,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="our-method"
      className="py-24 px-6 sm:px-10 lg:px-12 bg-transparent relative"
      aria-label="The FlexLab Method"
    >
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#fbeddc] border border-[#ead8c3]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)]" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[var(--crimson-dark)] font-semibold">
              Clinical Pathway
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--ink)] leading-tight mb-3">
            The FlexLab Method
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[var(--taupe)] tracking-wide flex items-center gap-2 flex-wrap">
            <span>Assessment</span>
            <span className="text-[var(--crimson)]">→</span>
            <span>Treatment</span>
            <span className="text-[var(--crimson)]">→</span>
            <span>Movement</span>
            <span className="text-[var(--crimson)]">→</span>
            <span>Progress</span>
          </p>
        </div>

        {/* 4 Method Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="method-step-card rounded-3xl p-6 bg-[#fffaf2] border border-[#ead8c3] flex flex-col justify-between hover:border-[var(--rose)] transition-all duration-300 group shadow-xs"
            >
              <div>
                {/* Step Number & Line */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#ead8c3]">
                  <span className="font-serif text-2xl font-bold text-[var(--crimson)]">
                    {step.number}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--taupe)]">
                    Stage {step.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl font-bold text-[var(--ink)] mb-0.5">
                  {step.title}
                </h3>
                <div className="text-[11px] font-mono text-[var(--taupe)] mb-4">
                  {step.subtitle}
                </div>

                {/* Point lines */}
                <ul className="space-y-2 mb-6">
                  {step.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[var(--ink)]/85">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)] mt-1.5 shrink-0" />
                      <span className="font-sans leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Annotation footer */}
              <div className="pt-3 border-t border-[#ead8c3]/60 text-[10px] font-mono text-[var(--taupe)] flex items-center justify-between">
                <span>{step.annotation}</span>
                <ArrowRight size={12} className="text-[var(--crimson)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

