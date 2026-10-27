"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { CommandPalette } from "./command-palette";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      {/* "user" respects the OS reduced-motion setting for every Motion animation */}
      <MotionConfig reducedMotion="user">
        {children}
        <CommandPalette />
        <Toaster position="bottom-right" richColors closeButton toastOptions={{ style: { borderRadius: 14 } }} />
      </MotionConfig>
    </ThemeProvider>
  );
}
