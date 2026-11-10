"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { createOrderId, useOrders } from "@/lib/orders";
import { formatBRL, pixPrice } from "@/lib/format";
import { products } from "@/lib/products";
import type { StoreOrder } from "@/lib/types";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const { addOrder } = useOrders();
  const [order, setOrder] = useState<StoreOrder | null>(null);
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const customer = {
      name: String(data.get("nome") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("telefone") ?? "").trim(),
    };
    const shipping = {
      cep: String(data.get("cep") ?? "").trim(),
      street: String(data.get("endereco") ?? "").trim(),
      number: String(data.get("numero") ?? "").trim(),
      complement: String(data.get("complemento") ?? "").trim(),
      neighborhood: String(data.get("bairro") ?? "").trim(),
      city: String(data.get("cidade") ?? "").trim(),
      state: String(data.get("estado") ?? "").trim().toUpperCase(),
    };

    if (
      !customer.name ||
      !customer.email ||
      !customer.phone ||
      !shipping.cep ||
      !shipping.street ||
      !shipping.number ||
      !shipping.neighborhood ||
      !shipping.city ||
      !shipping.state
    ) {
      setError("Preencha todos os campos obrigatórios do endereço de entrega.");
      const firstEmpty = event.currentTarget.querySelector(
        "input:required:invalid, input[value='']",
      ) as HTMLInputElement | null;
      firstEmpty?.focus();
      return;
    }

    const payment = String(data.get("pagamento") ?? "pix") === "cartao" ? "cartao" : "pix";
    const orderItems = items.flatMap((item) => {
      const product = products.find((entry) => entry.id === item.productId);
      if (!product) return [];
      const extra = item.personalized ? 25 : 0;
      return [
        {
          productId: product.id,
          name: product.name,
          team: product.team,
          size: item.size,
          quantity: item.quantity,
          salePrice: product.price + extra,
          supplierCost: product.wholesalePrice,
        },
      ];
    });

    const sale = payment === "pix" ? pixPrice(subtotal) : subtotal;
    const cost = orderItems.reduce((sum, item) => sum + item.supplierCost * item.quantity, 0);
    const created: StoreOrder = {
      id: createOrderId(),
      createdAt: new Date().toISOString(),
      status: "pago",
      customer,
      shipping,
      payment,
      items: orderItems,
      totals: { sale, cost, margin: sale - cost },
    };

    addOrder(created);
    setOrder(created);
    setError("");
    clear();
  }

  if (items.length === 0 && !order) {
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

  if (order) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <p className="text-sm font-bold uppercase tracking-wider text-gold">Pedido {order.id}</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold">Pagamento confirmado</h1>
        <p className="mt-3 text-muted">
          A camisa segue direto para o endereço cadastrado. Você acompanha o status na
          central de pedidos.
        </p>
        <Link
          href="/operacao"
          className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-gold px-5 font-bold text-zinc-900"
        >
          Abrir central de pedidos
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 lg:grid-cols-[1.2fr_0.8fr]">
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <h1 className="font-display text-4xl font-extrabold">Checkout</h1>
        <p className="text-sm text-muted">
          O envio vai para este endereço. Não há estoque local — o fornecedor despacha ao cliente.
        </p>
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
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="block text-sm sm:col-span-1">
            CEP *
            <input name="cep" required autoComplete="postal-code" inputMode="numeric" className="mt-1 min-h-12 w-full rounded-xl border border-border bg-surface px-3" />
          </label>
          <label className="block text-sm sm:col-span-2">
            Endereço *
            <input name="endereco" required autoComplete="street-address" className="mt-1 min-h-12 w-full rounded-xl border border-border bg-surface px-3" />
          </label>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="block text-sm">
            Número *
            <input name="numero" required className="mt-1 min-h-12 w-full rounded-xl border border-border bg-surface px-3" />
          </label>
          <label className="block text-sm sm:col-span-2">
            Complemento
            <input name="complemento" className="mt-1 min-h-12 w-full rounded-xl border border-border bg-surface px-3" />
          </label>
        </div>
        <label className="block text-sm">
          Bairro *
          <input name="bairro" required className="mt-1 min-h-12 w-full rounded-xl border border-border bg-surface px-3" />
        </label>
        <div className="grid gap-3 sm:grid-cols-[1fr_100px]">
          <label className="block text-sm">
            Cidade *
            <input name="cidade" required autoComplete="address-level2" className="mt-1 min-h-12 w-full rounded-xl border border-border bg-surface px-3" />
          </label>
          <label className="block text-sm">
            UF *
            <input name="estado" required maxLength={2} autoComplete="address-level1" className="mt-1 min-h-12 w-full rounded-xl border border-border bg-surface px-3 uppercase" />
          </label>
        </div>
        <fieldset>
          <legend className="mb-2 text-sm font-semibold">Pagamento</legend>
          <label className="flex min-h-12 items-center gap-2 rounded-xl border border-border px-3">
            <input type="radio" name="pagamento" value="pix" defaultChecked />
            PIX à vista — {formatBRL(pixPrice(subtotal))}
          </label>
          <label className="mt-2 flex min-h-12 items-center gap-2 rounded-xl border border-border px-3">
            <input type="radio" name="pagamento" value="cartao" />
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
        <p className="mt-3 text-xs text-muted">Frete e prazo confirmados após o pedido. Envio direto ao cliente.</p>
      </aside>
    </div>
  );
}
