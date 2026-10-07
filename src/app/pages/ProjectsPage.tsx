import { motion } from "motion/react";
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import projectImage1 from "../../assets/9db7de1cffccd7b3bcecbc3271c23d56717dcbc4.webp";
import projectImage3 from "../../assets/f51d02d1d6fe32ecb948954f06c2b5e6d43a9472.webp";
import projectImage4 from "../../assets/litgen.webp";
import { ParticleField } from '../components/ParticleField';
import { KhandaSymbol } from '../components/KhandaSymbol';

/* ── Buy dropdown ──────────────────────────────────────────────────────── */
function BuyDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-[10px] tracking-[0.25em] font-mono transition-all hover:text-crimson py-2"
        style={{ opacity: open ? 1 : 0.55 }}
      >
        ACQUIRE
        <ChevronDown size={10} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div
          className="absolute right-0 top-full mt-2 min-w-[190px] animate-slideDown z-30 backdrop-blur-sm"
          style={{ background: 'rgba(14,14,14,0.97)', border: '1px solid rgba(192,24,24,0.28)' }}
        >
          <a
            href="https://www.houseofjouhal.com/product-page/neo-khalsa-koans"
            target="_blank" rel="noopener noreferrer"
            className="block px-5 py-4 text-[10px] tracking-wider opacity-55 hover:opacity-100 hover:bg-[rgba(192,24,24,0.07)] transition-all border-b hairline"
            onClick={() => setOpen(false)}
          >
            HOUSE OF JOUHAL →
          </a>
          <a
            href="https://www.amazon.ca/Khalsa-Koans-Ekonkar-Singh-Jouhal/dp/106743030X"
            target="_blank" rel="noopener noreferrer"
            className="block px-5 py-4 text-[10px] tracking-wider opacity-55 hover:opacity-100 hover:bg-[rgba(192,24,24,0.07)] transition-all border-b hairline"
            onClick={() => setOpen(false)}
          >
            AMAZON CANADA →
          </a>
          <a
            href="https://www.amazon.co.uk/Khalsa-Koans-Ekonkar-Singh-Jouhal/dp/106743030X"
            target="_blank" rel="noopener noreferrer"
            className="block px-5 py-4 text-[10px] tracking-wider opacity-55 hover:opacity-100 hover:bg-[rgba(192,24,24,0.07)] transition-all border-b hairline"
            onClick={() => setOpen(false)}
          >
            AMAZON UK →
          </a>
          <a
            href="https://www.amazon.com/Khalsa-Koans-Ekonkar-Singh-Jouhal/dp/106743030X"
            target="_blank" rel="noopener noreferrer"
            className="block px-5 py-4 text-[10px] tracking-wider opacity-55 hover:opacity-100 hover:bg-[rgba(192,24,24,0.07)] transition-all"
            onClick={() => setOpen(false)}
          >
            AMAZON US →
          </a>
        </div>
      )}
    </div>
  );
}

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

/* ── Project section ───────────────────────────────────────────────────── */
interface ProjectProps {
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
  showBuy?: boolean;
  initial?: boolean;
}

function ProjectSection({ bgNum, theme, image, imageAlt, darkMat, flip, title, statement, meta, details, status, showBuy, initial }: ProjectProps) {
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
        {showBuy && (
          <div className="flex items-center justify-between py-1.5 border-b hairline">
            <span className="text-[9px] tracking-[0.3em] font-mono opacity-25">ACQUIRE</span>
            <BuyDropdown />
          </div>
        )}
      </div>

      {/* Details */}
      <div className="space-y-4 pt-2">
        <p className="text-[9px] tracking-[0.4em] opacity-20 font-mono">DETAILS</p>
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
export function ProjectsPage() {
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
            <p className="text-[9px] tracking-[0.45em] opacity-22 font-mono mb-5">02 · PROJECTS · VOLUME I</p>
            <h1 className="font-display leading-[0.92]" style={{ fontSize: 'clamp(3.4rem, 12vw, 9rem)' }}>Three</h1>
            <h1 className="font-display-italic leading-[0.92]" style={{ fontSize: 'clamp(3.4rem, 12vw, 9rem)' }}>Initiatives</h1>
          </div>
          <div className="text-left md:text-right space-y-1 flex md:block items-center gap-4">
            <p className="font-display text-3xl md:text-5xl opacity-20">2026</p>
            <div className="h-px w-10 md:w-full" style={{ background: 'rgba(192,24,24,0.3)' }} />
            <p className="font-display text-3xl md:text-5xl opacity-20">2028</p>
          </div>
        </motion.div>
      </section>

      {/* ── PROJECT I - KOANS ────────────────────────────────────── */}
      <div className="relative z-10">
        <ProjectSection
          bgNum="I" theme="ADAPTIVE TRUTH · PROJECT I"
          image={projectImage1} imageAlt="Neo Khalsa Koans"
          title={['Neo Khalsa', 'Koans']}
          statement="That Sikh philosophy and the universal ideas of mankind are, on inspection, the same ideas"
          meta={[
            { label: 'PUBLISHER', value: 'Neo Khalsa', live: true },
            { label: 'PAGES',     value: '273' },
            { label: 'EDITION',   value: 'First · 1,000 copies' },
            { label: 'FORMAT',    value: 'Cloth hardcover' },
            { label: 'RELEASE',   value: '2026', live: true },
          ]}
          details={[
            'A koan is a paradox that a reader cannot resolve by habit. Each one here is set against classical art drawn from archives across several centuries and cultures, so that the argument is made twice - once in language, once in image.',
            'Ekonkar Singh, who trained in both Art History and Philosophy, wrote and assembled the book. The pairing is the point: the claim is that Sikh thought and the wider inheritance of human philosophy arrive at the same conclusions, and that this is easier to show than to assert.',
            'Written and designed over two years, crowdfunded in full, and printed as a cloth hardcover on 157gsm stock. Released 2026.',
          ]}
          status="COMPLETE · CROWDFUNDED · AVAILABLE 2026"
          showBuy initial
        />
      </div>

      <ChapterDivider numeral="II" />

      {/* ── PROJECT II - ANIME ───────────────────────────────────── */}
      <div className="relative z-10">
        <ProjectSection
          bgNum="II" theme="WORLDWIDE AUDIENCE · PROJECT II"
          image={projectImage3} imageAlt="Sikh Anime" darkMat flip
          title={['Sikh', 'Anime']}
          statement="Written for people who have never heard of the Khalsa, and made well enough that they stay"
          meta={[
            { label: 'STUDIO',      value: 'TBD · Japan' },
            { label: 'EPISODES',    value: '26' },
            { label: 'CONCEPT ART', value: '$35,000' },
            { label: 'TRAILER',     value: '$200,000' },
            { label: 'STATUS',      value: 'Concept Art' },
            { label: 'RELEASE',     value: 'Late 2028' },
          ]}
          details={[
            'Sikhs uncover an ancient technology that runs on spiritual energy. The world wants it, and the wars that follow force a resistance to form. The structure is science fiction; the trials underneath it are historical.',
            'The audience is deliberately not the Panth. Most Sikh media is made for Sikhs and asks nothing of anyone else. This is written for viewers with no prior knowledge, on the assumption that a story strong enough to hold them will survive scrutiny from both directions.',
            'A sci-fi frame also sidesteps the factional divisions that make Sikh storytelling difficult to fund and easy to dismiss. Budgeted at $35,000 for concept art and $200,000 for a trailer, with a studio to be secured in Japan.',
          ]}
          status="CONCEPT ART · 2028"
        />
      </div>

      <ChapterDivider numeral="III" />

      {/* ── PROJECT III - LITERARY GENESIS ───────────────────────── */}
      <div className="relative z-10">
        <ProjectSection
          bgNum="III" theme="WRITTEN TRUTH · PROJECT III"
          image={projectImage4} imageAlt="Literary Genesis"
          title={['Literary', 'Genesis']}
          statement="A publishing house, because a tradition that stops writing eventually stops thinking"
          meta={[
            { label: 'IMPRINT',  value: 'Neo Khalsa', live: true },
            { label: 'FORM',     value: 'Essay · Translation' },
            { label: 'LANGUAGE', value: 'Punjabi · English' },
            { label: 'ORIGIN',   value: 'Surrey' },
            { label: 'FIRST',    value: '2027', live: true },
          ]}
          details={[
            'An imprint for original Sikh writing: essays, translation, and scholarship held to the standard applied to any serious text. Sikh publishing has largely become reprinting - the same editions reissued without editorial care, and little new work commissioned at all.',
            'Each volume places Gurbani and Sikh thought beside the texts they can be usefully argued against. Not to borrow authority from them, but because ideas only sharpen in contact with other ideas.',
            'The intended output is slow and cumulative: a small number of well-made books a decade from now that a reader can rely on.',
          ]}
          status="IN DEVELOPMENT · 2027"
        />
      </div>

      {/* Footer strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 px-5 md:px-10 py-10 text-[9px] font-mono tracking-[0.25em] opacity-15 border-t hairline">
        <span>NEO KHALSA</span>
        <span>THREE INITIATIVES · VOLUME I · 2026-2028</span>
        <span>MMXXVI</span>
      </div>
    </div>
  );
}
