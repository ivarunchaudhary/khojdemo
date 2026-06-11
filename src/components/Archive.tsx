import { useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { products, categories, type Product } from "../data/products";
import { useCart } from "../store/cart";
import { Reveal } from "./Reveal";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const overlayVariants: Variants = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.5 } },
};
const blurbVariants: Variants = {
  rest: { opacity: 0, y: 12 },
  hover: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const imageVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 1.2, ease: EASE } },
};
const arrowVariants: Variants = {
  rest: { x: 0 },
  hover: { x: 4, transition: { duration: 0.3 } },
};

export function Archive() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [qtyMap, setQtyMap] = useState<Record<string, number>>({});
  const add = useCart((s) => s.add);
  const open = useCart((s) => s.open);

  const list = useMemo(
    () => (filter === "All" ? products : products.filter((p) => p.category === filter)),
    [filter],
  );

  const getQty = (id: string) => qtyMap[id] ?? 1;
  const setQty = (id: string, q: number) =>
    setQtyMap((m) => ({ ...m, [id]: Math.max(1, q) }));

  const featured = list.find((p) => p.featured);
  const rest = list.filter((p) => !p.featured);

  return (
    <section id="archive" className="paper relative grain">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 py-16 sm:py-20 lg:py-24">
        <Reveal>
          <div className="grid lg:grid-cols-[1fr_auto] items-end gap-6 mb-8 sm:mb-10">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink/50">
                § 02 — THE ARCHIVE
              </p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02] text-ink">
                Collected{" "}
                <span className="font-italic-display text-rust">discoveries</span>,
                <br />
                one jar at a time.
              </h2>
            </div>
            <p className="max-w-sm text-ink/70 font-serif text-base leading-snug lg:pb-3">
              Every Khoj product is a postcard. Sourced from a region, made
              in-house from seed to jar, and indexed in our growing archive of
              flavours that almost slipped through.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-wrap gap-2 mb-8 sm:mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] border transition-all hover:-translate-y-0.5 ${
                filter === c
                  ? "bg-wine text-cream border-wine"
                  : "border-ink/15 text-ink/70 hover:border-ink/40"
              }`}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5">
          {featured && (
            <FadeUp className="sm:col-span-2 lg:col-span-6 lg:row-span-2">
              <ProductCard
                product={featured}
                qty={getQty(featured.id)}
                onQty={(q) => setQty(featured.id, q)}
                onAdd={() => {
                  add(featured, getQty(featured.id));
                  open();
                }}
                variant="featured"
              />
            </FadeUp>
          )}
          {rest.slice(0, 2).map((p, idx) => (
            <FadeUp
              key={p.id}
              delay={0.1 + idx * 0.08}
              className="lg:col-span-3"
            >
              <ProductCard
                product={p}
                qty={getQty(p.id)}
                onQty={(q) => setQty(p.id, q)}
                onAdd={() => {
                  add(p, getQty(p.id));
                  open();
                }}
              />
            </FadeUp>
          ))}
          {rest.slice(2).map((p, idx) => (
            <FadeUp
              key={p.id}
              delay={0.25 + idx * 0.08}
              className="sm:col-span-2 lg:col-span-6"
            >
              <ProductCard
                product={p}
                qty={getQty(p.id)}
                onQty={(q) => setQty(p.id, q)}
                onAdd={() => {
                  add(p, getQty(p.id));
                  open();
                }}
                variant="wide"
              />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <Reveal delay={delay} className={className}>
      {children}
    </Reveal>
  );
}

type CardProps = {
  product: Product;
  qty: number;
  onQty: (n: number) => void;
  onAdd: () => void;
  variant?: "featured" | "wide" | "default";
};

function ProductCard({ product: p, qty, onQty, onAdd, variant = "default" }: CardProps) {
  const isFeatured = variant === "featured";
  const isWide = variant === "wide";

  return (
    <motion.article
      initial="rest"
      animate="rest"
      whileHover="hover"
      variants={{ rest: { y: 0 }, hover: { y: -4, transition: { duration: 0.3, ease: EASE } } }}
      className={`relative bg-bone/85 border border-ink/10 rounded-md overflow-hidden flex flex-col shadow-sm h-full ${
        isWide ? "sm:flex-row" : ""
      }`}
    >
      {p.featured && isFeatured && (
        <span className="absolute top-3 left-3 z-10 bg-wine text-cream font-mono text-[9px] uppercase tracking-[0.25em] px-2.5 py-1 rounded-sm">
          HERO DISCOVERY
        </span>
      )}
      <div
        className={`relative overflow-hidden bg-sand/40 ${
          isFeatured ? "aspect-[5/4]" : isWide ? "sm:w-1/2 aspect-[5/4] sm:aspect-auto" : "aspect-[5/4]"
        }`}
      >
        <motion.img
          src={p.image}
          alt={p.name}
          loading="lazy"
          variants={imageVariants}
          className="w-full h-full object-cover"
        />
        {/* Dark gradient overlay — fades in on card hover */}
        <motion.div
          variants={overlayVariants}
          className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent pointer-events-none"
        />
        <span className="absolute bottom-3 left-3 z-10 bg-ink/80 text-cream font-mono text-[9px] uppercase tracking-[0.25em] px-2 py-1 rounded-sm">
          KHOJ&rsquo;ED IN {p.khojedIn.toUpperCase()}.
        </span>
        {/* Blurb — slides up from bottom of image on hover */}
        <motion.p
          variants={blurbVariants}
          className="pointer-events-none absolute inset-x-4 bottom-10 z-10 text-sm leading-relaxed text-cream"
        >
          {p.blurb}
        </motion.p>
      </div>
      <div className={`p-5 flex flex-col flex-1 ${isWide ? "sm:w-1/2" : ""}`}>
        <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-ink/55">
          {p.category.toUpperCase()} · {p.region.toUpperCase()},{" "}
          {p.state.toUpperCase()}
        </p>
        <h3
          className={`mt-3 font-display text-ink leading-tight ${
            isFeatured ? "text-3xl md:text-4xl" : "text-2xl"
          }`}
        >
          {p.name}
        </h3>
        <div className="mt-5 flex items-end justify-between border-t border-ink/10 pt-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink/45">
              PRICE
            </p>
            <p className="font-display text-xl text-ink mt-0.5">₹{p.price}</p>
          </div>
          <div className="flex items-center border border-ink/15 rounded-full">
            <button
              onClick={() => onQty(qty - 1)}
              className="px-2.5 py-1.5 text-ink/70 hover:text-ink"
              aria-label="Decrease quantity"
            >
              <Minus size={12} />
            </button>
            <span className="px-2 text-sm font-mono tabular-nums w-6 text-center">
              {qty}
            </span>
            <button
              onClick={() => onQty(qty + 1)}
              className="px-2.5 py-1.5 text-ink/70 hover:text-ink"
              aria-label="Increase quantity"
            >
              <Plus size={12} />
            </button>
          </div>
        </div>
        <motion.button
          onClick={onAdd}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="mt-4 w-full bg-wine text-cream font-mono text-[10px] uppercase tracking-[0.25em] rounded-full px-4 py-2.5 hover:bg-winedeep transition-colors flex items-center justify-center gap-1.5"
        >
          ADD TO CART{" "}
          <motion.span variants={arrowVariants} className="inline-block">
            →
          </motion.span>
        </motion.button>
      </div>
    </motion.article>
  );
}
