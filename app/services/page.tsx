import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { services } from "@/data/services";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";
import PhotoFrameGallery from "@/components/PhotoFrameGallery";
import WeddingCardGallery from "@/components/WeddingCardGallery";
import { site, whatsappLink } from "@/lib/site";

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
                {service.slug === "wedding-cards" || service.slug === "photo-frames" ? (
                  <div className="border-t border-line/60 bg-black/25 p-5 sm:p-6">
                    {service.slug === "wedding-cards" ? (
                      <WeddingCardGallery />
                    ) : (
                      <PhotoFrameGallery />
                    )}
                  </div>
                ) : (
                  service.gallery &&
                  service.gallery.length > 0 && (
                    <div className="border-t border-line/60 bg-black/25 p-5 sm:p-6">
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-400/90">
                          More {service.title} work
                        </p>
                        <span className="text-[11px] uppercase tracking-[0.14em] text-ink-400">
                          {service.gallery.length} photos
                        </span>
                      </div>
                      <ul
                        className={`grid gap-x-4 gap-y-8 ${
                          service.slug === "gift-articles"
                            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                            : "grid-cols-2 sm:grid-cols-4"
                        }`}
                      >
                        {service.gallery.map((item) => (
                          <li
                            key={item.image}
                            className={
                              service.slug === "gift-articles"
                                ? "group/tile flex flex-col"
                                : "group/tile relative aspect-[4/3] overflow-hidden rounded-xl bg-canvas ring-1 ring-white/5"
                            }
                          >
                            {service.slug === "gift-articles" && item.title ? (
                              <>
                                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-surface shadow-soft ring-1 ring-gold-500/25 transition-all duration-300 group-hover/tile:-translate-y-1 group-hover/tile:shadow-lift group-hover/tile:ring-gold-400/70">
                                  <Image
                                    src={item.image}
                                    alt={item.alt}
                                    fill
                                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                                    className="object-contain transition-transform duration-700 ease-out group-hover/tile:scale-[1.06]"
                                  />
                                </div>
                                <div className="mt-4 flex flex-1 flex-col">
                                  <h3 className="font-display text-[15px] font-bold leading-snug text-ink-950">
                                    {item.title}
                                  </h3>
                                  <a
                                    href={whatsappLink(
                                      `Hello Bhavani Printing World, I am interested in ${item.title}. Please share details and pricing.`,
                                    )}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Enquire about ${item.title} on WhatsApp`}
                                    className="mt-4 inline-flex min-h-[46px] w-full items-center justify-center gap-2.5 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-bold shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
                                  >
                                    <FaWhatsapp className="h-[17px] w-[17px]" aria-hidden="true" />
                                    Enquire on WhatsApp
                                  </a>
                                </div>
                              </>
                            ) : (
                              <Image
                                src={item.image}
                                alt={item.alt}
                                fill
                                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 25vw, 50vw"
                                className="object-cover transition-transform duration-500 ease-out group-hover/tile:scale-105"
                              />
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
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
