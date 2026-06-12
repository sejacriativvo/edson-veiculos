"use client";

import { useEffect, useMemo, useState } from "react";
import { useSpring, useMotionValueEvent } from "motion/react";
import { ArrowRight } from "lucide-react";
import { formatBRL } from "@/lib/format";
import { site, whatsappLink } from "@/data/site";

const RATE = 0.0149; // 1,49% a.m. (ilustrativo, mesma base dos cards)

function parcelaDe(preco: number, entradaPct: number, meses: number) {
  const financiado = preco * (1 - entradaPct / 100);
  const i = RATE;
  const fator = (i * Math.pow(1 + i, meses)) / (Math.pow(1 + i, meses) - 1);
  return financiado * fator;
}

function Slider({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted">{label}</span>
        <span className="font-display text-base font-bold text-ink">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range-edson mt-3 w-full"
        style={{ background: `linear-gradient(to right, var(--color-brand) ${pct}%, var(--color-mist) ${pct}%)` }}
      />
    </div>
  );
}

export function FinanceSimulator() {
  const [preco, setPreco] = useState(90000);
  const [entrada, setEntrada] = useState(30);
  const [meses, setMeses] = useState(48);

  const parcela = useMemo(() => parcelaDe(preco, entrada, meses), [preco, entrada, meses]);
  const entradaReais = (preco * entrada) / 100;

  const mv = useSpring(parcela, { stiffness: 140, damping: 22 });
  const [shown, setShown] = useState(parcela);
  useEffect(() => mv.set(parcela), [parcela, mv]);
  useMotionValueEvent(mv, "change", (v) => setShown(v));

  const msg = `Olá! Simulei um financiamento no site da ${site.name}:\n• Veículo: ${formatBRL(
    preco,
  )}\n• Entrada: ${formatBRL(entradaReais)} (${entrada}%)\n• Prazo: ${meses}x\n• Parcela estimada: ${formatBRL(
    parcela,
  )}/mês\n\nQuero confirmar as condições reais.`;

  return (
    <div className="rounded-[2rem] border border-line bg-white p-6 text-ink shadow-lift sm:p-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">Simulador</p>
          <h3 className="mt-1 font-display text-xl font-bold">Monte sua parcela</h3>
        </div>
        <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">em até 60x</span>
      </div>

      <div className="mt-7 space-y-6">
        <Slider
          label="Valor do veículo"
          value={preco}
          display={formatBRL(preco)}
          min={20000}
          max={200000}
          step={1000}
          onChange={setPreco}
        />
        <Slider
          label="Entrada"
          value={entrada}
          display={`${entrada}% · ${formatBRL(entradaReais)}`}
          min={10}
          max={60}
          step={5}
          onChange={setEntrada}
        />
        <Slider
          label="Prazo"
          value={meses}
          display={`${meses}x`}
          min={12}
          max={60}
          step={6}
          onChange={setMeses}
        />
      </div>

      <div className="mt-7 flex items-end justify-between rounded-2xl bg-paper px-5 py-4">
        <div>
          <p className="text-xs font-medium text-muted">Parcela estimada</p>
          <p className="font-display text-3xl font-bold text-ink sm:text-[2.1rem]">
            {formatBRL(shown)}
            <span className="text-base font-semibold text-muted">/mês</span>
          </p>
        </div>
        <span className="mb-1 rounded-full bg-emerald-500/12 px-2.5 py-1 text-xs font-bold text-emerald-600">
          {meses}x fixas
        </span>
      </div>

      <a
        href={whatsappLink(msg)}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 font-semibold text-white shadow-[0_12px_32px_-8px_rgba(46,49,146,0.6)] transition-all hover:-translate-y-0.5 hover:bg-brand-600"
      >
        Quero essa simulação
        <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
      </a>

      <p className="mt-4 text-center text-[0.7rem] leading-relaxed text-muted">
        Simulação ilustrativa, sujeita a análise e aprovação de crédito. Valores e taxas podem variar conforme o banco
        e o seu perfil.
      </p>
    </div>
  );
}
