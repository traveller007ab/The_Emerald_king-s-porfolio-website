
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Database, Layers, Terminal, Activity, TrendingUp, Cpu } from 'lucide-react';

const About: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  
  const systemLogs = [
    "INITIALIZING CORE ARCHITECTURE...",
    "MT4/MT5 BRIDGE STATUS: OPTIMAL",
    "GEMINI-3 NEURAL LINK ESTABLISHED",
    "REDUNDANCY CHECKS COMPLETE (100%)",
    "CALCULATING SYSTEM ROI: +24.5%",
    "AGENT MEMORY SYNCING...",
    "MECHANICAL RIGOR VALIDATED.",
    "SCANNING FOR INEFFICIENCIES...",
    "ZERO BOTTLENECKS DETECTED."
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLogs(prev => [...prev.slice(-4), systemLogs[i]]);
      i = (i + 1) % systemLogs.length;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { icon: <TrendingUp size={14} />, label: 'ROI GENERATED', value: '$1.2M+', trend: '+14%' },
    { icon: <Activity size={14} />, label: 'UPTIME', value: '99.99%', trend: 'Stable' },
    { icon: <Cpu size={14} />, label: 'THROUGHPUT', value: '8.4k r/s', trend: '+22%' },
  ];

  const cards = [
    { icon: <Zap className="text-emerald-500" />, label: 'Latency', value: '< 100ms', desc: 'Execution velocity' },
    { icon: <Layers className="text-emerald-500" />, label: 'Architecture', value: 'Multi-Agent', desc: 'Autonomous logic' },
    { icon: <Shield className="text-emerald-500" />, label: 'Reliability', value: 'Fail-Safe', desc: 'Redundant systems' },
    { icon: <Database className="text-emerald-500" />, label: 'Data', value: 'Synthetic', desc: 'AI-driven synthesis' },
  ];

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div>
            <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-zinc-600 mb-8 flex items-center gap-4">
              <span className="w-12 h-px bg-zinc-800"></span> Philosophy
            </h2>
            <h3 className="text-5xl md:text-6xl font-bold text-white mb-10 leading-[0.9] tracking-tighter">
              Mechanical Precision <br /> <span className="text-emerald-500">Meets Neural Logic.</span>
            </h3>
            <p className="text-zinc-400 text-xl leading-relaxed mb-12">
              Trained in the rigors of transmission engineering, I view software through the lens of high-performance machinery. Every agent I deploy is an asset; every line of code is a mechanical link in a larger value-generating engine.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {metrics.map((m, i) => (
                <div key={i} className="p-5 bg-zinc-900/50 border border-white/5 rounded-2xl flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[9px] font-black tracking-widest text-zinc-600 uppercase">
                    <span className="flex items-center gap-2">{m.icon} {m.label}</span>
                    <span className="text-emerald-500">{m.trend}</span>
                  </div>
                  <div className="text-2xl font-bold text-white tracking-tighter">{m.value}</div>
                </div>
              ))}
            </div>

            <div className="bg-zinc-900/80 border border-white/5 rounded-3xl p-8 font-mono text-[11px] leading-relaxed relative overflow-hidden group shadow-2xl shadow-black">
              <div className="absolute top-4 right-6 flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
                <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              </div>
              <p className="text-zinc-600 mb-4 tracking-widest uppercase text-[9px] font-black">System Output Console</p>
              <div className="space-y-1.5">
                {logs.map((log, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    key={i + log} 
                    className="flex gap-4 items-center"
                  >
                    <span className="text-zinc-800">[{new Date().toLocaleTimeString()}]</span>
                    <span className={i === logs.length - 1 ? "text-emerald-500" : "text-zinc-500"}>{log}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sticky top-32">
            {cards.map((card, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10, borderColor: 'rgba(16,185,129,0.3)', backgroundColor: 'rgba(16,185,129,0.05)' }}
                className="p-8 bg-zinc-900/30 rounded-[2.5rem] border border-white/5 flex flex-col justify-between aspect-square transition-all duration-500"
              >
                <div className="p-4 w-fit rounded-2xl bg-white/5 shadow-inner">
                  {card.icon}
                </div>
                <div>
                  <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{card.label}</p>
                  <p className="text-white text-3xl font-bold mb-3 tracking-tighter">{card.value}</p>
                  <p className="text-zinc-500 text-xs leading-relaxed font-medium">{card.desc}</p>
                </div>
              </motion.div>
            ))}
            
            <div className="col-span-2 mt-8 flex flex-col items-center">
              <p className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.5em] mb-6">Technologies Trusted By</p>
              <div className="flex gap-10 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                {['Google', 'Meta', 'OpenAI', 'AWS'].map(brand => (
                  <span key={brand} className="text-white font-black text-lg tracking-tighter">{brand}.</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
