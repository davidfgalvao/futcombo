"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { products } from "@/lib/products";
import { formatBRL, FREE_SHIPPING_FROM, pixPrice } from "@/lib/format";
import { JerseyMockup } from "./JerseyMockup";

export function CartDrawer() {
  const { items, open, setOpen, removeItem, updateQuantity, subtotal, count } = useCart();
  const missing = Math.max(0, FREE_SHIPPING_FROM - subtotal);

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        className={`absolute inset-0 bg-black/60 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={() => setOpen(false)}
        aria-label="Fechar carrinho"
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-bg shadow-2xl transition-transform duration-200 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-label="Carrinho de compras"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-2xl font-bold">
            Carrinho ({count})
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-lg hover:bg-white/5"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="py-16 text-center text-muted">O carrinho de compras está vazio.</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => {
                const product = products.find((entry) => entry.id === item.productId);
                if (!product) return null;
                return (
                  <li key={`${item.productId}-${item.size}`} className="flex gap-3 border-b border-border pb-4">
                    <div className="h-20 w-16 shrink-0 rounded-lg bg-surface">
                      <JerseyMockup product={product} className="h-full w-full" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">{product.name}</p>
                      <p className="text-sm text-muted">Tam. {item.size}</p>
                      <p className="mt-1 font-bold tabular-nums">{formatBRL(product.price)}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          className="inline-flex min-h-9 min-w-9 cursor-pointer items-center justify-center rounded-md border border-border"
                          onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                          aria-label="Diminuir quantidade"
                        >
                          −
                        </button>
                        <span className="min-w-6 text-center tabular-nums">{item.quantity}</span>
                        <button
                          type="button"
                          className="inline-flex min-h-9 min-w-9 cursor-pointer items-center justify-center rounded-md border border-border"
                          onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                          aria-label="Aumentar quantidade"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          className="ml-auto cursor-pointer text-sm text-muted underline hover:text-white"
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
          )}
        </div>

        <div className="border-t border-border px-5 py-4">
          {missing > 0 && items.length > 0 ? (
            <p className="mb-3 text-sm text-muted">
              Faltam <strong className="text-gold">{formatBRL(missing)}</strong> para frete grátis.
            </p>
          ) : items.length > 0 ? (
            <p className="mb-3 text-sm font-semibold text-gold">Você ganhou frete grátis.</p>
          ) : null}
          <div className="mb-1 flex justify-between text-sm text-muted">
            <span>Pix (5% off)</span>
            <span className="tabular-nums">{formatBRL(pixPrice(subtotal))}</span>
          </div>
          <div className="mb-4 flex justify-between font-display text-xl font-bold">
            <span>Subtotal</span>
            <span className="tabular-nums">{formatBRL(subtotal)}</span>
          </div>
          <Link
            href="/carrinho"
            onClick={() => setOpen(false)}
            className="mb-2 flex min-h-12 cursor-pointer items-center justify-center rounded-xl border border-white/20 font-semibold hover:border-gold hover:text-gold"
          >
            Ver carrinho
          </Link>
          <Link
            href="/checkout"
            onClick={() => setOpen(false)}
            className="flex min-h-12 cursor-pointer items-center justify-center rounded-xl bg-gold font-bold text-zinc-900 hover:bg-gold-hover"
          >
            Finalizar compra
          </Link>
        </div>
      </aside>
    </div>
  );
}
