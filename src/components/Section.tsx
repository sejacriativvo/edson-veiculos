import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <span
          className={`inline-block text-sm font-semibold uppercase tracking-[0.18em] ${
            light ? "text-brand-300" : "text-brand-500"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight text-balance md:text-[2.6rem] ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lg leading-relaxed ${light ? "text-white/65" : "text-muted"}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
