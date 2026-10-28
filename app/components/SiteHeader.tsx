"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../../src/features/auth/hooks/useAuth";

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, isAdmin, logout } = useAuth();

  const enlaces = [
    { nombre: "Inicio", ruta: "/" },
    { nombre: "Catálogo", ruta: "/catalogo" },
    { nombre: "Cuidados", ruta: "/cuidados" },
    { nombre: "Contáctanos", ruta: "/contacto" },
  ];

  const enlaceActivo = (ruta: string) => pathname === ruta;

  const claseEnlace = (ruta: string) =>
    `rounded-full border px-3 py-2 font-medium transition duration-200 ${
      enlaceActivo(ruta)
        ? "border-[#7b5ea7] bg-[#f3eafa] text-[#62468d]"
        : "border-[#e5dfe8] text-[#3f3a43] hover:border-[#7b5ea7] hover:bg-[#f3eafa] hover:text-[#62468d]"
    }`;

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e5dfe8] bg-[#fffaf7]/95 shadow-[0_4px_20px_rgba(70,50,80,0.06)] backdrop-blur-md">
      {/* Fila superior */}
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f3eafa] text-2xl transition duration-300 group-hover:rotate-[-8deg] group-hover:scale-105">
            🐾
          </span>

          <span>
            <span className="block text-2xl font-extrabold tracking-tight text-[#62468d]">
              MichiCare
            </span>
            <span className="block text-xs text-[#756f78]">
              Amor y cuidado felino
            </span>
          </span>
        </Link>

        <nav
          aria-label="Accesos de usuario"
          className="flex flex-wrap items-center gap-2 text-sm"
        >
          {/* Sesión: invitado ve "Ingresar"; usuario ve su nombre y "Salir";
              el admin ve además "Administración". */}
          {loading ? null : user ? (
            <>
              <Link
                href="/cuenta"
                aria-current={enlaceActivo("/cuenta") ? "page" : undefined}
                className={`${claseEnlace("/cuenta")} max-w-[11rem] truncate`}
              >
                ♙ {user.nombre}
              </Link>
                            <Link
                href="/mis-consultas"
                aria-current={enlaceActivo("/mis-consultas") ? "page" : undefined}
                className={claseEnlace("/mis-consultas")}
              >
                💬 Mis consultas
              </Link>

              {isAdmin && (
                <Link
                  href="/admin"
                  aria-current={enlaceActivo("/admin") ? "page" : undefined}
                  className={claseEnlace("/admin")}
                >
                  ⚙ Administración
                </Link>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-[#e5dfe8] px-3 py-2 font-medium text-[#3f3a43] transition duration-200 hover:border-[#7b5ea7] hover:bg-[#f3eafa] hover:text-[#62468d]"
              >
                Salir
              </button>
            </>
          ) : (
            <Link
              href="/login"
              aria-current={enlaceActivo("/login") ? "page" : undefined}
              className={claseEnlace("/login")}
            >
              ♙ Ingresar
            </Link>
          )}

          <Link
            href="/deseos"
            aria-current={enlaceActivo("/deseos") ? "page" : undefined}
            className={claseEnlace("/deseos")}
          >
            ♡ Lista de deseos
          </Link>

          <Link
            href="/carrito"
            aria-current={enlaceActivo("/carrito") ? "page" : undefined}
            className={`rounded-full border px-3 py-2 font-medium transition duration-200 ${
              enlaceActivo("/carrito")
                ? "border-[#62468d] bg-[#62468d] text-white"
                : "border-[#e5dfe8] text-[#3f3a43] hover:border-[#7b5ea7] hover:bg-[#f3eafa] hover:text-[#62468d]"
            }`}
          >
            🛒 Carrito
          </Link>
        </nav>
      </div>

      {/* Navegación principal */}
      <div className="border-t border-[#e5dfe8] bg-[#f8f3fb]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 sm:px-8">
          <p className="py-3 text-sm text-[#756f78]">
            Todo para tu compañero felino
          </p>

          <nav
            aria-label="Navegación principal"
            className="flex flex-wrap items-center gap-1"
          >
            {enlaces.map((enlace) => (
              <Link
                key={enlace.ruta}
                href={enlace.ruta}
                aria-current={enlaceActivo(enlace.ruta) ? "page" : undefined}
                className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
                  enlaceActivo(enlace.ruta)
                    ? "bg-white text-[#62468d] shadow-sm"
                    : "text-[#3f3a43] hover:bg-white/70 hover:text-[#62468d]"
                }`}
              >
                {enlace.nombre}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}