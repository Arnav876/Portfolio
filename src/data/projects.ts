import { Project } from '../types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'groc-ai',
    title: 'GroqAI',
    subtitle: 'Quick-Commerce Price & Basket Optimizer',
    tagline: 'Autonomous, deterministic multi-platform basket optimizer saving up to 28% across Blinkit, Zepto, Swiggy Instamart, and BigBasket.',
    category: 'AI & Optimization',
    badge: 'OPTIMIZATION ENGINE',
    description: 'Autonomous basket optimizer that computes theoretical item-by-item minima, single-store baselines, and multi-platform subset splits (all 15 platform combinations) factoring delivery, platform, and surge fees.',
    longDescription: [
      'Engineered with strict non-negotiable invariants: all financial calculations are processed in integer paise (1 INR = 100 paise) to eliminate floating-point drift entirely.',
      'Deterministic calculation core ensures no LLM hallucination in pricing truth. Missing fees preserve range bounds ({ minPaise, maxPaise }) rather than erroneously assuming zero.',
      'Features NullCartAdapter ensuring zero-credential security: GroqAI never accesses OTPs or simulates checkout; users execute transparent checkouts directly with retailers.'
    ],
    techStack: ['TypeScript', 'React 19', 'Turborepo', 'Vite', 'Node.js', 'Deterministic Math'],
    keyInvariants: [
      'Integer Paise Financial Precision (0 float drift)',
      'Deterministic 15-subset combinatorial pricing',
      'Honest capability contracts (zero-credential security)'
    ],
    githubUrl: 'https://github.com/Arnav876/GrocAI',
    metrics: [
      { label: 'Platform Matrix', value: '4 Major Apps' },
      { label: 'Evaluation Subsets', value: '15 Combos' },
      { label: 'Financial Drift', value: '0.00%' }
    ],
    featured: true,
    telemetrySector: 'SECTOR-1'
  },
  {
    id: 'civicsync-gis',
    title: 'CivicSync GIS',
    subtitle: 'Interdepartmental Urban Coordination Platform',
    tagline: 'Spatial clash-detection and GIS coordination system uniting municipal utilities to end redundant road digs.',
    category: 'Civic & Systems',
    badge: 'CIVIC TECH / GIS',
    description: 'An enterprise-grade GIS platform engineered to synchronize municipal road-cut excavations across telecommunications, water supply, gas networks, and civic authorities.',
    longDescription: [
      'Detects spatial and temporal overlaps in planned municipal infrastructure work using GeoJSON polygon intersections and project timeline buffer analysis.',
      'Eliminates duplicate road excavations by enforcing unified trench-sharing policies and automated permit scheduling across siloed municipal departments.',
      'Interactive spatial map canvas renders live layers with conflict alerts, agency jurisdiction boundaries, and automated moratorium checks.'
    ],
    techStack: ['TypeScript', 'Vite', 'Leaflet / GIS', 'GeoJSON', 'Node.js', 'Express'],
    keyInvariants: [
      'Multi-agency spatial conflict detection',
      'Dynamic temporal trench moratorium enforcement',
      'Zero-dependency lightweight GeoJSON processing'
    ],
    githubUrl: 'https://github.com/Arnav876/CivivSync',
    metrics: [
      { label: 'Conflict Engine', value: 'Spatial Buffer' },
      { label: 'Map Layers', value: 'Multi-Agency' },
      { label: 'Permit Lifecycle', value: 'Automated' }
    ],
    featured: true,
    telemetrySector: 'SECTOR-2'
  },
  {
    id: 'nyayasetu',
    title: 'NyayaSetu (न्यायसेतु)',
    subtitle: 'Undertrial Justice Coordination & Early-Action Platform',
    tagline: 'Smart India Hackathon (SIH) prototype ensuring no undertrial prisoner gets lost between prison, lawyer, and court.',
    category: 'Civic & Systems',
    badge: 'SIH HACKATHON PLATFORM',
    description: 'AI-assisted legal coordination system sitting between judicial and custodial systems to prevent procedural detention overstays and ensure early legal aid access.',
    longDescription: [
      'Engineered for maximum portability and zero-daemon deployment using Node.js native `node:sqlite` and PBKDF2 SHA-512 cryptographic hashing without binary dependencies.',
      'Multilingual voice interaction interface powered by native browser Web Speech API (SpeechRecognition & SpeechSynthesis) for offline-accessible undertrial check-ins.',
      'Simulates ICJS/e-Prisons integration boundaries with realistic detention half-term tracking, missing lawyer alerts, and automated procedural delay rosters.'
    ],
    techStack: ['React 19', 'TypeScript', 'Node.js', 'node:sqlite', 'Web Speech API', 'Lucide'],
    keyInvariants: [
      'Native node:sqlite zero-daemon persistent relational model',
      'Web Speech API offline multilingual voice check-in',
      'Detention half-term early intervention alerting'
    ],
    githubUrl: 'https://github.com/Arnav876/NayaSetu',
    metrics: [
      { label: 'Initiative', value: 'SIH Hackathon' },
      { label: 'Database', value: 'Zero-Daemon' },
      { label: 'Voice Q&A', value: 'Multilingual' }
    ],
    featured: true,
    telemetrySector: 'SECTOR-3'
  },
  {
    id: 'campus-bites',
    title: 'CampusBites (GoCanteen)',
    subtitle: 'Smart College Canteen Ordering System',
    tagline: 'High-concurrency ordering and queue mitigation platform tailored for peak university rush hours.',
    category: 'Full-Stack Web',
    badge: 'HIGH-CONCURRENCY WEB',
    description: 'An end-to-end canteen ordering web application equipped with token queueing, kitchen order displays (KOD), and real-time order state machines.',
    longDescription: [
      'Engineered to solve the 20-minute peak rush queue bottleneck on campus by introducing digital token issuance and live order progression pipelines.',
      'Built with React 19 + TypeScript on Vite frontend and an expressive Node backend with robust state-machine transitions (Pending -> Preparing -> Ready -> Collected).',
      'Features a custom culinary visual design system with instant cart updates and order verification codes.'
    ],
    techStack: ['React 19', 'TypeScript', 'Vite', 'Node.js', 'Express', 'Responsive CSS'],
    keyInvariants: [
      'Synchronous token verification and pickup dispatch',
      'Zero double-booking state machine transitions',
      'Sub-50ms optimistic UI updates'
    ],
    githubUrl: 'https://github.com/Arnav876/Gocanteen',
    metrics: [
      { label: 'Queue Reduction', value: 'Up to 60%' },
      { label: 'Latency', value: '<50ms' },
      { label: 'Workflow', value: 'Full KOD' }
    ],
    featured: false,
    telemetrySector: 'SECTOR-1'
  },
  {
    id: 'diabetes-predictor',
    title: 'Diabetes Risk Neural Classifier',
    subtitle: 'Deep Learning Predictive Biomarker Architecture',
    tagline: 'PyTorch deep learning model for early stage diabetes probability estimation from clinical diagnostic metrics.',
    category: 'AI & Optimization',
    badge: 'MACHINE LEARNING',
    description: 'A clinical diagnostic classifier pipeline leveraging multi-layer neural networks, data normalization, and feature correlation matrices.',
    longDescription: [
      'Trained using PyTorch with custom loss functions and scikit-learn cross-validation pipelines to address clinical dataset class imbalances.',
      'Processes multi-variate health indicators including glucose tolerance, insulin, BMI, age, and pedigree factors with robust outlier mitigation.',
      'Designed with model explainability in mind, outputting risk confidence distributions and high-leverage diagnostic factors.'
    ],
    techStack: ['PyTorch', 'Python', 'Scikit-learn', 'Pandas', 'NumPy'],
    keyInvariants: [
      'Stratified k-fold cross-validation prevents overfitting',
      'Robust outlier truncation for biological variance',
      'Confidence calibration for clinical decision support'
    ],
    githubUrl: 'https://github.com/Arnav876/diabetes_predictor',
    metrics: [
      { label: 'Core Framework', value: 'PyTorch 2.1' },
      { label: 'Evaluation', value: 'Stratified K-Fold' },
      { label: 'Processing', value: 'NumPy / Pandas' }
    ],
    featured: false,
    telemetrySector: 'SECTOR-2'
  },
  {
    id: 'ai-trip-planner',
    title: 'AI Trip Architect & Deck Generator',
    subtitle: 'Contextual Multi-Day Itinerary Synthesizer',
    tagline: 'Automated itinerary synthesizer converting user travel preferences into day-by-day itineraries and presentation decks.',
    category: 'Full-Stack Web',
    badge: 'AUTOMATION & EXPORT',
    description: 'Web application that generates rich multi-day travel itineraries and programmatically creates downloadable presentation decks using PPTXGenJS.',
    longDescription: [
      'Features a dynamic slide synthesis engine that formats complex transit routes, activity recommendations, and budget allocations into client-ready PowerPoint decks.',
      'Utilizes fast XML parsing and dynamic client-side zip creation for zero-server export overhead.',
      'Built with smooth fluid motion interactions and accessible responsive design.'
    ],
    techStack: ['React 19', 'TypeScript', 'Motion', 'PPTXGenJS', 'Fast-XML-Parser', 'Vite'],
    keyInvariants: [
      'Client-side slide deck compilation with zero server roundtrips',
      'Strict schema validation for travel routes and transit legs',
      'Deterministic visual hierarchy across exportable slides'
    ],
    githubUrl: 'https://github.com/Arnav876',
    metrics: [
      { label: 'Export Engine', value: 'Client PPTX' },
      { label: 'Synthesis', value: 'Instant' },
      { label: 'Motion', value: '60 FPS' }
    ],
    featured: false,
    telemetrySector: 'SECTOR-3'
  }
];
