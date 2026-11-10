"use client";

import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { ProductImage } from "./ProductImage";
import type { Product } from "@/lib/types";
import {
  CARD_INSTALLMENTS,
  formatBRL,
  installmentValue,
  pixPrice,
} from "@/lib/format";
import { useFavorites } from "@/lib/favorites";
import { useCart } from "@/lib/cart";

export function ProductCard({ product }: { product: Product }) {
  const { has, toggle } = useFavorites();
  const { addItem } = useCart();
  const loved = has(product.id);
  const defaultSize = product.sizes.includes("M") ? "M" : product.sizes[0];

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white text-zinc-900">
      <div className="relative bg-[#111]">
        <button
          type="button"
          onClick={() => toggle(product.id)}
          className="absolute right-2 top-2 z-10 inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white hover:text-gold"
          aria-label={loved ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          aria-pressed={loved}
        >
          <Heart className={`h-5 w-5 ${loved ? "fill-gold text-gold" : ""}`} />
        </button>
        <Link href={`/produto/${product.slug}`} className="block">
          <div className="aspect-square overflow-hidden">
            <ProductImage product={product} className="mx-auto max-h-full" />
          </div>
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
          {product.category === "selecoes" ? "Seleções" : product.version}
        </p>
        <Link href={`/produto/${product.slug}`}>
          <h3 className="min-h-12 font-display text-lg font-bold leading-snug transition-colors duration-200 group-hover:text-amber-700">
            {product.name}
          </h3>
        </Link>
        <p className="flex items-center gap-1 text-xs text-zinc-600" aria-label="Avaliação 5 de 5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className="h-3.5 w-3.5 fill-gold text-gold" />
          ))}
        </p>
        <p className="font-display text-2xl font-extrabold tabular-nums">
          {formatBRL(product.price)}
        </p>
        <p className="text-sm text-zinc-600">
          {formatBRL(pixPrice(product.price))} com PIX
        </p>
        <p className="text-sm font-semibold text-emerald-700">
          Envio direto ao endereço cadastrado
        </p>
        <p className="text-xs text-zinc-500">
          ou {CARD_INSTALLMENTS}x de {formatBRL(installmentValue(product.price, CARD_INSTALLMENTS))} sem juros
        </p>
        <div className="flex flex-wrap gap-1">
          {product.sizes.map((size) => (
            <span key={size} className="rounded border border-zinc-200 px-2 py-1 text-xs font-semibold text-zinc-700">
              {size}
            </span>
          ))}
        </div>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-2">
          <Link
            href={`/produto/${product.slug}`}
            className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-lg border border-zinc-300 text-sm font-bold"
          >
            Olhar
          </Link>
          <button
            type="button"
            onClick={() => addItem({ productId: product.id, size: defaultSize, quantity: 1 })}
            className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-lg bg-gold text-sm font-extrabold text-zinc-900 hover:bg-gold-hover"
          >
            Comprar
          </button>
        </div>
      </div>
    </article>
  );
}
