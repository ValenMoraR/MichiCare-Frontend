"use client";

import { useEffect, useState } from "react";
import type { Product } from "../domain/product";
import { getProducts } from "../services/products.service";

type State = { products?: Product[]; error?: string };

// Lista todos los productos del catálogo para el panel de administración.
export function useAdminProducts() {
  const [version, setVersion] = useState(0);
  const [state, setState] = useState<State | null>(null);

  useEffect(() => {
    let cancelled = false;

    getProducts(1, 100)
      .then((result) => {
        if (!cancelled) setState({ products: result.data });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({
            error:
              err instanceof Error
                ? err.message
                : "No fue posible obtener los productos.",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [version]);

  return {
    loading: state === null,
    error: state?.error,
    products: state?.products ?? [],
    // Vuelve a pedir la lista (por ejemplo, después de crear o borrar).
    reload: () => setVersion((current) => current + 1),
  };
}