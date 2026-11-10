"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { OrderStatus, StoreOrder } from "./types";

const STORAGE_KEY = "futcombo-orders";

type OrdersContextValue = {
  orders: StoreOrder[];
  addOrder: (order: StoreOrder) => void;
  updateStatus: (id: string, status: OrderStatus) => void;
};

const OrdersContext = createContext<OrdersContextValue | null>(null);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<StoreOrder[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setOrders(JSON.parse(raw) as StoreOrder[]);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    }
  }, [orders, ready]);

  const value = useMemo<OrdersContextValue>(
    () => ({
      orders,
      addOrder: (order) => setOrders((current) => [order, ...current]),
      updateStatus: (id, status) => {
        setOrders((current) =>
          current.map((order) => (order.id === id ? { ...order, status } : order)),
        );
      },
    }),
    [orders],
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders precisa estar dentro de OrdersProvider");
  }
  return context;
}

export function createOrderId() {
  const stamp = Date.now().toString(36).toUpperCase();
  return `FC-${stamp.slice(-8)}`;
}
