"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../../../app/context/CartContext";
import { useWishlist } from "../../../../app/context/WishlistContext";
import { getCategoryLabel } from "../domain/categories";
import type { Product } from "../domain/product";

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

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, getQuantity } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const detailHref = `/catalogo/${product.id}`;

  const agotado = product.stock <= 0;
  const pocasUnidades = product.stock > 0 && product.stock <= 5;

  const enCarrito = getQuantity(product.id);
  const limiteAlcanzado = !agotado && enCarrito >= product.stock;

  let textoBoton = "Agregar al carrito";
  if (agotado) textoBoton = "Sin stock";
  else if (limiteAlcanzado) textoBoton = "Ya tienes todas las unidades";

  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#e5dfe8] bg-white shadow-[0_8px_25px_rgba(70,50,80,0.08)] transition hover:-translate-y-1">
      {/* La caja de la imagen cambia de alto según la pantalla: nunca se desborda. */}
      <Link
        href={detailHref}
        aria-label={`Ver detalles de ${product.nombre}`}
        className="relative block h-36 w-full shrink-0 overflow-hidden bg-[#fffaf7] sm:h-56 lg:h-72"
      >
        <Image
          src={getImagePath(product.imagen)}
          alt={product.nombre}
          fill
          sizes="(min-width: 1024px) 380px, 50vw"
          className="object-contain p-2 sm:p-4"
        />
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-6">
        <span className="text-xs font-semibold text-[#7b5ea7] sm:text-sm">
          {getCategoryLabel(product.categoria)}
        </span>

        <h2 className="mt-1 line-clamp-2 text-sm font-bold text-[#3f3a43] sm:mt-2 sm:text-xl">
          <Link href={detailHref} className="hover:text-[#62468d] hover:underline">
            {product.nombre}
          </Link>
        </h2>

        <p className="my-2 line-clamp-2 text-xs text-[#756f78] sm:my-3 sm:line-clamp-3 sm:text-sm">
          {product.descripcion}
        </p>

        <Link
          href={detailHref}
          className="mb-2 text-xs font-semibold text-[#7b5ea7] hover:underline sm:mb-3 sm:text-sm"
        >
          Ver detalles →
        </Link>

        <div className="mt-auto">
          <p className="text-base font-bold text-[#62468d] sm:text-lg">
            {formatPrice(product.precio)}
          </p>

          {agotado ? (
            <p className="mt-1 text-xs font-semibold text-[#a14b4b] sm:text-sm">
              Agotado
            </p>
          ) : pocasUnidades ? (
            <p className="mt-1 text-xs font-semibold text-[#b8741a] sm:text-sm">
              ¡Quedan solo {product.stock}!
            </p>
          ) : (
            <p className="mt-1 text-xs text-[#756f78] sm:text-sm">
              {product.stock} disponibles
            </p>
          )}

          {enCarrito > 0 && (
            <p className="mt-1 text-xs font-semibold text-[#7b5ea7]">
              Tienes {enCarrito} en tu carrito
            </p>
          )}

          <button
            type="button"
            disabled={agotado || limiteAlcanzado}
            onClick={() => addToCart(product)}
            className="mt-3 w-full rounded-full bg-[#7b5ea7] px-3 py-2 text-xs font-semibold leading-tight text-white transition hover:bg-[#62468d] disabled:cursor-not-allowed disabled:opacity-50 sm:mt-4 sm:px-5 sm:py-3 sm:text-base"
          >
            {textoBoton}
          </button>

          <button
            type="button"
            onClick={() => {
              if (isInWishlist(product.id)) {
                removeFromWishlist(product.id);
              } else {
                addToWishlist(product);
              }
            }}
            aria-pressed={isInWishlist(product.id)}
            className="mt-2 w-full rounded-full border border-[#7b5ea7] px-3 py-2 text-xs font-semibold leading-tight text-[#62468d] transition hover:bg-[#f3eafa] sm:mt-3 sm:px-5 sm:py-3 sm:text-base"
          >
            {isInWishlist(product.id) ? (
              <>
                ♥ <span className="sm:hidden">Quitar</span>
                <span className="hidden sm:inline">Quitar de favoritos</span>
              </>
            ) : (
              <>
                ♡ <span className="sm:hidden">Favorito</span>
                <span className="hidden sm:inline">Agregar a favoritos</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}