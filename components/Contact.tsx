
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowUpRight, Github, Linkedin, CheckCircle2, Copy, Terminal, ShieldCheck } from 'lucide-react';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [selectedInquiry, setSelectedInquiry] = useState('AI System');
  const [copied, setCopied] = useState(false);
  const [binaryStream, setBinaryStream] = useState('');
  
  const EMAIL = "Emeraldworks36@gmail.com";
  const LINKEDIN_URL = "https://www.linkedin.com/in/miracle-bernard-amadi-357788290";

  useEffect(() => {
    if (status === 'submitting') {
      const interval = setInterval(() => {
        setBinaryStream(prev => (prev + Math.round(Math.random())).slice(-64));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [status]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate high-security packet transmission
    setTimeout(() => setStatus('success'), 3000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-zinc-900/50 rounded-[3.5rem] border border-white/5 p-8 md:p-20 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 p-12 text-zinc-800/10 -rotate-12 pointer-events-none">
            <Mail size={240} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
            <div>
              <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-zinc-600 mb-6">Initiate Contact</h2>
              <h3 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tighter leading-[0.9]">
                READY FOR THE <br /> <span className="text-emerald-500">NEXT SPRINT?</span>
              </h3>
              
              <div className="space-y-6 mb-12">
                <p className="text-zinc-400 text-xl leading-relaxed max-w-md">
                  Inquire about complex AI integrations, system audits, or high-performance builds.
                </p>
                
                <div className="group flex items-center gap-4 p-4 bg-zinc-950 border border-white/5 rounded-2xl w-fit pr-8">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                    <Mail size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Direct Email</span>
                    <a href={`mailto:${EMAIL}`} className="text-white font-bold hover:text-emerald-500 transition-colors">
                      {EMAIL}
                    </a>
                  </div>
                  <button 
                    onClick={copyEmail}
                    className="ml-4 p-2 hover:bg-white/5 rounded-lg text-zinc-500 hover:text-white transition-all"
                    title="Copy to clipboard"
                  >
                    {copied ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                {[
                  { icon: <Github />, label: 'GitHub', href: 'https://github.com/traveller007ab' },
                  { icon: <Linkedin />, label: 'LinkedIn', href: LINKEDIN_URL },
                ].map((s, i) => (
                  <a 
                    key={i} 
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 bg-zinc-950 border border-white/5 rounded-[1.25rem] flex items-center justify-center text-zinc-500 hover:text-white hover:border-emerald-500 hover:bg-emerald-500/5 transition-all duration-300"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="relative">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center p-8 bg-emerald-500/5 rounded-3xl border border-emerald-500/20"
                  >
                    <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-black mb-6 shadow-[0_0_50px_rgba(16,185,129,0.3)]">
                      <ShieldCheck size={40} />
                    </div>
                    <h4 className="text-3xl font-bold text-white mb-2 tracking-tighter">Transmission Secure.</h4>
                    <p className="text-zinc-400">Emerald King will review your system requirements and reach out shortly.</p>
                    <button 
                      onClick={() => setStatus('idle')}
                      className="mt-8 text-emerald-500 font-bold text-xs uppercase tracking-widest border-b border-emerald-500/20 hover:border-emerald-500 transition-all"
                    >
                      Send another log
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form-container" className="relative h-full">
                    {status === 'submitting' && (
                      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-sm rounded-3xl border border-emerald-500/30">
                        <div className="font-mono text-[8px] text-emerald-500/50 mb-4 tracking-tighter w-full overflow-hidden text-center whitespace-nowrap">
                          {binaryStream}
                        </div>
                        <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden mb-4">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 3, ease: "easeInOut" }}
                            className="h-full bg-emerald-500"
                          />
                        </div>
                        <span className="font-mono text-[10px] text-emerald-400 animate-pulse uppercase tracking-[0.3em]">Encapsulating Packets...</span>
                        <div className="mt-8 flex gap-2">
                           <Terminal size={14} className="text-emerald-500" />
                           <span className="font-mono text-[8px] text-zinc-500">Routing via Secure_Gateway_01</span>
                        </div>
                      </div>
                    )}
                    
                    <motion.form 
                      onSubmit={handleSubmit}
                      className="space-y-8"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: status === 'submitting' ? 0.3 : 1 }}
                    >
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Subject Inquiry</label>
                        <div className="grid grid-cols-2 gap-3">
                          {['AI System', 'Full-Stack', 'Automation', 'Consulting'].map(opt => (
                            <button 
                              key={opt}
                              type="button"
                              onClick={() => setSelectedInquiry(opt)}
                              className={`py-4 px-4 rounded-2xl border text-[10px] font-black tracking-widest uppercase transition-all ${
                                selectedInquiry === opt 
                                ? 'bg-white border-white text-black shadow-[0_0_30px_rgba(255,255,255,0.1)]' 
                                : 'bg-zinc-950 border-white/5 text-zinc-500 hover:border-white/20'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <input 
                          required
                          type="email" 
                          placeholder="EMAIL@SENDER_NODE.COM" 
                          className="w-full bg-transparent border-b border-white/10 py-5 text-white font-black text-xl focus:outline-none focus:border-emerald-500 transition-colors uppercase tracking-[0.1em] placeholder:text-zinc-800"
                        />
                      </div>

                      <div className="space-y-2">
                        <textarea 
                          required
                          placeholder="BRIEF SYSTEM REQUIREMENTS..." 
                          className="w-full bg-transparent border-b border-white/10 py-5 text-white font-medium text-lg focus:outline-none focus:border-emerald-500 transition-colors h-32 resize-none placeholder:text-zinc-800"
                        />
                      </div>

                      <button 
                        disabled={status === 'submitting'}
                        className="w-full py-7 bg-white text-black font-black uppercase tracking-[0.3em] text-xs rounded-[1.5rem] hover:bg-emerald-500 transition-all flex items-center justify-center gap-3 group relative overflow-hidden disabled:opacity-50"
                      >
                        <span className="relative z-10 flex items-center gap-3">
                          INITIALIZE CONNECTION
                          <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </span>
                      </button>
                    </motion.form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
