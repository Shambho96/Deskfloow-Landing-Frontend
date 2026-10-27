"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Signature animation 02 — rotating value proposition.
 * All phrases are stacked in one grid cell so the width never shifts.
 * Pauses on hover/focus, when the tab is hidden, and under reduced motion.
 */
export function RotatingWords({ words, className, interval = 2600 }: { words: string[]; className?: string; interval?: number }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => !document.hidden && setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [paused, reduce, interval, words.length]);

  return (
    <span
      className={cn("relative inline-grid overflow-hidden align-bottom", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-live="polite"
    >
      {/* sizing ghosts */}
      {words.map((w) => (
        <span key={w} className="invisible col-start-1 row-start-1" aria-hidden>
          {w}
        </span>
      ))}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          className="col-start-1 row-start-1"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
