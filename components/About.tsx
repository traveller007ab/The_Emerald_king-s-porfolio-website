
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Cpu, Zap, Ruler, Hash, Hexagon } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-40 px-6 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-32">
          
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-16">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              <h2 className="text-[11px] font-mono text-emerald-500 uppercase tracking-[0.6em] font-black">SYSTEM_PROTOCOL_v4.2</h2>
            </div>
            
            <div className="sticky top-40">
              <h3 className="text-8xl md:text-[9rem] font-black text-white leading-[0.75] tracking-tighter mb-16 uppercase">
                STABLE <br /> <span className="text-emerald-500/20 border-b-4 border-emerald-500/10">ETHOS.</span>
              </h3>
              
              <div className="space-y-12">
                <div className="group flex gap-8 items-start">
                  <div className="p-5 bg-zinc-900/40 border border-white/5 text-emerald-500 group-hover:border-emerald-500/50 transition-all rounded-2xl backdrop-blur-sm">
                    <Ruler size={22} />
                  </div>
                  <div>
                    <h4 className="text-zinc-100 font-bold text-[11px] mb-3 uppercase tracking-[0.3em]">Precision Engineering</h4>
                    <p className="text-zinc-500 text-[10px] font-mono leading-relaxed uppercase tracking-widest max-w-sm">
                      Complexity is the enemy of stability. I architect deterministic constraints that force intelligence into predictable, high-performance paths.
                    </p>
                  </div>
                </div>
                <div className="group flex gap-8 items-start">
                  <div className="p-5 bg-zinc-900/40 border border-white/5 text-emerald-500 group-hover:border-emerald-500/50 transition-all rounded-2xl backdrop-blur-sm">
                    <ShieldAlert size={22} />
                  </div>
                  <div>
                    <h4 className="text-zinc-100 font-bold text-[11px] mb-3 uppercase tracking-[0.3em]">Resilient Core</h4>
                    <p className="text-zinc-500 text-[10px] font-mono leading-relaxed uppercase tracking-widest max-sm">
                      A system is only as strong as its fallback logic. My builds are designed to self-heal and re-establish canonical truth within milliseconds.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-20 p-8 rounded-[3rem] bg-zinc-950/20 backdrop-blur-[2px] border border-white/5">
              <div className="space-y-10">
                <div className="flex items-center gap-4">
                  <Hash size={14} className="text-zinc-800" />
                  <p className="text-xs font-mono text-zinc-500 uppercase tracking-[0.4em] bg-white/5 w-fit px-5 py-1.5 rounded-full">
                    Sovereign_Alpha_Directive
                  </p>
                </div>
                <p className="text-4xl md:text-6xl text-zinc-200 font-medium leading-[1.0] tracking-tighter">
                  Engineering is the act of <span className="text-emerald-500 font-black italic underline decoration-2 underline-offset-[16px]">dominating uncertainty</span>. I build the sovereign laws that ensure systems remain in <span className="text-white bg-emerald-500/15 px-3 py-1 rounded-lg">Canonical Equilibrium.</span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="p-14 bg-zinc-900/40 border border-white/5 rounded-[3rem] relative group overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10 text-emerald-500 group-hover:opacity-30 transition-opacity">
                    <Hexagon size={80} />
                  </div>
                  <p className="text-[11px] font-mono text-emerald-500 mb-8 uppercase tracking-[0.4em] font-black">[SYSTEM_AUDIT]</p>
                  <p className="text-zinc-400 text-lg leading-relaxed font-mono relative z-10">
                    AI without rigorous architecture is just expensive noise. I provide the vessel—the mechanical-grade software—that makes intelligence usable.
                  </p>
                </div>
                
                <div className="p-14 bg-white/95 text-black rounded-[3rem] flex flex-col justify-between shadow-2xl">
                   <div className="flex justify-between items-start">
                     <span className="text-[11px] font-mono uppercase tracking-[0.5em] font-black">Cluster_Uptime</span>
                     <Zap size={24} className="fill-black" />
                   </div>
                   <div className="mt-16">
                     <span className="text-9xl font-black tracking-tighter leading-none">MAX</span>
                     <p className="text-[10px] font-black uppercase tracking-[0.5em] mt-4 opacity-40">System State: NOMINAL</p>
                   </div>
                </div>
              </div>

              {/* The Colossians 3:23 Plaque - The Sovereign Standard */}
              <div className="relative pt-24 border-t border-white/5 group">
                <div className="absolute top-0 left-0 w-32 h-[2px] bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.6)]" />
                <div className="flex flex-col xl:flex-row gap-16 items-start">
                  <div className="flex-1">
                    <p className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.85] mb-12 uppercase italic group-hover:text-emerald-500 transition-colors duration-700">
                      "Whatever you do, work heartily, as for the Lord and not for men."
                    </p>
                    <div className="flex items-center gap-8">
                      <div className="flex flex-col">
                        <span className="text-emerald-500 font-mono text-sm font-bold uppercase tracking-[0.6em]">COLOSSIANS 3:23</span>
                        <span className="text-zinc-700 font-mono text-[10px] uppercase tracking-widest mt-2">The Sovereign Standard</span>
                      </div>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>
                  </div>
                  <div className="w-56 h-56 bg-zinc-900/60 border border-white/10 rounded-[2.5rem] flex items-center justify-center p-12 relative overflow-hidden group-hover:border-emerald-500/40 transition-all duration-700">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-500/20 group-hover:text-emerald-500/50 transition-colors duration-700">
                      <rect x="2" y="2" width="96" height="96" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                      <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.5" />
                      <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5" />
                      <circle cx="50" cy="50" r="5" fill="currentColor" className="animate-pulse" />
                      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.2" fill="none" />
                      {/* Architectural measurements */}
                      <path d="M10 10 L10 20 M10 10 L20 10" stroke="currentColor" strokeWidth="1" />
                      <path d="M90 90 L90 80 M90 90 L80 90" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
