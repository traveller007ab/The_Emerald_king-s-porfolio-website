
import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCES } from '../constants';

const Timeline: React.FC = () => {
  return (
    <section id="experience" className="py-32 px-6 bg-transparent backdrop-blur-[1px]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-500 mb-4">Log History</h2>
          <h3 className="text-5xl font-bold text-white tracking-tighter">Evolution Path.</h3>
        </div>

        <div className="space-y-1">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group grid grid-cols-1 md:grid-cols-12 gap-6 py-12 border-b border-white/5 hover:bg-emerald-500/5 transition-all px-4 rounded-2xl backdrop-blur-md"
            >
              <div className="md:col-span-2">
                <span className="text-emerald-500 font-mono text-sm tracking-tighter">{exp.period}</span>
              </div>
              <div className="md:col-span-4">
                <h4 className="text-white font-bold text-xl mb-1">{exp.title}</h4>
                <div className="flex items-center gap-2">
                  <p className="text-zinc-500 text-sm font-mono uppercase tracking-widest">{exp.company}</p>
                  {exp.isMilestone && (
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-500 text-[8px] font-black rounded-full uppercase">Key Era</span>
                  )}
                </div>
              </div>
              <div className="md:col-span-6">
                <ul className="space-y-4">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-zinc-400 text-sm leading-relaxed flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-800 mt-1.5 group-hover:bg-emerald-500 flex-shrink-0 transition-colors" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
