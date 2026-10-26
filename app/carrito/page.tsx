
"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CarritoPage() {
    const {
        items,
        totalItems,
        totalPrice,
        updateQuantity,
        removeFromCart,
        clearCart,
    } = useCart();

  function formatPrice(price: number) {
    return price.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    });
  }

  return (
    <main className="min-h-screen bg-[#fffaf7] px-5 py-12">
        
        <div className="mx-auto max-w-5xl">
            <Link
            href="/catalogo"
            className="text-sm font-semibold text-[#7b5ea7] hover:underline"
            >
            ← Seguir comprando
            </Link>

            <h1 className="mt-5 text-3xl font-bold text-[#3f3a43]">
            Mi carrito 🛒
            </h1>

            <p className="mt-2 text-[#756f78]">
            Revisa los productos que elegiste para tu michi.
            </p>

            {items.length === 0 ? (
            <section className="mt-10 rounded-2xl border border-[#e5dfe8] bg-white px-6 py-16 text-center">
                <p className="text-5xl">🐱</p>

                <h2 className="mt-5 text-xl font-bold text-[#3f3a43]">
                    ¡Tu carrito está vacío!
                </h2>

                <p className="mt-2 text-[#756f78]">
                    Todavía no has agregado productos.
                </p>

                <Link
                    href="/catalogo"
                    className="mt-6 inline-block rounded-full bg-[#7b5ea7] px-6 py-3 font-semibold text-white transition hover:bg-[#62468d]"
                    >
                    Explorar productos
                </Link>
            </section>
            ) : (
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
                <section className="space-y-4">
                {items.map((item) => (
                    <article
                    key={item.product.id}
                    className="flex flex-col gap-4 rounded-2xl border border-[#e5dfe8] bg-white p-5 sm:flex-row sm:items-center"
                    >
                    <div className="flex h-28 w-full shrink-0 items-center justify-center rounded-xl bg-[#f8f3fb] sm:w-28">
                        <img
                        src={`/images/${item.product.imagen.split("/").pop()}`}
                        alt={item.product.nombre}
                        className="h-full w-full object-contain p-2"
                        />
                    </div>

                    <div className="flex-1">
                        <h2 className="font-bold text-[#3f3a43]">
                        {item.product.nombre}
                        </h2>

                        <p className="mt-1 text-sm text-[#756f78]">
                        {formatPrice(item.product.precio)} por unidad
                        </p>

                        <p className="mt-2 font-bold text-[#62468d]">
                        {formatPrice(
                            item.product.precio * item.quantity
                        )}
                        </p>
                        {item.quantity >= item.product.stock && (
                            <p className="mt-1 text-xs font-semibold text-[#b8741a]">
                                Alcanzaste el máximo disponible ({item.product.stock})
                            </p>
                        )}
                    </div>

                    
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-3 rounded-full border border-[#e5dfe8] px-3 py-1">
                                <button
                                type="button"
                                onClick={() =>
                                    updateQuantity(item.product.id, item.quantity - 1)
                                }
                                aria-label={`Disminuir cantidad de ${item.product.nombre}`}
                                className="px-1 text-lg font-bold text-[#62468d] hover:text-[#7b5ea7]"
                                >
                                −
                                </button>

                                <span className="min-w-5 text-center font-semibold">
                                {item.quantity}
                                </span>

                                <button
                                    type="button"
                                    onClick={() =>
                                        updateQuantity(item.product.id, item.quantity + 1)
                                    }
                                    disabled={item.quantity >= item.product.stock}
                                    aria-label={`Aumentar cantidad de ${item.product.nombre}`}
                                    className="px-1 text-lg font-bold text-[#62468d] hover:text-[#7b5ea7] disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={() => removeFromCart(item.product.id)}
                                className="text-sm font-semibold text-red-600 hover:underline"
                            >
                                Eliminar
                            </button>
                        </div>
                    </article>
                ))}
                </section>

                <aside className="h-fit rounded-2xl border border-[#e5dfe8] bg-white p-6">

                    <h2 className="text-xl font-bold text-[#3f3a43]">
                        Resumen del pedido
                    </h2>
                    <button
                        type="button"
                        onClick={clearCart}
                        className="mt-4 text-sm font-semibold text-red-600 hover:underline"
                        >
                        Vaciar carrito
                    </button>

                    <div className="mt-5 flex justify-between gap-3 text-sm text-[#756f78]">
                        <span>Productos ({totalItems})</span>
                        <span>{formatPrice(totalPrice)}</span>
                    </div>

                    <div className="my-5 border-t border-[#e5dfe8]" />

                    <div className="flex justify-between gap-3 font-bold text-[#3f3a43]">
                        <span>Total</span>
                        <span>{formatPrice(totalPrice)}</span>
                    </div>

                    <button
                        type="button"
                        disabled
                        className="mt-6 w-full cursor-not-allowed rounded-full bg-[#e5dfe8] px-5 py-3 font-semibold text-[#756f78]"
                    >
                        Próximamente: finalizar compra
                    </button>

                    <p className="mt-3 text-center text-xs text-[#756f78]">
                        La compra todavía no está conectada a un sistema de pagos.
                    </p>
                </aside>
          </div>
        )}
      </div>
    </main>
  );
}
