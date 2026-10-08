import { motion } from "motion/react";
import { ParticleField } from '../components/ParticleField';
import { KhandaSymbol } from '../components/KhandaSymbol';

const CHANNELS = [
  {
    num: '01',
    label: 'General Enquiries',
    desc: 'Questions about the projects, the plan, or anything on this site',
    href: 'mailto:neokhalsaofficial@gmail.com',
    display: 'neokhalsaofficial@gmail.com',
    external: false,
  },
  {
    num: '02',
    label: 'Collaborations',
    desc: 'Artists, scholars, translators, and institutions with something to propose',
    href: 'mailto:neokhalsaofficial@gmail.com',
    display: 'Reach out →',
    external: false,
  },
  {
    num: '03',
    label: 'Neo Khalsa Koans',
    desc: 'Book trade, bulk orders, and press for the 2026 publication',
    href: 'https://www.houseofjouhal.com/product-page/neo-khalsa-koans',
    display: 'houseofjouhal.com',
    external: true,
  },
  {
    num: '04',
    label: 'Social',
    desc: 'Project updates, and shorter arguments as they are written',
    href: 'https://instagram.com/neokhalsa',
    display: '@neokhalsa',
    external: true,
  },
];

export function ContactPage() {
  return (
    <div className="min-h-screen relative grain-overlay">
      <ParticleField />

      <div className="relative z-10 max-w-[1500px] mx-auto px-5 md:px-10">

        {/* ── HEADER ───────────────────────────────────────────── */}
        <section className="pt-28 md:pt-40 pb-14 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex items-center gap-3 mb-8 md:mb-12">
              <KhandaSymbol size={14} glow={false} animate={false} className="opacity-25" />
              <span className="text-[9px] tracking-[0.45em] opacity-25 font-mono">05 · CONTACT</span>
            </div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.95, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display leading-[0.9]"
                style={{ fontSize: 'clamp(4rem, 16vw, 11rem)' }}
              >
                Get in
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.95, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-display-italic leading-[0.9]"
                style={{ fontSize: 'clamp(4rem, 16vw, 11rem)' }}
              >
                touch.
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-8 md:mt-10 text-[9px] tracking-[0.4em] opacity-22 font-mono"
            >
              CORRESPONDENCE & COLLABORATION
            </motion.div>
          </motion.div>
        </section>

        {/* ── CHANNEL ROWS ─────────────────────────────────────── */}
        <section>
          <div className="h-px w-full bg-line" />

          {CHANNELS.map(({ num, label, desc, href, display, external }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: '-40px' }}
            >
              <a
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="group flex flex-col md:flex-row md:items-center gap-2 md:gap-0 py-7 md:py-9 border-b hairline transition-all duration-300 hover:bg-[rgba(192,24,24,0.025)] hover:px-3 md:hover:px-5"
              >
                <span className="text-[9px] font-mono opacity-20 md:w-12 flex-shrink-0 group-hover:opacity-50 group-hover:text-crimson transition-all">
                  {num}
                </span>

                <span
                  className="font-display md:w-80 lg:w-[26rem] flex-shrink-0 leading-tight opacity-85 group-hover:opacity-100 transition-all duration-300"
                  style={{ fontSize: 'clamp(1.6rem, 5vw, 2.6rem)' }}
                >
                  {label}
                </span>

                <span className="hidden lg:block flex-1 text-xs tracking-wider opacity-28 group-hover:opacity-50 transition-opacity px-8">
                  {desc}
                </span>

                <div className="hidden md:block flex-1 lg:flex-none h-px opacity-0 group-hover:opacity-100 bg-line transition-opacity mx-6" />

                <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
                  <span className="text-xs md:text-sm font-mono opacity-40 group-hover:opacity-85 transition-all duration-300">
                    {display}
                  </span>
                  <span
                    className="text-lg opacity-20 group-hover:opacity-70 group-hover:translate-x-1 transition-all duration-300"
                    style={{ color: '#C01818' }}
                  >
                    →
                  </span>
                </div>
              </a>
            </motion.div>
          ))}
        </section>

        {/* ── CLOSING QUOTE ────────────────────────────────────── */}
        <section className="py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="relative p-8 md:p-12 overflow-hidden"
              style={{ background: 'rgba(192,24,24,0.035)', border: '1px solid rgba(192,24,24,0.16)' }}
            >
              <div className="absolute inset-0 shimmer-overlay pointer-events-none" />
              {['top-0 left-0 border-t border-l', 'top-0 right-0 border-t border-r', 'bottom-0 left-0 border-b border-l', 'bottom-0 right-0 border-b border-r'].map(cls => (
                <div key={cls} className={`absolute w-5 h-5 ${cls}`} style={{ borderColor: 'rgba(192,24,24,0.4)' }} />
              ))}

              <KhandaSymbol size={20} glow={false} animate={false} className="opacity-20 mx-auto mb-6" />
              <p
                className="font-display-italic relative z-10"
                style={{ fontSize: 'clamp(1.1rem, 2.6vw, 1.45rem)', lineHeight: 1.55, opacity: 0.75 }}
              >
                "None of this asks to be believed. It asks to be good enough to argue with."
              </p>
              <p className="text-[9px] tracking-[0.3em] opacity-25 mt-5 font-mono relative z-10">- NEO KHALSA</p>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <div className="flex items-center justify-between pb-12 text-[9px] font-mono tracking-[0.25em] opacity-15 border-t hairline pt-8">
          <span>NEO KHALSA</span>
          <span>MMXXVI</span>
        </div>
      </div>
    </div>
  );
}
