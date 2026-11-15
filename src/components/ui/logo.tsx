"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * DeskFloow official logo component featuring the 3D brand emblem
 * and crisp modern typography.
 */
export function Logo({
  className,
  tone = "default",
  height = 36,
  priority = false,
  showWordmark = true,
}: {
  className?: string;
  tone?: "default" | "light";
  height?: number;
  priority?: boolean;
  showWordmark?: boolean;
}) {
  const width = Math.round(height * 1.28);

  return (
    <div className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      <div className="relative shrink-0 transition-transform duration-200 hover:scale-105" style={{ height, width }}>
        <Image
          src="/images/deskfloow-logo.png"
          alt="DeskFloow"
          width={1024}
          height={800}
          unoptimized
          priority={priority}
          className="h-full w-full object-contain"
        />
      </div>
      {showWordmark && (
        <span
          className={cn(
            "font-bold tracking-[-0.03em] flex items-center leading-none",
            tone === "light" ? "text-white" : "text-ink",
          )}
          style={{ fontSize: Math.round(height * 0.6) }}
        >
          <span>Desk</span>
          <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-gold-500 bg-clip-text text-transparent">
            Floow
          </span>
        </span>
      )}
    </div>
  );
}
