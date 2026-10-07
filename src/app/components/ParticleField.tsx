import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number;
  size: number; speed: number;
  opacity: number; drift: number;
  color: string; life: number; maxLife: number;
}

const COLORS = [
  'rgba(255,255,255,',  // white ×6
  'rgba(255,255,255,',
  'rgba(255,255,255,',
  'rgba(255,255,255,',
  'rgba(255,255,255,',
  'rgba(255,255,255,',
  'rgba(192,24,24,',    // crimson ×3
  'rgba(192,24,24,',
  'rgba(192,24,24,',
  'rgba(196,164,73,',   // gold ×1
];

function makeParticle(w: number, h: number): Particle {
  const maxLife = 5000 + Math.random() * 9000;
  return {
    x: Math.random() * w,
    y: h + Math.random() * 30,
    size: Math.random() * 1.6 + 0.3,
    speed: Math.random() * 0.45 + 0.12,
    opacity: 0,
    drift: (Math.random() - 0.5) * 0.25,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    life: 0,
    maxLife,
  };
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ps = useRef<Particle[]>([]);
  const raf = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // CSS reduced-motion rules can't stop a canvas rAF loop - skip it entirely
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // seed particles across full viewport (reset first so re-runs don't double up)
    ps.current = [];
    for (let i = 0; i < 65; i++) {
      const p = makeParticle(canvas.width, canvas.height);
      p.y      = Math.random() * canvas.height;
      p.opacity = Math.random() * 0.45;
      p.life   = Math.random() * p.maxLife * 0.5;
      ps.current.push(p);
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ps.current.forEach((p, i) => {
        p.life += 16;
        p.y    -= p.speed;
        p.x    += p.drift;

        const ratio = p.life / p.maxLife;
        if (ratio < 0.12) p.opacity = Math.min(p.opacity + 0.012, 0.65);
        else if (ratio > 0.78) p.opacity = Math.max(p.opacity - 0.006, 0);

        // core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.opacity + ')';
        ctx.fill();

        // soft halo for larger particles
        if (p.size > 0.9) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = p.color + (p.opacity * 0.12) + ')';
          ctx.fill();
        }

        if (p.y < -10 || p.x < -30 || p.x > canvas.width + 30 || p.life >= p.maxLife) {
          ps.current[i] = makeParticle(canvas.width, canvas.height);
        }
      });

      raf.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.65 }}
    />
  );
}
