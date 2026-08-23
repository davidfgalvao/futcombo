"use client";

import Link from "next/link";
import { JerseyMockup } from "@/components/JerseyMockup";
import { useCart } from "@/lib/cart";
import { products } from "@/lib/products";
import { formatBRL, FREE_SHIPPING_FROM, pixPrice } from "@/lib/format";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, count } = useCart();
  const missing = Math.max(0, FREE_SHIPPING_FROM - subtotal);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-display text-4xl font-extrabold">Carrinho</h1>
      <p className="mt-2 mb-8 text-muted">{count} {count === 1 ? "produto" : "produtos"}</p>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-border bg-surface px-6 py-16 text-center">
          <p className="font-display text-2xl font-bold">O carrinho está vazio</p>
          <Link href="/produtos" className="mt-4 inline-flex min-h-12 items-center rounded-xl bg-gold px-5 font-bold text-zinc-900">
            Ver coleção
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <ul className="space-y-4">
            {items.map((item) => {
              const product = products.find((entry) => entry.id === item.productId);
              if (!product) return null;
              return (
                <li key={`${item.productId}-${item.size}`} className="flex gap-4 rounded-2xl border border-border bg-surface p-4">
                  <div className="h-24 w-20 rounded-lg bg-bg">
                    <JerseyMockup product={product} className="h-full w-full" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-muted">Tamanho {item.size}</p>
                    {item.personalized && (
                      <p className="text-sm text-gold">
                        {item.customName} {item.customNumber}
                      </p>
                    )}
                    <p className="mt-1 font-bold tabular-nums">{formatBRL(product.price)}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        className="min-h-10 min-w-10 rounded-lg border border-border"
                        onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="min-w-6 text-center tabular-nums">{item.quantity}</span>
                      <button
                        type="button"
                        className="min-h-10 min-w-10 rounded-lg border border-border"
                        onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="ml-auto text-sm text-muted underline"
                        onClick={() => removeItem(item.productId, item.size)}
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <aside className="h-fit rounded-2xl border border-border bg-surface p-5">
            {missing > 0 ? (
              <p className="mb-4 text-sm text-muted">
                Faltam <strong className="text-gold">{formatBRL(missing)}</strong> para frete grátis.
              </p>
            ) : (
              <p className="mb-4 text-sm font-semibold text-gold">Frete grátis liberado.</p>
            )}
            <div className="flex justify-between text-sm text-muted">
              <span>Pix</span>
              <span className="tabular-nums">{formatBRL(pixPrice(subtotal))}</span>
            </div>
            <div className="mt-2 flex justify-between font-display text-2xl font-bold">
              <span>Total</span>
              <span className="tabular-nums">{formatBRL(subtotal)}</span>
            </div>
            <Link
              href="/checkout"
              className="mt-5 flex min-h-12 items-center justify-center rounded-xl bg-gold font-bold text-zinc-900 hover:bg-gold-hover"
            >
              Ir para o checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
