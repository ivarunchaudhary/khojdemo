import { useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "./Reveal";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section id="join" className="bg-winedeep relative grain">
      <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-10 py-16 sm:py-20 lg:py-24 text-center">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-cream/55">
            POSTAGE · KHOJ × YOU
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.4em] text-cream/40">
            NOTES FROM THE ROAD
          </p>
          <h2 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl text-cream leading-tight">
            Join the{" "}
            <span className="font-italic-display text-ember">Khoj</span>.
          </h2>
          <p className="mt-6 text-cream/70 font-serif text-base sm:text-lg max-w-xl mx-auto">
            Collected stories, flavours and discoveries — sent like a postcard
            from wherever we are. No noise, just dispatches.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSent(true);
            }}
            className="mt-8 sm:mt-10 max-w-lg mx-auto text-left"
          >
            <label
              htmlFor="email"
              className="block font-mono text-[10px] uppercase tracking-[0.3em] text-cream/55 mb-2"
            >
              YOUR ADDRESS ON THE MAP
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@somewhere.in"
                className="flex-1 bg-ink/40 border border-cream/15 rounded-full px-5 py-3 text-cream placeholder:text-cream/40 focus:outline-none focus:border-cream/40 transition-colors"
              />
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="rounded-full bg-cream text-ink px-6 py-3 font-mono text-[11px] uppercase tracking-[0.25em] hover:bg-bone transition-colors"
              >
                {sent ? "SENT ✦" : "SEND POSTCARD"}
              </motion.button>
            </div>
          </form>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-cream/40 text-center">
            ONE LETTER A MONTH · UNSUBSCRIBE ANYTIME
          </p>
        </Reveal>
      </div>
    </section>
  );
}
