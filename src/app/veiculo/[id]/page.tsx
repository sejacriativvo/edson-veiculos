import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Gauge,
  Palette,
  Settings2,
  Fuel,
  Hash,
  Check,
  ChevronRight,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import { veiculos, getVeiculo } from "@/data/veiculos";
import { site, whatsappLink } from "@/data/site";
import { formatBRL, formatKM } from "@/lib/format";
import { Gallery } from "@/components/Gallery";
import { VehicleCard } from "@/components/VehicleCard";
import { ButtonLink } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/Section";

export function generateStaticParams() {
  return veiculos.map((v) => ({ id: v.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const v = getVeiculo(id);
  if (!v) return { title: "Veículo não encontrado" };
  return {
    title: `${v.marca} ${v.modelo} ${v.anoFabMod}`,
    description: `${v.titulo} — ${formatKM(v.km)}, ${v.cor}. ${formatBRL(v.preco)} na ${site.name}.`,
  };
}

export default async function VeiculoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const v = getVeiculo(id);
  if (!v) notFound();

  const relacionados = veiculos
    .filter((x) => x.id !== v.id)
    .sort((a, b) => {
      const am = a.marca === v.marca ? 0 : 1;
      const bm = b.marca === v.marca ? 0 : 1;
      return am - bm || Math.abs(a.preco - v.preco) - Math.abs(b.preco - v.preco);
    })
    .slice(0, 3);

  const specs = [
    { icon: Calendar, label: "Ano/Modelo", value: v.anoFabMod },
    { icon: Gauge, label: "Quilometragem", value: formatKM(v.km) },
    { icon: Settings2, label: "Câmbio", value: v.cambio },
    { icon: Fuel, label: "Combustível", value: v.combustivel },
    { icon: Palette, label: "Cor", value: v.cor },
    { icon: Hash, label: "Final da placa", value: v.finalPlaca || "—" },
  ];

  const waMessage = `Olá! Tenho interesse no ${v.marca} ${v.modelo} (${v.anoFabMod}) anunciado por ${formatBRL(
    v.preco,
  )}. Ainda está disponível?`;

  return (
    <div className="bg-paper pt-24 lg:pt-32">
      <div className="container-x py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="mb-7 flex items-center gap-1.5 text-sm text-muted">
          <Link href="/" className="hover:text-ink">
            Início
          </Link>
          <ChevronRight className="size-3.5" />
          <Link href="/estoque" className="hover:text-ink">
            Estoque
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="truncate text-ink">{v.modelo}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
          {/* Gallery */}
          <div className="min-w-0">
            <Gallery fotos={v.fotos} alt={v.titulo} />
          </div>

          {/* Info panel */}
          <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-line bg-white p-6 shadow-soft md:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600">
                  {v.marca}
                </span>
                {v.destaque && (
                  <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent">
                    Destaque
                  </span>
                )}
              </div>
              <h1 className="mt-3 font-display text-2xl font-bold leading-tight text-ink md:text-3xl">
                {v.modelo}
              </h1>
              <p className="mt-1.5 text-sm text-muted">
                {v.anoFabMod} · {formatKM(v.km)} · {v.cambio}
              </p>

              <div className="mt-6 rounded-2xl bg-paper p-5">
                <p className="text-sm text-muted">Preço</p>
                <p className="font-display text-4xl font-bold text-ink">{formatBRL(v.preco)}</p>
              </div>

              <div className="mt-5 flex flex-col gap-3">
                <ButtonLink href={whatsappLink(waMessage)} external variant="whatsapp" size="lg">
                  Tenho interesse
                </ButtonLink>
                <div className="grid grid-cols-2 gap-3">
                  <ButtonLink
                    href={whatsappLink(
                      `Olá! Quero simular o financiamento do ${v.marca} ${v.modelo} (${v.anoFabMod}).`,
                    )}
                    external
                    variant="outline"
                    size="md"
                  >
                    Simular
                  </ButtonLink>
                  <ButtonLink href={`tel:${site.phoneRaw}`} external variant="outline" size="md">
                    Ligar
                  </ButtonLink>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 rounded-xl bg-brand/5 px-4 py-3 text-sm text-brand-600">
                <ShieldCheck className="size-4 shrink-0" />
                Veículo revisado e com procedência garantida.
              </div>
            </div>
          </div>
        </div>

        {/* Specs + Opcionais */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
          <Reveal className="min-w-0 rounded-3xl border border-line bg-white p-6 shadow-soft md:p-8">
            <h2 className="font-display text-xl font-semibold text-ink">Ficha técnica</h2>
            <dl className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {specs.map((s) => (
                <div key={s.label} className="rounded-2xl bg-paper p-4">
                  <span className="inline-flex size-9 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <s.icon className="size-4.5" />
                  </span>
                  <dt className="mt-2.5 text-xs uppercase tracking-wider text-muted">{s.label}</dt>
                  <dd className="font-display font-semibold text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>

            {v.opcionais.length > 0 && (
              <>
                <h3 className="mt-8 font-display text-lg font-semibold text-ink">Opcionais e conforto</h3>
                <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {v.opcionais.map((o) => (
                    <li key={o} className="flex items-center gap-2.5 text-[0.95rem] text-ink/80">
                      <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                        <Check className="size-3" />
                      </span>
                      {o}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Reveal>

          <Reveal delay={0.1} className="relative min-w-0 overflow-hidden rounded-3xl bg-edson-radial p-6 text-white shadow-soft md:p-8">
            <div className="aurora pointer-events-none absolute inset-0 opacity-30" />
            <div className="relative">
              <h3 className="font-display text-xl font-semibold">Gostou desse carro?</h3>
              <p className="mt-2 text-white/65">
                Fale agora com um vendedor e garanta as melhores condições. Aceitamos seu usado na troca.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <ButtonLink href={whatsappLink(waMessage)} external variant="whatsapp" size="lg">
                  Falar no WhatsApp
                </ButtonLink>
                <ButtonLink
                  href="/estoque"
                  variant="outline"
                  size="md"
                  className="!border-white/25 !bg-white/5 !text-white"
                >
                  <ArrowLeft className="size-4" /> Voltar ao estoque
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Relacionados */}
        {relacionados.length > 0 && (
          <div className="mt-16 md:mt-24">
            <SectionHeading eyebrow="Você também pode gostar" title="Veículos relacionados" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relacionados.map((r) => (
                <VehicleCard key={r.id} v={r} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
