import { Star } from "lucide-react";

export function Marquee({ items }: { items: string[] }) {
  // Duplicate the list so the -50% translate loops seamlessly
  const loop = [...items, ...items];
  return (
    <div className="marquee-track relative flex overflow-hidden bg-ink py-5">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
      <ul className="animate-marquee flex w-max shrink-0 items-center">
        {loop.map((item, i) => (
          <li key={i} className="flex items-center gap-5 whitespace-nowrap px-5">
            <span className="font-display text-base font-semibold tracking-tight text-white/90 md:text-lg">
              {item}
            </span>
            <Star className="size-3.5 fill-brand-400 text-brand-400" />
          </li>
        ))}
      </ul>
    </div>
  );
}
