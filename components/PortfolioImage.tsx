"use client";

import { useState } from "react";
import Image from "next/image";

type PortfolioImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  /** Local placeholder used when the image fails to load. */
  fallback?: string;
};

/**
 * Client wrapper around next/image for the portfolio gallery tiles on the
 * services page. Server components cannot pass event handlers to client
 * components in this Next.js version, so the onError fallback for missing or
 * unreadable images lives here.
 */
export default function PortfolioImage({
  src,
  alt,
  sizes,
  className,
  fallback,
}: PortfolioImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <Image
      src={failed && fallback ? fallback : src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}