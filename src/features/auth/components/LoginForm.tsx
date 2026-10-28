"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import Button from "../../common/components/Button";
import Input from "../../common/components/Input";
import { ApiError } from "../../common/http";
import { useAuth } from "../hooks/useAuth";
import { useRedirectIfAuthenticated } from "../hooks/useRedirectIfAuthenticated";

type Errors = { email?: string; password?: string; general?: string };

export default function LoginForm() {
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const { checking } = useRedirectIfAuthenticated();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const justRegistered = searchParams.get("registrado") === "1";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found: Errors = {};

    if (!email.trim()) {
      found.email = "Escribe tu correo electrónico.";
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      found.email = "El correo no tiene un formato válido.";
    }

    if (!password) {
      found.password = "Escribe tu contraseña.";
    }

    if (found.email || found.password) {
      setErrors(found);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      // Al iniciar sesión, useRedirectIfAuthenticated lleva al inicio.
      await login({ email: email.trim(), password });
    } catch (err) {
      if (err instanceof ApiError) {
        setErrors(
          err.fields
            ? {
                email: err.fields.email,
                password: err.fields.password,
                general: err.fields.general,
              }
            : { general: err.message },
        );
      } else {
        setErrors({ general: "Ocurrió un error inesperado." });
      }
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
        Qué alegría verte
      </h2>
      <p className="mb-6 text-sm text-[#756f78]">
        Ingresa tus datos para continuar.
      </p>

      {justRegistered && (
        <p
          role="status"
          className="mb-5 rounded-xl bg-[#f3eafa] px-4 py-3 text-sm text-[#62468d]"
        >
          ¡Cuenta creada! Ahora inicia sesión.
        </p>
      )}

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
          autoComplete="current-password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={errors.password}
        />

        <Button type="submit" loading={submitting}>
          Iniciar sesión
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[#756f78]">
        ¿Aún no tienes cuenta?{" "}
        <Link
          href="/registro"
          className="font-semibold text-[#62468d] underline underline-offset-2 hover:text-[#7b5ea7]"
        >
          Regístrate
        </Link>
      </p>
    </>
  );
}