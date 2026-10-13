import { FaWhatsapp } from "react-icons/fa";

type WhatsAppEnquiryButtonProps = {
  /** Pre-built wa.me link with the design name already pre-filled. */
  href: string;
  /** Accessible label, e.g. "Enquire about Business Flex Banners on WhatsApp". */
  label: string;
  /** Width and any extra spacing. Defaults to intrinsic (inline) width. */
  className?: string;
  /** "md" for gallery cards (full width), "sm" for the preview modal footer. */
  size?: "md" | "sm";
};

/**
 * The single shared "Enquire on WhatsApp" button used across every service
 * gallery. Keeping it in one place guarantees identical height, padding, icon
 * alignment (icon left, text centred) and gold-gradient styling everywhere.
 */
export default function WhatsAppEnquiryButton({
  href,
  label,
  className = "",
  size = "md",
}: WhatsAppEnquiryButtonProps) {
  const sizing =
    size === "sm"
      ? "min-h-[40px] gap-2 px-4 py-2 text-xs"
      : "min-h-[46px] gap-2.5 px-5 py-2.5 text-sm";
  const icon = size === "sm" ? "h-3.5 w-3.5" : "h-[17px] w-[17px]";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`inline-flex items-center justify-center rounded-full bg-brand-gradient font-bold shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift ${sizing} ${className}`}
    >
      <FaWhatsapp className={icon} aria-hidden="true" />
      Enquire on WhatsApp
    </a>
  );
}
