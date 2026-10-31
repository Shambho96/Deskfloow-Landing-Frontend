"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const COLORS = ["#8C5CFF", "#FFC95C", "#5427B8", "#CBB5FF", "#18A874"];

/**
 * Signature animation 11 — click-to-success celebration.
 * Checkmark draws in, followed by a small, restrained confetti burst.
 */
export function SuccessCelebration({ title, children }: { title: string; children?: ReactNode }) {
  const reduce = useReducedMotion();
  const pieces = reduce ? [] : Array.from({ length: 18 }, (_, i) => i);

  return (
    <div className="relative flex flex-col items-center py-6 text-center" role="status" aria-live="polite">
      <div className="relative">
        {pieces.map((i) => {
          const angle = (i / pieces.length) * Math.PI * 2;
          const dist = 70 + (i % 3) * 18;
          return (
            <motion.span
              key={i}
              aria-hidden
              className="absolute top-1/2 left-1/2 size-2 rounded-[2px]"
              style={{ background: COLORS[i % COLORS.length] }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0.6, rotate: 0 }}
              animate={{ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist + 20, opacity: 0, scale: 1, rotate: 180 }}
              transition={{ duration: 1.1, delay: 0.35, ease: "easeOut" }}
            />
          );
        })}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="grid size-20 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 shadow-glow"
        >
          <svg viewBox="0 0 24 24" className="size-10" fill="none" stroke="white" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
            <motion.path d="M5 12.5l4.2 4.2L19 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.2 }} />
          </svg>
        </motion.div>
      </div>
      <motion.h3
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="mt-6 text-[22px] font-semibold tracking-tight"
      >
        {title}
      </motion.h3>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-2 max-w-md text-[14.5px] text-muted-foreground">
        {children}
      </motion.div>
    </div>
  );
}
