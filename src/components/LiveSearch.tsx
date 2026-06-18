"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "@/components/Img";
import { AnimatePresence, motion } from "motion/react";
import { Search, X, ArrowRight, CornerDownLeft } from "lucide-react";
import { veiculos } from "@/data/veiculos";
import { searchVeiculos } from "@/lib/search";
import { formatBRL, formatKM } from "@/lib/format";

type Props = {
  /** "hero" = dropdown flutuante; "overlay" = resultados inline (modal) */
  variant?: "hero" | "overlay";
  autoFocus?: boolean;
  placeholder?: string;
  onNavigate?: () => void;
};

export function LiveSearch({ variant = "hero", autoFocus, placeholder, onNavigate }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(variant === "overlay");
  const [active, setActive] = useState(0);

  const results = useMemo(() => searchVeiculos(veiculos, q).slice(0, 6), [q]);
  const total = searchVeiculos(veiculos, q).length;
  const term = q.trim();
  const showResults = (variant === "overlay" || open) && term.length > 0;

  useEffect(() => setActive(0), [q]);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  // fecha dropdown ao clicar fora (apenas no hero)
  useEffect(() => {
    if (variant !== "hero") return;
    function onDoc(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [variant]);

  function goVeiculo(id: string) {
    onNavigate?.();
    router.push(`/veiculo/${id}`);
  }
  function goEstoque() {
    onNavigate?.();
    router.push(`/estoque${term ? `?q=${encodeURIComponent(term)}` : ""}`);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
      return;
    }
    if (!showResults) {
      if (e.key === "Enter") goEstoque();
      return;
    }
    const max = results.length; // índice extra = linha "ver todos"
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, max));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (active < results.length && results[active]) goVeiculo(results[active].id);
      else goEstoque();
    }
  }

  const Results = (
    <div className={variant === "hero" ? "max-h-[60vh] overflow-y-auto p-2" : "p-1"}>
      {results.length === 0 ? (
        <div className="px-4 py-8 text-center">
          <p className="text-sm text-muted">Nenhum veículo bate com “{term}”.</p>
          <button
            onClick={goEstoque}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline"
          >
            Ver estoque completo <ArrowRight className="size-4" />
          </button>
        </div>
      ) : (
        <>
          {results.map((v, i) => (
            <button
              key={v.id}
              onMouseEnter={() => setActive(i)}
              onClick={() => goVeiculo(v.id)}
              className={`flex w-full items-center gap-3 rounded-2xl p-2 text-left transition-colors ${
                active === i ? "bg-mist" : "hover:bg-mist/70"
              }`}
            >
              <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-mist">
                <Image src={v.fotos[0]} alt="" fill sizes="56px" className="object-cover" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-display text-sm font-semibold text-ink">
                  {v.marca} {v.modelo}
                </span>
                <span className="block truncate text-xs text-muted">
                  {v.anoFabMod} · {formatKM(v.km)} · {v.cor}
                </span>
              </span>
              <span className="font-display text-sm font-bold text-ink">{formatBRL(v.preco)}</span>
            </button>
          ))}
          <button
            onMouseEnter={() => setActive(results.length)}
            onClick={goEstoque}
            className={`mt-1 flex w-full items-center justify-center gap-1.5 rounded-2xl px-4 py-2.5 text-sm font-semibold text-brand-600 transition-colors ${
              active === results.length ? "bg-brand/10" : "hover:bg-brand/5"
            }`}
          >
            Ver {total} {total === 1 ? "resultado" : "resultados"} no estoque
            <ArrowRight className="size-4" />
          </button>
        </>
      )}
    </div>
  );

  if (variant === "overlay") {
    return (
      <div ref={wrapRef}>
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <Search className="size-5 shrink-0 text-brand-500" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={placeholder ?? "Busque por marca, modelo, ano ou cor…"}
            className="w-full bg-transparent text-lg text-ink outline-none placeholder:text-muted/70"
          />
          {q && (
            <button onClick={() => setQ("")} aria-label="Limpar" className="text-muted hover:text-ink">
              <X className="size-5" />
            </button>
          )}
        </div>
        {term.length > 0 ? (
          Results
        ) : (
          <div className="px-5 py-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Sugestões</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Corolla", "Compass", "Civic", "Automático", "Prata"].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setQ(s);
                    inputRef.current?.focus();
                  }}
                  className="rounded-full bg-mist px-3.5 py-1.5 text-sm font-medium text-ink/70 transition-colors hover:bg-brand/10 hover:text-brand-600"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // variant === "hero"
  return (
    <div ref={wrapRef} className="relative">
      <div className="glass flex items-center gap-3 rounded-[1.6rem] border border-white/50 px-5 py-4 shadow-lift">
        <Search className="size-5 shrink-0 text-brand-500" />
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={placeholder ?? "Busque por marca, modelo, ano ou cor…"}
          className="w-full bg-transparent text-[1.02rem] text-ink outline-none placeholder:text-muted/70"
        />
        {q ? (
          <button onClick={() => setQ("")} aria-label="Limpar" className="text-muted hover:text-ink">
            <X className="size-5" />
          </button>
        ) : (
          <span className="hidden items-center gap-1 rounded-lg border border-line bg-white/70 px-2 py-1 text-[0.7rem] font-medium text-muted sm:inline-flex">
            <CornerDownLeft className="size-3" /> enter
          </span>
        )}
        <button
          onClick={goEstoque}
          className="hidden shrink-0 items-center gap-2 rounded-2xl bg-brand px-5 py-2.5 font-medium text-white transition-all hover:bg-brand-600 active:scale-[0.98] sm:inline-flex"
        >
          <Search className="size-4" />
          Buscar
        </button>
      </div>

      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-[calc(100%+0.6rem)] z-30 overflow-hidden rounded-[1.4rem] border border-line bg-white shadow-lift"
          >
            {Results}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
