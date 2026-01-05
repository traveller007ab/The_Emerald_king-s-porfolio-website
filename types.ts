
export type ProjectCategory = 'AI' | 'Web' | 'Automation' | 'Hardware';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  techStack: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  outcomes: string[];
}

export interface Skill {
  name: string;
  level: number; // 1-100
  category: 'Languages' | 'Frameworks' | 'AI/ML' | 'Tools';
  icon?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string[];
  isMilestone?: boolean;
}
