import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const features = [
  "Creative Designs",
  "Quality Printing",
  "Custom Solutions",
  "Professional Finishing",
  "Affordable Pricing",
  "Customer Satisfaction",
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-canvas py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ------------------------------------------------------ visual */}
          <Reveal className="relative">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-surface shadow-soft ring-1 ring-white/10">
              <Image
                src="/images/about/wedding-cards.webp"
                alt="Elegant wedding invitation set featuring a peacock design and white orchids on a marble background"
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* ----------------------------------------------------- content */}
          <div>
            <SectionHeading
              align="left"
              eyebrow="About Us"
              title={
                <>
                  About <span className="text-gradient">Bhavani Printing World</span>
                </>
              }
            />

            <Reveal delay={0.1}>
              <p className="mt-5 text-base leading-relaxed text-ink-500 sm:text-lg">
                Bhavani Printing World provides creative design and professional printing solutions
                for individuals, businesses, events and special occasions. From simple document
                printing to customized wedding cards, photo frames, promotional materials and gift
                articles, we focus on quality, attractive design and reliable service.
              </p>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-sm font-semibold text-ink-700 transition-colors hover:border-gold-500/40 hover:text-gold-300"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-600" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/about"
                  className="group inline-flex min-h-[48px] items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
                >
                  Know More About Us
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/gallery"
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-gold-500/40 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-gold-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:bg-brand-50"
                >
                  See Our Work
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
