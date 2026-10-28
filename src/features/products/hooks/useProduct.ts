"use client";

import { useEffect, useState } from "react";
import { ApiError } from "../../common/http";
import type { Product } from "../domain/product";
import { getProductById } from "../services/products.service";

type State = {
  id: number;
  product?: Product;
  error?: string;
  notFound?: boolean;
};

export function useProduct(id: number) {
  const [state, setState] = useState<State | null>(null);

  useEffect(() => {
    let cancelled = false;

    getProductById(id)
      .then((product) => {
        if (!cancelled) setState({ id, product });
      })
      .catch((err: unknown) => {
        if (cancelled) return;

        if (err instanceof ApiError && err.status === 404) {
          setState({ id, notFound: true });
          return;
        }

        setState({
          id,
          error:
            err instanceof Error
              ? err.message
              : "No fue posible obtener el producto.",
        });
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const loading = state?.id !== id;

  return {
    loading,
    product: loading ? undefined : state?.product,
    notFound: loading ? false : Boolean(state?.notFound),
    error: loading ? undefined : state?.error,
  };
}