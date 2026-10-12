import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Service } from "@/lib/site";

type PremiumServiceCardProps = {
  service: Service;
  priority?: boolean;
};

/**
 * The richer card used for the three premium services (Wedding Cards, Photo
 * Frames, Gift Articles) that are surfaced first on the home page — gold trim,
 * a Premium badge and a taller image so they clearly lead the grid.
 */
export default function PremiumServiceCard({ service, priority = false }: PremiumServiceCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gold-500/35 bg-surface shadow-[0_28px_60px_-42px_rgba(234,179,8,0.6)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-500/70 hover:shadow-[0_34px_70px_-38px_rgba(234,179,8,0.75)]">
      <div className="relative aspect-[16/11] overflow-hidden bg-canvas">
        <Image
          src={service.image}
          alt={service.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          className={`${service.slug === "photo-frames" ? "object-contain" : "object-cover object-center"} transition-transform duration-700 ease-out group-hover:scale-[1.07]`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-brand-gradient px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] shadow-lg">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          Premium
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-extrabold tracking-tight text-ink-950 sm:text-2xl">
          {service.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">
          {service.shortDescription}
        </p>
        <Link
          href={`/services#${service.slug}`}
          className="mt-5 inline-flex min-h-[44px] w-fit items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
          aria-label={`View premium ${service.title}`}
        >
          View Details
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
