import Link from "next/link";
import { Hero } from "@/components/Hero";
import { BenefitsBar } from "@/components/BenefitsBar";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeader } from "@/components/SectionHeader";
import { categories } from "@/lib/categories";
import { getFeaturedProducts, getProductsByCategory } from "@/lib/products";

export default function HomePage() {
  const featured = getFeaturedProducts();
  const selecoes = getProductsByCategory("selecoes").slice(0, 4);
  const retro = getProductsByCategory("retro").slice(0, 4);
  const jogador = getProductsByCategory("jogador").slice(0, 4);
  const torcedor = getProductsByCategory("torcedor").slice(0, 4);

  return (
    <>
      <Hero />
      <BenefitsBar />

      <section className="mx-auto max-w-7xl px-4 py-14">
        <SectionHeader title="Navegue por categoria" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categoria/${category.slug}`}
              className="rounded-2xl border border-border bg-surface px-5 py-6 transition-colors duration-200 hover:border-gold"
            >
              <p className="font-display text-2xl font-bold text-white">{category.label}</p>
              <p className="mt-1 text-sm text-muted">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6">
        <SectionHeader title="Em alta agora" href="/produtos" />
        <ProductGrid products={featured} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <SectionHeader title="Seleções" href="/categoria/selecoes" />
        <ProductGrid products={selecoes} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <SectionHeader title="Retrô" href="/categoria/retro" />
        <ProductGrid products={retro} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <SectionHeader title="Jogador" href="/categoria/jogador" />
        <ProductGrid products={jogador} />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8">
        <SectionHeader title="Torcedor" href="/categoria/torcedor" />
        <ProductGrid products={torcedor} />
      </section>
    </>
  );
}
