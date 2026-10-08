import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import logoImage from '../../assets/75c40697214f907eef38b05581e8d850d6220130.webp';

/* iPhone Safari (not the Chrome/Firefox/Edge shells) anchors pinned bars below
   the status-bar strip, leaving page content visible above the bar. Make the
   bar itself ~70px taller there: its top edge is raised and the content padded
   back down, so the dark band covers the strip while logo/menu stay put. */
const IOS_SAFARI_BAR_EXTRA =
  typeof navigator !== 'undefined' &&
  /iP(hone|ad|od)/.test(navigator.userAgent) &&
  !/CriOS|FxiOS|EdgiOS|OPiOS/.test(navigator.userAgent)
    ? 70
    : 0;

/* The numbered spine of the site. Long-form documents are deliberately not in
   here - seven large items already overflowed short laptops once, and a
   manifesto is a different kind of thing from a section. */
const MENU_ITEMS = [
  { path: '/',             num: '00', label: 'Home'         },
  { path: '/mission',      num: '01', label: 'Mission'      },
  { path: '/projects',     num: '02', label: 'Projects'     },
  { path: '/spaces',       num: '03', label: 'Spaces'       },
  { path: '/get-involved', num: '04', label: 'Get Involved' },
  { path: '/contact',      num: '05', label: 'Contact'      },
];

const DOCUMENTS = [
  { path: '/blueprint', label: 'The Blueprint',       short: 'BLUEPRINT' },
  { path: '/manifesto', label: 'Khalistan Manifesto', short: 'MANIFESTO' },
];

export function Navigation() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 24);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll while menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  /* Close on route change */
  useEffect(() => { setOpen(false); }, [location.pathname]);

  /* Close on Escape - listener only while the menu is open */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const current = MENU_ITEMS.find(i => i.path === location.pathname);
  const currentDoc = DOCUMENTS.find(d => d.path === location.pathname);

  return (
    <>
      {/* ── Top bar ─────────────────────────────────────────────────── */}
      {/* Sticky (not fixed): iOS Safari re-anchors fixed elements to the layout
          viewport during its toolbar animation, stranding the bar mid-page.
          The wrapper is h-0 so it takes no layout space - the bar inside simply
          overflows downward and overlays the hero, no negative margins needed. */}
      <header className="sticky top-0 z-[90] h-0">
        <div
          className="relative transition-colors duration-500"
          style={{
            // With viewport-fit=cover the page extends under the iPhone status
            // bar; this padding drops the bar's content below it while the bar's
            // own background covers the notch strip (otherwise iOS 26 Safari
            // paints that strip with a glassy smear of page content).
            // Raise the bar's top edge by the extra amount and pad the content
            // back down: the band gets taller upward, logo/menu don't move,
            // and the bottom edge stays where it was.
            top: IOS_SAFARI_BAR_EXTRA ? -IOS_SAFARI_BAR_EXTRA : undefined,
            paddingTop: `calc(env(safe-area-inset-top, 0px) + ${IOS_SAFARI_BAR_EXTRA}px)`,
            // Near-solid instead of backdrop-blur: iOS Safari samples a stale
            // snapshot for backdrop-filter on pinned elements during its
            // address-bar animation. A solid fill avoids the WebKit glitch.
            background: scrolled && !open ? 'rgba(10,10,10,0.96)' : 'transparent',
            borderBottom: scrolled && !open ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          }}
        >
          {/* Glitch shield: if Safari still opens a gap above the bar mid-animation,
              this solid bleed (one viewport tall, normally entirely off-screen)
              shows page-black instead of misplaced content. */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 pointer-events-none"
            style={{ bottom: '100%', height: '100vh', background: '#0a0a0a' }}
          />
          <div className="flex items-center justify-between px-5 md:px-10 h-16 md:h-20 max-w-[1700px] mx-auto">
          <Link to="/" aria-label="Neo Khalsa - Home" className="flex items-center gap-3">
            <img src={logoImage} alt="Neo Khalsa" className="h-7 md:h-8 w-auto opacity-95" />
            {/* Hidden while the menu is open so it doesn't overlap the large menu items */}
            <span className={`${open ? 'hidden' : 'hidden sm:block'} text-[10px] tracking-[0.35em] font-mono opacity-30`}>
              NEO KHALSA
            </span>
          </Link>

          <div className="flex items-center gap-6">
            {current && current.path !== '/' && (
              <span className="hidden md:block text-[9px] tracking-[0.4em] font-mono opacity-25">
                {current.num} · {current.label.toUpperCase()}
              </span>
            )}
            {currentDoc && (
              <span className="hidden md:block text-[9px] tracking-[0.4em] font-mono opacity-25">
                WRITINGS · {currentDoc.short}
              </span>
            )}
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="group flex items-center gap-3 py-3 pl-3 -mr-1"
            >
              <span className="text-[10px] tracking-[0.35em] font-mono opacity-55 group-hover:opacity-100 transition-opacity">
                {open ? 'CLOSE' : 'MENU'}
              </span>
              <span className="relative w-5 h-3 flex flex-col justify-between">
                <span
                  className="block h-px w-full bg-current transition-transform duration-300"
                  style={{ transform: open ? 'translateY(5.5px) rotate(45deg)' : 'none', opacity: 0.85 }}
                />
                <span
                  className="block h-px w-full bg-current transition-transform duration-300"
                  style={{ transform: open ? 'translateY(-5.5px) rotate(-45deg)' : 'none', opacity: 0.85 }}
                />
              </span>
            </button>
          </div>
          </div>
        </div>
      </header>

      {/* ── Full-screen overlay menu ────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-[80] flex flex-col"
            style={{ background: 'rgba(10,10,10,0.985)' }}
          >
            {/* faint red bloom, top-right */}
            <div
              className="absolute pointer-events-none"
              style={{
                top: '-20%', right: '-15%', width: '60vw', height: '60vw',
                background: 'radial-gradient(circle, rgba(192,24,24,0.07) 0%, transparent 65%)',
              }}
            />

            {/* Desktop: two columns, documents in the otherwise empty right half.
                Mobile: stacked, documents as a quieter row underneath. */}
            <div className="flex-1 flex flex-col justify-center px-6 md:px-16 max-w-[1700px] mx-auto w-full">
              <div className="lg:grid lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-16 lg:items-center">

                <nav className="flex flex-col">
                  {MENU_ITEMS.map(({ path, num, label }, i) => {
                    const active = location.pathname === path;
                    return (
                      <motion.div
                        key={path}
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{ duration: 0.5, delay: 0.06 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Link
                          to={path}
                          className="group flex items-baseline gap-4 md:gap-8 py-1.5 md:py-2"
                        >
                          <span className="text-[10px] font-mono w-7 flex-shrink-0 transition-opacity"
                            style={{ color: active ? '#C01818' : undefined, opacity: active ? 0.9 : 0.25 }}>
                            {num}
                          </span>
                          <span
                            className={`font-display leading-none transition-all duration-300 ${
                              active ? 'text-glow-crimson' : 'opacity-65 group-hover:opacity-100'
                            }`}
                            // sized by height as well as width: the list must not
                            // overflow short laptop screens, which cannot scroll
                            style={{ fontSize: 'clamp(2.25rem, min(7vw, 8svh), 5rem)' }}
                          >
                            {label}
                          </span>
                          <span
                            className="hidden md:block text-2xl opacity-0 group-hover:opacity-60 transition-all duration-300 translate-x-0 group-hover:translate-x-2"
                            style={{ color: '#C01818' }}
                          >
                            →
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-9 pt-7 border-t hairline lg:mt-0 lg:pt-0 lg:border-t-0 lg:border-l lg:pl-14"
                >
                  <p className="text-[9px] tracking-[0.4em] font-mono opacity-25 mb-4 lg:mb-6">WRITINGS</p>

                  <div className="flex flex-row flex-wrap items-center gap-x-5 gap-y-2 lg:flex-col lg:items-start lg:gap-y-4">
                    {DOCUMENTS.map(({ path, label, short }) => {
                      const active = location.pathname === path;
                      return (
                        <Link
                          key={path}
                          to={path}
                          className="group inline-flex items-baseline gap-3 transition-opacity duration-300"
                          style={{ opacity: active ? 1 : 0.6 }}
                        >
                          <span
                            className="lg:hidden text-[11px] tracking-[0.2em] font-mono"
                            style={{ color: active ? '#C01818' : undefined }}
                          >
                            {short}
                          </span>
                          <span
                            className={`hidden lg:inline font-display leading-tight ${
                              active ? 'text-glow-crimson' : ''
                            }`}
                            style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.6rem)' }}
                          >
                            {label}
                          </span>
                          <span
                            className="hidden lg:inline text-base opacity-0 group-hover:opacity-60 transition-all duration-300 group-hover:translate-x-1"
                            style={{ color: '#C01818' }}
                          >
                            →
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>

              </div>
            </div>

            {/* Overlay footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="px-6 md:px-16 pb-8 md:pb-10 max-w-[1700px] mx-auto w-full"
            >
              <div className="h-px w-full mb-6" style={{ background: 'rgba(255,255,255,0.07)' }} />
              <div className="flex flex-wrap items-center justify-between gap-4 text-[9px] md:text-[10px] tracking-[0.3em] font-mono">
                <a href="mailto:neokhalsaofficial@gmail.com" className="opacity-35 hover:opacity-80 transition-opacity">
                  NEOKHALSAOFFICIAL@GMAIL.COM
                </a>
                <a href="https://instagram.com/neokhalsa" target="_blank" rel="noopener noreferrer" className="opacity-35 hover:opacity-80 transition-opacity">
                  @NEOKHALSA
                </a>
                <span className="opacity-20">EST. MMXX</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
