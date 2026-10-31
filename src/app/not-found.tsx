import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

export default function NotFound() {
  return (
    <main id="main" className="relative grid min-h-screen place-items-center overflow-hidden px-5 text-center">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div>
        <Link href="/" className="mx-auto block w-fit"><Logo /></Link>
        <p className="mt-10 bg-gradient-to-b from-brand-500 to-brand-800 bg-clip-text text-[96px] leading-none font-semibold tracking-tighter text-transparent">404</p>
        <h1 className="mt-3 text-[24px] font-semibold">This room isn&apos;t on the floor plan.</h1>
        <p className="mx-auto mt-2 max-w-sm text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-6 flex justify-center gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/book-demo" variant="secondary">Book a Demo</ButtonLink>
        </div>
      </div>
    </main>
  );
}
