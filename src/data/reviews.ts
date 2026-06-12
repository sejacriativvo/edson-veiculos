// ⚠️ Placeholder — substituir pelos dados reais do Google da Edson Veículos.
export const googleRating = {
  score: 4.9,
  count: 180,
  url: "https://www.google.com/maps/search/?api=1&query=Edson+Veículos+Araras+SP",
};

export type Review = { nome: string; local: string; nota: number; texto: string };

export const reviews: Review[] = [
  {
    nome: "Ricardo Almeida",
    local: "Araras-SP",
    nota: 5,
    texto:
      "Comprei meu Corolla na Edson e o atendimento foi impecável. Carro revisado, sem surpresa, e o financiamento saiu no mesmo dia.",
  },
  {
    nome: "Patrícia Souza",
    local: "Leme-SP",
    nota: 5,
    texto:
      "Já é o segundo carro que compro com eles. Confiança total, preço justo e zero enrolação. Recomendo de olhos fechados.",
  },
  {
    nome: "Anderson Lima",
    local: "Araras-SP",
    nota: 5,
    texto:
      "Levei meu usado na troca e a avaliação foi honesta. Saí com um carro melhor e parcela que coube no bolso.",
  },
  {
    nome: "Mariana Costa",
    local: "Conchal-SP",
    nota: 5,
    texto:
      "Equipe muito atenciosa do começo ao fim. Explicaram tudo com paciência. Loja de confiança em Araras.",
  },
  {
    nome: "Fernando Dias",
    local: "Araras-SP",
    nota: 5,
    texto:
      "Procurava um SUV e me ajudaram a achar o ideal. Documentação resolvida por eles, foi só pegar a chave.",
  },
  {
    nome: "Juliana Reis",
    local: "Leme-SP",
    nota: 5,
    texto:
      "Tradição que se sente no atendimento. Sério, transparente e sem pressão pra fechar. Voltarei com certeza.",
  },
];
