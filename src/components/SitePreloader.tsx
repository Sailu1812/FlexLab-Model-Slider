"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useMemo, useState } from "react";

const STAGE_LABELS = {
  experience: "Loading 3D Scene",
  model: "Streaming 3D Anatomical Specimen",
  environment: "Configuring studio lighting",
  textures: "Loading muscle textures",
  reveal: "Compiling 3D meshes & shaders",
} as const;

type LoaderStageKey = keyof typeof STAGE_LABELS;

const simplifyItemLabel = (item: string) => {
  if (!item) {
    return "Optimized 3D Anatomy";
  }

  const normalized = item.split("?")[0].split("/").at(-1) ?? item;

  return normalized
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]+/g, " ")
    .trim();
};

const resolveStageKey = (item: string, progress: number, isModelReady: boolean): LoaderStageKey => {
  if (isModelReady) return "reveal";
  const lowerItem = item.toLowerCase();

  if (lowerItem.includes("body") || lowerItem.endsWith(".glb") || lowerItem.endsWith(".gltf")) {
    return "model";
  }
  if (lowerItem.includes("bg") || lowerItem.includes("env") || lowerItem.includes("light")) {
    return "environment";
  }
  if (lowerItem.includes("texture") || lowerItem.includes("normal") || lowerItem.includes("webp")) {
    return "textures";
  }
  if (progress >= 95) return "reveal";
  if (progress >= 60) return "environment";
  if (progress >= 30) return "textures";

  return "model";
};

interface SitePreloaderProps {
  isModelReady?: boolean;
  onReadyChange: (ready: boolean) => void;
}

export default function SitePreloader({ isModelReady = false, onReadyChange }: SitePreloaderProps) {
  const { active, item, loaded, progress, total } = useProgress();
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // If model is confirmed ready, show 100%, otherwise show Three.js progress
  const displayProgress = isModelReady 
    ? 100 
    : Math.max(8, Math.min(99, Math.round(progress)));

  const activeStageKey = useMemo(
    () => resolveStageKey(item, displayProgress, isModelReady),
    [item, displayProgress, isModelReady]
  );

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyTouchAction = body.style.touchAction;

    if (isVisible) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.touchAction = "none";
    }

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.touchAction = previousBodyTouchAction;
    };
  }, [isVisible]);

  useEffect(() => {
    // Safety fallback: maximum 15s in case of severe network disconnect
    const safetyTimer = window.setTimeout(() => {
      setIsReady(true);
    }, 15000);

    // Guaranteed reveal ONLY once the 3D model is actually loaded & rendered in Three.js!
    if (isModelReady) {
      const readyTimer = window.setTimeout(() => {
        setIsReady(true);
      }, 400);

      return () => {
        window.clearTimeout(readyTimer);
        window.clearTimeout(safetyTimer);
      };
    }

    return () => {
      window.clearTimeout(safetyTimer);
    };
  }, [isModelReady]);

  useEffect(() => {
    onReadyChange(isReady);
  }, [isReady, onReadyChange]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const hideTimer = window.setTimeout(() => {
      setIsVisible(false);
    }, 500);

    return () => {
      window.clearTimeout(hideTimer);
    };
  }, [isReady]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      aria-live="polite"
      aria-label="Loading the FlexLab experience"
      className={`fixed inset-0 z-[120] flex items-center justify-center bg-[#fff5e8] text-[#24191b] transition-opacity duration-500 ${
        isReady ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-sm px-6 text-center">
        <div className="mx-auto mb-5 h-12 w-12 rounded-full border border-[#a0142f]/20 bg-[#fbeddc] flex items-center justify-center shadow-xs">
          <div className="h-7 w-7 rounded-full border-2 border-[#a0142f] border-t-transparent animate-spin" />
        </div>

        <p className="text-[11px] uppercase tracking-[0.34em] text-[#a0142f] font-semibold">
          FlexLab 3D Kinetic Anatomy
        </p>
        <p className="mt-3 text-base text-[#5d1024] font-medium font-serif">
          {STAGE_LABELS[activeStageKey]}
        </p>
        <p className="mt-1.5 text-xs text-[#24191b]/60 font-mono">
          {isModelReady ? "Model loaded into memory" : simplifyItemLabel(item)}
        </p>

        <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-[#ead8c3]">
          <div
            className="h-full rounded-full bg-[#a0142f] transition-[width] duration-300 ease-out"
            style={{ width: `${displayProgress}%` }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-[#24191b]/60 font-mono">
          <span>{displayProgress}%</span>
          <span>{isModelReady ? "READY" : (total > 0 ? `${loaded}/${total}` : "LOADING")}</span>
        </div>
      </div>
    </div>
  );
}