import type { Metadata } from "next";
import Link from "next/link";
import Contact from "@/components/Contact";
import MapSection from "@/components/MapSection";

export const metadata: Metadata = {
  title: "Contact | Bhavani Graphics Studio",
  description:
    "Get in touch with Bhavani Graphics Studio for printing and design enquiries — request a quote for wedding cards, frames, cards, brochures, banners and customized printing.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Bhavani Graphics Studio",
    description:
      "Request a quote for printing and design work — share your sizes, quantities and deadline and we'll reply with options.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-canvas pt-32 pb-12 sm:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-16 h-72 w-72 rounded-full bg-royal-500/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
            <Link href="/" className="transition hover:text-brand-700">
              Home
            </Link>
            <span className="mx-2 text-slate-300">/</span>
            <span className="font-medium text-ink-900">Contact</span>
          </nav>
          <h1 className="sr-only">Contact Bhavani Graphics Studio</h1>
        </div>
      </section>

      <Contact />
      <MapSection />
    </>
  );
}
