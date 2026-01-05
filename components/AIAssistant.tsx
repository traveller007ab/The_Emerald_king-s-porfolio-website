
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Terminal, Sparkles, Mic, MicOff } from 'lucide-react';
import { GoogleGenAI, Modality, LiveServerMessage } from "@google/genai";
import { PROJECTS } from '../constants';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: "Systems online. I am Emerald's digital twin. Toggle the mic to speak, or type your query below." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const EMAIL = "Emeraldworks36@gmail.com";
  const GITHUB = "traveller007ab";
  const LINKEDIN = "https://www.linkedin.com/in/miracle-bernard-amadi-357788290";

  // References for Live API session management and audio tracking
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const activeSessionRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Manually implement decode as per Google GenAI SDK guidelines
  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  // Manually implement encode as per Google GenAI SDK guidelines
  const encode = (bytes: Uint8Array) => {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  // Custom audio decoding function for raw PCM data
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

  // Proper cleanup for voice session resources
  const stopVoiceSession = () => {
    if (activeSessionRef.current) {
      try {
        activeSessionRef.current.close();
      } catch (e) {
        console.debug('Session already closed');
      }
      activeSessionRef.current = null;
    }
    setIsVoiceActive(false);
    // Halt all current audio playback
    sourcesRef.current.forEach(source => {
      try { source.stop(); } catch (e) {}
    });
    sourcesRef.current.clear();
    nextStartTimeRef.current = 0;
  };

  const startVoiceSession = async () => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: `You are Emerald King's Voice Twin. Be concise, technical, and confident. Use your knowledge of his projects (${PROJECTS.map(p => p.title).join(', ')}) and his background in Mechanical Engineering to answer. His contact email is ${EMAIL}, his GitHub is ${GITHUB}, and his LinkedIn is ${LINKEDIN}.`,
        },
        callbacks: {
          onopen: () => setIsVoiceActive(true),
          onmessage: async (message: LiveServerMessage) => {
            // Robust check for audio data to satisfy TS strict mode
            const parts = message.serverContent?.modelTurn?.parts;
            const audioData = (parts && parts.length > 0) ? parts[0].inlineData?.data : undefined;
            
            if (audioData && audioContextRef.current) {
              const ctx = audioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const buffer = await decodeAudioData(decode(audioData), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = buffer;
              source.connect(ctx.destination);
              
              source.onended = () => {
                sourcesRef.current.delete(source);
              };

              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => {
                try { s.stop(); } catch(e) {}
              });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => stopVoiceSession(),
          onerror: (e: any) => {
            console.error("Live API Error:", e);
            stopVoiceSession();
          },
        }
      });

      sessionPromise.then(session => {
        activeSessionRef.current = session;
      });

      const inputCtx = new AudioContext({ sampleRate: 16000 });
      const micSource = inputCtx.createMediaStreamSource(stream);
      const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
      
      scriptProcessor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        const int16 = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          int16[i] = inputData[i] * 32768;
        }
        
        const pcmBlob = {
          data: encode(new Uint8Array(int16.buffer)),
          mimeType: 'audio/pcm;rate=16000',
        };

        sessionPromise.then(s => {
          if (activeSessionRef.current) {
            s.sendRealtimeInput({ media: pcmBlob });
          }
        });
      };

      micSource.connect(scriptProcessor);
      scriptProcessor.connect(inputCtx.destination);

    } catch (err) {
      console.error("Voice Initialization Error:", err);
      setIsVoiceActive(false);
    }
  };

  const handleSendText = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: { systemInstruction: `You are Emerald's digital twin. Ground your answers in his GitHub (${GITHUB}), LinkedIn (${LINKEDIN}), and ME background. If asked for contact details, provide his email: ${EMAIL} or his LinkedIn.` }
      });
      setMessages(prev => [...prev, { role: 'ai', text: response.text || "System Fluctuating..." }]);
    } catch (error) {
      console.error("Text Generation Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "Neural link timeout." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[1000]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[350px] md:w-[450px] h-[600px] glass rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl border border-emerald-500/20"
          >
            <div className="p-6 bg-zinc-900/80 border-b border-white/5 flex items-center justify-between backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${isVoiceActive ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
                  {isVoiceActive ? 'Voice Mode Active' : 'Neural Interface v2.5'}
                </span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
                <X size={18} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-zinc-950/20">
              {messages.map((m, i) => (
                <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[90%] p-5 rounded-[1.5rem] text-xs leading-relaxed shadow-lg ${
                    m.role === 'user' 
                    ? 'bg-emerald-500 text-black font-bold rounded-tr-none' 
                    : 'bg-zinc-900/80 text-zinc-300 border border-white/5 font-mono rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isVoiceActive && (
                <div className="flex justify-center py-8">
                  <div className="flex gap-1 items-center h-8">
                    {[1,2,3,4,5,6,7,8].map(i => (
                      <motion.div
                        key={i}
                        animate={{ height: [8, 32, 8] }}
                        transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
                        className="w-1 bg-emerald-500/50 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              )}
              {isTyping && (
                <div className="flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
            </div>

            <div className="p-6 bg-zinc-900/80 border-t border-white/5 backdrop-blur-md">
              <div className="relative flex items-center gap-3">
                <button 
                  onClick={() => !isVoiceActive ? startVoiceSession() : stopVoiceSession()}
                  className={`p-4 rounded-2xl transition-all ${isVoiceActive ? 'bg-red-500 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'}`}
                >
                  {isVoiceActive ? <MicOff size={18} /> : <Mic size={18} />}
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendText()}
                  placeholder="QUERY KNOWLEDGE BASE..."
                  className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 px-5 pr-14 text-xs font-mono text-white focus:outline-none focus:border-emerald-500/50 transition-all uppercase placeholder:text-zinc-700 shadow-inner"
                />
                <button 
                  onClick={handleSendText}
                  disabled={!input.trim()}
                  className="absolute right-2 p-3 bg-emerald-500 text-black rounded-xl hover:bg-white transition-all disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-white text-black rounded-2xl shadow-2xl flex items-center justify-center hover:bg-emerald-500 transition-all group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-emerald-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <span className="relative z-10">
          {isOpen ? <Terminal size={24} /> : <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />}
        </span>
      </motion.button>
    </div>
  );
};

export default AIAssistant;
