import Link from "next/link";
import { CATEGORIES } from "../domain/categories";

type Props = {
  selected: string;
};

export default function CategoryTabs({ selected }: Props) {
  return (
    <nav
      aria-label="Categorías"
      className="mb-8 flex flex-wrap justify-center gap-3"
    >
      {CATEGORIES.map((category) => {
        const active = selected === category.value;
        const href =
          category.value === "todos"
            ? "/catalogo"
            : `/catalogo?categoria=${category.value}`;

        return (
          <Link
            key={category.value}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
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