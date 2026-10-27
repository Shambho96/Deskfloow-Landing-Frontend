"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Accessible dialog built on the native <dialog> element: focus trapping,
 * Escape-to-close and inert background come from the platform.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  side = "center",
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  side?: "center" | "right";
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-label={title}
      className={cn(
        "m-auto max-h-[90vh] w-[min(560px,calc(100vw-24px))] overflow-visible rounded-2xl bg-transparent p-0 text-ink backdrop:bg-brand-950/40 backdrop:backdrop-blur-sm open:animate-[dlg_.22s_ease-out]",
        side === "right" && "mr-0 h-dvh max-h-dvh w-[min(440px,100vw)] rounded-none rounded-l-2xl",
        className,
      )}
    >
      <div className={cn("card flex max-h-[inherit] flex-col overflow-hidden", side === "right" && "h-full rounded-none rounded-l-2xl")}>
        <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
          <div>
            <h2 className="text-[17px] font-semibold tracking-tight">{title}</h2>
            {description && <p className="mt-0.5 text-[13px] text-muted">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-muted transition hover:bg-brand-100 hover:text-ink"
            aria-label="Close dialog"
          >
            <X className="size-4" />
          </button>
        </header>
        <div className="overflow-y-auto px-5 py-4 scrollbar-thin">{open && children}</div>
      </div>
    </dialog>
  );
}
