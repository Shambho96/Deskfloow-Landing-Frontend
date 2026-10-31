"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/** Signature animation 05 — count-up when the number enters the viewport. */
export function CountUp({
  value,
  format = (n) => Math.round(n).toLocaleString("en-IN"),
  duration = 1.4,
  className,
}: {
  value: number;
  format?: (n: number) => string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  const animating = inView && !reduce;

  useEffect(() => {
    if (!animating) return;
    const from = started.current ? display : 0;
    started.current = true;
    const ctrl = animate(from, value, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: setDisplay });
    return () => ctrl.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animating, value, duration]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {format(animating ? display : value)}
    </span>
  );
}
