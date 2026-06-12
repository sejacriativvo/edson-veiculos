"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, LayoutGrid, Rows3, SlidersHorizontal, X, CarFront } from "lucide-react";
import type { Veiculo } from "@/data/veiculos";
import { searchVeiculos } from "@/lib/search";
import { VehicleCard } from "./VehicleCard";
import { ButtonLink } from "./Button";
import { whatsappLink, site } from "@/data/site";

type Initial = { q?: string; marca?: string; precoMax?: string };

const precoOptions = [
  { label: "Qualquer preço", value: "" },
  { label: "Até R$ 40.000", value: "40000" },
  { label: "Até R$ 70.000", value: "70000" },
  { label: "Até R$ 100.000", value: "100000" },
  { label: "Acima de R$ 100.000", value: "999999" },
];

const sortOptions = [
  { label: "Mais relevantes", value: "relevancia" },
  { label: "Menor preço", value: "preco-asc" },
  { label: "Maior preço", value: "preco-desc" },
  { label: "Menor km", value: "km-asc" },
  { label: "Mais novos", value: "ano-desc" },
];

export function EstoqueClient({
  veiculos,
  marcas,
  initial,
}: {
  veiculos: Veiculo[];
  marcas: string[];
  initial: Initial;
}) {
  const [q, setQ] = useState(initial.q ?? "");
  const [marca, setMarca] = useState(initial.marca ?? "");
  const [precoMax, setPrecoMax] = useState(initial.precoMax ?? "");
  const [cambio, setCambio] = useState("");
  const [sort, setSort] = useState("relevancia");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    const max = precoMax ? Number(precoMax) : Infinity;
    const min = precoMax === "999999" ? 100000 : 0;
    const base = q.trim() ? searchVeiculos(veiculos, q) : veiculos;

    const out = base.filter((v) => {
      if (marca && v.marca !== marca) return false;
      if (cambio && v.cambio !== cambio) return false;
      if (v.preco > max || v.preco < min) return false;
      return true;
    });

    out.sort((a, b) => {
      switch (sort) {
        case "preco-asc":
          return a.preco - b.preco;
        case "preco-desc":
          return b.preco - a.preco;
        case "km-asc":
          return a.km - b.km;
        case "ano-desc":
          return b.ano - a.ano;
        default:
          return Number(b.destaque) - Number(a.destaque) || b.preco - a.preco;
      }
    });
    return out;
  }, [veiculos, q, marca, precoMax, cambio, sort]);

  const hasFilters = q || marca || precoMax || cambio;

  function clearAll() {
    setQ("");
    setMarca("");
    setPrecoMax("");
    setCambio("");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      {/* Filters */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-3xl border border-line bg-white p-5 shadow-soft">
          <div className="mb-5 flex items-center justify-between">
            <span className="inline-flex items-center gap-2 font-display font-semibold text-ink">
              <SlidersHorizontal className="size-4 text-brand-500" />
              Filtros
            </span>
            {hasFilters && (
              <button onClick={clearAll} className="text-xs font-medium text-brand-600 hover:underline">
                Limpar
              </button>
            )}
          </div>

          <FilterGroup label="Buscar">
            <div className="flex items-center gap-2 rounded-xl border border-line bg-paper px-3 py-2.5 focus-within:border-brand-400">
              <Search className="size-4 text-muted" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Modelo…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted/70"
              />
            </div>
          </FilterGroup>

          <FilterGroup label="Marca">
            <div className="flex flex-wrap gap-2">
              <Chip active={marca === ""} onClick={() => setMarca("")}>
                Todas
              </Chip>
              {marcas.map((m) => (
                <Chip key={m} active={marca === m} onClick={() => setMarca(marca === m ? "" : m)}>
                  {m}
                </Chip>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup label="Faixa de preço">
            <Select value={precoMax} onChange={setPrecoMax} options={precoOptions} />
          </FilterGroup>

          <FilterGroup label="Câmbio">
            <div className="flex flex-wrap gap-2">
              {["", "Automático", "Manual"].map((c) => (
                <Chip key={c || "all"} active={cambio === c} onClick={() => setCambio(c)}>
                  {c || "Todos"}
                </Chip>
              ))}
            </div>
          </FilterGroup>
        </div>
      </aside>

      {/* Results */}
      <div className="min-w-0">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted">
            <span className="font-semibold text-ink">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "veículo encontrado" : "veículos encontrados"}
          </p>
          <div className="flex items-center gap-3">
            <Select value={sort} onChange={setSort} options={sortOptions} compact />
            <div className="flex items-center rounded-full border border-line bg-white p-1">
              <ViewBtn active={view === "grid"} onClick={() => setView("grid")} label="Grade">
                <LayoutGrid className="size-4" />
              </ViewBtn>
              <ViewBtn active={view === "list"} onClick={() => setView("list")} label="Lista">
                <Rows3 className="size-4" />
              </ViewBtn>
            </div>
          </div>
        </div>

        {hasFilters && (
          <div className="mb-5 flex flex-wrap gap-2">
            {marca && <ActiveChip onClear={() => setMarca("")}>{marca}</ActiveChip>}
            {precoMax && (
              <ActiveChip onClear={() => setPrecoMax("")}>
                {precoOptions.find((p) => p.value === precoMax)?.label}
              </ActiveChip>
            )}
            {cambio && <ActiveChip onClear={() => setCambio("")}>{cambio}</ActiveChip>}
            {q && <ActiveChip onClear={() => setQ("")}>&ldquo;{q}&rdquo;</ActiveChip>}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-line bg-paper py-20 text-center">
            <span className="inline-flex size-16 items-center justify-center rounded-2xl bg-mist text-muted">
              <CarFront className="size-8" />
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold text-ink">Nenhum veículo encontrado</h3>
            <p className="mt-1 max-w-sm text-muted">
              Ajuste os filtros ou fale com a gente, podemos buscar o carro ideal para você.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={clearAll}
                className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-mist"
              >
                Limpar filtros
              </button>
              <ButtonLink
                href={whatsappLink(`Olá! Procuro um carro específico na ${site.name}.`)}
                external
                variant="whatsapp"
                size="sm"
              >
                Falar no WhatsApp
              </ButtonLink>
            </div>
          </div>
        ) : (
          <motion.div
            layout
            className={
              view === "grid"
                ? "grid grid-cols-2 gap-3 sm:gap-6 xl:grid-cols-3"
                : "flex flex-col gap-5"
            }
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((v) => (
                <motion.div
                  key={v.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <VehicleCard v={v} layout={view} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 border-t border-line pt-4 first:border-t-0 first:pt-0">
      <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted">{label}</p>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
        active
          ? "bg-brand text-white shadow-[0_6px_16px_-6px_rgba(46,49,146,0.7)]"
          : "bg-mist text-ink/70 hover:bg-brand/10 hover:text-brand-600"
      }`}
    >
      {children}
    </button>
  );
}

function Select({
  value,
  onChange,
  options,
  compact,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
  compact?: boolean;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full cursor-pointer rounded-xl border border-line bg-white text-ink outline-none transition-colors hover:border-brand-300 focus:border-brand-400 ${
        compact ? "px-3 py-2 text-sm" : "px-3 py-2.5 text-sm"
      }`}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function ViewBtn({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`inline-flex size-9 items-center justify-center rounded-full transition-colors ${
        active ? "bg-brand text-white" : "text-muted hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function ActiveChip({ children, onClear }: { children: React.ReactNode; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 py-1.5 pl-3 pr-1.5 text-sm font-medium text-brand-600">
      {children}
      <button
        onClick={onClear}
        aria-label="Remover filtro"
        className="inline-flex size-5 items-center justify-center rounded-full bg-brand/15 text-brand-600 hover:bg-brand/25"
      >
        <X className="size-3" />
      </button>
    </span>
  );
}
