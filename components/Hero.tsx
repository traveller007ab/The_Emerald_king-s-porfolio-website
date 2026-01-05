
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Cpu, Download, Loader2, Check, Zap, Activity } from 'lucide-react';

const Hero: React.FC = () => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [neuralLoad, setNeuralLoad] = useState(84);

  useEffect(() => {
    const interval = setInterval(() => {
      setNeuralLoad(prev => Math.min(98, Math.max(70, prev + (Math.random() * 4 - 2))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const handleDownloadCV = () => {
    setDownloading(true);
    // Emulate a high-tech generation sequence
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      window.open('/path-to-your-resume.pdf', '_blank');
      setTimeout(() => setDownloaded(false), 3000);
    }, 2000);
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center px-6 pt-20" aria-label="Introduction">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-12 h-[1px] bg-emerald-500/50"></span>
              <span className="text-emerald-500 font-bold tracking-[0.2em] text-[10px] uppercase">Systems Architect & AI Engineer</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-extrabold leading-[0.9] tracking-tighter text-white mb-8">
              ENGINEERING <br />
              <span className="text-emerald-500">INTELLIGENCE.</span>
            </h1>

            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl leading-relaxed mb-12">
              Emerald King builds the bridges between physical systems and autonomous agents. Specializing in high-frequency automation and AI-driven architectures.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <button 
                onClick={scrollToProjects}
                className="group relative px-10 py-5 bg-white text-black font-black text-[10px] tracking-[0.2em] uppercase rounded-full transition-all hover:scale-105 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  EXPLORE SYSTEMS <ArrowUpRight size={18} />
                </span>
                <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>

              <button 
                onClick={handleDownloadCV}
                disabled={downloading}
                className="relative px-10 py-5 border border-white/10 text-white font-black text-[10px] tracking-[0.2em] uppercase rounded-full hover:bg-white hover:text-black transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <AnimatePresence mode="wait">
                  {downloading ? (
                    <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <Loader2 size={14} className="animate-spin" /> Preparing...
                    </motion.span>
                  ) : downloaded ? (
                    <motion.span key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-emerald-500">
                      <Check size={14} /> Ready
                    </motion.span>
                  ) : (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      Download CV <Download size={14} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              
              <div className="flex items-center ml-0 md:ml-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-4 md:mt-0">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-3 animate-pulse"></span>
                Status: Available for high-impact roles
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-4 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="aspect-[4/5] bg-zinc-900 rounded-[3rem] border border-white/5 relative overflow-hidden shadow-[0_0_80px_rgba(16,185,129,0.1)]"
          >
            <img 
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop" 
              className="w-full h-full object-cover grayscale opacity-70 mix-blend-luminosity hover:opacity-100 transition-all duration-700"
              alt="Emerald King professional portrait"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            
            <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
              <div>
                <p className="text-white font-black text-2xl tracking-tighter">Emerald King</p>
                <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-[0.2em]">CORE ARCHITECT / LAGOS</p>
              </div>
              <div className="p-4 bg-emerald-500 text-black rounded-2xl shadow-xl shadow-emerald-500/30">
                <Cpu size={24} />
              </div>
            </div>

            {/* Neural Load HUD Overlay */}
            <div className="absolute top-8 left-8 right-8 flex flex-col gap-4 pointer-events-none">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-black/40 backdrop-blur-md rounded-xl border border-white/5 flex flex-col gap-1">
                  <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Activity size={8} className="text-emerald-500" /> Neural Load
                  </span>
                  <div className="flex items-end gap-2">
                    <span className="text-white font-bold text-lg leading-none">{neuralLoad.toFixed(1)}%</span>
                    <div className="h-1 w-12 bg-white/10 rounded-full overflow-hidden mb-1">
                      <motion.div 
                        animate={{ width: `${neuralLoad}%` }}
                        className="h-full bg-emerald-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-black/40 backdrop-blur-md rounded-xl border border-white/5 flex flex-col gap-1">
                  <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Zap size={8} className="text-emerald-500" /> Latency
                  </span>
                  <span className="text-white font-bold text-lg leading-none">12ms</span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="absolute -top-6 -right-6 p-5 glass rounded-2xl border border-white/10 hidden md:block">
            <div className="flex flex-col gap-2 font-mono text-[9px] tracking-widest text-zinc-500">
              <div className="flex justify-between gap-8">
                <span>SYSTEM_STATUS</span>
                <span className="text-emerald-500">OPTIMAL</span>
              </div>
              <div className="flex justify-between gap-8">
                <span>THROUGHPUT</span>
                <span className="text-white">840 req/s</span>
              </div>
              <div className="w-full bg-white/5 h-1 rounded-full mt-1 overflow-hidden">
                <div className="bg-emerald-500 h-full w-[88%]"></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] rotate-90">Scroll</span>
        <div className="w-px h-16 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
