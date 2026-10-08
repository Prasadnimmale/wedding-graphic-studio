"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";

const quickPills = ["Digital Printing", "Offset Printing", "Graphic Design", "Custom Printing"];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // The hero video is decorative motion: respect users who ask the OS for
  // reduced motion by holding it on the still poster frame.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      const video = videoRef.current;
      if (!video) return;
      if (mq.matches) video.pause();
      else video.play().catch(() => {});
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <section className="relative overflow-hidden bg-canvas">
      {/* Full-bleed print-studio backdrop: a real printing machine running
          as a muted looping video, layered over the still frame (which keeps
          its slow Ken Burns drift as the fallback) and darkened in layers so
          the black + gold copy stays readable on top of it. */}
      <Image
        src="/images/gallery/printing-machine.webp"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover hero-bg-motion"
      />
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/videos/hero-printing-poster.jpg"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero-printing.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-canvas/95 via-canvas/55 to-canvas/5" />
      <div className="absolute inset-0 bg-gradient-to-b from-canvas/70 via-transparent to-canvas" />

      <div className="glow glow-motion -left-32 -top-40 h-[420px] w-[420px] bg-brand-300/50" />
      <div className="glow glow-motion -right-24 top-24 h-[380px] w-[380px] bg-royal-200/60" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.02fr_1fr] lg:gap-14 lg:px-8 lg:py-24">
        {/* ---------------------------------------------------------- copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-brand-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-gold-300">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
              Bhavani Graphics Studio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-[2.35rem] font-extrabold leading-[1.06] tracking-tight text-ink-950 sm:text-5xl xl:text-[3.6rem]"
          >
            Creative Designs.
            <br />
            <span className="text-gradient">Quality Printing.</span>
            <br />
            Beautiful Results.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-ink-500 sm:text-lg"
          >
            Your one-stop destination for professional graphic design, digital printing, photo
            frames, wedding cards, ID cards, brochures, pamphlets, customized gifts and all types
            of printing solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href="/services"
              className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift sm:text-base"
            >
              View Services
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact#enquiry"
              className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-gold-500/40 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-gold-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:bg-brand-50 sm:text-base"
            >
              Get a Quote
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.34 }}
            className="mt-9 flex flex-wrap items-center gap-2"
          >
            {quickPills.map((pill) => (
              <li
                key={pill}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-ink-700"
              >
                <Sparkles className="h-3.5 w-3.5 text-gold-500" />
                {pill}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Right-side image collage removed — the print-studio backdrop shows through here. */}
      </div>
    </section>
  );
}
