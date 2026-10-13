/**
 * ---------------------------------------------------------------------------
 * SINGLE PLACE TO EDIT BUSINESS DETAILS
 * ---------------------------------------------------------------------------
 * Nothing in this file is invented. Values that are not known yet are left
 * empty on purpose. Fill them in and the whole site (contact section, footer,
 * CTA buttons, WhatsApp button, map, enquiry form) updates automatically.
 */

export const site = {
  name: "Bhavani Printing World",
  shortName: "BPW",
  tagline: "Creative Designs. Quality Printing. Beautiful Results.",
  supportLine: "From Ideas to Prints — We Make Every Design Special.",

  /**
   * Replace with the real production domain (no trailing slash).
   * Used for canonical URLs, Open Graph tags, sitemap and robots.txt.
   */
  url: "https://example.com",

  description:
    "Bhavani Printing World provides professional printing and graphic design services including wedding cards, photo frames, ID cards, brochures, pamphlets, visiting cards, gift articles and customized printing.",

  /** e.g. "+91 98765 43210" — leave empty until the real number is available. */
  phone: "+91 96766 69474",

  /** e.g. "hello@bhavaniprintingworld.com" — leave empty until the real inbox exists. */
  email: "",

  /** Full shop address — leave empty until the real address is available. */
  address:
    "48-3-32, opposite to Ratna Towers, Day & Night Hospital Lane, Rama Talkies Rd, Srinagar, Visakhapatnam, Andhra Pradesh 530016",

  /** e.g. "Mon – Sat, 10:00 AM – 8:00 PM" — leave empty until confirmed. */
  hours: "",

  /**
   * WhatsApp number WITHOUT "+" and WITHOUT spaces, e.g. "919876543210".
   * Leave empty until the real number is available. The floating button still
   * works with an empty number (it opens WhatsApp with the message pre-filled).
   */
  whatsapp: "919676669474",

  /** Pre-filled WhatsApp message used by the floating button and CTA. */
  whatsappMessage:
    "Hello Bhavani Printing World, I would like to know about your printing services.",

  /** Social profiles — leave empty until the real accounts exist (hidden when empty). */
  social: {
    instagram: "",
    facebook: "",
  },

  /**
   * Optional endpoint that receives the enquiry form as JSON (POST).
   * e.g. "/api/enquiry" once a backend exists. When empty, the form falls back
   * to WhatsApp / email if those are configured above.
   */
  enquiryEndpoint: "",

  /**
   * Google Maps embed URL — leave empty until the real address is added.
   * Create it like this:
   *   https://www.google.com/maps?q=<SEARCHED ADDRESS>&output=embed
   * or from Google Maps: Share > Embed a map > copy the src URL.
   */
  mapEmbedUrl:
    "https://www.google.com/maps?q=48-3-32+opposite+to+Ratna+Towers+Day+%26+Night+Hospital+Lane+Rama+Talkies+Rd+Srinagar+Visakhapatnam+Andhra+Pradesh+530016&output=embed",
};

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  alt: string;
  points?: string[];
  /** Surfaced first, with a richer highlighted card, on the services grid. */
  premium?: boolean;
  featured?: boolean;
  /** Related work shown as a grid of images under the service detail block. */
  gallery?: {
    image: string;
    alt: string;
    title?: string;
    description?: string;
    /** Explicit WhatsApp message for this design (overrides the default template). */
    waMessage?: string;
  }[];
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Our Work", href: "/#our-work" },
  { label: "Contact", href: "/contact" },
] as const;

/** Phone / email / address rows — only rendered when the value exists. */
export function contactDetails() {
  return [
    { key: "phone", label: "Phone", value: site.phone, href: site.phone ? `tel:${site.phone.replace(/[^\d+]/g, "")}` : "" },
    { key: "email", label: "Email", value: site.email, href: site.email ? `mailto:${site.email}` : "" },
    { key: "address", label: "Address", value: site.address, href: "" },
    { key: "whatsapp", label: "WhatsApp", value: site.whatsapp ? formatPhone(site.whatsapp) : "", href: whatsappLink(site.whatsappMessage) },
  ].filter((item) => item.value);
}

export function formatPhone(raw: string) {
  const digits = raw.replace(/[^\d]/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return `+91 ${digits.slice(2)}`;
  if (digits.length === 11 && digits.startsWith("0")) return `+91 ${digits.slice(1)}`;
  return raw.startsWith("+") ? raw : `+${raw}`;
}

/** Opens WhatsApp with a pre-filled message. Works even without a number. */
export function whatsappLink(message: string = site.whatsappMessage) {
  const text = encodeURIComponent(message);
  return site.whatsapp
    ? `https://wa.me/${site.whatsapp.replace(/[^\d]/g, "")}?text=${text}`
    : `https://wa.me/?text=${text}`;
}

/** Call link, or the enquiry form when no number is configured yet. */
export function callLink() {
  return site.phone ? `tel:${site.phone.replace(/[^\d+]/g, "")}` : "/contact#enquiry";
}
