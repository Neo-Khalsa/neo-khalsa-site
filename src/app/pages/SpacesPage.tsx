import { motion } from "motion/react";
import akharaImage from "../../assets/akhara.webp";
import universityImage from "../../assets/university.webp";
import gurdwarasImage from "../../assets/gurdwaras.webp";
import { ParticleField } from '../components/ParticleField';
import { KhandaSymbol } from '../components/KhandaSymbol';

/* ── Meta row ──────────────────────────────────────────────────────────── */
function MetaRow({ label, value, live }: { label: string; value: React.ReactNode; live?: boolean }) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b hairline">
      <span className="text-[9px] tracking-[0.3em] font-mono opacity-25">{label}</span>
      <div className="flex items-center gap-2">
        {live && <div className="sacred-dot" style={{ width: 5, height: 5 }} />}
        <span className="text-[11px] font-mono opacity-60">{value}</span>
      </div>
    </div>
  );
}

/* ── Chapter divider ───────────────────────────────────────────────────── */
function ChapterDivider({ numeral }: { numeral: string }) {
  return (
    <div className="relative z-10 flex items-center px-5 md:px-10 py-10 md:py-14 border-y hairline">
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(192,24,24,0.28), transparent)' }} />
      <span className="mx-6 md:mx-10 font-display text-4xl md:text-6xl" style={{ opacity: 0.22 }}>
        {numeral}
      </span>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(192,24,24,0.28))' }} />
    </div>
  );
}

/* ── Space section ─────────────────────────────────────────────────────── */
interface SpaceProps {
  bgNum: string;
  theme: string;
  image: string;
  imageAlt: string;
  darkMat?: boolean;
  flip?: boolean;
  title: [string, string];
  statement: string;
  meta: { label: string; value: React.ReactNode; live?: boolean }[];
  details: string[];
  status: string;
  phases: [string, string, string];
  years: [string, string, string];
  initial?: boolean;
}

function SpaceSection({ bgNum, theme, image, imageAlt, darkMat, flip, title, statement, meta, details, status, phases, years, initial }: SpaceProps) {
  const motionProps = initial
    ? { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] } }
    : { initial: { opacity: 0, y: 48 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] }, viewport: { once: true, margin: '-80px' } };

  const imageCol = (
    <div className="relative">
      {/* Giant chapter numeral */}
      <div
        className="absolute -top-8 md:-top-14 pointer-events-none select-none font-display"
        style={{ fontSize: '24vw', lineHeight: 1, opacity: 0.035, color: 'white', right: flip ? 'auto' : '-2vw', left: flip ? '-2vw' : 'auto' }}
        aria-hidden="true"
      >
        {bgNum}
      </div>
      {/* Image mat */}
      <motion.div
        className={`relative overflow-hidden group transition-all duration-700 ${darkMat ? 'p-4 md:p-7' : 'bg-white p-4 md:p-7'}`}
        style={darkMat
          ? { background: '#101010', border: '1px solid rgba(192,24,24,0.18)' }
          : { boxShadow: '0 0 0 1px rgba(192,24,24,0.12)' }
        }
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={image}
          alt={imageAlt}
          className={`w-full h-auto gpu-accelerate transition-all duration-700 group-hover:brightness-105 ${darkMat ? '' : 'border border-gray-200'}`}
          loading={initial ? 'eager' : 'lazy'}
          decoding="async"
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(192,24,24,0.06) 0%, transparent 60%)' }}
        />
      </motion.div>

      {/* Statement under image */}
      <div
        className="mt-4 p-4 md:p-5 relative overflow-hidden"
        style={{ borderLeft: '2px solid rgba(192,24,24,0.4)', background: 'rgba(192,24,24,0.03)' }}
      >
        <div className="absolute inset-0 shimmer-overlay pointer-events-none" />
        <p className="text-xs leading-relaxed opacity-60 italic relative z-10">"{statement}"</p>
      </div>

      {/* Phase track */}
      <div className="mt-5 grid grid-cols-3 gap-px">
        {phases.map((p, i) => (
          <div key={p} className="px-3 py-3.5 text-center" style={{ background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(192,24,24,0.18)' }}>
            <p className="font-display text-lg md:text-2xl opacity-25 leading-none mb-1.5">{years[i]}</p>
            <p className="text-[8px] tracking-[0.25em] font-mono opacity-35">{p}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const contentCol = (
    <div className="space-y-8 md:space-y-10">
      {/* Theme label */}
      <div className="flex items-center gap-3">
        <KhandaSymbol size={12} glow={false} animate={false} className="opacity-22" />
        <span className="text-[9px] tracking-[0.4em] opacity-22 font-mono">{theme}</span>
      </div>

      {/* Title - serif, second line italic */}
      <div>
        <h2 className="font-display leading-[0.95]" style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}>
          {title[0]}
        </h2>
        <h2 className="font-display-italic leading-[0.95]" style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}>
          {title[1]}
        </h2>
      </div>

      {/* Status badge */}
      <div
        className="inline-flex items-center gap-2.5 px-3.5 py-2"
        style={{ border: '1px solid rgba(192,24,24,0.28)', background: 'rgba(192,24,24,0.05)' }}
      >
        <div className="sacred-dot" style={{ width: 5, height: 5 }} />
        <span className="text-[9px] tracking-[0.3em] font-mono opacity-70">{status}</span>
      </div>

      {/* Meta */}
      <div className="space-y-0">
        {meta.map(({ label, value, live }) => (
          <MetaRow key={label} label={label} value={value} live={live} />
        ))}
      </div>

      {/* Details */}
      <div className="space-y-4 pt-2">
        <p className="text-[9px] tracking-[0.4em] opacity-20 font-mono">ABOUT THE SPACE</p>
        {details.map((para, i) => (
          <p key={i} className="text-sm leading-relaxed opacity-55">{para}</p>
        ))}
      </div>
    </div>
  );

  return (
    <motion.div {...motionProps} className="px-5 md:px-10 py-16 md:py-24 max-w-[1700px] mx-auto">
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-start ${flip ? 'lg:[&>*:first-child]:order-last' : ''}`}>
        {imageCol}
        {contentCol}
      </div>
    </motion.div>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────── */
export function SpacesPage() {
  return (
    <div className="min-h-screen relative grain-overlay">
      <ParticleField />

      {/* ── Header ───────────────────────────────────────────────── */}
      <section className="relative z-10 px-5 md:px-10 pt-28 md:pt-40 pb-10 md:pb-14 max-w-[1700px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-8 md:pb-10 border-b hairline"
        >
          <div>
            <p className="text-[9px] tracking-[0.45em] opacity-22 font-mono mb-5">03 · SPACES · VOLUME II</p>
            <h1 className="font-display leading-[0.92]" style={{ fontSize: 'clamp(3.4rem, 12vw, 9rem)' }}>Built</h1>
            <h1 className="font-display-italic leading-[0.92]" style={{ fontSize: 'clamp(3.4rem, 12vw, 9rem)' }}>Worlds</h1>
          </div>
          <div className="text-left md:text-right space-y-1 flex md:block items-center gap-4">
            <p className="font-display text-3xl md:text-5xl opacity-20">2028</p>
            <div className="h-px w-10 md:w-full" style={{ background: 'rgba(192,24,24,0.3)' }} />
            <p className="font-display text-3xl md:text-5xl opacity-20">2035</p>
          </div>
        </motion.div>
      </section>

      {/* Intro line */}
      <section className="relative z-10 px-5 md:px-10 pb-8 max-w-[1700px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display-italic max-w-3xl opacity-55"
          style={{ fontSize: 'clamp(1.1rem, 2.6vw, 1.6rem)', lineHeight: 1.45 }}
        >
          "Ideas that never take physical form remain opinions. These are the buildings that follow from the argument."
        </motion.p>
      </section>

      {/* ── SPACE I - THE AKHARA ─────────────────────────────────── */}
      <div className="relative z-10">
        <SpaceSection
          bgNum="I" theme="DISCOURSE & CREATIVE SPACE · SPACE I"
          image={akharaImage} imageAlt="The Akhara" darkMat
          title={['The', 'Akhara']}
          statement="A room where the strongest argument wins, and no committee decides in advance which one that is"
          meta={[
            { label: 'STATUS',   value: 'Contracting', live: true },
            { label: 'AREA',     value: '3,000 sq ft' },
            { label: 'LOCATION', value: 'Surrey' },
            { label: 'LAND',     value: '$2M' },
            { label: 'BUILD',    value: '$3M' },
            { label: 'OPENING',  value: '2030', live: true },
          ]}
          details={[
            'A lecture hall, a library, common areas, small galleries, a bookshop, and a working studio - roughly 3,000 square feet in Surrey, on about $2M of land with a $3M build.',
            'The gurdwara was meant to serve this function and largely no longer does. Committees set the terms, debate is managed rather than had, and younger members are given no space that takes their thinking seriously.',
            'The Akhara is governed by one rule that matters: ideas are tested openly and the better one prevails on its merits, not on who tabled it. That is difficult to guarantee and easy to lose, which is why the building exists separately from any existing institution.',
          ]}
          status="CONTRACTING · OPENS 2030"
          phases={['PLAN', 'PLANNING', 'BUILDING']}
          years={['2026', '2028', '2030']}
          initial
        />
      </div>

      <ChapterDivider numeral="II" />

      {/* ── SPACE II - NEO KHALSA UNIVERSITY ─────────────────────── */}
      <div className="relative z-10">
        <SpaceSection
          bgNum="II" theme="DISCIPLINE & FAÇADE · SPACE II"
          image={universityImage} imageAlt="Neo Khalsa University" flip
          title={['Neo Khalsa', 'University']}
          statement="What kind of mind emerges when Plato, Aristotle, and Kant are studied alongside Gurbani and the Sikh Gurus?"
          meta={[
            { label: 'PROGRAMME', value: 'Liberal Arts · Gurmat' },
            { label: 'CAMPUS',    value: '10 hectares' },
            { label: 'APPROACH',  value: 'Adaptive Reuse' },
            { label: 'STATUS',    value: 'Master Planning', live: true },
            { label: 'HORIZON',   value: '2035 +' },
          ]}
          details={[
            'Sikh educational institutions have stayed largely insular, teaching the tradition apart from the intellectual history that surrounds it. The proposal here is simple: teach Gurbani and the Sikh Gurus in the same room as Plato, Aristotle, and Kant, and see what kind of graduate that produces.',
            'The curriculum is deliberately cross-disciplinary, on the view that the divisions between subjects are administrative rather than real. Philosophy connects to kinesiology; kinesiology connects to urban design. The body is studied at close range in one, and at the scale of a city in the other - the same subject, examined from different distances.',
            'The precedent is the Anandpur darbar, which was open to scholars and poets regardless of where they came from. A campus of roughly 10 hectares, pursued through adaptive reuse. Faculty willing to teach this way will be harder to find than the site itself.',
          ]}
          status="MASTER PLANNING · VOLUME II"
          phases={['STUDY', 'DESIGN', 'BUILD']}
          years={['2027', '2030', '2035']}
        />
      </div>

      <ChapterDivider numeral="III" />

      {/* ── SPACE III - GURDWARAS OF THE MILLENIA ────────────────── */}
      <div className="relative z-10">
        <SpaceSection
          bgNum="III" theme="WESTERN MONUMENT · SPACE III"
          image={gurdwarasImage} imageAlt="Gurdwaras of the Millenia" darkMat
          title={['Gurdwaras of', 'the Millenia']}
          statement="The last project on the schedule, and the one every earlier project is paying for"
          meta={[
            { label: 'TYPOLOGY',  value: 'Monumental Gurdwara' },
            { label: 'OPERATION', value: '24 / 7' },
            { label: 'SITE',      value: '10 HA · Canada' },
            { label: 'STATUS',    value: 'Long-term' },
            { label: 'BUILD',     value: '2032 - 2036' },
          ]}
          details={[
            'A gurdwara in the West built to a standard of architecture no spiritual building on this continent currently meets, on a site of roughly 10 hectares, open around the clock and running services no ordinary public institution provides.',
            'Sikh building in the diaspora has been governed by cost and expedience for fifty years, and it shows. The claim being made here is that this was a choice, not a constraint, and that a community capable of Amritsar is capable of better.',
            'This is the furthest object on the schedule and the reason the earlier ones are sequenced as they are. Each project before it exists partly to make this one affordable.',
          ]}
          status="VISION · WESTERN MONUMENT · 2035"
          phases={['PLAN', 'PROJECT', 'BUILD']}
          years={['2029', '2030', '2035']}
        />
      </div>

      {/* Footer strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 px-5 md:px-10 py-10 text-[9px] font-mono tracking-[0.25em] opacity-15 border-t hairline">
        <span>NEO KHALSA</span>
        <span>VOLUME II · BUILT WORLDS · 2028-2035</span>
        <span>MMXXVI</span>
      </div>
    </div>
  );
}
