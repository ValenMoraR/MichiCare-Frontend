"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { Role } from "../domain/auth";
import { useAuth } from "./useAuth";

// Para rutas privadas: sin sesión -> /login; con sesión pero sin el rol
// requerido -> inicio. Solo es experiencia de usuario: la protección real
// está en el backend (401/403).
export function useRequireAuth(requiredRole?: Role) {
  const router = useRouter();
  const { user, loading } = useAuth();

  const forbidden = user !== null && requiredRole !== undefined && user.role !== requiredRole;

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
    } else if (forbidden) {
      router.replace("/");
    }
  }, [loading, user, forbidden, router]);

  return { ready: !loading && user !== null && !forbidden, user };
}