import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ChambaStory } from "./ChambaStory";
import { ChambaStamp } from "./ChambaStamp";

const ticker = [
  "KHOJ'ED IN CHAMBA",
  "SEED → JAR",
  "MADE IN INDIA, SLOWLY",
  "NOW SHIPPING PAN-INDIA",
  "VOL. 01 — FORGOTTEN FLAVOURS",
];

export function Hero() {
  const [chambaOpen, setChambaOpen] = useState(
    () => window.location.pathname === "/story/chamba"
  );

  function openStory() {
    window.history.pushState({ chamba: true }, "", "/story/chamba");
    setChambaOpen(true);
  }

  function closeStory() {
    if (window.location.pathname === "/story/chamba") {
      window.history.pushState({}, "", "/");
    }
    setChambaOpen(false);
  }

  useEffect(() => {
    function onPop() {
      setChambaOpen(window.location.pathname === "/story/chamba");
    }
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return (
    <>
      <ChambaStory open={chambaOpen} onClose={closeStory} />

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
                className="px-5 sm:px-6 py-2.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-cream/85 whitespace-nowrap flex items-center gap-5 sm:gap-6"
              >
                {t}
                <span className="text-ember">•</span>
              </span>
            ))}
          </div>
        </div>

        {/* Field stamp — clickable, opens Chamba story */}
        <button
          onClick={openStory}
          className="absolute top-1/2 translate-y-[calc(-50%+28px)] hover:translate-y-[calc(-50%+20px)] transition-transform duration-300 ease-out right-4 sm:right-8 lg:right-12 z-10 hidden sm:block w-[200px] lg:w-[230px] cursor-pointer group"
          aria-label="Open Chamba story"
        >
          <ChambaStamp />
          <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.25em] text-ember opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            READ THE STORY →
          </p>
        </button>

        {/* Content — vertically centered, accounting for header + ticker */}
        <div className="relative h-full mx-auto max-w-7xl px-6 lg:px-10 flex items-center pt-28">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-mono text-[10px] uppercase tracking-[0.4em] text-cream/80 mb-5 sm:mb-6"
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
              className="mt-6 sm:mt-7 max-w-lg text-cream/90 font-serif text-base sm:text-lg leading-snug"
            >
              Khoj is a roving archive of disappearing regional flavours,
              kitchen rituals and small-town stories — collected jar by jar,
              from the road.
            </motion.p>
            <motion.a
              href="#archive"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.6 }}
              className="mt-6 sm:mt-7 inline-flex items-center gap-3 bg-cream/10 hover:bg-cream/15 border border-cream/20 hover:border-cream/35 rounded-full px-4 py-2 transition-colors group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-ember shrink-0" />
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-cream/75 group-hover:text-cream transition-colors">
                Now available&nbsp;&nbsp;·&nbsp;&nbsp;Chamba Chukh Vol. 01
              </span>
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                className="font-mono text-[9px] text-ember group-hover:text-cream transition-colors"
              >
                →
              </motion.span>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-5 sm:mt-6 flex flex-wrap gap-3"
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

            {/* Mobile-only Chamba story link — stamp is hidden on small screens */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              onClick={openStory}
              className="sm:hidden mt-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.35em] text-cream/60 hover:text-cream transition-colors"
            >
              <span className="w-5 h-px bg-cream/40" />
              READ THE CHAMBA STORY
              <span className="w-5 h-px bg-cream/40" />
            </motion.button>
          </div>
        </div>
      </section>
    </>
  );
}
