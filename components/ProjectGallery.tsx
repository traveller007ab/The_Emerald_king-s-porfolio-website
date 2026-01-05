
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, X, Shield, Zap, Target, Filter } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project, ProjectCategory } from '../types';

const ProjectGallery: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | 'All'>('All');

  const categories: (ProjectCategory | 'All')[] = ['All', 'AI', 'Web', 'Automation', 'Hardware'];

  const filteredProjects = activeFilter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-500 mb-4">Portfolio</h2>
            <h3 className="text-5xl font-bold text-white tracking-tighter">Production Systems.</h3>
          </div>
          
          <div className="flex flex-wrap gap-2 p-2 bg-zinc-900/50 border border-white/5 rounded-2xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeFilter === cat 
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' 
                  : 'text-zinc-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[350px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isLarge = (activeFilter === 'All' && (idx === 0 || idx === 3)) || filteredProjects.length === 1;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setSelectedProject(project)}
                  whileHover={{ y: -8 }}
                  className={`group cursor-pointer relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-zinc-900/40 p-10 flex flex-col justify-end transition-all hover:border-emerald-500/30 ${
                    isLarge ? 'md:col-span-8' : 'md:col-span-4'
                  }`}
                >
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={project.imageUrl} 
                      className="w-full h-full object-cover opacity-20 grayscale transition-all duration-700 group-hover:scale-110 group-hover:opacity-40 group-hover:grayscale-0"
                      alt={project.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  </div>

                  <div className="relative z-10">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.slice(0, 2).map(tech => (
                        <span key={tech} className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] text-emerald-500 font-black uppercase tracking-widest">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <h4 className="text-3xl font-bold text-white mb-3 flex items-center gap-3">
                      {project.title} <ArrowUpRight size={20} className="text-zinc-600 group-hover:text-emerald-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </h4>
                    <p className="text-zinc-400 text-sm max-w-md line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
            />
            
            <motion.div 
              layoutId={`project-${selectedProject.id}`}
              className="relative w-full max-w-5xl bg-zinc-950 border border-white/10 rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl max-h-full overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 z-20 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-1/2 h-[300px] md:h-auto relative">
                <img src={selectedProject.imageUrl} className="w-full h-full object-cover" alt={selectedProject.title} />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-transparent hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent md:hidden" />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col">
                <div className="flex items-center gap-3 mb-8">
                  <span className="px-4 py-1.5 rounded-full bg-emerald-500 text-black text-[10px] font-black uppercase tracking-[0.2em]">
                    {selectedProject.category}
                  </span>
                  <span className="text-zinc-500 font-mono text-[10px]">CASE_STUDY_0{selectedProject.id.length}</span>
                </div>

                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tighter">{selectedProject.title}</h3>
                
                <p className="text-zinc-400 text-lg leading-relaxed mb-10">
                  {selectedProject.longDescription}
                </p>

                <div className="grid grid-cols-1 gap-6 mb-12">
                  {selectedProject.outcomes.map((outcome, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                        <Target size={20} />
                      </div>
                      <p className="text-zinc-300 text-sm font-medium leading-snug">{outcome}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap gap-4">
                  {selectedProject.liveUrl && (
                    <a href={selectedProject.liveUrl} target="_blank" className="px-8 py-4 bg-white text-black font-black text-[10px] tracking-[0.2em] uppercase rounded-full flex items-center gap-2 hover:bg-emerald-500 transition-colors">
                      Launch System <ExternalLink size={14} />
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a href={selectedProject.githubUrl} target="_blank" className="px-8 py-4 border border-white/10 text-white font-black text-[10px] tracking-[0.2em] uppercase rounded-full flex items-center gap-2 hover:bg-white hover:text-black transition-colors">
                      Source Code <Github size={14} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectGallery;
