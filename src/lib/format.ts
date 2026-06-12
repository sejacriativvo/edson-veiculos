export const formatBRL = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

export const formatKM = (km: number) =>
  km === 0 ? "0 km" : `${new Intl.NumberFormat("pt-BR").format(km)} km`;

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** Simple price-based monthly estimate (illustrative only). */
export function estimateInstallment(
  price: number,
  downPaymentPct = 0.3,
  months = 48,
  monthlyRate = 0.0149,
) {
  const financed = price * (1 - downPaymentPct);
  const i = monthlyRate;
  const factor = (i * Math.pow(1 + i, months)) / (Math.pow(1 + i, months) - 1);
  return financed * factor;
}
