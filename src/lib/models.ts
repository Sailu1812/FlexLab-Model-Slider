export interface ModelSpec {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  path: string;
  fileSize: string;
  category: string;
  description: string;
  anatomyFocus: string;
}

/**
 * Registry of available 3D anatomical models.
 * Strictly on-demand loading: only the active model is loaded into memory.
 */
export const MODELS: ModelSpec[] = [
  {
    id: 'body-default',
    name: 'Anatomical Baseline',
    subtitle: 'Full Muscular System',
    badge: 'Model 0',
    path: '/body.glb',
    fileSize: '11.8 MB',
    category: 'Neutral Posture',
    description: 'High-definition primary anatomical physique in neutral standing equilibrium.',
    anatomyFocus: 'Full Musculoskeletal Chain',
  },
  {
    id: 'body-1',
    name: 'Kinetic Variant A',
    subtitle: 'Segmented Myofascial Profile',
    badge: 'Model 1',
    path: '/body1.glb',
    fileSize: '11.9 MB',
    category: 'Dynamic Posture',
    description: 'Specialized postural architecture with isolated kinetic contours and tone.',
    anatomyFocus: 'Axial Alignment & Contours',
  },
  {
    id: 'body-2',
    name: 'Dual-Layer Architecture',
    subtitle: 'Auxiliary Landmark Structure',
    badge: 'Model 2',
    path: '/body2.glb',
    fileSize: '15.3 MB',
    category: 'Refined Anatomy',
    description: 'Comprehensive multi-element model with cranial, facial, and core anatomical details.',
    anatomyFocus: 'Cranial & Ocular Landmarks',
  },
  {
    id: 'body-3',
    name: 'Multi-Segment Variant B',
    subtitle: 'Myofascial Articulation',
    badge: 'Model 3',
    path: '/body3.glb',
    fileSize: '15.4 MB',
    category: 'Kinetic Chain',
    description: 'Segmented multi-mesh anatomical structure with detailed facial and limb musculature.',
    anatomyFocus: 'Thoracic & Extremity Mechanics',
  },
  {
    id: 'body-4',
    name: 'Full Kinetic Variant C',
    subtitle: 'Deep Fascial Architecture',
    badge: 'Model 4',
    path: '/body4.glb',
    fileSize: '43.2 MB',
    category: 'Advanced Biomechanics',
    description: 'High-precision dual-structure anatomical specimen calibrated for biomechanical evaluation.',
    anatomyFocus: 'Pelvic & Scapular Equilibrium',
  },
];
