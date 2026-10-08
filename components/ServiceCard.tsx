import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/site";

type ServiceCardProps = {
  service: Service;
  priority?: boolean;
};

export default function ServiceCard({ service, priority = false }: ServiceCardProps) {
  const sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw";

  if (service.featured) {
    return (
      <article className="group relative flex min-h-[380px] flex-col justify-end overflow-hidden rounded-2xl shadow-soft ring-1 ring-white/10">
        <Image
          src={service.image}
          alt={service.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50" />

        <div className="relative p-6">
          <span className="inline-flex items-center rounded-full border border-gold-300/60 bg-gold-400/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-300">
            Everything we print
          </span>
          <h3 className="mt-3 text-2xl font-extrabold leading-tight text-white">{service.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/80">{service.shortDescription}</p>
          <Link
            href="/contact#enquiry"
            className="mt-5 inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full bg-gold-300 px-5 py-3 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-200"
          >
            Need Something Special? Contact Us
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-500/40 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden bg-canvas">
        <Image
          src={service.image}
          alt={service.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold tracking-tight text-ink-950">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{service.shortDescription}</p>
        <Link
          href={`/services#${service.slug}`}
          className="mt-5 inline-flex min-h-[42px] w-fit items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-ink-700 transition-all duration-300 group-hover:border-brand-600 group-hover:bg-brand-gradient group-hover:text-white"
          aria-label={`View details about ${service.title}`}
        >
          View Details
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
