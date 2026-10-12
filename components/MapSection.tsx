import { MapPin, Navigation } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Map block.
 * Set `mapEmbedUrl` in lib/site.ts to a Google Maps *embed* URL
 * (Google Maps → Share → Embed a map → copy the src) to show a live map.
 * Without it, a clean placeholder is shown instead of a broken iframe.
 */
export default function MapSection() {
  const hasMap = Boolean(site.mapEmbedUrl);
  const hasAddress = Boolean(site.address);
  const directionsHref = hasAddress
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`
    : null;

  return (
    <section aria-label="Studio location" className="bg-canvas py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_24px_70px_-45px_rgba(0,0,0,0.7)]">
          <div className="flex flex-col gap-4 border-b border-line px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-white">
                <MapPin className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h2 className="text-base font-bold text-ink-900 sm:text-lg">
                  Visit our studio
                </h2>
                {hasAddress ? (
                  <p className="text-sm text-slate-500">{site.address}</p>
                ) : (
                  <p className="text-sm text-slate-400">
                    Add your studio address in <code className="font-mono text-xs">lib/site.ts</code>
                  </p>
                )}
              </div>
            </div>
            {directionsHref && (
              <a
                href={directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm font-semibold text-ink-900 transition hover:border-brand-600 hover:text-brand-700"
              >
                Get Directions <Navigation className="h-4 w-4" aria-hidden />
              </a>
            )}
          </div>

          {hasMap ? (
            <iframe
              src={site.mapEmbedUrl}
              title={`Map showing the location of ${site.name}`}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[320px] w-full border-0 sm:h-[420px]"
            />
          ) : (
            <div className="relative flex h-[280px] w-full items-center justify-center overflow-hidden bg-[repeating-linear-gradient(45deg,#f1f5f9_0_24px,#e9eef5_24px_48px)] sm:h-[360px]">
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(161,98,7,0.14),transparent_55%),radial-gradient(circle_at_75%_65%,rgba(202,138,4,0.14),transparent_55%)]"
              />
              <div className="relative mx-4 max-w-md rounded-2xl border border-white/15 bg-[#0d0d0c]/90 px-6 py-6 text-center shadow-[0_20px_50px_-30px_rgba(0,0,0,0.8)] backdrop-blur">
                <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-brand-gradient text-white">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <p className="text-sm font-semibold text-ink-900">Live map placeholder</p>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                  Paste your Google Maps embed URL into{" "}
                  <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[11px] text-gold-300">
                    mapEmbedUrl
                  </code>{" "}
                  in <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[11px] text-gold-300">lib/site.ts</code>{" "}
                  and the real map will appear here.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
