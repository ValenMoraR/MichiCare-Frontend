"use client";

import { useEffect, useState } from "react";
import type { Interaction } from "../domain/interaction";
import { getAllInteractions } from "../services/interactions.service";

type State = { interactions?: Interaction[]; error?: string };

export function useAllInteractions() {
  const [state, setState] = useState<State | null>(null);

  useEffect(() => {
    let cancelled = false;

    getAllInteractions()
      .then((interactions) => {
        if (!cancelled) setState({ interactions });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({
            error:
              err instanceof Error
                ? err.message
                : "No fue posible obtener las consultas.",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    loading: state === null,
    error: state?.error,
    interactions: state?.interactions ?? [],
  };
}