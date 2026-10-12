import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Gallery from "@/components/Gallery";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Gallery — Our Work",
  description:
    "See our printing work — wedding cards, photo frames, ID cards, visiting cards, brochures, pamphlets, gift articles, posters and everyday printing.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Our Work | Bhavani Printing World",
    description:
      "Wedding cards, frames, ID cards, visiting cards, brochures, pamphlets, posters and more — a look at what we print.",
    url: "/gallery",
  },
};

export default function GalleryPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-canvas pt-32 pb-10 sm:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-28 -top-16 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
            <Link href="/" className="transition hover:text-brand-700">
              Home
            </Link>
            <span className="mx-2 text-slate-300">/</span>
            <span className="font-medium text-ink-900">Our Work</span>
          </nav>
          <h1 className="sr-only">Our Work — printing gallery | Bhavani Printing World</h1>
        </div>
      </section>

      {/* Gallery is a client component reading ?filter= — keep it inside Suspense. */}
      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-4 py-20 text-center text-sm text-ink-500 sm:px-6 lg:px-8">
            Loading gallery…
          </div>
        }
      >
        <Gallery />
      </Suspense>

      <CTA />
    </>
  );
}
