import type { Metadata } from "next";
import Image from "@/components/Img";
import { Award, HeartHandshake, ShieldCheck, Users, ArrowRight } from "lucide-react";
import { site, whatsappLink } from "@/data/site";
import { veiculos } from "@/data/veiculos";
import { ButtonLink } from "@/components/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { SectionHeading } from "@/components/Section";
import { TeamShowcase } from "@/components/TeamShowcase";

export const metadata: Metadata = {
  title: "Sobre nós",
  description: `Conheça a história da ${site.name}, concessionária multimarca em ${site.city}-${site.state}.`,
};

export default function SobrePage() {
  return (
    <>
      {/* Hero com foto da fachada */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden pt-28 lg:pt-36">
        <Image src="/loja/fachada-lateral.jpg" alt="Edson Veículos" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
        <div className="container-x relative pb-14 text-white md:pb-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
              Há mais de 30 anos · {site.city}-{site.state}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-balance md:text-6xl">
              Mais de 30 anos vendendo confiança, não só carros.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* História */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="Nossa história" title="Construída cliente por cliente" />
            <div className="mt-6 space-y-4 text-[1.02rem] leading-relaxed text-muted">
              <p>
                Sob o comando de <strong className="text-ink">Edson Curtolo</strong>, a {site.name} começou
                pequena, com um pátio modesto e uma certeza: tratar cada cliente como gente, não como número.
                Essa filosofia transformou compradores de primeira viagem em clientes de uma vida inteira.
              </p>
              <p>
                Ao longo dos anos, ampliamos o estoque, profissionalizamos o atendimento e estruturamos o
                financiamento, mas mantivemos o essencial: honestidade na avaliação, clareza no preço e
                respeito no pós-venda.
              </p>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { n: "30+", l: "anos" },
                { n: `${veiculos.length}`, l: "no pátio" },
                { n: "100%", l: "procedência" },
                { n: "1k+", l: "clientes" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="font-display text-3xl font-bold text-brand">{s.n}</dt>
                  <dd className="text-sm text-muted">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-[2rem] shadow-lift">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/loja/interior-lateral.jpg"
                  alt="Showroom da Edson Veículos"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Equipe */}
      <section className="relative overflow-hidden bg-paper py-20 md:py-28">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Nosso time"
            title="As pessoas por trás da Edson"
            description="Quem faz a loja acontecer todos os dias, pronto pra te atender."
          />
          <TeamShowcase />
        </div>
      </section>

      {/* Valores */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="No que acreditamos" title="Os valores que guiam cada negócio" />
          <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ShieldCheck, t: "Transparência", d: "Preço claro, sem surpresas. O que combinamos é o que você paga." },
              { icon: HeartHandshake, t: "Confiança", d: "Relações de longo prazo valem mais que uma venda rápida." },
              { icon: Award, t: "Qualidade", d: "Veículos selecionados e revisados, com a procedência verificada." },
              { icon: Users, t: "Pessoas", d: "Atendimento humano, do primeiro contato ao pós-venda." },
            ].map((v) => (
              <StaggerItem key={v.t}>
                <div className="h-full rounded-3xl border border-line bg-paper p-7 shadow-soft">
                  <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                    <v.icon className="size-7" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">{v.t}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{v.d}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-7 py-16 text-center text-white md:px-16 md:py-20">
            <div className="aurora pointer-events-none absolute inset-0 opacity-80" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">
                Venha tomar um café e conhecer o estoque
              </h2>
              <p className="mt-4 text-lg text-white/65">
                Estamos na {site.addressFull}. Será um prazer te atender.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <ButtonLink href="/estoque" variant="primary" size="lg">
                  Ver estoque <ArrowRight className="size-5" />
                </ButtonLink>
                <ButtonLink href={whatsappLink(`Olá! Quero conhecer a ${site.name}.`)} external variant="whatsapp" size="lg">
                  Falar no WhatsApp
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
