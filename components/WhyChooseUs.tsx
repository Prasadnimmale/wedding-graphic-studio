import { BadgeCheck, LayoutGrid, MessageSquareHeart, PenTool, Printer, SlidersHorizontal } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const reasons = [
  {
    icon: PenTool,
    title: "Creative Designs",
    description: "Attractive and professional designs.",
  },
  {
    icon: Printer,
    title: "Quality Printing",
    description: "Sharp, clean and high-quality prints.",
  },
  {
    icon: SlidersHorizontal,
    title: "Custom Solutions",
    description: "Printing according to customer requirements.",
  },
  {
    icon: LayoutGrid,
    title: "Multiple Services",
    description: "Design, printing, frames, cards, gifts and more.",
  },
  {
    icon: BadgeCheck,
    title: "Professional Finishing",
    description: "Attention to details and finishing quality.",
  },
  {
    icon: MessageSquareHeart,
    title: "Customer Friendly",
    description: "Simple communication and reliable service.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="scroll-mt-24 bg-white/[0.02] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Choose Us"
          title={
            <>
              Why Choose <span className="text-gradient">Bhavani Graphics Studio?</span>
            </>
          }
          description="Design, printing and finishing handled with the same care — from the first idea to the final delivery."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <Reveal key={reason.title} delay={(i % 3) * 0.08}>
                <article className="group h-full rounded-2xl border border-line bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-500/40 hover:bg-surface-2 hover:shadow-lift">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/15 text-gold-300 shadow-soft ring-1 ring-gold-500/20 transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white group-hover:ring-transparent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-ink-950">{reason.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{reason.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
