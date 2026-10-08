import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const items = [
  { label: "Visiting Cards", src: "/images/services/visiting-cards.webp", alt: "Premium visiting cards printed for a business" },
  { label: "Letterheads", src: "/images/business/letterhead.webp", alt: "Printed letterhead and office stationery" },
  { label: "Brochures", src: "/images/services/brochures.webp", alt: "Folded professional business brochure" },
  { label: "Flyers", src: "/images/business/flyer.webp", alt: "Printed promotional flyer" },
  { label: "ID Cards", src: "/images/services/id-cards.webp", alt: "Professional printed ID cards with lanyards" },
  { label: "Product Labels", src: "/images/business/label.webp", alt: "Custom printed product label on packaging" },
  { label: "Stickers", src: "/images/services/stickers-labels.webp", alt: "Custom printed stickers for branding" },
  { label: "Posters", src: "/images/business/poster.webp", alt: "Printed promotional poster on a wall" },
];

export default function BusinessPrinting() {
  return (
    <section className="scroll-mt-24 bg-white/[0.02] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="For Businesses"
          eyebrowAccent="brand"
          title={
            <>
              Professional Printing For <span className="text-gradient">Your Business</span>
            </>
          }
          description="Build a stronger brand presence with professional designs and high-quality printed materials."
        />

        <Reveal className="mt-6 flex justify-center">
          <Link
            href="/contact#enquiry"
            className="group inline-flex min-h-[50px] items-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
          >
            Get Business Printing
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={(i % 4) * 0.06}>
              <figure className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-canvas shadow-soft ring-1 ring-white/10">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 45vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-4 pb-3 pt-10">
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-white">
                    <BriefcaseBusiness className="h-3.5 w-3.5 text-gold-300" />
                    {item.label}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
