"use client";

import { useState } from "react";
import { formatBRL, whatsappLink } from "@/lib/format";
import { formatAddress, STATUS_LABEL, supplierOrderText } from "@/lib/fulfillment";
import { useOrders } from "@/lib/orders";
import type { OrderStatus } from "@/lib/types";

const NEXT: Partial<Record<OrderStatus, OrderStatus>> = {
  pago: "enviar_fornecedor",
  enviar_fornecedor: "em_transito",
  em_transito: "entregue",
};

export default function OperationsPage() {
  const { orders, updateStatus } = useOrders();
  const [copied, setCopied] = useState<string | null>(null);

  async function copyText(orderId: string, text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(orderId);
    window.setTimeout(() => setCopied(null), 2500);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <p className="text-sm font-bold uppercase tracking-wider text-gold">Dropshipping</p>
      <h1 className="mt-1 font-display text-4xl font-extrabold">Central de pedidos</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Cada venda vira um pedido para o fornecedor, com o endereço do cliente.
        Copie o texto ou envie no WhatsApp. Não há robô no site do fornecedor —
        o canal oficial é API, e-mail ou atendimento humano.
      </p>

      {orders.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-border bg-surface px-6 py-16 text-center">
          <p className="font-display text-2xl font-bold">Nenhum pedido ainda</p>
          <p className="mt-2 text-muted">Feche uma compra no checkout para ver a fila aqui.</p>
        </div>
      ) : (
        <ul className="mt-8 space-y-5">
          {orders.map((order) => {
            const text = supplierOrderText(order);
            const next = NEXT[order.status];
            return (
              <li key={order.id} className="rounded-2xl border border-border bg-surface p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-2xl font-bold">{order.id}</p>
                    <p className="text-sm text-muted">
                      {new Date(order.createdAt).toLocaleString("pt-BR")} · {STATUS_LABEL[order.status]}
                    </p>
                  </div>
                  <p className="text-right text-sm">
                    Venda {formatBRL(order.totals.sale)}
                    <br />
                    Custo {formatBRL(order.totals.cost)}
                    <br />
                    <strong className="text-gold">Margem {formatBRL(order.totals.margin)}</strong>
                  </p>
                </div>
                <p className="mt-4 text-sm">
                  {order.customer.name} · {order.customer.phone}
                </p>
                <p className="mt-1 text-sm text-muted">{formatAddress(order)}</p>
                <ul className="mt-3 space-y-1 text-sm">
                  {order.items.map((item) => (
                    <li key={`${item.productId}-${item.size}`}>
                      {item.name} · {item.size} × {item.quantity}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => copyText(order.id, text)}
                    className="inline-flex min-h-11 cursor-pointer items-center rounded-xl border border-white/20 px-4 text-sm font-semibold hover:border-gold"
                  >
                    {copied === order.id ? "Copiado" : "Copiar pedido do fornecedor"}
                  </button>
                  <a
                    href={whatsappLink(text)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center rounded-xl bg-whatsapp px-4 text-sm font-bold text-white"
                  >
                    Enviar no WhatsApp
                  </a>
                  {next && (
                    <button
                      type="button"
                      onClick={() => updateStatus(order.id, next)}
                      className="inline-flex min-h-11 cursor-pointer items-center rounded-xl bg-gold px-4 text-sm font-bold text-zinc-900"
                    >
                      Marcar: {STATUS_LABEL[next]}
                    </button>
                  )}
                  {order.status !== "cancelado" && order.status !== "entregue" && (
                    <button
                      type="button"
                      onClick={() => updateStatus(order.id, "cancelado")}
                      className="inline-flex min-h-11 cursor-pointer items-center rounded-xl border border-destructive/40 px-4 text-sm font-semibold text-red-300"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
