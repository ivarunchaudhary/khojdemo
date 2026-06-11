import { motion } from "motion/react";

const ticker = [
  "KHOJ'ED IN CHAMBA",
  "SEED → JAR",
  "MADE IN INDIA, SLOWLY",
  "NOW SHIPPING PAN-INDIA",
  "VOL. 01 — FORGOTTEN FLAVOURS",
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative h-screen min-h-[640px] w-full overflow-hidden"
    >
      {/* Full-bleed image */}
      <motion.img
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        src="https://images.unsplash.com/photo-1775433205046-86e060feff06?auto=format&fit=crop&w=2200&q=80"
        alt="Colourful spice mounds at a Delhi spice market"
        className="absolute inset-0 w-full h-full object-cover object-[55%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/15" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/70" />

      {/* Ticker — overlay just below the fixed header */}
      <div className="absolute top-16 inset-x-0 z-20 border-y border-cream/10 bg-ink/70 backdrop-blur-sm overflow-hidden">
        <div className="flex w-max animate-marquee">
          {[...ticker, ...ticker, ...ticker].map((t, i) => (
            <span
              key={i}
              className="px-5 sm:px-6 py-2.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-cream/70 whitespace-nowrap flex items-center gap-5 sm:gap-6"
            >
              {t}
              <span className="text-ember">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Field stamp — middle-right */}
      <motion.div
        initial={{ opacity: 0, x: 30, rotate: 1.5 }}
        animate={{ opacity: 1, x: 0, rotate: 1.5 }}
        whileHover={{ rotate: 0, y: -4, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
        transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-8 lg:right-12 z-10 hidden sm:block cursor-default"
      >
        <div className="bg-cream/95 text-ink rounded-sm px-6 py-5 w-[220px] sm:w-[260px] shadow-2xl border border-ink/10">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
            <span>FIELD STAMP</span>
            <span>№ 047</span>
          </div>
          <p className="mt-4 font-italic-display text-2xl sm:text-[1.7rem] leading-[1.15] text-ink">
            Chamba,
            <br />
            Himachal Pradesh
          </p>
          <p className="mt-4 pt-3 border-t border-ink/10 font-mono text-[10px] text-ink/50 tracking-wider">
            32.55°N &nbsp;·&nbsp; 76.12°E
          </p>
        </div>
      </motion.div>

      {/* Content — vertically centered, accounting for header + ticker */}
      <div className="relative h-full mx-auto max-w-7xl px-6 lg:px-10 flex items-center pt-28">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-mono text-[10px] uppercase tracking-[0.4em] text-cream/65 mb-5 sm:mb-6"
          >
            § 01 &nbsp;·&nbsp; DISCOVERING INDIA
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-cream font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem] leading-[0.92] tracking-tight"
          >
            India&rsquo;s
            <br />
            <span className="font-italic-display text-ember/95">
              Taste&nbsp;Archive
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-6 sm:mt-7 max-w-lg text-cream/80 font-serif text-base sm:text-lg leading-snug"
          >
            Khoj is a roving archive of disappearing regional flavours,
            kitchen rituals and small-town stories — collected jar by jar,
            from the road.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-7 sm:mt-8 flex flex-wrap gap-3"
          >
            <motion.a
              href="#archive"
              initial="rest"
              animate="rest"
              whileHover="hover"
              whileTap={{ scale: 0.97 }}
              variants={{ rest: { y: 0 }, hover: { y: -2 } }}
              className="rounded-full bg-cream text-ink px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.25em] hover:bg-bone transition-colors flex items-center gap-2"
            >
              EXPLORE THE ARCHIVE{" "}
              <motion.span
                variants={{ rest: { x: 0 }, hover: { x: 4, transition: { duration: 0.3 } } }}
                className="inline-block"
              >
                →
              </motion.span>
            </motion.a>
            <motion.a
              href="#archive"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full border border-cream/35 text-cream px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.25em] hover:bg-cream/10 hover:border-cream/60 transition-colors"
            >
              SHOP DISCOVERIES
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
