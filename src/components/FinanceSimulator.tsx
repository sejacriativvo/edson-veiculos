"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { formatBRL } from "@/lib/format";
import { site, whatsappLink } from "@/data/site";

const ENTRADAS = [10, 15, 20, 25, 30, 40, 50];
const PRAZOS = [12, 24, 36, 48, 60];

export function FinanceSimulator() {
  const [preco, setPreco] = useState(90000);
  const [entrada, setEntrada] = useState(30);
  const [meses, setMeses] = useState(48);

  const entradaReais = (preco * entrada) / 100;

  const msg =
    `Olá! Tenho interesse em financiar um veículo pela ${site.name}.\n` +
    `• Valor do veículo: ${formatBRL(preco)}\n` +
    `• Entrada: ${entrada}% (${formatBRL(entradaReais)})\n` +
    `• Prazo desejado: ${meses}x\n\n` +
    `Quero saber as condições reais disponíveis.`;

  const precoPct = ((preco - 20000) / (200000 - 20000)) * 100;

  return (
    <div className="rounded-[2rem] border border-line bg-white p-6 text-ink shadow-lift sm:p-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">Financiamento</p>
          <h3 className="mt-1 font-display text-xl font-bold">Escolha suas condições</h3>
        </div>
        <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">em até 60x</span>
      </div>

      <div className="mt-7 space-y-6">
        {/* Valor do veículo */}
        <div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted">Valor do veículo</span>
            <span className="font-display text-base font-bold text-ink">{formatBRL(preco)}</span>
          </div>
          <input
            type="range"
            min={20000}
            max={200000}
            step={1000}
            value={preco}
            onChange={(e) => setPreco(Number(e.target.value))}
            className="range-edson mt-3 w-full"
            style={{
              background: `linear-gradient(to right, var(--color-brand) ${precoPct}%, var(--color-mist) ${precoPct}%)`,
            }}
          />
        </div>

        {/* Entrada */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted">Entrada</span>
            <span className="font-display text-base font-bold text-ink">
              {entrada}% · {formatBRL(entradaReais)}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {ENTRADAS.map((p) => (
              <button
                key={p}
                onClick={() => setEntrada(p)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${
                  entrada === p
                    ? "bg-brand text-white shadow-[0_4px_14px_-4px_rgba(46,49,146,0.5)]"
                    : "bg-mist text-muted hover:bg-brand/10 hover:text-brand"
                }`}
              >
                {p}%
              </button>
            ))}
          </div>
        </div>

        {/* Prazo */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted">Prazo</span>
            <span className="font-display text-base font-bold text-ink">{meses}x</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {PRAZOS.map((m) => (
              <button
                key={m}
                onClick={() => setMeses(m)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${
                  meses === m
                    ? "bg-brand text-white shadow-[0_4px_14px_-4px_rgba(46,49,146,0.5)]"
                    : "bg-mist text-muted hover:bg-brand/10 hover:text-brand"
                }`}
              >
                {m}x
              </button>
            ))}
          </div>
        </div>
      </div>

      <a
        href={whatsappLink(msg)}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 font-semibold text-white shadow-[0_12px_32px_-8px_rgba(46,49,146,0.6)] transition-all hover:-translate-y-0.5 hover:bg-brand-600"
      >
        Consultar condições no WhatsApp
        <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}
