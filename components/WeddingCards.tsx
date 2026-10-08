import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gem } from "lucide-react";
import Reveal from "@/components/Reveal";

const categories = [
  "Traditional Wedding Cards",
  "Modern Wedding Invitations",
  "Engagement Invitations",
  "Birthday Invitations",
  "Anniversary Invitations",
  "Special Event Invitations",
];

const thumbnails = [
  {
    src: "/images/wedding/traditional.webp",
    alt: "Traditional Indian wedding card with decorative artwork",
    label: "Traditional",
  },
  {
    src: "/images/wedding/modern.webp",
    alt: "Modern wedding invitation with matching envelope",
    label: "Modern",
  },
  {
    src: "/images/wedding/gold.webp",
    alt: "Premium wedding invitation with golden detailing",
    label: "Premium",
  },
];

export default function WeddingCards() {
  return (
    <section className="scroll-mt-24 border-y border-gold-500/25 bg-[#100e08] py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* ---------------------------------------------------- big visual */}
        <Reveal className="order-2 lg:order-1">
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] border border-gold-300/60" aria-hidden="true" />
            <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-canvas shadow-soft">
              <Image
                src="/images/wedding/invitation-large.webp"
                alt="Elegant traditional Indian wedding invitation card printed with fine detailing"
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 sm:gap-4">
              {thumbnails.map((thumb) => (
                <div
                  key={thumb.src}
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-surface shadow-sm ring-1 ring-gold-500/30"
                >
                  <Image
                    src={thumb.src}
                    alt={thumb.alt}
                    fill
                    sizes="(min-width: 1024px) 16vw, 30vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute bottom-1.5 left-1.5 rounded-md bg-black/75 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gold-300">
                    {thumb.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* --------------------------------------------------------- copy */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-300/70 bg-gold-100/70 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-700">
              <Gem className="h-3.5 w-3.5" />
              Wedding Printing
            </span>

            <h2 className="mt-5 font-display text-3xl font-bold leading-[1.14] tracking-tight text-ink-950 sm:text-4xl lg:text-[2.9rem]">
              Beautiful Invitations For{" "}
              <span className="text-gold-600">Beautiful Moments</span>
            </h2>

            <p className="mt-4 text-base leading-relaxed text-ink-500 sm:text-lg">
              Wedding invitations designed and printed to match the mood of your celebration — from
              traditional Indian cards to clean modern layouts and premium finishes.
            </p>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {categories.map((category) => (
                <li
                  key={category}
                  className="flex items-center gap-3 rounded-xl border border-gold-500/25 bg-surface px-4 py-3 text-sm font-semibold text-ink-700 transition-all duration-300 hover:border-gold-400/70 hover:shadow-soft"
                >
                  <span className="h-2 w-2 shrink-0 rotate-45 bg-gold-400" aria-hidden="true" />
                  {category}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/services#wedding-cards"
                className="group inline-flex min-h-[52px] items-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-7 py-3.5 text-sm font-bold text-black shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift sm:text-base"
              >
                Explore Wedding Cards
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/gallery?filter=wedding"
                className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-ink-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 sm:text-base"
              >
                View Card Designs
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
