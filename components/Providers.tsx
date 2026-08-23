"use client";

import { CartProvider } from "@/lib/cart";
import { FavoritesProvider } from "@/lib/favorites";
import { CartDrawer } from "./CartDrawer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FavoritesProvider>
      <CartProvider>
        {children}
        <CartDrawer />
      </CartProvider>
    </FavoritesProvider>
  );
}
