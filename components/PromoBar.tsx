import { CreditCard, MapPin, Package, Truck } from "lucide-react";

const items = [
  { icon: Truck, label: "Frete para todo o Brasil" },
  { icon: Package, label: "A partir de 6 peças elegíveis" },
  { icon: CreditCard, label: "PIX à vista" },
  { icon: MapPin, label: "Retire em Planaltina, GO" },
];

export function PromoBar() {
  return (
    <div className="border-b border-border bg-black">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-2 text-[13px] font-medium text-gold">
        {items.map(({ icon: Icon, label }) => (
          <span key={label} className="inline-flex items-center gap-2">
            <Icon className="h-3.5 w-3.5" aria-hidden />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
