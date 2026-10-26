import { http } from "../../common/http";
import type { ProductsResponse } from "../domain/product";

export function getProducts(page: number, limit: number, categoria?: string) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (categoria) params.set("categoria", categoria);

  return http<ProductsResponse>(`/api/products?${params.toString()}`, {
    auth: false,
  });
}