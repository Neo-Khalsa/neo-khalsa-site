import { motion } from "motion/react";
import { Link } from "react-router-dom";
import missionImage from "../../assets/4c82dfbc2bfb2978f11914e22f7c49f4f06e2381.webp";
import { ParticleField } from './ParticleField';
import { KhandaSymbol } from './KhandaSymbol';

const TIMELINE = [
  { year: '2026', sub: 'PROJECT · VOL I', title: 'Neo Khalsa Koans',      status: 'AVAILABLE',      active: true,  path: '/projects' },
  { year: '2027', sub: 'PROJECT · VOL I', title: 'Literary Genesis',      status: 'IN DEVELOPMENT', active: false, path: '/projects' },
  { year: '2028', sub: 'PROJECT · VOL I', title: 'Sikh Anime',            status: 'UPCOMING',       active: false, path: '/projects' },
  { year: '2030', sub: 'SPACE · VOL II',  title: 'The Akhara Opens',      status: 'BUILDING',       active: false, path: '/spaces'   },
  { year: '2035', sub: 'MILESTONE',       title: 'University & Gurdwaras', status: 'HORIZON',        active: false, path: '/spaces'   },
];

const STATEMENT: { text: string; italic?: boolean }[] = [
  { text: 'The Panth does not' },
  { text: 'lack conviction.' },
  { text: 'It lacks the means', italic: true },
  { text: 'to act on it.', italic: true },
];

export function MissionSection() {
  return (
    <div className="relative grain-overlay">
      <ParticleField />

      {/* ════════════════════════════════════════════════════
          § 1 - STATEMENT HERO
      ════════════════════════════════════════════════════ */}
      <section
        className="relative z-10 flex flex-col justify-end pb-14 md:pb-20 px-5 md:px-10 lg:px-16 pt-28 md:pt-40 overflow-hidden"
        style={{ minHeight: '92svh' }}
      >
        {/* Faint background numeral */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block font-display"
          style={{ fontSize: '30vw', lineHeight: 1, opacity: 0.03, color: 'white' }}
          aria-hidden="true"
        >
          01
        </div>

        {/* Label row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-3 mb-12 md:mb-16"
        >
          <KhandaSymbol size={14} glow={false} animate={false} className="opacity-25" />
          <span className="text-[9px] tracking-[0.45em] opacity-25 font-mono">01 · MISSION</span>
        </motion.div>

        {/* The statement - lines clip in from below */}
        <div className="max-w-6xl">
          {STATEMENT.map(({ text, italic }, i) => (
            <div key={text} className="overflow-hidden">
              <motion.h1
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}
                className={`block leading-[1.04] ${italic ? 'font-display-italic' : 'font-display'}`}
                style={{ fontSize: 'clamp(2.6rem, 9vw, 7rem)' }}
              >
                {text}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* Meta strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-12 md:mt-16 pt-6 text-[9px] md:text-[10px] tracking-[0.35em] font-mono opacity-25 border-t hairline"
        >
          {['EST. 2020', 'MEMBERS · 402', 'STATUS · ACTIVE', 'THREE DOMAINS'].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════
          § 2 - FULL-BLEED IMAGE
      ════════════════════════════════════════════════════ */}
      <section className="relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden"
          style={{ height: '60vw', maxHeight: '680px', minHeight: '320px' }}
        >
          <img
            src={missionImage}
            alt="Neo Khalsa"
            className="w-full h-full object-cover img-duotone"
            style={{ objectPosition: '50% 20%' }}
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, transparent 30%, transparent 60%, rgba(10,10,10,0.92) 100%)' }}
          />
          {/* Quote overlay */}
          <div className="absolute inset-0 flex items-center justify-center px-6 md:px-16">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative max-w-3xl px-6 md:px-14 py-10 md:py-14"
            >
              {/* legibility scrim - frosts the busy area, statue stays visible around it */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 70% 65% at center, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.78) 42%, rgba(8,8,8,0.32) 72%, transparent 100%)',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                  maskImage: 'radial-gradient(ellipse 70% 65% at center, black 55%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 70% 65% at center, black 55%, transparent 100%)',
                }}
              />
              <p
                className="relative text-center font-display-italic"
                style={{
                  fontSize: 'clamp(1.25rem, 3.4vw, 2.2rem)',
                  lineHeight: 1.45,
                  textShadow: '0 2px 18px rgba(0,0,0,1), 0 0 6px rgba(0,0,0,0.9)',
                }}
              >
                "Sikh institutions rarely fail for want of belief. They fail for want of money that answers to no one else."
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════
          § 3 - ORIGINS + TIMELINE
      ════════════════════════════════════════════════════ */}
      <section className="relative z-10 px-5 md:px-10 lg:px-16 py-20 md:py-32 max-w-[1700px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-0">

          {/* Left: Origins */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-8 pb-14 lg:pb-0 lg:pr-16"
          >
            <p className="text-[9px] tracking-[0.45em] opacity-22 font-mono">ORIGINS & VISION</p>

            <blockquote
              className="font-display-italic pl-5"
              style={{ fontSize: 'clamp(1.35rem, 2.6vw, 1.8rem)', lineHeight: 1.4, borderLeft: '2px solid rgba(192,24,24,0.5)' }}
            >
              "Small, well-chosen work pays for larger work. Each rung is climbed deliberately, until the whole structure moves."
            </blockquote>

            <div className="space-y-5 text-sm leading-relaxed opacity-60">
              <p>
                Neo Khalsa began as a forum for discourse around the E-Squared show. It became the
                place where arguments the rest of the Panth avoids were made in public, and stayed
                there long enough to be tested.
              </p>
              <p>
                Those arguments are now being built into things that exist - a book, an imprint, an
                animated series, and in time, buildings. Each is chosen partly for what it is, and
                partly for what it makes possible next.
              </p>
              <p className="italic opacity-80">
                The objectives fall into three domains: narrative influence, resource acquisition,
                and internal discipline.
              </p>
            </div>

            {/* Core strategy box */}
            <div
              className="relative overflow-hidden p-6 md:p-8"
              style={{ background: 'rgba(192,24,24,0.04)', border: '1px solid rgba(192,24,24,0.18)' }}
            >
              <div className="absolute inset-0 shimmer-overlay pointer-events-none" />
              <p className="text-[9px] tracking-[0.35em] opacity-25 mb-3 font-mono relative z-10">CORE STRATEGY</p>
              <p className="text-sm leading-relaxed opacity-65 italic relative z-10">
                "Donations cannot sustain serious work. The strategy is to build assets - capital, property, and people - that produce their own returns, and to spend them deliberately."
              </p>
            </div>
          </motion.div>

          {/* Vertical divider */}
          <div
            className="hidden lg:block w-px self-stretch"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(192,24,24,0.22) 20%, rgba(192,24,24,0.22) 80%, transparent)' }}
          />

          {/* Right: Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-0 lg:pl-16"
          >
            <p className="text-[9px] tracking-[0.45em] opacity-22 font-mono mb-8">TIMELINE · SELECT TO EXPLORE</p>

            {TIMELINE.map(({ year, sub, title, status, active, path }, i) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={path}
                  className="group flex items-start gap-5 md:gap-7 py-6 md:py-7 border-b transition-all duration-300 hover:px-2 md:hover:px-3 hover:bg-[rgba(192,24,24,0.025)]"
                  style={{ borderColor: active ? 'rgba(192,24,24,0.28)' : 'rgba(255,255,255,0.07)' }}
                >
                  <span
                    className={`font-display flex-shrink-0 leading-none transition-all ${
                      active ? 'text-glow-crimson opacity-95' : 'opacity-20 group-hover:opacity-45'
                    }`}
                    style={{ fontSize: 'clamp(2.4rem, 5vw, 3.4rem)' }}
                  >
                    {year}
                  </span>
                  <div className="pt-1 md:pt-2 flex-1">
                    <p className="text-[9px] tracking-[0.3em] font-mono mb-1.5" style={{ opacity: active ? 0.5 : 0.25 }}>
                      {sub} · {status}
                    </p>
                    <p className={`text-sm tracking-wider transition-opacity ${active ? 'opacity-90' : 'opacity-50 group-hover:opacity-85'}`}>{title}</p>
                    {active && (
                      <div className="flex items-center gap-2 mt-2">
                        <div className="sacred-dot" style={{ width: 6, height: 6 }} />
                        <span className="text-[9px] opacity-40 font-mono tracking-widest">NOW</span>
                      </div>
                    )}
                  </div>
                  <span
                    className="self-center text-lg md:text-xl flex-shrink-0 opacity-0 group-hover:opacity-70 group-hover:translate-x-1 transition-all duration-300"
                    style={{ color: '#C01818' }}
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
