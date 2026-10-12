/**
 * Brand icons — lucide-react no longer ships brand glyphs (Facebook, Instagram),
 * so these two are drawn inline with the same stroke style lucide uses.
 * They render at the same size as any lucide icon (className passed in).
 */

type IconProps = { className?: string };

export function Instagram({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Facebook({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M14.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5H17.7V4.4C17.3 4.3 16.3 4.2 15.2 4.2c-2.4 0-4 1.4-4 4.1v2.2H8.5v3h2.7V21" />
    </svg>
  );
}
