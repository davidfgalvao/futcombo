import type { Metadata } from "next";
import { whatsappLink } from "@/lib/format";

export const metadata: Metadata = {
  title: "Minha conta",
};

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-display text-4xl font-extrabold">Minha conta</h1>
      <p className="mt-3 mb-8 text-muted">
        Entre para acompanhar pedidos. Nesta demonstração, o atendimento real é pelo WhatsApp.
      </p>
      <form className="space-y-4" action="/conta">
        <label className="block text-sm">
          E-mail
          <input type="email" autoComplete="email" className="mt-1 min-h-12 w-full rounded-xl border border-border bg-surface px-3" />
        </label>
        <label className="block text-sm">
          Senha
          <input type="password" autoComplete="current-password" className="mt-1 min-h-12 w-full rounded-xl border border-border bg-surface px-3" />
        </label>
        <button type="submit" className="min-h-12 w-full cursor-pointer rounded-xl bg-gold font-bold text-zinc-900">
          Entrar
        </button>
      </form>
      <a
        href={whatsappLink("Olá! Quero criar ou acessar minha conta na FutCombo.")}
        className="mt-4 flex min-h-12 items-center justify-center rounded-xl border border-white/20 font-semibold"
      >
        Falar no WhatsApp
      </a>
    </div>
  );
}
