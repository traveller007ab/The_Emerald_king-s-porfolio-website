
import React, { useEffect, useRef } from 'react';

const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;

    interface Gear {
      x: number;
      y: number;
      radius: number;
      teeth: number;
      speed: number;
      color: string;
      direction: number;
      label: string;
      type: 'main' | 'spur' | 'chain';
    }

    interface DataStream {
      x: number;
      y: number;
      val: string;
      speed: number;
      opacity: number;
    }

    const gears: Gear[] = [
      { x: 0.05, y: 0.2, radius: 220, teeth: 20, speed: 0.002, color: 'rgba(16, 185, 129, 0.12)', direction: 1, label: 'PRIME_CORE', type: 'main' },
      { x: 0.95, y: 0.5, radius: 350, teeth: 32, speed: 0.001, color: 'rgba(16, 185, 129, 0.08)', direction: -1, label: 'SYSTEM_DOMAIN', type: 'main' },
      { x: 0.4, y: 0.8, radius: 180, teeth: 16, speed: 0.004, color: 'rgba(255, 255, 255, 0.03)', direction: 1, label: 'DATA_BUS', type: 'spur' },
      { x: 0.7, y: 0.1, radius: 120, teeth: 12, speed: 0.008, color: 'rgba(16, 185, 129, 0.05)', direction: 1, label: 'CACHE_01', type: 'spur' },
    ];

    const streams: DataStream[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * 1,
      y: Math.random() * 1,
      val: Math.random().toString(16).substring(2, 6).toUpperCase(),
      speed: Math.random() * 0.001 + 0.0005,
      opacity: Math.random() * 0.3
    }));

    const drawStream = (s: DataStream) => {
      ctx.fillStyle = `rgba(16, 185, 129, ${s.opacity})`;
      ctx.font = '8px JetBrains Mono';
      ctx.fillText(`0x${s.val}`, s.x * canvas.width, s.y * canvas.height);
      s.y += s.speed;
      if (s.y > 1) s.y = 0;
    };

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 0.5;
      const step = 100;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const drawGear = (gear: Gear, rotation: number) => {
      const cx = gear.x * canvas.width;
      const cy = gear.y * canvas.height;
      const innerRadius = gear.radius * 0.8;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation * gear.direction);

      ctx.beginPath();
      ctx.strokeStyle = gear.color;
      ctx.lineWidth = 1;

      for (let i = 0; i < gear.teeth; i++) {
        const angle = (i * 2 * Math.PI) / gear.teeth;
        const nextAngle = ((i + 1) * 2 * Math.PI) / gear.teeth;
        const midAngle = (angle + nextAngle) / 2;
        ctx.lineTo(Math.cos(angle) * gear.radius, Math.sin(angle) * gear.radius);
        ctx.lineTo(Math.cos(midAngle) * gear.radius, Math.sin(midAngle) * gear.radius);
        ctx.lineTo(Math.cos(midAngle) * innerRadius, Math.sin(midAngle) * innerRadius);
        ctx.lineTo(Math.cos(nextAngle) * innerRadius, Math.sin(nextAngle) * innerRadius);
      }
      ctx.closePath();
      ctx.stroke();

      // Industrial Spacing
      ctx.beginPath();
      ctx.arc(0, 0, gear.radius * 0.2, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    };

    let rotation = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();
      
      rotation += 0.005;
      const scrollFactor = window.scrollY * 0.001;

      streams.forEach(drawStream);
      gears.forEach(gear => {
        const gearRot = rotation * gear.speed * 50 + (scrollFactor * gear.speed * 100);
        drawGear(gear, gearRot);
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-100 bg-[#020202]"
    />
  );
};

export default NeuralBackground;
