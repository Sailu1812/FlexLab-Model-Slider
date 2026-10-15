"use client";

import React, { useState, useCallback } from 'react';
import SitePreloader from '@/components/SitePreloader';
import CanvasData from '@/components/canvas/canvas';
import ModelSlider from '@/components/ModelSlider';
import { MODELS, ModelSpec } from '@/lib/models';
import { Compass } from 'lucide-react';

export default function Home() {
  const [experienceReady, setExperienceReady] = useState(false);
  const [isInitialModelReady, setIsInitialModelReady] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelSpec>(MODELS[0]);
  const [isSwitchingModel, setIsSwitchingModel] = useState(false);

  // Strict on-demand selection: only loads the clicked model
  const handleSelectModel = useCallback((model: ModelSpec) => {
    if (model.id === selectedModel.id) return;
    setIsSwitchingModel(true);
    setSelectedModel(model);
  }, [selectedModel.id]);

  const handleModelLoaded = useCallback(() => {
    setIsSwitchingModel(false);
    setIsInitialModelReady(true);
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[var(--cream)] select-none">
      {/* 3D Model & Assets Preloader - Only reveals once initial 3D model is rendered */}
      <SitePreloader 
        isModelReady={isInitialModelReady}
        onReadyChange={setExperienceReady} 
      />

      {/* Top Floating Brand & Clinical Telemetry Bar */}
      <header
        className={`fixed top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 z-30 pointer-events-none flex items-center justify-between transition-opacity duration-700 ${
          experienceReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Brand Badge */}
        <div className="pointer-events-auto flex items-center gap-3 bg-[#fffaf2]/85 backdrop-blur-xl border border-[#ead8c3] px-3.5 sm:px-4 py-2 rounded-2xl shadow-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--crimson)] animate-pulse" />
          <div className="flex flex-col">
            <span className="font-serif font-bold text-sm sm:text-base text-[var(--ink)] tracking-tight">
              FlexLab
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[var(--crimson-dark)] font-semibold">
              Kinetic Anatomy Explorer
            </span>
          </div>
        </div>

        {/* Orbit & Inspection Hint Badge */}
        <div className="pointer-events-auto hidden md:flex items-center gap-2 bg-[#fffaf2]/85 backdrop-blur-xl border border-[#ead8c3] px-3.5 py-1.5 rounded-full shadow-xs text-[11px] font-mono text-[var(--ink)]">
          <Compass className="w-3.5 h-3.5 text-[var(--crimson)]" />
          <span>Click & Drag to Rotate</span>
          <span className="text-[var(--taupe)]">•</span>
          <span>Scroll to Zoom</span>
        </div>
      </header>

      {/* Fullscreen 3D Model Scene - preloads & renders in background during preloading */}
      <div
        className={`w-full h-full transition-opacity duration-700 ${
          experienceReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <CanvasData
          modelUrl={selectedModel.path}
          onModelLoaded={handleModelLoaded}
        />
      </div>

      {/* Right-Side Interactive Model Selection Slider */}
      {experienceReady && (
        <ModelSlider
          models={MODELS}
          activeModelId={selectedModel.id}
          isLoading={isSwitchingModel}
          onSelectModel={handleSelectModel}
        />
      )}
    </main>
  );
}
