import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";

const collage = [
  { src: "/images/wedding/traditional.webp", alt: "Custom printed wedding card", className: "col-span-2 row-span-3" },
  { src: "/images/hero/business-cards.webp", alt: "Custom printed business cards", className: "" },
  { src: "/images/services/photo-frames.webp", alt: "Customised photo frame", className: "" },
  { src: "/images/services/gift-articles.webp", alt: "Customized printed mug", className: "" },
  { src: "/images/services/brochures.webp", alt: "Custom printed brochure", className: "" },
  { src: "/images/services/id-cards.webp", alt: "Custom printed ID cards", className: "" },
  { src: "/images/services/stickers-labels.webp", alt: "Custom printed stickers", className: "" },
];

export default function CustomPrinting() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0b0a08] via-[#151209] to-[#241a05] py-16 sm:py-24">
      <div className="glow -left-24 top-10 h-72 w-72 bg-brand-500/40" />
      <div className="glow bottom-0 right-0 h-80 w-80 bg-royal-500/30" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-200">
              <Sparkles className="h-3.5 w-3.5" />
              Custom Printing
            </span>

            <h2 className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Made For <span className="text-gold-300">Your Ideas</span>
            </h2>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              Have a unique printing requirement? Tell us what you need and we will help you turn
              your idea into a beautiful printed product.
            </p>

            <ul className="mt-7 grid gap-2.5 text-sm text-white/80 sm:grid-cols-2">
              {[
                "Wedding cards",
                "Business cards",
                "Photo frames",
                "Mugs",
                "Brochures",
                "ID cards",
                "Gift articles",
                "And much more",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-300" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/contact#enquiry"
              className="group mt-9 inline-flex min-h-[52px] items-center gap-2 rounded-full bg-gold-300 px-7 py-3.5 text-sm font-bold text-black shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-200 hover:shadow-lift sm:text-base"
            >
              Request Custom Printing
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="grid aspect-[4/3] grid-cols-4 grid-rows-3 gap-3 sm:gap-4">
            {collage.map((item, i) => (
              <div
                key={item.src + i}
                className={`group relative overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/15 sm:rounded-2xl ${item.className}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 45vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
