import { JerseyMockup } from "./JerseyMockup";
import type { Product } from "@/lib/types";

export function ProductImage({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  if (product.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={product.image}
        alt={product.name}
        className={`h-full w-full object-contain ${className}`}
        width={640}
        height={640}
      />
    );
  }

  return <JerseyMockup product={product} className={className} />;
}
