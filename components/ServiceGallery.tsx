"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import PortfolioImage from "@/components/PortfolioImage";
import WhatsAppEnquiryButton from "@/components/WhatsAppEnquiryButton";

export type ServiceGalleryItem = {
  image: string;
  alt: string;
  title: string;
  description?: string;
  /** Local placeholder used when the image fails to load (tiles and modal). */
  fallback?: string;
  /** Pre-built WhatsApp link with the design name pre-filled in the message. */
  wa: string;
};

type ServiceGalleryProps = {
  items: ServiceGalleryItem[];
  /**
   * How images fill the uniform 3:4 tile. "contain" keeps complete designs
   * (wedding cards, posters, brochures …) fully visible; "cover" fills the
   * frame with photographic work so there are no empty bars.
   */
  fit?: "contain" | "cover";
};

/**
 * The single reusable service-work gallery. Every service on the services page
 * uses this component so the grid, tile size, image container, card layout,
 * heading alignment and WhatsApp button are identical everywhere.
 */
export default function ServiceGallery({ items, fit = "contain" }: ServiceGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex === null ? null : items[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") setActiveIndex((i) => ((i ?? 0) + 1) % items.length);
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
      <ul className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {items.map((item, index) => (
          <li
            key={item.image}
            className="group/tile flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/45 hover:shadow-lift"
          >
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open ${item.title} preview`}
              className="relative block aspect-[3/4] w-full overflow-hidden bg-surface-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold-400"
            >
              <PortfolioImage
                src={item.image}
                alt={item.alt}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className={`bg-[#211f1a] ${
                  fit === "cover"
                    ? "object-cover transition-transform duration-700 ease-out group-hover/tile:scale-[1.04]"
                    : "object-contain"
                }`}
                fallback={item.fallback}
              />
            </button>

            <div className="flex flex-1 flex-col p-4">
              <h3 className="font-display text-sm font-bold leading-snug text-ink-950 sm:text-[15px]">
                {item.title}
              </h3>
              {item.description && (
                <p className="mt-1.5 text-xs leading-relaxed text-ink-500">{item.description}</p>
              )}
              <div className="mt-auto pt-4">
                <WhatsAppEnquiryButton
                  href={item.wa}
                  label={`Enquire about ${item.title} on WhatsApp`}
                  className="w-full"
                />
              </div>
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
              <WhatsAppEnquiryButton
                href={active.wa}
                label={`Enquire about ${active.title} on WhatsApp`}
                size="sm"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
