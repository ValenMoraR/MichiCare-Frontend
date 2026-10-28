"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./useAuth";

// Para /login y /registro: con sesión activa, se redirige al inicio.
export function useRedirectIfAuthenticated() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [loading, user, router]);

  return { checking: loading || user !== null };
}