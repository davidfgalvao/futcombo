import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rastreie seu pedido",
};

export default function TrackingPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-display text-4xl font-extrabold">Rastreie seu pedido</h1>
      <p className="mt-3 mb-8 text-muted">
        Digite o código enviado por e-mail ou WhatsApp.
      </p>
      <form className="space-y-4">
        <label className="block text-sm">
          Código de rastreio
          <input
            name="codigo"
            className="mt-1 min-h-12 w-full rounded-xl border border-border bg-surface px-3"
            placeholder="FC123456BR"
          />
        </label>
        <button type="submit" className="min-h-12 w-full cursor-pointer rounded-xl bg-gold font-bold text-zinc-900">
          Consultar
        </button>
      </form>
    </div>
  );
}
