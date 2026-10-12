import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Facebook, Instagram } from "@/components/BrandIcons";
import { contactDetails, site, whatsappLink } from "@/lib/site";

const serviceLinks = [
  { label: "Photo Frames", slug: "photo-frames" },
  { label: "ID Cards", slug: "id-cards" },
  { label: "Wedding Cards", slug: "wedding-cards" },
  { label: "Pamphlets", slug: "pamphlets" },
  { label: "Brochures", slug: "brochures" },
  { label: "Visiting Cards", slug: "visiting-cards" },
  { label: "Gift Articles", slug: "gift-articles" },
  { label: "All Printing", slug: "all-printing" },
];

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { key: "whatsapp", label: "WhatsApp", href: whatsappLink(), icon: MessageCircle, show: true },
  { key: "instagram", label: "Instagram", href: site.social.instagram, icon: Instagram, show: Boolean(site.social.instagram) },
  { key: "facebook", label: "Facebook", href: site.social.facebook, icon: Facebook, show: Boolean(site.social.facebook) },
];

const contactIcons: Record<string, typeof Phone> = {
  phone: Phone,
  email: Mail,
  address: MapPin,
  whatsapp: MessageCircle,
};

/**
 * The footer is prerendered with the pages; under Cache Components a bare
 * `new Date()` is an unstable value, so the year is read inside a cached fn.
 */
async function copyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export default async function Footer() {
  const details = contactDetails();
  const year = await copyrightYear();

  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* ----------------------------------------------------- brand */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="group inline-flex items-center"
              aria-label="Bhavani Printing World — home"
            >
              {/* Same logo file as the navbar, sized for the footer column. */}
              <Image
                src="/images/bhavani-printing-world-logo.png"
                alt="Bhavani Printing World"
                width={2086}
                height={754}
                sizes="(min-width: 640px) 200px, 176px"
                className="h-14 w-auto object-contain transition-opacity duration-300 group-hover:opacity-90 sm:h-16"
              />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">{site.tagline}</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/45">
              Graphic design, digital and offset printing, photo frames, wedding cards, ID cards,
              brochures, pamphlets, gift articles and all types of printing services.
            </p>

            <div className="mt-6 flex gap-3">
              {socials
                .filter((social) => social.show)
                .map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.key}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:border-brand-400 hover:bg-brand-gradient hover:text-white"
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </a>
                  );
                })}
            </div>
          </div>

          {/* --------------------------------------------------- services */}
          <nav className="lg:col-span-3" aria-label="Footer services">
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-gold-400">
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.slug}>
                  <Link
                    href={`/services#${link.slug}`}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* --------------------------------------------------- company */}
          <nav className="lg:col-span-2" aria-label="Footer company">
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-gold-400">Company</h3>
            <ul className="mt-5 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* --------------------------------------------------- contact */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-gold-400">Contact</h3>

            {details.length > 0 ? (
              <ul className="mt-5 space-y-3">
                {details.map((detail) => {
                  const Icon = contactIcons[detail.key] ?? Phone;
                  const content = (
                    <span className="flex items-start gap-3 text-sm text-white/60 transition-colors group-hover:text-white">
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                      <span className="break-words">{detail.value}</span>
                    </span>
                  );
                  return (
                    <li key={detail.key}>
                      {detail.href ? (
                        <a
                          href={detail.href}
                          target={detail.href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="group block"
                        >
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-5 text-sm leading-relaxed text-white/50">
                Phone, email and address will be added here shortly. Meanwhile, send an enquiry from
                the contact page or message us on WhatsApp.
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/45 sm:text-sm">
            © {year} {site.name}. All Rights Reserved.
          </p>
          <p className="text-xs text-white/45">{site.supportLine}</p>
        </div>
      </div>
    </footer>
  );
}
