
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectGallery from './components/ProjectGallery';
import About from './components/About';
import SkillMatrix from './components/SkillMatrix';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import AIAssistant from './components/AIAssistant';
import Thoughts from './components/Thoughts';

const App: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 overflow-x-hidden relative">
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-emerald-500/30 rounded-full pointer-events-none z-[9999] hidden lg:block"
        animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
        transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
      />
      
      <Navbar />
      <main>
        <Hero />
        <About />
        <ProjectGallery />
        <SkillMatrix />
        <Thoughts />
        <Timeline />
        <Contact />
      </main>

      <AIAssistant />
      
      <footer className="py-20 border-t border-white/5 bg-zinc-950 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex flex-col gap-4">
              <span className="text-2xl font-black tracking-tighter text-white">
                EMERALD<span className="text-emerald-500">KING</span>
              </span>
              <p className="text-zinc-500 text-xs font-mono uppercase tracking-[0.2em]">
                Built with precision & autonomous intent.
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-6">
              <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                <a href="#projects" className="hover:text-white transition-colors">Portfolio</a>
                <a href="#about" className="hover:text-white transition-colors">Philosophy</a>
                <a href="https://github.com/traveller007ab" target="_blank" className="hover:text-white transition-colors">Source Code</a>
              </div>
              <p className="text-zinc-600 text-[10px] font-mono">
                &copy; {new Date().getFullYear()} CORE ENGINE. ALL SYSTEMS OPERATIONAL.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
