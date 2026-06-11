import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type Direction = "up" | "left" | "right" | "fade";

type Props = {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  amount?: number;
  once?: boolean;
};

const hidden: Record<Direction, string> = {
  up: "translate3d(0,24px,0)",
  left: "translate3d(40px,0,0)",
  right: "translate3d(-40px,0,0)",
  fade: "none",
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  className,
  amount = 0.05,
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            if (once) io.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold: amount },
    );
    io.observe(el);
    // Fallback: reveal after 600ms if observer never fires (e.g. headless screenshot)
    const t = window.setTimeout(() => setVisible(true), 600);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [amount, once]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : hidden[direction],
        transition: `opacity ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
