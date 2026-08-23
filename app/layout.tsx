import type { Metadata } from "next";
import "./globals.css";
import { PromoBar } from "@/components/PromoBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: {
    default: "FutCombo | Camisas de time premium",
    template: "%s | FutCombo",
  },
  description:
    "Camisas de clubes, seleções, retrô e NBA. Varejo e atacado, pronta-entrega, PIX e envio para todo o Brasil.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-gold focus:px-3 focus:py-2 focus:text-zinc-900"
        >
          Ir para o conteúdo
        </a>
        <Providers>
          <PromoBar />
          <Header />
          <main id="conteudo">{children}</main>
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
