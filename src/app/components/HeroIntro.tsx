import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'motion/react';

/* ────────────────────────────────────────────────────────────────────────────
   The landing entrance: embers caught on a tightening spiral, falling into the
   mark. Desktop only - phones keep the plain reveal - and full length once per
   session, short thereafter.
   ──────────────────────────────────────────────────────────────────────────── */

const SEEN_KEY = 'nk:intro-seen';
const ORIGIN_TOP = '42%';

/* deterministic hash-noise: the same figure every time, no per-load lottery */
const rnd = (n: number) => {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

const smoothstep = (t: number) => t * t * (3 - 2 * t);

type Seed = { px: number[]; py: number[]; size: number; gold: boolean; delay: number };
type Field = { seeds: Seed[]; times: number[]; dur: number };

type SpiralCfg = {
  count: number;
  rMin: number;          // start radius, as a fraction of the long viewport edge
  rMax: number;
  turns: [number, number];
  flat: number;          // y squash - low reads as a disc seen on edge
  decay: number;         // e-folds of radius covered over the run
  momentum: number;      // angular rate ~ 1/r^momentum (2 = strict, 0 = even)
  tilt: number;
  dur: number;
  spread: number;        // stagger on entry
  samples: number;
  size: [number, number];
};

/* A logarithmic spiral - the curve that holds a constant angle to the radius,
   so it has no kink anywhere along it. It is sampled finely and evenly in
   ANGLE, which keeps the turn between consecutive segments to a few degrees the
   whole way round, and the pacing is carried by the `times` array rather than
   by easing, so nothing has to be eased per-segment and nothing lurches.
   `times` depends only on the shape of the run, not on the individual ember,
   so it is built once and shared. */
function makeSpiral(cfg: SpiralCfg): Field {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const long = Math.max(w, h);
  const N = cfg.samples;
  const K = cfg.momentum * cfg.decay;
  const denom = 1 - Math.exp(-K);

  const times = Array.from({ length: N + 1 }, (_, j) =>
    smoothstep((1 - Math.exp((-K * j) / N)) / denom),
  );
  times[0] = 0;
  times[N] = 1;

  const [sMin, sMax] = cfg.size;
  const ct = Math.cos(cfg.tilt);
  const st = Math.sin(cfg.tilt);

  const seeds = Array.from({ length: cfg.count }, (_, i) => {
    const R = (cfg.rMin + rnd(i) * (cfg.rMax - cfg.rMin)) * long;
    const th0 = rnd(i + 61) * Math.PI * 2;
    const sweep = (cfg.turns[0] + rnd(i + 71) * (cfg.turns[1] - cfg.turns[0])) * Math.PI * 2;

    const px: number[] = [];
    const py: number[] = [];
    for (let j = 0; j <= N; j++) {
      const u = j / N;
      const r = R * Math.exp(-cfg.decay * u);
      const th = th0 + sweep * u;
      const x = Math.cos(th) * r;
      const y = Math.sin(th) * r * cfg.flat;
      px.push(x * ct - y * st);
      py.push(x * st + y * ct);
    }
    /* land exactly on the mark - the residual radius here is under a pixel */
    px[N] = 0;
    py[N] = 0;

    return {
      px, py,
      size: sMin + rnd(i + 13) * (sMax - sMin),
      gold: rnd(i + 29) > 0.85,
      delay: 0.08 + rnd(i + 37) * cfg.spread,
    };
  });

  return { seeds, times, dur: cfg.dur };
}

function Embers({ field }: { field: Field }) {
  const { seeds, times, dur } = field;
  return (
    <>
      {seeds.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: '50%', top: ORIGIN_TOP, width: s.size, height: s.size,
            background: s.gold ? 'rgba(196,164,73,0.92)' : 'rgba(192,24,24,0.92)',
            boxShadow: s.gold ? '0 0 7px rgba(196,164,73,0.65)' : '0 0 7px rgba(192,24,24,0.75)',
          }}
          initial={{ x: s.px[0], y: s.py[0], opacity: 0, scale: 1 }}
          animate={{ x: s.px, y: s.py, opacity: [0, 0.9, 1, 0], scale: 0.32 }}
          transition={{
            x: { duration: dur, delay: s.delay, ease: 'linear', times },
            y: { duration: dur, delay: s.delay, ease: 'linear', times },
            scale: { duration: dur, delay: s.delay, ease: 'easeIn' },
            opacity: { duration: dur + 0.3, delay: s.delay, times: [0, 0.08, 0.9, 1] },
          }}
        />
      ))}
    </>
  );
}

/* Pressure at the centre: builds, holds through the landing, then clears -
   it must not leave a red disc parked behind the mark. */
function Charge({
  delay, build, hold, fade,
}: { delay: number; build: number; hold: number; fade: number }) {
  const total = build + hold + fade;
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: '50%', top: ORIGIN_TOP, width: 860, height: 860, marginLeft: -430, marginTop: -430,
        background: 'radial-gradient(circle, rgba(192,24,24,0.34) 0%, rgba(140,12,12,0.13) 42%, transparent 72%)',
        filter: 'blur(96px)',
      }}
      initial={{ scale: 0.2, opacity: 0 }}
      animate={{ scale: [0.2, 0.6, 1, 1.08, 1.3], opacity: [0, 0.28, 0.5, 0.42, 0] }}
      transition={{
        duration: total,
        delay,
        times: [0, (build * 0.55) / total, build / total, (build + hold) / total, 1],
        ease: 'easeOut',
      }}
    />
  );
}

function Flash({ at }: { at: number }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: '50%', top: ORIGIN_TOP, width: 520, height: 520, marginLeft: -260, marginTop: -260,
        background: 'radial-gradient(circle, rgba(255,226,205,0.62) 0%, rgba(192,24,24,0.26) 38%, transparent 70%)',
        filter: 'blur(30px)',
      }}
      initial={{ scale: 0.12, opacity: 0 }}
      animate={{ scale: [0.12, 0.75, 1.8], opacity: [0, 0.8, 0] }}
      transition={{ duration: 1.7, delay: at, times: [0, 0.26, 1], ease: 'easeOut' }}
    />
  );
}

function Swirl({
  dur, spin, flat, opacity,
}: { dur: number; spin: number; flat: number; opacity: number }) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: '50%', top: ORIGIN_TOP, width: '160vw', height: '160vw',
        marginLeft: '-80vw', marginTop: '-80vw',
        background:
          'conic-gradient(from 0deg, transparent 0deg, rgba(192,24,24,0.10) 60deg, transparent 140deg, rgba(192,24,24,0.07) 220deg, transparent 320deg)',
        filter: 'blur(70px)',
      }}
      initial={{ rotate: 0, opacity: 0, scale: 1.1, scaleY: flat }}
      animate={{ rotate: spin, opacity: [0, opacity, opacity, 0], scale: 0.55 }}
      transition={{
        rotate: { duration: dur, ease: [0.5, 0, 0.4, 1] },
        scale: { duration: dur, ease: [0.5, 0, 0.4, 1] },
        opacity: { duration: dur + 0.2, times: [0, 0.16, 0.78, 1] },
      }}
    />
  );
}

/* ── The two cuts ────────────────────────────────────────────────────────── */
const FULL = {
  spiral: {
    count: 58, rMin: 0.30, rMax: 0.70, turns: [1.5, 1.9] as [number, number],
    flat: 0.34, tilt: -0.12, decay: 6.4, momentum: 0.5,
    dur: 4.0, spread: 0.55, samples: 110, size: [2.4, 5.6] as [number, number],
  },
  swirl: { dur: 5.0, spin: 420, flat: 0.4, opacity: 0.75 },
  charge: { delay: 2.2, build: 2.2, hold: 1.3, fade: 1.8 },
  flash: 4.3,
  t0: 4.5,
  pace: 1.35,
};

/* Same figure, fewer threads, a third of the length - for every visit after
   the first in a session. */
const SHORT = {
  spiral: {
    count: 30, rMin: 0.22, rMax: 0.52, turns: [1.0, 1.3] as [number, number],
    flat: 0.34, tilt: -0.12, decay: 6.4, momentum: 0.5,
    dur: 1.15, spread: 0.2, samples: 70, size: [2.2, 5.0] as [number, number],
  },
  swirl: { dur: 1.5, spin: 200, flat: 0.4, opacity: 0.5 },
  charge: { delay: 0.35, build: 0.7, hold: 0.35, fade: 0.6 },
  flash: 1.0,
  t0: 1.2,
  pace: 0.95,
};

type Mode = 'full' | 'short' | 'none';

function pickMode(): Mode {
  if (typeof window === 'undefined') return 'none';
  /* CSS reduced-motion rules cannot stop a JS-driven animation, so bail here */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'none';
  /* desktop only - phones keep the plain reveal */
  if (!window.matchMedia('(min-width: 768px)').matches) return 'none';
  try {
    return sessionStorage.getItem(SEEN_KEY) ? 'short' : 'full';
  } catch {
    /* private browsing can throw on access - treat as a first visit */
    return 'full';
  }
}

export type HeroIntro = {
  /** when the mark should begin arriving */
  t0: number;
  /** multiplier on every hero beat, so slower intros get a slower reveal */
  pace: number;
  /** true when the visitor has asked for reduced motion - skip entrances */
  reduced: boolean;
  /** the ember stage, to drop inside the (relative, clipped) hero section */
  stage: ReactNode;
};

export function useHeroIntro(): HeroIntro {
  const [mode] = useState<Mode>(pickMode);

  /* Written in an effect, not in the initialiser: a render-phase write would
     make StrictMode's double-invoke flip the first visit straight to 'short'. */
  useEffect(() => {
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      /* no session storage available - every visit stays a first visit */
    }
  }, []);

  const cfg = mode === 'full' ? FULL : mode === 'short' ? SHORT : null;

  const field = useMemo(() => (cfg ? makeSpiral(cfg.spiral) : null), [cfg]);

  const stage =
    cfg && field ? (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
        <Swirl {...cfg.swirl} />
        <Embers field={field} />
        <Charge {...cfg.charge} />
        <Flash at={cfg.flash} />
      </div>
    ) : null;

  return {
    t0: cfg ? cfg.t0 : 0,
    pace: cfg ? cfg.pace : 1,
    reduced: mode === 'none' && typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    stage,
  };
}
