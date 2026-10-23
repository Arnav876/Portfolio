import { SkillCategory, Milestone } from '../types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    sector: 'SECTOR-01',
    title: 'Languages & Core Systems',
    iconName: 'Cpu',
    skills: [
      { name: 'TypeScript', level: 'Advanced', levelPercent: 92, description: 'Type-safe architecture, generics, strict compiler configs, AST' },
      { name: 'Python', level: 'Proficient', levelPercent: 88, description: 'PyTorch ML pipelines, NumPy, Pandas, algorithmic workflows' },
      { name: 'JavaScript (ESNext)', level: 'Advanced', levelPercent: 95, description: 'Modern async/await, DOM APIs, Web Audio, Speech APIs' },
      { name: 'C / C++', level: 'Intermediate', levelPercent: 74, description: 'Data structures, memory layouts, algorithmic problem solving' },
      { name: 'SQL', level: 'Proficient', levelPercent: 82, description: 'Relational schemas, queries, SQLite native, indexing' }
    ]
  },
  {
    sector: 'SECTOR-02',
    title: 'Frontend & Reactive UI',
    iconName: 'Layout',
    skills: [
      { name: 'React 19', level: 'Advanced', levelPercent: 94, description: 'Hooks, concurrent features, component state machines' },
      { name: 'Vite Ecosystem', level: 'Advanced', levelPercent: 90, description: 'HMR, bundler plugins, asset pipelines, fast builds' },
      { name: 'Modern CSS & Animation', level: 'Advanced', levelPercent: 92, description: 'Design tokens, CSS grid, keyframes, fluid typography, dark mode' },
      { name: 'GIS & Leaflet', level: 'Proficient', levelPercent: 80, description: 'Spatial polygons, map layers, GeoJSON conflict buffers' },
      { name: 'Web APIs', level: 'Proficient', levelPercent: 85, description: 'Web Audio API, SpeechRecognition, IntersectionObserver' }
    ]
  },
  {
    sector: 'SECTOR-03',
    title: 'Backend & Data Architecture',
    iconName: 'Server',
    skills: [
      { name: 'Node.js & Express', level: 'Advanced', levelPercent: 88, description: 'REST APIs, middleware architectures, stream processing' },
      { name: 'Native node:sqlite', level: 'Proficient', levelPercent: 86, description: 'Zero-daemon embedded relational storage in Node 22+' },
      { name: 'Cryptography & Auth', level: 'Proficient', levelPercent: 80, description: 'PBKDF2 SHA-512, JWT tokens, secure headers' },
      { name: 'Combinatorial Optimization', level: 'Advanced', levelPercent: 90, description: 'Deterministic basket optimizers, integer paise arithmetic' }
    ]
  },
  {
    sector: 'SECTOR-04',
    title: 'AI, ML & Tooling',
    iconName: 'Layers',
    skills: [
      { name: 'PyTorch & Scikit-Learn', level: 'Proficient', levelPercent: 82, description: 'Neural classification models, stratified cross-validation' },
      { name: 'Git & Version Control', level: 'Advanced', levelPercent: 90, description: 'Monorepos, branch strategies, clean commit history' },
      { name: 'Turborepo / Monorepos', level: 'Proficient', levelPercent: 80, description: 'Multi-package dependency orchestration & build pipelines' },
      { name: 'Performance & Profiling', level: 'Proficient', levelPercent: 85, description: 'Lighthouse 95+, 60 FPS scroll, paint optimization' }
    ]
  }
];

export const MILESTONES_DATA: Milestone[] = [
  {
    year: '2025 - Present',
    tag: 'FLAGSHIP INNOVATION',
    title: 'GroqAI Autonomous Quick-Commerce Optimizer',
    role: 'Lead Architect & Engineer',
    details: 'Architected an integer paise deterministic optimizer across 4 major Indian quick-commerce platforms evaluating 15 combinatorial subset combinations with zero LLM calculation drift.',
    highlights: [
      'Engineered integer-paise math preventing floating point currency rounding errors',
      'Implemented NullCartAdapter zero-credential client privacy protocol',
      'Built multi-platform price scrapers & comparison telemetry'
    ]
  },
  {
    year: '2024 - 2025',
    tag: 'NATIONAL HACKATHON',
    title: 'Smart India Hackathon (SIH) - NyayaSetu',
    role: 'Full-Stack & Systems Lead',
    details: 'Developed NyayaSetu, an AI-assisted undertrial justice coordination system ensuring zero procedural delay overstays across custody and court rosters.',
    highlights: [
      'Built native zero-daemon relational system using Node 22 node:sqlite',
      'Integrated offline multilingual voice check-ins with Web Speech API',
      'Engineered detention half-term early intervention alerting'
    ]
  },
  {
    year: '2024',
    tag: 'CIVIC INFRASTRUCTURE',
    title: 'CivicSync GIS Coordination Engine',
    role: 'System Architect',
    details: 'Built an interdepartmental urban GIS system to solve redundant municipal road excavations using spatial buffer clash detection and synchronized permits.',
    highlights: [
      'Real-time GeoJSON spatial intersection clash detection',
      'Unified trench-sharing scheduling engine for municipal boards',
      'Custom interactive mapping telemetry interface'
    ]
  },
  {
    year: '2023 - 2024',
    tag: 'MACHINE LEARNING',
    title: 'Clinical Neural Risk Predictor',
    role: 'ML Developer',
    details: 'Constructed deep neural networks in PyTorch for early disease diagnosis, applying stratified cross-validation and feature correlation matrices.',
    highlights: [
      'PyTorch deep neural network with custom regularized loss functions',
      'Explainable AI metrics with risk confidence distribution output'
    ]
  }
];
