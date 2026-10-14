"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Sparkles, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Scene from "./Scene";

interface CanvasDataProps {
  modelUrl?: string;
  onModelLoaded?: () => void;
}

const CanvasData = ({ modelUrl = "/body.glb", onModelLoaded }: CanvasDataProps) => {
  return (
    <div className="w-full h-full relative">
      {/* Responsive 3D Canvas */}
      <Canvas
        dpr={[1, 2]}
        shadows={{ type: THREE.PCFShadowMap }}
        camera={{ near: 0.1, far: 2000, fov: 25, position: [0, 0, 5] }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
          outputColorSpace: THREE.SRGBColorSpace,
          alpha: true,
        }}
        className="w-full h-full"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      >
        {/* Soft Warm Neutral Background Fog */}
        <fog attach="fog" args={['#fff5e8', 120, 400]} />

        {/* Studio Lighting System - Sculptural Top-Lighting for High Definition */}
        <ambientLight intensity={0.95} color={"#fffbf5"} />

        {/* Primary Overhead Key Light: Casts crisp anatomical raking light from top-front */}
        <directionalLight
          position={[10, 160, 45]}
          intensity={4.2}
          color={"#ffffff"}
          castShadow
          shadow-bias={-0.0001}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={10}
          shadow-camera-far={250}
          shadow-camera-left={-2}
          shadow-camera-right={2}
          shadow-camera-top={2}
          shadow-camera-bottom={-2}
        />

        {/* Zenith Top Light: Delineates crown, trapezius, acromion, and clavicles */}
        <directionalLight
          position={[0, 180, 5]}
          intensity={2.4}
          color={"#ffffff"}
        />

        {/* Lateral Contour Fill (Left): Soft contrast fill */}
        <directionalLight
          position={[-50, 40, 60]}
          intensity={1.3}
          color={"#deb1ad"}
        />

        {/* Lateral Contour Fill (Right): Gentle symmetry fill */}
        <directionalLight
          position={[50, 40, 60]}
          intensity={1.1}
          color={"#ead8c3"}
        />

        {/* Rim / Silhouette Back Light: Sharp outline separation from the warm background */}
        <directionalLight
          position={[0, 70, -90]}
          intensity={3.0}
          color={"#b99378"}
        />

        {/* Subtle Low Bounce Light: Softens deep undercuts under chin, ribs, and pelvis */}
        <pointLight
          position={[0, -40, 40]}
          intensity={0.8}
          color={"#fbeddc"}
          distance={250}
        />

        {/* Subtle Ambient Particles */}
        <Sparkles
          count={75}
          scale={[150, 60, 150]}
          size={3.5}
          speed={0.25}
          color={"#b99378"}
        />

        {/* Studio Reflections */}
        <Environment preset="city" environmentIntensity={0.65} />

        {/* Smooth OrbitControls for intuitive model inspection */}
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={1.2}
          maxDistance={8}
          target={[0, 0, 0]}
        />

        {/* 3D Kinetic Anatomy Models Scene with Suspense boundary */}
        <Suspense fallback={null}>
          <Scene modelUrl={modelUrl} onLoaded={onModelLoaded} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CanvasData;