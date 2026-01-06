
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Command } from 'lucide-react';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'ARCHIVE', href: '#projects' },
    { name: 'MANIFESTO', href: '#about' },
    { name: 'STACK', href: '#skills' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-1000 ease-[0.16, 1, 0.3, 1] ${scrolled ? 'py-5 px-8 md:px-12' : 'py-12 px-12 md:px-20'}`}>
        <div className="max-w-[1800px] mx-auto flex justify-between items-center">
          
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="flex items-center gap-10 group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Logo size={48} className="text-white group-hover:text-emerald-500 transition-all duration-500" />
            <div className="hidden sm:flex flex-col">
              <span className="text-white font-black tracking-tighter text-2xl leading-none uppercase">SOVEREIGN</span>
              <span className="text-[9px] font-mono text-emerald-500/60 tracking-[0.5em] mt-1.5 uppercase">Systems Node 01</span>
            </div>
          </motion.div>

          <div className="flex items-center gap-8">
            <div className={`hidden md:flex items-center gap-2 px-8 py-4 rounded-[2rem] border border-white/5 backdrop-blur-3xl transition-all duration-700 ${scrolled ? 'bg-zinc-950/80 border-emerald-500/10' : 'bg-transparent'}`}>
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-6 text-[10px] font-black text-zinc-400 hover:text-emerald-400 tracking-[0.3em] transition-all uppercase"
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            <button 
              onClick={() => setIsOpen(true)}
              className="p-6 bg-white text-black hover:bg-emerald-500 transition-all duration-700 flex items-center justify-center rounded-[1.5rem] group shadow-2xl"
            >
              <Menu size={22} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[1000] bg-[#050505] flex flex-col p-12 lg:p-24"
          >
            <div className="flex justify-between items-center mb-24">
              <Logo size={70} className="text-emerald-500" />
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-10 text-black bg-white rounded-full hover:bg-emerald-500 transition-all duration-500 flex items-center gap-4 font-black uppercase text-sm tracking-[0.2em] shadow-3xl"
              >
                CLOSE_PROTOCOL <X size={24} />
              </button>
            </div>
            
            <div className="flex flex-col gap-6 md:gap-12">
              {links.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1), duration: 0.6 }}
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="group flex items-baseline gap-8 text-7xl md:text-[11vw] font-black text-zinc-900 hover:text-emerald-500 transition-all duration-500 tracking-tighter uppercase leading-none"
                >
                  <span className="text-2xl font-mono text-zinc-950 group-hover:text-emerald-500/40 transition-colors">0{i+1}</span>
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto flex flex-col lg:flex-row justify-between items-end border-t border-white/5 pt-16">
               <div className="space-y-4">
                 <span className="font-mono text-[11px] text-zinc-700 uppercase tracking-[0.5em] block">Access_Gateway_01</span>
                 <p className="text-white font-black text-3xl uppercase tracking-tighter flex items-center gap-5">
                   EMERALD KING <Command size={22} className="text-emerald-500" />
                 </p>
               </div>
               <div className="flex gap-16 font-mono text-[11px] text-zinc-500 uppercase tracking-[0.4em] mt-12 lg:mt-0">
                  <a href="https://github.com/traveller007ab" target="_blank" className="hover:text-emerald-500 transition-all">GitHub</a>
                  <a href="https://www.linkedin.com/in/miracle-bernard-amadi-357788290" target="_blank" className="hover:text-emerald-500 transition-all">LinkedIn</a>
                  <a href="#" className="hover:text-emerald-500 transition-all">Dossier</a>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
