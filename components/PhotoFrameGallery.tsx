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
  image: string;
  alt: string;
  wa: string;
};

const designs: Design[] = [
  {
    id: "classic-black-gold-couple",
    title: "Classic Black & Gold Couple Frame",
    image: "/images/photo-frames/photo-frame-1.jpg",
    alt: "Classic black and gold photo frame with a couple photograph",
    wa: 'Hello Bhavani Printing World! I am interested in the "Classic Black & Gold Couple" photo frame design (photo-frame-1). Please share details and pricing.',
  },
  {
    id: "black-family-collage",
    title: "Black Family Collage Frame",
    image: "/images/photo-frames/photo-frame-2.jpg",
    alt: "Black family collage photo frame with several family photographs",
    wa: 'Hello Bhavani Printing World! I am interested in the "Black Family Collage" photo frame design (photo-frame-2). Please share details and pricing.',
  },
  {
    id: "white-floral-portrait",
    title: "White Floral Portrait Frame",
    image: "/images/photo-frames/photo-frame-3.jpg",
    alt: "White photo frame with floral detailing holding a portrait photograph",
    wa: 'Hello Bhavani Printing World! I am interested in the "White Floral Portrait" photo frame design (photo-frame-3). Please share details and pricing.',
  },
  {
    id: "rustic-wooden-landscape",
    title: "Rustic Wooden Landscape Frame",
    image: "/images/photo-frames/photo-frame-4.jpg",
    alt: "Rustic wooden landscape photo frame with warm timber tones",
    wa: 'Hello Bhavani Printing World! I am interested in the "Rustic Wooden Landscape" photo frame design (photo-frame-4). Please share details and pricing.',
  },
  {
    id: "transparent-acrylic-baby",
    title: "Transparent Acrylic Baby Frame",
    image: "/images/photo-frames/photo-frame-5.jpg",
    alt: "Transparent acrylic baby photo frame with a soft neutral finish",
    wa: 'Hello Bhavani Printing World! I am interested in the "Transparent Acrylic Baby" photo frame design (photo-frame-5). Please share details and pricing.',
  },
  {
    id: "multi-photo-travel",
    title: "Multi-Photo Travel Memory Frame",
    image: "/images/photo-frames/photo-frame-6.jpg",
    alt: "Multi-photo travel memory frame displaying several small photographs",
    wa: 'Hello Bhavani Printing World! I am interested in the "Multi-Photo Travel Memory" photo frame design (photo-frame-6). Please share details and pricing.',
  },
  {
    id: "heart-shaped-wooden",
    title: "Heart-Shaped Wooden Couple Frame",
    image: "/images/photo-frames/photo-frame-7.jpg",
    alt: "Heart-shaped wooden couple photo frame with a warm finish",
    wa: 'Hello Bhavani Printing World! I am interested in the "Heart-Shaped Wooden Couple" photo frame design (photo-frame-7). Please share details and pricing.',
  },
  {
    id: "classic-black-portrait",
    title: "Classic Black Portrait Frame",
    image: "/images/photo-frames/photo-frame-8.jpg",
    alt: "Classic black portrait photo frame with a single portrait photograph",
    wa: 'Hello Bhavani Printing World! I am interested in the "Classic Black Portrait" photo frame design (photo-frame-8). Please share details and pricing.',
  },
];

export default function PhotoFrameGallery() {
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
            Photo Frames
          </p>
          <h3 className="mt-1 font-display text-xl font-extrabold tracking-tight text-ink-950 sm:text-2xl">
            Our Photo Frame <span className="text-gold-600">Collection</span>
          </h3>
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-400">
          8 designs
        </span>
      </div>
      <p className="mb-6 max-w-3xl text-sm leading-relaxed text-ink-500">
        Beautifully crafted photo frames for family memories, special occasions, and thoughtful
        gifts.
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
              aria-label={`Open ${design.title} photo frame design`}
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

              <a
                href={whatsappLink(design.wa)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Enquire about the ${design.title} design on WhatsApp`}
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
                <p className="text-xs uppercase tracking-[0.16em] text-gold-300">Photo frame</p>
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

            <div className="flex items-center justify-center gap-3 px-6 pb-5">
              <p className="text-xs text-white/50">
                {activeIndex !== null ? activeIndex + 1 : 0} / {designs.length} — use arrow keys to
                browse, Esc to close
              </p>
              <a
                href={whatsappLink(active.wa)}
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
    </div>
  );
}