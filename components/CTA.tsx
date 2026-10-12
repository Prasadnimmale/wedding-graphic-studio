import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Reveal from "@/components/Reveal";
import { callLink, whatsappLink } from "@/lib/site";

export default function CTA() {
  return (
    <section className="relative overflow-hidden border-y border-gold-200/15 bg-surface py-16 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(234,179,8,0.09),transparent_62%)]"
      />
      <div className="glow -left-20 -top-20 h-72 w-72 bg-gold-400/10" />
      <div className="glow -bottom-24 right-0 h-80 w-80 bg-[#8a6a00]/25" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">
            Ready when you are
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-[1.12] tracking-tight text-ink-950 sm:text-4xl lg:text-[2.75rem]">
            Need Printing? Let&apos;s Create{" "}
            <span className="text-gradient">Something Beautiful.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-500 sm:text-lg">
            Whether you need wedding cards, business printing, photo frames, ID cards, brochures or
            customized gifts, Bhavani Printing World is ready to help.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={callLink()}
              className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-sm font-bold text-white shadow-[0_16px_32px_-18px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lift sm:w-auto sm:text-base"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </Link>

            <Link
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-wa px-7 py-3.5 text-sm font-bold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-lift sm:w-auto sm:text-base"
            >
              <FaWhatsapp className="h-[22px] w-[22px] text-white" aria-hidden />
              WhatsApp Us
            </Link>

            <Link
              href="/contact#enquiry"
              className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full border border-gold-300/40 px-7 py-3.5 text-sm font-bold text-gold-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:bg-gold-400/10 hover:shadow-lift sm:w-auto sm:text-base"
            >
              Get a Quote
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}