import { formatBRL } from "./format";
import type { StoreOrder } from "./types";

export const STATUS_LABEL: Record<StoreOrder["status"], string> = {
  pago: "Pago — montar envio",
  enviar_fornecedor: "Enviado ao fornecedor",
  em_transito: "Em trânsito",
  entregue: "Entregue",
  cancelado: "Cancelado",
};

export function formatAddress(order: StoreOrder) {
  const { shipping } = order;
  const complement = shipping.complement ? `, ${shipping.complement}` : "";
  return `${shipping.street}, ${shipping.number}${complement} — ${shipping.neighborhood}, ${shipping.city}/${shipping.state} — CEP ${shipping.cep}`;
}

export function supplierOrderText(order: StoreOrder) {
  const items = order.items
    .map(
      (item) =>
        `- ${item.name} | Tam. ${item.size} | Qtd ${item.quantity} | SKU ${item.productId}`,
    )
    .join("\n");

  return [
    `Pedido ${order.id}`,
    `Cliente: ${order.customer.name}`,
    `WhatsApp: ${order.customer.phone}`,
    `E-mail: ${order.customer.email}`,
    "",
    "Entregar em:",
    formatAddress(order),
    `Destinatário: ${order.customer.name}`,
    "",
    "Itens:",
    items,
    "",
    `Venda: ${formatBRL(order.totals.sale)}`,
    `Custo fornecedor: ${formatBRL(order.totals.cost)}`,
    `Margem: ${formatBRL(order.totals.margin)}`,
    "",
    "Enviar a peça para o endereço do cliente. Não usar o endereço da loja.",
  ].join("\n");
}
