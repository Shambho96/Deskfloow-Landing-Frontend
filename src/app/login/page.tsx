import type { Metadata } from "next";
import Link from "next/link";
import { KeyRound, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Hotel Staff Login · DeskFloow",
  description: "Sign in to your DeskFloow hotel PMS and operations management workspace.",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <main id="main" className="relative grid min-h-screen place-items-center overflow-hidden px-5 py-16">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="pointer-events-none absolute top-1/4 left-1/2 -z-10 h-[400px] w-[660px] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[120px]" />
      
      <div className="w-full max-w-md">
        <Link href="/" className="mx-auto block w-fit">
          <Logo height={42} />
        </Link>
        
        <div className="card mt-8 p-8 shadow-2xl border border-brand-200/80">
          <span className="grid size-12 place-items-center rounded-2xl bg-brand-100 text-brand-700">
            <KeyRound className="size-6" aria-hidden />
          </span>
          <h1 className="mt-5 text-[26px] font-bold tracking-tight text-ink">Staff Portal Login</h1>
          <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
            Enter your property credentials to access your front desk, tape chart, and housekeeping console.
          </p>

          <LoginForm />
        </div>

        <p className="mt-6 text-center text-[12px] text-muted-foreground flex items-center justify-center gap-1.5">
          <ShieldCheck className="size-3.5 text-emerald-500" />
          Encrypted 256-bit TLS connection · Multi-factor authentication protected
        </p>
      </div>
    </main>
  );
}
