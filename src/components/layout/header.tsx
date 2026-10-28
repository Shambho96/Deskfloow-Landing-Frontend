"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, X, ArrowRight, PlayCircle } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/button";
import { mainNav, platformNav, resourcesNav } from "@/data/nav";
import { cn } from "@/lib/utils";

type MenuKey = "features" | "resources" | null;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<MenuKey>(null);
  const [mobile, setMobile] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change, Escape, or outside click.
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMenu(null);
    setMobile(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && (setMenu(null), setMobile(false));
    const onClick = (e: MouseEvent) => !navRef.current?.contains(e.target as Node) && setMenu(null);
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  const hover = (k: MenuKey) => ({
    onMouseEnter: () => (clearTimeout(closeTimer.current), setMenu(k)),
    onMouseLeave: () => (closeTimer.current = setTimeout(() => setMenu(null), 140)),
  });

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled || menu
          ? "border-b border-border bg-card/85 backdrop-blur-xl shadow-xs"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div ref={navRef} className="container-x flex h-[70px] items-center justify-between gap-6">
        <Link href="/" aria-label="DeskFloow home" className="shrink-0 transition-opacity hover:opacity-90">
          <Logo height={35} priority />
        </Link>

        {/* Desktop Primary Navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-1.5 lg:flex">
          <div {...hover("features")} className="relative">
            <Link
              href="/features"
              aria-expanded={menu === "features"}
              aria-controls="mega-features"
              className={cn(
                "flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-medium text-foreground/80 transition hover:bg-muted hover:text-foreground",
                (menu === "features" || pathname.startsWith("/features")) && "bg-primary/10 text-primary font-semibold",
              )}
            >
              Features <ChevronDown className={cn("size-3.5 transition-transform duration-200", menu === "features" && "rotate-180")} />
            </Link>
          </div>

          {mainNav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-full px-4 py-2 text-[14px] font-medium text-foreground/80 transition hover:bg-muted hover:text-foreground",
                pathname.startsWith(l.href) && "bg-primary/10 text-primary font-semibold",
              )}
            >
              {l.label}
            </Link>
          ))}

          <div {...hover("resources")} className="relative">
            <button
              aria-expanded={menu === "resources"}
              onClick={() => setMenu(menu === "resources" ? null : "resources")}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-medium text-foreground/80 transition hover:bg-muted hover:text-foreground",
                menu === "resources" && "bg-muted text-foreground",
              )}
            >
              Resources <ChevronDown className={cn("size-3.5 transition-transform duration-200", menu === "resources" && "rotate-180")} />
            </button>

            <AnimatePresence>
              {menu === "resources" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.16 }}
                  className="card absolute top-full left-0 mt-2 w-60 p-2 shadow-xl border border-border bg-card text-card-foreground"
                >
                  {resourcesNav.map((r) => (
                    <Link
                      key={r.href}
                      href={r.href}
                      className="block rounded-xl px-3 py-2 text-[14px] text-foreground/80 transition hover:bg-muted hover:text-foreground"
                    >
                      {r.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Right Action Cluster: Log In + CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/login"
            className="rounded-full px-4 py-2 text-[14px] font-semibold text-foreground/80 transition-colors hover:text-foreground hover:bg-muted"
          >
            Log in
          </Link>
          <ButtonLink href="/book-demo" size="sm" className="shadow-brand-glow">
            Book a Demo <ArrowRight className="size-3.5" />
          </ButtonLink>
        </div>

        {/* Mobile Navbar Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            className="rounded-full p-2 text-foreground hover:bg-muted transition"
            onClick={() => setMobile(true)}
            aria-label="Open menu"
            aria-expanded={mobile}
          >
            <Menu className="size-5" />
          </button>
        </div>

        {/* Mega Menu Dropdown for Features */}
        <AnimatePresence>
          {menu === "features" && (
            <motion.div
              id="mega-features"
              {...hover("features")}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute inset-x-0 top-full hidden lg:block"
            >
              <div className="container-x pt-2">
                <div className="card grid grid-cols-[1fr_300px] overflow-hidden border border-border shadow-2xl bg-card">
                  <div className="grid grid-cols-3 gap-1.5 p-4">
                    {platformNav.map((n) => (
                      <Link
                        key={n.label}
                        href={n.href}
                        className="group flex gap-3.5 rounded-xl p-3 transition hover:bg-muted"
                      >
                        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                          <n.icon className="size-4.5" />
                        </span>
                        <span>
                          <span className="block text-[14px] font-semibold text-foreground">{n.label}</span>
                          <span className="block text-[12.5px] leading-snug text-muted-foreground">{n.description}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/book-demo"
                    className="group relative flex flex-col justify-end overflow-hidden bg-gradient-to-br from-brand-900 to-brand-950 p-6 text-white"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgb(153_85_255/0.5),transparent_60%)]" />
                    <div className="absolute -top-6 right-6 size-28 rounded-full bg-gold-400/30 blur-2xl" />
                    <PlayCircle className="relative mb-auto size-8 text-gold-300" />
                    <p className="relative text-[18px] font-bold tracking-tight">Experience DeskFloow</p>
                    <p className="relative mt-1 text-[13px] text-white/75 leading-relaxed">
                      Schedule a 1-on-1 personalized walkthrough configured for your property and channel mix.
                    </p>
                    <span className="relative mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-gold-300">
                      Book a guided demo <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobile && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobile(false)}
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-50 flex w-[min(380px,90vw)] flex-col border-l border-border bg-card text-card-foreground shadow-2xl lg:hidden"
            >
              <div className="flex h-[70px] items-center justify-between border-b border-border px-5">
                <Logo height={32} />
                <div className="flex items-center gap-2">
                  <button onClick={() => setMobile(false)} className="rounded-full p-2 text-foreground hover:bg-muted" aria-label="Close menu">
                    <X className="size-5" />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                <div>
                  <p className="mb-2 text-[11px] font-bold tracking-widest text-muted-foreground uppercase">Features</p>
                  <div className="grid gap-1">
                    {platformNav.map((n) => (
                      <Link
                        key={n.label}
                        href={n.href}
                        className="flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-[15px] font-medium text-foreground hover:bg-muted"
                      >
                        <n.icon className="size-4 text-primary" /> {n.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-[11px] font-bold tracking-widest text-muted-foreground uppercase">Company &amp; Resources</p>
                  <div className="grid gap-1">
                    {[...mainNav, ...resourcesNav].map((l) => (
                      <Link
                        key={l.href + l.label}
                        href={l.href}
                        className="block rounded-xl px-2.5 py-2 text-[15px] font-medium text-foreground hover:bg-muted"
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid gap-2.5 border-t border-border p-5">
                <ButtonLink href="/book-demo">Book a Guided Demo</ButtonLink>
                <ButtonLink href="/login" variant="secondary">Log in to Portal</ButtonLink>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
