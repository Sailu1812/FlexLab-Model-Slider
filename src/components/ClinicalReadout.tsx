'use client';

import React, { useState, useEffect } from 'react';

export interface ClinicalReadoutData {
  region?: string;
  movement?: string;
  angle?: number;
  effort?: number;
  metricLabel?: string;
  side?: string;
}

interface ClinicalReadoutProps extends ClinicalReadoutData {
  className?: string;
}

export default function ClinicalReadout({
  region: initialRegion = 'LEFT KNEE',
  movement: initialMovement = 'Flexion Angle',
  angle: initialAngle = 83,
  effort: initialEffort = 83,
  metricLabel: initialMetricLabel = 'ACTIVE QUADRICEPS RECRUITMENT',
  side: initialSide = 'Sagittal Plane View',
  className = ''
}: ClinicalReadoutProps) {
  const [telemetry, setTelemetry] = useState<ClinicalReadoutData>({
    region: initialRegion,
    movement: initialMovement,
    angle: initialAngle,
    effort: initialEffort,
    metricLabel: initialMetricLabel,
    side: initialSide,
  });

  useEffect(() => {
    const handleUpdate = (e: CustomEvent<ClinicalReadoutData>) => {
      if (e.detail) {
        setTelemetry((prev) => ({
          ...prev,
          ...e.detail,
        }));
      }
    };

    window.addEventListener('flexlab-readout-update' as any, handleUpdate);
    return () => window.removeEventListener('flexlab-readout-update' as any, handleUpdate);
  }, []);

  return (
    <div
      className={`bg-[#fffaf2]/90 backdrop-blur-xl rounded-3xl p-5 sm:p-6 shadow-[0_12px_36px_rgba(36,25,27,0.08)] border border-[#ead8c3] max-w-xs transition-all duration-300 pointer-events-auto ${className}`}
      role="region"
      aria-label="Clinical Joint Measurement Readout"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#ead8c3]/80">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--crimson)] animate-pulse" />
          <span className="text-[11px] font-mono font-bold tracking-widest text-[var(--crimson-dark)] uppercase">
            {telemetry.region}
          </span>
        </div>
        <span className="text-[9px] font-mono uppercase text-[var(--taupe)] tracking-wider">
          {telemetry.side}
        </span>
      </div>

      {/* Primary Angle Metric */}
      <div className="mb-3">
        <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--ink)]/60 mb-0.5">
          {telemetry.movement}
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[var(--ink)] tabular-nums">
            {Math.round(telemetry.angle ?? 0)}
          </span>
          <span className="text-2xl font-serif text-[var(--crimson)]">°</span>
        </div>
      </div>

      {/* Progress / Effort Bar */}
      <div className="space-y-1.5 pt-2 border-t border-[#ead8c3]/60">
        <div className="flex justify-between items-center text-[10px] font-mono tracking-wider">
          <span className="text-[var(--ink)]/70 uppercase">Effort Index</span>
          <span className="text-[var(--crimson-dark)] font-bold tabular-nums">
            {Math.round(telemetry.effort ?? 0)}%
          </span>
        </div>
        <div className="w-full h-1.5 bg-[#ead8c3]/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--crimson)] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, telemetry.effort ?? 0))}%` }}
          />
        </div>
      </div>

      {/* Footer label */}
      <div className="mt-3 pt-2 text-[9px] font-mono tracking-widest uppercase text-[var(--taupe)] flex items-center justify-between">
        <span className="truncate max-w-[170px]">{telemetry.metricLabel}</span>
        <span className="text-[var(--crimson)] font-semibold shrink-0">CALIBRATED</span>
      </div>
    </div>
  );
}

