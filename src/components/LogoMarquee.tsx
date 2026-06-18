import Image from "@/components/Img";
import Link from "next/link";
import { brandLogos } from "@/data/site";

export function LogoMarquee() {
  // duplicado para o loop -50% ser contínuo
  const loop = [...brandLogos, ...brandLogos];
  return (
    <div className="relative flex overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-28" />
      <ul className="animate-marquee flex w-max shrink-0 items-center">
        {loop.map((b, i) => (
          <li key={i} className="shrink-0 px-6 md:px-9">
            <Link
              href={`/estoque?marca=${encodeURIComponent(b.nome)}`}
              aria-label={b.nome}
              className="relative block h-9 w-20 opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:h-11 md:w-24"
            >
              <Image src={b.logo} alt={b.nome} fill sizes="96px" className="object-contain" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
