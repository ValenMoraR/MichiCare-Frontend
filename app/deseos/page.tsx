
"use client";

import Image from "next/image";
import Link from "next/link";
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
    <main className="min-h-screen bg-[#fffaf7] px-5 py-12">
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
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-2xl border border-[#e5dfe8] bg-white shadow-[0_8px_25px_rgba(70,50,80,0.08)]"
              >
                <div className="flex h-60 items-center justify-center bg-[#f8f3fb] p-5">
                  <Image
                    src={getImagePath(product.imagen)}
                    alt={product.nombre}
                    width={300}
                    height={300}
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="p-6">
                  <span className="text-sm font-semibold capitalize text-[#7b5ea7]">
                    {product.categoria}
                  </span>

                  <h2 className="mt-2 text-xl font-bold text-[#3f3a43]">
                    {product.nombre}
                  </h2>

                  <p className="my-3 text-sm text-[#756f78]">
                    {product.descripcion}
                  </p>

                  <p className="text-lg font-bold text-[#62468d]">
                    {formatPrice(product.precio)}
                  </p>

                  <button
                    type="button"
                    onClick={() => removeFromWishlist(product.id)}
                    className="mt-4 w-full rounded-full border border-[#7b5ea7] px-5 py-3 font-semibold text-[#62468d] transition hover:bg-[#f3eafa]"
                  >
                    Quitar de favoritos
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
