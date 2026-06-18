import Image from "@/components/Img";
import Link from "next/link";
import {
  ShieldCheck,
  CircleDollarSign,
  RefreshCw,
  Headset,
  ArrowRight,
  MapPin,
  Clock,
  Phone,
  CarFront,
} from "lucide-react";
import { veiculos, marcas } from "@/data/veiculos";
import { site, whatsappLink } from "@/data/site";
import { SearchHero } from "@/components/SearchHero";
import { TeamShowcase } from "@/components/TeamShowcase";
import { Testimonials } from "@/components/Testimonials";
import { ParallaxImage } from "@/components/ParallaxImage";
import { LogoMarquee } from "@/components/LogoMarquee";
import { FinanceSimulator } from "@/components/FinanceSimulator";
import { EstoqueFloatingButton } from "@/components/EstoqueFloatingButton";
import { Seal } from "@/components/Seal";
import { VehicleCard } from "@/components/VehicleCard";
import { ButtonLink } from "@/components/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { SectionHeading } from "@/components/Section";

export default function Home() {
  const destaques = veiculos;

  return (
    <>
      {/* ---------------- HERO (foto real da loja) ---------------- */}
      <section className="relative z-30 flex min-h-[88svh] flex-col justify-end bg-ink pt-[72px] text-white md:pt-20">
        <ParallaxImage src="/loja/fachada-lateral.jpg" alt="Fachada da Edson Veículos em Araras" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />

        <div className="container-x relative pb-12 md:pb-16">
          <Reveal>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/estoque" variant="primary" size="lg">
                Ver estoque
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
              </ButtonLink>
              <ButtonLink
                href={whatsappLink(`Olá! Vim pelo site da ${site.name} e quero atendimento.`)}
                external
                variant="whatsapp"
                size="lg"
              >
                Falar com vendedor
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.16} className="mt-5">
            <SearchHero marcas={marcas} />
          </Reveal>
        </div>
      </section>

      {/* ---------------- MARCAS (carrossel de logos) ---------------- */}
      <section className="bg-white py-12 md:py-14">
        <p className="container-x mb-8 text-center text-sm font-medium uppercase tracking-wider text-muted">
          Trabalhamos com as principais marcas do mercado
        </p>
        <LogoMarquee />
      </section>

      {/* ---------------- DESTAQUES ---------------- */}
      <section id="destaques" className="bg-paper py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Seleção Edson"
              title="Veículos em destaque"
              description="Modelos escolhidos a dedo pela nossa equipe, revisados e prontos para rodar."
            />
            <Reveal delay={0.1} className="hidden lg:block">
              <ButtonLink href="/estoque" variant="outline" size="md">
                Ver estoque completo
                <ArrowRight className="size-4" />
              </ButtonLink>
            </Reveal>
          </div>

          <Stagger className="mt-12 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {destaques.map((v) => (
              <StaggerItem key={v.id}>
                <VehicleCard v={v} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------------- DIFERENCIAIS ---------------- */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Por que comprar na Edson"
            title="Uma compra sem dor de cabeça, do começo ao fim"
            description="Mais de duas décadas de experiência traduzidas em segurança para você e sua família."
          />
          <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ShieldCheck, t: "Procedência garantida", d: "Todo veículo passa por checagem de documentação, histórico e vistoria completa." },
              { icon: CircleDollarSign, t: "Financiamento facilitado", d: "Simulação na hora com os principais bancos e as melhores taxas do mercado." },
              { icon: RefreshCw, t: "Aceitamos seu usado", d: "Avaliação justa e transparente do seu carro como parte do pagamento." },
              { icon: Headset, t: "Atendimento de verdade", d: "Equipe que acompanha você antes, durante e depois da compra. Sem pressão." },
            ].map((b) => (
              <StaggerItem key={b.t}>
                <div className="group h-full rounded-3xl border border-line bg-paper p-7 transition-all duration-500 hover:-translate-y-1 hover:border-brand-300 hover:bg-white hover:shadow-lift">
                  <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <b.icon className="size-7" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">{b.t}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{b.d}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------------- PROVA SOCIAL ---------------- */}
      <Testimonials />

      {/* ---------------- EQUIPE ---------------- */}
      <section className="relative overflow-hidden bg-paper pt-20 md:pt-28">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Gente que entende de carro"
            title="Conheça quem vai te atender"
            description="Na Edson, você é atendido por pessoas de verdade, que conhecem cada veículo do pátio pelo nome."
          />
          <TeamShowcase />
        </div>
      </section>

      {/* ---------------- FINANCIAMENTO (banda + simulador) ---------------- */}
      <section id="financiamento" className="relative overflow-hidden bg-ink py-20 text-white md:py-28">
        <div className="bg-edson-radial absolute inset-0" />
        <div className="aurora pointer-events-none absolute inset-0 opacity-40" />
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              light
              eyebrow="Crédito aprovado"
              title="Faça as contas e saia de carro novo"
              description="Arraste e descubra na hora a parcela que cabe no seu bolso. Trabalhamos com os principais bancos e buscamos a melhor taxa, mesmo com restrições no nome."
            />

            <div className="mt-7 flex flex-wrap gap-2.5">
              {[
                { v: "60x", l: "parcelas" },
                { v: "24h", l: "aprovação" },
                { v: "5+", l: "bancos parceiros" },
              ].map((s) => (
                <span
                  key={s.l}
                  className="inline-flex items-baseline gap-1.5 rounded-full border border-white/12 bg-white/5 px-4 py-2 backdrop-blur"
                >
                  <span className="font-display text-base font-bold text-brand-300">{s.v}</span>
                  <span className="text-sm text-white/60">{s.l}</span>
                </span>
              ))}
            </div>

            <Stagger className="mt-9 space-y-3">
              {[
                "Simule a parcela aqui mesmo, em segundos",
                "Envie pra gente e aprovamos em até 24h",
                "Retire seu carro com a documentação resolvida",
              ].map((t, i) => (
                <StaggerItem key={t}>
                  <div className="flex items-center gap-4">
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-500/20 font-display text-sm font-bold text-brand-300">
                      {i + 1}
                    </span>
                    <p className="text-[0.98rem] text-white/80">{t}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal delay={0.1}>
            <FinanceSimulator />
          </Reveal>
        </div>
      </section>

      {/* ---------------- SOBRE (foto interior grande + selo) ---------------- */}
      <section className="relative overflow-hidden bg-paper">
        <div className="grid items-stretch lg:grid-cols-2">
          {/* imagem grande preenchendo o lado esquerdo */}
          <Reveal className="relative z-20 min-h-[340px] lg:min-h-[620px]">
            <Image
              src="/loja/interior-frente.jpg"
              alt="Showroom da Edson Veículos"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent lg:bg-gradient-to-r" />
            <Seal className="absolute -bottom-14 left-5 z-10 size-28 drop-shadow-2xl sm:-bottom-16 md:size-32 lg:left-auto lg:-right-16 lg:bottom-20 lg:size-36" />
          </Reveal>

          {/* texto */}
          <div className="flex items-center px-6 py-16 sm:px-10 md:py-24 lg:px-16 xl:px-24">
            <div className="max-w-xl">
              <SectionHeading
                eyebrow="Quem somos"
                title="A loja do Edson, referência em Araras"
                description={`Sob o comando de Edson Curtolo, a ${site.name} construiu sua história na base da confiança. Aqui, cada cliente é tratado pelo nome e cada negócio é fechado com transparência.`}
              />
              <Stagger className="mt-8 space-y-4">
                {[
                  "Estoque atualizado com veículos revisados e com garantia",
                  "Avaliação do seu usado sem compromisso",
                  "Documentação e transferência resolvidas por nós",
                ].map((t) => (
                  <StaggerItem key={t}>
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                        <CarFront className="size-3.5" />
                      </span>
                      <p className="text-[0.98rem] text-ink/80">{t}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
              <div className="mt-8">
                <ButtonLink href="/sobre" variant="dark" size="md">
                  Conheça nossa história
                  <ArrowRight className="size-4" />
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- LOCALIZAÇÃO ---------------- */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Venha nos visitar"
            title="Estamos te esperando"
            description={site.addressFull}
          />
          <Reveal delay={0.1} className="mt-12">
            <div className="overflow-hidden rounded-[2rem] border border-line bg-paper shadow-soft">
              <div className="relative aspect-[21/9] w-full">
                <iframe
                  title="Localização Edson Veículos"
                  src={site.mapEmbed}
                  className="absolute inset-0 size-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="grid gap-4 p-7 sm:grid-cols-3">
                <InfoItem icon={MapPin} title="Endereço" lines={[site.address, `${site.city} / ${site.state}`]} />
                <InfoItem icon={Phone} title="Telefone" lines={[site.phone, site.whatsapp]} />
                <InfoItem icon={Clock} title="Horário" lines={["Seg-Sex 08h30-18h30", "Sáb 08h30-13h"]} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Botão flutuante (mobile) — só enquanto a seção de destaques está visível */}
      <EstoqueFloatingButton targetId="destaques" />
    </>
  );
}

function InfoItem({ icon: Icon, title, lines }: { icon: React.ElementType; title: string; lines: string[] }) {
  return (
    <div>
      <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
        <Icon className="size-5" />
      </span>
      <p className="mt-3 text-sm font-semibold text-ink">{title}</p>
      {lines.map((l) => (
        <p key={l} className="text-sm text-muted">
          {l}
        </p>
      ))}
    </div>
  );
}
