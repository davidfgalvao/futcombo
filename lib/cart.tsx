"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "./types";
import { products } from "./products";

const STORAGE_KEY = "futcombo-cart";

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function sameLine(a: CartItem, b: Pick<CartItem, "productId" | "size">) {
  return a.productId === b.productId && a.size === b.size;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setItems(JSON.parse(raw) as CartItem[]);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, ready]);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => {
      const product = products.find((entry) => entry.id === item.productId);
      if (!product) return sum;
      const extra = item.personalized ? 25 : 0;
      return sum + (product.price + extra) * item.quantity;
    }, 0);

    return {
      items,
      addItem: (incoming) => {
        setItems((current) => {
          const existing = current.find((item) => sameLine(item, incoming));
          if (existing) {
            return current.map((item) =>
              sameLine(item, incoming)
                ? { ...item, quantity: item.quantity + incoming.quantity }
                : item,
            );
          }
          return [...current, incoming];
        });
        setOpen(true);
      },
      removeItem: (productId, size) => {
        setItems((current) =>
          current.filter((item) => !(item.productId === productId && item.size === size)),
        );
      },
      updateQuantity: (productId, size, quantity) => {
        setItems((current) =>
          quantity <= 0
            ? current.filter((item) => !(item.productId === productId && item.size === size))
            : current.map((item) =>
                item.productId === productId && item.size === size
                  ? { ...item, quantity }
                  : item,
              ),
        );
      },
      clear: () => setItems([]),
      count,
      subtotal,
      open,
      setOpen,
    };
  }, [items, open]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart precisa estar dentro de CartProvider");
  }
  return context;
}
