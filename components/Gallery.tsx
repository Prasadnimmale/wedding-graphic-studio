"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { galleryFilters, galleryItems, type GalleryCategory } from "@/data/gallery";
import SectionHeading from "@/components/SectionHeading";

type FilterKey = "all" | GalleryCategory;

export default function Gallery() {
  const searchParams = useSearchParams();
  const urlFilter = searchParams.get("filter") as FilterKey | null;

  const [filter, setFilter] = useState<FilterKey>(
    urlFilter && galleryFilters.some((f) => f.key === urlFilter) ? urlFilter : "all"
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const items = useMemo(
    () => (filter === "all" ? galleryItems : galleryItems.filter((item) => item.category === filter)),
    [filter]
  );

  const active = activeIndex === null ? null : items[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") setActiveIndex((i) => ((i ?? 0) + 1) % items.length);
      if (event.key === "ArrowLeft") setActiveIndex((i) => ((i ?? 0) - 1 + items.length) % items.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, items.length]);

  return (
    <section id="our-work" className="scroll-mt-24 bg-white/[0.02] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Portfolio"
          title={
            <>
              Our <span className="text-gradient">Work</span>
            </>
          }
          description="A look at the cards, frames, prints and promotional material we design and print."
        />

        {/* ------------------------------------------------------- filters */}
        <div className="mt-9 flex justify-center">
          <div
            className="no-scrollbar -mx-4 flex max-w-full gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
            role="tablist"
            aria-label="Filter work by category"
          >
            {galleryFilters.map((tab) => {
              const isActive = filter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setFilter(tab.key);
                    setActiveIndex(null);
                  }}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "border-transparent bg-brand-gradient text-white shadow-soft"
                      : "border-line bg-surface text-ink-700 hover:border-gold-500/40 hover:text-gold-300"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* --------------------------------------------------------- grid */}
        <motion.div
          layout
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActiveIndex(index)}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-canvas ring-1 ring-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                aria-label={`Open ${item.title}`}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-left">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-gold-300">
                      {item.categoryLabel}
                    </span>
                    <span className="mt-0.5 block text-sm font-bold text-white">{item.title}</span>
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur">
                    <Maximize2 className="h-4 w-4" />
                  </span>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {items.length === 0 && (
          <p className="mt-10 text-center text-sm text-ink-500">No work in this category yet.</p>
        )}
      </div>

      {/* ------------------------------------------------------ lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] flex flex-col bg-black/95 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            onClick={() => setActiveIndex(null)}
          >
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">{active.title}</p>
                <p className="text-xs uppercase tracking-[0.16em] text-gold-300">
                  {active.categoryLabel}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Close image"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div
              className="relative flex flex-1 items-center justify-center px-3 pb-4 sm:px-6"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => setActiveIndex((i) => ((i ?? 0) - 1 + items.length) % items.length)}
                className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:left-5"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full w-full max-w-5xl"
              >
                <Image
                  src={active.image}
                  alt={active.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </motion.div>

              <button
                type="button"
                aria-label="Next image"
                onClick={() => setActiveIndex((i) => ((i ?? 0) + 1) % items.length)}
                className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:right-5"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <p className="px-6 pb-5 text-center text-xs text-white/50">
              {activeIndex !== null ? activeIndex + 1 : 0} / {items.length} — use arrow keys to
              browse, Esc to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
