import { services } from "@/data/services";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import PremiumServiceCard from "@/components/PremiumServiceCard";
import Reveal from "@/components/Reveal";

export default function Services() {
  // Wedding Cards, Photo Frames and Gift Articles lead the section as premium
  // services; every other service follows underneath.
  const premiumServices = services.filter((service) => service.premium);
  const otherServices = services.filter((service) => !service.premium);

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

        {/* ----------------------------------------- premium services */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {premiumServices.map((service, i) => (
            <Reveal
              key={service.slug}
              delay={i * 0.07}
              className={
                i === premiumServices.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""
              }
            >
              <PremiumServiceCard service={service} priority={i < 3} />
            </Reveal>
          ))}
        </div>

        {/* -------------------------------------------- all other work */}
        <div className="mt-14 flex items-center gap-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">
            More Services
          </h3>
          <span className="h-px flex-1 bg-line" aria-hidden />
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {otherServices.map((service, i) => (
            <Reveal
              key={service.slug}
              delay={(i % 4) * 0.07}
              className={service.featured ? "sm:col-span-2 lg:col-span-4" : ""}
            >
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
