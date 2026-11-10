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
  wholesalePrice: number;
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
  image?: string;
};

export type CartItem = {
  productId: string;
  size: string;
  quantity: number;
  personalized?: boolean;
  customName?: string;
  customNumber?: string;
};

export type OrderStatus =
  | "pago"
  | "enviar_fornecedor"
  | "em_transito"
  | "entregue"
  | "cancelado";

export type ShippingAddress = {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
};

export type OrderItem = {
  productId: string;
  name: string;
  team: string;
  size: string;
  quantity: number;
  salePrice: number;
  supplierCost: number;
};

export type StoreOrder = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shipping: ShippingAddress;
  payment: "pix" | "cartao";
  items: OrderItem[];
  totals: {
    sale: number;
    cost: number;
    margin: number;
  };
};
