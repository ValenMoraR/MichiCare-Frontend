"use client";

import Image from "next/image";
import Link from "next/link";
import { getCategoryLabel } from "../../src/features/products/domain/categories";
import { useWishlist } from "../context/WishlistContext";

export default function DeseosPage() {
  const { items, removeFromWishlist } = useWishlist();

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

  return (
    <main className="min-h-screen bg-[#fffaf7] px-4 py-12 sm:px-5">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/catalogo"
          className="text-sm font-semibold text-[#7b5ea7] hover:underline"
        >
          ← Seguir explorando
        </Link>

        <h1 className="mt-5 text-3xl font-bold text-[#3f3a43]">
          Mis favoritos ♡
        </h1>

        <p className="mt-2 text-[#756f78]">
          Guarda los productos que te gustaría tener para tu michi.
        </p>

        {items.length === 0 ? (
          <section className="mt-10 rounded-2xl border border-[#e5dfe8] bg-white px-6 py-16 text-center">
            <p className="text-5xl">💜</p>

            <h2 className="mt-5 text-xl font-bold text-[#3f3a43]">
              Tu lista de deseos está vacía
            </h2>

            <p className="mt-2 text-[#756f78]">
              Explora el catálogo y guarda los productos que te gusten.
            </p>

            <Link
              href="/catalogo"
              className="mt-6 inline-block rounded-full bg-[#7b5ea7] px-6 py-3 font-semibold text-white transition hover:bg-[#62468d]"
            >
              Explorar productos
            </Link>
          </section>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
            {items.map((product) => (
              <article
                key={product.id}
                className="relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#e5dfe8] bg-white shadow-[0_8px_25px_rgba(70,50,80,0.08)]"
              >
                {/* Botón rápido para quitar el producto */}
                <button
                  type="button"
                  onClick={() => removeFromWishlist(product.id)}
                  aria-label={`Quitar ${product.nombre} de favoritos`}
                  className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-sm font-bold text-[#a14b4b] shadow transition hover:bg-[#f8e6e6]"
                >
                  ✕
                </button>

                {/* La imagen lleva a la descripción del producto */}
                <Link
                  href={`/catalogo/${product.id}`}
                  aria-label={`Ver detalles de ${product.nombre}`}
                  className="relative block h-36 w-full shrink-0 overflow-hidden bg-[#f8f3fb] sm:h-56"
                >
                  <Image
                    src={getImagePath(product.imagen)}
                    alt={product.nombre}
                    fill
                    sizes="(min-width: 1024px) 330px, 50vw"
                    className="object-contain p-2 sm:p-4"
                  />
                </Link>

                <div className="flex flex-1 flex-col p-3 sm:p-6">
                  <span className="text-xs font-semibold text-[#7b5ea7] sm:text-sm">
                    {getCategoryLabel(product.categoria)}
                  </span>

                  <h2 className="mt-1 line-clamp-2 text-sm font-bold text-[#3f3a43] sm:mt-2 sm:text-xl">
                    <Link
                      href={`/catalogo/${product.id}`}
                      className="hover:text-[#62468d] hover:underline"
                    >
                      {product.nombre}
                    </Link>
                  </h2>

                  <p className="my-2 line-clamp-2 text-xs text-[#756f78] sm:my-3 sm:line-clamp-3 sm:text-sm">
                    {product.descripcion}
                  </p>

                  <Link
                    href={`/catalogo/${product.id}`}
                    className="mb-2 text-xs font-semibold text-[#7b5ea7] hover:underline sm:mb-3 sm:text-sm"
                  >
                    Ver detalles →
                  </Link>

                  <div className="mt-auto">
                    <p className="text-base font-bold text-[#62468d] sm:text-lg">
                      {formatPrice(product.precio)}
                    </p>

                    <button
                      type="button"
                      onClick={() => removeFromWishlist(product.id)}
                      className="mt-3 w-full rounded-full border border-[#7b5ea7] px-3 py-2 text-xs font-semibold leading-tight text-[#62468d] transition hover:bg-[#f3eafa] sm:mt-4 sm:px-5 sm:py-3 sm:text-base"
                    >
                      <span className="sm:hidden">Quitar</span>
                      <span className="hidden sm:inline">Quitar de favoritos</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}