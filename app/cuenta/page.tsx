"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../../src/features/auth/hooks/useAuth";

export default function CuentaPage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  // Sin sesión no hay cuenta que mostrar: se lleva a /login.
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <main className="min-h-screen bg-[#fffaf7] px-4 py-12">
        <p className="text-center text-[#756f78]">Cargando...</p>
      </main>
    );
  }

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <main className="min-h-screen bg-[#fffaf7] px-4 py-12">
      <div className="mx-auto max-w-md">
        <h1 className="text-3xl font-bold text-[#62468d]">Mi cuenta</h1>

        <section className="mt-6 rounded-2xl border border-[#e5dfe8] bg-white p-6 shadow-sm sm:p-8">
          <dl className="space-y-4 text-[#3f3a43]">
            <div>
              <dt className="text-sm text-[#756f78]">Nombre</dt>
              <dd className="font-semibold">{user.nombre}</dd>
            </div>
            <div>
              <dt className="text-sm text-[#756f78]">Correo electrónico</dt>
              <dd className="font-semibold">{user.email}</dd>
            </div>
            <div>
              <dt className="text-sm text-[#756f78]">Tipo de cuenta</dt>
              <dd className="font-semibold">
                {user.role === "admin" ? "Administrador" : "Cliente"}
              </dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-8 w-full rounded-xl bg-[#62468d] px-4 py-3 font-semibold text-white transition hover:bg-[#7b5ea7]"
          >
            Cerrar sesión
          </button>
        </section>
      </div>
    </main>
  );
}