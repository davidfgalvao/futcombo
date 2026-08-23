import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/types";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-surface px-6 py-16 text-center">
        <p className="font-display text-2xl font-bold text-white">Nenhum produto encontrado</p>
        <p className="mt-2 text-muted">Tente outro time, categoria ou termo de busca.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
