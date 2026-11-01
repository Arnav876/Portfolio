import { Project } from '../types';

export const PROJECTS_DATA: Project[] = [
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
    telemetrySector: 'SECTOR-1'
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
    featured: true,
    telemetrySector: 'SECTOR-2'
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
    featured: true,
    telemetrySector: 'SECTOR-3'
  }
];
