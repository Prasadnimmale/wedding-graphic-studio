"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import PortfolioImage from "@/components/PortfolioImage";

export type PortfolioGalleryItem = {
  image: string;
  alt: string;
  title: string;
  description?: string;
  /** Local placeholder used when the image fails to load (None for the lightbox too). */
  fallback?: string;
  /** Pre-built WhatsApp link with the design name pre-filled in the message. */
  wa: string;
};

type PortfolioGalleryProps = {
  items: PortfolioGalleryItem[];
  /** Uniform tile ratio so every card lines up in the grid. */
  tileAspect: "aspect-[3/4]" | "aspect-[4/3]";
};

/**
 * Client portfolio grid for the services page. Renders the titled tiles
 * (image + name + WhatsApp button) and opens a larger preview with a working
 * close button, keyboard/arrow navigation and its own WhatsApp enquire link
 * whenever a tile image is clicked.
 */
export default function PortfolioGallery({ items, tileAspect }: PortfolioGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex === null ? null : items[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight")
        setActiveIndex((i) => ((i ?? 0) + 1) % items.length);
      if (event.key === "ArrowLeft")
        setActiveIndex((i) => ((i ?? 0) - 1 + items.length) % items.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, items.length]);

  return (
    <>
      <ul className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <li key={item.image} className="group/tile flex flex-col">
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open ${item.title} preview`}
              className={`relative ${tileAspect} w-full overflow-hidden rounded-2xl bg-surface shadow-soft ring-1 ring-gold-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift hover:ring-gold-400/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500`}
            >
              <PortfolioImage
                src={item.image}
                alt={item.alt}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-contain transition-transform duration-700 ease-out group-hover/tile:scale-[1.06]"
                fallback={item.fallback}
              />
            </button>

            <div className="mt-4 flex flex-1 flex-col">
              <h3 className="font-display text-[15px] font-bold leading-snug text-ink-950">
                {item.title}
              </h3>
              {item.description && (
                <p className="mt-1 text-xs leading-relaxed text-ink-500">{item.description}</p>
              )}
              <a
                href={item.wa}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Enquire about ${item.title} on WhatsApp`}
                className="mt-auto pt-4 inline-flex min-h-[46px] w-full items-center justify-center gap-2.5 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-bold shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
              >
                <FaWhatsapp className="h-[17px] w-[17px]" aria-hidden="true" />
                Enquire on WhatsApp
              </a>
            </div>
          </li>
        ))}
      </ul>

      {/* ----------------------------------------------------- lightbox */}
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
                <p className="text-xs uppercase tracking-[0.16em] text-gold-300">Design preview</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Close preview"
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
                aria-label="Previous design"
                onClick={() =>
                  setActiveIndex((i) => ((i ?? 0) - 1 + items.length) % items.length)
                }
                className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:left-5"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <motion.div
                key={active.image}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full w-full max-w-4xl"
              >
                <PortfolioImage
                  src={active.image}
                  alt={active.alt}
                  sizes="100vw"
                  className="object-contain"
                  fallback={active.fallback}
                />
              </motion.div>

              <button
                type="button"
                aria-label="Next design"
                onClick={() => setActiveIndex((i) => ((i ?? 0) + 1) % items.length)}
                className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:right-5"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 px-6 pb-5">
              <p className="text-xs text-white/50">
                {activeIndex !== null ? activeIndex + 1 : 0} / {items.length} — use arrow keys to
                browse, Esc to close
              </p>
              <a
                href={active.wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-4 py-2 text-xs font-bold shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
              >
                <FaWhatsapp className="h-3.5 w-3.5" aria-hidden="true" />
                Enquire on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}