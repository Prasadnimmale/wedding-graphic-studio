import { PenTool, Printer, SlidersHorizontal, Images } from "lucide-react";
import Reveal from "@/components/Reveal";

const highlights = [
  {
    icon: Printer,
    title: "Digital Printing",
    description: "High-quality digital printing for everyday and professional needs.",
  },
  {
    icon: PenTool,
    title: "Graphic Design",
    description: "Creative and professional designs for your business and events.",
  },
  {
    icon: Images,
    title: "Photo Frames",
    description: "Beautiful custom photo frames for memories and gifting.",
  },
  {
    icon: SlidersHorizontal,
    title: "Custom Printing",
    description: "Personalized printing according to customer requirements.",
  },
];

export default function QuickServices() {
  return (
    <section className="relative z-10 -mt-2 border-y border-line bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.07}>
                <article className="group h-full rounded-2xl border border-line bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:bg-surface-2 hover:shadow-lift">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-soft transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-ink-950">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{item.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
