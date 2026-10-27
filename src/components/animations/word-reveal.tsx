import { cn } from "@/lib/utils";

/**
 * Signature animation 01 — hero word reveal.
 * Pure CSS (no JS needed): if scripts fail the headline still animates or
 * simply renders, and the global reduced-motion rule makes it instant.
 */
export function WordReveal({
  lines,
  className,
  baseDelay = 0.1,
  step = 0.09,
  highlight,
}: {
  lines: string[];
  className?: string;
  baseDelay?: number;
  step?: number;
  highlight?: string[];
}) {
  let i = 0;
  return (
    <span className={cn("block", className)}>
      {lines.map((line) => (
        <span key={line} className="block">
          {line.split(" ").map((word) => {
            const delay = baseDelay + step * i++;
            const hl = highlight?.includes(word.replace(/[.,]/g, ""));
            return (
              <span
                key={word + delay}
                className={cn(
                  "inline-block pr-[0.22em] [animation:wr_0.8s_cubic-bezier(0.22,1,0.36,1)_both]",
                  hl && "bg-gradient-to-r from-brand-600 via-brand-500 to-gold-500 bg-clip-text text-transparent",
                )}
                style={{ animationDelay: `${delay}s` }}
              >
                {word}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
