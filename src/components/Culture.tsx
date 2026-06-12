import { useState } from "react";
import { Play, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { mixtape } from "../data/notes";
import { Reveal } from "./Reveal";

const channels = ["Mixtapes", "Recipes", "Moodboards", "Founder Notes"];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SPOTIFY_SEARCH = "https://open.spotify.com/search/";

function spotifyUrl(title: string, artist: string) {
  return SPOTIFY_SEARCH + encodeURIComponent(`${title} ${artist}`);
}

const recipes = [
  {
    no: "№ 018",
    place: "CHAMBA, H.P.",
    title: "Chamba Chukh",
    steps: "Pound green Pahadi chillies slow in stone. Salt at intervals. Finish with raw mustard oil. Rest 48 hrs.",
  },
  {
    no: "№ 022",
    place: "PATNA, BR",
    title: "Sattu Sharbat",
    steps: "One fist of roasted gram flour. Cold water, a squeeze of lime, black salt. Drink before the heat breaks.",
  },
  {
    no: "№ 031",
    place: "AMRITSAR, PB",
    title: "Aam Papad Chaat",
    steps: "Dried mango leather torn rough. Tossed with chaat masala, thin sev, and a whisper of tamarind.",
  },
];

const moodboards = [
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=75",
    caption: "RAVI VALLEY AT ALTITUDE",
  },
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=75",
    caption: "THE APPROACH",
  },
  {
    src: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=75",
    caption: "STONE KITCHEN",
  },
  {
    src: "/img/chamba-chukh.jpg",
    caption: "FIELD NOTE № 012",
  },
];

const founderNotes = [
  {
    date: "OCT 2024",
    title: "Why we started in Chamba",
    body: "Not because it was easy to reach. Because it wasn't. The towns that are hard to get to are the ones that still cook the old way.",
  },
  {
    date: "JAN 2025",
    title: "On small batches",
    body: "We could scale. We won't. Every Khoj jar is indexed because when you lose count, you lose the story.",
  },
  {
    date: "MAR 2025",
    title: "The flavour we almost missed",
    body: "Haara Namak was found on a tip from a truck driver outside Rohtak. That's the whole sourcing strategy.",
  },
];

export function Culture() {
  const [channel, setChannel] = useState("Mixtapes");

  return (
    <section id="culture" className="paper grain relative">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 py-16 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
          <Reveal direction="right" className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink/65">
              § 04 — CULTURE DESK
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05]">
              A living archive of{" "}
              <span className="font-italic-display text-rust">modern India</span>.
            </h2>
            <p className="mt-6 text-ink/85 font-serif text-base sm:text-lg max-w-md leading-relaxed">
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

          <Reveal direction="left" delay={0.15} className="min-w-0">
            <AnimatePresence mode="wait">
              {channel === "Mixtapes" && (
                <motion.div
                  key="mixtapes"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="relative rounded-md overflow-hidden border border-ink/10 shadow-lg"
                >
                  <img
                    src="https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?auto=format&fit=crop&w=1000&q=75"
                    alt="Vinyl records and brass spice tins"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/20" />

                  <div className="relative p-6 sm:p-8 text-cream min-h-[440px] sm:min-h-[460px] flex flex-col">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/75">
                      {mixtape.eyebrow}
                    </p>
                    <h3 className="mt-2 font-italic-display text-3xl md:text-4xl text-cream">
                      {mixtape.title}
                    </h3>

                    <div className="mt-auto pt-8 space-y-2">
                      {mixtape.tracks.map((t, i) => (
                        <motion.a
                          key={i}
                          href={spotifyUrl(t.title, t.artist)}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                          className="flex items-center gap-3 py-2 border-b border-cream/10 last:border-0 group hover:border-cream/25 transition-colors"
                        >
                          <span className="font-mono text-[10px] text-cream/55 w-6">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <Play
                            size={12}
                            className="text-ember shrink-0 group-hover:text-cream transition-colors"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-cream truncate group-hover:text-cream/85">
                              {t.title}
                            </p>
                            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/65 truncate">
                              {t.artist}
                            </p>
                          </div>
                          <span className="font-mono text-xs text-cream/75 tabular-nums">
                            {t.time}
                          </span>
                          <ExternalLink
                            size={10}
                            className="text-cream/30 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </motion.a>
                      ))}
                    </div>

                    <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.25em] text-cream/35">
                      TAP ANY TRACK TO OPEN IN SPOTIFY →
                    </p>
                  </div>
                </motion.div>
              )}

              {channel === "Recipes" && (
                <motion.div
                  key="recipes"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="rounded-md border border-ink/10 shadow-lg bg-bone/70 min-h-[440px] sm:min-h-[460px] p-6 sm:p-8 flex flex-col"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
                    FIELD RECIPES — VOL. 01
                  </p>
                  <h3 className="mt-2 font-italic-display text-3xl md:text-4xl text-ink">
                    From the road, from memory.
                  </h3>

                  <div className="mt-auto pt-8 space-y-5">
                    {recipes.map((r, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                        className="border-b border-ink/10 last:border-0 pb-5 last:pb-0"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-rust">
                            {r.no} · {r.place}
                          </p>
                        </div>
                        <h4 className="mt-1.5 font-display text-xl text-ink">{r.title}</h4>
                        <p className="mt-1.5 font-serif text-sm text-ink/75 leading-relaxed">
                          {r.steps}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {channel === "Moodboards" && (
                <motion.div
                  key="moodboards"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="rounded-md border border-ink/10 shadow-lg overflow-hidden min-h-[440px] sm:min-h-[460px]"
                >
                  <div className="grid grid-cols-2 h-full">
                    {moodboards.map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
                        className="relative aspect-square overflow-hidden group"
                      >
                        <img
                          src={m.src}
                          alt={m.caption}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-ink/30 group-hover:bg-ink/50 transition-colors duration-300" />
                        <p className="absolute bottom-2 left-2 right-2 font-mono text-[8px] uppercase tracking-[0.25em] text-cream/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {m.caption}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {channel === "Founder Notes" && (
                <motion.div
                  key="founder-notes"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="rounded-md border border-ink/10 shadow-lg bg-winedeep/85 min-h-[440px] sm:min-h-[460px] p-6 sm:p-8 flex flex-col"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/55">
                    FOUNDER NOTES — FROM THE FIELD
                  </p>
                  <h3 className="mt-2 font-italic-display text-3xl md:text-4xl text-cream">
                    Notes from the road.
                  </h3>

                  <div className="mt-auto pt-8 space-y-6">
                    {founderNotes.map((n, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                        className="border-b border-cream/10 last:border-0 pb-6 last:pb-0"
                      >
                        <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-ember">
                          {n.date}
                        </p>
                        <h4 className="mt-1.5 font-display text-xl text-cream">{n.title}</h4>
                        <p className="mt-1.5 font-serif text-sm text-cream/75 leading-relaxed">
                          {n.body}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
