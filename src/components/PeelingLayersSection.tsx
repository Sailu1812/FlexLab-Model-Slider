'use client';

import React, { useState, useEffect, useRef } from 'react';
import { registerGsapPlugins, gsap, ScrollTrigger, isPrefersReducedMotion } from '@/lib/animation';
import { Layers, Scan, CheckCircle2, RotateCw } from 'lucide-react';

export default function PeelingLayersSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [peelPercent, setPeelPercent] = useState(0); // 0 = full muscle, 100 = full skeleton

  useEffect(() => {
    registerGsapPlugins();
    if (isPrefersReducedMotion()) return;

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Pin the section so user is stuck in the OSTEOLOGICAL SCAN area
      // while scrolling, the 3D model spins 360° and is replaced with the skeleton body!
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=1800',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onEnter: () => {
          window.dispatchEvent(new CustomEvent('flexlab-ortho-active', { detail: { active: false } }));
        },
        onEnterBack: () => {
          window.dispatchEvent(new CustomEvent('flexlab-ortho-active', { detail: { active: false } }));
        },
        onUpdate: (self) => {
          const val = Math.round(self.progress * 100);
          setPeelPercent(val);
          window.dispatchEvent(
            new CustomEvent('flexlab-peel-sync', {
              detail: { progress: self.progress }
            })
          );
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setPeelPercent(val);
    window.dispatchEvent(
      new CustomEvent('flexlab-peel-sync', {
        detail: { progress: val / 100 }
      })
    );
  };

  return (
    <section
      id="peeling-layers"
      ref={containerRef}
      className="min-h-screen flex items-center py-16 px-6 sm:px-10 lg:px-16 bg-[#fbeddc]/40 border-b border-[#ead8c3] relative overflow-hidden"
      aria-label="Progressive Anatomical Layer Reveal"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Narrative Explanations - Layered at z-40 so 3D model never overlaps */}
          <div className="lg:col-span-6 space-y-6 relative z-40">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--crimson)]" />
              <span className="text-xs uppercase tracking-[0.25em] font-mono text-[var(--crimson-dark)] font-semibold">
                Structural Stratification
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[var(--ink)] leading-tight">
              Looking beneath <br />
              <span className="italic text-[var(--crimson)]">the surface.</span>
            </h2>

            <p className="text-base sm:text-lg text-[var(--ink)]/85 font-sans leading-relaxed">
              True rehabilitation requires understanding the relationship between the superficial muscle engines and the deep osseous framework that bears load.
            </p>

            <div className="p-6 rounded-3xl bg-[#fffaf2] border border-[#ead8c3] space-y-4 shadow-xs">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-2 text-[var(--ink)]">
                  <Layers size={14} className="text-[var(--crimson)]" />
                  <span>3D Real-Time Depth Scanner</span>
                </span>
                <span className="text-[var(--crimson-dark)] font-bold">
                  {peelPercent >= 75
                    ? '100% SKELETON REVEALED'
                    : peelPercent >= 40
                    ? 'OSTEO MATRIX REVEALED'
                    : `Depth: ${Math.round(peelPercent)}% Scanned`}
                </span>
              </div>

              {/* Interactive Range Slider */}
              <div className="space-y-1">
                <label htmlFor="peel-slider" className="sr-only">
                  Anatomical reveal depth
                </label>
                <input
                  id="peel-slider"
                  type="range"
                  min="0"
                  max="100"
                  value={peelPercent}
                  onChange={handleSliderChange}
                  className="w-full accent-[var(--crimson)] h-2 bg-[#ead8c3] rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[var(--taupe)] pt-1">
                  <span>Contractile Musculature</span>
                  <span className="text-[var(--crimson-dark)] font-semibold">Deep Skeletal Matrix</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-[#fff5e8] border border-[#ead8c3]">
                <div className="text-[10px] uppercase text-[var(--taupe)] mb-1">Above Scan Line</div>
                <div className="font-bold text-[var(--crimson-dark)]">Osteo-Articular Core</div>
                <p className="text-[11px] text-[var(--ink)]/70 mt-1 font-sans">
                  Trabecular bone density, joint facets & ligament insertions.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#fff5e8] border border-[#ead8c3]">
                <div className="text-[10px] uppercase text-[var(--taupe)] mb-1">Below Scan Line</div>
                <div className="font-bold text-[var(--crimson-dark)]">Contractile Musculature</div>
                <p className="text-[11px] text-[var(--ink)]/70 mt-1 font-sans">
                  Pennate muscle fibers, fascia & active torque generators.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Open 3D Stage (Scanning box removed, model floats freely & prominently) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-between relative min-h-[580px] pointer-events-none select-none">
            {/* Top Status Datum */}
            <div className="w-full flex items-center justify-between px-2 pt-2 z-20">
              <span className="px-3.5 py-1.5 rounded-full bg-[#fffaf2]/90 backdrop-blur-md border border-[#ead8c3] text-[10px] font-mono text-[var(--crimson-dark)] font-bold shadow-xs flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${peelPercent >= 75 ? 'bg-emerald-600' : 'bg-[var(--crimson)] animate-pulse'}`} />
                {peelPercent >= 75 ? '100% SKELETON REVEALED' : peelPercent >= 40 ? 'OSTEO REVEAL SCAN' : 'ANATOMICAL SCAN'}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#fffaf2]/80 backdrop-blur-md border border-[#ead8c3] text-[11px] font-mono font-bold text-[var(--crimson)] shadow-xs">
                {Math.round(peelPercent)}% DEPTH
              </span>
            </div>

            {/* Subtle soft warm radial bloom in background to elevate the 3D model */}
            <div className="w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(244,228,210,0.55)_0%,transparent_70%)] filter blur-3xl pointer-events-none my-auto" />

            {/* Bottom guide text */}
            <div className="w-full flex items-center justify-center pb-2 z-20">
              <div className="text-xs font-mono text-[var(--taupe)] flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fffaf2]/80 backdrop-blur-md border border-[#ead8c3] shadow-xs">
                <span className={`w-1.5 h-1.5 rounded-full ${peelPercent >= 75 ? 'bg-emerald-500' : 'bg-[var(--crimson)] animate-warm-pulse'}`} />
                <span>
                  {peelPercent >= 75
                    ? 'Skeleton revealed • Scroll down into Specialized Care ↓'
                    : 'Pinned area • Scroll to spin 360° & reveal deep skeleton'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
