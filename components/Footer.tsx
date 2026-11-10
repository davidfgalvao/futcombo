import Link from "next/link";
import { Logo } from "./Logo";
import { categories } from "@/lib/categories";
import { PHONE_DISPLAY, STORE_CITY_FULL } from "@/lib/format";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-black">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo compact />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Camisas de time com envio direto ao cliente. Sem estoque local:
            o pedido sai do fornecedor para o endereço cadastrado.
          </p>
        </div>
        <div>
          <p className="font-display text-lg font-bold text-white">Categorias</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link href={`/categoria/${category.slug}`} className="hover:text-gold">
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-display text-lg font-bold text-white">Atendimento</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>
              <Link href="/rastreio" className="hover:text-gold">
                Rastreie seu pedido
              </Link>
            </li>
            <li>
              <Link href="/operacao" className="hover:text-gold">
                Central de pedidos
              </Link>
            </li>
            <li>
              <Link href="/conta" className="hover:text-gold">
                Minha conta
              </Link>
            </li>
            <li>
              <Link href="/carrinho" className="hover:text-gold">
                Carrinho
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-display text-lg font-bold text-white">Loja</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>Base: {STORE_CITY_FULL}</li>
            <li>WhatsApp: {PHONE_DISPLAY}</li>
            <li>Envio direto do fornecedor</li>
            <li>PIX com 5% de desconto</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} FutCombo. Loja demonstrativa de camisas de time.
      </div>
    </footer>
  );
}
