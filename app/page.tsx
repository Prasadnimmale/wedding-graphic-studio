import { Suspense } from "react";
import Hero from "@/components/Hero";
import QuickServices from "@/components/QuickServices";
import About from "@/components/About";
import Services from "@/components/Services";
import CustomPrinting from "@/components/CustomPrinting";
import WeddingCards from "@/components/WeddingCards";
import BusinessPrinting from "@/components/BusinessPrinting";
import GiftArticles from "@/components/GiftArticles";
import Gallery from "@/components/Gallery";
import WhyChooseUs from "@/components/WhyChooseUs";
import PrintingProcess from "@/components/PrintingProcess";
import CTA from "@/components/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickServices />
      <About />
      <Services />
      <CustomPrinting />
      <WeddingCards />
      <BusinessPrinting />
      <GiftArticles />
      {/* Gallery reads ?filter= — must sit inside <Suspense> to prerender. */}
      <Suspense
        fallback={
          <div className="py-16 text-center text-sm text-ink-500">Loading gallery…</div>
        }
      >
        <Gallery />
      </Suspense>
      <WhyChooseUs />
      <PrintingProcess />
      <CTA />
    </>
  );
}
