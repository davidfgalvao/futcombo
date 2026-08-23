import Link from "next/link";

export function SectionHeader({
  title,
  href,
}: {
  title: string;
  href?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">{title}</h2>
      {href && (
        <Link href={href} className="text-sm font-semibold text-gold hover:underline">
          Ver todos
        </Link>
      )}
    </div>
  );
}
