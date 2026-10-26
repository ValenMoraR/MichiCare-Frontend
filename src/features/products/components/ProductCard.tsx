"use client";

import Image from "next/image";
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

  const agotado = product.stock <= 0;
  const pocasUnidades = product.stock > 0 && product.stock <= 5;

  const enCarrito = getQuantity(product.id);
  const limiteAlcanzado = !agotado && enCarrito >= product.stock;

  let textoBoton = "Agregar al carrito";
  if (agotado) textoBoton = "Sin stock";
  else if (limiteAlcanzado) textoBoton = "Ya tienes todas las unidades";

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#e5dfe8] bg-white shadow-[0_8px_25px_rgba(70,50,80,0.08)] transition hover:-translate-y-1">
      <div className="relative h-72 w-full shrink-0 bg-[#fffaf7]">
        <Image
          src={getImagePath(product.imagen)}
          alt={product.nombre}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
          className="object-contain p-4"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="text-sm font-semibold text-[#7b5ea7]">
          {getCategoryLabel(product.categoria)}
        </span>

        <h2 className="mt-2 line-clamp-2 text-xl font-bold text-[#3f3a43]">
          {product.nombre}
        </h2>

        <p className="my-3 line-clamp-3 text-sm text-[#756f78]">
          {product.descripcion}
        </p>

        <div className="mt-auto">
          <p className="text-lg font-bold text-[#62468d]">
            {formatPrice(product.precio)}
          </p>

          {agotado ? (
            <p className="mt-1 text-sm font-semibold text-[#a14b4b]">
              Agotado
            </p>
          ) : pocasUnidades ? (
            <p className="mt-1 text-sm font-semibold text-[#b8741a]">
              ¡Quedan solo {product.stock}!
            </p>
          ) : (
            <p className="mt-1 text-sm text-[#756f78]">
              {product.stock} unidades disponibles
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
            className="mt-4 w-full rounded-full bg-[#7b5ea7] px-5 py-3 font-semibold text-white transition hover:bg-[#62468d] disabled:cursor-not-allowed disabled:opacity-50"
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
            className="mt-3 w-full rounded-full border border-[#7b5ea7] px-5 py-3 font-semibold text-[#62468d] transition hover:bg-[#f3eafa]"
          >
            {isInWishlist(product.id)
              ? "♥ Quitar de favoritos"
              : "♡ Agregar a favoritos"}
          </button>
        </div>
      </div>
    </article>
  );
}