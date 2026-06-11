import { useState } from "react";
import { Play } from "lucide-react";
import { motion } from "motion/react";
import { mixtape } from "../data/notes";
import { Reveal } from "./Reveal";

const channels = ["Mixtapes", "Recipes", "Moodboards", "Founder Notes"];

export function Culture() {
  const [channel, setChannel] = useState("Mixtapes");

  return (
    <section id="culture" className="paper grain relative">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 py-16 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
          <Reveal direction="right">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink/50">
              § 04 — CULTURE DESK
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05]">
              A living archive of{" "}
              <span className="font-italic-display text-rust">modern India</span>.
            </h2>
            <p className="mt-6 text-ink/70 font-serif text-base sm:text-lg max-w-md leading-relaxed">
              Flavour doesn&rsquo;t travel alone. It comes with mixtapes, train
              windows, half-finished paintings and overheard conversations.
            </p>

            <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-3 max-w-md">
              {channels.map((c) => (
                <motion.button
                  key={c}
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                  variants={{ rest: { y: 0 }, hover: { y: -2 } }}
                  onClick={() => setChannel(c)}
                  className={`flex flex-col items-start text-left rounded-md border px-3 sm:px-4 py-2.5 sm:py-3 transition-colors ${
                    channel === c
                      ? "bg-ink text-cream border-ink"
                      : "bg-bone/60 border-ink/15 text-ink hover:border-ink/40"
                  }`}
                >
                  <span
                    className={`font-mono text-[9px] uppercase tracking-[0.3em] ${
                      channel === c ? "text-cream/60" : "text-ink/50"
                    }`}
                  >
                    CHANNEL
                  </span>
                  <motion.span
                    variants={
                      channel === c
                        ? undefined
                        : { rest: { color: "#1a0d0a" }, hover: { color: "#5a1d1d" } }
                    }
                    className="font-display text-base sm:text-lg leading-tight mt-0.5"
                  >
                    {c}
                  </motion.span>
                </motion.button>
              ))}
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.15}>
            <div className="relative rounded-md overflow-hidden border border-ink/10 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?auto=format&fit=crop&w=1400&q=80"
                alt="Vinyl records, tape deck and brass spice tins in warm light"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/20" />

              <div className="relative p-6 sm:p-8 text-cream min-h-[440px] sm:min-h-[460px] flex flex-col">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60">
                  {mixtape.eyebrow}
                </p>
                <h3 className="mt-2 font-italic-display text-3xl md:text-4xl text-cream">
                  {mixtape.title}
                </h3>

                <div className="mt-auto pt-8 space-y-2">
                  {mixtape.tracks.map((t, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                      className="flex items-center gap-3 py-2 border-b border-cream/10 last:border-0"
                    >
                      <span className="font-mono text-[10px] text-cream/40 w-6">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <Play size={12} className="text-ember shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-cream truncate">{t.title}</p>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/50 truncate">
                          {t.artist}
                        </p>
                      </div>
                      <span className="font-mono text-xs text-cream/60 tabular-nums">
                        {t.time}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
