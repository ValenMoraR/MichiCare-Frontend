"use client";

import { useEffect, useState } from "react";
import type { ProductsResponse } from "../domain/product";
import { getProducts } from "../services/products.service";

type State = { key: string; data?: ProductsResponse; error?: string };

export function useProducts(page: number, limit: number, categoria?: string) {
  const key = `${page}-${limit}-${categoria ?? "todos"}`;
  const [state, setState] = useState<State | null>(null);

  useEffect(() => {
    let cancelled = false;

    getProducts(page, limit, categoria)
      .then((data) => {
        if (!cancelled) setState({ key, data });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({
            key,
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
  }, [page, limit, categoria, key]);

  // Mientras la respuesta guardada no corresponda a esta consulta, estamos cargando.
  const loading = state?.key !== key;

  return {
    loading,
    error: loading ? undefined : state?.error,
    products: loading ? [] : (state?.data?.data ?? []),
    pagination: loading ? undefined : state?.data?.pagination,
  };
}