import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../store/cart";

const nav = [
  { label: "ARCHIVE", href: "#archive" },
  { label: "FIELD NOTES", href: "#field-notes" },
  { label: "CULTURE", href: "#culture" },
  { label: "JOIN", href: "#join" },
];

export function Header() {
  const open = useCart((s) => s.open);
  const count = useCart((s) => s.totalCount());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "bg-ink/90 backdrop-blur border-b border-cream/10"
          : "bg-ink/40 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-3">
        <a href="#top" className="flex items-baseline gap-2 sm:gap-3 group shrink-0">
          <span className="font-display text-xl sm:text-2xl text-cream tracking-tight">
            Khoj
          </span>
          <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.28em] text-cream/55">
            / India&rsquo;s Taste Archive
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-mono text-[11px] uppercase tracking-[0.25em] text-cream/65 hover:text-cream transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={open}
            className="relative flex items-center gap-2 rounded-full border border-cream/20 px-3 sm:px-4 py-1.5 sm:py-2 text-cream/85 hover:text-cream hover:border-cream/40 transition-colors"
            aria-label={`Open cart, ${count} items`}
          >
            <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.25em]">
              CART
            </span>
            <ShoppingBag size={14} strokeWidth={1.5} className="sm:hidden" />
            <span
              className={`grid place-items-center w-5 h-5 rounded-full font-mono text-[10px] tabular-nums transition-colors ${
                count > 0 ? "bg-ember text-cream" : "bg-cream/15 text-cream/70"
              }`}
            >
              {count}
            </span>
          </button>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden p-2 rounded-full border border-cream/20 text-cream/85"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-cream/10 bg-ink/95 backdrop-blur"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {nav.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-mono text-xs uppercase tracking-[0.25em] text-cream/75 hover:text-cream py-2"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
