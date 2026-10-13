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
          its slow Ken Burns drift as the fallback). No colour tint — the
          video shows straight through; only neutral black gradients remain
          on the left/bottom so the copy stays readable. */}
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
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-canvas" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:grid-cols-[1.02fr_1fr] lg:gap-14 lg:px-8 lg:pb-24 lg:pt-32">
        {/* ---------------------------------------------------------- copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-200">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
              Bhavani Printing World
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
            <span className="text-ink-950">Quality Printing.</span>
            <br />
            Beautiful Results.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-ink-700 sm:text-lg"
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
              className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-200 hover:shadow-lift sm:text-base"
            >
              View Services
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact#enquiry"
              className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-white/40 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/10 sm:text-base"
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
                <Sparkles className="h-3.5 w-3.5 text-slate-400" />
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
