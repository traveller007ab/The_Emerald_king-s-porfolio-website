
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Terminal, Mic, MicOff, Cpu, Command } from 'lucide-react';
import { GoogleGenAI, Modality, LiveServerMessage } from "@google/genai";

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: "Systems online. I am Emerald's digital twin. Toggle the mic for high-bandwidth voice interaction, or type your query below." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const activeSessionRef = useRef<any>(null);

  const SYSTEM_PROMPT = `You are "Sovereign AI", the digital twin and assistant for Emerald King, an elite AI Architect and Systems Engineer. 
  Emerald specializes in autonomous agentic frameworks and mechanical-grade software.
  His key projects include:
  1. Eldoria AI (Agentic automation)
  2. EmeraldRecords (AI-driven data synthesis)
  3. Signal Flow (Trading automation)
  4. Hardware Printing Pipelines.
  Be professional, technical, and high-context. Keep responses relatively concise.`;

  const closeAssistant = () => {
    stopVoiceSession();
    setIsOpen(false);
  };

  useEffect(() => {
    const handleTrigger = (e: any) => {
      setIsOpen(true);
      if (e.detail?.message) {
        handleSendText(e.detail.message);
      }
    };
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAssistant();
    };

    window.addEventListener('system:initialize', handleTrigger);
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('system:initialize', handleTrigger);
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes;
  };

  const encode = (bytes: Uint8Array) => {
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  };

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const stopVoiceSession = () => {
    if (activeSessionRef.current) {
      try { activeSessionRef.current.close(); } catch (e) {}
      activeSessionRef.current = null;
    }
    setIsVoiceActive(false);
    sourcesRef.current.forEach(source => { try { source.stop(); } catch (e) {} });
    sourcesRef.current.clear();
    nextStartTimeRef.current = 0;
  };

  const startVoiceSession = async () => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!audioContextRef.current) audioContextRef.current = new AudioContext({ sampleRate: 24000 });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: SYSTEM_PROMPT,
        },
        callbacks: {
          onopen: () => {
            setIsVoiceActive(true);
            const source = audioContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
              const pcmBlob = { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' };
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const audioData = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audioData && audioContextRef.current) {
              const audioBuffer = await decodeAudioData(decode(audioData), audioContextRef.current, 24000, 1);
              const source = audioContextRef.current.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(audioContextRef.current.destination);
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioContextRef.current.currentTime);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => { console.error(e); stopVoiceSession(); },
          onclose: () => stopVoiceSession()
        }
      });
      activeSessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setIsVoiceActive(false);
    }
  };

  const handleSendText = async (text: string) => {
    if (!text.trim()) return;
    const userMsg = { role: 'user' as const, text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.text }] })), { role: 'user', parts: [{ text }] }],
        config: { systemInstruction: SYSTEM_PROMPT }
      });
      const aiResponse = response.text || "System failure. Could not parse response.";
      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: "Critical link error. Connection to Gemini lost." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-10 right-10 z-[80] w-20 h-20 bg-emerald-500 text-black rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.4)] flex items-center justify-center group hover:scale-110 transition-transform"
      >
        <Terminal size={32} />
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full border-4 border-[#020202] flex items-center justify-center"
        >
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for closing */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeAssistant}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-[95]"
            />

            <motion.div 
              initial={{ opacity: 0, y: 100, scale: 0.9, x: '-50%' }}
              animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
              exit={{ opacity: 0, y: 100, scale: 0.9, x: '-50%' }}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-[95vw] md:w-[500px] h-[75vh] md:h-[700px] glass rounded-[3.5rem] overflow-hidden flex flex-col border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.9)]"
            >
              {/* Header */}
              <div className="p-10 border-b border-white/5 bg-zinc-950/50 flex justify-between items-center">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                    <Cpu size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] leading-none mb-2">SOVEREIGN_LINK</h4>
                    <span className="text-[9px] font-mono text-emerald-500 animate-pulse uppercase tracking-widest font-bold">Node: Active</span>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                   <div className="hidden md:flex items-center gap-3 px-4 py-1.5 bg-white/5 rounded-full border border-white/10">
                      <Command size={12} className="text-zinc-600" />
                      <span className="text-[9px] font-mono text-zinc-600 uppercase font-black">ESC_TO_EXIT</span>
                   </div>
                   <button onClick={closeAssistant} className="p-2 text-zinc-600 hover:text-white transition-colors">
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-8 scrollbar-hide">
                {messages.map((m, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={i} 
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] p-6 rounded-[2rem] text-sm leading-relaxed ${
                      m.role === 'user' 
                      ? 'bg-white text-black font-black' 
                      : 'bg-zinc-900/50 border border-white/5 text-zinc-300 backdrop-blur-md'
                    }`}>
                      {m.text}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-[2rem] flex gap-1.5">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-10 bg-zinc-950/80 border-t border-white/5">
                <div className="flex items-center gap-5">
                  <button 
                    onClick={() => isVoiceActive ? stopVoiceSession() : startVoiceSession()}
                    className={`flex-shrink-0 w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all ${
                      isVoiceActive ? 'bg-red-500 text-white animate-pulse shadow-[0_0_30px_rgba(239,68,68,0.4)]' : 'bg-white/5 text-zinc-500 hover:text-emerald-500 hover:bg-emerald-500/10'
                    }`}
                  >
                    {isVoiceActive ? <MicOff size={28} /> : <Mic size={28} />}
                  </button>
                  <div className="flex-1 relative">
                    <input 
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendText(input)}
                      placeholder="Input frequency protocol..."
                      className="w-full bg-zinc-900 border border-white/10 rounded-[1.5rem] py-5 px-8 text-white text-xs font-mono focus:outline-none focus:border-emerald-500 transition-all placeholder:text-zinc-800"
                    />
                    <button 
                      onClick={() => handleSendText(input)}
                      className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-emerald-500 transition-colors"
                    >
                      <Send size={22} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
