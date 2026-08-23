import type { ProductCategory } from "./types";

export const categories: {
  slug: ProductCategory;
  label: string;
  description: string;
}[] = [
  {
    slug: "selecoes",
    label: "Seleções",
    description: "Mantos das principais seleções do mundo",
  },
  {
    slug: "retro",
    label: "Retrô",
    description: "Clássicos que marcaram época",
  },
  {
    slug: "jogador",
    label: "Jogador",
    description: "Versão jogador, caimento profissional",
  },
  {
    slug: "torcedor",
    label: "Torcedor",
    description: "Camisas oficiais de torcedor",
  },
  {
    slug: "conjuntos",
    label: "Conjuntos Esportivos",
    description: "Camisa + calção para treino e jogo",
  },
  {
    slug: "nba",
    label: "NBA",
    description: "Regatas das franquias da NBA",
  },
  {
    slug: "grade",
    label: "Grade",
    description: "Atacado a partir de 6 peças",
  },
];
