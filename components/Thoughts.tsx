
import React from 'react';
import { motion } from 'framer-motion';
import { THOUGHTS } from '../constants';
import { ArrowRight, BookOpen } from 'lucide-react';

const Thoughts: React.FC = () => {
  return (
    <section id="thoughts" className="py-32 px-6 bg-transparent backdrop-blur-[2px]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-500 mb-4">Intellectual Output</h2>
            <h3 className="text-5xl font-bold text-white tracking-tighter">Brain Dump.</h3>
          </div>
          <div className="flex items-center gap-4 text-emerald-500 font-mono text-[10px] uppercase tracking-widest">
            <BookOpen size={16} /> Technical Write-ups
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {THOUGHTS.map((thought, idx) => (
            <motion.div
              key={thought.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-8 rounded-[2rem] bg-zinc-900/30 border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col h-full cursor-pointer backdrop-blur-xl"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-mono text-zinc-600">{thought.date}</span>
                <span className="text-[10px] font-mono text-emerald-500/50">{thought.readTime} read</span>
              </div>
              
              <h4 className="text-xl font-bold text-white mb-4 group-hover:text-emerald-500 transition-colors">
                {thought.title}
              </h4>
              
              <p className="text-zinc-500 text-sm leading-relaxed mb-8 flex-grow">
                {thought.snippet}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex gap-2">
                  {thought.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 rounded bg-white/5 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
                <ArrowRight size={16} className="text-zinc-700 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Thoughts;
