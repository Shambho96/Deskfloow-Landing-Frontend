import type { ReactNode } from "react";

/** Simple long-form wrapper for legal pages. */
export function Prose({ updated, children }: { updated: string; children: ReactNode }) {
  return (
    <section className="container-x pb-24">
      <div className="mx-auto max-w-3xl rounded-3xl border border-line bg-white p-6 sm:p-10">
        <p className="demo-badge">Draft · last updated {updated}</p>
        <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-muted [&_h2]:mt-8 [&_h2]:text-[19px] [&_h2]:font-semibold [&_h2]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-ink">
          {children}
        </div>
      </div>
    </section>
  );
}
