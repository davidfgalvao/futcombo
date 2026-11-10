"use client";

import { CartProvider } from "@/lib/cart";
import { FavoritesProvider } from "@/lib/favorites";
import { OrdersProvider } from "@/lib/orders";
import { CartDrawer } from "./CartDrawer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FavoritesProvider>
      <CartProvider>
        <OrdersProvider>
          {children}
          <CartDrawer />
        </OrdersProvider>
      </CartProvider>
    </FavoritesProvider>
  );
}
