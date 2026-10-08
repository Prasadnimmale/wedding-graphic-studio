import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Share Your Requirement",
    description: "Tell us what you need — size, quantity, design idea or a reference sample.",
  },
  {
    number: "02",
    title: "Design & Approval",
    description: "We create the design, share it with you and finish the changes you ask for.",
  },
  {
    number: "03",
    title: "Printing",
    description: "After your approval, the material is printed with careful colour and quality checks.",
  },
  {
    number: "04",
    title: "Final Delivery",
    description: "Finished, packed and ready for pickup or delivery as agreed with you.",
  },
];

export default function PrintingProcess() {
  return (
    <section className="scroll-mt-24 bg-canvas py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How It Works"
          title={
            <>
              Our Printing <span className="text-gradient">Process</span>
            </>
          }
          description="A simple, transparent flow — so you always know what happens next."
        />

        <div className="relative mt-12">
          <div
            className="absolute left-0 right-0 top-10 hidden border-t border-dashed border-gold-500/30 lg:block"
            aria-hidden="true"
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.09}>
                <article className="relative h-full rounded-2xl border border-line bg-surface p-6 pt-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-500/40 hover:shadow-lift">
                  <span className="inline-flex items-center justify-center rounded-xl bg-brand-gradient px-3 py-1.5 text-lg font-extrabold tracking-tight text-white shadow-soft">
                    {step.number}
                  </span>
                  <h3 className="mt-4 text-lg font-bold leading-snug text-ink-950">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{step.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
