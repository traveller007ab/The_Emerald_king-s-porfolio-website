
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield, ArrowUpRight, Activity } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'Systems', href: '#projects' },
    { name: 'Philosophy', href: '#about' },
    { name: 'Stack', href: '#skills' },
    { name: 'Log', href: '#experience' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['about', 'projects', 'skills', 'experience', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-8 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="pointer-events-auto flex items-center gap-4 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-12 h-12 bg-white text-black flex items-center justify-center rounded-2xl group-hover:bg-emerald-500 transition-all duration-500 rotate-0 group-hover:rotate-[360deg] shadow-xl shadow-black/20">
            <Shield size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-black tracking-tighter text-xl leading-none">
              EMERALD<span className="text-zinc-600">KING</span>
            </span>
            <div className="flex items-center gap-2 mt-1">
              <Activity size={10} className="text-emerald-500 animate-pulse" />
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-500">System Pulse: Active</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`pointer-events-auto hidden md:flex items-center gap-1 p-1.5 rounded-full border border-white/5 transition-all duration-700 ${scrolled ? 'bg-zinc-950/90 backdrop-blur-3xl px-6 py-2 shadow-2xl scale-100' : 'bg-transparent scale-105'}`}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded-full ${
                activeSection === link.href.replace('#', '') 
                ? 'text-white bg-white/10' 
                : 'text-zinc-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.name}
            </a>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="pointer-events-auto flex items-center gap-6"
        >
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className={`hidden sm:flex items-center gap-3 px-8 py-4 border rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${
              activeSection === 'contact' 
              ? 'bg-emerald-500 border-emerald-500 text-black shadow-[0_0_30px_rgba(16,185,129,0.4)]' 
              : 'bg-zinc-900 border-white/10 text-white hover:bg-white hover:text-black shadow-xl'
            }`}
          >
            Inquire <ArrowUpRight size={16} />
          </a>

          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-4 bg-zinc-900/50 rounded-2xl text-white pointer-events-auto border border-white/10 backdrop-blur-lg"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black/98 backdrop-blur-3xl z-[90] flex flex-col items-center justify-center gap-10 pointer-events-auto"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-6xl font-black text-white hover:text-emerald-500 transition-all tracking-tighter"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="mt-12 px-16 py-6 bg-emerald-500 text-black font-black uppercase tracking-[0.3em] rounded-3xl text-sm shadow-2xl shadow-emerald-500/20"
            >
              Initialize Sprint
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
