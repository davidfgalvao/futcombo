"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "futcombo-favorites";

type FavoritesContextValue = {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setIds(JSON.parse(raw) as string[]);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    }
  }, [ids, ready]);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      ids,
      toggle: (id) => {
        setIds((current) =>
          current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
        );
      },
      has: (id) => ids.includes(id),
    }),
    [ids],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites precisa estar dentro de FavoritesProvider");
  }
  return context;
}
