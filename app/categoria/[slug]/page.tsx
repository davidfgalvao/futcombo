import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid";
import { categories } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/products";
import type { ProductCategory } from "@/lib/types";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  return { title: category?.label ?? "Categoria" };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();

  const list = getProductsByCategory(slug as ProductCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-sm text-gold">Categoria</p>
      <h1 className="mt-1 font-display text-4xl font-extrabold">{category.label}</h1>
      <p className="mt-2 mb-8 text-muted">{category.description}</p>
      <ProductGrid products={list} />
    </div>
  );
}
