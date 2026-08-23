"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatBRL, pixPrice, whatsappLink } from "@/lib/format";
import { products } from "@/lib/products";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("nome") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("telefone") ?? "").trim();
    const cep = String(data.get("cep") ?? "").trim();
    const address = String(data.get("endereco") ?? "").trim();

    if (!name || !email || !phone || !cep || !address) {
      setError("Preencha todos os campos obrigatórios.");
      const firstEmpty = event.currentTarget.querySelector(
        "input:invalid, input[value='']",
      ) as HTMLInputElement | null;
      firstEmpty?.focus();
      return;
    }

    setError("");
    setSent(true);
    clear();
  }

  if (items.length === 0 && !sent) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="font-display text-4xl font-extrabold">Checkout</h1>
        <p className="mt-3 text-muted">Adicione peças ao carrinho para finalizar.</p>
        <Link href="/produtos" className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-gold px-5 font-bold text-zinc-900">
          Ver coleção
        </Link>
      </div>
    );
  }

  if (sent) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="font-display text-4xl font-extrabold">Pedido recebido</h1>
        <p className="mt-3 text-muted">
          Esta é uma loja demonstrativa. Para fechar de verdade, fale no WhatsApp.
        </p>
        <a
          href={whatsappLink("Olá! Acabei de simular um pedido na FutCombo e quero fechar a compra.")}
          className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-whatsapp px-5 font-bold text-white"
        >
          Falar no WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 lg:grid-cols-[1.2fr_0.8fr]">
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <h1 className="font-display text-4xl font-extrabold">Checkout</h1>
        {error && (
          <p role="alert" className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm">
            {error}
          </p>
        )}
        <label className="block text-sm">
          Nome completo *
          <input name="nome" required autoComplete="name" className="mt-1 min-h-12 w-full rounded-xl border border-border bg-surface px-3" />
        </label>
        <label className="block text-sm">
          E-mail *
          <input name="email" type="email" required autoComplete="email" className="mt-1 min-h-12 w-full rounded-xl border border-border bg-surface px-3" />
        </label>
        <label className="block text-sm">
          WhatsApp *
          <input name="telefone" type="tel" required autoComplete="tel" className="mt-1 min-h-12 w-full rounded-xl border border-border bg-surface px-3" />
        </label>
        <label className="block text-sm">
          CEP *
          <input name="cep" required autoComplete="postal-code" inputMode="numeric" className="mt-1 min-h-12 w-full rounded-xl border border-border bg-surface px-3" />
        </label>
        <label className="block text-sm">
          Endereço *
          <input name="endereco" required autoComplete="street-address" className="mt-1 min-h-12 w-full rounded-xl border border-border bg-surface px-3" />
        </label>
        <fieldset>
          <legend className="mb-2 text-sm font-semibold">Pagamento</legend>
          <label className="flex min-h-12 items-center gap-2 rounded-xl border border-border px-3">
            <input type="radio" name="pagamento" defaultChecked />
            PIX à vista — {formatBRL(pixPrice(subtotal))}
          </label>
          <label className="mt-2 flex min-h-12 items-center gap-2 rounded-xl border border-border px-3">
            <input type="radio" name="pagamento" />
            Cartão em até 10x — {formatBRL(subtotal)}
          </label>
        </fieldset>
        <button type="submit" className="min-h-12 w-full cursor-pointer rounded-xl bg-gold font-bold text-zinc-900 hover:bg-gold-hover">
          Confirmar pedido
        </button>
      </form>

      <aside className="h-fit rounded-2xl border border-border bg-surface p-5">
        <p className="font-display text-2xl font-bold">Resumo</p>
        <ul className="mt-4 space-y-2 text-sm text-muted">
          {items.map((item) => {
            const product = products.find((entry) => entry.id === item.productId);
            if (!product) return null;
            return (
              <li key={`${item.productId}-${item.size}`} className="flex justify-between gap-3">
                <span>
                  {product.team} · {item.size} × {item.quantity}
                </span>
                <span className="tabular-nums">{formatBRL(product.price * item.quantity)}</span>
              </li>
            );
          })}
        </ul>
        <div className="mt-4 flex justify-between font-display text-xl font-bold">
          <span>Total</span>
          <span className="tabular-nums">{formatBRL(subtotal)}</span>
        </div>
      </aside>
    </div>
  );
}
