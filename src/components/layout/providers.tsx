"use client";

import { Toaster } from "sonner";
import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { CommandPalette } from "./command-palette";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
      <CommandPalette />
      <Toaster position="bottom-right" richColors closeButton toastOptions={{ style: { borderRadius: 14 } }} />
    </MotionConfig>
  );
}
