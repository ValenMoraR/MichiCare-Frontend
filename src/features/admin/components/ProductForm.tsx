"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import Button from "../../common/components/Button";
import Input from "../../common/components/Input";
import Select from "../../common/components/Select";
import Textarea from "../../common/components/Textarea";
import { ApiError } from "../../common/http";
import { CATEGORIES } from "../../products/domain/categories";
import type { Product } from "../../products/domain/product";
import { PRODUCT_IMAGES } from "../../products/domain/product-images";
import { useProductMutations } from "../../products/hooks/useProductMutations";

type Props = {
  // null = crear un producto nuevo; con producto = editarlo.
  product: Product | null;
  onSaved: (message: string) => void;
  onCancel: () => void;
};

type Errors = {
  nombre?: string;
  categoria?: string;
  precio?: string;
  stock?: string;
  imagen?: string;
  descripcion?: string;
  general?: string;
};

const CATEGORY_OPTIONS = CATEGORIES.filter((c) => c.value !== "todos");

// Traduce la respuesta del backend a un error junto al campo que corresponde.
function mapApiError(err: ApiError): Errors {
  const message = err.message;

  if (err.fields) {
    return {
      nombre: err.fields.nombre,
      categoria: err.fields.categoria,
      precio: err.fields.precio,
      stock: err.fields.stock,
      imagen: err.fields.imagen,
      descripcion: err.fields.descripcion,
      general: err.fields.general,
    };
  }

  if (/precio/i.test(message) && !/stock/i.test(message)) {
    return { precio: message };
  }
  if (/stock/i.test(message) && !/precio/i.test(message)) {
    return { stock: message };
  }

  return { general: message };
}

export default function ProductForm({ product, onSaved, onCancel }: Props) {
  const { busy, create, update } = useProductMutations();

  const currentImage = product ? (product.imagen?.split("/").pop() ?? "") : "";
  const imageOptions =
    currentImage && !PRODUCT_IMAGES.includes(currentImage)
      ? [currentImage, ...PRODUCT_IMAGES]
      : PRODUCT_IMAGES;

  const [nombre, setNombre] = useState(product?.nombre ?? "");
  const [categoria, setCategoria] = useState(
    product?.categoria ?? CATEGORY_OPTIONS[0].value,
  );
  const [precio, setPrecio] = useState(product ? String(product.precio) : "");
  const [stock, setStock] = useState(product ? String(product.stock) : "");
  const [imagen, setImagen] = useState(currentImage || PRODUCT_IMAGES[0]);
  const [descripcion, setDescripcion] = useState(product?.descripcion ?? "");
  const [errors, setErrors] = useState<Errors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found: Errors = {};
    const precioNumber = Number(precio);
    const stockNumber = Number(stock);

    if (!nombre.trim()) {
      found.nombre = "Escribe el nombre del producto.";
    }
    if (!descripcion.trim()) {
      found.descripcion = "Escribe una descripción.";
    }
    if (precio.trim() === "" || !Number.isFinite(precioNumber) || precioNumber <= 0) {
      found.precio = "El precio debe ser un número mayor que cero.";
    }
    if (stock.trim() === "" || !Number.isInteger(stockNumber) || stockNumber < 0) {
      found.stock = "El stock debe ser un número entero mayor o igual a cero.";
    }

    if (found.nombre || found.descripcion || found.precio || found.stock) {
      setErrors(found);
      return;
    }

    setErrors({});

    const payload = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      precio: precioNumber,
      stock: stockNumber,
      categoria,
      imagen: `/images/${imagen}`,
    };

    try {
      if (product) {
        await update(product.id, payload);
        onSaved(`«${payload.nombre}» se actualizó correctamente.`);
      } else {
        await create(payload);
        onSaved(`«${payload.nombre}» se creó correctamente.`);
      }
    } catch (err) {
      setErrors(
        err instanceof ApiError
          ? mapApiError(err)
          : { general: "Ocurrió un error inesperado." },
      );
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[#e5dfe8] bg-white p-6 shadow-[0_8px_25px_rgba(70,50,80,0.08)]"
    >
      <h3 className="text-lg font-bold text-[#3f3a43]">
        {product ? `Editar «${product.nombre}»` : "Nuevo producto"}
      </h3>

      {errors.general && (
        <p
          role="alert"
          className="mt-4 rounded-xl bg-[#f8e6e6] px-4 py-3 text-sm text-[#a14b4b]"
        >
          {errors.general}
        </p>
      )}

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Input
          id="nombre"
          label="Nombre"
          type="text"
          value={nombre}
          onChange={(event) => setNombre(event.target.value)}
          error={errors.nombre}
        />

        <Select
          id="categoria"
          label="Categoría"
          value={categoria}
          onChange={(event) => setCategoria(event.target.value)}
          error={errors.categoria}
        >
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <Input
          id="precio"
          label="Precio (COP)"
          type="number"
          min="0"
          step="any"
          inputMode="decimal"
          value={precio}
          onChange={(event) => setPrecio(event.target.value)}
          error={errors.precio}
        />

        <Input
          id="stock"
          label="Stock (unidades)"
          type="number"
          min="0"
          step="1"
          inputMode="numeric"
          value={stock}
          onChange={(event) => setStock(event.target.value)}
          error={errors.stock}
        />

        <div className="flex items-end gap-4">
          <div className="flex-1">
            <Select
              id="imagen"
              label="Imagen"
              value={imagen}
              onChange={(event) => setImagen(event.target.value)}
              error={errors.imagen}
            >
              {imageOptions.map((file) => (
                <option key={file} value={file}>
                  {file}
                </option>
              ))}
            </Select>
          </div>

          <Image
            src={`/images/${imagen}`}
            alt="Vista previa de la imagen elegida"
            width={64}
            height={64}
            className="h-16 w-16 rounded-lg border border-[#e5dfe8] bg-[#fffaf7] object-contain p-1"
          />
        </div>
      </div>

      <div className="mt-5">
        <Textarea
          id="descripcion"
          label="Descripción"
          rows={4}
          value={descripcion}
          onChange={(event) => setDescripcion(event.target.value)}
          error={errors.descripcion}
        />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          disabled={busy}
          className="rounded-xl border border-[#e5dfe8] px-6 py-3 font-semibold text-[#3f3a43] transition hover:bg-[#f8f3fb] disabled:opacity-60"
        >
          Cancelar
        </button>

        <div className="sm:w-48">
          <Button type="submit" loading={busy}>
            {product ? "Guardar cambios" : "Crear producto"}
          </Button>
        </div>
      </div>
    </form>
  );
}