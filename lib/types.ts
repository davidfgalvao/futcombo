export type JerseyPattern =
  | "solid"
  | "stripes"
  | "hoops"
  | "sash"
  | "halves"
  | "panel"
  | "check";

export type ProductCategory =
  | "selecoes"
  | "retro"
  | "jogador"
  | "torcedor"
  | "conjuntos"
  | "nba"
  | "grade";

export type Product = {
  id: string;
  slug: string;
  name: string;
  team: string;
  category: ProductCategory;
  gender: "masculino" | "feminino" | "infantil" | "unissex";
  version: "torcedor" | "jogador" | "retro" | "conjunto" | "nba" | "grade";
  price: number;
  originalPrice: number;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  pattern: JerseyPattern;
  featured?: boolean;
  wholesaleEligible?: boolean;
  sizes: string[];
  description: string;
};

export type CartItem = {
  productId: string;
  size: string;
  quantity: number;
  personalized?: boolean;
  customName?: string;
  customNumber?: string;
};
