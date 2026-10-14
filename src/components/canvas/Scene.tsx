import * as THREE from 'three';
import { useGLTF, useAnimations } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { useThree, useFrame } from '@react-three/fiber';
import { useState, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { MODELS } from '@/lib/models';

// Preload registered models for instant switching
if (typeof window !== 'undefined') {
  MODELS.forEach((m) => {
    try {
      useGLTF.preload(m.path);
    } catch {
      // Ignored
    }
  });
}

interface SceneProps {
  modelUrl?: string;
  onLoaded?: () => void;
}

export default function Scene({ modelUrl = "/body.glb", onLoaded }: SceneProps) {
  const { scene, animations } = useGLTF(modelUrl);
  const { actions } = useAnimations(animations, scene);
  const { camera } = useThree();

  const modelRef = useRef<THREE.Group>(null);
  const skeletonGroupRef = useRef<THREE.Group>(null);
  const actionsRef = useRef(actions);
  actionsRef.current = actions;

  // Meshes & Materials
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const skeletonMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const [skeletonObj, setSkeletonObj] = useState<THREE.Object3D | null>(null);
  const currentBlendRef = useRef(0);
  const currentActionNameRef = useRef<string>('');
  const playbackSpeedRef = useRef<number>(1.0);
  const isPausedRef = useRef<boolean>(false);

  // Transition smoothly between any available animations
  const transitionToAnimation = (name: string, duration = 0.5) => {
    if (!actionsRef.current || Object.keys(actionsRef.current).length === 0) return;

    // Case-insensitive lookup
    const targetKey = Object.keys(actionsRef.current).find(
      (k) => k.toLowerCase() === name.toLowerCase()
    );

    if (!targetKey) {
      return;
    }

    const nextAct = actionsRef.current[targetKey];
    if (!nextAct) return;

    if (currentActionNameRef.current === targetKey && nextAct.isRunning()) {
      return;
    }

    const prevKey = currentActionNameRef.current;
    currentActionNameRef.current = targetKey;

    nextAct.reset();
    nextAct.enabled = true;
    nextAct.setEffectiveTimeScale(playbackSpeedRef.current);
    nextAct.setEffectiveWeight(1);
    nextAct.fadeIn(duration).play();

    if (prevKey && prevKey !== targetKey && actionsRef.current[prevKey]) {
      actionsRef.current[prevKey]?.fadeOut(duration);
    } else {
      Object.keys(actionsRef.current).forEach((k) => {
        if (k !== targetKey && actionsRef.current[k]) {
          actionsRef.current[k]?.fadeOut(duration);
        }
      });
    }

    // Broadcast to UI HUD
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('flexlab-animation-changed', {
          detail: { name: targetKey },
        })
      );
    }
  };

  // Anatomical layer peeling:
  // p = 0: 100% muscular body, skeleton hidden
  // p = 1: 100% osteological skeleton, muscular body hidden
  const applySkeletonBlend = (val: number) => {
    const p = Math.max(0, Math.min(1, val));
    currentBlendRef.current = p;

    let muscleOpacity = 0;
    let skeletonOpacity = 0;

    if (p <= 0.15) {
      muscleOpacity = 1;
      skeletonOpacity = 0;
    } else if (p <= 0.50) {
      muscleOpacity = 1 - ((p - 0.15) / 0.35);
      skeletonOpacity = p > 0.30 ? ((p - 0.30) / 0.20) * 0.4 : 0;
    } else if (p <= 0.85) {
      muscleOpacity = 0;
      skeletonOpacity = 0.4 + ((p - 0.50) / 0.35) * 0.6;
    } else {
      muscleOpacity = 0;
      skeletonOpacity = 1;
    }

    // Apply to all meshes of muscular body
    meshesRef.current.forEach((mesh) => {
      const isVisible = muscleOpacity > 0.005;
      mesh.visible = isVisible;
      const mat: any = mesh.material;
      if (Array.isArray(mat)) {
        mat.forEach((m: any) => {
          m.transparent = true;
          m.opacity = muscleOpacity;
          m.depthWrite = muscleOpacity > 0.8;
        });
      } else if (mat) {
        mat.transparent = true;
        mat.opacity = muscleOpacity;
        mat.depthWrite = muscleOpacity > 0.8;
      }
    });

    // Apply to skeleton model
    if (skeletonMatRef.current) {
      const isSkeletonVisible = skeletonOpacity > 0.005;
      skeletonMatRef.current.transparent = true;
      skeletonMatRef.current.opacity = skeletonOpacity;
      skeletonMatRef.current.depthWrite = skeletonOpacity > 0.55;

      if (skeletonOpacity > 0.05 && skeletonOpacity < 0.95) {
        skeletonMatRef.current.emissive.set("#4a3622");
        skeletonMatRef.current.emissiveIntensity = 0.38;
      } else {
        skeletonMatRef.current.emissive.set("#2d2218");
        skeletonMatRef.current.emissiveIntensity = 0.22;
      }
    }

    if (skeletonGroupRef.current) {
      skeletonGroupRef.current.visible = skeletonOpacity > 0.005;
    }
    if (skeletonObj) {
      skeletonObj.visible = skeletonOpacity > 0.005;
    }
  };

  // Helper to compute intrinsic geometry bounds without any parent scale interference
  const getIntrinsicBounds = (obj: THREE.Object3D) => {
    const parent = obj.parent;
    if (parent) obj.removeFromParent();
    const origScale = obj.scale.clone();
    const origPos = obj.position.clone();
    const origRot = obj.rotation.clone();
    obj.scale.set(1, 1, 1);
    obj.position.set(0, 0, 0);
    obj.rotation.set(0, 0, 0);
    obj.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(obj);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    obj.scale.copy(origScale);
    obj.position.copy(origPos);
    obj.rotation.copy(origRot);
    if (parent) parent.add(obj);

    const targetHeight = 2.0;
    const s = size.y > 0 ? targetHeight / size.y : 1;
    return {
      scale: [s, s, s] as [number, number, number],
      position: [
        -center.x * s,
        -center.y * s,
        -center.z * s,
      ] as [number, number, number],
      size,
      center,
    };
  };

  const modelMetrics = useMemo(() => {
    return getIntrinsicBounds(scene);
  }, [scene]);

  const skeletonMetrics = useMemo(() => {
    if (!skeletonObj) {
      return {
        scale: [0.02987, 0.02987, 0.02987] as [number, number, number],
        position: [0.0027, 0.2842, 0.0026] as [number, number, number],
      };
    }
    return getIntrinsicBounds(skeletonObj);
  }, [skeletonObj]);

  // Setup meshes & materials whenever model scene changes
  useEffect(() => {
    const meshes: THREE.Mesh[] = [];
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.frustumCulled = false;

        const mat = child.material;
        if (Array.isArray(mat)) {
          mat.forEach((m) => {
            m.transparent = true;
            m.opacity = 1;
            m.roughness = 0.35;
          });
        } else if (mat) {
          mat.transparent = true;
          mat.opacity = 1;
          mat.roughness = 0.35;
        }
        meshes.push(child);
      }
    });
    meshesRef.current = meshes;
    applySkeletonBlend(currentBlendRef.current);

    if (onLoaded) {
      onLoaded();
    }
  }, [scene, onLoaded]);

  // Load authentic osteological human skeleton.obj once on mount
  useEffect(() => {
    const loader = new OBJLoader();
    loader.load(
      '/skeleton.obj',
      (obj) => {
        const boneMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#f6f0e6"),
          roughness: 0.55,
          metalness: 0.08,
          emissive: new THREE.Color("#2d2218"),
          emissiveIntensity: 0.22,
          transparent: true,
          opacity: 0,
          depthWrite: false,
          side: THREE.DoubleSide,
        });

        skeletonMatRef.current = boneMat;

        obj.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.geometry.computeVertexNormals();
            mesh.material = boneMat;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.frustumCulled = false;
          }
        });

        obj.visible = false;
        setSkeletonObj(obj);
        applySkeletonBlend(currentBlendRef.current);
      },
      undefined,
      (err) => {
        console.error("Error loading skeleton.obj:", err);
      }
    );
  }, []);

  // Keep skeleton blend synced each frame
  useFrame(() => {
    applySkeletonBlend(currentBlendRef.current);
  });

  // Start with Idle animation if available
  useEffect(() => {
    transitionToAnimation('Idle', 0.5);
  }, [scene]);

  // Listen to interactive UI events from ClinicalAnimationHUD or elsewhere
  useEffect(() => {
    const handleSetAnimation = (e: any) => {
      if (e.detail?.name) {
        applySkeletonBlend(0);
        transitionToAnimation(e.detail.name, e.detail.duration ?? 0.5);
      }
    };

    const handleSetSpeed = (e: any) => {
      if (typeof e.detail?.speed === 'number') {
        const sp = e.detail.speed;
        playbackSpeedRef.current = sp;
        Object.values(actionsRef.current).forEach((act) => {
          if (act) act.setEffectiveTimeScale(sp);
        });
      }
    };

    const handlePauseAnimation = (e: any) => {
      if (typeof e.detail?.paused === 'boolean') {
        const paused = e.detail.paused;
        isPausedRef.current = paused;
        Object.values(actionsRef.current).forEach((act) => {
          if (act) act.paused = paused;
        });
      }
    };

    const handleModelPose = (e: any) => {
      if (typeof e.detail?.rotY === 'number' && modelRef.current) {
        gsap.to(modelRef.current.rotation, {
          y: e.detail.rotY,
          duration: 1.2,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        if (skeletonGroupRef.current) {
          gsap.to(skeletonGroupRef.current.rotation, {
            y: e.detail.rotY,
            duration: 1.2,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }
      }
      if (e.detail?.animName) {
        transitionToAnimation(e.detail.animName, 0.6);
      }
    };

    const handleResetCamera = () => {
      if (modelRef.current) {
        gsap.to(modelRef.current.rotation, {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
      if (skeletonGroupRef.current) {
        gsap.to(skeletonGroupRef.current.rotation, {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
    };

    const handleRotateCamera = (e: any) => {
      const step = e.detail?.angle ?? Math.PI / 2;
      if (modelRef.current) {
        gsap.to(modelRef.current.rotation, {
          y: modelRef.current.rotation.y + step,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
      if (skeletonGroupRef.current) {
        gsap.to(skeletonGroupRef.current.rotation, {
          y: skeletonGroupRef.current.rotation.y + step,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    };

    window.addEventListener('flexlab-set-animation', handleSetAnimation);
    window.addEventListener('flexlab-set-speed', handleSetSpeed);
    window.addEventListener('flexlab-pause-animation', handlePauseAnimation);
    window.addEventListener('flexlab-model-pose', handleModelPose);
    window.addEventListener('flexlab-reset-camera', handleResetCamera);
    window.addEventListener('flexlab-rotate-camera', handleRotateCamera);

    return () => {
      window.removeEventListener('flexlab-set-animation', handleSetAnimation);
      window.removeEventListener('flexlab-set-speed', handleSetSpeed);
      window.removeEventListener('flexlab-pause-animation', handlePauseAnimation);
      window.removeEventListener('flexlab-model-pose', handleModelPose);
      window.removeEventListener('flexlab-reset-camera', handleResetCamera);
      window.removeEventListener('flexlab-rotate-camera', handleRotateCamera);
    };
  }, []);

  // Baseline centered positioning and scaling
  useEffect(() => {
    if (!modelRef.current) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const baseScale = isMobile ? 0.82 : 0.90;

    modelRef.current.position.set(0, -0.04, 0);
    modelRef.current.rotation.set(0, 0, 0);
    modelRef.current.scale.set(baseScale, baseScale, baseScale);

    if (skeletonGroupRef.current) {
      skeletonGroupRef.current.position.set(0, -0.04, 0);
      skeletonGroupRef.current.rotation.set(0, 0, 0);
      skeletonGroupRef.current.scale.set(baseScale, baseScale, baseScale);
      skeletonGroupRef.current.visible = false;
    }
  }, []);

  return (
    <>
      {/* Centered Normalized Muscular Model (automatically adapts to any GLB model dimensions) */}
      <group ref={modelRef} position={[0, -0.04, 0]}>
        <group position={modelMetrics.position} scale={modelMetrics.scale}>
          <primitive object={scene} />
        </group>
      </group>

      {/* Real Anatomical Human Skeleton: dynamically normalized & aligned */}
      <group
        ref={skeletonGroupRef}
        position={[0, -0.04, 0]}
        visible={false}
      >
        {skeletonObj && (
          <group position={skeletonMetrics.position} scale={skeletonMetrics.scale}>
            <primitive object={skeletonObj} />
          </group>
        )}
      </group>
    </>
  );
}