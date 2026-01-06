
import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';
import { Zap, Cpu, Database, Activity } from 'lucide-react';

const SkillMatrix: React.FC = () => {
  const categories = Array.from(new Set(SKILLS.map(s => s.category)));

  const getMetric = (val: number, type: 'freq' | 'density') => {
    if (type === 'freq') return `${(val / 20).toFixed(2)} GHz`;
    return `${(val * 1.2).toFixed(1)} ops/ms`;
  };

  return (
    <section id="skills" className="py-40 px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-6">
            <Activity className="text-emerald-500" size={20} />
            <h2 className="text-[11px] font-mono text-zinc-600 uppercase tracking-[0.6em] font-black">Capability_Matrix</h2>
          </div>
          <h3 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase text-center leading-none">
            The Tech <br /> <span className="text-emerald-500">Architecture.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {categories.map((cat, idx) => (
            <div key={cat} className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-emerald-500 font-mono text-sm font-black border-b border-emerald-500/30 pb-1">0{idx + 1}</span>
                <h4 className="text-zinc-500 font-black uppercase tracking-[0.4em] text-[10px]">{cat}</h4>
              </div>
              <div className="space-y-6">
                {SKILLS.filter(s => s.category === cat).map(skill => (
                  <div key={skill.name} className="group p-6 bg-zinc-950/40 border border-white/5 rounded-3xl hover:bg-emerald-500/[0.03] hover:border-emerald-500/20 transition-all backdrop-blur-xl">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-zinc-100 font-black text-xs uppercase tracking-widest group-hover:text-emerald-400 transition-colors">{skill.name}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-white text-[10px] font-mono font-bold">{skill.level}</span>
                        <span className="text-zinc-700 text-[8px] font-mono">%</span>
                      </div>
                    </div>
                    
                    <div className="h-[3px] w-full bg-white/5 overflow-hidden rounded-full mb-4">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                      />
                    </div>

                    <div className="flex justify-between font-mono text-[8px] text-zinc-700 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>DENSITY: {getMetric(skill.level, 'density')}</span>
                      <span>FREQ: {getMetric(skill.level, 'freq')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-40 p-12 bg-emerald-500/5 rounded-[3rem] border border-emerald-500/10 flex flex-col md:flex-row items-center justify-between gap-12 backdrop-blur-md">
           <div className="flex gap-8 items-center">
             <div className="p-6 bg-zinc-950 border border-emerald-500/20 rounded-2xl text-emerald-500">
               <Cpu size={32} />
             </div>
             <div>
               <p className="text-[11px] font-mono text-emerald-500 uppercase tracking-[0.4em] font-black mb-2">Computational_Core</p>
               <p className="text-zinc-400 text-lg leading-tight font-medium max-w-sm uppercase tracking-tight">
                 Architecture designed for <span className="text-white">low-latency autonomous reasoning</span> and high-concurrency data synthesis.
               </p>
             </div>
           </div>
           <div className="flex flex-col items-end gap-2">
              <span className="text-zinc-800 font-mono text-[10px] uppercase">Latency: &lt; 0.04ms</span>
              <span className="text-zinc-800 font-mono text-[10px] uppercase">State: DETERMINISTIC</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default SkillMatrix;
