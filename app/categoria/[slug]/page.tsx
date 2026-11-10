import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryCatalog } from "@/components/CategoryCatalog";
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

  return (
    <CategoryCatalog
      title={category.label}
      description={category.description}
      products={getProductsByCategory(slug as ProductCategory)}
    />
  );
}
