'use client';

import React, { useEffect, useRef } from 'react';
import { CreditCard, Check } from 'lucide-react';
import { BookingTriggerButton } from './BookingContext';
import { gsap, registerGsapPlugins, isPrefersReducedMotion } from '@/lib/animation';

export default function InsuranceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const insuranceGroups = [
    {
      category: 'Government Programs',
      description: 'Direct billing with federal & state health plans',
      plans: ['Medicare', 'MassHealth (Medicaid)', 'Tricare', 'GIC / Unicare'],
    },
    {
      category: 'Commercial Insurers',
      description: 'In-network participation across regional & national carriers',
      plans: [
        'Blue Cross Blue Shield of MA',
        'Harvard Pilgrim Health Care',
        'Tufts Health Plan',
        'Aetna',
        'Cigna',
        'United Healthcare',
        'Fallon Health',
        'Multiplan / PHCS',
      ],
    },
    {
      category: 'Injury & Accident Claims',
      description: 'Dedicated claim coordination & legal documentation',
      plans: ["Workers' Compensation", 'Auto and PIP (Personal Injury Protection)'],
    },
    {
      category: 'Self-Pay Options',
      description: 'Transparent out-of-pocket scheduling without network delays',
      plans: ['Cash Pay', 'FSA / HSA Health Savings Accounts Accepted'],
    },
  ];

  useEffect(() => {
    registerGsapPlugins();
    if (isPrefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.insurance-header-anim',
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
        '.insurance-card-anim',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.insurance-grid-container',
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
      id="insurance"
      className="py-24 px-6 sm:px-10 lg:px-12 bg-[#fbeddc]/40 border-y border-[#ead8c3] relative"
      aria-label="Insurance and Payment Information"
    >
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="insurance-header-anim mb-12">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#fbeddc] border border-[#ead8c3]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)]" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[var(--crimson-dark)] font-semibold">
              Coverage & Transparency
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--ink)] leading-tight mb-3">
            Insurance & Payment
          </h2>
          <p className="text-sm sm:text-base text-[var(--ink)]/80 font-sans leading-relaxed">
            We keep payment straightforward. Coverage is verified prior to your first appointment so there are no unexpected bills.
          </p>
        </div>

        {/* 4 Groupings in Clear Editorial Typography (Strictly NO LOGOS per Section 7 of PDF) */}
        <div className="insurance-grid-container grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {insuranceGroups.map((group) => (
            <div
              key={group.category}
              className="insurance-card-anim rounded-3xl p-5 sm:p-6 bg-[#fffaf2] border border-[#ead8c3] flex flex-col justify-between shadow-xs hover:border-[var(--rose)] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#ead8c3]">
                  <h3 className="font-serif text-lg font-bold text-[var(--ink)]">
                    {group.category}
                  </h3>
                  <CreditCard size={15} className="text-[var(--crimson)]" />
                </div>
                <p className="text-[11px] font-mono text-[var(--taupe)] mb-4">
                  {group.description}
                </p>

                <ul className="space-y-2">
                  {group.plans.map((plan) => (
                    <li
                      key={plan}
                      className="flex items-start gap-2 text-xs text-[var(--ink)] font-sans"
                    >
                      <span className="w-3.5 h-3.5 rounded-full bg-[#fbeddc] border border-[#ead8c3] flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={9} className="text-[var(--crimson)]" />
                      </span>
                      <span className="font-medium leading-tight">{plan}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 mt-4 border-t border-[#ead8c3]/60 text-[9px] font-mono text-[var(--taupe)] uppercase tracking-wider">
                Direct In-Network Processing
              </div>
            </div>
          ))}
        </div>

        {/* Verification Callout */}
        <div className="insurance-card-anim p-5 rounded-3xl bg-[#fffaf2] border border-[#ead8c3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-serif text-base font-bold text-[var(--ink)] mb-0.5">
              Need coverage verified before you arrive?
            </h4>
            <p className="text-xs text-[var(--ink)]/75 font-sans">
              Our clinical staff verifies your out-of-pocket benefits directly with your insurer.
            </p>
          </div>
          <BookingTriggerButton className="px-5 py-2.5 rounded-full bg-[var(--crimson)] text-[#fffaf2] text-xs font-semibold hover:bg-[var(--crimson-dark)] transition-colors whitespace-nowrap cursor-pointer shrink-0">
            Verify Benefits & Book
          </BookingTriggerButton>
        </div>
      </div>
    </section>
  );
}
