"use client";

import { useEffect, useState } from "react";
import type { Interaction } from "../domain/interaction";
import { getMyInteractions } from "../services/interactions.service";

type State = { interactions?: Interaction[]; error?: string };

// `enabled` evita pedir datos protegidos antes de saber si hay sesión.
export function useMyInteractions(enabled: boolean) {
  const [state, setState] = useState<State | null>(null);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;

    getMyInteractions()
      .then((interactions) => {
        if (!cancelled) setState({ interactions });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({
            error:
              err instanceof Error
                ? err.message
                : "No fue posible obtener tus consultas.",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return {
    loading: enabled && state === null,
    error: state?.error,
    interactions: state?.interactions ?? [],
  };
}