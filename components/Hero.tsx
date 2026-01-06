
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Terminal, Shield } from 'lucide-react';

const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: '0.000', y: '0.000' });
  const [isOverriding, setIsOverriding] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth).toFixed(3), 
        y: (e.clientY / window.innerHeight).toFixed(3) 
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const triggerAI = () => {
    setIsOverriding(true);
    setTimeout(() => {
      setIsOverriding(false);
      window.dispatchEvent(new CustomEvent('system:initialize', { 
        detail: { message: "System override sequence initiated. Initializing Project Alpha. Architect Emerald King standing by for instruction." } 
      }));
    }, 1000);
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden bg-transparent">
      
      {/* Glitch Overlay Sequence */}
      <AnimatePresence>
        {isOverriding && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-emerald-500/15 backdrop-blur-[4px] pointer-events-none flex items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay" />
            <motion.div 
              animate={{ x: [-15, 15, -8, 8, 0], y: [5, -5, 2, -2, 0] }}
              transition={{ duration: 0.1, repeat: Infinity }}
              className="flex flex-col items-center gap-4"
            >
              <span className="text-white font-mono text-5xl md:text-8xl font-black tracking-[0.6em] uppercase">SYSTEM_OVERRIDE</span>
              <div className="w-96 h-1 bg-white/20 relative">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 bg-white"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HUD Data Overlays */}
      <div className="fixed top-12 left-12 z-50 pointer-events-none hidden lg:block">
        <div className="font-mono text-[9px] text-zinc-700 flex flex-col gap-2 uppercase tracking-[0.2em]">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>NODE_PRIME: 001</span>
          </div>
          <span className="opacity-50">X_COORD: {mousePos.x}</span>
          <span className="opacity-50">Y_COORD: {mousePos.y}</span>
          <span className="opacity-50">ENV_STATE: STABLE</span>
        </div>
      </div>
      
      {/* Left Side: Content */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-24 py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-14">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-lg">
              <Shield size={14} />
            </div>
            <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-[0.5em]">
              Sovereign Systems Architect
            </span>
          </div>

          <h1 className="text-[12vw] lg:text-[11vw] font-black text-white leading-[0.8] tracking-tighter uppercase mb-16">
            EMERALD<br />
            <span className="text-white/5 stroke-text">KING</span>
          </h1>

          <div className="max-w-xl space-y-12">
            <p className="text-xl md:text-3xl text-zinc-400 font-medium leading-[1.1] tracking-tight">
              I construct <span className="text-white">deterministic foundations</span> for high-context autonomous intelligence and scalable systems.
            </p>
            
            <div className="flex flex-wrap gap-8 pt-4">
              <button 
                onClick={triggerAI}
                className="group relative flex items-center gap-8 text-white font-black text-[10px] uppercase tracking-[0.4em] pointer-events-auto"
              >
                <span className="relative z-10 py-1 border-b border-emerald-500/20 group-hover:border-emerald-500 transition-colors">Initialize Project Alpha</span>
                <div className="w-16 h-16 rounded-3xl border border-white/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0)] group-hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] bg-white/5 backdrop-blur-sm">
                  <ArrowRight size={24} className="group-hover:text-black transition-colors" />
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side: The Monolith Image */}
      <div className="w-full lg:w-[38%] relative h-[70vh] lg:h-screen border-l border-white/5 bg-zinc-950/40 backdrop-blur-sm">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://ik.imagekit.io/ku0acpu9f/profile.jpg" 
            className="w-full h-full object-cover grayscale contrast-125 brightness-50 scale-105 transition-transform duration-[20s] hover:scale-110"
            alt="Emerald King Profile"
          />
          <motion.div 
            animate={{ top: ['-10%', '110%'] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[1px] bg-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.8)] z-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 opacity-70" />
          <div className="absolute inset-0 border-[24px] border-[#050505] pointer-events-none z-20" />
        </div>

        {/* Floating HUD UI Card */}
        <div className="absolute bottom-20 left-10 right-10 z-30">
          <div className="glass p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-3xl shadow-2xl">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]" />
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-[0.3em]">Identity_Verified: Canonical</span>
              </div>
              <Terminal size={16} className="text-zinc-700" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white font-black text-5xl tracking-tighter uppercase leading-none">ARCHITECT_V1</span>
              <div className="flex items-center gap-4 mt-4">
                <span className="font-mono text-[10px] text-emerald-500 font-bold tracking-widest uppercase bg-emerald-500/10 px-3 py-1 rounded-lg">Level_99_Eng</span>
                <span className="text-zinc-600 font-mono text-[9px] tracking-widest">H_ID: 0x9928AF_P</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.06);
          color: transparent;
        }
      `}</style>
    </section>
  );
};

export default Hero;
