"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import Button from "../../common/components/Button";
import Input from "../../common/components/Input";
import Select from "../../common/components/Select";
import Textarea from "../../common/components/Textarea";
import { ApiError } from "../../common/http";
import { useProducts } from "../../products/hooks/useProducts";
import type { InteractionType } from "../domain/interaction";
import { useCreateInteraction } from "../hooks/useCreateInteraction";

type Errors = {
  productId?: string;
  nombreMichi?: string;
  mensaje?: string;
  general?: string;
};

// Traduce la respuesta del backend a un error junto al campo que corresponde.
function mapApiError(err: ApiError): Errors {
  const message = err.message;

  if (err.fields) {
    return {
      productId: err.fields.productId,
      nombreMichi: err.fields.nombreMichi,
      mensaje: err.fields.mensaje,
      general: err.fields.general,
    };
  }

  if (err.status === 404 || /producto/i.test(message)) {
    return { productId: message };
  }
  if (/mensaje/i.test(message) && !/michi/i.test(message)) {
    return { mensaje: message };
  }
  if (/michi/i.test(message) && !/mensaje/i.test(message)) {
    return { nombreMichi: message };
  }

  return { general: message };
}

const CARD =
  "rounded-2xl border border-[#e5dfe8] bg-white p-6 shadow-[0_8px_25px_rgba(70,50,80,0.08)]";

const TIPOS: { value: InteractionType; label: string }[] = [
  { value: "producto", label: "🛍️ Sobre un producto" },
  { value: "michi", label: "🐱 Sobre mi michi" },
];

export default function ContactForm() {
  const searchParams = useSearchParams();
  const { user, loading: authLoading, isAdmin } = useAuth();
  const { products, loading: productsLoading } = useProducts(1, 100);
  const { create, submitting } = useCreateInteraction();

  const preselected = searchParams.get("producto");

  const [tipo, setTipo] = useState<InteractionType>("producto");
  const [productId, setProductId] = useState(preselected ?? "");
  const [nombreMichi, setNombreMichi] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function changeTipo(next: InteractionType) {
    setTipo(next);
    setErrors({});
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found: Errors = {};

    if (tipo === "producto" && !productId) {
      found.productId = "Elige el producto sobre el que quieres consultar.";
    }
    if (!nombreMichi.trim()) {
      found.nombreMichi = "Escribe el nombre de tu michi.";
    }
    if (mensaje.trim().length < 10) {
      found.mensaje = "El mensaje debe tener al menos 10 caracteres.";
    }

    if (found.productId || found.nombreMichi || found.mensaje) {
      setErrors(found);
      return;
    }

    setErrors({});

    try {
      await create(
        tipo === "producto"
          ? {
              tipo,
              productId: Number(productId),
              nombreMichi: nombreMichi.trim(),
              mensaje: mensaje.trim(),
            }
          : {
              tipo,
              nombreMichi: nombreMichi.trim(),
              mensaje: mensaje.trim(),
            },
      );

      setProductId("");
      setNombreMichi("");
      setMensaje("");
      setSent(true);
    } catch (err) {
      setErrors(
        err instanceof ApiError
          ? mapApiError(err)
          : { general: "Ocurrió un error inesperado." },
      );
    }
  }

  if (authLoading) {
    return (
      <div className={CARD}>
        <p className="text-center text-[#756f78]">Cargando...</p>
      </div>
    );
  }

  // El formulario crea la consulta a nombre del usuario del token: requiere sesión.
  if (!user) {
    return (
      <div className={`${CARD} text-center`}>
        <p className="text-4xl">🐱</p>
        <h3 className="mt-4 text-lg font-bold text-[#3f3a43]">
          Inicia sesión para escribirnos
        </h3>
        <p className="mt-2 text-sm text-[#756f78]">
          Así podemos guardar tu consulta y que puedas revisarla después.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/login"
            className="rounded-full bg-[#7b5ea7] px-6 py-3 font-semibold text-white transition hover:bg-[#62468d]"
          >
            Ingresar
          </Link>
          <Link
            href="/registro"
            className="rounded-full border border-[#7b5ea7] px-6 py-3 font-semibold text-[#62468d] transition hover:bg-[#f3eafa]"
          >
            Crear cuenta
          </Link>
        </div>
      </div>
    );
  }

  // El administrador recibe las consultas, no las envía.
  if (isAdmin) {
    return (
      <div className={`${CARD} text-center`}>
        <p className="text-4xl">📬</p>
        <h3 className="mt-4 text-lg font-bold text-[#3f3a43]">
          Las consultas llegan a tu panel
        </h3>
        <p className="mt-2 text-sm text-[#756f78]">
          Como administrador no envías consultas: las recibes de los usuarios.
          Puedes revisarlas en el panel de administración.
        </p>
        <Link
          href="/admin"
          className="mt-6 inline-block rounded-full bg-[#7b5ea7] px-6 py-3 font-semibold text-white transition hover:bg-[#62468d]"
        >
          Ir a Administración
        </Link>
      </div>
    );
  }

  if (sent) {
    return (
      <div className={`${CARD} text-center`}>
        <p className="text-4xl">💜</p>
        <h3 className="mt-4 text-lg font-bold text-[#3f3a43]">
          ¡Gracias por escribirnos!
        </h3>
        <p className="mt-2 text-sm text-[#756f78]">
          Tu consulta quedó registrada.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/mis-consultas"
            className="rounded-full bg-[#7b5ea7] px-6 py-3 font-semibold text-white transition hover:bg-[#62468d]"
          >
            Ver mis consultas
          </Link>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="rounded-full border border-[#7b5ea7] px-6 py-3 font-semibold text-[#62468d] transition hover:bg-[#f3eafa]"
          >
            Enviar otra
          </button>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className={`${CARD} space-y-5`}>
      <p className="rounded-xl bg-[#f3eafa] px-4 py-3 text-sm text-[#62468d]">
        Escribiendo como <strong>{user.nombre}</strong> ({user.email})
      </p>

      {errors.general && (
        <p
          role="alert"
          className="rounded-xl bg-[#f8e6e6] px-4 py-3 text-sm text-[#a14b4b]"
        >
          {errors.general}
        </p>
      )}

      <div>
        <p className="mb-2 text-sm font-medium text-[#3f3a43]">
          ¿Sobre qué quieres consultar?
        </p>
        <div
          role="group"
          aria-label="Tipo de consulta"
          className="grid grid-cols-2 gap-1 rounded-xl bg-[#f8f3fb] p-1"
        >
          {TIPOS.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={tipo === option.value}
              onClick={() => changeTipo(option.value)}
              className={`rounded-lg px-3 py-3 text-sm font-semibold transition ${
                tipo === option.value
                  ? "bg-[#7b5ea7] text-white shadow-sm"
                  : "text-[#62468d] hover:bg-[#f3eafa]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {tipo === "producto" && (
        <Select
          id="productId"
          label="Producto sobre el que consultas"
          value={productId}
          onChange={(event) => setProductId(event.target.value)}
          disabled={productsLoading}
          error={errors.productId}
        >
          <option value="">
            {productsLoading ? "Cargando productos..." : "Elige un producto"}
          </option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.nombre}
            </option>
          ))}
        </Select>
      )}

      <Input
        id="nombreMichi"
        label="Nombre de tu michi"
        type="text"
        placeholder="¿Cómo se llama tu gato?"
        value={nombreMichi}
        onChange={(event) => setNombreMichi(event.target.value)}
        error={errors.nombreMichi}
      />

      <Textarea
        id="mensaje"
        label="Tu mensaje"
        rows={5}
        placeholder={
          tipo === "producto"
            ? "¿Qué quieres saber de este producto?"
            : "Cuéntanos qué quieres saber sobre tu michi: alimentación, comportamiento, cuidados..."
        }
        value={mensaje}
        onChange={(event) => setMensaje(event.target.value)}
        error={errors.mensaje}
      />

      <Button type="submit" loading={submitting}>
        Enviar mensaje
      </Button>
    </form>
  );
}