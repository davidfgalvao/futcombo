import Link from "next/link";
import { Logo } from "./Logo";
import { categories } from "@/lib/categories";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-black">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo compact />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Camisas de time com qualidade premium. Varejo e atacado, pronta-entrega,
            envio para todo o Brasil e retirada no Brás.
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
              <Link href="/atacado" className="hover:text-gold">
                Compre no atacado
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
            <li>Retirada: Brás — Feira da Madrugada</li>
            <li>Envio em até 3 dias úteis</li>
            <li>PIX com 5% de desconto</li>
            <li>Parcelamento em até 10x</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} FutCombo. Loja demonstrativa de camisas de time.
      </div>
    </footer>
  );
}
