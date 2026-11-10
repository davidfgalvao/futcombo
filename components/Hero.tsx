import Link from "next/link";
import { Check } from "lucide-react";
import { BrandMark } from "./Logo";
import { whatsappLink } from "@/lib/format";

const highlights = [
  "Sem estoque local",
  "PIX à vista",
  "Envio direto ao cliente",
  "Camisas a partir de R$ 99,90",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 75% 40%, rgba(245,197,24,0.18), transparent 60%)",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-gold/50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-gold">
            Dropshipping · Envio direto
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            A camisa do seu time, com qualidade premium.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Você vende no site. O pedido vai para o fornecedor e a camisa
            chega no endereço que o cliente cadastrou.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/produtos"
              className="inline-flex min-h-12 cursor-pointer items-center rounded-xl bg-gold px-6 text-base font-bold text-zinc-900 transition-colors duration-200 hover:bg-gold-hover"
            >
              Ver coleção
            </Link>
            <a
              href={whatsappLink("Olá! Quero falar sobre as camisas da FutCombo.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 cursor-pointer items-center rounded-xl border border-white/25 px-6 text-base font-semibold text-white transition-colors duration-200 hover:border-gold hover:text-gold"
            >
              Fale conosco
            </a>
          </div>
          <ul className="mt-8 grid gap-2 sm:grid-cols-2">
            {highlights.map((item) => (
              <li key={item} className="inline-flex items-center gap-2 text-sm text-zinc-200">
                <Check className="h-4 w-4 text-gold" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="flex aspect-square flex-col items-center justify-center rounded-[28px] border border-white/8 bg-surface shadow-[0_0_80px_rgba(245,197,24,0.12)]">
            <BrandMark className="h-48 w-44" />
            <p className="font-display text-3xl font-extrabold italic tracking-wide text-white">
              FUTCOMBO
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
