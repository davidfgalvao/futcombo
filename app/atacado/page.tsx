import type { Metadata } from "next";
import Link from "next/link";
import { ProductGrid } from "@/components/ProductGrid";
import { getProductsByCategory } from "@/lib/products";
import { WHOLESALE_MIN, whatsappLink } from "@/lib/format";

export const metadata: Metadata = {
  title: "Atacado",
};

export default function WholesalePage() {
  const grades = getProductsByCategory("grade");

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="font-display text-4xl font-extrabold">Atacado</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Preço de revenda a partir de {WHOLESALE_MIN} peças elegíveis. Grades prontas ou
        montagem no WhatsApp, com retirada em Planaltina, Goiás ou envio nacional.
      </p>
      <div className="my-8 flex flex-wrap gap-3">
        <Link href="/categoria/grade" className="inline-flex min-h-12 items-center rounded-xl bg-gold px-5 font-bold text-zinc-900">
          Ver grades
        </Link>
        <a
          href={whatsappLink("Olá! Quero cotação de atacado a partir de 6 peças.")}
          className="inline-flex min-h-12 items-center rounded-xl border border-white/20 px-5 font-semibold"
        >
          Pedir cotação
        </a>
      </div>
      <ProductGrid products={grades} />
    </div>
  );
}
