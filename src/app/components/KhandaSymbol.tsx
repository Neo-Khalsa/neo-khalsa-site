import straightLogo from '../../assets/708173685ed17ed37debeac6c2fcdfed0e0a43b8.webp';
import { motion } from 'motion/react';

interface KhandaProps {
  size?: number;
  className?: string;
  glow?: boolean;
  animate?: boolean;
}

export function KhandaSymbol({ size = 80, className = '', glow = true, animate = true }: KhandaProps) {
  const style: React.CSSProperties = {
    width: size,
    height: size,
    objectFit: 'contain',
    filter: glow
      ? 'drop-shadow(0 0 6px rgba(192,24,24,0.55)) drop-shadow(0 0 18px rgba(192,24,24,0.25))'
      : undefined,
  };

  if (animate) {
    return (
      <motion.img
        src={straightLogo}
        alt="Khanda"
        className={`animate-divine-breathe ${className}`}
        style={style}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      />
    );
  }

  return (
    <img
      src={straightLogo}
      alt="Khanda"
      className={className}
      style={style}
    />
  );
}
