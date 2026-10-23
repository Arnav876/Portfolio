export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: 'AI & Optimization' | 'Civic & Systems' | 'Full-Stack Web';
  badge: string;
  description: string;
  longDescription: string[];
  techStack: string[];
  keyInvariants: string[];
  githubUrl: string;
  liveUrl?: string;
  metrics: { label: string; value: string }[];
  featured: boolean;
  telemetrySector: 'SECTOR-1' | 'SECTOR-2' | 'SECTOR-3';
}

export interface SkillCategory {
  sector: string;
  title: string;
  iconName: string;
  skills: {
    name: string;
    level: string;
    levelPercent: number;
    description: string;
  }[];
}

export interface Milestone {
  year: string;
  tag: string;
  title: string;
  role: string;
  details: string;
  highlights: string[];
}
