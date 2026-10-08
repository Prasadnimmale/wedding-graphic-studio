import { services } from "@/data/services";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import Reveal from "@/components/Reveal";

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-white/[0.02] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What We Offer"
          title={
            <>
              Our <span className="text-gradient">Services</span>
            </>
          }
          description="Everything you need for design, printing and personalized products."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal
              key={service.slug}
              delay={(i % 4) * 0.07}
              className={service.featured ? "sm:col-span-2 lg:col-span-1" : ""}
            >
              <ServiceCard service={service} priority={i < 4} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
