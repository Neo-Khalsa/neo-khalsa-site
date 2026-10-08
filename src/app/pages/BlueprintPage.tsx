import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import './blueprint.css';
import { ParticleField } from '../components/ParticleField';
import { KhandaSymbol } from '../components/KhandaSymbol';

/* Worker is bundled locally (no CDN) so the strict-CSP/offline case still works. */
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const PDF_URL = '/neo-khalsa-blueprint.pdf';

/* The file is image-heavy, so let pdf.js pull byte ranges for the pages actually
   in view instead of downloading the whole document up front. */
const PDF_OPTIONS = {
  disableAutoFetch: true,
  disableStream: false,
};

const ZOOM_STEPS = [1, 1.25, 1.5, 2, 2.5, 3];

export function BlueprintPage() {
  const [numPages, setNumPages] = useState(0);
  const [current, setCurrent] = useState(1);
  /* Pages currently near the viewport. Only these stay mounted: a rendered page
     is a full-resolution canvas (~13MB at fit, ~50MB at 200%), so keeping all
     sixteen alive would run to hundreds of megabytes and crash weaker devices. */
  const [activated, setActivated] = useState<Set<number>>(() => new Set([0]));
  /* Real width/height ratio per page, so unmounted placeholders reserve exactly
     the right height and nothing jumps as pages mount and unmount. */
  const [ratios, setRatios] = useState<number[]>([]);
  const [width, setWidth] = useState(900);
  /* Zoom multiplier. The document mixes portrait pages with much wider landscape
     spreads; at fit-to-width the spreads render below their design size and the
     small labels become unreadable, so the reader needs a way past 100%. */
  const [zoom, setZoom] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* Render pages at the container's width, capped for very large screens */
  useEffect(() => {
    const measure = () => {
      const w = shellRef.current?.clientWidth ?? 900;
      setWidth(Math.min(w, 1100));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  /* One scroll pass drives both the page counter and which pages get mounted.
     Measuring rects directly (rather than IntersectionObserver) keeps this
     working in any embedding context and is cheap at 16 pages. */
  useEffect(() => {
    if (!numPages) return;

    const sync = () => {
      const vh = window.innerHeight;
      // tighter window the further in we zoom, where each canvas costs several
      // times more: at 3x a single page is already ~100MB of bitmap
      const reach = vh * (zoom >= 2 ? 0.15 : zoom > 1 ? 0.5 : 1.25);
      const near = new Set<number>();
      let best = 1;
      let bestVisible = -1;

      pageRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.bottom > -reach && r.top < vh + reach) near.add(i);
        const visible = Math.min(r.bottom, vh) - Math.max(r.top, 0);
        if (visible > bestVisible) { bestVisible = visible; best = i + 1; }
      });

      if (!near.size) near.add(0);
      setCurrent(best);
      setActivated((prev) => {
        // replace rather than accumulate, so pages left behind release their canvas
        if (prev.size === near.size && [...near].every((i) => prev.has(i))) return prev;
        return near;
      });
    };

    sync();
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      window.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [numPages, zoom]);

  return (
    <div className="min-h-screen relative grain-overlay">
      <ParticleField />

      {/* ── HEADER ───────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-10">
        <section className="pt-28 md:pt-40 pb-12 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex items-center gap-3 mb-8 md:mb-12">
              <KhandaSymbol size={14} glow={false} animate={false} className="opacity-25" />
              <span className="text-[9px] tracking-[0.45em] opacity-25 font-mono">WRITINGS · BLUEPRINT</span>
            </div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '105%' }} animate={{ y: 0 }}
                transition={{ duration: 0.95, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display leading-[0.9]"
                style={{ fontSize: 'clamp(3.4rem, 13vw, 9rem)' }}
              >
                The
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '105%' }} animate={{ y: 0 }}
                transition={{ duration: 0.95, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-display-italic leading-[0.9] text-glow-crimson"
                style={{ fontSize: 'clamp(3.4rem, 13vw, 9rem)' }}
              >
                Blueprint.
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.55 }}
              className="font-display-italic max-w-xl opacity-60 mt-8"
              style={{ fontSize: 'clamp(1.1rem, 2.6vw, 1.55rem)', lineHeight: 1.5 }}
            >
              Sixteen pages: the objectives, the costs, and the order in which they are attempted.
            </motion.p>
          </motion.div>
        </section>
      </div>

      {/* ── READER ───────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1700px] mx-auto px-5 md:px-10 py-12 md:py-16">
        {/* Toolbar. Sticks below the site header so zoom stays reachable deep in
            the document - it was unusable once scrolled past. Page arrows are gone:
            scrolling already does that job, and the counter now reads as a live
            position indicator rather than a control. */}
        <div
          className="sticky top-16 md:top-20 z-20 flex flex-wrap items-center justify-between gap-2 sm:gap-4 py-2.5 mb-8 border-b hairline"
          style={{ background: 'rgba(10,10,10,0.94)' }}
        >
          <div className="flex items-center gap-4">
            <span className="text-[9px] tracking-[0.35em] font-mono opacity-25">
              {numPages ? `PAGE ${String(current).padStart(2, '0')} / ${String(numPages).padStart(2, '0')}` : 'LOADING'}
            </span>
          </div>

          {/* Zoom - the landscape spreads need more than fit-to-width to be read.
              A stepper rather than a row of presets: it offers more levels without
              filling the toolbar, which matters on narrow screens. */}
          {numPages > 0 && (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-[9px] tracking-[0.35em] font-mono opacity-25 mr-1">ZOOM</span>
              <button
                onClick={() => setZoom((z) => ZOOM_STEPS[Math.max(0, ZOOM_STEPS.indexOf(z) - 1)])}
                disabled={zoom === ZOOM_STEPS[0]}
                aria-label="Zoom out"
                className="px-2.5 sm:px-3 py-1.5 text-[10px] font-mono tracking-wider transition-all disabled:opacity-15 hover:bg-[rgba(192,24,24,0.08)]"
                style={{ border: '1px solid rgba(192,24,24,0.28)' }}
              >−</button>
              <button
                onClick={() => setZoom(1)}
                aria-label="Reset zoom to fit"
                className="px-3 py-1.5 text-[10px] font-mono tracking-wider transition-all hover:bg-[rgba(192,24,24,0.08)] min-w-[54px] sm:min-w-[62px]"
                style={{
                  border: '1px solid rgba(192,24,24,0.28)',
                  background: zoom > 1 ? 'rgba(192,24,24,0.14)' : 'transparent',
                  opacity: zoom > 1 ? 1 : 0.55,
                }}
              >{zoom === 1 ? 'FIT' : `${Math.round(zoom * 100)}%`}</button>
              <button
                onClick={() => setZoom((z) => ZOOM_STEPS[Math.min(ZOOM_STEPS.length - 1, ZOOM_STEPS.indexOf(z) + 1)])}
                disabled={zoom === ZOOM_STEPS[ZOOM_STEPS.length - 1]}
                aria-label="Zoom in"
                className="px-2.5 sm:px-3 py-1.5 text-[10px] font-mono tracking-wider transition-all disabled:opacity-15 hover:bg-[rgba(192,24,24,0.08)]"
                style={{ border: '1px solid rgba(192,24,24,0.28)' }}
              >+</button>
            </div>
          )}

          <a
            href={PDF_URL} download
            className="group inline-flex items-center gap-3 px-4 py-2 transition-all duration-300 hover:bg-[rgba(192,24,24,0.06)]"
            style={{ border: '1px solid rgba(192,24,24,0.4)' }}
          >
            <span className="text-[10px] tracking-[0.3em] font-mono opacity-80 group-hover:opacity-100">
              <span className="hidden sm:inline">DOWNLOAD </span>PDF
            </span>
            <span className="opacity-60 transition-transform duration-300 group-hover:translate-y-0.5" style={{ color: '#C01818' }}>↓</span>
          </a>
        </div>

        {/* Pages */}
        <div ref={shellRef}>
          {error ? (
            <div className="py-20 text-center">
              <p className="text-sm opacity-50 mb-4">The document could not be displayed in your browser.</p>
              <a href={PDF_URL} download className="text-[11px] tracking-[0.3em] font-mono" style={{ color: '#C01818' }}>
                DOWNLOAD IT INSTEAD →
              </a>
            </div>
          ) : (
            <Document
              file={PDF_URL}
              options={PDF_OPTIONS}
              onLoadSuccess={async (pdf) => {
                setNumPages(pdf.numPages);
                // page sizes vary (portrait pages and wider landscape spreads),
                // so read each one to size its placeholder correctly
                const rs: number[] = [];
                for (let i = 1; i <= pdf.numPages; i++) {
                  const v = (await pdf.getPage(i)).getViewport({ scale: 1 });
                  rs.push(v.width / v.height);
                }
                setRatios(rs);
              }}
              onLoadError={(e) => setError(e.message)}
              loading={
                <div className="py-20 text-center text-[9px] tracking-[0.35em] font-mono opacity-25">
                  OPENING THE BLUEPRINT
                </div>
              }
            >
              {Array.from({ length: numPages }, (_, i) => (
                <div
                  key={i}
                  ref={(el) => { pageRefs.current[i] = el; }}
                  className="mb-8 md:mb-12 scroll-mt-24"
                >
                  {/* Zoomed pages exceed the container, so they scroll inside their
                      own rail rather than pushing the page layout sideways. */}
                  <div className={zoom > 1 ? 'overflow-x-auto' : ''}>
                    <div className="flex flex-col items-center" style={{ width: width * zoom, margin: '0 auto' }}>
                      {activated.has(i) ? (
                        <Page
                          pageNumber={i + 1}
                          width={width * zoom}
                          // At fit, honour the display's pixel ratio so small type
                          // stays crisp. Once zoomed the page is already being drawn
                          // large, and letting a retina screen double the canvas on
                          // top of that quadruples memory for no visible gain.
                          devicePixelRatio={zoom > 1 ? 1 : undefined}
                          renderAnnotationLayer
                          renderTextLayer
                          loading={
                            <div
                              className="flex items-center justify-center"
                              style={{ width: width * zoom, height: (width * zoom) / (ratios[i] ?? 0.714), background: '#101010', border: '1px solid rgba(255,255,255,0.06)' }}
                            >
                              <span className="text-[9px] tracking-[0.35em] font-mono opacity-20">
                                {String(i + 1).padStart(2, '0')}
                              </span>
                            </div>
                          }
                        />
                      ) : (
                        <div
                          className="flex items-center justify-center"
                          style={{ width: width * zoom, height: (width * zoom) / (ratios[i] ?? 0.714), background: '#101010', border: '1px solid rgba(255,255,255,0.06)' }}
                        >
                          <span className="text-[9px] tracking-[0.35em] font-mono opacity-20">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="mt-3 text-center text-[8px] tracking-[0.35em] font-mono opacity-20">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                </div>
              ))}
            </Document>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="flex items-center justify-between pb-12 text-[9px] font-mono tracking-[0.25em] opacity-15 border-t hairline pt-8">
          <span>NEO KHALSA</span>
          <span>BLUEPRINT · MMXXVI</span>
        </div>
      </div>
    </div>
  );
}
