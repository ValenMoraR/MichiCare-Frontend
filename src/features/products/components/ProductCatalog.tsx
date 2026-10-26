"use client";

import { useSearchParams } from "next/navigation";
import Pagination from "../../common/components/Pagination";
import { isValidCategory } from "../domain/categories";
import { useProducts } from "../hooks/useProducts";
import CategoryTabs from "./CategoryTabs";
import ProductCard from "./ProductCard";

const LIMIT = 8;

export default function ProductCatalog() {
  const searchParams = useSearchParams();

  const rawPage = Number(searchParams.get("page"));
  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;

  const rawCategory = searchParams.get("categoria");
  const categoria = isValidCategory(rawCategory) ? rawCategory : "todos";

  const { loading, error, products, pagination } = useProducts(
    page,
    LIMIT,
    categoria === "todos" ? undefined : categoria,
  );

  function getHref(targetPage: number) {
    const params = new URLSearchParams();
    if (categoria !== "todos") params.set("categoria", categoria);
    params.set("page", String(targetPage));
    return `/catalogo?${params.toString()}`;
  }

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
        <p className="py-12 text-center text-[#756f78]">
          No hay productos en esta categoría por el momento.
        </p>
      );
    }

    return (
      <>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <Pagination
          page={pagination?.page ?? page}
          totalPages={pagination?.totalPages ?? 1}
          getHref={getHref}
        />
      </>
    );
  }

  return (
    <>
      <CategoryTabs selected={categoria} />
      {renderContent()}
    </>
  );
}