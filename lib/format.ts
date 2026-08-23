export const WHATSAPP_NUMBER = "5561982109134";
export const PHONE_DISPLAY = "(61) 98210-9134";
export const STORE_CITY = "Planaltina, GO";
export const STORE_CITY_FULL = "Planaltina, Goiás";
export const FREE_SHIPPING_FROM = 300;
export const WHOLESALE_MIN = 6;
export const PIX_DISCOUNT = 0.05;
export const INSTALLMENTS = 10;

export function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function discountPercent(price: number, original: number) {
  if (original <= price) return 0;
  return Math.round(((original - price) / original) * 100);
}

export function installmentValue(price: number, times = INSTALLMENTS) {
  return price / times;
}

export function pixPrice(price: number) {
  return price * (1 - PIX_DISCOUNT);
}

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
