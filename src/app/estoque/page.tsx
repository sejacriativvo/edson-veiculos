import type { Metadata } from "next";
import { veiculos, marcas } from "@/data/veiculos";
import { EstoqueClient } from "@/components/EstoqueClient";

export const metadata: Metadata = {
  title: "Estoque de veículos",
  description: "Confira todos os veículos disponíveis na Edson Veículos. Filtre por marca, preço e câmbio.",
};

export default async function EstoquePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; marca?: string; precoMax?: string }>;
}) {
  const sp = await searchParams;

  return (
    <>
      <section className="relative overflow-hidden bg-edson-radial pt-28 text-white lg:pt-36">
        <div className="aurora pointer-events-none absolute inset-0 opacity-30" />
        <div className="container-x relative py-14 md:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/85">
            {veiculos.length} veículos disponíveis
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Nosso estoque
          </h1>
          <p className="mt-3 max-w-xl text-lg text-white/65">
            Encontre o carro ideal usando os filtros. Todos revisados e com procedência garantida.
          </p>
        </div>
      </section>

      <section className="bg-paper py-12 md:py-16">
        <div className="container-x">
          <EstoqueClient
            veiculos={veiculos}
            marcas={marcas}
            initial={{ q: sp.q, marca: sp.marca, precoMax: sp.precoMax }}
          />
        </div>
      </section>
    </>
  );
}
