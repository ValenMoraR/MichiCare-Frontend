
"use client";

import { useEffect, useState } from "react";
import {
  iniciarSesion,
  obtenerSesion,
  registrarUsuario,
} from "../lib/auth";

export default function CuentaPage() {
  const [modo, setModo] = useState<"login" | "registro">("login");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const [usuarioAutenticado, setUsuarioAutenticado] = useState<{
    id: number;
    role: "admin" | "user";
  } | null>(null);

  useEffect(() => {
    const verificarSesion = async () => {
      const token = sessionStorage.getItem("michicare_token");

      if (!token) {
        setUsuarioAutenticado(null);
        return;
      }

      try {
        const resultado = await obtenerSesion(token);
        setUsuarioAutenticado(resultado.usuario);
      } catch {
        sessionStorage.removeItem("michicare_token");
        sessionStorage.removeItem("michicare_usuario");
        setUsuarioAutenticado(null);
      }
    };

    verificarSesion();
  }, []);

  const cambiarModo = (nuevoModo: "login" | "registro") => {
    setModo(nuevoModo);
    setMensaje("");
    setNombre("");
    setEmail("");
    setPassword("");
  };

  const cerrarSesion = () => {
    sessionStorage.removeItem("michicare_token");
    sessionStorage.removeItem("michicare_usuario");

    setUsuarioAutenticado(null);
    setMensaje("");
    setNombre("");
    setEmail("");
    setPassword("");
    setModo("login");
  };

  return (
    <main className="min-h-screen bg-[#fffaf7] px-4 py-12">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <span className="text-5xl" role="img" aria-label="Gato">
            🐾
          </span>

          <h1 className="mt-4 text-3xl font-bold text-[#62468d]">
            ¡Bienvenido a MichiCare!
          </h1>

          <p className="mt-3 text-[#756f78]">
            Tu espacio para consentir a tu michi.
          </p>
        </div>

        <section className="rounded-2xl border border-[#e5dfe8] bg-white p-6 shadow-sm sm:p-8">
          {usuarioAutenticado && (
            <div className="mb-5 rounded-xl bg-[#f3eafa] px-4 py-3 text-sm text-[#62468d]">
              <p className="font-semibold">
                Sesión verificada correctamente
              </p>

              <p className="mt-1">
                ID de usuario: {usuarioAutenticado.id}
              </p>

              <button
                type="button"
                onClick={cerrarSesion}
                className="mt-3 rounded-lg bg-[#62468d] px-4 py-2 font-semibold text-white transition hover:bg-[#7b5ea7]"
              >
                Cerrar sesión
              </button>
            </div>
          )}

          <div className="mb-6 grid grid-cols-2 rounded-xl bg-[#f8f3fb] p-1">
            <button
              type="button"
              onClick={() => cambiarModo("login")}
              className={`rounded-lg px-3 py-3 text-sm font-semibold transition ${
                modo === "login"
                  ? "bg-[#7b5ea7] text-white shadow-sm"
                  : "text-[#62468d] hover:bg-[#f3eafa]"
              }`}
            >
              Iniciar sesión
            </button>

            <button
              type="button"
              onClick={() => cambiarModo("registro")}
              className={`rounded-lg px-3 py-3 text-sm font-semibold transition ${
                modo === "registro"
                  ? "bg-[#7b5ea7] text-white shadow-sm"
                  : "text-[#62468d] hover:bg-[#f3eafa]"
              }`}
            >
              Crear cuenta
            </button>
          </div>

          <h2 className="mb-2 text-xl font-bold text-[#3f3a43]">
            {modo === "login" ? "Qué alegría verte" : "Únete a MichiCare"}
          </h2>

          <p className="mb-6 text-sm text-[#756f78]">
            {modo === "login"
              ? "Ingresa tus datos para continuar."
              : "Completa tus datos para crear tu cuenta."}
          </p>

          <form
            className="space-y-5"
            onSubmit={async (event) => {
              event.preventDefault();
              setMensaje("");
              setCargando(true);

              try {
                if (modo === "registro") {
                  const resultado = await registrarUsuario({
                    nombre: nombre.trim(),
                    email: email.trim(),
                    password,
                  });

                  setMensaje(resultado.mensaje);
                  setNombre("");
                  setEmail("");
                  setPassword("");
                } else {
                  const resultado = await iniciarSesion({
                    email: email.trim(),
                    password,
                  });

                  sessionStorage.setItem(
                    "michicare_token",
                    resultado.token,
                  );

                  sessionStorage.setItem(
                    "michicare_usuario",
                    JSON.stringify(resultado.usuario),
                  );

                  const sesion = await obtenerSesion(resultado.token);
                  setUsuarioAutenticado(sesion.usuario);
                  setMensaje(resultado.mensaje);
                }
              } catch (error) {
                setMensaje(
                  error instanceof Error
                    ? error.message
                    : "Ocurrió un error inesperado.",
                );
              } finally {
                setCargando(false);
              }
            }}
          >
            {modo === "registro" && (
              <div>
                <label
                  htmlFor="nombre"
                  className="mb-2 block text-sm font-medium text-[#3f3a43]"
                >
                  Nombre completo
                </label>

                <input
                  id="nombre"
                  name="nombre"
                  value={nombre}
                  onChange={(event) => setNombre(event.target.value)}
                  type="text"
                  autoComplete="name"
                  placeholder="Tu nombre"
                  className="w-full rounded-xl border border-[#e5dfe8] px-4 py-3 outline-none transition focus:border-[#7b5ea7] focus:ring-2 focus:ring-[#f3eafa]"
                  required
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#3f3a43]"
              >
                Correo electrónico
              </label>

              <input
                id="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                autoComplete="email"
                placeholder="tucorreo@ejemplo.com"
                className="w-full rounded-xl border border-[#e5dfe8] px-4 py-3 outline-none transition focus:border-[#7b5ea7] focus:ring-2 focus:ring-[#f3eafa]"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#3f3a43]"
              >
                Contraseña
              </label>

              <input
                id="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                autoComplete={
                  modo === "login" ? "current-password" : "new-password"
                }
                placeholder={
                  modo === "registro"
                    ? "Mínimo 8 caracteres"
                    : "Ingresa tu contraseña"
                }
                minLength={modo === "registro" ? 8 : undefined}
                className="w-full rounded-xl border border-[#e5dfe8] px-4 py-3 outline-none transition focus:border-[#7b5ea7] focus:ring-2 focus:ring-[#f3eafa]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={cargando}
              className="w-full rounded-xl bg-[#7b5ea7] px-4 py-3 font-semibold text-white transition hover:bg-[#62468d] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {cargando
                ? "Procesando..."
                : modo === "login"
                  ? "Iniciar sesión"
                  : "Crear mi cuenta"}
            </button>

            {mensaje && (
              <p
                role="status"
                aria-live="polite"
                className="rounded-xl bg-[#f3eafa] px-4 py-3 text-sm text-[#62468d]"
              >
                {mensaje}
              </p>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-[#756f78]">
            {modo === "login"
              ? "¿Aún no tienes cuenta?"
              : "¿Ya tienes una cuenta?"}{" "}
            <button
              type="button"
              onClick={() =>
                cambiarModo(modo === "login" ? "registro" : "login")
              }
              className="font-semibold text-[#62468d] underline underline-offset-2 hover:text-[#7b5ea7]"
            >
              {modo === "login" ? "Regístrate" : "Inicia sesión"}
            </button>
          </p>
        </section>

        <p className="mt-6 text-center text-sm text-[#756f78]">
          Hecho con 🐾 para quienes aman a los gatos.
        </p>
      </div>
    </main>
  );
}
