import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import PrintingProcess from "@/components/PrintingProcess";
import CTA from "@/components/CTA";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Bhavani Printing World — a local printing and graphic design studio offering wedding cards, frames, ID cards, brochures, banners and customized printing.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Bhavani Printing World",
    description:
      "A local printing and graphic design studio — design, print and personalized products under one roof.",
    url: "/about",
  },
};

const highlights = [
  "Design and printing handled under one roof",
  "Careful proofing before anything goes to print",
  "Options for personal, business and event requirements",
  "Clear communication at every stage of your order",
];

export default function AboutPage() {
  return (
    <>
      {/* Page hero */}
      <section className="relative overflow-hidden bg-canvas pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-20 h-80 w-80 rounded-full bg-brand-500/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
            <Link href="/" className="transition hover:text-brand-700">
              Home
            </Link>
            <span className="mx-2 text-slate-300">/</span>
            <span className="font-medium text-ink-900">About</span>
          </nav>

          <div className="mt-6 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-700">
              About us
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
              A studio for design, print and{" "}
              <span className="text-gradient">personalized products</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-500 sm:text-lg">
              {site.name} brings ideas to life with careful design, quality printing and
              finishing that looks as good in your hands as it did on screen.
            </p>
          </div>
        </div>
      </section>

      <About />

      {/* Highlights */}
      <section className="bg-white/[0.02] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-line shadow-[0_30px_70px_-45px_rgba(0,0,0,0.8)]">
                <Image
                  src="/images/about/studio.webp"
                  alt="Printing and design workspace at a graphics studio with printer, paper stock and colour proofs"
                  width={900}
                  height={700}
                  className="h-full w-full object-cover"
                />
              </div>
              <div
                aria-hidden
                className="absolute -bottom-6 -left-6 -z-10 hidden h-40 w-40 rounded-3xl bg-brand-gradient opacity-20 blur-2xl sm:block"
              />
            </div>

            <div>
              <SectionHeading
                eyebrow="How we work"
                title={
                  <>
                    Care at every <span className="text-gradient">step</span>
                  </>
                }
                description="Good printing is the result of small, careful decisions from first sketch to final finish."
                align="left"
              />
              <ul className="mt-6 space-y-4">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="text-[15px] leading-relaxed text-slate-600">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <PrintingProcess />
      <CTA />
    </>
  );
}
