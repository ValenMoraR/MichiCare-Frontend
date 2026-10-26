import Link from "next/link";

type Props = {
  page: number;
  totalPages: number;
  // Recibe un número de página y devuelve la URL a la que debe ir.
  getHref: (page: number) => string;
};

export default function Pagination({ page, totalPages, getHref }: Props) {
  if (totalPages <= 1) return null;

  const base = "rounded-full px-4 py-2 text-sm font-semibold transition-colors";
  const active = "bg-[#62468d] text-white";
  const idle = "bg-[#f3eafa] text-[#62468d] hover:bg-[#e6d6f5]";
  const disabled = "cursor-not-allowed bg-[#f3eafa] text-[#b7aec0]";

  return (
    <nav
      aria-label="Paginación"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      {page > 1 ? (
        <Link href={getHref(page - 1)} className={`${base} ${idle}`}>
          ← Anterior
        </Link>
      ) : (
        <span className={`${base} ${disabled}`}>← Anterior</span>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <Link
          key={p}
          href={getHref(p)}
          aria-current={p === page ? "page" : undefined}
          className={`${base} ${p === page ? active : idle}`}
        >
          {p}
        </Link>
      ))}

      {page < totalPages ? (
        <Link href={getHref(page + 1)} className={`${base} ${idle}`}>
          Siguiente →
        </Link>
      ) : (
        <span className={`${base} ${disabled}`}>Siguiente →</span>
      )}
    </nav>
  );
}