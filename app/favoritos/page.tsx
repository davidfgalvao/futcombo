"use client";

import Link from "next/link";
import { ProductGrid } from "@/components/ProductGrid";
import { useFavorites } from "@/lib/favorites";
import { products } from "@/lib/products";

export default function FavoritesPage() {
  const { ids } = useFavorites();
  const list = products.filter((product) => ids.includes(product.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="font-display text-4xl font-extrabold">Lista de desejos</h1>
      <p className="mt-2 mb-8 text-muted">{list.length} peças salvas</p>
      {list.length === 0 ? (
        <div className="rounded-2xl border border-border bg-surface px-6 py-16 text-center">
          <p className="font-display text-2xl font-bold">Nenhum favorito ainda</p>
          <Link href="/produtos" className="mt-4 inline-flex min-h-12 items-center rounded-xl bg-gold px-5 font-bold text-zinc-900">
            Ver coleção
          </Link>
        </div>
      ) : (
        <ProductGrid products={list} />
      )}
    </div>
  );
}
