"use client";

import Link from "next/link";
import { useRequireAuth } from "../../auth/hooks/useRequireAuth";
import { useMyInteractions } from "../hooks/useMyInteractions";

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleString("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function MyInteractions() {
  // Solo los usuarios normales tienen consultas propias: el admin las recibe.
  const { ready } = useRequireAuth("user");
  const { loading, error, interactions } = useMyInteractions(ready);

  if (!ready || loading) {
    return (
      <p className="py-12 text-center text-[#756f78]">Cargando tus consultas...</p>
    );
  }

  if (error) {
    return (
      <p className="py-12 text-center text-[#756f78]">
        No pudimos cargar tus consultas: {error}
      </p>
    );
  }

  if (interactions.length === 0) {
    return (
      <section className="mt-10 rounded-2xl border border-[#e5dfe8] bg-white px-6 py-16 text-center">
        <p className="text-5xl">🐱</p>
        <h2 className="mt-5 text-xl font-bold text-[#3f3a43]">
          Aún no tienes consultas
        </h2>
        <p className="mt-2 text-[#756f78]">
          Escríbenos y aquí podrás ver todo lo que nos has preguntado.
        </p>
        <Link
          href="/contacto"
          className="mt-6 inline-block rounded-full bg-[#7b5ea7] px-6 py-3 font-semibold text-white transition hover:bg-[#62468d]"
        >
          Hacer una consulta
        </Link>
      </section>
    );
  }

  return (
    <ul className="mt-8 space-y-4">
      {interactions.map((item) => (
        <li
          key={item.id}
          className="rounded-2xl border border-[#e5dfe8] bg-white p-5 shadow-[0_8px_25px_rgba(70,50,80,0.06)]"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="rounded-full bg-[#f3eafa] px-3 py-1 text-xs font-semibold text-[#62468d]">
              {item.tipo === "michi"
                ? "🐱 Sobre mi michi"
                : `🛍️ ${item.product?.nombre ?? `Producto #${item.productId}`}`}
            </span>
            <time className="text-xs text-[#756f78]" dateTime={item.createdAt}>
              {formatDate(item.createdAt)}
            </time>
          </div>

          <p className="mt-3 font-bold text-[#3f3a43]">
            Para {item.nombreMichi} 🐾
          </p>
          <p className="mt-1 whitespace-pre-line text-sm text-[#756f78]">
            {item.mensaje}
          </p>
        </li>
      ))}
    </ul>
  );
}