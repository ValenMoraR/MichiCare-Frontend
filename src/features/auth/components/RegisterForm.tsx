"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Button from "../../common/components/Button";
import Input from "../../common/components/Input";
import { ApiError } from "../../common/http";
import { useAuth } from "../hooks/useAuth";
import { useRedirectIfAuthenticated } from "../hooks/useRedirectIfAuthenticated";

type Errors = {
  nombre?: string;
  email?: string;
  password?: string;
  general?: string;
};

// Traduce la respuesta del backend a un error junto al campo que corresponde.
function mapApiError(err: ApiError): Errors {
  if (err.fields) {
    return {
      nombre: err.fields.nombre,
      email: err.fields.email,
      password: err.fields.password,
      general: err.fields.general,
    };
  }

  if (err.status === 409) return { email: err.message };

  if (err.status === 400 && /contraseña/i.test(err.message)) {
    return { password: err.message };
  }

  return { general: err.message };
}

export default function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();
  const { checking } = useRedirectIfAuthenticated();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found: Errors = {};

    if (nombre.trim().length < 2) {
      found.nombre = "Escribe tu nombre (mínimo 2 caracteres).";
    }

    if (!email.trim()) {
      found.email = "Escribe tu correo electrónico.";
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      found.email = "El correo no tiene un formato válido.";
    }

    if (password.length < 8) {
      found.password = "La contraseña debe tener al menos 8 caracteres.";
    }

    if (found.nombre || found.email || found.password) {
      setErrors(found);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      await register({
        nombre: nombre.trim(),
        email: email.trim(),
        password,
      });
      router.push("/login?registrado=1");
    } catch (err) {
      setErrors(
        err instanceof ApiError
          ? mapApiError(err)
          : { general: "Ocurrió un error inesperado." },
      );
      setSubmitting(false);
    }
  }

  if (checking) {
    return (
      <p className="py-6 text-center text-[#756f78]">Cargando...</p>
    );
  }

  return (
    <>
      <h2 className="mb-2 text-xl font-bold text-[#3f3a43]">
        Únete a MichiCare
      </h2>
      <p className="mb-6 text-sm text-[#756f78]">
        Completa tus datos para crear tu cuenta.
      </p>

      <form noValidate onSubmit={handleSubmit} className="space-y-5">
        {errors.general && (
          <p
            role="alert"
            className="rounded-xl bg-[#f8e6e6] px-4 py-3 text-sm text-[#a14b4b]"
          >
            {errors.general}
          </p>
        )}

        <Input
          id="nombre"
          label="Nombre completo"
          type="text"
          autoComplete="name"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(event) => setNombre(event.target.value)}
          error={errors.nombre}
        />

        <Input
          id="email"
          label="Correo electrónico"
          type="email"
          autoComplete="email"
          placeholder="tucorreo@ejemplo.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={errors.email}
        />

        <Input
          id="password"
          label="Contraseña"
          type="password"
          autoComplete="new-password"
          placeholder="Mínimo 8 caracteres"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={errors.password}
        />

        <Button type="submit" loading={submitting}>
          Crear mi cuenta
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[#756f78]">
        ¿Ya tienes una cuenta?{" "}
        <Link
          href="/login"
          className="font-semibold text-[#62468d] underline underline-offset-2 hover:text-[#7b5ea7]"
        >
          Inicia sesión
        </Link>
      </p>
    </>
  );
}