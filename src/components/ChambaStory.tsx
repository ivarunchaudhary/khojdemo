import { useState, useEffect } from "react";
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
    location: "CHAMBA, HIMACHAL PRADESH · 32.55°N  76.12°E",
    title: "Before the roads widened.",
    body: "A hill town so steep the postman walks. We arrived by local bus in October, when green chillies hang from every balcony like a string of small prayers. The air tastes of pine, smoke, and something fermented.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
    imgFit: "object-cover",
  },
  {
    no: "02",
    label: "THE HUNT",
    location: "FIELD NOTE № 012 · THREE KITCHENS",
    title: "Three kitchens, one recipe.",
    body: "The chukh is a Pahadi green chilli chutney — pounded slow in stone, finished with raw mustard oil and a whisper of asafoetida. Every family in Chamba has their version. We spent three days in a stone-walled kitchen at 2,100 metres, learning the ratio between songs.",
    image:
      "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?auto=format&fit=crop&w=1600&q=80",
    imgFit: "object-cover",
  },
  {
    no: "03",
    label: "THE JAR",
    location: "SEED → POUND → JAR · VOL. 01",
    title: "Bottled slow. Shipped with a story.",
    body: "No commercial preservatives. No shortcuts. A small batch from Chamba, sealed by hand, indexed in the archive. Each jar ships with Field Note № 012. Volume 01 of the Khoj archive — dangerously addictive.",
    image: "/img/chamba-chukh.png",
    imgFit: "object-contain",
  },
];

export function ChambaStory({ open, onClose }: Props) {
  const [slide, setSlide] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    if (!open) { setSlide(0); return; }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, slide]);

  function navigate(d: number) {
    const next = slide + d;
    if (next < 0 || next >= slides.length) return;
    setDir(d);
    setSlide(next);
  }

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
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 text-cream/65 hover:text-cream transition-colors p-2 rounded-full border border-cream/15 hover:border-cream/35"
            aria-label="Close story"
          >
            <X size={16} />
          </button>

          {/* Slide counter — top left */}
          <div className="absolute top-6 left-6 z-20 font-mono text-[10px] uppercase tracking-[0.4em] text-cream/50">
            KHOJ FIELD DISPATCH · {s.no} / {slides.length}
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
                <h2 className="mt-7 font-display text-4xl sm:text-5xl lg:text-[3.5rem] text-cream leading-[1.02]">
                  {s.title}
                </h2>
                <p className="mt-6 text-cream/80 font-serif text-base sm:text-lg leading-relaxed max-w-md">
                  {s.body}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation row */}
            <div className="mt-12 flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                disabled={slide === 0}
                className="p-2 rounded-full border border-cream/20 text-cream/60 hover:text-cream hover:border-cream/50 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={15} />
              </button>

              {/* Progress segments */}
              <div className="flex gap-1.5 items-center">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDir(i > slide ? 1 : -1);
                      setSlide(i);
                    }}
                    className={`h-px rounded-full transition-all duration-500 ${
                      i === slide ? "w-10 bg-ember" : "w-5 bg-cream/25 hover:bg-cream/50"
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
                  onClick={onClose}
                  className="ml-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ember hover:text-cream transition-colors"
                >
                  Shop the Jar →
                </motion.a>
              )}
            </div>
          </div>

          {/* Right — image */}
          <div className="hidden lg:block lg:w-[48%] relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide + "-img"}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="absolute inset-0"
              >
                <img
                  src={s.image}
                  alt={s.label}
                  className={`w-full h-full ${s.imgFit} ${
                    s.imgFit === "object-contain" ? "bg-ink p-16" : ""
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-ink/10 to-transparent" />
                {/* Slide label watermark on image */}
                <div className="absolute bottom-8 right-8 font-mono text-[9px] uppercase tracking-[0.35em] text-cream/30">
                  {s.label} · CHAMBA
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile image strip — visible only on small screens */}
          <div className="absolute inset-x-0 bottom-0 h-48 lg:hidden overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={slide + "-mob"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                src={s.image}
                alt={s.label}
                className={`w-full h-full ${s.imgFit}`}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
