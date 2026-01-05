
import { Project, Skill, Experience } from './types';

export interface Thought {
  id: string;
  title: string;
  snippet: string;
  date: string;
  readTime: string;
  tags: string[];
}

export const THOUGHTS: Thought[] = [
  {
    id: 'thought-1',
    title: 'Architecting for Low Latency in MetaApi Bridges',
    snippet: 'Exploring the bottleneck of WebSocket vs. Polling in high-frequency trading environments and how Redis can act as a shock absorber.',
    date: 'Dec 2025',
    readTime: '4 min',
    tags: ['Architecture', 'Trading']
  },
  {
    id: 'thought-2',
    title: 'The Mechanical Rigor of Multi-Agent Systems',
    snippet: 'Why agentic workflows fail without deterministic safety rails—applying mechanical engineering "fail-safes" to LLM prompt chaining.',
    date: 'Nov 2025',
    readTime: '6 min',
    tags: ['AI', 'Engineering']
  },
  {
    id: 'thought-3',
    title: 'Synthetic Data: The New Oil for RAG Systems',
    snippet: 'How EmeraldDB leverages Generative AI to seed edge-case testing data that traditional scrapers miss.',
    date: 'Oct 2025',
    readTime: '5 min',
    tags: ['Data', 'Gemini']
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'eldoria-ai',
    title: 'Eldoria AI',
    description: 'Advanced AI agent system designed for high-context task automation.',
    longDescription: 'Developed a sophisticated multi-agent architecture that leverages LLMs for autonomous problem-solving and task execution. Implemented robust memory management and tool-use capabilities using LangChain and Gemini.',
    category: 'AI',
    techStack: ['Python', 'Gemini API', 'FastAPI', 'LangChain'],
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/traveller007ab/Eldoria-AI',
    outcomes: ['Reduced manual task time by 70%', 'Increased system accuracy by 25%', 'Implemented stateful agent memory']
  },
  {
    id: 'emerald-db',
    title: 'EmeraldRecords',
    description: 'Full-stack database management system with AI-driven data synthesis.',
    longDescription: 'A custom database layer that integrates AI to generate synthetic data, predict schema optimizations, and provide natural language querying capabilities via a sleek dashboard.',
    category: 'Web',
    techStack: ['Next.js', 'PostgreSQL', 'Supabase', 'TypeScript'],
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/traveller007ab/EmeraldDB-Records',
    outcomes: ['Simplified complex SQL queries', 'Automated data seeding with AI', 'Built-in analytics dashboard']
  },
  {
    id: 'hardware-service',
    title: '3D Printing Pipeline',
    description: 'Autonomous manufacturing pipeline integrated with Jiga for outsourcing.',
    longDescription: 'A hardware-software bridge that automates the quote-to-print process for 3D manufacturing. Features real-time material cost calculation and mechanical stress simulation for parts.',
    category: 'Hardware',
    techStack: ['Python', 'CAD API', 'Stripe', 'React'],
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop',
    outcomes: ['Processed 500+ mechanical parts', '20% lower production costs via optimization', 'Zero-manual-touch ordering system']
  },
  {
    id: 'trading-journal',
    title: 'Trading Journal PWA',
    description: 'Premium PWA for advanced trade tracking and automated performance analysis.',
    longDescription: 'A comprehensive tool for traders to track metrics, analyze psychological biases, and automate backtesting results. Includes real-time risk calculations and performance visualization.',
    category: 'Automation',
    techStack: ['React', 'Tailwind CSS', 'PWA', 'Firebase'],
    imageUrl: 'https://images.unsplash.com/photo-1611974717483-5828fb7743d4?q=80&w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/traveller007ab/Trading-Journal-PWA',
    outcomes: ['Improved user profitability by 12%', 'Processed 1M+ trade logs', 'Integrated real-time market data']
  },
  {
    id: 'signal-flow',
    title: 'Signal Flow Automation',
    description: 'MetaApi-powered backend for automated algorithmic trading execution.',
    longDescription: 'High-performance bridge between signal providers and MT4/MT5 platforms. Focuses on low-latency execution, fail-safe error handling, and multi-account management.',
    category: 'Automation',
    techStack: ['Node.js', 'MetaApi', 'Docker', 'Redis'],
    imageUrl: 'https://images.unsplash.com/photo-1642790103517-1a129111ff04?q=80&w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/traveller007ab/SignalFlow-Automation',
    outcomes: ['Sub-100ms execution latency', 'Handled $500k+ in managed capital', 'Zero downtime over 12 months']
  }
];

export const SKILLS: Skill[] = [
  { name: 'Python', level: 95, category: 'Languages' },
  { name: 'TypeScript', level: 90, category: 'Languages' },
  { name: 'JavaScript', level: 92, category: 'Languages' },
  { name: 'Go', level: 75, category: 'Languages' },
  { name: 'React / Next.js', level: 95, category: 'Frameworks' },
  { name: 'FastAPI', level: 88, category: 'Frameworks' },
  { name: 'Tailwind CSS', level: 98, category: 'Frameworks' },
  { name: 'Node.js', level: 85, category: 'Frameworks' },
  { name: 'Gemini API', level: 90, category: 'AI/ML' },
  { name: 'PyTorch', level: 78, category: 'AI/ML' },
  { name: 'AutoGPT Agents', level: 85, category: 'AI/ML' },
  { name: 'NLP / RAG', level: 88, category: 'AI/ML' },
  { name: 'PostgreSQL', level: 85, category: 'Tools' },
  { name: 'Supabase', level: 90, category: 'Tools' },
  { name: 'Docker', level: 80, category: 'Tools' },
  { name: 'MetaApi', level: 92, category: 'Tools' }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    title: 'Senior AI Systems Architect',
    company: 'Independent / Consulting',
    period: '2023 - Present',
    description: [
      'Architecting multi-agent AI systems for automated enterprise workflows.',
      'Developing proprietary trading algorithms with 15% monthly alpha.',
      'Consulting for mechanical engineering firms on digital transformation.'
    ],
    isMilestone: true
  },
  {
    id: 'exp-2',
    title: 'Transmission Engineer Trainee',
    company: 'Transmission Company of Nigeria',
    period: '2022',
    description: [
      'Gained deep technical exposure to power system stability and maintenance.',
      'Applied mechanical engineering principles to grid optimization.',
      'Mastered technical documentation and safety compliance protocols.'
    ]
  },
  {
    id: 'exp-3',
    title: 'Lead Full-Stack Developer',
    company: 'TechFlow Solutions',
    period: '2021 - 2022',
    description: [
      'Scalable web applications using Next.js and high-performance backends.',
      'Mentored junior developers in TypeScript and React best practices.',
      'Reduced server costs by 40% through infrastructure optimization.'
    ]
  }
];
