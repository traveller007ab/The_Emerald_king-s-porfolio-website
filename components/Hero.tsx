
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Cpu, Download, Loader2, Check, Zap, Activity, Scan } from 'lucide-react';

const Hero: React.FC = () => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [neuralLoad, setNeuralLoad] = useState(84.2);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setNeuralLoad(prev => Math.min(99.4, Math.max(72.1, prev + (Math.random() * 2 - 1))));
    }, 1500);
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
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      window.open('#', '_blank');
      setTimeout(() => setDownloaded(false), 3000);
    }, 2000);
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-12 overflow-hidden" aria-label="Introduction">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        <div className="lg:col-span-7 z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="flex gap-1">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-1 h-4 bg-emerald-500/20 rounded-full" />
                ))}
              </div>
              <span className="text-emerald-500 font-black tracking-[0.3em] text-[10px] uppercase bg-emerald-500/5 px-3 py-1 rounded-md border border-emerald-500/10">
                Lvl 99 AI Architect
              </span>
            </div>

            <h1 className="text-7xl md:text-9xl font-extrabold leading-[0.85] tracking-tighter text-white mb-10">
              ELITE <br />
              <span className="text-emerald-500 italic">SYSTEMS.</span>
            </h1>

            <p className="text-xl md:text-2xl text-zinc-500 max-w-xl leading-relaxed mb-12 font-light">
              Designing high-frequency agents and mechanical-grade software. <span className="text-white font-medium">Emerald King</span> transforms complex logic into autonomous reality.
            </p>

            <div className="flex flex-wrap gap-5 items-center">
              <button 
                onClick={scrollToProjects}
                className="group relative px-12 py-6 bg-white text-black font-black text-[11px] tracking-[0.25em] uppercase rounded-2xl transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  ACCESS REPOSITORY <ArrowUpRight size={20} />
                </span>
                <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>

              <button 
                onClick={handleDownloadCV}
                disabled={downloading}
                className="group relative px-10 py-6 border border-white/10 text-white font-black text-[10px] tracking-[0.25em] uppercase rounded-2xl hover:bg-white/5 transition-all flex items-center gap-3 disabled:opacity-50"
              >
                <AnimatePresence mode="wait">
                  {downloading ? (
                    <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin text-emerald-500" /> SYNCING...
                    </motion.span>
                  ) : downloaded ? (
                    <motion.span key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-emerald-500">
                      <Check size={16} /> DOWNLOADED
                    </motion.span>
                  ) : (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      DOSSIER.PDF <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

            <div className="mt-16 pt-8 border-t border-white/5 flex items-center gap-12 grayscale opacity-40">
              <div className="flex flex-col gap-1">
                <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Global Ranking</span>
                <span className="text-white font-bold text-sm">TOP 0.1%</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Verified Tech</span>
                <span className="text-white font-bold text-sm">GEMINI PRO</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative">
          <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="aspect-[4/5] bg-zinc-950 rounded-[3rem] border border-white/10 relative overflow-hidden group shadow-2xl"
          >
            {/* The Scanning Line Effect */}
            <motion.div 
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-px bg-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.8)] z-30 pointer-events-none"
            />

            {/* Portrait Image - Using the user's provided ImageKit URL */}
            <img 
              src="https://ik.imagekit.io/ku0acpu9f/profile.jpg" 
              className="w-full h-full object-cover grayscale contrast-125 transition-all duration-1000 ease-out group-hover:grayscale-0 group-hover:scale-105"
              alt="Emerald King professional biometric portrait"
              onError={(e) => {
                // If the primary link fails, show a high-quality fallback
                const target = e.target as HTMLImageElement;
                if (!target.src.includes('unsplash')) {
                   target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop";
                }
              }}
            />

            {/* Vignette & Color Grading Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 z-10"></div>
            <div className="absolute inset-0 bg-emerald-500/5 mix-blend-overlay group-hover:bg-transparent transition-colors duration-700"></div>

            {/* Corner Brackets */}
            <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-emerald-500/40 rounded-tl-lg z-20"></div>
            <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-emerald-500/40 rounded-tr-lg z-20"></div>
            <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-emerald-500/40 rounded-bl-lg z-20"></div>
            <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-emerald-500/40 rounded-br-lg z-20"></div>

            {/* Biometric HUD Overlay */}
            <div className="absolute inset-8 pointer-events-none z-40 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="glass p-3 rounded-2xl border border-white/10 shadow-2xl">
                  <div className="flex flex-col gap-1">
                    <span className="text-[7px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1.5">
                      <Scan size={8} /> Biometric_ID
                    </span>
                    <span className="text-white font-mono text-[10px] font-bold">EM_KING_036</span>
                  </div>
                </div>
                
                <div className="glass p-3 rounded-2xl border border-white/10 shadow-2xl flex flex-col items-end">
                  <span className="text-[7px] font-black text-zinc-500 uppercase tracking-widest mb-1">Status</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-emerald-500 font-bold text-[10px] uppercase">Synced</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div className="flex flex-col gap-4">
                  <div className="glass p-4 rounded-2xl border border-white/10 shadow-2xl min-w-[140px]">
                    <span className="text-[7px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">Neural Load</span>
                    <div className="flex items-center gap-3">
                      <span className="text-white font-bold text-sm leading-none">{neuralLoad.toFixed(1)}%</span>
                      <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          animate={{ width: `${neuralLoad}%` }}
                          className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <div className="glass px-3 py-2 rounded-xl border border-white/10 text-white font-mono text-[8px] uppercase">
                      X: {isHovered ? '48.2' : '0.0'}
                    </div>
                    <div className="glass px-3 py-2 rounded-xl border border-white/10 text-white font-mono text-[8px] uppercase">
                      Y: {isHovered ? '22.9' : '0.0'}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="bg-emerald-500 p-4 rounded-2xl text-black shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <Cpu size={24} className={isHovered ? 'animate-spin' : ''} />
                  </div>
                  <span className="text-[6px] font-mono text-zinc-500 uppercase tracking-tighter">Core_V4.2_Activated</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Data Strings */}
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 items-end text-right">
            <div className="space-y-1">
              <p className="text-[8px] font-black text-emerald-500/40 uppercase tracking-widest">System Architecture</p>
              <p className="text-white/60 font-mono text-[10px]">MULTI-AGENT_PRO_V3</p>
            </div>
            <div className="space-y-1">
              <p className="text-[8px] font-black text-emerald-500/40 uppercase tracking-widest">Sync Frequency</p>
              <p className="text-white/60 font-mono text-[10px]">12.4 GHZ</p>
            </div>
            <div className="space-y-1">
              <p className="text-[8px] font-black text-emerald-500/40 uppercase tracking-widest">Auth Protocol</p>
              <p className="text-white/60 font-mono text-[10px]">BIOMETRIC_WATERMARK_OK</p>
            </div>
          </div>
        </div>

      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20"
      >
        <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white">Engage Systems</span>
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
