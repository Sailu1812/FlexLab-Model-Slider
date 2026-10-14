export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  indications: string[];
  focusJoints: string[];
  cameraAngle: '3/4 Front' | '3/4 Back' | 'Back' | 'Close 3/4' | 'Front' | 'Front / Wide';
  highlightRegion: 'knee-hip-shoulder' | 'calf-hamstring-ankle' | 'spine' | 'joint-tissue' | 'quad-glute' | 'core-balance' | 'neck-upperback';
  viewImage: '/anatomy/front.webp' | '/anatomy/three-quarter.webp' | '/anatomy/back.webp' | '/anatomy/running.webp';
  clinicalNote: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'orthopedic-rehab',
    number: '01',
    title: 'Orthopedic Rehab',
    tagline: 'Post-surgical joint restoration & ligament reconstruction',
    description:
      'Targeted rehabilitation following joint replacements, ACL reconstructions, and rotator cuff repairs. We restore arthrokinematics, rebuild muscular torque, and protect surgical repairs with progressive biomechanical loading.',
    indications: [
      'Post-operative joint replacement (hip, knee, shoulder)',
      'ACL, PCL & meniscus ligament repairs',
      'Rotator cuff & labral reconstructions',
      'Complex bone fractures and hardware stabilization'
    ],
    focusJoints: ['Knee Complex', 'Hip Capsule', 'Glenohumeral Joint'],
    cameraAngle: '3/4 Front',
    highlightRegion: 'knee-hip-shoulder',
    viewImage: '/anatomy/three-quarter.webp',
    clinicalNote: 'Phase-specific progressive loading aligned with tissue healing kinetics.'
  },
  {
    id: 'sports-injury-rehab',
    number: '02',
    title: 'Sports Injury Rehab',
    tagline: 'Kinetic chain reconditioning for athletic return-to-play',
    description:
      'Comprehensive management of acute strains, sprains, and chronic tendinopathies. We analyze the kinetic chain from foot strike to hip drive to resolve compensations and safeguard against re-injury.',
    indications: [
      'Hamstring, groin, and calf myotendinous strains',
      'Achilles & patellar tendinopathy',
      'Inversion ankle sprains and subtalar instability',
      'Athletic groin pain and sports hernia management'
    ],
    focusJoints: ['Gastrocnemius / Soleus', 'Hamstring Complex', 'Talocrural Joint'],
    cameraAngle: '3/4 Back',
    highlightRegion: 'calf-hamstring-ankle',
    viewImage: '/anatomy/back.webp',
    clinicalNote: 'Eccentric load profiling and dynamic deceleration mechanics.'
  },
  {
    id: 'spine-care',
    number: '03',
    title: 'Spine Care',
    tagline: 'Decompression, postural realignment & core stabilization',
    description:
      'Evidence-based rehabilitation for lumbar disc pathologies, cervical radiculopathy, and persistent spinal pain. We decompress neural pathways and retrain deep segmental spinal stabilizers.',
    indications: [
      'Lumbar disc herniations & sciatica (radicular pain)',
      'Cervical postural dysfunction & tension headaches',
      'Spinal stenosis & degenerative disc disease',
      'Spondylolisthesis and facet joint arthropathy'
    ],
    focusJoints: ['Lumbar Vertebrae (L1–S1)', 'Thoracic Spine', 'Cervical Segment'],
    cameraAngle: 'Back',
    highlightRegion: 'spine',
    viewImage: '/anatomy/back.webp',
    clinicalNote: 'Directional preference testing & deep multifidus neuromotor recruitment.'
  },
  {
    id: 'manual-therapy',
    number: '04',
    title: 'Manual Therapy',
    tagline: 'Hands-on joint mobilization & soft tissue neuro-modulation',
    description:
      'High-grade passive joint mobilizations, precise myofascial decompression, and neurodynamic tension releases designed to modulate pain pathways and restore physiological range immediately prior to movement training.',
    indications: [
      'Adhesive capsulitis (frozen shoulder)',
      'Restricted physiological joint translation',
      'Hypertonic myofascial trigger points',
      'Adverse neural tension and entrapment syndromes'
    ],
    focusJoints: ['Synovial Capsule', 'Peritendinous Fascia', 'Articular Surfaces'],
    cameraAngle: 'Close 3/4',
    highlightRegion: 'joint-tissue',
    viewImage: '/anatomy/three-quarter.webp',
    clinicalNote: 'Maitland and Kaltenborn joint mobilization grading I–IV.'
  },
  {
    id: 'exercise-therapy',
    number: '05',
    title: 'Exercise Therapy',
    tagline: 'Neuromuscular activation & functional capacity development',
    description:
      'Prescriptive therapeutic exercise targeting specific motor unit recruitment, muscle hypertrophy, and movement economy. Active muscular contraction bridges clinic recovery to daily autonomy.',
    indications: [
      'Muscular atrophy and cross-sectional deficit',
      'Faulty movement patterns during gait and squatting',
      'Generalized deconditioning post-illness or trauma',
      'Metabolic and neuromuscular endurance deficits'
    ],
    focusJoints: ['Quadriceps Femoris', 'Gluteus Maximus / Medius', 'Core Cylinder'],
    cameraAngle: 'Front',
    highlightRegion: 'quad-glute',
    viewImage: '/anatomy/front.webp',
    clinicalNote: 'Biofeedback-assisted concentric, isometric, and eccentric protocols.'
  },
  {
    id: 'balance-fall-prevention',
    number: '06',
    title: 'Balance & Fall Prevention',
    tagline: 'Vestibular, visual & somatosensory postural recalibration',
    description:
      'Dedicated fall-risk mitigation for older adults and vestibular patients. We systematically challenge sensory integration across proprioceptive, visual, and labyrinthine systems to restore steady footing.',
    indications: [
      'Vestibular hypo-functioning and benign paroxysmal positional vertigo',
      'Age-related proprioceptive degradation',
      'Postural sway and gait hesitance',
      'Fear-avoidance behavior surrounding community mobility'
    ],
    focusJoints: ['Ankle Proprioceptors', 'Pelvic Ring', 'Deep Core Cylinder'],
    cameraAngle: 'Front / Wide',
    highlightRegion: 'core-balance',
    viewImage: '/anatomy/front.webp',
    clinicalNote: 'Berg Balance Scale and dynamic sensory organization training.'
  },
  {
    id: 'car-accident-whiplash',
    number: '07',
    title: 'Car Accident & Whiplash',
    tagline: 'Personal Injury Protection (PIP) recovery & cervical restoration',
    description:
      'Specialized care for acceleration-deceleration traumatic cervical injuries and concurrent thoracic trauma. We coordinate documentation for Personal Injury Protection (PIP) while restoring pain-free neck mobility.',
    indications: [
      'Whiplash-associated disorders (WAD I–III)',
      'Cervicogenic headaches and upper thoracic hyper-reactivity',
      'Traumatic rib dysfunction and costochondritis',
      'Secondary muscle guarding and psychological kinesiophobia'
    ],
    focusJoints: ['Cervical Spine (C1–C7)', 'Suboccipital Triangle', 'Upper Trapezius'],
    cameraAngle: '3/4 Back',
    highlightRegion: 'neck-upperback',
    viewImage: '/anatomy/three-quarter.webp',
    clinicalNote: 'Gentle craniocervical flexion test training and PIP claims compliance.'
  }
];
