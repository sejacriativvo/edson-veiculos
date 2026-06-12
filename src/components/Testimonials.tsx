import { Star, Quote } from "lucide-react";
import { reviews, googleRating, type Review } from "@/data/reviews";
import { SectionHeading } from "./Section";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { CountUp } from "./CountUp";

function Stars({ n, className = "" }: { n: number; className?: string }) {
  return (
    <div className={`flex gap-0.5 ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`size-4 ${i < n ? "fill-amber-400 text-amber-400" : "fill-line text-line"}`} />
      ))}
    </div>
  );
}

function initials(nome: string) {
  return nome
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

function ReviewCard({ r }: { r: Review }) {
  return (
    <figure className="flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
      <div className="flex items-center justify-between">
        <Stars n={r.nota} />
        <Quote className="size-7 text-brand/15" />
      </div>
      <blockquote className="mt-4 flex-1 text-[0.98rem] leading-relaxed text-ink/80">“{r.texto}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        <span className="inline-flex size-11 items-center justify-center rounded-full bg-brand/10 font-display text-sm font-bold text-brand">
          {initials(r.nome)}
        </span>
        <div>
          <p className="font-semibold text-ink">{r.nome}</p>
          <p className="text-sm text-muted">{r.local}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const featured = reviews.slice(0, 3);
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="O que dizem de nós"
            title="Quem compra na Edson, recomenda"
            description="Avaliações reais de quem já realizou o sonho do carro novo com a gente."
          />
          <Reveal delay={0.1}>
            <a
              href={googleRating.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-line bg-paper px-6 py-4 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div className="text-center">
                <p className="font-display text-4xl font-bold leading-none text-ink">
                  <CountUp value={googleRating.score} decimals={1} />
                </p>
                <Stars n={5} className="mt-1.5 justify-center" />
              </div>
              <div className="h-12 w-px bg-line" />
              <div>
                <p className="text-sm font-semibold text-ink">Avaliações do Google</p>
                <p className="text-sm text-muted">
                  <CountUp value={googleRating.count} suffix="+ avaliações" />
                </p>
                <span className="mt-0.5 inline-block text-sm font-medium text-brand-600">Ver no Google →</span>
              </div>
            </a>
          </Reveal>
        </div>

        {/* Mobile/tablet: carrossel horizontal arrastável (ocupa menos tela) */}
        <div className="hide-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:hidden">
          {reviews.map((r) => (
            <div key={r.nome} className="w-[82%] shrink-0 snap-center sm:w-[48%]">
              <ReviewCard r={r} />
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-muted lg:hidden">Arraste para o lado para ver mais ←→</p>

        {/* Desktop: grade com banda azul atrás da linha dos nomes */}
        <div className="relative mt-14 hidden lg:block">
          <div className="absolute inset-x-0 bottom-0 top-[13.5rem] rounded-[2.5rem] bg-edson" />
          <Stagger className="relative grid grid-cols-3 gap-6 px-10 pb-12">
            {featured.map((r) => (
              <StaggerItem key={r.nome}>
                <ReviewCard r={r} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
