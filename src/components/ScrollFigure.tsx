'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { registerGsapPlugins, gsap, isPrefersReducedMotion } from '@/lib/animation';
import ClinicalReadout from './ClinicalReadout';
import { Activity, RotateCw, Gauge, ShieldAlert } from 'lucide-react';

export default function ScrollFigure() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  
  // Dynamic state scrubbed via ScrollTrigger
  const [scrollProgress, setScrollProgress] = useState(0);
  const [phase, setPhase] = useState<'neutral' | 'running' | 'quad-activation' | 'rotation'>('neutral');
  const [jointAngle, setJointAngle] = useState(42);
  const [effortPercent, setEffortPercent] = useState(15);
  const [activeRotationAngle, setActiveRotationAngle] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    registerGsapPlugins();
    const motionPref = isPrefersReducedMotion();
    setReducedMotion(motionPref);

    if (motionPref) {
      // In reduced motion, we do not initialize scrubbed timelines
      return;
    }

    const container = containerRef.current;
    const pinSection = pinSectionRef.current;
    if (!container || !pinSection) return;

    // GSAP ScrollTrigger Scrubbed Timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=3800',
          scrub: 0.8,
          pin: pinSection,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(p);

            // Phase 1: 0 - 0.35 -> Running cycle & biomechanical chain
            // Phase 2: 0.35 - 0.70 -> Quadriceps muscle activation
            // Phase 3: 0.70 - 1.0 -> 360 degree continuous rotation
            if (p < 0.35) {
              setPhase('running');
              // Interpolate knee flexion during run strike: 42 -> 83
              const runP = p / 0.35;
              const angle = 42 + Math.sin(runP * Math.PI) * 41;
              setJointAngle(angle);
              setEffortPercent(25 + Math.sin(runP * Math.PI) * 60);
              setActiveRotationAngle(runP * 45);
            } else if (p < 0.70) {
              setPhase('quad-activation');
              const quadP = (p - 0.35) / 0.35;
              // Gradual isometric contraction: 42 to 83 deg, effort ramps to 83%
              const angle = 42 + quadP * 41; // 42 -> 83
              setJointAngle(angle);
              setEffortPercent(30 + quadP * 53); // 30 -> 83
              setActiveRotationAngle(45 + quadP * 45); // 45 -> 90
            } else {
              setPhase('rotation');
              const rotP = (p - 0.70) / 0.30;
              // Continuous 360 degree rotation
              setActiveRotationAngle(90 + rotP * 270);
              setJointAngle(83 - Math.sin(rotP * Math.PI) * 20);
              setEffortPercent(83 - rotP * 35);
            }
          }
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  // Determine current active anatomical view image based on rotation & phase
  let currentImage = '/anatomy/front.webp';
  let viewName = 'Anterior (Front) View';

  if (phase === 'running') {
    currentImage = '/anatomy/running.webp';
    viewName = 'Dynamic Stride Biomechanics';
  } else {
    const normalizedDeg = (activeRotationAngle % 360 + 360) % 360;
    if (normalizedDeg >= 45 && normalizedDeg < 135) {
      currentImage = '/anatomy/three-quarter.webp';
      viewName = '3/4 Anterolateral View';
    } else if (normalizedDeg >= 135 && normalizedDeg < 225) {
      currentImage = '/anatomy/back.webp';
      viewName = 'Posterior (Back Spine) View';
    } else if (normalizedDeg >= 225 && normalizedDeg < 315) {
      currentImage = '/anatomy/three-quarter.webp';
      viewName = '3/4 Posterolateral View';
    } else {
      currentImage = '/anatomy/front.webp';
      viewName = 'Anterior Neutral View';
    }
  }

  return (
    <section
      ref={containerRef}
      id="scroll-figure-experience"
      className="relative bg-[var(--cream)]"
      aria-label="Interactive Anatomical Scroll Storytelling"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinSectionRef}
        className="w-full h-screen flex flex-col justify-between py-12 px-6 sm:px-10 lg:px-16 overflow-hidden relative"
      >
        {/* Top Clinical Header Bar */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--crimson)] animate-warm-pulse" />
            <div>
              <div className="text-xs uppercase font-mono tracking-widest text-[var(--crimson-dark)] font-bold">
                Biomechanics Lab // 01
              </div>
              <div className="text-[11px] font-mono text-[var(--taupe)]">
                Scroll-Driven Kinetic Chain Analysis
              </div>
            </div>
          </div>

          {/* Engine indicator */}
          <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-[var(--ink)]/70">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fbeddc] border border-[#ead8c3]">
              <RotateCw size={13} className="text-[var(--crimson)]" />
              <span>Rotation: {Math.round(activeRotationAngle % 360)}°</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fbeddc] border border-[#ead8c3]">
              <Gauge size={13} className="text-[var(--crimson)]" />
              <span>Scroll Control: Active</span>
            </div>
          </div>
        </div>

        {/* Center Canvas Area: Narrative Editorial on Left, Anatomical Figure on Right/Center */}
        <div className="max-w-7xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 py-4">
          {/* Left Narrative Text Cards based on Phase */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            {phase === 'running' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="inline-block px-3 py-1 rounded-full bg-[#fbeddc] border border-[#ead8c3] text-[11px] font-mono uppercase tracking-wider text-[var(--crimson-dark)]">
                  Primary Movement Pattern
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--ink)] leading-tight">
                  The complete <br />
                  <span className="italic text-[var(--crimson)]">kinetic chain.</span>
                </h2>
                <p className="text-sm sm:text-base text-[var(--ink)]/80 leading-relaxed font-sans">
                  Movement does not happen in isolation. From initial foot strike to knee flexion, hip extension, and reciprocal arm drive, every joint transfers torque through your connective tissue.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-[#fffaf2] border border-[#ead8c3]">
                    <span className="text-[var(--taupe)] block text-[10px]">FORCE TRANSFER</span>
                    <span className="font-bold text-[var(--ink)]">Ground Reaction</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#fffaf2] border border-[#ead8c3]">
                    <span className="text-[var(--taupe)] block text-[10px]">JOINT CADENCE</span>
                    <span className="font-bold text-[var(--crimson)]">Deceleration Phase</span>
                  </div>
                </div>
              </div>
            )}

            {phase === 'quad-activation' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="inline-block px-3 py-1 rounded-full bg-[#fbeddc] border border-[#ead8c3] text-[11px] font-mono uppercase tracking-wider text-[var(--crimson-dark)]">
                  Muscle Activation Sequence
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--ink)] leading-tight">
                  &ldquo;Squeeze your <br />
                  <span className="italic text-[var(--crimson)]">quad.&rdquo;</span>
                </h2>
                <p className="text-sm sm:text-base text-[var(--ink)]/80 leading-relaxed font-sans">
                  As you scroll, motor units recruit across the rectus femoris and vastus medialis. The muscle thickens, tension increases, and the knee joint stabilizes under progressive isometric loading.
                </p>
                <div className="p-4 rounded-2xl bg-[#fffaf2] border border-[#ead8c3] space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-[var(--ink)]/70">Quadriceps Femoris</span>
                    <span className="text-[var(--crimson)] font-bold">EFFORT {Math.round(effortPercent)}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#ead8c3]/60 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--crimson)] rounded-full transition-all duration-150"
                      style={{ width: `${effortPercent}%` }}
                    />
                  </div>
                  <div className="text-[10px] font-mono text-[var(--taupe)] pt-1 flex justify-between">
                    <span>Opposing Hamstring: Controlled</span>
                    <span>Reciprocal Inhibition: Active</span>
                  </div>
                </div>
              </div>
            )}

            {phase === 'rotation' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="inline-block px-3 py-1 rounded-full bg-[#fbeddc] border border-[#ead8c3] text-[11px] font-mono uppercase tracking-wider text-[var(--crimson-dark)]">
                  360° Volumetric Assessment
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--ink)] leading-tight">
                  Every plane of <br />
                  <span className="italic text-[var(--crimson)]">motion matters.</span>
                </h2>
                <p className="text-sm sm:text-base text-[var(--ink)]/80 leading-relaxed font-sans">
                  From spinal erectors to deep gluteals and posterior calf musculature, our clinical team evaluates your posture and rotation across sagittal, frontal, and transverse planes.
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  {['Sagittal Plane', 'Frontal Plane', 'Transverse Plane', 'Posterior Spine'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-[#fffaf2] border border-[#ead8c3] text-[var(--ink)]/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {phase === 'neutral' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="inline-block px-3 py-1 rounded-full bg-[#fbeddc] border border-[#ead8c3] text-[11px] font-mono uppercase tracking-wider text-[var(--crimson-dark)]">
                  Interactive Evaluation
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--ink)] leading-tight">
                  Scroll to initiate <br />
                  <span className="italic text-[var(--crimson)]">movement.</span>
                </h2>
                <p className="text-sm sm:text-base text-[var(--ink)]/80 leading-relaxed font-sans">
                  The anatomical figure responds directly to your scroll position. Scroll slowly to inspect joint alignment, or scroll continuously to advance through the stride sequence.
                </p>
              </div>
            )}
          </div>

          {/* Right Center Figure Viewport + Floating Clinical Instrument */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[460px] lg:min-h-[560px]">
            {/* Soft clinical backdrop warmth */}
            <div className="absolute inset-0 rounded-full bg-[#fbeddc]/60 filter blur-3xl scale-95 pointer-events-none" />

            {/* Anatomical Figure Visual Container */}
            <div className="relative w-full max-w-[380px] lg:max-w-[440px] aspect-[3/4] flex items-center justify-center">
              <Image
                src={currentImage}
                alt=""
                width={768}
                height={1024}
                priority
                quality={90}
                className="w-full h-full object-contain filter drop-shadow-[0_12px_36px_rgba(93,16,36,0.1)] select-none pointer-events-none transition-all duration-300"
              />

              {/* Muscle warming glow overlay when quad-activation is active */}
              {phase === 'quad-activation' && (
                <div
                  className="absolute top-[48%] left-[42%] w-16 h-28 rounded-full bg-[var(--crimson)]/20 filter blur-xl pointer-events-none animate-pulse"
                  aria-hidden="true"
                />
              )}

              {/* Anatomical region tag */}
              <div className="absolute bottom-2 right-2 px-3 py-1.5 rounded-full bg-[#fffaf2]/90 border border-[#ead8c3] shadow-sm text-[10px] font-mono text-[var(--ink)]/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)] animate-warm-pulse" />
                <span>{viewName}</span>
              </div>
            </div>

            {/* Floating Clinical Readout Instrument - Placed dynamically */}
            <div className="absolute top-4 right-0 sm:right-4 z-20 scale-90 sm:scale-100 origin-top-right">
              <ClinicalReadout
                region="LEFT KNEE"
                movement="Flexion Angle"
                angle={jointAngle}
                effort={effortPercent}
                metricLabel="QUADRICEPS RECRUITMENT"
                side="Sagittal Axis"
              />
            </div>
          </div>
        </div>

        {/* Bottom Progress Scrub Tracker */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between text-xs font-mono text-[var(--taupe)] pt-4 border-t border-[#ead8c3]/80 z-20">
          <div className="flex items-center gap-2">
            <span>Scroll Timeline:</span>
            <span className="text-[var(--crimson-dark)] font-bold tabular-nums">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <span className={phase === 'running' ? 'text-[var(--crimson)] font-bold' : ''}>
              01 Stride Chain
            </span>
            <span className="text-[#ead8c3]">→</span>
            <span className={phase === 'quad-activation' ? 'text-[var(--crimson)] font-bold' : ''}>
              02 Muscle Activation
            </span>
            <span className="text-[#ead8c3]">→</span>
            <span className={phase === 'rotation' ? 'text-[var(--crimson)] font-bold' : ''}>
              03 Multi-Angle Plane
            </span>
          </div>

          <div className="text-[11px] uppercase tracking-wider">
            FlexLab Kinematics Engine
          </div>
        </div>
      </div>
    </section>
  );
}
