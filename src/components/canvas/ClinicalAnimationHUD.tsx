"use client";

import React, { useState, useEffect, useRef, useTransition } from "react";
import {
  CLINICAL_ANIMATIONS,
  ClinicalAnimation,
} from "@/lib/clinicalAnimations";
import {
  Play,
  Pause,
  RotateCw,
  FastForward,
  ChevronDown,
  ChevronUp,
  Activity,
  Layers,
  Sparkles,
  Sliders,
  CheckCircle2,
  Maximize2,
  Minimize2,
} from "lucide-react";

export default function ClinicalAnimationHUD() {
  const [activeAnimId, setActiveAnimId] = useState<string>("Idle");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1.0);
  const [isTourActive, setIsTourActive] = useState<boolean>(false);
  const [tourIndex, setTourIndex] = useState<number>(0);
  const [tourSecondsLeft, setTourSecondsLeft] = useState<number>(6);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<
    "All" | "Posture" | "Upper Extremity" | "Spine & Core" | "Lower Extremity" | "Kinetic Chain"
  >("All");

  const tourTimerRef = useRef<NodeJS.Timeout | null>(null);
  const tourIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const activeAnim =
    CLINICAL_ANIMATIONS.find((a) => a.id.toLowerCase() === activeAnimId.toLowerCase()) ||
    CLINICAL_ANIMATIONS[0];

  // Sync with events from Scene or GSAP ScrollTrigger
  useEffect(() => {
    const handleAnimChange = (e: any) => {
      if (e.detail?.name) {
        setActiveAnimId(e.detail.name);
      }
    };
    window.addEventListener("flexlab-animation-changed", handleAnimChange);
    return () =>
      window.removeEventListener("flexlab-animation-changed", handleAnimChange);
  }, []);

  const triggerAnimation = (animId: string) => {
    setActiveAnimId(animId);
    window.dispatchEvent(
      new CustomEvent("flexlab-set-animation", {
        detail: { name: animId, duration: 0.5 },
      })
    );
  };

  const togglePlayPause = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    window.dispatchEvent(
      new CustomEvent("flexlab-pause-animation", {
        detail: { paused: !nextState },
      })
    );
  };

  const changeSpeed = (newSpeed: number) => {
    setSpeed(newSpeed);
    window.dispatchEvent(
      new CustomEvent("flexlab-set-speed", {
        detail: { speed: newSpeed },
      })
    );
  };

  // Automated Tour through all 14 animations
  const startTour = () => {
    setIsTourActive(true);
    setTourIndex(0);
    playTourStep(0);
  };

  const stopTour = () => {
    setIsTourActive(false);
    if (tourTimerRef.current) clearTimeout(tourTimerRef.current);
    if (tourIntervalRef.current) clearInterval(tourIntervalRef.current);
  };

  const playTourStep = (index: number) => {
    if (index >= CLINICAL_ANIMATIONS.length) {
      // Completed all 14 animations, loop back to Idle
      stopTour();
      triggerAnimation("Idle");
      return;
    }

    const current = CLINICAL_ANIMATIONS[index];
    setTourIndex(index);
    triggerAnimation(current.id);

    // Each animation displays for 6 seconds in tour mode
    const DURATION = 6;
    setTourSecondsLeft(DURATION);

    if (tourIntervalRef.current) clearInterval(tourIntervalRef.current);
    tourIntervalRef.current = setInterval(() => {
      setTourSecondsLeft((prev) => {
        if (prev <= 1) {
          return DURATION;
        }
        return prev - 1;
      });
    }, 1000);

    if (tourTimerRef.current) clearTimeout(tourTimerRef.current);
    tourTimerRef.current = setTimeout(() => {
      playTourStep(index + 1);
    }, DURATION * 1000);
  };

  useEffect(() => {
    return () => {
      if (tourTimerRef.current) clearTimeout(tourTimerRef.current);
      if (tourIntervalRef.current) clearInterval(tourIntervalRef.current);
    };
  }, []);

  const categories = [
    "All",
    "Posture",
    "Upper Extremity",
    "Spine & Core",
    "Lower Extremity",
    "Kinetic Chain",
  ] as const;

  const filteredAnimations =
    activeTab === "All"
      ? CLINICAL_ANIMATIONS
      : CLINICAL_ANIMATIONS.filter((a) => a.category === activeTab);

  return (
    <aside
      aria-label="Clinical Animation Suite"
      className="fixed bottom-4 right-4 z-50 max-w-sm sm:max-w-md w-[calc(100vw-2rem)] select-none pointer-events-auto font-sans"
    >
      {/* Minimized Pill */}
      {!isExpanded && (
        <div className="bg-[#fffaf2]/95 backdrop-blur-xl border border-[#ead8c3] shadow-[0_12px_40px_rgba(36,25,27,0.12)] rounded-2xl p-3 flex items-center justify-between gap-3 text-xs transition-all hover:border-[#a0142f]/40">
          <button
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-2.5 text-left flex-1 group"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a0142f] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#a0142f]"></span>
            </span>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#a0142f] font-semibold">
                Anatomy Engine (15 Motions)
              </div>
              <div className="text-sm font-serif font-medium text-[#24191b] truncate max-w-[180px]">
                {activeAnim.name}
              </div>
            </div>
          </button>

          <div className="flex items-center gap-1.5">
            {!isTourActive ? (
              <button
                onClick={startTour}
                className="px-2.5 py-1.5 rounded-lg bg-[#a0142f] text-white text-[11px] font-medium hover:bg-[#5d1024] transition-colors flex items-center gap-1 shadow-sm"
                title="Tour all 15 movements"
              >
                <Play size={12} fill="white" />
                <span>Tour</span>
              </button>
            ) : (
              <button
                onClick={stopTour}
                className="px-2.5 py-1.5 rounded-lg bg-[#5d1024] text-white text-[11px] font-medium transition-colors flex items-center gap-1 animate-pulse"
              >
                <Pause size={12} fill="white" />
                <span>Stop</span>
              </button>
            )}

            <button
              onClick={() => setIsExpanded(true)}
              className="p-1.5 rounded-lg hover:bg-[#ead8c3]/40 text-[#24191b]/70 transition-colors"
              title="Expand Controls"
            >
              <Maximize2 size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Expanded Full HUD Panel */}
      {isExpanded && (
        <div className="bg-[#fffaf2]/95 backdrop-blur-2xl border border-[#ead8c3] shadow-[0_20px_50px_rgba(36,25,27,0.18)] rounded-3xl p-4 sm:p-5 text-[#24191b] transition-all">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 pb-3 border-b border-[#ead8c3]/60 mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a0142f] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a0142f]"></span>
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#a0142f] font-semibold">
                  Biomechanics Engine • 15 Sequences
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-[#24191b] mt-0.5 leading-snug">
                {activeAnim.name}
              </h2>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1.5 rounded-xl hover:bg-[#ead8c3]/40 text-[#24191b]/60 hover:text-[#24191b] transition-colors"
                title="Minimize Panel"
              >
                <Minimize2 size={16} />
              </button>
            </div>
          </div>

          {/* Telemetry Capsule */}
          <div className="bg-[#fbeddc]/70 rounded-2xl p-3 border border-[#ead8c3]/50 mb-3">
            <div className="grid grid-cols-2 gap-2 text-xs mb-1.5">
              <div>
                <span className="text-[10px] uppercase font-mono text-[#b99378] block">
                  Articulating Target
                </span>
                <span className="font-medium text-[#5d1024] text-xs truncate block">
                  {activeAnim.joint}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-[#b99378] block">
                  Clinical Range
                </span>
                <span className="font-mono text-xs text-[#a0142f] font-semibold block">
                  {activeAnim.normalRom}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-[#24191b]/75 leading-relaxed line-clamp-2">
              {activeAnim.description}
            </p>
          </div>

          {/* Auto-Tour Banner / Progress */}
          {isTourActive ? (
            <div className="bg-[#a0142f] text-white rounded-2xl p-3 mb-3 shadow-md">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="flex items-center gap-1.5 font-semibold tracking-wider">
                  <Activity size={13} className="animate-spin" />
                  KINETIC TOUR: {tourIndex + 1} / {CLINICAL_ANIMATIONS.length}
                </span>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">
                  Next in {tourSecondsLeft}s
                </span>
              </div>
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mb-2">
                <div
                  className="bg-white h-full transition-all duration-300"
                  style={{
                    width: `${((tourIndex + 1) / CLINICAL_ANIMATIONS.length) * 100}%`,
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="truncate max-w-[200px] text-white/90">
                  {activeAnim.name}
                </span>
                <button
                  onClick={stopTour}
                  className="px-2.5 py-1 bg-white text-[#a0142f] font-semibold rounded-lg text-[10px] hover:bg-white/90 transition-colors"
                >
                  Stop Tour
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={startTour}
                className="flex-1 py-2 px-3 rounded-xl bg-[#a0142f] text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#5d1024] active:scale-[0.98] transition-all shadow-sm group"
              >
                <Play size={13} fill="white" className="group-hover:translate-x-0.5 transition-transform" />
                <span>Play All 15 Movements (Auto-Tour)</span>
              </button>
            </div>
          )}

          {/* Quick Playback Bar: Speed & Play/Pause */}
          <div className="flex items-center justify-between gap-2 py-2 px-3 bg-[#fff5e8] rounded-xl border border-[#ead8c3]/60 mb-3 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlayPause}
                className="p-1.5 rounded-lg bg-[#24191b] text-white hover:bg-[#5d1024] transition-colors"
                title={isPlaying ? "Pause animation" : "Resume animation"}
              >
                {isPlaying ? <Pause size={13} /> : <Play size={13} fill="white" />}
              </button>
              <span className="text-[11px] font-mono text-[#24191b]/70">
                {isPlaying ? "Playing 60fps" : "Paused"}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-[10px] uppercase font-mono text-[#b99378] mr-1">
                Speed
              </span>
              {[0.5, 1.0, 1.5].map((s) => (
                <button
                  key={s}
                  onClick={() => changeSpeed(s)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-medium transition-colors ${
                    speed === s
                      ? "bg-[#a0142f] text-white"
                      : "bg-[#ead8c3]/40 text-[#24191b] hover:bg-[#ead8c3]"
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 mb-2.5 scrollbar-none text-[11px]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
                  activeTab === cat
                    ? "bg-[#24191b] text-white shadow-sm"
                    : "bg-[#ead8c3]/30 text-[#24191b]/70 hover:bg-[#ead8c3]/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* All 14 Selectable Animations Pills */}
          <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
            {filteredAnimations.map((anim) => {
              const isCurrent =
                anim.id.toLowerCase() === activeAnimId.toLowerCase();
              return (
                <button
                  key={anim.id}
                  onClick={() => {
                    if (isTourActive) stopTour();
                    triggerAnimation(anim.id);
                  }}
                  className={`px-2.5 py-2 rounded-xl text-left transition-all text-xs border flex items-center justify-between gap-1.5 ${
                    isCurrent
                      ? "bg-[#a0142f] text-white border-[#a0142f] shadow-sm font-medium"
                      : "bg-white/80 text-[#24191b] border-[#ead8c3]/70 hover:border-[#a0142f]/40 hover:bg-[#fbeddc]/50"
                  }`}
                >
                  <span className="truncate">{anim.name}</span>
                  {isCurrent && <CheckCircle2 size={13} className="shrink-0 text-white" />}
                </button>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="mt-3 pt-2 border-t border-[#ead8c3]/50 flex items-center justify-between text-[10px] text-[#b99378] font-mono">
            <span>Scroll or click any movement to articulate</span>
            <span>Real-time Kinematics</span>
          </div>
        </div>
      )}
    </aside>
  );
}
