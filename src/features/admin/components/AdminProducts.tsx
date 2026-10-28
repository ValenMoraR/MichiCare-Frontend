"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import ConfirmDialog from "../../common/components/ConfirmDialog";
import { getCategoryLabel } from "../../products/domain/categories";
import type { Product } from "../../products/domain/product";
import { useAdminProducts } from "../../products/hooks/useAdminProducts";
import { useProductMutations } from "../../products/hooks/useProductMutations";
import ProductForm from "./ProductForm";

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

function StockBadge({ stock }: { stock: number }) {
  if (stock <= 0) {
    return (
      <span className="rounded-full bg-[#f8e6e6] px-3 py-1 text-xs font-semibold text-[#a14b4b]">
        Agotado
      </span>
    );
  }

  if (stock <= 5) {
    return (
      <span className="rounded-full bg-[#fdf0dc] px-3 py-1 text-xs font-semibold text-[#b8741a]">
        {stock} (bajo)
      </span>
    );
  }

  return (
    <span className="rounded-full bg-[#e6f4ea] px-3 py-1 text-xs font-semibold text-[#2e7d4f]">
      {stock}
    </span>
  );
}

export default function AdminProducts() {
  const { loading, error, products, reload } = useAdminProducts();
  const { busy, remove } = useProductMutations();

  // "new" = formulario de creación; un producto = formulario de edición.
  const [editing, setEditing] = useState<Product | "new" | null>(null);
  const [toDelete, setToDelete] = useState<Product | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  function openForm(target: Product | "new") {
    setNotice(null);
    setActionError(null);
    setEditing(target);
    requestAnimationFrame(() =>
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  }

  function handleSaved(message: string) {
    setEditing(null);
    setNotice(message);
    reload();
  }

  async function confirmDelete() {
    if (!toDelete) return;

    const target = toDelete;

    try {
      await remove(target.id);
      setNotice(`«${target.nombre}» se eliminó del catálogo.`);
      setActionError(null);
      reload();
    } catch (err) {
      setNotice(null);
      setActionError(
        err instanceof Error
          ? err.message
          : "No fue posible eliminar el producto.",
      );
    } finally {
      setToDelete(null);
    }
  }

  function renderList() {
    if (loading) {
      return (
        <p className="py-12 text-center text-[#756f78]">Cargando productos...</p>
      );
    }

    if (error) {
      return (
        <p role="alert" className="py-12 text-center text-[#a14b4b]">
          No pudimos cargar los productos: {error}
        </p>
      );
    }

    if (products.length === 0) {
      return (
        <div className="mt-8 rounded-2xl border border-[#e5dfe8] bg-white px-6 py-16 text-center">
          <p className="text-5xl">📦</p>
          <h3 className="mt-5 text-xl font-bold text-[#3f3a43]">
            Aún no hay productos
          </h3>
          <p className="mt-2 text-[#756f78]">
            Crea el primero con el botón “Nuevo producto”.
          </p>
        </div>
      );
    }

    return (
      <div className="mt-6 overflow-x-auto rounded-2xl border border-[#e5dfe8] bg-white shadow-[0_8px_25px_rgba(70,50,80,0.06)]">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-[#f3eafa] text-[#62468d]">
            <tr>
              <th className="px-4 py-3 font-semibold">Producto</th>
              <th className="px-4 py-3 font-semibold">Categoría</th>
              <th className="px-4 py-3 font-semibold">Precio</th>
              <th className="px-4 py-3 font-semibold">Stock</th>
              <th className="px-4 py-3 text-right font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-[#e5dfe8]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={getImagePath(product.imagen)}
                      alt=""
                      width={48}
                      height={48}
                      className="h-12 w-12 shrink-0 rounded-lg bg-[#fffaf7] object-contain p-1"
                    />
                    <span className="font-semibold text-[#3f3a43]">
                      {product.nombre}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-[#756f78]">
                  {getCategoryLabel(product.categoria)}
                </td>
                <td className="px-4 py-3 text-[#3f3a43]">
                  {formatPrice(product.precio)}
                </td>
                <td className="px-4 py-3">
                  <StockBadge stock={product.stock} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => openForm(product)}
                      aria-label={`Editar ${product.nombre}`}
                      className="rounded-full border border-[#7b5ea7] px-4 py-1.5 text-xs font-semibold text-[#62468d] transition hover:bg-[#f3eafa]"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => setToDelete(product)}
                      aria-label={`Eliminar ${product.nombre}`}
                      className="rounded-full border border-[#c0392b] px-4 py-1.5 text-xs font-semibold text-[#c0392b] transition hover:bg-[#f8e6e6]"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-[#3f3a43]">Productos</h2>
          <p className="mt-1 text-sm text-[#756f78]">
            {loading ? "Cargando..." : `${products.length} en el catálogo`}
          </p>
        </div>

        <button
          type="button"
          onClick={() => openForm("new")}
          className="rounded-full bg-[#7b5ea7] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#62468d]"
        >
          + Nuevo producto
        </button>
      </div>

      {notice && (
        <p
          role="status"
          className="mt-5 rounded-xl bg-[#e6f4ea] px-4 py-3 text-sm text-[#2e7d4f]"
        >
          {notice}
        </p>
      )}

      {actionError && (
        <p
          role="alert"
          className="mt-5 rounded-xl bg-[#f8e6e6] px-4 py-3 text-sm text-[#a14b4b]"
        >
          {actionError}
        </p>
      )}

      {editing !== null && (
        <div ref={formRef} className="mt-6">
          <ProductForm
            key={editing === "new" ? "new" : editing.id}
            product={editing === "new" ? null : editing}
            onSaved={handleSaved}
            onCancel={() => setEditing(null)}
          />
        </div>
      )}

      {renderList()}

      <ConfirmDialog
        open={toDelete !== null}
        title="¿Eliminar producto?"
        message={`Se eliminará «${toDelete?.nombre ?? ""}» del catálogo. Esta acción no se puede deshacer.`}
        loading={busy}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </section>
  );
}