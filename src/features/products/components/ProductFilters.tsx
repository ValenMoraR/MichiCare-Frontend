"use client";

import { useState, type FormEvent } from "react";

export type AppliedFilters = {
  q: string;
  minPrecio: string;
  maxPrecio: string;
};

type Props = {
  initial: AppliedFilters;
  // La búsqueda por texto y el filtro de precio funcionan por separado:
  // cada uno cambia solo lo suyo y conserva el otro.
  onSearch: (q: string) => void;
  onPrice: (minPrecio: string, maxPrecio: string) => void;
};

const INPUT =
  "w-full rounded-xl border border-[#e5dfe8] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#7b5ea7] focus:ring-2 focus:ring-[#f3eafa]";

const CARD =
  "rounded-2xl border border-[#e5dfe8] bg-white p-4 shadow-[0_8px_25px_rgba(70,50,80,0.06)] sm:p-5";

export default function ProductFilters({ initial, onSearch, onPrice }: Props) {
  const [q, setQ] = useState(initial.q);
  const [minPrecio, setMinPrecio] = useState(initial.minPrecio);
  const [maxPrecio, setMaxPrecio] = useState(initial.maxPrecio);
  const [priceError, setPriceError] = useState("");

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(q.trim());
  }

  function handlePrice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const min = minPrecio.trim();
    const max = maxPrecio.trim();

    if ((min !== "" && Number(min) < 0) || (max !== "" && Number(max) < 0)) {
      setPriceError("El precio no puede ser negativo.");
      return;
    }

    if (min !== "" && max !== "" && Number(min) > Number(max)) {
      setPriceError("El precio mínimo no puede ser mayor que el máximo.");
      return;
    }

    setPriceError("");
    onPrice(min, max);
  }

  function clearSearch() {
    setQ("");
    onSearch("");
  }

  function clearPrice() {
    setMinPrecio("");
    setMaxPrecio("");
    setPriceError("");
    onPrice("", "");
  }

  return (
    <div className="mb-8 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
      {/* Búsqueda por texto */}
      <form onSubmit={handleSearch} className={CARD} role="search">
        <label
          htmlFor="filtro-q"
          className="mb-2 block text-sm font-semibold text-[#3f3a43]"
        >
          Buscar por nombre o descripción
        </label>

        <div className="flex gap-2">
          <input
            id="filtro-q"
            type="search"
            value={q}
            onChange={(event) => setQ(event.target.value)}
            placeholder="Ej: arena, comida, juguete..."
            className={INPUT}
          />

          <button
            type="submit"
            className="shrink-0 rounded-xl bg-[#7b5ea7] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#62468d]"
            style={{ color: "#ffffff" }}
          >
            Buscar
          </button>
        </div>

        {initial.q && (
          <p className="mt-2 text-sm text-[#756f78]">
            Buscando: <strong>{initial.q}</strong>{" "}
            <button
              type="button"
              onClick={clearSearch}
              className="font-semibold text-[#7b5ea7] hover:underline"
            >
              Quitar
            </button>
          </p>
        )}
      </form>

      {/* Rango de precio */}
      <form onSubmit={handlePrice} className={CARD}>
        <p className="mb-2 text-sm font-semibold text-[#3f3a43]">
          Filtrar por precio (COP)
        </p>

        <div className="flex gap-2">
          <div className="flex-1">
            <label htmlFor="filtro-min" className="sr-only">
              Precio mínimo
            </label>
            <input
              id="filtro-min"
              type="number"
              min="0"
              step="any"
              inputMode="numeric"
              value={minPrecio}
              onChange={(event) => setMinPrecio(event.target.value)}
              placeholder="Mínimo"
              className={INPUT}
            />
          </div>

          <div className="flex-1">
            <label htmlFor="filtro-max" className="sr-only">
              Precio máximo
            </label>
            <input
              id="filtro-max"
              type="number"
              min="0"
              step="any"
              inputMode="numeric"
              value={maxPrecio}
              onChange={(event) => setMaxPrecio(event.target.value)}
              placeholder="Máximo"
              className={INPUT}
            />
          </div>

          <button
            type="submit"
            className="shrink-0 rounded-xl bg-[#7b5ea7] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#62468d]"
            style={{ color: "#ffffff" }}
          >
            Aplicar
          </button>
        </div>

        {priceError && (
          <p role="alert" className="mt-2 text-sm text-[#a14b4b]">
            {priceError}
          </p>
        )}

        {(initial.minPrecio || initial.maxPrecio) && (
          <p className="mt-2 text-sm text-[#756f78]">
            Precio filtrado.{" "}
            <button
              type="button"
              onClick={clearPrice}
              className="font-semibold text-[#7b5ea7] hover:underline"
            >
              Quitar
            </button>
          </p>
        )}
      </form>
    </div>
  );
}