import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gift } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const items = [
  { label: "Customized Mugs", src: "/images/services/gift-articles.webp", alt: "Customized printed coffee mug gift" },
  { label: "Photo Frames", src: "/images/services/photo-frames.webp", alt: "Photo frame gift for loved ones" },
  { label: "Keychains", src: "/images/gifts/keychain.webp", alt: "Personalised keychain gift article" },
  { label: "Personalized Gifts", src: "/images/gifts/personalized.webp", alt: "Wrapped personalized gift box" },
  { label: "Printed Bottles", src: "/images/gifts/bottle.webp", alt: "Printed personalized bottle" },
  { label: "Corporate Gifts", src: "/images/gifts/corporate.webp", alt: "Corporate gift boxes with printed branding" },
];

export default function GiftArticles() {
  return (
    <section className="scroll-mt-24 bg-canvas py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Personalized Gifting"
          eyebrowAccent="gold"
          title={
            <>
              Personalized Gifts <span className="text-gradient">That Matter</span>
            </>
          }
          description="Make birthdays, anniversaries, celebrations and special occasions memorable with personalized gifts."
        />

        <Reveal className="mt-6 flex justify-center">
          <Link
            href="/services#gift-articles"
            className="group inline-flex min-h-[50px] items-center gap-2 rounded-full border border-gold-500/40 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-gold-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:bg-brand-50"
          >
            View Gift Articles
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={(i % 3) * 0.07}>
              <article className="group overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-500/40 hover:shadow-lift">
                <div className="relative aspect-[4/3] overflow-hidden bg-canvas">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 45vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                  />
                </div>
                <figcaption className="flex items-center gap-2 px-5 py-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-100 text-gold-600 transition-colors group-hover:bg-gold-300 group-hover:text-black">
                    <Gift className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-bold text-ink-950 sm:text-base">{item.label}</span>
                </figcaption>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
