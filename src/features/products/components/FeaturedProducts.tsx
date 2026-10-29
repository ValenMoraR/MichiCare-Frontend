"use client";

import Image from "next/image";
import Link from "next/link";
import { getCategoryLabel } from "../domain/categories";
import { useProducts } from "../hooks/useProducts";

function formatPrice(price: number) {
  return price.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
}

function getImagePath(image: string) {
  const filename = image.split("/").pop();
  return `/images/${filename}`;
}

// Productos de muestra para la página de inicio: vienen de la API, no están escritos a mano.
export default function FeaturedProducts() {
  const { loading, error, products } = useProducts(1, 3);

  if (loading) {
    return (
      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            className="h-80 animate-pulse rounded-2xl bg-white/70"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-[#756f78]">
        No pudimos cargar los productos en este momento.{" "}
        <Link
          href="/catalogo"
          className="font-semibold text-[#7b5ea7] underline"
          style={{ color: "#7b5ea7" }}
        >
          Ver el catálogo
        </Link>
      </p>
    );
  }

  if (products.length === 0) {
    return (
      <p className="text-center text-[#756f78]">
        Pronto tendremos productos nuevos para ti.
      </p>
    );
  }

  return (
    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <article
          key={product.id}
          className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_25px_rgba(70,50,80,0.08)] transition hover:-translate-y-1"
        >
          <Link
            href={`/catalogo/${product.id}`}
            aria-label={`Ver detalles de ${product.nombre}`}
            className="relative block h-56 w-full overflow-hidden bg-[#fffaf7]"
          >
            <Image
              src={getImagePath(product.imagen)}
              alt={product.nombre}
              fill
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
              className="object-contain p-5"
            />
          </Link>

          <div className="p-6">
            <span className="text-sm font-semibold text-[#7b5ea7]">
              {getCategoryLabel(product.categoria)}
            </span>
            <h3 className="mt-2 line-clamp-2 text-xl font-bold text-[#3f3a43]">
              <Link
                href={`/catalogo/${product.id}`}
                className="hover:text-[#62468d] hover:underline"
              >
                {product.nombre}
              </Link>
            </h3>
            <p className="my-3 line-clamp-2 text-[#756f78]">
              {product.descripcion}
            </p>
            <strong className="text-lg text-[#62468d]">
              {formatPrice(product.precio)}
            </strong>
          </div>
        </article>
      ))}
    </div>
  );
}