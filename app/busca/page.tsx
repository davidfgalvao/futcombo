import type { Metadata } from "next";
import { ProductGrid } from "@/components/ProductGrid";
import { searchProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Busca",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = searchProducts(q);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="font-display text-4xl font-extrabold">Busca</h1>
      <p className="mt-2 mb-8 text-muted">
        {q ? `Resultados para “${q}”` : "Digite um time, liga ou categoria."}
      </p>
      <ProductGrid products={results} />
    </div>
  );
}
