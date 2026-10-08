"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { navLinks } from "@/lib/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hash, setHash] = useState("");
  const pathname = usePathname();

  // Close the mobile menu when the route changes (state adjusted during render,
  // per https://react.dev/learn/you-might-not-need-an-effect).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => {
    const [path, targetHash] = href.split("#");
    if (targetHash) return pathname === path && hash === `#${targetHash}`;
    return href === pathname || (href !== "/" && pathname.startsWith(path));
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-black/85 shadow-[0_10px_30px_-24px_rgba(0,0,0,0.8)] backdrop-blur-md"
          : "border-b border-white/5 bg-black/55 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="Bhavani Graphics Studio — home">
          <Image
            src="/images/logo.png"
            alt=""
            width={701}
            height={582}
            priority
            sizes="48px"
            className="h-10 w-auto shrink-0 invert mix-blend-screen transition-transform duration-300 group-hover:-rotate-3"
          />
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-bold tracking-tight text-white sm:text-[18px]">
              Bhavani <span className="text-gradient">Graphics</span>
            </span>
            <span className="mt-[4px] text-[9px] font-semibold uppercase tracking-[0.24em] text-gold-300/90 sm:mt-[5px] sm:text-[10px]">
              Studio
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive(link.href)
                  ? "text-brand-700"
                  : link.label === "Our Work"
                    ? "text-white hover:bg-brand-50 hover:text-brand-700"
                    : "text-ink-700 hover:bg-brand-50 hover:text-brand-700"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-gradient"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact#enquiry"
            className="hidden items-center gap-1.5 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift sm:inline-flex"
          >
            Get a Quote
            <ArrowRight className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface text-ink-900 transition-colors hover:border-gold-500/50 hover:text-gold-300 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-surface lg:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-brand-50 text-brand-700"
                      : link.label === "Our Work"
                        ? "text-white hover:bg-white/[0.05]"
                        : "text-ink-700 hover:bg-white/[0.05]"
                  }`}
                >
                  {link.label}
                  <ArrowRight className="h-4 w-4 opacity-40" />
                </Link>
              ))}
              <Link
                href="/contact#enquiry"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-5 py-3.5 text-sm font-semibold text-white shadow-soft"
              >
                Get a Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
