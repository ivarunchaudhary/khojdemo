import { Reveal } from "./Reveal";

const social = ["INSTAGRAM", "SPOTIFY", "SUBSTACK", "TIKTOK"];
const archive = ["Chutneys", "Spice Blends", "Sherbets", "Sweets"];
const index = ["Field Notes", "Culture Desk", "Join the Khoj", "Stockists"];

export function Footer() {
  return (
    <footer className="bg-ink border-t border-cream/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12 sm:py-16">
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
            <div className="col-span-2">
              <p className="font-display text-3xl text-cream">Khoj.</p>
              <p className="mt-4 max-w-sm text-sm text-cream/60 font-serif leading-relaxed">
                India&rsquo;s Taste Archive. A roving archive of disappearing
                regional flavours, preserved seed-to-jar.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.3em] text-cream/65">
                {social.map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="hover:text-cream border-b border-cream/20 hover:border-cream pb-0.5 transition-colors"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/40">
                ARCHIVE
              </p>
              <ul className="mt-4 space-y-2 text-sm text-cream/70">
                {archive.map((l) => (
                  <li key={l}>
                    <a href="#archive" className="underline-grow inline-block hover:text-cream transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/40">
                INDEX
              </p>
              <ul className="mt-4 space-y-2 text-sm text-cream/70">
                {index.map((l) => (
                  <li key={l}>
                    <a href="#" className="underline-grow inline-block hover:text-cream transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 sm:mt-14 pt-6 border-t border-cream/10 flex flex-wrap justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-cream/40">
            <span>© 2026 KHOJ. MADE SLOWLY IN INDIA.</span>
            <span>VOL. 01 / FORGOTTEN FLAVOURS</span>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
