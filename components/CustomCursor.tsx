
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for raw mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring config for snappiness (High tension, low friction)
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest('button, a, [role="button"], .cursor-pointer, input, textarea'));
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        translateX: cursorX,
        translateY: cursorY,
        left: 0,
        top: 0,
        x: '-50%',
        y: '-50%',
      }}
      className="fixed pointer-events-none z-[9999] hidden lg:flex items-center justify-center"
    >
      {/* Central Dot */}
      <motion.div 
        animate={{ scale: isHovering ? 0.5 : 1 }}
        className={`w-1.5 h-1.5 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] ${isHovering ? 'bg-white' : 'bg-emerald-400'}`} 
      />
      
      {/* Precision Crosshair */}
      <motion.div 
        animate={{ width: isHovering ? 40 : 20, height: isHovering ? 40 : 20, rotate: isHovering ? 90 : 0 }}
        className="absolute flex items-center justify-center"
      >
        <div className="absolute w-full h-[1px] bg-white/10" />
        <div className="absolute h-full w-[1px] bg-white/10" />
      </motion.div>
      
      {/* Outer Geometric Frame */}
      <motion.div 
        animate={{ 
          width: isHovering ? 60 : 30, 
          height: isHovering ? 60 : 30, 
          rotate: isHovering ? 135 : 0,
          borderColor: isHovering ? 'rgba(16, 185, 129, 0.8)' : 'rgba(255, 255, 255, 0.1)'
        }}
        className="absolute border border-dashed rounded-lg transition-colors duration-300"
      />
    </motion.div>
  );
};

export default CustomCursor;
