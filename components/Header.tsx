"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Heart, Menu, Search, ShoppingCart, User } from "lucide-react";
import { Logo } from "./Logo";
import { categories } from "@/lib/categories";
import { formatBRL } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { useFavorites } from "@/lib/favorites";

export function Header() {
  const router = useRouter();
  const { count, subtotal, setOpen } = useCart();
  const { ids } = useFavorites();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  function onSearch(event: FormEvent) {
    event.preventDefault();
    const value = query.trim();
    router.push(value ? `/busca?q=${encodeURIComponent(value)}` : "/produtos");
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 lg:gap-6">
        <Link href="/" className="shrink-0" aria-label="FutCombo início">
          <Logo compact />
        </Link>

        <form onSubmit={onSearch} className="hidden min-w-0 flex-1 md:flex">
          <label htmlFor="busca" className="sr-only">
            Buscar produtos
          </label>
          <div className="flex w-full overflow-hidden rounded-xl bg-white">
            <input
              id="busca"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar produtos, marcas e categorias..."
              className="min-h-12 w-full bg-transparent px-4 text-base text-zinc-900 outline-none placeholder:text-zinc-500"
            />
            <button
              type="submit"
              className="inline-flex min-h-12 min-w-12 cursor-pointer items-center justify-center bg-gold text-zinc-900 transition-colors duration-200 hover:bg-gold-hover"
              aria-label="Buscar"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </form>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <Link
            href="/favoritos"
            className="relative inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-lg text-white transition-colors duration-200 hover:bg-white/5"
            aria-label="Lista de desejos"
          >
            <Heart className="h-5 w-5" />
            {ids.length > 0 && (
              <span className="absolute right-1 top-1 min-w-4 rounded-full bg-gold px-1 text-center text-[10px] font-bold text-zinc-900">
                {ids.length}
              </span>
            )}
          </Link>

          <Link
            href="/conta"
            className="hidden min-h-11 cursor-pointer items-center gap-2 rounded-lg px-2 text-sm text-white transition-colors duration-200 hover:bg-white/5 sm:inline-flex"
          >
            <User className="h-5 w-5 shrink-0" />
            <span className="leading-tight">
              <span className="block text-xs text-muted">Olá, bem-vindo</span>
              <span className="font-semibold">minha conta</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg px-2 text-white transition-colors duration-200 hover:bg-white/5"
            aria-label="Abrir carrinho"
          >
            <span className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-2 -top-2 min-w-4 rounded-full bg-gold px-1 text-center text-[10px] font-bold text-zinc-900">
                {count}
              </span>
            </span>
            <span className="hidden text-sm font-semibold tabular-nums lg:inline">
              {formatBRL(subtotal)}
            </span>
          </button>

          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-lg text-white md:hidden"
            onClick={() => setMenuOpen((current) => !current)}
            aria-expanded={menuOpen}
            aria-label="Abrir menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="mx-auto hidden max-w-7xl items-center gap-2 px-4 pb-3 md:flex">
        <Link
          href="/produtos"
          className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl bg-gold px-4 text-sm font-bold text-zinc-900 transition-colors duration-200 hover:bg-gold-hover"
        >
          <Menu className="h-4 w-4" />
          Todas categorias
        </Link>
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categoria/${category.slug}`}
            className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-white/20 px-4 text-sm font-medium text-white transition-colors duration-200 hover:border-gold hover:text-gold"
          >
            {category.label}
          </Link>
        ))}
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-surface px-4 py-4 md:hidden">
          <form onSubmit={onSearch} className="mb-4 flex overflow-hidden rounded-xl bg-white">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar produtos..."
              className="min-h-12 w-full px-4 text-zinc-900 outline-none"
            />
            <button
              type="submit"
              className="min-w-12 bg-gold text-zinc-900"
              aria-label="Buscar"
            >
              <Search className="mx-auto h-5 w-5" />
            </button>
          </form>
          <nav className="grid gap-2">
            <Link href="/produtos" className="rounded-lg bg-gold px-3 py-3 font-bold text-zinc-900" onClick={() => setMenuOpen(false)}>
              Todas categorias
            </Link>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categoria/${category.slug}`}
                className="rounded-lg px-3 py-3 text-white hover:bg-white/5"
                onClick={() => setMenuOpen(false)}
              >
                {category.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
