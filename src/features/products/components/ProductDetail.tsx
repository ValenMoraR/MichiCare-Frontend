"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../../../app/context/CartContext";
import { useWishlist } from "../../../../app/context/WishlistContext";
import { getCategoryLabel } from "../domain/categories";
import { useProduct } from "../hooks/useProduct";

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

function Message({ title, text }: { title: string; text: string }) {
  return (
    <section className="rounded-2xl border border-[#e5dfe8] bg-white px-6 py-16 text-center">
      <p className="text-5xl">🐱</p>
      <h1 className="mt-5 text-xl font-bold text-[#3f3a43]">{title}</h1>
      <p className="mt-2 text-[#756f78]">{text}</p>
      <Link
        href="/catalogo"
        className="mt-6 inline-block rounded-full bg-[#7b5ea7] px-6 py-3 font-semibold text-white transition hover:bg-[#62468d]"
      >
        Volver al catálogo
      </Link>
    </section>
  );
}

export default function ProductDetail({ id }: { id: number }) {
  const { loading, product, notFound, error } = useProduct(id);
  const { addToCart, getQuantity } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  if (loading) {
    return (
      <p className="py-12 text-center text-[#756f78]">Cargando producto...</p>
    );
  }

  if (notFound) {
    return (
      <Message
        title="Este producto no existe"
        text="Puede que ya no esté disponible o que el enlace sea incorrecto."
      />
    );
  }

  if (error || !product) {
    return (
      <Message
        title="No pudimos cargar el producto"
        text={error ?? "Inténtalo de nuevo en un momento."}
      />
    );
  }

  const agotado = product.stock <= 0;
  const pocasUnidades = product.stock > 0 && product.stock <= 5;
  const enCarrito = getQuantity(product.id);
  const limiteAlcanzado = !agotado && enCarrito >= product.stock;

  let textoBoton = "Agregar al carrito";
  if (agotado) textoBoton = "Sin stock";
  else if (limiteAlcanzado) textoBoton = "Ya tienes todas las unidades";

  return (
    <>
      <nav className="text-sm text-[#756f78]" aria-label="Ruta de navegación">
        <Link href="/catalogo" className="font-semibold text-[#7b5ea7] hover:underline">
          ← Catálogo
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/catalogo?categoria=${product.categoria.toLowerCase()}`}
          className="hover:underline"
        >
          {getCategoryLabel(product.categoria)}
        </Link>
      </nav>

      <article className="mt-6 grid gap-8 rounded-2xl border border-[#e5dfe8] bg-white p-6 shadow-[0_8px_25px_rgba(70,50,80,0.08)] md:grid-cols-2 md:p-8">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#fffaf7]">
          <Image
            src={getImagePath(product.imagen)}
            alt={product.nombre}
            fill
            priority
            sizes="(min-width: 768px) 450px, 90vw"
            className="object-contain p-6"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-semibold text-[#7b5ea7]">
            {getCategoryLabel(product.categoria)}
          </span>

          <h1 className="mt-2 text-3xl font-bold text-[#3f3a43]">
            {product.nombre}
          </h1>

          <p className="mt-4 text-3xl font-bold text-[#62468d]">
            {formatPrice(product.precio)}
          </p>

          <p className="mt-5 leading-relaxed text-[#756f78]">
            {product.descripcion}
          </p>

          <div className="mt-6">
            {agotado ? (
              <p className="font-semibold text-[#a14b4b]">Agotado</p>
            ) : pocasUnidades ? (
              <p className="font-semibold text-[#b8741a]">
                ¡Quedan solo {product.stock} unidades!
              </p>
            ) : (
              <p className="text-[#756f78]">
                {product.stock} unidades disponibles
              </p>
            )}

            {enCarrito > 0 && (
              <p className="mt-1 text-sm font-semibold text-[#7b5ea7]">
                Tienes {enCarrito} en tu carrito ·{" "}
                <Link href="/carrito" className="underline">
                  Ver carrito
                </Link>
              </p>
            )}
          </div>

          <div className="mt-auto pt-8">
            <button
              type="button"
              disabled={agotado || limiteAlcanzado}
              onClick={() => addToCart(product)}
              className="w-full rounded-full bg-[#7b5ea7] px-5 py-3 font-semibold text-white transition hover:bg-[#62468d] disabled:cursor-not-allowed disabled:opacity-50"
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
    </>
  );
}