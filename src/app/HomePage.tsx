import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ParticleField } from './components/ParticleField';
import { useHeroIntro } from './components/HeroIntro';
import logoWhite from '../assets/027354ce14dae85850c3c889442da6849aab7a08.webp';

const NAV_ROWS = [
  { path: '/mission',      num: '01', label: 'Mission',      desc: 'What we are building, and why'         },
  { path: '/projects',     num: '02', label: 'Projects',     desc: 'A book, an imprint, a series'          },
  { path: '/spaces',       num: '03', label: 'Spaces',       desc: 'An akhara, a university, a gurdwara'   },
  { path: '/get-involved', num: '04', label: 'Get Involved', desc: 'Funding, skills, collaboration'        },
  { path: '/blueprint',    num: '05', label: 'Blueprint',    desc: 'The full plan, page by page'           },
  { path: '/contact',      num: '06', label: 'Contact',      desc: 'Enquiries and correspondence'          },
];

export function HomePage() {
  const { t0, pace, reduced, stage } = useHeroIntro();

  return (
    <div className="min-h-screen relative grain-overlay">
      <ParticleField />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      {/* overflow-hidden clips the entrance so its embers cannot spill over
          the index section below */}
      <section
        className="relative z-10 flex flex-col items-center justify-center text-center px-5 overflow-hidden"
        style={{ minHeight: '100svh' }}
      >
        {stage}

        {/* Crimson bloom behind the mark - held back until the mark arrives,
            otherwise it sits in the middle of the entrance as a red disc */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            top: '50%', left: '50%', transform: 'translate(-50%, -58%)',
            width: 'min(90vw, 760px)', height: 'min(90vw, 760px)',
            background: 'radial-gradient(circle, rgba(192,24,24,0.085) 0%, transparent 62%)',
          }}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4 * pace, delay: t0 }}
        />

        {/* Logo */}
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 * pace, delay: t0, ease: [0.16, 1, 0.3, 1] }}
          className="mb-9 md:mb-12"
        >
          <img
            src={logoWhite}
            alt="Neo Khalsa"
            className="w-24 md:w-36 lg:w-44 h-auto animate-divine-breathe"
            style={{
              // cap by viewport height so short laptop screens don't overflow the hero
              maxWidth: '20svh',
              filter: 'drop-shadow(0 0 22px rgba(192,24,24,0.35)) drop-shadow(0 0 56px rgba(192,24,24,0.12))',
            }}
            loading="eager"
            fetchPriority="high"
          />
        </motion.div>

        {/* Wordmark - serif, clipped reveal */}
        <div className="overflow-hidden leading-none">
          <motion.h1
            initial={reduced ? false : { y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.0 * pace, delay: t0 + 0.25 * pace, ease: [0.16, 1, 0.3, 1] }}
            className="font-display leading-[0.92] tracking-[0.01em]"
            style={{ fontSize: 'clamp(3rem, min(17vw, 22svh), 12rem)' }}
          >
            NEO
          </motion.h1>
        </div>
        <div className="overflow-hidden leading-none">
          <motion.h1
            initial={reduced ? false : { y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.0 * pace, delay: t0 + 0.4 * pace, ease: [0.16, 1, 0.3, 1] }}
            className="font-display-italic leading-[0.92] tracking-[0.01em]"
            style={{ fontSize: 'clamp(3rem, min(17vw, 22svh), 12rem)' }}
          >
            Khalsa
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 * pace, delay: t0 + 1.0 * pace }}
          className="text-[9px] md:text-[10px] tracking-[0.45em] opacity-30 font-mono mt-10 md:mt-12"
        >
          NARRATIVE · RESOURCES · DISCIPLINE
        </motion.p>
        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 * pace, delay: t0 + 1.15 * pace }}
          className="text-[9px] tracking-[0.4em] opacity-15 font-mono mt-3"
        >
          EST. MMXX
        </motion.p>
      </section>

      {/* ── SECTION INDEX ───────────────────────────────────────────── */}
      <section className="relative z-10 pb-24 md:pb-32">

        {/* Index label */}
        <div className="max-w-[1700px] mx-auto px-5 md:px-10 pt-12 md:pt-16 pb-2">
          <p className="text-[9px] tracking-[0.45em] opacity-22 font-mono">INDEX</p>
        </div>

        {/* Navigation rows */}
        <div className="max-w-[1700px] mx-auto px-5 md:px-10">
          {NAV_ROWS.map(({ path, num, label, desc }, i) => (
            <motion.div
              key={path}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: '-30px' }}
            >
              <Link
                to={path}
                className="group flex items-center gap-4 md:gap-8 py-6 md:py-9 border-b hairline transition-all duration-300"
              >
                {/* Active bar on hover */}
                <div
                  className="w-0 group-hover:w-[3px] h-8 md:h-10 flex-shrink-0 transition-all duration-300"
                  style={{ background: 'rgba(192,24,24,0.85)', boxShadow: '0 0 10px rgba(192,24,24,0.45)' }}
                />

                <span className="text-[9px] font-mono opacity-20 w-6 flex-shrink-0 group-hover:opacity-50 group-hover:text-crimson transition-all">
                  {num}
                </span>

                <span
                  className="font-display flex-shrink-0 leading-none opacity-85 group-hover:opacity-100 transition-all duration-300"
                  style={{ fontSize: 'clamp(2.2rem, 7vw, 4.5rem)' }}
                >
                  {label}
                </span>

                <div className="flex-1 h-px hidden md:block opacity-0 group-hover:opacity-100 bg-line transition-opacity duration-500" />

                <div className="ml-auto flex items-center gap-5 md:gap-8 flex-shrink-0">
                  <span className="hidden lg:block text-xs tracking-wider opacity-25 group-hover:opacity-55 transition-opacity text-right max-w-[230px]">
                    {desc}
                  </span>
                  <span
                    className="text-xl md:text-2xl opacity-20 group-hover:opacity-80 group-hover:translate-x-1 transition-all duration-300"
                    style={{ color: '#C01818' }}
                  >
                    →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-between gap-4 mt-16 md:mt-24 px-5 md:px-10 text-[8px] md:text-[9px] font-mono tracking-[0.25em] opacity-15 max-w-[1700px] mx-auto"
        >
          <span>NEO KHALSA INITIATIVE</span>
          <span>EST. 2020</span>
          <span>MMXXVI</span>
        </motion.div>
      </section>
    </div>
  );
}
