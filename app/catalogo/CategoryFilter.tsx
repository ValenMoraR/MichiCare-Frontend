"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

type Product = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  categoria: string;
};

type CategoryFilterProps = {
  products: Product[];
};

const categories = [
  { label: "Todos", value: "todos" },
  { label: "Alimentación", value: "alimentacion" },
  { label: "Higiene", value: "higiene" },
  { label: "Juguetes", value: "juguetes" },
  { label: "Descanso", value: "descanso" },
];

export default function CategoryFilter({
  products,
}: CategoryFilterProps) {
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [selectedCategory, setSelectedCategory] = useState("todos");


  const filteredProducts =
    selectedCategory === "todos"
      ? products
      : products.filter(
          (product) =>
            product.categoria.toLowerCase() === selectedCategory
        );

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
    <>
      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category.value}
            type="button"
            onClick={() => setSelectedCategory(category.value)}
            aria-pressed={selectedCategory === category.value}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              selectedCategory === category.value
                ? "bg-[#7b5ea7] text-white"
                : "bg-[#f3eafa] text-[#62468d] hover:bg-[#e5d8f2]"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <p className="py-12 text-center text-[#756f78]">
          No hay productos en esta categoría por el momento.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-2xl border border-[#e5dfe8] bg-white shadow-[0_8px_25px_rgba(70,50,80,0.08)] transition hover:-translate-y-1"
            >
              <div className="flex h-60 items-center justify-center bg-[#fffaf7] p-5">
                <img
                  src={getImagePath(product.imagen)}
                  alt={product.nombre}
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
                    onClick={() => addToCart(product)}
                    className="mt-4 w-full rounded-full bg-[#7b5ea7] px-5 py-3 font-semibold text-white transition hover:bg-[#62468d]"
                    >
                    Agregar al carrito
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
            </article>
          ))}
        </div>
      )}
    </>
  );
}