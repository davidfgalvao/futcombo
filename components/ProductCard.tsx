"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { JerseyMockup } from "./JerseyMockup";
import type { Product } from "@/lib/types";
import {
  discountPercent,
  formatBRL,
  FREE_SHIPPING_FROM,
  installmentValue,
} from "@/lib/format";
import { useFavorites } from "@/lib/favorites";

export function ProductCard({ product }: { product: Product }) {
  const { has, toggle } = useFavorites();
  const off = discountPercent(product.price, product.originalPrice);
  const loved = has(product.id);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-transform duration-200 hover:-translate-y-0.5">
      <button
        type="button"
        onClick={() => toggle(product.id)}
        className="absolute right-3 top-3 z-10 inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white transition-colors duration-200 hover:text-gold"
        aria-label={loved ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        aria-pressed={loved}
      >
        <Heart className={`h-5 w-5 ${loved ? "fill-gold text-gold" : ""}`} />
      </button>

      <Link href={`/produto/${product.slug}`} className="block bg-[#101010] pt-4">
        <div className="relative mx-auto aspect-square w-full max-w-[240px]">
          {off > 0 && (
            <span className="absolute left-4 top-0 z-10 rounded-md bg-gold px-2 py-1 text-xs font-extrabold text-zinc-900">
              -{off}%
            </span>
          )}
          <JerseyMockup product={product} className="h-full w-full" />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[11px] font-bold uppercase tracking-wider text-gold">
          {product.team} · {product.version}
        </p>
        <Link href={`/produto/${product.slug}`} className="block">
          <h3 className="font-display text-lg font-bold leading-snug text-white transition-colors duration-200 group-hover:text-gold">
            {product.name}
          </h3>
        </Link>
        <div className="mt-auto">
          <p className="text-sm text-muted line-through">
            {formatBRL(product.originalPrice)}
          </p>
          <p className="font-display text-2xl font-extrabold tabular-nums text-white">
            {formatBRL(product.price)}
          </p>
          <p className="text-sm text-muted">
            ou 10x de {formatBRL(installmentValue(product.price))} sem juros
          </p>
          {product.price >= FREE_SHIPPING_FROM || product.category === "grade" ? (
            <p className="mt-2 text-xs font-semibold text-gold">Frete grátis</p>
          ) : (
            <p className="mt-2 text-xs text-muted">Frete grátis a partir de R$ 300</p>
          )}
        </div>
      </div>
    </article>
  );
}
