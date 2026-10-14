'use client';

import React, { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { isPrefersReducedMotion } from '@/lib/animation';

export default function ReducedMotionFallback() {
  const [isReduced, setIsReduced] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setIsReduced(isPrefersReducedMotion());

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsReduced(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  if (!isReduced || dismissed) return null;

  return (
    <div
      role="status"
      className="fixed bottom-4 left-4 z-50 p-3.5 rounded-2xl bg-[#fffaf2] border border-[#ead8c3] shadow-lg text-xs font-mono text-[var(--ink)] flex items-center gap-3 max-w-sm"
    >
      <EyeOff size={16} className="text-[var(--crimson)] shrink-0" />
      <div className="flex-1">
        <span className="font-bold text-[var(--crimson-dark)] block">
          Reduced Motion Enabled
        </span>
        <span className="text-[11px] text-[var(--ink)]/75">
          Complex scroll scrubbing and 3D rotations are simplified for comfort.
        </span>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="text-[10px] text-[var(--taupe)] hover:text-[var(--ink)] underline uppercase cursor-pointer"
      >
        Dismiss
      </button>
    </div>
  );
}
