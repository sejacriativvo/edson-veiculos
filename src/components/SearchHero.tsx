"use client";

import { useRouter } from "next/navigation";
import { LiveSearch } from "./LiveSearch";

export function SearchHero({ marcas }: { marcas: string[] }) {
  const router = useRouter();
  const atalhos = ["Automático", ...marcas.slice(0, 4)];

  return (
    <div className="max-w-3xl">
      <LiveSearch variant="hero" />
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-sm text-white/55">Buscas rápidas:</span>
        {atalhos.map((a) => (
          <button
            key={a}
            onClick={() => router.push(`/estoque?q=${encodeURIComponent(a)}`)}
            className="rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-sm font-medium text-white/85 backdrop-blur transition-colors hover:border-white/40 hover:bg-white/15"
          >
            {a}
          </button>
        ))}
      </div>
    </div>
  );
}
