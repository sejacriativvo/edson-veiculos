import type { Veiculo } from "@/data/veiculos";

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

/**
 * Busca livre: combina marca, modelo, título, cor, combustível, câmbio e ano.
 * Cada palavra digitada precisa bater em algum campo (AND entre termos).
 * Ex.: "corolla prata", "jeep 2019", "automático preto".
 */
export function searchVeiculos(veiculos: Veiculo[], query: string): Veiculo[] {
  const q = norm(query.trim());
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);

  return veiculos.filter((v) => {
    const haystack = norm(
      [
        v.marca,
        v.modelo,
        v.titulo,
        v.cor,
        v.combustivel,
        v.cambio,
        v.anoFabMod,
        String(v.ano),
      ].join(" "),
    );
    return tokens.every((t) => haystack.includes(t));
  });
}
