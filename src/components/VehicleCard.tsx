import Link from "next/link";
import Image from "@/components/Img";
import { Gauge, Calendar, Fuel, Settings2, ArrowUpRight, Zap } from "lucide-react";
import type { Veiculo } from "@/data/veiculos";
import { formatBRL, formatKM } from "@/lib/format";
import { CardImageHover } from "./CardImageHover";

function Spec({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[0.8rem] text-muted">
      <Icon className="size-3.5 text-brand-500" />
      {children}
    </span>
  );
}

export function VehicleCard({ v, layout = "grid" }: { v: Veiculo; layout?: "grid" | "list" }) {
  const href = `/veiculo/${v.id}`;

  if (layout === "list") {
    return (
      <Link
        href={href}
        className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lift sm:flex-row"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-auto sm:w-72 sm:shrink-0">
          <Image
            src={v.fotos[0]}
            alt={v.titulo}
            fill
            sizes="(max-width: 640px) 100vw, 288px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <Badges v={v} />
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-500">{v.marca}</span>
          <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-ink">{v.modelo}</h3>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
            <Spec icon={Calendar}>{v.anoFabMod}</Spec>
            <Spec icon={Gauge}>{formatKM(v.km)}</Spec>
            <Spec icon={Settings2}>{v.cambio}</Spec>
            <Spec icon={Fuel}>{v.combustivel}</Spec>
          </div>
          <div className="mt-auto flex items-end justify-between pt-5">
            <p className="font-display text-2xl font-bold text-ink">{formatBRL(v.preco)}</p>
            <span className="inline-flex size-11 items-center justify-center rounded-full bg-mist text-brand-600 transition-colors group-hover:bg-brand group-hover:text-white">
              <ArrowUpRight className="size-5" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <CardImageHover
          fotos={v.fotos}
          alt={v.titulo}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <Badges v={v} />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-500">{v.marca}</span>
        <h3 className="mt-1 line-clamp-1 font-display text-[1.05rem] font-semibold leading-snug text-ink">
          {v.modelo}
        </h3>

        <div className="mt-3 flex flex-wrap gap-x-3.5 gap-y-1.5 border-b border-line pb-4">
          <Spec icon={Calendar}>{v.anoFabMod}</Spec>
          <Spec icon={Gauge}>{formatKM(v.km)}</Spec>
          <Spec icon={Settings2}>{v.cambio}</Spec>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <p className="font-display text-xl font-bold text-ink">{formatBRL(v.preco)}</p>
          <span className="inline-flex size-10 items-center justify-center rounded-full bg-mist text-brand-600 transition-all duration-300 group-hover:bg-brand group-hover:text-white">
            <ArrowUpRight className="size-5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function Badges({ v }: { v: Veiculo }) {
  return (
    <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-col items-start gap-2">
      {v.km < 30000 && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white shadow-[0_6px_18px_-2px_rgba(16,185,129,0.65)]">
          <Zap className="size-3.5 fill-white" /> Baixa KM
        </span>
      )}
    </div>
  );
}
