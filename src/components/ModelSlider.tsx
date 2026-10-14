"use client";

import React, { useRef, useEffect, useState } from 'react';
import { ModelSpec, MODELS } from '@/lib/models';
import { 
  RotateCcw, 
  RotateCw, 
  Layers, 
  Info, 
  Check, 
  Loader2,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

interface ModelSliderProps {
  models?: ModelSpec[];
  activeModelId: string;
  isLoading?: boolean;
  onSelectModel: (model: ModelSpec) => void;
}

export default function ModelSlider({
  models = MODELS,
  activeModelId,
  isLoading = false,
  onSelectModel,
}: ModelSliderProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const activeIndex = models.findIndex((m) => m.id === activeModelId);
  const currentIndex = activeIndex >= 0 ? activeIndex : 0;
  const currentModel = models[currentIndex] || models[0];

  // Scroll active model into view smoothly
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.children[currentIndex] as HTMLElement | undefined;
    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [currentIndex]);

  // Keyboard navigation (Arrow Up / Arrow Down)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIdx = (currentIndex + 1) % models.length;
        onSelectModel(models[nextIdx]);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIdx = (currentIndex - 1 + models.length) % models.length;
        onSelectModel(models[prevIdx]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, models, onSelectModel]);

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + models.length) % models.length;
    onSelectModel(models[prevIdx]);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % models.length;
    onSelectModel(models[nextIdx]);
  };

  const handleResetCamera = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('flexlab-reset-camera'));
    }
  };

  const handleRotate90 = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('flexlab-rotate-camera', {
          detail: { angle: Math.PI / 2 },
        })
      );
    }
  };

  return (
    <>
      {/* Right-Side Compact Model Selector Panel */}
      <aside
        aria-label="3D Model Selection"
        className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 pointer-events-none transition-all duration-300 ease-out"
      >
        {isMinimized ? (
          /* Minimized Floating Tab on Right Edge */
          <button
            type="button"
            onClick={() => setIsMinimized(false)}
            title="Open Model Selector"
            className="pointer-events-auto flex items-center gap-2 bg-[#fffaf2]/95 hover:bg-white text-[var(--ink)] border border-[#ead8c3] rounded-l-2xl px-3 py-2.5 shadow-lg backdrop-blur-xl transition-all duration-200 hover:border-[var(--crimson)]/50 active:scale-95 group"
          >
            <ChevronLeft className="w-4 h-4 text-[var(--crimson)] transition-transform group-hover:-translate-x-0.5" />
            <div className="flex flex-col items-start text-left">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[var(--crimson-dark)]">
                Models
              </span>
              <span className="text-[11px] font-serif font-bold text-[var(--ink)] truncate max-w-[90px]">
                {currentModel.badge}
              </span>
            </div>
          </button>
        ) : (
          /* Sleek Compact Card Panel */
          <div className="pointer-events-auto w-[230px] sm:w-[260px] bg-[#fffaf2]/92 backdrop-blur-xl border border-[#ead8c3]/90 rounded-2xl shadow-[0_10px_35px_-8px_rgba(36,25,27,0.15)] p-3 transition-all duration-300">
            {/* Header: Title, Specimen Count & Controls */}
            <div className="flex items-center justify-between border-b border-[#ead8c3]/60 pb-2.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[var(--crimson)]" />
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-[var(--crimson-dark)]">
                  Models ({models.length})
                </span>
                {isLoading && (
                  <Loader2 className="w-3 h-3 text-[var(--crimson)] animate-spin ml-1" />
                )}
              </div>

              {/* View Control Buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleRotate90}
                  title="Turn 90°"
                  className="p-1 rounded-lg bg-white/80 hover:bg-[var(--paper)] text-[var(--ink)] border border-[#ead8c3] hover:border-[var(--crimson)]/40 transition-all active:scale-95"
                >
                  <RotateCw className="w-3 h-3 text-[var(--crimson)]" />
                </button>
                <button
                  type="button"
                  onClick={handleResetCamera}
                  title="Reset Front View"
                  className="p-1 rounded-lg bg-white/80 hover:bg-[var(--paper)] text-[var(--ink)] border border-[#ead8c3] hover:border-[var(--crimson)]/40 transition-all active:scale-95"
                >
                  <RotateCcw className="w-3 h-3 text-[var(--crimson)]" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsMinimized(true)}
                  title="Minimize Panel"
                  className="p-1 rounded-lg bg-white/80 hover:bg-[var(--paper)] text-[var(--ink)] border border-[#ead8c3] hover:border-[var(--crimson)]/40 transition-all active:scale-95"
                >
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Vertical Compact Model Stack */}
            <div
              ref={listRef}
              className="space-y-1.5 max-h-[50vh] overflow-y-auto no-scrollbar pr-0.5"
            >
              {models.map((model, idx) => {
                const isSelected = model.id === activeModelId;

                return (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => onSelectModel(model)}
                    className={`w-full rounded-xl p-2.5 text-left transition-all duration-200 select-none outline-none relative flex flex-col gap-0.5 ${
                      isSelected
                        ? 'bg-white border-2 border-[var(--crimson)] shadow-sm ring-2 ring-[var(--crimson)]/10'
                        : 'bg-white/50 hover:bg-white border border-[#ead8c3]/80 hover:border-[var(--taupe)] shadow-2xs'
                    }`}
                  >
                    {/* Top Row: Badge & Status */}
                    <div className="flex items-center justify-between gap-1 w-full">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[9px] font-mono uppercase font-bold tracking-wider ${
                          isSelected
                            ? 'bg-[var(--crimson)] text-white'
                            : 'bg-[var(--paper)] text-[var(--crimson-dark)]'
                        }`}
                      >
                        {model.badge}
                      </span>

                      {isSelected ? (
                        <span className="flex items-center gap-1 text-[9px] font-mono text-[var(--crimson)] font-semibold">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                          Active
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono text-[var(--taupe)]">
                          {model.fileSize}
                        </span>
                      )}
                    </div>

                    {/* Model Name */}
                    <div className="font-serif text-xs font-bold text-[var(--ink)] truncate w-full mt-0.5">
                      {model.name}
                    </div>

                    {/* Subtitle / Focus */}
                    <div className="text-[10px] text-[var(--taupe)] truncate w-full font-sans">
                      {model.subtitle}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Controls / Pagination */}
            <div className="mt-2.5 pt-2 border-t border-[#ead8c3]/50 flex items-center justify-between text-[10px] font-mono text-[var(--taupe)]">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrev}
                  title="Previous Model"
                  className="p-1 rounded-md bg-white hover:bg-[var(--paper)] border border-[#ead8c3] hover:text-[var(--crimson)] transition-all active:scale-95"
                >
                  <ChevronUp className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  title="Next Model"
                  className="p-1 rounded-md bg-white hover:bg-[var(--paper)] border border-[#ead8c3] hover:text-[var(--crimson)] transition-all active:scale-95"
                >
                  <ChevronDown className="w-3 h-3" />
                </button>
                <span className="ml-1 text-[10px]">
                  {currentIndex + 1} / {models.length}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setShowInfoModal(true)}
                title="Add more models info"
                className="hover:text-[var(--crimson)] transition-colors flex items-center gap-1"
              >
                <Info className="w-3 h-3" />
                <span>+ Add</span>
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Info Modal: Adding More Models */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 pointer-events-auto">
          <div className="bg-[var(--white)] border border-[#ead8c3] rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#ead8c3]/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-[var(--rose)]/30 text-[var(--crimson)] rounded-xl">
                  <Info className="w-4 h-4" />
                </span>
                <h3 className="font-serif text-lg font-bold text-[var(--ink)]">
                  Adding More 3D Models
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowInfoModal(false)}
                className="w-7 h-7 rounded-full bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--crimson)] hover:text-white flex items-center justify-center text-xs font-bold transition-all"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-[var(--ink)] leading-relaxed">
              <p>
                To add more 3D models to this list:
              </p>
              <ol className="list-decimal list-inside space-y-1.5 text-xs text-[var(--ink)] bg-[var(--paper)]/80 p-3.5 rounded-xl border border-[#ead8c3]">
                <li>
                  Place your GLB file in the <strong>public/</strong> directory (e.g., <code className="bg-white px-1.5 py-0.5 rounded text-[var(--crimson)]">public/body3.glb</code>).
                </li>
                <li>
                  Open <code className="bg-white px-1.5 py-0.5 rounded text-[var(--crimson)]">src/lib/models.ts</code> and add an entry:
                  <pre className="mt-1.5 p-2 bg-white rounded border border-[#ead8c3] font-mono text-[11px] overflow-x-auto text-[var(--ink)]">
{`{
  id: 'body-3',
  name: 'Kinetic Model 3',
  subtitle: 'Myofascial Specimen 03',
  badge: 'Model 3',
  path: '/body3.glb',
  fileSize: '45 MB',
  category: 'Posture',
  description: 'New anatomical model.',
  anatomyFocus: 'Spine & Core',
}`}
                  </pre>
                </li>
                <li>It will automatically appear in this right-side selector!</li>
              </ol>
            </div>

            <button
              type="button"
              onClick={() => setShowInfoModal(false)}
              className="w-full py-2.5 rounded-xl bg-[var(--crimson)] hover:bg-[var(--crimson-dark)] text-white font-medium text-xs font-mono uppercase tracking-wider transition-all"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
