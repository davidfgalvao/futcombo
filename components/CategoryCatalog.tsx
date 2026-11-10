"use client";

import { useMemo, useState } from "react";
import { ProductGrid } from "./ProductGrid";
import type { Product } from "@/lib/types";

export function CategoryCatalog({
  title,
  description,
  products,
}: {
  title: string;
  description: string;
  products: Product[];
}) {
  const sizes = useMemo(() => {
    const unique = new Set<string>();
    products.forEach((product) => product.sizes.forEach((size) => unique.add(size)));
    return Array.from(unique);
  }, [products]);
  const [selected, setSelected] = useState<string[]>([]);

  const filtered =
    selected.length === 0
      ? products
      : products.filter((product) => product.sizes.some((size) => selected.includes(size)));

  function toggle(size: string) {
    setSelected((current) =>
      current.includes(size) ? current.filter((item) => item !== size) : [...current, size],
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-sm text-gold">Início / {title}</p>
      <h1 className="mt-1 font-display text-4xl font-extrabold">{title}</h1>
      <p className="mt-2 mb-8 text-muted">
        {filtered.length} produtos · {description}
      </p>
      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="h-fit rounded-2xl border border-border bg-surface p-5">
          <p className="font-display text-xl font-bold">Filtrar por</p>
          <p className="mt-4 mb-2 text-sm font-semibold uppercase tracking-wide text-muted">Tamanho</p>
          <ul className="space-y-1">
            {sizes.map((size) => (
              <li key={size}>
                <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selected.includes(size)}
                    onChange={() => toggle(size)}
                    className="h-4 w-4 accent-gold"
                  />
                  {size}
                </label>
              </li>
            ))}
          </ul>
        </aside>
        <ProductGrid products={filtered} />
      </div>
    </div>
  );
}
