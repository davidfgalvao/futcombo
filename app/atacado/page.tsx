import type { Metadata } from "next";
import Link from "next/link";
import { ProductGrid } from "@/components/ProductGrid";
import { getProductsByCategory } from "@/lib/products";
import { whatsappLink } from "@/lib/format";

export const metadata: Metadata = {
  title: "Grades",
};

export default function WholesalePage() {
  const grades = getProductsByCategory("grade");

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="font-display text-4xl font-extrabold">Grades</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Pacotes com 6 camisas no mesmo fluxo de dropshipping: o cliente paga no
        site e o fornecedor envia ao endereço cadastrado.
      </p>
      <div className="my-8 flex flex-wrap gap-3">
        <Link href="/categoria/grade" className="inline-flex min-h-12 items-center rounded-xl bg-gold px-5 font-bold text-zinc-900">
          Ver grades
        </Link>
        <a
          href={whatsappLink("Olá! Quero uma grade de 6 camisas no modelo dropshipping.")}
          className="inline-flex min-h-12 items-center rounded-xl border border-white/20 px-5 font-semibold"
        >
          Pedir no WhatsApp
        </a>
      </div>
      <ProductGrid products={grades} />
    </div>
  );
}
