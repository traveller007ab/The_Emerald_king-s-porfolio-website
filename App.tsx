
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectGallery from './components/ProjectGallery';
import About from './components/About';
import SkillMatrix from './components/SkillMatrix';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import AIAssistant from './components/AIAssistant';
import Thoughts from './components/Thoughts';
import NeuralBackground from './components/NeuralBackground';
import CustomCursor from './components/CustomCursor';
import Logo from './components/Logo';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [depth, setDepth] = useState(0);
  const [mouseVelocity, setMouseVelocity] = useState(0);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setDepth(Math.floor(Math.max(0, scrollPercent) * 1000));
    };

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = now - lastTime.current;
      if (dt > 50) {
        const dx = e.clientX - lastMousePos.current.x;
        const dy = e.clientY - lastMousePos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        setMouseVelocity(Math.floor(dist / dt * 10));
        lastMousePos.current = { x: e.clientX, y: e.clientY };
        lastTime.current = now;
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] text-zinc-400 overflow-x-hidden relative">
      <CustomCursor />
      <NeuralBackground />
      
      {/* Global Status HUD */}
      <div className="fixed bottom-10 left-10 z-[90] hidden xl:flex flex-col gap-3 pointer-events-none">
        <div className="glass p-5 rounded-2xl border border-white/5 flex flex-col gap-2 min-w-[180px]">
          <div className="flex justify-between items-center mb-1">
             <span className="text-[9px] font-mono text-emerald-500/50 uppercase tracking-widest font-black">Environmental_HUD</span>
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="flex justify-between font-mono text-[10px] text-zinc-500">
            <span>VELOCITY:</span>
            <span className="text-white">{mouseVelocity} px/ms</span>
          </div>
          <div className="flex justify-between font-mono text-[10px] text-zinc-500">
            <span>DEPTH:</span>
            <span className="text-white">{depth}m</span>
          </div>
          <div className="flex justify-between font-mono text-[10px] text-zinc-500">
            <span>LINK:</span>
            <span className="text-emerald-500 font-bold">STABLE</span>
          </div>
          <div className="mt-2 h-[2px] w-full bg-white/5 relative">
            <motion.div 
              className="absolute inset-0 bg-emerald-500/30"
              animate={{ width: [`${(mouseVelocity / 50) * 100}%`, '10%'] }}
            />
          </div>
        </div>
      </div>

      {/* System Depth Progress (Right Rail) */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[90] hidden lg:flex flex-col items-center gap-8">
        <span className="font-mono text-[8px] text-zinc-600 vertical-text rotate-180 uppercase tracking-[0.6em] whitespace-nowrap">Node_Position</span>
        <div className="w-[1px] h-60 bg-white/5 relative">
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute top-0 left-0 w-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]" 
          />
        </div>
        <span className="font-mono text-[10px] text-emerald-500 font-black tabular-nums">{depth}m</span>
      </div>

      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <ProjectGallery />
        <SkillMatrix />
        <Thoughts />
        <Timeline />
        <Contact />
      </main>

      <AIAssistant />
      
      <footer className="py-32 border-t border-white/5 bg-zinc-950/20 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            <div className="lg:col-span-4 space-y-10">
              <div className="flex items-center gap-6">
                <Logo size={56} className="text-emerald-500" />
                <div className="flex flex-col">
                  <span className="text-3xl font-black tracking-tighter text-white uppercase leading-none">
                    EMERALD<span className="text-emerald-500">KING</span>
                  </span>
                  <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-[0.5em] mt-2">
                    SOVEREIGN NEXUS Node 01
                  </p>
                </div>
              </div>
              <p className="text-zinc-500 text-xs leading-relaxed max-w-sm uppercase font-mono tracking-widest opacity-60">
                The terminal state of software architecture. Deterministic. Atomic. Sovereign. Verified by Emerald King.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-12">
              <div className="space-y-6">
                <span className="text-[10px] font-mono text-emerald-500/50 uppercase tracking-[0.4em] font-black">Archive_Index</span>
                <ul className="space-y-3 text-xs font-bold text-zinc-400 uppercase tracking-tighter">
                  <li><a href="#projects" className="hover:text-emerald-400 transition-colors">Project Logs</a></li>
                  <li><a href="#about" className="hover:text-emerald-400 transition-colors">Core Manifesto</a></li>
                  <li><a href="#skills" className="hover:text-emerald-400 transition-colors">Capability Stack</a></li>
                </ul>
              </div>
              <div className="space-y-6">
                <span className="text-[10px] font-mono text-emerald-500/50 uppercase tracking-[0.4em] font-black">Global_Status</span>
                <p className="text-xs font-mono text-zinc-500">UPTIME: 99.999%</p>
                <p className="text-[8px] font-mono text-zinc-700">SIG_HASH: 0x882_DELTA_PRIME</p>
              </div>
              <div className="md:col-span-2 flex flex-col items-end justify-between h-full pt-1">
                <div className="flex gap-4 items-center">
                  <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest font-black">System_Active</span>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,1)]" />
                </div>
                <p className="text-zinc-800 text-[10px] font-mono mt-12 uppercase tracking-widest">
                  &copy; {new Date().getFullYear()} SOVEREIGN_ARCHITECT // EM_KING_NEXUS
                </p>
              </div>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
