"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useAuth } from "../../src/features/auth/hooks/useAuth";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

// Circulito rojo con la cantidad de productos.
function Badge({ count }: { count: number }) {
  if (count <= 0) return null;

  return (
    <span
      aria-hidden="true"
      className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d64545] px-1 text-[11px] font-bold leading-none text-white shadow"
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, isAdmin, logout, notice, dismissNotice } = useAuth();
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();

  const [navOpen, setNavOpen] = useState(false); // menú hamburguesa (móvil y tablet)
  const [accountOpen, setAccountOpen] = useState(false); // menú de la cuenta
  const accountRef = useRef<HTMLDivElement>(null);

  // El administrador recibe las consultas: en su menú "Consultas" reemplaza a "Contáctanos".
  const enlaces = [
    { nombre: "Inicio", ruta: "/" },
    { nombre: "Catálogo", ruta: "/catalogo" },
    { nombre: "Cuidados", ruta: "/cuidados" },
    isAdmin
      ? { nombre: "Consultas", ruta: "/admin/consultas" }
      : { nombre: "Contáctanos", ruta: "/contacto" },
  ];

  const enlaceActivo = (ruta: string) => pathname === ruta;

  // Accesos de arriba (cuenta, favoritos, carrito): al estar en esa página se pintan de morado.
  const claseAccion = (activo: boolean) =>
    `relative flex items-center gap-1.5 rounded-full border px-3 py-2 font-medium transition duration-200 ${
      activo
        ? "border-[#62468d] bg-[#62468d] text-white"
        : "border-[#e5dfe8] text-[#3f3a43] hover:border-[#7b5ea7] hover:bg-[#f3eafa] hover:text-[#62468d]"
    }`;

  // Menú principal (Inicio, Catálogo...): la opción elegida se marca bien fuerte.
  const claseMenu = (activo: boolean, extra: string) =>
    `rounded-lg font-semibold transition ${extra} ${
      activo
        ? "bg-[#62468d] text-white shadow-md"
        : "text-[#3f3a43] hover:bg-white hover:text-[#62468d]"
    }`;

  // El elemento activo lleva fondo y letra fijados en línea: así siempre se lee,
  // sin importar las reglas globales de los enlaces.
  const estiloActivo = (activo: boolean): CSSProperties | undefined =>
    activo ? { color: "#ffffff", backgroundColor: "#62468d" } : undefined;

  // Cerrar el menú de la cuenta al hacer clic fuera o con Escape.
  useEffect(() => {
    if (!accountOpen) return;

    function handlePointer(event: MouseEvent) {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target as Node)
      ) {
        setAccountOpen(false);
      }
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setAccountOpen(false);
    }

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [accountOpen]);

  function handleLogout() {
    setAccountOpen(false);
    setNavOpen(false);
    logout();
    router.push("/");
  }

  const accountActive = enlaceActivo("/cuenta") || enlaceActivo("/mis-consultas");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e5dfe8] bg-[#fffaf7]/95 shadow-[0_4px_20px_rgba(70,50,80,0.06)] backdrop-blur-md">
      {isAdmin && (
        <div className="bg-[#62468d] px-5 py-1.5 text-center text-xs font-semibold tracking-wide text-white">
          Modo administrador · Aquí gestionas el catálogo y recibes las consultas
        </div>
      )}

      {/* Fila superior. En móvil: logo + menú ☰ arriba, y los accesos en una segunda fila. */}
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3 sm:px-8 sm:py-4">
        <Link href="/" className="group mr-auto flex shrink-0 items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f3eafa] text-2xl transition duration-300 group-hover:rotate-[-8deg] group-hover:scale-105 sm:h-12 sm:w-12">
            🐾
          </span>

          <span>
            <span className="block text-xl font-extrabold tracking-tight text-[#62468d] sm:text-2xl">
              MichiCare
            </span>
            <span className="hidden text-xs text-[#756f78] sm:block">
              Amor y cuidado felino
            </span>
          </span>
        </Link>

        <nav
          aria-label="Accesos de usuario"
          className="order-3 flex w-full items-center justify-between gap-2 text-sm sm:order-2 sm:w-auto sm:justify-end"
        >
          <div className="flex items-center gap-2">
            {/* Invitado: "Ingresar". Usuario: su nombre, que abre el menú de la cuenta.
                Admin: además "Administración". */}
            {loading ? null : user ? (
              <>
                <div ref={accountRef} className="relative">
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={accountOpen}
                    onClick={() => setAccountOpen((open) => !open)}
                    className={claseAccion(accountActive || accountOpen)}
                    style={estiloActivo(accountActive || accountOpen)}
                  >
                    <span aria-hidden="true">♙</span>
                    <span className="max-w-[7rem] truncate sm:max-w-[10rem]">
                      {user.nombre}
                    </span>
                    <span aria-hidden="true" className="text-xs">
                      ▾
                    </span>
                  </button>

                  {accountOpen && (
                    <div
                      role="menu"
                      className="absolute left-0 mt-2 w-52 rounded-xl border border-[#e5dfe8] bg-white p-1 shadow-lg sm:left-auto sm:right-0"
                    >
                      <Link
                        role="menuitem"
                        href="/cuenta"
                        onClick={() => setAccountOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-[#3f3a43] hover:bg-[#f3eafa] hover:text-[#62468d]"
                      >
                        ♙ Mi cuenta
                      </Link>

                      {!isAdmin && (
                        <Link
                          role="menuitem"
                          href="/mis-consultas"
                          onClick={() => setAccountOpen(false)}
                          className="block rounded-lg px-3 py-2 text-sm font-medium text-[#3f3a43] hover:bg-[#f3eafa] hover:text-[#62468d]"
                        >
                          💬 Mis consultas
                        </Link>
                      )}

                      <div className="my-1 border-t border-[#e5dfe8]" />

                      <button
                        type="button"
                        role="menuitem"
                        onClick={handleLogout}
                        className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-[#a14b4b] hover:bg-[#f8e6e6]"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>

                {isAdmin && (
                  <Link
                    href="/admin"
                    aria-current={enlaceActivo("/admin") ? "page" : undefined}
                    className={`${claseAccion(enlaceActivo("/admin"))} hidden md:flex`}
                    style={estiloActivo(enlaceActivo("/admin"))}
                  >
                    ⚙ Administración
                  </Link>
                )}
              </>
            ) : (
              <Link
                href="/login"
                aria-current={enlaceActivo("/login") ? "page" : undefined}
                className={claseAccion(enlaceActivo("/login"))}
                style={estiloActivo(enlaceActivo("/login"))}
              >
                ♙ Ingresar
              </Link>
            )}
          </div>

          {/* El administrador no compra: sin lista de deseos ni carrito. */}
          {!isAdmin && (
            <div className="flex items-center gap-2">
              <Link
                href="/deseos"
                aria-current={enlaceActivo("/deseos") ? "page" : undefined}
                aria-label={`Lista de deseos${
                  wishlistItems.length > 0
                    ? `, ${wishlistItems.length} productos`
                    : ""
                }`}
                className={claseAccion(enlaceActivo("/deseos"))}
                style={estiloActivo(enlaceActivo("/deseos"))}
              >
                <span aria-hidden="true">♡</span>
                <span className="hidden md:inline">Lista de deseos</span>
                <Badge count={wishlistItems.length} />
              </Link>

              <Link
                href="/carrito"
                aria-current={enlaceActivo("/carrito") ? "page" : undefined}
                aria-label={`Carrito${
                  totalItems > 0 ? `, ${totalItems} productos` : ""
                }`}
                className={claseAccion(enlaceActivo("/carrito"))}
                style={estiloActivo(enlaceActivo("/carrito"))}
              >
                <span aria-hidden="true">🛒</span>
                <span className="hidden md:inline">Carrito</span>
                <Badge count={totalItems} />
              </Link>
            </div>
          )}
        </nav>

        {/* Botón del menú hamburguesa: solo móvil y tablet */}
        <button
          type="button"
          aria-label={navOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={navOpen}
          aria-controls="menu-movil"
          onClick={() => setNavOpen((open) => !open)}
          className="order-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#62468d] bg-[#62468d] text-xl text-white transition hover:bg-[#7b5ea7] sm:order-3 lg:hidden"
        >
          {navOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Navegación principal: escritorio */}
      <div className="hidden border-t border-[#e5dfe8] bg-[#f8f3fb] lg:block">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-8 py-1.5">
          <p className="text-sm text-[#756f78]">Todo para tu compañero felino</p>

          <nav
            aria-label="Navegación principal"
            className="flex flex-wrap items-center gap-1"
          >
            {enlaces.map((enlace) => (
              <Link
                key={enlace.ruta}
                href={enlace.ruta}
                aria-current={enlaceActivo(enlace.ruta) ? "page" : undefined}
                className={claseMenu(enlaceActivo(enlace.ruta), "px-4 py-2.5 text-sm")}
                style={estiloActivo(enlaceActivo(enlace.ruta))}
              >
                {enlace.nombre}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Navegación principal: menú hamburguesa (móvil y tablet) */}
      {navOpen && (
        <div
          id="menu-movil"
          className="border-t border-[#e5dfe8] bg-[#f8f3fb] lg:hidden"
        >
          <nav
            aria-label="Navegación principal"
            className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-8"
          >
            {enlaces.map((enlace) => (
              <Link
                key={enlace.ruta}
                href={enlace.ruta}
                onClick={() => setNavOpen(false)}
                aria-current={enlaceActivo(enlace.ruta) ? "page" : undefined}
                className={claseMenu(enlaceActivo(enlace.ruta), "px-4 py-3 text-base")}
                style={estiloActivo(enlaceActivo(enlace.ruta))}
              >
                {enlace.nombre}
              </Link>
            ))}

            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setNavOpen(false)}
                aria-current={enlaceActivo("/admin") ? "page" : undefined}
                className={claseMenu(enlaceActivo("/admin"), "px-4 py-3 text-base")}
                style={estiloActivo(enlaceActivo("/admin"))}
              >
                ⚙ Administración
              </Link>
            )}
          </nav>
        </div>
      )}

      {/* Aviso de sesión cerrada */}
      {notice && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-[70] flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center justify-between gap-3 rounded-2xl bg-[#2e7d4f] px-5 py-3 text-sm font-semibold text-white shadow-lg"
        >
          <span>✓ {notice}</span>
          <button
            type="button"
            onClick={dismissNotice}
            aria-label="Cerrar aviso"
            className="text-white/80 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}
    </header>
  );
}