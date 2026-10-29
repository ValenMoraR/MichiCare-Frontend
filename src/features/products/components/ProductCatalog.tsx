"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "../../common/components/Pagination";
import { isValidCategory } from "../domain/categories";
import { useProducts } from "../hooks/useProducts";
import CategoryTabs from "./CategoryTabs";
import ProductCard from "./ProductCard";
import ProductFilters, { type AppliedFilters } from "./ProductFilters";

const LIMIT = 8;

// Un precio válido de la URL, o "" si no hay o no sirve.
function cleanPrice(value: string | null): string {
  if (value === null || value.trim() === "") return "";
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? String(number) : "";
}

type UrlState = AppliedFilters & { categoria: string; page?: number };

// Arma la URL del catálogo conservando todos los filtros.
function buildHref({ categoria, q, minPrecio, maxPrecio, page }: UrlState) {
  const params = new URLSearchParams();

  if (categoria !== "todos") params.set("categoria", categoria);
  if (q) params.set("q", q);
  if (minPrecio) params.set("minPrecio", minPrecio);
  if (maxPrecio) params.set("maxPrecio", maxPrecio);
  if (page && page > 1) params.set("page", String(page));

  const query = params.toString();
  return query ? `/catalogo?${query}` : "/catalogo";
}

export default function ProductCatalog() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawPage = Number(searchParams.get("page"));
  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;

  const rawCategory = searchParams.get("categoria");
  const categoria = isValidCategory(rawCategory) ? rawCategory : "todos";

  const q = (searchParams.get("q") ?? "").trim();
  const minPrecio = cleanPrice(searchParams.get("minPrecio"));
  const maxPrecio = cleanPrice(searchParams.get("maxPrecio"));

  const hasFilters = Boolean(q || minPrecio || maxPrecio);

  const { loading, error, products, pagination } = useProducts(page, LIMIT, {
    categoria: categoria === "todos" ? undefined : categoria,
    q: q || undefined,
    minPrecio: minPrecio === "" ? undefined : Number(minPrecio),
    maxPrecio: maxPrecio === "" ? undefined : Number(maxPrecio),
  });

  const current: UrlState = { categoria, q, minPrecio, maxPrecio };

  function renderContent() {
    if (loading) {
      return (
        <p className="py-12 text-center text-[#756f78]">
          Cargando productos...
        </p>
      );
    }

    if (error) {
      return (
        <p className="py-12 text-center text-[#756f78]">
          No pudimos cargar los productos: {error}
        </p>
      );
    }

    if (products.length === 0) {
      return (
        <div className="py-12 text-center text-[#756f78]">
          <p>
            {hasFilters
              ? "No encontramos productos con esos filtros."
              : "No hay productos en esta categoría por el momento."}
          </p>

          {hasFilters && (
            <Link
              href={buildHref({ ...current, q: "", minPrecio: "", maxPrecio: "" })}
              className="mt-4 inline-block font-semibold text-[#7b5ea7] hover:underline"
            >
              Limpiar los filtros
            </Link>
          )}
        </div>
      );
    }

    return (
      <>
        <p className="mb-4 text-sm text-[#756f78]">
          {pagination?.total ?? products.length}{" "}
          {(pagination?.total ?? products.length) === 1 ? "producto" : "productos"}
        </p>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <Pagination
          page={pagination?.page ?? page}
          totalPages={pagination?.totalPages ?? 1}
          getHref={(targetPage) => buildHref({ ...current, page: targetPage })}
        />
      </>
    );
  }

  return (
    <>
      <CategoryTabs
        selected={categoria}
        getHref={(value) => buildHref({ ...current, categoria: value })}
      />

      {/* Al cambiar la URL, el formulario se reinicia con los valores nuevos. */}
      <ProductFilters
        key={`${q}|${minPrecio}|${maxPrecio}`}
        initial={{ q, minPrecio, maxPrecio }}
        onSearch={(value) => router.push(buildHref({ ...current, q: value }))}
        onPrice={(min, max) =>
          router.push(buildHref({ ...current, minPrecio: min, maxPrecio: max }))
        }
      />

      {renderContent()}
    </>
  );
}