"use client";

import { FaWhatsapp } from "react-icons/fa";
import { whatsappLink } from "@/lib/site";

/**
 * Floating WhatsApp button — fixed bottom-right, real WhatsApp logo.
 * Number + message come from lib/site.ts (whatsappLink).
 */
export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Bhavani Printing World on WhatsApp"
      title="Chat with us on WhatsApp"
      className="group fixed bottom-4 right-4 z-[100] flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#25D366] shadow-[0_10px_28px_-10px_rgba(37,211,102,0.55)] transition-all duration-200 ease-out hover:scale-[1.08] hover:shadow-[0_14px_34px_-8px_rgba(37,211,102,0.8)] sm:bottom-6 sm:right-6 sm:h-[58px] sm:w-[58px]"
    >
      {/* Soft attention ring that gently pulses around the button */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full animate-pulse-ring"
      />

      <FaWhatsapp
        aria-hidden
        className="h-[27px] w-[27px] text-white sm:h-[30px] sm:w-[30px]"
      />

      {/* Tooltip — desktop only, appears to the left of the button */}
      <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-lg border border-gold-200/20 bg-black/90 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg backdrop-blur transition-opacity duration-200 group-hover:opacity-100 sm:block">
        Chat with us on WhatsApp
      </span>
    </a>
  );
}