import { motion } from "motion/react";
import { fieldNotes, fieldNotesCover } from "../data/notes";
import { Reveal } from "./Reveal";

export function FieldNotes() {
  return (
    <section id="field-notes" className="bg-ink relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10 sm:mb-12">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-cream/50">
                § 03 — FIELD NOTES
              </p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl text-cream leading-[1.05]">
                Pages from{" "}
                <span className="font-italic-display text-ember/90">the road</span>.
              </h2>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-cream/40">
              ← SCROLL →
            </p>
          </div>
        </Reveal>

        <div className="flex gap-4 sm:gap-5 overflow-x-auto pb-6 -mx-6 px-6 lg:-mx-10 lg:px-10 no-scrollbar snap-x snap-mandatory">
          <motion.article
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className="snap-start shrink-0 w-[280px] sm:w-[340px] rounded-md overflow-hidden relative border border-cream/10"
          >
            <img
              src={fieldNotesCover.image}
              alt="Travel scrapbook with a ticket, cassette and folded map"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            <div className="relative h-full min-h-[360px] flex flex-col justify-end p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/70">
                {fieldNotesCover.eyebrow}
              </p>
              <h3 className="mt-3 font-italic-display text-3xl text-cream leading-tight">
                {fieldNotesCover.title}
              </h3>
            </div>
          </motion.article>

          {fieldNotes.map((n, i) => (
            <motion.article
              key={n.no}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.6,
                delay: 0.1 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              className="snap-start shrink-0 w-[280px] sm:w-[340px] bg-winedeep/40 border border-cream/10 rounded-md p-5 sm:p-6 flex flex-col min-h-[360px]"
            >
              <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-cream/50">
                <span>{n.no}</span>
                <span>{n.place}</span>
              </div>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-ember/90">
                {n.type}
              </p>
              <h3 className="mt-2 font-display text-2xl text-cream leading-snug">
                {n.title}
              </h3>
              <p className="mt-3 text-cream/65 font-serif text-base leading-relaxed flex-1">
                {n.body}
              </p>
              <motion.a
                initial="rest"
                animate="rest"
                whileHover="hover"
                className="mt-6 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-ember hover:text-cream transition-colors self-start"
                href="#"
              >
                READ ENTRY{" "}
                <motion.span
                  variants={{ rest: { x: 0 }, hover: { x: 4, transition: { duration: 0.3 } } }}
                  className="inline-block"
                >
                  →
                </motion.span>
              </motion.a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
