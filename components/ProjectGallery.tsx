
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Layers, Link as LinkIcon, Hash, Ruler } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

const ProjectItem: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const projectHash = `0x${(index * 1777 + 9999).toString(16).toUpperCase()}_STABLE`;

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full border-t border-white/5 group overflow-hidden"
    >
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 bg-emerald-500/[0.04] pointer-events-none z-0"
      />

      <div className="max-w-7xl mx-auto px-6 py-24 md:py-48 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-32">
        <div className="flex-1 space-y-12">
          <div className="flex flex-wrap items-center gap-8">
            <span className="text-emerald-500 font-mono text-xs font-black bg-emerald-500/10 px-4 py-1.5 rounded-lg border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]">LOG_0{index + 1}</span>
            <div className="flex gap-4">
              {project.techStack.map(tech => (
                <span key={tech} className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest border border-white/5 px-3 py-1 bg-zinc-900/40 rounded backdrop-blur-sm">
                  {tech}
                </span>
              ))}
            </div>
            <div className="hidden xl:flex items-center gap-3 text-emerald-500/40 font-mono text-[9px] uppercase tracking-widest">
               <Hash size={12} /> HASH: {projectHash}
            </div>
          </div>
          
          <h3 className="text-7xl md:text-[9vw] font-black text-white tracking-tighter uppercase leading-[0.8] group-hover:text-emerald-500 transition-colors duration-1000">
            {project.title.split(' ')[0]} <br />
            <span className="opacity-10 group-hover:opacity-100 transition-opacity duration-1000">{project.title.split(' ')[1] || ''}</span>
          </h3>

          <p className="text-zinc-500 text-xl md:text-3xl max-w-2xl font-medium leading-tight tracking-tight">
            {project.description}
          </p>

          <div className="flex flex-wrap items-center gap-12 pt-4">
            <a 
              href={project.githubUrl} 
              target="_blank" 
              className="group/link flex items-center gap-4 text-white font-mono text-[11px] uppercase tracking-[0.4em] hover:text-emerald-500 transition-colors"
            >
              <Github size={22} /> 
              <span className="border-b border-transparent group-hover/link:border-emerald-500 transition-all">Source_Node</span>
            </a>
            <div className="flex items-center gap-4 text-zinc-600 font-mono text-[11px] uppercase tracking-[0.4em]">
              <Layers size={22} /> {project.category}
            </div>
            <div className="flex items-center gap-3">
              <LinkIcon size={16} className="text-emerald-500" />
              <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.3em] font-black">CANONICAL_DEPLOY</span>
            </div>
          </div>
        </div>

        <motion.div 
          animate={{ scale: isHovered ? 1.05 : 1, rotate: isHovered ? -1.5 : 0 }}
          className="w-full lg:w-[600px] aspect-[4/5] rounded-[5rem] overflow-hidden border border-white/10 bg-zinc-950 shadow-[0_100px_200px_rgba(0,0,0,0.8)] relative group/img transition-all duration-700"
        >
          {/* Base Image */}
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className={`w-full h-full object-cover grayscale brightness-[0.4] transition-all duration-1000 ${isHovered ? 'grayscale-0 brightness-[0.8] scale-110' : ''}`}
          />
          
          {/* Blueprint Overlay Effect */}
          <motion.div 
            animate={{ opacity: isHovered ? 0.3 : 0 }}
            className="absolute inset-0 pointer-events-none mix-blend-overlay"
            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(16,185,129,0.5) 1px, transparent 0)', backgroundSize: '20px 20px' }}
          />
          <motion.div 
            animate={{ opacity: isHovered ? 0.2 : 0 }}
            className="absolute inset-0 pointer-events-none border-4 border-emerald-500/50 m-12 rounded-[3rem]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
          
          <motion.div 
            animate={{ y: isHovered ? 0 : 40, opacity: isHovered ? 1 : 0 }}
            className="absolute bottom-16 left-16"
          >
            <div className="flex items-center gap-6">
              <button className="bg-white text-black px-12 py-6 rounded-3xl font-black text-[13px] uppercase tracking-[0.3em] flex items-center gap-5 hover:bg-emerald-500 transition-all shadow-3xl">
                STRUCTURAL_ANALYSIS <ArrowUpRight size={24} />
              </button>
              <div className="hidden sm:flex flex-col font-mono text-[9px] text-zinc-600 uppercase tracking-[0.4em]">
                 <span>Ref_ID: 0x99A</span>
                 <span>State: Nominal</span>
              </div>
            </div>
          </motion.div>

          <div className="absolute top-16 right-16">
             <Ruler className="text-emerald-500/20 group-hover:text-emerald-500/40 transition-colors" size={32} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ProjectGallery: React.FC = () => {
  return (
    <section id="projects" className="bg-transparent pt-32">
      <div className="max-w-7xl mx-auto px-6 mb-40 flex flex-col md:flex-row justify-between items-end gap-12">
        <div className="space-y-8">
          <div className="flex items-center gap-8">
            <div className="w-16 h-[1px] bg-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            <h2 className="text-[12px] font-mono text-zinc-600 uppercase tracking-[0.8em] font-black">Production_Archive</h2>
          </div>
          <h3 className="text-7xl md:text-[10vw] font-black text-white tracking-tighter uppercase leading-none">System <br /> <span className="text-emerald-500">Architecture.</span></h3>
        </div>
        <div className="font-mono text-[11px] text-zinc-600 uppercase tracking-[0.4em] text-right leading-relaxed max-w-sm pb-8 opacity-60">
           Displaying verified high-context sovereign nodes. <br /> Deployment registry: 0x221_P_ALPHA.
        </div>
      </div>
      
      <div className="flex flex-col">
        {PROJECTS.map((project, idx) => (
          <ProjectItem key={project.id} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
};

export default ProjectGallery;
