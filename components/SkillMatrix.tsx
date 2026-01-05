
import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';

const SkillMatrix: React.FC = () => {
  const categories = Array.from(new Set(SKILLS.map(s => s.category)));

  return (
    <section id="skills" className="py-32 px-6 bg-zinc-950/50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-500 mb-4">Capabilities</h2>
          <h3 className="text-5xl font-bold text-white">The Tech Stack</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <div key={cat} className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-emerald-500 font-mono text-xs">0{idx + 1}</span>
                <h4 className="text-zinc-500 font-bold uppercase tracking-widest text-xs">{cat}</h4>
              </div>
              <div className="space-y-2">
                {SKILLS.filter(s => s.category === cat).map(skill => (
                  <div key={skill.name} className="group p-4 bg-zinc-900/30 border border-white/5 rounded-2xl hover:bg-emerald-500/5 transition-all">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-zinc-100 font-medium text-sm group-hover:text-emerald-500 transition-colors">{skill.name}</span>
                      <span className="text-zinc-600 text-[10px] font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-[2px] w-full bg-white/5 overflow-hidden rounded-full">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="h-full bg-emerald-500/50"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillMatrix;
