import { Clock, CreditCard, Store, Warehouse } from "lucide-react";

const benefits = [
  {
    icon: CreditCard,
    title: "Pagamento via PIX",
    text: "5% de desconto à vista",
  },
  {
    icon: Clock,
    title: "Prazo de envio",
    text: "Até 3 dias úteis",
  },
  {
    icon: Store,
    title: "Retirada no Brás",
    text: "Feira da Madrugada",
  },
  {
    icon: Warehouse,
    title: "Atacado",
    text: "A partir de 6 peças",
  },
];

export function BenefitsBar() {
  return (
    <section className="border-b border-border bg-[#f3f1ea] text-zinc-900">
      <div className="mx-auto grid max-w-7xl gap-px bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-center gap-4 bg-[#f3f1ea] px-6 py-5">
            <Icon className="h-8 w-8 shrink-0 text-zinc-800" aria-hidden />
            <div>
              <p className="font-display text-lg font-bold leading-tight">{title}</p>
              <p className="text-sm text-zinc-600">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
