import Link from "next/link";
import { CATEGORIES } from "../domain/categories";

type Props = {
  selected: string;
  // Devuelve la URL de una categoría, conservando los demás filtros.
  getHref: (categoria: string) => string;
};

export default function CategoryTabs({ selected, getHref }: Props) {
  return (
    <nav
      aria-label="Categorías"
      className="mb-6 flex flex-wrap justify-center gap-2 sm:gap-3"
    >
      {CATEGORIES.map((category) => {
        const active = selected === category.value;

        return (
          <Link
            key={category.value}
            href={getHref(category.value)}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition sm:px-5 ${
              active
                ? "bg-[#7b5ea7] text-white"
                : "bg-[#f3eafa] text-[#62468d] hover:bg-[#e5d8f2]"
            }`}
          >
            {category.label}
          </Link>
        );
      })}
    </nav>
  );
}