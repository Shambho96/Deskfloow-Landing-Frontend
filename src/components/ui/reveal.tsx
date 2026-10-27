"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Fade-up on enter viewport. Content is visible without JS (SSR renders final state when reduced). */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  ...props
}: { children: ReactNode; delay?: number; y?: number; className?: string } & HTMLMotionProps<"div">) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  className,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "inverted";
  className?: string;
  children?: ReactNode;
}) {
  const isInverted = tone === "inverted";
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <span className={cn("eyebrow", isInverted && "border-white/15 bg-white/5 text-gold-300")}>
          <span className="size-1.5 rounded-full bg-gold-400" aria-hidden />
          {eyebrow}
        </span>
      )}
      <h2 className={cn("h-section mt-4", isInverted ? "text-white" : "text-ink")}>{title}</h2>
      {lead && <p className={cn("lead mt-4", isInverted && "text-white/70")}>{lead}</p>}
      {children}
    </Reveal>
  );
}
