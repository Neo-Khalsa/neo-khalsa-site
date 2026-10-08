import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ParticleField } from '../components/ParticleField';
import { KhandaSymbol } from '../components/KhandaSymbol';
import { MANIFESTO } from './manifestoContent';
import type { Block } from './manifestoContent';

const PDF = '/khalistan-manifesto.pdf';
const EASE = [0.25, 0.1, 0.25, 1] as const;

/* The source is Markdown-flavoured: *single* is the author's emphasis,
   **double** his strong emphasis. Rendered rather than stripped so the
   Gurmukhi transliterations keep the italics he gave them. */
function Inline({ text }: { text: string }) {
  const parts = useMemo(
    () => text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean),
    [text],
  );
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith('**') && p.endsWith('**')) {
          return (
            <strong key={i} className="font-normal" style={{ color: 'rgba(240,238,233,0.95)' }}>
              {p.slice(2, -2)}
            </strong>
          );
        }
        if (p.startsWith('*') && p.endsWith('*')) {
          return <em key={i} className="font-display-italic">{p.slice(1, -1)}</em>;
        }
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

const slug = (n: string) => `section-${n}`;

export function ManifestoPage() {
  const sections = useMemo(
    () => MANIFESTO.filter((b): b is Extract<Block, { t: 'h2' }> => b.t === 'h2'),
    [],
  );
  const [active, setActive] = useState(sections[0]?.n ?? '1');
  const bodyRef = useRef<HTMLDivElement>(null);

  /* Mark the section the reader is in, for the desktop rail. Observing the
     headings alone is enough and keeps this to eight observers. */
  useEffect(() => {
    const root = bodyRef.current;
    if (!root) return;
    const heads = Array.from(root.querySelectorAll('[data-section]'));
    if (!heads.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive((hit.target as HTMLElement).dataset.section!);
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 },
    );
    heads.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen relative grain-overlay">
      <ParticleField />

      <div className="relative z-10 max-w-[1500px] mx-auto px-5 md:px-10">

        {/* ── TITLE ──────────────────────────────────────────────── */}
        <section className="pt-28 md:pt-40 pb-10 md:pb-14">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: EASE }}>
            <div className="flex items-center gap-3 mb-8 md:mb-12">
              <KhandaSymbol size={14} glow={false} animate={false} className="opacity-25" />
              <span className="text-[9px] tracking-[0.45em] opacity-25 font-mono">WRITINGS · MANIFESTO</span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display leading-[0.92]"
              style={{ fontSize: 'clamp(3rem, 12vw, 8.5rem)' }}
            >
              The Khalistan
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display-italic leading-[0.92] text-glow-crimson"
              style={{ fontSize: 'clamp(3rem, 12vw, 8.5rem)' }}
            >
              Manifesto.
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.5, ease: EASE }}
              className="gold-divider w-28 md:w-44 mt-9 mb-7" style={{ transformOrigin: 'left' }}
            />

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.6 }}
              className="text-[9px] md:text-[10px] tracking-[0.3em] font-mono opacity-45"
              style={{ lineHeight: 2.2 }}
            >
              EKONKAR SINGH<br />
              A PRODUCT OF NEO KHALSA · SEPTEMBER 2023 · 25 MIN
            </motion.p>
          </motion.div>
        </section>

        {/* ── AUTHOR'S NOTE - the standfirst, not a box ──────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
          className="pb-14 md:pb-20"
        >
          <p className="font-display max-w-[46ch]" style={{ fontSize: 'clamp(1.5rem, 3.6vw, 2.35rem)', lineHeight: 1.42, opacity: 0.95 }}>
            Neo Khalsa supports Sikh sovereignty but is{' '}
            <span className="font-display-italic" style={{ color: '#e86a6a' }}>opposed to Khalistan</span>{' '}
            as the movement has come to be today.
          </p>
          <p className="text-[9px] md:text-[10px] tracking-[0.2em] font-mono opacity-40 mt-7 max-w-[62ch]" style={{ lineHeight: 2.1 }}>
            AUTHOR'S NOTE, 2026 — WRITTEN IN 2023, WHEN I WAS 24, AND ONLY A FIRST
            DRAFT. MANY OF MY VIEWS HAVE SINCE EVOLVED. IT IS PUBLISHED HERE AS A
            RECORD OF THINKING, NOT AS A STATEMENT OF PRESENT POSITION.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-10">
            <a
              href={PDF} download
              className="group inline-flex items-center gap-3 px-6 py-3.5 transition-all duration-300 hover:bg-[rgba(192,24,24,0.06)]"
              style={{ border: '1px solid rgba(192,24,24,0.4)' }}
            >
              <span className="text-[11px] tracking-[0.28em] font-mono opacity-80 group-hover:opacity-100">DOWNLOAD PDF</span>
              <span className="opacity-60 transition-transform duration-300 group-hover:translate-y-0.5" style={{ color: '#C01818' }}>↓</span>
            </a>
            <a
              href={`#${slug(sections[0]?.n ?? '1')}`}
              className="inline-flex items-center px-6 py-3.5 text-[11px] tracking-[0.28em] font-mono opacity-45 hover:opacity-80 transition-opacity"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            >
              BEGIN READING
            </a>
          </div>
        </motion.section>

        <div className="h-px w-full bg-line" />

        {/* ── BODY + RAIL ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_220px] gap-12 lg:gap-16 pt-14 md:pt-20">

          <div ref={bodyRef} className="min-w-0">
            {MANIFESTO.map((b, i) => {
              if (b.t === 'h2') {
                return (
                  <div
                    key={i}
                    id={slug(b.n)}
                    data-section={b.n}
                    className="flex items-baseline gap-5 md:gap-7 mt-20 md:mt-28 mb-8 first:mt-0 scroll-mt-28"
                  >
                    <span className="text-[11px] font-mono flex-shrink-0" style={{ color: '#C01818' }}>
                      {b.n.padStart(2, '0')}
                    </span>
                    <h2 className="font-display leading-[1.08]" style={{ fontSize: 'clamp(1.9rem, 4.6vw, 3rem)' }}>
                      {b.text}
                    </h2>
                  </div>
                );
              }
              if (b.t === 'h3') {
                return (
                  <h3
                    key={i}
                    className="font-display mt-12 md:mt-14 mb-4"
                    style={{ fontSize: 'clamp(1.25rem, 2.3vw, 1.5rem)', opacity: 0.92 }}
                  >
                    {b.text}
                  </h3>
                );
              }
              if (b.t === 'quote') {
                return (
                  <blockquote
                    key={i}
                    className="my-9 pl-6 md:pl-7"
                    style={{ borderLeft: '1px solid rgba(192,24,24,0.35)' }}
                  >
                    {b.lines.map((l, k) => (
                      <p
                        key={k}
                        className="font-display-italic"
                        style={{
                          fontSize: k === 0 ? 'clamp(1.15rem, 2.4vw, 1.4rem)' : 'clamp(1rem, 2vw, 1.15rem)',
                          lineHeight: 1.5,
                          opacity: k === 0 ? 0.78 : 0.5,
                          marginTop: k === 0 ? 0 : '0.45rem',
                        }}
                      >
                        {l}
                      </p>
                    ))}
                  </blockquote>
                );
              }
              return (
                <p
                  key={i}
                  className="max-w-[62ch] mb-6"
                  style={{ fontSize: 'clamp(1rem, 1.9vw, 1.1rem)', lineHeight: 1.85, opacity: 0.76 }}
                >
                  <Inline text={b.text} />
                </p>
              );
            })}
          </div>

          {/* section rail - desktop only, sticky beside the text */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-[9px] tracking-[0.4em] font-mono opacity-22 mb-5">CONTENTS</p>
              <nav className="flex flex-col gap-3">
                {sections.map((s) => {
                  const on = s.n === active;
                  return (
                    <a
                      key={s.n}
                      href={`#${slug(s.n)}`}
                      className="group flex items-baseline gap-3 transition-opacity duration-300"
                      style={{ opacity: on ? 1 : 0.3 }}
                    >
                      <span className="text-[9px] font-mono flex-shrink-0 w-4" style={{ color: on ? '#C01818' : undefined }}>
                        {s.n.padStart(2, '0')}
                      </span>
                      <span className="text-[12px] leading-snug group-hover:opacity-100 transition-opacity">
                        {s.text}
                      </span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>
        </div>

        {/* ── CLOSING ────────────────────────────────────────────── */}
        <section className="py-20 md:py-28">
          <div className="crimson-divider mb-10 md:mb-12" />
          <div className="flex flex-wrap items-center justify-between gap-6">
            <p className="text-[9px] tracking-[0.3em] font-mono opacity-30">
              THE KHALISTAN MANIFESTO · EKONKAR SINGH · MMXXIII
            </p>
            <a
              href={PDF} download
              className="group inline-flex items-center gap-3 text-[10px] tracking-[0.28em] font-mono opacity-50 hover:opacity-90 transition-opacity"
            >
              DOWNLOAD PDF
              <span style={{ color: '#C01818' }}>↓</span>
            </a>
          </div>
        </section>

        {/* Footer */}
        <div className="flex items-center justify-between pb-12 text-[9px] font-mono tracking-[0.25em] opacity-15 border-t hairline pt-8">
          <span>NEO KHALSA</span>
          <span>WRITINGS · MMXXVI</span>
        </div>
      </div>
    </div>
  );
}
