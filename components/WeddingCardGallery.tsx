"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { whatsappLink } from "@/lib/site";

type Design = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  wa: string;
};

const designs: Design[] = [
  {
    id: "traditional-gold",
    title: "Traditional Gold",
    subtitle: "Cream & gold floral Telugu invitation",
    image: "/images/wedding-cards/wedding-card-1.jpg",
    alt: "Cream and gold floral Telugu wedding invitation card design",
    wa: 'Hello Bhavani Printing World! I am interested in the "Traditional Gold" wedding card design (wedding-card-1) — cream and gold floral Telugu invitation. Please share details and pricing.',
  },
  {
    id: "maroon-royal",
    title: "Maroon Royal",
    subtitle: "Maroon & gold Hindu invitation",
    image: "/images/wedding-cards/wedding-card-2.jpg",
    alt: "Dark maroon and gold traditional Hindu wedding invitation with Lord Ganesha",
    wa: 'Hello Bhavani Printing World! I am interested in the "Maroon Royal" wedding card design (wedding-card-2) — dark maroon and gold Hindu invitation with Lord Ganesha. Please share details and pricing.',
  },
  {
    id: "pink-floral",
    title: "Pink Floral",
    subtitle: "Ivory & pink floral invitation",
    image: "/images/wedding-cards/wedding-card-3.jpg",
    alt: "Ivory and pink floral wedding invitation card design",
    wa: 'Hello Bhavani Printing World! I am interested in the "Pink Floral" wedding card design (wedding-card-3) — ivory and pink floral invitation. Please share details and pricing.',
  },
  {
    id: "emerald-gold",
    title: "Emerald Gold",
    subtitle: "Dark green & gold premium invitation",
    image: "/images/wedding-cards/wedding-card-4.jpg",
    alt: "Dark green and gold premium wedding invitation card design",
    wa: 'Hello Bhavani Printing World! I am interested in the "Emerald Gold" wedding card design (wedding-card-4) — dark green and gold premium invitation. Please share details and pricing.',
  },
  {
    id: "temple-peach",
    title: "Temple Peach",
    subtitle: "Peach invitation ",
    image: "/images/wedding-cards/wedding-card-5.jpg",
    alt: "Peach wedding invitation with traditional temple pillars and hanging bells",
    wa: 'Hello Bhavani Printing World! I am interested in the "Temple Peach" wedding card design (wedding-card-5) — peach invitation with temple pillars and hanging bells. Please share details and pricing.',
  },
  {
    id: "blue-floral",
    title: "Blue Floral",
    subtitle: "White & blue floral invitation",
    image: "/images/wedding-cards/wedding-card-6.jpg",
    alt: "White and blue floral wedding invitation card design",
    wa: 'Hello Bhavani Printing World! I am interested in the "Blue Floral" wedding card design (wedding-card-6) — white and blue floral invitation. Please share details and pricing.',
  },
  {
    id: "marigold-traditional",
    title: "Marigold Traditional",
    subtitle: "Golden-yellow with marigolds, kalash & diyas",
    image: "/images/wedding-cards/wedding-card-7.jpg",
    alt: "Golden-yellow wedding invitation with marigold flowers, kalash and traditional diyas",
    wa: 'Hello Bhavani Printing World! I am interested in the "Marigold Traditional" wedding card design (wedding-card-7) — golden-yellow invitation with marigolds, kalash and diyas. Please share details and pricing.',
  },
  {
    id: "ocean-blue",
    title: "Ocean Blue",
    subtitle: "Sky-blue beach-themed invitation",
    image: "/images/wedding-cards/wedding-card-8.jpg",
    alt: "Sky-blue beach-themed wedding invitation with blue floral decorations",
    wa: 'Hello Bhavani Printing World! I am interested in the "Ocean Blue" wedding card design (wedding-card-8) — sky-blue beach-themed invitation. Please share details and pricing.',
  },
];

export default function WeddingCardGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex === null ? null : designs[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") setActiveIndex((i) => ((i ?? 0) + 1) % designs.length);
      if (event.key === "ArrowLeft") setActiveIndex((i) => ((i ?? 0) - 1 + designs.length) % designs.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-400">
            Wedding Cards
          </p>
          <h3 className="mt-1 font-display text-xl font-extrabold tracking-tight text-ink-950 sm:text-2xl">
            Our Wedding Card <span className="text-gold-600">Collection</span>
          </h3>
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-400">
          8 designs
        </span>
      </div>
      <p className="mb-6 max-w-3xl text-sm leading-relaxed text-ink-500">
        Eight hand-crafted wedding invitation designs — click any card to view it up close and
        enquire on WhatsApp.
      </p>

      <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {designs.map((design, index) => (
          <motion.article
            key={design.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (index % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="group flex flex-col"
          >
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View the ${design.title} wedding card design`}
              className="relative block aspect-[3/4] w-full overflow-hidden rounded-2xl bg-surface shadow-soft ring-1 ring-gold-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift hover:ring-gold-400/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            >
              <Image
                src={design.image}
                alt={design.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="block text-sm font-bold text-white">{design.title}</span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur">
                  <Maximize2 className="h-4 w-4" />
                </span>
              </span>
            </button>

            <div className="mt-4 flex flex-1 flex-col">
              <h4 className="font-display text-[15px] font-bold leading-snug text-ink-950">
                {design.title}
              </h4>
              <p className="mt-0.5 text-xs leading-relaxed text-ink-500">{design.subtitle}</p>

              <a
                href={whatsappLink(design.wa)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Enquire about the ${design.title} wedding card on WhatsApp`}
                className="mt-4 inline-flex min-h-[46px] w-full items-center justify-center gap-2.5 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-bold shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
              >
                <FaWhatsapp className="h-[17px] w-[17px]" aria-hidden="true" />
                Enquire on WhatsApp
              </a>
            </div>
          </motion.article>
        ))}
      </div>

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
                <p className="text-xs uppercase tracking-[0.16em] text-gold-300">Wedding card design</p>
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
                onClick={() => setActiveIndex((i) => ((i ?? 0) - 1 + designs.length) % designs.length)}
                className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:left-5"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full w-full max-w-4xl"
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
                aria-label="Next design"
                onClick={() => setActiveIndex((i) => ((i ?? 0) + 1) % designs.length)}
                className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:right-5"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 px-6 pb-5">
              <p className="text-xs text-white/50">
                {activeIndex !== null ? activeIndex + 1 : 0} / {designs.length} — use arrow keys to
                browse, Esc to close
              </p>
              <a
                href={whatsappLink(active.wa)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Enquire about the ${active.title} wedding card on WhatsApp`}
                className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-4 py-2 text-xs font-bold shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
              >
                <FaWhatsapp className="h-3.5 w-3.5" aria-hidden="true" />
                Enquire on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}