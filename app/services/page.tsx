import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { services } from "@/data/services";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";
import ServiceGallery from "@/components/ServiceGallery";
import { site, whatsappLink } from "@/lib/site";

/** Per-gallery local placeholder shown when a tile image cannot load. */
const portfolioFallback: Record<string, string> = {
  pamphlets: "/images/pamphlets/fallback.svg",
  "id-cards": "/images/id-cards/fallback.svg",
  brochures: "/images/brochures/fallback.svg",
  "visiting-cards": "/images/visiting-cards/fallback.svg",
  "banners-posters": "/images/banners-posters/fallback.svg",
  "photo-printing": "/images/photo-printing/fallback.svg",
  "stickers-labels": "/images/stickers-labels/fallback.svg",
  "flex-vinyl-printing": "/images/flex-vinyl-printing/fallback.svg",
};

/** Per-service override for the work-gallery heading (default: "More <title> work"). */
const galleryHeading: Record<string, string> = {
  "flex-vinyl-printing": "Flex & Vinyl Printing Designs",
};

export const metadata: Metadata = {
  title: "Printing Services",
  description:
    "Explore our printing services — photo frames, ID cards, wedding cards, pamphlets, brochures, visiting cards, banners, photo printing, gift articles, stickers, flex printing and more.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Printing Services | Bhavani Printing World",
    description:
      "Photo frames, wedding cards, ID cards, brochures, banners, stickers, flex printing and more — design and print under one roof.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* Page hero + quick anchors */}
      <section className="relative overflow-hidden bg-canvas pt-32 pb-14 sm:pt-40 sm:pb-16">
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
            <span className="font-medium text-ink-900">Services</span>
          </nav>

          <div className="mt-6 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-700">
              What we offer
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
              Printing services for <span className="text-gradient">every need</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-500 sm:text-lg">
              Personal, professional and business printing — designed carefully, printed
              cleanly, finished neatly. Jump to any service below.
            </p>
          </div>

          <nav aria-label="Service list" className="mt-8">
            <ul className="flex flex-wrap gap-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <a
                    href={`#${service.slug}`}
                    className={`inline-flex rounded-full border px-4 py-2 text-sm font-medium transition hover:bg-brand-50 hover:text-gold-300 ${
                      service.premium
                        ? "border-gold-500/45 bg-brand-50 text-gold-300"
                        : "border-line bg-surface text-ink-700 hover:border-gold-500/40"
                    }`}
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* Detail sections */}
      <section className="bg-white/[0.02] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl space-y-16 px-4 sm:space-y-20 sm:px-6 lg:px-8">
          {services.map((service, i) => {
            const reverse = i % 2 === 1;
            return (
              <article
                key={service.slug}
                id={service.slug}
                className={`scroll-mt-28 overflow-hidden rounded-3xl border bg-surface shadow-[0_24px_60px_-45px_rgba(0,0,0,0.7)] ${
                  service.premium ? "border-gold-500/40 ring-1 ring-gold-500/20" : "border-line"
                }`}
              >
                <div className="grid lg:grid-cols-2">
                  <div
                    className={`relative min-h-[260px] sm:min-h-[320px] ${reverse ? "lg:order-2" : ""}`}
                  >
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover object-center"
                    />
                    {service.premium && (
                      <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-gold-300 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-black shadow-lg">
                        <Sparkles className="h-3.5 w-3.5" aria-hidden />
                        Premium
                      </span>
                    )}
                    {service.featured && (
                      <span className="absolute left-4 top-4 rounded-full bg-brand-gradient px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-lg">
                        Most requested
                      </span>
                    )}
                  </div>

                  <div
                    className={`flex flex-col justify-center p-6 sm:p-8 lg:p-10 ${reverse ? "lg:order-1" : ""}`}
                  >
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700">
                      {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                    </span>
                    <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink-950 sm:text-3xl">
                      {service.title}
                    </h2>
                    <p className="mt-4 text-[15px] leading-relaxed text-ink-500 sm:text-base">
                      {service.description}
                    </p>

                    {service.points && (
                      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                        {service.points.map((point) => (
                          <li key={point} className="flex items-start gap-2.5">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                            </span>
                            <span className="text-sm leading-snug text-ink-700">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-7 flex flex-wrap gap-3">
                      <Link
                        href="/contact#enquiry"
                        className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_32px_-18px_rgba(0,0,0,0.45)] transition hover:brightness-110"
                      >
                        Enquire about {service.title}
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </Link>
                      <Link
                        href="/gallery"
                        className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-semibold text-ink-700 transition hover:border-brand-300 hover:text-brand-700"
                      >
                        See our work
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Work gallery for this service */}
                {service.gallery && service.gallery.length > 0 && (
                  <div className="border-t border-line/60 bg-black/25 p-5 sm:p-6">
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <h3 className="font-display text-base font-bold text-ink-950 sm:text-lg">
                        {galleryHeading[service.slug] ?? `${service.title} Gallery`}
                      </h3>
                      <span className="shrink-0 text-xs font-medium text-ink-500">
                        {service.gallery.length} photos
                      </span>
                    </div>
                    <ServiceGallery
                      items={service.gallery.map((item) => {
                        const title = item.title ?? item.alt;
                        const message =
                          item.waMessage ??
                          `Hello ${site.name}, I am interested in ${service.title}: ${title}. Please share details and pricing.`;

                        return {
                          image: item.image,
                          alt: item.alt,
                          title,
                          description: item.description,
                          fallback: portfolioFallback[service.slug],
                          wa: whatsappLink(message),
                        };
                      })}
                      fit={service.slug === "photo-printing" ? "cover" : "contain"}
                    />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* Anything else */}
      <Reveal className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gold-200 bg-gold-50 p-6 text-center sm:p-10">
          <h2 className="text-xl font-extrabold tracking-tight text-ink-950 sm:text-2xl">
            Don&apos;t see what you need?
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-ink-500 sm:text-base">
            {site.name} handles plenty of work that isn&apos;t listed here — just tell us
            what you have in mind and we&apos;ll tell you how we can print it.
          </p>
          <Link
            href="/contact#enquiry"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-gold-300"
          >
            Ask about a custom job <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </Reveal>

      <CTA />
    </>
  );
}
