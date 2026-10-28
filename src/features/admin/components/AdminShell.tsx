"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useRequireAuth } from "../../auth/hooks/useRequireAuth";

const TABS = [
  { label: "📦 Productos", href: "/admin" },
  { label: "📬 Consultas", href: "/admin/consultas" },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // Sin sesión -> /login. Con sesión de usuario normal -> inicio.
  // (La protección real está en el backend: 401/403.)
  const { ready, user } = useRequireAuth("admin");

  if (!ready) {
    return (
      <main className="min-h-screen bg-[#f8f3fb] px-5 py-12">
        <p className="text-center text-[#756f78]">Verificando acceso...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f3fb] px-5 py-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold text-[#7b5ea7]">
          Panel de administración
        </p>
        <h1 className="mt-1 text-3xl font-bold text-[#3f3a43]">
          Hola, {user?.nombre} 👋
        </h1>

        <nav
          aria-label="Secciones de administración"
          className="mt-6 inline-flex gap-1 rounded-xl bg-white p-1 shadow-sm"
        >
          {TABS.map((tab) => {
            const active = pathname === tab.href;

            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
                  active
                    ? "bg-[#62468d] text-white"
                    : "text-[#62468d] hover:bg-[#f3eafa]"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8">{children}</div>
      </div>
    </main>
  );
}