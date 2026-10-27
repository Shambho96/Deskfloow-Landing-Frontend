"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, Search, X, ArrowRight, PlayCircle } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/button";
import { mainNav, platformNav, resourcesNav } from "@/data/nav";
import { cn } from "@/lib/utils";

type MenuKey = "platform" | "resources" | null;

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

  const openPalette = () => window.dispatchEvent(new CustomEvent("deskfloow:palette"));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled || menu ? "border-b border-line/80 bg-white/85 backdrop-blur-xl" : "border-b border-transparent bg-transparent",
      )}
    >
      <div ref={navRef} className="container-x flex h-[68px] items-center justify-between gap-6">
        <Link href="/" aria-label="DeskFloow home" className="shrink-0">
          <Logo height={34} priority />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          <div {...hover("platform")} className="relative">
            <button
              aria-expanded={menu === "platform"}
              aria-controls="mega-platform"
              onClick={() => setMenu(menu === "platform" ? null : "platform")}
              className={cn(
                "flex items-center gap-1 rounded-full px-3.5 py-2 text-[14px] font-medium text-ink/80 transition hover:bg-brand-100/60 hover:text-ink",
                menu === "platform" && "bg-brand-100/60 text-ink",
              )}
            >
              Platform <ChevronDown className={cn("size-3.5 transition", menu === "platform" && "rotate-180")} />
            </button>
          </div>
          {mainNav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-[14px] font-medium text-ink/80 transition hover:bg-brand-100/60 hover:text-ink",
                pathname.startsWith(l.href) && "text-brand-700",
              )}
            >
              {l.label}
            </Link>
          ))}
          <div {...hover("resources")} className="relative">
            <button
              aria-expanded={menu === "resources"}
              onClick={() => setMenu(menu === "resources" ? null : "resources")}
              className="flex items-center gap-1 rounded-full px-3.5 py-2 text-[14px] font-medium text-ink/80 transition hover:bg-brand-100/60 hover:text-ink"
            >
              Resources <ChevronDown className={cn("size-3.5 transition", menu === "resources" && "rotate-180")} />
            </button>
            <AnimatePresence>
              {menu === "resources" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.16 }}
                  className="card absolute top-full left-0 mt-2 w-60 p-2"
                >
                  {resourcesNav.map((r) => (
                    <Link key={r.href} href={r.href} className="block rounded-xl px-3 py-2 text-[14px] text-ink/80 hover:bg-brand-50 hover:text-ink">
                      {r.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <button
            onClick={openPalette}
            className="flex h-9 items-center gap-2 rounded-full border border-line bg-white/70 px-3 text-[13px] text-muted transition hover:border-brand-300"
            aria-label="Search demo records (Ctrl+K)"
          >
            <Search className="size-3.5" /> Search
            <kbd className="rounded border border-line bg-brand-50 px-1.5 font-mono text-[10px]">Ctrl K</kbd>
          </button>
          <Link href="/login" className="rounded-full px-3 py-2 text-[14px] font-medium text-ink/80 hover:text-ink">
            Log in
          </Link>
          <ButtonLink href="/book-demo" size="sm">
            Book a Demo <ArrowRight className="size-3.5" />
          </ButtonLink>
        </div>

        <button className="rounded-full p-2 lg:hidden" onClick={() => setMobile(true)} aria-label="Open menu" aria-expanded={mobile}>
          <Menu className="size-5" />
        </button>

        <AnimatePresence>
          {menu === "platform" && (
            <motion.div
              id="mega-platform"
              {...hover("platform")}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute inset-x-0 top-full hidden lg:block"
            >
              <div className="container-x pt-2">
                <div className="card grid grid-cols-[1fr_300px] overflow-hidden">
                  <div className="grid grid-cols-3 gap-1 p-4">
                    {platformNav.map((n) => (
                      <Link key={n.label} href={n.href} className="group flex gap-3 rounded-xl p-3 transition hover:bg-brand-50">
                        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-100 text-brand-700 transition group-hover:bg-brand-600 group-hover:text-white">
                          <n.icon className="size-4.5" />
                        </span>
                        <span>
                          <span className="block text-[14px] font-medium text-ink">{n.label}</span>
                          <span className="block text-[12.5px] leading-snug text-muted">{n.description}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                  <Link href="/book-demo" className="group relative flex flex-col justify-end overflow-hidden bg-gradient-to-br from-brand-900 to-brand-950 p-6 text-white">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgb(153_85_255/0.5),transparent_60%)]" />
                    <div className="absolute -top-6 right-6 size-28 rounded-full bg-gold-400/30 blur-2xl" />
                    <PlayCircle className="relative mb-auto size-8 text-gold-300" />
                    <p className="relative text-[18px] font-semibold tracking-tight">Experience DeskFloow Live</p>
                    <p className="relative mt-1 text-[13px] text-white/70">Schedule a 1-on-1 walkthrough configured for your property and channel mix.</p>
                    <span className="relative mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-gold-300">
                      Book a guided demo <ArrowRight className="size-3.5 transition group-hover:translate-x-1" />
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {mobile && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-brand-950/40 backdrop-blur-sm lg:hidden"
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
              className="fixed inset-y-0 right-0 z-50 flex w-[min(380px,90vw)] flex-col bg-white shadow-2xl lg:hidden"
            >
              <div className="flex h-[68px] items-center justify-between border-b border-line px-5">
                <Logo height={30} />
                <button onClick={() => setMobile(false)} className="rounded-full p-2" aria-label="Close menu">
                  <X className="size-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5">
                <p className="mb-2 text-[11px] font-semibold tracking-widest text-muted uppercase">Platform</p>
                <div className="grid gap-1">
                  {platformNav.map((n) => (
                    <Link key={n.label} href={n.href} className="flex items-center gap-3 rounded-xl px-2 py-2 text-[15px] hover:bg-brand-50">
                      <n.icon className="size-4 text-brand-600" /> {n.label}
                    </Link>
                  ))}
                </div>
                <p className="mt-6 mb-2 text-[11px] font-semibold tracking-widest text-muted uppercase">Company</p>
                {[...mainNav, ...resourcesNav].map((l) => (
                  <Link key={l.href + l.label} href={l.href} className="block rounded-xl px-2 py-2 text-[15px] hover:bg-brand-50">
                    {l.label}
                  </Link>
                ))}
              </div>
              <div className="grid gap-2 border-t border-line p-5">
                <ButtonLink href="/book-demo">Book a Guided Demo</ButtonLink>
                <ButtonLink href="/contact" variant="secondary">Contact Sales</ButtonLink>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
