"use client";

import { useState } from "react";
import type { InteractionType } from "../../interactions/domain/interaction";
import { useAllInteractions } from "../../interactions/hooks/useAllInteractions";

type Filter = "todas" | InteractionType;

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleString("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function AdminInteractions() {
  const { loading, error, interactions } = useAllInteractions();
  const [filter, setFilter] = useState<Filter>("todas");

  const countProducto = interactions.filter((i) => i.tipo === "producto").length;
  const countMichi = interactions.filter((i) => i.tipo === "michi").length;

  const filters: { value: Filter; label: string }[] = [
    { value: "todas", label: `Todas (${interactions.length})` },
    { value: "producto", label: `🛍️ Sobre productos (${countProducto})` },
    { value: "michi", label: `🐱 Sobre michis (${countMichi})` },
  ];

  const visible =
    filter === "todas"
      ? interactions
      : interactions.filter((item) => item.tipo === filter);

  return (
    <section>
      <h2 className="text-2xl font-bold text-[#3f3a43]">Consultas recibidas</h2>
      <p className="mt-1 text-sm text-[#756f78]">
        Lo que los usuarios le han escrito a MichiCare.
      </p>

      {loading && (
        <p className="py-12 text-center text-[#756f78]">Cargando consultas...</p>
      )}

      {error && (
        <p role="alert" className="py-12 text-center text-[#a14b4b]">
          No pudimos cargar las consultas: {error}
        </p>
      )}

      {!loading && !error && interactions.length === 0 && (
        <div className="mt-8 rounded-2xl border border-[#e5dfe8] bg-white px-6 py-16 text-center">
          <p className="text-5xl">📭</p>
          <h3 className="mt-5 text-xl font-bold text-[#3f3a43]">
            Todavía no hay consultas
          </h3>
          <p className="mt-2 text-[#756f78]">
            Cuando un usuario escriba desde “Contáctanos”, aparecerá aquí.
          </p>
        </div>
      )}

      {!loading && !error && interactions.length > 0 && (
        <>
          <div className="mt-6 flex flex-wrap gap-2">
            {filters.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={filter === option.value}
                onClick={() => setFilter(option.value)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  filter === option.value
                    ? "bg-[#62468d] text-white"
                    : "bg-white text-[#62468d] hover:bg-[#f3eafa]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {visible.length === 0 ? (
            <p className="py-10 text-center text-[#756f78]">
              No hay consultas de este tipo.
            </p>
          ) : (
            <ul className="mt-6 space-y-4">
              {visible.map((item) => (
                <li
                  key={item.id}
                  className="rounded-2xl border border-[#e5dfe8] bg-white p-5 shadow-[0_8px_25px_rgba(70,50,80,0.06)]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-[#3f3a43]">
                        {item.user?.nombre ?? `Usuario #${item.userId}`}
                      </p>
                      {item.user?.email && (
                        <a
                          href={`mailto:${item.user.email}`}
                          className="text-sm text-[#7b5ea7] hover:underline"
                        >
                          {item.user.email}
                        </a>
                      )}
                    </div>

                    <div className="text-right">
                      <span className="rounded-full bg-[#f3eafa] px-3 py-1 text-xs font-semibold text-[#62468d]">
                        {item.tipo === "michi"
                          ? "🐱 Sobre su michi"
                          : `🛍️ ${item.product?.nombre ?? `Producto #${item.productId}`}`}
                      </span>
                      <time
                        className="mt-2 block text-xs text-[#756f78]"
                        dateTime={item.createdAt}
                      >
                        {formatDate(item.createdAt)}
                      </time>
                    </div>
                  </div>

                  <p className="mt-4 text-sm font-semibold text-[#62468d]">
                    Michi: {item.nombreMichi} 🐾
                  </p>
                  <p className="mt-1 whitespace-pre-line text-[#3f3a43]">
                    {item.mensaje}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}