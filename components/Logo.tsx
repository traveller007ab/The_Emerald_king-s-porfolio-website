
import React from 'react';
import { motion } from 'framer-motion';

const Logo: React.FC<{ size?: number; className?: string }> = ({ size = 40, className = "" }) => {
  return (
    <motion.div 
      whileHover="hover"
      initial="initial"
      className={`relative flex items-center justify-center ${className} cursor-pointer`} 
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* The Sovereign Nexus Monogram */}
        {/* Abstract 'E' and 'K' integration */}
        <motion.path
          variants={{
            initial: { pathLength: 0.8, opacity: 0.4 },
            hover: { pathLength: 1, opacity: 1 }
          }}
          d="M25 20 H75 V35 H40 V50 H70 V65 H40 V80 H75"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="square"
          className="text-white"
        />
        
        <motion.path
          variants={{
            initial: { pathLength: 0, opacity: 0 },
            hover: { pathLength: 1, opacity: 1 }
          }}
          d="M75 20 L55 50 L75 80"
          stroke="#00ff9d"
          strokeWidth="8"
          strokeLinecap="square"
        />

        {/* The 'Deterministic' Center Point */}
        <motion.rect
          x="36"
          y="46"
          width="8"
          height="8"
          fill="#00ff9d"
          variants={{
            initial: { scale: 0, opacity: 0 },
            hover: { scale: 1, opacity: 1 }
          }}
          className="shadow-[0_0_20px_rgba(0,255,157,0.8)]"
        />

        {/* Measurement Callouts (The engineering touch) */}
        <g className="opacity-20">
          <line x1="10" y1="20" x2="10" y2="80" stroke="currentColor" strokeWidth="1" />
          <line x1="8" y1="20" x2="12" y2="20" stroke="currentColor" strokeWidth="1" />
          <line x1="8" y1="80" x2="12" y2="80" stroke="currentColor" strokeWidth="1" />
          <text x="2" y="52" fill="currentColor" fontSize="6" className="font-mono" style={{ transform: 'rotate(-90deg)', transformOrigin: '5px 52px' }}>60.00mm</text>
        </g>
      </svg>
    </motion.div>
  );
};

export default Logo;
