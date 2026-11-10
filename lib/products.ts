import type { Product, ProductCategory, JerseyPattern } from "./types";
import betaCatalog from "./beta-catalog.json";

const ADULT = ["P", "M", "G", "GG", "XG"];
const RETRO = ["P", "M", "G", "GG", "XL"];

const PRICE: Record<ProductCategory, { price: number; original: number; wholesale: number }> = {
  selecoes: { price: 99.9, original: 179.9, wholesale: 50 },
  retro: { price: 99.9, original: 179.9, wholesale: 50 },
  jogador: { price: 119.9, original: 199.9, wholesale: 55 },
  torcedor: { price: 99.9, original: 179.9, wholesale: 50 },
  conjuntos: { price: 149.9, original: 229.9, wholesale: 80 },
  nba: { price: 99.9, original: 179.9, wholesale: 50 },
  grade: { price: 599.4, original: 899, wholesale: 300 },
};

type BetaItem = {
  slug: string;
  name: string;
  category: ProductCategory;
  image: string;
  sizes: string[];
  team: string;
  gender: string;
};

function refineCategory(name: string, fallback: ProductCategory): ProductCategory {
  const n = name.toLowerCase();
  if (n.includes("retrô") || n.includes("retro")) return "retro";
  if (
    n.includes("seleção") ||
    n.includes("selecao") ||
    n.includes("copa do mundo") ||
    n.includes("copa 2026") ||
    n.includes("argentina") ||
    n.includes("méxico") ||
    n.includes("mexico") ||
    /\bbrasil\b/.test(n)
  ) {
    return "selecoes";
  }
  return fallback;
}

function camisa(
  id: string,
  name: string,
  team: string,
  category: ProductCategory,
  colors: Product["colors"],
  pattern: JerseyPattern,
  extra: Partial<Product> = {},
): Product {
  const table = PRICE[category];
  return {
    id,
    slug: extra.slug ?? id.replace(/_/g, "-"),
    name,
    team,
    category,
    gender: extra.gender ?? "masculino",
    version:
      extra.version ??
      (category === "selecoes" ? "torcedor" : category === "conjuntos" ? "conjunto" : category),
    price: extra.price ?? table.price,
    originalPrice: extra.originalPrice ?? table.original,
    wholesalePrice: extra.wholesalePrice ?? table.wholesale,
    colors,
    pattern,
    featured: extra.featured,
    wholesaleEligible: extra.wholesaleEligible ?? true,
    sizes: extra.sizes ?? (category === "retro" ? RETRO : ADULT),
    image: extra.image,
    description:
      extra.description ?? `${name}. Envio direto ao endereço cadastrado. Sem estoque local.`,
  };
}

function fromBeta(item: BetaItem, index: number): Product {
  const category = refineCategory(item.name, item.category);
  const table = PRICE[category];
  const gender =
    item.gender === "feminina" ? "feminino" : item.gender === "infantil" ? "infantil" : "masculino";
  return {
    id: item.slug,
    slug: item.slug,
    name: item.name,
    team: item.team,
    category,
    gender,
    version: category === "selecoes" ? "torcedor" : category === "conjuntos" ? "conjunto" : category,
    price: table.price,
    originalPrice: table.original,
    wholesalePrice: table.wholesale,
    colors: { primary: "#111111", secondary: "#FFFFFF", accent: "#F5C518" },
    pattern: "solid",
    featured: index < 8,
    wholesaleEligible: true,
    sizes: item.sizes.length ? item.sizes : ADULT,
    image: item.image,
    description: `${item.name}. Envio direto ao endereço cadastrado. Sem estoque local.`,
  };
}

const imported = (betaCatalog as BetaItem[]).map(fromBeta);

const extras: Product[] = [
  camisa(
    "lakers-24",
    "Regata Lakers 24 NBA",
    "Lakers",
    "nba",
    { primary: "#552583", secondary: "#FDB927", accent: "#FFFFFF" },
    "solid",
    { featured: true, slug: "regata-lakers-24-nba", version: "nba" },
  ),
  camisa(
    "bulls-23",
    "Regata Bulls 23 NBA",
    "Bulls",
    "nba",
    { primary: "#CE1141", secondary: "#111111", accent: "#FFFFFF" },
    "solid",
    { slug: "regata-bulls-23-nba", version: "nba" },
  ),
  camisa(
    "celtics-0",
    "Regata Celtics 0 NBA",
    "Celtics",
    "nba",
    { primary: "#007A33", secondary: "#BA9653", accent: "#FFFFFF" },
    "solid",
    { slug: "regata-celtics-0-nba", version: "nba" },
  ),
  camisa(
    "grade-brasileirao",
    "Grade Brasileirão — 6 camisas sortidas",
    "Brasileirão",
    "grade",
    { primary: "#F5C518", secondary: "#111111", accent: "#FFFFFF" },
    "check",
    {
      featured: true,
      slug: "grade-brasileirao-6-pecas",
      description: "6 camisas de times brasileiros, envio direto ao endereço do cliente.",
    },
  ),
  camisa(
    "grade-europa",
    "Grade Europa — 6 camisas sortidas",
    "Europa",
    "grade",
    { primary: "#1D3A6E", secondary: "#F5C518", accent: "#FFFFFF" },
    "check",
    {
      slug: "grade-europa-6-pecas",
      description: "6 camisas de clubes europeus, envio direto ao endereço do cliente.",
    },
  ),
];

export const products: Product[] = [...imported, ...extras];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: ProductCategory) {
  return products.filter((product) => product.category === category);
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}

export function searchProducts(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return products;

  return products.filter((product) =>
    [product.name, product.team, product.category, product.version]
      .join(" ")
      .toLowerCase()
      .includes(normalized),
  );
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter(
      (item) =>
        item.id !== product.id &&
        (item.category === product.category || item.team === product.team),
    )
    .slice(0, limit);
}
