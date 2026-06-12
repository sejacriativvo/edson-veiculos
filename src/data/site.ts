export const site = {
  name: "Edson Veículos",
  shortName: "Edson",
  tagline: "O veículo que você procura está aqui.",
  description:
    "Concessionária multimarca em Araras-SP. Estoque selecionado, procedência garantida e financiamento facilitado.",
  foundedYear: 1998,
  city: "Araras",
  state: "SP",
  address: "Av. Dona Renata, 5.225",
  addressFull: "Av. Dona Renata, 5.225 · Araras-SP",
  phone: "(19) 3541-0900",
  phoneRaw: "551935410900",
  whatsapp: "(19) 98277-5559",
  whatsappRaw: "5519982775559",
  email: "contato@edsonveiculos.com.br",
  instagram: "https://www.instagram.com/edsonveiculosararas/",
  instagramHandle: "@edsonveiculosararas",
  facebook: "https://www.facebook.com/edsonveiculosararas/",
  hours: [
    { d: "Segunda a Sexta", h: "08h30 às 18h30" },
    { d: "Sábado", h: "08h30 às 13h00" },
    { d: "Domingo", h: "Fechado" },
  ],
  // Google Maps embed for the address (Araras / SP)
  mapEmbed:
    "https://www.google.com/maps?q=Av.+Dona+Renata,+5225,+Araras+-+SP&output=embed",
  mapLink: "https://www.google.com/maps/search/?api=1&query=Av.+Dona+Renata,+5225,+Araras+SP",
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsappRaw}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const team = [
  { nome: "Edson Curtolo", cargo: "Fundador & Proprietário", foto: "/equipe/edson.png" },
  { nome: "Márcia Curtolo", cargo: "Sócia · Administração", foto: "/equipe/marcia.png" },
  { nome: "João Bortolucci", cargo: "Consultor de vendas", foto: "/equipe/joao.png" },
  { nome: "Luiz Neto", cargo: "Consultor de vendas", foto: "/equipe/luiz.png" },
];

// Marcas exibidas na vitrine de credibilidade (logos em /public/marcas)
export const brandLogos = [
  { nome: "Toyota", logo: "/marcas/toyota.png" },
  { nome: "Honda", logo: "/marcas/honda.png" },
  { nome: "Jeep", logo: "/marcas/jeep.png" },
  { nome: "Volkswagen", logo: "/marcas/volkswagen.png" },
  { nome: "Chevrolet", logo: "/marcas/chevrolet.png" },
  { nome: "Fiat", logo: "/marcas/fiat.png" },
  { nome: "Hyundai", logo: "/marcas/hyundai.png" },
  { nome: "Renault", logo: "/marcas/renault.png" },
  { nome: "Nissan", logo: "/marcas/nissan.png" },
  { nome: "Peugeot", logo: "/marcas/peugeot.png" },
];

export const nav = [
  { label: "Início", href: "/" },
  { label: "Estoque", href: "/estoque" },
  { label: "Financiamento", href: "/#financiamento" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];
