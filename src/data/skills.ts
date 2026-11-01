import { SkillCategory, Milestone } from '../types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    sector: 'SECTOR-01',
    title: 'Languages & Core Systems',
    iconName: 'Cpu',
    skills: [
      { name: 'TypeScript', level: 'Advanced', levelPercent: 94, description: 'Type-safe architecture, generics, strict compiler configs, AST' },
      { name: 'Python', level: 'Proficient', levelPercent: 90, description: 'PyTorch ML pipelines, NumPy, Pandas, algorithmic data flows' },
      { name: 'JavaScript (ESNext)', level: 'Advanced', levelPercent: 95, description: 'Modern async/await, DOM APIs, Web Audio, Web Speech APIs' },
      { name: 'C / C++', level: 'Intermediate', levelPercent: 78, description: 'Memory layout, data structures, low-overhead algorithms' },
      { name: 'SQL', level: 'Proficient', levelPercent: 85, description: 'Relational schemas, queries, zero-daemon SQLite embedded' }
    ]
  },
  {
    sector: 'SECTOR-02',
    title: 'Frontend & Reactive UI',
    iconName: 'Layout',
    skills: [
      { name: 'React 19', level: 'Advanced', levelPercent: 95, description: 'Hooks, concurrent features, component state machines, sub-50ms UI' },
      { name: 'Modern CSS & Animation', level: 'Advanced', levelPercent: 92, description: 'Design tokens, CSS grid, keyframes, fluid typography, dark mode' },
      { name: 'Vite Ecosystem', level: 'Advanced', levelPercent: 90, description: 'HMR, bundler plugins, asset pipelines, fast production builds' },
      { name: 'Web Speech & Audio APIs', level: 'Proficient', levelPercent: 88, description: 'Offline-ready voice check-ins, custom sound synthesis' },
      { name: 'Performance & Profiling', level: 'Proficient', levelPercent: 88, description: 'Lighthouse 95+, 60 FPS scroll, DOM paint optimization' }
    ]
  },
  {
    sector: 'SECTOR-03',
    title: 'Backend, AI & Robotics',
    iconName: 'Server',
    skills: [
      { name: 'Node.js & Express', level: 'Advanced', levelPercent: 90, description: 'REST APIs, middleware pipelines, high-concurrency event loops' },
      { name: 'Native node:sqlite', level: 'Proficient', levelPercent: 88, description: 'Zero-daemon embedded relational storage in Node 22+' },
      { name: 'PyTorch & Scikit-Learn', level: 'Proficient', levelPercent: 85, description: 'Deep neural networks, classification pipelines, stratified k-fold' },
      { name: 'Robotics & Hardware Control', level: 'Proficient', levelPercent: 84, description: 'Sensor fusion, microcontroller logic, autonomous robotics telemetry' },
      { name: 'Git & Version Control', level: 'Advanced', levelPercent: 92, description: 'Clean git hygiene, monorepos, open-source collaboration' }
    ]
  }
];

export const MILESTONES_DATA: Milestone[] = [
  {
    year: 'Oct 2026 - Dec 2026',
    tag: 'INDUSTRY EXPERIENCE',
    title: 'Software Engineering Intern & Freelancer — Admission By Choice',
    role: 'Full-Stack Developer & Systems Intern',
    details: 'Engineered scalable web solutions, automated counseling pipelines, and high-performance client applications for educational advisory platform Admission By Choice (October 2026 – December 2026).',
    highlights: [
      'Developed and optimized core full-stack features using modern React, TypeScript, and Node.js',
      'Automated candidate data management workflows and lead progression pipelines',
      'Delivered custom freelance portal enhancements with responsive mobile-first architecture'
    ]
  },
  {
    year: '2024',
    tag: 'FIRST PLACE WINNER',
    title: 'Winner — Summer of Projects (Robotics & Hardware Systems)',
    role: 'Lead Robotics Engineer & Systems Architect',
    details: 'Secured 1st place in the prestigious Summer of Projects competition by designing, engineering, and programming autonomous robotics systems and hardware sensor telemetry.',
    highlights: [
      'Engineered autonomous robotics hardware with sensor telemetry and real-time response loops',
      'Designed microcontroller embedded logic and motor control algorithms for obstacle maneuvering',
      'Won 1st place overall in project demonstration and engineering technical evaluation'
    ]
  },
  {
    year: '2024',
    tag: 'NATIONAL HACKATHON',
    title: 'Smart India Hackathon (SIH) — NyayaSetu Platform',
    role: 'Full-Stack & Systems Lead',
    details: 'Developed NyayaSetu (न्यायसेतु), an AI-assisted undertrial legal aid coordination platform preventing procedural detention delays across custody and court rosters.',
    highlights: [
      'Built native zero-daemon relational system using Node 22 node:sqlite and PBKDF2 hashing',
      'Integrated offline multilingual voice check-ins with browser native Web Speech API',
      'Engineered detention half-term early intervention alerting engine'
    ]
  },
  {
    year: '2024 - Present',
    tag: 'COMMUNITY & OPEN SOURCE',
    title: 'Active Open Source Contributor',
    role: 'Open Source Software Engineer',
    details: 'Dedicated contributor across open-source developer tooling, accessible web utilities, machine learning pipelines, and public repositories on GitHub.',
    highlights: [
      'Built and open-sourced end-to-end reproducible projects including NyayaSetu and CampusBites',
      'Contributed bug fixes, performance optimizations, and documentation across ecosystem tools',
      'Committed to deterministic, zero-dependency, and accessible code standards'
    ]
  }
];
