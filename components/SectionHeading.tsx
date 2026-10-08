import Reveal from "@/components/Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  variant?: "dark" | "light";
  eyebrowAccent?: "brand" | "gold";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  variant = "dark",
  eyebrowAccent = "brand",
}: SectionHeadingProps) {
  const centered = align === "center";
  const light = variant === "light";

  return (
    <Reveal className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <span
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] ${
          eyebrowAccent === "gold"
            ? "border-gold-200 bg-gold-50 text-gold-700"
            : light
              ? "border-white/25 bg-white/10 text-gold-200"
              : "border-brand-100 bg-brand-50 text-brand-700"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            eyebrowAccent === "gold" ? "bg-gold-500" : light ? "bg-gold-300" : "bg-brand-500"
          }`}
        />
        {eyebrow}
      </span>

      <h2
        className={`mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.75rem] ${
          light ? "text-white" : "text-ink-950"
        }`}
      >
        {title}
      </h2>

      {description && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? "text-white/75" : "text-ink-500"}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
