"use client";

import { useState } from "react";
import { JerseyMockup } from "@/components/JerseyMockup";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeader } from "@/components/SectionHeader";
import { useCart } from "@/lib/cart";
import { useFavorites } from "@/lib/favorites";
import {
  discountPercent,
  formatBRL,
  FREE_SHIPPING_FROM,
  installmentValue,
  pixPrice,
} from "@/lib/format";
import { getRelatedProducts } from "@/lib/products";
import type { Product } from "@/lib/types";
import { Heart } from "lucide-react";

export function ProductView({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { has, toggle } = useFavorites();
  const [size, setSize] = useState(product.sizes[1] ?? product.sizes[0]);
  const [personalized, setPersonalized] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customNumber, setCustomNumber] = useState("");
  const off = discountPercent(product.price, product.originalPrice);
  const extra = personalized ? 25 : 0;
  const total = product.price + extra;
  const related = getRelatedProducts(product);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div className="relative rounded-[28px] border border-border bg-surface p-6">
          {off > 0 && (
            <span className="absolute left-6 top-6 rounded-md bg-gold px-2 py-1 text-sm font-extrabold text-zinc-900">
              -{off}%
            </span>
          )}
          <JerseyMockup product={product} className="mx-auto w-full max-w-md" />
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-gold">
            {product.team} · {product.version}
          </p>
          <h1 className="mt-2 font-display text-4xl font-extrabold leading-tight">
            {product.name}
          </h1>
          <p className="mt-3 leading-relaxed text-muted">{product.description}</p>

          <div className="mt-6">
            <p className="text-muted line-through">{formatBRL(product.originalPrice)}</p>
            <p className="font-display text-4xl font-extrabold tabular-nums">
              {formatBRL(total)}
            </p>
            <p className="text-muted">
              Pix: {formatBRL(pixPrice(total))} · ou 10x de {formatBRL(installmentValue(total))}
            </p>
            <p className="mt-2 text-sm text-gold">
              Frete grátis a partir de {formatBRL(FREE_SHIPPING_FROM)}
            </p>
          </div>

          <fieldset className="mt-8">
            <legend className="mb-3 font-semibold">Tamanho</legend>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name="tamanho"
                    value={option}
                    checked={size === option}
                    onChange={() => setSize(option)}
                    className="sr-only"
                  />
                  <span
                    className={`inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-xl border px-3 font-bold ${
                      size === option
                        ? "border-gold bg-gold text-zinc-900"
                        : "border-border text-white hover:border-gold"
                    }`}
                  >
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {product.category !== "grade" && (
            <fieldset className="mt-6">
              <legend className="mb-3 font-semibold">Personalize aqui</legend>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setPersonalized(false)}
                  className={`min-h-11 cursor-pointer rounded-xl border px-4 text-sm font-semibold ${
                    !personalized ? "border-gold bg-gold text-zinc-900" : "border-border"
                  }`}
                >
                  Sem personalização
                </button>
                <button
                  type="button"
                  onClick={() => setPersonalized(true)}
                  className={`min-h-11 cursor-pointer rounded-xl border px-4 text-sm font-semibold ${
                    personalized ? "border-gold bg-gold text-zinc-900" : "border-border"
                  }`}
                >
                  Com personalização (+ R$ 25)
                </button>
              </div>
              {personalized && (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <label className="block text-sm">
                    Nome
                    <input
                      value={customName}
                      onChange={(event) => setCustomName(event.target.value.toUpperCase())}
                      className="mt-1 min-h-12 w-full rounded-xl border border-border bg-surface px-3"
                      maxLength={12}
                    />
                  </label>
                  <label className="block text-sm">
                    Número
                    <input
                      value={customNumber}
                      onChange={(event) =>
                        setCustomNumber(event.target.value.replace(/\D/g, "").slice(0, 2))
                      }
                      className="mt-1 min-h-12 w-full rounded-xl border border-border bg-surface px-3"
                      inputMode="numeric"
                    />
                  </label>
                </div>
              )}
            </fieldset>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                addItem({
                  productId: product.id,
                  size,
                  quantity: 1,
                  personalized,
                  customName,
                  customNumber,
                })
              }
              className="inline-flex min-h-12 flex-1 cursor-pointer items-center justify-center rounded-xl bg-gold px-6 font-bold text-zinc-900 hover:bg-gold-hover"
            >
              Comprar pronto
            </button>
            <button
              type="button"
              onClick={() => toggle(product.id)}
              className="inline-flex min-h-12 min-w-12 cursor-pointer items-center justify-center rounded-xl border border-border hover:border-gold"
              aria-label="Favoritar"
              aria-pressed={has(product.id)}
            >
              <Heart className={`h-5 w-5 ${has(product.id) ? "fill-gold text-gold" : ""}`} />
            </button>
          </div>

          <dl className="mt-10 grid gap-3 text-sm text-muted">
            <div>Envio para todo o Brasil com rastreio</div>
            <div>Garantia contra defeito de fábrica</div>
            <div>Atendimento no WhatsApp antes e depois da compra</div>
          </dl>

          <div className="mt-8 overflow-x-auto">
            <p className="mb-2 font-semibold text-white">Tabela de medidas</p>
            <table className="w-full min-w-[280px] text-left text-sm">
              <thead className="text-muted">
                <tr>
                  <th className="py-2">Tamanho</th>
                  <th>Largura</th>
                  <th>Altura</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["P", "52 cm", "69 cm"],
                  ["M", "55 cm", "71 cm"],
                  ["G", "58 cm", "73 cm"],
                  ["GG", "59 cm", "75 cm"],
                  ["XG", "60 cm", "78 cm"],
                ].map((row) => (
                  <tr key={row[0]} className="border-t border-border">
                    {row.map((cell) => (
                      <td key={cell} className="py-2">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2 text-xs text-muted">Medidas podem variar 2 a 3 cm.</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <SectionHeader title="Elas também podem" href="/produtos" />
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
