import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const slides = [
  {
    no: "01",
    label: "ARRIVAL",
    location: "CHAMBA, H.P. · RAVI VALLEY · 2,100M",
    title: "Before the roads widened.",
    body: "A hill town in the Ravi valley, so steep the postman walks. We arrived in October by local bus — the same way most people arrive, if they arrive at all. Every balcony in Chamba was hung with green chillies drying in the last of the mountain sun. The air carried pine, wood smoke, and something old and quietly fermenting.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85",
    imgFit: "object-cover",
    imgPosition: "object-center",
  },
  {
    no: "02",
    label: "THE HARVEST",
    location: "GREEN CHILLI SEASON · OCTOBER · FIELD NOTE № 012",
    title: "Every balcony, a different recipe.",
    body: "The Pahadi green chilli is not what you expect. Grown above two thousand metres, it develops differently from lowland varieties — less fierce, more grassy, with a slow heat that builds like a conversation. Every family in Chamba pounds their own chukh. No two are the same. No recipe has ever been written down.",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1600&q=85",
    imgFit: "object-cover",
    imgPosition: "object-center",
  },
  {
    no: "03",
    label: "THE KITCHEN",
    location: "STONE MORTAR · RAW MUSTARD OIL · THREE KITCHENS",
    title: "Three kitchens, one ratio.",
    body: "The method is old. Pound the chillies slow in stone — not ground, not blended. Salt at intervals to draw the juice. Raw mustard oil at the finish, sharp and grassy. A whisper of asafoetida. The ratio lives in the hands, not a recipe card. We spent three days in a stone-walled kitchen at 2,100 metres, learning the rhythm between songs.",
    image:
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1600&q=85",
    imgFit: "object-cover",
    imgPosition: "object-center",
  },
  {
    no: "04",
    label: "THE JAR",
    location: "SEED → POUND → JAR · SMALL BATCH · VOL. 01",
    title: "Bottled slow. Shipped with a story.",
    body: "No commercial preservatives. No shortcuts. Each jar is hand-sealed in a small batch, indexed as Field Note № 012 in the Khoj archive. It ships with the field note — because the flavour alone is only half of it. This is what disappearing India tastes like, before the road reaches it.",
    image: "/img/chamba-chukh.png",
    imgFit: "object-contain",
    imgPosition: "object-center",
  },
];

export function ChambaStory({ open, onClose }: Props) {
  const [slide, setSlide] = useState(0);
  const [dir, setDir] = useState(1);

  const navigate = useCallback(
    (d: number) => {
      const next = slide + d;
      if (next < 0 || next >= slides.length) return;
      setDir(d);
      setSlide(next);
    },
    [slide],
  );

  const handleClose = useCallback(() => {
    onClose();
    // reset after the 0.45s exit fade so the first slide doesn't flash in
    window.setTimeout(() => {
      setSlide(0);
      setDir(1);
    }, 500);
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, navigate, handleClose]);

  const s = slides[slide];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="fixed inset-0 z-[60] bg-ink flex overflow-hidden"
        >
          {/* Top bar */}
          <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-6 py-5">
            <button
              onClick={handleClose}
              className="flex items-center gap-2 text-cream/55 hover:text-cream transition-colors group"
              aria-label="Back to home"
            >
              <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              <span className="font-mono text-[9px] uppercase tracking-[0.35em]">Back</span>
            </button>

            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-cream/45">
              KHOJ FIELD DISPATCH · {s.no} / {slides.length}
            </span>

            <button
              onClick={handleClose}
              className="text-cream/55 hover:text-cream transition-colors p-1.5 rounded-full border border-cream/15 hover:border-cream/35"
              aria-label="Close story"
            >
              <X size={14} />
            </button>
          </div>

          {/* Left — story text */}
          <div className="relative z-10 flex flex-col justify-center w-full lg:w-[52%] px-8 sm:px-14 lg:px-20 pt-24 pb-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide}
                initial={{ opacity: 0, y: dir > 0 ? 24 : -24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: dir > 0 ? -16 : 16 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-ember">
                  {s.label}
                </p>
                <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.3em] text-cream/50">
                  {s.location}
                </p>
                <h2 className="mt-7 font-display text-4xl sm:text-5xl lg:text-[3.25rem] text-cream leading-[1.02]">
                  {s.title}
                </h2>
                <p className="mt-6 text-cream/80 font-serif text-base sm:text-lg leading-relaxed max-w-md">
                  {s.body}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-12 flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                disabled={slide === 0}
                className="p-2 rounded-full border border-cream/20 text-cream/60 hover:text-cream hover:border-cream/50 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={15} />
              </button>

              <div className="flex gap-1.5 items-center">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDir(i > slide ? 1 : -1);
                      setSlide(i);
                    }}
                    className={`h-px rounded-full transition-all duration-500 ${
                      i === slide
                        ? "w-10 bg-ember"
                        : "w-5 bg-cream/25 hover:bg-cream/50"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => navigate(1)}
                disabled={slide === slides.length - 1}
                className="p-2 rounded-full border border-cream/20 text-cream/60 hover:text-cream hover:border-cream/50 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={15} />
              </button>

              {slide === slides.length - 1 && (
                <motion.a
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  href="#archive"
                  onClick={handleClose}
                  className="ml-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ember hover:text-cream transition-colors"
                >
                  Shop the Jar →
                </motion.a>
              )}
            </div>
          </div>

          {/* Right — image (desktop) */}
          <div className="hidden lg:block lg:w-[48%] relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide + "-img"}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.75, ease: EASE }}
                className="absolute inset-0"
              >
                <img
                  src={s.image}
                  alt={s.label}
                  className={`w-full h-full ${s.imgFit} ${s.imgPosition} ${
                    s.imgFit === "object-contain" ? "bg-ink p-16" : ""
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-ink/5 to-transparent" />
                <div className="absolute bottom-8 right-8 font-mono text-[9px] uppercase tracking-[0.35em] text-cream/25">
                  {s.label} · CHAMBA
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile — image strip at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-44 lg:hidden overflow-hidden pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.img
                key={slide + "-mob"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                src={s.image}
                alt={s.label}
                className={`w-full h-full ${s.imgFit} ${s.imgPosition}`}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
