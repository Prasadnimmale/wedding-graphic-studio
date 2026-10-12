import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { site } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Printing & Graphic Design Services`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Bhavani Printing World",
    "printing services",
    "graphic design",
    "wedding cards",
    "wedding invitations",
    "photo frames",
    "ID cards",
    "visiting cards",
    "brochures",
    "pamphlets",
    "banners and posters",
    "gift articles",
    "stickers and labels",
    "flex printing",
    "digital printing",
    "offset printing",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Printing & Graphic Design Services`,
    description: site.description,
    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Bhavani Printing World — printing and graphic design studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Printing & Graphic Design Services`,
    description: site.description,
    images: ["/images/og-cover.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a09",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-canvas font-sans text-ink-900 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-gold-400 focus:px-4 focus:py-2 focus:text-sm focus:text-black"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
