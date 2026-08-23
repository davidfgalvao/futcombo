import type { Metadata } from "next";
import { ProductGrid } from "@/components/ProductGrid";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Todas as camisas",
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-sm text-gold">Catálogo</p>
      <h1 className="mt-1 font-display text-4xl font-extrabold">Todas as categorias</h1>
      <p className="mt-2 mb-8 text-muted">
        {products.length} peças em pronta-entrega · varejo e atacado
      </p>
      <ProductGrid products={products} />
    </div>
  );
}
