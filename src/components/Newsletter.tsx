import { useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "./Reveal";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section id="join" className="bg-winedeep relative grain overflow-hidden">

      {/* Postage stamp — top-right, rotated horizontal bar */}
      <div className="absolute top-8 right-6 sm:top-10 sm:right-10 z-10 rotate-[3deg]">
        <div className="border border-cream/40 px-5 py-2">
          <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-cream/60 whitespace-nowrap">
            POSTAGE &nbsp;·&nbsp; KHOJ &times; YOU
          </p>
        </div>
      </div>


      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 py-20 sm:py-24 lg:py-28">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-10 lg:gap-16 items-center">

          {/* Left — headline */}
          <Reveal direction="right">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-cream/55">
              NOTES FROM THE ROAD
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-[3.25rem] text-cream leading-[1.05]">
              Join the{" "}
              <span className="font-italic-display text-cream">Khoj</span>.
            </h2>
            <p className="mt-4 text-cream/70 font-serif text-base sm:text-lg max-w-md leading-relaxed">
              Collected stories, flavours and discoveries — sent like a
              postcard from wherever we are. No noise, just dispatches.
            </p>
          </Reveal>

          {/* Right — postcard card */}
          <Reveal direction="left" delay={0.12}>
            <div className="border border-cream/20 bg-cream/5 px-6 py-5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setSent(true);
                }}
              >
                <label
                  htmlFor="email"
                  className="block font-mono text-[9px] uppercase tracking-[0.3em] text-cream/60 mb-4"
                >
                  YOUR ADDRESS ON THE MAP
                </label>

                <div className="flex items-center gap-3">
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@somewhere.in"
                    className="flex-1 min-w-0 bg-transparent border-b border-cream/20 focus:border-cream/50 outline-none text-cream font-serif text-lg placeholder:text-cream/35 pb-1.5 transition-colors"
                  />
                  <motion.button
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="shrink-0 rounded-full bg-cream text-ink px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] hover:bg-bone transition-colors whitespace-nowrap"
                  >
                    {sent ? "SENT ✦" : "SEND POSTCARD"}
                  </motion.button>
                </div>

                <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.25em] text-cream/55">
                  ONE LETTER A MONTH · UNSUBSCRIBE ANYTIME
                </p>
              </form>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
